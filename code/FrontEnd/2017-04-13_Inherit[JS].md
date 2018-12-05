# 继承(inherit)

oop的三大特性： 封装， 继承， 多态。 

js中多态和封装实现的相当简洁， 主要探讨一下继承这个"坑爹"的属性吧。 

js为了实现类， 用函数来冒充（就相当于用每个类的构造函数）， 为了实现继承， 就想到了原型的方式， 这也是最简单的实现方式。 

## 简单原型链实现

    function Person(pname, teams = []) {
        this.pname = pname; 
        this.team = Array.from(teams); 
        //就当作抽象方法吧。 
        this.transfiguration = () => {}
    }

    function Ultraman(name, types = []) {
        var _name = name; 
        this.type = types; 
        //实现transfiguration方法
        this.transfiguration = () => 'Ultraman ' + _name; 
    }
    //奥特曼都是人变的
    Ultraman.prototype = new Person(); 
    var daigo = new Ultraman('Tiga'); 
    var asuka = new Ultraman('Dyna'); 
    daigo.team.push('GUTS'); 
    log(daigo.team, asuka.team); //['GUTS', 'GUTS']
    ['GUTS', multi]

给任意一个实例修改属性后， 都会影响继承同一个原型的所有属性； 同时， 子类没有办法给父类传递参数。 

## apply实现

    function Person(pname, teams = []) {
        this.pname = pname; 
        this.team = Array.from(teams); 
        //就当作抽象方法吧。 
        this.transfiguration = () => {}
    }

    function Ultraman(params, name) {
        Person.apply(this, params); 
        var _name = name; 
        this.type = []; 
        //实现transfiguration方法
        this.transfiguration = () => 'Ultraman ' + _name; 
    }
    var daigo = new Ultraman(['daigo', ['GUTS']], 'Diga'); 

现在可以传递参数给父类了， 并且彼此不会影响， 准确的说， 只是单纯复制了一份属性而已， 完全没有用到原型链。 缺点就是如果大量出现子类实例的话， 内存爆炸。 

## 组合模式

    function Person(pname, teams = []) {
        this.pname = pname; 
        this.team = Array.from(teams); 
    }
    Person.prototype.transfiguration = function() {
        if (this._name) {
            return 'Ultraman ' + this._name; 
        }
        if (this.pname) {
            return 'Person ' + this.pname; 
        } else {
            return ''; 
        }
    }

    function Ultraman(params, name) {
        Person.apply(this, params); //调用父函数， 拷贝了一次父类实例属性作为子类属性
        this._name = name; 
        this.type = []; 
    }
    Ultraman.prototype = new Person(); //这个父类属性里本就有自己的实例属性， 但是下面子类已经拷贝过这个属性了， 会被下面子类拷贝的那份覆盖。 
    var asuka = new Person('asuka'); 
    var daigo = new Ultraman(['daigo', ['GUTS']], 'Diga'); //这一步调用Ultraman里拷贝父类属性的方法。 
    log(asuka.transfiguration()) //Person asuka
    log(daigo.transfiguration()) //Ultraman Diga

这个把变量属性保存在每个实例中， 将方法放到了原型上， 减少了方法占用的内存， 同时也可以传递参数。 减少了方法的内存占用， 但存在着子类中重复的父类属性的问题。 

## 寄生组合的方法

    function Person(pname, teams = []) {
        this.pname = pname; 
        this.team = Array.from(teams); 
        //就当作抽象方法吧。 
    }
    Person.prototype.transfiguration = function() {
        if (this._name) {
            return 'Ultraman ' + this._name; 
        }
        if (this.pname) {
            return 'Person ' + this.pname; 
        } else {
            return ''; 
        }
    }

    function Ultraman(params, name) {
        Person.apply(this, params); //拷贝一次父类的实例属性
        this._name = name; 
        this.type = []; 
        //实现transfiguration方法
    }
    var sup = Object.create(Person.prototype); 
    log(sup.constructor) //Person(){}
    sup.constructor = Ultraman; 
    Ultraman.prototype = sup; 
    var asuka = new Person('asuka'); 
    var daigo = new Ultraman(['daigo', ['GUTS']], 'Diga'); 
    log(asuka) //Person asuka
    log(daigo) //Ultraman Diga

这样只在new Ultraman的时候拷贝了子类的属性。 其实就是使用Object.create(Person.prototype)替换了Ultraman.prototype = new Person()的时候， apply会重新拷贝一次父类属性的问题。 

另外， 说一下Object.create()的实现。 

    function myCreate(p) {
        //！ ！ ！ 这一段很重要， 可以把p看作P.prototype, 让F.prototype以P.prototype为原型， 
        //然后创建一个继承了P属性的实例ins， 把ins返回出去， 在这段函数外是看不见F, ins的， 
        //在函数运行结束后就销毁了， 只留下一个继承了P属性的实例， 完成了继承。 
        function F() {}; 
        F.prototype = p; 
        return new F(); 
    }

至于如果要实现多继承就比较坑爹了。 call方法是一定可以的。 要么就是将父类的方法拷贝到子类身上来完成效果， 如下： 

    function extend(destClass) {
        var classes = Array.prototype.slice.call(arguments, 1); 
        for (var i = 0; i < classes.length; i++) {
            var srcClass = classes[i]; 
            var srcProto = srcClass.prototype; 
            var destProto = destClass.prototype; 
            for (var method in srcProto) {
                if (!destProto[method]) {
                    destProto[method] = srcProto[method]; 
                }
            }
        }
    }

    function Book() {}
    Book.prototype.getName = function() {}; 
    Book.prototype.setName = function() {}; 

    function Tech() {}
    Tech.prototype.showTech = function() {}; 

    function JS() {}
    extend(JS, Book, Tech); 
    var js = new JS(); 
    console.log(js); 

还有一种方法， 就是让Parent1, Parent2的属性合并， 然后继承这个大的属性， 完成多继承。 

