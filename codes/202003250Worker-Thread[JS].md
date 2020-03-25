# thread worker

依然是那个单线程的js, 但是终于有人忍不住它在一些复杂运算下的卡死, 而决定使用多线程来解决这个问题.

## 先看怎么用

``` JS
// JavaScript
// mian.js
let myWorker = new Worker('test.js');
myWorker.postMessage('Apple'); // 发送
myWorker.onmessage = function(event) { // 接收
  console.log('Main Received ' + event.data); // Banana
}
```

``` JS
// JavaScript
// test.js
let a = 'Banana'
this.onmessage = function(ev) {
  this.console.log(this)
  // DedicatedWorkerGlobalScope {}
  // 一个如上的对象,一个worker专用的全局定义域,主线程上可以被调用的方法都挂在到这个上面了,如Set Boolean 等等方法
  this.console.log(ev)
  // MessageEvent {data}
  // 这就是ev
  a = ev.data
  this.console.log(a) // Apple
};
this.postMessage(a)
```

它可以手动关闭来释放资源

``` JS
// JavaScript
// mian.js
worker.terminate();
// test.js
close();
// Worker也提供了错误处理机制， 当出错时会触发error事件。
// 监听 error 事件
worker.addEventListener('error', function(e) {
  console.log('ERROR', e);
});
```

##　注意

1. 因为双方都是使用　 `onmessage` 来监听 `callback` , 所以双方的事件都无法保证返回的时间.

2. Worker子线程所在的全局对象，与主线程不在同一个上下文环境，无法读取主线程所在网页的 DOM 对象，也无法使用document、window、parent这些对象，global对象的指向有变更，window需要改写成self，不能执行alert()方法和confirm()等方法，只能读取部分navigator对象内的数据。另外chrome的console.log()倒是可以使用，也支持debugger断点，增加调试的便利性。

解决方案:

将动态生成的脚本转换成Blob对象, 然后给这个Blob对象创建一个URL, 最后将这个创建好的URL作为地址传给Worker的构造函数.

``` JS
// JavaScript
let script = 'console.log("hello world!"); '
let workerBlob = new Blob([script], {
  type: "text/javascript"
});
let url = URL.createObjectURL(workerBlob);
let worker = new Worker(url);
```

3. 分配给Worker 线程运行的脚本文件（worker.js），必须与主线程的脚本文件(main.js)同源。这里的同源限制包括协议、域名和端口，不支持本地地址（file://）。这会带来一个问题，我们经常使用CDN来存储js文件，主线程的worker.js的域名指的是html文件所在的域，通过new Worker（url）加载的url属于CDN的域，会带来跨域的问题，实际开发中我们不会吧所有的代码都放在一个文件中让子线程加载，肯定会选择模块化开发。通过工具或库把代码合并到一个文件中，然后把子线程的代码生成一个文件url。

4. Worker子线程中可以使用 `XMLHttpRequest` 对象发出 AJAX 请求, 可以使用 `setTimeout()`  `setInterval()` 方法, 也可使用websocket进行持续链接. 也可以通过importScripts(url)加载另外的脚本文件, 但是仍然不能跨域.

##　场景

1. 前端复杂的计算

2. 提前读取数据

还有个神奇的使用哭, 很方便

## superWorker

[superWorker](https://github.com/socialpandas/sidekiq-superworker)

