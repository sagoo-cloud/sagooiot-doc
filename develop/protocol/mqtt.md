# MQTT 开发

在本系统中所有的设备都是通过MQTT进行接入的。不同的协议可以通过插件的扩充进行转换。


**设备上报数据如下：**

## 流程

1. 创建好物物模型
2. 创建好产品，关联下面属性
    1. 上面创建好的物物模型
    2. 并且选择好自定义协议，如果是默认的数据结构，则留空
    3. 选择支持的网络协议(`mqtt`,`tcp`,`udp`)
        1. `mqtt`
            1. 获取上报的`mqtt`地址,数据上报`topic`为 `device/{productKey}/{deviceKey}`
            2. 默认的数据结构格式如下
               ```json
               {
                 "return_time": "",
                 "data_type": "",
                 "device_key": "",
                 "data": {
                   "key": {}
                 }
               }
               ```
                1. `return_time` 上报时间，时间为时间戳，单位为毫秒
                2. `data_type` 上报数据类型，目前仅仅支持下面的几种
                    1. `property_report`
                3. `device_key` 设备key，字符串类型
                4. `data` 为上报的数据，对应的value是kv格式的信息
        2. `tcp`,`udp`
            1. 产品信息配置好心跳包，注册包



## mqtt

流程图



