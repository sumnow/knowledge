<!--
Created: Mon Aug 26 2019 15:21:09 GMT+0800 (China Standard Time)
Modified: Thu Apr 02 2020 09:50:51 GMT+0800 (China Standard Time)
-->

# js 精度丢失

js里的计算:

> 0.1+0.2
> 0.30000000000000004
> 0.58*100
> 57.99999999999999

惊不惊喜, 意不意外, 首先要知道二进制如何换算成十进制, ~~当然不是parseInt~~

## 二进制十进制的相互转换

#### 二进制转十进制

以个位数为0, 依次计算2的对应次方之和.

#### 十进制转二进制

整数部分采用除2取余, 逆序排列.

小数部分采用"乘2取整, 顺序排列".

## 浮点数的存储

首先要搞清楚 JavaScript 如何存储小数. 和其它语言如 Java 和 Python 不同, JavaScript 中所有数字包括整数和小数都只有一种类型 — Number. 它的实现遵循 IEEE 754 标准, 使用 64 位固定长度来表示, 也就是标准的 double 双精度浮点数(相关的还有float 32位单精度).

这样的存储结构优点是可以归一化处理整数和小数, 节省存储空间.

64位比特又可分为三个部分:

1. 符号位S: 第 1 位是正负数符号位(sign), 0代表正数, 1代表负数
2. 指数位E: 中间的 11 位存储指数(exponent), 用来表示次方数
3. 尾数位M: 最后的 52 位是尾数(mantissa), 超出的部分自动进一舍零

![img](../img/20190120001.png)

实际数字就可以用以下公式来计算:

$V = (-1)^{S}\times M \times 2^{E}$

注意以上的公式遵循科学计数法的规范, 在十进制是为 `0<M<10` , 到二进行就是 `0<M<2` . 也就是说整数部分只能是1, 所以可以被舍去, 只保留后面的小数部分. 如 4.5 转换成二进制就是 100.1, 科学计数法表示是 1.001*2^2, 舍去1后 M = 001. E是一个无符号整数, 因为长度是11位, 取值范围是 0~2047. 但是科学计数法中的指数是可以为负数的, 所以再减去一个中间数 1023, [0, 1022]表示为负, [1024, 2047] 表示为正. 如4.5 的指数E = `2+1024-1=1025`, 尾数M为 001.

最终的公式变成:

$V = (-1)^{S}\times (M+1) \times 2^{E-1023}$

0.1 转成二进制表示为 0.0001100110011001100(1100循环), 1.100110011001100x2^-4, 所以 E=-4+1023=1019; M 舍去首位的1, 得到 100110011... .

转化成十进制后为 0.100000000000000005551115123126, 因此就出现了浮点误差.

### 为什么 0.1+0.2=0.30000000000000004? 

计算步骤为:

``` 
// 0.1 和 0.2 都转化成二进制后再进行运算
0.00011001100110011001100110011001100110011001100110011010 + 0.0011001100110011001100110011001100110011001100110011010 = 0.0100110011001100110011001100110011001100110011001100111
```

// 转成十进制正好是 0.30000000000000004

可以参考[这篇文章](https://www.cnblogs.com/sunshq/p/7682109.html)

### 为什么 x=0.1 能得到 0.1? 

因为 mantissa 固定长度是 52 位, 再加上省略的一位, 最多可以表示的数是 2^53=9007199254740992, 对应科学计数尾数是 9.007199254740992, 这也是 JS 最多能表示的精度. 它的长度是 16, 所以可以使用 `toPrecision(16)` 来做精度运算, 超过的精度会自动做凑整处理. 于是就有:

``` 
// 返回 0.1000000000000000, 去掉末尾的零后正好为 0.1
0.10000000000000000555.toPrecision(16)
// 但你看到的 `0.1` 实际上并不是 `0.1` 。 不信你可用更高的精度试试:
0.1.toPrecision(21) = 0.100000000000000005551
```

