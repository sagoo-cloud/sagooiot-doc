---
title: '设备影子JSON详解'
sidebar_position: 1
hide_title: true
keywords: [设备,影子,json,格式]
description: '本文档介绍设备影子的JSON格式表达方法，设备影子JSON文档示例'
---

本文档介绍设备影子的JSON格式表达方法。

设备影子JSON文档示例：


## 示例
```json
{
    "deviceKey": "device123",
    "productKey": "product456",
    "version": 3,
    "reported": {
        "temperature": 25.6,
        "humidity": 60,
        "status": "running",
        "_function_result": {
            "requestId": "product456_device123_setTemp_1638443922156",
            "status": "completed",
            "result": {
                "success": true
            }
        }
    },
    "desired": {
        "temperature": 24.0,
        "_function": {
            "requestId": "product456_device123_setTemp_1638443922156",
            "funcKey": "setTemp",
            "params": {
                "target": 24.0
            },
            "timestamp": 1638443922156,
            "status": "completed",
            "queuedAt": 1638443922156,
            "isOnline": true
        }
    },
    "metadata": {
        "reported": {
            "temperature": {
                "timestamp": 1638443922156,
                "version": 3,
                "source": "device",
                "quality": "good"
            }
        },
        "desired": {
            "temperature": {
                "timestamp": 1638443922156,
                "version": 3,
                "source": "cloud",
                "quality": "good"
            }
        },
        "sync": {
            "lastSyncTime": 1638443922156,
            "status": "synced",
            "lastError": "",
            "retryCount": 0,
            "nextSyncTime": 1638443927156
        }
    },
    "lastUpdated": "2023-12-01T10:30:00Z"
}
```

## 顶层字段说明

| 属性 | 描述 |
|------|------|
| deviceKey | 设备唯一标识符 |
| productKey | 产品唯一标识符 |
| version | 影子版本号，每次更新自增 |
| reported | 设备上报的实际状态 |
| desired | 云端期望的目标状态 |
| metadata | 影子元数据信息 |
| lastUpdated | 最后更新时间 |

## reported字段说明

| 属性 | 描述 |
|------|------|
| 自定义属性 | 设备实际状态值，如temperature、humidity等 |
| _function_result | 设备执行功能的结果报告 |

### _function_result字段说明

| 属性 | 描述 |
|------|------|
| requestId | 功能调用请求ID |
| status | 功能执行状态(completed/failed) |
| result | 功能执行结果数据 |

## desired字段说明

| 属性 | 描述 |
|------|------|
| 自定义属性 | 期望设备达到的状态值 |
| _function | 期望设备执行的功能调用 |

### _function字段说明

| 属性 | 描述 |
|------|------|
| requestId | 功能调用请求ID |
| funcKey | 功能标识符 |
| params | 功能调用参数 |
| timestamp | 功能调用时间戳(毫秒) |
| status | 功能执行状态(pending/completed/failed/timeout) |
| queuedAt | 功能进入队列时间戳(毫秒) |
| isOnline | 下发指令时设备是否在线 |

## metadata字段说明

### reported/desired元数据

| 属性 | 描述 |
|------|------|
| timestamp | 属性更新时间戳(毫秒) |
| version | 更新时的影子版本号 |
| source | 更新来源(device/cloud) |
| quality | 数据质量(good/bad/uncertain) |

### sync元数据

| 属性 | 描述 |
|------|------|
| lastSyncTime | 最后同步时间戳(毫秒) |
| status | 同步状态(synced/pending/failed) |
| lastError | 上次同步失败原因 |
| retryCount | 同步重试次数 |
| nextSyncTime | 下次计划同步时间戳(毫秒) |

## 使用说明

1. 影子版本控制
    - 每次更新操作都会使version自增
    - 用于检测版本冲突，确保数据一致性

2. 状态同步
    - reported反映设备实际状态
    - desired表示期望状态
    - 设备需要自行处理desired变更并更新实际状态

3. 功能调用
    - 通过desired._function下发功能调用
    - 设备执行后通过reported._function_result报告结果
    - 支持离线缓存，设备上线后自动执行

4. 元数据管理
    - 记录每个属性的更新历史
    - 跟踪同步状态
    - 支持数据质量标记

5. 注意
    - 及时清理过期的功能调用信息
    - 合理使用数据质量标记
    - 注意处理版本冲突
