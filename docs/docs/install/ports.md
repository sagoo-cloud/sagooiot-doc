---
title: '端口配置'
hide_title: true
sidebar_position: 3
keywords: [端口配置,系统核心服务,数据库服务,MQTT服务,流媒体服务,端口修改,端口建议]
description: '本文档详细说明了SagooIoT系统中使用的所有端口配置信息。包括系统核心服务、数据库服务、MQTT服务以及流媒体服务等各个组件的默认端口和配置方法。'
---


本文档详细说明了SagooIoT系统中使用的所有端口配置信息。包括系统核心服务、数据库服务、MQTT服务以及流媒体服务等各个组件的默认端口和配置方法。通过本文档，您可以了解：

- 系统各组件的默认端口配置
- 如何修改各个服务的端口
- 端口修改时的注意事项
- 特定场景下的端口配置建议

### 系统核心端口

| 服务类型 | 端口号 | 配置路径 | 默认值 | 说明 |
|---------|--------|----------|--------|------|
| 🌐 HTTP服务 | 8200 | `server.address` | ":8200" | Web服务主端口 |
| 🔍 性能分析(PProf) | 58088 | `system.pprofPort` | ":58088" | 性能分析调试端口 |
| 🔧 Web-Admin PProf | 58089 | `server.adminPprofPort` | ":58089" | 管理界面性能分析 |
| 📊 TDEngine | 6041 | `tsd.tdengine.dsn` | ":6041" | 时序数据库连接 |
| 💾 Redis | 6379 | `redis.default.address` | ":6379" | Redis数据库 |
| 🗄️ MySQL* | 3306 | `database.default.link` | ":3306" | MySQL数据库 |
| 📁 PostgreSQL* | 5432 | `database.default.link` | ":5432" | PostgreSQL数据库 |
| ⚙️ 规则引擎 | 9090 | `rule.server` | ":9090" | 规则服务 |
| 📡 MQTT-EMQX* | 1883 | `mqtt.addr` | ":1883" | EMQX MQTT服务端口 |
| 🔌 MQTT-TCP* | 1883 | `mqtt.sagooMQTT.listeners` | ":1883" | SagooMQTT TCP端口 |
| 🌐 MQTT-WS* | 1882 | `mqtt.sagooMQTT.listeners` | ":1882" | SagooMQTT WebSocket端口 |
| ❤️ MQTT-Health* | 1880 | `mqtt.sagooMQTT.listeners` | ":1880" | SagooMQTT 健康检查端口 |

:::tip 数据库说明
MySQL(3306)和PostgreSQL(5432)端口配置根据实际选择的数据库类型而定，系统支持这两种数据库，您只需要配置所选数据库对应的端口即可。
:::

:::tip MQTT服务说明
MQTT服务支持两种配置方式：
1. EMQX：使用外部MQTT服务器，只需配置MQTT-EMQX端口
2. SagooMQTT：使用内置MQTT服务器，需要配置TCP、WebSocket和健康检查三个端口
:::

### 流媒体服务端口

| 服务类型 | 端口号 | 配置路径 | 默认值 | 说明 |
|---------|--------|----------|--------|------|
| 🎥 网关服务 | 8080 | `global.http.listenaddr` | ":8080" | API网关HTTP端口 |
| 🔒 网关HTTPS | 8443 | `global.http.listenaddrtls` | ":8443" | API网关HTTPS端口 |
| 📡 GB28181-SIP | 5060 | `gb28181.port.sip` | "udp:5060" | GB28181 SIP服务端口 |
| 🎬 GB28181-Media | 58200-59200 | `gb28181.port.media` | "tcp:58200-59200" | GB28181媒体端口范围 |
| 📺 RTMP | 1935 | `rtmp.tcp.listenaddr` | ":1935" | RTMP服务端口 |
| 🎞️ RTSP | 554 | `rtsp.listenaddr` | ":554" | RTSP服务端口 |
| 🔄 RTSP-UDP | 8000 | `rtsp.udpaddr` | ":8000" | RTSP UDP端口 |
| 🔁 RTSP-RTCP | 8001 | `rtsp.rtcpaddr` | ":8001" | RTSP RTCP端口 |
| 🌐 WebTransport | 4433 | `webtransport.listenaddr` | ":4433" | WebTransport端口 |
| 🎮 WebRTC | 9000 | `webrtc.port` | "tcp:9000" | WebRTC端口 |

## 端口修改快速指南

### 系统核心配置

```yaml
# Web主服务端口（必需）
server:
  address: ":8200"  ➜  ":新端口"

# 性能分析端口（可选）
system:
  pprofPort: "58088"  ➜  ":新端口"     # 系统性能分析端口
server:
  adminPprofPort: "58089"  ➜  "新端口" # Web管理性能分析端口

# 主数据库连接（必需，选择其中一种）
database:
  default:
    # MySQL方式
    link: "mysql:root:password@tcp(ip:3306)/dbname"  ➜  "mysql:root:password@tcp(ip:新端口)/dbname"
    # 或 PostgreSQL方式
    link: "pgsql:user:password@tcp(ip:5432)/dbname"  ➜  "pgsql:user:password@tcp(ip:新端口)/dbname"

# 时序数据库（必需）
tsd:
  tdengine:
    dsn: "root:taosdata@ws(ip:6041)/"  ➜  "root:taosdata@ws(ip:新端口)/"

# Redis缓存数据库（必需）
redis:
  default:
    address: "ip:6379"  ➜  "ip:新端口"

# MQTT服务配置（必需，选择其中一种）
mqtt:
  # 选项1：使用EMQX（外部MQTT服务器）
  mqttAppName: "emqx"
  addr: "ip:1883"  ➜  "ip:新端口"    # MQTT服务器地址和端口

  # 选项2：使用SagooMQTT（内置MQTT服务器）
  mqttAppName: "sagoomqtt"
  sagooMQTT:
    listeners:
      - type: "tcp"
        address: ":1883"  ➜  ":新端口"     # MQTT TCP端口
      - type: "ws"
        address: ":1882"  ➜  ":新端口"     # MQTT WebSocket端口
      - type: "healthcheck"
        address: ":1880"  ➜  ":新端口"     # 健康检查端口

# 规则引擎服务（必需）
rule:
  server: ":9090"  ➜  ":新端口"    # 规则引擎监听端口
```

### 流媒体服务配置

```yaml
global:
  # 网关服务配置
  http:
    listenaddr: ":8080"  ➜  ":新端口"    # HTTP端口（必需）
    listenaddrtls: ":8443"  ➜  ":新端口"  # HTTPS端口（可选，需要配置证书）

# GB28181服务配置（可选）
gb28181:
  port:
    sip: "udp:5060"  ➜  "udp:新端口"            # SIP服务端口
    media: "tcp:58200-59200"  ➜  "tcp:新端口范围"  # 媒体服务端口范围

# RTMP服务配置（可选）
rtmp:
  tcp:
    listenaddr: ":1935"  ➜  ":新端口"

# RTSP服务配置（可选）
rtsp:
  listenaddr: ":554"  ➜  ":新端口"    # RTSP主端口
  udpaddr: ":8000"  ➜  ":新端口"      # RTSP UDP端口
  rtcpaddr: ":8001"  ➜  ":新端口"     # RTSP RTCP端口

# WebTransport服务配置（可选）
webtransport:
  listenaddr: ":4433"  ➜  ":新端口"

# WebRTC服务配置（可选）
webrtc:
  port: "tcp:9000"  ➜  "tcp:新端口"
```

## ⚠️ 重要注意事项

1. 📌 **端口占用检查**
   - 修改前确保新端口未被其他服务占用
   - 可使用 `netstat -an | grep 端口号` 检查
   - 特别注意GB28181的媒体端口范围不要与其他服务冲突
   - 数据库端口修改需要同步修改数据库服务的配置

2. 🔒 **防火墙配置**
   - 确保防火墙已开放相应端口
   - GB28181需要开放UDP 5060端口和TCP 58200-59200端口范围
   - RTMP和RTSP需要开放对应的TCP端口
   - 数据库端口建议只对特定IP开放访问

3. 🐳 **Docker部署注意**
   - 需要在docker-compose.yml中映射对应端口
   - 注意容器间的端口依赖关系
   - 对于端口范围配置，需要映射整个范围
   - 数据库容器的端口映射需要与连接配置保持一致

4. 🔄 **服务重启**
   - 端口修改后需要重启相关服务
   - 建议按服务依赖顺序重启
   - 流媒体服务重启可能会影响在线用户
   - 数据库端口修改需要重启数据库服务

5. 💾 **配置备份**
   - 修改前备份原始配置文件
   - 记录修改内容便于回滚
   - 保存端口映射文档
   - 数据库配置修改前务必备份数据
