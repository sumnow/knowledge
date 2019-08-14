# EventBus 

## EventBus的基本实现

EventBus 本身就是一个订阅发布模式的典型实现. 

``` js
class EventEmeitter {
    constructor() {
        this._events = this._events || new Map();
        this.maxListeners = this.maxListeners || 10;
    }
}
// 添加触发事件
EventEmeitter.prototype.emit = function(type, ...args) {
    let handler;
    console.log(this._events)
    handler = this._events.get(type);
    handler.apply(this, args);
}
// 添加监听事件
EventEmeitter.prototype.addEventListener = function(type, fn) {
    console.log(this)
    if (!this._events.get(type)) {
        this._events.set(type, fn);
    }
}
const emitter = new EventEmeitter();
```

``` js
emitter.addEventListener('asd', man => console.log( `asd${man}` ))
emitter.emit('asd', '123')
```

## EventBus 和 Vuex

eventBus也可以做到组件间的相互通信, 与vue里父子组件通信的props和$emit很相似.

而在vue的大规模项目中, 会选择用Vuex来实现组件通信.

vuex中, 修改数据是使用 `mutation` 方法来触发的, 这要比直接使用$emit来得好多了, 举个例子.

假设有一个场景, 根组件root上有一个变量num, 组件A展示num并且有一个可以加减的操作, 组件B展示num并且又一个可以reset为0的操作. 那么如果B此时进行了reset操作, 并且$emit出去, 改变了num的值, 此时, 如果在组件A里没有一个相应的$on事件, A就不会更新num的值, 导致组件间数据不一致. 假设组件数量十分多的时候, 每一个组件的数据更改都需要在其他组件里绑定相应的事件, 是十分愚蠢的.

那么如果用Vuex呢? 它将数据放在store里, 它监测store里的数据改动, 当触发了 `mutation` 产生数据变化了, 它会给所有订阅了这个数据的组件发出一条指令, 来改变, 从而达到数据的统一管理. 代价就是在较大的范围里, 维护了一个被监测的"数据库".
