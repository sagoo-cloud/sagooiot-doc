# OpenAPI 说明

SagooIOT提供OpenAPIs功能，方便第三方应用直接调用系统相关的开发接口。

该接口是通过AK/SK的方式进行鉴权。需要调用方跟据Secret Key与Access Key值计算签名。


## 什么是AKSK
ak/sk是一种身份认证方式，常用于系统间接口调用时的身份验证，其中ak为Access Key ID，sk为Secret Access Key。客户端和服务端两者会协商保存一份相同的sk，其中sk必须保密。

## AK/SK认证过程
客户端在调用的服务端接口时候，会带上ak以及signature（使用sk对内容进行加密后得出的签名）进行请求，在服务端接收到这个请求的时候，首先会根据ak去数据库里面去找到对应的sk，然后使用sk对请求内容进行加密得到一个签名，然后对比客户端传过来的签名和服务端计算的出来的签名是否一致，如果一致则代表身份认证通过，反之则不通过。

ak：标明请求方是谁，即该例子中的ak

time：请求时间，时间戳，将会被对应的sk配合加密算法进行加密，得到一个signature签名

sign：签名，使用sk配合对应的加密算法后进行加密得到的签名。

当发送请求时，会带上这几个参数去请求接口，如请求：
https://xxx.com/students?ak=reewrwererw&time=1640494526&sign=54acba6857b284a8a481ed5913edd34d994721cc584305ff02c81bb3ced17212

## 使用方式

1，客户端生成签名

2，客户端发送请求时，携带ak然后通过sk方式加密

3，服务端接到请求后校验签名

## 签名生成方式

go语言的直接看系统代码里面的单元测试文件，或是通过[示例了解](example.md)

其它语言：

### Java

```jade

import java.security.MessageDigest;
import java.util.Base64;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

public class HMACSHA256 {
    public static String GenerateSignature(String message, String secret) {
        try {
            Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
            SecretKeySpec secret_key = new SecretKeySpec(secret.getBytes("UTF-8"), "HmacSHA256");
            sha256_HMAC.init(secret_key);
            byte[] hash = sha256_HMAC.doFinal(message.getBytes("UTF-8"));
            return Base64.getEncoder().encodeToString(hash).toLowerCase();
        } catch (Exception e) {
            System.out.println("Error: " + e);
        }
        return "";
    }
}

```

### PHP

```php
<?php
function GenerateSignature($message, $secret) {
    $key = $secret;
    return strtolower(hash_hmac("sha256", $message, $key));
}
?>

```

### Python

```Python
import hmac
import hashlib
import base64

def GenerateSignature(message, secret):
    key = bytes(secret, 'latin-1')
    message = bytes(message, 'latin-1')
    signature = hmac.new(key, message, hashlib.sha256)
    return base64.b64encode(signature.digest()).decode().lower()

```

### Javascript

```javascript

const crypto = require('crypto');

function GenerateSignature(message, secret) {
    const key = secret;
    const hmac = crypto.createHmac('sha256', key);
    hmac.update(message);
    return hmac.digest('hex').toLowerCase();
}


```

### C#

```C#

using System;
using System.Security.Cryptography;

namespace HMACSHA256 {
    public class SignatureGenerator {
        public static string GenerateSignature(string message, string secret) {
            var key = System.Text.Encoding.UTF8.GetBytes(secret);
            using (var hmac = new HMACSHA256(key)) {
                hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(message));
                return BitConverter.ToString(hmac.Hash).Replace("-", "").ToLower();
            }
        }
    }
}


```
