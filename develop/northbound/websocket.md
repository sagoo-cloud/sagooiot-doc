

# 1. WebSocket方式

## 1.1. 开发

### 1.1.1. 创建websocket鉴权token

1. 登录`sagoo` 系统，进入`系统配置`-> `北向客户端` -> `websocket` 页面，添加一个客户端
2. 添加完成客户端，会自动生成一个token，用来做鉴权使用，websocket统一接口为：/messaging/{token}

### 1.1.2. websocket消息结构

1. 客户端请求
```json
{
  "id": "request-id",   #请求 ID , 请求的标识,服务端在推送消息时,会将此标识一并返回
  "type": "sub",        #开始订阅消息，固定为 sub
  "topic": "",          #对应动作的topic，支持 "/device-message-sender/sagoo-product/device1,device2"，多个设备用逗号分隔
  "parameter": {
     # 头信息
     "meta":{
        "async":false // 是否异步,异步时,平台不等待设备返回指令结果.
     }
     # 消息类型,支持: READ_PROPERTY (读取属性),WRITE_PROPERTY (修改属性),INVOKE_FUNCTION (调用功能)
     "messageType":"READ_PROPERTY"
     # 根据不同的消息,参数也不同
     "properties":["temperature"],
  },       #对应动作的请求参数
}
```

2. 平台响应
```json
{
  "id": "request-id",   #请求ID, 请求的标识,服务端在推送消息时,会将此标识一并返回
  "type": "result",     #固定为 result
  "topic": "",          #实际数据 topic
  "payload": {}         #对应topic的报文
}
```

3. 客户端取消订阅
```json
{
    "type":"unsub",     #固定为 unsub
    "id": "request-id"  #与订阅请求ID一致
}
```

### 1.1.3. 支持的messageType

| 消息类型 | 描述 |
| --- | --- |
| READ_PROPERTY | 读取属性 |
| WRITE_PROPERTY | 修改属性 |
| INVOKE_FUNCTION | 调用功能 |


#### 1.1.3.1. READ_PROPERTY

1. 请求
```json
{
  "id": "request-id",   #请求 ID , 请求的标识,服务端在推送消息时,会将此标识一并返回
  "type": "sub",        #开始订阅消息，固定为 sub
  "topic": "",          #对应动作的topic，支持 "/device-message-sender/sagoo-product/device1,device2"，多个设备用逗号分隔
  "parameter": {
     # 头信息
     "meta":{
        "async":false // 是否异步,异步时,平台不等待设备返回指令结果.
     }
     # 消息类型,支持: READ_PROPERTY (读取属性),WRITE_PROPERTY (修改属性),INVOKE_FUNCTION (调用功能)
     "messageType":"READ_PROPERTY"
     # 根据不同的消息,参数也不同
     "properties":["temperature"],
  },       #对应动作的请求参数
}
```
2.响应
```json
{
  "id": "request-id",   #请求ID, 请求的标识,服务端在推送消息时,会将此标识一并返回
  "type": "result",     #固定为 result
  "topic": "",          #实际数据 topic
  "payload": {
    "temperature": 20
  }         #对应topic的报文
}
```

#### 1.1.3.2. WRITE_PROPERTY

1. 请求
```json
{
  "id": "request-id",   #请求 ID , 请求的标识,服务端在推送消息时,会将此标识一并返回
  "type": "sub",        #开始订阅消息，固定为 sub
  "topic": "",          #对应动作的topic，支持 "/device-message-sender/sagoo-product/device1,device2"，多个设备用逗号分隔
  "parameter": {
     # 头信息
     "meta":{
        "async":false // 是否异步,异步时,平台不等待设备返回指令结果.
     }
     # 消息类型,支持: READ_PROPERTY (读取属性),WRITE_PROPERTY (修改属性),INVOKE_FUNCTION (调用功能)
     "messageType":"WRITE_PROPERTY"
     # 根据不同的消息,参数也不同
     "properties":{
        "temperature": 20
     },
  },       #对应动作的请求参数
}
```
2. 响应
```json
{
  "id": "request-id",   #请求ID, 请求的标识,服务端在推送消息时,会将此标识一并返回
  "type": "result",     #固定为 result
  "topic": "",          #实际数据 topic
  "payload": {
    "temperature": 20
  }         #对应topic的报文
}
```

#### 1.1.3.3. INVOKE_FUNCTION

1. 请求
```json
{
  "id": "request-id",   #请求 ID , 请求的标识,服务端在推送消息时,会将此标识一并返回
  "type": "sub",        #开始订阅消息，固定为 sub
  "topic": "",          #对应动作的topic，支持 "/device-message-sender/sagoo-product/device1,device2"，多个设备用逗号分隔
  "parameter": {
     # 头信息
     "meta":{
        "async":false // 是否异步,异步时,平台不等待设备返回指令结果.
     }
     # 消息类型,支持: READ_PROPERTY (读取属性),WRITE_PROPERTY (修改属性),INVOKE_FUNCTION (调用功能)
     "messageType":"INVOKE_FUNCTION"
     # 根据不同的消息,参数也不同
     "properties":{
        "temperature": 20
     },
  },       #对应动作的请求参数
}
```
2. 响应
```json
{
  "id": "request-id",   #请求ID, 请求的标识,服务端在推送消息时,会将此标识一并返回
  "type": "result",     #固定为 result
  "topic": "",          #实际数据 topic
  "payload": {
    "temperature": 20
  }         #对应topic的报文
}
```


