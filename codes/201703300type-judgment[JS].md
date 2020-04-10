<!--
Created: Fri Apr 10 2020 11:40:24 GMT+0800 (China Standard Time)
Modified: Fri Apr 10 2020 13:21:21 GMT+0800 (China Standard Time)
-->

# 类型判断

## typeof 操作符

| Type                                                    | Result      |
|---------------------------------------------------------|-------------|
| Undefined                                               | "undefined" |
| Null                                                    | "undefined" |
| Boolean                                                 | "boolean"   |
| Number                                                  | "number"    |
| BigInt (new in ECMAScript 2020)                         | "bigint"    |
| String                                                  | "string"    |
| Symbol (new in ECMAScript 2015)                         | "symbol"    |
| Function object (implements [[Call]] in ECMA-262 terms) | "function"  |
| Any other object                                        | "object"    |

无法分辨Array和Object

## instanceOf 操作符

判断是否是某个原型, 可以有效地判断出Array, 只有一个bug, 就是在 `iframe` 里

``` JS
// JavaScript
var iframe = document.createElement('iframe');
document.body.append(iframe);
var FrameArray = window.frames[window.frames.length - 1].Array;
var array = new FrameArray();
console.log(array instanceof Array);
// false
```

## 万能的方法

只要不被重写

``` JS
// JavaScript
function getType(obj) {
  return Object.prototype.toString.call(obj).match(/^\[object (.*)\]$/)[1].toLowerCase();
}
```

