# node 多线程

[链接](https://zhuanlan.zhihu.com/p/74879045)

node 的单线程和js很像, 主要是通过EventLoop是个单线程非阻塞的IO, 将线程的事件交给C++ Thread Pool(线程池)取处理, 然后通过callback 使用

