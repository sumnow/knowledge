# mini-moc

发送参数即可获得返回的随机结果. 

> 服务器地址为 `http://138.128.192.220:8080/` 

使用方法如下, 例如有接口文档如下: 

``` js
Reuquest: userid(string)
Response: phonenumber(int)
username(string)
```

然后, 代码如下: 

``` js
$.ajax({
    url: 'http://138.128.192.220:8080/phonenumber',
    userid: '03ed',
    message
})
```

message的值如下: 

``` js
$m.obj({
    phonenumber: $m.str_num(13, 13),
    username: $m.str(3, 8)
})
```

返回的值

``` js
responseJSON: phonenumber: "6841841157207",
    username: "uNwvCbfG"
$m.rint(0, 100) // 生成一个[0, 100]的随机整数
$m.bool() // 随机bool值
# m.cstr(0, 10) // 长度为0~10的随机中文字符串
$m.str_upp(0, 10) // 长度为0~10的随机大写字母
$m.str_low(0, 10) // 长度为0~10的随机小写字母
$m.str_num(0, 10) // 长度为0~10的随机数字字符串
$m.obj({
    name: '123',
    name2: $m.cstr(1, 3),
}) // 传入一个对象, 生成该对象的复制
$m.arr() // 长度为0~10的随机大写字母
```

