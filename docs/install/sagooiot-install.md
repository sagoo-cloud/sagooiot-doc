---
sidebar_position: 3
---
# 系统安装

可以获取SagooIOT的二进制编译文件进行部署，也可以通过获取源码自行编译部署。

## 初始化数据库脚本

基础环境安装后，需要初始化数据库脚本。

1. 创建sagoo_iot数据库
2. 执行`manifest/sql`目录下`init.sql`数据脚本

## 本地编译运行

 ### 一、服务端本地启动

   1. 将项目clone到本地工作空间, `https://github.com/sagoo-cloud/sagooiot.git`

   2. 使用goland开发工具打开项目并找到goland的setting模块，找到Go Model设置环境代理`https://goproxy.io`.

   3. 使用`go mod tidy`同步项目依赖

   4. 找到`manifest/config/config.example.yaml`文件

   5. 复制`config.example.yaml`文件在`manifest/config`目录下并重命名为:`config.yaml`

   6. 修改`config.yaml`文件中MySQL、Tdengine、Redis、MQTT等配置信息

    其中MySQL配置中，link格式为: 

  ```shell
    type:username:password@protocol(address)[/dbname][?param1=value1&...&paramN=valueN]
  ```
      
  即:
    `类型:账号:密码@协议(地址)/数据库名称?特性配置`

   7. 参考配置:

      ```yaml
          # 配置文件的键名命名方式统一使用小驼峰。
          # HTTP Server.
          server:
            address: ":8200"
            serverRoot: "resource/public"
            dumpRouterMap: false
            routeOverWrite: true
            openapiPath: "base-api/api.json"
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
              path: "logs/sql"
              level: "all"
              stdout: true
              ctxKeys: [ "RequestId" ]

            default:
              link: "mysql:root:kWHPd78TTxUr3Xct@tcp(127.0.0.1:3306)/sagoo_iot?loc=Local&parseTime=true"
              debug: false #开启调试模式
              charset: "utf8mb4" #数据库编码(如: utf8/gbk/gb2312)，一般设置为utf8
              dryRun: false #ORM空跑(只读不写)
              maxIdle: 10 #连接池最大闲置的连接数
              maxOpen: 10 #连接池最大打开的连接数
              maxLifetime: 30 #(单位秒)连接对象可重复使用的时间长度

          # TDengine配置
          tdengine:
            type: "taosRestful" #http连接方式，端口是6041
            dsn: "root:n7XQ!9JG@http(127.0.0.1:6041)/"
            dbName: "sagoo_iot"

          # 文件上传设置
          upload:
            path: "upload"

          logger:
            path: "resource/log/run"
            file: "{Y-m-d}.log"
            level: "all"
            stdout: true
            ctxKeys: [ "RequestId" ]

          #GFToken
          gfToken:
            timeOut: 10800         #token超时时间（秒）
            maxRefresh: 5400       #token自动刷新时间（秒）
            multiLogin: true       #是否允许一个账号多人同时登录
            encryptKey: "49c54195e750b09e74a8429b17896321"    #加密key (32位)
            excludePaths: #排除不做登录验证的路由地址
              - "/api/v1/login"

          # Redis 配置示例
          redis:
            # 单实例配置
            default:
              address: 127.0.0.1:6379
              db: 1
              pass: FDXLK3LdGYYk9mut
              idleTimeout: 600
              maxActive: 100

          # 这个mqtt客户端主要是服务端内部处理消息使用的通道
          mqtt:
            addr: 127.0.0.1:1883
            # 最好带上服务名称，变成唯一id
            clientId: sagoo-iot-open-001
            deviceLiveDuration: 30
            auth:
              userName: admin
              userPassWorld: 123456

          system:
            pluginsPath: "./plugins/built"
            cache:
              prefix: "SagooIOT_" #缓存前缀
              model: "redis"  #存储引擎 （memory使用内存|redis使用redis）
      ```

### 二、前端本地启动

  1. 将项目clone到本地工作空间, `https://github.com/sagoo-cloud/sagooiot-ui.git`.
  2. 在项目根目录下找到`.env.development`文件，修改对应的配置信息，以下是参考内容:

  ```shell
    VITE_SERVER_PROTOCOL = 'http:'
    VITE_SERVER_HOSTNAME = 'localhost:8200'

    # 基础服务路径 通过 nginx 配置 前后端直连就写 / 或者写在nginx上配置的路径 如 /base-api
    VITE_SERVER_URL = ''
    # 基础接口路径
    VITE_API_URL = '/api/v1'
  ```

  3. 使用`yarn`进行项目依赖安装
  4. 使用`yarn run dev`启动项目

## 源码编译部署

### 一、服务端源码编译

  1. 进入到项目根目录下,使用`./build.sh linux|windows|mac`进行程序编译

    使用`build.sh`进行程序编译，如果在使用build.sh脚本进行程序编译时，提示

  ```shell
    fatal: No names found, cannot describe anything.
  ```

    是因为源码没有进行git版本的标签设置.

    支持将git的tag编译到程序中。需要创建git的tag。只有创建了tag，编译的程序才会显示版本号.

  ```shell
    git tag v0.0.1
    git push origin v0.0.1
  ```

  2. 执行完第一步的命令之后，会在项目根目录下，生成一个bin目录编译后文件夹.
  3. 将bin目录下所有的文件上传到服务器`/opt/sagoo/iot-server`目录下.
  4. 进入到`/opt/sagoo/iot-server/config`目录下，找到config.yml文件并对其进行修改.
    需要将MySQL、Tdengine、Redis、MQTT等配置信息更改为当前服务器所部署的基础环境.
  5. 修改完之后，返回到bin目录下，使用 `./curl.sh start` 启动服务,curl.sh脚本参数：

  ```shell
    start|stop|restart|status|tail
  ```

      分别对应 启动、停止、重启、状态、显示动态日志运行信息

###  二、前端源码编译

  1. 进入到项目根目录下使用`npm run build`命令进行编译

  2. 执行完之后会在项目根目录下生成`dist`目录，将`dist`目录名更改为`iot-ui`

  3. 将第二步执行完的`iot-ui`目录及所有问题上传到服务器`/opt/sagoo`目录下

### 三、nginx配置

  1. 进入到`/usr/local/nginx/conf`并对`nginx.conf`进行编辑
  2. 修改配置文件，以下是参考内容:

  ```nginx
  
    gzip on;
    gzip_min_length  10k;
    gzip_buffers     4 16k;
    gzip_comp_level 6;
    gzip_types     text/plain application/javascript application/x-javascript text/javascript text/css application/xml;
    gzip_vary on;
    gzip_proxied   expired no-cache no-store private auth;
    gzip_disable   "MSIE [1-6]\.";

    server {
        listen       80;
        server_name  localhost;
        
        #ssl_certificate /data/nginx/conf/vhost/cert/localhost/fullchain.pem;     
        #ssl_certificate_key /data/nginx/conf/vhost/cert/localhost/privkey.pem;

        #前端路由
        location / {
            root /opt/sagoo/iot-ui;
        }
        
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
      
        #sagoo-iot路由
        location /base-api/ {
                  proxy_set_header Connection upgrade; 
                  proxy_set_header Upgrade $http_upgrade;
                  proxy_http_version 1.1; 
                  chunked_transfer_encoding off; 
                  proxy_pass                 http://127.0.0.1:8200/;
                  proxy_redirect             off;
                  proxy_set_header           Host             $host;
                  proxy_set_header           X-Real-IP        $remote_addr;
                  proxy_set_header           X-Forwarded-For  $proxy_add_x_forwarded_for;
        }
    
        #接口文档路由
        location /base-api/swagger/api.json {
            proxy_pass                 http://127.0.0.1:8200/base-api/swagger/api.json;
        }
    }
  ```

  3. 进入到`/usr/local/nginx/sbin`目录下，使用`./nginx -s reload`重载nginx配置文件

以上步骤执行完之后，使用`http://localhost`进行访问，账号信息如下:
  
  账号: admin
  密码: admin123456

## 其它问题

**如果在macOS下遇到 Warning :`IOMasterPort`：**

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
