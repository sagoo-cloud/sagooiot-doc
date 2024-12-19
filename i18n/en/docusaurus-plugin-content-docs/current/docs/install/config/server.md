---
title: "web服务配置"
sidebar_position: 2
hide_title: true
---

## 配置参考

在配置文件中找到`server:`根据实际情况修改配置。

```yaml
# http服务配置
server:
  serverAgent: "SagooIOT Server"        # 服务端Agent信息。
  address: ":8199" # WEB服务端口
  dumpRouterMap: false # 是否打印路由表
  routeOverWrite: true # 是否允许路由覆盖
  openapiPath: "/api.json" # OpenAPI路径
  swaggerPath: "/swagger" # Swagger路径
  NameToUriType: 3 # 路由转换类型，1:驼峰转下划线，2:下划线转驼峰，3:不转换
  maxHeaderBytes: "20KB" # 最大请求头大小
  clientMaxBodySize: "50MB" # 最大请求体大小
  https: false # 是否启用https
  httpsCertFile: "" # https证书文件路径
  httpsKeyFile: "" # https证书key文件路径
  # 静态服务配置
  indexFiles: [ "index.html"]   # 自动首页静态文件检索。默认为["index.html", "index.htm"]
  indexFolder: false            # 当访问静态文件目录时，是否展示目录下的文件列表。默认关闭，那么请求将返回403
  serverRoot: "resource/public" # 静态文件服务的目录根路径，配置时自动开启静态文件服务。默认关闭
  searchPaths: [ "/resource/public/"] # 提供静态文件服务时额外的文件搜索路径，当根路径找不到时则按照顺序在搜索目录查找。默认关闭
  fileServerEnabled: true # 是否开启静态文件服务。默认为false
  adminPprofPort: "58089" # web-admin pprof端口
#  allowedDomains: #允许跨域访问的域名列表
#    - https://example.com
#    - https://www.example.com

```

## 配置说明

详细的web服务配置参考，可以参考[goframe WEB服务配置](https://goframe.org/docs/web/server-config-file-template)的配置说明。
