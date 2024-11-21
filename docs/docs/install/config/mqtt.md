---
title: "MQTT配置"
sidebar_position: 2
hide_title: true
---

## 配置参考

在配置文件中找到`mqtt:`根据实际情况修改配置。

```yaml

# 这个mqtt客户端主要是服务端内部处理消息使用的通道
mqtt:
mqttAppName: "sagoomqtt" # mqtt应用名称,用于区分不同的应用: sagoomqtt、emqx、coolpy7
addr: 127.0.0.1:1883
# 最好带上服务名称，变成唯一id
clientId: sagooiot20230918
deviceLiveDuration: 60 // 设备心跳时间
qos: 1 // 消息质量
auth:
userName: xinjy
userPassWord: 123456
```

## 配置说明

SagooIoT 系统自带了MQTT服务，如果需要第三方的MQTT服务，可以在配置文件中修改`mqttAppName`配置项。如： `sagoomqtt`、`emqx`、`coolpy7`


