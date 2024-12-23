---
title: "其它服务"
sidebar_position: 10
hide_title: true
keywords: [服务部署,流媒体服务,独立服务,Golang部署,服务配置,环境部署,系统服务,服务管理,服务启动,配置说明]
description: '详细说明SagooIOT平台其它独立服务的部署方法，包括流媒体服务等Golang开发的生态应用服务的安装配置流程。'
---

这里主要介绍的是共它独立服务的部署。SagooIoT的生态应用服务，都是基于Golang开发的，所以部署的环境要求不高，只要是支持Golang的系统都可以部署。

## 流媒体部署

1. 进入流媒体项目根目录下，使用`./build.sh linux|windows|mac`进行程序编译
2. 进入到服务器`/opt/sagoo/iot-server`下，跟据实际情况确定部署目录。
3. 创建server文件夹及SagooMedia子文件夹，并将第一步编译后的所有文件放到SagooMedia子文件夹下
4. 进入到`server/SagooMedia`目录下修改config.yaml配置，可参考以下配置内容

```yaml
    global:
      disableall: false # 是否禁用所有插件
      loglang: zh # 日志语言，可选值：zh,en
      loglevel: error # 日志级别，可选值：debug,info,warn,error,panic,fatal
      http:
        listenaddr: :8080 # 网关地址，用于访问API
        listenaddrtls: :8443  # 用于HTTPS方式访问API的端口配置
        certfile: ""
        keyfile: ""
        cors: true  # 是否自动添加cors头
        username: ""  # 用户名和密码，用于API访问时的基本身份认证
        password: ""
        readtimeout: 0 # 读超时时间
        writetimeout: 0 # 写超时时间
        idletimeout: 0 # 空闲超时时间
      publish:
        pubaudio: true # 是否发布音频流
        pubvideo: true # 是否发布视频流
        kickexist: false # 剔出已经存在的发布者，用于顶替原有发布者
        insertsei: false # 是否启用插入SEI功能
        publishtimeout: 10s # 发布流默认过期时间，超过该时间发布者没有恢复流将被删除
        idletimeout: 0 # 发布者空闲超时时间，超过该时间发布者没有任何操作将被删除，0为关闭该功能
        delayclosetimeout: 0 # 自动关闭触发后延迟的时间(期间内如果有新的订阅则取消触发关闭)，0为关闭该功能，保持连接。
        waitclosetimeout: 0 # 发布者断开后等待时间，超过该时间发布者没有恢复流将被删除，0为关闭该功能，由订阅者决定是否删除
        buffertime: 0 # 缓存时间，用于时光回溯，0为关闭缓存
        key: "" # 订阅者鉴权秘钥
        secretargname: secret # 订阅者鉴权参数名
        expireargname: expire # 订阅者鉴权过期时间参数名
        speedlimit: 500ms # 限速超时时间0为不限速，对于读取文件这类流需要限速，否则读取过快
      subscribe:
        subaudio: true # 是否订阅音频流
        subvideo: true # 是否订阅视频流
        subaudioargname: ats # 订阅音频轨道参数名
        subvideoargname: vts # 订阅视频轨道参数名
        subdataargname: dts # 订阅数据轨道参数名
        subaudiotracks: [] # 订阅音频轨道名称列表
        subvideotracks: [] # 订阅视频轨道名称列表
        submode: 0 # 订阅模式，0为跳帧追赶模式，1为不追赶（多用于录制），2为时光回溯模式
        syncmode: 0 # 音视频同步模式，0 为按照时间戳同步，1 为按照写入时间同步
        iframeonly: false # 只订阅关键帧
        waittimeout: 10s # 等待发布者的超时时间，用于订阅尚未发布的流
        writebuffersize: 0 # 订阅者写缓存大小，用于减少io次数，但可能影响实时性
        key: "" # 订阅者鉴权秘钥
        secretargname: secret # 订阅者鉴权参数名
        expireargname: expire # 订阅者鉴权过期时间参数名
        internal: false # 是否内部订阅，内部订阅不会触发发布者自动断开功能
      enableavcc : true  # 启用AVCC格式缓存，用于rtmp协议
      enablertp : true # 启用rtp格式缓存，用于rtsp、websocket、gb28181协议
      enableauth: true # 启用鉴权,详细查看鉴权机制
      enablesubevent: true # 启用订阅事件，用于订阅者上下线事件,关闭可以提高性能
      rtpreorderbufferlen: 50 # rtp乱序重排缓存长度
      eventbussize: 10 # 事件总线缓存大小，事件较多时容易堵阻塞线程，需要增大缓存
      poolsize: 0 # 内存池大小，高并发需要提高性能可以加大内存池，减少 GC
      pulseinterval: 5s # 心跳事件间隔时间
      console:
        server : console.monibuca.com:44944 # 连接远程控制台的地址
        secret: "" # 远程控制台的秘钥
        publicaddr: "" # 实例公网地址，提供远程控制台访问的地址，不配置的话使用自动识别的地址
        publicaddrtls: "" # 实例公网地址，提供远程控制台访问的地址，不配置的话使用自动识别的地址（https）

    logrotate:
      enable: true
      path: ./logs # 生成日志的目录
      size: 0 # 每个日志文件的大小，单位字节，0表示不限制
      days: 1 # 按时间分割，单位是天，即24小时
      formatter : 2006-01-02T15 # 日志文件名格式化，按照go layout格式化，默认按照小时

    gb28181:
      enable: true
      invitemode: 1 #0、手动invite 1、表示自动发起invite，当Server（SIP）接收到设备信息时，立即向设备发送invite命令获取流,2、按需拉流，既等待订阅者触发
      position:
        autosubposition: false #是否自动订阅定位
        expires: 3600s #订阅周期(单位：秒)，默认3600
        interval: 6s #订阅间隔（单位：秒），默认6
      udpcachesize: 0 #表示UDP缓存大小，默认为0，不开启。仅当TCP关闭，切缓存大于0时才开启
      sipip: "" #sip服务器地址 默认 自动适配设备网段
      serial: "34020000002000000001"
      realm: "3402000000"
      username: ""
      password: ""

      registervalidity: 60s #注册有效期

      mediaip: "" #媒体服务器地址 默认 自动适配设备网段
      port:
        sip: udp:5060 #sip服务器端口
        media: tcp:58200-59200 #媒体服务器端口，用于接收设备的流

      removebaninterval: 10m #定时移除注册失败的设备黑名单，单位秒，默认10分钟（600秒）
      loglevel: error

    rtmp:
      enable: false
      publish: # 参考全局配置格式
      subscribe: # 参考全局配置格式
      tcp:
        listenaddr: :1935
        listenaddrtls: ""  # 用于RTMPS协议
        certfile: ""
        keyfile: ""
        listennum: 0
        nodelay: false
      pull: # 格式参考文档 https://m7s.live/guide/config.html#%E6%8F%92%E4%BB%B6%E9%85%8D%E7%BD%AE
      push: # 格式参考文档 https://m7s.live/guide/config.html#%E6%8F%92%E4%BB%B6%E9%85%8D%E7%BD%AE
      chunksize: 65536 # rtmp chunk size
      keepalive: false #保持rtmp连接，默认随着stream的close而主动断开

    rtsp:
      enable: false
      publish: # 参考全局配置格式
      subscribe: # 参考全局配置格式
      pull: # 格式参考文档 https://m7s.live/guide/config.html#%E6%8F%92%E4%BB%B6%E9%85%8D%E7%BD%AE
      push: # 格式参考文档 https://m7s.live/guide/config.html#%E6%8F%92%E4%BB%B6%E9%85%8D%E7%BD%AE
      listenaddr: :554
      udpaddr: :8000
      rtcpaddr: :8001
      readbuffercount: 2048 # 读取缓存队列大小
      writebuffercount: 2048 # 写出缓存队列大小
      pullprotocol: tcp # auto, tcp, udp

    jtt1078:
      enable: false

    hdl:
      enable: false
      http: # 格式参考全局配置
      publish: # 格式参考全局配置
      subscribe: # 格式参考全局配置
      pull: # 格式 https://m7s.live/guide/config.html#%E6%8F%92%E4%BB%B6%E9%85%8D%E7%BD%AE

    hls:
      enable: false
      http: # 参考全局配置格式
      publish: # 格式参考全局配置
      subscribe: # 格式参考全局配置
      pull: # 格式 https://m7s.live/guide/config.html#%E6%8F%92%E4%BB%B6%E9%85%8D%E7%BD%AE
      fragment: 10s # TS分片长度
      window: 2 # 实时流m3u8文件包含的TS文件数
      filter: "" # 正则表达式，用来过滤发布的流，只有匹配到的流才会写入
      path: "" # 远端拉流如果需要保存的话，存放的目录
      defaultts: "" # 默认切片用于无流时片头播放,如果留空则使用系统内置
      defaulttsduration: 3.88s # 默认切片的长度
      relaymode: 0 # 转发模式,0:转协议+不转发,1:不转协议+转发，2:转协议+转发
      preload: false # 是否预加载,预加载后会所有的 HLS 订阅都会共享一个内部订阅者，可以加快播放速度，但是无法使用按需关流

    ps:
      enable: true
      http: # 格式参考全局配置
      publish: # 格式参考全局配置
      subscribe: # 格式参考全局配置
      relaymode: 2 # 0:纯转发 1:转协议，不转发 2:转发并且转协议

    webtransport:
      enable: false
      listenaddr: :4433
      certfile: local.monibuca.com_bundle.pem
      keyfile: local.monibuca.com.key

    webrtc:
      enable: false
      iceservers: []
    #ICE服务器配置格式
    #  iceservers:
    #    - urls:
    #        - stun:stun.l.google.com:19302
    #        - turn:turn.example.org
    #      username: user
    #      credential: pass
      publicip: [] # 可以是数组也可以是字符串（内部自动转成数组）
      port: tcp:9000 # 可以是udp:8000-9000 范围端口，也可以udp:9000 单个端口
      pli: 2s # 2s

    record:
      enable: false
      subscribe: # 格式参考全局配置
      flv:
        ext: .flv
        path: record/flv
        autorecord: false
        filter: ""
        fragment: 0
      fmp4:
        ext: .mp4
        path: record/fmp4
        autorecord: false
        filter: ""
        fragment: 0
      mp4:
        ext: .mp4
        path: record/mp4
        autorecord: false
        filter: ""
        fragment: 0
      hls:
        ext: .m3u8
        path: record/hls
        autorecord: false
        filter: ""
        fragment: 0
      raw:
        ext: .
        path: record/raw
        autorecord: false
        filter: ""
        fragment: 0

    monitor:
      enable: false
      path: monitor # 监控数据存储路径

    hook:
      enable: false
      keepalive: 0 # 定时发送心跳请求，单位秒，默认0不开启
      retrytimes: 3 # 重试次数
      baseurl: "" # url前缀
      header: {} # 自定义HTTP请求头
      requestlist: {} # 请求列表
    #  requestlist:
    #    "*": "http://www.example.com" # 任意时间均会发送请求
    #    startup: "http://www.example.com" # m7s启动时发送请求
    #    publish: "http://www.example.com/publish" # 发布时发送请求
    #    subscribe: "http://www.example.com/subscribe" # 订阅时发送请求
    #    unsubscribe: "http://www.example.com/unsubscribe" # 取消订阅时发送请求
    #    streamClose: "http://www.example.com/streamClose" # 流关闭时发送请求
    #    keepalive: "http://www.example.com/keepalive" # 心跳时发送请求
      extra: {} # 额外自定义传输数据

    room:
      enable: false
      subscribe: # 房间作为特殊流，只订阅data track用于传输信令
        subaudio: false # 默认不订阅音频
        subvideo: false # 默认不订阅视频
      http: # 默认使用全局http配置
        listenaddr: :8080
        listenaddrtls: ""
        certfile: ""
        keyfile: ""
        cors: true
        username: ""
        password: ""
      appname: room # 房间用于广播数据的流的AppName（StreamPath=AppName/RoomID）
      size: 20 # 房间大小（最大人数）
      private: {} # 私密房间配置，key是房间ID，value是密码
      verify: # 入房验证远程请求
        url: ""
        method: ""
        header: {}

    erwscascade:
      enable: false
      cid: "test-c001"            #本机平台ID 不配置则随机uuid
      server:                     #级联上级平台配置，支持同时接入多个上级平台
        -
          protocol: "wss"         #支持的协议ws,wss
          host: "47.111.28.16"
          port: 8441
          conextpath: ""
      push:
        repush: -1
        pushlist:
          njtv/glgc: ws://127.0.0.1:8450/erwscascade/wspush/njtv/glgc #推送本地流到上级平台，新的streamPath 为 streamPath-cid

    snapplug:
      enable: false
      ffmpeg: "ffmpeg"

    onvif:
      enable: false
      discoverinterval: 30 # 发现设备的间隔，单位秒，默认30秒，建议比rtsp插件的重连间隔大点
      interfaces: # 设备发现指定网卡，以及该网卡对应IP段的全局默认账号密码，支持多网卡
        - interfacename: WLAN  # 网卡名称 或者"以太网" "eth0"等，使用ipconfig 或者 ifconfig 查看网卡名称
          username: admin # onvif 账号
          password: admin # onvif 密码
        - interfacename: WLAN 2 # 网卡2
          username: admin
          password: admin
      devices: # 可以给指定设备配置单独的密码
        - ip: 192.168.1.1
          username: admin
          password: '123'
        - ip: 192.168.1.2
          username: admin
          password: '456'
```

其中服务端口号需根据实际情况进行修改
**如需开启SSL，则需对以下配置进行更改**
  1.  `ListenAddrTLS = ":8443"`配置
  2. 修改以下配置（证书及秘钥需根据实际情况修改路径）

```yaml
        ListenAddrTLS = ":8443"
        CertFile = "server.pem"
        KeyFile = "server.key"
```

5. 使用`./curl.sh start`进行启动
