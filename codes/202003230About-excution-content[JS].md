<!--
Created: Wed Mar 23 2020 10:17:41 GMT+0800 (China Standard Time)
Modified: Thu Apr 02 2020 15:46:23 GMT+0800 (China Standard Time)
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

这个相当于

``` JS
// JavaScript
var foo

function foo() {
  console.log("foo");
};
foo = 1;
console.log(foo); // 1
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

## EC建立的细节

### 创建阶段【当函数被调用, 但未执行任何其内部代码之前】

1. 创建作用域链（Scope Chain）

2. 创建变量，函数和参数。

3. 求”this“的值

### 执行阶段

初始化变量的值和函数的引用, 解释/执行代码.

我们可以将每个执行上下文抽象为一个对象, 这个对象具有三个属性

``` JS
// JavaScript
ECObj: {
  scopeChain: {
    /* 变量对象（variableObject）+ 所有父级执行上下文的变量对象*/
  },
  variableObject: {
    /*函数 arguments/参数，内部变量和函数声明 */
  },
  this: {}
}
```

## 解释器执行代码的伪逻辑

### 查找调用函数的代码.

### 执行代码之前, 先进入创建上下文阶段:

初始化作用域链

创建变量对象:

创建arguments对象, 检查上下文, 初始化参数名称和值并创建引用的复制.

扫描上下文的函数声明(而非函数表达式):

为发现的每一个函数, 在变量对象上创建一个属性——确切的说是函数的名字——其有一个指向函数在内存中的引用.

如果函数的名字已经存在, 引用指针将被重写.

扫描上下文的变量声明:

为发现的每个变量声明, 在变量对象上创建一个属性——就是变量的名字, 并且将变量的值初始化为undefined

如果变量的名字已经在变量对象里存在, 将不会进行任何操作并继续扫描.

求出上下文内部"this"的值.

### 激活/代码执行阶段:

在当前上下文上运行/解释函数代码, 并随着代码一行行执行指派变量的值.

VO --- 对应上述第二个阶段

``` JS
// JavaScript
function foo(i) {
  var a = 'hello'
  var b = function() {}

  function c() {}
}
foo(22)
```

        

当我们调用foo(22)时, 整个创建阶段是下面这样的

``` JS
// JavaScript
ECObj = {
  scopChain： {
    ...
  },
  variableObject: {
    arguments: {
      0: 22,
      length: 1
    },
    i: 22,
    c: pointer to
    function c()
    a: undefined,
    b: undefined
  },
  this: {
    ...
  }
}
```

正如我们看到的, 在上下文创建阶段, VO的初始化过程如下(该过程是有先后顺序的: 函数的形参==>>函数声明==>>变量声明):

函数的形参(当进入函数执行上下文时) —— 变量对象的一个属性, 其属性名就是形参的名字, 其值就是实参的值; 对于没有传递的参数, 其值为undefined

函数声明(FunctionDeclaration, FD) —— 变量对象的一个属性, 其属性名和值都是函数对象创建出来的; 如果变量对象已经包含了相同名字的属性, 则替换它的值

变量声明(var, VariableDeclaration) —— 变量对象的一个属性, 其属性名即为变量名, 其值为undefined; 如果变量名和已经声明的函数名或者函数的参数名相同, 则不会影响已经存在的属性.

对于函数的形参没有什么可说的, 主要看一下函数的声明以及变量的声明两个部分.

