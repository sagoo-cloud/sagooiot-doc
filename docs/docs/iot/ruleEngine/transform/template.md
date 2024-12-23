---
title: '模板转换'
sidebar_position: 5
hide_title: true
keywords: [规则引擎,规则链,golang,go语言,编排式,热部署,数据集成,IoT,物联网平台,组件化,流程自动化,自动化引擎,应用集成,事件框架]
description: '轻量级、高性能、嵌入式、新一代组件编排规则引擎'
---


## 节点说明

模板转换节点基于Go语言的`text/template`引擎，用于将消息内容转换为指定格式。适用于消息格式转换、内容模板化、数据适配等场景。

## 界面配置说明

### 1. 基本设置

- **节点ID**: 节点的唯一标识符（示例中为 "node_8"）
- **名称**: 节点的显示名称
- **调试模式**: 可开启调试模式查看数据处理过程

### 2. 模板内容配置

- **直接输入**: 在编辑框中直接输入模板内容
- **文件引用**: 使用`file:`前缀指定模板文件路径，如：`file:/templates/message.tpl`

## 模板变量说明

### 1. 基础变量

```


.id        - 消息唯一标识
.ts        - 消息时间戳（毫秒）
.type      - 消息类型
.msgType   - 消息类型
.data      - 原始消息内容
.dataType  - 数据类型
```

### 2. 复合对象

```


.msg      - 消息体对象（JSON格式可用.msg.field访问）
.metadata - 元数据对象
```

## 使用场景示例

### 1. 设备数据格式化

```

{
  "deviceInfo": {
    "id": "{{ .id }}",
    "timestamp": "{{ .ts }}",
    "readings": {
      "temperature": "{{ .msg.temperature }}°C",
      "status": "{{ if gt .msg.temperature 30 }}警告{{ else }}正常{{ end }}"
    }
  }
}
```

### 2. 告警消息模板

```


{
  "alert": {
    "time": "{{ .ts }}",
    "device": "{{ .metadata.deviceId }}",
    "level": "{{ if gt .msg.errorCount 5 }}严重{{ else }}一般{{ end }}",
    "message": "设备{{ .metadata.deviceId }}出现{{ .msg.errorCount }}次错误"
  }
}
```

### 3. 数据聚合报告

```


{
  "report": {
    "title": "设备状态报告",
    "time": "{{ .ts }}",
    "devices": [
      {{ range .msg.devices }}
      {
        "name": "{{ .name }}",
        "status": "{{ .status }}",
        "lastUpdate": "{{ .updateTime }}"
      }{{ end }}
    ]
  }
}
```

## 高级功能

### 1. 条件处理

```


{{ if .msg.temperature > 30 }}
  "status": "高温警告"
{{ else if .msg.temperature < 10 }}
  "status": "低温警告"
{{ else }}
  "status": "温度正常"
{{ end }}
```

### 2. 循环处理

```

"tags": [
  {{ range $index, $tag := .metadata.tags }}
    {{ if $index }},{{ end }}
    "{{ $tag }}"
  {{ end }}
]
```

### 3. 格式化函数

```

"formattedValue": "{{ printf "%.2f" .msg.value }}",
"upperName": "{{ .msg.name | upper }}",
"processedContent": "{{ .msg.content | replace "old" "new" }}"
```

## 最佳实践

1. **模板设计建议**
    - 保持模板结构清晰
    - 适当使用换行和缩进
    - 注意JSON格式的正确性
2. **性能优化**
    - 避免过于复杂的模板逻辑
    - 合理使用条件和循环
    - 控制模板大小
3. **错误处理**
    - 处理可能的空值情况
    - 使用默认值防止错误
    - 验证输出格式的正确性

## 常见问题

1. **模板语法错误**
    - 检查变量名是否正确
    - 确认条件语句语法
    - 验证JSON格式是否完整
2. **数据访问问题**
    - 确认数据字段存在
    - 检查数据类型是否匹配
    - 处理可能的空值
3. **格式化问题**
    - 使用合适的格式化函数
    - 注意数值精度控制
    - 处理特殊字符转义

## 调试建议

1. **开启调试模式**
    - 查看模板渲染结果
    - 检查变量值是否正确
    - 定位语法错误位置
2. **分步调试**
    - 先测试简单模板
    - 逐步添加复杂逻辑
    - 验证每步输出结果

通过模板转换节点，您可以灵活地将消息转换为所需的格式，实现数据的标准化输出和格式转换。更多模板语法可以参考 [Go template文档](https://golang.org/pkg/text/template/)。
