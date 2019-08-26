<!--
Created: Mon Aug 26 2019 15:17:57 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:18:02 GMT+0800 (China Standard Time)
-->
# node 简易本地服务器

很多项目都需要在服务器环境下才可以正常访问, 其实多数原因都是因为内部的跨域问题. 

例如本地一个html页面ajax请求同目录下的read.txt, 在本地打开会报错, 在服务器下却不会, 原因是本地请求文件时, 使用的是file协议(file://), 而服务器端使用的是http/https协议. 

本地支持哪些协议, 各家浏览器有些细微差别, 例如chrome, 在访问本地文件的时候会报错:

``` bash
    Cross Origin requests are only supported
    for protocol schemes: http, data, chrome, chrome - extension, https.
```

chrome虽然有开放访问本地文件的权限, 默认是关闭的, 也可以开启, 但是为了适用性, 还是应该选择http协议预览. 

常见的服务器搭建手段有, apache, iis等, 本次主要说node 构建, node构建的优势就在于node已经基本是开发者的标配环境了, 在此之下, 只需要一个命令行就可以跑起服务器, 算是目前比较优秀的解决方案. 

### 搭建过程

> 这边涉及到页面加载, 格式的问题, 如js文件是 `text/javascript` 等, 所以访问页面以外, 还要注意各个资源的加载

首先, 利用node的http模块, 构建服务

``` js
//server.js
var http = require('http');
```

``` js
function start(router) {
    http.createServer(function(request, response) {
        router.init(request, response);
    }).listen(9000);
    console.log('Server 127.0.0.1:9000 starting');
}
exports.start = start;
//router.js
var url = require('url');
var path = require('path');
var querystring = require('querystring');
var fs = require('fs');
module.exports = {
    fileType: {
        "css": "text/css",
        "gif": "image/gif",
        "html": "text/html",
        "ico": "image/x-icon",
        "jpeg": "image/jpeg",
        "jpg": "image/jpeg",
        "js": "text/javascript",
        "json": "application/json",
        "pdf": "application/pdf",
        "png": "image/png",
        "svg": "image/svg+xml",
        "swf": "application/x-shockwave-flash",
        "tiff": "image/tiff",
        "txt": "text/plain",
        "wav": "audio/x-wav",
        "wma": "audio/x-ms-wma",
        "wmv": "video/x-ms-wmv",
        "xml": "text/xml"
    },
    routePathGet: {},
    routePathPost: {},
    get: function(pathname, fn) {
        this.routePathGet[pathname] = fn;
    },
    post: function(pathname, fn) {
        this.routePathPost[pathname] = fn;
    },
    rootPath: "",
    setRootPath: function(rp) {
        this.rootPath = rp;
    },
    sendFile: function(response, pathname) {
        var ext = path.extname(pathname).slice(1);
        var ft = this.fileType[ext] || "text/plain";
        response.setHeader("Content-type", [ft, "charset=utf-8"]);
        pathname = this.rootPath + pathname;
        pathname = path.normalize(pathname);
        fs.readFile(pathname, function(err, data) {
            if (err) {
                response.statusCode = 404;
                response.end('404文件不存在');
            } else {
                response.statusCode = 200;
                response.end(data, "binary");
            }
        });
    },
    init: function(request, response) {
        console.log(request.url);
        var fn = undefined;
        var pathname = request.url;
        if (request.method.toLowerCase() === 'get') {
            fn = this.routePathGet[pathname];
        } else {
            fn = this.routePathPost[pathname];
        }
        if (fn) {
            fn(request, response);
        } else {
            this.sendFile(response, pathname);
        }
    }
};
//app.js
var server = require('./server/server');
var router = require('./config/route');
router.setRootPath(__dirname);
router.get('/', function(req, res) {
    //页面是在view下的newtest.html
    router.sendFile(res, "/view/newtest.html");
}); //处理/的get请求
server.start(router);
```

