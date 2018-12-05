# Object 

Object 对象的属性有 `Object.prototype` , `Object.prototype.__proto__` , `Object.prototype.constructor` 

## Object.assign

    Object.assign(target, ...sources)

    
 `Object.assign()` 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。 它将返回目标对象。 

拷贝的值如果时引用属性， 会依然存在引用关系， 应当生成一个新对象来解决这个问题。 

    // deep clone 
    obj1 = {
        a: 0, 
        b: {
            c: 0
        }
    }; 
    let obj3 = JSON.parse(JSON.stringify(obj1)); 
    obj1.a = 4; 
    obj1.b.c = 4; 
    console.log(JSON.stringify(obj3)); // { a: 0, b: { c: 0}}

## Object.freeze()

冻结一个对象， 使得无法添加修改删除其属性， 也无法修改可枚举性， 可配置性， 可写性。 

    var obj = {
        aoo: 12, 
        boo: 'asd'
    }
    Object.freeze(obj)
    Object.isFreeze(obj) // true
    obj.aoo = 3
    // throw a TypeError

但如果冻结的属性是对象的话， 就可以了， 因为并没有改变其指向。 

    var obj = {
            aoo: {}
        }, 
        Object.freeze(obj)
    obj.aoo.a = '1'

我们可以使用深冻结DeepFreeze来解决

    function deepFreeze(obj) {
        var propNames = Object.getOwnPropertyNames(obj); 
        propNames.forEach((name) => {
            var prop = obj[name]; 
            if (typeof prop == 'obj' && prop !== null) {
                deepFreeze(prop)
            }
        }); 
        return Object.freeze(obj)
    }

## Object.preventExtensions(obj)

使得一个对象无法被扩展, 是可以删除或修改属性的。 

    var obj = {}
    Object.isExtensible(obj)
    // true
    Object.preventExtensions(obj)
    Object.isExtensible(obj)
    // false

## Object.prototype.propertyIsEnumerable(prop)

    obj.propertyIsEnumerable(prop)
    //返回一个bool， 判断指定的属性是否可枚举。 

## Object.getOwnPropertyNames(obj)

    obj.getOwnPropertyNames(obj)

获取给定对象找到的属性对应的字符串数组。 

    var arr = ['a', 'b', 'c']
    Object.getOwnPropertyNames(arr)
    // ["0", "1", "2", "length"]

## Object.prototype.getOwnProperty(prop)

    obj.getOwnProperty(prop)
    // 判断对象是否具有指定的属性作为自身属性(非继承)

## Object.seal()

    Object.seal(obj)

将一个对象密封， 密封对象不可添加新属性， 而且会把已有属性的configurable置为false， 但writable为true的依然可以被修改。 

## Object.entries(obj)

 `Object.entries()` 方法返回一个给定对象自身可枚举属性的键值对数组， 其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环也枚举原型链中的属性）。 

    const obj = {
        foo: 'bar', 
        baz: 42
    }; 
    console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]

 `new Map()` 构造函数接受一个可迭代的entries。 借助Object.entries方法你可以很容易的将Object转换为Map:

    var obj = {
        foo: "bar", 
        baz: 42
    }; 
    var map = new Map(Object.entries(obj)); 
    console.log(map); // Map { foo: "bar", baz: 42 }

