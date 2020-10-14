# 面试

## 准备

### 优化web

#### Dom操作

应用在运行时, 性能的瓶颈主要在于DOM操作的代价非常昂贵, 下面列出一些关于DOM操作相关提升性能的建议:

1. 在JS中对DOM进行访问的代价非常高。请尽可能减少访问DOM的次数（建议缓存DOM属性和元素、把DOM集合的长度缓存到变量中并在迭代中使用。读变量比读DOM的速度要快很多。）

2. 重排与重绘的代价非常昂贵。如果操作需要进行多次重排与重绘，建议先让元素脱离文档流，处理完毕后再让元素回归文档流，这样浏览器只会进行两次重排与重绘（脱离时和回归时）。

3. 善于使用事件委托

#### 流程控制

下面列出一些流程控制相关的一些可以略微提升性能的细节, 这些细节在大型开源项目中大量运用(例如Vue):

1. 避免使用for...in（它能枚举到原型，所以很慢）

2. 在JS中倒序循环会略微提升性能

3. 减少迭代的次数

4. 基于循环的迭代比基于函数的迭代快8倍

5. 用Map表代替大量的if-else和switch会提升性能

#### 静态资源优化

1. 尽可能通过srcset，sizes和`<picture>`元素使用响应式图片。还可以通过`<picture>`元素使用WebP格式的图像。

2. 响应式图片可能大家未必听说过，但响应式布局大家肯定都听说过。响应式图片与响应式布局类似，它可以在不同屏幕尺寸与分辨率的设备上都能良好工作（比如自动切换图片大小、自动裁切图片等）。

3. 当然，如果您不满足这种尺度的优化，还可以对图片进行更深层次的优化。例如：模糊图片中不重要的部分以减小文件大小、使用自动播放与循环的HTML5视频替换GIF图，因为视频比GIF文件还小（好消息是未来可以通过img标签加载视频）。

#### js优化

JS的加载与执行会阻塞页面渲染, 可以将Script标签放到页面的最底部. 但是更好的做法是异步无阻塞加载JS. 有多种无阻塞加载JS的方法:defer、async、动态创建script标签、使用XHR异步请求JS代码并注入到页面.

但更推荐的做法是使用defer或async. 如果使用defer或async请将Script标签放到head标签中, 以便让浏览器更早地发现资源并在后台线程中解析并开始加载JS

#### 懒加载

``` html
<img class="js-lazy-image" data-src="burger.png">
```

``` JS
// JavaScript

// Get all of the images that are marked up to lazy load 
const images = document.querySelectorAll('.js-lazy-image');
const config = {
  // If the image gets within 50px in the Y axis, start the download.
  rootMargin: '50px 0px',
  threshold: 0.01
}; // The observer for the images on the page 
let observer = new IntersectionObserver(onIntersection, config);
images.forEach(image => {
  observer.observe(image);
});
```

``` JS
// JavaScript
function onIntersection(entries) { // Loop through the entries 
  entries.forEach(entry => { // Are we in viewport? 
    if (entry.intersectionRatio > 0) { // Stop watching and load the image 
      observer.unobserve(entry.target);
      preloadImage(entry.target);
    }
  });
}
```

#### CSS资源

CSS资源的加载对浏览器渲染的影响很大, 默认情况下浏览器只有在完成<head>标签中CSS的加载与解析之后才会渲染页面. 如果CSS文件过大, 用户就需要等待很长的时间才能看到渲染结果. 针对这种情况可以将首屏渲染必须用到的CSS提取出来内嵌到<head>中, 然后再将剩余部分的CSS用异步的方式加载. 可以通过Critical做到这一点.

#### 输入响应

据调查, JS执行100毫秒以上用户就会明显觉得网页变卡了. 所以要严格限制每个JS任务执行时间不能超过100毫秒.

解决方案是可以将一个大任务拆分成多个小任务分布在不同的Macrotask中执行(通俗的说是将大的JS任务拆分成多个小任务异步执行). 或者使用WebWorkers, 它可以在UI线程外执行JS代码运算, 不会阻塞UI线程, 所以不会影响用户体验.

#### 使用预编译

拿Vue举例, 如果您使用单文件组件开发项目, 组件会在编译阶段将模板编译为渲染函数. 最终代码被执行时可以直接执行渲染函数进行渲染. 而如果您没有使用单文件组件预编译代码, 而是在网页中引入vue.min.js, 那么应用在运行时需要先将模板编译成渲染函数, 然后再执行渲染函数进行渲染. 相比预编译, 多了模板编译的步骤, 所以会浪费很多性能

#### 使用 Tree-shaking、Scope hoisting、Code-splitting

Tree-shaking是一种在构建过程中清除无用代码的技术. 使用Tree-shaking可以减少构建后文件的体积.

目前Webpack与Rollup都支持Scope Hoisting. 它们可以检查import链, 并尽可能的将散乱的模块放到一个函数中, 前提是不能造成代码冗余. 所以只有被引用了一次的模块才会被合并. 使用Scope Hoisting可以让代码体积更小并且可以降低代码在运行时的内存开销, 同时它的运行速度更快. 前面2.1节介绍了变量从局部作用域到全局作用域的搜索过程越长执行速度越慢, Scope Hoisting可以减少搜索时间.

code-splitting是Webpack中最引人注目的特性之一. 此特性能够把代码分离到不同的bundle中, 然后可以按需加载或并行加载这些文件.code-splitting可以用于获取更小的bundle, 以及控制资源加载优先级, 如果使用合理, 会极大影响加载时间.

####  服务端渲染(SSR)

单页应用需要等JS加载完毕后在前端渲染页面, 也就是说在JS加载完毕并开始执行渲染操作前的这段时间里浏览器会产生白屏.

服务端渲染(Server Side Render, 简称SSR)的意义在于弥补主要内容在前端渲染的成本, 减少白屏时间, 提升首次有效绘制的速度. 可以使用服务端渲染来获得更快的首次有效绘制.

比较推荐的做法是: 使用服务端渲染静态HTML来获得更快的首次有效绘制, 一旦JavaScript加载完毕再将页面接管下来.

#### 使用import函数动态导入模块

使用import函数可以在运行时动态地加载ES2015模块, 从而实现按需加载的需求.

这种优化在单页应用中变得尤为重要, 在切换路由的时候动态导入当前路由所需的模块, 会避免加载冗余的模块(试想如果在首次加载页面时一次性把整个站点所需要的所有模块都同时加载下来会加载多少非必须的JS, 应该尽可能的让加载的JS更小, 只在首屏加载需要的JS).

使用静态import导入初始依赖模块. 其他情况下使用动态import按需加载依赖

#### 使用HTTP缓存头

正确设置expires, cache-control和其他HTTP缓存头.

推荐使用Cache-control: immutable避免重新验证.

#### 其他

1. HTTP2

2. 使用最高级的CDN(付费的比免费的强的多)

3. 优化字体

4. 其他垂直领域的性能优化

### https

[here](./201807110https[NETWORK].md)

### ts

### 实现map

``` JS
// JavaScript
Array.prototype.fakeMap = function(fn, context) {
  let arr = this;
  let temp = [];
  for (let i = 0; i < arr.length; i++) {
    let result = fn.call(context, arr[i], i, arr);
    temp.push(result);
  }
  return temp;
}
```

``` JS
// JavaScript
async function timeout(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time, '123')
  })
}

const c = await timeout(100)

c()
```

## 面试题

vue的render函数和AST解析

mutation和 action区别

//输入一个整数数组, 找出和最大的连续子数组(至少包含一个数字), 并返回其和.
//如下:
//maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]); 
// 返回6, 说明:[4, -1, 2, 1] 是和最大的子数组, 和为6
//实现maxSubArray, 尽量达到时间复杂度O(n)

0 == [[]]

a == 1 && a == 2为true, 求a

``` JS
// JavaScript
var proxy = new Proxy(window, {
  get(target, key) {
    if (key === 'a') {

      return target[a] + 1
    }
  }
})
```

实现一个函数curry, 参数为一个函数, 使用方式如下:
function abc(a, b, c) {
return [a, b, c]; 
}
const curried = curry(abc); 
curried(1)(2)(3); // => [1, 2, 3]
curried(1, 2)(3); // => [1, 2, 3]
curried(1, 2, 3); // => [1, 2, 3]

``` JS
// JavaScript

function abc(...a) {
  return [...a]
}

function curried(fn) {
  return function(...args) {
    let arr = [];

    function unname(...args) {
      if (args.length == 0) {
        return unname.toString()
      }
      if (args.length == 1) {
        arr.push(...args)
        return unname;
      }
    }
    unname.toString = () => `[${fn(...arr)}]` 
    return unname(...args)
  }
}

const curry = curried(abc)

function curry(...args) {
  let sum = [];
  if (args.length === 0) {
    return sum;
  } else {
    return function(...arg) {
      sum.push(args)
    }
  }
}
```

setTimeout(function(){

	setTimeout(function(){
		console.log(1);
	}, 100);
	new Promise(resolve => {
		console.log(2);
		resolve(3);
		setTimeout(function(){
			console.log(4);
		}, 1);
	}).then((number) => {
		setTimeout(function(){
			console.log(5);
		}, 0);
		console.log(number)
	})
	console.log(6);

}, 0); 

setTimeout(function(){

	console.log(7);

}, 100); 

console.log(8); 

