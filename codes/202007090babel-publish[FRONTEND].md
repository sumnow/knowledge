<!--
Created: Thu Aug 06 2020 17:44:55 GMT+0800 (China Standard Time)
Modified: Sat Aug 22 2020 18:22:49 GMT+0800 (China Standard Time)
-->

# 需要转义的npm包

## 依赖babel的包

如果直接使用了ES6语法的包, 被安装以后, 是无法使用的, 会报 `core-js` 的错误.

因此, 需要使用 `babel`

``` BASH
# BASH
npm install --save-dev babel-cli@6 babel-preset-es2015@6  
```

在 `package.json` 中添加

``` JS
// JavaScript
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build": "babel index.js --presets babel-preset-es2015 --out-dir .",
  "prepublish": "npm run build
}
```

## TS包

安装ts

``` BASH
# BASH
npm i typescript -D
```

文件tsconfig.json

``` JS
// JavaScript
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./dist",
    "strict": true
  }
}
```
