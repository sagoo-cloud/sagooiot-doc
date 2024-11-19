---
title: '消息队列'
sidebar_position: 1
hide_title: true
keywords: [iot开发,SagooIoT开发,消息队列]
description: '消息队列的使用,在SagooIoT中实现消息队列的处理方式'
---

在SagooIoT中实现消息队列的处理方式很简单，只需要实现一个消息队列处理器即可。
系统中定义了消息队列的实现接口，可以通过消息队列实现进程间通信。消息队列是消息的链表，每个消息队列都有一个唯一的标识符，用于标识消息队列。消息队列的消息是一个结构体，包含消息分组、唯一ID、消息数据部分。

用于处理异步任务、支持普通处理和聚合处理两种处理方式。



## 创建普通处理器

```go
// 1. 定义处理器结构体
type qDeviceAlarmLog struct {
    worker.BaseProcess
}

// 2. 实现 GetTopic 方法
func (q *qDeviceAlarmLog) GetTopic() string {
    return "your-topic-name"
}

// 3. 实现 Handle 方法
func (q *qDeviceAlarmLog) Handle(ctx context.Context, p worker.Payload) (err error) {
    // 处理业务逻辑
    return nil
}

// 4. 注册处理器
var ScheduledDeviceAlarmLog = new(worker.Scheduled)
func ScheduledDeviceAlarmLogRun() {
    ScheduledDeviceAlarmLog = worker.RegisterProcess(DeviceAlarmLog)
}
```

## 创建聚合处理器

```go
// 1. 定义处理器结构体
type qDeviceDataSave struct {
    worker.BaseProcess
}

// 2. 实现 GetProcessConfig 方法
func (q *qDeviceDataSave) GetProcessConfig() *worker.ProcessConfig {
    return &worker.ProcessConfig{
        Topic:       "your-topic-name",
        ProcessType: worker.AggregateProcess,
    }
}

// 3. 实现 HandleAggregate 方法
func (q *qDeviceDataSave) HandleAggregate(ctx context.Context, task *asynq.Task) (err error) {
    // 处理聚合业务逻辑
    return nil
}

// 4. 注册处理器
var DeviceDataSaveWorker = new(worker.Scheduled)
func TaskDeviceDataTsdSaveRun() {
    DeviceDataSaveWorker = worker.RegisterProcess(DeviceDataSave)
}
```

:::info 提示
**批量处理**
对于需要批量处理的场景，建议使用聚合处理器，可以显著提高处理效率。
:::

## 注意事项

1. 处理器必须实现 Process 接口
2. 聚合处理器需要实现 GetProcessConfig 方法并返回正确的配置
3. 普通处理器和聚合处理器的处理方法互斥，根据场景选择合适的处理方式
4. 建议为所有处理器添加超时控制
5. 对于大量数据处理，建议使用对象池优化性能
6. 必须正确处理错误并记录日志

## 参考示例

**设备告警日志**

适用于单条数据处理的场景，使用普通处理器。

**设备数据保存**

适用于需要批量处理的场景，使用聚合处理器，可以提高数据处理效率。

