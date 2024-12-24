---
title: 'SSH'
sidebar_position: 6
hide_title: true
keywords: [规则引擎,SSH,远程执行,Shell脚本]
description: '详细介绍SagooIOT平台规则引擎中SSH节点的功能和使用方法，包括远程连接配置、Shell命令执行、变量替换等内容，帮助用户实现远程自动化运维功能。'
---


SSH节点是一个用于远程执行Shell命令的组件，通过SSH协议连接远程服务器并执行指定的命令。该组件常用于自动化运维、流程调度、大数据处理等场景。

## 基本信息

- **组件类型**: `ssh`
- **功能**: 远程执行Shell命令
- **应用场景**: 
  - 自动化运维
  - 流程调度
  - 大数据处理
  - 系统监控

## 配置说明

### 基本配置

| 字段 | 类型 | 必填 | 说明 | 默认值 |
|------|------|------|------|--------|
| host | string | 是 | SSH服务器地址 | 127.0.0.1 |
| port | int | 是 | SSH服务器端口 | 22 |
| username | string | 是 | SSH登录用户名 | root |
| password | string | 是 | SSH登录密码 | - |
| cmd | string | 是 | Shell命令 | - |

## 功能特性

### 1. 命令执行
- 支持所有Shell命令
- 命令结果实时返回
- 自动转换数据类型
- 支持多行命令

### 2. 变量替换
- 支持元数据变量
- 支持消息变量
- 动态命令生成
- 灵活的数据引用

### 3. 连接管理
- 自动建立连接
- 安全认证
- 会话复用
- 资源自动释放

## 使用示例

### 1. 基础命令执行
```json
{
  "id": "ssh_node_1",
  "type": "ssh",
  "name": "系统信息查询",
  "configuration": {
    "host": "192.168.1.100",
    "port": 22,
    "username": "admin",
    "password": "password123",
    "cmd": "df -h && free -m"
  }
}
```

### 2. 使用变量的配置
```json
{
  "id": "ssh_node_2",
  "type": "ssh",
  "name": "日志查询",
  "configuration": {
    "host": "192.168.1.100",
    "port": 22,
    "username": "admin",
    "password": "password123",
    "cmd": "tail -n ${metadata.lines} /var/log/${msg.logfile}"
  }
}
```

### 3. 多命令执行
```json
{
  "id": "ssh_node_3",
  "type": "ssh",
  "name": "系统维护",
  "configuration": {
    "host": "192.168.1.100",
    "port": 22,
    "username": "admin",
    "password": "password123",
    "cmd": "service ${metadata.service} restart && systemctl status ${metadata.service}"
  }
}
```

## 执行结果

### 1. 成功场景
- 命令成功执行
- 输出结果替换msg.Data
- 数据类型转为TEXT
- 消息发送到Success链路

### 2. 失败场景
- SSH连接失败
- 认证失败
- 命令执行错误
- 权限不足
- 消息发送到Failure链路

## 最佳实践

### 1. 安全性
- 使用强密码
- 限制执行权限
- 避免敏感信息
- 及时修改密码

### 2. 命令管理
- 合理使用变量
- 检查命令合法性
- 控制执行时间
- 处理执行结果

### 3. 性能优化
- 复用SSH连接
- 控制并发数量
- 合理设置超时
- 及时释放资源

## 注意事项

1. **安全性**
   - 不要在配置中明文存储密码
   - 限制命令执行范围
   - 注意权限控制
   - 避免危险操作

2. **稳定性**
   - 处理网络异常
   - 设置执行超时
   - 验证命令有效性
   - 控制资源使用

3. **兼容性**
   - 注意Shell差异
   - 处理特殊字符
   - 考虑系统版本
   - 验证命令兼容性

4. **特殊说明**
   - 命令结果强制转为TEXT类型
   - 支持`${key}`格式的变量替换
   - 可以使用metadata和msg中的变量
   - 建议使用绝对路径

## 变量使用

### 1. 元数据变量
- 使用格式：`${metadata.key}`
- 示例：`${metadata.timeout}`
- 应用：超时设置、参数配置

### 2. 消息变量
- 使用格式：`${msg.key}`
- 示例：`${msg.filename}`
- 应用：文件操作、动态参数

### 3. 最佳实践
- 提供默认值
- 验证变量存在
- 转义特殊字符
- 注意变量作用域

通过合理配置和使用SSH节点，您可以实现安全可靠的远程命令执行功能。请根据实际需求选择合适的配置选项，并注意遵循安全和性能优化建议。
