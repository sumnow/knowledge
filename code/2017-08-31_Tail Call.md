# 尾调用

尾调用即是函数的最后一步是调用一个函数。

它的优势在于不需要保存多余的调用记录，例如，在函数A中调用了函数B，那么就会在A的调用记录上添加B的调用记录，等到B运行结束后，返回A，B的调用记录才会消失，所有的调用记录就形成了一个调用栈(call stack)。

    function factorial(n) {
        if (n === 1) return 1;
        return n * factorial(n - 1);
    }

    factorial(5) // 120

它需要维持一个复杂度为O(n)的调用栈，如果使用尾递归，复杂度就只有O(1)

    function factorial(n, total = 1) {
        if ( n === 1 ) return total;
        return factorial(n-1, total*n);
    }

函数式编程中，把参数降成单个的方式称为柯里化(currying)

    curry = (fn,a) => (b) => fn.call(this, b, a);

    const tailFactorial = curry(factorial, 1)

    tailFactorial(5) //120
