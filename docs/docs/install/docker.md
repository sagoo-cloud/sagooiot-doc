---
title: 'Docker部署指南'
sidebar_position: 11
hide_title: true
keywords: [Docker部署,容器化部署,环境配置,本地开发,服务启动,开发环境,Docker Compose,环境搭建,服务配置,开发调试]
description: '详细指导如何使用Docker部署SagooIOT平台，包括本地开发环境搭建、服务配置和启动的完整流程说明。'
---

### 基础环境

1. MySQL-9.0.1
2. Redis-7.4
3. TDengine-3.3.3.0
4. Nginx-1.27.2
5. docker>=20.0.0

基于docker版本进行安装，如果服务器没有docker需要现在服务器安装docker


##### 一、MySQL安装
 a. 拉取MySQL镜像
```linux
  docker pull mysql:9.0.1
```
 b. 启动MySQL服务
  ```linux
  docker run -d --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=DbyTYGu3s4WuAF4TTq7 -v /data/docker/data/mysql/data:/var/lib/mysql -v /data/docker/data/mysql/logs:/var/log mysql:9.0.1
  ```
 c. IOT服务端源码下载到本地后，在`manifest/sql`文件夹下执行`mysql-init.sql`初始化数据库脚本
##### 二、Redis安装

a. 拉取Redis镜像
```linux
  docker pull redis:7.4
```
 b. 启动Redis服务
  ```linux
  docker run --name redis -d -v /data/docker/data/redis/data:/data redis redis:7.4 --appendonly yes --requirepass "FDXLK3LdGYYk9mut"
  ```
##### 三、TDengine安装

a. 拉取TDengine镜像
```linux
  docker pull tdengine/tdengine:3.3.3.0
```
b. 启动TDengine服务
  ```linux
  docker run -d -v /data/docker/data/taos/dnode/data:/var/lib/taos   -v /data/docker/data/taos/dnode/log:/var/log/taos   -p 6030:6030 -p 6041:6041 -p 6043:6043 -p 6044-6049:6044-6049 -p 6044-6045:6044-6045/udp -p 6060:6060 tdengine/tdengine:3.3.3.0
  ```
#### 四、Nginx安装

1. 下载安装包
```bash
wget http://nginx.org/download/nginx-1.27.2.tar.gz
```
2. 解压源码包
```bash
tar -zxf nginx-1.27.2.tar.gz
```
3. 安装依赖
```bash
# 安装依赖
sudo yum install gcc-c++ pcre-devel zlib-devel make openssl-devel
```
4. 配置Nginx，这里可以指定安装目录和开启SSL支持
```bash
./configure --prefix=/data/base-server/nginx/nginx --with-http_ssl_module
```
5. 编译和安装
```bash
make &&& make install
```
6. 启动服务
```bash
./nginx
```
7. 配置模板
```bash
    server {
        listen       80 ;
        server_name  172.18.2.41;
    
        #charset koi8-r;
    
            #access_log  logs/host.access.log  main;
        
    
    
        location / {
            root /data/project/web/sagoo-iot;
            try_files $uri $uri/ /index.html;
           # index  /index.html;
           
        }
    
    
        #error_page  404              /404.html;
    
        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    
      #规则引擎
      location /rule-api/ {
            add_header X-Accel-Buffering "no";
            proxy_set_header Connection upgrade; 
            proxy_set_header Upgrade $http_upgrade;
            proxy_http_version 1.1; 
            chunked_transfer_encoding off; 
            proxy_pass                 http://127.0.0.1:9090/;
            proxy_redirect             off;
            proxy_set_header           Host             $host;
            proxy_set_header           X-Real-IP        $remote_addr;
            proxy_set_header           X-Forwarded-For  $proxy_add_x_forwarded_for;
      }
    
      location /base-api/ {
            add_header X-Accel-Buffering "no";
            proxy_set_header Connection upgrade; 
            proxy_set_header Upgrade $http_upgrade;
            proxy_http_version 1.1; 
            chunked_transfer_encoding off; 
            proxy_pass                 http://127.0.0.1:8200/;
            proxy_redirect             off;
            proxy_set_header           Host             $host;
            proxy_set_header           X-Real-IP        $remote_addr;
            proxy_set_header           X-Forwarded-For  $proxy_add_x_forwarded_for;
            proxy_buffering off;  # 关闭缓冲
      }
    
      location /base-api/swagger/api.json {
       proxy_pass                 http://127.0.0.1:8200/base-api/swagger/api.json;
      }
    
     
     #流媒体   
     location /media/ {
          #alias /home/sagoo-admin/server/Media/public/; 
          #index index.html;
        proxy_set_header Connection upgrade; 
        proxy_set_header Upgrade $http_upgrade;
        proxy_http_version 1.1; 
        #chunked_transfer_encoding off; 
        proxy_pass    https://127.0.0.1:8210/;
        proxy_redirect             off;
        proxy_set_header           Host             $host;
        proxy_set_header           X-Real-IP        $remote_addr;
        # location ~* \.(jpg|jpeg|png|ico|css|js)$ {
        #                 rewrite ^/media/(.*)$ /$1 break;
        #             root /data/project/server/sagoo-iot/bin/server/SagooMedia/public;
        #         #proxy_pass    http://127.0.0.1:8081;
        #             #try_files  $uri/ =404;
    
        # }
     }
    
       #EMQX
      location /mqtt-web/ {
           proxy_set_header Connection upgrade;
           proxy_set_header Upgrade $http_upgrade;
           proxy_http_version 1.1;
           proxy_pass                 http://127.0.0.1:18083/;
           proxy_redirect             off;
           proxy_set_header           Host             $host;
           proxy_set_header           X-Real-IP        $remote_addr;
           proxy_set_header           X-Forwarded-For  $proxy_add_x_forwarded_for;
       }
}

```
8. 重载配置
```bash
./nginx -s reload
```

### 源码拉取并编译

#### 环境安装
1. 安装GO环境
   
   a. 官网地址: `https://golang.google.cn/dl/`, 安装对应的版本
   b. 使用`go version`查看是否安装成功

2. 安装vue环境

#### 源码下载及编译
1. IOT服务端仓库地址: 
   ```
   http://收费版代码库/Sagoo-Cloud/sagooiot-professional.git
   ```
   IOT前端仓库地址:
   ```
   http://收费版代码库/Sagoo-Cloud/sagoo-admin-ui.git
   ```
   流媒体服务端地址:
    ```
   http://收费版代码库/Sagoo-Media/sagoo-media-workspace.git
   ```
   流媒体前端地址:
   ```
   http://收费版代码库/Sagoo-Media/sagoo-media-ui.git
   ```
2. 安装IOT服务端源码依赖关系
   
   a. 使用goland开发工具打开服务端源码

   b. 设置GOROOT和GOPATH

   c. 在设置go module中配置环境
   ```
   GOPROXY=https://goproxy.io
   ``` 

   d. 在源码根目录下执行`go mod tidy`安装依赖
3. 增加并修改配置文件
   
   a. 将/manifest/config/config.example.yaml复制到同级目录下config.yaml配置文件中
   b. 修改对应的MySQL、Redis、TDengine链接信息
   
   配置文件示例:
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
            #link: "mysql:root:DbyTYGu3s4WuAF4TTq7@tcp(127.0.0.1:3306)/sagoo_iot_professional?loc=Local&parseTime=true"
            link: "pgsql:postgres:bRpj9rbp@tcp(127.0.0.1:5432)/sagoo_iot_professional?sslmode=disable"
            #link: "sqlite:root:DbyTYGu3s4WuAF4TTq7@file(./data/iot.db)"
            debug: true #开启调试模式
            charset: "utf8mb4" #数据库编码(如: utf8/gbk/gb2312)，一般设置为utf8
            dryRun: false #ORM空跑(只读不写)
            maxIdle: 50 #连接池最大闲置的连接数
            maxOpen: 1000 #连接池最大打开的连接数
            maxLifetime: 120 #(单位秒)连接对象可重复使用的时间长度
        
        # 这个mqtt客户端主要是服务端内部处理消息使用的通道
        mqtt:
          addr: 127.0.0.1:1883
          #  addr: 36.133.44.186:18890
          # 最好带上服务名称，变成唯一id
          clientId: sagoo_iot_professional
          deviceLiveDuration: 60
          qos: 1
          auth:
            userName: admin
            userPassWord: 123456
        
        # 时序数据库配置
        tsd:
          database: "TdEngine" #可选择 TdEngine、Influxdb
          tdengine:
            #     type: "taosRestful" #http连接方式，端口是6041
            #     dsn: "root:taosdata@http(127.0.0.1:6041)/"
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
3. 编译源码
   在源码根目录下执行`./build.sh linux`，然后在生成的bin目录及所有子文件全都上传到服务器上
   
5. 安装前端源码依赖关系
   a. 安装node版本管理器
      `brew install nvm`
   b. 安装node 
      `nvm install v18.7.0`
   c. 使用`nvm ls`查看安装版本
   d. 在源码根目录下使用`npm install`进行依赖安装下载
   e. 使用`npm run build`编译项目
   d. 将编译后的dist文件夹及文件夹下所有的内容上传到服务器指定目录


## 其它问题
  
### 本地端口冲突

  docker部署的MySQL、Redis、Tdengine、Emqx配置的都是默认端口号，为防止本地端口冲突，建议修改端口号配置

### 时区问题
  部署完成之后，如果发现TD数据库中时区不对，则需要进入到TD容器里面执行一下两个命令，执行完成之后在重启TD容器
     ```bash
       ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
       echo "Asia/Shanghai" > /etc/timezone
     ```
