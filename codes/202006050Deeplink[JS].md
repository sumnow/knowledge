<!--
Created: Sat Jun 13 2020 18:50:43 GMT+0800 (China Standard Time)
Modified: Sun Jun 28 2020 15:00:03 GMT+0800 (China Standard Time)
-->

# 唤起app

## 唤起的几种方式

### URL Scheme

URL Scheme是iOS, Android平台都支持, 只需要原生APP开发时注册scheme, 那么用户点击到此类链接时, 会自动唤醒APP, 借助于URL Router机制, 则还可以跳转至指定页面.

这种方式是当前使用最广泛, 也是最简单的, 但是需要手机, APP支持URL Scheme.

优点: 开发成本低, 绝大多数都支持, web-native协议制定也简单.

缺点: 错误处理情况因平台不同, 难以统一处理, 部分APP会直接跳错误页(比如Android Chrome/41, iOS中老版的Lofter); 也有的停留在原页面, 但弹出提示"无法打开网页"(比如iOS7); iOS8以及最新的Android Chrome/43 目前都是直接停留在当前页, 不会跳出错误提示.

支持情况: iOS在实际使用中, 腾讯系的微信, QQ明确禁止使用, iOS9以后Safari不再支持通过js, iframe等来触发scheme跳转, 并且还加入了确认机制, 使得通过js超时机制来自动唤醒APP的方式基本不可用; Android平台则各个app厂商差异很大, 比如Chrome从25及以后就同Safari情况一样.

### Universal Links

在2015年的WWDC大会上, Apple推出了iOS 9的一个功能: Universal Links通用链接. 如果你的App支持Universal Links, 那就可以访问HTTP/HTTPS链接直接唤起APP进入具体页面, 不需要其他额外判断; 如果未安装App, 访问此通用链接时, 可以一个自定义网页.

### Android App Links

在2015年的Google I/O大会上, Android M宣布了一个新特性: App Links让用户在点击一个普通web链接的时候可以打开指定APP的指定页面, 前提是这个APP已经安装并且经过了验证, 否则会显示一个打开确认选项的弹出框. 在推动deep linking上Google和Apple可谓英雄所见略同, 优缺点也大致相同, 只支持Android M以上系统.

总结以上各种方案从长远趋势来看都是Deep Links技术, 都需要一个支持HTTPS的Web站

<!-- 方法基于自定 `scheme` , 注册 `deeplink` 链接的方式, 在移动端唤起APP, 就像一般的url链接一样 -->

## 实现

### URL Scheme

``` JS
// JavaScript
// http sce
`http://taobao.com` 
`taobao://taobao.com` 
```

在移动端浏览器, 即可唤起.

#### 基本原理

其实DeepLink的基本实现是简单到不可思议, 他的核心思想实际上是 `Android` 的隐式启动. 我们平时的隐式启动主要是通过 `Action` 和 `Category` 配合启动指定类型的 `Activity` 

``` JAVA
// JAVA
<activity
      android:name=".SecondActivity"
      android:exported="true">
      <intent-filter>
           <action android:name="com.lzp.deeplinkdemo.SECOND" />
           <category android:name="android.intent.category.DEFAULT" />
      </intent-filter>
</activity>
```

``` JAVA
// JAVA
val intent = Intent("com.lzp.deeplinkdemo. SECOND")
intent.addCategory(Intent. CATEGORY_DEFAULT)
startActivity(intent)
```

除了action和category, 还有一种隐式启动的用法是配置data:

``` JAVA
// JAVA

<data
     android:scheme="xxxx"
     android:host="xxxx"
     android:port="xxxx"
     android:path="xxxx"
     android:pathPattern="xxxx"
     android:pathPrefix="xxxx"
     android:mimeType="xxxx"/>
```

#### config

1. scheme：协议类型，我们可以自定义，一般是项目或公司缩写，String
2. host：域名地址，String
3. port：端口，int。
4. path：访问的路径，String
5. pathPrefix：访问的路径的前缀，String
6. pathPattern：访问路径的匹配格式，相对于path和pathPrefix更为灵活，String
7. mimeType：资源类型，例如常见的：video/*, image/png, text/plain。

通过这几个配置项, 我们发现data实际上为当前的页面绑定了一个Uri地址, 这样就可以通过Uri直接打开这个 `Activity` .

### 前端唤起的方式

唤起app的方法, 自己实验了如下的方式可行, 值得记录一下

``` JS
// JavaScript
this.isiOS = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
const locationHref = window.location.href;
const url = "taobao://taobao.com/openwith?path=" + d.toUrl;
console.log("跳转", url);
window.location.href = url;
var timeout = setTimeout(() => {
  console.log("跳转itunes", this.isiOS);
  if (this.isiOS) {
    window.location.href = "https://itunes.apple.com/cn/app/1";
  } else {
    window.location.href = "https://android.myapp.com/myapp/detail.htm?apkName=taobao";
  }
}, 3000);
// 时灵时不灵
window.addEventListener("blur", function() {
  clearTimeout(timeout);
});
```

如果没有安装 `app` , 会提示 `Safari cannot open the page because the address is invalid` , 一个弹窗, 无法规避. 安卓推荐跳转应用宝, 就可以直接唤起app了, 但无法到指定的页面, **如果你在应用宝申请过跳转的功能**, 那么就可以跳转到指定的页面了.

> 现在多数app面对这个问题, 都选择, 跳转一个中间页, 先尝试唤起app, 否则就引导用户手动下载.

### Universal Links 和 APP Links

都是通过直接在浏览器中自动打开App, 无感知且无弹框, 缺点是仅兼容 `iOS 9` 和安卓6 以上
