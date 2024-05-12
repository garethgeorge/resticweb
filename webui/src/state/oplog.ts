import {
  Operation,
  OperationEvent,
  OperationEventType,
  OperationStatus,
} from "../../gen/ts/v1/operations_pb";
import { GetOperationsRequest } from "../../gen/ts/v1/service_pb";
import { BackupProgressEntry, ResticSnapshot } from "../../gen/ts/v1/restic_pb";
import _ from "lodash";
import { formatDuration, formatTime } from "../lib/formatting";
import { backrestService } from "../api";
import {
  STATS_OPERATION_HISTORY,
  STATUS_OPERATION_HISTORY,
} from "../constants";

const subscribers: ((event: OperationEvent) => void)[] = [];

// Start fetching and emitting operations.
(async () => {
  while (true) {
    let nextConnWaitUntil = new Date().getTime() + 5000;
    try {
      for await (const event of backrestService.getOperationEvents({})) {
        console.log("operation event", event);
        subscribers.forEach((subscriber) => subscriber(event));
      }
    } catch (e: any) {
      console.error("operations stream died with exception: ", e);
    }
    await new Promise((accept, _) =>
      setTimeout(accept, nextConnWaitUntil - new Date().getTime()),
    );
  }
})();

export const getOperations = async (
  req: GetOperationsRequest,
): Promise<Operation[]> => {
  const opList = await backrestService.getOperations(req);
  return opList.operations || [];
};

export const subscribeToOperations = (
  callback: (event: OperationEvent) => void,
) => {
  subscribers.push(callback);
};

export const unsubscribeFromOperations = (
  callback: (event: OperationEvent) => void,
) => {
  const index = subscribers.indexOf(callback);
  if (index > -1) {
    subscribers[index] = subscribers[subscribers.length - 1];
    subscribers.pop();
  }
};

export const getStatusForPlan = async (plan: string) => {
  const req = new GetOperationsRequest({
    planId: plan,
    lastN: BigInt(STATUS_OPERATION_HISTORY),
  });
  return await getStatus(req);
};

export const getStatusForRepo = async (repo: string) => {
  const req = new GetOperationsRequest({
    repoId: repo,
    lastN: BigInt(STATUS_OPERATION_HISTORY),
  });
  return await getStatus(req);
};

// getStatus returns the status of the last N operations that belong to a single snapshot.
const getStatus = async (req: GetOperationsRequest) => {
  let ops = await getOperations(req);
  ops = ops
    .reverse()
    .filter((op) => op.status !== OperationStatus.STATUS_PENDING);
  if (ops.length === 0) {
    return OperationStatus.STATUS_SUCCESS;
  }
  const flowId = ops[0].flowId;
  for (const op of ops) {
    if (op.status === OperationStatus.STATUS_PENDING) {
      continue;
    }
    if (op.flowId !== flowId) {
      break;
    }
    if (
      op.status !== OperationStatus.STATUS_SUCCESS &&
      op.status !== OperationStatus.STATUS_USER_CANCELLED &&
      op.status !== OperationStatus.STATUS_SYSTEM_CANCELLED
    ) {
      return op.status;
    }
  }
  return OperationStatus.STATUS_SUCCESS;
};

export enum DisplayType {
  UNKNOWN,
  BACKUP,
  SNAPSHOT,
  FORGET,
  PRUNE,
  RESTORE,
  STATS,
  RUNHOOK,
}

export interface BackupInfo {
  id: string; // flow ID of the operations that make up this backup.
  displayTime: Date;
  displayType: DisplayType;
  startTimeMs: number;
  endTimeMs: number;
  status: OperationStatus;
  operations: Operation[]; // operations ordered by their unixTimeStartMs (not ID)
  repoId?: string;
  planId?: string;
  snapshotId?: string;
  backupLastStatus?: BackupProgressEntry;
  snapshotInfo?: ResticSnapshot;
  forgotten: boolean;
}

// BackupInfoCollector maps multiple operations to single aggregate 'BackupInfo' objects.
// A backup info object aggregates the backup status (if available), snapshot info (if available), and possibly the forget status (if available).
export class BackupInfoCollector {
  private listeners: ((
    event: OperationEventType,
    info: BackupInfo[],
  ) => void)[] = [];

  // backups maps a flow ID to a backup info object.
  private operationsByFlowId: Map<bigint, Operation[]> = new Map();
  private backupsByFlowId: Map<bigint, BackupInfo> = new Map();

  /**
   *
   * @param filter a function that returns true if an operation should be displayed, false otherwise.
   */
  constructor(
    private filter: (op: Operation) => boolean = (op) =>
      !shouldHideOperation(op),
  ) { }

  private createBackup(operations: Operation[]): BackupInfo {
    // deduplicate and sort operations.
    operations.sort((a, b) => {
      return Number(a.unixTimeStartMs - b.unixTimeStartMs);
    });

    // use the lowest ID of all operations as the ID of the backup, this will be the first created operation.
    const id = operations.reduce((prev, curr) => {
      return prev < curr.id ? prev : curr.id;
    }, operations[0].id!);

    const startTimeMs = Number(operations[0].unixTimeStartMs);
    const endTimeMs = Number(operations[operations.length - 1].unixTimeEndMs!);
    const displayTime = new Date(startTimeMs);
    let displayType = DisplayType.SNAPSHOT;
    if (operations.length === 1) {
      displayType = getTypeForDisplay(operations[0]);
    }

    // use the latest status that is not a hidden status
    let statusIdx = operations.length - 1;
    let status = OperationStatus.STATUS_SYSTEM_CANCELLED;
    while (statusIdx !== -1) {
      if (operations[statusIdx].op.case === "operationRunHook") {
        statusIdx--;
        continue;
      }
      const curStatus = operations[statusIdx].status;
      if (
        shouldHideStatus(status) ||
        status === OperationStatus.STATUS_PENDING ||
        curStatus === OperationStatus.STATUS_ERROR ||
        curStatus === OperationStatus.STATUS_WARNING
      ) {
        status = operations[statusIdx].status;
      }
      statusIdx--;
    }

    let backupLastStatus = undefined;
    let snapshotInfo = undefined;
    let forgotten = false;
    let snapshotId = "";
    for (const op of operations) {
      if (op.op.case === "operationBackup") {
        backupLastStatus = op.op.value.lastStatus;
      } else if (op.op.case === "operationIndexSnapshot") {
        snapshotInfo = op.op.value.snapshot;
        forgotten = op.op.value.forgot || false;
        snapshotId = op.op.value.snapshot?.id || "";
      }
    }

    return {
      id: operations[0].flowId.toString(16),
      startTimeMs,
      endTimeMs,
      displayTime,
      displayType,
      status,
      operations,
      backupLastStatus,
      snapshotInfo,
      forgotten,
      snapshotId: snapshotId,
      planId: operations[0].planId,
      repoId: operations[0].repoId,
    };
  }

  private addOrUpdateHelper(op: Operation) {
    const existing = this.operationsByFlowId.get(op.flowId);
    if (existing === undefined) {
      this.operationsByFlowId.set(op.flowId, [op]);
    } else {
      const idx = existing.findIndex((o) => o.id === op.id);
      if (idx === -1) {
        existing.push(op);
      } else {
        existing[idx] = op;
      }
    }
    this.backupsByFlowId.delete(op.flowId);
  }

  private getBackupInfo(flowId: bigint): BackupInfo | undefined {
    let existing = this.backupsByFlowId.get(flowId);
    if (existing === undefined) {
      const operations = this.operationsByFlowId.get(flowId);
      if (!operations) {
        return undefined;
      }
      existing = this.createBackup(operations);
      this.backupsByFlowId.set(flowId, existing);
    }
    return existing;
  }

  public addOperation(
    event: OperationEventType,
    op: Operation,
  ): BackupInfo | null {
    if (!this.filter(op)) {
      this.removeOperation(op);
      return null;
    }
    this.addOrUpdateHelper(op);
    const backupInfo = this.getBackupInfo(op.flowId)!;
    this.listeners.forEach((l) => l(event, [backupInfo]));
    return backupInfo;
  }

  // removeOperaiton is not quite correct from a formal standpoint; but will look correct in the UI.
  public removeOperation(op: Operation) {
    const existing = this.operationsByFlowId.get(op.flowId);
    if (existing === undefined) {
      return;
    }
    const idx = existing.findIndex((o) => o.id === op.id);
    if (idx === -1) {
      return;
    }
    existing.splice(idx, 1);
    if (existing.length === 0) {
      this.operationsByFlowId.delete(op.flowId);
    }
    this.backupsByFlowId.delete(op.flowId); // delete the cache for lazy recomputation.

    this.listeners.forEach((l) =>
      l(OperationEventType.EVENT_DELETED, this.getAll()),
    );
  }

  public bulkAddOperations(ops: Operation[]): BackupInfo[] {
    for (const op of ops) {
      if (this.filter(op)) {
        this.addOrUpdateHelper(op);
      } else {
        this.removeOperation(op);
      }
    }
    const flowIDs = _.uniq(ops.map((op) => op.flowId));
    const info = flowIDs.map((flowId) => this.getBackupInfo(flowId)!);
    this.listeners.forEach((l) => l(OperationEventType.EVENT_CREATED, info));
    return info;
  }

  public getAll(): BackupInfo[] {
    const arr = [];
    for (const key of this.operationsByFlowId.keys()) {
      arr.push(this.getBackupInfo(key)!);
    }
    return arr.filter((b) => !b.forgotten && !shouldHideStatus(b.status));
  }

  public subscribe(
    listener: (event: OperationEventType, info: BackupInfo[]) => void,
  ) {
    this.listeners.push(listener);
  }

  public unsubscribe(
    listener: (event: OperationEventType, info: BackupInfo[]) => void,
  ) {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners[index] = this.listeners[this.listeners.length - 1];
      this.listeners.pop();
    }
  }
}

export const shouldHideOperation = (operation: Operation) => {
  return (
    operation.op.case === "operationStats" ||
    (operation.op.case === "operationRunHook" &&
      operation.status === OperationStatus.STATUS_SUCCESS) ||
    shouldHideStatus(operation.status)
  );
};
export const shouldHideStatus = (status: OperationStatus) => {
  return status === OperationStatus.STATUS_SYSTEM_CANCELLED;
};

export const getTypeForDisplay = (op: Operation) => {
  switch (op.op.case) {
    case "operationBackup":
      return DisplayType.BACKUP;
    case "operationIndexSnapshot":
      return DisplayType.SNAPSHOT;
    case "operationForget":
      return DisplayType.FORGET;
    case "operationPrune":
      return DisplayType.PRUNE;
    case "operationRestore":
      return DisplayType.RESTORE;
    case "operationStats":
      return DisplayType.STATS;
    case "operationRunHook":
      return DisplayType.RUNHOOK;
    default:
      return DisplayType.UNKNOWN;
  }
};

export const displayTypeToString = (type: DisplayType) => {
  switch (type) {
    case DisplayType.BACKUP:
      return "Backup";
    case DisplayType.SNAPSHOT:
      return "Snapshot";
    case DisplayType.FORGET:
      return "Forget";
    case DisplayType.PRUNE:
      return "Prune";
    case DisplayType.RESTORE:
      return "Restore";
    case DisplayType.STATS:
      return "Stats";
    case DisplayType.RUNHOOK:
      return "Run Hook";
    default:
      return "Unknown";
  }
};

export const colorForStatus = (status: OperationStatus) => {
  switch (status) {
    case OperationStatus.STATUS_PENDING:
      return "grey";
    case OperationStatus.STATUS_INPROGRESS:
      return "blue";
    case OperationStatus.STATUS_ERROR:
      return "red";
    case OperationStatus.STATUS_WARNING:
      return "orange";
    case OperationStatus.STATUS_SUCCESS:
      return "green";
    case OperationStatus.STATUS_USER_CANCELLED:
      return "orange";
    default:
      return "grey";
  }
};

// detailsForOperation returns derived display information for a given operation.
export const detailsForOperation = (
  op: Operation,
): {
  state: string;
  displayState: string;
  duration: number;
  percentage?: number;
  color: string;
} => {
  let state = "";
  let duration = 0;
  let percentage: undefined | number = undefined;
  let color: string;
  switch (op.status!) {
    case OperationStatus.STATUS_PENDING:
      state = "pending";
      color = "grey";
      break;
    case OperationStatus.STATUS_INPROGRESS:
      state = "running";
      duration = new Date().getTime() - Number(op.unixTimeStartMs);
      color = "blue";
      break;
    case OperationStatus.STATUS_ERROR:
      state = "error";
      color = "red";
      break;
    case OperationStatus.STATUS_WARNING:
      state = "warning";
      color = "orange";
      break;
    case OperationStatus.STATUS_SUCCESS:
      state = "";
      color = "green";
      break;
    case OperationStatus.STATUS_USER_CANCELLED:
      state = "cancelled";
      color = "orange";
      break;
    default:
      state = "";
      color = "grey";
  }

  switch (op.status) {
    case OperationStatus.STATUS_INPROGRESS:
      duration = new Date().getTime() - Number(op.unixTimeStartMs);

      if (op.op.case === "operationBackup") {
        const backup = op.op.value;
        switch (backup.lastStatus?.entry.case) {
          case "status":
            percentage =
              (backup.lastStatus!.entry.value.percentDone || 0) * 100;
            break;
          case "summary":
            percentage = 100;
            break;
          default:
            break;
        }
      } else if (op.op.case === "operationRestore") {
        const restore = op.op.value;
        if (restore.status) {
          percentage = (restore.status.percentDone || 1) * 100;
        }
      }
      break;
    default:
      duration = Number(op.unixTimeEndMs - op.unixTimeStartMs);
      break;
  }

  let displayState = state;
  if (duration > 0) {
    if (op.status === OperationStatus.STATUS_INPROGRESS) {
      displayState += " for " + formatDuration(duration);
    } else {
      displayState += " in " + formatDuration(duration);
    }
  }

  if (percentage !== undefined) {
    displayState += ` (${percentage.toFixed(2)}%)`;
  }

  return {
    state,
    displayState,
    duration,
    percentage,
    color,
  };
};
