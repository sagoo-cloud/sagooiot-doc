---
sidebar_position: 2
---
# 英文标识符命名规范

> 该规范引用ICA数据标准平台 ，解释原文: [英文标识符命名规范](https://g.alicdn.com/aic/ica-docs/1.0.4/za5izx.html)

## 语言使用规范

• 使用 U.S. English 来拼写标识符。

> 例如，使用Color，而不是Colour。

• 尽可能使用在世界范围内被广泛认可的缩写，可参考RFC EditorAbbreviations List （http://www.rfc-editor.org/materials/abbrev.expansion.txt）中带星号的，并且全部大写。

> 例如，使用HTML orID（for identity），但是不要使用temp来表示temperature。

• 名字的长度：中文不超过20个字符，英文不超过50个字符。

## 功能命名规范

• 属性, 服务和事件，以及对应参数的英文标识符需要使用『大骆峰命名法』且不带任何标点。

> 注1：必须以字母必须以字母开头，且只包含字母和数字。
>
> 注2：若是同一个功能的多例化，如开关1，2，3，命名时可以在功能名称后加上下划线和编号，例如，开关1，2，3， 可以命名为Switch_1, Switch_2, Switch_3。

• 属性（Property）的英文标识符要使用名词，或者断言。

> 例如，Temperature（温度）,IsClosed（是否关闭的状态）。

• 服务（Service）的英文标识符名称要使用以动词开头。

> 例如，GetColor 或者 ToggleSwitch。

• 事件（Event）的英文标识符需要描述代表的事件含义。

> 例如，Error，Warning，Notification。

• 参数的英文标识符需要有一个描述性的命名，以便理解参数的具体含义。
