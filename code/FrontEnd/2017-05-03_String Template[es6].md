# 字符串模版

    var name = "Jerry", 
        name2 = "Tom"; 
    console.log(`Hi, ${name}
        hello， ${name2}`); 

结果： 

> Hi, Jerry        
> hello， Tom

可以使用变量替代模版里的数据, 如果要

    // 写法一
    let str = 'return ' + ' `Hello ${name}!` '; 
    let func = new Function('name', str); 
    func('Jack') // "Hello Jack!"
    // 写法二
    let str = '(name) => `Hello ${name}!` '; 
    let func = eval.call(null, str); 
    func('Jack') // "Hello Jack

## 标签模版

    var a = 5; 
    var b = 10; 
    tag `Hello ${ a + b } world ${ a * b }` ; 
    // 等同于
    tag(['Hello ', ' world ', ''], 15, 50); 
    console.log `Hello ${ a + b } world ${ a * b }` ; //['Hello ', ' world ', ''], 15, 50

第一个参数是一个数组， 是把所有不需要替换的字符串分组， 结尾是一个''空字符， 之后的参数都是需要替换的变量， 理论上来说 `数组长度-1 = 替换变量数` 

标签模版可以过滤用户的输入， 防止恶意代码

    function SaferHTML(templateData) {
        var s = templateData[0]; 
        for (var i = 1; i < arguments.length; i++) {
            var arg = String(arguments[i]); 
            // 转义占位符中的特殊字符。 
            s += arg.replace(/&/g, "&").replace(/</g, "<").replace(/</g, ">"); 
            // 不转义模板中的特殊字符。 
            s += templateData[i]; 
        }
        return s; 
    }

