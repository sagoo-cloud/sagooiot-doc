---
title: 系统安装
sidebar_position: 3
hide_title: true
keywords: [系统安装,源码编译,数据库初始化,服务部署,程序编译,环境配置,前端部署,Nginx配置,系统配置,安装流程]
description: '详细指导SagooIOT系统的完整安装流程，包括数据库初始化、服务端编译部署、前端部署和Nginx配置等步骤。'
---

# SagooIOT系统安装指南

SagooIoT系统通过获取源码进行编译后部署。本指南将详细介绍完整的安装流程。

## 1. 数据库初始化

在完成基础环境安装后，需要执行以下步骤初始化数据库：

1. 创建数据库：
   - 数据库名：`sagoo_iot`

2. 导入初始数据：
   根据您使用的数据库类型，选择对应的初始化脚本：

   | 数据库类型 | 初始化脚本路径 |
   |------------|----------------|
   | MySQL | `manifest/sql/mysql-init.sql` |
   | PostgreSQL | `manifest/sql/postgresql-init.sql` |

## 2. 服务端部署

### 2.1 开发环境运行

1. 获取源码：
```bash
git clone https://github.com/sagoo-cloud/sagooiot.git
```

2. 配置开发环境：
   - 在GoLand中设置Go Module代理：`https://goproxy.io`
   - 执行 `go mod tidy` 同步依赖

3. 配置文件准备：
   - 复制 `manifest/config/config.example.yaml` 为 `config.yaml`
   - 修改配置文件中的相关配置：
     - MySQL配置
     - TDengine配置
     - Redis配置
     - MQTT配置

4. 运行程序：
   - 使用GoLand直接运行main方法
   - 或执行：`go run main.go`

> 详细配置请参考【[系统配置参考](config)】

### 2.2 生产环境部署

#### 程序编译

在项目根目录下执行交叉编译脚本：
```bash
./build.sh linux|windows|mac
```

:::info 版本标签说明
如果遇到以下提示：
```shell
fatal: No names found, cannot describe anything.
```

这是因为源码没有设置git版本标签。如需要在程序中显示版本号，请执行：
```shell
git tag v0.0.1
git push origin v0.0.1
```
:::

#### 部署步骤

1. 文件部署：
   - 将`bin`目录下所有文件上传至：`/opt/sagoo/iot-server`
   
2. 配置修改：
   - 修改`config/config.yml`中的环境配置
   
3. 服务启动：
   ```bash
   ./curl.sh start
   ```

**curl.sh 脚本用法：**

| 命令 | 说明 |
|------|------|
| start | 启动服务 |
| stop | 停止服务 |
| restart | 重启服务 |
| status | 查看状态 |
| tail | 查看日志 |

:::info 重要提示
首次启动系统时，请使用以下命令初始化TSD数据库：
```bash
./sagooiot -tsd
```
:::

## 3. 前端部署

### 3.1 开发环境运行

1. 获取源码：
```bash
git clone https://github.com/sagoo-cloud/sagooiot-ui.git
```

2. 配置开发环境：
   编辑 `.env.development` 文件：
```ini
VITE_SERVER_PROTOCOL = 'http:'
VITE_SERVER_HOSTNAME = 'localhost:8200'
VITE_SERVER_URL = ''
VITE_API_URL = '/api/v1'
```

3. 安装依赖并运行：
```bash
yarn install
yarn run dev
```

### 3.2 生产环境部署

1. 编译：
```bash
npm run build
```

2. 部署准备：
   - 将生成的`dist`目录重命名为`iot-ui`
   - 上传至服务器：`/opt/sagoo/iot-ui`

### 3.3 部署方式

#### 方式一：单体部署

将编译后的文件直接复制到SagooIoT服务端的`public`目录。

#### 方式二：Nginx代理部署

1. 编辑Nginx配置：
   路径：`/usr/local/nginx/conf/nginx.conf`

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

2. 重载Nginx配置：
```bash
cd /usr/local/nginx/sbin
./nginx -s reload
```

### 3.4 系统访问

| 配置项 | 值 |
|--------|-----|
| 访问地址 | http://localhost |
| 默认账号 | admin |
| 默认密码 | admin123456 |

## 常见问题

### macOS环境问题

**问题描述：**
在macOS下遇到警告：
```
warning: 'IOMasterPort' is deprecated: first deprecated in macOS 12.0 [-Wdeprecated-declarations]
```

**解决方案：**
切换CGO编译方式：
```bash
go env -w CGO_ENABLED="0"

```
