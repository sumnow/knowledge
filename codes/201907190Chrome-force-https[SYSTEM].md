<!--
Created: Mon Aug 26 2019 15:22:53 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:22:53 GMT+0800 (China Standard Time)
-->
# chrome 强制https

## 问题描述

在chrome中曾经打开过https的网页, 会默认转成https, 即使已经手动输入http头了.

但是如果在本地开发需要使用hosts到本地项目的时候, 会因为无法访问https而无法打开页面.

## 解决方法

打开 `chrome://net-internals/#hsts` , 在 `Delete domain security policies` 中输入domain, 并删除即可.

