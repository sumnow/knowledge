<!--
Created: Mon Aug 26 2019 15:17:26 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:17:26 GMT+0800 (China Standard Time)
-->

# defineProperty

先说说getter/setter

``` js
const obj = {
  get prop() {
    return "Getter";
  },
  set prop(value) {
    console.log("Setter: " + value);
    return value
  }
}
obj.prop // 'Getter'
obj.prop = '123'
// Setter: 123
// 123
```

注意get/set语法需要注意

1. 可以使用数值或字符串作为标识; 
2. 必须(不带/有一个明确的)参数; 
3. 它不能与另一个 (get/set) 或具有相同属性的数据条目同时出现在一个对象字面量中

此外可以使用delete来删除get或者set方法

``` js
delte obj.prop
```

之前的代码等同于

``` js
const obj2 = Object.defineProperty({}, 'prop', {
  get() {
    return 123
  },
  set(value) {
    console.log('Setter' + value)
  },
  enumerable: true,
  configurable: true
});
```

**注意: 如果想要改写set, 一定不要加 `return` , 否则改动都会无效**

属性特性: 

| property     | default   |
|--------------|-----------|
| value        | undefined |
| get          | undefined |
| set          | undefined |
| writable     | false     |
| enumerable   | false     |
| configurable | false     |

**注意, 不可以同时指定访问器和值或者可写属性, 也就是说, value和writable 与 get和set 无法同时指定**

``` js
const obj2 = Object.defineProperty({}, 'prop', {
  value: 'time',
  writable: true,
  // get () {return 123}, 
  // set (value) {console.log('Setter'+value)}, 
  enumerable: true,
  configurable: true
});
// 去掉注释会报错:
// Uncaught TypeError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute
// 不可以同时指定访问器和值或者可写属性, 也就是说, value和writable 与 get和set 无法同时指定
// 如果writable 是false, 那么更改prop的值是无效的。 
```

也可以同时指定多个属性

``` js
const obj3 = Object.defineProperty({}, {
  foo: {
    value: 123,
    enumerable: true
  },
  bar: {
    value: "abc",
    enumerable: true
  }
})
```

Object.create也可以接受第二个参数, 来构造新的实例.

``` js
const obj4 = Object.create(Object.prototype, {
  foo: {
    value: 123,
    enumerable: true
  },
  bar: {
    value: "abc",
    enumerable: true
  }
});
```

Object.getOwnPropertyDescriptor(obj, propName)

这个方法查找obj上的propName属性, 如果没有则返回undefined

``` js
Object.getOwnPropertyDescriptor(Object.prototype, "toString")
// { value: [Function: toString], 
//   writable: true, 
//   enumerable: false, 
//   configurable: true
// }
Object.getOwnPropertyDescriptor({}, "toString")
//undefined
```

## enumerable

``` js
var proto = Object.defineProperties({}, {
  foo: {
    value: 1,
    enumerable: true
  },
  bar: {
    value: 2,
    enumerable: false
  }
});
var obj = Object.create(proto, {
  baz: {
    value: 1,
    enumerable: true
  },
  qux: {
    value: 2,
    enumerable: false
  }
});
Object.getPrototypetypeof(obj)
//可以获取obj的原型
Object.getOwnPropertyNames(obj)
//获取obj所有自身属性
obj.hasOwnProperty(propName)
//obj自身是否有某个属性, 非继承
```

可枚举性只影响四种操作

* for... in循环: 只遍历对象自身的和继承的可枚举的属性.
* Object.keys(): 返回对象自身的所有可枚举的属性的键名.
* JSON.stringify(): 只串行化对象自身的可枚举的属性.
* Object.assign(): 忽略enumerable为false的属性, 只拷贝对象自身的可枚举的属性

实际上, 引入"可枚举"(enumerable)这个概念的最初目的, 就是让某些属性可以规避掉for... in操作, 不然所有内部属性和方法都会被遍历到. 比如, 对象原型的toString方法, 以及数组的length属性, 就通过"可枚举性", 从而避免被for... in遍历到.

``` js
for (var x in obj) console.log(x); //不会遍历不可枚举的属性
// baz
// foo
```

Object.keys()返回一个对象的所有可枚举的自身属性(非继承的)的名称组成的数组:

``` js
Object.keys(obj)
// [ 'baz' ]
Object.getOwnPropertyNames(obj)
// [ 'baz', 'qux' ]
```

## configurable 

能否使用delete、 能否需改属性特性、 或能否修改访问器属性、 , false为不可重新定义, 默认值为true

如果为 `false` , `writable` 只能为 `false` , 无法修改属性

## Object.assign

``` js
Object.assign(target, ...sources)
```

`Object.assign()` 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象. 它将返回目标对象.

拷贝的值如果时引用属性, 会依然存在引用关系, 应当生成一个新对象来解决这个问题.

``` js
// deep clone 
obj1 = {
  a: 0,
  b: {
    c: 0
  }
};
let obj3 = JSON.parse(JSON.stringify(obj1));
obj1.a = 4;
obj1.b.c = 4;
console.log(JSON.stringify(obj3)); // { a: 0, b: { c: 0}}
```

## Object.entries(obj)

`Object.entries()` 方法返回一个给定对象自身可枚举属性的键值对数组, 其排列与使用 for... in 循环遍历该对象时返回的顺序一致(区别在于 for-in 循环也枚举原型链中的属性).

``` js
const obj = {
  foo: 'bar',
  baz: 42
};
console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]
```

`new Map()` 构造函数接受一个可迭代的entries. 借助Object.entries方法你可以很容易的将Object转换为Map:

``` js
var obj = {
  foo: "bar",
  baz: 42
};
var map = new Map(Object.entries(obj));
console.log(map); // Map { foo: "bar", baz: 42 }
```

## Object.getOwnPropertyDescriptor

获取对象属性的描述信息.

``` js
o = {
  get foo() {
    return 17;
  }
};
d = Object.getOwnPropertyDescriptor(o, 'foo');
// {
//configurable: true
//enumerable: true
//get: ƒ foo()
//set: undefined
// }
```

