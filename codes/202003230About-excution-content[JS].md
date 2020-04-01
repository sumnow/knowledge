<!--
Created: Wed Mar 23 2020 10:17:41 GMT+0800 (China Standard Time)
Modified: Wed Apr 01 2020 17:58:27 GMT+0800 (China Standard Time)
-->

# 关于js执行的过程

1. EC: 函数执行环境(或执行上下文), Execution Context
2. ECS: 执行环境栈, Execution Context Stack
3. VO: 变量对象, Variable Object
4. AO: 活动对象, Active Object
5. scope chain: 作用域链

## 每次当控制器转到ECMAScript可执行代码的时候, 就会进入到一个执行上下文.

### 可执行代码的类型

#### 全局代码(Global code)

这种类型的代码是在"程序"级处理的: 例如加载外部的js文件或者本地 `<script></script>` 标签内的代码. 全局代码不包括任何function体内的代码. 这个是默认的代码运行环境, 一旦代码被载入, 引擎最先进入的就是这个环境.

#### 函数代码(Function code)

任何一个函数体内的代码, 但是需要注意的是, 具体的函数体内的代码是不包括内部函数的代码.

#### Eval代码(Eval code)

eval内部的代码

## 函数执行环境(或执行上下文)

当浏览器首次载入你的脚本, 它将默认进入全局执行上下文. 如果, 你在你的全局代码中调用一个函数, 你程序的时序将进入被调用的函数, 并创建一个新的执行上下文, 并将新创建的上下文压入执行栈的顶部.

如果你调用当前函数内部的其他函数, 相同的事情会在此上演. 代码的执行流程进入内部函数, 创建一个新的执行上下文并把它压入执行栈的顶部. 浏览器总会执行位于栈顶的执行上下文, 一旦当前上下文函数执行结束, 它将被从栈顶弹出, 并将上下文控制权交给当前的栈. 这样, 堆栈中的上下文就会被依次执行并且弹出堆栈, 直到回到全局的上下文.

## 执行环境栈

一个执行上下文的生命周期可以分为两个阶段.

### 创建阶段

在这个阶段中, 执行上下文会分别创建变量对象, 建立作用域链, 以及确定this的指向.

### 代码执行阶段

创建完成之后, 就会开始执行代码, 这个时候, 会完成变量赋值, 函数引用, 以及执行其他代码.

变量对象的创建是在EC(执行上下文)的创建阶段, 所以侧重点主要是EC的生命周期的第一个阶段, 我觉得再执行var foo = 1这句话有点不妥, 应该是给foo赋值, 应该是执行foo=1这个操作, 因为在EC创建阶段var已经被扫描了一遍.

``` JS
// JavaScript
console.log(foo); // 打印函数

function foo() {
  console.log("foo");
}

var foo = 1;
```

其实相当于

``` JS
// JavaScript
var foo

function foo() {
  console.log("foo");
}

console.log(foo); // 打印函数

a = 1;
```

``` js
var foo = 1;
console.log(foo); // 1
function foo() {
  console.log("foo");
};
```

## 函数声明和变量声明

``` JS
// JavaScript
var a = 100;

function a() {
  return "function";
}
console.log(a); // 100
```

其实代码是这样的

``` JS
// JavaScript
var a;

function a() {
  return "function";
}
console.log(a);
a = 100;
console.log(a); // 100
```

但下面这种方式其实就覆盖了, 这里的a其实是一个函数变量, 

``` JS
// JavaScript
var a = 100;
var a = function() {
  return "function";
}
console.log(a); // 函数a
```

## VOAO

变量对象(Variable object)是说JS的执行上下文中都有个对象用来存放执行上下文中可被访问但是不能被delete的函数标示符、形参、变量声明等. 它们会被挂在这个对象上, 对象的属性对应它们的名字对象属性的值对应它们的值但这个对象是规范上或者说是引擎实现上的不可在JS环境中访问到活动对象

激活对象(Activation object)有了变量对象存每个上下文中的东西, 但是它什么时候能被访问到呢? 就是每进入一个执行上下文时, 这个执行上下文儿中的变量对象就被激活, 也就是该上下文中的函数标示符、形参、变量声明等就可以被访问到了

