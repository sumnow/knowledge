<!--
Created: Fri Apr 10 2020 16:42:59 GMT+0800 (China Standard Time)
Modified: Sat Apr 11 2020 18:10:07 GMT+0800 (China Standard Time)
-->

# 关于递归爆栈

函数 caller 运行时, 调用其他函数 called , js引起会在调用栈中新开一个调用帧存储作用域和上下文信息, 而caller的调用帧信息仍需要保存. 而内存中调用栈存储信息有限, 递归情况下, 如果递归层次过深会导致调用栈耗光而引起stack overflow —— 爆栈.

比如这个Fibonacci数列的实现

``` JS
// JavaScript
function f(n) {
  if (n === 0 || n === 1) {
    return n
  } else
    return f(n - 1) + f(n - 2)
}
```

​f(100)时浏览器就会卡死(栈溢出)

另外, 可以通过编写一个方法计算js函数调用栈的最深层级的大小

``` JS
// JavaScript
function computeMaxCallStackSize() {
  try {
    return 1 + computeMaxCallStackSize();
  } catch (e) {
    // Call stack overflow
    return 1;
  }
}
computeMaxCallStackSize()
// 12531
```

## 改为尾调优化的写法

思路: 使用两个临时变量来存储上一个值, 和上上个值

``` JS
// JavaScript
function fTail(n, ac1 = 0, ac2 = 1) {
  if (n === 0) {
    return ac1
  } else
    return fTail(n - 1, ac2, ac1 + ac2)
}

fTail(100)
// 354224848179262000000
fTail(1000)
// 4.346655768693743e+208
fTail(2000)
// Infinity
```

理论上, 如果尾调优化有效, 上述代码应该能一直计算(即使输出Infinity), 但Chrome 72中实际测试表明大概计算到 fTail(7370) 时报错 Maxinum call stack size exceeded

尾调优化主要有两点问题, 导致它的提案仍没有完全通过, 浏览器的支持也不统一:

在引擎层面进行尾调优化是一个隐式行为, 如果代码存在死循环尾递归调用, 可能因为优化后没有爆栈报错提示而无法被程序员察觉

优化后, 调用堆栈信息会丢失, 造成调试困难

尾调优化的浏览器支持可以参考http://kangax.github.io/compat-table/es6/#test-proper_tail_calls_(tail_call_optimisation)

## 改用循环重写

所有递归都可以转化为循环编写

思路: 类似上一个例子, Fibonacci数列的实现使用循环还是比较简单

``` JS
// JavaScript
function fLoop(n, ac1 = 0, ac2 = 1) {
  while (n--) {
    [ac1, ac2] = [ac2, ac1 + ac2]
  }
  return ac1
}
// 运行看看
fLoop(1000)
// 4.346655768693743e+208
fLoop(10000)
// Infinity
fLoop(100000)
// Infinity
```

​
可以看到改用循环重写后, 则不会引起调用栈溢出的问题

## Trampolining(蹦床函数)

将递归改成循环, 代码可读性降低, 比较难以理解, 还有一种方式就是使用蹦床函数将递归改为循环

神马是蹦床函数呢?

``` JS
// JavaScript
function trampoline(f) {
  while (f && f instanceof Function) {
    f = f();
  }
  return f;
}
```

trampoline 方法中, 如果 f 是个函数就一直调用到返回不是函数为止, 注意这种方式不是递归调用, 而是循环, 不会增加调用栈.

我们试着把上边的例子改写成使用 Trampolining

``` JS
// JavaScript
function trampoline(f) {
  while (f && f instanceof Function) {
    f = f();
  }
  return f;
}

function fTrampoline(n, ac1 = 0, ac2 = 1) {
  if (n === 0) {
    return ac1
  } else {
    return fTrampoline.bind(null, n - 1, ac2, ac1 + ac2)
  }
}

// 结合两个函数进行调用
trampoline(fTrampoline(10000))
// Infinity
```

这种方式写法上和尾递归类似, 但比较好理解, 只是要修改原递归函数, underscore库提供了蹦床函数用于将任意满足它写法的尾调递归转化为循环, 避免爆栈问题:http://documentcloud.github.io/underscore-contrib/#trampoline

## 尾递归函数转循环

还有一种方式, 可以将尾递归形式的递归函数转为为循环, 并且不需要修改原尾递归函数, 即 非侵入式

``` JS
function tailCallOptimize(f) {
  let value
  let active = false
  const accumulated = []
  return function accumulator() {
    accumulated.push(arguments)
    if (!active) {
      active = true
      while (accumulated.length) {
        value = f.apply(this, accumulated.shift())
      }
      active = false
      return value
    }
  }
}

const f = tailCallOptimize(function(n, ac1 = 0, ac2 = 1) {
  if (n === 0) return ac1
  return f(n - 1, ac2, ac1 + ac2)
})

f(10000)
// Infinity
// JavaScript
```

​
可以看到, 这其实是利用 闭包 缓存标记变量和 栈 存放每次递归的调用参数, 每次发生递归调用就将本次调用参数push到栈内, 执行后再shift 推出, 直到栈为空.

## 小结

不管是利用 Trampolining 还是 tailCallOptimize 将递归转化为循环, 都需要先将递归函数改为尾递归实现, 而并不是所有递归都可以转化为尾递归, 线性递归是比较容易进行转化的, 而树状递归就难了, 甚至可能无法转化.

查询资料时就在思考, 是否有一种方式可以尝试将递归转化为尾递归呢? 然后找到了这篇:

基于CPS变换的尾调递归转化算法

https://www.cnblogs.com/cheukyin/p/6444860.html

由于本人算法渣渣, 就不搬运文章内容了, 有兴趣的可以点开进一步了解

在实际应用中, 如果可以明确递归的层次不会太深的情况(比如线性递归不会超过1000层), 仍可以使用原始递归写法, 或者某些情况下通过约束参数而避免爆栈的情况; 

如果递归层次比较深, 则需要优化递归写法为尾调递归, 并利用类似 Trampolining 的方式转化为循环调用.

