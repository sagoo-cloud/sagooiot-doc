# 设备本地端接入网关

## 软网关

该软网关可安装在设备端的内部服务器上,用于实现设备数据的本地采集和汇聚。

**主要功能包括:**

- 设备侧协议转换：在设备侧既可完成协议转换和数据解析，更加实时高效，减轻远程平台的通信压力；支持标准通信协议，如ModbusRTU、ModbusTCP、DLT645-1997/07、CJ/T188、西门子200Smart、S7-1200等，同时支持通过Lua脚本可实现私有协议通信，简单高效；
- 设备侧数据处理：在设备侧即可完成轮询采集设备数据，同时将设备数据转换成标准、统一JSON格式，不仅减轻远程平台的轮询采集压力，而且减轻远程平台数据转换压力，远程平台只需专注于应用；内置公式计算引擎，支持将设备数据进行运算，减轻远程平台运算压力；
- 多协议、多通道上报：支持多种协议上报（MQTT、HTTP、自定义TCP/UDP等），支持同一时刻上报数据到不同的平台；支持定时上报和变化上报，即保证设备数据的实时性，又降低了流量消耗；支持远程平台命令下发，接收命令后进行解析和验证，在转发给设备；
- 设备侧场景联动：在设备侧即可完成多种设备的联动控制，无需将设备数据上传至远程平台，联动控制速度更快、更稳定；
- 远程维护、远程升级：内置Webserver，通过浏览器即可完成各项功能配置，上手简单、使用方便，减少运维成本，提高产品使用体验；

该软网关功能丰富完善,可以方便实现设备接入和数据采集汇聚,便于后续建设工业互联网平台。

## 硬网关

具备软网关所有功能。

![](../imgs/extended/gw2.png)

**硬件选型**

|       | GW200-2E4S | GW200-2W4S-C1 |
|-------|-----------|-------------|
| 以太网   | 1路        | 1路          |
| RS485 | 1路        | 1路          |
| 4G    | 无         | CAT1        |
| 供电    | 9～36V     | 9～36V       |
| 内存    | 128M      | 128M        |
| 价格    | 348元      | 395元        |


- 供电电压：DC 9V～48V
- 以太网接口：2路高性能100M/10M自适应工业网卡,支持AUTO MDI/MDIX；
- RS485接口：4路电气隔离RS485接口，采用三级防雷防静电设计，支持4KV雷击防护；
- 4G通信接口(选配)：内部集成工业级Cat1 4G全网通模块 LTE-FDD：最大下行速率10Mbps，最大上行速率5Mbps；
- RTC时钟：内部集成实时时钟， 板载RTC备份电池断电后可以运行3年以上；
- 工作环境：-40～85℃（温度）、20％～90％无凝露（湿度）