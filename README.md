# SagooIOT 说明文档 

采用 VitePress 搭建

在线地址：https://iotdoc.sagoo.cn/

启动代码：npm run dev

打包代码：npm run build

Make方式：make dev / make dist

VitePress 说明文档：https://vitepress.vuejs.org/

## 文档编辑
**1，文档目录的修改：** 修改工程的根目下.viteprees/config.ts 跟据需要内容修改即可。

**2，文档内的图片存放位置：** public/imgs 建议跟据图片所在文档的路径创建相关目录，方便管理。

**3，文档内容编写：** 当前主要文档有三类：guide(用户使用手册)、develop(开发手册)、cases(案例)

## 安装

本项目采用 pnpm 进行包管理，若要使用其它管理方式，请删除 `pnpm-lock.yaml` 并安装依赖

```shell
#pnpm（建议使用nrm切换到淘宝源）
pnpm install

# npm
npm install

# yarn
yarn install

```

## 启动

```shell
#pnpm
pnpm dev

# npm
npm run dev

#yarn
yarn dev

#Makefile
make dev
```

## 编译

```shell
#pnpm
pnpm run build

# npm
npm run build

#yarn
yarn run build

#Makefile
make dist

```


## 鸣谢 GoView https://www.mtruning.club/

