---
title: 'JS转换'
sidebar_position: 1
hide_title: true
keywords: [规则引擎,规则链,golang,go语言,编排式,热部署,数据集成,IoT,物联网平台,组件化,流程自动化,自动化引擎,应用集成,事件框架]
description: '轻量级、高性能、嵌入式、新一代组件编排规则引擎'
---


## 节点说明

JavaScript 转换节点（JsTransform）是一个用于数据转换处理的节点，它允许您使用 JavaScript 脚本来处理和转换消息数据。

## 界面说明

### 1. 基本配置

- **节点ID**: 每个节点的唯一标识符（示例中为 "node_8"）
- **名称**: 节点的显示名称，方便识别节点用途
- **调试模式**: 可以打开调试模式，查看数据处理过程

### 2. 脚本编辑

脚本编辑区域提供了 JavaScript 代码编辑功能，默认提供了 `Transform` 函数模板：

```
function Transform(msg, metadata, msgType) {
    return {'msg':msg,'metadata':metadata,'msgType':msgType};
}
```
:::tip 提示
JavaScript脚本支持ECMAScript 5.1(+) 语法规范和部分ES6规范，如：async/await/Promise/let。允许在脚本中调用Go自定义函数，请参考[udf](https://rulego.cc/pages/d59341/#udf) 。
:::


## 参数说明

### 1. 输入参数

- ```
  msg
  ```

  : 消息内容

    - 可以是字符串、JSON 字符串或其他数据类型

- ```
  metadata
  ```

  : 消息元数据

    - 包含消息的附加信息
    - 可以添加或修改元数据字段

- ```
  msgType
  ```

  : 消息类型

    - 定义消息的处理类型
    - 可以根据需要修改

### 2. 返回值

必须返回包含以下字段的对象：

```
{
    'msg': msg,        // 处理后的消息
    'metadata': metadata,  // 更新后的元数据
    'msgType': msgType    // 消息类型
}
```

## 使用示例

### 1. 基本数据传递

```
function Transform(msg, metadata, msgType) {
    // 直接返回原始数据
    return {'msg':msg,'metadata':metadata,'msgType':msgType};
}
```

### 2. JSON 数据处理

```

function Transform(msg, metadata, msgType) {
    // 解析 JSON 字符串
    let data = JSON.parse(msg);
    
    // 添加新字段
    data.processTime = new Date().toISOString();
    
    // 返回处理后的数据
    return {
        'msg': JSON.stringify(data),
        'metadata': metadata,
        'msgType': msgType
    };
}
```

### 3. 添加元数据

```

function Transform(msg, metadata, msgType) {
    // 添加处理时间到元数据
    metadata['processTime'] = new Date().toISOString();
    
    // 添加自定义标签
    metadata['tag'] = 'processed';
    
    return {'msg':msg,'metadata':metadata,'msgType':msgType};
}
```

### 4. 修改消息类型

```
function Transform(msg, metadata, msgType) {
    // 根据条件修改消息类型
    if (msg.includes('error')) {
        msgType = 'ERROR';
    } else {
        msgType = 'SUCCESS';
    }
    
    return {'msg':msg,'metadata':metadata,'msgType':msgType};
}
```

## 注意事项

1. **返回值格式**

    - 必须返回包含 msg、metadata、msgType 的对象
    - 返回格式错误会导致处理失败

2. **错误处理**

    - 建议使用 try-catch 处理可能的错误

   ```
   Code
   CopyInsert
   
   function Transform(msg, metadata, msgType) {
       try {
           // 处理逻辑
           return {'msg':msg,'metadata':metadata,'msgType':msgType};
       } catch (e) {
           metadata['error'] = e.message;
           return {'msg':msg,'metadata':metadata,'msgType':'ERROR'};
       }
   }
   ```

3. **性能考虑**

    - 避免复杂的循环操作
    - 减少不必要的数据转换
    - 注意内存使用

4. **调试建议**

    - 使用调试模式查看数据流转
    - 通过元数据记录关键信息
    - 分步验证数据处理结果

## 常见问题

1. **返回值错误**
    - 问题：处理失败，提示返回格式错误
    - 解决：确保返回对象包含所有必需字段
2. **数据解析错误**
    - 问题：JSON.parse 失败
    - 解决：先验证数据格式，使用 try-catch 处理
3. **性能问题**
    - 问题：处理耗时过长
    - 解决：优化处理逻辑，避免复杂运算

通过这个节点，您可以灵活地处理各种数据转换需求，实现数据的清洗、转换和增强功能。
