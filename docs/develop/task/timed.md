# 定时任务

SagooIoT基于Asynq实现了定时任务的处理。定时任务是指在指定的时间点执行任务。例如：每天定时备份数据、清理过期日志、数据同步等。

系统中统一在`internal/tasks`目录下实现定时任务的处理器。实现起来很简单，只需要实现处理的方法并添加列表即可。

如添加一个访问指定URL的定时任务处理器：

1，实现任务处理的方法

```go

// GetAccessURL 执行访问URL
func (t TaskJob) GetAccessURL(accessURL string) {
	ctx := context.Background()
	g.Log().Debug(ctx, "访问URL：", accessURL)
	res, err := g.Client().Get(ctx, accessURL)
	if err != nil {
		g.Log().Error(ctx, err)
	}
	defer func(res *gclient.Response) {
		if err := res.Close(); err != nil {
			g.Log().Error(ctx, err)
		}
	}(res)
}

```
:::warning 注意
方法必须是公开的方法，方法的参数可以是任意类型，但是必须是一个参数。必须基于TaskJob结构体实现。
:::


2，在`internal/tasks`目录下base.go中添加任务处理器列表

```go

func (t TaskJob) GetFuncNameList() (res map[string]string) {
	res = map[string]string{
		"GetAccessURL":            "访问URL", // 添加访问指定URL定时任务处理方法的描述
	}
	return
}

```

:::warning 注意
res的key是方法名，value是方法的描述。

:::
