# 原型

js中的原型是为了完成面向对象的功能， 因此原型结合面向对象会更加容易理解。 

1. 任何函数都是有prototype的, 
2. 任何对象都有__proto__属性, 
3. __proto__默认指向构造函数的prototype.

听起来很绕， 其实很好理解， 每个函数都可以看作一个工具， 而prototype就是用这个工具做出来的样品， 之后做出来的任何产品都和这个样品的基础属性相同。 

 `一句矫情的话， 青梅枯萎， 竹马老去， 从此我爱的人都很像你。 大概就是函数对原型最深的爱吧。 所以！ 千万别爱错了人。 原型都认不准， 怎么说自己专情？ ` 

而之后产出的所有产品都贴了标签constructor, 指向当初那个制造的工具， 此外也标注了当初的那个原型__proto__。 

    function A() {
        this.a = 1
    }
    var a1 = new A(); 
    console.log(a1); //{a:1}
    console.log(A.prototype); //{constructor:A(), __proto__:Object.prototype}
    console.log(a1.constructor); //A()
    console.log(A.prototype.constructor) //A()
    console.log(a1.__proto__); //A.prototype
    console.log(A.prototype.__proto__); //Object.prototype
    console.log(A.prototype.__proto__ === Object.prototype) //true
    console.log(Object.prototype.__proto__); //null
    console.log(Object.__proto__ === Function.prototype); //true
    console.log(Object.constructor === Function); //true
    console.log(A.constructor === Function); //true
    console.log(A.__proto__ === Function.prototype); //true
    console.log(Function.prototype.__proto__ === Object.prototype); //true
    console.log(Function.__proto__ === Function.prototype); // true

主要分为两条线， 一条是构造函数线， 一条是原型线。 

__proto__指向样品， 即原型， constructor指向工具， 即构造函数。 

- A.prototype的样品(__proto__)是Object.prototype; 
- Object.prototype是创造出来， 没有样品(null)， 但是它的制作工具（constructor）是Object; 
- Object和A都是工具， 但是他们是以Function.prototype这个高级样品制作的， 制作他们的工具是Function; 
- 而Function这个高级制作工具跟Obejct和A这些工具一样是以Function.prototype为样品的， 也就是说自己是自己为样品制造的。 `这个其实很好理解， 制造工具的是另一把工具， 面具之下是另一张面具` 
- 那么所有都指向Function.prototype这个神奇的样品， 他的制作工具是Function， 它又是以Object.prototype为样品制作的， 这样返回了之前的地方， Object.prototype又是创造出来的。 

基本这就是原型链的主要内容了， 原型链主要是靠__proto__一直查找样品， 形成的向上查找的能力。 

其实原型链并不长， 默认情况下， 所有函数都是以Function.prototype为样品的， 所有函数的实例对象以及原型都是以Object.prototype为样品的。 

原型链的应用非常多， 是jsoop的实现基础， 把类中的变量各自保存， 把类中的方法放在原型上共享。 还有类似new， Object.create都是利用原型完成的。 

此外还有两个经常用到的方法:

## isPrototypeOf, instanceof

    object1.isPrototypeOf(object2); 
    Array.prototype.isPrototypeOf([1, 2, 3]) //true
    Object.prototype.isPrototypeOf([1, 2, 3]) //true
    [1, 2, 3] instanceof Array //true
        [1, 2, 3] instanceof Object //true

判断object2参照的样品是不是object1。 

## hasOwnProperty

    object.hasOwnProperty(proName); 
    '123'.hasOwnProperty("split"); // 得到false， 因为不能检测原型链中的属性 
    String.prototype.hasOwnProperty('split'); // String对象的原型上本来就有这个属性， 自然返回true

判断object自己是不是有proName这个属性， 不算原型链上的。 

