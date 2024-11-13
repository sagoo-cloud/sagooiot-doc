---
sidebar_position: 2
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

