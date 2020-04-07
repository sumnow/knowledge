<!--
Created: Tue Apr 07 2020 14:27:54 GMT+0800 (China Standard Time)
Modified: Tue Apr 07 2020 17:03:26 GMT+0800 (China Standard Time)
-->

# mvc mvp 和 mvvm

[link](https://draveness.me/mvx/)

## 前端的mvc

以一个非常简单的点击按钮, 变量加一来分析

### View

是网页上显示的 `button` 和变量 `variable` 

用户点击 `button` 触发 `Control` 

### Control

是网页里的js代码, 它决定点击 `button` 后会执行什么事件, 例如 `addVariable` , 执行以后, 触发modal更新数据

### Modal

modal里有变量, 以及一些方法, 数据改变了以后, 调用更新方法.

## mvp

mvp就是View和Modal都只和Presenter互动

## mvvm

在mvp上把presenter换成了vm

