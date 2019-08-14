# vue 打包

vue-cli脚手架的配置, build后生成的map是为了调试使用. 

config/index.js

不生成js的map

``` js
build.productionSourceMap: true
// build.productionSourceMap: true
```

不生成css的map

``` js
base.devtool = 'source-map'
// base.devtool = false
```

关于解析出的静态文件地址, 默认为 `dist/static/` 

``` js
// Paths
assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
```

