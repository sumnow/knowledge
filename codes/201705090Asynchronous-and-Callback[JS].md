<!--
Created: Mon Aug 26 2019 15:17:08 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:17:08 GMT+0800 (China Standard Time)
-->
#  异步和回调

这两个最好还是分开来说

## 回调

``` js
var b = function() {
    //执行相关的代码
}
var a = function(b) {
    //执行相关的代码
    b();
}
a(b);
```

这就是回调, 不过一般的套路都是

``` js
var a = function(callback) {
    if (callback && typeof callback === 'function') {
        callback(something)
    }
}
```

这是很多回调才用写法. 

## 异步

异步就是因为js的单线程, 如果总是才用同步的话, 那么js就会出现因为某一步特别耗时, 所以导致后面的与之无关程序都被阻塞. 

至于实现的原理, 与settimeout是类似的, 在浏览器运行到异步的地方的时候会做一个标记, 在settimeout中是 `dalaytime` , 在ajax中是 `status` , 那么在标记约定的时候的就会处理键入的函数. 

异步与回调其实没有什么直接关系, 但是如果你只是单纯读文件, 或者获取一个数据, 而不对数据做任何处理的话, 是不需要回调的, 但是, 如果需要对返回的事情做处理, 那么回调就是必须的了. 

而在回调中所举的例子其实是一种同步的回调, 因为它没有采用异步的方法, 用settimeout可以完成改写. 

``` js
function a(m) {
    setTimeout(function() {
        b(m);
    }, 0);
    m = m + 1;
    console.log(m)
}

function b(n) {
    console.log(n + 1)
}
console.log(a(1))
```

结果是

> 2

> 3

这就体现了异步的概念, 程序运行到setTimeout之后, 创建了一个函数, `延迟执行b` , 而且继续执行下面, 等到当前函数执行完成, 然后输出m为2, 运行结束后, 执行之前标记的函数, 输出3. 

这里必须说一下事件循环, 才好理解js的机制. 

### 事件循环 Event Loop

js里有两个结构: 

* 消息队列(message queue, or task queue): 储待处理消息及对应的回调函数或事件处理程序; 
* 执行栈(execution context stack), 也就是用来存储执行上下文, 当函数调用时, 创建并插入一个执行上下文, 通常称为执行栈帧(frame), 存储着函数参数和局部变量, 当该函数执行结束时, 弹出该执行栈帧; 

> 关于全局代码, 由于所有的代码都是在全局上下文执行, 所以执行栈顶总是全局上下文就很容易理解, 直到所有代码执行完毕, 全局上下文退出执行栈, 栈清空了; 也即是全局上下文是第一个入栈, 最后一个出栈. 

1. 宿主环境为JavaScript创建线程时, 会创建堆(heap)和栈(stack), 堆内存储JavaScript对象, 栈内存储执行上下文; 
2. 栈内执行上下文的同步任务按序执行, 执行完即退栈, 而当异步任务执行时, 该异步任务进入等待状态(不入栈), 同时通知线程: 当触发该事件时(或该异步操作响应返回时), 需向消息队列插入一个事件消息; 
3. 当事件触发或响应返回时, 线程向消息队列插入该事件消息(包含事件及回调); 
4. 当栈内同步任务执行完毕后, 线程从消息队列取出一个事件消息, 其对应异步任务(函数)入栈, 执行回调函数, 如果未绑定回调, 这个消息会被丢弃, 执行完任务后退栈; 
5. 当线程空闲(即执行栈清空)时继续拉取消息队列下一轮消息(next tick, 事件循环流转一次称为一次tick). 

这就是事件循环, js的函数就是如此执行的. 

### 事件监听

也就是事件驱动模式, 任务的执行不取决于代码的顺序, 而取决于某个事件是否发生. 

``` js
f1.on('done', f2);

function f1() {
    setTimeout(function() {
        // f1的任务代码
        f1.trigger('done');
    }, 1000);
}
```

一下是事件监听的实现方法

``` js
// 事件对象
var Event = function(obj) {
    this.obj = obj;
    this.getSource = function() {
        return this.obj;
    }
}
// 监听对象
var F2 = function() {
    this.hander = function(event) {
        var f2 = event.getSource();
        console.log("f2 do something!");
        f2.callback();
    }
}
// 被监听对象
var F1 = function() {
    this.abc = function() {
        console.log("f1 do something one!");
        // 创建事件对象
        var e = new Event(this);
        // 发布事件
        this.f2.hander(e);
        console.log("f1 do something two!");
    }
    this.on = function(f2) {
        this.f2 = f2;
    }
    this.callback = function() {
        console.log("f1 callback invoke!");
    }
}
// 主函数
function main() {
    var f1 = new F1();
    var f2 = new F2();
    // 加入监听
    f1.on(f2);
    f1.abc();
}
// 运行主函数
main();
```

> f1 do something one!

> f2 do something!

> f1 callback invoke!

> f1 do something two!

### 发布/订阅

与事件监听类似, 多了个消息中心, 可以查看每个对象绑定了多少事件

### promise

即es6 的 promise

## 浏览器多线程和并发

浏览器不是单线程的 上面说了这么多关于JavaScript是单线程的, 下面说说其宿主环境——浏览器. 浏览器的内核是多线程的, 它们在内核制控下相互配合以保持同步, 一个浏览器至少实现三个常驻线程: 

1. JavaScript引擎线程 JavaScript引擎是基于事件驱动单线程执行的, JavaScript 引擎一直等待着任务队列中任务的到来, 然后加以处理. 
2. GUI渲染线程 GUI渲染线程负责渲染浏览器界面, 当界面需要重绘(Repaint)或由于某种操作引发回流(reflow)时, 该线程就会执行. 但需要注意GUI渲染线程与JavaScript引擎是互斥的, 当JavaScript引擎执行时GUI线程会被挂起, GUI更新会被保存在一个队列中等到JavaScript引擎空闲时立即被执行. 
3. 浏览器事件触发线程 事件触发线程, 当一个事件被触发时该线程会把事件添加到"任务队列"的队尾, 等待JavaScript引擎的处理. 这些事件可来自JavaScript引擎当前执行的代码块如setTimeOut、 也可来自浏览器内核的其他线程如鼠标点击、 AJAX异步请求等, 但由于JavaScript是单线程执行的, 所有这些事件都得排队等待JavaScript引擎处理. 

在Chrome浏览器中, 为了防止因一个标签页奔溃而影响整个浏览器, 其每个标签页都是一个进程(Renderer Process). 当然, 对于同一域名下的标签页是能够相互通讯的, 具体可看 浏览器跨标签通讯. 在Chrome设计中存在很多的进程, 并利用进程间通讯来完成它们之间的同步, 因此这也是Chrome快速的法宝之一. 对于Ajax的请求也需要特殊线程来执行, 当需要发送一个Ajax请求时, 浏览器会开辟一个新的线程来执行HTTP的请求, 它并不会阻塞JavaScript线程的执行, 当HTTP请求状态变更时, 相应事件会被作为回调放入到"任务队列"中等待被执行. 

