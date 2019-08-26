<!--
Created: Mon Aug 26 2019 15:19:21 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:19:21 GMT+0800 (China Standard Time)
-->
# vue keepalive and distory

vue 实现的单页面应用中, 常常有些访问频率非常高的页面, 需要 `keepalive` 来保证活性, 例如

1. 列表页面, 访问下级页面的时候需要保存该页面的状态, 例如滚动距离, 选中项目之类. 

2. 页面中请求了大量数据, 且是访问时间内不会发生改变的数据, 保存数据, 以提高用户体验. 

往往有时候会有需求, 需要在特定页面进入之后, 触发页面的重新渲染, 这里提供几个解决方案. 

> keepalive 的组件不可以使用destroy来销毁, 在某些需要初始化的场景下, 正确的做法, 应该是保存页面进入时的数据, 然后出发init方法. 这个与keepalive的实现原理有关, keepalive在页面初始化的时候在App.vue里维护一个数组, 记录了所有keepalive的组建名, 当每次进入组件的时候, 检查是否includes, 如果销毁了组件, 就会导致每次进入某一个keepalive后又被销毁了的组件, 重新新建一个该组件. 

