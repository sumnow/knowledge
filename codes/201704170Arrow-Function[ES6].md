<!--
Created: Mon Aug 26 2019 15:15:34 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:15:34 GMT+0800 (China Standard Time)
-->
# 箭头函数

这是es6中一个很好的一个语法糖, 简化了函数, 特别是匿名函数这样的回调使用. 

``` js
var sum = (num1, num2) => num1 + num2;
```

像这样可以简单的完成函数的表达式创建(只能匿名函数声明), 如果要返回对象, 要加上括号. 

``` js
var sum = (num1, num2) => ({
    num1: 1,
    num2: 2,
    sum: 3
})
```

此外, 还有几点需要注意: 

1. 函数体内的this对象, 就是定义时所在的对象, 而不是使用时所在的对象. 
2. 不可以当作构造函数, 也就是说, 不可以使用new命令, 否则会抛出一个错误. 
3. 不可以使用arguments对象, 该对象在函数体内不存在. 如果要用, 可以用Rest参数代替. 
4. 不可以使用yield命令, 因此箭头函数不能用作Generator函数. 

``` js
var obj = {
    c: 1,
    e: function() {
        return (() => this.c)();
    }
}
log(obj.e()); //1
```

翻译后: 

``` js
e: function e() {
    var _this = this;
    return function() {
        return _this.c;
    }
}
```

箭头函数并非每个都有自己的this, 而是永远使用外层的this, 如果改成这样

就例如: 

``` js
var obj = {
    c: 1,
    e: () => {
        return (() => this.c)();
    }
}
log(obj.e()); //undefined, 此时的this是window
```

像下面一组代码: 

``` js
function foo() {
    return () => {
        return () => {
            return () => {
                console.log('id:', this.id);
            };
        };
    };
}
var f = foo.call({
    id: 1
});
var t1 = f.call({
    id: 2
})()(); // id: 1
var t2 = f().call({
    id: 3
})(); // id: 1
var t3 = f()().call({
    id: 4
}); // id: 1
```

上面代码之中, 只有一个this, 就是函数foo的this, 所以t1、 t2、 t3都输出同样的结果. 因为所有的内层函数都是箭头函数, 都没有自己的this, 它们的this其实都是最外层foo函数的this. 

