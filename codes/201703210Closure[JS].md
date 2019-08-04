# 闭包(closures)

讲到闭包要先说一下数据类型: 

- 基本数据类型: undefined, null, boolean, string, number
- 引用数据类型: Object, array, date, regexp, function

基本类型各自占据空间, 赋值的时候是独立开来, 引用数据类型都引用同一块地址, 赋值的时候是指向统一内存空间。 

*注意: 函数的参数都是值传递的。 因为虽然引用数据类型如果作为参数传入, 被修改会影响到外部的数据, 但是, 当初传的只是那个对象的内存地址而已, 所以并非是引用传递。 *

 `其实, 最主要的区别就是引用类型作为参数传入会被改变, 而基础类型不会(赋值除外)。 ` 

值传递, 函数中运行的只是另一个备份而已

    var a = 10; 

    function foo(num) {
        num = num + 10; 
    }
    foo(a); 
    console.log(a); //10

"引用传递", 函数运行中是指向同一内存块

    var a = {
        c: 1
    }; //如果是[1, 2, 3]
    function foo(num) {
        num.c = 2; 
    } //num[1] = 3
    foo(a); 
    console.log(a); //{c:2} //[1, 3, 3]

函数也是如此。 

    var x = function() {
        console.log(2); 
    }
    x.n = 2; 
    var s = x; 
    x.n = 3; 
    s.n //3

内部匿名函数会将外部函数的活动对象添加到它的作用域链中。 

如果一个函数被另一个函数包裹, 那么这个函数就可以访问父函数的所有变量包括参数, 这不是一个闭包, 因为内部函数没有包裹外部的变量。 

    var testWrap = () => {
        var inner = 0; 
        var testInner = () => { //这是一个私有方法, 只有内部能调用
            console.log(++inner)
        }
        testInner(); 
    }
    testWrap(); //1
    testWrap(); //1
    var testWrap = () => {
        var inner = 0; 
        return () => { //这依然是个内部方法, 但是被返回以后就成了一个闭包
            console.log(++inner); 
        }; 
    }
    //注意: 这段也是调用但是相当于将整个函数重新运行了一遍
    testWrap()(); //1
    testWrap()(); //1
    //这段是只执行返回的那个匿名函数, 形成的闭包包裹了inner, 使其常驻内存。 
    var ss = testWrap(); 
    ss(); //1
    ss(); //2

**当匿名函数被外部函数返回后**, 它的作用域链会被初始化为包含外部函数的活动对象和全局变量对象, 所以这样, 匿名函数就可以访问外部函数作用域中定义的所有变量。 
更为重要的是, 更为重要的是, 更为重要的是, 在外部函数执行完毕后, 其活动对象也不会被销毁, 匿名函数的作用域链仍然在引用这个活动对象。 

换句话说, 外部函数返回后, 外部函数执行环境的作用域链会被销毁, 但它的活动对象仍然会留在内存中, 直到匿名函数被销毁后, 外部函数的活动对象才会被销毁。 

以js高级程序设计举的例子说明: 

    function createFunction() {
        var result = new Array(); 
        for (var i = 0; i < 10; i++) {
            //result[i]的i是正确的数字
            result[i] = function() {
                //这个i就只是引用了
                return i; 
            }
        }
        return result; 
    }
    console.log(createFunction()[1]()) //10

循环的result[0, 1, 2, 3...9] = function(){ return i}; 每次得到的都是i的引用而已。 

 `这个其实很好理解, 就像之前说过的this的指向一样, 函数是在调用的时候才有了指向。 ` 

    function say888() {
        var num = 887; 
        var sayAlert = function() {
            console.log(num); 
        }
        num++; 
        return sayAlert; //888
    }
    say888()() //888

这也证明了闭包中的变量都是引用。 

将闭包中改为一个自执行函数就可以解决问题了。 

    result[i] = function(num) {
        return function() {
            return num; 
        }
    }(i)
    }

此外, 使用es6的局部变量let也可以解决问题, 原理是在每次函数注册的时候声明的都是新的let在函数运行结束后便注销。 

        for (let i = 0; i < 10; i++) {
            result[i] = function() {
                return i; 
            }
        }

还有, 如下的函数就没有return 却依然形成了闭包。 

    const arr = [10, 12, 15, 21]; 
    for (let i = 0; i < arr.length; i++) {
        setTimeout(function() {
            console.log('The index of this number is: ' + i); //4
        }, 3000); 
    }

这个其实是因为settimeout是极为特殊的, 它创建的函数可以访问外层的函数(至于是哪个外层可以参看之前关于[settimeout](http://www.cnblogs.com/mydia/p/6626306.html)的文章), 同样达到了闭包的目的, 包裹外部的变量。 

说了这么多, 闭包除了在我们解决刚才那个问题的时候有用, 其实, 在面向对象的构造函数时, 也依然发挥了作用。 

    var db = (function() {
        // 创建一个隐藏的object, 这个object持有一些数据
        // 从外部是不能访问这个object的
        var data = {}; 
        // 创建一个函数, 这个函数提供一些访问data的数据的方法
        return function(key, val) {
            if (val === undefined) {
                return data[key]
            } // get
            else {
                return data[key] = val
            } // set
        }
        // 我们可以调用这个匿名方法
        // 返回这个内部函数, 它是一个闭包
    })(); 
    db('x'); // 返回 undefined
    db('x', 1); // 设置data['x']为1
    db('x'); // 返回 1
    // 我们不可能访问data这个object本身
    // 但是我们可以设置它的成员

当然了从面向对象的角度来说, 不需要知道内部结构才是最好的方式。 

