---
title: '开发规范'
sidebar_position: 3
hide_title: true
keywords: [iot开发,SagooIoT开发,物模型]
description: '轻量化的物联网系统开发'
---

## 命名

1. 配置文件及json属性的键名命名方式统一使用小驼峰。例如：`userName`、`userAge`。
2. 包名全部小写，多个单词可用下划线。例如：`user_info`。
3. 局部变量首字母小写，使用驼峰命名。名称要见名知义。例如：`userName`、`userAge`。
4. 常量首字母使用大写，使用驼峰命名。例如：`CofnigUserName`、`ConfigUserAge`。


## 接口定义
在api目录中对接口进行定义，入参需要独立设置，不建议直接引用其它自定义包的类型。
与controller中的方法形成一个循环整体。需要与service的方法进行交互的时候，在controller中逐一转换。

## Restful 接口命名

URL使用小写，多个单词使用`-`或者`/`连接。如：`device-info`、`logger/system`。通常情况下应该使用URL来描述资源， 使用HTTP METHOD(`GET 查询`,`POST 新增`,`PUT 修改`,`PATCH 修改不存在则新增`,`DELETE 删除`)来描述对资源的操作。 在一些特殊操作无法使用`HTTP METHOD`来描述操作的时候，使用`_`开头加动词来描述。如: `device/_query`。

## 参数与字典的使用
系统封装了参数管理、字典管理两个模块。在开发过程中，需要使用到参数或者字典的地方，可以直接调用接口获取到对应的值。
所有需要在运行过程中可以动态调整的可配项都要通过参数接口获取到对应的值。
系统中所有涉及到枚举类型的地方，都要采用字典来处理。前端字典的使用请参考[字典的使用](../front/3-dict.md)

## 尽量规避的问题
### 不使用init方法隐式初始化
在项目中，如非必要，不要使用init方法来隐式初始化，这样会导致代码的可读性变差，不利于后期的维护。

### Api接口声明