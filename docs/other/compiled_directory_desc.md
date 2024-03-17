# 目录层级结构

使用SagooIOT进行编译部署时建议每个应用服务所存放的层级结构，方便统一管理和维护

```
├── SagooIOT
│   ├── iot-server
│   │   └── config
│   │   |    └── config.yaml
│   │   └── curl.sh
│   │   └── plugins
│   │   └── resource
│   │   └── sagooiot
│   |   ├── server
|   │   │   └── SagooMedia
|   |   │   │   └── config.toml
|   |   │   │   └── curl.sh
|   |   │   │   └── public
|   |   │   │   └── SagooMedia
│   ├── iot-ui
|   │   ├── plugin
|   |   │   ├── screen
|   |   │   ├── topo
│   ├── rule-engine
```

| 目录/文件名称   | 说明     | 描述                                                         |
| :-------------- | :------- | :----------------------------------------------------------- |
| `SagooIOT`           |IOT所有应用服务所存放目录 | |
| `iot-server`      | 专业版服务端 |  |
| ` - config`        | 配置文件 | 将config文件中的config.example.yaml模板复制一份，命名为config.yaml，文件中包含的mqtt、mysql、redis、td更改为基础服务的IP、端口号、账号、密码                     |
| ` - curl.sh`        | 启动脚本| 用于启动IOT专业版服务脚本文件                     |
| ` - plugins`     | 插件 | 通知插件，用于设备告警时，触发的通知                                           |
| ` - resource` | 资源配置 | 静态资源文件。这些文件往往可以通过 资源打包/镜像编译 的形式注入到发布文件中。                         |
| ` - sagoo-admin`        | 程序文件 | 专业版程序编译二进制文件 |
| ` - server`      | 其他服务 | 用于IOT与其他对应模块服务所互相访问 |
| ` - SagooMedia`    | 流媒体服务目录|  |
| ` - config.toml`        | 配置文件 | 流媒体服务配置文件信息                  |
| ` - curl.sh`        | 启动脚本| 用于启动流媒体服务脚本文件 |
| `  - public`        | 流媒体前端编译文件| |
| ` - SagooMedia`        | 程序文件 | 流媒体程序编译二进制文件 |
| `  - iot-ui`    | 前端 | IOT专业版前端编译文件 |
| ` - plugin`    | 前端插件 | |
| `- screen`      | 大屏可视化|   |   
| `- topo`      | 组态|   |     
| `rule-engine`           |规则引擎服务 |  |  