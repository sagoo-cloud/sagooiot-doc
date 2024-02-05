# 编译与部署


## 配置文件说明

前端项目会根据启动命令自动加载相对应的环境配置文件。项目是根据文件名进行加载的。比如启动命令是`npm run serve`，则会加载`.env.development`文件。如果启动命令是`npm run build`，则会加载`.env.production`文件。

* .env：全局默认配置文件，无论什么环境都会加载合并。
* .env.development：开发环境的配置文件
* .env.production：生产环境的配置文件
* .env.local：本地环境的配置文件
* .env.golocal：自定义的SagooIOT服务程序下的运行环境的配置文件

## 程序编译

需要打包发布，执行下面的命令

```shell
npm run build

```

:::tip 推荐使用
package.json中的执行脚本进行编译。
:::

## 前端部署

编译后在项目目录下生成dist目录，将dist目录内编译好的文件拷贝到需要前端运行的地方就可以。
