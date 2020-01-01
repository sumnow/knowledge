<!--
Created: Wed Nov 06 2019 18:16:00 GMT+0800 (China Standard Time)
Modified: Sun Nov 17 2019 09:15:07 GMT+0800 (China Standard Time)
-->

# 运行时和编译时

编译时会有一些处理, 例如源文件:

``` JAVA
// JAVA
public class ConstantFolding { 
    static final  int number1 = 1; 
    static final  int number2 = 2; 
    static int number3 = 3; 
    static int number4= 4; 
    public static void main(String[ ] args) { 
        int result1 = number1 * number2;
        int result2 = number3 * number4;
    }
}
```

我们可以反编译生成的class文件, 会发现result1在编译的时候就已经确认值, 

``` JAVA
// JAVA
public class ConstantFolding
{  
    static final int number1 = 1;  
    static final int number2 = 2;  
    static int number3 = 3;  
    static int number4 = 4; 

    public static void main(String[ ] args)
    {      
    int result1 = 2;      
    int result2 = number3 * number4;
    }
}
```

> final 不会改变, 所以编辑器编译的时候就已经给出了最后的值

泛型(又称类型检验): 这个是发生在编译期的. 编译器负责检查程序中类型的正确性, 然后把使用了泛型的代码翻译或者重写成可以执行在当前JVM上的非泛型代码. 这个技术被称为"类型擦除". 换句话来说, 编译器会擦除所有在尖括号里的类型信息, 来保证和版本1.4.0或者更早版本的JRE的兼容性.

这里简要介绍下Interpeter(解释器), JIT(动态编译器), AOT(静态编译器)这三个词儿的概念.

通俗的说解释器就是将程序员编写的代码一条条的转译执行, 如果你熟悉x86上函数参数的传递规范, 熟悉caller, callee的栈结构的话, 那么会很好理解. Dalvik中的解释器, 在解释执行代码的同时, 也维护了一个栈去存放method的传入参数, 局部变量, 保存当前线程的context信息. 解释器的优势在于占用内存少(可以理解为解释一条扔一条), 劣势就是执行效率低下. 但在初期的移动设备上还是比较合适的.

JIT(Just In Time)即动态编译器, 一般JIT会和一个解释器混合执行代码, JIT的作用是将热点代码编译成机器指令, 很明显这样做的缺点就是编译后的机器代码会占用一些存储空间. 所以, 什么样的代码算是热点代码呢? 举常见的Method-Based JIT的栗子吧, 这种JIT在代码解释过程中会针对每个method做profiling(检测), 通俗点就是用一个计数器对函数调用次数做统计, 方法每调用一次, 计数器加1, 调用次数突破threshold(门槛值)之后JIT就会对该方法做编译, 这样下次再调用这个方法的时候就可以直接执行机器指令, 从而提高执行效率, 并且JIT还有一个显著的优势就是它可以通过profiler搜集到的运行时信息做一些aggressive的PGO优化(Profile-Guided Optimization), 通俗的说就是基于动态信息的激进优化.

AOT(Ahead Of Time)即静态编译器, 典型的代表就是C和C＋＋语言的编译器. 它最大的特点就是在代码运行之前先将所有代码编译为机器指令, 显然这样做的优点是执行速度快, 但劣势在于无法做PGO优化, 并且编译后的机器指令会占用一部分存储空间. 感谢Ｒ的提醒, 可多次执行的AOT编译器也可以做一些PGO优化.

伴随着硬件的不断更新换代, 手机一步步走向不缺内存的时代, Android也从最初的纯解释模式到过渡的JIT＋解释模式到如今的AOT时代.

[x86-64 下函数调用及栈帧原理](https://zhuanlan.zhihu.com/p/27339191)

## 脚本语言和解释语言

用编译型语言写的程序执行之前, 需要一个专门的编译过程, 通过编译系统(不仅仅只是通过编译器, 编译器只是编译系统的一部分)把高级语言翻译成机器语言, 把源高级程序编译成为机器语言文件, 比如windows下的exe文件. 以后就可以直接运行而不需要编译了, 因为翻译只做了一次, 运行时不需要翻译, 所以编译型语言的程序执行效率高, 但也不能一概而论, 部分解释型语言的解释器通过在运行时动态优化代码, 甚至能够使解释型语言的性能超过编译型语言.

 
解释则不同, 解释型语言编写的程序不需要编译. 解释型语言在运行的时候才翻译, 比如VB语言, 在执行的时候, 专门有一个解释器能够将VB语言翻译成机器语言, 每个语句都是执行的时候才翻译. 这样解释型语言每执行一次就要翻译一次, 效率比较低.

编译型与解释型, 两者各有利弊. 前者由于程序执行速度快, 同等条件下对系统要求较低, 因此像开发操作系统, 大型应用程序, 数据库系统等时都采用它, 像C/C++, Pascal/Object Pascal(Delphi)等都是编译语言, 而一些网页脚本, 服务器脚本及辅助开发接口这样的对速度要求不高, 对不同系统平台间的兼容性有一定要求的程序则通常使用解释性语言, 如JavaScript, VBScript, Perl, Python, Ruby, MATLAB 等等.

但随着硬件的升级和设计思想的变革, 编译型和解释型语言越来越笼统, 主要体现在一些新兴的高级语言上, 而解释型语言的自身特点也使得编译器厂商愿意花费更多成本来优化解释器, 解释型语言性能超过编译型语言也是必然的.

说到这里, 我们有必要说一下java与C#. 解释型语言和编译型语言的区别

JAVA语言是一种编译型-解释型语言, 同时具备编译特性和解释特性(其实, 确切的说java就是解释型语言, 其所谓的编译过程只是将.java文件编程成平台无关的字节码.class文件, 并不是向C一样编译成可执行的机器语言, 在此请读者注意Java中所谓的"编译"和传统的"编译"的区别). 作为编译型语言, JAVA程序要被统一编译成字节码文件——文件后缀是class. 此种文件在java中又称为类文件.java类文件不能再计算机上直接执行, 它需要被java虚拟机翻译成本地的机器码后才能执行, 而java虚拟机的翻译过程则是解释性的.java字节码文件首先被加载到计算机内存中, 然后读出一条指令, 翻译一条指令, 执行一条指令, 该过程被称为java语言的解释执行, 是由java虚拟机完成的. 而在现实中, java开发工具JDK提供了两个很重要的命令来完成上面的编译和解释(翻译)过程. 两个命令分别是java.exe和javac.exe, 前者加载java类文件, 并逐步对字节码文件进行编译, 而另一个命令则对应了java语言的解释(javac.exe)过程. 在次序上, java语言是要先进行编译的过程, 接着解释执行.

C#语言是编译型语言, 但其"编译"过程比较特殊, 具体说明如下:

C#程序在第一次运行的时候, 会依赖其. NET Frameworker平台, 编译成IL中间码), 然后由JIT compiler翻译成本地的机器码执行. 从第二次在运行相同的程序, 则不需要再执行以上编译和翻译过程, 而是直接运行第一次翻译成的机器码. 所以对于C#来说, 通常第一次运行时间会很长, 但从第二次开始, 程序的执行时间会快很多.

那么, C#为什么要进行两次"编译"呢? 其实, 微软想通过动态编译(由JIT compiler工具实现)来实现其程序运行的最优化. 如果代码在运行前进行动态编译运行, 那么JIT compiler可以很智能的根据你本地机器的硬件条件来进行优化, 比如使用更好的register, 机器指令等等, 而不是像原来那样, build一份程序针对所有硬件的机器跑, 没有充分利用各个机器的条件.

另外, 还有我们经常用到的脚本语言, 比如JavaScript, Shell等语言都是脚本语言, 本质上来说, 脚本语言就是解释型语言.
