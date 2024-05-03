// @generated by protoc-gen-es v1.6.0 with parameter "target=ts"
// @generated from file v1/config.proto (package v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * Config is the top level config object for restic UI.
 *
 * @generated from message v1.Config
 */
export class Config extends Message<Config> {
  /**
   * modification number, used for read-modify-write consistency in the UI. Incremented on every write.
   *
   * @generated from field: int32 modno = 1;
   */
  modno = 0;

  /**
   * version of the config file format. Used to determine when to run migrations.
   *
   * @generated from field: int32 version = 6;
   */
  version = 0;

  /**
   * The instance name for the Backrest installation. 
   * This identifies backups created by this instance and is displayed in the UI. 
   *
   * @generated from field: string instance = 2;
   */
  instance = "";

  /**
   * @generated from field: repeated v1.Repo repos = 3;
   */
  repos: Repo[] = [];

  /**
   * @generated from field: repeated v1.Plan plans = 4;
   */
  plans: Plan[] = [];

  /**
   * @generated from field: v1.Auth auth = 5;
   */
  auth?: Auth;

  constructor(data?: PartialMessage<Config>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "v1.Config";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "modno", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 6, name: "version", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "instance", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "repos", kind: "message", T: Repo, repeated: true },
    { no: 4, name: "plans", kind: "message", T: Plan, repeated: true },
    { no: 5, name: "auth", kind: "message", T: Auth },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Config {
    return new Config().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Config {
    return new Config().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Config {
    return new Config().fromJsonString(jsonString, options);
  }

  static equals(a: Config | PlainMessage<Config> | undefined, b: Config | PlainMessage<Config> | undefined): boolean {
    return proto3.util.equals(Config, a, b);
  }
}

/**
 * @generated from message v1.Repo
 */
export class Repo extends Message<Repo> {
  /**
   * unique but human readable ID for this repo.
   *
   * @generated from field: string id = 1;
   */
  id = "";

  /**
   * restic repo URI
   *
   * @generated from field: string uri = 2;
   */
  uri = "";

  /**
   * plaintext password
   *
   * @generated from field: string password = 3;
   */
  password = "";

  /**
   * extra environment variables to set for restic.
   *
   * @generated from field: repeated string env = 4;
   */
  env: string[] = [];

  /**
   * extra flags set on the restic command.
   *
   * @generated from field: repeated string flags = 5;
   */
  flags: string[] = [];

  /**
   * policy for when to run prune.
   *
   * @generated from field: v1.PrunePolicy prune_policy = 6;
   */
  prunePolicy?: PrunePolicy;

  /**
   * hooks to run on events for this repo.
   *
   * @generated from field: repeated v1.Hook hooks = 7;
   */
  hooks: Hook[] = [];

  /**
   * automatically unlock the repo when needed.
   *
   * @generated from field: bool auto_unlock = 8;
   */
  autoUnlock = false;

  constructor(data?: PartialMessage<Repo>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "v1.Repo";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "uri", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "password", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "env", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 5, name: "flags", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 6, name: "prune_policy", kind: "message", T: PrunePolicy },
    { no: 7, name: "hooks", kind: "message", T: Hook, repeated: true },
    { no: 8, name: "auto_unlock", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Repo {
    return new Repo().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Repo {
    return new Repo().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Repo {
    return new Repo().fromJsonString(jsonString, options);
  }

  static equals(a: Repo | PlainMessage<Repo> | undefined, b: Repo | PlainMessage<Repo> | undefined): boolean {
    return proto3.util.equals(Repo, a, b);
  }
}

/**
 * @generated from message v1.Plan
 */
export class Plan extends Message<Plan> {
  /**
   * unique but human readable ID for this plan.
   *
   * @generated from field: string id = 1;
   */
  id = "";

  /**
   * ID of the repo to use.
   *
   * @generated from field: string repo = 2;
   */
  repo = "";

  /**
   * @generated from field: bool disabled = 11;
   */
  disabled = false;

  /**
   * paths to include in the backup.
   *
   * @generated from field: repeated string paths = 4;
   */
  paths: string[] = [];

  /**
   * glob patterns to exclude.
   *
   * @generated from field: repeated string excludes = 5;
   */
  excludes: string[] = [];

  /**
   * case insensitive glob patterns to exclude.
   *
   * @generated from field: repeated string iexcludes = 9;
   */
  iexcludes: string[] = [];

  /**
   * cron expression describing the backup schedule.
   *
   * @generated from field: string cron = 6;
   */
  cron = "";

  /**
   * retention policy for snapshots.
   *
   * @generated from field: v1.RetentionPolicy retention = 7;
   */
  retention?: RetentionPolicy;

  /**
   * hooks to run on events for this plan.
   *
   * @generated from field: repeated v1.Hook hooks = 8;
   */
  hooks: Hook[] = [];

  /**
   * extra flags to set when running a backup command.
   *
   * @generated from field: repeated string backup_flags = 10 [json_name = "backup_flags"];
   */
  backupFlags: string[] = [];

  constructor(data?: PartialMessage<Plan>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "v1.Plan";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "repo", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 11, name: "disabled", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 4, name: "paths", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 5, name: "excludes", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 9, name: "iexcludes", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 6, name: "cron", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "retention", kind: "message", T: RetentionPolicy },
    { no: 8, name: "hooks", kind: "message", T: Hook, repeated: true },
    { no: 10, name: "backup_flags", jsonName: "backup_flags", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Plan {
    return new Plan().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Plan {
    return new Plan().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Plan {
    return new Plan().fromJsonString(jsonString, options);
  }

  static equals(a: Plan | PlainMessage<Plan> | undefined, b: Plan | PlainMessage<Plan> | undefined): boolean {
    return proto3.util.equals(Plan, a, b);
  }
}

/**
 * @generated from message v1.RetentionPolicy
 */
export class RetentionPolicy extends Message<RetentionPolicy> {
  /**
   * @generated from field: string max_unused_limit = 1 [deprecated = true];
   * @deprecated
   */
  maxUnusedLimit = "";

  /**
   * @generated from field: int32 keep_last_n = 2 [deprecated = true];
   * @deprecated
   */
  keepLastN = 0;

  /**
   * @generated from field: int32 keep_hourly = 3 [deprecated = true];
   * @deprecated
   */
  keepHourly = 0;

  /**
   * @generated from field: int32 keep_daily = 4 [deprecated = true];
   * @deprecated
   */
  keepDaily = 0;

  /**
   * @generated from field: int32 keep_weekly = 5 [deprecated = true];
   * @deprecated
   */
  keepWeekly = 0;

  /**
   * @generated from field: int32 keep_monthly = 6 [deprecated = true];
   * @deprecated
   */
  keepMonthly = 0;

  /**
   * @generated from field: int32 keep_yearly = 7 [deprecated = true];
   * @deprecated
   */
  keepYearly = 0;

  /**
   * keep snapshots within a duration e.g. 1y2m3d4h5m6s
   *
   * @generated from field: string keep_within_duration = 8 [deprecated = true];
   * @deprecated
   */
  keepWithinDuration = "";

  /**
   * @generated from oneof v1.RetentionPolicy.policy
   */
  policy: {
    /**
     * @generated from field: int32 policy_keep_last_n = 10;
     */
    value: number;
    case: "policyKeepLastN";
  } | {
    /**
     * @generated from field: v1.RetentionPolicy.TimeBucketedCounts policy_time_bucketed = 11;
     */
    value: RetentionPolicy_TimeBucketedCounts;
    case: "policyTimeBucketed";
  } | {
    /**
     * @generated from field: bool policy_keep_all = 12;
     */
    value: boolean;
    case: "policyKeepAll";
  } | { case: undefined; value?: undefined } = { case: undefined };

  constructor(data?: PartialMessage<RetentionPolicy>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "v1.RetentionPolicy";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "max_unused_limit", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "keep_last_n", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 3, name: "keep_hourly", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 4, name: "keep_daily", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 5, name: "keep_weekly", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 6, name: "keep_monthly", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 7, name: "keep_yearly", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 8, name: "keep_within_duration", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 10, name: "policy_keep_last_n", kind: "scalar", T: 5 /* ScalarType.INT32 */, oneof: "policy" },
    { no: 11, name: "policy_time_bucketed", kind: "message", T: RetentionPolicy_TimeBucketedCounts, oneof: "policy" },
    { no: 12, name: "policy_keep_all", kind: "scalar", T: 8 /* ScalarType.BOOL */, oneof: "policy" },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RetentionPolicy {
    return new RetentionPolicy().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RetentionPolicy {
    return new RetentionPolicy().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RetentionPolicy {
    return new RetentionPolicy().fromJsonString(jsonString, options);
  }

  static equals(a: RetentionPolicy | PlainMessage<RetentionPolicy> | undefined, b: RetentionPolicy | PlainMessage<RetentionPolicy> | undefined): boolean {
    return proto3.util.equals(RetentionPolicy, a, b);
  }
}

/**
 * @generated from message v1.RetentionPolicy.TimeBucketedCounts
 */
export class RetentionPolicy_TimeBucketedCounts extends Message<RetentionPolicy_TimeBucketedCounts> {
  /**
   * keep the last n hourly snapshots.
   *
   * @generated from field: int32 hourly = 1;
   */
  hourly = 0;

  /**
   * keep the last n daily snapshots.
   *
   * @generated from field: int32 daily = 2;
   */
  daily = 0;

  /**
   * keep the last n weekly snapshots.
   *
   * @generated from field: int32 weekly = 3;
   */
  weekly = 0;

  /**
   * keep the last n monthly snapshots.
   *
   * @generated from field: int32 monthly = 4;
   */
  monthly = 0;

  /**
   * keep the last n yearly snapshots.
   *
   * @generated from field: int32 yearly = 5;
   */
  yearly = 0;

  constructor(data?: PartialMessage<RetentionPolicy_TimeBucketedCounts>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "v1.RetentionPolicy.TimeBucketedCounts";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "hourly", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "daily", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 3, name: "weekly", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 4, name: "monthly", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 5, name: "yearly", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RetentionPolicy_TimeBucketedCounts {
    return new RetentionPolicy_TimeBucketedCounts().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RetentionPolicy_TimeBucketedCounts {
    return new RetentionPolicy_TimeBucketedCounts().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RetentionPolicy_TimeBucketedCounts {
    return new RetentionPolicy_TimeBucketedCounts().fromJsonString(jsonString, options);
  }

  static equals(a: RetentionPolicy_TimeBucketedCounts | PlainMessage<RetentionPolicy_TimeBucketedCounts> | undefined, b: RetentionPolicy_TimeBucketedCounts | PlainMessage<RetentionPolicy_TimeBucketedCounts> | undefined): boolean {
    return proto3.util.equals(RetentionPolicy_TimeBucketedCounts, a, b);
  }
}

/**
 * @generated from message v1.PrunePolicy
 */
export class PrunePolicy extends Message<PrunePolicy> {
  /**
   * max frequency of prune runs in days. If 0, prune will be run on every backup.
   *
   * @generated from field: int32 max_frequency_days = 1;
   */
  maxFrequencyDays = 0;

  /**
   * max percentage of repo size that can be unused before prune is run.
   *
   * @generated from field: int32 max_unused_percent = 100;
   */
  maxUnusedPercent = 0;

  /**
   * max number of bytes that can be unused before prune is run.
   *
   * @generated from field: int32 max_unused_bytes = 101;
   */
  maxUnusedBytes = 0;

  constructor(data?: PartialMessage<PrunePolicy>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "v1.PrunePolicy";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "max_frequency_days", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 100, name: "max_unused_percent", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 101, name: "max_unused_bytes", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PrunePolicy {
    return new PrunePolicy().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PrunePolicy {
    return new PrunePolicy().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PrunePolicy {
    return new PrunePolicy().fromJsonString(jsonString, options);
  }

  static equals(a: PrunePolicy | PlainMessage<PrunePolicy> | undefined, b: PrunePolicy | PlainMessage<PrunePolicy> | undefined): boolean {
    return proto3.util.equals(PrunePolicy, a, b);
  }
}

/**
 * @generated from message v1.Hook
 */
export class Hook extends Message<Hook> {
  /**
   * @generated from field: repeated v1.Hook.Condition conditions = 1;
   */
  conditions: Hook_Condition[] = [];

  /**
   * @generated from field: v1.Hook.OnError on_error = 2;
   */
  onError = Hook_OnError.IGNORE;

  /**
   * @generated from oneof v1.Hook.action
   */
  action: {
    /**
     * @generated from field: v1.Hook.Command action_command = 100;
     */
    value: Hook_Command;
    case: "actionCommand";
  } | {
    /**
     * @generated from field: v1.Hook.Webhook action_webhook = 101;
     */
    value: Hook_Webhook;
    case: "actionWebhook";
  } | {
    /**
     * @generated from field: v1.Hook.Discord action_discord = 102;
     */
    value: Hook_Discord;
    case: "actionDiscord";
  } | {
    /**
     * @generated from field: v1.Hook.Gotify action_gotify = 103;
     */
    value: Hook_Gotify;
    case: "actionGotify";
  } | {
    /**
     * @generated from field: v1.Hook.Slack action_slack = 104;
     */
    value: Hook_Slack;
    case: "actionSlack";
  } | {
    /**
     * @generated from field: v1.Hook.Shoutrrr action_shoutrrr = 105;
     */
    value: Hook_Shoutrrr;
    case: "actionShoutrrr";
  } | { case: undefined; value?: undefined } = { case: undefined };

  constructor(data?: PartialMessage<Hook>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "v1.Hook";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "conditions", kind: "enum", T: proto3.getEnumType(Hook_Condition), repeated: true },
    { no: 2, name: "on_error", kind: "enum", T: proto3.getEnumType(Hook_OnError) },
    { no: 100, name: "action_command", kind: "message", T: Hook_Command, oneof: "action" },
    { no: 101, name: "action_webhook", kind: "message", T: Hook_Webhook, oneof: "action" },
    { no: 102, name: "action_discord", kind: "message", T: Hook_Discord, oneof: "action" },
    { no: 103, name: "action_gotify", kind: "message", T: Hook_Gotify, oneof: "action" },
    { no: 104, name: "action_slack", kind: "message", T: Hook_Slack, oneof: "action" },
    { no: 105, name: "action_shoutrrr", kind: "message", T: Hook_Shoutrrr, oneof: "action" },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Hook {
    return new Hook().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Hook {
    return new Hook().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Hook {
    return new Hook().fromJsonString(jsonString, options);
  }

  static equals(a: Hook | PlainMessage<Hook> | undefined, b: Hook | PlainMessage<Hook> | undefined): boolean {
    return proto3.util.equals(Hook, a, b);
  }
}

/**
 * @generated from enum v1.Hook.Condition
 */
export enum Hook_Condition {
  /**
   * @generated from enum value: CONDITION_UNKNOWN = 0;
   */
  UNKNOWN = 0,

  /**
   * error running any operation.
   *
   * @generated from enum value: CONDITION_ANY_ERROR = 1;
   */
  ANY_ERROR = 1,

  /**
   * backup started.
   *
   * @generated from enum value: CONDITION_SNAPSHOT_START = 2;
   */
  SNAPSHOT_START = 2,

  /**
   * backup completed (success or fail).
   *
   * @generated from enum value: CONDITION_SNAPSHOT_END = 3;
   */
  SNAPSHOT_END = 3,

  /**
   * snapshot failed.
   *
   * @generated from enum value: CONDITION_SNAPSHOT_ERROR = 4;
   */
  SNAPSHOT_ERROR = 4,

  /**
   * snapshot completed with warnings.
   *
   * @generated from enum value: CONDITION_SNAPSHOT_WARNING = 5;
   */
  SNAPSHOT_WARNING = 5,
}
// Retrieve enum metadata with: proto3.getEnumType(Hook_Condition)
proto3.util.setEnumType(Hook_Condition, "v1.Hook.Condition", [
  { no: 0, name: "CONDITION_UNKNOWN" },
  { no: 1, name: "CONDITION_ANY_ERROR" },
  { no: 2, name: "CONDITION_SNAPSHOT_START" },
  { no: 3, name: "CONDITION_SNAPSHOT_END" },
  { no: 4, name: "CONDITION_SNAPSHOT_ERROR" },
  { no: 5, name: "CONDITION_SNAPSHOT_WARNING" },
]);

/**
 * @generated from enum v1.Hook.OnError
 */
export enum Hook_OnError {
  /**
   * @generated from enum value: ON_ERROR_IGNORE = 0;
   */
  IGNORE = 0,

  /**
   * cancels the operation and skips subsequent hooks
   *
   * @generated from enum value: ON_ERROR_CANCEL = 1;
   */
  CANCEL = 1,

  /**
   * fails the operation and subsequent hooks
   *
   * @generated from enum value: ON_ERROR_FATAL = 2;
   */
  FATAL = 2,
}
// Retrieve enum metadata with: proto3.getEnumType(Hook_OnError)
proto3.util.setEnumType(Hook_OnError, "v1.Hook.OnError", [
  { no: 0, name: "ON_ERROR_IGNORE" },
  { no: 1, name: "ON_ERROR_CANCEL" },
  { no: 2, name: "ON_ERROR_FATAL" },
]);

/**
 * @generated from message v1.Hook.Command
 */
export class Hook_Command extends Message<Hook_Command> {
  /**
   * @generated from field: string command = 1;
   */
  command = "";

  constructor(data?: PartialMessage<Hook_Command>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "v1.Hook.Command";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "command", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Hook_Command {
    return new Hook_Command().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Hook_Command {
    return new Hook_Command().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Hook_Command {
    return new Hook_Command().fromJsonString(jsonString, options);
  }

  static equals(a: Hook_Command | PlainMessage<Hook_Command> | undefined, b: Hook_Command | PlainMessage<Hook_Command> | undefined): boolean {
    return proto3.util.equals(Hook_Command, a, b);
  }
}

/**
 * @generated from message v1.Hook.Webhook
 */
export class Hook_Webhook extends Message<Hook_Webhook> {
  /**
   * @generated from field: string webhook_url = 1;
   */
  webhookUrl = "";

  /**
   * @generated from field: v1.Hook.Webhook.Method method = 2;
   */
  method = Hook_Webhook_Method.UNKNOWN;

  /**
   * @generated from field: string template = 100;
   */
  template = "";

  constructor(data?: PartialMessage<Hook_Webhook>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "v1.Hook.Webhook";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "webhook_url", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "method", kind: "enum", T: proto3.getEnumType(Hook_Webhook_Method) },
    { no: 100, name: "template", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Hook_Webhook {
    return new Hook_Webhook().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Hook_Webhook {
    return new Hook_Webhook().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Hook_Webhook {
    return new Hook_Webhook().fromJsonString(jsonString, options);
  }

  static equals(a: Hook_Webhook | PlainMessage<Hook_Webhook> | undefined, b: Hook_Webhook | PlainMessage<Hook_Webhook> | undefined): boolean {
    return proto3.util.equals(Hook_Webhook, a, b);
  }
}

/**
 * @generated from enum v1.Hook.Webhook.Method
 */
export enum Hook_Webhook_Method {
  /**
   * @generated from enum value: UNKNOWN = 0;
   */
  UNKNOWN = 0,

  /**
   * @generated from enum value: GET = 1;
   */
  GET = 1,

  /**
   * @generated from enum value: POST = 2;
   */
  POST = 2,
}
// Retrieve enum metadata with: proto3.getEnumType(Hook_Webhook_Method)
proto3.util.setEnumType(Hook_Webhook_Method, "v1.Hook.Webhook.Method", [
  { no: 0, name: "UNKNOWN" },
  { no: 1, name: "GET" },
  { no: 2, name: "POST" },
]);

/**
 * @generated from message v1.Hook.Discord
 */
export class Hook_Discord extends Message<Hook_Discord> {
  /**
   * @generated from field: string webhook_url = 1;
   */
  webhookUrl = "";

  /**
   * template for the webhook payload.
   *
   * @generated from field: string template = 2;
   */
  template = "";

  constructor(data?: PartialMessage<Hook_Discord>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "v1.Hook.Discord";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "webhook_url", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "template", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Hook_Discord {
    return new Hook_Discord().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Hook_Discord {
    return new Hook_Discord().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Hook_Discord {
    return new Hook_Discord().fromJsonString(jsonString, options);
  }

  static equals(a: Hook_Discord | PlainMessage<Hook_Discord> | undefined, b: Hook_Discord | PlainMessage<Hook_Discord> | undefined): boolean {
    return proto3.util.equals(Hook_Discord, a, b);
  }
}

/**
 * @generated from message v1.Hook.Gotify
 */
export class Hook_Gotify extends Message<Hook_Gotify> {
  /**
   * @generated from field: string base_url = 1;
   */
  baseUrl = "";

  /**
   * @generated from field: string token = 3;
   */
  token = "";

  /**
   * template for the webhook payload.
   *
   * @generated from field: string template = 100;
   */
  template = "";

  /**
   * template for the webhook title.
   *
   * @generated from field: string title_template = 101;
   */
  titleTemplate = "";

  constructor(data?: PartialMessage<Hook_Gotify>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "v1.Hook.Gotify";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "base_url", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "token", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 100, name: "template", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 101, name: "title_template", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Hook_Gotify {
    return new Hook_Gotify().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Hook_Gotify {
    return new Hook_Gotify().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Hook_Gotify {
    return new Hook_Gotify().fromJsonString(jsonString, options);
  }

  static equals(a: Hook_Gotify | PlainMessage<Hook_Gotify> | undefined, b: Hook_Gotify | PlainMessage<Hook_Gotify> | undefined): boolean {
    return proto3.util.equals(Hook_Gotify, a, b);
  }
}

/**
 * @generated from message v1.Hook.Slack
 */
export class Hook_Slack extends Message<Hook_Slack> {
  /**
   * @generated from field: string webhook_url = 1;
   */
  webhookUrl = "";

  /**
   * template for the webhook payload.
   *
   * @generated from field: string template = 2;
   */
  template = "";

  constructor(data?: PartialMessage<Hook_Slack>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "v1.Hook.Slack";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "webhook_url", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "template", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Hook_Slack {
    return new Hook_Slack().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Hook_Slack {
    return new Hook_Slack().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Hook_Slack {
    return new Hook_Slack().fromJsonString(jsonString, options);
  }

  static equals(a: Hook_Slack | PlainMessage<Hook_Slack> | undefined, b: Hook_Slack | PlainMessage<Hook_Slack> | undefined): boolean {
    return proto3.util.equals(Hook_Slack, a, b);
  }
}

/**
 * @generated from message v1.Hook.Shoutrrr
 */
export class Hook_Shoutrrr extends Message<Hook_Shoutrrr> {
  /**
   * @generated from field: string shoutrrr_url = 1;
   */
  shoutrrrUrl = "";

  /**
   * @generated from field: string template = 2;
   */
  template = "";

  constructor(data?: PartialMessage<Hook_Shoutrrr>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "v1.Hook.Shoutrrr";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "shoutrrr_url", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "template", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Hook_Shoutrrr {
    return new Hook_Shoutrrr().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Hook_Shoutrrr {
    return new Hook_Shoutrrr().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Hook_Shoutrrr {
    return new Hook_Shoutrrr().fromJsonString(jsonString, options);
  }

  static equals(a: Hook_Shoutrrr | PlainMessage<Hook_Shoutrrr> | undefined, b: Hook_Shoutrrr | PlainMessage<Hook_Shoutrrr> | undefined): boolean {
    return proto3.util.equals(Hook_Shoutrrr, a, b);
  }
}

/**
 * @generated from message v1.Auth
 */
export class Auth extends Message<Auth> {
  /**
   * disable authentication.
   *
   * @generated from field: bool disabled = 1;
   */
  disabled = false;

  /**
   * users to allow access to the UI.
   *
   * @generated from field: repeated v1.User users = 2;
   */
  users: User[] = [];

  constructor(data?: PartialMessage<Auth>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "v1.Auth";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "disabled", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 2, name: "users", kind: "message", T: User, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Auth {
    return new Auth().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Auth {
    return new Auth().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Auth {
    return new Auth().fromJsonString(jsonString, options);
  }

  static equals(a: Auth | PlainMessage<Auth> | undefined, b: Auth | PlainMessage<Auth> | undefined): boolean {
    return proto3.util.equals(Auth, a, b);
  }
}

/**
 * @generated from message v1.User
 */
export class User extends Message<User> {
  /**
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * @generated from oneof v1.User.password
   */
  password: {
    /**
     * @generated from field: string password_bcrypt = 2;
     */
    value: string;
    case: "passwordBcrypt";
  } | { case: undefined; value?: undefined } = { case: undefined };

  constructor(data?: PartialMessage<User>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "v1.User";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "password_bcrypt", kind: "scalar", T: 9 /* ScalarType.STRING */, oneof: "password" },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): User {
    return new User().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): User {
    return new User().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): User {
    return new User().fromJsonString(jsonString, options);
  }

  static equals(a: User | PlainMessage<User> | undefined, b: User | PlainMessage<User> | undefined): boolean {
    return proto3.util.equals(User, a, b);
  }
}

