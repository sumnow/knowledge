# 微信 problem

微信使用的是自己家的浏览器内核，X5浏览器，在使用微信浏览器访问vue+axios的页面时候，出现了options请求，但拦截了后续请求。

发现原因是因为微信浏览器解析`Allow-Headers`不允许使用通配符，改成指定的路径就可以了。


### 微信SDK接入


##### 获取ACCESS_TOKEN

请求 `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`

ACCESS_TOKEN每7200秒需要重新获取一次。

##### 获取jsapi_ticket

用第一步拿到的access_token 采用http GET方式请求获得jsapi_ticket（有效期7200秒，开发者必须在自己的服务全局缓存jsapi_ticket）

`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi`

返回的结果如下

    {
        "errcode":0,
        "errmsg":"ok",
        "ticket":"bxLdikRXVbTPdHSM05e5u5sUoXNKd8-41ZO3MhKoyN5OfkWITDGgnr2fwJ0m9E8NYzWKVZvdVtaUgWvsdshFKA",
        "expires_in":7200
    }

##### 获取 signature

将 `jsapi_ticket` , `noncestr`, `url` , `timestamp` 按照字典排序拼接成字符串

    jsapi_ticket=sM4AOVdWfPE4DxkXGEs8VMCPGGVi4C3VM0P37wVUCFvkVAy_90u5h9nbSlYy3-Sl-HhTdfl2fzFy1AOcHKP7qg&noncestr=Wm3WZYTPz0wzccnW×tamp=1414587457&url=http://mp.weixin.qq.com?params=value

对字符串做 `sha1` 加密，得到 `signature`

    `0f9de62fce790f9a083d5c99e95740ceb90c27ed`

##### 前端发起的请求

以上操作都是在后台执行的，前端请求后端一个接口 `/wxconfig`

    request({
        url: '/wxconfig',
        params: {url: 'http://...'}
    }).then(res=>{
        console.log(res)
        // {
        //    debug: true,
        //    appId: '', 
        //    timestamp: , 
        //    nonceStr: '', 
        //    signature: '',
        //    jsApiList: [] 
        }
    })
    
然后调用 `wx.config` 方法，注入配置信息

    wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: '', // 必填，公众号的唯一标识
        timestamp: , // 必填，生成签名的时间戳
        nonceStr: '', // 必填，生成签名的随机串
        signature: '',// 必填，签名
        jsApiList: [] // 必填，需要使用的JS接口列表
    });

    wx.ready(function(){
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    });

    wx.error(function(res){
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    });



### 微信openId获取

携带 `appid` 和 `scope` 为参数，将页面重置到一下url

    https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx488e92a58d28ac83&redirect_uri=https%3a%2f%2ffile.10010sh.cn%2fWeiting%2f&response_type=code&scope=snsapi_base&state=123#wechat_redirects

`redirect_url` 为重定向的url ，且为 `decodeUrl` 转换的url路径，重定向后在url中携带code参数，

code参数发送往后台，获取 `ACCESS_TOKEN` ,可以用来获取用户的 `OPENID`

注意 `redirect_url`
