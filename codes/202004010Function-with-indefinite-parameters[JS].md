# 不定参数的函数

题目

``` JS
// JavaScript
// 传入不定参数数量,最后返回一个数组
console.log(list(1)()) // [1]
console.log(list(1)(2)()) // [1,2]
console.log(list(1)(2)(3)()) // [1,2,3]
console.log(list(1)(2)(3)(4)()) // [1,2,3,4]
```

list 函数如下

``` JS
// JavaScript
function list(args, arr) {
  arr = arr || []
  if (args !== undefined) {
    arr.push(args)
    return function(l) {
      return list(l, arr)
    }
  } else {
    return [...arr]
  }
}
```

如果题目再改成

``` JS
// JavaScript
// 传入不定参数数量,最后返回一个数组
console.log(list(1)) // [1]
console.log(list(1)(2)) // [1,2]
console.log(list(1)(2)(3)) // [1,2,3]
console.log(list(1)(2)(3)(4)) // [1,2,3,4]
```

去掉了一个执行的括号, 那么如何在最后一步将结果返回呢? 这个可以用到 `valueOf` 方法

``` JS
// JavaScript
function list(args, arr) {
  arr = arr || []
  arr.push(args)

  function untitled(l) {
    return list(l, arr)
  }
  // 改写untitled的toString方法
  untitled.toString = () => `[${arr}]` 
  return untitled
}
```

这个虽然可以实现, 但是效果非常不好... 

