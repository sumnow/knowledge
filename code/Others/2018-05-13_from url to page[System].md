# url to page

1. 输入地址
2. 浏览器查找域名的 IP 地址
这一步包括 DNS 具体的查找过程，包括：浏览器缓存->系统缓存->路由器缓存...
3. 浏览器向 web 服务器发送一个 HTTP 请求
4. 服务器的永久重定向响应（从 http://example.com 到 http://www.example.com）
5. 浏览器跟踪重定向地址
6. 服务器处理请求
7. 服务器返回一个 HTTP 响应
8. 浏览器显示 HTML
9. 浏览器发送请求获取嵌入在 HTML 中的资源（如图片、音频、视频、CSS、JS等等）
10. 浏览器发送异步请求


1. 浏览器会访问DNS服务器将输入的域名对应的IP获取到
2. 浏览通过HTTP协议和IP协议处理发送的建立连接的请求然后发送到互联网
3. 在互联网中路由器根据目标IP地址，通过复杂的算法找出'最优路径'来传输请求
4. 找到目标IP计算机(服务器)的网卡通过三次握手建立连接
5. 服务器对请求进行分析处理然后返回浏览器需要的页面
6. 浏览器拿到数据会对DOM结构和CSS进行分析形成renderTree然后渲染到页面上
7. 在渲染的过程中有需要从服务器请求的资源，会重复1-6的过程