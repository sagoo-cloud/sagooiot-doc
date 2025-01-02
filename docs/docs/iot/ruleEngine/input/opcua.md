---
title: 'OPC UA'
sidebar_position: 1
hide_title: true
keywords: [规则引擎, OPC UA, 数据读取, 规则链, 设备接入, 实践示例]
description: '详细介绍如何使用SagooIOT平台的OPC UA节点，包括配置、数据读取及发送到规则链的具体实现步骤，帮助用户快速掌握OPC UA节点的使用方法。'
---

# OPC UA

## 概述
OPC UA 定时从OPC UA服务器读取数据，并将数据发送到规则链。该组件是扩展组件，需要引入额外的扩展库：`rulego-components-iot`。

## 类型
`endpoint/opcua`

## 节点配置说明

### 基础配置
| 配置项 | 说明 | 示例 |
|-------|------|------|
| 节点ID | 节点的唯一标识符 | node_7 |
| 名称 | 节点的显示名称 | OPC UA读取器 |
| 调试模式 | 是否启用调试模式 | 可选择开启或关闭 |

### 连接配置
| 配置项 | 说明 | 示例值 | 说明 |
|-------|------|--------|------|
| 服务器地址 | OPC UA服务器的连接地址 | opc.tcp://localhost:4840 | 必填项 |
| 策略 | 安全策略选项 | None | 可选值：None, Basic128Rsa15, Basic256, Basic256Sha256 |
| 模式 | 通信模式选项 | None | 可选值：None, Sign, SignAndEncrypt |
| 授权方式 | 认证方式选择 | Anonymous | 可选值：Anonymous, UserName, Certificate |

### 认证信息
根据选择的授权方式，需要填写相应的认证信息：

#### 用户名密码认证
- **用户名**：当授权方式为`UserName`时必填
- **密码**：当授权方式为`UserName`时必填

#### 证书认证
- **证书文件路径**：当授权方式为`Certificate`时必填
- **密钥文件路径**：当授权方式为`Certificate`时必填

### 数据读取配置
| 配置项 | 说明 | 示例值 |
|-------|------|--------|
| 读任务时间配置 | 使用cron表达式配置数据读取间隔 | @every 1m |
| 节点ID列表 | 要读取的OPC UA节点ID列表 | ns=3;i=1003 |

#### 时间配置说明
- 支持标准cron表达式
- 示例：`@every 1m`表示每隔1分钟读取一次
- 格式：秒 分 时 日 月 周

#### 节点ID列表说明
- 支持添加多个节点ID
- 格式：ns=命名空间;s=标识符 或 ns=命名空间;i=标识符
- 示例：ns=3;i=1003

## 输出数据格式
节点读取的数据将以JSON格式发送到规则链，数据结构如下：

```json
{
  "displayName": "节点名称",
  "nodeId": "节点ID",
  "recordTime": "记录时间",
  "sourceTime": "源时间",
  "value": "节点值",
  "quality": "数据质量",
  "floatValue": "浮点值",
  "timestamp": "时间戳"
}
```

## 使用示例

### 基础配置示例
```yaml
server: "opc.tcp://localhost:4840"
policy: "None"
mode: "None"
auth: "Anonymous"
interval: "@every 1m"
nodeIds: ["ns=3;i=1003"]
```

### 带认证的配置示例
```yaml
server: "opc.tcp://localhost:4840"
policy: "Basic256"
mode: "Sign"
auth: "UserName"
username: "admin"
password: "password123"
interval: "@every 1m"
nodeIds: ["ns=3;i=1003", "ns=3;i=1004"]
```

## 注意事项
1. 确保服务器地址可访问
2. 根据实际需求选择合适的安全策略和认证方式
3. 合理设置读取时间间隔，避免频繁读取导致服务器压力过大
4. 正确配置节点ID格式，确保能够正确读取数据
