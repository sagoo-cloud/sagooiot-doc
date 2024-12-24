---
title: 'Redis Stream服务'
sidebar_position: 9
hide_title: true
keywords: [规则引擎,Redis Stream,消息队列,数据流处理,消费者组,实时数据处理]
description: '详细介绍SagooIOT平台规则引擎中Redis Stream节点的功能和使用方法，包括Redis配置、消费者组设置、数据路由等内容，帮助用户实现可靠的消息队列服务。'
---


Redis Stream服务节点提供了基于Redis 5.0+版本的流数据处理功能，支持订阅不同的流数据，并根据配置的规则路由到规则链进行处理。该节点特别适合处理需要持久化的实时数据流，支持消费者组模式的数据处理。

## 节点配置说明

### 1. 基本设置

- **节点ID**: 节点的唯一标识符
- **名称**: 节点的显示名称
- **描述**: 添加对该节点的详细说明
- **调试模式**: 可开启调试模式查看数据收发情况

### 2. Redis连接配置

#### 基础配置
- **Redis服务地址**: Redis服务器的连接地址
  - 格式示例: `127.0.0.1:6379`
  - 支持单机和集群模式
- **密码**: Redis服务器的访问密码（可选）
- **数据库编号**: Redis数据库索引，默认为0
- **消费者组ID**: 消费者组标识，默认为"rulego"

### 3. 路由设置

在路由设置标签页中可以配置：

- **订阅流名称**: 要订阅的Redis Stream名称
- **前置数据处理器**: 数据处理前的预处理逻辑
- **后置数据处理器**: 数据处理后的后处理逻辑

## 使用场景示例

### 1. 设备数据实时处理
```yaml
# 配置示例
Redis服务地址: 127.0.0.1:6379
数据库编号: 0
消费者组ID: device_group
订阅流名称: device_data_stream
```

### 2. 多流数据聚合处理
```yaml
# 配置示例
Redis服务地址: 127.0.0.1:6379
数据库编号: 1
消费者组ID: aggregator_group
订阅流名称: 
  - sensor_data_stream
  - alarm_data_stream
```

### 3. 高可用集群配置
```yaml
# 配置示例
Redis服务地址: redis-cluster:6379
密码: your_password
消费者组ID: ha_group
订阅流名称: critical_data_stream
```

## 数据处理说明

### 1. 数据订阅
- 支持订阅多个Stream
- 使用消费者组模式确保消息可靠投递
- 支持从最新或指定位置开始消费

### 2. 数据路由
- 支持基于Stream名称的路由
- 可配置多个处理规则
- 支持数据过滤和转换

### 3. 响应处理
- 通过metadata指定响应主题
- 支持自定义响应格式
- 可配置响应超时

## 最佳实践

### 1. 连接管理
- 合理设置连接池大小
- 启用自动重连机制
- 使用连接复用提高性能

### 2. 消费者组配置
- 根据业务场景设置合适的组ID
- 合理设置消费者数量
- 定期清理过期消息

### 3. 错误处理
- 实现完善的错误重试机制
- 记录处理失败的消息
- 设置合理的超时时间

## 性能优化建议

### 1. Redis配置优化
- 合理设置内存大小
- 启用持久化机制
- 优化网络配置

### 2. 消费者优化
- 批量处理消息
- 使用pipeline减少网络往返
- 控制单次处理数据量

### 3. 监控告警
- 监控消费延迟
- 监控消息堆积情况
- 设置关键指标告警

## 调试建议

### 1. 连接测试
- 验证Redis连接状态
- 检查认证信息
- 测试Stream可用性

### 2. 数据流测试
- 使用Redis CLI测试数据流
- 验证消息格式
- 检查消费者组状态

### 3. 性能测试
- 测试高并发场景
- 验证数据处理延迟
- 检查资源使用情况

## 常见问题

### 1. 连接问题
```
问题：无法连接到Redis服务器
解决：
1. 检查服务器地址和端口
2. 验证密码正确性
3. 确认网络连通性
```

### 2. 消费问题
```
问题：消息处理延迟或堆积
解决：
1. 增加消费者数量
2. 优化处理逻辑
3. 检查资源使用情况
```

### 3. 数据丢失问题
```
问题：数据处理不完整
解决：
1. 检查消费者组配置
2. 验证错误处理机制
3. 启用持久化机制
```

## 示例代码

### 1. 消息发布
```go
// 发送消息到Stream
xAdd := redis.XAddArgs{
    Stream: "device_data_stream",
    Values: map[string]interface{}{
        "deviceId": "device001",
        "value": 23.5,
        "timestamp": time.Now().Unix(),
    },
}
```

### 2. 消息处理
```go
// 在规则链中处理消息
msg.Metadata.PutValue("responseTopic", "device.response.stream")
msg.Data = map[string]interface{}{
    "status": "success",
    "processedAt": time.Now().Format(time.RFC3339),
}
```

## 配置示例

### 1. 基础配置
```yaml
server: "127.0.0.1:6379"
password: ""
db: 0
groupId: "rulego"
```

### 2. 高级配置
```yaml
server: "redis-cluster:6379"
password: "your_password"
db: 1
groupId: "custom_group"
streams:
  - name: "sensor_data"
    consumer: "processor1"
  - name: "alarm_data"
    consumer: "processor2"
```

通过合理配置Redis Stream节点，您可以实现可靠的消息队列服务。请根据实际需求选择合适的配置选项，并注意遵循性能优化和安全建议。如果遇到问题，请参考调试建议和常见问题解决方案。
