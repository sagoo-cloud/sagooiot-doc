# 配置文件


## 主系统配置

```yaml
# 配置文件的键名命名方式统一使用小驼峰。

# 系统配置
system:
  name: "sagooiot"
  version: "2.0"
  description: "SagooIoT Server"
  enablePProf: true # 是否开启pprof
  #  pprofPort:  "58088" # pprof端口
  ipMethod: "whois"   # IP归属地解析方法，可选：cz88|whois，默认为whois
  isDemo: false   # 是否为演示系统
  isCluster: false   # 是否为集群部署，默认为false。开启集群必须配置redis
  deviceCacheData:
    poolSize: 100 #设备数据缓存池连接数
    recordDuration: "300m"  #设备数据缓存时长，超过时长的数据将被清除。默认为10分钟
    recordLimit: 1000 #设备数据缓存条数限制，超过条数的数据将被清除。默认为1000条
    pipelineBufferSize: 10 #每次写入redis的条数
  pluginsPath: "./plugins/built"
  # 文件上传设置
  upload:
    path: "upload" # 文件上传路径

# http服务配置
server:
  serverAgent: "SagooIOT Server"        # 服务端Agent信息。
  address: ":8199" # WEB服务端口
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
  level:                 "all"                 # 日志输出级别
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
    - "/api/v1/sysinfo"
    - "/api/v1/captcha"
    - "/api/v1/websocket/configureDiagram/ws"

# 数据库连接配置
database:
  logger:
    path: "resource/log/sql"
    level: "all"
    stdout: false
    ctxKeys: [ "RequestId" ]
  default:
    link: "mysql:root:DbyTYGu3s4WuAF4TTq7@tcp(127.0.0.1:3307)/sagooiot2024?loc=Local&parseTime=true"
    debug: true #开启调试模式
    charset: "utf8mb4" #数据库编码(如: utf8/gbk/gb2312)，一般设置为utf8
    dryRun: false #ORM空跑(只读不写)
    maxIdle: 30 #连接池最大闲置的连接数
    maxOpen: 100 #连接池最大打开的连接数
    maxLifetime: 120 #(单位秒)连接对象可重复使用的时间长度

# 这个mqtt客户端主要是服务端内部处理消息使用的通道
mqtt:
  addr: 127.0.0.1:1883
  #  addr: 193.112.184.216:1883
  # 最好带上服务名称，变成唯一id
  clientId: sagooiot20230918
  deviceLiveDuration: 60
  qos: 1
  auth:
    userName: xinjy
    userPassWorld: 123456

# 时序数据库配置
tsd:
  database: "TdEngine" #可选择 TdEngine、Influxdb
  tdengine:
    #     type: "taosRestful" #http连接方式，端口是6041
    #     dsn: "root:taosdata@http(127.0.0.1:6041)/"
    type: "taosWS" #websocket连接方式，端口是6041
    dsn: "root:taosdata@ws(127.0.0.1:6041)/"
    dbName: "sagoo_iot"
    maxOpenConns: 5000
    maxIdleConns: 80

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
    db: 0
    pass:
    minIdle: 5 #最小空闲连接数
    maxIdle: 30 #允许闲置的最大连接数
    maxActive: 5000 #最大活跃连接数
    idleTimeout: "60s" #连接最大空闲时间，使用时间字符串例如30s/2m/2d
    ClientName: "SystemCache"
    
# 设备数据存入时序数据库的任务配置    
task:
  retention: 60 #任务保留时间，单位秒
  maxRetry: 2 #任务最大重试次数
  clearArchived: 300 #清理归档任务时间，单位秒
  timeout: 30 #任务超时时间，单位秒
  concurrencyNum: 100 #任务并发数
  groupGracePeriod: 2 #多久聚合一次，单位秒
  groupMaxDelay: 10 #最晚多久聚合一次，单位秒
  groupMaxSize: 100 #每多少个任务聚合一次，单位个
```


## 配置说明

### 实时数据

设备日志的数据存储在Redis中，配置如下：
```yaml
server:
    deviceCacheData:
        poolSize: 100 #设备数据缓存池连接数
        recordDuration: "300m"  #设备数据缓存时长，超过时长的数据将被清除。默认为10分钟
        recordLimit: 1000 #设备数据缓存条数限制，超过条数的数据将被清除。默认为1000条
        pipelineBufferSize: 10 #每次写入redis的条数

```


### 数据存入时序数据库的任务配置说明
`groupGracePeriod: 2` 这个配置表示，任务在加入到聚合组之后，会等待2秒来查看是否还有更多的任务需要加入到这个组中。如果在2秒内没有更多的任务加入，那么当前的聚合组就会立即处理。这有助于减少聚合的延迟，特别是当任务到达的速率不高时。

`groupMaxDelay: 10` 这个配置是聚合的最大延迟时间。即使没有达到groupMaxSize所指定的任务数量，如果在10秒内没有新的任务加入到聚合组，那么当前的聚合组也会立即处理。这确保了在任务到达速率较低时，聚合组不会无限期地等待更多的任务。

`groupMaxSize: 100` 这个配置定义了每个聚合组可以包含的最大任务数量。当聚合组的任务数量达到100个时，不论是否过了groupGracePeriod，也不论是否还未达到groupMaxDelay，聚合组都会立即处理。这有助于控制聚合组的大小，避免单个聚合组变得过大。

这三个配置参数共同作用，允许您根据任务的到达速率和系统的处理能力来精细地控制任务的聚合行为。通过合理地设置这些参数，您可以在减少系统负载和提高处理效率之间找到一个平衡点。
