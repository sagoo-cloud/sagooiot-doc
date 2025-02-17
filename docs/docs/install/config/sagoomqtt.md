---
title: "SagooMQTT权限配置"
sidebar_position: 5
hide_title: true
---

## 1. 认证配置（Auth）
用于控制客户端连接权限，默认**允许所有连接**，需显式配置允许规则。

如果需要使用SagooMQTT服务的权限配置，需要在可以执行的服务程序所在的目录下创建`auth.yaml`文件，然后在文件中添加相应的配置。

## 2. 访问控制列表（ACL）
用于控制主题操作权限，默认**允许所有操作**，需显式配置限制规则。

### 2.1 权限级别说明
| 数值 | 常量             | 说明             |
| ---- | ---------------- | ---------------- |
| 0    | `auth.Deny`      | 完全禁止         |
| 1    | `auth.ReadOnly`  | 仅允许订阅（读） |
| 2    | `auth.WriteOnly` | 仅允许发布（写） |
| 3    | `auth.ReadWrite` | 允许订阅和发布   |

### 2.2 参数说明
| 参数       | 类型      | 说明                            | 示例            |
| ---------- | --------- | ------------------------------- | --------------- |
| `client`   | string    | 匹配客户端 ID                   | `"device123"`   |
| `username` | string    | 匹配客户端用户名                | `"melon"`       |
| `remote`   | string    | 匹配客户端IP/域名（支持通配符） | `"localhost:*"` |
| `filters`  | key-value | 主题过滤器与权限的映射          | `"melon/#": 3`  |

### 2.3 规则处理逻辑
- 规则按**从上到下的顺序**匹配
- 第一个匹配客户端属性的规则立即生效
- 无匹配规则时默认允许所有操作

**典型配置流程：**
1. 放行特权客户端（如本地连接）
2. 配置特殊用户权限
3. 设置全局默认规则

---

## 3. 完整示例
```yaml
# auth 配置（连接认证）
auth:
  # 规则 0：用户 peach 使用密码 password1 允许连接
  - username: peach
    password: password1
    allow: true

  # 规则 1：用户 melon 使用密码 password2 允许连接
  - username: melon
    password: password2
    allow: true

  # 规则 2（注释）：允许来自 127.0.0.1 的任何连接
  # - remote: "127.0.0.1:*"
  #   allow: true

  # 规则 3（注释）：允许来自 localhost 的连接
  # - remote: "localhost:*"
  #   allow: true

# acl 配置（主题权限）
acl:
  # 规则 0：本地连接拥有完全权限
  - remote: "127.0.0.1:*"

  # 规则 1：用户 melon 的权限
  - username: melon
    filters:
      # 拥有 melon/# 主题的读写权限
      "melon/#": 3
      # 拥有 updates/# 主题的写权限（不可订阅）
      "updates/#": 2

  # 规则 2：全局默认规则
  - filters:
      # 所有主题仅允许订阅
      "#": 1
      # 禁止 updates/# 主题的所有操作
      "updates/#": 0
```

### 配置解读
1. **认证配置**
    - `peach`/`melon` 用户可通过密码认证
    - 注释部分演示了IP白名单配置方式

2. **ACL配置**
    - 本地客户端（127.0.0.1）拥有全部权限
    - 用户 `melon`：
        - 完全控制 `melon/#` 主题
        - 可发布但不可订阅 `updates/#`
    - 其他客户端：
        - 默认所有主题只读
        - 完全禁止访问 `updates/#` 主题

---

## 注意事项
1. **规则顺序敏感**：将更具体的规则放在前面
2. **通配符说明**：
    - `#` 匹配多级主题（如 `a/#` 匹配 `a/b` 和 `a/b/c`）
    - `+` 匹配单级主题（如 `a/+` 匹配 `a/b` 但不匹配 `a/b/c`）
3. **IP格式**：使用 `IP:端口` 形式，`*` 表示通配（如 `192.168.1.*:*`）
