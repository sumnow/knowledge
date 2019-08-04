# 自适应页面

自适应不是一个多么新颖的话题了, 解决方案有bootstrap, 到后来的rem等.

最近在做一个列表的时候, 突然发现了一种新的方案.

iphone6上效果如图:

![img](../img/20190321001.png)

当页面尺寸不同的时候, 为了保证图片的纵横比, 应该让每个图文块的宽高保持比例.

众所周知, 宽度用百分比就可以解决了, 那么高度呢?

高度的百分比是依赖parent的高度的, 好像没有什么办法可以让这宽高关联起来.

但是, `padding-top` 为百分比时候, 就是base on 宽度, 如果使用padding-top来作为高度的话, 那么元素本身的大小就应该不影响图文块的高度, 那么就需要将图和文设置为绝对定位, 脱离文档流.

```css
.module {
    position: relative; 
    display: flex; 
    margin: 10px; 
    padding-top: 26%; 
    justify-content: space-between; 
}

.left {
    display: flex; 
    align-items: center; 
    position: absolute; 
    width: 40%; 
    height: 100%; 
    top: 0; 
    left: 0; 
}

.left img {
    width: 100%; 
    height: 100%; 
    border-radius: 10px; 
}

.right {
    position: absolute; 
    width: 58%; 
    top: 0; 
    right: 0; 
    font-size: 12px; 
    font-family: 'Courier New', Courier, monospace; 
}
```

下面是iphone 5上的效果:

![img](../img/20190321002.png)