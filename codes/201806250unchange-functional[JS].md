# 函数式编程不可变变量

函数式编程在于无副作用(Side Effect)函数, 即纯函数. 

> "可变与共享是万恶之源. "

### 函数式对象引用解决方案

而在js中, 对原对象的修改会影响所有指向该对象内存地址的对象. 

``` js
const person = {
    name: 'jack',
    age: 13
}
const iamtom = p => {
    p.name = 'tom'
    return p
}
const person1 = iamtom(person)
console.log(person, person1)
```

对person1执行的 `iamtom` 也影响到了person, 解决这个问题, 需要每次执行方法, 返回独立的对象. 

``` js
const person = {
    name: 'jack',
    age: 13
}
const iamtom = p => ({
    ...p,
    name: 'tom'
})
const person1 = iamtom(person)
console.log(person, person1)
```

还可以使用 `Object.assign` 方法来实现. 

``` js
const person = {
    name: 'jack',
    age: 13
}
const iamtom = p => ({
    ...p,
    name: 'tom'
})
const iamjerry = p => Object.assign({}, p, {
    name: 'jerry'
})
const person1 = iamtom(person)
const person2 = iamjerry(person)
console.log(person, person1, person2)
```

但 `assign` 并没有实现 `deep clone` , 也就是说当一个属性为对象时, 会出现影响. 

此外, 还可以使用JSON的方法来实现. 

### 函数式数组解决方案

``` js
const arr = [1, 2, 3, 4]
const arrCopy = arr.slice(0)
```

### 已存在的函数式的方法

例如 `immutable.js` 就是一个成熟的解决方案. 

js本身也有很多函数式的方法, 例如 `map()`  `reduce()`  `filter()` 等等

> `reduce` 是对递归的抽象, 遍历都是通过递归实现的, 因此 `map`  `filter` 都是 `reduce` 的变种

以 `reduce` 为例子, 

``` js
// two arguments: callbackFunction and initialValue
Array.prototype.myReduce = function(fn, initialValue) {
    if (this.length === 0) {
        if (initialValue === undefined) {
            console.error("reduce of empty array with no initialValue")
        } else {
            return initialValue
        }
    } else {
        var prev = initialValue !== undefined ? initialValue : this[0]
        var startIndex = initialValue !== undefined ? 0 : 1
        for (var i = startIndex; i < this.length; i++) {
            prev = fn(prev, this[i])
        }
        return prev
    }
}
```

然后是 `map` , 

``` js
// two arguments: callbackFunction and context(this pointer)
Array.prototype.myMap = function fakeMap(fn, context) {
    if (typeof fn !== "function") {
        throw new TypeError("arguments[0] is not a function");
    }
    let arr = this;
    let temp = [];
    for (let i = 0; i < arr.length; i++) {
        // 迭代执行
        let result = fn.call(context, arr[i], i, arr);
        temp.push(result);
    }
    return temp;
};
```

然后是 `filter` , 

``` js
// two arguments: callbackFunction and context(this pointer)
Array.prototype.myFilter = function fakeFilter(fn, context) {
    if (typeof fn !== "function") {
        throw new TypeError("arguments[0] is not a function");
    }
    let arr = this;
    let temp = [];
    for (let i = 0; i < arr.length; i++) {
        let result = fn.call(context, arr[i], i, arr);
        if (result) temp.push(arr[i]);
    }
    return temp;
};
```

