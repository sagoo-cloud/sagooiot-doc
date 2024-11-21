---
title: "时序数据库配置"
sidebar_position: 2
hide_title: true
---

## 配置参考

在配置文件中找到`tsd:`根据实际情况修改配置。

```yaml

# 时序数据库配置
tsd:
database: "TdEngine" #可选择 TdEngine、Influxdb
tdengine:
#    type: "taosRestful" #http连接方式，端口是6041
#    dsn: "root:taosdata@http(127.0.0.1:6041)/"
    type: "taosWS" #websocket连接方式，端口是6041
    dsn: "root:taosdata@ws(127.0.0.1:6041)/"
    dbName: "sagoo_iot"
    maxOpenConns: 0 #设置与数据库的最大打开连接数。默认为0，表示不限制，默认为2倍CPU核心数，建议保持默认设置
    maxIdleConns: 2 #设置空闲连接池的最大连接数。默认与maxOpenConns设置相同，建议保持默认设置
    connMaxLifetime: 0 #设置连接可重用的最大时间。默认为0，表示不限制，默认为0，表示不限制
    connMaxIdleTime: 0 #设置连接空闲的最大时间。默认为0，默认为0，表示永不超时。建议保持默认设置
#  influxdb:
#    addr: "http://localhost:8086"
#    dbName: "sagoo_iot"
#    token: "ez4BQ5QQCUpcAp1FDhhdY9jfcvxq2Z9OLkQSuQG_IPOzE9GvGRHfRm_YYwfuHtCaS7TVefxhEnzCOHi_nGtsCw=="
#    userName:
#    passWord:

```

## 配置说明

如果您使用的是 TdEngine 时序数据库，可以根据实际情况修改配置项。如果您使用的是 Influxdb 时序数据库，需要将`database`配置项修改为`Influxdb`，并根据实际情况修改`influxdb`配置项。

