
# 基础知识

平台中内置了规则引擎,`设备告警`,`场景联动`均由规则引擎执行.

## 概述

#### 什么是规则引擎？
规则引擎是物联网平台的一个极其重要的功能模块，是处理复杂逻辑的引擎,它按照用户设定的条件，在设备和物联网平台之间进行消息的处理和传递。


## 应用场景
- 对设备上报的原始消息进行处理和转换，生成服务端需要的数据，存储在数据库中。
- 将设备上报的属性，转发到第三方服务器。
- 当设备上报属性达到某个条件时，向另一个设备下发命令。

## 名词说明

- **RuleModel(规则模型)**:由多个`RuleNode(规则节点)`,`RuleLink(规则连线)`组成
- **RuleNode(规则节点)**: 规则节点描述具体执行的逻辑
- **RuleLink(规则连线)**: 用于将多个节点连接起来,将上一个节点的输出结果作为下一个节点的输入结果.
- **Input(输入)**: 规则节点的数据输入
- **Output(输出)**: 规则节点的数据输出
- **Scheduler(调度器)**: 负责将模型转为任务(`Job`),并进行任务调度到`Worker`
- **Worker(工作器)**: 负责执行,维护任务.
- **ExecutionContext(执行上下文)**: 启动任务时的上下文,通过上下文获取输入输出配置信息等进行任务处理.
- **TaskExecutor(任务执行器)**: 具体执行任务逻辑的实现
- **TaskExecutorProvider(任务执行器提供商)**: 用于根据模型配置以及上下文创建任务执行器.
- **RuleData(规则数据)**: 任务执行过程中的数据实例

## 规则模型数据结构

```text
//规则模型
RuleModel{ 
    events:[ RuleLink ]     # 事件连接点,用于自定义规则事件的处理规则
    nodes:[ RuleNodeModel ] # 所有节点信息，包含事件节点
}
//节点模型
RuleNodeModel{
    executor: ""            # 节点执行器标识
    configuration: { Map }  # 节点配置
    events:[ RuleLink ]     # 事件连接点,用于自定义节点事件的处理规则
    inputs:[ RuleLink ]     # 输入连接点
    outputs:[ RuleLink ]    # 输出连接点
}
//连接点，将2个规则节点关联
RuleLink{
    type: ""                # 类型，为事件节点连接时值为对应当事件标识
    condition: Condition    # 连接条件
    source: RuleNodeModel   # 连接节点
    target: RuleNodeModel   # 被连接节点
}
//条件
Condition{
    type: ""                # 条件类型。如: expression
    configuration: { Map }  # 条件配置
}
```

## 
