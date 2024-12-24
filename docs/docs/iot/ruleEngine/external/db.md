---
title: '数据库客户端'
sidebar_position: 1
hide_title: true
keywords: [规则引擎,数据库,SQL,MySQL,PostgreSQL]
description: '详细介绍SagooIOT平台规则引擎中数据库客户端节点的功能和使用方法，包括数据库连接配置、SQL操作、变量替换等内容，帮助用户实现数据库操作功能。'
---


数据库客户端节点是一个用于执行SQL操作的组件，支持多种数据库类型，可以执行查询、更新、插入和删除等操作。该组件基于Go标准库的database/sql接口实现，支持任何实现了该接口的第三方数据库驱动。

## 基本信息

- **组件类型**: `dbClient`
- **功能**: 执行SQL操作
- **支持数据库**: MySQL、PostgreSQL等多种数据库

## 配置说明

### 1. 基本配置
| 字段 | 类型 | 必填 | 说明 | 默认值 |
|------|------|------|------|--------|
| driverName | string | 是 | 数据库驱动名称 | mysql |
| dsn | string | 是 | 数据库连接字符串 | - |
| poolSize | int | 否 | 连接池大小 | - |
| sql | string | 是 | SQL语句 | - |
| params | array | 否 | SQL参数列表 | - |
| getOne | bool | 否 | 是否只返回一条记录 | false |

### 2. 连接字符串格式
不同数据库的DSN格式：

**MySQL格式**:
```
username:password@tcp(host:port)/database
```

**PostgreSQL格式**:
```
postgres://username:password@host:port/database?sslmode=disable
```

## 功能特性

### 1. SQL操作支持
- **查询(SELECT)**
- **更新(UPDATE)**
- **插入(INSERT)**
- **删除(DELETE)**

### 2. 变量支持
SQL语句和参数支持使用变量：
- `${metadata.key}`: 使用元数据中的值
- `${msg.key}`: 使用消息中的值

### 3. 连接池管理
- 支持连接池配置
- 自动管理连接生命周期
- 支持连接复用

## 使用示例

### 1. 基础查询配置
```json
{
  "id": "node1",
  "type": "dbClient",
  "name": "查询数据",
  "configuration": {
    "driverName": "mysql",
    "dsn": "root:root@tcp(127.0.0.1:3306)/test",
    "sql": "SELECT * FROM users WHERE age > ?",
    "params": [18]
  }
}
```

### 2. 带变量的更新操作
```json
{
  "id": "node2",
  "type": "dbClient",
  "name": "更新数据",
  "configuration": {
    "driverName": "mysql",
    "dsn": "root:root@tcp(127.0.0.1:3306)/test",
    "sql": "UPDATE users SET status = ? WHERE id = ${msg.userId}",
    "params": ["active"]
  }
}
```

### 3. 插入操作
```json
{
  "id": "node3",
  "type": "dbClient",
  "name": "插入数据",
  "configuration": {
    "driverName": "mysql",
    "dsn": "root:root@tcp(127.0.0.1:3306)/test",
    "sql": "INSERT INTO logs (device_id, message) VALUES (?, ?)",
    "params": ["${metadata.deviceId}", "${msg.content}"]
  }
}
```

## 执行结果

### 1. 查询操作
- 结果保存在`msg.Data`中
- `getOne=true`时返回单个对象
- `getOne=false`时返回数组

### 2. 更新操作
结果保存在`msg.Metadata`中：
- `rowsAffected`: 影响的行数
- 原始`msg.Data`保持不变

### 3. 插入操作
结果保存在`msg.Metadata`中：
- `rowsAffected`: 影响的行数
- `lastInsertId`: 最后插入的ID（如果有）
- 原始`msg.Data`保持不变

### 4. 删除操作
结果保存在`msg.Metadata`中：
- `rowsAffected`: 影响的行数
- 原始`msg.Data`保持不变

## 第三方数据库支持

### 1. 支持的数据库和驱动
| 数据库类型 | 驱动包 | driverName | DSN格式示例 |
|-----------|--------|------------|-------------|
| MySQL | github.com/go-sql-driver/mysql | mysql | root:root@tcp(127.0.0.1:3306)/test |
| PostgreSQL | github.com/lib/pq | postgres | postgres://user:pass@127.0.0.1:5432/test?sslmode=disable |
| Microsoft SQL Server | github.com/denisenkom/go-mssqldb | mssql | server=127.0.0.1;user id=root;password=root;database=test |
| Oracle | github.com/godror/godror | oracle | username/password@//127.0.0.1:1521/test |
| TDengine | github.com/taosdata/driver-go/v3/taosRestful | taosRestful | root:root@tcp(127.0.0.1:6030)/test |

### 2. 添加新的数据库支持
导入相应的驱动包：
```go
import (
    _ "github.com/taosdata/driver-go/v3/taosRestful"
)
```

## 最佳实践

### 1. 连接管理
- 合理设置连接池大小
- 及时关闭不需要的连接
- 使用连接复用机制

### 2. SQL操作
- 使用参数化查询防止SQL注入
- 合理使用事务
- 注意SQL性能优化

### 3. 错误处理
- 检查SQL语法
- 处理连接异常
- 记录错误日志

## 注意事项

1. **安全性**
   - 避免SQL注入风险
   - 妥善保管数据库凭证
   - 限制数据库操作权限

2. **性能优化**
   - 合理使用连接池
   - 优化SQL查询
   - 避免大量数据操作

3. **错误处理**
   - 处理连接超时
   - 处理查询错误
   - 实现重试机制

通过合理配置和使用数据库客户端节点，您可以实现各种数据库操作功能。请根据实际需求选择合适的配置选项，并注意遵循安全和性能优化建议。
