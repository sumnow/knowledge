<!--
Created: Mon Aug 26 2019 15:17:33 GMT+0800 (China Standard Time)
Modified: Mon Oct 14 2019 10:16:07 GMT+0800 (China Standard Time)
-->

# 关于微信小程序

## 微信小程序

### wx:for 属性的顺序

``` wxml
<!-- HTML -->
<view
    wx:for="{{list}}"
    wx:for-item="sitem"
    data-code="{{sitem.departCityCode}}"
    class="{{sitem.departCityCode == activeid ? 'active' : ''}}"
    catchtap="handleList"
>{{sitem.departCityName}}</view>
```

小程序里如果将class那行移到 `wx:for` 前面, 会无法成功添加 `active` 类, 因为 `sitem` 此时还没有声明

### 小程序文字里的空格

`\r\t\r\t` 就会显示空格了

### 小程序图片自适应

[Offical link](https://developers.weixin.qq.com/miniprogram/dev/component/image.html)

``` html
<image mode="aspectFill" />
```

> 保持宽度, 高度自适应 `mode="widthFix"` 

### 小程序里的富文本

`rich-text` 里的dom可以通过class和css修改

> 注意: scoped下的无法获取, 因为scoped还带有一个随机的类名.

### 微信小程序的生命周期

``` js
onLoad: " 一个页面只会调用一次。 接收页面参数 可以获取wx.navigateTo和wx.redirectTo及 <navigator/> 中的 query。"

onShow: "每次打开页面都会调用一次。"

onReady: "页面初次渲染完成一个页面只会调用一次， 代表页面已经准备妥当， 可以和视图层进行交互。"

onHide: "页面隐藏当navigateTo或底部tab切换时调用。"

onUnload: "页面卸载"
```

**如果在wepy中使用组件开发方式, 触发的顺序是父onLoad 子onLoad 父onShow** 

## 微信小程序的本地数据

小程序的开发版, 体验版, 正式版 共用同一个 `localStorage` , 而 `globalData` 则不同.

### 小程序二维码

微信小程序的二维码传入的 `path` 如果是线上不存在的页面会显示纯白.

### pageScrollTo

微信小程序的 `wx.pageScrollTo(OBJECT)` 方法, 在部分安卓手机上每次都会滚动到头部, 再滚动到目标地方.

解决方案: 使用 `scroll-view` 标签.

### 小程序button

`button` 的 `border` 是在其 `::after` 上

### 小程序的canvas属性

1. 微信中 `canvas` 的元素层级最高, 除了 `coverview` 以外, 是不会被覆盖的.

2. 而且 `canvas` 不受到 `transform` 带来的变化, 无论是作用在元素本身或者是父层元素上.

3. `canvas` 在小屏幕机型上的适配, 例如, ip5(320), 小米8(360), etc., 由于没有办法使用 `transfrom` , 应该设置一个系数, 根据 `wx.getSystemInfoSync()` 获取的设备物理像素宽度, 来判断系数为多少来完成绘图.

4. `canvas` 绘制了透明图片以后, 使用 `canvasToTempFilePath` 默认保存为png透明背景, 但是设置 `fileType: 'jpg'` 就可以保存为白色背景

> `android` 默认透明保存为黑色背景, `ios` 是白色背景

5. 微信小程序的canvas要隐藏, 不可以使用 `visiblity` 或者 `transfrom` 之类, `display:none` 可以隐藏, 但是隐藏后, 再导出, 只会出现一个纯黑(白, 与设备有关)的图片, 也不可以设置canvas的大小过小来解决, 使用 `position` 可以解决, 但不可以设置 `top:9999px` 这种大值来解决, 因为ios设备会无视page的 `overflow:hidden` , 依然是可以滚动的, 但是如果设置 `top:-100px` 就不会滚动了.

6. 小程序中使用clip切出圆形, 在开发者工具中是没有效果的, 但是甄姬是有滴.

### canvas 文字换行

``` js
const obj = {
    size: 12,
    // 文字
    text: 'HELLO',
    // 行宽
    width: 270,
    // 行高
    height: 18
};
// 文字换行, 回车或者超出长度都会换行
function textWrap(obj) {
    ctx.setFontSize(obj.size);
    var reg = /\n/g;
    // obj.text = obj.text.replace(reg, '灬'); 
    let arrText = obj.text.split('');
    let line = '';
    let arrTr = [];
    for (let i = 0; i < arrText.length; i++) {
        var testLine = line + arrText[i];
        var metrics = ctx.measureText(testLine);
        var width = metrics.width;
        if ((width > obj.width && i > 0) || arrText[i].match(reg)) {
            arrTr.push(line);
            if (arrText[i].match(reg)) {
                line = '';
            } else {
                line = arrText[i];
            }
        } else {
            line = testLine;
        }
        if (i == arrText.length - 1) {
            arrTr.push(line);
        }
    }
    return arrTr;
}
```

### canvas组合文字居中

#### 水平居中

例如: 不同字号或者字体的组合字, 水平居中, 使用下面的方法计算出每个的宽度.

``` js
function handleTexts(_arr = [{
    text: 'xxx',
    style: '14px normal'
}]) {
    return _arr.map(e => {
        ctx.font = e.style;
        return ctx.measureText(e.text).width;
    });
}
```

#### 垂直居中  

利用上面的 `textWrap` 算出共几行.

再按照行高来判断就好, 没多一行, 各往上下移动半行高度

### canvas 图片剪切

#### 保存到相册授权

用户可能会拒绝授权, 而后再次点击保存到相册就没有反应了.

目前有两种方式:

#### 使用button

``` html
<button open-type="openSetting" bindopensetting="callback">打开设置页</button>
```

#### 点击触发事件

``` html
<button bindtap="openSetting">打开设置页</button> openSetting() { wx.openSetting()}
```

> 这个 `openSetting` 可以放在 `getSetting` 的回调里, 但是不可以放在 `saveImageToPhotosAlbum` 的回调里, 不晓得微信怎么想的.

基础调试库版本 2.8.0

``` js
saveToAlbum() {
    const self = this;

    wx.getSetting({
        success(res) {
            console.log(res)
            if (res.authSetting && res.authSetting && res.authSetting['scope.writePhotosAlbum']) {
                wx.canvasToTempFilePath({
                    x: 0,
                    y: 0,
                    width: self.data.windowWidth,
                    height: self.data.windowHeight,
                    fileType: 'jpg',
                    canvasId: 'poster-canvas',
                    success: function(res) {
                        wx.saveImageToPhotosAlbum({
                            filePath: res.tempFilePath,
                            success: function(data) {
                                wx.showToast({
                                    title: '保存成功',
                                    icon: 'none'
                                });
                            },
                            fail(err) {
                                wx.showToast({
                                    title: '保存失败',
                                    icon: 'none'
                                });
                            }
                        });
                    }
                });
            } else {
                wx.showToast({
                    title: '需要保存到相册的权限',
                    icon: 'none'
                });
                wx.openSetting({
                    success(settingdata) {
                        if (settingdata.authSetting['scope.writePhotosAlbum']) {
                            console.log('获取权限成功，再次点击图片保存到相册');
                        } else {
                            console.log('获取权限失败');
                        }
                    },
                    fail(err) {
                        console.log(err)
                    }
                });

            }
        }
    })

}
```

### 版本库错误

提示某接口已废弃

如果这个接口不是被废弃的, 那么更可能是因为版本库不对, 将项目设置里的调试基础库改为最新即可.

### wx.showModal

在需要换行的位置加上 `\r\n` , 即可实现内容的换行.(**微信开发者工具可能看不到效果, 但是真机实测是会换行的**)

``` js
wx.showModal({
    title: '书信',
    content: '车马很慢，\r\n书信很远',
    success: function(res) {
        if (res.confirm) {}
    }
});
```

### 小程序报错

如果报某个页面not registered 且 app.json里已经配置过这个页面, 那么原因就是这个页面的对应js文件中是空的, 解决方案是添加

``` js
Page({})
```

## wepy

使用wepy开发的时候, 需要关闭es6转es5, 以及代码自动压缩, 否则会报错或者出现打包出现问题的情况.

### wepy 和 Vue 的区别

#### 父子组件传值

* Vue中的prop传值默认是只要父组件的数据改变, 子组件同时改变, 但是这种模式在wepy中是静态的 也即 :name="name"是静态的, 父组件改变name子组件还是不会变, 子组件还是父组件第一次传进来的值
* wepy要做到父组件数据变的同时, 子组件也跟着变, 要加个修饰符.sync, 也即:name.sync="name"
* 还有一个是双向绑定的问题, Vue中可以通过$emit事件的方式实现, 这里wepy可以在子组件中的props配置类型, 默认值, 以及是否双向中的twoWay为true, 就实现了双向数据流
* 默认twoWay的值是false, 如果不是特别需要, 请按单向数据的方式传递数据最好, 再配合$emit, $broadcast, $invoke, 尽量少用, 除非是表单这种

#### 组件

* 在wepy中引入组件在components中, 和Vue的一样, 但是使用的时候是不同的, 一个组件对应一个id, 如果在同一个模板中使用同一组件超过2次, 它们会共享数据, 共享数据指的是props等, 可以测试一下, 同一个组件传入的props名一样, 值不一样, 最终所有组件那的那个props值是最后一个值, 因为它们共享同一个props, 多个组件一起使用, 类似定义多个同名的函数一样, 最后使用的是最后一个函数

* 为了避免这种情况下可以用同一个组件去定义多个组件名{ coma: Button, comb: Button }, 实际上就是new多一个Button, 也就是说小程序中的组件在使用的时候, 不会自动地new一个新的组件, 而是同一个组件, 而像Vue和React这样的组件, 它们会new一个新的Button实例

* 还有一种情况是, 在循环体 `<repeat>` 中, 在小程序中就会去new一个新的组件实例, 如果你的内容重复, 又不想定义多个组件名(new 多个组件), 可以使用循环体 `<repeat>` 

* 还有一种情况是slot, 如果那个组件和数据无关, 只是单纯的用于slot模板, 它们最终生成的标签是不同的, 因为这些生成的模板和数据无关, 如果生成的模板中包含数据, 那生成那部分关联数据的元素都是一样的, 这里说的数据是 `<view class='{{ className }}' >{{ data }}</view>` 这些花括号中的数据className和data, 它们是共享的, 所以它们最终生成的视图是一模一样的

#### mixins的computed顺序问题

* mixins中的computed执行顺序和vue的相反, 也即先执行component或者页面的定义的, 然后再执行mixins中的
* 还有就是延迟的问题, mixins的慢于组件或者当前页面定义的, 如果想在当前页面获取mixins的一些值, 会获取不到

### wepy数组的问题

当父组件以

``` html
<child arr.sync="arr"></child>
```

形式传递一个对象数组, 如果该数组是异步获取值

``` js
    data: {
        arr: []
    }
    onLoad: {
        request().then(res => {
            this.arr = res.arr;
        })
    }
```

那么在 `child` 里无法获取到 `arr` 的改变, 除非 `arr` 默认值为 `[{}]` 

