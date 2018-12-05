# 获取函数名

 `arguments.callee` 可以在函数内部指向当前函数.

但是在es6中, 无法使用.

有一个比较hack的做法

    'use strict'

    function jamie() {
        var callerName; 
        try {
            throw new Error(); 
        } catch (e) {
            console.log(e)
            var re = /(\w+)@|at (\w+) \(/g, 
                st = e.stack, 
                m; 
            re.exec(st), m = re.exec(st); 
            callerName = m[1] || m[2]; 
        }
        console.log(callerName); 
    }; 

    function jiminyCricket() {
        jamie(); 
    }
    jiminyCricket(); // jiminyCricket

> 利用的是手动抛出一个错误, 然后利用错误信息中的stack里的信息.