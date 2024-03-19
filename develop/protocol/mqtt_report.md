---
sidebar_position: 2
---
# 数据上报

## 设备上报属性

1. 请求Topic: `/sys/${productKey}/${deviceKey}/thing/event/property/post`
2. 请求数据格式示例:
```json
{
    "id": "123",
    "version": "1.0",
    "sys":{
        "ack":0
    },
    "params": {
        "Power": {
            "value": "on",
            "time": 1524448722000
        },
        "WF": {
            "value": 23.6,
            "time": 1524448722000
        }
    },
    "method": "thing.event.property.post"
}
```

字段说明

1. id: 消息ID，用于唯一标识一条消息，由设备端生成，必须保证唯一性。注：**消息ID必须为字符类型**。
2. version: 消息版本号，目前版本为1.0。
3. sys: 系统级参数，目前仅支持ack，ack=0表示不需要应答，ack=1表示需要应答。注：**ack必须为数字类型**。
4. params: 消息体，消息体中包含了设备上报的属性值，属性值的格式为JSON格式。
5. method: 消息类型，目前仅支持thing.event.property.post。
6. Power: 属性名称，必须与物模型中定义的属性名称一致。
7. value: 属性值，必须与物模型中定义的属性类型一致。注：**属性值需要物模型的配置一至**。
8. time: 属性值的时间戳，单位为秒，可选，如果不携带该字段，则默认为消息发送时间。注：**时间戳必须为数字类型**。

### 应答

1. 应答Topic: `/sys/${productKey}/${deviceKey}/thing/event/property/post_reply`
2. 应答数据格式示例:

```json
{
  "code": 200,
  "data": {},
  "id": "123",
  "message": "success",
  "method": "thing.event.property.post",
  "version": "1.0"
}
```

字段说明
1. code: 应答码，200表示成功，其他表示失败。
2. data: 应答数据，目前为空。
3. id: 消息ID，与请求中的消息ID一致。
4. message: 应答消息，目前为空。
5. method: 消息类型，目前仅支持thing.event.property.post。
6. version: 消息版本号，目前版本为1.0

## 设备属性设置

1. 请求Topic：`/sys/${productKey}/${deviceKey}/thing/service/property/set`
2. 请求数据格式示例：
```json
{
    "id": "123",
    "version": "1.0",
    "params": {
        "temperature": "30.5"
    },
    "method": "thing.service.property.set"
}
```

字段说明

1. id：消息ID，用于唯一标识一条消息，由设备端生成，必须保证唯一性。
2. version：消息版本号，目前版本为1.0。
3. params：消息体，消息体中包含了设备上报的事件值，事件值的格式为JSON格式。
4. method：消息类型，目前仅支持thing.service.property.set

### 应答

1. 应答Topic：`/sys/${productKey}/${deviceKey}/thing/service/property/set_reply`
2. 请求数据格式示例：
```json
{
    "code": 200,
    "data": {},
    "id": "123",
    "message": "success",
    "version": "1.0"
}
```

字段说明
1. code: 应答码，200表示成功，其他表示失败。
2. data: 应答数据，目前为空。
3. id: 消息ID，与请求中的消息ID一致。
4. message: 应答消息，目前为空。
5. version: 消息版本号，目前版本为1.0

## 设备上报事件

1. 请求Topic: `/sys/${productKey}/${deviceKey}/thing/event/${eventIdentifier}/post`
2. 请求数据格式示例:

```json
{
  "id": "123",
  "version": "1.0",
  "sys":{
    "ack":0
  },
  "params": {
    "value": {
      "Power": "on",
      "WF": "2"
    },
    "time": 1524448722000
  },
  "method": "thing.event.${tsl.event.identifier}.post"
}
```

字段说明
备注: 请求参数 params 中的 value 里面的k，v都为字符串，忽略了物模型中定义的类型，这里需要注意

1. id: 消息ID，用于唯一标识一条消息，由设备端生成，必须保证唯一性。
2. version: 消息版本号，目前版本为1.0。
3. sys: 系统级参数，目前仅支持ack，ack=0表示不需要应答，ack=1表示需要应答。
4. params: 消息体，消息体中包含了设备上报的事件值，事件值的格式为JSON格式。
5. method: 消息类型，目前仅支持thing.event.`${tsl.event.identifier}`.post。
6. value: 事件值，必须与物模型中定义的事件类型一致。
7. time: 事件值的时间戳，单位为秒，可选，如果不携带该字段，则默认为消息发送时间。

### 应答

1. 应答Topic: `/sys/${productKey}/${deviceKey}/thing/event/${eventIdentifier}/post_reply`
2. 请求数据格式示例:

```json
{
  "code": 200,
  "data": {},
  "id": "123",
  "message": "success",
  "method": "thing.event.${tsl.event.identifier}.post",
  "version": "1.0"
}
```

字段说明

1. code: 应答码，200表示成功，其他表示失败。
2. data: 应答数据，目前为空。
3. id: 消息ID，与请求中的消息ID一致。
4. message: 应答消息，目前为空。
5. method: 消息类型，目前仅支持thing.event.`${tsl.event.identifier}`.post。
6. version: 消息版本号，目前版本为1.0

## 服务调用
1. 请求Topic: `/sys/${productKey}/${deviceKey}/thing/service/${tsl.service.identifier}`
2. 请求数据格式示例:

```json
{
  "id": "123",
  "version": "1.0",
  "params": {
    "Power": "on",
    "WF": "2"
  },
  "method": "thing.service.${tsl.service.identifier}"
}
```

参数说明
1. id: 消息ID，用于唯一标识一条消息，由设备端生成，必须保证唯一性。
2. version: 消息版本号，目前版本为1.0。
3. params: 消息体，消息体中包含了设备上报的事件值，事件值的格式为JSON格式。
4. method: 消息类型，目前仅支持thing.service.`${tsl.service.identifier}`。

### 应答

1. 应答Topic: `/sys/${productKey}/${deviceKey}/thing/service/${tsl.service.identifier}_reply`
2. 应答数据格式示例:

```json
{
  "code": 200,
  "data": {},
  "id": "123",
  "message": "success",
  "version": "1.0"
}
```

字段说明
1. code: 应答码，200表示成功，其他表示失败。
2. data: 应答数据，目前为空。
3. id: 消息ID，与请求中的消息ID一致。
4. message: 应答消息，目前为空。
5. version: 消息版本号，目前版本为1.0

## 网关批量上传事件和属性
1. 请求Topic: `/sys/${productKey}/${deviceKey}/thing/event/property/pack/post`
2. 请求数据格式示例:

```json
{
  "id": "123",
  "version": "1.0",
  "sys":{
    "ack":0
  },
  "params": {
    "properties": {
      "Power": {
        "value": "on",
        "time": 1524448722000
      }
    },
    "events": {
      "alarmEvent1": {
        "value": {
          "param1": "on",
          "param2": "2"
        },
        "time": 1524448722000
      },
      "alertEvent2": {
        "value": {
          "param1": "on",
          "param2": "2"
        },
        "time": 1524448722000
      }
    },
    "subDevices": [
      {
        "identity": {
          "productKey": "",
          "deviceKey": ""
        },
        "properties": {
          "Power": {
            "value": "on",
            "time": 1524448722000
          },
          "WF": {
            "value": { },
            "time": 1524448722000
          }
        },
        "events": {
          "alarmEvent1": {
            "value": {
              "param1": "on",
              "param2": "2"
            },
            "time": 1524448722000
          },
          "alertEvent2": {
            "value": {
              "param1": "on",
              "param2": "2"
            },
            "time": 1524448722000
          }
        }
      }
    ]
  },
  "method": "thing.event.property.pack.post"
}
```

字段说明
1. id: 消息ID，用于唯一标识一条消息，由设备端生成，必须保证唯一性。
2. version: 消息版本号，目前版本为1.0。
3. sys: 系统级参数，目前仅支持ack，ack=0表示不需要应答，ack=1表示需要应答。
4. params: 消息体，消息体中包含了设备上报的事件值，事件值的格式为JSON格式。
5. method: 消息类型，目前仅支持thing.event.property.pack.post。
6. properties: 设备属性值，必须与物模型中定义的属性类型一致。
7. events: 设备事件值，必须与物模型中定义的事件类型一致。
8. subDevices: 子设备属性值和事件值，必须与物模型中定义的属性类型和事件类型一致。
9. identity: 子设备标识，必须与物模型中定义的子设备标识一致。
10. value: 属性值或事件值，必须与物模型中定义的属性类型或事件类型一致。
11. time: 属性值或事件值的时间戳，单位为秒，可选，如果不携带该字段，则默认为消息发送时间。

### 响应

1. 响应Topic: `/sys/${productKey}/${deviceKey}/thing/event/property/pack/post`
2. 响应数据格式示例:

```json
{
  "code": 200,
  "data": {},
  "id": "123",
  "message": "success",
  "method": "thing.event.property.pack.post",
  "version": "1.0"
}
```

字段说明
1. code: 应答码，200表示成功，其他表示失败。
2. data: 应答数据，目前为空。
3. id: 消息ID，与请求中的消息ID一致。
4. message: 应答消息，目前为空。
5. method: 消息类型，目前仅支持thing.event.property.pack.post。
6. version: 消息版本号，目前版本为1.0
