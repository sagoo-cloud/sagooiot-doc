---
title: 源码编译
sidebar_position: 1
hide_title: true
keywords: [源码编译,交叉编译,依赖安装,配置文件,数据库初始化,程序运行,编译脚本,Go编译,前端编译,部署指南]
description: '详细说明SagooIOT平台的源码编译过程，包括服务端和前端的编译步骤、配置修改和部署说明。'
---

## 服务端源码编译

### 安装依赖

`go mod download` 或 `go mod tidy`

### 修改项目配置文件

将 `manifest/config/config.example.yaml` 这个文件改名为 `config.yaml`，并修改其中的配置项。

请跟据注释进行配置修改，包括服务相关配置，日志相关配置。

### 导入业务数据表
在manifest目录下，有一个`init.sql`文件，将该文件导入到mysql数据库中，创建数据库表。

### 程序运行

`go run main.go`

### 交叉编译

可以使用build.sh进行程序的交叉编译。可选编译参数有linux、windows、mac。

如编译mac版本：
```shell
./build.sh mac
```

如果在使用build.sh脚本进行程序编译时，提示

```
fatal: No names found, cannot describe anything.
./build.sh linux|windows|mac

```
是因为源码没有进行git版本的标签设置。

这个编译脚本支持将git的tag编译到程序中，所以需要创建git的tag。只有创建了tag，编译后的程序才会显示版本号。

创建tag的命令如下：
```
git tag v0.0.1

git push origin v0.0.1
```
注意：v0.0.1是tag的版本号，可以根据实际情况进行修改。

### 执行脚本

编译后生成的可执行文件放在bin目录下，将bin目录下的文件放到目标服务器，执行`./curl.sh start` 运行即可。

```
curl.sh脚本参数：

start|stop|restart|status|tail

```

分别对应 启动、停止、重启、状态、显示动态日志运行信息



### 其它问题

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



## 前端源码编译

### 安装依赖

```shell
yarn install
```

### 修改项目配置文件

默认运行的是本地环境，如果需要修改后端接口地址，请修改`.env`相关的文件。

`.env.development` 是开发环境的配置文件

`.env` 是生产环境的配置文件

### 程序运行

```shell
yarn serve
```

建议使用pakage.json中的scripts命令，进行快速启动。
