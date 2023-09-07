# 调用示例

## Golang

```go

		ak := "aadfsdfsa" //Access Key
		sk := "asfwerttytyrtyewrwerfasdfsfsfsf2" //Secret Key

		// 获取当前时间戳
		timestamp := strconv.FormatInt(time.Now().Unix(), 10)
		
		// 生成签名
		message := "ak=" + ak + "&time=" + timestamp
		sign := GenerateSignature(message, sk)
		
		// 构造请求URL
		requestURL := "http://127.0.0.1:8199/openapi/v1/product/device/page_list?pageNum=1&pageSize=10&ak=aadfsdfsa&time=" + timestamp + "&sign=" + sign
		fmt.Println(requestURL)
		
		//Http 客户端进行调用
		.........
		

```


## Java

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

## PHP

```php
<?php
function GenerateSignature($message, $secret) {
    $key = $secret;
    return strtolower(hash_hmac("sha256", $message, $key));
}
?>

```

## Python

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

## Javascript

```javascript

const crypto = require('crypto');

function GenerateSignature(message, secret) {
    const key = secret;
    const hmac = crypto.createHmac('sha256', key);
    hmac.update(message);
    return hmac.digest('hex').toLowerCase();
}


```

## C#

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
