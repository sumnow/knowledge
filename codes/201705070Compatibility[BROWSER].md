# 记录兼容性的小问题

### font-size:0; 

``` html
    <div class="ms">
        <img src="11.png" />
        <img src="22222.jpg" />
    </div>
```

inline-block的元素中间会有一个空格字符, 解决方案: 

连写: 

``` html
<img src="11.png" /><img src="22222.jpg" />
```

或者: 

``` html
<div class="ms" style="font-size:0">
    <img src="11.png" />
    <img src="22222.jpg" />
</div>
```

### baseline

默认baseline对齐, input这种替换元素baseline不是在元素底部, 使用vertical-align:top或者bottom

此外使用overflow:hidden; display:block等方法使元素变成 `BFC` 时, baseline也会产生变化. 

### 标题text-indent:-999px

很久以前, 标题有这么一种写法: 

``` css
    text-indent:-999px
```

往往用来隐藏logo里的字, 方便搜索引擎查找. 后来大多用font-size:0来解决了

### 移动端, 弹出数字键盘

``` html
<input type="number" class="ipt-phone" v-model="phone" placeholder="手机号码" pattern="[0-9]*">
```

### 没什么乱用的文字高度撑满

基本文字大小是高度的6/5倍就可以撑满.

``` css
.module {
    height: 30px;
    font-size: 36px;
}
```

### display:inline-block 的bug

当一个元素以inline-block的形态出现的时候, 他们之间会出现一些细小的间隙, 例如两个紧挨着的图片或者输入框, 更神奇的是, 在chrome上存在, 但safari上不存在, 似乎safari尽早得规范了这个问题.

这个问题可以通过设置为 `float` 或者 `font-size: 0` 来解决.

### ios上网页滚动不顺滑

ios上的网页滚动不顺滑, 加上这句就好, 其实不用管啥环境, 加上就完事了.

``` css
html,
body {
    scroll-behavior: smooth;
}
```

``` js
    document.links[0].scrollIntoView({
        behavior: "smooth"
    });
```

