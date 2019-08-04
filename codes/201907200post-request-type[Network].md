# post请求

## application/x-www-form-urlencoded

这应该是最常见的 POST 提交数据的方式了. 浏览器的原生 `<form>` 表单, 如果不设置 enctype 属性, 那么最终就会以 `application/x-www-form-urlencoded` 方式提交数据. 请求类似于下面这样(无关的请求头在本文中都省略掉了):

``` BASH
POST http://www.example.com HTTP/1.1
Content-Type: application/x-www-form-urlencoded;charset=utf-8

title=test&sub%5B%5D=1&sub%5B%5D=2&sub%5B%5D=3

```

首先, Content-Type 被指定为 application/x-www-form-urlencoded; 其次, 提交的数据按照 key1=val1&key2=val2 的方式进行编码, key 和 val 都进行了 URL 转码. 大部分服务端语言都对这种方式有很好的支持. 例如 PHP 中, $_POST['title'] 可以获取到 title 的值, $_POST['sub'] 可以得到 sub 数组.

很多时候, 我们用 Ajax 提交数据时, 也是使用这种方式. 例如 JQuery 和 QWrap 的 Ajax, Content-Type 默认值都是「application/x-www-form-urlencoded; charset=utf-8」.

## multipart/form-data

这又是一个常见的 POST 数据提交的方式. 我们使用表单上传文件时, 必须让 <form> 表单的 enctype 等于 multipart/form-data. 直接来看一个请求示例:

``` BASH
POST http://www.example.com HTTP/1.1
Content-Type:multipart/form-data; boundary=----WebKitFormBoundaryrGKCBY7qhFd3TrwA

------WebKitFormBoundaryrGKCBY7qhFd3TrwA
Content-Disposition: form-data; name="text"

title
------WebKitFormBoundaryrGKCBY7qhFd3TrwA
Content-Disposition: form-data; name="file"; filename="chrome.png"
Content-Type: image/png

PNG ... content of chrome.png ...
------WebKitFormBoundaryrGKCBY7qhFd3TrwA--
```

## application/json

application/json 这个 Content-Type 作为响应头大家肯定不陌生. 实际上, 现在越来越多的人把它作为请求头, 用来告诉服务端消息主体是序列化后的 JSON 字符串. 由于 JSON 规范的流行, 除了低版本 IE 之外的各大浏览器都原生支持 JSON.stringify, 服务端语言也都有处理 JSON 的函数, 使用 JSON 不会遇上什么麻烦.

JSON 格式支持比键值对复杂得多的结构化数据, 这一点也很有用. 记得我几年前做一个项目时, 需要提交的数据层次非常深, 我就是把数据 JSON 序列化之后来提交的. 不过当时我是把 JSON 字符串作为 val, 仍然放在键值对里, 以 x-www-form-urlencoded 方式提交.

Google 的 AngularJS 中的 Ajax 功能, 默认就是提交 JSON 字符串. 例如下面这段代码:

``` JS
var data = {
  'title': 'test',
  'sub': [1, 2, 3]
};
$http.post(url, data).success(function(result) {
  ...
});
```

最终发送的请求是:

``` BASH
POST http://www.example.com HTTP/1.1 
Content-Type: application/json;charset=utf-8

{"title":"test","sub":[1,2,3]}
```

这种方案, 可以方便的提交复杂的结构化数据, 特别适合 RESTful 的接口. 各大抓包工具如 Chrome 自带的开发者工具、Firebug、Fiddler, 都会以树形结构展示 JSON 数据, 非常友好. 但也有些服务端语言还没有支持这种方式, 例如 php 就无法通过 $_POST 对象从上面的请求中获得内容. 这时候, 需要自己动手处理下: 在请求头中 Content-Type 为 application/json 时, 从 php://input 里获得原始输入流, 再 json_decode 成对象. 一些 php 框架已经开始这么做了.

## text/xml

我的博客之前提到过 XML-RPC(XML Remote Procedure Call). 它是一种使用 HTTP 作为传输协议, XML 作为编码方式的远程调用规范. 典型的 XML-RPC 请求是这样的:

HTML
POST http://www.example.com HTTP/1.1 
Content-Type: text/xml

``` xml
<?xml version="1.0"?>
<methodCall>
    <methodName>examples.getStateName</methodName>
    <params>
        <param>
            <value><i4>41</i4></value>
        </param>
    </params>
</methodCall>
```

XML-RPC 协议简单、功能够用, 各种语言的实现都有. 它的使用也很广泛, 如 WordPress 的 XML-RPC Api, 搜索引擎的 ping 服务等等. JavaScript 中, 也有现成的库支持以这种方式进行数据交互, 能很好的支持已有的 XML-RPC 服务. 不过, 我个人觉得 XML 结构还是过于臃肿, 一般场景用 JSON 会更灵活方便.

