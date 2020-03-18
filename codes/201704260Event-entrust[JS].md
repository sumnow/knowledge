<!--
Created: Mon Aug 26 2019 15:16:06 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:16:06 GMT+0800 (China Standard Time)
-->

# 事件委托

也可以叫事件代理, 将事件绑定在高层的元素上, 由高层元素来查找子元素并执行事件.

优点在于: 

1. 降低了空间复杂度, 通常有n个子元素, 复杂度为O(n), 修改后为O(1)

2. 可以让还未创建的元素触发事件

例如

``` html
    <ul>
      <li v-for="item in list" :id="item.id" @click="alertId">{{item.id}}</li>
    </ul>
```

``` js
const list = [{
    id: 'apple'
  },
  {
    id: 'orange'
  }.
]

function alertId(e) {
  console.log(e.target.id)
}
```

用事件委托是这样的: 

``` html
    <ul @click="alert">
      <li v-for="item in list" :id="item.id">{{item.id}}</li>
    </ul>
```

``` js
function alertId(e) {

  if (e.target.nodeName === 'LI') {
    console.log(e.target.id)
  }
}
```

说起来, 其实就多了层判断去寻找子元素, 本身还是通过浏览器的event.target来寻找触发事件的节点.

