<!--
Created: Mon Aug 26 2019 15:19:16 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:19:16 GMT+0800 (China Standard Time)
-->
# npm publish

发布一个npm 

首先要在[npm.org](http://npmjs.com)注册一个账号. 记住账号与密码. 

本地执行

``` bash
    npm login
```

依次输入

``` bash
    Username
    Password
    Email(this IS public)
```

然后建立项目文件夹

``` bash
    mkdir testpublishpackage
    
    npm init
```

init 后会生成一个 `package.json` 以一个注明的项目为例子. 

``` js
{
    "name": "vue",
    "version": "2.5.16",
    "description": "Reactive, component-oriented view layer for modern web interfaces.",
    "main": "dist/vue.runtime.common.js",
    "module": "dist/vue.runtime.esm.js",
    "unpkg": "dist/vue.js",
    "jsdelivr": "dist/vue.js",
    "typings": "types/index.d.ts",
    "files": [
        "src",
        "dist/*.js",
        "types/*.d.ts"
    ],
    "scripts": {
        "dev": "rollup -w -c scripts/config.js --environment TARGET:web-full-dev",
        "commit": "git-cz"
    },
    "gitHooks": {
        "pre-commit": "lint-staged",
    },
    "lint-staged": {
        "*.js": [
            "eslint --fix",
            "git add"
        ]
    },
    "repository": {
        "type": "git",
        "url": "git+https://github.com/vuejs/vue.git"
    },
    "keywords": [
        "vue"
    ],
    "author": "Evan You",
    "license": "MIT",
    "bugs": {
        "url": "https://github.com/vuejs/vue/issues"
    },
    "homepage": "https://github.com/vuejs/vue#readme",
    "devDependencies": {
        "@types/node": "^8.0.33",
        "yorkie": "^1.0.1"
    },
    "config": {
        "commitizen": {
            "path": "./node_modules/cz-conventional-changelog"
        }
    }
}

npm publish testpublishpackage
```

``` js
// 24小时内可以删除
npm - f unpublish testpublishpackage
```

