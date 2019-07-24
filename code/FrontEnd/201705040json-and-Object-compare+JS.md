# json方法和对象比较

js操作json主要两种方法: stringify()和parse(), 都是由内建对象JSON提供的

``` js
var str1 = '{ "name": "cxh", "sex": "man" }';
var str2 = {
  name: "cxh",
  sex: "man"
};
//转换为对象
var obj = JSON.parse(str1); //{ name: "cxh", sex: "man" }
//转换为字符串
var last = JSON.stringify(str2); //"{"name":"cxh", "sex":"man"}"
```

 `在这里str2 === obj//false` , 引用对象除非指向同一个对象不然是不会相等的. 

此外

``` js
undefined === undefined //true
null === null //true
NaN === NaN //false
```

> NaN是不会与任何值相等的, 包括自己, 因为它代表运算中出现了不可转换的表达式, 导致结果不确定, 成为一个范围.

isNaN()

可以用来判断转换结果是否是NaN. 

``` js
isNaN(123) //false
isNaN("123") //false
isNaN("abc") //true
isNaN("ab3") //true
```

此外对象比较, 如果单纯的对象而且值相等就判定为相等的话, 可以使用以下方法: 

``` js
//比较不包含Array, RegExp, Function的Obejct。 
function objectEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    if (!(a instanceof Array) && !(b instanceof Array) && !(a instanceof RegExp) && !(b instanceof RegExp) && !(a instanceof Function) && !(b instanceof Function)) {
      var aProps = Object.getOwnPropertyNames(a);
      var bProps = Object.getOwnPropertyNames(b);
      if (aProps.length != bProps.length) {
        return false;
      }
      for (let i = 0; i < aProps.length; i++) {
        let propName = aProps[i];
        if (a[propName] !== b[propName]) {
          if (typeof a[propName] === 'object' && typeof b[propName] === 'object') {
            if (!objectEqual(a[propName], b[propName])) {
              return false
            };
          } else {
            return false
          }
        }
      }
    } else {
      return false
    }
    return true
  } else {
    return false
  }
}
var obj1 = {
  st: 1,
  nd: {
    rd: 3
  }
};
var obj2 = {
  st: 1,
  nd: {
    rd: 3
  }
};
objectEqual(obj1, obj2); //true
```

