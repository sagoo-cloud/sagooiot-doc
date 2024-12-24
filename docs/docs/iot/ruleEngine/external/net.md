---
title: 'TCP/UDP客户端'
sidebar_position: 4
hide_title: true
keywords: [规则引擎,TCP,UDP,网络协议,Socket]
description: '详细介绍SagooIOT平台规则引擎中TCP/UDP客户端节点的功能和使用方法，包括网络协议配置、连接管理、心跳机制等内容，帮助用户实现网络通信功能。'
---


TCP/UDP客户端节点是一个用于网络通信的组件，支持多种网络协议，包括TCP、UDP、IPv4、IPv6、Unix Socket等。该组件可以将消息发送到指定的网络服务器，并支持自动重连和心跳保活机制。

## 基本信息

- **组件类型**: `net`
- **功能**: 发送数据到网络服务器
- **支持协议**: TCP、UDP、IPv4、IPv6、Unix Socket等

## 支持的协议类型

| 协议类型 | 说明 | 示例地址格式 |
|---------|------|-------------|
| tcp | TCP协议 | 127.0.0.1:8080 |
| udp | UDP协议 | 127.0.0.1:8081 |
| ip4:1 | IPv4 ICMP协议 | 127.0.0.1 |
| ip6:ipv6-icmp | IPv6 ICMP协议 | ::1 |
| ip6:58 | IPv6 ICMPv6协议 | ::1 |
| unix | Unix域套接字 | /tmp/test.sock |
| unixgram | Unix数据报套接字 | /tmp/test.sock |

## 配置说明

### 1. 基本配置
| 字段 | 类型 | 必填 | 说明 | 默认值 |
|------|------|------|------|--------|
| protocol | string | 是 | 网络协议类型 | tcp |
| server | string | 是 | 服务器地址(host:port) | - |
| connectTimeout | int | 否 | 连接超时时间(秒) | 60 |
| heartbeatInterval | int | 否 | 心跳间隔时间(秒) | 60 |

## 功能特性

### 1. 连接管理
- 自动建立连接
- 断线自动重连
- 连接超时控制
- 心跳保活机制

### 2. 数据传输
- 自动添加消息结束符
- 支持多种协议类型
- 异步发送数据
- 错误重试机制

### 3. 心跳机制
- 可配置心跳间隔
- 自动发送心跳包
- 连接状态监测
- 断线重连处理

## 使用示例

### 1. TCP客户端配置
```json
{
  "id": "tcp_client_1",
  "type": "net",
  "name": "TCP发送器",
  "configuration": {
    "protocol": "tcp",
    "server": "127.0.0.1:8080",
    "connectTimeout": 30,
    "heartbeatInterval": 60
  }
}
```

### 2. UDP客户端配置
```json
{
  "id": "udp_client_1",
  "type": "net",
  "name": "UDP发送器",
  "configuration": {
    "protocol": "udp",
    "server": "127.0.0.1:8081",
    "connectTimeout": 10,
    "heartbeatInterval": 0
  }
}
```

### 3. Unix Socket配置
```json
{
  "id": "unix_socket_1",
  "type": "net",
  "name": "Unix Socket发送器",
  "configuration": {
    "protocol": "unix",
    "server": "/tmp/test.sock",
    "connectTimeout": 30
  }
}
```

## 执行结果

### 1. 成功场景
- 消息成功发送
- 原始消息内容保持不变
- 消息发送到Success链路

### 2. 失败场景
消息发送失败时：
- 在metadata中添加error字段
- 记录错误信息
- 消息发送到Failure链路

### 3. 错误类型
可能的错误情况包括：
- 网络连接失败
- 发送超时
- 连接断开
- 心跳检测失败

## 最佳实践

### 1. 连接管理
- 根据网络质量设置合适的超时时间
- 对不稳定网络启用自动重连
- 使用心跳保持长连接
- 合理配置重连间隔

### 2. 协议选择
- TCP：适用于需要可靠传输的场景
- UDP：适用于实时性要求高的场景
- Unix Socket：适用于本机进程间通信

### 3. 性能优化
- 合理设置缓冲区大小
- 避免频繁断开重连
- 控制心跳包发送频率
- 处理好消息积压情况

## 注意事项

1. **连接管理**
   - 及时处理断线重连
   - 避免频繁建立连接
   - 合理设置心跳间隔
   - 处理好连接释放

2. **数据处理**
   - 注意消息大小限制
   - 处理好消息边界
   - 考虑数据编码格式
   - 注意网络延迟影响

3. **错误处理**
   - 实现错误重试机制
   - 记录关键错误日志
   - 监控连接状态
   - 处理好超时情况

4. **特殊说明**
   - 每条消息发送前会自动添加`\n`作为结束符
   - 仅支持发送数据，不支持读取响应
   - 心跳间隔设为0时不发送心跳
   - 支持所有Go标准库net包的协议类型

通过合理配置和使用TCP/UDP客户端节点，您可以实现可靠的网络通信功能。请根据实际需求选择合适的配置选项，并注意遵循安全和性能优化建议。
