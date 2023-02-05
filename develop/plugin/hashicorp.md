# hashicorp go-plugin构建的插件系统

## 1、1 go-plugin是什么？

我们知道Go语言缺乏动态加载代码的机制，Go程序通常是独立的二进制文件，因此难以实现类似于C++的插件系统。即使go的最新标准引入了go plugin机制，但是由于限制性条件比较多导致在生产环境中不是很好用，比如插件的编写环境和插件的使用环境要保持一致，如gopath、go sdk版本等。

HashiCorp公司开源的go-plugin库解决了上述问题，允许应用程序通过本地网络（本机）的gRPC调用插件，规避了Go无法动态加载代码的缺点。go-plugin是一个通过RPC实现的Go插件系统，并在Packer、Terraform, Nomad、Vault等由HashiCorp主导的项目中均有应用。

顺便说一句，Vault开源代码，我这几天看了下，代码写的很不错，感兴趣的小伙伴可以看看vault是怎么使用go-plugin，很值得借鉴，后续会针对vault的源代码的插件部分进行剖析。

## 1、2 特性

go-plugin的特性包括：

1. **插件是Go接口的实现：**这让插件的编写、使用非常自然。对于插件编写者来说，他只需要实现一个Go接口即可；对于插件的用户来说，就像在同一个进程中使用和调用函数即可。go-plugin会处理好本地调用转换为gRPC调用的所有细节
2. **跨语言支持**：插件可以被任何主流语言编写（和使用），该库支持通过gRPC提供服务插件，而基于gRPC的插件是允许被任何语言编写的。
3. **支持复杂的参数、返回值：**go-plugin可以处理接口、io.Reader/Writer等复杂类型，我们为您提供了一个库（MuxBroker），用于在客户端/服务器之间创建新连接，以服务于附加接口或传输原始数据。
4. **双向通信：**为了支持复杂参数，宿主进程能够将接口实现发送给插件，插件也能够回调到宿主进程（这点还需要看官网的双向通信的例子好好理解下）
5. **内置日志系统：**任何使用log标准库的的插件，都会自动将日志信息传回宿主机进程。宿主进程会镜像日志输出，并在这些日志前面加上插件二进制文件的路径。这会使插件的调试变简单。如果宿主机使用hclog，日志数据将被结构化。如果插件同样使用hclog，插件的日志会发往宿主机并被结构化。
6. **协议版本化：**支持一个简单的协议版本化，可增加版本号使之前插件无效。当接口签名变化、协议版本改变等情况时，协议版本话是很有用的。当协议版本不兼容时，会发送错误消息给终端用户。
7. **标准输出/错误同步：**插件以子进程的方式运行，这些插件可以自由的使用标准输出/错误，并且输出会被镜像回到宿主进程。
8. **TTY Preservation：**插件子进程可以链接到宿主进程的stdin标准输入文件描述符，允许以TTY方式运行的软件。
9. **插件运行状态中，宿主进程升级：**插件可以"reattached"，所以可以在插件运行状态中升级宿主机进程。NewClient函数使用ReattachConfig选项来确定是否Reattach以及如何Reattach。
10. **加密通信：**gRPC信道可以加密

## 1、3 架构优势

1. **插件不影响宿主机进程**：插件崩溃了，不会导致宿主进程崩溃
2. **插件容易编写**：仅仅写个go应用程序并执行go build。或者使用其他语言来编写gRPC服务 ，加上少量的模板来支持go-plugin。
3. **易于安装**：只需要将插件放到宿主进程能够访问的目录即可，剩下的事情由宿主进程来处理。
4. **完整性校验**：支持对插件的二进制文件进行Checksum
5. **插件是相对安全的**：插件只能访问传递给它的接口和参数，而不是进程的整个内存空间。另外，go-plugin可以基于TLS和插件进行通信。

## 1、4 适用场景

go-plugin目前仅设计为在本地[可靠]网络上工作，不支持go-plugin在真实网络，并可能会导致未知的行为。即不能将go-plugin用于在两台服务器之间的远程过程调用，这点和传统的RPC有很大区别，望谨记。

# 二、核心数据结构



## 2、1 Plugin接口

Plugin是一个接口，是插件进程和宿主进程进行通信的桥梁。不管是插件编写者还是插件使用者，都需要实现plugin.Plugin接口，只是各自的实现不同。

````go
type Plugin interface {   
  // Server should return the RPC server compatible struct to serve   
  // the methods that the Client calls over net/rpc.   
  Server(*MuxBroker) (interface{}, error)    
  // Client returns an interface implementation for the plugin you're   
  // serving that communicates to the server end of the plugin.   
  Client(*MuxBroker, *rpc.Client) (interface{}, error) 
}
````



**Server接口：**Server接口应返回与RPC server兼容的结构以提供方法，客户端可以通过net/rpc来调用此方法。

**Client接口：**Client接口返回你提供服务的插件的接口实现，该接口实现将与该插件的服务器端进行通信。

## 2、2 GRPCPlugin接口

````go
 type GRPCPlugin interface {    
   // 由于gRPC插件以单例方式服务，因此该方法仅调用一次    
   GRPCServer(*GRPCBroker, *grpc.Server) error     
   // 插件进程退出时，context会被go-plugin关闭    
   GRPCClient(context.Context, *GRPCBroker, *grpc.ClientConn) (interface{}, error) 
 }
````

 GRPCPlugin的接口实现，在grpc的例子中我们再详细解释。

## 2、3 plugin.client接口

这个接口负责管理一个插件进程的完整生命周期，包括创建插件进程、连接到插件进程、分配接口实现、处理杀死进程。对于每个插件，宿主机进程需要创建一个plugin.Client实例。

````go
type Client struct {    
  // 插件客户端配置    
  config            *ClientConfig    
  // 插件进程是否已经退出    
  exited            bool    
  l                 sync.Mutex    
  // 插件进程的RPC监听地址    
  address           net.Addr    
  // 插件进程对象    
  process           *os.Process    
  // 协议客户端，宿主进程需要调用其Dispense方法来获得业务接口的Stub    
  client            ClientProtocol    
  // 通信协议    
  protocol          Protocol    
  logger            hclog.Logger    
  doneCtx           context.Context    
  ctxCancel         context.CancelFunc    
  negotiatedVersion int     
  // 用于管理 插件管理协程的生命周期    
  clientWaitGroup sync.WaitGroup     
  stderrWaitGroup sync.WaitGroup     
  //  测试用，标记进程是否被强杀    
  processKilled bool 
}
````



## 2、4 ClientConfig**和**ServeConfig对比

ClientConfig包含了初始化一个插件客户端所需的配置信息，一旦初始化，则不可更改。ServeConfig包含了初始化一个插件服务器端所需的配置信息，一旦初始化，则不可更改。枚举这两个结构体，对其字段进行对比和类比分析

`````go
type ClientConfig struct {    
  // 握手信息，用于宿主、插件的匹配。如果不匹配，插件会拒绝连接    
  HandshakeConfig     
  // 可以消费的插件列表    
  Plugins PluginSet     
  // 版本化的插件列表，用于支持在客户端、服务器之间协商兼容版本    
  VersionedPlugins map[int]PluginSet     
  // 启动插件进程使用的命令行，不能和Reattach联用    
  Cmd      *exec.Cmd        
  // 连接到既有插件进程的必要信息，不能和Cmd联用    
  Reattach *ReattachConfig     
  // 用于在启动插件时校验二进制文件的完整性    
  SecureConfig *SecureConfig     
  // 基于TLS进行RPC通信时需要的信息    
  TLSConfig *tls.Config     
  // 标识客户端是否应该被plugin包自动管理    
  // 如果为true，则调用CleanupClients自动清理    
  // 否则用户需要负责杀掉插件客户端，默认false    
  Managed bool     
  // 和子进程通信使用的端口范围,    
  MinPort, MaxPort uint     
  // 启动插件的超时    
  StartTimeout time.Duration  
  ...... 
}
`````



````go
type ServeConfig struct {    
  // 和客户端匹配的握手配置，其信息必须和客户端匹配，否则会拒绝连接    
  HandshakeConfig     
  // 调用此函数得到tls.Config    
  TLSProvider func() (*tls.Config, error)     
  // 可以提供服务的插件集    
  Plugins PluginSet     
  // 版本化的插件列表，用于支持在客户端、服务器之间协商兼容版本    
  VersionedPlugins map[int]PluginSet     
  // 如果通过gRPC提供服务，则此字段不能为空    
  // 调用此函数创建一个gRPC服务器对象    
  // 公司场景采用grpc通信，所以涉及到grpc的要重点看    
  GRPCServer func([]grpc.ServerOption) *grpc.Server    
  Logger hclog.Logger 
} 
````

ClientConfig和ServeConfig中都需要填写HandshakeConfig，这里要声明两点对于rpc通信的client和server来说，其ClientConfig和ServeConfig中的配置要保持完全一致，否则会导致连接失败，这块在调试的时候，耗费了我一些时间和精力。

## 2、5 PluginSet结构体

插件进程在启动时设置Plugins，即ServeConfig中设置Plugins时，会指明其实现者；宿主机进程在启动时也设置Plugins，即ClientConfig中设置Plugins时，不需要指明其实现者。

````go
//插件进程的插件集 
var pluginMap = map[string]plugin.Plugin{ 
  "greeter": &example.GreeterPlugin{Impl: greeter}, 
} 
//宿主机进程的插件集 
var pluginMap = map[string]plugin.Plugin{
  "greeter": &example.GreeterPlugin{}, 
}
````

 如上图所示，其ServeConfig中插件业务接口实现者是greeter

# 三、架构设计图



[![在这里插入图片描述](https://img-blog.csdnimg.cn/20210426234202470.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb2xpcGVuZ3poYW5zaGVu,size_16,color_FFFFFF,t_70)](https://img-blog.csdnimg.cn/20210426234202470.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb2xpcGVuZ3poYW5zaGVu,size_16,color_FFFFFF,t_70)

# 四、从example入手学习

通过go-plugin库自带的两个例子来展示库的使用方法

## 4、1 basic例子剖析



### 4、1、1 业务接口定义

````go
// Greeter is the interface that we're exposing as a plugin. 
type Greeter interface {
  Greet() string 
}
````

 暴露插件需要实现的接口，接口的实现是在插件进程中。

### 4、1、2 宿主机进程剖析

宿主机进程的代码如下：

```go
func main() { 
  // 创建hclog.Logger类型的日志对象 
  logger := hclog.New(&hclog.LoggerOptions{
    	Name:   "plugin", 	
    	Output: os.Stdout, 	
    	Level:  hclog.Debug, 
  })     
  // 两种方式选其一 
  // 以exec.Command方式启动插件进程，并创建宿主机进程和插件进程的连接    
  // 或者使用Reattach连接到现有进程 
  client := plugin.NewClient(&plugin.ClientConfig{ 	
    HandshakeConfig: handshakeConfig, 	
    Plugins:         pluginMap,        
    //创建新进程，或使用Reattach连接到现有进程中 	
    Cmd:             exec.Command("./plugin/greeter"), 	
    Logger:          logger, 
  })   
  // 关闭client，释放相关资源，终止插件子程序的运行 
  defer client.Kill() 	
  // 返回协议客户端，如rpc客户端或grpc客户端，用于后续通信 
  rpcClient, err := client.Client()
  if err != nil {
    log.Fatal(err)
  } 	
  // 根据指定插件名称分配新实例
  raw, err := rpcClient.Dispense("greeter") 
  if err != nil { 	
    log.Fatal(err) 
  } 	
  // 像调用普通函数一样调用接口函数就ok，很方便是不是？ 
  greeter := raw.(example.Greeter) 
  fmt.Println(greeter.Greet()) 
} 
var pluginMap = map[string]plugin.Plugin{ 
  //插件名称到插件对象的映射关系 
  "greeter": &example.GreeterPlugin{}, 
}
```

其流程一共拆解为5步：

**第一步、plugin.NewClient创建宿主机进程和插件进程之间的连接**

plugin.NewClient创建plugin.Client，可以简单理解为宿主机进程和插件进程之间连接。其参数pluginMap表示可被消费的插件列表。

**第二步、调用client.Client()，返回当前连接的协议客户端（即rpcClient）**

协议支持net/rpc或gRPC，所以协议客户端可能是gRPC客户端，也可能是标准net/rpc客户端。

**第三步、调用rpcClient.Dispense，根据指定插件名称分配一个新实例**

由于此函数很关键，下面通过走读源代码来梳理下流程：

```go
func (c *RPCClient) Dispense(name string) (interface{}, error) {    
  //1、查找插件类型是否支持 
  p, ok := c.plugins[name] 
  if !ok { 	
    return nil, fmt.Errorf("unknown plugin type: %s", name)
  } 	
  var id uint32 
  if err := c.control.Call( 	
    "Dispenser.Dispense", name, &id); err != nil { 	
    return nil, err 
  } 	
  conn, err := c.broker.Dial(id)
  if err != nil { 
    return nil, err 
  }     
  //2、非常重要，Dispense函数会回调Plugin的Client接口实现
  return p.Client(c.broker, rpc.NewClient(conn))
} 
```

 在Dispense方法中会调用自己实现的插件的Client方法。

前面2.1章节提过，每个新插件都会实现plugin.Plugin接口（grpc插件实现的是GRPCPlugin接口），即Server和Client接口下面是basic例子中的GreeterPlugin插件实现

```go
type GreeterPlugin struct {   
  // 内嵌业务接口   
  // 插件进程会设置其为实现业务接口的对象   
  // 宿主进程则置空   
  Impl Greeter 
} 
// 此方法由插件进程延迟的调用 
func (p *GreeterPlugin) Server(*plugin.MuxBroker) (interface{}, error) {  
  return &GreeterRPCServer{Impl: p.Impl}, nil 
} 
// 此方法由宿主进程调用 
func (GreeterPlugin) Client(b *plugin.MuxBroker, c *rpc.Client) (interface{}, error) {  
  return &GreeterRPC{client: c}, nil 
} 
```

Server方法必须返回一个这种插件类型的RPC server服务器，我们构造了GreeterRPCServer。Client方法必须返回一个接口的实现，并且能够通过RPC client客户端通信，我们返回了GreeterRPC这里出个思考题

1、Server方法为什么需要返回GreeterRPCServer的指针？

2、Client方法为什么需要返回GreeterRPC的指针？

综上所述，Dispense的返回值是指向GreeterRPC的指针。

```go
type GreeterRPC struct{ client *rpc.Client } 
func (g *GreeterRPC) Greet() string {
  var resp string   
  err := g.client.Call("Plugin.Greet", new(interface{}), &resp)   
  if err != nil {     
    // You usually want your interfaces to return errors. If they don't,     
    // there isn't much other choice here.      
    panic(err)   
  }    
  return resp 
}
```



GreeterRPC结构体实现了业务接口的Greet()，在方法实现的函数体body中，实际是用rpc client客户端调用Call()来进行远程过程调用，并将响应返回，如出错则会导致panic。问题3：g.client.Call(“Plugin.Greet”, new(interface{}), &resp)中的第一个参数"Plugin.Greet"可以更换吗？

**第四步、转换成业务接口类型，并调用对应api**

从第三步我们知道Dispense的返回值raw是指向GreeterRPC的指针。而GreeterRPC结构体实现了业务接口example.Greeter。所以两者之间可以进行类型转换。

greeter := raw.(example.Greeter)
fmt.Println(greeter.Greet())

上述两句代码，将raw转换为业务接口类型example.Greeter，然后调用之前暴露的业务接口Greet()函数。

**第五步、关闭client，释放资源**

调用client.Kill()函数，来释放之前申请的系统资源，防止内存泄露。

### 4、1、3 插件进程剖析

```go
// Here is a real implementation of Greeter 
// 重点：业务接口的真正实现 
type GreeterHello struct { 
  logger hclog.Logger 
} 
//之前暴露的插件业务接口，此处必须实现，供宿主机进程RPC调用 
func (g *GreeterHello) Greet() string {
  g.logger.Debug("message from GreeterHello.Greet") 
  return "Hello!"
} 
//握手配置，插件进程和宿主机进程，都需要保持一致 
var handshakeConfig = plugin.HandshakeConfig{ 
  ProtocolVersion:  1, 
  MagicCookieKey:   "BASIC_PLUGIN", 
  MagicCookieValue: "hello", 
} 
func main() { 
  logger := hclog.New(&hclog.LoggerOptions{ 	
    Level:      hclog.Trace, 	
    Output:     os.Stderr, 	
    JSONFormat: true, 
  }) 	
  greeter := &GreeterHello{ 	
    logger: logger, 
  } 
  // pluginMap is the map of plugins we can dispense. 
  // 插件进程必须指定Impl，此处赋值为greeter对象 
  var pluginMap = map[string]plugin.Plugin{ 	
    "greeter": &example.GreeterPlugin{Impl: greeter}, 
  } 	
  logger.Debug("message from plugin", "foo", "bar") 	
  //调用plugin.Serve()启动侦听，并提供服务 
  plugin.Serve(&plugin.ServeConfig{ 	
    HandshakeConfig: handshakeConfig, 	
    Plugins:         pluginMap, 
  }) 
} 
```

**第一步、定义GreeterHello结构体，并实现插件暴露的业务接口Greet()**

**第二步、整理插件的映射关系，并在plugin.Serve函数调用时，以参数形式赋值给Plugins**

如名称为greeter的插件，对应&example.GreeterPlugin{Impl: greeter}

````go
var pluginMap = map[string]plugin.Plugin{ 	
  //插件名称到插件对象的映射关系 	
  "greeter": &example.GreeterPlugin{Impl: greeter}, 
} 
````



**第三步、在main函数中调用plugin.Serve()，启动监听来提供插件服务。**

服务器调用plugin.Serve方法后，主线程会阻塞。直到客户端调用 Dispense方法请求插件实例时，服务器端才会实例化插件（业务接口的实现）：

```go
func (d *dispenseServer) Dispense(    name string, response *uint32) error { 
  // 从PluginSet中查找    
  p, ok := d.plugins[name]    
  if !ok {        
    return fmt.Errorf("unknown plugin type: %s", name)    
  }    
  // 调用（下面的那个函数）插件接口的方法    
  impl, err := p.Server(d.broker)    
  if err != nil {       
    return errors.New(err.Error())  
  }    
  // MuxBroker基于唯一性的ID进行TCP连接的多路复用   
  id := d.broker.NextId()    
  *response = id     
  // 在另外一个协程中处理该请求   
  go func() {        
    conn, err := d.broker.Accept(id)        
    if err != nil {           
      log.Printf("[ERR] go-plugin: plugin dispense error: %s: %s", name, err)            
      return        
    }        
    serve(conn, "Plugin", impl)    
  }()     
  return nil 
}  
func (p *GreeterPlugin) Server(*plugin.MuxBroker) (interface{}, error) { 
  return &GreeterRPCServer{Impl: p.Impl}, nil
}
```



## 4、2 grpc例子剖析

应当尽量采用grpc而非net/rpc，原因如下：

1）gRPC支持多种语言来实现插件，而net/rpc是Go专有的，不利于程序的可扩展性

2）在gRPC模式下，go-plugin插件请求通过http2发送，传输性能更好

3）对于gRPC模式来说，插件进程只会有单个插件“实例”。对于net/rpc你可能需要创建多个“实例”。使用gRPC模式下的go-plugin，其步骤如下：

xx（未完成）

xx

xx

### 4、2、1 proto定义

```protobuf
syntax = "proto3"; 
package proto; 
//请求 
message GetRequest {    
  string key = 1; 
} 
//应答 
message GetResponse {    
  bytes value = 1; 
}  
message PutRequest {    
  string key = 1;   
  bytes value = 2; 
}  message Empty {} 
//定义service的接口Get和Put 
service KV {    
  rpc Get(GetRequest) returns (GetResponse);   
  rpc Put(PutRequest) returns (Empty); 
} 
```

执行命令： protoc -I proto/ proto/kv.proto --go_out=plugins=grpc:proto/ 生成Go代码。

### 4、2、2 业务接口

在examples/grpc/shared/interface.go文件中，是其定义的业务接口

```go
// 业务接口 
type KV interface {   
  Put(key string, value []byte) error    
  Get(key string) ([]byte, error) 
} 
```



### 4、2、3 插件接口

gRPC模式下，你需要实现接口plugin.GRPCPlugin，并嵌入plugin.Plugin接口：

**问题4：为什么要嵌入plugin.Plugin插件接口呢？以前只嵌入接口的实现就行（这点暂时还没解决）**

````go
type KVGRPCPlugin struct {    
  // 需要嵌入插件接口   
  plugin.Plugin    
  // 具体实现，仅当业务接口实现基于Go时该字段有用    
  Impl KV
}
````



plugin.GRPCPlugin接口的规格如下，你需要实现两个方法：

```go
type GRPCPlugin interface {    
  // 此方法被插件进程调用    
  // 你需要向其提供的grpc.ServergRPC参数，注册服务的实现（服务器端存根）    
  // 由于gRPC下服务器端是单例模式，因此该方法仅调用一次    
  GRPCServer(*GRPCBroker, *grpc.Server) error     
  // 此方法被宿主进程调用    
  // 你需要返回一个业务接口的实现（客户端存根），此实现直接将请求转给gRPC客户端即可    
  // 传入的context对象会在插件进程销毁时取消   
  GRPCClient(context.Context, *GRPCBroker, *grpc.ClientConn) (interface{}, error) 
} 
```

 其实现如下：

```go
func (p *KVGRPCPlugin) GRPCServer(broker *plugin.GRPCBroker, s *grpc.Server) error { 
  //向grpc.ServergRPC类型参数s，注册服务的实现   
  proto.RegisterKVServer(s, &GRPCServer{Impl: p.Impl}) 
  return nil
} 
func (p *KVGRPCPlugin) GRPCClient(ctx context.Context, broker *plugin.GRPCBroker, c *grpc.ClientConn) (interface{}, error) {    
  //创建gRPC客户端的方法是自动生成的 
  return &GRPCClient{client: proto.NewKVClient(c)}, nil 
}
```

**备注信息：**

KVPlugin是对plugin.Plugin接口的实现

KVGRPCPlugin是对GRPCPlugin接口的实现

GRPCClient是对KV接口的实现

GRPCServer是对KVServer接口的实现

#### 1、GRPCServer接口实现

```go
// 实现自动生成的KVServer接口，具体逻辑委托给业务接口KV的实现 
type GRPCServer struct { 
  // This is the real implementation 
  Impl KV 
} 
func (m *GRPCServer) Put( ctx context.Context, req *proto.PutRequest) (*proto.Empty, error) { 
  return &proto.Empty{}, m.Impl.Put(req.Key, req.Value) 
} 
func (m *GRPCServer) Get( ctx context.Context, req *proto.GetRequest) (*proto.GetResponse, error) { 
  v, err := m.Impl.Get(req.Key) 
  return &proto.GetResponse{Value: v}, err 
} 
```

#### 2、GRPCClient接口实现

在GRPCClient方法的实现中，你需要返回一个业务接口的实现（客户端stub），此实现只是将请求转发给gRPC服务处理：

````go
//业务接口KV 
type KV interface { 
  Put(key string, value []byte) error 
  Get(key string) ([]byte, error) 
}
//业务接口KV的实现，通过gRPC客户端转发请求给插件进程 
type GRPCClient struct{ client proto.KVClient } 
func (m *GRPCClient) Put(key string, value []byte) error { 
  _, err := m.client.Put(context.Background(), &proto.PutRequest{ 	Key:   key, 	Value: value, }) 
  return err 
} 
func (m *GRPCClient) Get(key string) ([]byte, error) { 
  resp, err := m.client.Get(context.Background(), &proto.GetRequest{ 	Key: key, })
  if err != nil { 	return nil, err } 	
  return resp.Value, nil
}
````



### 4、2、4 宿主机进程

宿主机进程使用gRPC方式时，只需要设置AllowedProtocols，指明同时支持plugin.ProtocolNetRPC和plugin.ProtocolGRPC两种协议。

 `````go
 func main() { 
   // We don't want to see the plugin logs. 
   log.SetOutput(ioutil.Discard) 	
   // We're a host. Start by launching the plugin process. 
   client := plugin.NewClient(&plugin.ClientConfig{ 	
     HandshakeConfig: shared.Handshake, 	
     Plugins:         shared.PluginMap, 	
     Cmd:             exec.Command("sh", "-c", os.Getenv("KV_PLUGIN")), 	
     AllowedProtocols: []plugin.Protocol{ 		
       plugin.ProtocolNetRPC, plugin.ProtocolGRPC},
   }) 
   defer client.Kill() 	
   // Connect via RPC 
   rpcClient, err := client.Client()
   if err != nil { 
     fmt.Println("Error:", err.Error()) 
     os.Exit(1) 
   } 	
   // Request the plugin 
   raw, err := rpcClient.Dispense("kv_grpc") 
   if err != nil { 	
     fmt.Println("Error:", err.Error()) 	os.Exit(1) 
   } 	
   // We should have a KV store now! This feels like a normal interface 
   // implementation but is in fact over an RPC connection. 
   kv := raw.(shared.KV) 
   os.Args = os.Args[1:] 
   switch os.Args[0] { 
     case "get": 	
         result, err := kv.Get(os.Args[1]) 	
         if err != nil { 		
           fmt.Println("Error:", err.Error()) 	
           os.Exit(1) 	} 		
         fmt.Println(string(result)) 	
     case "put": 	
         err := kv.Put(os.Args[1], []byte(os.Args[2])) 	
         if err != nil { 		
           fmt.Println("Error:", err.Error()) 	
           os.Exit(1) 
         } 
   default: 	
     fmt.Printf("Please only use 'get' or 'put', given: %q", os.Args[0]) 	
     os.Exit(1) 
   } 
   os.Exit(0)
 }
 `````

 ` `

### 4、2、5 插件进程

只需要指定GRPCServer，提供创建gRPC服务器的函数，其他的和以前没什么区别。

````go
// Here is a real implementation of KV that writes to a local file with 
// the key name and the contents are the value of the key. 
type KV struct{} 
func (KV) Put(key string, value []byte) error { 
  value = []byte(fmt.Sprintf("%snnWritten from plugin-go-grpc", string(value))) 
  return ioutil.WriteFile("kv_"+key, value, 0644) 
} 
func (KV) Get(key string) ([]byte, error) { 
  return ioutil.ReadFile("kv_" + key)
} 
func main() { 
  plugin.Serve(&plugin.ServeConfig{ 	
    HandshakeConfig: shared.Handshake, 	
    Plugins: map[string]
    plugin.Plugin{ 		
      "kv": &shared.KVGRPCPlugin{Impl: &KV{}}, 	
    }, 		
    // A non-nil value here enables gRPC serving for this plugin... 	
    GRPCServer: plugin.DefaultGRPCServer, 
  }) 
}
````

# 四、总结



## 4、1 宿主机进程和插件进程在rpc通信中扮演的角色？

扮演客户端的角色，插件进程扮演服务器的角色，因为插件进程在主函数的末尾会调用Serve(opts *ServeConfig)函数。

## 4、2 插件编写者和插件使用者如何来使用go-plugin库？

一般来说，步骤如下：

1、选择插件希望暴露的接口。

2、对于每个接口，实现该接口确保其通过net/rpc连接或gRPC连接可以通信，你必须同时实现客户端和服务器。

3、创建Plugin接口的实现，知道如何为给定的插件类型创建RPC client/server。

4、插件编写者，在main函数中调用plugin.Serve()，启动监听来提供插件服务。

5、插件使用者，使用plugin.Client启动子进程，通过rpc请求一个接口实现。

上述步骤有不妥当的地方，请及时反馈给我。参考链接：
https://blog.gmem.cc/go-plugin-over-grpc#comment-26043

原文链接：https://blog.csdn.net/weixin_39922769/article/details/111043708
