<!--
Created: Tue Jul 28 2020 21:19:54 GMT+0800 (China Standard Time)
Modified: Fri Jul 31 2020 15:29:32 GMT+0800 (China Standard Time)
-->

# Access Token 的机制

`access token` 用于用户的鉴权, 一般都是服务端签发一个若干时间, 如1小时的token, 在1小时后, client 发起请求后都会因为token已经过期, 需要用户重新登录.

但有些时候, 出于用户体验的考虑, 并不希望用户在使用中被刷新token, 因此, 有若干种方式

## 根据 refresh token 更新 

本地再保存一个 `refresh token` , 一旦 `access token` 过期了, 就利用它去兑换一个新的 `access token` .

* 优势: 避免频繁刷新 `token`
* 弊端: 在于存在 `refresh` 泄漏的情况, 可能导致用户的账户不安全, 此外还可以和设备id一起作为入参传递, 只有在常用设备上才允许使用 `refresh` 更新.

## 根据时间更新 access token

client 发起登录请求, server 签发token 同时在redis中留下, 生命时间为1h的token, 然后每次经过redis比对, 发现存在, 就可以直接放行, 然后当redis中token生命不足10min时, server会重新签发token, 更新redis并写给client.

优势: 

劣势: 略微增加了开销
