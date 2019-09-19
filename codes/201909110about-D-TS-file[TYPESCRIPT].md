<!--
Created: Wed Sep 18 2019 19:48:52 GMT+0800 (China Standard Time)
Modified: Wed Sep 18 2019 19:55:43 GMT+0800 (China Standard Time)
-->
# d.ts

在ts项目中, 常常会见到d.ts结尾的文件, 它代表着 `declare` , 即声明文件, 以常见的 `lib.d.ts` 为例子

* 它自动包含在 TypeScript 项目的编译上下文中; 
* 它能让你快速开始书写经过类型检查的 JavaScript 代码.

你可以通过指定 --noLib 的编译器命令行标志(或者在 tsconfig.json 中指定选项 noLib: true)从上下文中排除此文件.

``` js
// javascript
const foo = 123;
const bar = foo.toString();
```

例如你写了这么一段代码, 它之所以可以通过编译, 正是因为在lib.d.ts中声明了 `Number` 拥有 `toString` 方法, 再例如Object对象上的 `key` 方法, 实际上也有声明

``` js
// javascript
/**
 * Returns the names of the enumerable properties and methods of an object.
 * @param o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
 */
keys(o: any): string[];
```

