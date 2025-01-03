---
slug: sagooiot-release-V2.0.0
title: SagooIoT V2.0.0 正式释放
authors: [microrain]
tags: [sagooiot,版本发布]
---

SagooIoT V2 版本正式释放

按照计划，SagooIoT V2 版本已经正式释放。此次版本变化很大，重点是结构性的调整及核心组件的处理的变化。接口将向V1.x版本进行兼容。

版本变化参见：[版本更新日志](/docs/base/history)
{/* truncate */}
- 在V2版中，SagooIoT在全局统一使用分布式的任务队列处理方式，对数据进行统一实时的处理。采用具备跨线程、跨计算机分配工作的一种机制。支持分布式任务，支持定时任务，支持后台任务，支持解耦任务，支持实时处理任务。

- 规范了插件的编写方式，独立出来，方便插件的编写及维护，并简化主工程的代码量。

- 增加模块化的开发方式，进行模块功能与核心功能分离，方便功能的扩展及维护，并简化主工程的代码量。

- 调整目录结构，公共处理统一到pkg目录中，方便其它功能开发调用及代码的维护管理。

- 增加核心处理程序、web服务程序、任务队列处理程序分离单独运行的支持，提高程序的稳定性及可靠性。（收费版中提供）

社区用户可以通过以下方式获取SagooIoT V2版本：https://github.com/sagoo-cloud/sagooiot

原有的V1.x版本将不在继续维护，放到分支sagooiot-v1。 前后端工程都是如此。

