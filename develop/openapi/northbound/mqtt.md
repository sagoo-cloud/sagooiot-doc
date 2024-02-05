
# MQTT方式


## 开启mqtt北向消息开关

修改系统配置文件 `manifest/config/config.yaml` 在原有的mqtt配置添加`messagingEnable`配置项,配置如下

```yaml
mqtt:
  addr: 127.0.0.1:1885
  clientId: exampleClientId
  deviceLiveDuration: 30
  messagingEnable: true
  auth:
    userName: sagoo_admin
    userPassWorld: sagoo_admin
```

## mqtt连接信息

1. `mqtt` 相关的连接信息在系统配置文件 `manifest/config/config.yaml` 中查看
2. 连接使用的`mqtt`的`clientId`
    1. 登录`sagoo` 系统，进入`系统配置`-> `基础配置` 查找下面两个的值，分别对应`SK`和`AK`
       - `开放接口AK`: `Ak`
       - `开放接口SK`: `SK`
2. 连接的`clientId`为`Ak`和`SK`的`base64`编码,即为`base64(Ak:SK)`,使用golang代码示例如下

```go
package main
    
import (
    "encoding/base64"
    "fmt"
)
    
func main() {
    ak := "testAk"
    sk := "testSk"
    akSk := ak + ":" + sk
    akSkBase64 := base64.StdEncoding.EncodeToString([]byte(akSk))
    fmt.Println(akSkBase64)
}
```

## 消息定义

北向接口暂时定义这些消息，按照需要订阅相关topic接收对应消息，后续会有相关的扩充

| 分类  | topic                                | 消息类型                    | 描述            |
|-----|--------------------------------------|-------------------------|---------------|
| 设备操作 | /message/device/online               | DeviceOnlineMessage     | 设备上线          |
| 设备操作 | /message/device/offline              | DeviceOfflineMessage    | 设备下线          |
| 设备操作 | /message/device/add                  | DeviceAddMessage        | 设备添加          |
| 设备操作 | /message/device/delete               | DeviceDeleteMessage     | 设备删除          |
| 物模型 | /message/tsl/receive/property/report | PropertyReportMessage   | 设备上传属性        |
| 物模型 | /message/tsl/receive/event/report    | EventReportMessage      | 设备上传事件        |
| 物模型 | /message/tsl/send/service/call       | ServiceCallMessage      | 平台调用设备服务    |
| 物模型 | /message/tsl/receive/service/reply   | ServiceCallReplyMessage    | 平台接收到设备服务响应   |
| 物模型 | /message/tsl/send/property/set       | PropertySetMessage      | 平台设置设备属性      |
| 物模型 | /message/tsl/receive/property/reply  | PropertySetReplyMessage | 平台接收到设置设备属性响应 |


## 消息格式

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

## 消息类型定义

### 设备上线

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

### 设备下线

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

### 设备添加

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

### 设备删除

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

### 设备上报属性

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

### 设备上报事件

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


### 平台调用设备服务请求

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

### 平台接收到设备服务响应

1. 对应的go结构体
```go
type (
    ServiceCallReplyMessage struct {
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

### 平台设置设备属性

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

### 平台接收到设置设备属性响应

1. 对应的go结构体
```go
type (
    PropertySetReplyMessage struct {
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





