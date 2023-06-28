# 设备接入方式

## 基础概念

### 上行通信:
- 指物联网设备向物联网平台发送数据的过程。
- 在该过程中，设备使用一定的通信协议（如MQTT、CoAP等）与物联网平台建立起连接，并通过该连接将设备采集到的数据或者状态信息等传输到物联网平台。
- 具体来说，设备会将采集到的数据打包成消息的形式，然后使用预先定义好的Topic和Payload发布到物联网平台，物联网平台再根据不同的Topic对这些消息进行分发和处理。同时，在物联网平台的支持下，设备还可以进行OTA（远程升级）等操作，以便实现远程管理和维护

### 下行通信:
- 通过平台端的下发指令接口，将平台端的指令下发到设备端。实现对设备的控制

### 子设备
- 直连设备：具有IP地址，可直接连接物联网平台，且不能挂载子设备，但可作为子设备挂载到网关设备下。
- 网关子设备：不直接连接物联网平台，而是作为网关的子设备，由网关代理连接物联网平台。
- 网关设备：可以挂载子设备的直连设备，下文简称网关。网关具有子设备管理模块，可以维持子设备的拓扑关系，将与子设备的拓扑关系同步到云端。

### 影子设备
- 物联网影子设备（IoT Shadow Devices）是指一种虚拟的设备，它们与实际的物理设备对应，但并不直接与网络相连。影子设备的作用是记录、存储和传输物理设备的状态信息，以便在需要时能够随时获取和更新。




## 自定义协议接入

该平台支持使用MQTT、UDP、TCP等协议进行透传通信，并允许自定义协议包的方式解析来自不同厂家和不同设备上报的数据。协议包的开发规范详见协议包开发文档，开发人员可以按照文档规范进行协议包的编写和调试。使用该平台可以更加方便地实现异构设备之间的数据传输和互联互通。

## 自定义接入协议类型

| 协议类型    | 说明                                                         |
| ----------- | ------------------------------------------------------------ |
| MQTT直连    | 适用于轻量级的异步通信。设备通过MQTT协议接入服务网关，通过Topic发布和订阅消息。 |
| WebSocket   | 适用于设备端和服务端进行双向数据传输的场景。设备通过Websocket接入。 |
| CoAP        | 适用于资源受限的低功耗设备。设备通过Topic订阅和发布消息。    |
| TCP透传     | 适用于可靠性高的场景。设备使用TCP协议连接服务并传输消息。    |
| HTTP推送    | 适用于设备使用HTTP协议上报消息的场景。                       |
| UDP         | 适用于速度要求高的场景。设备使用UDP协议连接服务并传输消息。  |
| MQTT Broker | 适用于设备不直接接入平台，而是通过第三方MQTT服务接入的场景。 |



## 视频类设备接入

平台针对视频类设备，提供GB28181、RTMP、RTSP、HDL、HLS等协议的视频设备的接入方式。

## 通道类接入

平台针对工业领域类设备，提供Modbus（TCP）、OPC UA协议的接入。

[MQTT设备接入说明
](mqtt.md)