# vue problem

### vfor 的 key重复

vue 中的 `v-for` 循环, 依赖 `key` 的值, 进行vdom的diff算法的替换, 用以提高diff的效率, 但是如果key不是每条数据特有的信息, 就会导致, 明明数据变化了, 但是并不会更新view

### vue 里的异步更新

可能你还没有注意到, Vue 在更新 DOM 时是异步执行的. 只要侦听到数据变化, Vue 将开启一个队列, 并缓冲在同一事件循环中发生的所有数据变更. 如果同一个 watcher 被多次触发, 只会被推入到队列中一次. 这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的. 然后, 在下一个的事件循环"tick"中, Vue 刷新队列并执行实际 (已去重的) 工作. Vue 在内部对异步队列尝试使用原生的 Promise.then、 MutationObserver 和 setImmediate, 如果执行环境不支持, 则会采用 setTimeout(fn, 0) 代替. 

例如, 当你设置 vm.someData = 'new value', 该组件不会立即重新渲染. 当刷新队列时, 组件会在下一个事件循环"tick"中更新. 多数情况我们不需要关心这个过程, 但是如果你想基于更新后的 DOM 状态来做点什么, 这就可能会有些棘手. 虽然 Vue.js 通常鼓励开发人员使用"数据驱动"的方式思考, 避免直接接触 DOM, 但是有时我们必须要这么做. 为了在数据变化之后等待 Vue 完成更新 DOM, 可以在数据变化之后立即使用 Vue.nextTick(callback). 这样回调函数将在 DOM 更新完成后被调用.

可以使用在组件内使用 vm.$nextTick() 实例方法特别方便, 因为它不需要全局 Vue, 并且回调函数中的 this 将自动绑定到当前的 Vue 实例上.

因为 $nextTick() 返回一个 Promise 对象, 所以你可以使用新的 ES2016 async/await 语法完成相同的事情: 

```js
methods: {
    updateMessage: async function() {
        this.message = '已更新'
        console.log(this.$el.textContent) // => '未更新'
        await this.$nextTick()
        console.log(this.$el.textContent) // => '已更新'
    }
}
```

