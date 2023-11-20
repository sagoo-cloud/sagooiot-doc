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
	"ccpc/events"
	"ccpc/protocol"
	"context"
	"fmt"
	"github.com/gogf/gf/v2/frame/g"
	"github.com/gogf/gf/v2/util/gconv"
	"github.com/sagoo-cloud/iotgateway"
	"github.com/sagoo-cloud/iotgateway/conf"
	"github.com/sagoo-cloud/iotgateway/log"
	"github.com/sagoo-cloud/iotgateway/version"
)

//定义编译时的版本信息
var (
	BuildVersion = "0.0"
	BuildTime    = ""
	CommitID     = ""
)

func main() {

    //显示版本信息
	version.ShowLogo(BuildVersion, BuildTime, CommitID)
	fmt.Println("iotgateway-ccpc start...")

    //读取配置文件
	options := new(conf.GatewayConfig)
	conf, err := g.Cfg().Data(context.Background())
	if err != nil {
		log.Error("读取配置文件失败", err)
		return
	}
	err = gconv.Scan(conf, options)
	if err != nil {
		log.Error("读取配置文件失败", err)
		return
	}


	events.Init() //初始化事件
	//需要解析的协议
	chargeProtocol := protocol.ChargeProtocol{}
	
	//创建网关
	gateway, err := iotgateway.NewGateway(options, &chargeProtocol)
	if err != nil {
		panic(err)
	}
	
	//启动网关
	gateway.Start()

}

```

## 创建协议解析文件

创建一个protocol目录，然后创建一个charge_protocol.go文件，用于实现协议解析的代码。

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
