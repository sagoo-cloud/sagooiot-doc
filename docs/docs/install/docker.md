---
title: 'Docker部署指南'
sidebar_position: 11
hide_title: true
keywords: [Docker部署,容器化部署,环境配置,本地开发,服务启动,开发环境,Docker Compose,环境搭建,服务配置,开发调试]
description: '详细指导如何使用Docker部署SagooIOT平台，包括本地开发环境搭建、服务配置和启动的完整流程说明。'
---

## 基础环境要求

- MySQL-9.0.1
- Redis-7.4
- TDengine-3.3.3.0
- Nginx-1.27.2
- docker>=20.0.0

:::tip
基于docker版本进行安装，如果服务器没有docker需要先在服务器安装docker
:::

## 组件安装

### 一、MySQL安装

1. 拉取MySQL镜像
```bash
docker pull mysql:9.0.1
```

2. 启动MySQL服务
```bash
docker run -d --name mysql \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=DbyTYGu3s4WuAF4TTq7 \
  -v /data/docker/data/mysql/data:/var/lib/mysql \
  -v /data/docker/data/mysql/logs:/var/log \
  mysql:9.0.1
```

3. 初始化数据库
> IOT服务端源码下载到本地后，在`manifest/sql`文件夹下执行`mysql-init.sql`初始化数据库脚本

### 二、Redis安装

1. 拉取Redis镜像
```bash
docker pull redis:7.4
```

2. 启动Redis服务
```bash
docker run --name redis -d \
  -v /data/docker/data/redis/data:/data \
  redis redis:7.4 \
  --appendonly yes \
  --requirepass "FDXLK3LdGYYk9mut"
```

### 三、TDengine安装

1. 拉取TDengine镜像
```bash
docker pull tdengine/tdengine:3.3.3.0
```

2. 启动TDengine服务
```bash
docker run -d \
  -v /data/docker/data/taos/dnode/data:/var/lib/taos \
  -v /data/docker/data/taos/dnode/log:/var/log/taos \
  -p 6030:6030 -p 6041:6041 -p 6043:6043 \
  -p 6044-6049:6044-6049 \
  -p 6044-6045:6044-6045/udp \
  -p 6060:6060 \
  tdengine/tdengine:3.3.3.0
```

### 四、Nginx安装

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

4. 配置Nginx
```bash
# 指定安装目录和开启SSL支持
./configure --prefix=/data/base-server/nginx/nginx --with-http_ssl_module
```

5. 编译和安装
```bash
make && make install
```

6. 启动服务
```bash
./nginx
```

7. Nginx配置模板
```nginx
server {
    listen       80;
    server_name  172.18.2.41;

    location / {
        root /data/project/web/sagoo-iot;
        try_files $uri $uri/ /index.html;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }

    #规则引擎
    location /rule-api/ {
        add_header X-Accel-Buffering "no";
        proxy_set_header Connection upgrade; 
        proxy_set_header Upgrade $http_upgrade;
        proxy_http_version 1.1; 
        chunked_transfer_encoding off; 
        proxy_pass                 http://127.0.0.1:9090/;
        proxy_redirect             off;
        proxy_set_header           Host             $host;
        proxy_set_header           X-Real-IP        $remote_addr;
        proxy_set_header           X-Forwarded-For  $proxy_add_x_forwarded_for;
    }

    location /base-api/ {
        add_header X-Accel-Buffering "no";
        proxy_set_header Connection upgrade; 
        proxy_set_header Upgrade $http_upgrade;
        proxy_http_version 1.1; 
        chunked_transfer_encoding off; 
        proxy_pass                 http://127.0.0.1:8200/;
        proxy_redirect             off;
        proxy_set_header           Host             $host;
        proxy_set_header           X-Real-IP        $remote_addr;
        proxy_set_header           X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_buffering off;  # 关闭缓冲
    }

    location /base-api/swagger/api.json {
        proxy_pass                 http://127.0.0.1:8200/base-api/swagger/api.json;
    }

    #流媒体   
    location /media/ {
        proxy_set_header Connection upgrade; 
        proxy_set_header Upgrade $http_upgrade;
        proxy_http_version 1.1; 
        proxy_pass    https://127.0.0.1:8210/;
        proxy_redirect             off;
        proxy_set_header           Host             $host;
        proxy_set_header           X-Real-IP        $remote_addr;
    }

    #EMQX
    location /mqtt-web/ {
        proxy_set_header Connection upgrade;
        proxy_set_header Upgrade $http_upgrade;
        proxy_http_version 1.1;
        proxy_pass                 http://127.0.0.1:18083/;
        proxy_redirect             off;
        proxy_set_header           Host             $host;
        proxy_set_header           X-Real-IP        $remote_addr;
        proxy_set_header           X-Forwarded-For  $proxy_add_x_forwarded_for;
    }
}
```

8. 重载配置
```bash
./nginx -s reload
```

## 源码拉取与编译

### 环境安装

1. 安装GO环境
   - 官网地址: `https://golang.google.cn/dl/`, 安装对应的版本
   - 使用`go version`查看是否安装成功

2. 安装vue环境

### 源码下载及编译

1. 代码仓库地址
   ```plaintext
   # IOT服务端仓库
   http://收费版代码库/Sagoo-Cloud/sagooiot-professional.git
   
   # IOT前端仓库
   http://收费版代码库/Sagoo-Cloud/sagoo-admin-ui.git
   
   # 流媒体服务端
   http://收费版代码库/Sagoo-Media/sagoo-media-workspace.git
   ```

2. 配置文件设置
   - 将`/manifest/config/config.example.yaml`复制到同级目录下重命名为`config.yaml`
   - 修改对应的MySQL、Redis、TDengine链接信息

3. 配置文件示例
```yaml
# 系统配置
system:
  name: "sagooiot"
  version: "2.0"
  description: "SagooIoT Server"

# Token配置
gfToken:
  timeOut: 10800         #token超时时间（秒）
  maxRefresh: 5400       #token自动刷新时间（秒）
  multiLogin: true       #是否允许一个账号多人同时登录
  encryptKey: "49c54195e750b04e74a8429b17896586"    #加密key (32位)

# 规则引擎配置
rule:
  data_dir: "./data"
  log_file: "resource/log/rule.log"
  cmd_white_list: "cp,scp,mvn,npm,yarn,git,make,cmake,docker,kubectl,helm,ansible,puppet,pytest,python,python3,pip,go,java,dotnet,gcc,g++,ctest"
  load_lua_libs: true
```

4. 编译源码
   - 在源码根目录下执行`./build.sh linux`
   - 将生成的bin目录及所有子文件上传到服务器

5. 前端源码安装
   - 安装node版本管理器
   ```bash
   brew install nvm
   ```
   - 安装node 
   ```bash
   nvm install v18.7.0
   ```
   - 使用`nvm ls`查看安装版本
   - 在源码根目录下使用`npm install`进行依赖安装下载
   - 使用`npm run build`编译项目
   - 将编译后的dist文件夹及文件夹下所有的内容上传到服务器指定目录

## 其它问题

### 本地端口冲突

  docker部署的MySQL、Redis、Tdengine、Emqx配置的都是默认端口号，为防止本地端口冲突，建议修改端口号配置

### 时区问题
  部署完成之后，如果发现TD数据库中时区不对，则需要进入到TD容器里面执行一下两个命令，执行完成之后在重启TD容器
     ```bash
       ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
       echo "Asia/Shanghai" > /etc/timezone
     ```
