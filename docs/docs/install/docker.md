---
title: 'Docker部署指南'
sidebar_position: 11
hide_title: true
keywords: [Docker部署,容器化部署,环境配置,本地开发,服务启动,开发环境,Docker Compose,环境搭建,服务配置,开发调试]
description: '详细指导如何使用Docker部署SagooIOT平台，包括本地开发环境搭建、服务配置和启动的完整流程说明。'
---

# Docker部署指南

## 基础环境要求

| 组件 | 版本 |
| :--- | :--- |
| MySQL | 9.0.1 |
| Redis | 7.4 |
| TDengine | 3.3.5.8 |
| Nginx | 1.27.2 |
| Docker | >=20.0.0 |

:::tip
基于 Docker 版本进行安装，如果服务器没有 Docker 需要先在服务器安装 Docker
:::

## 组件安装

### MySQL安装

<details open>
<summary>安装步骤</summary>

#### 1. 拉取MySQL镜像

```bash
docker pull mysql:9.0.1
```

#### 2. 启动MySQL服务

```bash
docker run -d --name mysql \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=DbyTYGu3s4WuAF4TTq7 \
  -v /data/docker/data/mysql/data:/var/lib/mysql \
  -v /data/docker/data/mysql/logs:/var/log \
  mysql:9.0.1
```

##### 参数说明

| 参数 | 说明 |
| :--- | :--- |
| `-d` | 后台运行容器（守护进程模式） |
| `--name mysql` | 指定容器的名称为 mysql，方便后续管理和引用 |
| `-p 3306:3306` | 将容器的 3306 端口映射到主机的 3306 端口，使得可以通过主机端口访问 MySQL 服务 |
| `-e MYSQL_ROOT_PASSWORD=DbyTYGu3s4WuAF4TTq7` | 设置 MySQL root 用户的密码为 DbyTYGu3s4WuAF4TTq7 |
| `-v /data/docker/data/mysql/data:/var/lib/mysql` | 将主机的 `/data/docker/data/mysql/data` 目录挂载到容器的 `/var/lib/mysql` 目录，用于持久化存储 MySQL 数据文件 |
| `-v /data/docker/data/mysql/logs:/var/log` | 将主机的 `/data/docker/data/mysql/logs` 目录挂载到容器的 `/var/log` 目录，用于存储 MySQL 的日志文件 |
| `mysql:9.0.1` | 指定使用的 MySQL 镜像及版本 |

#### 3. 初始化数据库

:::info
IOT服务端源码下载到本地后，在`manifest/sql`文件夹下执行`mysql-init.sql`初始化数据库脚本
:::

</details>

### Redis安装

<details open>
<summary>安装步骤</summary>

#### 1. 拉取Redis镜像

```bash
docker pull redis:7.4
```

#### 2. 启动Redis服务

```bash
docker run --name redis -d \
  -v /data/docker/data/redis/data:/data \
  redis redis:7.4 \
  --appendonly yes \
  --requirepass "FDXLK3LdGYYk9mut"
```

##### 参数说明

| 参数 | 说明 |
| :--- | :--- |
| `--name redis` | 指定容器的名称为 redis，方便后续管理和引用 |
| `-d` | 后台运行容器（守护进程模式） |
| `-v /data/docker/data/redis/data:/data` | 将主机的 `/data/docker/data/redis/data` 目录挂载到容器的 `/data` 目录，用于持久化存储 Redis 数据 |
| `redis redis:7.4` | 指定使用的 Redis 镜像及版本（注意：这里第一个 redis 可能是多余的，应该只需要 `redis:7.4`） |
| `--appendonly yes` | 启用 Redis 的 AOF 持久化机制，确保数据在容器重启后不会丢失 |
| `--requirepass "FDXLK3LdGYYk9mut"` | 设置 Redis 的访问密码，增强安全性 |

</details>

### TDengine安装

<details open>
<summary>安装步骤</summary>

#### 1. 拉取TDengine镜像

```bash
docker pull tdengine/tdengine:3.3.5.8
```

#### 2. 启动TDengine服务

```bash
docker run -d \
  -v /data/docker/data/taos/dnode/data:/var/lib/taos \
  -v /data/docker/data/taos/dnode/log:/var/log/taos \
  -p 6030:6030 -p 6041:6041 -p 6043:6043 \
  -p 6044-6049:6044-6049 \
  -p 6044-6045:6044-6045/udp \
  -p 6060:6060 \
  tdengine/tdengine:3.3.5.8
```

##### 参数说明

| 参数 | 说明 |
| :--- | :--- |
| `-d` | 后台运行容器（守护进程模式） |
| `-v /data/docker/data/taos/dnode/data:/var/lib/taos` | 将主机的 `/data/docker/data/taos/dnode/data` 目录挂载到容器的 `/var/lib/taos` 目录，用于持久化存储 TDengine 的数据 |
| `-v /data/docker/data/taos/dnode/log:/var/log/taos` | 将主机的 `/data/docker/data/taos/dnode/log` 目录挂载到容器的 `/var/log/taos` 目录，用于存储 TDengine 的日志文件 |
| `-p 6030:6030` | 映射 TDengine 的服务端口，用于客户端与服务器的通信 |
| `-p 6041:6041` | 映射 TDengine 的 RESTful 接口端口，用于 HTTP 请求 |
| `-p 6043:6043` | 映射 TDengine 的 WebSocket 接口端口 |
| `-p 6044-6049:6044-6049` | 映射 TDengine 的内部通信端口范围（TCP） |
| `-p 6044-6045:6044-6045/udp` | 映射 TDengine 的内部通信端口范围（UDP） |
| `-p 6060:6060` | 映射 TDengine 的监控端口 |
| `tdengine/tdengine:3.3.5.8` | 指定使用的 TDengine 镜像及版本 |

</details>

### Nginx安装

<details open>
<summary>安装步骤</summary>

#### 1. 下载安装包

```bash
wget http://nginx.org/download/nginx-1.27.2.tar.gz
```

#### 2. 解压源码包

```bash
tar -zxf nginx-1.27.2.tar.gz
```

#### 3. 安装依赖

```bash
# 安装依赖
sudo yum install gcc-c++ pcre-devel zlib-devel make openssl-devel
```

#### 4. 配置Nginx

```bash
# 指定安装目录和开启SSL支持
./configure --prefix=/data/base-server/nginx/nginx --with-http_ssl_module
```

#### 5. 编译和安装

```bash
make && make install
```

#### 6. 启动服务

```bash
./nginx
```

#### 7. Nginx配置模板

<details open>
<summary>点击查看完整配置</summary>

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

</details>

#### 8. 重载配置

```bash
./nginx -s reload
```

</details>

## 源码拉取与编译

### 环境安装

<details open>
<summary>安装步骤</summary>

#### 1. 安装GO环境

- 官网地址: `https://golang.google.cn/dl/`, 安装对应的版本
- 使用 `go version` 查看是否安装成功

#### 2. 安装vue环境

</details>

### 源码下载及编译

<details open>
<summary>操作步骤</summary>

#### 1. 代码仓库地址

:::info
```plaintext
# IOT服务端仓库
http://收费版代码库/Sagoo-Cloud/sagooiot-professional.git

# IOT前端仓库
http://收费版代码库/Sagoo-Cloud/sagoo-admin-ui.git

# 流媒体服务端
http://收费版代码库/Sagoo-Media/sagoo-media-workspace.git
```
:::

#### 2. 配置文件设置

- 将 `/manifest/config/config.example.yaml` 复制到同级目录下重命名为 `config.yaml`
- 修改对应的 MySQL、Redis、TDengine 链接信息

#### 3. 配置文件示例

<details open>
<summary>点击查看配置文件示例</summary>

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

</details>

#### 4. 编译源码

- 在源码根目录下执行 `./build.sh linux`
- 将生成的 bin 目录及所有子文件上传到服务器

#### 5. 前端源码安装

##### 5.1 安装 node 版本管理器

```bash
brew install nvm
```

##### 5.2 安装 node

```bash
nvm install v18.7.0
```

##### 5.3 查看安装版本

```bash
nvm ls
```

##### 5.4 安装依赖并编译

- 在源码根目录下使用 `npm install` 进行依赖安装下载
- 使用 `npm run build` 编译项目
- 将编译后的 dist 文件夹及文件夹下所有的内容上传到服务器指定目录

</details>

## 其它问题

<details open>
<summary>常见问题及解决方案</summary>

### 本地端口冲突

:::warning
Docker 部署的 MySQL、Redis、TDengine、EMQX 配置的都是默认端口号，为防止本地端口冲突，建议修改端口号配置。
:::

### 时区问题

:::tip
部署完成之后，如果发现 TDengine 数据库中时区不对，则需要进入到 TDengine 容器里面执行以下两个命令，执行完成之后再重启 TDengine 容器：

```bash
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
echo "Asia/Shanghai" > /etc/timezone
```
:::

</details>
