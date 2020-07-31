<!--
Created: Mon Aug 26 2019 15:17:47 GMT+0800 (China Standard Time)
Modified: Fri Jul 31 2020 15:20:13 GMT+0800 (China Standard Time)
-->

# import and export

`import` 和 `export` 是javascript用于模块导入的, 在远古的时候使用的方法是用一个对象作为命名空间来.

## export

``` js
// foo.js
export const a = 1
export function b() {}
export class c extend prop {}
// b.js
import {
  a,
  b,
  c
} from 'foo'
```

> export需要在顶级作用域, 不可以在块级作用域内, 如函数内部或者 `let` 、 `const` 内部

### export default

`export default` 是使用默认变量名导出, `import` 可以使用任意变量名赋值

``` js
// export a array
export default [1, 2, 3]
import arr from 'foo.js'
```

``` js
export default c = 1
```

但是在 `import` 的时候无法使用解构, 

``` JS
// JavaScript
// static.js
let foo = "foo"
let bar = "bar"
let obj = {
  foo,
  bar
}
export default obj
```

``` JS
// JavaScript
// main.js
import {
  foo,
  bar
} from "./static"
console.log(foo) // undefined
console.log(bar) // undefined

import obj from "./static"
console.log(obj.foo) // foo
console.log(obj.bar) // bar
```

原因是 `export default` 语法在bebel转义后会丢失作用域, 代码如下

``` JS
// JavaScript
export default {
  host: 'localhost',
  port: 80
}
```

babel转义之后

``` JS
// JavaScript
module.exports.default = {
  host: 'localhost',
  port: 80
}
```

去掉 `default` 就可以正确获得值了

``` JS
// JavaScript
// static.js
let foo = "foo"
let bar = "bar"
export {
  foo,
  bar
}

// main.js
import {
  foo,
  bar
} from "./static"
```

## import

`import` 可以使用as关键字转换到处的方法或类或变量的名字

``` js
import {
  a as apple
} from 'a'
```

使用 `import *` 导出所有关键字

``` js
// a.js
export function p() {}
export c = 1
// 导出所有
import * as apple from 'a'
apple.c // 1
apple.p // p(){}
```

注意 `import` 是静态执行的, 所以无法使用表达式或者变量

``` js
// 报错
if (x === 1) {
  import {
    foo
  } from 'module1';
} else {
  import {
    foo
  } from 'module2';
}
```

``` js
import 'foo'
```

这样就只导入了模块, 执行了foo.js, 但不导入任何值

``` js
import apple from 'foo'
```

以上, 会查找当前路径下的 `foo.js||foo` 模块, 没有就查找foo这个具有配置( `node_modules` )的工具模块

## ES6 模块与 CommonJS 模块的差异

* CommonJS 模块输出的是一个值的拷贝, ES6 模块输出的是值的引用.
* CommonJS 模块是运行时加载, ES6 模块是编译时输出接口.

第二个差异是因为 CommonJS 加载的是一个对象(即module.exports属性), 该对象只有在脚本运行完才会生成. 而 ES6 模块不是对象, 它的对外接口只是一种静态定义, 在代码静态解析阶段就会生成.

下面重点解释第一个差异.

CommonJS 模块输出的是值的拷贝, 也就是说, 一旦输出一个值, 模块内部的变化就影响不到这个值. 请看下面这个模块文件lib.js的例子.

``` js
// lib.js
var counter = 3;

function incCounter() {
  counter++;
}
module.exports = {
  counter: counter,
  incCounter: incCounter,
};
```

上面代码输出内部变量counter和改写这个变量的内部方法incCounter. 然后, 在main.js里面加载这个模块.

``` js
// main.js
var mod = require('./lib');

console.log(mod.counter); // 3
mod.incCounter();
console.log(mod.counter); // 3
```

上面代码说明, lib.js模块加载以后, 它的内部变化就影响不到输出的mod.counter了. 这是因为mod.counter是一个原始类型的值, 会被缓存. 除非写成一个函数, 才能得到内部变动后的值.

``` js
// lib.js
var counter = 3;

function incCounter() {
  counter++;
}
module.exports = {
  get counter() {
    return counter
  },
  incCounter: incCounter,
};
```

上面代码中, 输出的counter属性实际上是一个取值器函数. 现在再执行main.js, 就可以正确读取内部变量counter的变动了.

``` bash
$ node main.js
3
4
```

ES6 模块的运行机制与 CommonJS 不一样. JS 引擎对脚本静态分析的时候, 遇到模块加载命令import, 就会生成一个只读引用. 等到脚本真正执行时, 再根据这个只读引用, 到被加载的那个模块里面去取值. 换句话说, ES6 的import有点像 Unix 系统的"符号连接", 原始值变了, import加载的值也会跟着变. 因此, ES6 模块是动态引用, 并且不会缓存值, 模块里面的变量绑定其所在的模块.

还是举上面的例子.

``` js
// lib.js
export let counter = 3;
export function incCounter() {
  counter++;
}
```

``` js
// main.js
import {
  counter,
  incCounter
} from './lib';
console.log(counter); // 3
incCounter();
console.log(counter); // 4
```

上面代码说明, ES6 模块输入的变量counter是活的, 完全反应其所在模块lib.js内部的变化.
