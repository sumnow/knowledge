<!--
Created: Mon Aug 26 2019 15:15:20 GMT+0800 (China Standard Time)
Modified: Fri Apr 10 2020 16:39:54 GMT+0800 (China Standard Time)
-->

# 深拷贝 深克隆

常常会遇到需要深拷贝的情况, 记录一下

## 序列化

序列化和反序列化, 多数语言都提供了这种方式, 例如js里的 `JSON.stringify` 还有go里的 `json.Marshal` 

``` js
function deepClone(initalObj) {
  var obj = {};
  try {
    obj = JSON.parse(JSON.stringify(initalObj));
  }
  return obj;
}
```

这个方法很好用, 但是有些问题

1. 无法实现对函数 、RegExp等特殊对象的克隆,undefined会被认为null

2. 会抛弃对象的constructor,所有的构造函数会指向Object

3. 对象有循环引用,会报错

同时 `stringify` 方法有三个参数, 参考[这里](https://juejin.im/entry/5994eca0f265da2495176c23)

## 逐层拷贝

``` js
function deepCopy(obj) {
  // 创建一个新对象
  let result = {}
  let keys = Object.keys(obj),
    key = null,
    temp = null;

  for (let i = 0; i < keys.length; i++) {
    key = keys[i];
    temp = obj[key];
    // 如果字段的值也是一个对象则递归操作
    if (temp && typeof temp === 'object') {
      result[key] = deepCopy(temp);
    } else {
      // 否则直接赋值给新对象
      result[key] = temp;
    }
  }
  return result;
}
```

主要利用了递归, 一个严重的问题是如果存在相互引用会死循环

## 处理循环引用

那么收集对象里所有的引用, 再一一对比就可以了

``` js
function DeepCopy(obj) {
  // Hash表 记录所有的对象引用关系
  let map = new WeakMap();

  function dp(obj) {
    let result = null;
    let keys = null,
      key = null,
      temp = null,
      existObj = null;

    existObj = map.get(obj);
    // 如果这个对象已被记录则直接返回
    if (existObj) {
      return existObj;
    }
    keys = Object.keys(obj);
    result = {};
    // 记录当前对象
    map.set(obj, result);
    for (let i = 0; i < keys.length; i++) {
      key = keys[i];
      temp = obj[key];
      // 如果字段的值也是一个对象则递归复制
      if (temp && typeof temp === 'object') {
        result[key] = dp(temp);
      } else {
        // 否则直接赋值给新对象
        result[key] = temp;
      }
    }
    return result;
  }
  return dp(obj);
}
```

## 扩展阅读

https://github.com/yygmind/blog/issues/31

https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/10

https://segmentfault.com/a/1190000016672263

