<!--
Created: Mon Aug 26 2019 15:13:56 GMT+0800 (China Standard Time)
Modified: Wed Aug 28 2019 09:59:08 GMT+0800 (China Standard Time)
-->
# 堆和栈的区别 

Contrary to popular belief, there isn't that much of a difference between stacks and heaps in a . NET process. Stacks and heaps are nothing more than ranges of addresses in virtual memory, and there is no inherent advantage in the range of addresses reserved to the stack of a particular thread compared to the range of addresses reserved for the managed heap. Accessing a memory location on the heap is neither faster nor slower than accessing a memory location on the stack. There are several considerations that might, in certain cases , support the claim that memory access to stack locations is faster, overall, than memory access to heap locations. Among them: 

* On the stack, temporal allocation locality (allocations made close together in time) implies spatial locality (storage that is close together in space). In turn, when temporal allocation locality implies temporal access locality (objects allocated together are accessed together), the sequential stack storage tends to perform better with respect to CPU caches and operating system paging systems. 

* Memory density on the stack tends to be higher than on the heap because of the reference type overhead (discussed later in this chapter). Higher memory density often leads to better performance, eg, because more objects fit in the CPU cache. 

* Thread stacks tend to be fairly small – the default maximum stack size on Windows is 1MB, and most threads tend to actually use only a few stack pages. On modern systems, the stacks of all application threads can fit into the CPU cache, making typical stack object access extremely fast. (Entire heaps, on the other hand, rarely fit into CPU caches.)

With that said, you should not be moving all your allocations to the stack! Thread stacks on Windows are limited, and it is easy to exhaust the stack by applying injudicious recursion and large stack allocations.

与通常人们想的相反, 在.net进程中, 堆和栈之间并没有多大的区别, 堆栈不过是虚拟内存的地址排列, 而且在储存特殊线程的栈的地址排列和储存托管堆的地址排列相比, 也没有什么天生的优点, 访问一个堆或者栈上的存储地址, 两者并没有什么不同. 不过在以下这几种情况下, 栈是要比堆快的:

* 在堆栈上, 时间分配的地方(分配时间差不多)意味着空间的地方(分配的空间很临近), 相应的, 同时分配的地方也意味着同时访问这块地区(一起分配的对象一起访问), 这种顺序堆栈存储在CPU高速缓存和操作系统分页系统上表现得(比不是顺序的)更好. 因为堆是随机分配的, 所以不可能出现这种情况.

* 栈上的存储密度一般都比堆高, 因为引用类型的存储开销较低(这一点这章后面会讨论). 高存储密度的效果就是更好的表现, 因为更多的对象更适合在CPU的缓存上跑.

* 线程栈一般都相当小, Windows默认的最大栈内存大小为1MB, 而且大部分线程实际上一般都用很少的堆栈页, 在现代系统上, 所有的应用线程栈都能在CPU缓存上跑, 让典型的栈对象访问非常快(另一方面, 堆很少在CPU缓存上跑, 因为太大了)

虽然上面说了这么多, 但你也不能把所有的分配地址都放到栈上! 线程栈在Windows里面是被限制的, 而且很容易用一些死循环的递归和大的栈分配造成栈溢出.

在栈上分配的内存系统会自动地为其释放, 例如在函数结束时, 局部变量将不复存在, 就是系统自动清除栈内存的结果. 但堆中分配的内存则不然: 一切由你负责, 即使你退出了new表达式的所处的函数或者作用域, 那块内存还处于被使用状态而不能再利用. 好处就是如果你想在不同模块中共享内存, 那么这一点正合你意, 坏处是如果你不打算再利用这块内存又忘了把它释放掉, 那么它就会霸占你宝贵的内存资源直到你的程序退出为止. 

  
栈是机器系统提供的数据结构, 计算机会在底层对栈提供支持: 分配专门的寄存器存放栈的地址, 压栈出栈都有专门的指令执行, 这就决定了栈的效率比较高. 堆则是C/C++函数库提供的, 它的机制是很复杂的, 例如为了分配一块内存, 库函数会按照一定的算法(具体的算法可以参考数据结构/操作系统)在堆内存中搜索可用的足够大小的空间, 如果没有足够大小的空间(可能是由于内存碎片太多), 就有可能调用系统功能去增加程序数据段的内存空间, 这样就有机会分到足够大小的内存, 然后进行返回. 显然, 堆的效率比栈要低得多. 
  
C/C++中, 所有的方法调用都是通过栈来进行的, 所有的局部变量, 形式参数都是从栈中分配内存空间的. 实际上也不是什么分配, 只是从栈顶向上用就行, 就好像工厂中的传送带(conveyorbelt)一样, StackPointer会自动指引你到放东西的位置, 你所要做的只是把东西放下来就行. 退出函数的时候, 修改栈指针就可以把栈中的内容销毁. 这样的模式速度最快, 当然要用来运行程序了. 需要注意的是, 在分配的时候, 比如为一个即将要调用的程序模块分配数据区时, 应事先知道这个数据区的大小, 也就说是虽然分配是在程序运行时进行的, 但是分配的大小多少是确定的, 不变的, 而这个"大小多少"是在编译时确定的, 不是在运行时. 看看LINUX内核源代码的存储管理部分, 就知道操作系统是如何管理内存资源的. 每个进程都有独立的地址空间, 不过这只是虚地址, 这也是我们通常所看到的地址, 所以我们现在写程序时不会像早期的程序员担心内存不够用, 对于LINUX用户进程最大可用3G的地址空间, 另外的1G留给内核. 这里讨论的堆或栈都是在虚拟地址空间上, 各个进程都有自己独立堆、栈空间, 否则, 就象楼上一些哥们说的, 一个进程飞了, 那所有进程都得死. 
  
至于堆和栈哪个更快, 从两方面来考虑:1. 分配和释放, 堆在分配和释放时都要调用函数(MALLOC, FREE), 比如分配时会到堆空间去寻找足够大小的空间(因为多次分配释放后会造成空洞), 这些都会花费一定的时间, 具体可以看看MALLOC和FREE的源代码, 他们做了很多额外的工作, 而栈却不需要这些.2. 访问时间, 访问堆的一个具体单元, 需要两次访问内存, 第一次得取得指针, 第二次才是真正得数据, 而栈只需访问一次. 另外, 堆的内容被操作系统交换到外存的概率比栈大, 栈一般是不会被交换出去的. 
  
综上所述, 站在操作系统以上的层面来看, 栈的效率比堆高, 对于应用程序员, 这些都是透明的, 操作系统做了很多我们看不到的东西.

### C++内存分区以及堆内存和栈内存

#### 栈区(stack)— 由编译器自动分配释放

存放函数的参数值, 局部变量的值等. 其操作方式类似于数据结构中的栈; 

在函数完成执行, 系统自行释放栈区内存, 不需要用户管理. 整个程序的栈区的大小可以在编译器中由用户自行设定, VS中默认的栈区大小为1M, 可通过VS手动更改栈的大小.64bits的Linux默认栈大小为10MB, 可通过ulimit -s临时修改.

#### 堆区(heap)— 一般由程序员分配释放

若程序员不释放, 程序结束时可能由OS回收. 注意它与数据结构中的堆是两回事, 分配方式倒是类似于链表, 通常是malloc或者new进行堆的申请, 堆的总大小为机器的虚拟内存的大小; 

注意:  new操作符本质上是使用了malloc进行内存的申请, new和malloc的区别如下: 

1. malloc是C语言中的函数, 而new是C++中的操作符. 
2. malloc申请之后返回的类型是void*, 而new返回的指针带有类型. 
3. malloc只负责内存的分配而不会调用类的构造函数, 而new不仅会分配内存, 而且会自动调用类的构造函数.

### 全局区(静态区)(static)

全局变量和静态变量的存储是放在一块的. 初始化的全局变量和静态变量在一块区域, 未初始化的全局变量和未初始化的静态变量在相邻的另一块区域. 静态存储区内的变量在程序编译阶段已经对运行时的内存进行分配并初始化. 这块内存在程序的整个运行期间都存在, 程序结束后有系统释放; 

### 常量区

常量字符串就是放在这里的, 程序结束后由系统释放.

#### 程序代码区

存放函数体的二进制代码. 所有代码, 编译成二进制后存放于代码区, 文字常量存放于代码区, 是不可寻址的.

但是为什么这么分区呢?

``` c
// code
//main.cpp
int a = 0; //全局初始化区
char *p1; //全局未初始化区
main()
{
   int b; //栈
   char s[] = "abc"; //栈，注意此处是数组
   char *p2; //栈
   char *p3 = "123456"; // "123456\0" 放在常量区，p3在栈上
   static int c =0； //全局（静态）初始化区

   p1 = (char *)malloc(10);  //分配得来的10和20字节的区域就在堆区, 但是注意p1、p2本身是在栈中的
   p2 = (char*)malloc(20);  

   //"123456" 在代码区（不可寻址），"123456\0" 放在常量区
   //编译器可能会将它与p3所指向的"123456"优化成一个地方
   strcpy(p1,"123456");
} 
```

看到这里, 大家可能有个疑问, "123456"到底在代码区还是在常量区, 我个人的理解是, "123456"本身肯定是在代码区, 是不可寻址的, 但是运行时指针指向他们的常量区地址(比如上述的字符串 "123456" 运行时在内存中是 "123456\0").

但是分区方案跟编译器本身关系很大, 不同编译器分配内存可能不尽相同, 但是也不会有太大的不同.

### 对分区的归纳

数据区: 堆, 栈, 静态存储区, 常量区. 

静态存储区: 全局区(全局变量区)和静态变量区(静态区). 

代码区: 存放程序编译后的二进制代码, 不可寻址区.

关于const可修改和常量区的思考

``` c
// code
#include <iostream>
using namespace std;

//const int j=5; //运行时报错

void ShowValue(const int &i) {
    cout<<i<<endl;
}

int main() 
{
    const int j=5;
    void *p=(void *)&j;
    int *ptr=(int *)p;
    (*ptr)++;
    // cout << j << endl; //还是会显示5，因为编译器优化的时候将j替换为文字常量5
    // 但如果是int i=5; const int j=i; 则无法替换，直接输出j为6
    ShowValue(j); //显示6
    
    return 0; 
}
```

如上栈上申请const变量可修改, 但是全局的const会运行时报错, 全局变量const, 让数字存放在常量区. 字符串会放在常量区, 有复用的可能.

字符串也是可以修改的, 只要在栈上就可以:

``` c
// code
#include <iostream>
using namespace std;

//const int j=5;

void ShowValue(const char* i) {
    cout<<i<<endl;
}

int main() 
{
    const char j[]="123"; //如果是 char *j 就会出现问题（虽然没有报错）
    void *p=(void *)&j;
    char *ptr=(char *)p;
    ptr[1]='d';
    ShowValue(j);
    
    return 0; 
}
```

const在C语言的意思并不是常量, 而是只读变量. 只读的全局变量会放在只读页面, 同时编译时做类型检查. 而只读的局部变量只会做类型检查, 语法上不可修改而已, 通过把地址强制转换一下还是可以修改的, 比如 (int )&j = 12; 所以在汇编语言里还是有只读全局变量的概念, 但是只读的局部变量却是实现不了了.

### 堆 VS 栈

#### 申请后系统响应

栈: 只要栈的剩余空间大于所申请空间, 系统将为程序提供内存, 否则将报异常提示栈溢出.

堆: 首先应该知道操作系统有一个记录空闲内存地址的链表, 当系统收到程序的申请时, 会遍历该链表, 寻找第一个空间大于所申请空间的堆结点, 然后将该结点从空闲结点链表中删除, 并将该结点的空间分配给程序, 另外, 对于大多数系统, 会在这块内存空间中的首地址处记录本次分配的大小, 这样, 代码中的delete语句才能正确的释放本内存空间. 另外, 由于找到的堆结点的大小不一定正好等于申请的大小, 系统会自动的将多余的那部分重新放入空闲链表中. 
注意这里, malloc分配失败会返回空指针, 但new分配失败只会抛出异常, 需要

``` js
catch (const bad_alloc & e) {
    return -1;
}
```

#### 申请大小限制

栈: 在Windows下, 栈是向低地址扩展的数据结构, 是一块连续的内存的区域. 这句话的意思是栈顶的地址和栈的最大容量是系统预先规定好的, 在WINDOWS下, 由编译器决定栈的大小(一般1M/2M), 如果申请的空间超过栈的剩余空间时, 将提示overflow. 因此, 能从栈获得的空间较小.

堆: 堆是向高地址扩展的数据结构, 是不连续的内存区域. 这是由于系统是用链表来存储的空闲内存地址的, 自然是不连续的, 而链表的遍历方向是由低地址向高地址. 堆的大小受限于计算机系统中有效的虚拟内存. 由此可见, 堆获得的空间比较灵活, 也比较大.

#### 申请效率比较

栈: 由系统自动分配, 速度较快. 但程序员是无法控制的.

堆: 由new分配的内存, 一般速度比较慢, 而且容易产生内存碎片, 不过用起来最方便. 另外, 在WINDOWS下, 最好的方式是用VirtualAlloc分配内存, 他不是在堆, 也不是在栈是直接在进程的地址空间中保留一快内存, 虽然用起来最不方便. 但是速度快, 也最灵活.

#### 堆和栈中的存储内容

栈: 在函数调用时, 第一个进栈的是主函数中后的下一条指令(函数调用语句的下一条可执行语句)的地址, 然后是函数的各个参数, 在大多数的C编译器中, 参数是由右往左入栈的, 然后是函数中的局部变量. 注意静态变量是不入栈的. 当本次函数调用结束后, 局部变量先出栈, 然后是参数, 最后栈顶指针指向最开始存的地址, 也就是主函数中的下一条指令, 程序由该点继续运行.

堆: 一般是在堆的头部用一个字节存放堆的大小. 堆中的具体内容由程序员安排.

#### 存取效率

``` code
// code

chars[] = "abc"; //栈 
char*p3 = "123456"; //123456\0 在常量区，p3在栈上。
```

abc是在运行时刻赋值的, 而123456是在编译时就确定的, 但是, 在以后的存取中, 在栈上的数组比指针所指向的字符串(例如堆)快.

#### 小心内存泄露

在堆上分配内存很容易造成内存泄漏, 这是C/C++的最大的"克星", 如果你的程序要稳定, 那么就不要出现MemoryLeak. 所以, 在使用malloc系统函数(包括calloc, realloc)时千万要小心.

记得有一个UNIX上的服务应用程序, 大约有几百的C文件编译而成, 运行测试良好, 等使用时, 每隔三个月系统就是down一次, 搞得许多人焦头烂额, 查不出问题所在. 只好, 每隔两个月人工手动重启系统一次. 出现这种问题就是MemeryLeak在做怪了, 在C/C++中这种问题总是会发生, 所以一定要小心.

对于malloc和free的操作有以下规则: 

1. 配对使用, 有一个malloc, 就应该有一个free.(C++中对应为new和delete.  
2. 尽量在同一层上使用, 不要malloc在函数中, 而free在函数外. 最好在同一调用层上使用这两个函数. 
3. malloc分配的内存一定要初始化.free后的指针一定要设置为NULL. 

注: 虽然现在的操作系统(如: UNIX和Win2k/NT)都有进程内存跟踪机制, 也就是如果你有没有释放的内存, 操作系统会帮你释放. 但操作系统依然不会释放你程序中所有产生了MemoryLeak的内存, 所以, 最好还是你自己来做这个工作.(有的时候不知不觉就出现MemoryLeak了, 而且在几百万行的代码中找无异于海底捞针, Rational有一个工具叫Purify, 可能很好的帮你检查程序中的MemoryLeak)
