---
sidebar_position: 1
---
# 源码编译

## 安装依赖

`go mod download` 或 `go mod tidy`

## 修改项目配置文件

将 `manifest/config/config.example.yaml` 这个文件改名为 `config.yaml`，并修改其中的配置项。


请跟据注释进行配置修改，包括服务相关配置，日志相关配置。

## 导入业务数据表
在manifest目录下，有一个`init.sql`文件，将该文件导入到mysql数据库中，创建数据库表。

`go run main.go`

## 关于build.sh编译脚本

可以使用build.sh进行程序编译。可选编译参数有linux、windows、mac。

如编译mac版本：
```shell
./build.sh mac
```

如果在使用build.sh脚本进行程序编译时，提示

```
fatal: No names found, cannot describe anything.
./build.sh linux|windows|mac

```
是因为源码没有进行git版本的标签设置。

这个编译脚本支持将git的tag编译到程序中，所以需要创建git的tag。只有创建了tag，编译后的程序才会显示版本号。

创建tag的命令如下：
```
git tag v0.0.1

git push origin v0.0.1
```
注意：v0.0.1是tag的版本号，可以根据实际情况进行修改。

## 编译后执行脚本

编译后生成的可执行文件放在bin目录下，将bin目录下的文件放到目标服务器，执行`./curl.sh start` 运行即可。

```
curl.sh脚本参数：

start|stop|restart|status|tail

```

分别对应 启动、停止、重启、状态、显示动态日志运行信息



