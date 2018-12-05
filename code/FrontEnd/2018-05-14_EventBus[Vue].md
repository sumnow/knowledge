# EventBus 

EventBus 本身就是一个订阅发布模式的典型实现。 

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

    

    emitter.addEventListener('asd', man => console.log( `asd${man}` ))
    emitter.emit('asd', '123')

