---
title: 系统安装
sidebar_position: 3
hide_title: true
keywords: [系统安装,源码编译,数据库初始化,服务部署,程序编译,环境配置,前端部署,Nginx配置,系统配置,安装流程]
description: '详细指导SagooIOT系统的完整安装流程，包括数据库初始化、服务端编译部署、前端部署和Nginx配置等步骤。'
---


SagooIoT系统的安装，通过获取源码进行编译后进行部署。

## 初始化数据库

基础环境安装后，需要初始化数据库。

1. 创建sagoo_iot数据库
2. 导入`manifest/sql`目录下的`init.sql`数据脚本

## 服务端程序编译与运行

### 程序运行

   1. 将项目clone到本地工作空间, `https://github.com/sagoo-cloud/sagooiot.git`
   2. 使用goland开发工具打开项目并找到goland的setting模块，找到Go Model设置环境代理`https://goproxy.io`.
   3. 使用`go mod tidy`同步项目依赖
   4. 找到`manifest/config/config.example.yaml`文件，将其复制一份改名为`config.yaml`
   5. 跟据基础环境的相关配置，修改`config.yaml`文件中MySQL、Tdengine、Redis、MQTT等配置信息。 
   6. go run main.go 建议使用Goland开发工具，直接运行main方法。

参考配置:
  详细配置请参考【<a href="config" target="_blank">系统配置参考</a>】

### 部署

SagooIoT提供了交叉编译的脚本，在项目根目录下。

在SagooIoT项目根目录下,使用`./build.sh linux|windows|mac`进行程序编译

:::info 备注

    在使用`build.sh`进行程序编译，如果提示

  ```shell
    fatal: No names found, cannot describe anything.
    
  ```

出现这个提示是因为源码没有进行git版本的标签设置.这个设置是为了编译后，将版本号打版到二进制编译程序中。

如要支持将git的tag编译到程序中。需要创建git的tag。只有创建了tag，编译的程序才会显示版本号.

如果不需要，也可以忽略。

向git库，提交git版本号：
  ```shell
    git tag v0.0.1
    git push origin v0.0.1
    
  ```
:::

### 部署

1. 执行完第一步的命令之后，会在项目根目录下，生成一个bin目录编译后文件夹.
2. 将bin目录下所有的文件上传到服务器`/opt/sagoo/iot-server`目录下，或是自行需要放置的目录即可. 
3. 进入到`/opt/sagoo/iot-server/config`目录下，找到config.yml文件，跟据环境对其进行修改.
   需要将MySQL、Tdengine、Redis、MQTT等配置信息更改为当前服务器所部署的基础环境. 
4. 修改完之后，返回到bin目录下，使用 `./curl.sh start` 启动服务

`curl.sh`脚本参数：

`start|stop|restart|status|tail` 分别对应 启动、停止、重启、状态、显示动态日志运行信息

`curl.sh`是一个后台驻留的执行脚本，建议采用这个脚本进行执行。

:::info 注意

首次启动SagooIoT系统，用使用 `./sagooiot -tsd` 命令，对TSD数据库进行初始化，否则会出现错误。

:::


## 前端程序编译与运行

### 程序运行

  1. 获取源代码，将项目clone到本地工作空间，源码库地址： `https://github.com/sagoo-cloud/sagooiot-ui.git`.
  2. 接取代码到本地后，在项目根目录中找到`.env.development`文件，修改对应的配置信息，以下是参考内容：

  ```shell
    VITE_SERVER_PROTOCOL = 'http:'
    VITE_SERVER_HOSTNAME = 'localhost:8200'

    # 基础服务路径 通过 nginx 配置 前后端直连就写 / 或者写在nginx上配置的路径 如 /base-api
    VITE_SERVER_URL = ''
    # 基础接口路径
    VITE_API_URL = '/api/v1'
  ```

  3. 使用`yarn install`进行项目依赖安装
  4. 使用`yarn run dev`启动项目


###  编译

  1. 在项目根目录下使用`npm run build`命令进行编译

  2. 执行完之后会在项目根目录下生成`dist`目录，将`dist`目录名更改为`iot-ui`

  3. 将第二步执行完的`iot-ui`目录及所有问题上传到服务器`/opt/sagoo`目录下

### 部署

#### 单体部署
如果SagooIoT采用的是单体部署的模式，也就是说，采用的是直接以SagooIoT服务程序为web服务的部署方式。
将编译好的`dist`目录下的所有文件复制到SagooIoT服务端`public`目录中即可，

#### 代理部署

希望通过Nginx采用代理方式部署，则需要在目标服务器上创建存入前端程序的目录，并配置nginx可以通过域名或是IP访问到这个目录。

  1. 进入到`/usr/local/nginx/conf`并对`nginx.conf`进行编辑
  2. 修改配置文件，以下是参考内容：

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

以上步骤执行完之后，使用`http://localhost`进行访问，账号信息如下：
  
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
