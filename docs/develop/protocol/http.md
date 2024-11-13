---
sidebar_position: 11
---
# HTTP 协议

`Sagoo Http协议`是基于`HTTP`协议的一种数据交换规范，用于设备端和物联网平台的双向通信。规范了设备端和物联网平台之间的业务数据交互。

## 认证鉴权

1. 登录`sagoo` 系统，进入`系统配置`-> `基础配置` 查找下面两个的值，分别对应`SK`和`AK`
    - `开放接口AK`: `Ak`
    - `开放接口SK`: `SK`
2. 参照[AK/SK认证过程](../openapi/authority/start.md) 针对请求进行鉴权

## 协议接口列表

OTA相关

设备获取升级包信息

请求url:`https://{domain}/base-api/openapi/v1/ota/get_ota_info`

上报升级进度信息

请求url:`https://{domain}/base-api/openapi/v1/ota/write_ota_info`

## OTA相关

## OTA相关-设备获取升级包信息

1. 请求url: `https://{domain}/base-api/openapi/v1/ota/get_ota_info`
2. 请求method: GET
3. application_type: application/json
4. 请求参数

| 参数名       | 类型     | 必填 | 说明             |
|-----------|--------|----|----------------|
| deviceKey | string | 是  | 设备key          |
| version   | string | 是  | 设备模块当前版本号      |
| module    | string | 是  | OTA模块名称，类型为字符串 |

5. 响应:

```json
{
  "code": 0,
  "message": "",
  "data": {
    "url": "http://so.com",
    "version": "1.0.3",
    "module": "default",
    "sign": "123",
    "signMethod": "md5",
    "extData": {
      "strategy": 25
    }
  }
}
```

字段说明

1. code: 应答码，200表示成功，其他表示失败。
2. message: 结果信息
3. url: 升级包下载地址，类型为字符串,OTA升级包中仅有一个升级包文件，且下载协议为HTTPS时，包含该参数。
4. version: 设备升级包的版本信息
5. sign: OTA升级包文件的签名。OTA升级包中仅有一个升级包文件时，包含该参数。
6. signMethod: 签名方法。取值：SHA256 MD5 对于Android差分升级包类型，仅支持MD5签名方法。
7. module: 升级包所属的模块名。模块名为default时，物联网平台不下发module参数。
8. extData: 扩展数据，类型为json字符串,升级批次标签列表和推送给设备的自定义信息。_package_udi表示自定义信息的字段。单个标签格式："key":"value"


## OTA相关-上报升级进度信息

1. 请求Topic: `https://{domain}/base-api/openapi/v1/ota/write_ota_info`
2. 请求method: POST
3. application_type: application/json
4. 请求参数
    ```json
   {
      "params": {
        "deviceKey": "deviceKey", 
        "step": "-1",
        "strategy": "1"
      }
   }
    ```
   字段说明
    1. deviceKey: 设备key，设备唯一标识
    2. step: OTA升级进度，类型为字符串.取值范围如下
        1. 1~100的整数：升级进度百分比。
        2. -1：升级失败。
        3. -2：下载失败。
        4. -3：校验失败。
        5. -4：烧写失败。
    4. strategy: OTA批次ID
5. 响应
    ```json
    {
      "code": 0,
      "message": ""
    }
    ```
   字段说明
    1. code: 应答码，200表示成功，其他表示失败。
    2. message: 结果信息

