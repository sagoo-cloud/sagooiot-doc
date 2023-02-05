# 配置文件


## 主系统配置

```yaml
# 配置文件的键名命名方式统一使用小驼峰。

# HTTP Server.
server:
  address:     ":8199" # 本地WEB服务监听地址。默认":80"
  serverRoot: "resource/public" # 静态文件服务的目录根路径，配置时自动开启静态文件服务。默认关闭
  dumpRouterMap: false # 是否在Server启动时打印所有的路由列表。默认为true
  routeOverWrite: false # 当遇到重复路由注册时是否强制覆盖。默认为false，重复路由存在时将会在启动时报错退出
  openapiPath: "/api.json"
  swaggerPath: "/swagger"
  NameToUriType: 3 # 路由注册中使用对象注册时的路由生成规则。默认为0
  maxHeaderBytes: "20KB" #请求头大小限制，请求头包括客户端提交的Cookie数据，默认设置为10KB。
  clientMaxBodySize: "50MB" #客户端提交的Body大小限制，同时也影响文件上传大小，默认设置为8MB。
  # Logging配置
  logPath: "resource/log/server"                 # 日志文件存储目录路径，建议使用绝对路径。默认为空，表示关闭
  logStdout: true               # 日志是否输出到终端。默认为true
  errorStack: true               # 当Server捕获到异常时是否记录堆栈信息到日志中。默认为true
  errorLogEnabled: true               # 是否记录异常日志信息到日志中。默认为true
  errorLogPattern: "error-{Ymd}.log"  # 异常错误日志文件格式。默认为"error-{Ymd}.log"
  accessLogEnabled: true              # 是否记录访问日志。默认为false
  accessLogPattern: "access-{Ymd}.log" # 访问日志文件格式。默认为"access-{Ymd}.log"

# 数据库连接配置
database:
  logger:
    path:    "logs/sql"
    level:   "all"
    stdout:  true
    ctxKeys: ["RequestId"]

  default:
    link:   "mysql:zhg3wwn:w3212233@tcp(111.210.198.229:3306)/zhgy_sagoo_cn"
    debug:  true
    charset: "utf8mb4" #数据库编码
    dryRun: false #空跑
    maxIdle: 10 #连接池最大闲置的连接数
    maxOpen: 10 #连接池最大打开的连接数
    maxLifetime: 30 #(单位秒)连接对象可重复使用的时间长度

# TDengine配置
tdengine:
  type: "taosRestful"
  dsn:  "zhgy_iot:z23332a@http(111.210.198.229:6041)/"

# 文件上传设置
upload:
  path: "upload"

logger:
  path: "resource/log/run"
  file: "{Y-m-d}.log"
  level: "all"
  stdout: true
  ctxKeys: ["RequestId"] #用于配置需要从context.Context接口对象中读取并输出的键名。

#GFToken
gfToken:
  timeOut: 10800         #token超时时间（秒）
  maxRefresh: 5400       #token自动刷新时间（秒）
  multiLogin: true       #是否允许一个账号多人同时登录
  encryptKey: "49c54195e750b04e74a8429b17896586"    #加密key (32位)
  excludePaths:          #排除不做登录验证的路由地址
    - "/api/v1/login"

# Redis 配置示例
redis:
  # 单实例配置
  default:
    address: r-24643458n347ypd.redis.rds.aliyuncs.com:6379
    db: 1
    pass: F22LK23123k9mut
    idleTimeout: 600
    maxActive: 100

system:
  cache:
    prefix: "SagooZhgy_" #缓存前缀
    model: "redis"  #存储引擎 （memory使用内存|redis使用redis）

```
