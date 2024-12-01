---
title: '设备影子概述'
sidebar_position: 0
hide_title: true
keywords: [设备,影子]
description: '物联网平台提供设备影子功能，用于缓存设备上报的状态数据和应用程序下发的指令信息。设备在线时，可以直接获取物联网平台指令；设备离线后，再次上线可以主动拉取物联网平台指令。'
---


## 什么是设备影子
设备影子是物联网平台为设备维护的一份数据副本，它储存了设备的期望状态（云端期望设备具有的状态）和实际状态（设备当前的真实状态）。它主要解决了以下问题：

1. 网络不稳定问题
    - 当设备网络不稳定时，设备可以通过影子确保状态同步
    - 在设备重新上线后，可以获取离线期间的状态变更
    - 避免了网络波动导致的数据丢失

2. 状态同步问题
    - 提供可靠的状态存储机制
    - 确保云端和设备端状态的一致性
    - 支持增量更新和状态合并

3. 指令下发问题
    - 支持离线设备的指令缓存
    - 确保指令可靠送达
    - 提供指令执行状态跟踪

## 应用场景

1. 设备状态同步
   ```mermaid
   sequenceDiagram
       participant Device as 设备
       participant Shadow as SagooIoT物联网平台
       participant App as 应用
       
       Device->>Shadow: 上报状态
       Shadow->>App: 通知状态更新
       App->>Shadow: 获取状态
   ```

2. 离线消息缓存
   ```mermaid
   sequenceDiagram
       participant App as 应用
       participant Shadow as SagooIoT物联网平台
       participant Device as 离线设备
       
       App->>Shadow: 下发指令
       Shadow->>Shadow: 缓存指令
       Device->>Shadow: 设备上线
       Shadow->>Device: 下发缓存指令
   ```

3. 设备功能调用
   ```mermaid
   sequenceDiagram
       participant App as 应用
       participant Shadow as SagooIoT物联网平台
       participant Device as 设备
       
       App->>Shadow: 调用功能
       Shadow->>Device: 下发指令
       Device->>Shadow: 上报结果
       Shadow->>App: 返回结果
   ```

## 设备影子数据

设备影子是一个JSON文档，用于存储设备上报状态数据和应用程序期望状态信息。JSON数据格式的详细说明，请参见[设备影子JSON详解](json-format.md)。

每个设备有且只有一个设备影子，设备可以通过MQTT获取和设置设备影子来同步状态，该同步可以是影子同步给设备，也可以是设备同步给影子。
