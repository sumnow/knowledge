<!--
Created: Fri Apr 17 2020 15:00:25 GMT+0800 (China Standard Time)
Modified: Fri Apr 17 2020 16:39:28 GMT+0800 (China Standard Time)
-->

# vue和react的视图更新

## vue

``` JS
// JavaScript
Vue.component('heading', {
  render: function(createElement) {
    return createElement(
      'p', // 标签名称
      {},
      this.text + 'hello' // 子节点数组
    )
  },
  data: {
    text: '1'
  }
})
```

这时, 如果有方法

``` JS
// JavaScript
this.text = '2'
console.log(text) // 2
console.log(p.innetText) // 1 
```

说明此刻更新了数据, 但是没有更新视图

因此vue更新视图是一个异步操作, 数据在更新之后, 会推入一个更新函数 `renderWatcher` 到任务队列里, 这个任务队列会在下一个 `microtask` 里触发, 因此, 使用 `nextTick` 也是可以获取到节点改变后的数据, 

## react

例如

``` JS
// JavaScript
// count = 1
setState({
  this.state.count: count + 1
}, () => {
  console.log(this.state.count) // 2
})
console.log(this.state.count) // 1


// val :0
componentDidMount() {
  this.setState({val: this.state.val + 1});
  console.log(this.state.val);    // 0

  this.setState({val: this.state.val + 1});
  console.log(this.state.val);    // 0

  setTimeout(() => {
    this.setState({val: this.state.val + 1});
    console.log(this.state.val);  // 2

    this.setState({val: this.state.val + 1});
    console.log(this.state.val);  // 3
  }, 0);
}
```

但如果使用了原生的绑定事件的方法, 而非React的合成事件, 或者使用定时器, 都可以立刻得到新的值.因为React是在更新数据的时候一起更新视图.


## 参考

1. https://github.com/Cyrilszq/Cyril-Blog/issues/8
2. https://surmon.me/article/116
3. https://juejin.im/post/5e722706f265da576e64bcf1
4. https://zhuanlan.zhihu.com/p/61847529