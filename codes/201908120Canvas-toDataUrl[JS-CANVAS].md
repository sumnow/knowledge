<!--
Created: Mon Aug 26 2019 15:23:00 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:23:00 GMT+0800 (China Standard Time)
-->
# 图片压缩

``` html
<!-- html -->
<input type="file" id="file" accept="image/*" />>
<canvas id="canvas" class="hidden"></canvas>
```

写在$('#file')的onchange事件中

``` js
// 压缩完最长长度
const MAX_LENGTH = 1024;
let file = document.getElementById('file').files[0];
var reader = new FileReader();
reader.readAsDataURL(file);
reader.onload = function(e) {
    var img = new Image();
    img.src = this.result;
    img.onload = function() {
        let width = this.width;
        let height = this.height;
        const aspectRatio = this.width / this.height;
        if (aspectRatio > 1) {
            width = MAX_LENGTH;
            height = MAX_LENGTH / aspectRatio;
        } else {
            height = MAX_LENGTH;
            width = MAX_LENGTH * aspectRatio;
        }
        console.log(width, height);
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = width;
        canvas.height = height;
        ctx.beginPath();
        ctx.drawImage(img, 0, 0, width, height);
        ctx.closePath();
        // toDataURL("image/jpeg") 相对原图，略大
        // .toDataURL("image/png") 相对原图，更大
        var dataURL = canvas
            .toDataURL("image/jpeg")
            .replace(new RegExp("data:image/jpeg;base64,", "g"), "");
    };
};
```

## toDataURL()

``` js
canvas.toDataURL(type, encoderOptions);
```

图片的分辨率为96dpi

* type 可选

图片格式, 默认为 `image/png` 

* encoderOptions 可选

在指定图片格式为 `image/jpeg` 或 `image/webp` 的情况下, 可以从 0 到 1 的区间内选择图片的质量. 如果超出取值范围, 将会使用默认值 0.92. 其他参数会被忽略.

| 导出图的格式  | 原图片的大小 | 转换后的大小 | 
|-------------|------------|------------|
| jpeg        | 25k        | 34k        |
| png         | 25k        | 29k        |
| webp        | 25k        | 21k        |

