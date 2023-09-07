# 远程配置管理
通过物联网平台提供的远程配置功能，开发人员可在不用重启设备或中断设备运行的情况下，在线远程更新设备的系统参数、网络参数等配置信息。
远程配置功能是从产品维度修改设备配置，即从物联网平台上传的配置文件对所有设备生效，不可指定对单个设备生效。、

## 前提条件
设备端已支持远程配置服务。设备主动请求配置信息和物联网平台推送配置信息的Topic及数据格式说明，请参见远程配置。





# 基于mqtt协议的远程配置

本文档介绍设备主动请求配置信息和物联网平台推送配置信息的Topic及数据格式。

## 设备主动请求

**上行**

* 请求Topic：/sys/${productKey}/${deviceKey}/thing/config/get
* 响应Topic：/sys/${productKey}/${deviceKey}/thing/config/get_reply

**请求数据格式**

```json
{
  "id": 123,
  "version": "1.0",
  "sys":{
      "ack":0
  },
  "params": {
    "configScope": "product",
    "getType": "file"
  },
  "method": "thing.config.get"
}
```
**响应数据格式**

```json
{
  "id": "123",
  "version": "1.0",
  "code": 200,
  "data": {
    "configId": "123dagdah",
    "configSize": 1234565,
    "sign": "123214adfadgadg",
    "signMethod": "Sha256",
    "url": "XXXXXX文件地址",
    "getType": "file"
  }
}
```
**参数说明**

| 参数              | 类型    | 说明                                                         |
| :---------------- | :------ | :----------------------------------------------------------- |
| `**id**`          | String  | 消息ID号。String类型的数字，取值范围0~4294967295，且每个消息ID在当前设备中具有唯一性。 |
| `**version**`     | String  | 协议版本号，目前协议版本号唯一取值为1.0。                    |
| `**sys**`         | Object  | 扩展功能的参数，其下包含各功能字段。**说明** 使用设备端SDK开发时，如果未设置扩展功能，则无此参数，相关功能保持默认配置。 |
| `**ack**`         | Integer | `**sys**`下的扩展功能字段，表示是否返回响应数据。1：云端返回响应数据。0：云端不返回响应数据。**重要** 如果未配置该功能，则无此参数，云端默认返回响应数据。 |
| `**configScope**` | String  | 配置范围， 目前只支持产品维度配置。 取值：product。          |
| `**getType**`     | String  | 获取配置类型。 目前支持文件类型，取值：file。                |
| `**method**`      | String  | 请求方法，取值：thing.config.get。                           |
| `**configId**`    | String  | 配置文件的ID。                                               |
| `**configSize**`  | Long    | 配置文件大小，按字节计算。                                   |
| `**sign**`        | String  | 签名。                                                       |
| `**signMethod**`  | String  | 签名方法，仅支持Sha256。                                     |
| `**url**`         | String  | 存储配置文件的对象存储（OSS）地址。                          |
| `**code**`        | Integer | 结果码。返回200表示成功，返回其他状态码，表示失败。          |

**错误码**

| 错误码 | 消息                                   | 描述                                                         |
| :----- | :------------------------------------- | :----------------------------------------------------------- |
| 6713   | thing config function is not available | 产品的远程配置功能不可用，需要在[物联网平台控制台](http://iot.console.aliyun.com/)，对应实例的监控运维 > 远程配置打开配置开关。 |
| 6710   | no data                                | 没有配置的数据。                                             |

## 配置推送

**下行**

- 请求Topic：`/sys/${productKey}/${deviceName}/thing/config/push`
- 响应Topic：`/sys/${productKey}/${deviceName}/thing/config/push_reply`

设备订阅该Topic后，您在物联网控制台批量推送配置信息时，物联网平台采用异步推送方式向设备推送信息。

**请求数据格式：**

```json
{
  "id": "123",
  "version": "1.0",
  "params": {
    "configId": "123dagdah",
    "configSize": 1234565,
    "sign": "123214adfadgadg",
    "signMethod": "Sha256",
    "url": "XXXXXX文件地址",
    "getType": "file"
  },
  "method": "thing.config.push"
}
```

**响应数据格式**

```json
{
  "id": "123",
  "code": 200,
  "data": {}
}
```

**参数说明：**

| 参数              | 类型    | 说明                                                         |
| :---------------- | :------ | :----------------------------------------------------------- |
| `**id**`          | String  | 消息ID号。String类型的数字，取值范围0~4294967295，且每个消息ID在当前设备中具有唯一性 |
| `**version**`     | String  | 协议版本号，目前协议版本号唯一取值为1.0。                    |
| `**configScope**` | String  | 配置范围， 目前只支持产品维度配置。 取值：product。          |
| `**getType**`     | String  | 获取配置类型，目前支持文件类型，取值：file。                 |
| `**configId**`    | String  | 配置的ID。                                                   |
| `**configSize**`  | Long    | 配置大小，按字节计算。                                       |
| `**sign**`        | String  | 签名。                                                       |
| `**signMethod**`  | String  | 签名方法，仅支持sha256。                                     |
| `**url**`         | String  | 存储配置文件的对象存储（OSS）地址。                          |
| `**method**`      | String  | 请求方法，取值：thing.config.push。                          |
| `**code**`        | Integer | 结果信息， 具体请参见设备端通用code                          |



## 设备端通用code

设备通用code信息，用于表达云端下行推送时设备侧业务处理的返回结果。

| 错误码        | 消息                    | 描述                                                         |
| :------------ | :---------------------- | :----------------------------------------------------------- |
| 200           | success                 | 请求成功。                                                   |
| 400           | request error           | 内部服务错误， 处理时发生内部错误                            |
| 460           | request parameter error | 请求参数错误， 设备入参校验失败                              |
| 429           | too many requests       | 请求过于频繁，设备端处理不过来时可以使用                     |
| 100000-110000 | 自定义的错误信息        | 从100000到110000的错误码用于设备自定义错误信息，和云端错误信息加以区分 |
