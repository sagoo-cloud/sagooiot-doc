---
title: 'OPC UA Read'
sidebar_position: 10
hide_title: true
keywords: [规则引擎, OPC UA, 数据读取, 规则链, 设备接入, 实践示例]
description: '详细介绍如何使用SagooIOT平台的OPC UA Read节点，包括配置、数据读取及数据格式说明，帮助用户快速掌握OPC UA数据读取功能。'
---

## 概述
OPC UA Read组件 用于从OPC UA服务器读取数据。可以读取一个或多个节点的数据。该组件是扩展组件，需要引入额外的扩展库：`rulego-components-iot`。

## 类型
`x/opcuaRead`

## 节点配置说明

### 基础配置
| 配置项 | 说明 | 示例 |
|-------|------|------|
| 节点ID | 节点的唯一标识符 | node_9 |
| 名称 | 节点的显示名称 | OPC UA读取节点 |
| 调试模式 | 是否启用调试模式 | 可选择开启或关闭 |

### 连接配置
| 配置项 | 说明 | 示例值 | 必填 |
|-------|------|--------|------|
| 服务器地址 | OPC UA服务器的连接地址 | opc.tcp://127.0.0.1:53530/OPCUA/SimulationServer | 是 |
| 策略 | 安全策略选项 | None | 否 |
| 模式 | 通信模式选项 | None | 否 |
| 授权方式 | 认证方式选择 | Anonymous | 否 |

### 认证信息
根据选择的授权方式，需要填写相应的认证信息：

#### 用户名密码认证
当授权方式为`UserName`时：
- **用户名**：必填
- **密码**：必填

#### 证书认证
当授权方式为`Certificate`时：
- **证书文件路径**：必填
- **密钥文件路径**：必填

### 安全策略说明
| 策略值 | 说明 |
|--------|------|
| None | 不使用任何安全策略 |
| Basic128Rsa15 | 使用基本的128位加密和RSA15签名 |
| Basic256 | 使用基本的256位加密 |
| Basic256Sha256 | 使用基本的256位加密和SHA256签名 |

### 通信模式说明
| 模式值 | 说明 |
|--------|------|
| None | 不使用任何模式 |
| Sign | 消息签名 |
| SignAndEncrypt | 消息签名和加密 |

## 输入数据格式
查询节点列表需要从消息负荷中获取，格式如下：

```json
[
  "ns=3;i=1003",
  "ns=3;i=1005"
]
```

## 输出数据格式
查询结果会重新赋值到`msg.Data`，通过Success链传给下一个节点，数据格式如下：

```json
[
  {
    "displayName": "ns=3;i=1003",
    "floatValue": 0,
    "nodeId": "ns=3;i=1003",
    "quality": 0,
    "recordTime": "0001-01-01T00:00:00Z",
    "sourceTime": "0001-01-01T00:00:00Z",
    "timestamp": "0001-01-01T00:00:00Z"
  }
]
```

## 路由类型
节点执行后支持两种路由：
- **Success**: 执行成功，消息将发送到Success链
- **Failure**: 执行失败，消息将发送到Failure链

## 使用示例

### 基础配置示例
```yaml
server: "opc.tcp://127.0.0.1:53530/OPCUA/SimulationServer"
policy: "None"
mode: "None"
auth: "Anonymous"
```

### 带认证的配置示例
```yaml
server: "opc.tcp://127.0.0.1:53530/OPCUA/SimulationServer"
policy: "Basic256"
mode: "Sign"
auth: "UserName"
username: "admin"
password: "password123"
```

## 注意事项
1. 确保服务器地址可访问
2. 根据OPC UA服务器的安全要求选择合适的安全策略和认证方式
3. 确保提供的节点ID格式正确
4. 在使用证书认证时，确保证书文件和密钥文件路径正确且可访问
5. 建议在调试模式下先测试配置是否正确
