---
title: "任务队列配置"
sidebar_position: 2
hide_title: true
---


## 配置参考

在配置文件中找到`task:`根据实际情况修改配置。

```yaml

task:
retention: 60 #任务保留时间，单位秒
maxRetry: 1 #任务最大重试次数
clearArchived: 300 #清理归档任务时间，单位秒
timeout: 30 #任务超时时间，单位秒
concurrencyNum: 1000 #任务并发数
groupGracePeriod: 1 #多久聚合一次，单位秒
groupMaxDelay: 1 #最晚多久聚合一次，单位秒
groupMaxSize: 2000 #每多少个任务聚合一次，单位个

```
## 配置说明
`groupGracePeriod: 2`  

这个配置表示，任务在加入到聚合组之后，会等待2秒来查看是否还有更多的任务需要加入到这个组中。如果在2秒内没有更多的任务加入，那么当前的聚合组就会立即处理。这有助于减少聚合的延迟，特别是当任务到达的速率不高时。

`groupMaxDelay: 10`  

这个配置是聚合的最大延迟时间。即使没有达到groupMaxSize所指定的任务数量，如果在10秒内没有新的任务加入到聚合组，那么当前的聚合组也会立即处理。这确保了在任务到达速率较低时，聚合组不会无限期地等待更多的任务。

`groupMaxSize: 100`  

这个配置定义了每个聚合组可以包含的最大任务数量。当聚合组的任务数量达到100个时，不论是否过了groupGracePeriod，也不论是否还未达到groupMaxDelay，聚合组都会立即处理。这有助于控制聚合组的大小，避免单个聚合组变得过大。

这三个配置参数共同作用，允许您根据任务的到达速率和系统的处理能力来精细地控制任务的聚合行为。通过合理地设置这些参数，您可以在减少系统负载和提高处理效率之间找到一个平衡点。