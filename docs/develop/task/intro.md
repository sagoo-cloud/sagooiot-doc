---
title: '任务系统概述'
sidebar_position: 0
hide_title: true
keywords: [任务队列,Asynq,异步处理,分布式任务,Redis任务队列,任务调度,任务处理,消息队列,任务系统,后台任务]
description: '详细说明SagooIOT平台的任务队列系统，包括Asynq实现、系统架构和功能特点等完整的任务处理指南。'
---

SagooIoT系统支持任务队列（Task Queue）处理。任务队列一般用于跨线程或跨计算机分配工作的一种机制。其本质是生产者消费者模型，生产者发送任务到消息队列，消费者负责处理任务。
任务队列的输入是称为任务(Task)的工作单元。专用的工作进程不断监视任务队列以查找要执行的新工作。

## 实现说明
SagooIoT的任务队列基于Asynq实现，支持分布式任务，支持定时任务，支持后台任务，支持解耦任务，支持实时处理任务。
Asynq是一个使用Go语言实现的分布式任务队列和异步处理库，它由Redis提供支持，它提供了轻量级的、易于使用的API，并且具有高可扩展性和高可定制化性。
Asynq主要由以下几个组件组成：
* 任务(Task)：需要被异步执行的操作；
* 处理器(Processor)：负责执行任务的工作进程；
* 队列(Queue)：存放待执行任务的队列；
* 调度器(Scheduler)：根据规则将任务分配给不同的处理器进行执行。

关于Asynq的更多信息，请参考[Asynq](https://www.tizi365.com/topic/14001.html)。

## 功能特点
* 保证至少执行一次任务
* 任务写入Redis后可以持久化
* 任务失败之后，会自动重试
* worker崩溃自动恢复
* 可是实现任务的优先级
* 任务可以进行编排
* 任务可以设定执行时间或者最长可执行的时间a
* 支持中间件
* 可以使用 unique-option 来避免任务重复执行，实现唯一性
* 支持 Redis Cluster 和 Redis Sentinels 以达成高可用性

## 应用场景

* 分布式任务：可以将任务分发到多个工作者进程或机器上执行，以提高任务处理速度。
* 定时任务：可以在指定时间执行任务。例如：每天定时备份数据、日志归档、心跳测试、运维巡检。支持 crontab 定时模式
* 后台任务：可以在后台执行耗时任务，例如图像处理、数据分析等，不影响用户界面的响应。
* 解耦任务：可以将任务与主程序解耦，以提高代码的可读性和可维护性，解耦应用程序最直接的好处就是可扩展性和并发性能的提高。支持并发执行任务，同时支持自动动态扩展。
* 实时处理：可以支持实时处理任务，例如即时通讯、消息队列等。
