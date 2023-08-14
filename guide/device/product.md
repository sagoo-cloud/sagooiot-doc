# 产品管理

在使用物联网平台接入设备前，您需要在物联网平台控制台创建产品。一个产品通常是一组具有相同功能定义的设备的集合，而设备则指的是某一型号的具体单体。产品管理对具有相同功能的设备模型进行统一的维护管理，包括产品的基本信息、物模型、设备接入等功能
本文将介绍如何创建产品的具体操作。

## 产品创建


### 操作步骤
1.登录SagooIOT物联网平台。

2.在左侧导航栏，选择设备管理>产品，点击新增产品。

3.在新建弹框中，根据设备产品的实际情况，按照页面提示填写信息，然后单击确定。

### 物模型管理
在产品列表中，找到刚刚创建的新产品，点击"详情"-》物模型，需要定义产品的“属性”，"事件"和“功能”内容。这些是对设备的统一抽象，如某型号注塑机，某型号空气压缩机等。


### 发布
产品物模型设置完成，需要对产品进行发布。

## 脚本解析
当目标设备上传的数据格式与SagooIOT的数据格式不一致时，可使用此功能，通过JavaScript脚本进行解析。
![在这里插入图片描述](../../public/imgs/guide/device/p001.png)

使用内部函数parse进行解析，其中函数入参data就是原始报文。你可以在这个函数内部通过JavaScript脚本进行处理。

示例代码如下：

```javascript
function parse(data) {

    var jsonData = JSON.parse(data);
    var detectionPoint1Flow = jsonData["Device1"]["detection_point1_flow"];
    var detectionPoint1Temperatures = jsonData["Device1"]["detection_point1_temperatures"];
    var detectionPoint1FlowRate = jsonData["Device1"]["detection_point1_flowRate"];
    var detectionPoint1Pressure = jsonData["Device1"]["detection_point1_pressure"];

    var detectionPoint2Flow = jsonData["Device1"]["detection_point2_flow"];
    var detectionPoint2Temperatures = jsonData["Device1"]["detection_point2_temperatures"];
    var detectionPoint2FlowRate = jsonData["Device1"]["detection_point2_flowRate"];
    var detectionPoint2Pressure = jsonData["Device1"]["detection_point2_pressure"];

    var detectionPoint3Flow = jsonData["Device1"]["detection_point3_flow"];
    var detectionPoint3Temperatures = jsonData["Device1"]["detection_point3_temperatures"];
    var detectionPoint3FlowRate = jsonData["Device1"]["detection_point3_flowRate"];
    var detectionPoint3Pressure = jsonData["Device1"]["detection_point3_pressure"];
    
    var subCylinderTemperatures = jsonData["Device1"]["sub_cylinder_temperatures"];
    var collectingCylinderPressure = jsonData["Device1"]["collecting_cylinder_pressure"];

    var time = data["time"]

      // 定义要生成的 JSON 数据
      var sagooIotMessage = {
        "id": "123",
        "version": "1.0",
        "sys": {
        "ack": 0
        },
        "params": {
            "detection_point1_flow": {
                "value": 23.6,
                "time": 1524448722000
            },
            "detection_point1_temperatures": {
                "value": 23.6,
                "time":1524448722000
            },
            "detection_point1_flowRate": {
                "value": 23.6,
                "time":1524448722000
            },
            "detection_point1_pressure": {
                "value": 23.6,
                "time":1524448722000
            },
            "detection_point2_flow": {
                "value": 23.6,
                "time": 1524448722000
            },
            "detection_point2_temperatures": {
                "value": 23.6,
                "time":1524448722000
            },
            "detection_point2_flowRate": {
                "value": 23.6,
                "time":1524448722000
            },
            "detection_point2_pressure": {
                "value": 23.6,
                "time":1524448722000
            },
            "detection_point3_flow": {
                "value": 23.6,
                "time": 1524448722000
            },
            "detection_point3_temperatures": {
                "value": 23.6,
                "time":1524448722000
            },
            "detection_point3_flowRate": {
                "value": 23.6,
                "time":1524448722000
            },
            "detection_point3_pressure": {
                "value": 23.6,
                "time":1524448722000
            },
            "sub_cylinder_temperatures": {
                "value": 23.6,
                "time":1524448722000
            },
            "collecting_cylinder_pressure": {
                "value": 23.6,
                "time":1524448722000
            },
        },
        "method": "thing.event.property.post"
    };

    var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var idLength = 16;
    var randomId = "";
    for (var i = 0; i < idLength; i++) {
      randomId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  
    sagooIotMessage["id"] = randomId
    

    sagooIotMessage["params"]["detection_point1_flow"]["value"] = detectionPoint1Flow
    sagooIotMessage["params"]["detection_point1_flow"]["time"] = time
    sagooIotMessage["params"]["detection_point1_temperatures"]["value"] = detectionPoint1Temperatures
    sagooIotMessage["params"]["detection_point1_temperatures"]["time"] = time
    sagooIotMessage["params"]["detection_point1_flowRate"]["value"] = detectionPoint1FlowRate
    sagooIotMessage["params"]["detection_point1_flowRate"]["time"] = time
    sagooIotMessage["params"]["detection_point1_pressure"]["value"] = detectionPoint1Pressure
    sagooIotMessage["params"]["detection_point1_pressure"]["time"] = time

    sagooIotMessage["params"]["detection_point2_flow"]["value"] = detectionPoint2Flow
    sagooIotMessage["params"]["detection_point2_flow"]["time"] = time
    sagooIotMessage["params"]["detection_point2_temperatures"]["value"] = detectionPoint2Temperatures
    sagooIotMessage["params"]["detection_point2_temperatures"]["time"] = time
    sagooIotMessage["params"]["detection_point2_flowRate"]["value"] = detectionPoint2FlowRate
    sagooIotMessage["params"]["detection_point2_flowRate"]["time"] = time
    sagooIotMessage["params"]["detection_point2_pressure"]["value"] = detectionPoint2Pressure
    sagooIotMessage["params"]["detection_point2_pressure"]["time"] = time

    sagooIotMessage["params"]["detection_point3_flow"]["value"] = detectionPoint3Flow
    sagooIotMessage["params"]["detection_point3_flow"]["time"] = time
    sagooIotMessage["params"]["detection_point3_temperatures"]["value"] = detectionPoint3Temperatures
    sagooIotMessage["params"]["detection_point3_temperatures"]["time"] = time
    sagooIotMessage["params"]["detection_point3_flowRate"]["value"] = detectionPoint3FlowRate
    sagooIotMessage["params"]["detection_point3_flowRate"]["time"] = time
    sagooIotMessage["params"]["detection_point3_pressure"]["value"] = detectionPoint3Pressure
    sagooIotMessage["params"]["detection_point3_pressure"]["time"] = time

    sagooIotMessage["params"]["sub_cylinder_temperatures"]["value"] = subCylinderTemperatures
    sagooIotMessage["params"]["sub_cylinder_temperatures"]["time"] = time
    sagooIotMessage["params"]["collecting_cylinder_pressure"]["value"] = collectingCylinderPressure
    sagooIotMessage["params"]["collecting_cylinder_pressure"]["time"] = time

    return JSON.stringify(sagooIotMessage);
}

```

