---
sidebar_position: 0
---
# 安装与运行常见问题

## 首次运行时，报时序数据库连接错误

```shell

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


## mqtt设备实时在线离线状态不准确

mqtt设备实时上线离线监听

需要你的服务器支持系统消息的订阅。如果使用的是emqx服务，需要设置你系统连接mqtt的帐号的权限。在emqx服务器上设置ACL权限。 需要配置你的连接帐号允许订阅`$SYS/#`这个主题

:::tip 提示
 注意，你的设备连接到mqtt服务的帐号需要与SagooIoT平台上的设备KEY一致，否则无法获取到设备的在线状态。
:::

ACL配置示例：

```shell

%% 允许用户名是 dashboard 的客户端订阅 "$SYS/#" 这个主题
{allow, {user, "dashboard"}, subscribe, ["$SYS/#"]}.

%% 允许来自127.0.0.1 的用户发布和订阅 "$SYS/#" 以及 "#"
{allow, {ipaddr, "127.0.0.1"}, all, ["$SYS/#", "#"]}.

%% 拒绝其他所有用户订阅 `$SYS/#`，`#` 和 `+/#` 主题
{deny, all, subscribe, ["$SYS/#", {eq, "#"}, {eq, "+/#"}]}.

%% 如果前面的规则都没有匹配到，则允许所有操作
%% 注意：在生产环境中，最后一条规则应该设置为 `{deny, all}`，并且配置 `authorization.no_match = deny`
{allow, all}.

```

详细说明请参考[mqtt配置](../other/mqtt.md)
