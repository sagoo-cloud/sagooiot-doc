---
title: 'Redis客户端'
sidebar_position: 7
hide_title: true
keywords: [规则引擎,Redis,缓存,数据存储]
description: '详细介绍SagooIOT平台规则引擎中Redis节点的功能和使用方法，包括连接配置、命令执行、变量替换等内容，帮助用户实现数据缓存和存储功能。'
---


Redis节点是一个用于执行Redis命令的组件，支持所有Redis操作命令，可用于数据缓存、计数器、队列等多种场景。该节点支持连接池管理和数据库选择，提供了灵活的参数配置和变量替换功能。

## 基本信息

- **组件类型**: `redis`
- **功能**: Redis命令执行
- **应用场景**: 
  - 数据缓存
  - 计数器
  - 消息队列
  - 数据存储
  - 会话管理

## 配置说明

### 基本配置

| 字段 | 类型 | 必填 | 说明 | 默认值 |
|------|------|------|------|--------|
| server | string | 是 | Redis服务器地址 | 127.0.0.1:6379 |
| password | string | 否 | Redis密码 | - |
| poolSize | int | 否 | 连接池大小 | 0 |
| db | int | 否 | 数据库编号 | 0 |
| cmd | string | 是 | Redis命令(SET/GET等) | - |
| paramsExpr | string | 否 | 命令参数表达式 | - |
| params | array | 否 | 命令参数数组 | - |

## 功能特性

### 1. 命令支持
- 支持所有Redis命令
- SET/GET/DEL基础操作
- HMSET/HMGET哈希操作
- List/Set集合操作
- 事务操作支持

### 2. 连接管理
- 连接池复用
- 自动重连
- 连接池大小控制
- 多数据库支持

### 3. 变量替换
- 支持元数据变量
- 支持消息变量
- 支持动态参数
- 灵活的表达式支持

## 使用示例

### 1. 基础GET/SET操作
```json
{
  "id": "redis_node_1",
  "type": "redis",
  "name": "存储温度数据",
  "configuration": {
    "server": "127.0.0.1:6379",
    "db": 0,
    "cmd": "SET",
    "params": ["temperature", "${msg.value}"]
  }
}
```

### 2. 使用Hash存储
```json
{
  "id": "redis_node_2",
  "type": "redis",
  "name": "设备状态存储",
  "configuration": {
    "server": "127.0.0.1:6379",
    "db": 1,
    "cmd": "HMSET",
    "params": ["device:${metadata.deviceId}", "status", "${msg.status}", "timestamp", "${msg.ts}"]
  }
}
```

### 3. 使用表达式参数
```json
{
  "id": "redis_node_3",
  "type": "redis",
  "name": "动态参数示例",
  "configuration": {
    "server": "127.0.0.1:6379",
    "cmd": "GET",
    "paramsExpr": "['device:' + metadata.deviceId]"
  }
}
```

## 执行结果

### 1. 成功场景
- 命令成功执行
- 结果存入msg.Data
- 消息发送到Success链路
- 保持数据类型不变

### 2. 失败场景
- 连接失败
- 认证失败
- 命令执行错误
- 参数错误
- 消息发送到Failure链路

## 变量使用

### 1. 支持的变量类型
- **metadata变量**: `${metadata.key}`
- **msg变量**: `${msg.key}`
- **data变量**: `${data}`
- **id变量**: 消息ID
- **ts变量**: 时间戳
- **type变量**: 消息类型
- **dataType变量**: 数据类型

### 2. 表达式示例
```
- upper(msg.name)
- metadata.productType
- msg.temperature + 50
- replace(metadata.productType, 'old', 'new')
```

## 最佳实践

### 1. 连接管理
- 合理设置连接池大小
- 复用Redis连接
- 及时释放资源
- 设置合适的超时时间

### 2. 数据操作
- 使用合适的数据结构
- 设置合理的过期时间
- 避免大key
- 注意数据一致性

### 3. 性能优化
- 批量操作优化
- 使用管道命令
- 合理使用事务
- 控制数据大小

## 注意事项

1. **连接管理**
   - 合理配置连接池
   - 注意连接泄漏
   - 处理断线重连
   - 设置超时时间

2. **数据安全**
   - 设置访问密码
   - 控制命令权限
   - 避免敏感信息
   - 定期数据备份

3. **性能考虑**
   - 避免大量小数据
   - 控制数据大小
   - 使用批量操作
   - 注意内存使用

4. **特殊说明**
   - paramsExpr优先级高于params
   - 支持所有Redis命令
   - 保持数据类型不变
   - 注意变量替换规则

通过合理配置和使用Redis节点，您可以实现高效的数据缓存和存储功能。请根据实际需求选择合适的配置选项，并注意遵循性能优化建议。
