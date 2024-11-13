---
sidebar_position: 0
---
# Mqtt协议 

SagooIoT内部是基于mqtt协议的，有自己的协议格式，内部称为SagooMQTT 协议。它是SagooIoT针对物联网开发领域设计的数据交换规范，使用JSON格式进行数据传输，用于设备端和物联网平台的双向通信。规范了设备端和物联网平台之间的业务数据交互。

本系统默认的协议是`SagooMqtt协议`,如果设备或者网关消息不满足`SagooMqtt协议`格式要求，可以有以下两种方式处理

1. 开发好合适的插件，并在`系统管理`->`插件管理` 点击 
   `上传插件ZIP`上传开发好的插件。
    ![upload-plugin.png](../imgs/protocol/upload-plugin.png)
   
   然后在`物联管理`->`设备管理`->`产品` 新建产品的时候选择对应的消息协议

    ![select- protocol.png](../imgs/protocol/select-protocol.png)
2. 开发相应的网关，转换私有协议的消息为标准`SagooMqtt协议`的消息进行接入




