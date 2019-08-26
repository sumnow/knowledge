<!--
Created: Mon Aug 26 2019 15:22:34 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:22:34 GMT+0800 (China Standard Time)
-->
# node command

`package.json` 中的 `scripts` 脚本可以用来快速执行命令, 例如

``` js
"scripts": {
    "build": "node tools/build.js"
}
```

如果需要传递参数可以这么写:

``` js
"scripts": {
    "build": "node tools/build.js $*"
}
```

这样在 `build.js` 中

``` js
console.log(process.argv)
```

再执行

``` bash
npm run build hello
```

输出:

``` js
['node', 'tool/build.js', 'hello']
```

可以这样来进行调用

--- 

[参考](https://cloud.tencent.com/developer/ask/50047)
[process.argv与命令行工具](https://juejin.im/post/5a976e87f265da4e8c453eec)

