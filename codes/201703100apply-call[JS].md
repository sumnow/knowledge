<!--
Created: Mon Aug 26 2019 15:14:16 GMT+0800 (China Standard Time)
Modified: Fri Apr 03 2020 11:50:39 GMT+0800 (China Standard Time)
-->

# apply call 与 bind 夹着caller和callee

## apply和call

apply和call是一个改变上下文环境的方法, 让一个方法可以在另一个不拥有这个方法的对象上运行.

在实现继承的一种方式中就有比较浅显的实现: 

``` js
function Child(name) {
  Person.apply(this, arguments)
}

function Person(name) {
  this.name = name;
  this.say = function() {
    console.log('i am ' + this.name)
  }
}
var tom = new Person('tom');
var john = new Child('john');
john.say(); // i am john
```

结果为: 

> i am john

这种方法其实等同与另一种写法, 当然了这种方法会比较愚蠢, **调用的时候需要先实现一遍父类方法再将子类参数穿进去以达到效果.**

``` js
function Child() {}
tom.say.call(john); //i am john
```

同时new关键字的实现同样用到了apply, call: 

``` js
function mynew(clas) {
  return function() {
    var o = {
      'prototype': clas.prototype
    }
    clas.apply(o, arguments);
    return o;
  }
}

function Person(name) {
  this.name = name;
  this.say = function() {
    console.log('i am ' + this.name)
  }
}
var jack = mynew(Person)('jack')
jack.say() //i am jack
```

结果为: 

> i am jack

**另外, apply 和 call 的区别在于所传的参数, apply(obj, [args, args])它的第二个参数为数组或者类数组的对象, 例如arguments和Nodelists, call只需要按顺序传进去, call(obj, args, args).**

### caller和callee

顺便说一下, caller和callee, caller是函数被调用后产生的属性. 指向了调用该函数的父函数, 如果这是一个顶层函数, 那么会输出null.

callee则是arguments专有属性, arguments.callee指向了当前执行当前参数的那个函数.

## apply和call 的应用

此外, apply和call还有一些巧用: 

``` js
var array1 = [12, "foo", {
  name "Joe"
}, -2458];
var array2 = ["Doe", 555, 100];
Array.prototype.push.apply(array1, array2);
console.log('array1 值为 ' + array1); // array1 值为 [12 , "foo" , {name "Joe"} , -2458 , "Doe" , 555 , 100]; 
Array.apply(null, {
  length: 10
}).map((v, i) => i + 1); //[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

结果为: 

> array1 值为 [12 , "foo" , {name "Joe"} , -2458 , "Doe" , 555 , 100]

这是合并数组, 此外还可以求数组的最大最小值, 将页面中的p作为数组输出: 

``` js
var numbers = [5, 458, 120, -215];
var maxInNumbers = Math.max.apply(Math, numbers); //458
var minInNumbers = Math.max.apply(Math, numbers) //-215
var domNodes = Array.prototype.slice.call(document.getElementsByTagName("p"));
```

类数组和数组都有各项和length属性, 不同的只是_proto_中的各种方法.

##　手写一个call和apply

``` JS
// JavaScript
// 来自https://github.com/mqyqingfeng/Blog/issues/11
Function.prototype.call2 = function(context) {
  var context = context || window;
  context.fn = this;

  var args = [];
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']');
  }
  // 这里是为了解决不定参数使用eval
  var result = eval('context.fn(' + args + ')');

  delete context.fn
  return result;
}
```

``` JS
// JavaScript
Function.prototype.apply = function(context, arr) {
  var context = Object(context) || window;
  context.fn = this;

  var result;
  if (!arr) {
    result = context.fn();
  } else {
    var args = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      args.push('arr[' + i + ']');
    }
    result = eval('context.fn(' + args + ')')
  }

  delete context.fn
  return result;
}
```

