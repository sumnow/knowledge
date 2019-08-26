<!--
Created: Mon Aug 26 2019 15:19:30 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:19:30 GMT+0800 (China Standard Time)
-->
# vue theory

### 前言

在看代码之前先想下如果自己实现一个数据驱动, 双向绑定, 会怎么做. 

1. 获取 `data` , 在任意用户操作以后, 将 `data` 作比较, 然后修改有变动的项. 

2. 给每个数据设定一个 `get` , `set` 方法(java的同学可能会觉得很像, 但有些不同. )

> java中的 `get` 和 `set` 方法, 主要是为了获取例如 `private` 关键字声明的类的变量, 此外也可以控制读取, 或是设置某些值的某些权限. 

第一种方法, 恭喜, 你和google想到一起了, 这就是出名的 `angular` 的"脏检查", 在每个模块( `scope` )里, 他监听自己的所有有可能引起数据变化的方法, 如用户操作的 `ng-click` , `ng-change` , `ng-blur` , 或者是 `$window` , `$location` , `$timeout` , `$http` 这种状态变化或是网络交互. 

一旦触发了这类事件, 检测器就在合适的时候对模块内的数据进行检查, 并修改, 然后再重复检查一次, 并修改数据, 这是为了防止上次修改的数据, 影响了别的数据, 重复递归, 直到值没有变化. 即最少检查两次, ng内部为了控制内存占用, 所以周期内最多检查十次. 

所以一般手动来检测, 一般都是用 `trick()` 或者 `setTimeout` . 

这种方法面临的问题就是, 每次检查带来的巨大开销, 因为检查的成本很高, 且触发范围难以控制, 索性google已经做得相当好了, 例如检测树等优化措施. 

第二种方法, 就是广为人知的 `vue` 和 `react` 的实现原理, 两者都是订阅发布模式, `vue` 和 `react` 只是实现方式不同, 在生命周期等地方都有相似性, `react` 是设定了 `get` 和 `set` 然后触发 `render` 更新视图. 

这里我们只谈 `vue` , 它来自一个ES5的特性 `Object.defineproperty` , 可以监听一个属性值的 `get` , ` set ` 方法. 

> 这里介绍一下 `Proxy` 也可以实现与 `Object.defineproperty` 相似的功能, 这是ES6的新特性. 

暂且忽略 `vue` 中复杂的功能, 直说核心功能: 

响应式的数据绑定

[虚拟DOM virtual dom](../FrontEnd/201802270virtual-dom-and-diff-algorithm+Vue.md)

[diff算法](../FrontEnd/201802270virtual-dom-and-diff-algorithm+Vue.md)

patch方法, 更新真实DOM

 

