# import and export

`import` 和 `export`是javascript用于模块导入的，在远古的时候使用的方法是用一个对象作为命名空间来。

## export

    // foo.js
    export const a = 1
    export function b () {}
    export class c extend prop{}
    // b.js
    import {a,b,c} from 'foo'

>export需要在顶级作用域，不可以在块级作用域内，如函数内部或者`let`、`const`内部

`export default`是使用默认变量名导出，`import`可以使用任意变量名赋值

    // export a array
    export default [1,2,3]
    import arr from 'foo.js'

    export default c = 1

## import

`import` 可以使用as关键字转换到处的方法或类或变量的名字

    import {a as apple} from 'a'

`import *`导出所有关键字

    // a.js
    export function p() {}
    export c = 1
    // 导出所有
    import * as apple from 'a'
    apple.c  // 1
    apple.p // p(){}

`import`是静态执行的,所以无法使用表达式或者变量
    
    // 报错
    if (x === 1) {
        import { foo } from 'module1';
    } else {
        import { foo } from 'module2';
    }


    import 'foo'

这样就只导入了模块，执行了foo.js，但不导入任何值

    import apple from 'foo'

以上，会查找当前路径下的`foo.js||foo`模块，没有就查找foo这个具有配置(`node_modules`)的工具模块

