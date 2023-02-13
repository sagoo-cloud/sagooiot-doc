# 部署说明


该程序可以独立部署，直接执行使用，也可以与nginx或是apache联合使用。


## 硬件要求

**最低配置**

|CPU|1核心|
|--|--|
|内存|1GB|
|硬盘|40G|

**推荐配置**

|CPU|2核+|
|--|--|
|内存|4GB+|
|硬盘|40GB+|


## 独立部署

服务器推荐使用lnix服务器系列(包括:Linux, MacOS, *BSD)，以下使用Linux系统为例，介绍如何部署。
将应用服务目录复制到目标位置，里面写好了执行的脚本，通过脚本来执行。


```
curl.sh脚本参数：

start|stop|restart|status|tail

```


## 代理部署

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


## 集群部署

**系统部署图**

![集群部署](../../public/imgs/guide/start/deploy.png)



