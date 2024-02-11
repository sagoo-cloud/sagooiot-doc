---
sidebar_position: 0
---

# 开发手册

:::tip 介绍
SagooIOT是一个基于golang开发的轻量级的物联网平台。支持跨平台的物联网接入及管理方案，平台实现了物联网开发相关的典型功能，基于这些功能可以快速的搭建起一整套的IOT相关的业务系统。

* 基于全新Go Frame 2.6.x + Vue3+Element Plus开发的全栈前后端分离的管理系统
* 前端采用vue-next-admin 、Vue、Element UI。
:::

:::warning 项目库地址


主库：[https://github.com/sagoo-cloud](https://github.com/orgs/sagoo-cloud/repositories)

码云：[https://gitee.com/sagoo-cloud](https://gitee.com/sagoo-cloud)

:::


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
