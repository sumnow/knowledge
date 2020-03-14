<!--
Created: Mon Aug 26 2019 15:15:22 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:15:22 GMT+0800 (China Standard Time)
-->

# map和set数据类型

## map和set

这是两种新的数据类型, Map的出现主要是因为object对象的key无法用字符串以外的格式, 像数字.

### map

``` js
var map1 = new Map([
  [1, '123'],
  [2, '123']
])
// 也可以
var map2 = new Map();
map2.set(1, '321');
map1.get(1);
// 甚至可以
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```

### map方法:

1. get 
2. set

``` js
let map = new Map();

map.set('1', 'str1'); // a string key
map.set(1, 'num1'); // a numeric key
map.set(true, 'bool1'); // a boolean key

alert(map.get(1)); // 'num1'
alert(map.get('1')); // 'str1'

alert(map.size); // 3
```

#### has 检查是否有此key

``` js
map1.has(1) //true
```

#### delete 删除某个key

``` js
log(map1) //Map(2) {1 => "123", 2 => "123"}
map1.delete(1) //true
log(map1) //Map(1) {2 => "123"}
```

`set无法使用重复的key, 都以key最后一次赋值为准。 ` 

#### How Map compares keys

To test values for equivalence, Map uses the algorithm [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero). It is roughly the same as strict equality ===, but the difference is that NaN is considered equal to NaN. So NaN can be used as the key as well.

This algorithm can't be changed or customized.

#### Iteration over Map

For looping over a map, there are 3 methods:

map.keys() – returns an iterable for keys, 

map.values() – returns an iterable for values, 

map.entries() – returns an iterable for entries [key, value], it's used by default in for..of.

### set

set存储的只有key, 没有value, 而且key是无法重复的, 创建方法:

``` js
var set1 = new Set([1, 2, '2']);
```

### set方法

#### add

``` js
set1.add(4) //Set(4) {1, 2, "2", 4}
```

#### delete

``` js
set1.delete(1) //true
log(set1) //Set(3) {2, "2", 4}
```

set可以方便地去除数组中重复项.

``` js
// var set = new Set([1, 2, 1, 2, 2, 1]); 
var arr = [1, 2, 1, 2, 2, 1];
//new Set 数组去重
function unique(arr) {
  return Array.from(new Set(arr));
};
```

``` js
//使用ES6的方法可以去重。 
console.log(unique(arr));
// 还可以
[...new Set(arr)]
```

## weakSet and weakMap

[阮一峰ES6](https://es6.ruanyifeng.com/#docs/set-map#WeakSet)

WeakSet 结构与 Set 类似, 也是不重复的值的集合. 但是, 它与 Set 有两个区别.

首先, WeakSet 的成员只能是对象, 而不能是其他类型的值. WeakMap的key只可以是对象.

WeakSet和WeakMap 中的对象都是弱引用, 即垃圾回收机制不考虑 WeakSet 对该对象的引用, 也就是说, 如果其他对象都不再引用该对象, 那么垃圾回收机制会自动回收该对象所占用的内存, 不考虑该对象还存在于 WeakSet 之中.

这是因为垃圾回收机制依赖引用计数, 如果一个值的引用次数不为0, 垃圾回收机制就不会释放这块内存. 结束使用该值之后, 有时会忘记取消引用, 导致内存无法释放, 进而可能会引发内存泄漏. WeakSet 里面的引用, 都不计入垃圾回收机制, 所以就不存在这个问题. 因此, WeakSet 适合临时存放一组对象, 以及存放跟对象绑定的信息. 只要这些对象在外部消失, 它在 WeakSet 里面的引用就会自动消失.

由于上面这个特点, WeakSet 的成员是不适合引用的, 因为它会随时消失. 另外, 由于 WeakSet 内部有多少个成员, 取决于垃圾回收机制有没有运行, 运行前后很可能成员个数是不一样的, 而垃圾回收机制何时运行是不可预测的, 因此 ES6 规定 WeakSet 不可遍历.

WeakMap 可以解决引用DOM节点不释放而造成内存溢出的问题.

