
# 1. MQTT方式

## 1.1. 开发

### 1.1.1. 修改系统配置文件 `manifest/config/config.yaml` 在原有的mqtt配置添加以下配置项

    ```yaml
    messagingEnable: true
    ```

### 1.1.2. 申请系统token

1. 登录`sagoo` 系统，进入`系统配置`-> `北向客户端` -> `mqtt` 页面，添加一个客户端
2. 添加完成后系统会生成一个随机的`clientId`,用来作为`mqtt`的客户端`id`，此`id`必须仅能给一个客户端使用，`id`复用会导致可能接收不到消息

### 1.1.3. 消息定义

北向接口暂时定义这些消息，按照需要订阅相关topic接收对应消息，后续会有相关的扩充

| 分类   | topic                                | 消息类型                 | 描述            |
|------|--------------------------------------|----------------------|---------------|
| 设备操作 | /message/device/online               | DeviceOnlineMessage  | 设备上线          |
| 设备操作 | /message/device/offline              | DeviceOfflineMessage | 设备下线          |
| 设备操作 | /message/device/add                  |    DeviceAddMessage                  | 设备添加          |
| 设备操作 | /message/device/delete               |  DeviceDeleteMessage                    | 设备删除          |
| 物物模型 | /message/tsl/receive/property/report | PropertyReportMessage                     | 设备上报属性        |
| 物物模型 | /message/tsl/receive/event/report    |   EventReportMessage                   | 设备上报事件        |
| 物物模型 | /message/tsl/send/service/call       |  ServiceCallMessage                    | 平台调用设备服务请求    |
| 物物模型 | /message/tsl/receive/service/reply   |    ServiceReplyMessage                  | 平台接收到设备服务响应   |
| 物物模型 | /message/tsl/send/property/set       |         PropertySetMessage             | 平台设置设备属性      |
| 物物模型 | /message/tsl/receive/property/reply  |           ServiceReplyMessage           | 平台接收到设置设备属性响应 |


### 1.1.4. 消息格式

所有的消息报文都为json结构体，统一结构如下,其中所有的消息类型都是放在data里面
1. 对应的go结构体
```go
type Message struct {
    Meta       map[string]string `json:"meta"` //消息元数据，里面的字段暂时为空
	MessageId  string            `json:"messageId"`// 消息id，`string`类型,消息唯一标识
    ProductKey string            `json:"productKey"`// 产品`key`，`string`类型
    DeviceKey  string            `json:"deviceKey"`//设备`key`，`string`类型
    Data       interface{}       `json:"data"`// 消息体，里面的字段根据不同的消息类型会有不同的结构体
}
``

```
2. 对应的json报文
```json
{
  "meta":{},
  "messageId":"testMessageId",
  "productKey":"testProductKey",
  "deviceKey":"testDeviceKey",
  "data":{}
}
```

### 1.1.5. 消息类型定义

#### 1.1.5.1. 设备上线

1. 对应的go结构体
```go
type DeviceOnlineMessage struct {
    Timestamp int64 `json:"timestamp"`//int64类型，时间戳，单位为毫秒
	Desc string `json:"desc"`//string类型，描述信息
}
```
2. 对应的json报文
```json
{
  "timestamp":123456789,
    "desc":"testDesc"
}
```

#### 1.1.5.2. 设备下线

1. 对应的go结构体
```go
type DeviceOfflineMessage struct {
    timestamp int64 `json:"timestamp"`//int64类型，时间戳，单位为毫秒
	Desc string `json:"desc"`//string类型，描述信息
}
```
2. 对应的json报文
```json
{
  "timestamp":123456789,
  "desc": "testDesc"
}
```

#### 1.1.5.3. 设备添加

1. 对应的go结构体
```go
type DeviceAddMessage struct {
    timestamp int64 `json:"timestamp"`//int64类型，时间戳，单位为毫秒
    Desc string `json:"desc"`//string类型，描述信息
}
```
2. 对应的json报文
```json
{
  "timestamp":123456789,
  "desc": "testDesc"
}
```

#### 1.1.5.4. 设备删除

1. 对应的go结构体
```go
type DeviceDeleteMessage struct {
    timestamp int64 `json:"timestamp"`//int64类型，时间戳，单位为毫秒
    Desc string `json:"desc"`//string类型，描述信息
}
```
2. 对应的json报文
```json
{
  "timestamp":123456789,
  "desc": "testDesc"
}
```

#### 1.1.5.5. 设备上报属性

1. 对应的go结构体
```go
type (
    PropertyReportMessage struct {
        Properties map[string]PropertyReportMessageNode `json:"properties"`//map类型，属性列表，key为属性标识，value为属性值
    }
	PropertyReportMessageNode struct {
        Value interface{} `json:"value"`//属性值
        Timestamp int64 `json:"timestamp"`//int64类型，时间戳，单位为毫秒
    }
)
```
2. 对应的json报文
```json
{
  "properties":{
    "testPropertyKey":{
      "value":"testPropertyValue",
      "timestamp":123456789
    }
  }
}
```

#### 1.1.5.6. 设备上报事件

1. 对应的go结构体
```go
type (
    EventReportMessage struct {
		EventId string `json:"eventId"`//string类型，事件标识
        Events map[string]interface{} `json:"events"`//map类型，事件列表，key为事件标识，value为事件值
        Timestamp int64 `json:"timestamp"`//int64类型，时间戳，单位为毫秒
    }
)
```
2. 对应的json报文
```json
{
  "events":{
    "testEventKey":"testEventValue"
  },
  "eventId": "asdasd",
  "timestamp":123456789
}
```


#### 1.1.5.7. 平台调用设备服务请求

1. 对应的go结构体
```go
type (
    ServiceCallMessage struct {
        ServiceId string `json:"serviceId"`//string类型，服务标识
        Params    map[string]interface{} `json:"params"`//map类型，服务参数列表，key为参数标识，value为参数值
        Timestamp int64 `json:"timestamp"`//int64类型，时间戳，单位为毫秒
    }
)
```

2. 对应的json报文
```json
{
  "serviceId":"testServiceId",
  "params":{
    "testParamKey":"testParamValue"
  },
  "timestamp":123456789
}
```

#### 1.1.5.8. 平台接收到设备服务响应

1. 对应的go结构体
```go
type (
    ServiceReplyMessage struct {
        ServiceId string `json:"serviceId"`//string类型，服务标识
        Code      int `json:"code"`//int类型，响应码
        Data      map[string]interface{} `json:"data"`//map类型，响应数据列表，key为数据标识，value为数据值
        Timestamp int64 `json:"timestamp"`//int64类型，时间戳，单位为毫秒
    }
)
```
2. 对应的json结构体
```json
{
  "serviceId":"testServiceId",
  "code":200,
  "data":{
    "testDataKey":"testDataValue"
  },
  "timestamp":123456789
}
```

#### 1.1.5.9. 平台设置设备属性

1. 对应的go结构体
```go
type (
    PropertySetMessage struct {
        Properties map[string]interface{} `json:"properties"`//map类型，属性列表，key为属性标识，value为属性值
        Timestamp int64 `json:"timestamp"`//int64类型，时间戳，单位为毫秒
    }
)
```
2. 对应的json结构体
```json
{
  "properties":{
    "testPropertyKey":"testPropertyValue"
  },
  "timestamp":123456789
}
```

#### 1.1.5.10. 平台接收到设置设备属性响应

1. 对应的go结构体
```go
type (
    ServiceReplyMessage struct {
        Code      int `json:"code"`//int类型，响应码
        Data      map[string]interface{} `json:"data"`//map类型，响应数据列表，key为数据标识，value为数据值
        Timestamp int64 `json:"timestamp"`//int64类型，时间戳，单位为毫秒
    }
)
```
2. 对应的json结构体
```json
{
  "code":200,
  "data":{
    "testDataKey":"testDataValue"
  },
  "timestamp":123456789
}
```





