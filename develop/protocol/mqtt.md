
# Sagoo Mqtt协议 

本系统默认的协议是`Sagoo Mqtt协议`,如果设备或者网关消息不满足`Sagoo Mqtt协议`格式要求，可以有以下两种方式处理

1. 按照[插件开发](/develop/plugin/hashicorp)开发好合适的插件，并在`系统管理`->`插件管理` 点击 
   `上传插件ZIP`上传开发好的插件，然后在`物联管理`->`设备管理`->`产品` 新建产品的时候选择对应的消息协议
    ![upload-plugin.png](../../public/imgs/develop/protocol/upload-plugin.png)
    ![select- protocol.png](../../public/imgs/develop/protocol/select-protocol.png)
2. 开发相应的网关，转换私有协议的消息为标准`Sagoo Mqtt协议`的消息按照[MQTT 设备接入](/guide/device_access/mqtt.md)进行接入


## 协议介绍

`Sagoo Mqtt协议` 默认的mqtt传输的消息协议，也是系统内部其他网络服务使用的默认协议，消息为json格式保存。消息的消息协议如下

1. 物物模型相关
   1. 设备上报属性(设备端发起)
      1. 请求:`/sys/${productKey}/${deviceKey}/thing/event/property/post`
      2. 响应:`/sys/${productKey}/${deviceKey}/thing/event/property/post_reply`
   2. 设备上报事件(设备端发起)
      1. 请求:`/sys/${productKey}/${deviceKey}/thing/event/${eventIdentifier}/post`
      2. 响应:`/sys/${productKey}/${deviceKey}/thing/event/${eventIdentifier}/post_reply`
   3. 服务调用(平台侧发起)
      1. 请求:`/sys/${productKey}/${deviceKey}/thing/service/${tsl.service.identifier}`
      2. 响应:`/sys/${productKey}/${deviceKey}/thing/service/${tsl.service.identifier}_reply`
   4. 网关批量上传事件和属性(网关发起)
      1. 请求:`/sys/${productKey}/${deviceKey}/thing/event/property/pack/post`
      2. 响应:`/sys/${productKey}/${deviceKey}/thing/event/property/pack/post`
2. OTA相关
   1. 上报ota相关信息(设备端发起)
      1. 请求:`/ota/device/inform/${productKey}/${deviceKey}`
   2. 推送ota升级包(平台侧发起)
      1. 请求:`/ota/device/upgrade/${productKey}/${deviceKey}`
   3. 上报升级进度信息(设备端发起)
      1. 请求:`/ota/device/progress/${productKey}/${deviceKey}`
   4. 设备请求OTA升级包信息(设备端发起)
      1. 请求:`/sys/${productKey}/${deviceName}/thing/ota/firmware/get`
      2. 响应:`/sys/${productKey}/${deviceName}/thing/ota/firmware/get_reply`
   5. 设备请求下载文件分片(设备端发起)
      1. 请求 `/sys/${productKey}/${deviceName}/thing/file/download`
      2. 响应 `/sys/${productKey}/${deviceName}/thing/file/download_reply`

## 物物模型相关
### 设备上报属性

#### 请求

1. 请求Topic: `/sys/${productKey}/${deviceKey}/thing/event/property/post`
2. 请求数据格式: 
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

1. id: 消息ID，用于唯一标识一条消息，由设备端生成，必须保证唯一性。
2. version: 消息版本号，目前版本为1.0。
3. sys: 系统级参数，目前仅支持ack，ack=0表示不需要应答，ack=1表示需要应答。
4. params: 消息体，消息体中包含了设备上报的属性值，属性值的格式为JSON格式。
5. method: 消息类型，目前仅支持thing.event.property.post。
6. Power: 属性名称，必须与物模型中定义的属性名称一致。
7. value: 属性值，必须与物模型中定义的属性类型一致。
8. time: 属性值的时间戳，单位为秒，可选，如果不携带该字段，则默认为消息发送时间。

#### 应答

1. 应答Topic: `/sys/${productKey}/${deviceKey}/thing/event/property/post_reply`
2. 应答数据格式: 

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

### 设备上报事件

#### 请求

1. 请求Topic: `/sys/${productKey}/${deviceKey}/thing/event/${eventIdentifier}/post`
2. 请求数据格式: 

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
5. method: 消息类型，目前仅支持thing.event.${tsl.event.identifier}.post。
6. value: 事件值，必须与物模型中定义的事件类型一致。
7. time: 事件值的时间戳，单位为秒，可选，如果不携带该字段，则默认为消息发送时间。

#### 应答

1. 应答Topic: `/sys/${productKey}/${deviceKey}/thing/event/${eventIdentifier}/post_reply`
2. 请求数据格式: 

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
5. method: 消息类型，目前仅支持thing.event.${tsl.event.identifier}.post。
6. version: 消息版本号，目前版本为1.0

### 服务调用

#### 请求

1. 请求Topic: /sys/${productKey}/${deviceKey}/thing/service/${tsl.service.identifier}`
2. 请求数据格式: 

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
4. method: 消息类型，目前仅支持thing.service.${tsl.service.identifier}。

#### 应答

1. 应答Topic: `/sys/${productKey}/${deviceKey}/thing/service/${tsl.service.identifier}_reply`
2. 应答数据格式: 

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

### 网关批量上传事件和属性

#### 请求

1. 请求Topic: `/sys/${productKey}/${deviceKey}/thing/event/property/pack/post`
2. 请求数据格式: 

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

#### 响应

1. 响应Topic: `/sys/${productKey}/${deviceKey}/thing/event/property/pack/post`
2. 响应数据格式: 

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

## OTA相关

### 上报ota相关信息

#### 请求

1. 请求Topic: `/ota/device/inform/${productKey}/${deviceKey}`
2. 请求数据格式: 

```json
{
    "id": "123",
    "params": {
        "version": "1.0.1",
        "module": "MCU"
    }
}
```

字段说明
1. id: 消息ID，用于唯一标识一条消息，由设备端生成，必须保证唯一性。类型为字符串
2. version: OTA模块版本，类型为字符串
3. module: OTA模块名称，类型为字符串



###  推送ota升级包

#### 请求

1. 请求Topic: `/ota/device/upgrade/${productKey}/${deviceKey}`
2. 请求数据格式: 
   1. 升级包为https
      ```json
      {
          "code": "1000",
          "data": {
              "size": 432945,
              "version": "2.0.0",
              "isDiff": 1,
              "url": "https://***/nop***.tar.gz?Expires=1502955804&OSSAccessKeyId=***&Signature=XfgJu7P6DW***qAKU%3D&security-token=***Tz2IHtIf3***",
              "md5": "93230c3bde425a9d***",
              "digestsign":"A4WOP***SYHJ6DDDJD9***",
              "sign": "93230c3bde425a9d***",
              "signMethod": "MD5",
              "module": "MCU",
              "extData":{
                  "key1":"value1",
                  "key2":"value2",
                  "_package_udi":"{\"ota_notice\":\"升级底层摄像头驱动，解决视频图像模糊的问题。\"}"
              }
          },
          "id": 1626969597470,
          "message": "success"
      }
      ```
   2. 字段说明
      1. code: 应答码，200表示成功，其他表示失败。
      2. id: 消息ID，每个请求唯一
      3. message: 结果信息
      4. version: 设备升级包的版本信息
      5. isDiff: 仅当升级包类型为差分时，消息包含此参数。取值为1，表示仅包含新版本升级包与之前版本的差异部分，需要设备进行差分还原
      6. url: 升级包下载地址，类型为字符串,OTA升级包中仅有一个升级包文件，且下载协议为HTTPS时，包含该参数。
      7. md5: 当签名方法为MD5时，除了会给sign赋值外还会给md5赋值。OTA升级包中仅有一个升级包文件时，包含该参数
      8. sign: 	OTA升级包文件的签名。OTA升级包中仅有一个升级包文件时，包含该参数。
      9.  signMethod: 签名方法。取值：SHA256 MD5 对于Android差分升级包类型，仅支持MD5签名方法。
      10. module: 升级包所属的模块名。模块名为default时，物联网平台不下发module参数。
      11. extData: 扩展数据，类型为json字符串,升级批次标签列表和推送给设备的自定义信息。_package_udi表示自定义信息的字段。单个标签格式："key":"value"
      12. dProtocol: 升级包传输协议，类型为字符串,仅升级包下载协议为MQTT时，包含该参数.
      13. digestsign: OTA升级包文件安全升级后的签名。仅当OTA升级包开启安全升级功能，才有此参数


### 上报升级进度信息

#### 请求

1. 请求Topic: `/ota/device/progress/${productKey}/${deviceKey}`
2. 请求数据格式: 
```
{
    "id": "123",
    "params": {
        "step": "-1",
        "desc": "OTA升级失败，请求不到升级包信息。",
        "module": "MCU"
    }
}
```
字段说明

1. id: 消息ID，用于唯一标识一条消息，由设备端生成，必须保证唯一性。类型为字符串
2. step: OTA升级进度，类型为字符串.取值范围如下
   1. 1~100的整数：升级进度百分比。
   2. -1：升级失败。
   3. -2：下载失败。
   4. -3：校验失败。
   5. -4：烧写失败。
3. desc: 升级描述，类型为字符串，长度不超过128个字符。如果发生异常，此字段可承载错误信息。
4. module: OTA模块名称，类型为字符串


