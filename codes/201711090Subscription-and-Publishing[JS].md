<!--
Created: Mon Aug 26 2019 15:18:11 GMT+0800 (China Standard Time)
Modified: Thu Apr 02 2020 15:09:41 GMT+0800 (China Standard Time)
-->

# Subscription and Publishing

观察者模式

``` js
//观察者列表
function ObserverList() {
  this.observerList = [];
}
ObserverList.prototype.add = function(obj) {
  return this.observerList.push(obj);
};
ObserverList.prototype.count = function() {
  return this.observerList.length;
};
ObserverList.prototype.get = function(index) {
  if (index > -1 && index < this.observerList.length) {
    return this.observerList[index];
  }
};
ObserverList.prototype.indexOf = function(obj, startIndex) {
  var i = startIndex;
  while (i < this.observerList.length) {
    if (this.observerList[i] === obj) {
      return i;
    }
    i++;
  }
  return -1;
};
ObserverList.prototype.removeAt = function(index) {
  this.observerList.splice(index, 1);
};
//目标
function Subject() {
  this.observers = new ObserverList();
}
Subject.prototype.addObserver = function(observer) {
  this.observers.add(observer);
};
Subject.prototype.removeObserver = function(observer) {
  this.observers.removeAt(this.observers.indexOf(observer, 0));
};
Subject.prototype.notify = function(context) {
  var observerCount = this.observers.count();
  for (var i = 0; i < observerCount; i++) {
    this.observers.get(i).update(context);
  }
};
//观察者
function Observer() {
  this.update = function() {
    // ...
  };
}
```

``` js
var pubsub = {};
(function(myObject) {
  // Storage for topics that can be broadcast
  // or listened to
  var topics = {};
  // An topic identifier
  var subUid = -1;
  // Publish or broadcast events of interest
  // with a specific topic name and arguments
  // such as the data to pass along
  myObject.publish = function(topic, args) {
    if (!topics[topic]) {
      return false;
    }
    var subscribers = topics[topic],
      len = subscribers ? subscribers.length : 0;
    while (len--) {
      subscribers[len].func(topic, args);
    }
    return this;
  };
  // Subscribe to events of interest
  // with a specific topic name and a
  // callback function, to be executed
  // when the topic/event is observed
  myObject.subscribe = function(topic, func) {
    if (!topics[topic]) {
      topics[topic] = [];
    }
    var token = (++subUid).toString();
    topics[topic].push({
      token: token,
      func: func
    });
    return token;
  };
  // Unsubscribe from a specific
  // topic, based on a tokenized reference
  // to the subscription
  myObject.unsubscribe = function(token) {
    for (var m in topics) {
      if (topics[m]) {
        for (var i = 0, j = topics[m].length; i < j; i++) {
          if (topics[m][i].token === token) {
            topics[m].splice(i, 1);
            return token;
          }
        }
      }
    }
    return this;
  };
}(pubsub));
```

### 发布订阅模式

与观察者模式不同, 它有一个事件中心, 最大的优势在于解耦合, 在事件中心里注册事件, 然后让订阅了这个事件的对象出反映. 发布和订阅者互相不用关心.

例如

``` js
// 构建一个事件中心
function eventCenter() {
  this.handlers = {};
}
// 注册(订阅)事件的方法
eventCenter.prototype.on = function(type, callback) {
  if (this.handlers[type]) {
    this.handlers[type].push(callback);
  } else {
    this.handlers[type] = [];
    this.handlers[type].push(callback);
  }
}
// 触发事件的方法
eventCenter.prototype.emit = function(type) {
  if (this.handlers[type]) {
    this.handlers[type].map(s => {
      s();
    })
  } else {
    console.error('undefined method name.')
    return undefined
  }
}
```

用学生考试来举例子

``` js
const school = new eventCenter()
// 学生参加考试
school.on('exam', function() {
  console.log('sturdents take examinations')
})
// 老师参加监考
school.on('exam', function() {
  console.log('teachers invigilated exams')
})
```

然后学校开始组织考试

``` js
school.emit('exam')
// sturdents take examinations
// teachers invigilated exams
```

应用十分广泛, 例如webpack里的hook, promise里的then等等都是依托发布订阅模式的



``` JS
// JavaScript


// 订阅发布模式
// ----

function observer(data) {
    if (data instanceof Object) {
        new Observe(data)
    } else {
        return;
    }
}

class Observe {
    constructor(data) {
        this.handler(data)
    }
    handler(data) {
        const arr = Object.keys(data)
        for (let val of arr) {
            defineReactive(data, val, data[val])
        }
    }
}

function defineReactive(data, key, val) {
    const dep = new Dep()
    Object.defineProperty(data, key, {
        get() {
            dep.addSub()
            return val
        },
        set(newVal) {
            val = newVal
            dep.notify();
        }
    })

}
let target = null
class Dep {
    constructor() {
        this.subs = []
    }
    addSub() {
        if (target && !this.subs.includes(target)) {
            this.subs.push(target)
        }
    }
    notify() {
        this.subs.forEach(({ fn }) => fn());
    }
}

function pushTarget(watch) {
    target = watch
}

class Watch {
    constructor(exp, fn) {
        this.exp = exp
        this.fn = fn
        pushTarget(this)
        data[exp]
    }
}

var data = {
    a: 1,
    b: 2,
    sum: 3
}
observer(data)



new Watch('a', () => {
    data.sum = data.a + data.b
})

new Watch('b', () => {
    data.sum = data.a + data.b
})
// ----
```
