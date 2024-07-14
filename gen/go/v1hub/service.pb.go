// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.32.0
// 	protoc        (unknown)
// source: v1hub/service.proto

package v1hub

import (
	types "github.com/garethgeorge/backrest/gen/go/types"
	v1 "github.com/garethgeorge/backrest/gen/go/v1"
	_ "google.golang.org/genproto/googleapis/api/annotations"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	emptypb "google.golang.org/protobuf/types/known/emptypb"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type ProtocolVersion struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Major int64 `protobuf:"varint,1,opt,name=major,proto3" json:"major,omitempty"` // major protocol version
}

func (x *ProtocolVersion) Reset() {
	*x = ProtocolVersion{}
	if protoimpl.UnsafeEnabled {
		mi := &file_v1hub_service_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ProtocolVersion) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ProtocolVersion) ProtoMessage() {}

func (x *ProtocolVersion) ProtoReflect() protoreflect.Message {
	mi := &file_v1hub_service_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ProtocolVersion.ProtoReflect.Descriptor instead.
func (*ProtocolVersion) Descriptor() ([]byte, []int) {
	return file_v1hub_service_proto_rawDescGZIP(), []int{0}
}

func (x *ProtocolVersion) GetMajor() int64 {
	if x != nil {
		return x.Major
	}
	return 0
}

type GetHighestModnoRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Selector *v1.OpSelector `protobuf:"bytes,1,opt,name=selector,proto3" json:"selector,omitempty"`
}

func (x *GetHighestModnoRequest) Reset() {
	*x = GetHighestModnoRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_v1hub_service_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetHighestModnoRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetHighestModnoRequest) ProtoMessage() {}

func (x *GetHighestModnoRequest) ProtoReflect() protoreflect.Message {
	mi := &file_v1hub_service_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetHighestModnoRequest.ProtoReflect.Descriptor instead.
func (*GetHighestModnoRequest) Descriptor() ([]byte, []int) {
	return file_v1hub_service_proto_rawDescGZIP(), []int{1}
}

func (x *GetHighestModnoRequest) GetSelector() *v1.OpSelector {
	if x != nil {
		return x.Selector
	}
	return nil
}

type OpSyncMetadata struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id        int64         `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty"`
	Modno     int64         `protobuf:"varint,2,opt,name=modno,proto3" json:"modno,omitempty"`
	Operation *v1.Operation `protobuf:"bytes,3,opt,name=operation,proto3" json:"operation,omitempty"` // optionally push the operation itself
}

func (x *OpSyncMetadata) Reset() {
	*x = OpSyncMetadata{}
	if protoimpl.UnsafeEnabled {
		mi := &file_v1hub_service_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *OpSyncMetadata) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*OpSyncMetadata) ProtoMessage() {}

func (x *OpSyncMetadata) ProtoReflect() protoreflect.Message {
	mi := &file_v1hub_service_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use OpSyncMetadata.ProtoReflect.Descriptor instead.
func (*OpSyncMetadata) Descriptor() ([]byte, []int) {
	return file_v1hub_service_proto_rawDescGZIP(), []int{2}
}

func (x *OpSyncMetadata) GetId() int64 {
	if x != nil {
		return x.Id
	}
	return 0
}

func (x *OpSyncMetadata) GetModno() int64 {
	if x != nil {
		return x.Modno
	}
	return 0
}

func (x *OpSyncMetadata) GetOperation() *v1.Operation {
	if x != nil {
		return x.Operation
	}
	return nil
}

type GetConfigRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *GetConfigRequest) Reset() {
	*x = GetConfigRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_v1hub_service_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetConfigRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetConfigRequest) ProtoMessage() {}

func (x *GetConfigRequest) ProtoReflect() protoreflect.Message {
	mi := &file_v1hub_service_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetConfigRequest.ProtoReflect.Descriptor instead.
func (*GetConfigRequest) Descriptor() ([]byte, []int) {
	return file_v1hub_service_proto_rawDescGZIP(), []int{3}
}

var File_v1hub_service_proto protoreflect.FileDescriptor

var file_v1hub_service_proto_rawDesc = []byte{
	0x0a, 0x13, 0x76, 0x31, 0x68, 0x75, 0x62, 0x2f, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x2e,
	0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x05, 0x76, 0x31, 0x68, 0x75, 0x62, 0x1a, 0x13, 0x76, 0x31,
	0x2f, 0x6f, 0x70, 0x65, 0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x2e, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x1a, 0x0f, 0x76, 0x31, 0x2f, 0x63, 0x6f, 0x6e, 0x66, 0x69, 0x67, 0x2e, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x1a, 0x10, 0x76, 0x31, 0x2f, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x2e, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x11, 0x74, 0x79, 0x70, 0x65, 0x73, 0x2f, 0x76, 0x61, 0x6c, 0x75,
	0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x1b, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2f,
	0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2f, 0x65, 0x6d, 0x70, 0x74, 0x79, 0x2e, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x1c, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x61, 0x70, 0x69,
	0x2f, 0x61, 0x6e, 0x6e, 0x6f, 0x74, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x2e, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x22, 0x27, 0x0a, 0x0f, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x63, 0x6f, 0x6c, 0x56, 0x65,
	0x72, 0x73, 0x69, 0x6f, 0x6e, 0x12, 0x14, 0x0a, 0x05, 0x6d, 0x61, 0x6a, 0x6f, 0x72, 0x18, 0x01,
	0x20, 0x01, 0x28, 0x03, 0x52, 0x05, 0x6d, 0x61, 0x6a, 0x6f, 0x72, 0x22, 0x44, 0x0a, 0x16, 0x47,
	0x65, 0x74, 0x48, 0x69, 0x67, 0x68, 0x65, 0x73, 0x74, 0x4d, 0x6f, 0x64, 0x6e, 0x6f, 0x52, 0x65,
	0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x2a, 0x0a, 0x08, 0x73, 0x65, 0x6c, 0x65, 0x63, 0x74, 0x6f,
	0x72, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x0e, 0x2e, 0x76, 0x31, 0x2e, 0x4f, 0x70, 0x53,
	0x65, 0x6c, 0x65, 0x63, 0x74, 0x6f, 0x72, 0x52, 0x08, 0x73, 0x65, 0x6c, 0x65, 0x63, 0x74, 0x6f,
	0x72, 0x22, 0x63, 0x0a, 0x0e, 0x4f, 0x70, 0x53, 0x79, 0x6e, 0x63, 0x4d, 0x65, 0x74, 0x61, 0x64,
	0x61, 0x74, 0x61, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x03, 0x52,
	0x02, 0x69, 0x64, 0x12, 0x14, 0x0a, 0x05, 0x6d, 0x6f, 0x64, 0x6e, 0x6f, 0x18, 0x02, 0x20, 0x01,
	0x28, 0x03, 0x52, 0x05, 0x6d, 0x6f, 0x64, 0x6e, 0x6f, 0x12, 0x2b, 0x0a, 0x09, 0x6f, 0x70, 0x65,
	0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x18, 0x03, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x0d, 0x2e, 0x76,
	0x31, 0x2e, 0x4f, 0x70, 0x65, 0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x52, 0x09, 0x6f, 0x70, 0x65,
	0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x22, 0x12, 0x0a, 0x10, 0x47, 0x65, 0x74, 0x43, 0x6f, 0x6e,
	0x66, 0x69, 0x67, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x32, 0x85, 0x02, 0x0a, 0x03, 0x48,
	0x75, 0x62, 0x12, 0x4a, 0x0a, 0x16, 0x43, 0x68, 0x65, 0x63, 0x6b, 0x56, 0x65, 0x72, 0x73, 0x69,
	0x6f, 0x6e, 0x43, 0x6f, 0x6d, 0x70, 0x61, 0x74, 0x69, 0x62, 0x6c, 0x65, 0x12, 0x16, 0x2e, 0x76,
	0x31, 0x68, 0x75, 0x62, 0x2e, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x63, 0x6f, 0x6c, 0x56, 0x65, 0x72,
	0x73, 0x69, 0x6f, 0x6e, 0x1a, 0x16, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x45, 0x6d, 0x70, 0x74, 0x79, 0x22, 0x00, 0x12, 0x36,
	0x0a, 0x0f, 0x47, 0x65, 0x74, 0x48, 0x69, 0x67, 0x68, 0x65, 0x73, 0x74, 0x4d, 0x6f, 0x64, 0x6e,
	0x6f, 0x12, 0x0e, 0x2e, 0x76, 0x31, 0x2e, 0x4f, 0x70, 0x53, 0x65, 0x6c, 0x65, 0x63, 0x74, 0x6f,
	0x72, 0x1a, 0x11, 0x2e, 0x74, 0x79, 0x70, 0x65, 0x73, 0x2e, 0x49, 0x6e, 0x74, 0x36, 0x34, 0x56,
	0x61, 0x6c, 0x75, 0x65, 0x22, 0x00, 0x12, 0x44, 0x0a, 0x0e, 0x53, 0x79, 0x6e, 0x63, 0x4f, 0x70,
	0x65, 0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x12, 0x15, 0x2e, 0x76, 0x31, 0x68, 0x75, 0x62,
	0x2e, 0x4f, 0x70, 0x53, 0x79, 0x6e, 0x63, 0x4d, 0x65, 0x74, 0x61, 0x64, 0x61, 0x74, 0x61, 0x1a,
	0x15, 0x2e, 0x76, 0x31, 0x68, 0x75, 0x62, 0x2e, 0x4f, 0x70, 0x53, 0x79, 0x6e, 0x63, 0x4d, 0x65,
	0x74, 0x61, 0x64, 0x61, 0x74, 0x61, 0x22, 0x00, 0x28, 0x01, 0x30, 0x01, 0x12, 0x34, 0x0a, 0x09,
	0x47, 0x65, 0x74, 0x43, 0x6f, 0x6e, 0x66, 0x69, 0x67, 0x12, 0x17, 0x2e, 0x76, 0x31, 0x68, 0x75,
	0x62, 0x2e, 0x47, 0x65, 0x74, 0x43, 0x6f, 0x6e, 0x66, 0x69, 0x67, 0x52, 0x65, 0x71, 0x75, 0x65,
	0x73, 0x74, 0x1a, 0x0a, 0x2e, 0x76, 0x31, 0x2e, 0x43, 0x6f, 0x6e, 0x66, 0x69, 0x67, 0x22, 0x00,
	0x30, 0x01, 0x42, 0x2f, 0x5a, 0x2d, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d,
	0x2f, 0x67, 0x61, 0x72, 0x65, 0x74, 0x68, 0x67, 0x65, 0x6f, 0x72, 0x67, 0x65, 0x2f, 0x62, 0x61,
	0x63, 0x6b, 0x72, 0x65, 0x73, 0x74, 0x2f, 0x67, 0x65, 0x6e, 0x2f, 0x67, 0x6f, 0x2f, 0x76, 0x31,
	0x68, 0x75, 0x62, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_v1hub_service_proto_rawDescOnce sync.Once
	file_v1hub_service_proto_rawDescData = file_v1hub_service_proto_rawDesc
)

func file_v1hub_service_proto_rawDescGZIP() []byte {
	file_v1hub_service_proto_rawDescOnce.Do(func() {
		file_v1hub_service_proto_rawDescData = protoimpl.X.CompressGZIP(file_v1hub_service_proto_rawDescData)
	})
	return file_v1hub_service_proto_rawDescData
}

var file_v1hub_service_proto_msgTypes = make([]protoimpl.MessageInfo, 4)
var file_v1hub_service_proto_goTypes = []interface{}{
	(*ProtocolVersion)(nil),        // 0: v1hub.ProtocolVersion
	(*GetHighestModnoRequest)(nil), // 1: v1hub.GetHighestModnoRequest
	(*OpSyncMetadata)(nil),         // 2: v1hub.OpSyncMetadata
	(*GetConfigRequest)(nil),       // 3: v1hub.GetConfigRequest
	(*v1.OpSelector)(nil),          // 4: v1.OpSelector
	(*v1.Operation)(nil),           // 5: v1.Operation
	(*emptypb.Empty)(nil),          // 6: google.protobuf.Empty
	(*types.Int64Value)(nil),       // 7: types.Int64Value
	(*v1.Config)(nil),              // 8: v1.Config
}
var file_v1hub_service_proto_depIdxs = []int32{
	4, // 0: v1hub.GetHighestModnoRequest.selector:type_name -> v1.OpSelector
	5, // 1: v1hub.OpSyncMetadata.operation:type_name -> v1.Operation
	0, // 2: v1hub.Hub.CheckVersionCompatible:input_type -> v1hub.ProtocolVersion
	4, // 3: v1hub.Hub.GetHighestModno:input_type -> v1.OpSelector
	2, // 4: v1hub.Hub.SyncOperations:input_type -> v1hub.OpSyncMetadata
	3, // 5: v1hub.Hub.GetConfig:input_type -> v1hub.GetConfigRequest
	6, // 6: v1hub.Hub.CheckVersionCompatible:output_type -> google.protobuf.Empty
	7, // 7: v1hub.Hub.GetHighestModno:output_type -> types.Int64Value
	2, // 8: v1hub.Hub.SyncOperations:output_type -> v1hub.OpSyncMetadata
	8, // 9: v1hub.Hub.GetConfig:output_type -> v1.Config
	6, // [6:10] is the sub-list for method output_type
	2, // [2:6] is the sub-list for method input_type
	2, // [2:2] is the sub-list for extension type_name
	2, // [2:2] is the sub-list for extension extendee
	0, // [0:2] is the sub-list for field type_name
}

func init() { file_v1hub_service_proto_init() }
func file_v1hub_service_proto_init() {
	if File_v1hub_service_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_v1hub_service_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ProtocolVersion); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_v1hub_service_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GetHighestModnoRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_v1hub_service_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*OpSyncMetadata); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_v1hub_service_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GetConfigRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_v1hub_service_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   4,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_v1hub_service_proto_goTypes,
		DependencyIndexes: file_v1hub_service_proto_depIdxs,
		MessageInfos:      file_v1hub_service_proto_msgTypes,
	}.Build()
	File_v1hub_service_proto = out.File
	file_v1hub_service_proto_rawDesc = nil
	file_v1hub_service_proto_goTypes = nil
	file_v1hub_service_proto_depIdxs = nil
}
