<!--
Created: Mon Aug 26 2019 15:22:12 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:22:12 GMT+0800 (China Standard Time)
-->
# Get 请求的参数错误

get 请求一般会将参数这样 `?key1=value1&key2=value2` 拼接在url的后面

> get 和 post 请求并不是严格将参数放置在header或者body上, 只是一种通用规范, 偶尔还是会有不符合要求的请求出现.

今天发现在value1为对象数组的时候会出现有趣的事情, 例如 `key1=[{"a":"2"}]&key2=1` 

在chrome中查看, 发现query string params被解析成这样:

``` chrome
    key1[]: "{\"a\": \"2\"}"
    key2: 1
```

key1中的引号都被转义了, 这是因为整个对象变成了一个字符串, 解决这种问题其实有个好方法, 将所有的参数包裹在一个对象里

例如, `{data: {key1:[{"a":"2"}], key2:1}}` 这样, 只需要在服务器端 `JSON.parse` 就可以转成正常的对象了

