<!--
Created: Mon Aug 26 2019 15:17:53 GMT+0800 (China Standard Time)
Modified: Fri Feb 07 2020 19:25:11 GMT+0800 (China Standard Time)
-->

# Event loop

## defination

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

## macrotask和microtask

`macrotask` 又叫做宏任务队列, 例如 `setTimeout` , `setInterval` , `script（整体代码）` , `I/O 操作` , `UI 渲染` 等

`microtask` 又叫做微任务队列, 例如 `new Promise().then(回调)` , `MutationObserver(html5新特性)` 

宏任务队列可以有多个, 微任务队列只有一个.

### event loop 执行顺序

1. 一开始执行栈空,我们可以把执行栈认为是一个存储函数调用的栈结构，遵循先进后出的原则。micro 队列空，macro 队列里有且只有一个 script 脚本（整体代码）。

2. 全局上下文（script 标签）被推入执行栈，同步代码执行。在执行的过程中，会判断是同步任务还是异步任务，通过对一些接口的调用，可以产生新的 macro-task 与 micro-task，它们会分别被推入各自的任务队列里。同步代码执行完了，script 脚本会被移出 macro 队列，这个过程本质上是队列的 macro-task 的执行和出队的过程。

3. 上一步我们出队的是一个 macro-task，这一步我们处理的是 micro-task。但需要注意的是：当 macro-task 出队时，任务是一个一个执行的；而 micro-task 出队时，任务是一队一队执行的。因此，我们处理 micro 队列这一步，会逐个执行队列中的任务并把它出队，直到队列被清空。

4. 执行渲染操作，更新界面

5. 再找下一个 `macrotask` 任务

> 为什么 `vue` 是在 `microtask` 里更新数据?

> 如果是用 `macrotask` 更新, 第一次 `macrotask` 更新了数据, 然后渲染UI, 但是此刻的UI依然是没有改变的数据, 需要再新建一个 `macrotask` 来更新UI, 渲染了两次. 如果使用 `microtask` , 那么在它后面的一个 `macrotask` 就可以拿到新的数据来渲染UI了.

> macrotask和microtask哪个先执行?

> 是从 `macrotask` 开始, 但是上一个 `microtask` 是比下一个 `macrotask` 先执行的.

