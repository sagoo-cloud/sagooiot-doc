---
sidebar_position: 0
---
# 概要说明

本系统的插件支持热更新式扩展应用程序的功能

SagooIOT的插件使用Golang进行开发。通讯方式为net/rpc。

:::tip 提示
考虑到SagooIOT需要支持多个平台，所选编程语言应具备广泛的平台兼容性。
go语言可以交叉编译成多平台可执行程序。
:::

现在，让我们尝试开发一个名为`tgn52`的插件。

参见插件示例：https://github.com/sagoo-cloud/protocol-plugin-tgn52

## 一、创建工程

创建一个插件的工程，开始编写插件。在go.mod中需要引入

```
require (
	github.com/hashicorp/go-plugin v1.4.10
	github.com/sagoo-cloud/sagooiot v1.0.7
)
```

注：sagooiot的版本可以使用latest



## 二、编写插件主运行文件

协议插件必须实现Info()、Encode()、Decode()三个方法。

Decode方法中的对数据处理后，需要按SagooMQTT的数据格式返回数据。平台自动采用mqtt进行服务处理。

注意：在插件进程必须指定Impl，命名要与Info()方法中及info.json文件中的name必须相同。

## 三、编译插件

跟据需要可以直接编译，或是将编译过程写成脚自动编译。在我们的示例中已经写好可用的编译脚本，可以复制过去直接使用。

只需要修改一下脚本的第一行BINARY_NAME的值即可。

请注意，这个BINARY_NAME是插件名称，需要与插件Info()方法中设置的name，info.json中的name 要相同。

## 四、插件测试

编写测试文件，详细参考插件示例。

```go
// 测试获取插件信息
func TestProtocolInfo(t *testing.T) {
    p, err := extend.GetProtocolPlugin().GetProtocolPlugin("tgn52")
    if err != nil {
       return
    }
    t.Log(p.Info().Name)
    t.Log(p.Info().Types)
    t.Log(p.Info().HandleType)
    t.Log(p.Info())
}
```



## 五、插件安装
如果将插件安装到SagooIOT平台，为了让系统识别插件信息，需要编写一个info.json文件，与编译好的插件文件放在同一目录下，一同打包成zip文件。然后到平台的系统设置-》插件管理 进行插件上传安装。

info.json 的基础模板如下：

```json
{
  "types": "protocol",
  "handleType": "tcpServer",
  "name": "TGN52",
  "title": "TGN52",
  "description": "TGN52设备与服务通讯协议",
  "version": "0.0.1",
  "author": "microrain",
  "icon": "mdi-book",
  "link": "sagoo.cn",
  "command": "",
  "args": [""],
  "root": false,
  "frontend": {
    "ui": false,
    "url":"",
    "configuration": false
  }
}
```

## 属性

| 名称                  | 类型     | 说明                                                         | 注意事项                                                     |
| --------------------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| types                  | string   | 插件类型，可选的有protocol、notice | 系统当前支持的插件类型 |
| handleType                  | string   | 处理方式类型，可选的有：<br />"tcpServer"       //tcp服务端使用<br/>"tcpClient"       //tcp客户端使用<br/>"udpServer"       //udp服务端使用<br/>"udpClient"       //udp客户端使用<br/>"httpServer"      //http服务端使用<br/>"httpClient"      //http客户端使用<br/>"mqttServer"      //mqtt服务端使用<br/>"mqttClient"      //mqtt客户端使用<br/>"webSocketServer" //websocket服务端使用<br/>"webSocketClient" //websocket客户端使用 | 协议插件支持的网络服务处理类型 |
| name                | string   | 插件ID（即插件识别码）相当于插件的“身份证”。确保该值与文件夹名称匹配。SagooIOT 通过插件ID来区分各个插件并检测插件之间的依赖关系。在SagooIOT中加载的所有插件都应具有唯一的插件ID。如果新加载的插件与现有插件具有完全相同的插件ID，新插件将无法加载。谨慎选择插件ID。强烈建议发布插件后不要再修改插件ID。 | 要注意可能的包名冲突问题。不推荐插件名取一个与标准库或与第三方库名相同的 id，如 test，否则 SagooIOT 可能无法正常加载插件 |
| version               | string   | 插件版本                                                     |                                                              |
| description           | string   | 插件描述                                                     |                                                              |
| author                | string | 插件作者。                       |                                                              |
| link                  | string   | 插件的网址。指向插件的 github 链接。值应为一个可访问的网址   |                                                              |
| command               | string   | 插件的运行指令，如`./plugin`，`python plugin.py`，`java -jar plugin.jar`等。 |                                                              |
| args                  | string[] | 插件的指令参数                                               |                                                              |
| type                  | string   | 插件与SagooIOT的通信方式，目前可选的值只有`gRPC`与`netRPC`   |                                                              |
| icon                  | string   | 插件图标，该值为`mdi-` + [Material Design Iconsopen in new window](https://materialdesignicons.com/)上的所有可选图标代码，如`mdi-user-arrow-left-outline` |                                                              |
| rontend.ui            | bool     | 是否有插件页面                                               |                                                              |
| rontend.url           | string   | 插件页面地址                                                 |                                                              |
| rontend.configuration | bool     | 是否显示配置页面                                             |                                                              |

