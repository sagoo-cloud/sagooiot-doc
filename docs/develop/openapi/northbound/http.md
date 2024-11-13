
# Http方式


## 认证鉴权

1. 登录`sagoo` 系统，进入[应用管理](../../../docs/config/application)创建对应的应用
2. 参照[AK/SK认证过程](../authority/start.md) 针对请求进行鉴权

## api接口列表

***注意事项:其中`domain`根据实际配置来定，因为有时会为了前端后端使用统一域名对url进行重写，比如加上`/base-api`这个时候对应的也要加上前缀，比如原本的`https://{domain}/base-api/openapi`就变成了`https://{domain}/base-api/base-api/openapi`***

1. yourdomain.com: 为api服务的域名
2. productId: 产品id
3. deviceId: 设备id

| api名称  | url                                                                           | method | api描述    |
|--------|-------------------------------------------------------------------------------|--------|----------|
| 获取产品详情 | https://yourdomain.com/base-api/openapi/v1/north/product/detail?id={productId}      | GET    | 获取产品详情   |
| 获取设备详情 | https://yourdomain.com/base-api/openapi/v1/north/device/detail?deviceKey={deviceKey} | GET    | 获取设备详情   |
| 获取设备列表 | https://yourdomain.com/base-api/openapi/v1/north/device/list?id={productId}         | GET    | 获取设备列表   |
| 获取设备属性 | https://yourdomain.com/base-api/openapi/v1/north/device/property/list               | GET    | 获取设备属性   |
| 设置设备属性 | https://yourdomain.com/base-api/openapi/v1/north/property/set                       | POST   | 设置设备属性   |
| 获取事件列表 | https://yourdomain.com/base-api/openapi/v1/north/tsl/event/all?productKey={productKey} | GET    | 获取产品事件列表 |
| 调用设备服务 | https://yourdomain.com/base-api/openapi/v1/north/function/do                         | POST   | 调用设备服务   |
| 设备获取升级包信息 | https://yourdomain.com/base-api/openapi/v1/north/get_ota_info                        | GET    | 设备获取升级包信息   |


## 接口定义

### 获取产品详情

1. 请求方式：`GET`
2. 请求url：`https://{yourdomain}/base-api/openapi/v1/north/product/detail?id={productId}`
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
2. 请求url：`https://{domain}/base-api/openapi/v1/north/device/detail?deviceKey={deviceKey}`
3. 请求参数：

   | 参数名称 | 是否必传 | 类型     | 描述    |
      | :--- | :--- |:-------|:------|
   | deviceKey| 是 | string | 设备key |

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
   
      | 参数名称        | 是否必传 | 类型       | 描述                  |
      |:------------|:-----|:---------|:--------------------|
      | deviceKey   | 是    | string   | 设备标识key             |
      | propertyKey | 是    | string   | 属性key               |
      | keyWord     | 否    | string   | 模糊搜索关键字             |
      | DateRange   | 否    | []string | 时间范围                |
      | OrderBy     | 否    | string   | 排序字段                |
      | pageNum     | 否    | int      | 分页号码，默认1            |
      | PageSize    | 否    | int      | 分页大小，默认10,分页数量，最大50 |

4. 返回参数：
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
2. 请求url：`https://{domain}/base-api/openapi/v1/north/tsl/event/all?productKey={productKey}`
3. 请求参数：
4. 
   | 参数名称       | 是否必传 | 类型       | 描述   |
   |:-----------| :--- |:---------|:-----|
   | productKey | 是 | string     | 产品标识 |

5. 返回参数：
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

### 设备获取升级包信息
1. 请求方式：`GET`
2. 请求url：`https://{domain}/base-api/openapi/v1/north/get_ota_info`
3. 请求参数：
```json
{
   "deviceKey": "string"
}
```
4. 返回参数：
```json
{
  "code": 0,
  "message": "",
  "data": [
    {
      "url": "https://{domain}/base-api/upload_file/2024-01-20/cyjlvk9eusn4p7invt.png",
      "version": "1.0.1",
      "module": "20",
      "sign": "",
      "signMethod": "MD5",
      "size": 0,
      "extData": {
        "strategy": 28
      }
    }
  ]
}
```
