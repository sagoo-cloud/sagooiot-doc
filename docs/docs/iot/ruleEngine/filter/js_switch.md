---
title: 'js路由'
sidebar_position: 5
hide_title: true
keywords: [规则引擎,JS路由,脚本路由,动态路由,消息分发,条件路由,路由规则,JavaScript脚本,路由配置,消息流向]
description: '详细介绍SagooIOT平台规则引擎中JavaScript路由节点的功能和使用方法，包括脚本编写规范、路由配置、使用场景、最佳实践等内容，帮助用户实现灵活的消息路由控制。'
---


## 节点说明

JavaScript路由节点通过执行JavaScript脚本来动态决定消息的路由方向。它可以根据消息内容、元数据和消息类型，将消息路由到一个或多个输出链。

## 界面配置说明

### 1. 基本设置

- **节点ID**: 节点的唯一标识符（示例中为 "node_30"）
- **名称**: 节点的显示名称
- **调试模式**: 可开启调试模式查看路由结果

### 2. 脚本编辑区

```
function Switch(msg, metadata, msgType) {
    // 在此编写路由逻辑
    return ['链路1', '链路2'];  // 返回目标链路名称数组
}
```

## 脚本编写规范

:::tip 提示
JavaScript脚本支持ECMAScript 5.1(+) 语法规范和部分ES6规范，如：async/await/Promise/let。允许在脚本中调用Go自定义函数，请参考[udf](https://rulego.cc/pages/d59341/#udf) 。
:::

### 1. 函数结构

```
function Switch(msg, metadata, msgType) {
    // 路由逻辑
    return ['msgType1', 'msgType2'];  // 返回字符串数组
}
```

### 2. 参数说明

```
msg       // 消息内容（JSON类型时可用点号访问）
metadata  // 元数据对象
msgType   // 消息类型
```

### 3. 返回值

- 必须返回字符串数组
- 数组元素为目标链路名称
- 可以返回单个或多个链路

## 使用场景示例

### 1. 基于消息类型路由

```
function Switch(msg, metadata, msgType) {
    if (msg.type === 'alarm') {
        return ['urgent', 'notification'];
    } else {
        return ['normal'];
    }
}
```

### 2. 基于数据内容路由

```
function Switch(msg, metadata, msgType) {
    let routes = [];
    
    if (msg.temperature > 50) {
        routes.push('high_temp');
    }
    if (msg.humidity > 80) {
        routes.push('high_humidity');
    }
    
    return routes.length ? routes : ['normal'];
}
```

### 3. 多条件路由

```
function Switch(msg, metadata, msgType) {
    // 设备类型路由
    if (metadata.deviceType === 'sensor') {
        return ['sensor_process', 'data_storage'];
    }
    
    // 告警级别路由
    if (msg.alertLevel === 'critical') {
        return ['urgent_alert', 'notification', 'log'];
    }
    
    return ['default'];
}
```

## 高级用法

### 1. 动态路由计算

```
function Switch(msg, metadata, msgType) {
    let routes = [];
    
    // 根据时间段路由
    let hour = new Date().getHours();
    if (hour >= 9 && hour <= 18) {
        routes.push('business_hours');
    } else {
        routes.push('after_hours');
    }
    
    // 根据数据优先级路由
    if (msg.priority === 'high') {
        routes.push('priority_process');
    }
    
    return routes;
}
```

### 2. 条件组合路由

```
function Switch(msg, metadata, msgType) {
    // 初始化路由数组
    let routes = ['default'];
    
    // 数据处理路由
    if (msg.needProcess) {
        routes.push('processing');
    }
    
    // 存储路由
    if (msg.saveToDb) {
        routes.push('storage');
    }
    
    // 通知路由
    if (msg.notify) {
        routes.push('notification');
    }
    
    return routes;
}
```

## 注意事项

1. **路由配置**
    - 返回的链路名称必须已定义
    - 未定义的链路消息会被丢弃
    - 可以返回空数组
2. **性能考虑**
    - 避免复杂计算
    - 控制路由数量
    - 注意执行效率
3. **错误处理**
    - 处理异常情况
    - 提供默认路由
    - 验证返回值格式

## 调试建议

1. **开启调试模式**
    - 查看路由决策过程
    - 验证路由结果
    - 检查链路有效性
2. **分步测试**
    - 先测试单一路由
    - 逐步添加条件
    - 验证多路由情况
3. **常见问题排查**
    - 检查链路名称拼写
    - 验证路由逻辑
    - 确认返回值格式

## 最佳实践

1. **路由策略设计**

```
function Switch(msg, metadata, msgType) {
    // 基础路由策略
    let routes = ['logging'];  // 始终记录日志
    
    // 业务路由策略
    if (msg.type === 'data') {
        routes.push('processing');
        if (msg.importance === 'high') {
            routes.push('priority');
        }
    }
    
    // 监控路由策略
    if (metadata.monitor) {
        routes.push('monitoring');
    }
    
    return routes;
}
```

2. **错误处理和默认路由**

```
function Switch(msg, metadata, msgType) {
    try {
        // 主要路由逻辑
        if (!msg || !msg.type) {
            return ['error'];
        }
        
        let routes = [];
        // ... 路由逻辑 ...
        
        return routes.length ? routes : ['default'];
    } catch (e) {
        return ['error'];
    }
}
```

JavaScript路由节点提供了灵活的消息路由机制，可以根据业务需求实现复杂的路由逻辑。通过合理配置，可以构建高效的消息处理流程。
