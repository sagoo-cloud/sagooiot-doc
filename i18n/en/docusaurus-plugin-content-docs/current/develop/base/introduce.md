---
slug: '/develop/base'
title: '程序说明'
sidebar_position: 0
hide_title: true
keywords: [物联网开发,GoFrame开发,Vue3开发,物联网架构,系统开发,技术栈,开发环境,项目结构,物联网平台,SagooIOT]
description: '详细介绍SagooIOT平台的技术架构、开发环境要求、项目结构和技术栈选型，为开发者提供完整的开发指南。'
---

## 关于SagooIOT

SagooIoT 分为社区版、专业版、企业版，社区版为开源版本，专业版、企业版为商业开源版本。社区版提供基础功能，专业版、企业版提供更多的功能和服务。


SagooIOT基于GoFrame，Vue3+Element plus 开发的前后端分离的，企业级物联网平台系统。

## 环境需求

**操作系统**

Linux / macOS /Win

**Go 编译环境**

依赖 `Go1.22+` 编译环境，可前往[官方网站](https://golang.org/dl/) 或 [国内镜像](https://golang.google.cn/dl/) 下载安装。


## 技术选型

| 技术栈                                    | 描述                                         |
|----------------------------------------|--------------------------------------------|
| [golang](https://golang.google.cn/)                                 | 编程语言  依赖 `Go1.22+` 编译环境，                                     |
| [GoFrame](https://goframe.org/display/gf20)                                | 模块化、高性能、企业级的`Go`基础开发框架                     |
| [vue-next-admin](https://lyt-top.gitee.io/vue-next-admin-doc-preview/)                     | 基于vue3.x 、Typescript、vite、Element plus 开发  |
| MySql                                  | 关系型数据库，版本为5.x，可替换为：MariaDB、Percona                |
| [TDengine](https://docs.taosdata.com/) | 高性能、云原生的时序数据库 (Time-Series Database, TSDB) |
| Redis                                  | 用户信息与权限缓存、设备注册中心缓存                         |

## 工程目录

```
/
├── api
├── hack
├── internal
│   ├── cmd
│   ├── consts
│   ├── controller
│   ├── dao
│   ├── logic
│   ├── model
│   |   ├── do
│   │   └── entity
│   └── service
├── manifest
├── resource
├── module
├── network
├── pkg
├── plugins
├── utility
├── go.mod
└── main.go

```

## 目录说明

| 目录/文件名称   | 说明     | 描述                                                       |
| :-------------- |:-------|:---------------------------------------------------------|
| `api`           | 对外接口   | 对外提供服务的输入/输出数据结构定义。考虑到版本管理需要，往往以`api/v1...`存在。           |
| `hack`          | 工具脚本   | 存放项目开发工具、脚本等内容。例如，`CLI`工具的配置，各种`shell/bat`脚本等文件。         |
| `internal`      | 内部逻辑   | 业务逻辑存放目录。通过`Golang internal`特性对外部隐藏可见性。                  |
| ` - cmd`        | 入口指令   | 命令行管理目录。可以管理维护多个命令行。                                     |
| ` - consts`     | 常量定义   | 项目所有常量定义。                                                |
| ` - controller` | 接口处理   | 接收/解析用户输入参数的入口/接口层。                                      |
| ` - dao`        | 数据访问   | 数据访问对象，这是一层抽象对象，用于和底层数据库交互，仅包含最基础的 `CURD` 方法             |
| ` - logic`      | 业务封装   | 业务逻辑封装管理，特定的业务逻辑实现和封装。往往是项目中最复杂的部分。                      |
| ` - model`      | 结构模型   | 数据结构管理模块，管理数据实体对象，以及输入与输出数据结构定义。                         |
| `  - do`        | 领域对象   | 用于`dao`数据操作中业务模型与实例模型转换，由工具维护，用户不能修改。                    |
| `  - entity`    | 数据模型   | 数据模型是模型与数据集合的一对一关系，由工具维护，用户不能修改。                         |
| ` - service`    | 业务接口   | 用于业务模块解耦的接口定义层。具体的接口实现在`logic`中进行注入。                     |
| `manifest`      | 交付清单   | 包含程序编译、部署、运行、配置的文件。常见内容如下：                               |
| ` - config`     | 配置管理   | 配置文件存放目录。                                                |
| ` - docker`     | 镜像文件   | `Docker`镜像相关依赖文件，脚本文件等等。                                 |
| ` - deploy`     | 部署文件   | 部署相关的文件。默认提供了`Kubernetes`集群化部署的`Yaml`模板，通过`kustomize`管理。 |
| `resource`      | 静态资源   | 静态资源文件。这些文件往往可以通过 资源打包/镜像编译 的形式注入到发布文件中。                 |
| `module`      | 独立功能模块 | 一些独立的功能可以放在这个模块。                                         |
| `network`      | 网络处理   | 网络处理模块，包括tcp，udp等                                        |
| `pkg`      | 公共处理   | 系统中常用的功能进行统一的封装。                                         |
| `plugins`      | 插件目录   | 插件编译后所在这个目录下                                             |
| `go.mod`        | 依赖管理   | 使用`Go Module`包管理的依赖描述文件。                                 |
| `main.go`       | 入口文件   | 程序入口文件。                                                  |

## 本地源码运行

修改config下的config.toml文件，并配置相关项

请跟据注释进行配置修改，包括服务相关配置，日志相关

`go run main.go`

## 关于build.sh编译脚本

可以使用build.sh进行程序编译，如果在使用build.sh脚本进行程序编译时，提示

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

## 编译后执行脚本

编译后生成的可执行文件放在bin目录下，将bin目录下的文件放到目标服务器，执行`./curl.sh start` 运行即可。

```
curl.sh脚本参数：

start|stop|restart|status|tail

```

分别对应 启动、停止、重启、状态、显示动态日志运行信息

## 插件编译

如果要使用插件，需要提前将插件进行编译。直接使用plugins下面的编译脚本直接执行就可以。


## 其它问题

**1，如果在macOS下遇到 Warning :`IOMasterPort`：**

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

** 2，如果采用HTTPS方式时SSE不工作，需要如下配置：**

```Nginx
    proxy_set_header Connection '';
    proxy_http_version 1.1;
    chunked_transfer_encoding off; 
```

import DocCardList from '@theme/DocCardList';

<DocCardList />
