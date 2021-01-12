<!--
Created: Mon Aug 26 2019 15:19:17 GMT+0800 (China Standard Time)
Modified: Tue Jan 12 2021 16:40:38 GMT+0800 (China Standard Time)
-->

# 微信的问题

### 微信平台

微信的平台: 商户平台, 开放平台, 公众平台

简单的说, 每个微信应用都有对应的公众平台mp, 开发者使用open平台可以将多个应用关联上, 建立起统一的UnionId, 商户平台需要绑定公众平台, 因为支付依赖openid

#### 微信公众平台(http://mp.weixin.qq.com)

官方介绍: 微信公众平台是给个人、企业和组织提供业务服务与用户管理能力的全新服务平台. 这个平台是针对普通用户(个人)、企业、组织提供服务的, 是运营和开发者的领地! 这里说白了就是订阅号、服务号、企业号以及小程序给我们提供的服务, 而微信公众平台也是提供登录、管理和操作处理这三类账号的平台, 从注册到最后的登陆、文章发布、用户管理等操作都可以在这里处理, 后面简称mp平台!

#### 微信开放平台(http://open.weixin.qq.com)

官方介绍: 开放平台是为微信用户提供服务的平台, 而公众平台开发接口则是提供服务的基础, 开发者在公众平台网站中创建公众号、获取接口权限后, 可以通过阅读本接口文档来帮助开发!

这里主要是开发者的领地! 我们可以从官方的介绍中可以发现这个平台主要是为了开发者服务的, 其中涉及移动应用、网站应用、公众号开发、公众号以及小程序第三方平台等有关微信登录、支付以及相关开发文档都可以在这里找到, 简直就是微信和其他第三方应用接入的接口大全, 后面简称open平台!

#### 微信商户平台(http://pay.weixin.qq.com)

官方介绍: 微信支付是腾讯公司的支付业务品牌, 微信支付提供公众号支付、APP支付、扫码支付、刷卡支付等支付方式. 微信支付结合微信公众账号, 全面打通O2O生活消费领域, 提供专业的互联网+行业解决方案, 微信支付支持微信红包和微信理财通, 是移动支付的首选.

在这个商户平台不仅提供开发者有关的开发文档, 而且提供流水记录和红包等相关的运营策略, 所以这里是开发者, 运营者, 财务的领地! 所有使用微信支付, 不论是扫码支付, app支付等所有的流水订单都可以在这里找到足迹, 为我们的每一笔订单提供对账凭证和查询记录, 后面简称pay平台!

#### mp平台、open平台、pay平台直接的关联

在我之前讲述的一些开发过程中我们一直用到一个唯一标识Openid, 不知道有没有细心看文档的朋友, 会发现在我们的微信开发文档中也有提及到一个唯一标识 UnionID, 那么我们一直在用的Openid是不是用错了呢? 答案当然是没错, 这里容我们来详细讲述下Openid和UnionID之间的关系; 

openid的唯一标识是说在我们的微信公众平台下, 一个个人微信对一个微信公众平台帐号(这里可以是订阅号、服务号、企业号)的微信标识, 但是我们的open平台有个功能是一个开发者账号可以绑定最多50个微信公众平台账号以及小程序、多个网站应用、多个移动应用, 这个时候如何在一个微信开发者账号中识别50个map平台下用户的唯一性呢? 这个时候UnionId就出现了, 所以他的意义是可想而知的, 如果在企业中既存在mp平台账号又存在web应用和移动应用的时候我们为了方便用户的管理和去用户冗余性, 在整体的设计中我相信大家都会采用UnionId来做微信登录的唯一标识的; 但是回过头来说我们说openid是唯一标识也是没有错的, 因为前面的我们的讲解都是针对单个公众平台账号来说的!

商户平台和用户以及mp平台之间的关系又是如何呢? 从简单原则上来说mp平台和pay平台之间是一一对应的关系的, 但是也存在微信开发者拥有微信支付开发权限存在微信商户子账号的存在, 但是无论如何pay平台和用户之间的支付关系都是唯一的都是用过openid来产生的, 不论是红包支付还是企业支付其依赖关系都是openid.

如果开发者拥有多个移动应用、网站应用、和公众帐号(包括小程序), 可通过 UnionID 来区分用户的唯一性, 因为只要是同一个微信开放平台帐号下的移动应用、网站应用和公众帐号(包括小程序), 用户的 UnionID 是唯一的. 换句话说, 同一用户, 对同一个微信开放平台下的不同应用, UnionID是相同的.

##### UnionID获取途径

绑定了开发者帐号的小程序, 可以通过以下途径获取 UnionID.

1. 调用接口 wx.getUserInfo，从解密数据中获取 UnionID。注意本接口需要用户授权，请开发者妥善处理用户拒绝授权后的情况。

2. 如果开发者帐号下存在同主体的公众号，并且该用户已经关注了该公众号。开发者可以直接通过 wx.login + code2Session 获取到该用户 UnionID，无须用户再次授权。

3. 如果开发者帐号下存在同主体的公众号或移动应用，并且该用户已经授权登录过该公众号或移动应用。开发者也可以直接通过 wx.login + code2Session 获取到该用户 UnionID ，无须用户再次授权。

4. 用户在小程序（暂不支持小游戏）中支付完成后，开发者可以直接通过getPaidUnionId接口获取该用户的 UnionID，无需用户授权。注意：本接口仅在用户支付完成后的5分钟内有效，请开发者妥善处理。

5. 小程序端调用云函数时，如果开发者帐号下存在同主体的公众号，并且该用户已经关注了该公众号，可在云函数中通过 cloud.getWXContext 获取 UnionID。

6. 小程序端调用云函数时，如果开发者帐号下存在同主体的公众号或移动应用，并且该用户已经授权登录过该公众号或移动应用，也可在云函数中通过 cloud.getWXContext 获取 UnionID。

### 浏览器问题

微信使用的是自己家的浏览器内核, X5浏览器, 在使用微信浏览器访问vue+axios的页面时候, 出现了options请求, 但拦截了后续请求. 

发现原因是因为微信浏览器解析 `Allow-Headers` 不允许使用通配符, 改成指定的路径就可以了. 

### 微信SDK接入

##### 获取ACCESS_TOKEN

请求 `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`

ACCESS_TOKEN每7200秒需要重新获取一次. 

##### 获取jsapi_ticket

用第一步拿到的access_token 采用http GET方式请求获得jsapi_ticket(有效期7200秒, 开发者必须在自己的服务全局缓存jsapi_ticket)

 `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi`

返回的结果如下

``` js
{
  "errcode": 0,
  "errmsg": "ok",
  "ticket": "bxLdikRXVbTPdHSM05e5u5sUoXNKd8-41ZO3MhKoyN5OfkWITDGgnr2fwJ0m9E8NYzWKVZvdVtaUgWvsdshFKA",
  "expires_in": 7200
}
```

##### 获取 signature

将 `jsapi_ticket` , `noncestr` , `url` , `timestamp` 按照字典排序拼接成字符串

``` js
jsapi_ticket = sM4AOVdWfPE4DxkXGEs8VMCPGGVi4C3VM0P37wVUCFvkVAy_90u5h9nbSlYy3 - Sl - HhTdfl2fzFy1AOcHKP7qg & noncestr = Wm3WZYTPz0wzccnW× tamp = 1414587457 & url = http: //mp.weixin.qq.com?params=value
```

对字符串做 `sha1` 加密, 得到 `signature`

 `0f9de62fce790f9a083d5c99e95740ceb90c27ed`

##### 前端发起的请求

以上操作都是在后台执行的, 前端请求后端一个接口 `/wxconfig`

``` js
request({
url: '/wxconfig',
params: {
  url: 'http://...'
}
}).then(res => {
  console.log(res)
  // {
  //debug: true, 
  //appId: '', 
  //timestamp: , 
  //nonceStr: '', 
  //signature: '', 
  //jsApiList: [] 
}
})
```

然后调用 `wx.config` 方法, 注入配置信息

``` js
wx.config({
  debug: true, // 开启调试模式, 调用的所有api的返回值会在客户端alert出来, 若要查看传入的参数, 可以在pc端打开, 参数信息会通过log打出, 仅在pc端时才会打印。 
  appId: '', // 必填, 公众号的唯一标识
  timestamp: , // 必填, 生成签名的时间戳
  nonceStr: '', // 必填, 生成签名的随机串
  signature: '', // 必填, 签名
  jsApiList: [] // 必填, 需要使用的JS接口列表
});
wx.ready(function() {
  // config信息验证后会执行ready方法, 所有接口调用都必须在config接口获得结果之后, config是一个客户端的异步操作, 所以如果需要在页面加载时就调用相关接口, 则须把相关接口放在ready函数中调用来确保正确执行。 对于用户触发时才调用的接口, 则可以直接调用, 不需要放在ready函数中。 
});
wx.error(function(res) {
  // config信息验证失败会执行error函数, 如签名过期导致验证失败, 具体错误信息可以打开config的debug模式查看, 也可以在返回的res参数中查看, 对于SPA可以在这里更新签名。 
});
```

### 微信支付, 提示url未注册

微信公众号支付在ios和安卓在面对SPA时内机制不同, 安卓是发起支付的那个页面的url必须注册, 而ios则是入口的页面必须注册.

### 微信openId获取

携带 `appid` 和 `scope` 为参数, 将页面重置到一下url

``` js
https: //open.weixin.qq.com/connect/oauth2/authorize?appid=wx488e92a58d28ac83&redirect_uri=https%3a%2f%2ffile.10010sh.cn%2fWeiting%2f&response_type=code&scope=snsapi_base&state=123#wechat_redirects
```

`redirect_url` 为重定向的url , 且为 `decodeUrl` 转换的url路径, 重定向后在url中携带code参数, 

code参数发送往后台, 获取 `ACCESS_TOKEN` , 可以用来获取用户的 `OPENID`

注意 `redirect_url`

> scope 可选参数为 `snsapi_userinfo` 或者 `snsapi_base` 区别在于, `snsapi_base` 只要用户关注了此公众号, 无需要再请求获取用户的信息, 这种方式也只能获取用户的基本信息, 至于 `snsapi_userinfo` 则可以获取用户的高级信息, 但也需要用户手动授权. 

> 表现就是 `snsapi_base` 会直接跳转 `redirect_url` , 用户只能感觉到刷新操作. 

> `snsapi_userinfo` 表现就是跳转授权页面, 得到许可后, 跳转 `redirect_url` . 

code参数发送往后台, 获取 `ACCESS_TOKEN` , 后台凭借 `ACESS_TOKEN` 以及 `APPid` 以及 `APPsecret` , 可以用来获取用户的 `OPENID` . 

### 附注

#### `unionid` 和 `openid`

`unionid` 和 `openid` 都是某一个公众号用来标记用户唯一性的编码. 

理论上, 用户关注了几个公众号就拥有几个 `openid` , 而 `unionid` 是归属同一个 `开放平台` 下的所有公众号标记同一个用户的编码. 即使用 `unionid` 可以让多个公众号, 认证到同一个用户的身份, 以达成用户信息的互通, 用于免登陆等等. 
