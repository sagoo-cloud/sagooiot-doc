# 设备数据解析

SagooIoT 对mqtt设备的支持是采有自己的数据格式，如果您的设备数据格式与SagooIoT的数据格式不一致，您可以通过数据解析功能进行解析。

## 脚本解析说明
当目标设备上传的数据格式与SagooIOT的数据格式不一致时，可使用此功能，通过JavaScript脚本进行解析。
![在这里插入图片描述](../imgs/device/p001.png)

使用内部函数parse进行解析，其中函数入参data就是原始报文。你可以在这个函数内部通过JavaScript脚本进行处理。

## 示例代码

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

## 脚本调试


