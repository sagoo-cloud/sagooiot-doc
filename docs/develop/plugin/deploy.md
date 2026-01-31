---
sidebar_position: 20
title: '插件部署'
keywords: [json,zip,plugin,部署,安装,上传,启用,禁用,卸载]
description: '详细说明SagooIOT平台的插件部署方法，包括插件打包、上传、启用、禁用和卸载等操作指南。'
---

## 插件打包
插件打包为zip格式，打包时需要包含以下内容：
1. 插件主程序文件（编译后的二进制文件）
2. 插件配置文件（info.json）
3. 其他依赖文件（如需要的库文件等）

### info.json 示例
```json
{
  "types": "notice", 
  "handleType": "mail",
  "name": "mail",
  "title": "邮件通知插件",
  "description": "用于发送邮件通知消息的插件,支持SMTP协议",
  "version": "1.0.0",
  "author": "SagooIOT",
  "icon": "icon-mail",
  "link": "https://github.com/sagoo-cloud/sagooiot-plugin-notice",
  "command": "./notice-mail",
  "args": [],
  "frontend": {
    "ui": false,
    "url": "",
    "configuration": true
  }
}
```

## 插件上传
插件上传到SagooIOT平台，进入平台管理后台，导航到“插件管理”页面，点击“上传插件”按钮，选择打包好的zip文件进行上传。

## 插件启用
插件上传成功后，在插件列表页面找到插件，点击“启用”按钮，插件启用成功。



