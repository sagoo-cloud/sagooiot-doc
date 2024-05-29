# 云网关开发
云网关是一个独立的服务，可以部署在云端，也可以部署在本地，主要用于解决个性化设备接入的协议解析、设备接入平台的统一管理、设备接入的安全性等问题。
通过开发云网关，可以快速的实现接入各种不同协议的设备，也方便进行大规模设备的接入。

我们开放了云网关的SDK，你只需要编写基础的协议解析代码，就可以快速的实现设备的接入，而不需要关心底层的通信协议，也不需要关心设备接入平台的管理。

## 云网关SDK

创建一个独立的网关项目，并引入SagooIOT云网关的SDK，然后实现协议解析的代码。


```go
    go get -u github.com/sagoo-cloud/iotgateway
```


## 创建main.go文件

```go

package main

import (
	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/os/gctx"
	"github.com/gogf/gf/v2/os/glog"
	"github.com/sagoo-cloud/iotgateway"
	"github.com/sagoo-cloud/iotgateway/version"
	"sagoo-modbus-gateway/events"
	"sagoo-modbus-gateway/modbus"
)

// 定义编译时的版本信息
var (
	BuildVersion = "0.0"
	BuildTime    = ""
	CommitID     = ""
)

func main() {
	glog.SetDefaultLogger(g.Log())
	//显示版本信息
	version.ShowLogo(BuildVersion, BuildTime, CommitID)
	ctx := gctx.GetInitCtx()

    //需要解析的协议
	chargeProtocol := protocol.ChargeProtocol{}
	
	//创建网关
	gateway, err := iotgateway.NewGateway(ctx, chargeProtocol)
	if err != nil {
		panic(err)
	}

	events.Init()                     //初始化事件

	//启动网关
	gateway.Start()

}

```
## 网关配置文件

在网关工程的config目录下创建一个gateway.toml文件，用于配置网关的相关信息。

```yaml
server:
  name: "sagooiot-modbus"
  addr: ":8198" # 服务于服务监听地址，格式为: ":port"
  netType: "mqtt" # 支持mqtt、tcp、udp 三种服务类型，mqtt为默认服务类型
  duration: 20 # 网关服务心跳间隔，单位秒
  productKey: "sagoo-modbus202405"   # 网关产品标识，用于区分不同的网关产品
  deviceKey: "modbus20240517"   # 网关实例标识，用于区分不同的网关实例，每个部署的网关实例必须唯一，用于在平台上添加这个网关设备标识
  deviceName: "sagoo-modbus网关系统"   # 网关系统名称
  description: "modbus数据采集云网关系统"   # 网关系统描述
  deviceType: "modbus"   # 网关系统类型
  manufacturer: "sagoo.dn"   # 网关系统厂商
  version: "1.0.0"  # 网关系统版本
  deviceConfigFile: "config/devices" # 设备配置文件路径

# MQTT Server.
mqtt:
  address: 127.0.0.1:1883
  clientId: sagoo-modbus-gateway202405    # 客户端id，注意：MQTT使用过种客户端id不能重复
  keepAliveDuration: 30 # mqtt心跳超时时间，单位秒
  qos: 1 # 服务质量
  auth:
    userName: "xinjy"
    passWord: "123456"
  clientCertificate: # 客户端证书配置
    ca: "" # 如果采用证书双向认证，必须填 Client 连接Hub的CA证书路径
    key: "" # 如果采用证书双向认证，必须填 Client 连接Hub的客户端私钥路径
    cert: "" # 如果采用证书双向认证，必须填 Client 连接Hub的客户端公钥路径

logger:
  path:                  "log/"           # 日志文件路径。默认为空，表示关闭，仅输出到终端
  file:                  "{Y-m-d}.log"         # 日志文件格式。默认为"{Y-m-d}.log"
  prefix:                ""                    # 日志内容输出前缀。默认为空
  level:                 "all"                 # 日志输出级别:all > debug > info > warn > error 生成环境建议使用info
  timeFormat:            "2006-01-02T15:04:05" # 自定义日志输出的时间格式，使用Golang标准的时间格式配置
  ctxKeys:               []                    # 自定义Context上下文变量名称，自动打印Context的变量到日志中。默认为空
  header:                true                  # 是否打印日志的头信息。默认true
  stdout:                true                  # 日志是否同时输出到终端。默认true

```


## 创建协议解析文件

创建一个protocol目录，然后创建一个chargeProtocol.go文件，用于实现协议解析的代码。

实现protocol接口处理接收到的数据。在Decode方法中，需要将接收到的数据进行解析，然后返回解析后的数据。在Encode方法中，需要将需要发送的数据进行编码，然后返回编码后的数据。

```go

type ChargeProtocol struct {
}

func (c *ChargeProtocol) Encode(args []byte) (res []byte, err error) {
	return args, nil
}

func (c *ChargeProtocol) Decode(conn net.Conn, buffer []byte) (res []byte, err error) {
    return buffer, nil
}   

```

## 推送数据处理

在需要推送数据的地方准备好事件相关数据，然后触发推送事件。

**事件数据上报：**

触发的是 `consts.PushAttributeDataToMQTT` 事件


```go

	//定义事件返回数据
	var eventData = make(map[string]interface{})
	eventData["XXX字段1"] = "XXX值1"
	eventData["XXX字段2"] = "XXX值2"

	var eventDataList = make(map[string]interface{})
	eventDataList["XXX事件标识字串"] = eventData


	//推送数据到mqtt
	out := g.Map{
		"DeviceKey":     deviceKey,
		"EventDataList": eventDataList,
	}

	//触发向MQTT服务推送数据事件
	event.MustFire(consts.PushAttributeDataToMQTT, out) 

```
**属性数据上报**

触发的是 `consts.PushAttributeDataToMQTT` 事件

```go

	var propertieData = make(map[string]interface{})
	propertieData["XXX字段1"] = "XXX值1"
	propertieData["XXX字段2"] = "XXX值2"
	
	//推送数据
	out := g.Map{
		"DeviceKey":     deviceKey,
		"PropertieDataList": propertieData,
	}
	event.MustFire(consts.PushAttributeDataToMQTT, out)

```

由SagooIOT平台端下发后回复：
触发的是 `consts.PushServiceResDataToMQTT` 事件

```go
			var replyData = make(map[string]interface{})
            replyData["XXX字段1"] = "XXX值1"
            replyData["XXX字段2"] = "XXX值1"
			outData := g.Map{
				"DeviceKey": deviceKey,
				"ReplyData": replyData,
			}
			event.MustFire(consts.PushServiceResDataToMQTT, outData)
```
