---
title: 'Lua转换'
sidebar_position: 5
hide_title: true
keywords: [规则引擎,规则链,golang,go语言,编排式,热部署,数据集成,IoT,物联网平台,组件化,流程自动化,自动化引擎,应用集成,事件框架]
description: '轻量级、高性能、嵌入式、新一代组件编排规则引擎'
---

## 节点说明

LuaTransform节点是一个强大的Lua脚本转换器，可以使用Lua脚本对消息内容(msg)、元数据(metadata)和消息类型(msgType)进行转换或增强。转换后的消息将被传递给下一个节点处理。该组件还支持加载Lua第三方库，实现加解密、I/O、网络、文件等高级操作。

## 界面说明

### 1. 基本配置
- **节点ID**: 每个节点的唯一标识符
- **名称**: 节点的显示名称，方便识别节点用途
- **调试模式**: 可以打开调试模式，查看数据处理过程

### 2. 脚本编辑
脚本编辑区域提供了Lua代码编辑功能，只需要提供函数体内容。

:::tip 提示
Lua脚本支持Lua 5.1语法规范。允许在脚本中调用Go自定义函数和第三方库模块。使用加解密、I/O、网络、文件等高级操作库，需要通过配置开启：`config.Properties.PutValue(luaEngine.LoadLuaLibs, "true")`。
:::

## 参数说明

### 1. 输入参数
- `msg`: 消息内容
  - 当dataType=JSON时，可以使用msg.field方式访问JSON字段
  - 其他类型时，msg为string类型
- `metadata`: 消息元数据，类型为jsonObject
- `msgType`: 消息类型

### 2. 返回值
函数必须返回三个值：
- msg: 转换后的消息内容
- metadata: 更新后的元数据
- msgType: 消息类型

## 路由说明
- **True**: 执行成功，消息发送到True链路
- **False**: 执行失败，消息发送到False链路
- **Failure**: 执行出错，消息发送到Failure链路

## 脚本示例

### 1. 数据格式转换
```lua
-- 将温度值从摄氏度转换为华氏度 
msg.temperature = msg.temperature * 1.8 + 32
-- 在metadata中添加温度单位标记
metadata.unit = "F"
return msg, metadata, msgType
```

### 2. 数据过滤和增强
```lua
-- 检查温度值是否在正常范围内
if msg.temperature > 30 then
    -- 添加告警标记
    metadata.alert = "high_temperature"
    -- 记录告警时间
    metadata.alert_time = os.time()
end
return msg, metadata, msgType
```

### 3. 使用第三方库处理数据
```lua
-- 引入所需的库
local json = require('json')
local crypto = require('crypto')

-- 对数据进行MD5加密
msg.data_hash = crypto.md5(msg.raw_data)

-- JSON数据处理
local data = json.decode(msg.data)
data.processed = true
msg.data = json.encode(data)

return msg, metadata, msgType
```

### 4. 字符串处理
```lua
-- 引入字符串处理库
local strings = require('strings')

-- 转换字符串格式
msg.device_id = strings.trim(msg.device_id)
msg.location = strings.to_upper(msg.location)

return msg, metadata, msgType
```

## 支持的第三方库

启用第三方库后，可以使用以下功能：
1. 加解密相关
   - base64：编码/解码
   - crypto：计算md5、sha256等哈希值
2. 网络相关
   - http：HTTP客户端和服务器
   - tcp：原生TCP客户端
3. 文件操作
   - filepath：路径操作
   - ioutil：IO工具
4. 数据处理
   - json：JSON处理
   - yaml：YAML处理
   - template：模板引擎
5. 其他工具
   - time：时间处理
   - strings：字符串处理(支持UTF8)
   - log：日志记录
   - storage：数据持久化
