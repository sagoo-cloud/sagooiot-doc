# 其它


## 服务器硬件配置参考

SagooMedia流媒体服务所在服务器

| 并发数   | 推荐配置                       | 理论带宽要求（上行） |
| -------- | ------------------------------ | -------------------- |
| 16并发   | 2核4G内存                      | 16M                  |
| 32并发   | 4核8G内存                      | 32M                  |
| 64并发   | 8核16G内存                     | 64M                  |
| 128并发  | 8核32G内存                     | 128M                 |
| 256并发  | 16核64G内存                    | 256M                 |
| 高并发时 | 多个SagooMedia服务器分布式部署 |                      |

理论1Mbps 下行带宽计算公式如下：

500并发用户（各个通道观看用户总数）x 1Mbps 约等于 500Mbps

