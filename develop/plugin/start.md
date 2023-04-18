# 插件开发说明

本系统的插件支持热更新式扩展应用程序的功能

SagooIOT的插件可以使用任何支持netRPC或gRPC通讯的语言编写，建议使用Golang进行插件开发。

本文档将主要关注支持多语言的gRPC库，因为net/rpc仅支持Golang。理论上，gRPC支持诸多编程语言，如C/C++、C#、Dart、Go、Java、Kotlin、Node.js、Objective-C、PHP、Python和Ruby等。


:::tip 提示
考虑到SagooIOT需要支持多个平台，所选编程语言应具备广泛的平台兼容性。

:::

## 插件目录格式

插件的以目录形态存在，每一个文件目录即为一个插件。插件的所有需要用到的文件都可以放进这个目录里。

现在，让我们尝试开发一个名为`CountPlugin`的插件。

首先我们需要一个`唯一ID`，这将会成为你插件的标志。在这里我们将`CountPlugin`的唯一ID设定为`count_plugin`。

然后我们需要进行三步：

> 1. 创建一个名为 `count_plugin` 的文件夹
> 2. 在文件夹中创建 `info.json` 文件
> 3. 将文件夹移动到SagooIOT下的plugins文件夹（如果没有就新建）

目录在此时应该是这样的：

```text
│ SagooIOT.exe
├─config
├─logs
└─plugins
    ├─count_plugin
        ├─info.json
```

## 插件元数据
为了让系统识别插件信息，还需要编写info.json的内容。

info.json 的基础模板如下：

```json
{
    "id": "",
    "version": "",
    "name": "",
    "description": "",
    "author": [""],
    "link": "",
    "command": "",
    "args": [],
    "type": "gRPC",
    "root": false,
    "icon": "",
    "frontend": {
        "ui": true,
      	"url":"",
        "configuration": true
    }
}
```

## 属性

| 名称                  | 类型     | 说明                                                         | 注意事项                                                     |
| --------------------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| id                    | string   | 插件ID（即插件识别码）相当于插件的“身份证”。确保该值与文件夹名称匹配。SagooIOT 通过插件ID来区分各个插件并检测插件之间的依赖关系。在SagooIOT中加载的所有插件都应具有唯一的插件ID。如果新加载的插件与现有插件具有完全相同的插件ID，新插件将无法加载。谨慎选择插件ID。强烈建议发布插件后不要再修改插件ID。 | 要注意可能的包名冲突问题。不推荐插件名取一个与标准库或与第三方库名相同的 id，如 test，否则 SagooIOT 可能无法正常加载插件 |
| version               | string   | 插件版本                                                     |                                                              |
| name                  | string   | 插件名称，尽量不要使插件名称太长。你可以把插件的详细信息放在 `description` 之中 |                                                              |
| description           | string   | 插件描述                                                     |                                                              |
| author                | string[] | 插件作者。该值为数组，可以容纳多个作者                       |                                                              |
| link                  | string   | 插件的网址。指向插件的 github 链接。值应为一个可访问的网址   |                                                              |
| command               | string   | 插件的运行指令，如`./plugin`，`python plugin.py`，`java -jar plugin.jar`等。 |                                                              |
| args                  | string[] | 插件的指令参数                                               |                                                              |
| type                  | string   | 插件与SagooIOT的通信方式，目前可选的值只有`gRPC`与`netRPC`   |                                                              |
| icon                  | string   | 插件图标，该值为`mdi-` + [Material Design Iconsopen in new window](https://materialdesignicons.com/)上的所有可选图标代码，如`mdi-user-arrow-left-outline` |                                                              |
| rontend.ui            | bool     | 是否有插件页面                                               |                                                              |
| rontend.url           | string   | 插件页面地址                                                 |                                                              |
| rontend.configuration | bool     | 是否显示配置页面                                             |                                                              |

## 实例

在本案例中，metadata.json的内容应该是：

```json
{
    "id": "count_plugin",
    "version": "0.0.1",
    "name": "CountPlugin",
    "description": "一个统计访问次数的插件",
    "author": ["microrain"],
    "link": "sagoo.cn",
    "command": "",
    "args": [],
    "type": "gRPC",
    "root": false,
    "icon": "mdi-book",
    "frontend": {
        "ui": true,
        "url": true,
        "configuration": true
    }
}
```
