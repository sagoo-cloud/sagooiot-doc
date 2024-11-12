# 编译与部署

SagooIoT 前端工程编译与部署，工程都已经编写好脚本。可以通过 `package.json` 文件中 `scripts` 部分直接运行。推荐使用 `Visual Studio Code` 进行开发。

## 配置说明

前端项目会根据启动命令自动加载相对应的环境配置文件。项目是根据文件名进行加载的。比如启动命令是`npm run serve`，则会加载`.env.development`文件。如果启动命令是`npm run build`，则会加载`.env.production`文件。

- **.env**: 默认环境配置，不可修改，会导致使用异常。

- **.env.development**: 开发环境配置，启动 `npm run dev` 会启动开发环境，配置为链接本地的 `go` 环境的配置，可按需更改。

- **.env.nginx**: 线上 `nignx` 部署情况下的演示配置，可以复制到 `.env.development` 或 `.env.development.local` 中进行按需修改使用。

- **.env.golocal**: 如需将打包后的静态文件放入到 `go` 服务中的 `public` 文件夹下使用，则需使用 `npm run build:golocal` 命令打包。

:::tip 本地开发配置
如本地开发，可以工程根目录下创建一个 `.env.development.local` 配置文件, 会覆盖 `.env.development` 的配置，避免自己修改配置文件提交之后影响其他同事的开发配置。
:::

**.env.development.local** 文件内容如下（本地链接线上环境）：

```yaml
# NGINX 转发路径, 如果不使用nginx 则配置为空 ''
VITE_NGINX_PROXY = '/base-api'

# 服务端地址 空则使用打开页面的网址和端口作为服务地址，及前后端不分离
# 如果前端和服务端的地址不一样则必须配置服务端地址，必须是 http 或 https 开头 如 http://127.0.0.1:8200
VITE_SERVER_ORIGIN = 'https://zhgy.sagoo.cn'
```

**.env.development.local** 文件内容如下（本地链接本地 go 环境）：

```yaml
# 链接本地服务 不需要配置 nginx 代理
VITE_NGINX_PROXY = ''

# SagooIoT服务地址
VITE_SERVER_ORIGIN = 'http://127.0.0.1:8199'

# 规则引擎服务地址
VITE_RULE_SERVER_URL = 'http://127.0.0.1:9090'

# 流媒体服务地址
VITE_MEDIA_SERVER_URL = 'http://127.0.0.1:8080'
```

**config.js**

本地运行或打包都会根据 `env` 文件的配置，提前自动生成 `config.js` 配置文件，运行环境会在 `public` 目录下，打包之后会在生成的 `sagoo-iot` 目录下。可以通过手动修改这个 `config.js` 文件来修改前端运行时的服务端请求地址。通过修改配置来适应不同环境来避免调试时频繁打包。

```javascript
window.allEnv = {
  topo: {
    server: "/base-api/api/v1",
    imgServer: "/base-api",
  },
  screen: {
    server: "/base-api/api/v1",
    imgServer: "/base-api",
  },
  rule: {
    server: "/rule-api",
    iotServer: "/base-api/api/v1",
  },
  media: "/media",
}
```

## 依赖安装

用 yarn 安装依赖

1. 设置淘宝源(提升依赖安装速度)： `npm config set registry https://registry.npmmirror.com`
2. 全局安装 yarn： `npm i yarn -g` ，如果是非 windows 环境需要加 sudo
3. 用 yarn 在项目中安装依赖: `yarn i`

## 程序编译

需要打包发布，执行下面的命令，可查看 `package.json` 文件中`scripts`部分的内容。

```yaml
 npm run build
 # 下面是打包放到 go 下使用
 npm run build:golocal
```

:::tip 推荐使用
`package.json`中的执行脚本进行编译。
:::

## 前端部署

编译后在项目目录下生成 sagoo-iot 目录，将 sagoo-iot 目录拷贝到需要前端运行的地方就可以。