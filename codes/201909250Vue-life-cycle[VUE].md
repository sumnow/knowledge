<!--
Created: Wed Sep 25 2019 10:56:15 GMT+0800 (China Standard Time)
Modified: Wed Sep 25 2019 19:57:15 GMT+0800 (China Standard Time)
-->
# vue的生命周期

当一个父组件中加载一个子组件, 且父组件和子组件中同时调用mixin函数时, 整个生命周期的顺序为:

1, 创建父组件

beforeCreate: 父组件中的mixins--父组件--子组件中的mixins--子组件

created: 父组件中的mixins--父组件

2, 挂载父组件之前

beforeMount: 父组件中的mixins--父组件

1) 创建子组件

beforeCreate: 子组件中的mixins--子组件

created: 子组件中的mixins--子组件

2) 挂载子组件之前

beforeMount: 子组件中的mixins--子组件

3, 挂载子组件

mounted: 子组件中的mixins--子组件

4, 挂载父组件

mounted: 父组件中的mixins--父组件

总的来说, 从创建到挂载, 是从外到内, 再从内到外, 且mixins的钩子函数总是在当前组件之前执行

## 更新

只有在标签上绑定了data时, data发生改变, 才会触发updated钩子函数. 如果只是在控制台改变data, 而没有反馈到视图上, 则无法触发.

当data中的数据改变时, 不会触发子组件中的updated函数. 触发的顺序仍然是mixins先于组件

## 销毁

组件销毁的顺序跟创建的顺序类似, 还是尊重"从外到内, 再从内到外, mixins先于组件"这样的原则. 但是, 小编尝试过, 绑定在子组件中的事件仍然可以调用(这点我也很奇怪).

