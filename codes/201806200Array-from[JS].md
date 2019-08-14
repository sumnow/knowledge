

### Array.from

从一个类似数组(如NodeList, arguments)或可迭代对象(如map, set, `string既是数组又是可迭代对象` )创建一个新的数组实例. 

``` js
//字符串转换
Array.from('foo');
// ["f", "o", "o"]
//map转换
var m = new Map([
    [1, 2],
    [2, 4],
    [4, 8]
]);
Array.from(m); //[[1, 2], [2, 4], [4, 8]]
// 使用 map 函数转换数组元素
Array.from([1, 2, 3], x => x + x); // [2, 4, 6]
// 生成一个数字序列
Array.from({
    length: 5
}, (v, k) => k); // [0, 1, 2, 3, 4]
//数组去重
var arr = [1, 2, 1, 2, 2, 1];
//new Set 数组去重
function unique(arr) {
    return Array.from(new Set(arr)); //去重复
};
console.log(unique(arr));
//es6
(function(first, ...rest) {
    log('first', first); //1
    log('rest', rest); //['Second, 3']
})(1, 'Second', 3);
```

``` js
//es5
(function() {
    var first = arguments[0];
    var rest = Array.from(arguments).slice(1);
    log('first', first);
    log('rest', rest);
})(1, 'Second', 3)
// 类数组的转换
obj = {
    length: 3,
    0: 2,
    1: 4,
    2: 6
}
Array.from(obj)
// [2, 4, 6]; 
Array.prototype.slice.call(obj, 0);
// [2, 4, 6]
Array.prototype.slice.call(obj)
//[2, 4, 6]
Array.prototype.slice.call(obj, undefined);
//[2, 4, 6]
obj = {
    length: 3,
    1: 2,
    3: 6,
    5: 10
}
Array.from(obj)
//[undefined, 2, undefined]; 
```

