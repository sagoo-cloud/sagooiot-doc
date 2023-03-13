# MQTT 开发

在本系统中所有的设备都是通过MQTT进行接入的。不同的协议可以通过插件的扩充进行转换。


**设备上报数据如下：**

## 流程

1. 创建好物物模型
2. 创建好产品，关联下面属性
    1. 上面创建好的物物模型
    2. 并且选择好自定义协议，如果是默认的数据结构，则留空
    3. 选择支持的网络协议(`mqtt`,`tcp`,`udp`)
        1. `mqtt`
            1. 获取上报的`mqtt`地址,数据上报`topic`为 `device/{productKey}/{deviceKey}`
            2. 默认的数据结构格式如下
               ```json
               {
                 "return_time": "",
                 "data_type": "",
                 "device_key": "",
                 "data": {
                   "key": {}
                 }
               }
               ```
                1. `return_time` 上报时间，时间为时间戳，单位为毫秒
                2. `data_type` 上报数据类型，目前仅仅支持下面的几种
                    1. `property_report`
                3. `device_key` 设备key，字符串类型
                4. `data` 为上报的数据，对应的value是kv格式的信息
        2. `tcp`,`udp`
            1. 产品信息配置好心跳包，注册包



## mqtt

流程图


### 设备相关topic及数据上报

设备上报数据全部走统一的topic `device/{productKey}/{deviceKey}`，类型通过数据结构里面的 `data_type` 来进行区分

### DataBus(内部)相关topic&结构体简介

1. 所有设备消息的topic的前缀均为: device/{productKey}/{deviceKey}. 下面topic已经省略，写的时候请加上
   如:产品product-1下的设备device-1上线消息:device/product-1/device-1/online.
2. 可通过通配符订阅所有设备的指定消息,如:device/*/*/online,或者订阅所有消息:device/**. 使用通配符订阅可能将收到大量的消息,请保证消息的处理速度,否则会影响系统消息吞吐量.

| topic                                              | topic说明                      |
|:---------------------------------------------------|:-----------------------------|
| /online                                            | 设备在线                         |
| /offline                                           | 设备离线                         |
| /message/event/{eventId}                           | 事件消息                         |
| /message/property/report                           | 属性上报                         |
| /message/send/property/read                        | 服务端主动下发读取属性值                 |
| /message/property/read/reply                       | 设备端响应服务端读属性值                 |
| /message/send/property/write                       | 服务端主动下发设置属性                  |
| /message/property/write/reply                      | 设备端响应下发设置属性                  |
| /message/send/function                             | 服务端方法调用消息                    |
| /message/function/reply                            | 设备端响应方法调用                    |
| /register                                          | 设备注册                         |
| /unregister                                        | 设备解除注册                       |
| /message/children/{childrenDeviceId}/{topic}       | 服务端子设备消息下发                   |
| /message/children/reply/{childrenDeviceId}/{topic} | 子设备消息响应                      |
| /message/direct                                    | 透传消息                         |
| /message/tags/update                               | 更新标签消息                       |
| /firmware/pull                                     | 拉取固件请求 (设备->平台)              |
| /firmware/pull/reply                               | 拉取固件请求回复 (平台->设备)            |
| /firmware/push                               | 推送固件更新                       |
| /firmware/push/reply                               | 固件更新回复                       |
| /firmware/report                                   | 上报固件信息                       |
| /firmware/progress                                 | 上报更新固件进度                     |
| /message/log                                       | 设备日志                         |
| /metadata/derived                                  | 更新物模型                        |

#### DataBus消息

##### 消息定义

平台统一消息基本于物模型中的定义，主要有`属性(property)`，`功能(function)`，`事件(event)`几大类组成

##### 消息组成

1. 消息主要由`deviceKey`,`messageId`,`headers`,`timestamp组成`. `deviceKey`为设备的唯一标识,`messageId`
   为消息的唯一标识,`headers`为消息头,
   通常用于对自定义消息处理的行为,如是否异步消息, 是否分片消息等
2. 字段的类型
    1. bool
    2. int 实际为int32类型
    3. long 实际为int64类型
    4. float 实际为float32
    5. float64
    6. string
    7. timestamp int64类型，时间戳，单位为毫秒，
    8. any 这个类型为golang专属的类型，类似java中object的概念
3. 需要注意的点
    1. messageId通常由平台自动生成,如果设备不支持消息id,可在自定义协议中通过Map的方式来做映射,将设备返回的消息与平台的messageId进行绑定。
    2. 分片消息指，设备将一个请求的结果分片返回。通常用于处理大消息。

###### header

```go
	Header struct {
		Async                    bool `json:"async" desc:"是否异步"`
		Timeout                  int  `json:"timeout" desc:"超时时间，单位为毫秒"`
		FragMsgId                int  `json:"fragMsgId" desc:"分片主消息ID，为平台下发消息时的消息ID（messageId"`
		FragNum                  int  `json:"fragNum" desc:"分片总数"`
		FragPart                 int  `json:"fragPart" desc:"当前分片索引"`
		FragLast                 int  `json:"fragLast" desc:"是否为最后一个分片。当无法确定分片数量的时候，可以将分片设置到足够大，最后一个分片设置frag_last=true来完成返回。"`
		KeepOnline               int  `json:"keepOnline" desc:"与DeviceOnlineMessage配合使用,在TCP短链接,保持设备一直在线状态,连接断开不会设置设备离线."`
		KeepOnlineTimeoutSeconds int  `json:"keepOnlineTimeoutSeconds" desc:"指定在线超时时间。在短链接时，如果超过此间隔没有收到消息则认为设备离线。"`
		IgnoreStorage            int  `json:"ignoreStorage" desc:"不存储此消息数据。如：读写属性回复默认也会记录到属性时序数据库中，设置为true后，将不记录。"`
		IgnoreLog                bool `json:"ignoreLog" desc:"不记录此消息的日志。如：设置为true，将不记录此消息的日志。"`
		MergeLatest              bool `json:"mergeLatest" desc:"是否合并最新属性数据。设置此消息头后，将会把最新的消息合并到消息体里（需要开启最新数据存储。"`
	}
	Common struct {
		H         Header
		DeviceKey  string
		MessageId string
		Timestamp int64
	}

```

###### 属性相关消息

1. 获取设备属性(ReadPropertyMessage)对应设备回复的消息ReadPropertyMessageReply
2. 修改设备属性(WritePropertyMessage)对应设备回复的消息WritePropertyMessageReply
3. 设备上报属性(ReportPropertyMessage) 由设备上报

```go
// 读取属性的消息结构体
type (
	ReadPropertyMessage struct {
		Common
		Properties []string //多个属性的key
	}
	ReadPropertyMessageReply struct {
		Common
		Success    bool
		Properties map[string]any //多个属性的键值对
	}
)

// 写属性消息结构体
type (
	WritePropertyMessage struct {
		Common
		Properties map[string]any//多个属性的键值对
	}

	WritePropertyMessageReply struct {
		Common
		Success    bool
		Properties map[string]any//多个属性的键值对的最新值
	}

	ReportPropertyMessage struct {
		Common
		Properties map[string]any//多个属性当前值对应的键值对
	}
)
```

###### 功能消息

```go
// 功能消息结构体
type (
	FunctionParameter struct {
		Name  string
		Value any
	}
	FunctionInvokeMessage struct {
		Common
		FunctionId string
		Inputs     []FunctionParameter
	}
	FunctionInvokeMessageReply struct {
		Common
		Success bool
		Output  any // 输出值,需要与元数据定义中的类型一致
	}
)
```

###### 事件消息

```go

type (
   EventMessage struct {
   H         Header
   Event     string
   Data      any//与元数据中定义的类型一致,如果是对象类型,请转为java.util.HashMap,禁止使用自定义类型.
   Timestamp int64
   }
)
```

###### 其他消息

```go
// 设备上线下线结构体
type (
   Message any
   DeviceOnlineMessage struct {
      DeviceKey  string
      Timestamp int64
   }

   DeviceOfflineMessage struct {
      DeviceKey  string
      Timestamp int64
   }
)

// 子设备消息结构体
type (
   ChildDeviceMessage struct {
	   DeviceKey           string
      Timestamp          int64
      ChildDeviceKey      string
      ChildDeviceMessage Message//子设备消息
   }

   ChildDeviceMessageReply struct {
      DeviceKey           string
      MessageId          string
      ChildDeviceKey      string
      ChildDeviceMessage Message
   }
)

// 设备元信息相关结构体
type (
   UpdateTagMessage struct {
      DeviceKey  string
      Timestamp int64
      tags      map[string]any
   }

   DerivedMetadataMessage struct {
      DeviceKey  string
      Timestamp int64
      Metadata  string
      All       bool
   }
)

type (
   DeviceRegisterMessage struct {
      DeviceKey  string
      Timestamp int64
   }
)

// 更新相关消息结构体
type (
   UpgradeFirmwareMessage struct {
      DeviceKey   string
      Timestamp  int64
      Url        string //固件下载地址
      Version    string//固件版本
      Parameters map[string]any//其他参数
      Sign       string//签名
      SignMethod string//签名方式,md5,sha256
      FirmwareId string //固件ID
      Size       float64//固件大小
   }
   UpgradeFirmwareMessageReply struct {
      DeviceKey  string
      Timestamp int64
      Success   bool
   }

   UpgradeFirmwareProgressMessage struct {
      DeviceKey    string
      Progress    int//进度0-100
      Complete    bool//是否已完成
      Version     string//升级中的固件版本
      Success     bool//是否成功
      ErrorReason string//错误原因
      FirmwareId  string//固件ID
   }
)

```


