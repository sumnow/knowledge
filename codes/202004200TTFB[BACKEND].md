<!--
Created: Tue Jun 09 2020 21:18:23 GMT+0800 (China Standard Time)
Modified: Tue Jun 09 2020 21:18:30 GMT+0800 (China Standard Time)
-->

# 什么是TTFB

TTFB(Time To First Byte)首字节时间, 包含了发送请求到服务器, 服务器处理请求并生成响应, 服务器响应内容发送到浏览器的时间. 只测试浏览器收到第一个字节的时间. 这里的第一个字节不是内容, 而是HTTP头的第一个字节.

## TTFB有什么意义

可以相对的提供DNS查询, 服务器响应, SSL认证, 重定向等花费时间的参考.

可以作为其它优化手段的验证, 不需要单独优化首字节时间. 因为首字节时间本身不代表用户体验更好.

比如gzip能让网页加载更快, 但是压缩需要花费时间, 就会造成同一个网页, 未压缩时首字节出现更快, 但是整个页面加载却更慢的情况.

## 网页加载时间节点

1. First Byte 首字节
2. Start Render, First Paint 开始渲染, 白屏时间
3. DOMContentLoaded 网页结构加载解析成DOM
4. Load 网页加载完成, 包括样式图片iframe等加载
