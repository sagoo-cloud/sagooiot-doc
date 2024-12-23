---
title: 'JS过滤器'
sidebar_position: 5
hide_title: true
keywords: [规则引擎,JS过滤器,脚本过滤,条件过滤,数据验证,JavaScript脚本,过滤规则,业务规则,消息过滤,数据处理]
description: '详细介绍SagooIOT平台规则引擎中JavaScript过滤器节点的功能和使用方法，包括脚本编写规范、过滤规则、使用场景、最佳实践等内容，帮助用户实现灵活的消息过滤控制。'
---


## 节点说明

JavaScript过滤器节点允许使用JavaScript脚本编写复杂的过滤逻辑，支持对消息内容、元数据和消息类型进行灵活的过滤处理。

## 界面配置说明

### 1. 基本设置

- **节点ID**: 节点的唯一标识符（示例中为 "node_28"）
- **名称**: 节点的显示名称
- **调试模式**: 可开启调试模式查看脚本执行结果

### 2. 脚本编辑区

- 提供JavaScript代码编辑器
- 支持语法高亮
- 自动补全功能
- 错误提示功能

## 脚本编写规范

:::tip 提示
JavaScript脚本支持ECMAScript 5.1(+) 语法规范和部分ES6规范，如：async/await/Promise/let。允许在脚本中调用Go自定义函数，请参考[udf](https://rulego.cc/pages/d59341/#udf) 。
:::

### 1. 函数结构

```
function Filter(msg, metadata, msgType) {
    // 过滤逻辑
    return true/false;  // 必须返回布尔值
}
```

### 2. 参数说明

```
msg       // 消息内容（JSON类型时可用点号访问）
metadata  // 元数据对象
msgType   // 消息类型
```

### 3. 返回值

- 必须返回布尔值（true/false）
- true：消息通过过滤
- false：消息被过滤掉

## 使用场景示例

### 1. 简单条件过滤

```
function Filter(msg, metadata, msgType) {
    return msg.temperature > 50;
}
```

### 2. 复合条件过滤

```
function Filter(msg, metadata, msgType) {
    return msg.temperature > 30 && 
           msg.humidity < 80 && 
           metadata.deviceType === "sensor";
}
```

### 3. 高级过滤逻辑

```
function Filter(msg, metadata, msgType) {
    // 时间范围检查
    let currentHour = new Date().getHours();
    if (currentHour < 8 || currentHour > 22) {
        return false;
    }
    
    // 数据有效性检查
    if (!msg.value || msg.value < 0) {
        return false;
    }
    
    // 设备状态检查
    return msg.status === "active" && 
           metadata.maintenance !== true;
}
```

## 路由规则

### 1. True链路

- 脚本返回true时使用
- 表示消息通过过滤

### 2. False链路

- 脚本返回false时使用
- 表示消息未通过过滤

### 3. Failure链路

- 脚本执行出错时使用
- 语法错误
- 运行时异常
- 执行超时

## 最佳实践

### 1. 数据验证

```
function Filter(msg, metadata, msgType) {
    // 数据完整性检查
    if (!msg.deviceId || !msg.timestamp) {
        return false;
    }
    
    // 数值范围检查
    if (msg.temperature < -40 || msg.temperature > 100) {
        return false;
    }
    
    return true;
}
```

### 2. 业务规则过滤

```
function Filter(msg, metadata, msgType) {
    // 业务时间检查
    let businessHours = {
        start: 9,
        end: 18
    };
    let hour = new Date().getHours();
    
    // 优先级检查
    if (msg.priority === "high") {
        return true;  // 高优先级始终通过
    }
    
    // 常规业务检查
    return hour >= businessHours.start && 
           hour < businessHours.end;
}
```

### 3. 条件组合

```
function Filter(msg, metadata, msgType) {
    // 设备类型检查
    let validTypes = ["sensor", "controller", "gateway"];
    if (!validTypes.includes(metadata.deviceType)) {
        return false;
    }
    
    // 状态检查
    if (msg.status === "error") {
        return msg.errorCount > 3;  // 只处理严重错误
    }
    
    // 常规检查
    return msg.value !== null && 
           msg.value >= 0;
}
```

## 注意事项

1. **脚本规范**
    - 必须返回布尔值
    - 注意脚本性能
    - 处理异常情况
2. **性能优化**
    - 避免复杂计算
    - 减少循环操作
    - 合理使用条件判断
3. **错误处理**
    - 检查空值情况
    - 验证数据类型
    - 注意边界条件

## 调试建议

1. **开启调试模式**
    - 查看脚本执行过程
    - 监控返回值
    - 捕获异常信息
2. **分步测试**
    - 先测试简单条件
    - 逐步添加复杂逻辑
    - 验证边界情况
3. **常见问题排查**
    - 检查语法错误
    - 验证数据访问
    - 确认返回值类型

JavaScript过滤器节点通过灵活的脚本编写，实现复杂的过滤逻辑。它不会修改消息内容，专注于提供强大的过滤功能。合理使用JavaScript过滤器可以实现精确的消息过滤和路由控制。
