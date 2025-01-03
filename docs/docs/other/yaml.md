---
title: 'YAML格式语法'
sidebar_position: 0
hide_title: true
keywords: [YAML语法,配置文件,数据序列化,YAML格式,配置管理,数据结构,配置规范,YAML教程,配置示例,格式说明]
description: '详细介绍YAML格式的语法规则，包括基本语法、数据类型、配置示例等内容，帮助用户正确编写YAML配置文件。'
---

# yaml格式语法

## 说明
yaml文件格式是YAML (YAML Aint Markup Language)编写的文件格式，YAML是一种直观的数据序列化格式，可读性强，可被支持YAML库的不同的编程语言程序导入。它是以数据为核心的，比传统的xml方式更加简洁。

## 语法

### 常用数据格式

`语法：key: value`

示例：
```yaml
name: zhangsan
```
注意：value之前有一个空格

### 配置对象或map数据

语法：

```yaml
key:
    key1: value1
    key2: value2
```
或者
```yaml
key: {key1: value1,key2: value2}
```
   示例：
```yaml
person:
   name: zhangsan
   age: 30
   addr: beijing
```
或者
```yaml
person: {name: zhangsan,age: 30,addr: beijing}
```
### 配置List,Set数据

语法：
```yaml
key:
    - value1
    - value2
```
或者
```yaml
key: [value1,value2]
```

示例：

```yaml
city:
    - beijing
    - tianjin
```

或者

```yaml
city: [beijing,tianjin]
```
### 集合中的元素是对象形式

```yaml
student:
- name: zhangsan
  age: 19
  score: 100
- name: lisi
  age: 28
  score: 89
- name: wangwu
  age: 38
  score: 91
```

注意：value1与之间的 - 之间存在一个空格
