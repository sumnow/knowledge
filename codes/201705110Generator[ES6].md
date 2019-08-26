<!--
Created: Mon Aug 26 2019 15:17:20 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:17:20 GMT+0800 (China Standard Time)
-->
# es6 Generator 

``` js
function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}
var hw = helloWorldGenerator();
hw.next()
// { value: 'hello', done: false }
hw.next()
// { value: 'world', done: false }
hw.next()
// { value: 'ending', done: true }
hw.next()
// { value: undefined, done: true }
```

1. 遇到yield表达式, 就暂停执行后面的操作, 并将紧跟在yield后面的那个表达式的值, 作为返回的对象的value属性值. 
2. 下一次调用next方法时, 再继续往下执行, 直到遇到下一个yield表达式. 
3. 如果没有再遇到新的yield表达式, 就一直运行到函数结束, 直到return语句为止, 并将return语句后面的表达式的值, 作为返回的对象的value属性值. 
4. 如果该函数没有return语句, 则返回的对象的value属性值为undefined. 

Generator 函数可以不用yield表达式, 这时就变成了一个单纯的暂缓执行函数. 

``` js
function* f() {
    console.log('执行了! ')
}
//如果f不是Generator函数这次赋值就已经执行了。 
var generator = f();
setTimeout(function() {
    generator.next() //只会在这里执行
}, 2000);
```

使用 `for of` 循环可以直接遍历, 当next第一次done为true时, 就会结束. 

``` js
function* foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
}
for (let v of foo()) {
    console.log(v);
}
// 1 2 3 4 5
```

