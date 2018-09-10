# 微信的问题

### 微信小程序

#### scroll

微信小程序的 `wx.pageScrollTo(OBJECT)` 方法，在部分安卓手机上每次都会滚动到头部，再滚动到目标地方。

解决方案： 使用 `scroll-view` 标签。

#### wepy

使用wepy开发的时候，需要关闭es6转es5，以及代码自动压缩，否则会报错或者出现打包出现问题的情况。

#### canvas

1. 微信中 `canvas` 的元素层级最高,除了 `coverview` 以外, 是不会被覆盖的.

2. 而且 `canvas` 不受到 `transform` 带来的变化, 无论是作用在元素本身或者是父层元素上.

3. `canvas` 在小屏幕机型上的适配,例如,ip5(320), 小米8(360), etc. ,由于没有办法使用 `transfrom` , 应该设置一个系数, 根据 `wx.getSystemInfoSync()` 获取的设备物理像素宽度,来判断系数为多少来完成绘图.

4. `canvas` 绘制了透明图片以后, 使用 `canvasToTempFilePath` 默认保存为png透明背景,但是设置 `fileType: 'jpg'` 就可以保存为白色背景

>  `android` 默认透明保存为黑色背景, `ios` 是白色背景

5. 小程序的开发版, 体验版, 正式版 共用同一个 `storage` , 而 `globalData` 则不同.