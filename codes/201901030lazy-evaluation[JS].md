# lazy evaluation

惰性求值

js 本身是没有惰性求值的, 这个会导致一些问题, 例如一些特别复杂的函数, 即使入参相同, 也会执行一遍相同操作.

``` js
function getTime() {
    return new Date()
}
```

多次执行会得到不一样的结果.

那么我们写一个惰性求值的函数

``` js
function getTime() {
    var date = new Date()
    getTime = function() {
        return date
    }
    return getTime()
}
```

更好的做法应该对入参进行判断.
