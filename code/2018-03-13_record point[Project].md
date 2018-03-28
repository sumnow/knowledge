# 打点

以百度统计为例子

注册后添加需要打点的网站，百度统计给出一段神秘代码加载html中

    var _hmt = _hmt || [];
    (function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?b74fafd15b6716c7f0e3057c8ff045c2";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
    })()

如果是传统页面，直接加载head中即可。

如果是 `spa` 就需要，做个特殊处理

    router.beforeEach((to, from, next) => {
        // 统计代码
        if (to.path) {
            console.log(['_trackPageview', '/#' + to.fullPath]);
            _hmt.push(['_trackPageview', '/#' + to.fullPath]);
        }
        next();
    });

在 `main.js` 注入 `router` 后，加入上面代码。

在 `router-link` 中，在跳转过程时同步加入点记录，可以使用 `onclick`

    onclick="_hmt.push(['_trackEvent', '订购', 'click', this.href])"
    // 传入一个数组 '_trackEvent' 是用来判断是否监听事件
    // second arg 为 类型
    // third arg 为 操作类型
    // last arg 为 params

