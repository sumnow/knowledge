# 微信小程序的问题

## 微信小程序

小程序的开发版, 体验版, 正式版 共用同一个 `localStorage` , 而 `globalData` 则不同.

### 微信

微信小程序的二维码传入的 `path` 如果是线上不存在的页面会显示纯白.

### scroll

微信小程序的 `wx.pageScrollTo(OBJECT)` 方法， 在部分安卓手机上每次都会滚动到头部， 再滚动到目标地方。 

解决方案： 使用 `scroll-view` 标签。 

### wepy

使用wepy开发的时候， 需要关闭es6转es5， 以及代码自动压缩， 否则会报错或者出现打包出现问题的情况。 

### 小程序button

 `button` 的 `border` 是在其 `::after` 上

### canvas

1. 微信中 `canvas` 的元素层级最高, 除了 `coverview` 以外, 是不会被覆盖的.

2. 而且 `canvas` 不受到 `transform` 带来的变化, 无论是作用在元素本身或者是父层元素上.

3. `canvas` 在小屏幕机型上的适配, 例如, ip5(320), 小米8(360), etc. , 由于没有办法使用 `transfrom` , 应该设置一个系数, 根据 `wx.getSystemInfoSync()` 获取的设备物理像素宽度, 来判断系数为多少来完成绘图.

4. `canvas` 绘制了透明图片以后, 使用 `canvasToTempFilePath` 默认保存为png透明背景, 但是设置 `fileType: 'jpg'` 就可以保存为白色背景

> `android` 默认透明保存为黑色背景, `ios` 是白色背景

5. 微信小程序的canvas要隐藏, 不可以使用 `visiblity` 或者 `transfrom` 之类, `display:none` 可以隐藏, 但是隐藏后, 再导出, 只会出现一个纯黑(白, 与设备有关)的图片, 也不可以设置canvas的大小过小来解决, 使用 `position` 可以解决, 但不可以设置 `top:9999px` 这种大值来解决, 因为ios设备会无视page的 `overflow:hidden` , 依然是可以滚动的, 但是如果设置 `top:-100px` 就不会滚动了.  

6. 小程序中使用clip切出圆形, 在开发者工具中是没有效果的, 但是甄姬是有滴.

#### canvas 文字换行

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

#### 组合文字居中

##### 水平居中

例如: 不同字号或者字体的组合字, 水平居中, 使用下面的方法计算出每个的宽度.

    function handleTexts(_arr = [{
        text: 'xxx', 
        style: '14px normal'
    }]) {
        return _arr.map(e => {
            ctx.font = e.style; 
            return ctx.measureText(e.text).width; 
        }); 
    }

##### 垂直居中  

利用上面的 `textWrap` 算出共几行.

再按照行高来判断就好, 没多一行, 各往上下移动半行高度

#### canvas 图片剪切

##### 保存到相册授权

用户可能会拒绝授权, 而后再次点击保存到相册就没有反应了.

> ps: 这个方法已经被废弃了, 必须使用 `button` 来呼起 `OpenSetting` 

    wx.saveImageToPhotosAlbum({
        filePath: imgpath, 
        success() {
            console.log('success saved')
        }, 
        fail() {
            wx.openSetting({
                success(settingdata) {
                    if (settingdata.authSetting['scope.writePhotosAlbum']) {
                        console.log('success auth deny')
                    } else {
                        console.log('fail auth deny')
                    }
                }
            })
        }
    })

### 版本库错误

提示某接口已废弃

如果这个接口不是被废弃的,那么更可能是因为版本库不对,将项目设置里的调试基础库改为最新即可.