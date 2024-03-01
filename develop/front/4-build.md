# 编译与部署

SagooIoT前端工程编译与部署，工程都已经编写好脚本。可以通过`package.json` 文件中`scripts`部分直接运行。推荐使用 `WebStorm` 进行开发。

## 配置说明

前端项目会根据启动命令自动加载相对应的环境配置文件。项目是根据文件名进行加载的。比如启动命令是`npm run serve`，则会加载`.env.development`文件。如果启动命令是`npm run build`，则会加载`.env.production`文件。

* .env：全局默认配置文件，无论什么环境都会加载合并。
* .env.development：开发环境的配置文件
* .env.production：生产环境的配置文件
* .env.golocal：自定义的SagooIOT服务程序下的运行环境的配置文件

:::tip 本地开发配置
如本地开发，可以工程根目录下创建一个 `.env.local` 配置文件
:::

.env.local 文件内容如下：
```yaml
# 本地环境
ENV = 'development'

# websocket配置
VITE_WS_URL = 'ws://127.0.0.1:8199/api/v1/websocket'

# 服务端配置
VITE_SERVER_PROTOCOL = 'http:'
VITE_SERVER_HOSTNAME = '127.0.0.1:8199'
VITE_SERVER_URL = ''
VITE_API_URL = '/api/v1'

```


## 依赖安装

用 yarn 安装依赖

1. 全局安装yarn： npm i yarn -g ,如果是非windows环境需要加 sudo
2. 用yarn在项目中安装依赖
```shell
 yarn i

```

## 程序编译

需要打包发布，执行下面的命令，可查看 `package.json` 文件中`scripts`部分的内容。

```shell
 npm run build

```

:::tip 推荐使用

package.json中的执行脚本进行编译。

:::

## 前端部署

编译后在项目目录下生成dist目录，将dist目录内编译好的文件拷贝到需要前端运行的地方就可以。
