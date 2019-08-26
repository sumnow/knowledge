<!--
Created: Mon Aug 26 2019 15:18:00 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:18:00 GMT+0800 (China Standard Time)
-->
# data 协议

 URL (uniform resource locator)

Data URI 的格式十分简单, 如下所示:

``` other
    data:[<mime type>][;charset=<charset>][;base64],<encoded data>
```

而对图片来说, 在 gzip 压缩之后, base64 图片实际上比原图 gzip 压缩要大, 体积增加大约为三分之一, 所以使用的时候需要权衡.

