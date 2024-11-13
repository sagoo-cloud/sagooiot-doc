---
sidebar_position: 2
---
# 服务部署

### 基础环境部署


Mysql5.6以上

Redis6.x

TDengine 3.0【[安装文档](https://docs.taosdata.com/get-started/package/)】


该程序可以独立部署，直接执行使用，也可以与nginx或是apache联合使用。

### 一、独立部署

服务器推荐使用*nix服务器系列(包括:Linux, MacOS, *BSD)，以下使用Linux系统为例，介绍如何部署。
将应用服务目录复制到目标位置，里面写好了执行的脚本，通过脚本来执行。


```
curl.sh脚本参数：

start|stop|restart|status|tail

```


### 二、代理部署

推荐使用Nginx作为反向代理的前端接入层，有两种配置方式实现动静态请求的拆分。

```
server {
    listen       80;
    server_name  www.abc.org;

    access_log   /var/log/gf-app-access.log;
    error_log    /var/log/gf-app-error.log;

    location ~ .*\.(gif|jpg|jpeg|png|js|css|eot|ttf|woff|svg|otf)$ {
        access_log off;
        expires    1d;
        root       /var/www/gf-app/public;
        try_files  $uri @backend;
    }

    location / {
        try_files $uri @backend;
    }

    location @backend {
        proxy_pass                 http://127.0.0.1:8200;
        proxy_redirect             off;
        proxy_set_header           Host             $host;
        proxy_set_header           X-Real-IP        $remote_addr;
        proxy_set_header           X-Forwarded-For  $proxy_add_x_forwarded_for;
    }
}

```

其中，8200为本地编译的应用Web服务监听端口。这个端口在config.toml文件的Address参数中配置。


## 其它问题

如果在macOS下遇到如下问题：
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

安装mysql为8.x以上，则需要按照以下步骤进行修改 

1. 输入管理员用户名和密码，以登录 MySQL 客户端
        ```mysql
        mysql -uroot -p
        ```
2. 输入以下命令，以查看当前的 innodb_strict_mode 设置：
        ```mysql
        SELECT @@GLOBAL.innodb_strict_mode;
        ```
    如果该命令返回了“1”，则表示 innodb_strict_mode 已启用。如果该命令返回了“0”，则表示 innodb_strict_mode 已禁用
3. 禁用 innodb_strict_mode
        ```mysql
        SET GLOBAL innodb_strict_mode=0;
        ```
4. 验证已修改的 innodb_strict_mode 设置是否生效
        ```mysql
        SELECT @@.innodb_strict_mode;
        ```

windows部署emqx, 需要使用管理员运行cmd，进入到bin目录下使用`./emqx start`命令进行启动
