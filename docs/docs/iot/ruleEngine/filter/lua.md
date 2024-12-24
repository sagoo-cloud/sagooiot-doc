---
title: 'Lua脚本过滤器'
sidebar_position: 1
hide_title: true
keywords: [规则引擎,Lua脚本,过滤器,数据处理,条件判断]
description: '详细介绍SagooIOT平台规则引擎中Lua脚本过滤器的功能和使用方法，包括脚本配置、高级功能、第三方库使用等内容，帮助用户实现灵活的数据过滤和处理。'
---

# Lua脚本过滤器

Lua脚本过滤器是一个强大的数据处理组件，它允许您使用Lua脚本对消息进行过滤和处理。通过编写简单的Lua脚本，您可以实现复杂的数据过滤逻辑，并支持加解密、I/O、网络、文件等高级操作。

## 基本配置

### 1. 节点配置
- **节点类型**: `x/luaFilter`
- **名称**: 节点显示名称
- **脚本内容**: 支持直接编写Lua脚本或引用.lua文件

### 2. 脚本配置
脚本配置支持两种方式：
1. **直接编写脚本内容**：只需提供函数体内容
2. **引用Lua文件**：提供.lua后缀的脚本文件路径，需包含完整函数定义

### 3. 函数参数
Lua脚本中的Filter函数接收三个参数：
- **msg**: 消息内容（JSON类型可直接使用msg.field访问）
- **metadata**: 消息元数据（JSON对象）
- **msgType**: 消息类型

## 使用示例

### 1. 基础过滤示例
```lua
-- 温度大于50度时返回true
return msg.temperature > 50
```

### 2. 复杂条件判断
```lua
-- 多条件组合
return msg.temperature > 50 and msg.humidity < 80
```

### 3. 使用元数据
```lua
-- 检查元数据中的设备类型
return metadata.deviceType == "sensor"
```

## 高级功能

### 1. 启用第三方库
要使用加解密、I/O、网络、文件等高级功能，需要在配置中开启：
```go
config.Properties.PutValue(luaEngine.LoadLuaLibs, "true")
```

### 2. 可用的第三方库
启用后可以使用的功能库包括：
- **加解密**: crypto库（MD5、SHA256等）
- **网络**: http客户端和服务器
- **数据库**: 数据库访问
- **文件操作**: 文件读写
- **JSON处理**: JSON编解码
- **日期时间**: 时间处理
- **正则表达式**: 字符串匹配

### 3. 自定义函数
可以注册Golang函数供Lua脚本调用：
```go
config.RegisterUdf("myFunction", func(args ...interface{}) interface{} {
    // 函数实现
    return result
})
```

## 路由规则

脚本返回值决定消息的路由方向：
- **true**: 消息发送到True链
- **false**: 消息发送到False链
- **执行失败**: 消息发送到Failure链

## 最佳实践

### 1. 性能优化
- 保持脚本简单高效
- 避免复杂的循环操作
- 合理使用第三方库

### 2. 调试建议
- 使用调试模式验证脚本
- 检查数据类型匹配
- 注意错误处理

### 3. 安全考虑
- 谨慎使用文件操作
- 控制网络访问范围
- 注意数据验证

## 配置示例

### 1. 基础配置
```json
{
  "id": "s1",
  "type": "x/luaFilter",
  "name": "温度过滤",
  "configuration": {
    "script": "return msg.temperature > 50"
  }
}
```

### 2. 使用外部脚本文件
```json
{
  "id": "s2",
  "type": "x/luaFilter",
  "name": "复杂过滤",
  "configuration": {
    "script": "scripts/filter.lua"
  }
}
```

### 3. 使用第三方库
```lua
-- 使用HTTP库发送请求
local http = require("http")
local response = http.get("http://api.example.com/data")
return response.code == 200
```

## 注意事项

1. **数据类型**
   - JSON数据可直接访问字段
   - 其他类型数据作为字符串处理

2. **错误处理**
   - 脚本异常会路由到Failure链
   - 建议添加适当的错误处理

3. **资源管理**
   - 及时关闭打开的资源
   - 避免内存泄漏

通过合理配置Lua脚本过滤器，您可以实现灵活的数据过滤和处理逻辑。请根据实际需求选择合适的配置选项，并注意遵循性能优化和安全建议。
