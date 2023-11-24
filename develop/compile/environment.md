# 开发环境

## 基础环境：

操作系统：MAC、Linux、Windows

中间件：Redis、Nginx

业务数据库：Mysql5.x / Postgresql

时序数据库：TDengine

## 开发环境

需要Go1.16以上版本

**推荐使用Go1.20.8**

注意GO的版本最高使用到Go1.20.8，不要使用Go1.20.8以上版本，否则会出现编译错误。

GoFrame V2.2.0
GoFrame CLI Tool v2.2.0
详见 https://goframe.org


（推荐使用GoLand开发工具开发）

需要在go.mod中引用

```go
require (
    github.com/gogf/gf/v2 v2.2.0
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
详细见这儿里【[代码生成](/develop/gencode/gen.md)】

### 自动规范生成Service

编辑API、Controller、Logic后，执行命令 `gf gen service`，自动生成Service层代码

参见GoFrame框架的说明： https://goframe.org/pages/viewpage.action?pageId=49770772





