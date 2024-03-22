---
slug: sagooiot-updatav1tov2
title: SagooIoT V1.x到V2.x升级说明
authors: [microrain]
tags: [sagooiot,版本升级]
---

专业版或是企业版用户注意阅读这篇文章，这篇文章主要是针对V1.x版本升级到V2.x版本的更新说明。V2.x版本对数据库字段有所改动，所以需要注意以下内容。


## 安装说明

### 所需服务
    * 以下所有代码库`强烈建议在本机电脑上进行拉取。不建议在服务器中进行拉取。
    * 拉取所有代码库后再对应的本地项目中进行编译后，放到对应的服务器目录中的内容需为本地编译好的文件。
    * 注：所有服务都需要本地安装对应语言的依赖。比如拉取后端仓库代码后需配置`https://goproxy.io`然后在项目根目录执行`go mod tidy`拉取依赖。拉取前端仓库代码后需在项目根目录执行`yarn install 或 npm install`

#### 后端服务
1. 拉取仓库代码`http://git.mydig.net/Sagoo-Cloud/sagooiot-professional.git` 对应分支`main`。
2. 编译后端服务`./build.sh linux|windows|mac` 后面跟编译类型，如`linux`、`windows`、`mac`。
    * 注：如是V1版本升级成V2版本。数据库字段有所改动。需查看`./tools/update/readme.md`文件。
    * 注：对应`./manifest/sql/init.sql`文件中是否有新填默认表字段。
    * 注：如果不是通过V1升级到V2版本，只需把`./manifest/sql/init.sql`文件导入到数据库中就可以。
3. 编译后检查根目录下是否有`build`目录，有则说明编译成功。
4. `bin`目录下内容是所需部署在服务器的内容。
5. 编译好的内容`建议放在服务器/opt/sagoo/iot-server`目录下。
6. 请先查看编译好的目录中的配置文件，是否为所需配置，如不是，需修改配置文件。修改`config/config.yaml`文件内容为实际使用的配置。
7. 以上步骤完成后，启动服务`./curl.sh start`。

### 前端服务
1. 拉取仓库代码`http://git.mydig.net/Sagoo-Cloud/sagoo-admin-ui.git` 对应分支`professional2`。
2. 编辑前端服务`vite build`。
3. `dist`目录下内容是所需部署在服务器的内容。
4. 编译后检查根目录下是否有`dist`目录，有则说明编译成功。
5. 编译好的内容`建议放在服务器/opt/sagoo/iot-ui`目录下。

### 组态服务
1. 拉取仓库代码`http://git.mydig.net/Sagoo-Cloud/sagoo-configuration.git` 对应分支`v2`。
2. 编译组态服务`npm run build`。
3. `dist`目录下内容是所需部署在服务器的内容。
4. 编译后检查根目录下是否有`dist`目录，有则说明编译成功。
5. 编译好的内容需放在前端工程根目录下`前端工程/plugin/topo`目录下。（如已有plugin目录则忽略）。

### 大屏服务
1. 拉取仓库代码`http://git.mydig.net/Sagoo-Cloud/big-screen-editor.git` 对应分支`master`。
2. 编译组态服务`npm run build`。
3. `dist`目录下内容是所需部署在服务器的内容。
4. 编译后检查根目录下是否有`dist`目录，有则说明编译成功。
5. 编译好的内容需放在前端工程根目录下`前端工程/plugin/screen`目录下。（如已有plugin目录则忽略）。

### 流媒体服务
1. 拉取仓库代码`http://git.mydig.net/Sagoo-Cloud/sagoo-media.git` 对应分支`main`。
2. 编译后端服务`./build.sh linux|windows|mac` 后面跟编译类型，如`linux`、`windows`、`mac`。
3. `bin`目录下内容是所需部署在服务器的内容。
4. 编译后检查根目录下是否有`bin`目录，有则说明编译成功。
5. 编译好的内容需放在后端工程根目录下`后端工程/server/SagooMedia`目录下。（如已有server目录则忽略）。

### 规则引擎服务
    * 注：以下是在`centos`服务器中实现规则引擎安装。
    * 注：因服务器操作系统不同或个人电脑本地环境不同，安装nodejs都会出现不一样的问题。如安装时出现问题需自行找到解决办法。
1. 拉取仓库代码`http://git.mydig.net/Sagoo-Cloud/rule-engine.git` 对应分支`main`。
2. 把项目直接打成压缩包格式，放到服务器`/opt/sagoo/rule-engine`下。
3. 规则引擎项目根目录下`config.js`中`SERVER_PORT`是IOT服务的端口，因为要访问IOT服务，进行token验证，实现免登录，如果端口不一致需要修改`SERVER_PORT`对应值。
4. 查看是否为最新版本`yum list nodejs`（如是最新版本可跳过第5步）。
5. 如果不是，通过下面代码增加下载版本源信息`curl --silent --location https://rpm.nodesource.com/setup_18.x | sudo bash`。
6. 建议先切换源信息在进行安装。`npm config set registry https://registry.npm.taobao.org/`
    * 因默认是国外npm源信息，下载速度较慢。切换到国内npm源信息后，再进行安装。
7. 安装nodejs`yum install nodejs`。
8. 全局安装pm2`sudo npm i pm2 -g`。
9. 在`rule-engine`目录下安装包依赖`npm install`。
10. 启动项目项目`pm2 start packages/node_modules/node-red/red.js --name rule-engine:2881`。
11. 可以通过以下命令查看rule-engine项目运行情况`pm2 show rule-engine:2881`。

### docker一键部署
      * 注：需要安装docker和docker-compose。
      * 注：如发现部署后出现问题建议先把之前步骤中的前、后端编译内容放到对应的docker文件夹下。
      * 注：前端目录`nginx/html/iot-ui`替换对应前端服务编译后的文件内容。后端目录`iot-professional`只需替换后端编译后的二进制文件`sagooiot`。
1. 拉取仓库代码`http://git.mydig.net/Sagoo-Cloud/sagoo-docker-compose.git` 对应分支`master`。
2. 因rule-engine还需手动编译。需确认是否安装nodejs和全局pm2。如未安装，请查看上方规则引擎服务安装步骤。
3. 如已安装nodejs、pm2后进入`rule-engine/rule-engine`目录下，`npm install`安装依赖。
4. 回到`sagoo-docker-compose`目录下执行`docker-compose up -d`启动容器。
5. 停止和清理容器`docker-compose down`。


## 以下是所有项目所需仓库和拉取分支说明

      * 注：不要拉错仓库，也不要拉错分支。如需更新分支代码请联系企业微信工作人员。

| 服务名称     | 前端/后端 | 语言类型   | 仓库地址 | 分支            | 
|----------|----|--------|-----|---------------|
| IOT主程序后端服务 | 后端 | GO     | http://git.mydig.net/Sagoo-Cloud/sagooiot-professional.git | main          |
| IOT主程序前端 | 前端 | VUE    | http://git.mydig.net/Sagoo-Cloud/sagoo-admin-ui.git | professional2 |
| 组态 | 前端 | VUE    | http://git.mydig.net/Sagoo-Cloud/sagoo-configuration.git | v2            |
| 大屏 | 前端 | VUE    | http://git.mydig.net/Sagoo-Cloud/big-screen-editor.git | master        |
| 流媒体前端 | 前端 | VUE    | http://git.mydig.net/Sagoo-Cloud/sagoo-media-ui.git | master        |
| 流媒体服务 | 后端 | GO     | http://git.mydig.net/Sagoo-Cloud/sagoo-media.git | main          |
| 规则引擎服务 | 前端 | nodejs | http://git.mydig.net/Sagoo-Cloud/rule-engine.git | main          |
| docker编排，包含所有服务组件(一键部署) |    |  | http://git.mydig.net/Sagoo-Cloud/sagoo-docker-compose.git | master        |

