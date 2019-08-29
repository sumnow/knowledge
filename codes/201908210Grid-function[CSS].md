<!--
Created: Sat Aug 24 2019 10:21:12 GMT+0800 (China Standard Time)
Modified: Tue Aug 27 2019 14:31:59 GMT+0800 (China Standard Time)
-->

# grid的应用

首先grid布局非常适合固定高度内的框架布局.

grid布局的一种利用, 就是在不定布局的时候, 可能依赖接口返回数据之类的决定某些模块的顺序.

这种可以提供一种思路, 就是通过 `grid-template-areas` 的属性来处理这个问题.

``` css
/* css */
#page {
    display: grid;
    width: 100%;
    height: 250px;
    grid-template-areas: "head head"
        "nav  main"
        "nav  foot";
    grid-template-rows: 50px 1fr 30px;
    grid-template-columns: 150px 1fr;
}

#page>header {
    grid-area: head;
    background-color: #8ca0ff;
}

#page>nav {
    grid-area: nav;
    background-color: #ffa08c;
}

#page>main {
    grid-area: main;
    background-color: #ffff64;
}

#page>footer {
    grid-area: foot;
    background-color: #8cffa0;
}
```

可以依据后段返回的数据类型, 来动态设置每个模块的 `grid-area` 就可以实现动态的修改位置.

问题主要就在于:

1. 由于其实在html中, dom的结构顺序没有变化, 依旧是从上到下的顺序加载.
2. 兼容性问题.

