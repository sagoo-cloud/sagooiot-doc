---
title: '大模型智能体'
hide_title: true
sidebar_position: 1
keywords: [大模型智能体,DBAgent,TransformAgent,智能代理系统,RESTful API,数据转换,SQL查询,自然语言处理,数据格式转换]
description: '介绍SagooIOT平台的大模型智能体，包括DBAgent和TransformAgent，提供智能数据库查询和数据格式转换功能。'
---

# Sagoo Agents

Sagoo Agents 是一个智能代理系统，目前包含两个核心智能体：DBAgent（数据库智能体）和 TransformAgent（数据转换智能体）。这两个智能体都提供了 RESTful API 接口，可以通过 HTTP 请求进行调用。

## 配置说明

系统使用 YAML 格式的配置文件进行配置，主要包含以下部分：

```yaml
# 全局配置
global:
  debug: true
  log_level: "debug"

# 智能体配置
agents:
  dbagent:
    llm:
      provider: "deepseek"  # 可选: "deepseek", "openai", "claude", "gemini", "ollama"
      api_key: "sk-2d89413de4aa477291b9327f8"  # DeepSeek API密钥
      model: "deepseek-chat"  # DeepSeek模型名称
      system_prompt: |
        你是一个专业的数据库专家，请帮我将以下自然语言查询转换为SQL查询语句。
        数据库结构：
        %s
        用户查询：%s
        要求：
        1. 请直接返回SQL语句，不要包含任何解释、分析或其他文字
        2. 不要返回markdown格式，直接返回SQL语句文本
        3. SQL语句要安全、高效，并使用适当的表连接和条件
        4. 返回结果默认限制在100条以内
        5. 确保SQL语句的语法正确且可以直接执行
        示例输出格式：
        SELECT column1, column2 FROM table WHERE condition LIMIT 100;
    database:
      host: "127.0.0.1"
      port: 3307
      username: "root"
      password: "DbyTYGu3s4WuAF4TTq7"
      database: "sagooiot2024"
      max_idle_conns: 10
      max_open_conns: 100
      max_lifetime: 3600
      charset: "utf8mb4"
      parse_time: true
      loc: "Local"

  transformagent:
    llm:
      provider: "deepseek"  # 可选: "deepseek", "openai", "claude", "gemini", "ollama"
      api_key: "sk-2d89413de4aa477291b9327f8"  # DeepSeek API密钥
      model: "deepseek-chat"  # DeepSeek模型名称
      system_prompt: |
        你是一个专业的数据转换专家，你的任务是将输入的JSON数据按照用户的要求转换成目标格式。
        请遵循以下规则：
        1. 只返回转换后的数据，不要包含任何解释或说明
        2. 保持数据的完整性和正确性
        3. 确保输出格式符合用户的要求
        4. 如果转换过程中遇到问题，返回错误信息
        5. 支持多种输出格式，包括但不限于：JSON、XML、YAML、CSV等

```

## DBAgent 使用指南

### 功能介绍

DBAgent 是一个智能数据库代理，能够将自然语言查询转换为 SQL 并执行，让您可以用自然语言与数据库进行交互。

### API 接口

#### 执行查询

- **接口**: `/api/v1/dbagent/query`
- **方法**: POST
- **请求格式**:

```json
{
    "query": "查询最近10条用户记录"
}
```

- **响应格式**:

```json
{
    "code": 200,
    "message": "success",
    "data": [
        {
            "id": 1,
            "name": "张三",
            "created_at": "2025-01-11 10:00:00"
        }
        // ...更多记录
    ]
}
```

### 使用示例

```bash
# 执行自然语言查询
curl -X POST http://localhost:8080/api/v1/dbagent/query \
  -H "Content-Type: application/json" \
  -d '{
    "query": "查询最近注册的10个用户的姓名和注册时间"
  }'
```

## TransformAgent 使用指南

### 功能介绍

TransformAgent 是一个数据转换智能体，能够根据指令将数据从一种格式转换为另一种格式，支持多种数据格式之间的转换。

### API 接口

#### 数据转换

- **接口**: `/api/v1/transformagent/transform`
- **方法**: POST
- **请求格式**:

```json
{
    "data": "要转换的数据",
    "instructions": "转换说明"
}
```

- **响应格式**:

```json
{
    "code": 200,
    "message": "success",
    "data": "转换后的数据"
}
```

### 使用示例

```bash
# JSON 转 XML
curl -X POST http://localhost:8080/api/v1/transformagent/transform \
  -H "Content-Type: application/json" \
  -d '{
    "data": "{\"name\":\"张三\",\"age\":25}",
    "instructions": "将JSON数据转换为XML格式"
  }'
```

## 错误处理

系统使用统一的错误响应格式：

```json
{
    "code": 400,    // 错误码
    "message": "错误提示",
    "error": "详细错误信息"
}
```

常见错误码：

- 400：参数错误
- 404：资源不存在
- 500：服务器内部错误

## 最佳实践

1. **DBAgent 使用建议**：
    - 查询语句尽量具体明确
    - 指定需要查询的具体字段
    - 适当使用限制条件（如时间范围、数量限制等）
2. **TransformAgent 使用建议**：
    - 转换说明要清晰具体
    - 指定源数据格式和目标格式
    - 对于复杂的数据结构，建议提供示例
3. **性能优化建议**：
    - 避免大量数据的查询和转换
    - 合理使用分页
    - 适当的错误重试机制

## 注意事项

1. 安全性：
    - API Key 等敏感信息要妥善保管
    - 建议使用 HTTPS
    - 根据需要添加适当的访问控制
2. 稳定性：
    - 程序会自动进行优雅关闭
    - 有完善的错误处理机制
    - 支持自动重连和故障恢复
3. 维护：
    - 定期检查日志
    - 监控系统资源使用情况
    - 及时更新配置和依赖

如果遇到问题或需要帮助，请查看日志或联系技术支持。
