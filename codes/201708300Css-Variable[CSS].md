# css变量

css也支持变量的存储了, 使用方法为

``` css
    body {
        --Color: #00dd00;
        --num: 10;
    }
```

调用方法为: 

``` css
span {
    color: var(--Color);
}
```

也可以使用默认值, 在变量未定义的情况下使用后面的

``` css
span {
    color: var(--Color, #000)
}
```

声明在body下的变量就只能在body下使用, 可以按这个方法来划分布局和全局. 

同时还可以使用js操作属性: 

``` js
// 设置变量
document.body.style.setProperty('--primary', '#7F583F');
// 读取变量
document.body.style.getPropertyValue('--primary').trim();
// '#7F583F'
// 删除变量
document.body.style.removeProperty('--primary');
```

这个属性是可以存储一些值的, 像数字啊, 字符串啊什么的, 也算是可以让css与js交换数据了. 

目前这个功能, 主流浏览器, Chorome, Firefox, Edge都已经实现, 但是目前功能还是有些不够完备, 难以匹敌less. 

没有函数功能, 没有混入功能, 而且即使存储数值, 也不可以直接与单位相连. 

``` css
    span {
        font-size: var(--num)px; //是无效的。 
    }
```

可以通过这个来达到切换主题的效果.

``` css
:root {
    --background-color: rgb(var(--background-color-r),
            var(--background-color-g),
            var(--background-color-b));

    --text-color: rgb(var(--text-color-r),
            var(--text-color-g),
            var(--text-color-b));

    --primary-color: rgb(var(--primary-color-r),
            var(--primary-color-g),
            var(--primary-color-b));
}
```

然后通过js来修改属性, 达到改变主题的效果

``` js
document.documentElement.style.setProperty('--background-color-r', 255)
```

还有一篇利用css变量自适应的[文章](../FrontEnd/2019-03-10_High Contrast Colors[CSS].md)

