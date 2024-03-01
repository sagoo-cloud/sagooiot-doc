---
sidebar_position: 11
---
# docker部署

 ### 一、服务端本地启动

 1. 将项目clone到本地工作空间, `https://github.com/sagoo-cloud/sagooiot.git`

 2. 使用goland开发工具打开项目并找到goland的setting模块，找到Go Model设置环境代理`https://goproxy.io`.

 3. 使用`go mod tidy`同步项目依赖

 4. 部署本地基础环境
    
    a. 在`manifest/docker-compose`目录，使用`docker-compose up -d`部署
    
    b. 使用`docker ps -a`验证MySQL、Redis、Tdengine、Emqx启动是否成功
 
 5. 找到`manifest/config/config.example.yaml`文件并复制`config.example.yaml`文件在`manifest/config`目录下并命名为:`config.yaml`
 
 6. 在根目录下找到`main.go`文件，并启动`iot-server`服务

 ### 二、前端本地启动

  1. 将项目clone到本地工作空间, `https://github.com/sagoo-cloud/sagooiot-ui.git`.

  2. 在项目根目录下找到`.env.development`文件，修改对应的配置信息，以下是参考内容:

  ```shell
    VITE_SERVER_PROTOCOL = 'http:'
    VITE_SERVER_HOSTNAME = 'localhost:8200'

    # 基础服务路径 通过 nginx 配置 前后端直连就写 / 或者写在nginx上配置的路径 如 /base-api
    VITE_SERVER_URL = ''
    # 基础接口路径
    VITE_API_URL = '/api/v1'
  ```
  3. 使用`yarn`进行项目依赖安装
  
  4. 使用`yarn run dev`启动项目


## 其它问题
  
  1. docker-compose文件中，MySQL、Redis、Tdengine、Emqx配置的都是默认端口号，为防止本地端口冲突，建议修改端口号配置

  2. MySQL在启动过程中，由于会初始化数据，建议等待一段时间或者链接数据库查看数据是否创建完毕，在启动IOT服务
