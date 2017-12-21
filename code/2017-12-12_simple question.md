# 一道很简单的题目

源自于网易马超的一篇文章内的题目，

>编写一个function fn, 参数为n（数字型），返回一个数组，该数组内是n个随机且不重复的整数，且整数取值范围为[2,32]。

这是一个考验综合代码能力的问题。

    function fn(n) {
        return []
    }

为了一定的输入宽容性，我们应当控制输入

对n 进行parseInt处理，

这是一个强制转换

parseInt转换任何非数字字符的结果，都会NaN，例如

    parseInt('abc') // NaN
    parseInt({a:1}) // NaN

除了 

    parseInt('3') // 3
    parseInt([100,200,300]) //100

而且即使是数组，因为不重复原则，在[2,32] 之中最多只有31个整数，所以n应该小于32

    function fn(n){
        n = parseInt(n)
        if( n > 0 && n < 32 ) {

        } else {
            throw new Error('invalid paramter !')
        }
    }

接下来是生成随机数，传统思路是，每次取出一个，判断在不在数组中，不在就置入，在就重新随机。

这里提供下我的思路

    function fn(n){
        n = parseInt(n)
        let arr = Array.from({length:31}, (e, i)=> i+2 )
        if( n > 0 && n < 32 ) {
            arr = arr.sort((a,b)=>{return Math.random()>.5?-1:1})
            arr = arr.slice(0,n)
        } else {
            throw new Error('invalid paramter !')
        }
        return arr
    }
