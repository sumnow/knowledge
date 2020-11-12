<!--
Created: Wed Oct 14 2020 18:00:34 GMT+0800 (China Standard Time)
Modified: Thu Oct 15 2020 14:55:05 GMT+0800 (China Standard Time)
-->

# Vue 事件默认参数

以element-ui的 `switch` 为例, 

``` HTML
<!-- HTML -->
<el-switch @change="changeSwitchStaus(e, scope.row)" active-text="上架" inactive-text="下架" :active-value="1" :inactive-value="2" v-model="scope.row.status" active-color="#13ce66" inactive-color="#ff4949">
</el-switch>
```

``` JS
// JavaScript
changeSwitchStaus(e, row) {
  console.log(e, row)
  // e undefined
  // row {...}
}
```

这么写是无法拿到, 官方文档中, 所说的回调参数, 即新状态的值.

## 方法一

``` HTML
<!-- HTML -->
<el-switch @change="changeSwitchStaus($event, scope.row)" active-text="上架" inactive-text="下架" :active-value="1" :inactive-value="2" v-model="scope.row.status" active-color="#13ce66" inactive-color="#ff4949">
</el-switch>
```

``` JS
// JavaScript
changeSwitchStaus(e, row) {
  console.log(e, row)
  // e 1
  // row {...}
}
```

这样可以拿到最新的值.

## 方法二

``` HTML
<!-- HTML -->
<el-switch @change="e=>changeSwitchStaus(e, scope.row)" active-text="上架" inactive-text="下架" :active-value="1" :inactive-value="2" v-model="scope.row.status" active-color="#13ce66" inactive-color="#ff4949">
</el-switch>
```

``` JS
// JavaScript
changeSwitchStaus(e, row) {
  console.log(e, row)
  // e 1
  // row {...}
}
```

使用闭包的方式实现

