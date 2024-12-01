---
sidebar_position: 4
title: '设备影子数据流'
keywords: [MQTT Topic,消息主题,设备通信,设备影子,数据流转,Topic格式,通信规范]
description: '设备影子数据通过Topic进行流转，主要包括设备上报状态到设备影子、应用程序更改设备状态、设备离线再上线后主动获取设备影子信息，和设备端请求删除设备影子中的属性信息。本文介绍设备影子Topic及其数据格式。'
---


设备影子数据通过Topic进行流转，主要包括设备上报状态到设备影子、应用程序更改设备状态、设备离线再上线后主动获取设备影子信息，和设备端请求删除设备影子中的属性信息。本文介绍设备影子Topic及其数据格式。

物联网平台已为每个设备预定义了两个Topic，用于实现设备影子数据流转。

## 更新设备影子

1，请求topic： `/sys/${productKey}/${deviceKey}/thing/shadow/update`

    设备和应用程序发布消息到此Topic。物联网平台收到该Topic的消息后，将消息中的状态更新到设备影子中。

2，请求数据格式示例：

```json

{
    "method": "update",
    "state": {
        "reported": {
            "temperature": 25.6,
            "humidity": 60,
            "power": "on",
            "brightness": 80
        }
    },
    "version": 2  
}

```
说明：

 | 参数        | 说明                                                         |
   | :---------- | :----------------------------------------------------------- |
   | **method**  | 表示设备或者应用程序请求设备影子时的操作类型。当执行更新操作时，**method**为必填字段，设置为update。 |
   | **state**   | 表示设备发送给设备影子的状态信息。**reported**为必填字段，状态信息会同步更新到设备影子的**reported**部分。 |
   | **version** | 表示设备影子检查请求中的版本信息。只有当新版本大于当前版本时，设备影子才会接收设备端的请求，并更新设备影子版本。如果**version**设置为`-1`时，表示清空设备影子数据，设备影子会接收设备端的请求，并将设备影子版本更新为`0`。 |


### 更新成功

影子文件更新后，设备影子会返回结果给设备，即发送消息到设备订阅的Topic   `/sys/${productKey}/${deviceKey}/thing/shadow/get`中。

```json
{
    "method": "reply", 
    "payload": {
        "status": "success", 
        "version": 1
    }, 
    "timestamp": 1439545671
}

```

### 更新失败

若更新失败，发送到该Topic中的消息为：

```json

{
    "method": "reply", 
    "payload": {
        "status": "error", 
        "content": {
            "errorcode": "400", 
            "errormessage": "不正确的JSON格式"
        }
    }, 
    "timestamp": 1439545671
}

```



##### 错误码说明

| errorCode | errorMessage                              |
| :-------- | :---------------------------------------- |
| 400       | 不正确的JSON格式。                        |
| 401       | 影子数据缺少**method**信息。              |
| 402       | 影子数据缺少**state**字段。               |
| 403       | 影子数据中**version**值不是数字。         |
| 404       | 影子数据缺少**reported**字段。            |
| 405       | 影子数据中 **reported**属性字段为空。     |
| 406       | 影子数据中 **method**是无效的方法。       |
| 407       | 影子内容为空。                            |
| 408       | 影子数据中**reported**属性个数超过128个。 |
| 409       | 影子版本冲突。                            |
| 500       | 服务端处理异常。                          |



## 设备主动删除影子属性

若设备端已经是最新状态，设备端可以主动发送指令，删除设备影子中保存的某条属性状态。设备发送以下内容到 `/sys/${productKey}/${deviceKey}/thing/shadow/update`主题，其中**method**为delete，属性的值为null。



###  删除影子中某一属性。

```json
{
    "method": "delete", 
    "state": {
        "reported": {
            "color": "null", 
            "temperature": "null"
        }
    }, 
    "version": 1
}
```

### 删除影子全部属性。

```json
{
    "method": "delete", 
    "state": {
        "reported": "null"
    }, 
    "version": 1
}
```



## 获取设备影子

1，订阅 topic `/sys/${productKey}/${deviceKey}/thing/shadow/get`

    设备影子更新状态到该Topic，设备订阅此Topic获取最新消息。

2，获取到的数据格式示例：

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "state": {
      "reported": {
        "temperature": 25.6,
        "humidity": 60,
        "power": "on",
        "brightness": 80
      },
      "desired": {
        "power": "off",
        "brightness": 50
      }
    },
    "metadata": {
      "reported": {
        "temperature": {
          "timestamp": 1638443922156,
          "version": 2
        },
        // ... 其他字段的元数据
      },
      "desired": {
        // ... desired字段的元数据
      }
    },
    "timestamp": 1638443922156,
    "version": 3
  }
}

```

