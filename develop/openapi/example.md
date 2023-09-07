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

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.Instant;

public class AkskTest {

    /**
     * 生成签名
     * @param message
     * @param secret
     * @return
     */
    public static String generateSignature(String message, String secret) {
        try {
            SecretKeySpec keySpec = new SecretKeySpec(
                    secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");

            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(keySpec);

            byte[] rawHmac = mac.doFinal(message.getBytes(StandardCharsets.UTF_8));

            return DatatypeConverter.printHexBinary(rawHmac).toLowerCase();

        } catch (Exception e) {
            throw new RuntimeException("Unable to generate HMAC : " + e.getMessage(), e);
        }
    }

    /**
	 * 使用jdk8版本
	 */
    public static void main() {

        String ak = "aadfsdfsasdfssdf"; // Access Key
        String sk = "asdfasdfasdfdsdfadfwojdsf"; // Secret Key

        // 获取当前时间戳
        String timestamp = String.valueOf(Instant.now().getEpochSecond());

        // 生成签名
        String message = "ak=" + ak + "&time=" + timestamp;
        String sign = generateSignature(message, sk);

        // 构造请求URL
        String requestURL = "http://localhost:8199/openapi/v1/product/device/page_list?pageNum=1&pageSize=10&ak=" + ak + "&time=" + timestamp + "&sign=" + sign;
        System.out.println(requestURL);

        // 创建 HttpClient 实例
        CloseableHttpClient httpClient = HttpClients.createDefault();

        // 创建 GET 请求对象
        HttpGet httpGet = new HttpGet(requestURL);

        try {
            // 发送请求并获取响应
            CloseableHttpResponse response = httpClient.execute(httpGet);

            // 获取响应实体
            HttpEntity entity = response.getEntity();

            // 输出响应状态码和响应体
            System.out.println("Response Code: " + response.getStatusLine().getStatusCode());
            System.out.println("Response Body: " + EntityUtils.toString(entity));

            // 关闭响应
            response.close();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                // 关闭 HttpClient
                httpClient.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
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
