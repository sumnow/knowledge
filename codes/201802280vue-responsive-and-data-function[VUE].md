# vue responsive theory and data funtion 

## vue data function 

vue 中data需要是一个函数, 返回一个对象

这是因为组件可能拥有多个实例, 如果是同一个对象就会共享数据, 使用函数就可以每次都返回一个独立的数据副本.

``` js
const vm = new Vue({
    el: '#app',
    data: {
        message: 'hello'
    },
    render(h) {
        return h('div', {}, [
            h('p', {}, this.message)
        ])
    }
})
setTimeout(() => {
    vm.messgae = 'girl'
}, 1000); < /script>
```

``` js

```

