# userAgent 

## 判断用户的使用设备

``` js
function isiOS() {
    var u = navigator.userAgent;
    // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; 
    var isiOS = !!u.match(/\(i[^; ]+; ( U; )? CPU.+Mac OS X/); //ios终端
    return isiOS;
}
```

## navigator.userAgent

``` js
// macbook 模拟iphone6
"Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"

// macbook
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36"

// ubuntu 16.04 LTS
"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
```

其中 `Mozilla/5.0` 是代表和Mozilla渲染引擎的兼容性, 括号中是设备的信息, AppleWebkit 就是常说的webkit内核, 正是因为apple开发的浏览器核心的优越, 让google选择合作, 之后是chrome的版本和safari的版本. 

### 浏览器内核

* Trident 内核

远古内核, ie, 以及国内一票浏览器的兼容模式. 

* Gecko 内核

Firefox, Netscape6

* Presto 内核

Opera7 以上, 现在已经转向Blink

* WebKit 内核

Safari , Chrome(目前转向Blink)

* Blink 内核

Webkit 内核的分支

