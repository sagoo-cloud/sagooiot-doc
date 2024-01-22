
# 系统优化

## EMQX调优

参见[EMQX调优](https://www.emqx.io/docs/zh/latest/performance/tune.html#%E5%85%B3%E9%97%AD%E4%BA%A4%E6%8D%A2%E5%88%86%E5%8C%BA)

## 后端程序所在主机调优

### 使用epoll

1. epoll是Linux内核为处理大批量文件描述符而作了改进的poll，是Linux下多路复用IO接口select/poll的增强版本，它能显著提高程序在大量并发连接中只有少量活跃的情况下的系统CPU 利用率。在高并发的网络服务器中，往往需要同时处理大量的网络连接和网络数据。传统的网络服务器程序往往使用select或poll方案来处理这种情况，但是随着网络连接数的增加，这种方案的效率会线性下降。epoll可以显著提高程序在大量并发连接中只有少量活跃的情况下的系统CPU利用率。
2. 在 Go 1.9 及以后的版本中，Go 在 Linux 上默认使用 `epoll` 作为事件通知机制。因此，你无需手动启用 `epoll`，Go 将根据操作系统的支持自动选择最佳的事件通知机制。
3. 可以使用下面的代码检查是否使用了`epoll`,如果输出中 `Event mechanism` 显示为 `epoll`，那么你的 Go 程序已经在 Linux 上启用了 `epoll`。
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

### 关闭交换内存(swap)

1. 交换内存（swap）是存放在磁盘上的虚拟内存，当物理内存不足时，系统会将一部分进程的内存空间交换到磁盘上，从而腾出物理内存供其他进程使用。交换内存的读写速度远远低于物理内存，交换内存的使用会导致系统性能下降，因此在生产环境中，我们应该关闭交换内存。
2. 关闭方式:
```shell
# 临时关闭
sudo swapoff -a
# 永久关闭
sudo vim /etc/fstab
# 注释掉swap那一行,保存退出.重启后生效
```

### 调整文件句柄数和最大进程数

1. 为了提高系统的并发能力，我们需要调整系统的文件句柄数和最大进程数。在 Linux 中，文件句柄数和最大进程数都是通过修改 `/etc/security/limits.conf` 文件来调整的。
2. 修改 `/etc/security/limits.conf` 文件，添加如下内容：
```shell
# 用户可以打开的最大文件句柄数
* soft nofile 1024000
* hard nofile 1024000

# 用户可以创建的最大进程数
* soft nproc  1024000
* hard nproc  1024000
```

### 调整内核参数

1. 为了提高系统的并发能力，我们还需要调整内核参数。在 Linux 中，内核参数是通过修改 `/etc/sysctl.conf` 文件来调整的。
2. 修改 `/etc/sysctl.conf` 文件，添加如下内容(变更完成后执行 `sysctl -p `生效)：
```shell

# 文件句柄数是指一个进程可以打开的文件数量。默认值是1024。系统负载较高，需要支持大量并发连接或进程时，可以将该值调高。
fs.file-max=1000000


# ARP 缓存大小
# 存在于 ARP 高速缓存中的最少层数，如果少于这个数，垃圾收集器将不会运行。缺省值是128。当内核维护的 ARP 表过于庞大时，可以将该值调高，以提高垃圾收集器的效率。
net.ipv4.neigh.default.gc_thresh1=1024
# 保存在 ARP 高速缓存中的最多的记录软限制。垃圾收集器在开始收集前，允许记录数超过这个数字 5 秒。缺省值是 512。当内核维护的 ARP 表过于庞大时，可以将该值调高，以提高垃圾收集器的效率。
net.ipv4.neigh.default.gc_thresh2=4096
# 保存在 ARP 高速缓存中的最多记录的硬限制，一旦高速缓存中的数目高于此，垃圾收集器将马上运行。缺省值是1024。当内核维护的 ARP 表过于庞大时，可以将该值调高，以提高垃圾收集器的效率。
net.ipv4.neigh.default.gc_thresh3=8192


# lianTCP 连接追踪优化
# 连接跟踪数是指内核可以跟踪的最大连接数。默认值是65536。 系统负载较高，需要支持大量并发连接时，可以将该值调高。
net.netfilter.nf_conntrack_max=10485760
net.nf_conntrack_max=10485760
# 连接超时时间是指连接处于 ESTABLISHED 状态时的超时时间。默认值是75。系统负载较高，需要支持大量并发连接时，可以将该值调高。
net.netfilter.nf_conntrack_tcp_timeout_established=300



# 并发连接 backlog 设置
# 是系统中 listen 函数的 backlog 参数，默认值是 128。backlog 是指内核可以处理的最大未连接的请求数。将该值调高可以允许系统同时处理更多的连接请求
net.core.somaxconn=32768
# 是 TCP 协议的 SYN 队列的长度，默认值是 1024。SYN 队列是指内核可以保存的最大未确认的 SYN 连接请求数。将该值调高可以允许系统同时处理更多的 SYN 连接请求。
net.ipv4.tcp_max_syn_backlog=16384
#  是网络设备接收队列的长度，默认值是 32768。接收队列是指网络设备接收数据包时，可以缓存在队列中的最大数据包数量。将该值调高可以允许系统同时处理更多的数据包
net.core.netdev_max_backlog=16384 


# 调整网络缓冲区大小，以提高网络性能
# TCP 接收和发送缓冲区的默认大小，它们分别指定了内核为 TCP 套接字分配的最小内存量。将这两个值调高可以使内核为每个 TCP 连接分配更大的缓冲区，从而减少数据包的复制次数，提高网络性能。
net.core.rmem_default=262144
net.core.wmem_default=262144 
# TCP 接收和发送缓冲区的最大大小，它们限制了内核可以为每个 TCP 连接分配的最大内存量。将这两个值调高可以使内核为需要大量网络吞吐量的连接分配更大的缓冲区，从而进一步提高网络性能。
net.core.rmem_max=16777216
net.core.wmem_max=16777216
# TCP 优化内存的最大大小，它指定了内核可以用于 TCP 优化功能的内存量。TCP 优化功能包括 Nagle 算法、延迟 ACK 以及 TCP 流控制等。将这个值调高可以使内核更好地处理网络拥塞，从而提高网络性能。
net.core.optmem_max=16777216
#  TCP 内存分配配置，它指定了内核为 TCP 层分配的内存总量
net.ipv4.tcp_mem='16777216 16777216 16777216'
# 分别指定了 TCP 接收和发送缓冲区的最小值、默认值和最大值，但只针对 TCP 协议。
net.ipv4.tcp_rmem='1024 4096 16777216'
net.ipv4.tcp_wmem='1024 4096 16777216'
 


# TCP 优化
# 指定了 TCP 连接 TIME_WAIT 状态的最大数量。TIME_WAIT 状态是 TCP 连接终止后的一种过渡状态，在该状态下，连接的两个端点都还没有释放资源。
# 默认情况下，net.ipv4.tcp_max_tw_buckets 的值为 1024。当连接数较多时，TIME_WAIT 状态的连接会占用大量内存资源。可能会导致 NAT 模式下出现连接 RST 错误。
net.ipv4.tcp_max_tw_buckets=1048576
# 定了是否启用 TIME_WAIT 状态的连接复用功能。如果启用该功能，内核可以将 TIME_WAIT 状态的连接复用为新的连接。可能会导致连接重复
net.ipv4.tcp_tw_recycle=1
# 指定了是否允许 TIME_WAIT 状态的连接被重用。如果启用该功能，内核可以将 TIME_WAIT 状态的连接重用为新的连接。可能会导致连接重复
net.ipv4.tcp_tw_reuse=1
# 值设置为 15 秒，则在 FIN 状态下，连接将在 15 秒后自动关闭。这将有助于释放内存资源，提高系统的连接处理能力。
net.ipv4.tcp_fin_timeout=15
# TCP 保活时间，它指定了内核发送 TCP keepalive 消息的频率。默认值是 7200 秒（2 小时）。将该值调高可以减少系统中 TCP keepalive 消息的数量，从而减少网络流量。
net.ipv4.tcp_keepalive_time=600
# 连接重用功能允许内核在同一端口上重用已关闭的连接。这通常是一个好主意，因为它可以减少连接的延迟，但是它可能会导致套接字错误。默认情况下，内核禁用此功能
net.ipv4.vs.conn_reuse_mode=0
# IP 转发是指将数据包从一个网络转发到另一个网络的功能。
net.ipv4.ip_forward = 1
# 指定了本地端口的范围。默认值是 32768 61000.将 net.ipv4.ip_local_port_range 的值调高，可以为本地端口分配更多的范围。这意味着可以支持更多的并发连接。
net.ipv4.ip_local_port_range="500 65535"
# 它允许在建立连接时携带数据，从而加速连接建立过程。该参数用于启用和配置 TCP Fast Open，默认值：通常为 1，表示启用 TCP Fast Open。
net.ipv4.tcp_fastopen = 3
# 该参数定义了在开始发送 TCP keepalive 探测之前，尝试发送多少次未被确认的 keepalive 探测，默认值：通常为 9。
net.ipv4.tcp_keepalive_probes = 5
# 该参数定义了两个连续的 TCP keepalive 探测之间的时间间隔，默认值：通常为 75 秒。
net.ipv4.tcp_keepalive_intvl = 15



# inotify 监控优化
# inotify 监控实例数，Inotify 是一种 Linux 内核提供的文件系统事件监控机制，允许用户监控文件系统中的文件和目录的创建、修改、删除等事件。inotify 监控实例是指一个 inotify 监控器，负责监控一个或多个文件或目录。
# 将 fs.inotify.max_user_instances 的值调高，可以允许每个用户创建更多的 inotify 监控实例。这意味着可以监控更多的文件和目录，从而提高系统的监控能力。
fs.inotify.max_user_instances=524288
# inotify 监控节点数是指一个用户可以监控的最大 inotify 监控节点数。默认值是8192。值调高，可以允许每个用户监控更多的文件或目录。这意味着可以监控更多的事件，从而提高系统的监控能力。
fs.inotify.max_user_watches=524288



# 内存分配优化
# IP 转发是指将数据包从一个网络转发到另一个网络的功能。值设置为 0，可以减少内核交换内存页面到交换分区的概率。这意味着可以减少交换分区的使用率，提高系统的性能。
vm.swappiness=0
```

### 升级系统内核

1. 高版本的内核可以提供更好的性能(网络层面)，因此我们需要升级系统内核。
```shell
# 安装 elrepo 软件源
yum install elrepo-release
# 更新系统软件包
yum update
# 安装新的内核
yum install kernel-lt-5.4.238-1.el7.elrepo.x86_64
# 重启系统
reboot
```
