#  parseInt

    ['1', '2', '3'].map(parseInt)
    //[1, NaN, NaN]

这个结果意外么？

意外就往下看

parseInt(string, radix)

    parseInt(17,8) // 8+7 = 15

“破案了。”

.map(callback[, thisObj])

map的实现大概是这样的

    function mymap(fn) {
        for(let i = 0; i < this.length; i ++) {
            fn(this[i],i,this)
        }
    }

    Array.prototype.mymap = mymap

map的第二个参数是用来指定 `callback` 的 `this` 环境

    var obj = {
        divisor: 10,
        remainder: function (value) {
            return value % this.divisor;
        }
    }

    var numbers = [6, 12, 25, 30];

    var result = numbers.map(obj.remainder);
