# 协议插件

SagooIOT的私有协议解决采用的是插件的方式进行扩展支持的。

插件的源码示例参考 
https://github.com/sagoo-cloud/protocol-plugin-tgn52

插件的目录结构如下：

```
--built 编译输出目录
--config 插件配置目录
--Makefile 插件编译脚本
--xxxx.go
--plugin_test.go 插件测试程序
```

## 插件开发

对于如何实现SagooIOT的插件，可以按以下步骤进行：


### 实现插件业务接口
业务接口，这个是实现协议解析的业务。
首先需要实现协议插件接口。插件接口需要实现的方法包括有Info，Encode，Decode三个方法。如：

```go
// ProtocolTgn52 实现
type ProtocolTgn52 struct{}

// 插件信息
func (p *ProtocolTgn52) Info() model.ModuleInfo {
   // ......
}

// 进行编码
func (p *ProtocolTgn52) Encode(args interface{}) model.JsonRes {
   // ......
}

// 进行解码
func (p *ProtocolTgn52) Decode(data model.DataReq) model.JsonRes {
   // ......
}
```
在Info()方法中需要指定插件的类型（协议插件、通知插件），处理方式类型，插件名称（就是插件的ID）。

示例：

```go

func (p *ProtocolTgn52) Info() model.PluginInfo {
	var res = model.PluginInfo{}
	res.Name = "tgn52" //插件ID
	res.Types = PluginType.Notice //插件类型为通知插件
	res.HandleType = PluginHandleType.TcpServer //处理方式为TCP服务
	res.Title = "TG-N5 v2设备协议"
	res.Author = "Microrain"
	res.Description = "对TG-N5插座设备进行数据采集v2"
	res.Version = "0.01"
	return res
}

```

### 实现插件本身接口
需要实现go-plugin要求的Plugin接口，代码参考如下：

```go
// Tgn52Plugin实现go-plugin要求的Plugin接口
type Tgn52Plugin struct{}

// Server方法返回ProtocolRPCServer, 供插件进程启动RPC服务
func (t *Tgn52Plugin) Server(*gplugin.MuxBroker) (interface{}, error) {
  return &ProtocolRPCServer{Impl: new(ProtocolTgn52)}, nil 
}

// Client方法返回ProtocolRPC,供主进程获取RPC客户端
func (t *Tgn52Plugin) Client(b *gplugin.MuxBroker, c *rpc.Client) (interface{}, error) {
  return &ProtocolRPC{Client: c}, nil
}

```

### 实现主函数启动插件服务
编写启动插件的程序，进行插件服务监听，代码参考如下：
```go
// 主函数启动插件服务
func main() {
  gplugin.Serve(&gplugin.ServeConfig{
    HandshakeConfig: plugin.HandshakeConfig,
    Plugins: map[string]gplugin.Plugin{
      "tgn52": &Tgn52Plugin{}, //这里的tgn52是插件ID
    },
  })
}

```

## 插件编译
在示例插件中写了一个编译脚本，将这个脚本放在插件工程的根目录下即可，只需要更改BINARY_NAME的值即可。在SagooIOT中插件名字进行了约定。
规则为 插件类型+中线+插件ID，如本文提到的示例就是协议插件，程序中的tgn52就是插件ID，那这个BINARY_NAME的值就是protocol-tgn52

编译脚本如下：
```shell

BINARY_NAME=protocol-tgn52

local:
	echo "========local============"
	go build -o ${BINARY_NAME}
	mv ${BINARY_NAME} ./built

linux:
	echo "========linux============"
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o ${BINARY_NAME}
	mv ${BINARY_NAME} ./built

windows:
	echo "========windows============"
	CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build -o ${BINARY_NAME}.exe
	mv ${BINARY_NAME} ./built

```

local就是本机编译。

## 插件本地测试
编译测试文件，参插件示例项目中的 plugin_test.go 文件。

## 插件部署
只需要将编译好的插件文件复制到主项目的plugins目录下即可。
