---
sidebar_position: 0
---
# 简介

视频监控服务是基于m7s构建，提供SIP server的服务，以及流媒体服务器能力，可以将NVR和摄像头的流抓到SagooMedia中，可获取的设备的录像数据以及访问录像视频。也可以控制摄像头的旋转、缩放等。

m7s是Monibuca的缩写。 Monibuca 是一个开源的流媒体服务器开发框架，适用于快速定制化开发流媒体服务器。

核心引擎以及内置插件提供的功能：

* 协议互相转换，音视频流转发
* 接收RTMP协议推流、RTMP协议拉流播放
* 接收RTSP协议推流、从远程拉取RTSP流
* 读取远程HLS流、生成HLS流
* 录制FLV格式文件、读取FLV格式流、读取TS文件流
* GB28181协议支持
* HTTP-FLV、WS-FLV、WS-RAW格式拉流播放
* 集群功能
* 接收WebRTC推流、WebRTC拉流播放
