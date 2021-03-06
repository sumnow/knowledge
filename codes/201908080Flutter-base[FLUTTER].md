<!--
Created: Mon Aug 26 2019 15:22:56 GMT+0800 (China Standard Time)
Modified: Wed Sep 25 2019 19:26:52 GMT+0800 (China Standard Time)
-->
# flutter

安装基本都是按照官方文档来, 包括下载sdk之类的内容

在下载 `CocoasPod` 的相关依赖的时候, 非常慢, 可以参考[这里](./201908020NTFS-and-proxy-zsh[OSX].md)

先打开 `Simulator` , 再vscode安装完 `flutter&dart` 插件之后, 运行 `>flutter new project` 可能会遇到dart 提示flutter sdk path not found , 这时候需要自己去vscode的dart里配置到 `flutter/sdk` 的路径

## flutter的安卓打包

### 生成签名

首先需要一个 `key.jks` 签名文件, 这个文件可以使用 `andriod stutio` 或者 `command` 生成.

### 生成 `key.properties` 

这时候到项目目录的 `android` 文件夹下创建一个名为 `key.properties` 的文件, 并打开贴入以下代码:

``` key
    // 不需要尖括号或者引号
    storePassword=<password from previous step>    //输入上一步创建KEY时输入的 密钥库 密码
    keyPassword=<password from previous step>    //输入上一步创建KEY时输入的 密钥 密码
    keyAlias=key
    storeFile=<E:/key.jks>    //key.jks的存放路径
```

### 配置key注册

进入项目目录的 `/android/app/build.gradle` 文件, 在 `android {` 这一行前面, 加入如下代码:

``` code
    def keystorePropertiesFile = rootProject.file("key.properties")
    def keystoreProperties = new Properties()
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
```

把如下代码:

``` code
buildTypes {
    release {
        signingConfig signingConfigs.debug
    }
}
```

替换成:

``` code
// code
signingConfigs {
    release {
        keyAlias keystoreProperties['keyAlias']
        keyPassword keystoreProperties['keyPassword']
        storeFile file(keystoreProperties['storeFile'])
        storePassword keystoreProperties['storePassword']
    }
}
buildTypes {
    release {
        signingConfig signingConfigs.release
    }
}
```

到defaultConfig中, 录入APPID和版本号.

``` code
defaultConfig {
        applicationId "com.example.myflutter"  //APPID
        minSdkVersion 16  //可运行应用的最低版本的 Android 平台，由该平台的 API 级别标识符指定
        targetSdkVersion 27  //指定运行应用的目标 API 级别。在某些情况下，这允许应用使用在目标 API 级别中定义的清单元素或行为，而不是仅限于使用那些针对最低 API 级别定义的元素或行为。
        versionCode 1    //内部版本号
        versionName "1.0"  //对外公布的版本号
        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
    }
```

### 打包

``` bash
# bash
flutter build apk

```

大功告成, 生成的文件在 `/build/app/outputs/apk` 内

## flutter 报错

在 `flutter doctor` 或者 `flutter attach` 时, 出现报错

``` bash
# bash
Could not connect to lockdown, error -21
```

需要卸载 `usbmuxd` 

``` bash
# bash
brew install --ignore-dependencies usbmuxd
# 重新安装
brew install --HEAD usbmuxd
```

## flutter color 

如何将 `#b74093` 中的十六进制颜色字符串转换为Flutter中的Color?

在Flutter中 Color班级 仅接受 整数 作为参数, 或者可以使用命名构造函数 fromARGB 和 fromRGBO .

所以我们只需要将字符串#b74093转换为整数值. 此外, 我们需要尊重始终需要指定不透明度.

255(完整)不透明度由十六进制值FF表示. 这已经给我们留下了 0xFF . 现在, 我们只需要添加这样的颜色字符串:

``` dart
    final color = const Color(0xffb74093); 
```

这些字母可以选择是否大写:

``` dart
final color = const Color(0xFFB74093); 
```

## 获取状态栏的高度

``` dart
    final double statusBarHeight = MediaQuery.of(context).padding.top;
```

[参考](https://xjlhhz.com/2018/10/08/20181008flutter%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98/)

