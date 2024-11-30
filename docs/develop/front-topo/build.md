---
title: '编译与部署'
sidebar_position: 0
keywords: [图元开发,组态工具,自定义组件,图形组件,SVG组件,图元配置,组件库,可视化开发,图元定制,前端组件]
description: '详细说明SagooIOT平台的安装部署指南'
---

:::tip 提示

SagooIOT平台的组态工程，可以通过以下链接获取：

http:// 付费代码库 /Sagoo-Cloud/sagoo-configuration


:::

## 安装依赖

同步代码到本地后，首先需要安装依赖：

```bash

yarn install

```

## 本地运行
```bash
yarn dev

```

## 编译打包

```bash
yarn build

```

## 部署

将编译后的 `dist` 目录下的文件部署到SagooIoT前端工程的/public/plugin下即可。




