# 函数功能扩展

es6允许函数参数有默认值， 而且如果参数的默认值是变量的话， 会惰性求值。 

    let x = 99; 

    function foo(p = x + 1) {
        console.log(p); 
    }
    foo() // 100
    x = 100; 
    foo() // 101

此外， 配合解构赋值可以极大的提升代码可读性， 但也需要注意

    // 写法一
    function m1({
        x = 0, 
        y = 0
    } = {}) {
        return [x, y]; //
    }
    // 写法二
    function m2({
        x, 
        y
    } = {
        x: 0, 
        y: 0
    }) {
        return [x, y]; //
    }
    // 函数没有参数的情况
    m1() // [0, 0]
    m2() // [0, 0]
    // x和y都有值的情况
    m1({
        x: 3, 
        y: 8
    }) // [3, 8]
    m2({
        x: 3, 
        y: 8
    }) // [3, 8]
    // x有值， y无值的情况
    m1({
        x: 3
    }) // [3, 0]
    m2({
        x: 3
    }) // [3, undefined]
    // x和y都无值的情况
    m1({}) // [0, 0]; 
    m2({}) // [undefined, undefined]

在使用默认值传参的时候如果要省略某个参数， 应该显示的传入undefined; 

    function f(x = 1, y) {
        return [x, y]; 
    }
    f() // [1, undefined]
    f(2) // [2, undefined])
    f(, 1) // 报错
    f(undefined, 1) // [1, 1]

此外， 函数的length属性， 不算计算指定了默认值的参数。 

    (function(a, b, c = 5) {}).length // 2

## rest参数

es6中引入了rest参数， 用于获取函数的多余参数， 来替代arguments, rest 参数搭配的变量是一个数组， 该变量将多余的参数放入数组中。 

    // arguments变量的写法
    function sortNumbers() {
        return Array.prototype.slice.call(arguments).sort(); 
    }
    const sortNumbers = (...numbers) => numbers.sort(); 

    function add(...values) {
        let sum = 0; 
        for (var val of values) {
            sum += val; 
        }
        return sum; 
    }
    //完成任意数量的参数求和
    add(2, 5, 3) // 10

rest是数组， 因此可以使用所有的数组方法。 

    function push(array, ...items) {
        items.forEach(function(item) {
            array.push(item); 
            console.log(item); //1, 2, 3
        }); 
    }
    var a = []; 
    push(a, 1, 2, 3); 

扩展运算符（spread）是三个点（...）。 它好比 rest 参数的逆运算， 将一个数组转为用逗号分隔的参数序列。 

    console.log(...[1, 2, 3])
    // 1 2 3
    console.log(1, ...[2, 3, 4], 5)
    // 1 2 3 4 5
    [...document.querySelectorAll('div')]
    // [<div>, <div>, <div>]

可以方便的把数组展开

    function f(v, w, x, y, z) {}
    var args = [0, 1]; 
    f(-1, ...args, 2, ...[3]); 

数组最大值求法： 

    // ES5的写法
    Math.max.apply(null, [14, 3, 77])
    // ES6的写法
    Math.max(...[14, 3, 77])

数组拼接： 

    // ES5的写法
    var arr1 = [0, 1, 2]; 
    var arr2 = [3, 4, 5]; 
    Array.prototype.push.apply(arr1, arr2); 
    // ES6的写法
    var arr1 = [0, 1, 2]; 
    var arr2 = [3, 4, 5]; 
    arr1.push(...arr2); 
    //es5
    [1, 2].concat(more)
    // ES6
    [1, 2, ...more]

JavaScript的函数只能返回一个值， 如果需要返回多个值， 只能返回数组或对象。 扩展运算符提供了解决这个问题的一种变通方法。 

    var dateFields = readDateFields(database); 
    var d = new Date(...dateFields); 

字符串转换成数组： 

    [...'hello']
    // [ "h", "e", "l", "l", "o" ]

任何Iterator接口的对象， 都可以用扩展运算符转为真正的数组。 像map, set之类

    let map = new Map([
        [1, 'one'], 
        [2, 'two'], 
        [3, 'three'], 
    ]); 
    let arr = [...map.keys()]; // [1, 2, 3]。 

