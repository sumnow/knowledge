<!--
Created: Thu Apr 02 2020 15:27:35 GMT+0800 (China Standard Time)
Modified: Thu Apr 02 2020 16:01:14 GMT+0800 (China Standard Time)
-->

# Function.property

## Function.prototype.arguments

这个在函数里内置了, 在将函数变为活动对象的时候创建

## length

函数的 `length` 就是他所需要的参数的数量

> es6 的解包操作符不算在内

## 函数的name

函数的名字

## 直接输入函数

返回的是toString(), 可以改写

``` JS
// JavaScript
function func() {
  return 'hello'
}
func
// function fun(){return 'hello'}
func.toString = () => 'hello'
func // 'hello'
```

