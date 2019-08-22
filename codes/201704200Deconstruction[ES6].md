# es6 解构赋值

本es6教程全都是根据阮老师的es6入门写的, 非常感谢阮老师的无私开源. 附上[链接](http://es6.ruanyifeng.com/#docs/)

``` js
let [a, b, c] = [1, 2, 3];
```

这就是结构赋值, 没了. 

...

开个玩笑, 其实就是一个萝卜(值)一个坑(变量). 

要是解构不成功呢? 

多的萝卜, 就带回去不种了, 多出来的坑呢? undefinde. 

``` js
let [x, , y] = [1, 2, 3];
x // 1
y // 3
let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []
```

另外, 萝卜是要选的, 得是个可以遍历的(Iterator), 像数组, 字符串, map, set. 数字, null, undefined啥的都是会报错的. 

结构赋值也可用于对象, 但是得有相同的属性名. 

``` js
let {
    bar,
    foo
} = {
    foo: "aaa",
    bar: "bbb"
};
foo // "aaa"
bar // "bbb"
let {
    baz
} = {
    foo: "aaa",
    bar: "bbb"
};
baz // undefined
```

解构也同样可以用在嵌套多层的对象上

``` js
let obj = {
    p: ['Hello', {
        y: 'World'
    }]
};
let {
    p: [x, {
        y
    }]
} = obj;
x // "Hello"
y // "World"
p // error: p is not defined
```

注意, 这时p是模式, 不是变量, 因此不会被赋值. 

对象的结构赋值可以很方便地把现有对象的方法赋值到某个变量上. 

``` js
let {
    log,
    sin,
    cos
} = Math;
```

函数的参数的解构赋值

``` js
function add([x = 0, y = 0]) {
    return x + y;
}
add([1, 2]) //3
add([]) //0
```

## 用途

### 交换变量的值

``` js
let x = 1;
let y = 2;
[x, y] = [y, x];
```

### 函数参数对应变量名称

``` js
// 参数是一组有次序的值
function f([x, y, z]) {
    ...
}
f([1, 2, 3]);
// 参数是一组无次序的值
function f({
    x,
    y,
    z
}) {
    ...
}
f({
    z: 3,
    y: 2,
    x: 1
});
```

### 提取json

``` js
let jsonData = {
    id: 42,
    status: "OK",
    data: [867, 5309]
};
let {
    id,
    status,
    data: number
} = jsonData;
console.log(id, status, number);
// 42, "OK", [867, 5309]
```

### 函数参数默认值

``` js
jQuery.ajax = function(url, {
    async = true,
    beforeSend = function() {},
    cache = true,
    complete = function() {},
    crossDomain = false,
    global = true,
    // ... more config
}) {
    // ... do stuff
};
```

### 遍历

任何部署了Iterator接口的对象, 都可以用for...of循环遍历. Map结构原生支持Iterator接口, 配合变量的解构赋值, 获取键名和键值就非常方便. 

``` js
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');
for (let [key, value] of map) {
    console.log(key + " is " + value);
}
// first is hello
// second is world
```

### 输入模块的指定方法

加载模块时, 往往需要指定输入哪些方法. 解构赋值使得输入语句非常清晰. 

``` js
const {
    SourceMapConsumer,
    SourceNode
} = require("source-map");
```

