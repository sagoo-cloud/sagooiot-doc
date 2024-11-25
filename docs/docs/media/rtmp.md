---
title: 'RTMP协议接入'
sidebar_position: 2
hide_title: true
keywords: [RTMP协议,视频推流,流媒体服务,直播推流,ffmpeg,视频流,实时传输,流媒体配置,RTMP服务,视频传输]
description: '介绍SagooIOT平台的RTMP协议接入功能，包括配置说明、推流方法和实际应用示例。'
---
# rtmp接入

###  默认配置

```
[RTMP]
ListenAddr = ":1935"
ChunkSize = 512
```

- ListenAddr是监听的地址
- ChunkSize是分块大小

### 接收RTMP协议的推流

例如通过ffmpeg向SagooMedia进行推流

```
ffmpeg -i **** -f flv rtmp://localhost/live/test
```

会在SagooMedia内部形成一个名为live/test的流

### 拉取rtmp协议流

如果SagooMedia中已经存在live/test流的话就可以用rtmp协议进行播放

```
ffplay -i rtmp://localhost/live/test
```
