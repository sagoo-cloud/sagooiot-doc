# 协议插件开发

SagooIOT的私有协议解决采用的是插件的方式进行扩展支持的。

插件的源码示例参考 https://github.com/sagoo-cloud/protocol-plugin-tgn52

插件的目录结构如下：

```angular2html
--built 编译输出目录
--config 插件配置目录
--Makefile 插件编译脚本
--xxxx.go
--plugin_test.go 插件测试程序
```

## 插件开发

协议插件开发需要实现的SagooIOT系统中协议接口。
定义一个要实现的插件的结构体，必须要实现的接口有Info，Encode，Decode三个方法。详细实现参阅插件示例。

方法的入参与返回值必须使用SagooIOT预先定义的model。


