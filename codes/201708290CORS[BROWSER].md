<!--
Created: Mon Aug 26 2019 15:17:34 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:17:34 GMT+0800 (China Standard Time)
-->
# CORS权限控制

CORS(Corss-origin resource sharing)是一种新的数据交互标准. 

依旧是XHR请求, 但是克服了ajax的跨域问题. 

## 请求类别

CORS主要分为两种请求方式: 简单请求和非简单请求

只要满足两个条件就是简单请求: 

1. 请求的方法是HEAD或GET或POST

2. HTTP的头部信息不超出以下字段: Accept、 Accept-Language、 Content-Language、 Last-Event-ID、 Content-Type

> 其中Content-Type的值只可以是application/x-www-form-urlencoded、 multipart/form-data、 text/plain.

其余都是非简单请求

## 简单请求 simple request

浏览器发起一个简单请求, 在头信息中多加了一个Origin字段. 

``` js
GET / cors HTTP / 1.1
Origin: http: //api.bob.com
    Host: api.alice.com
Accept - Language: en - US
Connection: keep - alive
User - Agent: Mozilla / 5.0...
```

服务器依据设置判断是否允许来自Origin的地址的访问, 如果允许就返回请求的值. 

``` js
Access - Control - Allow - Origin: http: //api.bob.com
```

返回的值中会有 `Access-Control-Allow-Origin` 字段, 代表允许的地址值. 

> Access-Control-Allow-Origin 可以设置为 * , 代表允许任何地址访问. 

### 非简单请求

发起非简单请求时, 浏览器会先发起依次预检请求, 检查 `Origin` 、 `Access-Control-Request-Method` 和 `Access-Control-Request-Headers` 之后, 做出回应. 

``` js
xhr.setRequestHeader('X-Custom-Header', 'value'); //xhr请求中自定义的头部字段
OPTIONS / cors HTTP / 1.1
Origin: http: //api.bob.com
    Access - Control - Request - Method: PUT
Access - Control - Request - Headers: X - Custom - Header //包含的头部自定义字段
Host: api.alice.com
Accept - Language: en - US
Connection: keep - alive
User - Agent: Mozilla / 5.0...
```

预检请求的回应

``` js
HTTP / 1.1 200 OK
Date: Mon, 01 Dec 2008 01: 15: 39 GMT
Server: Apache / 2.0 .61(Unix)
Access - Control - Allow - Origin: http: //api.bob.com // 允许的地址
    Access - Control - Allow - Methods: GET, POST, PUT // 允许的方法
Access - Control - Allow - Headers: X - Custom - Header // 允许的头部自定义字段
Content - Type: text / html;
charset = utf - 8
Content - Encoding: gzip
Content - Length: 0
Keep - Alive: timeout = 2, max = 100 // max代表此条预检请求有效期为100s, 此期间内无需发起预检请求。 
Connection: Keep - Alive
Content - Type: text / plain
```

如果请求发送失败, 多半是OPTIONS请求被拦截, 服务器只要针对 `OPTIONS` 方法, 在请求头中返回 `Access-Control-Allow-Origin` , 
`Access-Control-Allow-Methods` , `Access-Control-Allow-Headers` 即可. 

