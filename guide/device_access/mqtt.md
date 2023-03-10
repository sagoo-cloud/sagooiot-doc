# MQTT 设备接入



通过一个模拟设备的接入，来演示系统接入设备的情况。以MQTTX为例，介绍使用第三方软件以MQTT协议接入SagooIOT物联网平台。

**注：这里采用的是SagooIOT官方标准Json格式数据** [非官方数据格式的处理请见这里](mqtt2.md)

## 下载并安装MQTTX

前往[官网下载](https://mqttx.app/)安装

## 使用MQTTX模拟设备

一、打开MQTTX软件，点击新建连接创建一个连接，设置连接参数。

![mqttx-create](../../public/imgs/guide/device_access/mqttx-create.png)

![mqttx-user](../../public/imgs/guide/device_access/mqttx-user.png)

### 连接参数说明

| 参数      | 说明                                                         |
| --------- | ------------------------------------------------------------ |
| Name      | 输入您的自定义名称。                                         |
| Client ID | 设备Id。必须与系统中设备的ID填写一致。                       |
| Host      | 连接域名。本地连接可直接填写 `127.0.0.1`,如为远程连接，请跟据你的mqtt服务安装的连接地址进行设置。 |
| Port      | 请填写mqtt服务的端口。                                       |
| Username  | 填写mqtt接入账号                                             |
| Password  | 填写mqtt接入密码                                             |



二、设备数据上报

设备连接上平台后，就可进行一些事件上报、属性读取等操作。

1，MQTTX 进行数据上报

![mqttx-willmessage](../../public/imgs/guide/device_access/mqttx-willmessage.png)


| 参数      | 说明                                                         |
| --------- | ------------------------------------------------------------ |
| topic设置      | 本系统的mqtt设备数据上报的topic格式为：device/设备产品标识/设备标识                                         |
| payload内容（数据内容示例） | {<br/>    "data": {<br/>        "va": 198.15390994062852,<br/>        "vb": 130.5594819466405,<br/>        "vc": 133.58403535800258<br/>    },<br/>    "data_type": "property_report",<br/>    "device_key": "t20221103",<br/>    "return_time": "2023-03-04 14:59:03"<br/>} |

