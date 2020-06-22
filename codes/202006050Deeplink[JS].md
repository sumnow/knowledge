<!--
Created: Sat Jun 13 2020 18:50:43 GMT+0800 (China Standard Time)
Modified: Mon Jun 22 2020 23:19:12 GMT+0800 (China Standard Time)
-->

# 唤起app

方法基于自定 `scheme` , 注册 `deeplink` 链接的方式, 在移动端唤起APP, 就像一般的url链接一样

``` JS
// JavaScript
// http sce
`http://taobao.com` 
`taobao://taobao.com` 
```

在移动端浏览器, 即可唤起.

## 基本原理

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

### config

1. scheme：协议类型，我们可以自定义，一般是项目或公司缩写，String
2. host：域名地址，String
3. port：端口，int。
4. path：访问的路径，String
5. pathPrefix：访问的路径的前缀，String
6. pathPattern：访问路径的匹配格式，相对于path和pathPrefix更为灵活，String
7. mimeType：资源类型，例如常见的：video/*, image/png, text/plain。

通过这几个配置项, 我们发现data实际上为当前的页面绑定了一个Uri地址, 这样就可以通过Uri直接打开这个 `Activity` .

## 唤起app

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
