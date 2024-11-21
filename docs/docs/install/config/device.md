---
title: "设备日志缓存"
sidebar_position: 2
hide_title: true
---

## 配置参考

设备日志的参考配置如下：

```yaml
server:
    deviceCacheData:
        poolSize: 100 #设备数据缓存池连接数
        recordDuration: "300m"  #设备数据缓存时长，超过时长的数据将被清除。默认为10分钟
        recordLimit: 1000 #设备数据缓存条数限制，超过条数的数据将被清除。默认为1000条
        pipelineBufferSize: 10 #每次写入redis的条数

```

## 配置说明

数据存储在Redis中，不适大量长期存储，只适合短期存储。
