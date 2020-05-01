<!--
Created: Sun Apr 26 2020 17:23:14 GMT+0800 (China Standard Time)
Modified: Sun Apr 26 2020 17:34:00 GMT+0800 (China Standard Time)
-->

# uniapp入门

## uniapp的开发心得

一个uniapp项目, 如果是未来考虑向多平台转换的, 有一些建议

1. 避免使用非多端支持的属性,例如cookie,window.location等等,可以使用localStorage或者全局定义一个栈来模拟路由.
2. 如果不得已必须要使用单平台属性,推荐使用合成法法,按照平台建立文件夹,将方法定义在里面,使用条件编译,减少问题
3. 严格控制关键字, 例如 `id` , `data` 等等, 可能在vue中不是关键字, 但在某些平台无法通过. 
4. 尽量简单. 例如vue支持绑定属性为可执行语句, 但是uniapp里则会出现问题, 遇到这种情况, 应该绑定为函数名,将可执行语句放入函数体内
5. 
