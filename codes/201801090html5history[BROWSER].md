<!--
Created: Mon Aug 26 2019 15:19:14 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:19:14 GMT+0800 (China Standard Time)
-->
# html5 History

在左树右表这种场景中, 常见的是url不变, 使用ajax无刷新更新页面信息, 有个问题就是refresh, forward, back之后, 没有办法保存页面的状态. 因为ajax本身不更新浏览器的状态信息. 

对此提供了两种解决方案. 

## hash

主要是看 `window.location` , 举个例子.

``` js
{
    "href": "https://developer.mozilla.org/en-US/docs/Web/API/History_API?test=1#test",
    "ancestorOrigins": {},
    "origin": "https://developer.mozilla.org",
    "protocol": "https:",
    "host": "developer.mozilla.org",
    "hostname": "developer.mozilla.org",
    "port": "",
    "pathname": "/en-US/docs/Web/API/History_API",
    "search": "?test=1",
    "hash": "#test"
}
```

这是利用了 `window.location` 的hash功能, 例如页面中跳转锚点 `#a=1` 这种, #之后的地址是被忽略的, 只会改变页面. 

不过, JavaScript修改location的除hash外的任意属性, 页面都会以新URL重新加载. 而唯一不引发刷新的hash参数并不会发送到服务器, 因此服务器无法获得状态. 

## Manipulating the browser history

### history.length

chrome中默认长度为2, 最大值为50, 每次前进后退+1/-1

### history.pushState()

history.pushState(stateObj, title, url)

其中, `stateObj` 是一个状态对象, title是一个多数浏览器忽略的属性, url为可选参数. 每次执行, 往state数组中添加一个state, 到达最大值后, 每次添加末尾state, 移出队首的state

### history.replaceState()

history.replaceState(stateObj, title, url)

同 `pushState` 唯一区别是使用参数中的url替换当前的url, 不改变 `history.length` 

### history.forward, history.back, history.go

等同浏览器的前进后退

`go(1)` 等同 `forward` 

`go(-1)` 等同 `back` 

`go(0)` 等同 `refresh` 

如果go参数无效(超过最大值或者state队列长度), 则无效, 也不报错. 

### history.scrollRestoration

默认值为"auto", 可以选为"manual"

这个方法在forward或者back时, 会保存滚动的距离, 再次进入时, 会自动展示到上次滚动的地方. 

选为"manual"就可以关闭这个功能. 

``` js
history.scrollRestoration = "manual"
```

### window.onpopstate()

执行forward操作时, 会触发的回调函数, 可以取出每个state

``` js
const hisH = document.getElementById('histroyHtml')

function nextTheme() {
    var state = {
        'page_id': new Date().getSeconds(),
        'user_id': 5
    };
    var title = 'Hello World';
    var url = 'hum.html?name=423';
    window.history.pushState(state, title, url)
    console.log(window.history)
    // window.history.replaceState(state, title, url)
    hisH.innerHTML = state.page_id
}
window.onpopstate = function() {
    console.log(window.history.state)
}
```

