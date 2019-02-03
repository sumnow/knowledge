# 前端页面优化提速

## 减少对服务器的文件请求

1. 雪碧图技术, 合并多个图片文件为一个, 使用background-position来使用; 

2. 合并多个css文件为单个, 合并多个js脚本为一个; 劣势在于多个页面中的公共脚本和样式就无法缓存到客户端了; 

3. 使用base64编码展示图片, [这个](https://varvy.com/tools/base64/)网址可以转换图片; 不过不推荐在用户多次访问的页面中, 因为虽然不需要从服务器get代码, 但是也无法缓存在客户端, 会导致每次访问都要重复渲染。 `10k以上的图片base64码就会很庞大, 给浏览器解析都造成很大压力` 

4. 把小块的css, js脚本写在页面中, 虽然可能增加了代码量, 不利于维护, 但是, 可以有效降低http请求数量。 

5. 使用http-equiv="expires"元标签, 设置在某一时刻过期, 之前一直从缓存中获取页面文件。 

    

    content = "Sunday 26 October 2008 01:00 GMT"

## 减少文件大小

1. 压缩脚本或者样式文件, gulp, grunt等(混淆变量函数名)

2. 图片压缩低品质gif, 中jpg, 高png, 还有淘宝的webp

3. 使用Font Awesome来加载页面中的小图标, 原理是用@font-face来下载一个小的文字ui包, 将图标用文字形式展现。 

4. 使用svg图片格式, 图片作为代码引入, 极大降低文件大小。 

## 适度使用CDN

如果用户在其他的页面中已经下载了这个cdn中的文件, 就无需下载即可访问, 减少了对服务器访问的压力, 而且多个域名中下载, 提高了效率(firefox只允许一个域名中异步下载2个脚本)。 

当然了, cdn也带来了dns解析的压力。 如果引入了多个cdn的文件, 会导致解析dns而陷入等待中。 

最好的方式一个页面是从两个域(cdn域和站点域)中加载所需要的文件。 

## 延迟请求、 异步加载脚本

脚本下载完毕后执行期间会引起执行阻塞, 推荐使用requireJS(AMD规范) 或 seaJS(CMD规范) 来异步加载脚本并处理模块依赖的, 前者将"依赖前置"(预加载所有被依赖脚本模块, 执行速度最快), 后者走的"依赖就近"(懒加载被依赖脚本模块, 请求脚本更科学), 你可以根据项目具体需求来选择最合适的。 

## 延迟请求首屏外的文件

就是常说的lazyload, 在首屏加载完成后再缓慢加载后面的内容。 例如: 

    < img src = "data:image/png; base64, R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
    data - src = "a.jpg" >

页面初次加载时, 用的是base64编码, 或者使用一张很小的load.gif, data-src中是真实的地址, 之后在页面加载完成之后替换该图片地址。 

    function init() {
        var imgDefer = document.getElementsByTagName('img'); 
        for (var i = 0; i < imgDefer.length; i++) {
            if (imgDefer[i].getAttribute('data-src')) {
                imgDefer[i].setAttribute('src', imgDefer[i].getAttribute('data-src')); 
            }
        }
    }
    window.onload = init; 

## 合理安排页面结构

应当把用户需要看见的东西放在首要加载的地方, 至于那些次要的可以放在后面加载。 

## 其他

- css中少使用import, 这样会在加载一个样式时, 引起另一个样式的加载; 
- 避免页面文件重定向查找, 好像进了一条胡同, 才发现写个牌子: 此路不通, 走左边那条。 
- 减少无效请求, 请求不存在的资源会引起阻塞(直到返回错误信息)。 
- 脚本文件放在样式文件后
- gzip

