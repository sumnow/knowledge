<!--
Created: Mon Aug 26 2019 15:20:08 GMT+0800 (China Standard Time)
Modified: Thu Apr 16 2020 18:17:38 GMT+0800 (China Standard Time)
-->

# 从头写个Promise

思路, 首先看一个例子

``` JS
// JavaScript
new Promise((res) => {
  res('hello')
}).then(e => {
  console.log(e + ' world') // hello world
}).then(e => {
  console.log(e + '!') // undefined!
})
```

## 写个形式

照着样子写一个

``` JS
// JavaScript

function mypromise(fn) {
  this.value = '';
  const self = this;
  // 方法不要像我这样写,应该挂到property下
  this.then = function(fnl) {
    fnl(self.value)
    return this
  }
  // 保存值用来传递给then
  this.resolve = function(e) {
    self.value = e;
  }
  fn(this.resolve);
}

// hello world 
// hello!
// 这里有问题,因为then里返回了this 
```

## 考虑异步的问题

``` JS
// JavaScript
var p = new mypromise((res) => {
  setTimeout(() => {
    res('hello')
    console.log('12')
  }, 1000);
})

p.then(e => {
  console.log(e + ' world')
}).then(e => {
  console.log(e + '!')
})
```

上面写的一旦在 `promise` 里包裹一个定时器, 就失去了不会把value传递给then, 会先用空的value执行then, 最后再输出定时器的改变

为了解决这个问题, 我们就需要一个状态管理, 以及发布订阅模式, 就是把then作为订阅事件, resolve做为触发点.

``` JS
// JavaScript

function mypromise(fn) {
  this.status = 'pending';
  this.value = '';
  this.stack = [];
  const self = this;
  this.then = function(fnl) {
    if (self.status != 'onfulfilled') {
      self.stack.push(fnl)
    }
    // fnl(self.value)
    return self
  }
  this.resolve = function(e) {
    if (self.status == 'pending') {
      self.status = 'onfulfilled'
      self.value = e;
      self.stack.forEach(e => {
        e(self.value)
      })
    }
  }
  fn(this.resolve);
}
```

## 实现异步调用

只需要在resolve里, 调用队列使用一个定时器, 同时考虑是否可能会返回mypromise

``` JS
// JavaScript
function mypromise(fn) {
  this.status = 'pending';
  this.value = '';
  this.stack = [];
  const self = this;
  this.then = function(fnl) {
    fnl = typeof fnl === 'function' ? fnl : function(v) {
      return v;
    };
    if (self.status != 'onfulfilled') {
      let _p = new mypromise(res => {
        self.stack.push(function(v) {
          var x = fnl(self.value)
          res(x)
        })
      })
      return _p
    } else {
      let _p = new mypromise(res => {
        console.log(self.value)
        var x = fnl(self.value)
        if (x instanceof mypromise) {
          x.then(function(data) {
            resolve(data)
          });
          return;
        }
        res(x)
      })
      return _p
    }
  }
  this.resolve = function(e) {
    if (e instanceof mypromise) {
      return e.then(self.resolve);
    }
    setTimeout(() => {
      if (self.status == 'pending') {
        self.status = 'onfulfilled'
        self.value = e;
        self.stack.forEach(e => {
          e(self.value)
        })
      }
    })
  }
  fn(self.resolve);
}
```

就是这样, 下面考虑一下race, all等等

race方法是当有一个返回就立刻返回

all方法是当所有都返回就立刻返回

## 其他的方法

[text](https://blog.csdn.net/weixin_34326558/article/details/88817737)

``` js
const PENDDING = 'pendding'; // 等待状态
const FULFILLED = 'resolved'; // 成功操作状态
const REJECTED = 'rejected'; // 捕获错误状态
class nPromise {
  constructor(handler) {
    this.ini
    t();
    handler(this.resolve.bind(this), this.reject.bind(this));
  }
  init() {
    Object.defineProperties(this, {
      '[[PromiseState]]': {
        value: PENDDING,
        writable: true,
        enumerable: false
      },
      '[[PromiseValue]]': {
        value: undefined,
        writable: true,
        enumerable: false
      },
      'thenQueue': {
        value: [],
        writable: true,
        enumerable: false
      },
      'catchQueue': {
        value: [],
        writable: true,
        enumerable: false
      }
    })
  }
  // 获取当前状态
  getPromiseState() {
    return this['[[PromiseState]]'];
  }
  // 设置当前状态
  setPromiseState(state) {
    Object.defineProperty(this, '[[PromiseState]]', {
      value: state,
      writable: false
    })
  } // 获取当前值
  getPromiseValue() {
    return this['[[PromiseValue]]'];
  }
  // 设置当前值
  setPromiseValue(val) {
    Object.defineProperty(this, '[[PromiseValue]]', {
      value: val
    })
  }
  clearQueue(currentState) {
    const doQueue = currentState === REJECTED ? this.catchQueue : this.thenQueue;
    const promiseData = this.getPromiseValue();
    doQueue.forEach(queueHandler => queueHandler(promiseData));
    this.catchQueue = [];
    this.thenQueue = []
  }
  // 状态改变方法
  changeStateHandler(currentState, data) {
    this.setPromiseState(currentState);
    this.setPromiseValue(data);
    // 无法创建microtask, 使用macrotasks
    setTimeout(() => {
      this.clearQueue(currentState)
    }, 0);
    // 保持状态只能改变一次
    this.changeStateHandler = null;
    this.setPromiseState = null;
    this.setPromiseValue = null;
  }
  // 不解释
  resolve(data) {
    this.changeStateHandler && this.changeStateHandler(FULFILLED, data);
  }
  // 不解释
  reject(err) {
    this.changeStateHandler && this.changeStateHandler(REJECTED, err);
  }
  // 不解释
  then(thenHandler) {
    const currentState = this.getPromiseState();
    const promiseData = this.getPromiseValue();
    if (currentState === FULFILLED) {
      console.log(currentState)
      thenHandler(promiseData);
    } else if (currentState === PENDDING) {
      this.thenQueue.push(thenHandler)
      console.log(thenHandler)
    };
  }
  // 不解释
  catch (catchHandler) {
    const currentState = this.getPromiseState();
    const promiseData = this.getPromiseValue();
    if (currentState === REJECTED) catchHandler(promiseData);
    else if (currentState === PENDDING) this.catchQueue.push(catchHandler);
  }
}
const test1 = new nPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('2s 后输出了我');
  }, 2000)
});
const test2 = new nPromise((resolve, reject) => {
  setTimeout(() => {
    reject('我出错啦! ')
  }, 2000)
})
test1.then(data => {
  console.log(data)
  return new nPromise(res => {
    res(1000)
  })
})
test1.catch(err => console.log(err));
test2.then(data => console.log(data));
test2.catch(err => console.log(err));
console.log("我是最早的");
```

> 未完

``` JS
// JavaScript

function MyPromise(fn) {
  var state = 'pending',
    value = null,
    callbacks = [];

  this.then = function(onFulfilled) {
    return new MyPromise(function(resolve) {
      handle({
        onFulfilled: onFulfilled || null,
        resolve: resolve
      })
    })
  }

  let handle = (callback) => {
    if (state === 'pending') {
      callbacks.push(callback)
      return
    }
    //如果then中没有传递任何东西
    if (!callback.onFulfilled) {
      callback.resolve(value)
      return
    }

    var ret = callback.onFulfilled(value)
    callback.resolve(ret)
  }

  let resolve = (newValue) => {
    if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
      var then = newValue.then
      if (typeof then === 'function') {
        then.call(newValue, resolve)
        return
      }
    }
    state = 'fulfilled'
    value = newValue
    setTimeout(function() {
      callbacks.forEach(function(callback) {
        handle(callback)
      })
    }, 0)
  }

  fn(resolve)
}
```

