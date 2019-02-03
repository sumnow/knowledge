# ECMAScript 2015

## let和const

let仅仅在声明的代码块内有效, 很适合在for循环中使用, 因为大多数情况下, 作为循环增量, 都在循环体结束后被舍弃了。 

这是一个很经典的因为变量引用的与预期相左的结果: 

    var a = []; 
    for (var i = 0; i < 10; i++) {
        a[i] = function() {
            console.log(i); 
        }; 
    }
    a[6](); // 10

解决方法, 可以使用自执行传i, 或者使用let声明i

 `let没有变量提升, 声明前不可以使用。 ` 变量提升只是一种尽量减少不必要的错误的修正手段本来就不应该被随意使用。 

ES6明确规定, 如果区块中存在let和const命令, 这个区块对这些命令声明的变量, 从一开始就形成了封闭作用域。 凡是在声明之前就使用这些变量, 就会报错。 

总之, 在代码块内, `使用let命令声明变量之前, 该变量都是不可用的。 ` 这在语法上, 称为"暂时性死区"(temporal dead zone, 简称 TDZ)。 

    if (true) {
        // TDZ开始
        tmp = 'abc'; // ReferenceError
        console.log(tmp); // ReferenceError
        let tmp; // TDZ结束
        console.log(tmp); // undefined
        tmp = 123; 
        console.log(tmp); // 123
    }

let不允许在相同作用域内, 重复声明同一个变量, 谁占了山头, 后来再来的就会报错了。 

let相当于给let添加了块级作用域。 

    function f1() {
        let n = 5; 
        if (true) {
            let n = 10; //一个外部都看不见的n
        }
        console.log(n); // 5, 这是看不见if这个块级作用域里的东西的。 
    }

避免在块级作用域内声明函数, 尽量使用表达式。 

const和static(java)类似, 声明后不可变, 且必须有初始值。 

const实际上保证的, 并不是变量的值不得改动, 而是变量指向的那个内存地址不得改动。 对于简单类型的数据(数值、 字符串、 布尔值), 值就保存在变量指向的那个内存地址, 因此等同于常量。 但对于复合类型的数据(主要是对象和数组), 变量指向的内存地址, 保存的只是一个指针, const只能保证这个指针是固定的, 至于它指向的数据结构是不是可变的, 就完全不能控制了。 

    const foo = {}; 
    // 为 foo 添加一个属性, 可以成功
    foo.prop = 123; 
    foo.prop // 123
    // 将 foo 指向另一个对象, 就会报错
    foo = {}; // TypeError: "foo" is read-only。 

使一个对象不可变, 应当使用Object.freeze()

    const foo = Object.freeze({}); 
    foo.name = 'mick'
    console.log(foo.name) //undefined

