# js的私有属性和实例属性

谈一谈之前看到的一个问题代码所反映的问题. 

``` js
function Parent() {
  // 私有属性
  var _val = 1; // 私有基本属性
  var _arr = [1]; // 私有引用属性
  function _fun() {} // 私有函数(引用属性)
  // 实例属性
  this.val = 1; // 实例基本属性
  this.arr = [1]; // 实例引用属性
  this.fun = function() {
    log(_val)
  }; // 实例函数(引用属性)
}
```

``` js
function Child() {}
Child.prototype = new Parent();
var child1 = new Child();
log(child1);
```

![](http://images2015.cnblogs.com/blog/1121217/201704/1121217-20170413091157283-1665075142.png)

一个原型的简单实现, child1里有所有的实例方法. 这些私有属性是没有办法办法在外部调用或者查找的, 或者说是不存在的. 

``` js
Child.prototype = new Parent();
log(Parent.prototype.fun()); //error
Parent.prototype._val = 2;
var child1 = new Child();
log(child1.fun()); //1
```

即使我改变了修改了原型上的_val, 但是输出的时候依然还是1, 因为修改了原型并不能修改私有属性, 私有属性是定义在函数上的, `与这个函数创建出的任何实体都没有关系` . 

``` js
var child1 = new Child();
log(child1.arr);
child1.arr.push(2);
var child2 = new Child();
log(child2.arr);
```

![](http://images2015.cnblogs.com/blog/1121217/201704/1121217-20170413093119361-1267109832.png)

为什么修改一个实体, 会影响之后的创建的实体呢? 

或许你知道, 是因为arr是引用属性, 没错, 因为即时 `arr这种引用属性, 变量保存的都只是地址而已。 ` 

另外, 就算是在改变arr之前创建的也会变. 

``` js
var child1 = new Child();
var child2 = new Child();
log(child1.arr);
child1.arr.push(2);
log(child2.arr);
```

这是因为new的构造方式: 

``` js
function New(f) { //f为函数
  return function() {
    var o = {
      'prototype': f.prototype
      //建立原型链的关系
    };
    f.apply(o, arguments);
    //实现f这个函数的所有属性, 把参数传进f, 相当于实现了函数的所有方法和属性。 
    return o;
  }
}
```

这样建立的永远是索引父类的原型对象的, 在原型对象里属性改变后, 再查询那个地址, 地址还是那个地址, 只不过里面内容变化了. 

