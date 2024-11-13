---
sidebar_position: 0
---
# 使用说明

规则引擎是物联网平台的一个极其重要的功能模块，是处理复杂逻辑的引擎,它按照用户设定的条件，在设备和物联网平台之间进行消息的处理和传递。

强大的可视化规则设计器.
![img_1.png](../imgs/ruleEngine/rule-engine.jpg)


## 添加注入节点

注入节点允许您将消息注入流中，在左侧的节点中找到`inject`节点，把它拖动到编辑器中。如图所示：
![img_1.png](../imgs/ruleEngine/rule_instance_02_01-03bb3c982967f4825c6f96760d88df11.png)

## 添加调试节点

`debug`节点会在调试侧栏中输出调试信息，在左侧的节点中找到`debug`节点，把它拖动到编辑器中。

## 将两者连接在一起

通过在一个节点的输出端口与另一个节点的输入端口之间拖动来将 Inject 节点和 Debug 节点连接在一起。
效果如图：
![img.png](../imgs/ruleEngine/ruleengine002.png)

## 部署

此时，节点仅存在于编辑器中，必须部署到服务器中才能生效。
点击右上角的"保存并运行"按钮。
![img_2.png](../imgs/ruleEngine/ruleengine001.png)

## 查看调试信息

点击"注入"按钮。在调试信息栏中我们会看到输出的信息。
![img](../imgs/ruleEngine/rule_instance_02_05-f793dc9c7d462175711587cbd2b7f624.gif)
