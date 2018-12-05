# [], {}, ()的问题

主要探究这三个的区别

## /[/] Brackets

    var o = {
        wid: 100, 
        say: function() {
            console.log('hello')
        }
    }
    console.log(o['wid'] === o.wid); //true
    o['say'](); //hello

在变量中可以使用[]包裹字符串的形式获取对象的某个属性或者调用方法。 
同样也可以设置方法或者属性。 

    o['no'] = function() {
        console.log('what?')
    }
    o['no'](); //what?

可以用作函数的参数传达： 

    //调用某对象的某方法
    var x = (ele, func) => {
        console.log(ele[func]()); 
    }
    x(o, 'say') //hello

[]的语义
1.声明数组; 
2.取数组成员; 
3.定义对象成员; 
4.取对象成员; 

## () Parentheses

()的语义
1.函数声明时参数表; 
2.与一些语句联合使用以达到限定作用; 

    for (var i in obj) {}
    if (bool) {}
    while (bool) {}
    do {} while (bool)
    //与if, while连用时小括号将其中结果转换成布尔型， 即隐式转换。 

3.与 new一起传实参; 
4.作为函数或者方法调用运算符; 
5.强制表达式运算
    

    //匿名函数自执行
    (function() {})()
    //json用eval解析
    function strToJson(str) {
        // eval 中字符串两旁加了强制运算符() 
        var json = eval('(' + str + ')'); 
        return json; 
    }
    //typeof 
    typeof(null) //'object'
    typeof(function() {
        return undefined
    }()) //'undefined'
    typeof(function() {
        return undefined
    }) //'function'

## {} Braces 

{}的语义
1.组织复合语句

    if () {} else {}
    for () {}

2.对象声明
3.声明函数或者函数表达式
4.异常处理

    try {
        //... 
    } catch (ex) {
        //... 
    } finally {
        //... 
    }

5.特殊结构

    function() {}() //error
    {}.constructor //error
        [].constructor //function Array(){}

为什么可以获取数组的构造， 无法获取对象的构造函数呢？ 

    var x = {}.constructor //function Object(){}

添加一个变量就可以了， 其实主要原因还是js的“语义优先”。 
    

    function() {}() //{}()被认为是复合语句， 而function()缺少定义报错 。 
    {}.constructor被认为是复合语句， 点运算符没有对象自然报错。 

因此， 加上强制运算符就可以解决问题： 

    ({}).constructor! function() {
        console.log('iifksp')
    }()

有很多运算符都可以完成这个效果： 
！ + - new void ~  
注意： function没有返回值时默认返回undefined， 所以以上会被隐式转换， 获得结果对应返回值