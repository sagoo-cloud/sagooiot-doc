---
sidebar_position: 0
---
# 安装与运行常见问题

## 1. 首次运行时，报错`taoWS panic: runtime error: invalid memory address or nil pointer dereference`

安装后，运行的时候提示如下错误：
    
    ```shell

runtime error: invalid memory address or nil pointer dereference

1) github.com/gorilla/websocket.(*Conn).SetWriteDeadline
   /home/li/go/pkg/mod/github.com/gorilla/websocket@v1.5.3/conn.go:788
2) github.com/taosdata/driver-go/v3/taosWS.(*taosConn).writeText
   /home/li/go/pkg/mod/github.com/taosdata/driver-go/v3@v3.5.1/taosWS/connection.go:264
3) github.com/taosdata/driver-go/v3/taosWS.(*taosConn).execCtx
   /home/li/go/pkg/mod/github.com/taosdata/driver-go/v3@v3.5.1/taosWS/connection.go:
4) github.com/taosdata/driver-go/v3/taosWS.(*taosConn).ExecContext
   /home/li/go/pkg/mod/github.com/taosdata/driver-go/v3@v3.5.1/taosWS/connection.go:110
5) sagooiot/pkg/tsd/internal/tdengine.(*TdEngine).exec

    ```

**解决方法：**

原因是时序数据库没有初始化导致的。请对时序数据库进行初始化。

```shell
  ./sagooiot -tsd
  
```
