<!--
Created: Fri Sep 20 2019 18:15:22 GMT+0800 (China Standard Time)
Modified: Wed Sep 25 2019 19:32:09 GMT+0800 (China Standard Time)
-->
# chrome 全屏应用

可以使得web应用全屏显示

``` html
<!-- html -->
<button id="goFS">Go fullscreen</button>
<script>
    var goFS = document.getElementById("goFS");
    goFS.addEventListener("click", function() {
        document.body.requestFullscreen();
    }, false);
</script>
```

这个方法必须要由用户手动触发, 无法自动触发.

针对不同浏览器不同的适配, 所以有下面的解决方案, 或者使用 Sindre Sorhus 的 Screenfull.js 

``` js
// javascript
function toggleFullScreen() {
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
    } else {
        cancelFullScreen.call(doc);
    }
}
```

## 从主屏幕以全屏模式启动页面

无法实现在用户导航到网页时启动全屏模式. 浏览器供应商深知在每次页面加载时都提供全屏体验很令人讨厌, 因此会要求用户通过手势进入全屏模式. 但供应商也的确允许用户"安装"应用, 安装行为是向操作系统发出的一个信号, 表示用户想在平台上以应用的形式启动网页.

如下所述, 在各主流移动平台上, 使用元标记或清单文件实现起来相当简便.

### iOS

自从 iPhone 发布以来, 用户就一直能将网络应用安装到主屏幕, 并以全屏模式启动.

``` html
<!-- html -->
<meta name="apple-mobile-web-app-capable" content="yes">
```

如果 content 设置为 yes, 则网络应用以全屏模式运行; > 否则, 不以全屏模式运行. 默认行为是使用 Safari 显示网络 > 内容. 可以 > 利用 window.navigator.standalone 只读布尔值 JavaScript 属性 > 确定网页是否以全屏模式显示. Apple

### Chrome(Android 版)

Chrome 团队近期实现的一项功能可在用户已将页面添加到主屏幕的情况下指示浏览器以全屏模式启动页面. 这与 iOS Safari 模式类似.

``` html
<!-- html -->
<meta name="mobile-web-app-capable" content="yes">
```

可以利用 Chrome(Android 版)的"Add to Home screen"菜单项 > 将网络应用设置为将应用快捷方式图标添加到 > 设备的主屏幕, 让应用以全屏"应用模式"启动.> Google Chrome

更好的选择是使用网络应用清单.

### 网络应用清单(Chrome, Opera, Firefox, Samsung)

网络应用清单是一个简单的 JSON 文件, 使您(开发者)能够控制在用户可能看到应用的区域(例如手机主屏幕)中如何向用户显示应用, 指示用户可以启动哪些功能, 更重要的是说明启动方法. 未来, 清单将让您对应用进行更多控制, 但现在我们只侧重于如何启动应用.

具体而言:

将清单的相关信息告知浏览器

说明启动方法

在创建清单并托管在网站上之后, 只需要从所有包含应用的页面添加一个下面这样的 link 标记:

``` html
<!-- html -->
<link rel="manifest" href="/manifest.json">
```

Chrome(Android 版)从 38 版(2014 年 10 月)起就已支持清单, 让您能够控制当网络应用安装到主屏幕时的显示方式(通过 short_name, name 和 icons 属性), 以及当用户点击启动图标时应以何种方式启动应用(通过 start_url, display 和 orientation).

清单示例如下所示. 其中并未详尽展示清单可能包含的内容.

``` js
// javascript

{
    "short_name": "Kinlan's Amaze App",
    "name": "Kinlan's Amazing Application ++",
    "icons": [{
        "src": "launcher-icon-4x.png",
        "sizes": "192x192",
        "type": "image/png"
    }],
    "start_url": "/index.html",
    "display": "standalone",
    "orientation": "landscape"
}
```

此功能是完全渐进式的功能, 可通过它为支持该功能的浏览器用户打造更好, 集成度更高的体验.

当用户将网站或应用添加到主屏幕时, 其意图是将它当作应用对待. 这意味着, 您的目标应该是将用户导向应用的功能而不是产品着陆页. 例如, 如果用户需要登录应用, 那么它就是适合启动的页面.

### 实用程序应用

大多数实用程序应用都将立即受益于清单. 对于您可能希望像移动平台上的所有其他应用一样独立启动的应用, 要指示应用独立启动, 请向网络应用清单添加以下内容:

``` js
// javascript
"display": "standalone"
```

