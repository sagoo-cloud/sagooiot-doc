---
title: "日志配置"
sidebar_position: 5
hide_title: true
---

## 配置参考

在配置文件中找到`logger:`根据实际情况修改配置。

```yaml

# 日志配置
logger:
  path:                  "resource/log/server"           # 日志文件路径。默认为空，表示关闭，仅输出到终端
  file:                  "{Y-m-d}.log"         # 日志文件格式。默认为"{Y-m-d}.log"
  prefix:                ""                    # 日志内容输出前缀。默认为空
  level:                 "error"               # 日志输出级别，all|debug|info|warn|error|critical。默认为all
  ctxKeys:               []                    # 自定义Context上下文变量名称，自动打印Context的变量到日志中。默认为空
  header:                true                  # 是否打印日志的头信息。默认true
  stdout:                true                  # 日志是否同时输出到终端。默认true
  rotateSize:            0                     # 按照日志文件大小对文件进行滚动切分。默认为0，表示关闭滚动切分特性
  rotateExpire: "1d"  # 一天一个回滚
  rotateBackupLimit: 7   # 保留7个日志文件
  rotateBackupExpire:    0                     # 按照切分的文件有效期清理切分文件，当滚动切分特性开启时有效。默认为0，表示不备份，切分则删除
  rotateBackupCompress:  0                     # 滚动切分文件的压缩比（0-9）。默认为0，表示不压缩
  rotateCheckInterval:   "1h"                  # 滚动切分的时间检测间隔，一般不需要设置。默认为1小时
  stdoutColorDisabled:   false                 # 关闭终端的颜色打印。默认开启
  writerColorEnable:     false                 # 日志文件是否带上颜色。默认false，表示不带颜色


```
## 配置说明

SagooIoT是基于Goframe开发，日志配置参考Goframe的日志配置。[Goframe日志配置](https://goframe.org/docs/core/glog-config)
