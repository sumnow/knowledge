<!--
Created: Mon Aug 26 2019 15:20:12 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:20:12 GMT+0800 (China Standard Time)
-->
# huffman编码

huffman编码是一种基于二叉树的常用压缩算法, 常用于压缩文本内容等. 

例如压缩文本"beep boop beer!" 

首先统计每个文字出现的频率

![img](../img/20180712001.png)

然后从出现最少的文字开始构建节点, 将出现最少的两个连接同一个父节点, 然后再用来构建新树.

![img](../img/20180712002.png)

![img](../img/20180712003.png)

![img](../img/20180712004.png)

![img](../img/20180712005.png)

![img](../img/20180712006.png)

![img](../img/20180712007.png)

循环步骤到最后

![img](../img/20180712008.png)

然后用0和1来标记路径

![img](../img/20180712009.png)

就可以将文字和编码定义如下

![img](../img/20180712010.png)

最终压缩结果为: 

0011 1110 1011 0001 0010 1010 1100 1111 1000 1001

原字符串为: 

0110 0010 0110 0101 0110 0101 0111 0000 0010 0000 0110 0010 0110 1111 0110 1111 0111 0000 0010 0000 0110 0010 0110 0101 0110 0101 0111 0010 0010 0001

最终只需要一个对应的字符表, 以及这段代码就可以了. 

