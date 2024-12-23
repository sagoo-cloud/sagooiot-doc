---
title: '条件分支'
sidebar_position: 6
hide_title: true
keywords: [规则引擎,规则链,golang,go语言,编排式,热部署,数据集成,IoT,物联网平台,组件化,流程自动化,自动化引擎,应用集成,事件框架]
description: '轻量级、高性能、嵌入式、新一代组件编排规则引擎'
---

## 节点说明

条件分支节点是一个强大的路由组件，它通过配置多个条件表达式来实现消息的智能路由。节点会按顺序评估每个条件，当匹配到第一个满足的条件时，将消息路由到对应的处理链路。

## 界面配置说明

### 1. 基本设置

- **节点ID**: 节点的唯一标识符（示例中为 "node_36"）
- **名称**: 节点的显示名称
- **调试模式**: 可开启调试模式查看路由结果

### 2. 条件配置表

界面提供条件列表配置：

- **条件**: 输入条件表达式
- **路由**: 指定匹配成功时的目标路由
- **添加分支**: 可添加多个条件分支
- **删除**: 可删除已配置的条件

## 条件表达式说明

### 1. 内置变量

```
id        - 消息ID
ts        - 消息时间戳（毫秒）
data      - 原始消息内容
msg       - 消息体（JSON类型可用点号访问）
metadata  - 消息元数据
type      - 消息类型
dataType  - 数据类型
```

### 2. 表达式示例

```
# 基础比较
msg.temperature > 50

# 复合条件
msg.temperature >= 20 && msg.temperature <= 50

# 元数据条件
metadata.deviceType == 'sensor'

# 字符串处理
upper(metadata.name) == 'DEVICE1'

# JSON处理
contains(toJSON(msg), 'temperature')
```

## 使用场景示例

### 1. 温度监控分流

```
条件1: msg.temperature >= 20 && msg.temperature <= 50
路由1: normalTemp

条件2: msg.temperature > 50
路由2: highTemp

Default: otherTemp
```

### 2. 设备状态处理

```
条件1: msg.status == 'error' && msg.priority == 'high'
路由1: urgentProcess

条件2: msg.status == 'error'
路由2: normalProcess

Default: statusMonitor
```

### 3. 数据分类处理

```
条件1: metadata.dataType == 'sensor' && msg.value > 100
路由1: sensorAlert

条件2: metadata.dataType == 'log'
路由2: logProcess

Default: defaultProcess
```

## 最佳实践

### 1. 条件设计建议

- 将最常见的条件放在前面
- 条件从具体到一般
- 避免过于复杂的表达式

### 2. 路由规划

- 为每个重要场景配置专门的处理链
- 配置合适的默认路由
- 处理好异常情况

### 3. 性能优化

- 控制条件数量
- 简化表达式复杂度
- 避免重复评估

## 注意事项

1. **条件评估**
    - 按照配置顺序评估
    - 匹配到第一个条件后停止
    - 所有条件都不匹配时使用Default路由
2. **表达式编写**
    - 确保语法正确
    - 处理好空值情况
    - 注意数据类型匹配
3. **路由配置**
    - 确保路由名称正确
    - 配置合适的默认路由
    - 处理好异常情况

## 调试建议

1. **开启调试模式**
    - 观察条件匹配过程
    - 验证路由结果
    - 检查表达式执行
2. **常见问题排查**
    - 检查表达式语法
    - 验证变量存在性
    - 确认数据类型
3. **优化建议**
    - 监控匹配效率
    - 分析路由分布
    - 优化条件顺序

## 高级用法

### 1. 复杂条件组合

```
# 多条件组合
msg.temperature > 30 && 
msg.humidity > 60 && 
metadata.location == 'warehouse'

# 时间条件
ts > 1640995200000 && 
msg.value > threshold

# 字符串处理
contains(lower(metadata.deviceId), 'sensor') && 
msg.status != 'inactive'
```

### 2. 函数使用

```
# 字符串函数
upper(metadata.region) == 'NORTH'
lower(msg.type) == 'alarm'

# JSON处理
toJSON(msg.data) != '{}'
```

### 3. 数值计算

```
# 数学运算
msg.value / 100 > threshold
abs(msg.temperature - baseline) > 10

# 统计处理
len(msg.items) > 0
avg(msg.readings) > 50
```

条件分支节点通过灵活的条件配置实现精确的消息路由控制。合理使用可以构建出复杂的业务处理流程，同时保持代码的清晰和可维护性。记住要经常检查和优化条件表达式，确保系统的高效运行。
