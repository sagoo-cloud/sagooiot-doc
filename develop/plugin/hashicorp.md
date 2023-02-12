# SagooIOT插件开发流程

SagooIOT gRPC plugin是使用HashiCorp/go-plugin框架实现的，它遵循开闭原则，通过接口固定上层业务逻辑，通过改变实现的RPC服务接口来扩展业务。Go Plugin提供了两类插件：RPC插件和GRPC插件，这两类插件的客户端的底层调用方式不同。前者使用net/rpc，后者使用grpc服务调用。这两种插件都提供了Server和Client方法。Server方法充当了服务端stub，当服务端接收到请求后，调用接口的服务端实现。Client方法是一个工厂方法，用于生成客户端接口实现对象。

![plugin001](../../public/imgs/develop/plugin/plugin001.png)

Go Plugin在启动过程中会启动一个子进程，运行RPC/gRPC服务。主进程可以通过RPC/gRPC接口来调用插件，支持多版本的服务并存。然而，Go Plugin本身不提供服务的高可用解决方案，需要自己来提供。
