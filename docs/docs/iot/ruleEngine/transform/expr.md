---
title: '表达式转换'
sidebar_position: 2
hide_title: true
keywords: [规则引擎,规则链,golang,go语言,编排式,热部署,数据集成,IoT,物联网平台,组件化,流程自动化,自动化引擎,应用集成,事件框架]
description: '轻量级、高性能、嵌入式、新一代组件编排规则引擎'
---



## 节点说明

表达式转换节点允许您使用简洁的表达式语言对数据进行转换和处理，支持数学运算、字符串处理、条件判断等功能。相比 JavaScript 转换节点，它更加轻量和高效。

## 界面说明

### 1. 基本配置

- **节点ID**: 节点的唯一标识符（示例中为 "node_2"）
- **名称**: 节点的显示名称
- **调试模式**: 可以打开调试模式查看数据处理过程

### 2. 转换表达式

在转换表达式输入框中可以输入单个表达式，例如：`msg.name`

### 3. 字段-表达式映射表

通过添加按钮可以配置多个字段的转换规则：

- **键（Key）**: 目标字段名
- **值（Value）**: 对应的转换表达式

## 可用变量

1. **基本变量**
    - `id`: 消息ID
    - `ts`: 消息时间戳
    - `data`: 原始消息内容
    - `msg`: 消息体对象（JSON格式时可用）
    - `metadata`: 消息元数据
    - `type`: 消息类型
    - `dataType`: 数据类型
2. **访问方式**
    - JSON字段：`msg.temperature`
    - 元数据：`metadata.deviceType`
    - 嵌套字段：`msg.device.status`

## 使用示例

### 1. 单个表达式转换

```

// 温度值判断
msg.temperature > 30 ? "高温" : "正常"

// 字符串处理
upper(msg.name)

// 数值计算
msg.price * 1.2
```

### 2. 多字段转换映射

```


{
  "deviceName": "upper(msg.name)",
  "temperature": "msg.temp",
  "isAlarm": "msg.temp > 50",
  "deviceType": "metadata.type"
}
```

### 3. 常见转换场景

1. **数值处理**

```

// 温度四舍五入到1位小数
round(msg.temperature, 1)

// 价格加增20%
msg.price * 1.2
```

1. **字符串处理**

```
// 转大写
upper(msg.name)

// 字符串拼接
format("%s-%s", msg.type, msg.id)
```

1. **条件判断**

```
// 简单条件
msg.value > 100

// 多条件
msg.temp > 30 && msg.humidity < 40

// 三元运算
msg.status == "active" ? "在线" : "离线"
```

1. **数组处理**

```

// 数组长度
len(msg.items)

// 包含判断
in(msg.type, ["warning", "error"])
```

## 实用表达式示例

### 1. 设备状态监控

```

{
  "deviceStatus": "msg.temperature > 50 || msg.humidity > 80 ? 'warning' : 'normal'",
  "alarmLevel": "msg.temperature > 70 ? 'high' : (msg.temperature > 50 ? 'medium' : 'low')"
}
```

### 2. 数据格式化

```

{
  "formattedTemp": "format('%.1f°C', msg.temperature)",
  "timestamp": "format('设备:%s, 时间:%d', msg.deviceId, ts)"
}
```

### 3. 复合条件处理

```

{
  "needMaintenance": "msg.runningHours > 1000 || msg.errorCount > 10",
  "deviceHealth": "msg.errorRate < 0.01 && msg.signal > 80 ? 'healthy' : 'check'"
}
```

## 注意事项

1. **表达式优先级**
    - 单个表达式（expr）优先于映射表（mapping）
    - 如果同时配置，只有expr会生效
2. **性能考虑**
    - 表达式应尽量简单
    - 避免复杂的嵌套运算
    - 优先使用内置函数
3. **数据类型**
    - 注意数值和字符串的类型转换
    - JSON数据需要确保格式正确
4. **调试建议**
    - 使用调试模式验证表达式
    - 分步测试复杂表达式
    - 注意检查数据类型匹配

通过表达式转换节点，您可以用简洁的表达式实现复杂的数据转换逻辑，特别适合数值计算、条件判断等场景。更多表达式语法和函数可以参考 [expr 表达式文档](https://expr-lang.org/docs/language-definition)。
