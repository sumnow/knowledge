<!--
Created: Mon Aug 26 2019 15:20:25 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:20:29 GMT+0800 (China Standard Time)
-->
# 内存

系统分为32位和64位, 代表了内存寻址的大小范围

$$ 2^{32}/1024/1024/1024 = 4 $$

### 单位

##### bit

最小单位, 比特

> 有趣的是网络运营商钟爱使用 mbs 作为网速单位, 但是换算成大家习惯的 Mb/s 就会发现是宣称数字的1/8, 也算是种旧习吧.

##### Byte

字节, 常见的网络计量单位

占2个字节的: 〇

占3个字节的: 基本等同于GBK, 含21000多个汉字

占4个字节的: 中日韩超大字符集里面的汉字, 有5万多个

一个utf8数字占1个字节

一个utf8英文字母占1个字节

8bit = 1Byte

##### MB (Millon Byte)

linux osx 和 window 计量略有不同 1 = 1000或1024个 byte

##### GB (Giga Byte)

