<!--
Created: Mon Aug 26 2019 15:23:01 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:23:01 GMT+0800 (China Standard Time)
-->
# 计算机基础

## 计算机是如何实现编程的

这个问题可以分为几个步骤来考虑, 计算机是如何实现逻辑的, 计算机是如何实现保存的

### 实现逻辑

计算机实现逻辑的方式, 是依赖众多的门电路的实现. 包括与门电路、或门电路、非门电路、异或电路

### 计算机的保存

计算机的保存和U盘之类的类似, 都是通过保存电子, 来完成状态保存的.

[U盘是如何保存数据的]()

## 逻辑完备性

这个世界中的万事万物都可以用三种顺序来表示出来: 顺序、选择和循环. 完备的意思就是说某个理论系统可以涵盖所有的情况, 没有例外.

## 定义指令

然后你就需要学习一下计算机是如何思考的了.

计算机很笨, 它只会做人设计好的事情, 人设计的过程叫做编程, 你可以写C语言代码, 通过一些软件把它翻译成机器能识别的二进制指令比如我要计算A+B , 结果为 C.

汇编指令就是MOV AX A; MOV BX B; ADD AX BX; MOV C CX; (不要计较代码规范, 语法正误)意思就是把A存进AX寄存器, 把B存进BX寄存器, 然把AX、BX加起来, 加起来送给哪呢, 假设电路设计了出口连到了CX寄存器, 就把CX寄存器的内容送给C, 就执行完了这段代码. A、B、C都放在了内存里, 假设放在了内存的123号单元里, 就要告诉把内存1号和2号单元的数拿出来送到运算器, 运算器的输出送到3号单元. 这里涉及到了数据的地址和数据要进行的运算和数据本身, 那么我们规定MOV操作翻译成二进制数0001, ADD翻译成0010, AX用0001, BX用0010, CX用0100代替, 那么我们可以设计一句话, 这句话要说明我们要求计算机做什么运算, 让计算机里的哪些数做运算, 比如说【加 一号寄存器的数 二号寄存器的数】那么可以写成 0010 0001 0010 , 或者【传送  一号寄存器  内存一号单元的数】那么以上那个加法运算翻译成机器指令就是

``` shell
0001 0001 0001               //MOV AX A    传送 一号寄存器  一号内存的数
0001 0010 0010               //MOV BX B    传送 二号寄存器  二号内存的数          
0010 0001 0010              //ADD AX BX   加    一号寄存器的数   二号寄存器的数(这里隐含着结果放进三号寄存器, 在布线时隐含的)0001 0011 0100                //MOV C CX   传送 三号内存的数 三号寄存器
```

那这一系列机器指令也要放进计算机里, 之前那些数放进了计算机的内存里, 这些指令也是放进计算机的内存里, 采用一系列布线来是计算机自动读取指令, 执行指令, 比如之前提到的计数器, 可以把它作为地址控制器, 每次加一, 就可以每次读出下一条指令了.

过程就是, 时钟脉冲是一个脉冲信号, 每次脉冲跳动, 地址生成器生产一个地址, 告诉内存, 内存会把对应单元的指令取出来解析, 告诉运算器选择哪个运算, 告诉内存中哪个数据该出来进行计算了. 计算完了, 再取下一条指令.
