---
title: 'OPC UA Write'
sidebar_position: 11
hide_title: true
keywords: [规则引擎, OPC UA, 数据写入, 规则链, 设备控制, 实践示例]
description: '详细介绍如何使用SagooIOT平台的OPC UA Write节点，包括配置、数据写入及数据格式说明，帮助用户快速掌握OPC UA数据写入功能。'
---

## 概述
OPC UA Write组件 用于向OPC UA服务器写入数据。可以同时写入一个或多个节点的数据。该组件是扩展组件，需要引入额外的扩展库：`rulego-components-iot`。

## 类型
`x/opcuaWrite`

## 节点配置说明

### 基础配置
| 配置项 | 说明 | 示例 |
|-------|------|------|
| 节点ID | 节点的唯一标识符 | node_13 |
| 名称 | 节点的显示名称 | OPC UA写入节点 |
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
写入节点数据需要从消息负荷中获取，格式如下：

```json
[
  {
    "nodeId": "ns=3;i=1009",
    "value": 1
  },
  {
    "nodeId": "ns=3;i=1010",
    "value": 2
  }
]
```

其中：
- `nodeId`: OPC UA节点的标识符
- `value`: 要写入的值

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

### 数据写入示例
```json
[
  {
    "nodeId": "ns=3;i=1009",
    "value": 100.5
  },
  {
    "nodeId": "ns=3;i=1010",
    "value": "测试数据"
  }
]
```

## 注意事项
1. 确保服务器地址可访问
2. 根据OPC UA服务器的安全要求选择合适的安全策略和认证方式
3. 确保提供的节点ID格式正确
4. 写入的数据类型要与OPC UA节点定义的数据类型匹配
5. 在使用证书认证时，确保证书文件和密钥文件路径正确且可访问
6. 建议在调试模式下先测试配置是否正确
7. 确保有足够的写入权限
