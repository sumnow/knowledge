### 类数组对象与Iterator of

类数组对象跟数组对象在es6中有了统一的称呼，可迭代对象

    obj = {
        length:3,
        0:2,
        1:4,
        2:6
    }
    Array.from(obj)//[2,4,6];
    Array.prototype.slice.call(obj,0);//[2,4,6]
    Array.prototype.slice.call(obj);//[2,4,6]
    Array.prototype.slice.call(obj,undefined);//[2,4,6]

    obj = {
        length:3,
        1:2,
        3:6,
        5:10
    }
    Array.from(obj)//[undefined,2,undefined];




