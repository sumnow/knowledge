<!--
Created: Mon Aug 26 2019 15:20:46 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:20:46 GMT+0800 (China Standard Time)
-->
# end of line

找到两个一毛一样内容的文本文件, 只有一行, 但是却差了1byte, 这就很神奇了

然后特地找了找原因, 原来是因为结束的换行符, 有所不同.

两个文件一个出产于 `window` , 另一个出产于 `osx` 

在每行的结尾, 一般会有个隐藏的字符, 来代表换行

'\r'是回车, 前者使光标到行首, (carriage return)

'\n'是换行, 后者使光标下移一格, (line feed)

在 `window` 看来, `\r\n` 才是让光标到下一行行首, 但 `unix` 系统只用 `\n` 代表到下一行行首

> ps: `osx` 使用过一阵子 `\r` 代表换行, 还好过阵子, 想开了, 选择和 `unix` 保持一致.

