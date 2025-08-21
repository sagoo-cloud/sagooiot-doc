---
sidebar_position: 2
title: '子设备Topic'
keywords: [网关子设备,MQTT Topic,消息主题,设备通信,属性上报,事件上报,服务调用,远程配置,OTA升级,Topic格式,通信规范]
description: '详细说明SagooIOT平台的网关子设备MQTT Topic结构，包括设备属性上报、事件上报、服务调用等各类消息主题的定义和使用方法。'
---
# 网关子设备Topic使用说明

SagooIoT平台支持完整的网关子设备管理功能，通过MQTT协议实现网关与子设备之间的双向通信。本手册将详细介绍如何在SagooIoT平台中配置和使用网关子设备功能。

:::tip 提示
适用于子设备通过网关模式，直接采用MQTT协议进行通信。
:::

参考官方文档：
- [SagooIoT MQTT Topic协议](mqtt_topic.md)
- [SagooIoT MQTT上报协议](mqtt_report.md)

## 网关子设备架构
```
云平台(SagooIoT) ←→ 网关设备 ←→ 子设备1
                              ←→ 子设备2
                              ←→ 子设备3
                              ←→ ...
```


## Topic结构说明

### Topic格式规范
```
/sys/{子设备productKey}/{网关deviceKey}/child/{子设备deviceKey}/thing/{功能}/{操作}
```

### 参数详解
| 参数 | 说明 | 示例 |
|------|------|------|
| `{子设备productKey}` | 子设备所属产品的Key | `temp_sensor_product` |
| `{网关deviceKey}` | 网关设备的Key | `gateway_001` |
| `{子设备deviceKey}` | 子设备的Key | `temp_sensor_001` |
| `{功能}` | 功能类型(event/service/config等) | `event` |
| `{操作}` | 具体操作(post/get/set等) | `property/post` |

### 完整Topic示例
```bash
# 子设备属性上报
/sys/temp_sensor_product/gateway_001/child/temp_sensor_001/thing/event/property/post

# 平台向子设备下发服务调用
/sys/temp_sensor_product/gateway_001/child/temp_sensor_001/thing/service/reset

# 子设备事件上报
/sys/temp_sensor_product/gateway_001/child/temp_sensor_001/thing/event/high_temperature_alarm/post
```

## 功能使用指南

### 1. 子设备属性上报

#### Topic
```
/sys/{子设备productKey}/{网关deviceKey}/child/{子设备deviceKey}/thing/event/property/post
```

#### 消息格式
```json
{
  "id": "123456789",
  "version": "1.0",
  "method": "thing.event.property.post",
  "params": {
    "temperature": 25.6,
    "humidity": 65.2
  },
  "timestamp": 1640995200000
}
```

#### 平台响应
```json
{
  "id": "123456789",
  "code": 200,
  "message": "success",
  "timestamp": 1640995200100
}
```


### 2. 子设备事件上报

#### Topic
```
/sys/{子设备productKey}/{网关deviceKey}/child/{子设备deviceKey}/thing/event/{事件标识符}/post
```

#### 消息格式
```json
{
  "id": "123456790",
  "version": "1.0",
  "method": "thing.event.high_temperature_alarm.post",
  "params": {
    "alarm_value": 85.2,
    "alarm_time": "2024-01-01 12:00:00"
  },
  "timestamp": 1640995200000
}
```


### 3. 子设备批量属性上报

#### Topic
```
/sys/{子设备productKey}/{网关deviceKey}/child/{子设备deviceKey}/thing/event/property/pack/post
```

#### 消息格式
```json
{
  "id": "123456791",
  "version": "1.0",
  "method": "thing.event.property.pack.post",
  "params": {
    "properties": {
      "temperature": {
        "value": 25.6,
        "time": 1640995200000
      },
      "humidity": {
        "value": 65.2,
        "time": 1640995200000
      }
    }
  },
  "timestamp": 1640995200000
}
```

### 4. 平台向子设备下发服务调用

#### 平台下发Topic
```
/sys/{子设备productKey}/{网关deviceKey}/child/{子设备deviceKey}/thing/service/{服务标识符}
```

#### 平台下发消息
```json
{
  "id": "123456792",
  "version": "1.0",
  "method": "thing.service.reset",
  "params": {},
  "timestamp": 1640995200000
}
```

#### 子设备响应Topic
```
/sys/{子设备productKey}/{网关deviceKey}/child/{子设备deviceKey}/thing/service/{服务标识符}_reply
```

#### 子设备响应消息
```json
{
  "id": "123456792",
  "code": 200,
  "message": "success",
  "data": {},
  "timestamp": 1640995201000
}
```


### 5. 子设备状态管理

#### 子设备上线
```json
{
  "id": "123456793",
  "version": "1.0",
  "method": "thing.status.online",
  "params": {},
  "timestamp": 1640995200000
}
```

#### Topic
```
/sys/{子设备productKey}/{网关deviceKey}/child/{子设备deviceKey}/thing/status/online
```

#### 子设备离线
```json
{
  "id": "123456794",
  "version": "1.0",
  "method": "thing.status.offline",
  "params": {},
  "timestamp": 1640995200000
}
```

#### Topic
```
/sys/{子设备productKey}/{网关deviceKey}/child/{子设备deviceKey}/thing/status/offline
```

### 6. 子设备配置管理

#### 获取配置
```json
{
  "id": "123456795",
  "version": "1.0",
  "method": "thing.config.get",
  "params": {
    "configScope": "device",
    "getType": "file"
  },
  "timestamp": 1640995200000
}
```

#### Topic
```
/sys/{子设备productKey}/{网关deviceKey}/child/{子设备deviceKey}/thing/config/get
```

## 常见问题和故障排除

### Q1: 子设备消息没有被平台接收到
**可能原因：**
- Topic格式不正确
- 网关设备未在线
- 子设备未正确绑定到网关
- MQTT连接认证失败

**解决方案：**
1. 检查Topic格式是否符合规范：`/sys/{子设备productKey}/{网关deviceKey}/child/{子设备deviceKey}/thing/...`
2. 确认网关设备在平台显示为在线状态
3. 检查子设备是否正确关联到网关设备
4. 验证MQTT连接参数（用户名、密码、clientId等）

### Q2: 平台下发的服务调用子设备收不到
**可能原因：**
- 未订阅服务调用Topic
- Topic订阅格式错误
- 设备离线或网络连接问题

**解决方案：**
1. 确保订阅了正确的服务调用Topic：`/sys/{子设备productKey}/{网关deviceKey}/child/{子设备deviceKey}/thing/service/+`
2. 检查网络连接状态
3. 查看MQTT客户端日志，确认订阅是否成功

