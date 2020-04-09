<!--
Created: Fri Dec 28 2018 17:59:19 GMT+0800 (China Standard Time)
Modified: Wed Apr 08 2020 19:55:07 GMT+0800 (China Standard Time)
-->

# 私有变量

前端要如何实现私有变量呢?

## 简单实现

默认'_'开头的即使私有变量, js委员会有意向以'#'开头

``` JS
// JavaScript
class Example {
  constructor() {
    this._private = 'private';
  }
  getName() {
    return this._private
  }
}

var ex = new Example();

console.log(ex.getName()); // private
console.log(ex._private); // private
```

这种写法问题在于

1. 外部可以访问和修改
2. 语言没有配合的机制，如 for in 语句会将所有属性枚举出来

## 闭包

我们可以在构造函数里写一个闭包返回出函数, 供外部访问, 而无法直接访问

``` JS
// JavaScript

class Example {
  constructor() {
    var _private = '';
    _private = 'private';
    this.getName = function() {
      return _private
    }
    // 也可以包装一下用init()来执行this.getName = function(){}等等
  }
}

var ex = new Example();

console.log(ex.getName()); // private
console.log(ex._private); // undefined
```

缺点是

1. 构造函数里包含一个访问函数, 很奇怪的行为
2. 访问函数在构造函数里, 所以不会被挂载到原型链上, 子类也就没办法拥有这个方法

## 闭包的立即执行函数版本

我们用立即执行函数包裹这样的一个类

``` JS
// JavaScript
const Example = (function() {
  var _private = '';

  class Example {
    constructor() {
      _private = 'private';
    }
    getName() {
      return _private;
    }
  }

  return Example;

})();
```

除了写法奇怪以外, 没什么缺点

## symbol 和 weakmap

``` JS
// JavaScript
const Example = (function() {
  var _private = Symbol('private');

  class Example {
    constructor() {
      this[_private] = 'private';
    }
    getName() {
      return this[_private];
    }
  }

  return Example;
})();

// 还可以切换weakMap, 实现是类似的,利用的都是Symbol或者weakMap外部无法获取,且不会被遍历出来
const Example = (function() {
  var _private = new WeakMap(); // 私有成员存储容器

  class Example {
    constructor() {
      _private.set(this, 'private');
    }
    getName() {
      return _private.get(this);
    }
  }

  return Example;
})();

var ex = new Example();

console.log(ex.getName()); // private
console.log(ex.name); // undefined
```

## Proxy

感谢es6, 开放了proxy这么神奇的方式

``` JS
// JavaScript
const handler = {
  get: function(target, propKey, receiver) {
    console.log(target, propKey, receiver)
    if (propKey[0] === '_') {
      throw new Error('Attempt to access private property');
    } else {
      return target[propKey]
    }
  },
  getOwnPropertyDescriptor(target, key) {
    const desc = Object.getOwnPropertyDescriptor(target, key);
    if (key[0] === '_') {
      desc.enumerable = false;
    }
    return desc;
  }

}

class Example {
  constructor(a) {
    this._private = 'private';
    this.a = a;
    return new Proxy(this, handler)
  }
  getName() {
    return this._private
  }
}
var ex = new Example();

for (item in ex) {
  console.log(item)
  // a
}

console.log(ex._private)
// Error
```

这个的优点是一切都挺好的, 缺点是使用getName() 也无法返回了.

