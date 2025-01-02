---
title: 'MQTT Endpoint'
sidebar_position: 1
hide_title: true
keywords: [规则引擎,MQTT,消息订阅,数据处理,物联网]
description: '详细介绍SagooIOT平台规则引擎中MQTT Endpoint的功能和使用方法，包括连接配置、订阅主题、消息处理等内容，帮助用户实现MQTT消息的接收和处理。'
---


MQTT Endpoint是一个用于创建和管理MQTT服务的组件，它能够订阅多个MQTT主题，并将接收到的消息路由到不同的规则链进行处理。通过灵活的配置，可以实现复杂的消息处理和转发逻辑。

## 基本信息

- **组件类型**: `endpoint/mqtt`
- **功能**: MQTT消息订阅和处理
- **适用场景**: 物联网数据采集、消息订阅、实时数据处理

## 配置说明

### 1. 基本配置
| 字段 | 类型 | 是否必填 | 说明 | 默认值 |
|------|------|----------|------|--------|
| server | string | 是 | MQTT Broker地址 | - |
| username | string | 否 | 用户名 | - |
| password | string | 否 | 密码 | - |
| qOS | int | 否 | 服务质量等级 | 0 |
| cleanSession | bool | 否 | 清除会话 | false |
| clientID | string | 否 | 客户端标识符 | 随机生成 |

### 2. SSL/TLS配置
| 字段 | 类型 | 是否必填 | 说明 | 默认值 |
|------|------|----------|------|--------|
| cAFile | string | 否 | CA证书文件路径 | - |
| certFile | string | 否 | 客户端证书文件路径 | - |
| certKeyFile | string | 否 | 客户端密钥文件路径 | - |

## 使用说明

### 1. 基础配置示例
```json
{
  "type": "endpoint/mqtt",
  "configuration": {
    "server": "127.0.0.1:1883",
    "username": "admin",
    "password": "public",
    "qOS": 1,
    "cleanSession": true
  }
}
```

### 2. 带SSL/TLS的配置示例
```json
{
  "type": "endpoint/mqtt",
  "configuration": {
    "server": "ssl://mqtt.example.com:8883",
    "username": "admin",
    "password": "public",
    "cAFile": "/path/to/ca.pem",
    "certFile": "/path/to/client-cert.pem",
    "certKeyFile": "/path/to/client-key.pem"
  }
}
```

## 消息响应

### 1. 响应配置
通过以下方式设置响应主题：

```go
// 方式1：通过Metadata设置
exchange.Out.GetMsg().Metadata.PutValue("responseTopic", "device.msg.response")

// 方式2：通过Headers设置
exchange.Out.Headers().Add("responseTopic", "device.msg.response")
```

### 2. 响应参数
| 字段 | 类型 | 是否必填 | 说明 | 默认值 |
|------|------|----------|------|--------|
| responseTopic | string | 是 | 响应主题 | - |
| responseQos | int | 否 | 响应QOS等级 | 0 |

## 路由配置

### 1. 主题订阅
- 支持多主题订阅
- 支持通配符主题
- 支持QoS级别设置

### 2. 路由规则
- 可基于主题进行消息路由
- 支持消息过滤和转换
- 可配置多个处理链

## 最佳实践

### 1. 连接管理
- 使用唯一的clientID避免连接冲突
- 根据需求设置合适的QoS级别
- 合理配置cleanSession

### 2. 安全建议
- 生产环境建议启用SSL/TLS
- 使用强密码和证书认证
- 定期更新证书和密钥

### 3. 性能优化
- 合理设置消息质量等级
- 避免频繁的连接断开
- 适当配置消息缓存

## 调试指南

### 1. 连接测试
1. 确认Broker地址可访问
2. 验证认证信息正确
3. 检查SSL/TLS配置

### 2. 订阅测试
1. 确认主题格式正确
2. 验证消息能否正常接收
3. 检查QoS级别是否符合预期

### 3. 常见问题
1. 连接失败
   - 检查网络连接
   - 验证认证信息
   - 确认证书配置

2. 消息接收异常
   - 检查主题订阅
   - 验证消息格式
   - 确认QoS设置

3. 性能问题
   - 优化连接参数
   - 调整QoS级别
   - 检查资源使用

## 注意事项

1. **连接安全**
   - 避免使用默认密码
   - 生产环境启用SSL/TLS
   - 定期更新安全凭证

2. **资源管理**
   - 及时清理无用连接
   - 合理设置会话清理
   - 监控资源使用情况

3. **错误处理**
   - 实现重连机制
   - 添加异常日志
   - 设置超时处理

通过合理配置和使用MQTT Endpoint，您可以实现可靠的消息订阅和处理功能。请根据实际需求选择合适的配置选项，并注意遵循安全和性能优化建议。
