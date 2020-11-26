<!--
Created: Tue Nov 24 2020 01:16:57 GMT+0800 (China Standard Time)
Modified: Tue Nov 24 2020 01:17:18 GMT+0800 (China Standard Time)
-->

# linux alias

linux内, 使用别名快捷输入命令, 例如 `vim /etc/profile` (需要在root用户下执行, 使修改在所有用户下有效)

在文件结尾添加别名

``` BASH
# BASH
# 注意等号左右不能有空格
alias cd1='cd ..'
alias cd2='cd ../..'
alias cd3='cd ../../..'
alias cd4='cd ../../../..'
alias cd5='cd ../../../../..'
alias cd6='cd ../../../../../..'
```