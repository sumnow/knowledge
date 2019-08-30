<!--
Created: Fri Aug 30 2019 13:41:55 GMT+0800 (China Standard Time)
Modified: Fri Aug 30 2019 15:01:53 GMT+0800 (China Standard Time)
-->
# Java细节: 字符串的拼接

工作日忙于项目的逻辑实现, 周六有点时间, 从书柜里拿出厚厚的英文版Thinking In Java, 读到了字符串对象的拼接. 参考着这本书做个翻译, 加上自己思考的东西, 写上这篇文章记录一下.

## 不可变的String对象

在Java中, String对象是不可变的(Immutable). 在代码中, 可以创建多个某一个String对象的别名. 但是这些别名都是的引用是相同的.
比如s1和s2都是"droidyue.com"对象的别名, 别名保存着到真实对象的引用. 所以s1 = s2

``` java
// java
    String s1 = "droidyue.com";
    String s2 = s1;
    System.out.println("s1 and s2 has the same reference =" + (s1 == s2));
```

## Java中仅有的重载运算符

在Java中, 唯一被重载的运算符就是字符串的拼接相关的.+, +=. 除此之外, Java设计者不允许重载其他的运算符.

## 拼接剖析

### 真的有性能代价么

了解了上面两点, 可能会有这样的思考, 既然Sting对象不可变, 那么多个(三个及以上)字符串拼接必然产生多余的中间String对象.

``` java
// java
String userName = "Andy";
String age = "24";
String job = "Developer";
String info = userName + age + job;
```

要得到上面的info, 就会userName和age拼接生成临时一个String对象t1, 内容为Andy24, 然后有t1和job拼接生成最终我们需要的info对象, 这其中, 产生了一个中间的t1, 而且t1创建之后, 没有主动回收, 势必会占一定的空间. 如果是一个很多(假设上百个, 多见于对对象的toString的调用)字符串的拼接, 那么代价就更大了, 性能一下会降低很多.

### 编译器的优化处理

真的会有上面的性能代价么, 字符串拼接这么常用, 没有特殊的处理优化么, 答案是有的, 这个优化进行在编译器编译.java到bytecode时.

一个Java程序如果想运行起来, 需要经过两个时期, 编译时和运行时. 在编译时, Java 编译器(Compiler)将java文件转换成字节码. 在运行时, Java虚拟机(JVM)运行编译时生成的字节码. 通过这样两个时期, Java做到了所谓的一处编译, 处处运行.

我们实验一下编译期都做了哪些优化, 我们制造一段可能会出现性能代价的代码.

``` java
// java
public class Concatenation {
  public static void main(String[] args) {
      String userName = "Andy";
      String age = "24";
      String job = "Developer";
      String info = userName + age + job;
      System.out.println(info);
  }
}
```

对Concatenation.java进行编译一下. 得到Concatenation.class

``` bash
# bash
javac Concatenation.java
```

然后我们使用javap反编译一下编译出来的Concatenation.class文件.javap -c Concatenation. 如果没有找到javap命令, 请考虑将javap所在目录加入环境变量或者使用javap的完整路径.

``` bash
# bash
17:22:04-androidyue~/workspace_adt/strings/src$ javap -c Concatenation
Compiled from "Concatenation.java"
public class Concatenation {
  public Concatenation();
    Code:
       0: aload_0
       1: invokespecial #1                  // Method java/lang/Object."<init>":()V
       4: return        
    
  public static void main(java.lang.String[]);
    Code:
       0: ldc           #2                  // String Andy
       2: astore_1
       3: ldc           #3                  // String 24
       5: astore_2
       6: ldc           #4                  // String Developer
       8: astore_3
       9: new           #5                  // class java/lang/StringBuilder
      12: dup
      13: invokespecial #6                  // Method java/lang/StringBuilder."<init>":()V
      16: aload_1
      17: invokevirtual #7                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
      20: aload_2
      21: invokevirtual #7                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
      24: aload_3
      25: invokevirtual #7                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
      28: invokevirtual #8                  // Method java/lang/StringBuilder.toString:()Ljava/lang/String;
      31: astore        4
      33: getstatic     #9                  // Field java/lang/System.out:Ljava/io/PrintStream;
      36: aload         4
      38: invokevirtual #10                 // Method java/io/PrintStream.println:(Ljava/lang/String;)V
      41: return
}
```

其中, ldc, astore等为java字节码的指令, 类似汇编指令. 后面的注释使用了Java相关的内容进行了说明. 我们可以看到上面有很多StringBuilder, 但是我们在Java代码里并没有显示地调用, 这就是Java编译器做的优化, 当Java编译器遇到字符串拼接的时候, 会创建一个StringBuilder对象, 后面的拼接, 实际上是调用StringBuilder对象的append方法. 这样就不会有我们上面担心的问题了.

### 仅靠编译器优化?

既然编译器帮我们做了优化, 是不是仅仅依靠编译器的优化就够了呢, 当然不是.
下面我们看一段未优化性能较低的代码

``` java
// java
public void  implicitUseStringBuilder(String[] values) {
  String result = "";
  for (int i = 0 ; i < values.length; i ++) {
      result += values[i];
  }
  System.out.println(result);
}
```

使用javac编译, 使用javap查看

``` bash
# bash
public void implicitUseStringBuilder(java.lang.String[]);
    Code:
       0: ldc           #11                 // String 
       2: astore_2
       3: iconst_0
       4: istore_3
       5: iload_3
       6: aload_1
       7: arraylength
       8: if_icmpge     38
      11: new           #5                  // class java/lang/StringBuilder
      14: dup
      15: invokespecial #6                  // Method java/lang/StringBuilder."<init>":()V
      18: aload_2
      19: invokevirtual #7                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
      22: aload_1
      23: iload_3
      24: aaload
      25: invokevirtual #7                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
      28: invokevirtual #8                  // Method java/lang/StringBuilder.toString:()Ljava/lang/String;
      31: astore_2
      32: iinc          3, 1
      35: goto          5
      38: getstatic     #9                  // Field java/lang/System.out:Ljava/io/PrintStream;
      41: aload_2
      42: invokevirtual #10                 // Method java/io/PrintStream.println:(Ljava/lang/String;)V
      45: return
```

其中8: if_icmpge 38 和35: goto 5构成了一个循环.8: if_icmpge 38的意思是如果JVM操作数栈的整数对比大于等于(i < values.length的相反结果)成立, 则跳到第38行(System.out).35: goto 5则表示直接跳到第5行.

但是这里面有一个很重要的就是StringBuilder对象创建发生在循环之间, 也就是意味着有多少次循环会创建多少个StringBuilder对象, 这样明显不好. 赤裸裸地低水平代码啊.

稍微优化一下, 瞬间提升逼格.

``` java
// java
public void explicitUseStringBuider(String[] values) {
  StringBuilder result = new StringBuilder();
  for (int i = 0; i < values.length; i ++) {
      result.append(values[i]);
  }
}
```

对应的编译后的信息

``` bash
# bash

public void explicitUseStringBuider(java.lang.String[]);
    Code:
       0: new           #5                  // class java/lang/StringBuilder
       3: dup
       4: invokespecial #6                  // Method java/lang/StringBuilder."<init>":()V
       7: astore_2
       8: iconst_0
       9: istore_3
      10: iload_3
      11: aload_1
      12: arraylength
      13: if_icmpge     30
      16: aload_2
      17: aload_1
      18: iload_3
      19: aaload
      20: invokevirtual #7                  // Method java/lang/StringBuilder.append:(Ljava/lang/String;)Ljava/lang/StringBuilder;
      23: pop
      24: iinc          3, 1
      27: goto          10
      30: return
```

从上面可以看出, 13: if_icmpge 30和27: goto 10构成了一个loop循环, 而0: new #5位于循环之外, 所以不会多次创建StringBuilder.

总的来说, 我们在循环体中需要尽量避免隐式或者显式创建StringBuilder. 所以那些了解代码如何编译, 内部如何执行的人, 写的代码档次都比较高.

