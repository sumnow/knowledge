# 函数节流与防抖动

一些函数事件会在短时间内触发很多次, 如resize, scroll。 在用户某些操作时, 可能会引起导致一些严重的性能问题。 解决的方法主要有: 函数防抖动(Debouncing) 和/或 函数节流(Throttling)

## 函数去抖动(Debounce)

当事件发生时, 我们不会立即激活回调。 相反, 我们等待一定的时间并检查相同的事件是否再次触发。 如果是, 我们重置定时器, 并再次等待。 如果在等待期间没有发生相同的事件, 我们就立即激活回调。 

    // debounce函数用来包裹我们的事件
    function debounce(fn, delay) {
        // 持久化一个定时器 timer
        let timer = null; 
        // 闭包函数可以访问 timer
        return function() {
            // 通过 'this' 和 'arguments'
            // 获得函数的作用域和参数
            let context = this; 
            let args = arguments; 
            // 如果事件被触发, 清除 timer 并重新开始计时
            clearTimeout(timer); 
            timer = setTimeout(function() {
                fn.apply(context, args); 
            }, delay); 
        }
    }
    // 当用户滚动时函数会被调用
    function foo() {
        console.log('You are scrolling!'); 
    }
    // 在事件触发的两秒后, 我们包裹在debounce中的函数才会被触发
    let elem = document.getElementById('container'); 
    elem.addEventListener('scroll', debounce(foo, 2000)); 

## 立即执行(Immediate)

Immediate是Debounce的精确版本。 比起 Debounce 的 等待后续事件触发, 然后再激活回调, Immediate 是 立即激活回调, 然后等待后续事件在一定时间内触发。 

就像Throttle的情况一样, 我们需要一个状态变量来检查是否应该激活我们的回调。 我们在Debounce不需要一个, 因为timeoutID隐式管理这部分。 

    var delta = 1000; 
    var timeoutID = null; 
    var safe = true; 

    function log() {
        console.log('foo'); 
    }

    function immediatedLog() {
        if (safe) {
            log(); 
            safe = false; 
        }
        clearTimeout(timeoutID); 
        timeoutID = setTimeout(function() {
            safe = true; 
        }, delta); 
    }; 
    window.onkeydown = immediatedLog; 

## 函数节流(Throttle)

    function throttle(fn, delta, context) {
        var safe = true; 
        return function() {
            var args = arguments; 
            if (safe) {
                fn.call(context, args); 
                safe = false; 
                setTimeout(function() {
                    safe = true; 
                }, delta); 
            }
        }; 
    }

也还是抽象了点, 还是举个栗子吧。 

很简单的, 页面滚动就输出1。 

    $(document).on("mousewheel DOMMouseScroll", function(e) {
        if (!scrolling) {
            if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
                navigateUp(); 
            } else {
                navigateDown(); 
            }
        }
    }); 
    let timer = null; 
    var safe = true; 
    $(document).on("mousewheel DOMMouseScroll", function(e) {
        clearTimeout(timer); 
        timer = setTimeout(function() {
            console.log(1)
            if (!scrolling) {
                if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
                    navigateUp(); 
                } else {
                    navigateDown(); 
                }
            }
        }, 3000); 
    }); 

疯狂滚动, 等我停下来的时候过3s才输出1

    if (safe) {
        console.log(1)
        if (!scrolling) {
            if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
                navigateUp(); 
            } else {
                navigateDown(); 
            }
        }
        safe = false; 
        setTimeout(function() {
            safe = true; 
        }, 3000); 
    }

一直疯狂滚动, 立刻输出1, 然后过3s在输出1, 过3秒在输出1