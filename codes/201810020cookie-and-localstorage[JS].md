<!--
Created: Mon Aug 26 2019 15:20:26 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:20:26 GMT+0800 (China Standard Time)
-->

# cookie localstorage sessionstorage

cookie属于文档对象模型DOM树根节点document, 而 sessionStorage 和 localStorage 属于浏览器对象模型BOM的对象window

## cookie

用户每次访问站点时, Web应用程序都可以读取 Cookie 包含的信息. 当用户再次访问这个站点时, 浏览器就会在本地硬盘上查找与该 URL 相关联的 Cookie. 如果该 Cookie 存在, 浏览器就将它添加到request header的Cookie字段中, 与http请求一起发送到该站点.

要注意的是, 添加到 request header 中是「浏览器的行为」, 存储在cookie的数据「每次」都会被浏览器「自动」放在http请求中. 因此, 如果这些数据不是每次都要发给服务器的话, 这样做无疑会增加网络流量, 这也是cookie的缺点之一. 为了避免这点, 我们必须考虑什么样的数据才应该放在cookie中, 而不是滥用cookie. 每次请求都需要携带的信息, 最典型的就是身份验证了, 其他的大多信息都不适合放在cookie中.

Cookie适合存储一些session信息: 

1. cookie限制大小, 约4k左右, 不适合存储业务数据, 尤其是数据量较大的值
2. 存在有效期, 到期自动销毁
3. cookie会每次随http请求一起发送, 浪费带宽
4. cookie设置了domain可以在子域共享跨域
5. 可以使用爬虫抓取、

### httponly

httponly属性是用来限制客户端脚本对cookie的访问. 将 cookie 设置成 httponly 可以减轻xss攻击的危害, 防止cookie被窃取, 以增强cookie的安全性.(由于cookie中可能存放身份验证信息, 放在cookie中容易泄露)

我们用 js 获取下cookie, 可以发现访问不到 NID 这个cookie, 说明js是无法读取和修改 httponly cookies, 当然也不能设置 cookie 为 httponly, 这只能通过服务器端去设置.

### 服务器端设置cookie

服务器通过发送一个名为 Set-Cookie 的HTTP头来创建一个cookie, 作为 Response Headers 的一部分. 如下图所示, 每个Set-Cookie 表示一个 cookie(如果有多个cookie, 需写多个Set-Cookie), 每个属性也是以名/值对的形式(除了secure), 属性间以分号加空格隔开. `Set-Cookie: name=value[; expires=GMTDate][; domain=domain][; path=path][; secure]` 

## localstorage

localstorage适合存储应用共享的地址信息等: 

1. 存储数据量大, 5M或者更大
2. 有效期为永久
3. 不会随http请求一起发送
4. 不能跨域, 但是可以使用postMessage和iframe消除这个影响, 例如: cross-storage
5. 在浏览器的隐私模式下不能读取
6. 不能被爬虫读取

## sessionStorage

sessionstorage适合存储浏览状态等: 

1. 存储数据量大, 5M或者更大
2. 有效期为到浏览器关闭
3. 不会随http请求一起发送
4. 不能被爬虫读取

