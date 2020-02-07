<!--
Created: Fri Feb 07 2020 16:37:37 GMT+0800 (China Standard Time)
Modified: Fri Feb 07 2020 16:56:02 GMT+0800 (China Standard Time)
-->

# 变量提升 

``` JS
// JavaScript

console.log(typeof foo, typeof boo)

var boo = 2

function foo() {
    console.log(1)
}
```

``` BASH
function undefined
```

出现这个奇怪的事情, 是因为 `hoisting` , 事实上编译过后, 它是这个样子的

``` JS
// JavaScript
var boo

function foo() {
    console.log(1)
}

console.log(typeof foo, typeof boo)

boo = 2
```

这样容易理解很多, 注意如果是表达式的函数声明是不会被提升的.

而 `function` 关键字的函数提升, 在声明时也定义了, 所以提升以后是直接有值了.

## let const 的暂时性死区

`let` 和 `const` 是不会被提升的.

是因为 `es6` 中有暂时性死区, 当有变量以 `let` 或者 `const` 声明时, 在声明语句出现前, 是不允许调用, 如果调用就会报错.

``` BASH
# BASH
access 'b' before initialization
```

同时也是不允许重复声明的, 不像 `var` 

