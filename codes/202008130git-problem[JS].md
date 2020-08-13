<!--
Created: Thu Aug 13 2020 11:02:30 GMT+0800 (China Standard Time)
Modified: Thu Aug 13 2020 11:07:29 GMT+0800 (China Standard Time)
-->

# git 的一些问题

## 问题1: [sourcetree] 每次都需要输入账号密码

检查是否连接是http, 而非https, 如果是http, 可以换用ssh或者在 `.git/config` 里设置

``` BASH
# BASH
[remote "origin"]
	url = http://user%40email.com:password@gitlab.repository.git
```

即可
