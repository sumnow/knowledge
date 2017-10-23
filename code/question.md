# Questions

## 05-05 2017

    var test = {
        a:2
    };
    test.b = test;
    //这么写可以创造一个无限层级的对象，这是合理的存在么？

    var test = {
        a:2,
        b:test//这么写，b就是undefined。
        //因为执行顺序是：
        //var test;
        //test= {}//声明未赋值的变量
    };