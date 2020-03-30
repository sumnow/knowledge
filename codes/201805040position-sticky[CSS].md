<!--
Created: Mon Aug 26 2019 15:19:51 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:19:51 GMT+0800 (China Standard Time)
-->
# position

`position` 有一个新的属性: `sticky` 粘性布局. 

#### 兼容性

`firefox` 和 `safari` 早就支持了, chrome 在55以后版本完全支持, `ie` 和 `Edge` 可以洗洗睡了. 

#### 表现

常见的, 滚动页面到到某处以后, 一个元素从文档流中位置变成 `fixed` 定位. 例如页面里某一个栏目, 出现在页面后常驻顶部. 

具体代码: 

``` css
    {
        position: -webkit-sticky;
        position: sticky;
        top: 0;
    }
```

