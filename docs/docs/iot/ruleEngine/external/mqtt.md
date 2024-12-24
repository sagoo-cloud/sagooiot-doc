---
title: 'MQTT客户端'
sidebar_position: 2
hide_title: true
keywords: [规则引擎,MQTT,消息队列,物联网]
description: '详细介绍SagooIOT平台规则引擎中MQTT客户端节点的功能和使用方法，包括MQTT连接配置、消息发布、QoS设置等内容，帮助用户实现MQTT消息发布功能。'
---


MQTT客户端节点是一个用于发布消息到MQTT Broker的组件。它支持QoS设置、SSL/TLS加密连接、断线重连等功能，可以将消息负载发布到指定的MQTT主题。该组件会将`msg.Data`作为消息内容发送到目标主题。

## 基本信息

- **组件类型**: `mqttClient`
- **功能**: 发布消息到MQTT Broker
- **支持特性**: QoS设置、SSL/TLS加密、断线重连

## 配置说明

### 1. 基本配置
| 字段 | 类型 | 必填 | 说明 | 默认值 |
|------|------|------|------|--------|
| topic | string | 是 | 发布主题 | /device/msg |
| server | string | 是 | MQTT Broker地址(host:port) | 127.0.0.1:1883 |
| username | string | 否 | MQTT认证用户名 | - |
| password | string | 否 | MQTT认证密码 | - |
| maxReconnectInterval | int | 否 | 断线重连间隔(秒) | 60 |
| qos | uint8 | 否 | 消息质量等级(0/1/2) | 0 |
| cleanSession | bool | 否 | 是否清除会话 | false |
| clientID | string | 否 | 客户端标识 | 随机生成 |

### 2. SSL/TLS配置
| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| caFile | string | 否* | CA证书文件路径 |
| certFile | string | 否* | 客户端证书文件路径 |
| certKeyFile | string | 否* | 客户端私钥文件路径 |

*注：启用SSL/TLS时必填

## 功能特性

### 1. 消息发布
- 支持发布消息到指定主题
- 支持QoS 0/1/2三种质量等级
- 支持消息持久化(QoS > 0)

### 2. 连接管理
- 自动重连机制
- 可配置重连间隔
- 支持清除会话选项

### 3. 安全特性
- 用户名密码认证
- SSL/TLS加密连接
- 客户端证书认证

### 4. 变量支持
- 主题支持变量替换
- 支持使用`${metadata.key}`格式引用元数据
- 支持使用`${msg.key}`格式引用消息数据

## 使用示例

### 1. 基础配置示例
```json
{
  "id": "mqtt_pub_1",
  "type": "mqttClient",
  "name": "发布温度数据",
  "configuration": {
    "server": "127.0.0.1:1883",
    "topic": "/device/temperature",
    "qos": 1,
    "cleanSession": true
  }
}
```

### 2. 带认证的配置示例
```json
{
  "id": "mqtt_pub_2",
  "type": "mqttClient",
  "name": "发布设备状态",
  "configuration": {
    "server": "mqtt.example.com:8883",
    "topic": "/device/${metadata.deviceId}/status",
    "username": "device1",
    "password": "secret",
    "qos": 2,
    "clientID": "device_001"
  }
}
```

### 3. SSL/TLS配置示例
```json
{
  "id": "mqtt_pub_3",
  "type": "mqttClient",
  "name": "安全发布",
  "configuration": {
    "server": "mqtt.example.com:8883",
    "topic": "/secure/data",
    "caFile": "/path/to/ca.crt",
    "certFile": "/path/to/client.crt",
    "certKeyFile": "/path/to/client.key",
    "qos": 1
  }
}
```

## 执行结果

### 1. 成功场景
- 消息成功发布时，原始消息不变
- QoS 0消息：发送完成即视为成功
- QoS 1/2消息：收到确认后视为成功

### 2. 失败场景
消息发送失败时：
- 在metadata中添加error字段描述错误原因
- 原始msg.Data保持不变
- 消息被发送到Failure链路

## 最佳实践

### 1. 连接管理
- 使用有意义的clientID便于问题排查
- 合理设置重连间隔避免频繁重连
- 需要会话保持时设置cleanSession为false

### 2. QoS选择
- QoS 0：适用于允许丢失的非关键数据
- QoS 1：适用于需要至少一次送达的重要数据
- QoS 2：适用于需要精确一次送达的关键数据

### 3. 安全建议
- 生产环境建议启用SSL/TLS
- 使用复杂密码和唯一的clientID
- 定期更新证书和密钥

## 注意事项

1. **安全性**
   - 避免在配置中明文存储敏感信息
   - 生产环境建议使用SSL/TLS
   - 定期更换密码和证书

2. **性能优化**
   - 合理选择QoS级别
   - 避免过于频繁的重连
   - 控制消息大小

3. **故障处理**
   - 实现错误重试机制
   - 监控连接状态
   - 记录关键操作日志

通过合理配置和使用MQTT客户端节点，您可以实现可靠的消息发布功能。请根据实际需求选择合适的配置选项，并注意遵循安全和性能优化建议。
