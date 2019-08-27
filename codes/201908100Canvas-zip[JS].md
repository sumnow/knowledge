<!--
Created: Mon Aug 26 2019 15:22:59 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:22:59 GMT+0800 (China Standard Time)
-->
# canvas 前端压缩图片

``` js
var reader = new FileReader(),
    img = new Image();
// 读文件成功的回调
reader.onload = function(e) {
    // e.target.result就是图片的base64地址信息
    // 图片长宽
    console.log( `image width: ${this.width}px,height: ${this.height}px` )

    img.src = e.target.result;
};
eleFile.addEventListener('change', function(event) {
    reader.readAsDataURL(event.target.files[0]);
});
```

## canvas 的转换

``` js
// 将图片转为base64
canvas.toDataURL(mimeType, qualityArgument)
```

> `mimeType` 表示canvas导出来的base64图片的类型, 默认是png格式, 也即是默认值是'image/png', 我们也可以指定为jpg格式'image/jpeg'或者webp等格式.file对象中的file.type就是文件的mimeType类型, 在转换时候正好可以直接拿来用(如果有file对象). `qualityArgument` 表示导出的图片质量, 只要导出为jpg和webp格式的时候此参数才有效果, 默认值是0.92, 是一个比较合理的图片质量输出参数, 通常情况下, 我们无需再设定.

## canvas.toBlob()

``` js
canvas.toBlob(callback, mimeType, qualityArgument)
```

可以把canvas转换成Blob文件, 通常用在文件上传中, 因为是二进制的, 对后端更加友好.

和toDataURL()方法相比, toBlob()方法是异步的, 因此多了个callback参数, 这个callback回调方法默认的第一个参数就是转换好的blob文件信息, 本文demo的文件上传就是将canvas图片转换成二进制的blob文件, 然后再ajax上传的, 代码如下:

``` js
// canvas转为blob并上传
canvas.toBlob(function(blob) {
    // 图片ajax上传
    var xhr = new XMLHttpRequest();
    // 开始上传
    xhr.open("POST", 'upload.php', true);
    xhr.send(blob);
});
```

## 完整代码

``` js
document.getElementById('file').addEventListener('change', function(event) {
    console.log(event.target.files[0])
    imageCompress(event.target.files[0]).then(blob => {
        console.log(blob)
    })
})
/*
图片压缩方法 *传入的文件大小已经比设定的参数小的时候，会直接返回原文件
第一个入参  file
第二个入参  可以直接是一个数字，表示图片大小，默认100kb (100000 byte)
也可以是一个小数，表示图片压缩比例，例如 .8 表示 #分辨率# 压缩为原来的0.8倍
也可以是一个对象，可以包含size, width, height, fileType，其中：
size可以是图片大小，也可以是压缩比例
width是压缩后的图片宽度，默认自动按比例缩小
height是压缩后的图片高度，默认自动按比例缩小
fileType是压缩后的图片类型，可以是png或者jpg，不填则与原文件相同
qualityArgument是压缩后的图片质量，针对jpg图片，默认0.8中画质。0.6为低画质，0.9～1为高画质

*/
function imageCompress(file, obj = {}) {
    return new Promise((resolve, reject) => {

        let {
            size,
            width,
            height,
            fileType,
            qualityArgument
        } = obj

        if (typeof obj == 'number') {
            size = obj
        }

        if (file && file.size) {
            //不需要压缩
            if (size && file.size <= size) {
                resolve(file)
                return
            }
        } else {
            reject({
                msg: '文件参数错误，请确认是否传入了文件'
            })
            return
        }

        size = size || 100000
        if (!/(jpg|jpeg|png)$/.test(file.type)) {
            reject({
                msg: '文件格式不是jpg或者png，请确认文件格式'
            })
            return
        }
        fileType = fileType || file.type
        switch (fileType) {
            case 'jpg':
            case 'jpeg':
            case 'image/jpeg':
                fileType = 'image/jpeg'
                break
            case 'png':
            case 'image/png':
                fileType = 'image/png'
                break
            default:
                reject({
                    msg: '不支持的文件格式'
                })
                return
        }
        //canvas检测。canvas用来压缩图片
        let canvas = document.createElement('canvas')
        if (!canvas || !canvas.getContext) {
            reject({
                msg: '浏览器不支持canvas'
            })
            return
        }
        let context = canvas.getContext('2d')

        //FileReader检测。FileReader用来转base64
        if (!window.FileReader) {
            reject({
                msg: '浏览器不支持FileReader'
            })
            return
        }
        let reader = new FileReader(),
            img = new Image()
        reader.readAsDataURL(file)

        reader.onload = function(e) {
            // e.target.result就是图片base64
            img.src = e.target.result
        }
        img.onload = function() {
            let originWidth = img.width,
                originHeight = img.height
            if (width && height) {
                if (width > originWidth && height > originHeight) {
                    //原始分辨率比设定的分辨率小，不需要压缩
                    resolve(file)
                    return
                }
            } else if (width) {
                if (width > originWidth) {
                    //原始分辨率比设定的分辨率小，不需要压缩
                    resolve(file)
                    return
                }
                height = originHeight * width / originWidth
            } else if (height) {
                if (height > originHeight) {
                    //原始分辨率比设定的分辨率小，不需要压缩
                    resolve(file)
                    return
                }
                width = originWidth * height / originHeight
            } else {
                let ratio = (size > 0 && size < 1) ? size : 0.9

                width = (originWidth * ratio) | 0
                height = (originHeight * ratio) | 0
            }
            canvas.width = width
            canvas.height = height
            context.drawImage(img, 0, 0, width, height)
            canvas.toBlob(function(blob) {
                if (size && size > 1) {

                    if (blob.size <= size) {
                        resolve(blob)
                    } else {
                        imageCompress(blob, obj).then((newBlob) => {
                            resolve(newBlob)
                        })
                    }

                } else {
                    resolve(blob)
                }
            }, fileType, qualityArgument || .8)

        }
    })
}
```

