# 工业通信协议网关

功能强大的本地化工业物联网通讯协议网关，支持200+通讯协议。

1. 支持200+通讯协议,包括常见的OPCUA、Modbus TCP，以及西门子、王菱和欧 姆龙等各大主流PLC协议,且一个工程最多支持同时运行8种不同协议,用户只要用一台PC Runtime就可以同时连接并采集多台不同厂商的设备的数据,既提高效率又节省成本。
2. 支持JavaScript进行高效脚本编写。
3. 支持作为OPCUA客户端采集设备中的数据,也支持作为OPCUA服务器将数据 上传到SCADA、数据库和云平台。
4. 支持数据以csv文件格式存储到本地、U盘以及SD卡中。
5. 支持多语言功能,可通过导入导出csv文件快速实现多语言功能。
6. 支持用户权限管理,根据用户职责可设置用户对应的访问权限。
7. 支持设备掉电保存,可通过系统变量来实现设备重启后保持标签原来的值。
8. 支持数据传输功能,可将离散寄存器地址的标签数据转换成连续寄存器地址的标 签数据。

## 支持平台
- eX 系列
- eXware 系列
- eX M JSmart 系列
- Jsmart M 系列
- eSMART 0N3 X5
- 无线系列
- JM PC Runtime

## 按制造商分类的协议支持

### 西门子 (Siemens)
- Simatic S7 以太网 (S7ET)
    - 以太网
    - 所有平台均支持

- Simatic S7 MPI (MPOB)
    - 串口
    - 注意：需要最低BSP版本要求

- Siemens S7 优化协议 (S7OP)
    - 以太网
    - 所有平台均支持

### 三菱 (Mitsubishi)
- 三菱 FX 以太网 (MIFE)
    - 以太网
    - 所有平台均支持

- 三菱 FX 串口 (MIFX)
    - 串口
    - 所有平台均支持

- 三菱 iQ/Q/L 以太网 (MIQE)
    - 以太网
    - 所有平台均支持

### 欧姆龙 (Omron)
- 欧姆龙 FINS 以太网 (OMRE)
    - 以太网
    - 所有平台均支持

- 欧姆龙 FINS 串口 (OMRF)
    - 串口
    - 所有平台均支持

### 罗克韦尔/AB (Rockwell Automation)
- A-B DF1 (ABDF)
    - 串口
    - 所有平台均支持

- A-B DH485 (ABDH)
    - 串口
    - 部分平台支持

- A-B 以太网 (ABEN)
    - 以太网
    - 所有平台均支持

### 倍福 (Beckhoff)
- Beckhoff ADS (BEAD)
    - 以太网
    - 所有平台均支持

### 博世力士乐 (Bosch Rexroth)
- IndraControl (INDR)
    - 以太网
    - 所有平台均支持

### 施耐德 (Schneider Electric)
- Uni-Telway (TELU)
    - 串口
    - 所有平台均支持

### 通用协议
#### Modbus 协议
- Modbus RTU
    - 串口
    - 所有平台均支持

- Modbus TCP
    - 以太网
    - 所有平台均支持

- Modbus TCP 服务器
    - 以太网
    - 所有平台均支持

#### 现场总线协议
- PROFIBUS DP
    - 特殊接口
    - 注意：eXware705除外

- EtherNet/IP CIP
    - 以太网
    - 所有平台均支持

#### 楼宇自动化协议
- BACnet
    - 以太网
    - 注意：仅支持IP

- KNX TP/IP
    - 以太网
    - 注意：仅支持IP


### 支持的通信协议栈
- Modbus TCP（主站和从站）
- Modbus RTU（主站和从站）
- CANopen
- EtherNet/IP
- Powerlink
- EtherCAT
- PROFINET
- OPC UA 服务器
- J1939

### 特别说明
(7) 这里的OPC UA服务器指的是作为CODESYS运行时组件的3S OPC UA服务器
