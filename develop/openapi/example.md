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
