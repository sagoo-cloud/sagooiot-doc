---
title: '图元扩展开发'
sidebar_position: 0
keywords: [图元开发,组态工具,自定义组件,图形组件,SVG组件,图元配置,组件库,可视化开发,图元定制,前端组件]
description: '详细说明SagooIOT平台的图元扩展开发指南，包括图元配置、自定义组件和组件库定制等可视化开发说明。'
---

# 图元扩展

组态工具项目中可以自定义左侧菜单栏中的图元及分组等信息，方便客户根据自己的需求定制自己的组件库。

## 增加单个图元

通过再这个文件中增加配置，实现增加图片图元的功能【下图是 `jpg,png` 的方式】。

```json
{
  "name": "image",
  "icon": "t-icon t-image",
  "id": 111,
  "data": {
    "text": "",
    "width": 100,
    "height": 100,
    "name": "image",
    "image": "https://xxx.xxx/image.jpg"
  }
}
```

也可以增加 `svg` 类型的图元。

```json
{
  "data": {
    "text": "",
    "width": 40,
    "height": 40,
    "name": "svgPath",
    "image": "https://xxx.xxx/image.svg"
  }
}
```

![](../imgs/frontend/WechatIMG3413.jpg)

## 批量增加图元分组

1. 先将图片文件放到 `public/static` 下的文件夹中，然后再 `json` 配置中写好以 `public` 为根路径下的绝对路径。

![](../imgs/frontend/WechatIMG3414.jpg)

2.将文件引入到 `menu.ts` 中进行使用。

![](../imgs/frontend/WechatIMG3417.jpg)
