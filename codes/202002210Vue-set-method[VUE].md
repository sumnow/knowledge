<!--
Created: Mon Feb 10 2020 11:27:54 GMT+0800 (China Standard Time)
Modified: Tue Mar 03 2020 16:10:16 GMT+0800 (China Standard Time)
-->

# Vue set 方法

分析下 `Vue.set` 和 `this.$set` 

受 ES5 的限制, Vue.js 不能检测到对象属性的添加或删除. 因为 Vue.js 在初始化实例时将属性转为 getter/setter, 所以属性必须在 data 对象上才能让 Vue.js 转换它, 才能让它是响应的.

这么写就可以了 `this.$set(this.data, "key", value')` , 如果使用Vue.set就要这么写了

``` JS
// JavaScript

var vm = new Vue({
    el: '#test',
    data: {
        //data中已经存在info根属性
        info: {
            name: '小明';
        }
    }
});
//给info添加一个性别属性
Vue.set(vm.info, 'sex', '男');
```

## 原码

两者使用的是同一个函数.

``` JS
// JavaScript

function set(target: Array < any > | Object, key: any, val: any): any {
    if (process.env.NODE_ENV !== 'production' &&
        (isUndef(target) || isPrimitive(target))
    ) {
        warn( `Cannot set reactive property on undefined, null, or primitive value: ${(target: any)}` )
    }
    if (Array.isArray(target) && isValidArrayIndex(key)) {
        // 如果target是数组,且key是有效数组索引
        // 就把target的那一项换成val并返回
        target.length = Math.max(target.length, key)
        target.splice(key, 1, val)
        return val
    }
    if (key in target && !(key in Object.prototype)) {
        target[key] = val
        return val
    }
    const ob = (target: any).__ob__
    // 这里是判断target是Vue且是根节点时报错
    if (target._isVue || (ob && ob.vmCount)) {
        process.env.NODE_ENV !== 'production' && warn(
            'Avoid adding reactive properties to a Vue instance or its root $data ' +
            'at runtime - declare it upfront in the data option.'
        )
        return val
    }
    if (!ob) {
        target[key] = val
        return val
    }
    // 否则添加响应式监听
    defineReactive(ob.value, key, val)
    ob.dep.notify()
    return val
}
```

