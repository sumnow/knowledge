<!--
Created: Mon Aug 26 2019 15:16:57 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:16:57 GMT+0800 (China Standard Time)
-->
# 连续赋值与循环引用

## 连续赋值

以下两端代码的结果: 

``` js
var foo = {
    n: 1
};
var bar = foo;
foo = {
    n: 2
};
foo.x = foo;
// foo.n = foo = {n:2}; 
console.log(foo.x);
console.log(bar.x);
var foo = {
    n: 1
};
var bar = foo;
foo.x = foo = {
    n: 2
};
console.log(foo.x);
console.log(bar.x);
```

> 第一段: 

{

``` js
n: 2,
    x: {
        n: 2,
        x: {} //无限层
    }
```

}
undefined

_这边, 其实我不太理解, 为嘛自己指向自己还可以无限展开, 感觉像是盒子里面装了个盒子, 盒子里还是盒子, 后来自己甩了自己一耳光, 这哪里是盒子, 这根本就是个跳转本页的超链接而已......_

> 第二段: 

undefined
{n:2}

结果还是蛮奇怪的, 众所周知赋值语句从右往左执行, 第一种无非是把第二种按照此种理解拆分开来, 结果却不同. 

第一种结果就不解释了, 这只是很基本的_引用赋值_. 

`这里赘述一句: 解释器对声明变量函数的语句(var x = 1)返回undefined, 赋值语句(x = 2)则返回值(2)` 

理解第二种, 需要了解js中的变量机制, 其实所有的变量都是指向一个内存地址, 无论引用或者基本变量. 

``` js
var a = 's'; //申明了s, 那s就占据一块内存, 然后a指向这块内存
var b;
var a = a + b;
log(a) //'sundefined'//其实没有改变开始的s, 而是新建了sundefined的字符串, 然后改变a的指向, 垃圾回收器发现没人要s了, 就收走了。 
```

这在引用类型中更加明显. 

``` js
var a = {
    n: 1
};
a.x = 3;
var b = a; //{n:1, x:3}
var a = {
    n: 2
}; //{n:2}
```

`a.x = 3` 不是给a.x赋值, 而是给 `{n:1}.x` 赋值, 而后a又指向了 `{n:2}` , `x` 是谁就完全不知道了. 

主要看第二种, 第二种的编译顺序是这样的: 
var foo; 
var boo; 
foo = {n:1}; 
boo = foo; 
foo.x = (); //()内是一个值, 而且foo指向的是{n:1}
//编译顺序跟执行顺序是有些小差异的, 从上往下执行, 但是发现后面是个表达式就需要先执行, 然后再赋值. 
foo = {n:2}; //foo现在指向{n:2}
console.log(foo.x)//{n:2}完全不认识x
console.log(boo.x)//这哥们一直指向挂着x的{n:1}

##  

