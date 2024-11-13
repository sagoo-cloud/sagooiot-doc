# 通知配置

本系统的通知发送通道是基于插件的方式提供。每一种发送通道都是一个系统插件。通过通知配置管理的页面进入到每一种配置中进行设置。

通知的配置是采用yaml格式进行编写的，请注意[yaml编写规范](/guide/other/yaml.html) 。


## 短信配置

参考示例：

```yaml
ProviderName: "alisms"
Title: "阿里云"
RegionId: "cn-hangzhou"
AccessKeyId: "LsfsdfsdfI6B"
AccessSecret: "AsesfsfsdfdsfsdfeqLZIwYjxa"
SignName: "SagooIOT"
```


## 邮件配置

参考示例：

```yaml
MailHost: "smtp.qq.com"
MailPort: "465"
MailUser: "xxxxx@qq.com"
MailPass: "232ddwdzplnabiig"
```

## 钉钉配置

参考示例：
```yaml

AppKey: "sdfadfasdfasdfasdfasdf"
AppSecret: "ewrerwerwerrwerwerwerwer"

```

## 企业微信配置

支持企业微信自建应用发送消息。

需要企业微信管理员在企业微信后台创建应用，获取到应用的相关信息。

应用管理--》创建应用

创建好应用后，需要在“启用接收消息”--》设置API接收 获取Token与EncodingAESKey。些处要求的回调地址验证，

请填写：`http://你的域名/api/v1/wework/verify`


注意：如果在告警规则等地方使用企业微信发送信息的时候，接收人为：在企业微信的个人账号。

参考示例：

```yaml
Corpid: ""
AgentID: ""
Secret: ""
Token: ""
EncodingAESKey: ""

```

## Webhook配置

webhook可以配置多个联动地址。

参考示例：

```yaml
webhook:
  - PayloadURL: "https://qyapi.weixin.qq.com/cgi-bin/webhook/send"
    Secret: "4f812376-e24e-47ba-7e1b-9138115221d2"
    From: "wework"
  - PayloadURL: "http://127.0.0.1:8180/test/webhook22"
    Secret: "aaaadfasdfasf22"
  - PayloadURL: "http://127.0.0.1:8180/test/webhook33"
    Secret: "aaaadfasdfasf333"
```

PayloadURL：回调地址
Secret: 调用密钥
From: 来源，用于区分不同的webhook配置，可选值：`wework` (企业微信webhook方式机器人)

默认为自定义webhook的方式。需要自己在编写回调地址程序里进行内容处理。
