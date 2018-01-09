#目录

2017-03-09 [settimeout](./2017-03-09.md)√

2017-03-10 apply call caller callee√

2017-03-11 跨域√

2017-03-13 浏览器加载渲染原理√

2017-03-14 Promise

2017-03-15 JQuery扩展插件

2017-03-16 this指向√

2017-03-17 作用域√

2017-03-18 前端页面优化提速√

2017-03-19 {}、[]、()的问题√

2017-03-20 重复输出字符串√

2017-03-21 闭包√

2017-03-22 typeof以及 String方法属性√

2017-03-23 Number方法√

2017-03-24 Array方法

2017-03-26  nth-child以及nth-of-type√

2017-04-10 原型√

2017-04-11 深拷贝

2017-04-12 map与set数据类型√

2017-04-13 继承√

2017-04-14 js的私有属性和实例属性√

2017-04-15 js的栈与堆√

207-04-16 函数节流与防抖动√

2017-04-17 箭头函数√

2017-04-18 es6 let const√

2017-04-19 forin forof forEach $.each√

2017-04-20 es6 解构赋值√

2017-04-21 es6 函数功能扩展√

2017-04-23 es6 Symbol 

2017-04-24 js事件流√

2017-05-01 正则√

2017-05-02 类数组对象和Iteator√

2017-05-03 模版√

2017-05-04 json方法和对象比较√

2017-05-05 纯css回弹效果√

2017-05-06 清除浮动√

2017-05-07 css

2017-05-08 连续赋值和循环引用√

2017-05-09 异步和同步√

2017-05-10 函数队列

2017-05-11 es6 Generator 

2017-06-01 ubuntu 安装及注意事项√

2017-06-09 defineProperty√

2017-06-10 了解http√

2017-06-21 色彩玄学√

2017-06-27 浏览器event√

2017-06-28 关于vuex

2017-08-29 CORS权限控制√

2017-08-30 css变量

2017-08-31 尾调用

2017-09-01 Math与parseInt

2017-09-02 caller与callee√

2017-09-11 关于随机

2017-09-12 mini-mock

2017-09-13 替代for

2017-09-14 fileblog

2017-09-18 restful接口

2017-10-07 es6代理proxy

2017-10-10 es6 import和export

2017-10-11 Rxjs

2017-10-12 Math

2017-10-15 data schemes

2017-10-17_EventLoop

2017-10-18 vue ParentandChild

2017-10-20_cookie

2017-10-21_axios

2017-10-31_linux process and vim

2017-11-01_git

2017-11-07_es6Reflect

2017-11-08_Object methods

2017-11-09_Subscription and Publishing

2017-11-19_insertAdjcentHTML

2017-11-21_CentOS and shadowsocks

2017-11-22_useless javascript

2017-11-23_userAgent

2017-11-28_remember number

2017-12-05_wordspace

2017-12-11_canvas and requestAnimation

2017-12-12_simple question

2017-12-15_sort algorithm

2018-01-08_es6 class

2018-01-09_html5history



---
##待续
基础类型的方法如array ,object,number等,typeof null
js原型
js模块化写法
js文件流
canvas制作导出图片（摄像头）
vue.2.0源码解读
js作用域闭包
函数式编程尾递归
es6
js内置对象
canvas贝塞尔
flex
markdown编辑器
环形音乐播放器
CORS权限控制
CSS变量
编译原理 自写解释器，像.vue文件
观察者模式和订阅发布
proxy的canvas应用

一个栈表里都是水果标签，右侧是类别的列表，然后依次滑动到右侧的列表下

疑惑：

function request () {
    return new Promise((resolve, reject)=>{
        axios(config).catch(err=>{
            console.log(err.response.status)
            //这个获取不到错误码，返回的似乎是errMessage
        })
    })
}