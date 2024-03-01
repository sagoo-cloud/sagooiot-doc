---
sidebar_position: 2
---
# 安装过程

SagooIOT基础环境安装包括以下几个部分：

1. Redis 7.0.4   【[官方安装文档](https://redis.io/docs/getting-started/installation/)】

2. TDengine 3.0.1.5 【[官方安装文档](https://docs.taosdata.com/get-started/package/)】

3. EMQX 5.0.9-el8  【[官方安装文档](https://www.emqx.io/docs/zh/v5.1/getting-started/getting-started.html)】

4. Nginx 1.22.0

5. MySQL 5.7 或 PostgreSQL 13.4


## 安装redis

下面是在 Linux 上安装 Redis 7.x 的详细步骤：

1 升级系统并安装必要的软件包：

如果在Debian和Ubuntu系统下使用下面的命令：

```shell
    sudo apt-get update
    sudo apt-get upgrade
    sudo apt-get install build-essential tcl
```

:::note 注意
如果是centos系统 则需要用到yum命令：
  CentOS 7 及以下版本：
* sudo yum update
* sudo yum install gcc make tcl

如果使用的是 CentOS 8 或更高版本，您应该使用 dnf：
* sudo dnf check-update
* sudo dnf upgrade
* sudo dnf install gcc make tcl

:::

2 下载 Redis 源代码：

```shell
  wget http://download.redis.io/releases/redis-7.0.12.tar.gz

```


3 解压缩源代码：

```shell
    tar xzf redis-7.0.12.tar.gz
    cd redis-7.0.12
```


4 编译和安装 Redis：
```shell
    make
    sudo make install
```

5 创建 Redis 配置文件目录：

```shell
    sudo mkdir /etc/redis
    sudo cp redis.conf /etc/redis
```

6 修改 Redis 配置文件：

```shell
  sudo nano /etc/redis/redis.conf

```
7 启动 Redis 服务：
```shell
  redis-server /etc/redis/redis.conf

```
8 测试 Redis 连接：

```shell
  redis-cli ping

```

如果得到 PONG 响应，说明 Redis 服务已经成功启动。

请注意，上面的步骤是在一个没有安装 Redis 的系统上执行的。如果您已经安装了 Redis，请先卸载它，然后再按照上面的步骤重新安装。

请确保您有 root 权限，并在每一步操作前确保系统已经升级到最新版本。

## 安装TDengine

:::tip 提示

建议安装 TDengine 3.x 最新版，TDengine安装参考其官方安装文档：https://docs.taosdata.com/get-started/

安装包地址：https://docs.taosdata.com/get-started/package/

:::

1. 官网地址:` https://www.taosdata.com/`

2. 下载安装包到服务器`/opt/TDengine`目录下

   ![image-20221101170836289](../imgs/install/image-20221101170836289.png)

3. 使用tar -zxf解压压缩包

4. 进入到TDengine-server-3.0.1.5目录（目录取决于你安装的版本）里使用命令`sudo ./install.sh`进行安装

5. 使用`systemctl start taosd`启动

6. 使用`systemctl status taosd`查看TD是否启动成功

   ![image-20221101172357637](../imgs/install/image-20221101172357637.png)

7. 使用命令taos进入命令窗口

8. 使用`alter user root pass '密码';`对root用户设置权限，也可使用create user创建用户

9. 系统使用http形式连接，故需`systemctl start taosadapter`启动taosadapter

详细的安装过程请看Tdengine的官网说明：[官网安装手册](https://docs.taosdata.com/get-started/package/)

:::tip 提示 推荐使用DBeaver工具进行TDengine数据库管理

DBeaver  是一个通用的数据库管理工具和 SQL 客户端，支持 MySQL, PostgreSQL, Oracle, DB2, MSSQL, Sybase, Mimer, HSQLDB, Derby, 以及其他兼容 JDBC 的数据库。DBeaver 提供一个图形界面用来查看数据库结构、执行SQL查询和脚本，浏览和导出数据，处理BLOB/CLOB 数据，修改数据库结构等等。
https://dbeaver.io/
:::


## 安装EMQX

1. 官网地址:https://www.emqx.com/zh

2. `wget https://www.emqx.com/zh/downloads/broker/5.0.9/emqx-5.0.9-el8-amd64.tar.gz `下载对应版本的emqx到/opt目录下

3. 在/opt/目录下通过`mkdir -p emqx && tar -zxvf emqx-5.0.9-el8-amd64.tar.gz -C emqx`解压

4. 使用`./emqx/bin/emqx start `命令进行启动

5. `http://localhost:18083/ `登录此地址查询是否安装成功，默认账号: admin 密码: public

6. 设置权限认证

   ![image-20221101231856257](../imgs/install/image-20221101231856257.png)

详细的安装过程请看EMQX的官网说明：[官网安装手册](https://www.emqx.io/docs/zh/v5.0/deploy/install.html)


## 安装Nginx

1. 官网地址：`http://nginx.org/en/download.html`

2. 将下载后的nginx上传至`/opt/nginx`下

3. 使用`tar zxf`对nginx进行解压

   ```shell
    tar -zxf nginx-1.25.1.tar.gz
   ```

4. 进入到nginx-1.25.1目录进行编译安装

   ```shell
    1. ./configure --prefix=/usr/local/nginx --with-http_ssl_module
    2. make && make install
   ```

5. 进入到安装目录下修改nginx.conf配置文件

   ```shell
   1. cd /usr/local/nginx
   2. vi conf/nginx.conf
   ```

详细的安装过程请看 [Nginx安装教程](https://www.runoob.com/linux/nginx-install-setup.html)

## 安装MySQL

1. 官网地址: `https://dev.mysql.com/downloads/mysql/`

2. 选择适合自己的版本下载，此处以`mysql-8.0.34-linux-glibc2.28-x86_64.tar.gz`为例，将下载后的压缩包上传到服务器`/opt/mysql`目录下

3. 使用命令解压

   ```shell
     tar xvf mysql-8.0.25-linux-glibc2.28-x86_64.tar.gz
   ```

4. 将解压后的文件移动到`/usr/local`目录下
   
   ```shell
     mv mysql-8.0.25-linux-glibc2.28-x86_64 /usr/local/mysql
   ```

5. 创建 MySQL 数据存储目录

   ```shell
     mkdir /var/local/mysql/data
   ```

6. 初始化数据库
   
   ```shell
     1. cd /usr/local/mysql
     2. ./bin/mysqld --initialize --basedir=/usr/local/mysql --datadir=/var/local/mysql/data
   ```
   **此处需注意保存生成的密码,之后需用到**
