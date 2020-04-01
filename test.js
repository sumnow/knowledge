// let a = 'Banana'
// this.onmessage = function (ev) {
//     this.console.log(ev)
//     this.console.log(this)
//     a = ev.data
// };
// this.postMessage(a)


// var b = {
//     a: {
//         b: {
//             c: 1
//         }
//     },
//     d: 1,
//     e: {
//         f: 2
//     }
// }
// var e = {
//     'a.b.c': 1,
//     d: 1,
//     'e.f': 2
// }
// const changeObject = (param, str = '', obj = {}) =>
//     Object.entries(param).reduce((_param, [key, val]) => {
//         if (val instanceof Object) {
//             changeObject(val, `${str}${key}.`, _param)
//         } else {
//             obj[`${str}${key}`] = val
//         }
//         return _param
//     }, obj)


// function trans(obj) {
//     var _arr = [...JSON.stringify(b)].filter(x =>
//         !/\"|\{|\}/.test(x)
//     ).join('').replace(/\:/g, ".").split(',')
//     return Object.fromEntries(_arr.map(e => [e.slice(0, e.lastIndexOf(".")), e.slice(e.lastIndexOf(".") + 1)]))
// }

// console.log(trans(b))


// 写bind

// var obj = {
//     name: 1,

// }
// Function.prototype.mbd = function (self) {
//     const ar = this;
//     return function (...args) {
//         ar.apply(self,...args)
//     }

// }

// var name = 3

// function sayname() {
//     console.log(this.name)
//     return this.name
// }

// var say = sayname.mbd(obj)

// // console.log(sayname.apply(obj))
// say()


// // 写promise
// function myPromise(fn) {
//     var state = 'pending',
//         value = null,
//         callbacks = [];

//     this.then = function (onFulfilled) {

//     }

//     function handler() {
//         if (state === 'pending') {
//             callbacks.push(onFulfilled)
//             return this
//         }
//         onFulfilled(value)
//         return this
//     }

//     function resolve(val) {
//         value = val
//         state = 'fulfilled'
//         setTimeout(() => {
//             callbacks.forEach(function (callback) {
//                 callback(value);
//             });
//         }, 0);
//     }

//     fn(resolve)
//     // this.then = function (onFulfilled) {
//     //     if (state === 'pending') {
//     //         callbacks.push(onFulfilled);
//     //         return this;
//     //     }
//     //     onFulfilled(value);
//     //     return this;
//     // };

//     // function resolve(newValue) {
//     //     value = newValue;
//     //     state = 'fulfilled';
//     //     setTimeout(function () {
//     //         callbacks.forEach(function (callback) {
//     //             callback(value);
//     //         });
//     //     }, 0);
//     // }

//     // fn(resolve);
// }
// const test1 = new myPromise((resolve) => {
//     setTimeout(() => {
//         resolve('2s后输出了我');
//     }, 2000)
// });
// // const test2 = new myPromise((resolve, reject) => {
// //     setTimeout(() => {
// //         reject('我出错啦! ')
// //     }, 2000)
// // })
// test1.then(data => {
//     console.log(data)
//     return new myPromise(res => {
//         res(1000)
//     })
// }).then(data => {
//     console.log(data + 'hello')
// })
// // test1.then(data => console.log(data + '1')).then(data => {
// //     console.log(data + '2')
// // })
// console.log("我是最早的");


// 写call
// Function.prototype.apply = function (context, arr) {
//     var context = Object(context) || window;
//     context.fn = this;

//     var result;
//     if (!arr) {
//         result = context.fn();
//     }
//     else {
//         var args = [];
//         for (var i = 0, len = arr.length; i < len; i++) {
//             args.push('arr[' + i + ']');
//         }
//         result = eval('context.fn(' + args + ')')
//     }

//     delete context.fn
//     return result;
// }


// // 写 new

// function objectFactory() {

//     var obj = new Object(),//从Object.prototype上克隆一个对象

//     Constructor = [].shift.call(arguments);//取得外部传入的构造器

//     var F=function(){};
//     F.prototype= Constructor.prototype;
//     obj=new F();//指向正确的原型

//     var ret = Constructor.apply(obj, arguments);//借用外部传入的构造器给obj设置属性

//     return typeof ret === 'object' ? ret : obj;//确保构造器总是返回一个对象

// };

// curry
// 实现
// function sub_curry(fn) {
//     var args = [].slice.call(arguments, 1);
//     return function () {
//         return fn.apply(this, args.concat([].slice.call(arguments)));
//     };
// }

// function curry(fn, length) {

//     length = length || fn.length;

//     var slice = Array.prototype.slice;

//     return function () {
//         console.log([...arguments])
//         if (arguments.length < length) {
//             var combined = [fn].concat(slice.call(arguments));
//             console.log(combined.toString())
//             return curry(sub_curry.apply(this, combined), length - arguments.length);
//         } else {
//             console.log(fn, arguments)
//             return fn.apply(this, arguments);
//         }
//     };
// }


// var curry = (fn, ...args) =>
//     fn.length <= args.length ?
//     fn(...args) :
//     curry.bind(null, fn, ...args)


function curry(fn, argsArr) {
    var length = fn.length
    argsArr = argsArr || []
    return function (...args) {
        if (argsArr.length < length) {
            argsArr = argsArr.concat(args)
            return curry(fn,argsArr)
        } else {
            return fn.apply(this, argsArr)
        }
    }
}
var fn = curry(function (a, b, c) {
    console.log(a, b, c)
    return [a, b, c];
});


// fn("a", "b", "c") // ["a", "b", "c"]
// fn("a", "b")("c") // ["a", "b", "c"]
fn("a")("b")("c") // ["a", "b", "c"]
// fn("a")("b", "c") // ["a", "b", "c"]