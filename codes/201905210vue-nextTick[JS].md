# vue nextTick

## vfor 的 key重复

vue 中的 `v-for` 循环, 依赖 `key` 的值, 进行vdom的diff算法的替换, 用以提高diff的效率, 但是如果key不是每条数据特有的信息, 就会导致, 明明数据变化了, 但是并不会更新view

## vue 里的异步更新

### 官方文档

可能你还没有注意到, Vue 在更新 DOM 时是异步执行的. 只要侦听到数据变化, Vue 将开启一个队列, 并缓冲在同一事件循环中发生的所有数据变更. 如果同一个 watcher 被多次触发, 只会被推入到队列中一次. 这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的. 然后, 在下一个的事件循环"tick"中, Vue 刷新队列并执行实际 (已去重的) 工作. Vue 在内部对异步队列尝试使用原生的 Promise.then、 MutationObserver 和 setImmediate, 如果执行环境不支持, 则会采用 setTimeout(fn, 0) 代替. 

例如, 当你设置 vm.someData = 'new value', 该组件不会立即重新渲染. 当刷新队列时, 组件会在下一个事件循环"tick"中更新. 多数情况我们不需要关心这个过程, 但是如果你想基于更新后的 DOM 状态来做点什么, 这就可能会有些棘手. 虽然 Vue.js 通常鼓励开发人员使用"数据驱动"的方式思考, 避免直接接触 DOM, 但是有时我们必须要这么做. 为了在数据变化之后等待 Vue 完成更新 DOM, 可以在数据变化之后立即使用 Vue.nextTick(callback). 这样回调函数将在 DOM 更新完成后被调用.

可以使用在组件内使用 vm.$nextTick() 实例方法特别方便, 因为它不需要全局 Vue, 并且回调函数中的 this 将自动绑定到当前的 Vue 实例上.

因为 $nextTick() 返回一个 Promise 对象, 所以你可以使用新的 ES2016 async/await 语法完成相同的事情: 

``` js
methods: {
    updateMessage: async function() {
        this.message = '已更新'
        console.log(this.$el.textContent) // => '未更新'
        await this.$nextTick()
        console.log(this.$el.textContent) // => '已更新'
    }
}
```

### 代码分析

``` html
<template>
    <div>
        <div ref="test">{{test}}</div>
        <button @click="handleClick">tet</button>
    </div>
</template>
```

``` 
export default {
    data() {
        return {
            test: 'begin'
        };
    },
    methods() {
        handleClick() {
            this.test = 'end';
            console.log(this.$refs.test.innerText); //打印“begin”
        }
    }
}
```

事实上, 在触发了某个响应式属性的变化的时候, setter方法会推送给Dep, Dep会调用它管理的所有Watch对象, 从而触发某个update方法.

``` js
update() {
    /* istanbul ignore else */
    if (this.lazy) {
        this.dirty = true
    } else if (this.sync) {
        /*同步则执行run直接渲染视图*/
        this.run()
    } else {
        /*异步推送到观察者队列中，下一个tick时调用。*/
        queueWatcher(this)
    }
}
```

下面是 `queueWatcher` 方法

``` js
/*将一个观察者对象push进观察者队列，在队列中已经存在相同的id则该观察者对象将被跳过，除非它是在队列被刷新时推送*/
export function queueWatcher(watcher: Watcher) {
    /*获取watcher的id*/
    const id = watcher.id
    /*检验id是否存在，已经存在则直接跳过，不存在则标记哈希表has，用于下次检验*/
    if (has[id] == null) {
        has[id] = true
        if (!flushing) {
            /*如果没有flush掉，直接push到队列中即可*/
            queue.push(watcher)
        } else {
            // if already flushing, splice the watcher based on its id
            // if already past its id, it will be run next immediately.
            let i = queue.length - 1
            while (i >= 0 && queue[i].id > watcher.id) {
                i--
            }
            queue.splice(Math.max(i, index) + 1, 0, watcher)
        }
        // queue the flush
        if (!waiting) {
            waiting = true
            nextTick(flushSchedulerQueue)
        }
    }
}
```

Watch对象并不是立即更新视图, 而是被push进了一个队列queue, 此时状态处于waiting的状态, 这时候会继续会有Watch对象被push进这个队列queue, 等到下一个tick运行时, 这些Watch对象才会被遍历取出, 更新视图. 同时, id重复的Watcher不会被多次加入到queue中去, 因为在最终渲染时, 我们只需要关心数据的最终结果. 

### nextTick

vue.js提供了一个nextTick函数, 其实也就是上面调用的nextTick. 

nextTick的实现比较简单, 执行的目的是在microtask或者task中推入一个function, 在当前栈执行完毕(也许还会有一些排在前面的需要执行的任务)以后执行nextTick传入的function, 看一下源码: 

``` js
/**
 * Defer a task to execute it asynchronously.
 */
/*
    延迟一个任务使其异步执行，在下一个tick时执行，一个立即执行函数，返回一个function
    这个函数的作用是在task或者microtask中推入一个timerFunc，在当前调用栈执行完以后以此执行直到执行到timerFunc
    目的是延迟到当前调用栈执行完以后执行
*/
export const nextTick = (function() {
    /*存放异步执行的回调*/
    const callbacks = []
    /*一个标记位，如果已经有timerFunc被推送到任务队列中去则不需要重复推送*/
    let pending = false
    /*一个函数指针，指向函数将被推送到任务队列中，等到主线程任务执行完时，任务队列中的timerFunc被调用*/
    let timerFunc

    /*下一个tick时的回调*/
    function nextTickHandler() {
        /*一个标记位，标记等待状态（即函数已经被推入任务队列或者主线程，已经在等待当前栈执行完毕去执行），这样就不需要在push多个回调到callbacks时将timerFunc多次推入任务队列或者主线程*/
        pending = false
        /*执行所有callback*/
        const copies = callbacks.slice(0)
        callbacks.length = 0
        for (let i = 0; i < copies.length; i++) {
            copies[i]()
        }
    }

    // the nextTick behavior leverages the microtask queue, which can be accessed
    // via either native Promise.then or MutationObserver.
    // MutationObserver has wider support, however it is seriously bugged in
    // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
    // completely stops working after triggering a few times... so, if native
    // Promise is available, we will use it:
    /* istanbul ignore if */

    /*
      这里解释一下，一共有Promise、MutationObserver以及setTimeout三种尝试得到timerFunc的方法
      优先使用Promise，在Promise不存在的情况下使用MutationObserver，这两个方法都会在microtask中执行，会比setTimeout更早执行，所以优先使用。
      如果上述两种方法都不支持的环境则会使用setTimeout，在task尾部推入这个函数，等待调用执行。
      参考：https://www.zhihu.com/question/55364497
    */
    if (typeof Promise !== 'undefined' && isNative(Promise)) {
        /*使用Promise*/
        var p = Promise.resolve()
        var logError = err => {
            console.error(err)
        }
        timerFunc = () => {
            p.then(nextTickHandler).catch(logError)
            // in problematic UIWebViews, Promise.then doesn't completely break, but
            // it can get stuck in a weird state where callbacks are pushed into the
            // microtask queue but the queue isn't being flushed, until the browser
            // needs to do some other work, e.g. handle a timer. Therefore we can
            // "force" the microtask queue to be flushed by adding an empty timer.
            if (isIOS) setTimeout(noop)
        }
    } else if (typeof MutationObserver !== 'undefined' && (
            isNative(MutationObserver) ||
            // PhantomJS and iOS 7.x
            MutationObserver.toString() === '[object MutationObserverConstructor]'
        )) {
        // use MutationObserver where native Promise is not available,
        // e.g. PhantomJS IE11, iOS7, Android 4.4
        /*新建一个textNode的DOM对象，用MutationObserver绑定该DOM并指定回调函数，在DOM变化的时候则会触发回调,该回调会进入主线程（比任务队列优先执行），即textNode.data = String(counter)时便会触发回调*/
        var counter = 1
        var observer = new MutationObserver(nextTickHandler)
        var textNode = document.createTextNode(String(counter))
        observer.observe(textNode, {
            characterData: true
        })
        timerFunc = () => {
            counter = (counter + 1) % 2
            textNode.data = String(counter)
        }
    } else {
        // fallback to setTimeout
        /* istanbul ignore next */
        /*使用setTimeout将回调推入任务队列尾部*/
        timerFunc = () => {
            setTimeout(nextTickHandler, 0)
        }
    }

    /*
      推送到队列中下一个tick时执行
      cb 回调函数
      ctx 上下文
    */
    return function queueNextTick(cb ? : Function, ctx ? : Object) {
        let _resolve
        /*cb存到callbacks中*/
        callbacks.push(() => {
            if (cb) {
                try {
                    cb.call(ctx)
                } catch (e) {
                    handleError(e, ctx, 'nextTick')
                }
            } else if (_resolve) {
                _resolve(ctx)
            }
        })
        if (!pending) {
            pending = true
            timerFunc()
        }
        if (!cb && typeof Promise !== 'undefined') {
            return new Promise((resolve, reject) => {
                _resolve = resolve
            })
        }
    }
})()
```

它是一个立即执行函数, 返回一个queueNextTick接口. 

传入的cb会被push进callbacks中存放起来, 然后执行timerFunc(pending是一个状态标记, 保证timerFunc在下一个tick之前只执行一次). 

timerFunc是什么? 

看了源码发现timerFunc会检测当前环境而不同实现, 其实就是按照Promise, MutationObserver, setTimeout优先级, 哪个存在使用哪个, 最不济的环境下使用setTimeout. 

这里解释一下, 一共有Promise、 MutationObserver以及setTimeout三种尝试得到timerFunc的方法. 优先使用Promise, 在Promise不存在的情况下使用MutationObserver, 这两个方法的回调函数都会在microtask中执行, 它们会比setTimeout更早执行, 所以优先使用. 如果上述两种方法都不支持的环境则会使用setTimeout, 在task尾部推入这个函数, 等待调用执行. 

为什么要优先使用microtask? 我在顾轶灵在知乎的回答中学习到: 

> JS 的 event loop 执行时会区分 task 和 microtask, 引擎在每个 task 执行完毕, 从队列中取下一个 task 来执行之前, 会先执行完所有 microtask 队列中的 microtask. setTimeout 回调会被分配到一个新的 task 中执行, 而 Promise 的 resolver、 MutationObserver 的回调都会被安排到一个新的 microtask 中执行, 会比 setTimeout 产生的 task 先执行. 要创建一个新的 microtask, 优先使用 Promise, 如果浏览器不支持, 再尝试 MutationObserver. 实在不行, 只能用 setTimeout 创建 task 了. 

#### 为啥要用 microtask? 

根据 HTML Standard, 在每个 task 运行完以后, UI 都会重渲染, 那么在 microtask 中就完成数据更新, 当前 task 结束就可以得到最新的 UI 了. 
反之如果新建一个 task 来做数据更新, 那么渲染就会进行两次. 

首先是Promise, Promise.resolve().then()可以在microtask中加入它的回调, 

MutationObserver新建一个textNode的DOM对象, 用MutationObserver绑定该DOM并指定回调函数, 在DOM变化的时候则会触发回调, 该回调会进入microtask, 即textNode.data = String(counter)时便会加入该回调. 

setTimeout是最后的一种备选方案, 它会将回调函数加入task中, 等到执行. 

综上, nextTick的目的就是产生一个回调函数加入task或者microtask中, 当前栈执行完以后(可能中间还有别的排在前面的函数)调用该回调函数, 起到了异步触发(即下一个tick时触发)的目的. 

#### flushSchedulerQueue

``` js
/*Github:https://github.com/answershuto*/
/**
 * Flush both queues and run the watchers.
 */
/*nextTick的回调函数, 在下一个tick时flush掉两个队列同时运行watchers*/
function flushSchedulerQueue() {
    flushing = true
    let watcher, id

    // Sort queue before flush.
    // This ensures that:
    // 1. Components are updated from parent to child. (because parent is always
    //    created before the child)
    // 2. A component's user watchers are run before its render watcher (because
    //    user watchers are created before the render watcher)
    // 3. If a component is destroyed during a parent component's watcher run, 
    //    its watchers can be skipped.
    /*
      给queue排序，这样做可以保证：

      1. 组件更新的顺序是从父组件到子组件的顺序, 因为父组件总是比子组件先创建. 
      2. 一个组件的user watchers比render watcher先运行, 因为user watchers往往比render watcher更早创建
      3. 如果一个组件在父组件watcher运行期间被销毁, 它的watcher执行将被跳过. 

    */
    queue.sort((a, b) => a.id - b.id)

    // do not cache length because more watchers might be pushed
    // as we run existing watchers
    /*这里不用index = queue.length; index > 0; index--的方式写是因为不要将length进行缓存, 因为在执行处理现有watcher对象期间, 更多的watcher对象可能会被push进queue*/
    for (index = 0; index < queue.length; index++) {
        watcher = queue[index]
        id = watcher.id
        /*将has的标记删除*/
        has[id] = null
        /*执行watcher*/
        watcher.run()
        // in dev build, check and stop circular updates.
        /*
          在测试环境中，检测watch是否在死循环中
          比如这样一种情况
          watch: {
            test () {
              this.test++;
            }
          }
          持续执行了一百次watch代表可能存在死循环
        */
        if (process.env.NODE_ENV !== 'production' && has[id] != null) {
            circular[id] = (circular[id] || 0) + 1
            if (circular[id] > MAX_UPDATE_COUNT) {
                warn(
                    'You may have an infinite update loop ' + (
                        watcher.user ?
`in watcher with expression "${watcher.expression}"` :
`in a component render function.` 
                    ),
                    watcher.vm
                )
                break
            }
        }
    }

    // keep copies of post queues before resetting state
    /**/
    /*得到队列的拷贝*/
    const activatedQueue = activatedChildren.slice()
    const updatedQueue = queue.slice()

    /*重置调度者的状态*/
    resetSchedulerState()

    // call component updated and activated hooks
    /*使子组件状态都改编成active同时调用activated钩子*/
    callActivatedHooks(activatedQueue)
    /*调用updated钩子*/
    callUpdateHooks(updatedQueue)

    // devtool hook
    /* istanbul ignore if */
    if (devtools && config.devtools) {
        devtools.emit('flush')
    }
}
```

### 异步更新的意义

异步更新过滤了在 Browser UI重新render之前可能会频繁发生的事件, 只记录了在下一次render时的最终数据状态. 极大地缓解浏览器的压力.

