---
title: '发送邮件'
sidebar_position: 5
hide_title: true
keywords: [规则引擎,邮件发送,SMTP,邮件通知]
description: '详细介绍SagooIOT平台规则引擎中发送邮件节点的功能和使用方法，包括SMTP配置、TLS加密、邮件模板等内容，帮助用户实现邮件通知功能。'
---


发送邮件节点是一个用于发送电子邮件的组件，支持HTML和纯文本格式，可以配置多个收件人、抄送和密送，并支持TLS加密连接。该组件还支持使用模板变量动态生成邮件主题和内容。

## 基本信息

- **组件类型**: `sendEmail`
- **功能**: 发送HTML或纯文本格式的电子邮件
- **支持特性**: 
  - 多收件人
  - 抄送/密送
  - TLS加密
  - 变量替换
  - HTML格式

## 配置说明

### 1. SMTP服务器配置

| 字段 | 类型 | 必填 | 说明 | 默认值 |
|------|------|------|------|--------|
| smtpHost | string | 是 | SMTP服务器地址 | - |
| smtpPort | int | 是 | SMTP服务器端口 | - |
| username | string | 是 | SMTP认证用户名 | - |
| password | string | 是 | SMTP认证密码 | - |
| enableTls | bool | 否 | 是否启用TLS | false |
| connectTimeout | int | 否 | 连接超时时间(秒) | 10 |

### 2. 邮件内容配置

| 字段 | 类型 | 必填 | 说明 | 默认值 |
|------|------|------|------|--------|
| from | string | 是 | 发件人地址 | - |
| to | string | 是 | 收件人列表 | - |
| cc | string | 否 | 抄送列表 | - |
| bcc | string | 否 | 密送列表 | - |
| subject | string | 是 | 邮件主题 | - |
| body | string | 是 | 邮件正文 | - |

## 功能特性

### 1. 邮件格式
- 支持HTML富文本
- 支持纯文本格式
- 自动处理字符编码

### 2. 收件人管理
- 支持多个收件人
- 支持抄送(CC)
- 支持密送(BCC)
- 自动验证邮箱格式

### 3. 安全特性
- TLS加密支持
- SMTP认证
- 密码保护
- 连接超时控制

### 4. 模板变量
- 支持主题变量替换
- 支持正文变量替换
- 支持元数据引用

## 使用示例

### 1. 基础邮件配置
```json
{
  "id": "email_node_1",
  "type": "sendEmail",
  "name": "邮件通知",
  "configuration": {
    "smtpHost": "smtp.example.com",
    "smtpPort": 587,
    "username": "sender@example.com",
    "password": "your-password",
    "enableTls": true,
    "email": {
      "from": "sender@example.com",
      "to": "recipient@example.com",
      "subject": "测试邮件",
      "body": "这是一封测试邮件"
    }
  }
}
```

### 2. HTML格式邮件
```json
{
  "id": "html_email_node",
  "type": "sendEmail",
  "name": "HTML邮件",
  "configuration": {
    "smtpHost": "smtp.example.com",
    "smtpPort": 587,
    "username": "sender@example.com",
    "password": "your-password",
    "enableTls": true,
    "email": {
      "from": "sender@example.com",
      "to": "recipient1@example.com,recipient2@example.com",
      "cc": "cc@example.com",
      "subject": "HTML测试邮件",
      "body": "<h1>测试邮件</h1><p>这是一封<strong>HTML</strong>格式的测试邮件</p>"
    }
  }
}
```

### 3. 使用变量的配置
```json
{
  "id": "template_email_node",
  "type": "sendEmail",
  "name": "模板邮件",
  "configuration": {
    "smtpHost": "smtp.example.com",
    "smtpPort": 587,
    "username": "sender@example.com",
    "password": "your-password",
    "enableTls": true,
    "email": {
      "from": "sender@example.com",
      "to": "recipient@example.com",
      "subject": "警报: ${alarmType}",
      "body": "设备 ${deviceName} 在 ${timestamp} 触发了 ${alarmType} 警报"
    }
  }
}
```

## 执行结果

### 1. 成功场景
- 邮件成功发送到所有收件人
- 原始消息内容保持不变
- 消息发送到Success链路

### 2. 失败场景
- SMTP连接失败
- 认证失败
- 发送超时
- 收件人地址无效
- 邮件内容格式错误
- 在metadata中添加error字段
- 消息发送到Failure链路

## 最佳实践

### 1. SMTP配置
- 使用TLS加密保护通信安全
- 使用授权码替代登录密码
- 设置合适的超时时间
- 正确配置端口号

### 2. 邮件内容
- 使用有意义的发件人地址
- 合理使用抄送和密送
- HTML内容注意兼容性
- 避免发送过大附件

### 3. 变量使用
- 合理规划变量命名
- 提供默认值处理
- 注意转义特殊字符
- 验证变量有效性

## 注意事项

1. **安全性**
   - 不要在配置中明文存储密码
   - 使用TLS加密保护通信
   - 注意保护授权码安全
   - 避免暴露敏感信息

2. **性能**
   - 控制邮件大小
   - 合理设置超时时间
   - 避免频繁发送
   - 注意并发控制

3. **兼容性**
   - 测试不同邮件客户端
   - 验证HTML格式兼容性
   - 检查字符编码
   - 注意附件格式

4. **特殊说明**
   - 主流邮件服务商需要使用授权码
   - 不同服务商的端口可能不同
   - TLS端口一般为587或465
   - 变量使用`${key}`格式引用

通过合理配置和使用发送邮件节点，您可以实现可靠的邮件通知功能。请根据实际需求选择合适的配置选项，并注意遵循安全和性能优化建议。
