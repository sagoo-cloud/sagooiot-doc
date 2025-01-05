---
title: '配置文件'
hide_title: true
sidebar_position: 0
keywords: [配置文件,系统配置,数据库配置,MQTT配置,时序数据库,Redis配置,规则服务]
description: '本文档详细说明了SagooIoT系统的配置文件，包括系统配置、数据库配置、MQTT配置、时序数据库配置、Redis配置以及规则服务配置等。'
---

## 主系统配置参考

开发环境下，配置文件在`manifest/config/config.example.yaml`，复制一份命名为`config.yaml`，根据实际情况修改配置。

如果是编译后部署的情况下，通常配置文件会是`config/config.yaml`。

```yaml
# 系统配置
system:
  name: "sagooiot"
  version: "2.0"
  description: "SagooIoT Server"
  enablePProf: true # 是否开启pprof
  debug: true # 是否为调试模式,默认为false
  #  pprofPort:  "58088" # pprof端口
  ipMethod: "whois"   # IP归属地解析方法，可选：cz88|whois，默认为whois
  isDemo: false   # 是否为演示系统
  isCluster: false   # 是否为集群部署，默认为false。开启集群必须配置redis
  deviceCacheData:
    poolSize: 100 #设备数据缓存池连接数
    recordDuration: "300m"  #设备数据缓存时长，超过时长的数据将被清除。默认为10分钟
    recordLimit: 1000 #设备数据缓存条数限制，超过条数的数据将被清除。默认为1000条
    pipelineBufferSize: 15 #每次写入redis的条数
  pluginsPath: "./plugins/built"
  # 文件上传设置
  upload:
    path: "upload" # 文件上传路径

# http服务配置
server:
  serverAgent: "SagooIOT Server"        # 服务端Agent信息。
  address: ":8200" # WEB服务端口
  dumpRouterMap: false # 是否打印路由表
  routeOverWrite: true # 是否允许路由覆盖
  openapiPath: "/api.json" # OpenAPI路径
  swaggerPath: "/swagger" # Swagger路径
  NameToUriType: 3 # 路由转换类型，1:驼峰转下划线，2:下划线转驼峰，3:不转换
  maxHeaderBytes: "20KB" # 最大请求头大小
  clientMaxBodySize: "50MB" # 最大请求体大小
  https: false # 是否启用https
  httpsCertFile: "" # https证书文件路径
  httpsKeyFile: "" # https证书key文件路径
  # 静态服务配置
  indexFiles: [ "index.html"]   # 自动首页静态文件检索。默认为["index.html", "index.htm"]
  indexFolder: false            # 当访问静态文件目录时，是否展示目录下的文件列表。默认关闭，那么请求将返回403
  serverRoot: "resource/public" # 静态文件服务的目录根路径，配置时自动开启静态文件服务。默认关闭
  searchPaths: [ "/resource/public/"] # 提供静态文件服务时额外的文件搜索路径，当根路径找不到时则按照顺序在搜索目录查找。默认关闭
  fileServerEnabled: true # 是否开启静态文件服务。默认为false
  adminPprofPort: "58089" # web-admin pprof端口
#  allowedDomains: #允许跨域访问的域名列表
#    - https://example.com
#    - https://www.example.com

# 日志配置
logger:
  path:                  "resource/log/server"           # 日志文件路径。默认为空，表示关闭，仅输出到终端
  file:                  "{Y-m-d}.log"         # 日志文件格式。默认为"{Y-m-d}.log"
  prefix:                ""                    # 日志内容输出前缀。默认为空
  level:                 "error"                 # 日志输出级别，
  timeFormat:            "2006-01-02T15:04:05" # 自定义日志输出的时间格式，使用Golang标准的时间格式配置
  ctxKeys:               []                    # 自定义Context上下文变量名称，自动打印Context的变量到日志中。默认为空
  header:                true                  # 是否打印日志的头信息。默认true
  stdout:                true                  # 日志是否同时输出到终端。默认true
  rotateSize:            0                     # 按照日志文件大小对文件进行滚动切分。默认为0，表示关闭滚动切分特性
  rotateExpire:          0                     # 按照日志文件时间间隔对文件滚动切分。默认为0，表示关闭滚动切分特性
  rotateBackupLimit:     0                     # 按照切分的文件数量清理切分文件，当滚动切分特性开启时有效。默认为0，表示不备份，切分则删除
  rotateBackupExpire:    0                     # 按照切分的文件有效期清理切分文件，当滚动切分特性开启时有效。默认为0，表示不备份，切分则删除
  rotateBackupCompress:  0                     # 滚动切分文件的压缩比（0-9）。默认为0，表示不压缩
  rotateCheckInterval:   "1h"                  # 滚动切分的时间检测间隔，一般不需要设置。默认为1小时
  stdoutColorDisabled:   false                 # 关闭终端的颜色打印。默认开启
  writerColorEnable:     false                 # 日志文件是否带上颜色。默认false，表示不带颜色

#GFToken
gfToken:
  timeOut: 10800         #token超时时间（秒）
  maxRefresh: 5400       #token自动刷新时间（秒）
  multiLogin: true       #是否允许一个账号多人同时登录
  encryptKey: "49c54195e750b04e74a8429b17896586"    #加密key (32位)
  excludePaths: #排除不做登录验证的路由地址
    - "/api/v1/login"
    - "/api/v1/userNameLogin"
    - "/api/v1/sysinfo"
    - "/api/v1/captcha"
    - "/api/v1/websocket/configureDiagram/ws"

# 数据库连接配置
database:
  logger:
    path: "resource/log/sql"
    level: "error"
    stdout: false
    ctxKeys: [ "RequestId" ]
  default:
    type: "mysql"
    link: "mysql:root:DbyTYGu3s4WuAF4TTq7@tcp(127.0.0.1:3306)/sagoo_iot_professional?loc=Local&parseTime=true"
    debug: false #开启调试模式
    charset: "utf8mb4" #数据库编码(如: utf8/gbk/gb2312)，一般设置为utf8
    dryRun: false #ORM空跑(只读不写)
    maxIdle: 50 #连接池最大闲置的连接数
    maxOpen: 1000 #连接池最大打开的连接数
    maxLifetime: 120 #(单位秒)连接对象可重复使用的时间长度

# 这个mqtt客户端主要是服务端内部处理消息使用的通道
mqtt:
  mqttAppName: "emqx" # mqtt应用名称,用于区分不同的应用: sagoomqtt、emqx、coolpy7
  addr: 127.0.0.1:1883
  #  addr: 36.133.44.186:18890
  # 最好带上服务名称，变成唯一id
  clientId: sagoo_iot_professional
  deviceLiveDuration: 60
  qos: 1
  auth:
    userName: admin
    userPassWord: 123456
  sagooMQTT: #sagooMQTT服务器配置，默认可以没有
    listeners:
      - type: "tcp"
        id: "file-tcp1"
        address: ":1883"
      - type: "ws"
        id: "file-websocket"
        address: ":1882"
      - type: "healthcheck"
        id: "file-healthcheck"
        address: ":1880"
    options:
      client_net_write_buffer_size: 2048 #客户端网络写缓冲区大小
      client_net_read_buffer_size: 2048 #客户端网络读缓冲区大小
      sys_topic_resend_interval: 10 #系统主题重发间隔
      inline_client: true #内联客户端
      capabilities:
        maximum_message_expiry_interval: 100 #最大消息过期时间
        maximum_client_writes_pending: 8192 #最大客户端写入挂起
        maximum_session_expiry_interval: 86400 #最大会话过期时间
        maximum_packet_size: 0 #最大包大小，0表示不限制
        receive_maximum: 1024 #接收最大
        maximum_inflight: 8192 #最大飞行
        topic_alias_maximum: 65535 #主题别名最大
        shared_sub_available: 1 #共享订阅可用
        minimum_protocol_version: 3 #最小协议版本
        maximum_qos: 2 #最大qos
        retain_available: 1 #保留可用，0表示不可用
        wildcard_sub_available: 1 #通配符订阅可用，0表示不可用
        sub_id_available: 1 #订阅id可用，0表示不可用
        compatibilities:
          obscure_not_authorized: true #模糊不授权
          passive_client_disconnect: false #被动客户端断开
          always_return_response_info: false #总是返回响应信息
          restore_sys_info_on_restart: false #重启时恢复系统信息
          no_inherited_properties_on_ack: false #确认时不继承属性
    logging:
      level: INFO
# 时序数据库配置
tsd:
  database: "TdEngine" #可选择 TdEngine、Influxdb
  tdengine:
    type: "taosWS" #websocket连接方式，端口是6041
    dsn: "root:taosdata@ws(127.0.0.1:6041)/"
    dbName: "sagoo_iot_professional"
    maxOpenConns: 0 #设置与数据库的最大打开连接数。默认为0，表示不限制，默认为2倍CPU核心数，建议保持默认设置
    maxIdleConns: 2 #设置空闲连接池的最大连接数。默认与maxOpenConns设置相同，建议保持默认设置
    connMaxLifetime: 0 #设置连接可重用的最大时间。默认为0，表示不限制，默认为0，表示不限制
    connMaxIdleTime: 0 #设置连接空闲的最大时间。默认为0，默认为0，表示永不超时。建议保持默认设置
  influxdb:
    addr: "http://localhost:8086"
    dbName: "sagoo_iot"
    org:
    token: "ez4BQ5QQCUpcAp1FDhhdY9jfcvxq2Z9OLkQSuQG_IPOzE9GvGRHfRm_YYwfuHtCaS7TVefxhEnzCOHi_nGtsCw=="
    userName:
    passWord:

#缓存
cache:
  prefix: "SagooIot_Sys:" #缓存前缀
  adapter: "redis"                    # 缓存驱动方式，支持：memory|redis|file，不填默认memory
  fileDir: "./storage/cache"         # 文件缓存路径，adapter=file时必填

# Redis 配置示例
redis:
  # 单实例配置
  default:
    mode: "single" #redis模式，支持：single|cluster|sentinel
    sentinelMasterName: "sagoo-master" #哨兵模式主节点名称
    address: 127.0.0.1:6379
    db: 1
    pass: FDXLK3LdGYYk9mut
    minIdle: 10 #最小空闲连接数
    maxIdle: 100 #允许闲置的最大连接数
    maxActive: 10000 #最大活跃连接数
    idleTimeout: "60s" #连接最大空闲时间，使用时间字符串例如30s/2m/2d
    ClientName: "SystemCache"
task:
  retention: 60 #任务保留时间，单位秒
  maxRetry: 2 #任务最大重试次数
  clearArchived: 300 #清理归档任务时间，单位秒
  timeout: 30 #任务超时时间，单位秒
  concurrencyNum: 100 #任务并发数
  groupGracePeriod: 1 #多久聚合一次，单位秒
  groupMaxDelay: 1 #最晚多久聚合一次，单位秒
  groupMaxSize: 100 #每多少个任务聚合一次，单位个

# 规则服务配置
rule:
  data_dir: "./data"
  log_file: "resource/log/rule.log"
  cmd_white_list: "cp,scp,mvn,npm,yarn,git,make,cmake,docker,kubectl,helm,ansible,puppet,pytest,python,python3,pip,go,java,dotnet,gcc,g++,ctest"
  load_lua_libs: true
  server: ":9090"
  default_username: "admin"
  debug: true
  max_node_log_size: 40
  # resource mapping for example:/ui/*filepath=/home/demo/dist,/images/*filepath=/home/demo/dist/images
  resource_mapping: ""
  # Node pool file
  #  node_pool_file: "./manifest/config/node_pool.json"
  # save run log to file
  save_run_log: false
  # script max execution time
  script_max_execution_time: 5000
  mqtt:
    enabled: true
  global:
    key1: value1
    key2: value2

```
:::tip 提示
部署到服务器之后，如果配置了nginx，可能会遇到api文档打不开，则需要将config.yaml中server.openapiPath参数值变更为`/base-api/swagger/api.json`，对应nginx配置文件中的`/base-api/swagger/api.json`路由
:::
