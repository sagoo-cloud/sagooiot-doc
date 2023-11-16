# 其它常见问题

## 操作系统如何优化

### 修改`limits.conf`

```txt
* soft nofile 1000000
* hard nofile 1000000
```

### 修改`sysctl.conf`

```txt
# 该参数控制半连接队列的最大大小，即等待完成三次握手的连接的数量，默认值：依赖于内核版本和系统配置，通常在 128 到 1024 之间。
net.ipv4.tcp_max_syn_backlog = 65536
# 该参数定义了系统中每个监听套接字最大的连接数量，默认值：通常为 128。这表示每个监听套接字的默认最大连接数为 128。
net.core.somaxconn = 65536
# 它允许在建立连接时携带数据，从而加速连接建立过程。该参数用于启用和配置 TCP Fast Open，默认值：通常为 1，表示启用 TCP Fast Open。
net.ipv4.tcp_fastopen = 3
# 该参数定义了TCP连接的空闲时间，即在没有数据传输的情况下，连接保持空闲的时间。一旦超过这个时间，内核将发送探测包以检测连接是否仍然有效，默认值：通常为 7200 秒（2 小时）。
net.ipv4.tcp_keepalive_time = 600
# 该参数定义了在开始发送 TCP keepalive 探测之前，尝试发送多少次未被确认的 keepalive 探测，默认值：通常为 9。
net.ipv4.tcp_keepalive_probes = 5
# 该参数定义了两个连续的 TCP keepalive 探测之间的时间间隔，默认值：通常为 75 秒。
net.ipv4.tcp_keepalive_intvl = 15
```

## 如何使用epoll

1. 在 Go 1.9 及以后的版本中，Go 在 Linux 上默认使用 `epoll` 作为事件通知机制。因此，你无需手动启用 `epoll`，Go 将根据操作系统的支持自动选择最佳的事件通知机制。
2. 可以使用下面的代码检查是否使用了`epoll`,如果输出中 `Event mechanism` 显示为 `epoll`，那么你的 Go 程序已经在 Linux 上启用了 `epoll`。
```go
package main

import (
	"fmt"
	"runtime"
)

func main() {
	fmt.Println("GOOS:", runtime.GOOS)
	fmt.Println("Event mechanism:", runtime.GOOS)
}
```
