---
title: '字典使用指南'
sidebar_position: 3
keywords: [字典管理,数据字典,枚举数据,字典接口,数据管理,系统配置,接口使用,数据类型,字典状态,API调用]
description: '详细说明SagooIOT平台的字典使用方法，包括字典接口调用、参数说明和状态管理等字典功能使用指南。'
---

# 字典的使用
SagooIOT服务端提供了字典相关的接口。所有枚举型的数据都可以通过字典接口获取到对应的值。

字典接口址：

:::tip 接口
api/v1/common/dict/data/list?dictType=network_server_type&status=1

:::


**参数说明：**
* dictType: 字典类型
* status: 字典状态，1：启用，2：禁用
