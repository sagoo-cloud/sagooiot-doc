---
title: '元数据转换'
sidebar_position: 3
hide_title: true
keywords: [规则引擎,规则链,golang,go语言,编排式,热部署,数据集成,IoT,物联网平台,组件化,流程自动化,自动化引擎,应用集成,事件框架]
description: '轻量级、高性能、嵌入式、新一代组件编排规则引擎'
---


## 节点说明

元数据转换节点用于处理和转换消息的元数据信息，您可以创建新的元数据或更新现有元数据。这对于数据标记、分类和跟踪特别有用。

## 界面说明

### 1. 基本配置

- **节点ID**: 节点的唯一标识符（示例中为 "node_4"）
- **名称**: 节点的显示名称
- **调试模式**: 可以打开调试模式查看数据处理过程

### 2. 字段-表达式映射表

- **键（Key）**: 要创建或更新的元数据字段名
- **值（Value）**: 对应的转换表达式
- **添加按钮**: 可以添加多个字段映射

### 3. 创建模式选择

- 是否创建新的元数据列表
    - 开启：创建全新的元数据列表
    - 关闭：仅更新指定的元数据字段

## 使用场景示例

### 1. 设备数据处理

```

{
  "deviceType": "msg.type",
  "temperature": "msg.temperature",
  "status": "msg.temperature > 30 ? 'warning' : 'normal'"
}
```

### 2. 数据标记和分类

```
{
  "category": "upper(msg.productType)",
  "processingTime": "ts",
  "source": "'sensor-' + msg.deviceId"
}
```

### 3. 系统监控

```
{
  "alarmLevel": "msg.errorCount > 10 ? 'critical' : 'normal'",
  "lastCheck": "format('%d', ts)",
  "location": "metadata.region"
}
```

## 表达式示例

### 1. 基本操作

```
// 直接获取消息字段
msg.temperature

// 使用元数据值
metadata.deviceType

// 字符串处理
upper(msg.name)
```

### 2. 条件处理

```
// 温度状态判断
msg.temperature > 30 ? 'high' : 'normal'

// 复合条件
msg.humidity > 80 && msg.temperature > 25 ? 'warning' : 'ok'
```

### 3. 格式化

```
// 时间格式化
format('检查时间: %d', ts)

// 组合信息
format('%s-%s', metadata.region, msg.deviceId)
```

## 最佳实践

### 1. 设备监控配置

```

{
  "deviceId": "msg.id",
  "location": "metadata.location",
  "status": "msg.online ? 'active' : 'offline'",
  "lastUpdateTime": "format('%d', ts)"
}
```

### 2. 数据分析标记

```

{
  "dataQuality": "msg.errorRate < 0.01 ? 'good' : 'poor'",
  "processStage": "'stage_' + msg.currentStep",
  "batchNumber": "metadata.batchId"
}
```

### 3. 告警处理

```

{
  "alarmType": "msg.temperature > 50 ? 'temperature_high' : 'normal'",
  "severity": "msg.temperature > 70 ? 'critical' : (msg.temperature > 50 ? 'warning' : 'info')",
  "source": "metadata.sensorId"
}
```

## 注意事项

1. **数据类型处理**
    - 确保表达式结果类型符合预期
    - 注意数值和字符串的转换
2. **性能考虑**
    - 避免过于复杂的表达式
    - 合理使用条件判断
3. **错误处理**
    - 检查必要字段是否存在
    - 处理可能的空值情况
4. **调试建议**
    - 使用调试模式验证转换结果
    - 检查元数据更新是否符合预期

## 七、常见问题解答

1. **新建还是更新元数据？**
    - 新建：需要完全重置元数据时
    - 更新：只需修改特定字段时
2. **表达式返回值为空**
    - 检查原始数据是否存在
    - 验证表达式语法是否正确
    - 确认变量引用是否准确
3. **性能优化**
    - 使用简单直接的表达式
    - 避免不必要的字符串操作
    - 减少复杂的条件判断

通过元数据转换节点，您可以灵活地管理和转换消息的元数据，实现数据标记、分类和跟踪等功能。更多表达式语法可以参考 [expr 表达式文档](https://expr-lang.org/docs/language-definition)。
