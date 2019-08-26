<!--
Created: Mon Aug 26 2019 15:16:16 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:16:16 GMT+0800 (China Standard Time)
-->
# 清除浮动

## 父元素浮动

父元素浮动的子元素会有自己的布局. 

## clear:both

可以单独写一个标签放在元素最后, 但现在通常都使用伪元素. 

``` css
    .clearfix:after {
        content: "";
        display: block;
        clear: both;
    }

    .clearfix {
        *zoom: 1;
    }

    //这个也是layout问题, 解释见下面
```

你或许见过下面的写法: 

``` css
.clearfix:after {
    content: "\0020"; //空白点
    display: block;
    height: 0; //让元素不显示, 包括 visibility:hidden; 这种方式
    clear: both;
}
```

> 这个是早期浏览器的问题, 这么写可以防止伪元素使元素间出现空隙. 

## overflow:hidden

对元素的高度进行计算, 然后完成裁剪, 这里涉及到 `BFC` . 

> BFC 全称是块级排版上下文, 独立的块级上下文可以包裹浮动流, 全部浮动子元素也不会引起容器高度塌陷, 也就是说包含块会把浮动元素的高度也计算在内, 所以不用清除浮动来撑起高度. 

> 那么如何触发BFC呢? 

float 除了none以外的值 
overflow 除了visible 以外的值(hidden, auto, scroll ) 
display (table-cell, table-caption, inline-block) 
position(absolute, fixed)

对了, bfc虽然无处不再, 但是另一个地方也显示了他的问题: 就是关于同一块bfc内, 垂直的元素的margin上下值是会重叠的. 可以用上面的办法将子元素变成新的bfc来解决重叠的问题. 

对了, 如果有低版本的ie兼容问题, 还需要添加固定layout的方法:

``` js
\* zoom: 1
```

> layout这是个坑爹的属性, ie8以后就被废弃了, 别想太多. 

其实说起来, 我觉得bfc跟盒子模型也有很大的关系

两种经典的盒子模型: 

w3c模型: 
content不包括padding, border, 类似box-sizing:content-box(default)

ie模型: 
content包括padding, border

其实ie模型就类似之后的css属性中box-sizing:border-box

