---
sidebar_position: 0
---

# 程序说明

## 关于SagooIOT

SagooIOT基于GoFrame，Vue3+Element plus 开发的一体化基础的物联网平台系统。

## 技术选型

| 技术栈                                    | 描述                                         |
|----------------------------------------|--------------------------------------------|
| [golang](https://golang.google.cn/)                                 | 编程语言                                       |
| [GoFrame](https://goframe.org/display/gf20)                                | 模块化、高性能、企业级的`Go`基础开发框架                     |
| [vue-next-admin](https://lyt-top.gitee.io/vue-next-admin-doc-preview/)                     | 基于vue3.x 、Typescript、vite、Element plus 开发  |
| MySql                                  | 关系型数据库，版本为5.x，可替换为：MariaDB、Percona                |
| [TDengine](https://docs.taosdata.com/) | 高性能、云原生的时序数据库 (Time-Series Database, TSDB) |
| Redis                                  | 用户信息与权限缓存、设备注册中心缓存                         |

## 配置

SagooIOT基于GoFrame开发，配置方案与GoFrame基本上是一致：config.yml [配置说明](https://goframe.org/pages/viewpage.action?pageId=1114489)

主要配置项：

```yaml
# 配置文件的键名命名方式统一使用小驼峰。
# HTTP Server.
server:
  address:     ":8199"
  serverRoot: "resource/public"
  dumpRouterMap: false
  routeOverWrite: true
  openapiPath: "/api.json"
  swaggerPath: "/swagger"
  NameToUriType: 3
  maxHeaderBytes: "20KB"
  clientMaxBodySize: "50MB"
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
    link:   "mysql:iot_sagoo_cn:a342555226i@tcp(111.210.198.219:3306)/zhgy_sagoo_cn"
    debug:  false
    charset: "utf8mb4" #数据库编码
    dryRun: false #空跑
    maxIdle: 10 #连接池最大闲置的连接数
    maxOpen: 10 #连接池最大打开的连接数
    maxLifetime: 30 #(单位秒)连接对象可重复使用的时间长度

# TDengine配置
tdengine:
  type: "taosRestful" #http连接方式，端口是6041
  dsn: "sagoo_iot:z3536222a@http(111.210.198.219:6041)/"

# 采用原生的时候，需要将sagoo-admin/internal/logic/tdengine下的td_engine.go文件里import中的原生驱动打开
#  type: "taosSql" #原生连接方式，端口是6030
#  dsn: "zhgy_iot:z3536222a@tcp(111.210.198.219:6030)/"

# 文件上传设置
upload:
  path: "upload"

logger:
  path: "resource/log/run"
  file: "{Y-m-d}.log"
  level: "all"
  stdout: true
  ctxKeys: ["RequestId"]

#GFToken
gfToken:
  timeOut: 10800         #token超时时间（秒）
  maxRefresh: 5400       #token自动刷新时间（秒）
  multiLogin: true       #是否允许一个账号多人同时登录
  encryptKey: "49346785e750b08987a8429b17896586"    #加密key (32位)
  excludePaths:          #排除不做登录验证的路由地址
    - "/api/v1/login"

# Redis 配置示例
redis:
  # 单实例配置
  default:
    address: r-wrwerwf324234pd.redis.rds.aliyuncs.com:6379
    db: 1
    pass: F32423424YYk9mut
    idleTimeout: 600
    maxActive: 100

system:
  cache:
    prefix: "SagooZhgy_" #缓存前缀
    model: "redis"  #存储引擎 （memory使用内存|redis使用redis）

```


## 环境需求

**操作系统**

Linux / macOS /Win

**Go 编译环境**

依赖 `Go1.16+` 编译环境，可前往[官方网站](https://golang.org/dl/) 或 [国内镜像](https://golang.google.cn/dl/) 下载安装。

**MySQL**

MySQL 5.6+



## 技术栈

开发语言：golang

服务端基础架构：[GoFrame](https://github.com/gogf/gf) 【 [中文文档](https://goframe.org/index) 】

前端框架 [vue-next-admin](https://gitee.com/lyt-top/vue-next-admin)【[中文文档](https://lyt-top.gitee.io/vue-next-admin-doc-preview/)】

swaggo https://github.com/swaggo/swag

gtoken https://github.com/goflyfox/gtoken

casbin https://github.com/casbin/casbin

## 本地源码运行

修改config下的config.toml文件，并配置相关项

请跟据注释进行配置修改，包括服务相关配置，日志相关

`go run main.go`

## 关于build.sh编译脚本

可以使用build.sh进行程序编译，如果在使用build.sh脚本进行程序编译时，提示

```
fatal: No names found, cannot describe anything.
./build.sh linux|windows|mac

```
是因为源码没有进行git版本的标签设置。

支持将git的tag编译到程序中。需要创建git的tag。只有创建了tag，编译的程序才会显示版本号。

```
git tag v0.0.1

git push origin v0.0.1
```

## 编译后执行脚本

编译后生成的可执行文件放在bin目录下，将bin目录下的文件放到目标服务器，执行`./curl.sh start` 运行即可。

```
curl.sh脚本参数：

start|stop|restart|status|tail

```

分别对应 启动、停止、重启、状态、显示动态日志运行信息

## 插件编译

如果要使用插件，需要提前将插件进行编译。直接使用plugins下面的编译脚本直接执行就可以。


## 其它问题

**1，如果在macOS下遇到 Warning :`IOMasterPort`：**

```
warning: ‘IOMasterPort‘ is deprecated: first deprecated in macOS 12.0 [-Wdeprecated-declarations]
```
**原因**

依赖包跟MacOS的版本有兼容问题。

解决方案
切换CGO编译方式
```
go env -w CGO_ENABLED="0"
```

** 2，如果采用HTTPS方式时SSE不工作，需要如下配置：**

```Nginx
    proxy_set_header Connection '';
    proxy_http_version 1.1;
    chunked_transfer_encoding off; 
```
