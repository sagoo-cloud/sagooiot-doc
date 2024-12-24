---
title: 'REST API调用'
sidebar_position: 3
hide_title: true
keywords: [规则引擎,REST API,HTTP客户端,接口调用]
description: '详细介绍SagooIOT平台规则引擎中REST API调用节点的功能和使用方法，包括HTTP请求配置、代理设置、SSL/TLS配置等内容，帮助用户实现外部API调用功能。'
---


REST API调用节点是一个用于调用外部HTTP/HTTPS服务的组件。它支持常见的HTTP方法、自定义请求头、代理配置等功能，可以将消息内容作为请求体发送到目标服务，并将响应内容更新到消息中。

## 基本信息

- **组件类型**: `restApiCall`
- **功能**: 调用外部REST API服务
- **支持特性**: HTTP/HTTPS、自定义请求头、代理配置、SSL/TLS

## 配置说明

### 1. 基本配置
| 字段 | 类型 | 必填 | 说明 | 默认值 |
|------|------|------|------|--------|
| restEndpointUrlPattern | string | 是 | HTTP URL地址 | - |
| requestMethod | string | 是 | HTTP请求方法 | POST |
| withoutRequestBody | bool | 否 | 是否不传输消息负载 | false |
| readTimeoutMs | int | 否 | 请求超时时间(毫秒) | 2000 |
| maxParallelRequestsCount | int | 否 | 最大并发请求数 | 200 |

### 2. 请求头配置
| 字段 | 类型 | 必填 | 说明 | 默认值 |
|------|------|------|------|--------|
| headers | map | 否 | 自定义请求头 |``` {"Content-Type": "application/json"} ```|

### 3. SSL/TLS配置
| 字段 | 类型 | 必填 | 说明 | 默认值 |
|------|------|------|------|--------|
| insecureSkipVerify | bool | 否 | 是否跳过证书验证 | false |

### 4. 代理配置
| 字段 | 类型 | 必填 | 说明 | 默认值 |
|------|------|------|------|--------|
| enableProxy | bool | 否 | 是否启用代理 | false |
| useSystemProxyProperties | bool | 否 | 使用系统代理配置 | false |
| proxyScheme | string | 否* | 代理协议(http/https) | - |
| proxyHost | string | 否* | 代理服务器地址 | - |
| proxyPort | int | 否* | 代理服务器端口 | - |
| proxyUser | string | 否 | 代理服务器用户名 | - |
| proxyPassword | string | 否 | 代理服务器密码 | - |

*注：启用代理时必填

## 功能特性

### 1. HTTP请求
- 支持GET/POST/PUT/DELETE等方法
- 支持自定义请求头
- 支持请求体传输控制
- 支持超时设置

### 2. 变量支持
- URL支持变量替换
- 请求头支持变量替换
- 支持使用`${metadata.key}`格式引用元数据
- 支持使用`${msg.key}`格式引用消息数据

### 3. 代理支持
- 支持HTTP/HTTPS代理
- 支持系统代理配置
- 支持代理认证

### 4. SSE流式请求
- 支持Server-Sent Events
- 支持大模型流式API调用
- 支持事件流处理

## 使用示例

### 1. 基础POST请求
```json
{
  "id": "api_call_1",
  "type": "restApiCall",
  "name": "发送数据",
  "configuration": {
    "restEndpointUrlPattern": "http://api.example.com/data",
    "requestMethod": "POST",
    "headers": {
      "Content-Type": "application/json"
    }
  }
}
```

### 2. 带变量的GET请求
```json
{
   "id": "api_call_2",
   "type": "restApiCall",
   "name": "查询数据",
   "configuration": {
      "restEndpointUrlPattern": "http://api.example.com/device/$metadata.deviceId",
      "requestMethod": "GET",
      "headers": {
         "Authorization": "Bearer ${metadata.token}"
      }
   }
}
```

### 3. SSE流式请求
```json
{
   "id": "api_call_3",
   "type": "restApiCall",
   "name": "流式调用",
   "configuration": {
      "restEndpointUrlPattern": "http://api.example.com/stream",
      "requestMethod": "POST",
      "headers": {
         "Accept": "text/event-stream",
         "Content-Type": "application/json"
      }
   }
}
```

## 执行结果

### 1. 成功场景
请求成功时，消息内容更新为：
- `msg.Data`: HTTP响应体内容
- `msg.Metadata.status`: 响应状态描述
- `msg.Metadata.statusCode`: HTTP状态码

### 2. 失败场景
请求失败时，消息内容更新为：
- `msg.Metadata.status`: 错误状态描述
- `msg.Metadata.statusCode`: HTTP错误码
- `msg.Metadata.errorBody`: 错误响应内容

### 3. SSE数据结构
SSE消息格式：
- `msg.Metadata.eventType`: 事件类型(data/event/id/retry)
- `msg.Data`: 事件数据内容

## 最佳实践

### 1. 请求配置
- 设置合适的超时时间
- 使用变量实现动态URL
- 合理配置并发请求数

### 2. 安全建议
- 生产环境启用SSL/TLS
- 避免跳过证书验证
- 保护敏感认证信息

### 3. 性能优化
- 合理设置并发数
- 避免过长超时时间
- 控制请求体大小

## 注意事项

1. **安全性**
   - 避免在配置中明文存储敏感信息
   - 生产环境建议使用HTTPS
   - 谨慎使用证书验证跳过

2. **性能考虑**
   - 合理设置并发请求数
   - 避免过长的超时时间
   - 注意请求体大小限制

3. **错误处理**
   - 实现错误重试机制
   - 记录请求响应日志
   - 合理处理超时情况

通过合理配置和使用REST API调用节点，您可以实现与外部服务的可靠集成。请根据实际需求选择合适的配置选项，并注意遵循安全和性能优化建议。
