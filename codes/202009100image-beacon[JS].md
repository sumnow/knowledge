<!--
Created: Wed Sep 16 2020 14:34:07 GMT+0800 (China Standard Time)
Modified: Wed Sep 16 2020 14:37:15 GMT+0800 (China Standard Time)
-->

# 数据分析上传为什么使用1x1大小的gif

## 问题

工作中, 用于前端监控, 比如曝光等等, 谷歌和百度的都是用的1x1 像素的透明 gif 图片, 为什么?

英文术语叫: image beacon

在Google 的 Make the Web Faster 的 #Track web traffic in the background 中有提到.

主要应用于只需要向服务器发送数据(日志数据)的场合, 且无需服务器有消息体回应. 比如收集访问者的统计信息.

一般做法是服务器用一个1x1的gif图片来作为响应, 当然这有点浪费服务器资源. 因此用header来响应比较合适, 目前比较合适的做法是服务器发送"204 No Content", 即"服务器成功处理了请求, 但不需要返回任何实体内容".

1. 能够完成整个 HTTP 请求+响应（尽管不需要响应内容）
2. 触发 GET 请求之后不需要获取和处理数据、服务器也不需要发送数据
3. 跨域友好（img 天然支持跨域）
4. 执行过程无阻塞
5. 相比 XMLHttpRequest 对象发送 GET 请求，性能上更好, 图片请求不占用 Ajax 请求限额
6. GIF的最低合法体积最小（最小的BMP文件需要74个字节，PNG需要67个字节，而合法的GIF，只需要43个字节）
7. 不会阻塞页面加载，影响用户的体验，只要new Image对象就好了，一般情况下也不需要append到DOM中，通过它的onerror和onload事件来检测发送状态。

> 利用空白gif或1x1 px的img是互联网广告或网站监测方面常用的手段, 简单、安全、相比PNG/JPG体积小, 1px 透明图, 对网页内容的影响几乎没有影响, 这种请求用在很多地方, 比如浏览、点击、热点、心跳、ID颁发等等, 
