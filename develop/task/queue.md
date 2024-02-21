# 消息队列

在SagooIoT中实现消息队列的处理方式很简单，只需要实现一个消息队列处理器即可。
系统中定义了消息队列的实现接口，可以通过消息队列实现进程间通信。消息队列是消息的链表，每个消息队列都有一个唯一的标识符，用于标识消息队列。消息队列的消息是一个结构体，包含消息分组、唯一ID、消息数据部分。

如：消息队列的结构体定义如下：

```go
type Payload struct {
	Group   string `json:"group"`
	Uid     string `json:"uid"`
	Payload []byte `json:"payload"`
}
```

实现自己的消息队列处理器，需要实现以下接口：

```go
type Queue interface {
    // 返回消息队列的主题
    GetTopic() string
    
    // 处理消息队列的消息
    Handle(ctx context.Context, p worker.Payload) (err error)
}
``` 

可以参考工程中实现的系统操作日志记录的处理过程。位置在：`internal/queues/sysOperLog.go`。
