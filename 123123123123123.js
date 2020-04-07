const log = console.log.bind(console)
// var proxy = new Proxy(window, {
//     get(target, key) {
//         if (key === 'a') {
//             if (target['a']) {
//                 target['a']++;

//             } else {
//                 console.log(123)
//                 target['a'] = 1;
//             }
//             return target['a']
//         }
//     }
// })


// compose实现
// ---- 

// function toUpperCase(str) {
//     return str.toUpperCase();
// }

// function add(str) {
//     return str += '!'
// }
// var fn = compose(add, toUpperCase)
// console.log(fn('hello'));// HELLO WORLD!

// function compose(...args) {
//     return function (x) {
//         return args.reduceRight((a, b) => b(a), x)
//     }
// }

// ----

// var a = new Foo('1', '2')
// console.log(a)
// var s = a[Symbol.iterator]
// s.next()


// class Foo {
//     constructor(...args) {
//         this.args = args;
//         this.index = 0;
//     }
//     *[Symbol.iterator]() {
//         return this
//     }
//     next() {
//         if (this.index <= this.args.length) {
//             this.index++
//             return {
//                 value: this.args[this.index-1],
//                 done: true
//             }
//         } else {
//             return {
//                 value: undefined,
//                 done: flase
//             }
//         }
//     }
// }

// const a = new Foo(1, 2, 3)
// console.log(a.next())
// console.log(a.next())
// console.log(a.next())
// console.log(a.next())



// 订阅发布模式
// ----

// function observer(data) {
//     if (data instanceof Object) {
//         new Observe(data)
//     } else {
//         return;
//     }
// }

// class Observe {
//     constructor(data) {
//         this.handler(data)
//     }
//     handler(data) {
//         const arr = Object.keys(data)
//         for (let val of arr) {
//             defineReactive(data, val, data[val])
//         }
//     }
// }

// function defineReactive(data, key, val) {
//     const dep = new Dep()
//     Object.defineProperty(data, key, {
//         get() {
//             dep.addSub()
//             return val
//         },
//         set(newVal) {
//             val = newVal
//             dep.notify();
//         }
//     })

// }
// let target = null
// class Dep {
//     constructor() {
//         this.subs = []
//     }
//     addSub() {
//         if (target && !this.subs.includes(target)) {
//             this.subs.push(target)
//         }
//     }
//     notify() {
//         this.subs.forEach(({ fn }) => fn());
//     }
// }

// function pushTarget(watch) {
//     target = watch
// }

// class Watch {
//     constructor(exp, fn) {
//         this.exp = exp
//         this.fn = fn
//         pushTarget(this)
//         data[exp]
//     }
// }

// var data = {
//     a: 1,
//     b: 2,
//     sum: 3
// }
// observer(data)



// new Watch('a', () => {
//     data.sum = data.a + data.b
// })

// new Watch('b', () => {
//     data.sum = data.a + data.b
// })
// ----


// webpack hooks
// synchook
// class SyncHook {
//     constructor(agrs) {

//     }
// }

// let hook = new SyncHook();

// hook.tap('react',(name)=>{
//     console.log(`${name} learned react`)
// })

// hook.tap('node',(name)=>{
//     console.log(`${name} learned node`)
// hook.call('jw')

// // syncbailhook
// class SyncBailHook {
//     constructor(agrs) {

//     }
// }


const number = 180

function cal(num, i) {
    return num % i === 0;
}

// 求所有的质因子
function solve0(number) {
    const _arr = []
    for (let i = 2; i <= number; i++) {
        if (cal(number, i)) {
            let bool = true;
            for (let l = 2; l < i; l++) {
                if ((cal(i, l))) {
                    bool = false;
                    break;
                } else {
                    continue;
                }
            }
            if (bool) {
                _arr.push(i)
            }

        }
    }
    console.log(_arr)
}


function solve1(number) {
    const _arr = []
    function unname(number) {
        for (let i = 2; i <= number; i++) {
            if (number % i === 0) {
                _arr.push(i);
                unname(number / i)
                break;
            }
        }
    }
    unname(number)
    log(_arr)
}

let num = parseInt(5);

let chushu = 2;
let res = '';
for (let i = 2; i < Math.sqrt(num); i++) {
    while (num % i === 0) {
        res += i + ' ';
        num = num / i;
    }
}
if (num > 1) {
    res += num + ' ';
}
console.log(res);
solve0(64577)
solve1(180)

const twoSum = function(nums, target) {
    const comp = {};
    for(let i=0; i<nums.length; i++){
        console.log(i,comp[nums[i]])
        if(comp[nums[i] ]>=0){
            return [ comp[nums[i] ] , i]
        }
        comp[target-nums[i]] = i
    }
};
console.log(twoSum([3, 2, 4], 6))

// var twoSum = function (nums, target) {
//     let arr = []
//     for (let i = 0; i < nums.length; i++) {
//         console.log(i)
//         const _num = [...nums]
//         _num[i] = Infinity;
//         let index = [].indexOf.call(_num, (target - nums[i]))
//         if (index > -1) {
//             arr = [i, index]
//             break;
//         } else {
//             continue;
//         }
//     }
//     return arr
// };
