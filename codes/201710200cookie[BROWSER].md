<!--
Created: Mon Aug 26 2019 15:18:04 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:18:04 GMT+0800 (China Standard Time)
-->
# cookie

## 定义

cookie是存储在客户端, 用来记录服务器和客户端交互的信息, 在访问创建了cookie的网站下, 发起ajax会自动将 `Cookie` 加在头部发送.

### Set-Cookie

最后一个参数设置了HttpOnly, js就无法读取道这个Cookie了.

Cookie保存的信息都是文本信息, 在交互的流程中, 被附加在HTTP头中传递, 

``` network
    Set-Cookie: key=value; Path=/
```

一个Cookie只能包含一个自定义的键值对. Cookie本身有"Comment", "Domain", "Max-Age", "Path", "Secure", "Vision"

Domain 定义了可以访问该Cookie的域名, 可以在子域名中共享.

Max-age 定义了有效时间, 单位秒, 超过有效期后, 不会再次发送

Path 定义了网站上可以访问cookie的页面的路径, 默认为产生cookie的路径, 将path设置为/, 可以让网站下所有页面访问.

Secure 属性定义了cookie的安全性, 当值为true的时候, 必须是HTTPS才可以从客户端附加发送到服务器, 再HTTP的时候步伐送, 默认为false.

Version 定义了cookie的版本, 有创建者定义.

[cookie](https://github.com/sumnow/YouMayNeed/blob/master/cookie.js)

