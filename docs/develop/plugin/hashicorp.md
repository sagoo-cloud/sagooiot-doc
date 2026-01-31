---
sidebar_position: 1
title: '插件系统介绍'
keywords: [HashiCorp插件,go-plugin,GRPC插件,插件架构,插件设计,插件通信,进程间通信,插件标准,框架介绍,SagooIOT插件]
description: '深入介绍SagooIOT平台采用的HashiCorp go-plugin框架，涵盖插件架构原理、设计标准、通信机制、gRPC实现及最佳实践等完整技术指南。'
---
# 插件系统介绍

SagooIOT gRPC plugin是使用HashiCorp/go-plugin框架实现的，它遵循开闭原则，通过接口固定上层业务逻辑，通过改变实现的RPC服务接口来扩展业务。Go Plugin提供了两类插件：RPC插件和GRPC插件，这两类插件的客户端的底层调用方式不同。前者使用net/rpc，后者使用grpc服务调用。这两种插件都提供了Server和Client方法。Server方法充当了服务端stub，当服务端接收到请求后，调用接口的服务端实现。Client方法是一个工厂方法，用于生成客户端接口实现对象。

**本系统中插件机制采用的是hashicorp/go-plugin**

* 进程隔离：有，多进程，server+client
* 主程序调用插件：一切协议预协定object
* 插件感知主程序上下文：一切协议预协定object
* stream支持：单向和双向，基于http/2
* 插件发现：主程序循环扫描插件目录并维护状态；通过第三方文件diff工具维护，例如git
* 上线：能
* 下线：能
* 更新：能
* 通信：支持grpc
* 序列化：protobuf
* 性能：中/偏高

![plugin001](../imgs/plugin/plugin001.png)

Go Plugin在启动过程中会启动一个子进程，运行RPC/gRPC服务。主进程可以通过RPC/gRPC接口来调用插件，支持多版本的服务并存。然而，Go Plugin本身不提供服务的高可用解决方案，需要自己来提供。


## 设计标准

* 性能：调用插件要尽可能的快；对于任务插件，使用单独的工作空间（协程、线程、进程的池子化处理），大的、慢的、长期运行的插件，要少调用
* 稳定性：插件依赖的发布平台要少发布，交互API的设计要做好抽象，上下文的环境变量非必须不添加，减少升级需求，甚至能支持多个实例互备热升级
* 可靠性：如果有失效、崩溃的可能，必须有快速、简单、完整的恢复机制；业务插件的执行不能影响依赖的发布平台的守护进程或者线程的稳定
* 安全性：应该通过代码签名之类的手段防篡改
* 扩展性：支持插件热更新和上下线，下线需要健康检查，公共库插件至少能热加载
* 复用性：业务插件不要太多一次性的上下线
* 易用性：提供使用简单、功能正交的API，业务插件能够获取依赖的发布平台的上下文和调用公共库

## 特性
go-plugin的特性包括：

1. 插件是Go接口的实现：这让插件的编写、使用非常自然。对于插件编写者来说，他只需要实现一个Go接口即可；对于插件的用户来说，就像在同一个进程中使用和调用函数即可。go-plugin会处理好本地调用转换为gRPC调用的所有细节

2. 跨语言支持：插件可以被任何主流语言编写（和使用），该库支持通过gRPC提供服务插件，而基于gRPC的插件是允许被任何语言编写的。

3. 支持复杂的参数、返回值：go-plugin可以处理接口、io.Reader/Writer等复杂类型，我们为您提供了一个库（MuxBroker），用于在客户端/服务器之间创建新连接，以服务于附加接口或传输原始数据。

4. 双向通信：为了支持复杂参数，宿主进程能够将接口实现发送给插件，插件也能够回调到宿主进程（这点还需要看官网的双向通信的例子好好理解下）

5. 内置日志系统：任何使用log标准库的的插件，都会自动将日志信息传回宿主机进程。宿主进程会镜像日志输出，并在这些日志前面加上插件二进制文件的路径。这会使插件的调试变简单。如果宿主机使用hclog，日志数据将被结构化。如果插件同样使用hclog，插件的日志会发往宿主机并被结构化。

6. 协议版本化：支持一个简单的协议版本化，可增加版本号使之前插件无效。当接口签名变化、协议版本改变等情况时，协议版本话是很有用的。当协议版本不兼容时，会发送错误消息给终端用户。

7. 标准输出/错误同步：插件以子进程的方式运行，这些插件可以自由的使用标准输出/错误，并且输出会被镜像回到宿主进程。

8. TTY Preservation：插件子进程可以链接到宿主进程的stdin标准输入文件描述符，允许以TTY方式运行的软件。

9. 插件运行状态中，宿主进程升级：插件可以"reattached"，所以可以在插件运行状态中升级宿主机进程。NewClient函数使用ReattachConfig选项来确定是否Reattach以及如何Reattach。
10. 加密通信：gRPC信道可以加密

## 架构优势
插件不影响宿主机进程：插件崩溃了，不会导致宿主进程崩溃
插件容易编写：仅仅写个go应用程序并执行go build。或者使用其他语言来编写gRPC服务 ，加上少量的模板来支持go-plugin。
易于安装：只需要将插件放到宿主进程能够访问的目录即可，剩下的事情由宿主进程来处理。
完整性校验：支持对插件的二进制文件进行Checksum
插件是相对安全的：插件只能访问传递给它的接口和参数，而不是进程的整个内存空间。另外，go-plugin可以基于TLS和插件进行通信。
## 适用场景
go-plugin目前仅设计为在本地[可靠]网络上工作，不支持go-plugin在真实网络，并可能会导致未知的行为。

即不能将go-plugin用于在两台服务器之间的远程过程调用，这点和传统的RPC有很大区别，望谨记。

更多内容请见文章出处：
[https://zhuanlan.zhihu.com/p/451382884](https://zhuanlan.zhihu.com/p/451382884)

## 核心概念

### 1. 插件架构

```
┌─────────────────┐          RPC           ┌─────────────────┐
│   主程序        │  ───────────────────>  │   插件进程       │
│  (Client)       │  <───────────────────  │   (Server)       │
└─────────────────┘                        └─────────────────┘
```

- **Client**：主程序中的插件客户端，负责启动和管理插件进程
- **Server**：插件进程中的 RPC 服务器，暴露插件功能
- **Protocol**：通信协议（net/rpc 或 gRPC）
- **Handshake**：握手配置，用于版本验证和安全认证

### 2. 通信协议

```go
const (
    ProtocolInvalid Protocol = ""
    ProtocolNetRPC  Protocol = "netrpc"  // 标准库 net/rpc
    ProtocolGRPC    Protocol = "grpc"    // gRPC 协议
)
```

### 3. 握手配置

```go
type HandshakeConfig struct {
    ProtocolVersion  uint   // 协议版本号
    MagicCookieKey   string // 安全密钥
    MagicCookieValue string // 安全值
}
```

---

## 快速开始

### 安装

```bash
go get github.com/hashicorp/go-plugin
```

### 示例：创建一个简单的插件系统

#### 步骤 1：定义插件接口

```go
// shared/greeter.go
package shared

import "github.com/hashicorp/go-plugin"

// Greeter 是插件需要实现的接口
type Greeter interface {
    Greet(name string) (string, error)
}

// 以下是 RPC 所需的配套代码

// GreeterRPC 是 net/rpc 的实现
type GreeterRPC struct {
    client *rpc.Client
}

func (g *GreeterRPC) Greet(name string) (string, error) {
    var resp string
    err := g.client.Call("Plugin.Greet", name, &resp)
    return resp, err
}

// GreeterRPCServer 是 RPC 的服务端实现
type GreeterRPCServer struct {
    Impl Greeter
}

func (s *GreeterRPCServer) Greet(name string, resp *string) error {
    result, err := s.Impl.Greet(name)
    *resp = result
    return err
}

// 插件握手配置
var HandshakeConfig = plugin.HandshakeConfig{
    ProtocolVersion:  1,
    MagicCookieKey:   "GREETER_PLUGIN",
    MagicCookieValue: "hello-world",
}
```

#### 步骤 2：实现插件

```go
// plugin/main.go
package main

import (
    "fmt"
    "github.com/hashicorp/go-plugin"
    "log"
    "shared"
)

// GreeterImpl 是 Greeter 接口的实现
type GreeterImpl struct{}

func (g *GreeterImpl) Greet(name string) (string, error) {
    return fmt.Sprintf("Hello, %s!", name), nil
}

func main() {
    // 插件服务配置
    plugin.Serve(&plugin.ServeConfig{
        HandshakeConfig: shared.HandshakeConfig,
        Plugins: map[string]plugin.Plugin{
            "greeter": &plugin.Plugin{
                Server: &plugin.ServerConfig{
                    RPCServer: func(conn io.ReadWriteCloser) *rpc.Server {
                        server := rpc.NewServer()
                        server.RegisterName("Plugin", &shared.GreeterRPCServer{
                            Impl: &GreeterImpl{},
                        })
                        return server
                    },
                },
            },
        },
    })
}
```

#### 步骤 3：在主程序中使用插件

```go
// main.go
package main

import (
    "fmt"
    "log"
    "os/exec"
    "github.com/hashicorp/go-plugin"
    "shared"
)

func main() {
    // 创建客户端
    client := plugin.NewClient(&plugin.ClientConfig{
        HandshakeConfig: shared.HandshakeConfig,
        Plugins: map[string]plugin.Plugin{
            "greeter": &plugin.Plugin{
                Client: &plugin.ClientConfig{
                    RPCClient: func(conn io.ReadWriteCloser) (interface{}, error) {
                        return &shared.GreeterRPC{client: rpc.NewClient(conn)}, nil
                    },
                },
            },
        },
        Cmd: exec.Command("./plugin/greeter-plugin"),
    })
    defer client.Kill()

    // 启动插件
    rpcClient, err := client.Client()
    if err != nil {
        log.Fatal("Error starting plugin:", err)
    }

    // 获取插件实例
    raw, err := rpcClient.Dispense("greeter")
    if err != nil {
        log.Fatal("Error dispensing plugin:", err)
    }

    // 调用插件方法
    greeter := raw.(shared.Greeter)
    result, err := greeter.Greet("World")
    if err != nil {
        log.Fatal("Error calling plugin:", err)
    }

    fmt.Println(result) // 输出: Hello, World!
}
```

---

## 详细开发指南

### 一、创建插件（服务端）

#### 1.1 定义插件接口和 RPC 包装

对于 net/rpc 插件，需要定义：
- 接口（业务逻辑）
- 客户端包装（实现接口，调用 RPC）
- 服务端包装（接收 RPC 调用，转发到实现）

#### 1.2 实现 ServeConfig

```go
func Serve(opts *ServeConfig)
```

**ServeConfig 关键字段：**

```go
type ServeConfig struct {
    // 握手配置（必填）
    HandshakeConfig
    
    // 插件集合（必填）
    Plugins PluginSet
    
    // GRPCServer: gRPC 服务器工厂函数（gRPC 插件需要）
    GRPCServer func([]grpc.ServerOption) *grpc.Server
    
    // 日志配置
    Logger hclog.Logger
    
    // 测试模式配置
    Test *ServeTestConfig
}
```

#### 1.3 配置插件集合

```go
type PluginSet map[string]Plugin

type Plugin interface {
    Server(*MuxBroker) (interface{}, error)  // 返回 RPC 服务端
    Client(*MuxBroker, *rpc.Client) (interface{}, error) // 返回 RPC 客户端包装
}
```

对于 gRPC 插件，实现 `GRPCPlugin` 接口：

```go
type GRPCPlugin interface {
    GRPCServer(*GRPCBroker) *grpc.Server
    GRPCClient(context.Context, *GRPCBroker, *grpc.ClientConn) (interface{}, error)
}
```

### 二、使用插件（客户端）

#### 2.1 创建客户端

```go
client := plugin.NewClient(&plugin.ClientConfig{
    HandshakeConfig: handshakeConfig,  // 握手配置（必须匹配服务端）
    Plugins: pluginSet,                // 插件集合
    Cmd: exec.Command("path/to/plugin"), // 插件可执行文件路径
    Managed: true,                     // 是否由库管理生命周期
    AllowedProtocols: []Protocol{ProtocolGRPC}, // 允许的协议
    Logger: logger,                    // 日志记录器
    SyncStdout: os.Stdout,            // 同步 stdout
    SyncStderr: os.Stderr,            // 同步 stderr
    StartTimeout: time.Minute,        // 启动超时
})
```

#### 2.2 启动并连接插件

```go
// 启动插件进程并等待握手完成
rpcClient, err := client.Start()
if err != nil {
    log.Fatal("Failed to start plugin:", err)
}

// 获取插件实例
raw, err := rpcClient.Dispense("pluginName")
if err != nil {
    log.Fatal("Failed to dispense plugin:", err)
}

// 类型转换为实际接口
myPlugin := raw.(MyInterface)
```

#### 2.3 插件生命周期管理

```go
// 检查插件是否已退出
if client.Exited() {
    fmt.Println("Plugin has exited")
}

// 获取插件进程 ID
pid := client.ID()

// 获取协议版本
version := client.NegotiatedVersion()

// 杀死插件进程
client.Kill()

// 获取重新连接配置（用于热重载）
reattachConfig := client.ReattachConfig()
```

### 三、gRPC 插件开发

#### 3.1 定义 protobuf

```
syntax = "proto3";

service Greeter {
  rpc Greet(GreetRequest) returns (GreetResponse);
}

message GreetRequest {
  string name = 1;
}

message GreetResponse {
  string message = 1;
}
```

#### 3.2 实现 gRPC 插件

```go
type GreeterGRPCPlugin struct {
    plugin.Plugin
   Impl Greeter
}

func (p *GreeterGRPCPlugin) GRPCServer(broker *plugin.GRPCBroker, s *grpc.Server) error {
    pb.RegisterGreeterServer(s, &greeterServer{Impl: p.Impl})
    return nil
}

func (p *GreeterGRPCPlugin) GRPCClient(ctx context.Context, broker *plugin.GRPCBroker, conn *grpc.ClientConn) (interface{}, error) {
    return &greeterClient{client: pb.NewGreeterClient(conn)}, nil
}

// 服务端
type greeterServer struct {
    pb.UnimplementedGreeterServer
    Impl Greeter
}

func (s *greeterServer) Greet(ctx context.Context, req *pb.GreetRequest) (*pb.GreetResponse, error) {
    msg, err := s.Impl.Greet(req.Name)
    return &pb.GreetResponse{Message: msg}, err
}

// 客户端
type greeterClient struct {
    client pb.GreeterClient
}

func (c *greeterClient) Greet(name string) (string, error) {
    resp, err := c.client.Greet(context.Background(), &pb.GreetRequest{Name: name})
    if err != nil {
        return "", err
    }
    return resp.Message, nil
}
```

#### 3.3 配置 gRPC 插件服务端

```go
plugin.Serve(&plugin.ServeConfig{
    HandshakeConfig: shared.HandshakeConfig,
    Plugins: plugin.PluginSet{
        "greeter": &GreeterGRPCPlugin{Impl: &GreeterImpl{}},
    },
    GRPCServer: plugin.DefaultGRPCServer, // 使用默认 gRPC 服务器
})
```

#### 3.4 使用 gRPC 插件客户端

```go
client := plugin.NewClient(&plugin.ClientConfig{
    HandshakeConfig: shared.HandshakeConfig,
    Plugins: plugin.PluginSet{
        "greeter": &GreeterGRPCPlugin{},
    },
    Cmd: exec.Command("./plugin/greeter-plugin"),
    AllowedProtocols: []plugin.Protocol{plugin.ProtocolGRPC},
})
```

---

## 高级主题

### 1. 插件发现（Discovery）

```go
// 在指定目录中查找插件
matches, err := plugin.Discover("*.plugin", "/path/to/plugins")
if err != nil {
    log.Fatal(err)
}

for _, pluginPath := range matches {
    client := plugin.NewClient(&plugin.ClientConfig{
        // ...
        Cmd: exec.Command(pluginPath),
    })
    // 使用插件...
}
```

### 2. 安全校验（SecureConfig）

```go
secureConfig := &plugin.SecureConfig{
    Checksum: []byte{...}, // 预期的校验和
    Hash:     sha256.New(), // 哈希算法
}

// 在客户端配置中添加安全校验
client := plugin.NewClient(&plugin.ClientConfig{
    // ...
    SecureConfig: secureConfig,
})

// 手动校验插件文件
ok, err := secureConfig.Check("/path/to/plugin")
if !ok {
    log.Fatal("Plugin checksum verification failed")
}
```

### 3. 多路复用（MuxBroker）

`MuxBroker` 允许在单个连接上创建多个虚拟连接：

```go
// 服务端
func (p *MyPlugin) Server(broker *plugin.MuxBroker) (interface{}, error) {
    // 接受一个连接
    conn, err := broker.Accept(123)
    if err != nil {
        return nil, err
    }
    // 使用 conn 进行通信...
}

// 客户端
func (p *MyPlugin) Client(broker *plugin.MuxBroker, client *rpc.Client) (interface{}, error) {
    // 发起一个连接
    conn, err := broker.Dial(123)
    if err != nil {
        return nil, err
    }
    // 使用 conn 进行通信...
}
```

### 4. 日志和流同步

```go
client := plugin.NewClient(&plugin.ClientConfig{
    // 同步插件的 stdout/stderr 到主程序
    SyncStdout: os.Stdout,
    SyncStderr: os.Stderr,
    
    // 或者使用 RPC 客户端同步
    SyncedStdio: true,
})

// 启动后同步流
rpcClient, _ := client.Client()
if rpcClientClient, ok := rpcClient.(*plugin.RPCClient); ok {
    rpcClientClient.SyncStreams(os.Stdout, os.Stderr)
}
```

### 5. 重新连接（Reattach）

用于调试或保持插件运行：

```go
// 获取重新连接配置
config := client.ReattachConfig()

// 保存配置（JSON 序列化）
data, _ := json.Marshal(config)

// 之后重新连接
var reattachConfig plugin.ReattachConfig
json.Unmarshal(data, &reattachConfig)

// 使用 ReattachConfig 创建新客户端
newClient := plugin.NewClient(&plugin.ClientConfig{
    HandshakeConfig: handshakeConfig,
    Plugins: pluginSet,
    Reattach: &reattachConfig, // 不是 Cmd
})
```

### 6. 多插件类型（ServeMux）

```go
// 配置多个插件类型
plugin.ServeMux(plugin.ServeMuxMap{
    "database": &plugin.ServeConfig{
        HandshakeConfig: dbHandshake,
        Plugins: dbPluginSet,
    },
    "cache": &plugin.ServeConfig{
        HandshakeConfig: cacheHandshake,
        Plugins: cachePluginSet,
    },
})
```

---

## 完整示例：KV 存储插件

### 共享接口

```go
// shared/kv.go
package shared

import (
    "github.com/hashicorp/go-plugin"
    "net/rpc"
)

type KV interface {
    Put(key string, value []byte) error
    Get(key string) ([]byte, error)
    Delete(key string) error
}

type KVPlugin struct{}

func (KVPlugin) Server(broker *plugin.MuxBroker) (interface{}, error) {
    return &KVServer{Impl: &KVImpl{}}, nil
}

func (KVPlugin) Client(broker *plugin.MuxBroker, client *rpc.Client) (interface{}, error) {
    return &KVClient{client: client}, nil
}

type KVServer struct{ Impl KV }

func (s *KVServer) Put(args *KVArgs, resp *struct{}) error {
    return s.Impl.Put(args.Key, args.Value)
}

func (s *KVServer) Get(key string, resp *[]byte) error {
    val, err := s.Impl.Get(key)
    *resp = val
    return err
}

func (s *KVServer) Delete(key string, resp *struct{}) error {
    return s.Impl.Delete(key)
}

type KVClient struct{ client *rpc.Client }

func (c *KVClient) Put(key string, value []byte) error {
    return c.client.Call("Plugin.Put", &KVArgs{Key: key, Value: value}, nil)
}

func (c *KVClient) Get(key string) ([]byte, error) {
    var resp []byte
    err := c.client.Call("Plugin.Get", key, &resp)
    return resp, err
}

func (c *KVClient) Delete(key string) error {
    return c.client.Call("Plugin.Delete", key, nil)
}

type KVArgs struct {
    Key   string
    Value []byte
}

var HandshakeConfig = plugin.HandshakeConfig{
    ProtocolVersion:  1,
    MagicCookieKey:   "KV_PLUGIN",
    MagicCookieValue: "kv-store",
}
```

### 插件实现

```go
// plugin/main.go
package main

import (
    "sync"
    "github.com/hashicorp/go-plugin"
    "shared"
)

type KVImpl struct {
    data map[string][]byte
    mu   sync.RWMutex
}

func (k *KVImpl) Put(key string, value []byte) error {
    k.mu.Lock()
    defer k.mu.Unlock()
    k.data[key] = value
    return nil
}

func (k *KVImpl) Get(key string) ([]byte, error) {
    k.mu.RLock()
    defer k.mu.RUnlock()
    return k.data[key], nil
}

func (k *KVImpl) Delete(key string) error {
    k.mu.Lock()
    defer k.mu.Unlock()
    delete(k.data, key)
    return nil
}

func main() {
    plugin.Serve(&plugin.ServeConfig{
        HandshakeConfig: shared.HandshakeConfig,
        Plugins: plugin.PluginSet{
            "kv": &shared.KVPlugin{},
        },
    })
}
```

### 主程序

```go
// main.go
package main

import (
    "fmt"
    "log"
    "os/exec"
    "github.com/hashicorp/go-plugin"
    "shared"
)

func main() {
    client := plugin.NewClient(&plugin.ClientConfig{
        HandshakeConfig: shared.HandshakeConfig,
        Plugins: plugin.PluginSet{
            "kv": &shared.KVPlugin{},
        },
        Cmd: exec.Command("./plugin/kv-plugin"),
    })
    defer client.Kill()

    rpcClient, err := client.Client()
    if err != nil {
        log.Fatal(err)
    }

    raw, err := rpcClient.Dispense("kv")
    if err != nil {
        log.Fatal(err)
    }

    kv := raw.(shared.KV)
    
    // 使用 KV 存储
    if err := kv.Put("key1", []byte("value1")); err != nil {
        log.Fatal(err)
    }
    
    val, err := kv.Get("key1")
    if err != nil {
        log.Fatal(err)
    }
    
    fmt.Printf("key1: %s\n", string(val)) // 输出: key1: value1
}
```

---

## API 参考速查

### 核心函数

| 函数 | 说明 |
|------|------|
| `plugin.Serve(*ServeConfig)` | 启动插件服务器，插件 main 函数调用 |
| `plugin.NewClient(*ClientConfig) *Client` | 创建插件客户端 |
| `plugin.Discover(glob, dir string) ([]string, error)` | 发现插件文件 |
| `plugin.CleanupClients()` | 清理所有管理的插件进程 |

### Client 方法

| 方法 | 说明 |
|------|------|
| `Start() (net.Addr, error)` | 启动插件进程 |
| `Client() (ClientProtocol, error)` | 获取 RPC 客户端 |
| `Dispense(name string) (interface{}, error)` | 获取插件实例 |
| `Kill()` | 终止插件进程 |
| `Exited() bool` | 检查是否已退出 |
| `ID() string` | 获取插件 ID |
| `ReattachConfig() *ReattachConfig` | 获取重新连接配置 |

### 重要类型

**ClientConfig**
```go
type ClientConfig struct {
    HandshakeConfig
    Plugins          PluginSet
    Cmd              *exec.Cmd          // 插件命令
    Managed          bool               // 是否自动管理
    AllowedProtocols []Protocol         // 允许的协议
    Logger           hclog.Logger       // 日志器
    SyncStdout       io.Writer          // stdout 同步
    SyncStderr       io.Writer          // stderr 同步
    StartTimeout     time.Duration      // 启动超时
    SecureConfig     *SecureConfig      // 安全配置
}
```

**ServeConfig**
```go
type ServeConfig struct {
    HandshakeConfig
    Plugins     PluginSet
    GRPCServer  func([]grpc.ServerOption) *grpc.Server
    Logger      hclog.Logger
    Test        *ServeTestConfig
}
```

---

## 最佳实践

### 1. 版本管理
- 递增 `ProtocolVersion` 以确保兼容性
- 保留向后兼容性，支持旧版本插件

### 2. 错误处理
- 始终检查插件启动和调用的错误
- 使用 `client.Exited()` 检测插件崩溃
- 实现优雅的重试机制

### 3. 安全性
- 使用 `SecureConfig` 验证插件完整性
- 设置 `MagicCookie` 防止意外执行
- 限制插件文件权限

### 4. 性能
- 对于频繁调用，优先使用 gRPC（HTTP/2）
- 复用客户端连接
- 考虑使用 `MuxBroker` 减少连接数

### 5. 调试
- 使用 `ReattachConfig` 实现调试模式
- 启用日志同步查看插件输出
- 设置合理的超时时间

### 6. 资源管理
- 始终调用 `defer client.Kill()`
- 使用 `CleanupClients()` 在程序退出时清理
- 避免创建过多客户端实例

---

## 常见问题

**Q: 插件和主程序必须使用相同的 Go 版本吗？**
A: 不需要，但必须使用兼容的协议版本。gRPC 插件甚至可以非 Go 语言实现。

**Q: 如何调试插件？**
A: 使用 `ReattachConfig` 让插件不退出，然后用调试器附加到进程。

**Q: 插件进程意外退出怎么办？**
A: 检查 `client.Exited()`，实现自动重启逻辑。

**Q: 支持多少并发连接？**
A: 默认无限制，可通过 `GRPCServer` 选项配置。

**Q: 如何传递复杂参数？**
A: 使用 `MuxBroker` 创建额外的数据流，或使用 gRPC 的流式 API。

---

## 相关资源

- GitHub 仓库：https://github.com/hashicorp/go-plugin
- 官方文档：https://pkg.go.dev/github.com/hashicorp/go-plugin
