
# Http方式


## 认证鉴权

1. 登录`sagoo` 系统，进入`系统配置`-> `基础配置` 查找下面两个的值，分别对应`SK`和`AK`
    - `开放接口AK`: `Ak`
    - `开放接口SK`: `SK`
2. 参照[AK/SK认证过程](https://iotdoc.sagoo.cn/develop/base-api/openapi/start.html) 针对请求进行鉴权

## api接口列表

***注意事项:其中`domain`根据实际配置来定，因为有时会为了前端后端使用统一域名对url进行重写，比如加上`/base-api`这个时候对应的也要加上前缀，比如原本的`https://{domain}/base-api/openapi`就变成了`https://{domain}/base-api/base-api/openapi`***

1. domain: 为api服务的域名
2. productId: 产品id
3. deviceId: 设备id

| api名称  | url                                                          | method| api描述    |
|--------|--------------------------------------------------------------|--------------|----------|
| 获取产品详情 | https://{domain}/base-api/openapi/v1/north/product/detail?id={productId}  | GET| 获取产品详情   |
| 获取设备详情 | https://{domain}/base-api/openapi/v1/north/device/detail?id={deviceId} | GET| 获取设备详情   |
| 获取设备列表 | https://{domain}/base-api/openapi/v1/north/device/list?id={productId} | GET| 获取设备列表   |
| 获取设备属性 | https://{domain}/base-api/openapi/v1/north/device/property/list         | GET| 获取设备属性   |
| 设置设备属性 | https://{domain}/base-api/openapi/v1/north/property/set            | POST| 设置设备属性   |
| 获取事件列表 | https://{domain}/base-api/openapi/v1/north/tsl/event/all?key={keyword} | GET| 获取产品事件列表 |
| 调用设备服务 | https://{domain}/base-api/openapi/v1/north/function/do              | POST| 调用设备服务   |


## 接口定义

### 获取产品详情

1. 请求方式：`GET`
2. 请求url：`https://{domain}/base-api/openapi/v1/north/product/detail?id={productId}`
3. 请求参数：

   | 参数名称 | 是否必传 | 类型 | 描述   |
      | :--- | :--- | :--- |:-----|
   | id| 是 | int | 产品id |

4. 返回参数：
详细参数定义参见 [DetailProductOutput](https://github.com/sagoo-cloud/sagooiot/blob/main/internal/model/dev_product.go)
```json
{
   "code": 0,
   "message": "string",
   "data": {
      "data": {
         "id": 0,
         "key": "string",
         "name": "string",
         "categoryId": 0,
         "messageProtocol": "string",
         "transportProtocol": "string",
         "protocolId": 0,
         "deviceType": "string",
         "desc": "string",
         "icon": "string",
         "metadata": "string",
         "metadataTable": 0,
         "policy": "string",
         "status": 0,
         "authType": 0,
         "authUser": "string",
         "authPasswd": "string",
         "accessToken": "string",
         "certificateId": 0,
         "scriptInfo": "string",
         "createBy": 0,
         "updateBy": 0,
         "deletedBy": 0,
         "createdAt": "string",
         "updatedAt": "string",
         "deletedAt": "string",
         "deviceTotal": 0,
         "categoryName": "string",
         "category": {
            "id": 0,
            "name": "string"
         },
         "tsl": {
            "key": "string",
            "name": "string",
            "properties": [
               {
                  "key": "string",
                  "name": "string",
                  "accessMode": 0,
                  "valueType": {
                     "type": "string",
                     "max,omitempty": 0,
                     "min,omitempty": 0,
                     "decimals,omitempty": 0,
                     "unit,omitempty": "string",
                     "trueText,omitempty": "string",
                     "falseText,omitempty": "string",
                     "trueValue,omitempty": true,
                     "falseValue,omitempty": true,
                     "maxLength,omitempty": 0,
                     "elements,omitempty": [
                        {
                           "value": "string",
                           "text": "string"
                        }
                     ],
                     "elementType,omitempty": {
                        "type": "string",
                        "max,omitempty": 0,
                        "min,omitempty": 0,
                        "decimals,omitempty": 0,
                        "unit,omitempty": "string",
                        "trueText,omitempty": "string",
                        "falseText,omitempty": "string",
                        "trueValue,omitempty": true,
                        "falseValue,omitempty": true,
                        "maxLength,omitempty": 0,
                        "elements,omitempty": [
                           {}
                        ],
                        "elementType,omitempty": {},
                        "properties,omitempty": [
                           {}
                        ]
                     },
                     "properties,omitempty": [
                        {
                           "key": "string",
                           "name": "string",
                           "valueType": {},
                           "desc": "string"
                        }
                     ]
                  },
                  "desc": "string"
               }
            ],
            "functions": [
               {
                  "key": "string",
                  "name": "string",
                  "inputs": [
                     {
                        "key": "string",
                        "name": "string",
                        "valueType": {
                           "type": "string",
                           "max,omitempty": 0,
                           "min,omitempty": 0,
                           "decimals,omitempty": 0,
                           "unit,omitempty": "string",
                           "trueText,omitempty": "string",
                           "falseText,omitempty": "string",
                           "trueValue,omitempty": true,
                           "falseValue,omitempty": true,
                           "maxLength,omitempty": 0,
                           "elements,omitempty": [
                              null
                           ],
                           "elementType,omitempty": {
                              "elements,omitempty": [],
                              "properties,omitempty": []
                           },
                           "properties,omitempty": [
                              null
                           ]
                        },
                        "desc": "string"
                     }
                  ],
                  "outputs": [
                     {
                        "key": "string",
                        "name": "string",
                        "valueType": {
                           "type": "string",
                           "max,omitempty": 0,
                           "min,omitempty": 0,
                           "decimals,omitempty": 0,
                           "unit,omitempty": "string",
                           "trueText,omitempty": "string",
                           "falseText,omitempty": "string",
                           "trueValue,omitempty": true,
                           "falseValue,omitempty": true,
                           "maxLength,omitempty": 0,
                           "elements,omitempty": [
                              null
                           ],
                           "elementType,omitempty": {
                              "elements,omitempty": [],
                              "properties,omitempty": []
                           },
                           "properties,omitempty": [
                              null
                           ]
                        },
                        "desc": "string"
                     }
                  ],
                  "desc": "string"
               }
            ],
            "events": [
               {
                  "key": "string",
                  "name": "string",
                  "level": 0,
                  "outputs": [
                     {
                        "key": "string",
                        "name": "string",
                        "valueType": {
                           "type": "string",
                           "max,omitempty": 0,
                           "min,omitempty": 0,
                           "decimals,omitempty": 0,
                           "unit,omitempty": "string",
                           "trueText,omitempty": "string",
                           "falseText,omitempty": "string",
                           "trueValue,omitempty": true,
                           "falseValue,omitempty": true,
                           "maxLength,omitempty": 0,
                           "elements,omitempty": [
                              null
                           ],
                           "elementType,omitempty": {
                              "elements,omitempty": [],
                              "properties,omitempty": []
                           },
                           "properties,omitempty": [
                              null
                           ]
                        },
                        "desc": "string"
                     }
                  ],
                  "desc": "string"
               }
            ],
            "tags": [
               {
                  "key": "string",
                  "name": "string",
                  "accessMode": 0,
                  "valueType": {
                     "type": "string",
                     "max,omitempty": 0,
                     "min,omitempty": 0,
                     "decimals,omitempty": 0,
                     "unit,omitempty": "string",
                     "trueText,omitempty": "string",
                     "falseText,omitempty": "string",
                     "trueValue,omitempty": true,
                     "falseValue,omitempty": true,
                     "maxLength,omitempty": 0,
                     "elements,omitempty": [
                        {
                           "value": "string",
                           "text": "string"
                        }
                     ],
                     "elementType,omitempty": {
                        "type": "string",
                        "max,omitempty": 0,
                        "min,omitempty": 0,
                        "decimals,omitempty": 0,
                        "unit,omitempty": "string",
                        "trueText,omitempty": "string",
                        "falseText,omitempty": "string",
                        "trueValue,omitempty": true,
                        "falseValue,omitempty": true,
                        "maxLength,omitempty": 0,
                        "elements,omitempty": [
                           {}
                        ],
                        "elementType,omitempty": {},
                        "properties,omitempty": [
                           {}
                        ]
                     },
                     "properties,omitempty": [
                        {
                           "key": "string",
                           "name": "string",
                           "valueType": {},
                           "desc": "string"
                        }
                     ]
                  },
                  "desc": "string"
               }
            ]
         }
      }
   }
}
```

### 获取设备详情
1. 请求方式：`GET`
2. 请求url：`https://{domain}/base-api/openapi/v1/north/device/detail?id={deviceId}`
3. 请求参数：

   | 参数名称 | 是否必传 | 类型 | 描述   |
      | :--- | :--- | :--- |:-----|
   | id| 是 | int | 设备id |

4. 返回参数：
   详细参数定义参见 [DeviceOutput](https://github.com/sagoo-cloud/sagooiot/blob/main/internal/model/dev_device.go)
```json
{
   "code": 0,
   "message": "string",
   "data": {
      "data": {
         "id": 0,
         "key": "string",
         "name": "string",
         "productId": 0,
         "desc": "string",
         "metadataTable": 0,
         "status": 0,
         "onlineTimeout": 0,
         "registryTime": "string",
         "lastOnlineTime": "string",
         "version": "string",
         "tunnelId": 0,
         "lng": "string",
         "lat": "string",
         "authType": 0,
         "authUser": "string",
         "authPasswd": "string",
         "accessToken": "string",
         "certificateId": 0,
         "createBy": 0,
         "updateBy": 0,
         "deletedBy": 0,
         "createdAt": "string",
         "updatedAt": "string",
         "deletedAt": "string",
         "productName": "string",
         "tsl": {
            "key": "string",
            "name": "string",
            "properties": [
               {
                  "key": "string",
                  "name": "string",
                  "accessMode": 0,
                  "valueType": {
                     "type": "string",
                     "max": 0,
                     "min": 0,
                     "decimals": 0,
                     "unit": "string",
                     "trueText": "string",
                     "falseText": "string",
                     "trueValue": true,
                     "falseValue": true,
                     "maxLength": 0,
                     "elements": [
                        {
                           "value": "string",
                           "text": "string"
                        }
                     ],
                     "elementType": {
                        "type": "string",
                        "max": 0,
                        "min": 0,
                        "decimals": 0,
                        "unit": "string",
                        "trueText": "string",
                        "falseText": "string",
                        "trueValue": true,
                        "falseValue": true,
                        "maxLength": 0,
                        "elements": [
                           {}
                        ],
                        "elementType": {},
                        "properties": [
                           {}
                        ]
                     },
                     "properties": [
                        {
                           "key": "string",
                           "name": "string",
                           "valueType": {},
                           "desc": "string"
                        }
                     ]
                  },
                  "desc": "string"
               }
            ],
            "functions": [
               {
                  "key": "string",
                  "name": "string",
                  "inputs": [
                     {
                        "key": "string",
                        "name": "string",
                        "valueType": {
                           "type": "string",
                           "max": 0,
                           "min": 0,
                           "decimals": 0,
                           "unit": "string",
                           "trueText": "string",
                           "falseText": "string",
                           "trueValue": true,
                           "falseValue": true,
                           "maxLength": 0,
                           "elements": [
                              null
                           ],
                           "elementType": {
                              "elements": [],
                              "properties": []
                           },
                           "properties": [
                              null
                           ]
                        },
                        "desc": "string"
                     }
                  ],
                  "outputs": [
                     {
                        "key": "string",
                        "name": "string",
                        "valueType": {
                           "type": "string",
                           "max": 0,
                           "min": 0,
                           "decimals": 0,
                           "unit": "string",
                           "trueText": "string",
                           "falseText": "string",
                           "trueValue": true,
                           "falseValue": true,
                           "maxLength": 0,
                           "elements": [
                              null
                           ],
                           "elementType": {
                              "elements": [],
                              "properties": []
                           },
                           "properties": [
                              null
                           ]
                        },
                        "desc": "string"
                     }
                  ],
                  "desc": "string"
               }
            ],
            "events": [
               {
                  "key": "string",
                  "name": "string",
                  "level": 0,
                  "outputs": [
                     {
                        "key": "string",
                        "name": "string",
                        "valueType": {
                           "type": "string",
                           "max": 0,
                           "min": 0,
                           "decimals": 0,
                           "unit": "string",
                           "trueText": "string",
                           "falseText": "string",
                           "trueValue": true,
                           "falseValue": true,
                           "maxLength": 0,
                           "elements": [
                              null
                           ],
                           "elementType": {
                              "elements": [],
                              "properties": []
                           },
                           "properties": [
                              null
                           ]
                        },
                        "desc": "string"
                     }
                  ],
                  "desc": "string"
               }
            ],
            "tags": [
               {
                  "key": "string",
                  "name": "string",
                  "accessMode": 0,
                  "valueType": {
                     "type": "string",
                     "max": 0,
                     "min": 0,
                     "decimals": 0,
                     "unit": "string",
                     "trueText": "string",
                     "falseText": "string",
                     "trueValue": true,
                     "falseValue": true,
                     "maxLength": 0,
                     "elements": [
                        {
                           "value": "string",
                           "text": "string"
                        }
                     ],
                     "elementType": {
                        "type": "string",
                        "max": 0,
                        "min": 0,
                        "decimals": 0,
                        "unit": "string",
                        "trueText": "string",
                        "falseText": "string",
                        "trueValue": true,
                        "falseValue": true,
                        "maxLength": 0,
                        "elements": [
                           {}
                        ],
                        "elementType": {},
                        "properties": [
                           {}
                        ]
                     },
                     "properties": [
                        {
                           "key": "string",
                           "name": "string",
                           "valueType": {},
                           "desc": "string"
                        }
                     ]
                  },
                  "desc": "string"
               }
            ]
         },
         "product": {
            "id": 0,
            "name": "string",
            "key": "string",
            "metadata": "string",
            "deviceType": "string"
         },
         "tags": [
            {
               "id": 0,
               "deviceId": 0,
               "key": "string",
               "name": "string",
               "value": "string"
            }
         ]
      }
   }
}
```

### 取设备列表
1. 请求方式：`GET`
2. 请求url：`https://{domain}/base-api/openapi/v1/north/device/list?id={productId}`
3. 请求参数：

   | 参数名称 | 是否必传 | 类型 | 描述   |
   | :--- | :--- | :--- |:-----|
   | id| 是 | int | 产品id |
4. 返回参数：
详细参数定义参见 [DeviceOutput](https://github.com/sagoo-cloud/sagooiot/blob/main/internal/model/dev_device.go)
```json
{
  "code": 0,
  "message": "string",
  "data": {
    "device": [
      {
        "id": 0,
        "key": "string",
        "name": "string",
        "productId": 0,
        "desc": "string",
        "metadataTable": 0,
        "status": 0,
        "onlineTimeout": 0,
        "registryTime": "string",
        "lastOnlineTime": "string",
        "version": "string",
        "tunnelId": 0,
        "lng": "string",
        "lat": "string",
        "authType": 0,
        "authUser": "string",
        "authPasswd": "string",
        "accessToken": "string",
        "certificateId": 0,
        "createBy": 0,
        "updateBy": 0,
        "deletedBy": 0,
        "createdAt": "string",
        "updatedAt": "string",
        "deletedAt": "string",
        "productName": "string",
        "tsl": {
          "key": "string",
          "name": "string",
          "properties": [
            {
              "key": "string",
              "name": "string",
              "accessMode": 0,
              "valueType": {
                "type": "string",
                "max": 0,
                "min": 0,
                "decimals": 0,
                "unit": "string",
                "trueText": "string",
                "falseText": "string",
                "trueValue": true,
                "falseValue": true,
                "maxLength": 0,
                "elements": [
                  {}
                ],
                "elementType": {
                  "type": "string",
                  "max": 0,
                  "min": 0,
                  "decimals": 0,
                  "unit": "string",
                  "trueText": "string",
                  "falseText": "string",
                  "trueValue": true,
                  "falseValue": true,
                  "maxLength": 0,
                  "elements": [
                    null
                  ],
                  "elementType": {},
                  "properties": [
                    null
                  ]
                },
                "properties": [
                  {}
                ]
              },
              "desc": "string"
            }
          ],
          "functions": [
            {
              "key": "string",
              "name": "string",
              "inputs": [
                {
                  "key": "string",
                  "name": "string",
                  "valueType": {
                    "elements": [],
                    "properties": []
                  },
                  "desc": "string"
                }
              ],
              "outputs": [
                {
                  "key": "string",
                  "name": "string",
                  "valueType": {
                    "elements": [],
                    "properties": []
                  },
                  "desc": "string"
                }
              ],
              "desc": "string"
            }
          ],
          "events": [
            {
              "key": "string",
              "name": "string",
              "level": 0,
              "outputs": [
                {
                  "key": "string",
                  "name": "string",
                  "valueType": {
                    "elements": [],
                    "properties": []
                  },
                  "desc": "string"
                }
              ],
              "desc": "string"
            }
          ],
          "tags": [
            {
              "key": "string",
              "name": "string",
              "accessMode": 0,
              "valueType": {
                "type": "string",
                "max": 0,
                "min": 0,
                "decimals": 0,
                "unit": "string",
                "trueText": "string",
                "falseText": "string",
                "trueValue": true,
                "falseValue": true,
                "maxLength": 0,
                "elements": [
                  {}
                ],
                "elementType": {
                  "type": "string",
                  "max": 0,
                  "min": 0,
                  "decimals": 0,
                  "unit": "string",
                  "trueText": "string",
                  "falseText": "string",
                  "trueValue": true,
                  "falseValue": true,
                  "maxLength": 0,
                  "elements": [
                    null
                  ],
                  "elementType": {},
                  "properties": [
                    null
                  ]
                },
                "properties": [
                  {}
                ]
              },
              "desc": "string"
            }
          ]
        },
        "product": {
          "id": 0,
          "name": "string",
          "key": "string",
          "metadata": "string",
          "deviceType": "string"
        },
        "tags": [
          {
            "id": 0,
            "deviceId": 0,
            "key": "string",
            "name": "string",
            "value": "string"
          }
        ]
      }
    ]
  }
}
```

### 获取设备属性
1. 请求方式：`GET`
2. 请求url：`https://{domain}/base-api/openapi/v1/device/property/list`
3. 请求参数：
   
      | 参数名称 | 是否必传 | 类型 | 描述 |
      | :--- | :--- | :--- | :--- |
      | id| 是 | int | 设备id |
      |propertyKey| 否 | string | 属性key |
      |keyWord| 否 | string | 模糊搜索关键字 |
      |DateRange| 否 | []string | 时间范围 |
      |OrderBy| 否 | string | 排序字段 |
      |pageNum| 否 | int | 分页号码，默认1 |
      |PageSize| 否 | int | 分页大小，默认10,分页数量，最大50 |

4. 返回参数：
详细参数定义参见 [DeviceGetPropertyListOutput](https://github.com/sagoo-cloud/sagooiot/blob/main/internal/model/dev_device.go)
```json
{
   "code": 0,
   "message": "string",
   "data": {
      "List": [
         {
            "ts": "string",
            "value": {}
         }
      ],
      "currentPage": 0,
      "Total": 0
   }
}
```

#### 1.1.3.5. 设置设备属性
1. 请求方式：`POST`
2. 请求url：`https://{domain}/base-api/openapi/v1/north/product/property/set `
3. 请求参数：
详细参数定义参见[DevicePropertyInput](https://github.com/sagoo-cloud/sagooiot/blob/main/internal/model/dev_device_property.go)
```json
{
   "deviceKey": "string",
   "params": {
      "property1": {},
      "property2": {}
   }
}
```
4. 返回参数：
详细参数定义参见[DevicePropertyOutput](https://github.com/sagoo-cloud/sagooiot/blob/main/internal/model/dev_device_property.go)
```json
{
   "code": 0,
   "message": "string",
   "data": {
      "data": {
         "property1": {},
         "property2": {}
      }
   }
}
```

### 获取设备事件列表
1. 请求方式：`GET`
2. 请求url：`https://{domain}/base-api/openapi/v1/north/tsl/event/all?key={keyword}`
3. 请求参数：
4. 
   | 参数名称 | 是否必传 | 类型       | 描述                  |
   | :--- | :--- |:---------|:--------------------|
   | key| 是 | string     | 事件关键字               |

5. 返回参数：
详细参数定义参见 [AllTSLPropertyRes](https://github.com/sagoo-cloud/sagooiot/blob/main/api/v1/north/product/tsl.go)
```json
{
   "code": 0,
   "message": "string",
   "data": {
      "Data": [
         {
            "key": "string",
            "name": "string",
            "level": 0,
            "outputs": [
               {
                  "key": "string",
                  "name": "string",
                  "valueType": {
                     "type": "string",
                     "max": 0,
                     "min": 0,
                     "decimals": 0,
                     "unit": "string",
                     "trueText": "string",
                     "falseText": "string",
                     "trueValue": true,
                     "falseValue": true,
                     "maxLength": 0,
                     "elements": [
                        {
                           "value": "string",
                           "text": "string"
                        }
                     ],
                     "elementType": {
                        "type": "string",
                        "max": 0,
                        "min": 0,
                        "decimals": 0,
                        "unit": "string",
                        "trueText": "string",
                        "falseText": "string",
                        "trueValue": true,
                        "falseValue": true,
                        "maxLength": 0,
                        "elements": [
                           {}
                        ],
                        "elementType": {},
                        "properties": [
                           {}
                        ]
                     },
                     "properties": [
                        {
                           "key": "string",
                           "name": "string",
                           "valueType": {},
                           "desc": "string"
                        }
                     ]
                  },
                  "desc": "string"
               }
            ],
            "desc": "string"
         }
      ]
   }
}
```

### 调用设备服务
1. 请求方式：`POST`
2. 请求url：`https://{domain}/base-api/openapi/v1/north/function/do`
3. 请求参数：
详细参数定义参见[DeviceFunctionReq](https://github.com/sagoo-cloud/sagooiot/tree/main/api/v1/north/product/device_function.go)
```json
{
   "deviceKey": "string",
   "funcKey": "string",
   "params": {
      "property1": {},
      "property2": {}
   }
}
```
4. 返回参数：
   详细参数定义参见[DeviceFunctionRes](https://github.com/sagoo-cloud/sagooiot/tree/main/api/v1/north/product/device_function.go)
```json
{
   "code": 0,
   "message": "string",
   "data": {
      "data": {
         "property1": {},
         "property2": {}
      }
   }
}
```
