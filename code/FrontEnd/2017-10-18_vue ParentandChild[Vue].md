# vue Event Bus and Componet Communication 

## Vue Event Bus 

Event Bus (事件总线) 是一个很常见的概念， 一般专门指处理事务顺序的模块。 

在Vue中父子组件通信有许多方式， 如 `props` , `$emit&$on` , 但是在处理兄弟组件的关系时， 就会显得很愚钝。 

在Vue中已经有了Vuex这种成熟的事件管理， 但是在某些时候， 只是需要一个兄弟操作， 而引入一个完整的Vuex模块， 就有些得不偿失。 

我们可以通过新建一个Vue实例， 来完成兄弟组件的通讯。 

例如有三个组件， `home.vue, foo.vue, boo.vue` ， 传递foo的信息到boo

 `foo.vue` 里绑定一个事件

    < div v - on: click = "clickHere($event)" > < /div>

然后我们需要新建一个eventBus, 新建一个Bus.js

    import Vue from 'vue'
    export default new Vue()

创建了一个实例， import到foo和boo中， 

在 `foo.vue` 中注册方法

    methods: {
        clickHere(event) {
            Bus.$emit('getHere', event.target)
        }
    }

再在 `boo.vue` 中用 `created()` 监听事件， 

    created() {
        Bus.$on('getHere', target => {
            console.log(target)
            // <div></div>
        })
    }

### 父子组件触发事件

## 父组件触发子组件事件

父组件： 

    < child ref = "childMethod" > < /child>

子组件： 

    methods: {
        sayHello() {
            console.log('hello')
        }
    }

父组件里使用 `this.$refs.childMethod.test()` 即可调用子组件 `sayHello` 

## 子组件触发父组件事件

1. 使用$emit 触发一个事件， 父组件监听这个事件， 然后调用方法。 

2. 用 `this.$parent.methodName()` 来调用。 
