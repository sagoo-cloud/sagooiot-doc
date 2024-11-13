---
sidebar_position: 12
---
# CoAP 协议

`Sagoo CoAP协议`是基于`CoAP`协议的一种数据交换规范，用于设备端和物联网平台的双向通信。规范了设备端和物联网平台之间的业务数据交互。

## 认证鉴权
在SagooIoT平台中，CoAP协议的认证鉴权方式有两种：无认证鉴权和Token认证鉴权。

### 无认证鉴权
无认证鉴权方式下，设备端可以直接通过CoAP协议与SagooIoT平台进行通信，无需进行认证鉴权。

### Token认证鉴权
SagooIoT的Token认证鉴权方式是采用的PSK的方式。PSK（Pre-Shared Key）:
PSK是一种使用预先共享的秘密密钥进行加密和认证的方法。在通信开始之前，双方必须事先商定一个密钥，并且在DTLS握手过程中使用这个密钥来加密和验证消息。

在SagooIoT平台中创建CoAP服务的时候，选择Token认证鉴权方式，会生成一个密钥，设备端需要在CoAP请求的Option中添加PSK字段，值为生成的密钥。

如go程序的客户：
```go
	psk := []byte("235689") // 约定的访问密钥
	co, err := dtls.Dial("localhost:5688", &piondtls.Config{
		PSK: func(hint []byte) ([]byte, error) {
			fmt.Printf("Server's hint: %s \n", hint)
			return psk, nil
		},
		PSKIdentityHint: []byte("Pion DTLS Client"),
		CipherSuites:    []piondtls.CipherSuiteID{piondtls.TLS_PSK_WITH_AES_128_CCM_8},
	})

```

## 协议接口列表

上报属性数据：`${productKey}/${devicekey}/property/post`

上报事件数据：`${productKey}/${devicekey}/event/${tsl.event.identifier}`

**注意：** 将上面的`${productKey}`产品标识、`${devicekey}`设备标识、`${tsl.event.identifier}`事件名称替换为实际的值。

## 数据格式
请参阅[Sagoo-Mqtt](mqtt.md)协议格式
