<!--
Created: Sun Apr 15 2018 16:14:12 GMT+0800 (China Standard Time)
Modified: Sun Apr 19 2020 14:02:51 GMT+0800 (China Standard Time)
-->

# Vue对数组的处理

大家都知道, vue无法使用 `defineProperty` 对数组做监视, 实际上

``` JS
// JavaScript
function defineReactive(data, key, value) {
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function defineGet() {
      console.log( `get key: ${key} value: ${value}` )
      return value
    },
    set: function defineSet(newVal) {
      console.log( `set key: ${key} value: ${newVal}` )
      value = newVal
    }
  })
}

function observe(data) {
  Object.keys(data).forEach(function(key) {
    defineReactive(data, key, data[key])
  })
}
let arr = [1, 2, 3]
observe(arr)

arr[1] = 2
// set key: 1 value: 2
```

事实上是可以触发set的, 但对于 `length` 确实无能为力, 

``` JS
// JavaScript
Object.defineProperty(data, 'length', {})
// Uncaught TypeError: Cannot redefine property: length
```

同时, 像对象上新增属性一样, 数组里新增的对象也是无法监听的.

## vue hack数组方法

``` JS
// JavaScript
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

methodsToPatch.forEach(function(method) {
  // cache original method
  // 缓存原生数组方法
  const original = arrayProto[method]
  // 在变异数组中定义功能拓展方法
  def(arrayMethods, method, function mutator(...args) {
    // 执行并缓存原生数组方法的执行结果
    const result = original.apply(this, args)
    // 响应式处理
    const ob = this.__ob__
    let inserted
    switch (method) {
      // 新增方法
      case 'push':
      case 'unshift':
        inserted = args
        break
        // splice是替换,相当于删减后新增
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted)
    // notify change
    ob.dep.notify()
    // 返回原生数组方法的执行结果
    return result
  })
})
```

