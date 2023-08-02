# SagooIOT安装

## 初始化数据库脚本
1. 创建sagoo_iot_professional数据库
2. 执行`manifest/sql`目录下init.sql数据脚本

## 服务端系统安装

### 服务部署
通过源码进行编译安装

1. 进入到项目根目录下

2. 使用build.sh进行程序编译，如果在使用build.sh脚本进行程序编译时，提示

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

3. 编译后，将bin目录下生成的全部文件上传到服务器`/opt/sagoo/iot-server`目录下。
4. 进入到`/opt/sagoo/iot-server/bin/config`目录下，找到config.yml文件
5. 使用`vi config.yml`对文件进行编辑，可参考以下配置内容：

       ```yml
            # 配置文件的键名命名方式统一使用小驼峰。
            # HTTP Server.
            server:
              address: ":8199"
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
              https: false
              httpsCertFile: ""
              httpsKeyFile: ""
            
            # 数据库连接配置
            database:
              logger:
                path: "resource/log/sql"
                level: "all"
                stdout: true
                ctxKeys: [ "RequestId" ]
              default:
                link: "mysql:root:DbyTYGu3s4WuAF4TTq7@tcp(127.0.0.1:3306)/sagoo_iot_professional?loc=Local&parseTime=true"
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
              maxOpenConns: 10
              maxIdleConns: 5
            
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
              encryptKey: "49c54195e750b04e74a8429b17896586"    #加密key (32位)
              excludePaths: #排除不做登录验证的路由地址
                - "/api/v1/login"
            
            # Redis 配置示例
            redis:
              # 单实例配置
              default:
                address: 127.0.0.1:6379
                db: 0
                pass: FDXLK3LdGYYk9mut
                idleTimeout: 600
                maxActive: 100
            
            # 这个mqtt客户端主要是服务端内部处理消息使用的通道
            mqtt:
              addr: 127.0.0.1:1883
              # 最好带上服务名称，变成唯一id
              clientId: sagoo-iot-professional-001
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
其中，MySQL、Tdengine、Redis、MQTT 需要根据实际部署的服务组件修改对应的IP地址、端口号、账号、密码登信息

6. 修改完之后，返回到bin目录下，使用 `./curl.sh start` 启动服务
   ```
    curl.sh脚本参数：
    
    start|stop|restart|status|tail
    
    ```
    分别对应 启动、停止、重启、状态、显示动态日志运行信息
###  插件编译
如果要使用插件，需要提前将插件进行编译。直接使用plugins下面的编译脚本直接执行就可以。

### 指数服务部署
   1. 进入项目根目录下，使用`./build.sh linux|windows|mac`进行程序编译
   2. 进入到服务器`/opt/sagoo/iot-server/bin`下
   3. 创建server文件夹及AssessServer子文件夹，并将第一步编译后的所有文件放到AssessServer子文件夹下
   4. 进入到`server/AssessServer/config`目录下修改config.toml配置，可参考以下配置内容
      ```toml
         [system]
         #可访问IP白名单，如果为空就是允许全部，空：[] ，赋值例值["xxx.xxx.xxx.xxx","xxx.xxx.xxx.xxx"]
          whitelist = []
        #数据缓存时间，单位为分钟。缓存时间参数 = 0表示不过期， 值< 0表示立即过期， 值> 0表示超时过期。
         DataCacheTime = 1
            
         #api访问密钥，为空不启用密钥检查功能
         SecretKey = ""
         DefaultPageSize = 500
            
            
            # HTTP Server
            [server]
            	Address     = ":8188"
            #	ServerRoot  = "public" #web根目录位置
            	ServerAgent = "AssessServer"
            	DumpRouterMap    = true #是否打印路由信息
            
            [logger]
                path   = "./log"
                level  = "ALL"
                stdout = false
                RotateExpire         = "1d"
                RotateBackupLimit    = 1
                RotateBackupExpire   = "7d"
            
            # 数据库配置
            [database]
                [[database.default]]
                    link = "./db/assess.db"
                    type = "sqlite"
                    Level  = "all"
                    Debug = true #是否输出SQL信息
      ```
      端口需根据实际情况进行修改
5. 返回到上一级目录，使用`./curl.sh start`进行启动

### sagoo-modbus部署 

1. 进入项目根目录下，使用`./build.sh linux|windows|mac`进行程序编译
2. 进入到服务器`/opt/sagoo/iot-server/bin`下
3. 创建server文件夹及sagoo-modbus子文件夹，并将第一步编译后的所有文件放到sagoo-modbus子文件夹下
4. 进入到`server/sagoo-modbus/config`目录下修改config.toml配置，可参考以下配置内容
      ```yml
         # mqtt 连接配置
        broker:
          address: tcp://47.100.218.61:9112 # 连接mqtt hub的地址
          username: 202203251522
          password: 202203251522
          clientid: 202203251522  # 连接mqtt hub时使用的client id
        
        
        # 这个mqtt客户端主要是服务端内部处理消息使用的通道
        mqtt:
          addr: 127.0.0.1:1883
          # 最好带上服务名称，变成唯一id
          clientId: example1233
          topic: device/monipower20221103
          auth:
            userName: admin
            userPassWorld: 123456
        
        # modbus Server.
        modbusServer:
          address:             ":8200"
        
        # HTTP Server.
        server:
          address:             ":8177"
          dumpRouterMap:       false  #路由信息输出
          routeOverWrite:      false
          accessLogEnabled:    true
          openapiPath:         "/api.json"
          swaggerPath:         "/swagger"
        #  serverRoot: "./public"
        
        # 日志配置
        logger:
          path:                  "./logs/"   # 日志文件路径。默认为空，表示关闭，仅输出到终端
          file:                  "{Y-m-d}.log" # 日志文件格式。默认为"{Y-m-d}.log"
          prefix:                ""            # 日志内容输出前缀。默认为空
          level:                 "all"         # 日志输出级别
          ctxKeys:               []            # 自定义Context上下文变量名称，自动打印Context的变量到日志中。默认为空
          header:                true          # 是否打印日志的头信息。默认true
          stdout:                true          # 日志是否同时输出到终端。默认true
          rotateSize:            0             # 按照日志文件大小对文件进行滚动切分。默认为0，表示关闭滚动切分特性
          rotateExpire:          0             # 按照日志文件时间间隔对文件滚动切分。默认为0，表示关闭滚动切分特性
          rotateBackupLimit:     0             # 按照切分的文件数量清理切分文件，当滚动切分特性开启时有效。默认为0，表示不备份，切分则删除
          rotateBackupExpire:    0             # 按照切分的文件有效期清理切分文件，当滚动切分特性开启时有效。默认为0，表示不备份，切分则删除
          rotateBackupCompress:  0             # 滚动切分文件的压缩比（0-9）。默认为0，表示不压缩
          rotateCheckInterval:   "1h"          # 滚动切分的时间检测间隔，一般不需要设置。默认为1小时
          stdoutColorDisabled:   false         # 关闭终端的颜色打印。默认开启
          writerColorEnable:     false         # 日志文件是否带上颜色。默认false，表示不带颜色
          filename: ./logs/service.log # modbus服务日志
          saveMessageLog:
              path: "./logs/message/"   # 日志文件路径。默认为空，表示关闭，仅输出到终端
              file: "{Y-m-d}.log" # 日志文件格式。默认为"{Y-m-d}.log"
        
        
        # 数据库连接配置
        database:
          logger:
            path: "./logs/sql"
            level: "all"
            stdout: true
            ctxKeys: [ "RequestId" ]
        
          default:
            link: "./data/iot.db"
            type: "sqlite"
            level: "all"
            debug: false
          messageLogDb:
            link: "./data/log.db"
            type: "sqlite"
            level: "all"
            debug: false
        
        # 代码生成配置
        gfcli:
          gen:
            dao:
                link: "sqlite:./data/iot.db"
                path: "./internal"
                tables: "template,device,device_template,device_job,template_data_area,dict"
      ```
      其中MQTT的IP、端口、账号、密码及服务端口号需根据实际情况进行修改
5. 返回到上一级目录，使用`./curl.sh start`进行启动

### 流媒体服务部署

1. 进入项目根目录下，使用`./build.sh linux|windows|mac`进行程序编译
2. 进入到服务器`/opt/sagoo/iot-server/bin`下
3. 创建server文件夹及SagooMedia子文件夹，并将第一步编译后的所有文件放到SagooMedia子文件夹下
4. 进入到`server/SagooMedia`目录下修改config.toml配置，可参考以下配置内容
      ```toml
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
           ```toml
             #ListenAddrTLS = ":8166"
             #CertFile = "server.pem"
             #KeyFile = "server.key"
           ```
5. 使用`./curl.sh start`进行启动

**以上服务部署，需基础环境安装文档里面的nginx进行对应路由地址配置**

## 前端项目安装

### sagoo-ui 项目部署
1. 进入项目根目录下使用`npm run build`命令进行源码编译

2. 将编译之后生成的sagoo-ui全部文件上传到服务器`/opt/sagoo`目录下
   上传路径可根据实际情况修改，修改之后需同步更新nginx配置中的前端路由
   
### 大屏项目部署
1. 进入项目根目录下使用`npm run build`命令进行源码编译

2. 进入`/opt/sagoo/iot-ui`目录下创建plugin文件夹
3. 将编译之后生成的screen全部文件上传到服务器`/opt/sagoo/iot-ui/plugin`目录下

### 组态项目部署
1. 进入项目根目录下使用`npm run build`命令进行源码编译

2. 进入`/opt/sagoo/iot-ui`目录下创建plugin文件夹
3. 将编译之后生成的topo全部文件上传到服务器`/opt/sagoo/iot-ui/plugin`目录下
    
### 其它问题

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

## Nginx配置

SagooIOT相关组件都部署后，需要进行Nginx配置， 配置内容参考如下：

   ```nginx
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
       #规则引擎路由
      location /rule-engine  {
                proxy_pass http://127.0.0.1:2877/rule-engine;
                autoindex on;
                autoindex_exact_size on;
                autoindex_localtime on;
      }
      
      location /rule-engine/comms {
                proxy_pass http://127.0.0.1:2877;
                proxy_read_timeout 300s;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;             
                proxy_set_header Connection "upgrade";
      }

      #sagoo-iot路由
      location /base-api/ {
                proxy_set_header Connection upgrade; 
                proxy_set_header Upgrade $http_upgrade;
                proxy_http_version 1.1; 
                chunked_transfer_encoding off; 
                proxy_pass                 http://127.0.0.1:8199/;
                proxy_redirect             off;
                proxy_set_header           Host             $host;
                proxy_set_header           X-Real-IP        $remote_addr;
                proxy_set_header           X-Forwarded-For  $proxy_add_x_forwarded_for;
      }
    
      #接口文档路由
      location /base-api/swagger/api.json {
           proxy_pass                 http://127.0.0.1:8199/base-api/swagger/api.json;
      }
      #指数服务路由
      location /base-api/assess/ {
           proxy_pass                 http://127.0.0.1:8188/;
           proxy_redirect             off;
           proxy_set_header           Host             $host;
           proxy_set_header           X-Real-IP        $remote_addr;
           proxy_set_header           X-Forwarded-For  $proxy_add_x_forwarded_for;

     }
     #modbus路由
     location /base-api/modbus/ {
          proxy_pass                 http://127.0.0.1:8177/;
          proxy_redirect             off;
          proxy_set_header           Host             $host;
          proxy_set_header           X-Real-IP        $remote_addr;
          proxy_set_header           X-Forwarded-For  $proxy_add_x_forwarded_for;

     }
     #流媒体服务路由
     location /media/ {
           proxy_pass    http://127.0.0.1:8166/;
           proxy_redirect             off;
           proxy_set_header           Host             $host;
           proxy_set_header           X-Real-IP        $remote_addr;
           location ~* \.(jpg|jpeg|png|ico|css|js)$ 
           {
                rewrite ^/media/(.*)$ /$1 break;
                root /opt/sagoo/iot-server/bin/SagooMedia/public;
            }

        }
    }
   ```

