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
    sharedSubscribe: false #是否启用共享订阅,如果不设置，默认false
    qos: 1 // 消息质量
    auth:
        userName: xinjy
        userPassWord: 123456
```

## SagooIoT内置MQTT服务配置

如果使用SagooIoT内置的MQTT服务，可以在配置文件中修改`mqttAppName`配置项为`sagoomqtt`。默认情况下，SagooIoT内置的MQTT服务会监听`addr`端口的设置。

也可以对SagooIoT内置的MQTT服务进行更多的配置，如下：

```yaml
mqtt:
  sagooMQTT:
    listeners:
      - type: "tcp"
        id: "file-tcp1"
        address: ":1883"
      - type: "ws"
        id: "file-websocket"
        address: ":1882"
      - type: "healthcheck"
        id: "file-healthcheck"
        address: ":1880"
    options:
      client_net_write_buffer_size: 2048 #客户端网络写缓冲区大小
      client_net_read_buffer_size: 2048 #客户端网络读缓冲区大小
      sys_topic_resend_interval: 10 #系统主题重发间隔
      inline_client: true #内联客户端
      capabilities:
        maximum_message_expiry_interval: 100 #最大消息过期时间
        maximum_client_writes_pending: 8192 #最大客户端写入挂起
        maximum_session_expiry_interval: 86400 #最大会话过期时间
        maximum_packet_size: 0 #最大包大小，0表示不限制
        receive_maximum: 1024 #接收最大
        maximum_inflight: 8192 #最大飞行
        topic_alias_maximum: 65535 #主题别名最大
        shared_sub_available: 1 #共享订阅可用
        minimum_protocol_version: 3 #最小协议版本
        maximum_qos: 2 #最大qos
        retain_available: 1 #保留可用，0表示不可用
        wildcard_sub_available: 1 #通配符订阅可用，0表示不可用
        sub_id_available: 1 #订阅id可用，0表示不可用
        compatibilities:
          obscure_not_authorized: true #模糊不授权
          passive_client_disconnect: false #被动客户端断开
          always_return_response_info: false #总是返回响应信息
          restore_sys_info_on_restart: false #重启时恢复系统信息
          no_inherited_properties_on_ack: false #确认时不继承属性
    logging:
      level: INFO

```

## 配置说明

SagooIoT 系统自带了MQTT服务，如果需要第三方的MQTT服务，可以在配置文件中修改`mqttAppName`配置项。如： `sagoomqtt`、`emqx`、`coolpy7`


## MQTT设备在线离线监听

SagooIoT 通过订阅 `$SYS/brokers/+/clients/+/connected` 和 `$SYS/brokers/+/clients/+/disconnected` 两个主题来监听设备的上线与离线状态。为确保 MQTT 客户端能够正常订阅这些主题，需配置 ACL（访问控制列表）以允许对 `$SYS` 主题的订阅权限。


## 共享订阅配置
共享订阅允许 SagooIoT 平台以「多节点并行、单消息仅一次」的方式消费同一批设备数据，实现高并发、高可用、弹性伸缩。  
订阅主题格式：`$share/sagooiot/<topicFilter>`  

SagooIoT 支持 MQTT 5.0 的共享订阅功能。可以在配置文件中设置共享订阅的相关参数，在主程序配置文件中mqtt配置下增加`sharedSubscribe: false #是否启用共享订阅,如果不设置，默认false`，以启用或禁用共享订阅。

### Broker 支持要求
| 要求项 | 推荐配置 | 备注 |
|---|---|---|
| Broker 类型 | EMQX ≥ 5.x、HiveMQ ≥ 4.9、VerneMQ ≥ 1.12、Mosquitto ≥ 2.0 | 需明确开启共享订阅插件或特性 |
| MQTT 协议 | v5（向后兼容 v3.1.1 扩展） | 客户端需协商到 v5 以使用全部语义 |
| QoS 支持 | 0/1/2 全部支持 | QoS>0 时 Broker 需保留离线队列 |
| ACL 权限 | 主题通配符需包含 `$share/%u/<topicFilter>` | 防止订阅权限被拒绝 |


### 性能与容量建议
| 指标 | 建议值 | 说明 |
|---|---|---|
| 离线消息 TTL | 5 min | 过长会占用磁盘，过短易丢重发消息 |

