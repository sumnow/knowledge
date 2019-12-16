<!--
Created: Fri Dec 13 2019 10:14:41 GMT+0800 (China Standard Time)
Modified: Mon Dec 16 2019 17:13:59 GMT+0800 (China Standard Time)
-->

# Etag

关于 etag 的生成需要满足几个条件

1. 当文件不会更改时，ETag 值保持不变。所以不能单纯使用 inode
2. 便于计算，不会特别耗 CPU。这样子 hash 不是特别合适
3. 便于横向扩展，多个 node 上生成的 etag 值一致。这样子 inode 就排除了

``` C
/* C */
etag->value.len = ngx_sprintf(etag->value.data, "\"%xT-%xO\"",
                                  r->headers_out.last_modified_time,
                                  r->headers_out.content_length_n) - etag->value.data;
```

nginx 中 `ETag` 由响应头的 `Last-Modified` 与 `Content-Length` 表示为十六进制组合而成.

``` BASH
# BASH
Server: nginx/1.16.0
Content-Length: 612
Last-Modified: Tue, 23 Apr 2019 10:18:21 GMT
ETag: "5cbee66d-264"
```

``` JS
// JavaScript
new Date(parseInt('5cbee66d', 16) * 1000).toJSON()
// "2019-04-23T10:18:21.000Z"
parseInt('264', 16)
// 612
```

