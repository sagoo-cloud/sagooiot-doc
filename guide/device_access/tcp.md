- [1. TCP设备接入](#1-tcp设备接入)
  - [1.1. 创建tcp产品](#11-创建tcp产品)
  - [1.2. 创建tcp设备](#12-创建tcp设备)
  - [1.3. 创建服务器](#13-创建服务器)
  - [1.4. 测试设备](#14-测试设备)
  - [1.5. 通信时序图](#15-通信时序图)
  - [1.6. 消息协议](#16-消息协议)
    - [1.6.1. 1、设备上报属性](#161-1设备上报属性)
      - [1.6.1.1. 请求](#1611-请求)
      - [1.6.1.2. 应答](#1612-应答)
    - [1.6.2. 2、设备上报事件](#162-2设备上报事件)
      - [1.6.2.1. 请求](#1621-请求)
      - [1.6.2.2. 应答](#1622-应答)
    - [1.6.3. 3、服务调用](#163-3服务调用)
      - [1.6.3.1. 请求](#1631-请求)
      - [1.6.3.2. 应答](#1632-应答)
    - [1.6.4. 3、网关批量上传事件和属性](#164-3网关批量上传事件和属性)
      - [1.6.4.1. 请求](#1641-请求)
      - [1.6.4.2. 响应](#1642-响应)


# 1. TCP设备接入

本教程介绍如何使用TCP协议接入sagoo物联网平台。

## 1.1. 创建tcp产品

登录sagoo物联网平台，点击左侧导航栏的`物联管理`->`设备管理`->`产品`->`添加`，创建一个TCP产品。需要注意的是，消息协议需要选择`Sagoo Mqtt`，传输协议需要选择`TCP服务器`

![tcp-add-product.png](..%2F..%2Fpublic%2Fimgs%2Fguide%2Fdevice_access%2Ftcp-add-product.png)

## 1.2. 创建tcp设备

点击左侧导航栏的`物联管理`->`设备管理`->`产品`->`设备`，创建一个设备。需要注意的是，产品需要选择刚才创建的产品

![tcp-add-device.png](..%2F..%2Fpublic%2Fimgs%2Fguide%2Fdevice_access%2Ftcp-add-device.png)

## 1.3. 创建服务器

点击左侧导航栏的`物联管理`->`网络组件`->`服务器管理`->`新建`，创建一个服务器，或者选择已经存在的服务器。需要注意下面几点

1. `类型`选择`TCP服务器`
2. `分隔符`按照实际请求和接收选择
3. `端口`选择一个自定义端口
4. `开启TLS`暂时选`否`
5. `启用`选择开启
6. `注册包` 按照实际请求来选择，作用是上来tcp连接上来第一个请求包和这个规则做匹配，取出设备key，这个key就是设备的唯一标识，如果匹配不上，tcp连接会被关闭
7. `协议` 按照实际来进行选择，需要和前面产品选择的协议维持一致
![tcp-add-server.png](..%2F..%2Fpublic%2Fimgs%2Fguide%2Fdevice_access%2Ftcp-add-server.png)

## 1.4. 测试设备

1. 使用tcp客户端工具，连接上面创建的服务器，发送注册包，如果注册包报文能匹配上上面网络服务注册包规则，则服务器继续读取，如果不匹配，服务器会关闭tcp连接
2. 与`mqtt`协议不同的是，需要在每个消息(除注册包外)额外包含两个key，`model_func_name`和`model_func_identify`，这两个key需要在sagoo-mqtt消息报文的第一层json中放入，其中两个字段的解释如下
    1. `model_func_name` 支持的物物模型模块名称，现在支持的如下
        1. `upProperty`: 上报属性
        2. `upSetProperty`: 设置属性
        3. `upEvent`: 上报事件
        4. `upBatch`: 批量上报
        5. `upServiceOutput`: 服务调用响应
        6. `downProperty`: 平台侧主动设备设备属性
        7. `downServiceInput`: 平台侧服务调用请求
    2. `model_func_identify` 这个参数是用来标记服务调用的id或者上报事件的id，如果不是这两种情况，则留空。

## 1.5. 通信时序图

1. 设备上报
![tcp-up.png](..%2F..%2Fpublic%2Fimgs%2Fguide%2Fdevice_access%2Ftcp-up.png)
2. 平台下发
![tcp-down.png](..%2F..%2Fpublic%2Fimgs%2Fguide%2Fdevice_access%2Ftcp-down.png)


## 1.6. 消息协议

### 1.6.1. 1、设备上报属性

#### 1.6.1.1. 请求

**请求数据格式：**

```json
{
    "id": "123",
    "version": "1.0",
    "model_func_name": "upProperty",
    "model_func_identify": "",
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

1. id：消息ID，用于唯一标识一条消息，由设备端生成，必须保证唯一性。
2. version：消息版本号，目前版本为1.0。
3. sys：系统级参数，目前仅支持ack，ack=0表示不需要应答，ack=1表示需要应答。
4. params：消息体，消息体中包含了设备上报的属性值，属性值的格式为JSON格式。
5. method：消息类型，目前仅支持thing.event.property.post。
6. Power：属性名称，必须与物模型中定义的属性名称一致。
7. value：属性值，必须与物模型中定义的属性类型一致。
8. time：属性值的时间戳，单位为秒，可选，如果不携带该字段，则默认为消息发送时间。

#### 1.6.1.2. 应答

1. 应答数据格式：

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
1. code：应答码，200表示成功，其他表示失败。
2. data：应答数据，目前为空。
3. id：消息ID，与请求中的消息ID一致。
4. message：应答消息，目前为空。
5. method：消息类型，目前仅支持thing.event.property.post。
6. version：消息版本号，目前版本为1.0

### 1.6.2. 2、设备上报事件

#### 1.6.2.1. 请求

1. 请求数据格式：

```json
{
  "id": "123",
  "version": "1.0",
  "model_func_name": "upEvent",
  "model_func_identify": "${event.identifier}",
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

1. id：消息ID，用于唯一标识一条消息，由设备端生成，必须保证唯一性。
2. version：消息版本号，目前版本为1.0。
3. sys：系统级参数，目前仅支持ack，ack=0表示不需要应答，ack=1表示需要应答。
4. params：消息体，消息体中包含了设备上报的事件值，事件值的格式为JSON格式。
5. method：消息类型，目前仅支持thing.event.${tsl.event.identifier}.post。
6. value：事件值，必须与物模型中定义的事件类型一致。
7. time：事件值的时间戳，单位为秒，可选，如果不携带该字段，则默认为消息发送时间。

#### 1.6.2.2. 应答

1. 请求数据格式：

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

1. code：应答码，200表示成功，其他表示失败。
2. data：应答数据，目前为空。
3. id：消息ID，与请求中的消息ID一致。
4. message：应答消息，目前为空。
5. method：消息类型，目前仅支持thing.event.${tsl.event.identifier}.post。
6. version：消息版本号，目前版本为1.0

### 1.6.3. 3、服务调用

#### 1.6.3.1. 请求

1. 请求数据格式：

```json
{
  "id": "123",
  "version": "1.0",
  "model_func_name": "downServiceInput",
  "model_func_identify": "${service.identifier}",
  "params": {
    "Power": "on",
    "WF": "2"
  },
  "method": "thing.service.${tsl.service.identifier}"
}
```

参数说明
1. id：消息ID，用于唯一标识一条消息，由设备端生成，必须保证唯一性。
2. version：消息版本号，目前版本为1.0。
3. params：消息体，消息体中包含了设备上报的事件值，事件值的格式为JSON格式。
4. method：消息类型，目前仅支持thing.service.${tsl.service.identifier}。

#### 1.6.3.2. 应答

1. 应答数据格式：

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
1. code：应答码，200表示成功，其他表示失败。
2. data：应答数据，目前为空。
3. id：消息ID，与请求中的消息ID一致。
4. message：应答消息，目前为空。
5. version：消息版本号，目前版本为1.0

### 1.6.4. 3、网关批量上传事件和属性

#### 1.6.4.1. 请求

1. 请求数据格式：

```json
{
  "id": "123",
  "version": "1.0",
  "model_func_name": "upBatch",
  "model_func_identify": "",
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
1. id：消息ID，用于唯一标识一条消息，由设备端生成，必须保证唯一性。
2. version：消息版本号，目前版本为1.0。
3. sys：系统级参数，目前仅支持ack，ack=0表示不需要应答，ack=1表示需要应答。
4. params：消息体，消息体中包含了设备上报的事件值，事件值的格式为JSON格式。
5. method：消息类型，目前仅支持thing.event.property.pack.post。
6. properties：设备属性值，必须与物模型中定义的属性类型一致。
7. events：设备事件值，必须与物模型中定义的事件类型一致。
8. subDevices：子设备属性值和事件值，必须与物模型中定义的属性类型和事件类型一致。
9. identity：子设备标识，必须与物模型中定义的子设备标识一致。
10. value：属性值或事件值，必须与物模型中定义的属性类型或事件类型一致。
11. time：属性值或事件值的时间戳，单位为秒，可选，如果不携带该字段，则默认为消息发送时间。

#### 1.6.4.2. 响应

1. 响应数据格式：

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
1. code：应答码，200表示成功，其他表示失败。
2. data：应答数据，目前为空。
3. id：消息ID，与请求中的消息ID一致。
4. message：应答消息，目前为空。
5. method：消息类型，目前仅支持thing.event.property.pack.post。
6. version：消息版本号，目前版本为1.0





