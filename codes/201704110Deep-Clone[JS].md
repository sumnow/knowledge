<!--
Created: Mon Aug 26 2019 15:15:20 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:15:20 GMT+0800 (China Standard Time)
-->
# 深拷贝

### 第一种: 

利用JSON序列化解决

``` js
function deepClone(initalObj) {
    var obj = {};
    try {
        obj = JSON.parse(JSON.stringify(initalObj));
    }
    return obj;
}
```

### 第二种: 

``` js
function deepClone(initalObj, finalObj) {
    var obj = finalObj || {};
    for (var i in initalObj) {
        if (typeof initalObj[i] === 'object') {
            obj[i] = (initalObj[i].constructor === Array) ? [] : {};
            arguments.callee(initalObj[i], obj[i]);
        } else {
            obj[i] = initalObj[i];
        }
    }
    return obj;
}
```

一旦出现对象相互引用, 会出现死循环, 下面这样就好

``` js
function deepClone(initalObj, finalObj) {
    var obj = finalObj || {};
    for (var i in initalObj) {
        var prop = initalObj[i];

        // 避免相互引用对象导致死循环, 如initalObj.a = initalObj的情况
        if (prop === obj) {
            continue;
        }
        if (typeof prop === 'object') {
            obj[i] = (prop.constructor === Array) ? [] : {};
            arguments.callee(prop, obj[i]);
        } else {
            obj[i] = prop;
        }
    }
    return obj;
}
```

### 第三种: 

``` js
function deepClone(initalObj, finalObj) {
    var obj = finalObj || {};
    for (var i in initalObj) {
        var prop = initalObj[i];
        // 避免相互引用对象导致死循环, 如initalObj.a = initalObj的情况
        if (prop === obj) {
            continue;
        }
        if (typeof prop === 'object') {
            obj[i] = (prop.constructor === Array) ? [] : Object.create(prop);
        } else {
            obj[i] = prop;
        }
    }
    return obj;
}
```

``` js
var cloneObj = function(obj) {
    var str, newobj = obj.constructor === Array ? [] : {};
    if (typeof obj !== 'object') {
        return;
    } else if (window.JSON) {
        str = JSON.stringify(obj), //系列化对象
            newobj = JSON.parse(str); //还原
    } else {
        for (var i in obj) {
            newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
        }
    }
    return newobj;
};
```

