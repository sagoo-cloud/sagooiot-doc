---
title: '内置处理器'
sidebar_position: 2
hide_title: true
keywords: [规则引擎,内置处理器,数据转换,消息处理,HTTP处理,元数据处理,响应处理,数据格式化,请求头处理,错误处理]
description: '详细介绍SagooIOT平台规则引擎的内置处理器功能，包括输入处理器和输出处理器的使用方法、应用场景、示例代码等内容，帮助用户实现高效的数据转换和消息处理。'
---

## 输入处理器（InBuiltins）

### 1. headersToMetadata

**功能说明：** 将 HTTP 请求头信息转换并添加到消息的元数据中。

**使用场景：**

- 需要在规则链中获取 HTTP 请求头信息
- 需要基于请求头信息进行后续处理

**示例：**

```
// HTTP 请求头
headers := {
    "Content-Type": "application/json",
    "Authorization": "Bearer token123"
}

// 处理后的消息元数据将包含
msg.Metadata = {
    "Content-Type": "application/json",
    "Authorization": "Bearer token123"
}
```

### 2. setJsonDataType

**功能说明：** 设置消息的数据类型为 JSON，并自动添加相应的 Content-Type 头信息。

**使用场景：**

- 处理 JSON 格式的数据
- 需要确保后续处理节点以 JSON 格式处理数据

**示例：**

```
// 处理前
msg.DataType = "TEXT"

// 处理后
msg.DataType = types.JSON
headers["Content-Type"] = "application/json"
```

### 3. toHex

**功能说明：** 将二进制字节消息数据转换为大写的十六进制字符串。

**使用场景：**

- 处理二进制数据
- 需要将二进制数据转换为可读形式
- 设备通信数据的调试和显示

**示例：**

```
// 处理前：二进制数据
inputData := []byte{0x48, 0x65, 0x6C, 0x6C, 0x6F}

// 处理后：十六进制字符串
// 输出：48454C4C4F
msg.Data = "48454C4C4F"
msg.DataType = types.TEXT
```

## 输出处理器（OutBuiltins）

### 1. responseToBody

**功能说明：** 将处理结果转换为 HTTP 响应。

**特点：**

- 自动处理错误情况，设置适当的状态码
- 自动设置 Content-Type
- 支持错误处理和正常响应

**使用场景：**

- HTTP API 的响应处理
- RESTful 服务的响应格式化

**示例：**

```
// 正常响应
msg.Data = `{"status": "success", "data": {...}}`
// 输出：
// HTTP 200
// Content-Type: application/json
// Body: {"status": "success", "data": {...}}

// 错误响应
error = errors.New("Invalid input")
// 输出：
// HTTP 400
// Body: "Invalid input"
```

### 2. metadataToHeaders

**功能说明：** 将消息元数据转换为 HTTP 响应头。

**使用场景：**

- 需要在 HTTP 响应中包含自定义头信息
- 需要传递元数据信息到客户端

**示例：**

```
// 消息元数据
msg.Metadata = {
    "X-Custom-Header": "custom-value",
    "X-Trace-ID": "trace-123"
}

// 处理后的 HTTP 响应头
headers = {
    "X-Custom-Header": "custom-value",
    "X-Trace-ID": "trace-123"
}
```

## 使用注意事项

1. 安全性考虑：
    - 在使用 `headersToMetadata` 时注意过滤敏感的头信息
    - 使用 `responseToBody` 时注意不要暴露敏感信息
2. 性能优化：
    - `toHex` 处理大量二进制数据时要注意内存使用
    - 合理使用处理器的组合，避免不必要的数据转换
3. 错误处理：
    - 所有处理器都会处理错误情况
    - 错误响应会自动设置 HTTP 400 状态码
4. 最佳实践：
    - 建议将相关的处理器组合使用，例如 `setJsonDataType` 和 `responseToBody`
    - 在处理大量并发请求时，注意资源使用情况

这些处理器设计得简单且实用，能够满足大多数 HTTP 服务的基本需求。它们可以单独使用，也可以组合使用以实现更复杂的功能。
