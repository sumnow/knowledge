# cookie localstorage sessionstorage

Cookie适合存储一些session信息: 

1. cookie限制大小, 约4k左右, 不适合存储业务数据, 尤其是数据量较大的值
2. 存在有效期, 到期自动销毁
3. cookie会每次随http请求一起发送, 浪费宽
4. cookie设置了domain可以在子域共享跨域
5. 可以使用爬虫抓取

localstorage适合存储应用共享的地址信息等: 

1. 存储数据量大, 5M或者更大
2. 有效期为永久
3. 不会随http请求一起发送
4. 不能跨域, 但是可以使用postMessage和iframe消除这个影响, 例如: cross-storage
5. 在浏览器的隐私模式下不能读取
6. 不能被爬虫读取

sessionstorage适合存储浏览状态等: 

1. 存储数据量大, 5M或者更大
2. 有效期为到浏览器关闭
3. 不会随http请求一起发送
4. 不能被爬虫读取

