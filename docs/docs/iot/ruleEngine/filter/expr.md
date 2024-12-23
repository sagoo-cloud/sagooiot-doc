---
title: '表达式过滤器'
sidebar_position: 1
hide_title: true
keywords: [规则引擎,规则链,golang,go语言,编排式,热部署,数据集成,IoT,物联网平台,组件化,流程自动化,自动化引擎,应用集成,事件框架]
description: '轻量级、高性能、嵌入式、新一代组件编排规则引擎'
---


## 节点说明

表达式过滤器节点用于根据条件表达式对消息进行过滤和路由。它可以根据消息的内容、元数据或其他属性进行判断，并将消息路由到不同的处理链路。

## 界面配置说明

### 1. 基本设置

- **节点ID**: 节点的唯一标识符（示例中为 "node_12"）
- **名称**: 节点的显示名称
- **调试模式**: 可开启调试模式查看过滤结果

### 2. 过滤表达式

- **表达式输入框**: 输入用于过滤的表达式，表达式必须返回布尔值
- **表达式示例**: `msg.temperature>50`（当温度大于50时返回true）

## 支持的变量

### 1. 消息相关变量

```
id        - 消息ID
ts        - 时间戳（毫秒）
data      - 原始消息内容
msg       - 消息体对象（JSON格式可用msg.field访问）
type      - 消息类型
dataType  - 数据类型
```

### 2. 元数据变量

```
metadata  - 元数据对象（可通过metadata.field访问）
```

## 使用场景示例

### 1. 简单条件过滤

```
# 温度阈值过滤
msg.temperature > 30

# 设备状态过滤
msg.status == "active"

# 错误计数过滤
msg.errorCount >= 5
```

### 2. 复合条件过滤

```
# 温度和湿度组合条件
msg.temperature > 30 && msg.humidity > 80

# 设备状态和区域过滤
msg.status == "warning" && metadata.region == "north"

# 多重条件判断
msg.errorCount > 3 || msg.temperature > 50 || msg.status == "error"
```

### 3. 高级过滤表达式

```
# 字符串处理
upper(metadata.deviceType) == "SENSOR"

# 数组处理
len(msg.tags) > 0 && contains(msg.tags, "important")

# 时间判断
(now() - ts) > 3600000  // 消息超过1小时
```

## 路由规则

### 1. 消息路由

- **True链路**: 表达式结果为true时的处理链
- **False链路**: 表达式结果为false时的处理链
- **Failure链路**: 表达式执行出错时的处理链

### 2. 路由示例

```

# 温度告警路由
msg.temperature > 50
- True链路: 发送告警通知
- False链路: 正常处理
- Failure链路: 错误处理

# 设备状态路由
msg.status == "error" && msg.priority == "high"
- True链路: 紧急处理流程
- False链路: 常规处理流程
- Failure链路: 异常处理
```

## 最佳实践

### 1. 表达式设计

- 保持表达式简洁明确
- 合理使用布尔运算符
- 注意数据类型匹配
- 处理可能的空值情况

### 2. 性能优化

```
# 推荐写法（简单高效）
msg.temperature > 50

# 避免复杂运算
len(split(msg.content, ",")) > 5  // 避免过多字符串操作
```

### 3. 错误处理

```

# 安全的空值检查
msg != nil && msg.temperature != nil && msg.temperature > 
```
