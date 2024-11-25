---
title: 'Modbus协议'
hide_title: true
sidebar_position: 3
keywords: [Modbus协议,Modbus-RTU,Modbus-TCP,RS485,工业通信,串口通信,工业总线,协议转换,工业物联网,设备通信]
description: '详细说明Modbus协议在SagooIOT平台中的应用，包括Modbus-RTU和Modbus-TCP的实现方式、转换方案和并发处理机制。'
---

# Modbus协议

## Modbus-RTU
标准的Modbus RTU协议，使用CRC16校验，支持RS485总线

可以通过DTU转TCP的方式

## Modbus-TCP
数据格式同RTU，添加PDU包头，去掉校验值。ModbusTCP支持并发读写，避免消息拥堵。实际项目中，可以使用ModbusRTU转TCP的网关，
以提高执行效率，尤其是在多个节点的情况下。

cocurrency: 10 //并发数量

## ASCII
支持Modbus Ascii协议的设备并不多，数据冗余，所以本系统暂不支持
