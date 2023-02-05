# 发送通道配置

本系统的通知发送通道是基于插件的方式提供。每一种发送通道都是一个系统插件。通过通知配置管理的页面进入到每一种配置中进行设置。

通知的配置是采用yaml格式进行编写的，请注意[yaml编写规范](/guide/other/yaml.html) 。


## 短信配置

参考示例：

```yaml
ProviderName: "alisms"
Title: "阿里云"
RegionId: "cn-hangzhou"
AccessKeyId: "LsfsdfsdfI6B"
accessSecret: "AsesfsfsdfdsfsdfeqLZIwYjxa"
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

## 语音配置


## 钉钉配置


## 企业微信配置



## Webhook配置

webhook可以配置多个联动地址。

参考示例：

```yaml
webhook:
  - PayloadURL: "http://127.0.0.1:8180/test/webhook"
    Secret: "aaaadfasdfasf"
  - PayloadURL: "http://127.0.0.1:8180/test/webhook22"
    Secret: "aaaadfasdfasf22"
  - PayloadURL: "http://127.0.0.1:8180/test/webhook33"
    Secret: "aaaadfasdfasf333"
```

