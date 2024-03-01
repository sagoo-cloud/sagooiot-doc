---
sidebar_position: 0
---
# 开发环境

## 基础环境：

操作系统：MAC、Linux、Windows

中间件：Redis、Nginx

业务数据库：Mysql5.x / Postgresql

时序数据库：TDengine

## 开发环境

|         | SagooIoT V1.x 版本 | SagooIoT V2.x版本                |
| ------- | ------------------ | -------------------------------- |
| GO      | v1.6.0 - v1.20.8   | v1.21.5 以上，可以使用最新版的go |
| GoFrame | v2.2.0             | v2.6.x 最新版                    |


:::tip 提示
开发过程中注意GoFrame的版本，不同版本的CLI工具可能会有不同的命令
:::

推荐使用GoLand开发工具开发，方便调试和代码管理。

推荐安装go多版本控制，方便不同的go版本之间的切换使用 https://github.com/voidint/g/blob/master/README_CN.md

需要在go.mod中引用

```go
require (
    github.com/gogf/gf/v2 v2.6.1
)
```

其它[参考GoFrame的开发环境配置](https://goframe.org/pages/viewpage.action?pageId=1114389)


## 后台服务API


[服务端API文档](https://console-docs.apipost.cn/preview/d393eb385b7dd7bd/48d460f580a0997b)

## 代码自动化工具

### 生成数据库操作 DAO

用命令行自动生成数据库操作的DAO层代码

1，配置 `hack/config.toml` 文件

tables 为表名，可以配置多个表，用英文逗号分隔

2，在控制台执行命令 `gf gen dao`

### 生成业务代码
详细见这儿里【[代码生成](../gencode/gen.md)】

### 自动规范生成Service

编辑API、Controller、Logic后，执行命令 `gf gen service`，自动生成Service层代码

参见GoFrame框架的说明： https://goframe.org/pages/viewpage.action?pageId=49770772





