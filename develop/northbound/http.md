# Http方式

## 1. 开发

### 1.1. 创建客户端选择token

1. 登录`sagoo` 系统，进入`系统配置`-> `北向客户端` -> `http` 页面，添加一个客户端
2. 添加客户端的时候，勾选所需要的api权限，勾选的api权限决定了客户端可以调用的api
3. 添加完成客户端，会自动生成一个token，鉴权采用的是`Bearer Authentication`,仅需在请求的header中添加`Authorization: Bearer ${token}`即可

### api接口列表

| api名称 | url                                 | method| api描述 |
| --- |-------------------------------------|--------------|--------------|
| 获取产品详情 | /api/v1/product/{productKey}        | GET|获取设备详情       |
| 获取设备详情 | /api/v1/device/{deviceKey}          | GET|获取设备详情       |
| 获取设备列表 | /api/v1/devices                     | GET|获取设备列表       |
| 获取设备属性 | /api/v1/device/{deviceKey}/property | GET|获取设备属性       |
| 设置设备属性 | /api/v1/device/{deviceKey}/property | POST|设置设备属性       |
| 获取设备事列表 | /api/v1/device/{deviceKey}/events   | GET|获取设备事件列表       |
| 调用设备服务 | /api/v1/device/{deviceKey}/service  | POST|调用设备服务       |


### 接口定义

#### 1.1.1. 获取产品详情

1. 请求方式：`GET`
2. 请求url：`/api/v1/product/{productKey}`
3. 请求参数：无
4. 返回参数：
```json
{
  //todo
}
```

#### 1.1.2. 获取设备详情
1. 请求方式：`GET`
2. 请求url：`/api/v1/device/{deviceKey}`
3. 请求参数：无
4. 返回参数：
```json
{
  //todo
}
```

#### 1.1.3. 获取设备列表
1. 请求方式：`GET`
2. 请求url：`/api/v1/devices`
3. 请求参数：无
4. 返回参数：
```json
{
  //todo
}
```

#### 1.1.4. 获取设备属性
1. 请求方式：`GET`
2. 请求url：`/api/v1/device/{deviceKey}/property`
3. 请求参数：无
4. 返回参数：
```json
{
  //todo
}
```

#### 1.1.5. 设置设备属性
1. 请求方式：`POST`
2. 请求url：`/api/v1/device/{deviceKey}/property`
3. 请求参数：
```json
{
  //todo
}
```
4. 返回参数：
```json
{
  //todo
}
```

#### 1.1.6. 获取设备事件列表
1. 请求方式：`GET`
2. 请求url：`/api/v1/device/{deviceKey}/events`
3. 请求参数：无
4. 返回参数：
```json
{
  //todo
}
```

#### 1.1.7. 调用设备服务
1. 请求方式：`POST`
2. 请求url：`/api/v1/device/{deviceKey}/service`
3. 请求参数：
```json
{
  //todo
}
```
4. 返回参数：
```json
{
  //todo
}
```
