# tasks and microtasks

在 `EventLoop` 已经讲解过了关于消息队列和执行栈的问题。

异步任务总是在执行栈清空后，从消息队列中取出执行。

macrotasks: setTimeout, setInterval, setImmediate, I/O, UI rendering

microtasks: process.nextTick, Promises, Object.observe(废弃), MutationObserver


因此异步任务总是慢于同步任务的，即使是 `settimeout(fun, 0)`

再另外 `Promise` 也是异步调用的一种方式，那么对比 `settimeout` 有什么区别呢?

    console.log(1)

    setTimeout(res=>console.log(2),0)

    Promise.resolve().then(res=>console.log(3))

    // 1 3 2

会有这样的结果正是因为 `Promise` 与 `setTimeout` 等宏观 `tasks` 不同，属于 `microtasks` ，`microtasks` 的执行时机就在 同步队列执行完毕之后，又在将 `tasks` 压入执行栈前，这么做的好处就是可以保证 `Promise` 的 `callback` 可以正确调用。

一个测试

    setTimeout(res=>console.log(1),0)

    new Promise((resolve, reject)=>{
        console.log(2)
        for(let i = 0; i < 1000; i++) {
            i === 999 && resolve()
        }
        console.log(3)
    }).then(res=>console.log(4))

    console.log(5)

    // 2 3 5 4 1

> 输出这个结果是因为 `Promise` 的定义函数也是同步执行的。 