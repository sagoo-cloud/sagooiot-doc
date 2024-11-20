---
title: "其它服务"
sidebar_position: 10
hide_title: true
---

这里主要介绍的是共它独立服务的部署。SagooIoT的生态应用服务，都是基于Golang开发的，所以部署的环境要求不高，只要是支持Golang的系统都可以部署。

## 流媒体部署

1. 进入流媒体项目根目录下，使用`./build.sh linux|windows|mac`进行程序编译
2. 进入到服务器`/opt/sagoo/iot-server`下，跟据实际情况确定部署目录。
3. 创建server文件夹及SagooMedia子文件夹，并将第一步编译后的所有文件放到SagooMedia子文件夹下
4. 进入到`server/SagooMedia`目录下修改config.toml配置，可参考以下配置内容

```yaml
   [Engine]
   EnableAudio = true
   EnableVideo = true
   # 发布流默认过期时间单位秒
   PublishTimeout = 60
   # 自动关闭触发后延迟的秒数(期间内如果有新的订阅则取消触发关闭)
   AutoCloseAfter = 10
   # RTP包乱序重排
   RTPReorder = false
   [Summary]
   # 1秒中采样一次
   SampleRate = 1
   [RTMP]
   ListenAddr = ":1935"
   [GateWay]
   ListenAddr = ":8166"
   #ListenAddrTLS = ":8082"
   #CertFile = "server.pem"
   #KeyFile = "server.key"
   StaticPath = "./public"
   [Jessica]
   #ListenAddr = ":8081"
   #ListenAddrTLS = ":8083"
   #CertFile = "xxx.cert"
   #KeyFile = "xxx.key"
   [LogRotate]
   # 日志存储目录相对或绝对
   Path = "logs"
   # 日志是否按大小分割，0表示不按大小分割，非零代表按该大小字节进行分割
   Size = 0
   Days = 1
   # 按照go layout格式化，默认按照小时
   Formatter = "2006-01-02T15"
   # [FFMPEG]
   [HLS]
   # 是否开启写磁盘，开启后侦测到发布流就会开始写TS文件
   EnableWrite = false
   # 是否打开内存模式，在内存中保留TS数据，方便直接读取
   EnableMemory = false
   # 分片大小 单位秒
   Fragment = 10
   # 窗口数里，代表一个m3u8文件里面有几个ts
   Window = 2
   # ts文件存放目录，m3u8会存放在上一级
   Path = "resource"
   [HDL]
   #ListenAddr = ":2020"
   #ListenAddrTLS = ":2021"
   #CertFile = "xxx.cert"
   #KeyFile = "xxx.key"
   #Reconnect = true
   [HDL.AutoPullList]
   # "live/hdl" = "http://flv.bdplay.nodemedia.cn/live/bbb.flv"
   [TS]
   # ts存放目录
   Path  = "resource"
   [Record]
   Path = "resource"
   # 自动录制功能
   AutoRecord  = false
   [RTSP]
   # 端口接收推流
   ListenAddr = ":554"
   Reconnect = true
   #启动后自动拉流，可以配置多个
   [RTSP.AutoPullList]
   # "live/rtc" = "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4"
   # "live/rtsp" = "rtsp://admin:123456@42.193.7.166:9018/video1"
   [WebRTC]
   # 端口范围不配置的话是自动分配
   # PortMin = 30000
   # PortMax = 40000
   # 公网访问必须配置PublicIP，否则无法建立连接
   # PublicIP = ["192.168.1.120"]
   # WebRTC 推流时控制GOP大小，单位毫秒
   # PLI = 2000
   [GB28181]
   Serial = "34020000002000000001"
   Realm = "3402000000"
   Expires = 3600
   # 媒体端口
   # MediaPort = 58200
   # 开启TCP拉流，默认关闭
   # TCP = true
   # TCP端口数量，超过一个的话将会每个设备轮流使用，从MediaPort往下递增
   # TCPMediaPortNum = 1
   ListenAddr = "192.168.1.120:5060"
   # 自动停止发布，当订阅者数量将为0时，延迟N秒自动断开,-1代表不断开
   AutoCloseAfter = -1
   # 自动拉流，如果开启，则拿到设备注册信息后，就从设备拉流
   AutoInvite = true
```

其中服务端口号需根据实际情况进行修改
**如需开启SSL，则需将一下可按照一下步骤进行开启**
  1.  注释`ListenAddr = ":8166"`配置
  2. 放开以下配置（证书及秘钥需根据实际情况修改路径）

```yaml
        #ListenAddrTLS = ":8166"
        #CertFile = "server.pem"
        #KeyFile = "server.key"
```

5. 使用`./curl.sh start`进行启动

