<!--
Created: Wed Sep 25 2019 18:25:05 GMT+0800 (China Standard Time)
Modified: Wed Sep 25 2019 18:25:05 GMT+0800 (China Standard Time)
-->
# 【读薄 CSAPP】玖 并行与同步

[捌 网络编程](./201909090network-programming[SYSTEM].md)

---

进程和线程有什么差别? 超线程又是什么意思? 为什么多线程能够提高程序执行的速度? 是所有情况都适用吗? 并行程序有没有什么限制? 这一讲我们来聊聊并行与同步这两个『继往开来』的概念. 在今后的学习中, 大家一定会不止一次发现, 很多问题说来说去, 其实就是并行与同步的问题.

## 学习目标

* 理解并行的几个层次: 进程, 事件, 线程
* 了解 Posix 标准
* 了解同步问题产生的背景, 以及信号量的工作机制
* 了解『生产者-消费者问题』和『读者-写者问题』
* 理解线程安全和一致性问题

## 并行方法

首先一定要清楚地意识到:『并行编程不简单』! 最主要的原因恐怕就是我们自己的大脑, 人脑实际上是一个非常精妙的系统, 所采取的并行策略是一明一暗两条线, 但是对于明线来说, 是线性的, 于是就和计算机中并行的概念冲突了. 另外时间这个概念也是线性的, 这就导致了想要处理好并行程序可能出现的各种问题几乎是不可能的(或者常常要出错).

常见的错误有仨: 竞争条件[2], 死锁[3]和活锁[4], 尤其是在现在的多核处理器架构中, 更容易出现这类并行问题.

我们前面实现的服务器, 一次只能处理一个请求, 只有当前的请求处理完了, 才能继续处理下一个.

![img](../img/20190910002.jpg)

这里具体讲解一下: Client 1 向 Server 发送连接请求(connect), Server 接受(accept)之后开始等待 Client 1 发送请求(也就是开始 read), 这之后 Client 1 发送具体的内容(write)后转为等待响应(call read), Server 的 read 接收到了内容之后, 发送响应(write) 后仅需进入等待(read), 而 Cli- ent 1 接收到了响应(ret read), 最后根据用户指令退出(close).- 

而只有当 Client 1 断开之后, Server 才会处理 Client 2 的请求, 从图中也可以看到这一点. 具体是在哪里等待呢? 因为 TCP 会缓存, 所以实际上 Client 2 在 ret read 之前进行等待, 为了解决这个问题, 我们可以使用并行的策略, 同时处理不同客户端发来的请求.

总体来说, 根据系统机制的层级和实现方式, 有下面三大类方法:

* 基于进程
  + 内核自动管理多个逻辑流
  + 每个进程有其私有的地址空间(也就是说进程切换的时候需要保存和载入数据)
* 基于事件
  + 由程序员手动控制多个逻辑流
  + 所有的逻辑流共享同一个地址空间
  + 这个技术称为 I/O multiplexing
* 基于线程
  + 内核自动管理多个逻辑流
  + 每个线程共享地址空间
  + 属于基于进程和基于事件的混合体

### 基于进程

为每个客户端分离出一个单独的进程, 是建立了连接之后才开始并行, 连接的建立还是串行的.

具体的代码为

``` c
/* c */
void sigchld_handler(int sig){
    while (waitpid(-1, 0, WNOHANG) > 0)
        ;
    return;
    // Reap all zombie children
}

int main(int argc, char **argv) {
    int listenfd, connfd;
    socklen_t clientlen;
    struct sockaddr_storage clientaddr;
    
    Signal(SIGCHLD, sigchld_handler);
    listenfd = Open_listenfd(argv[1]);
    while (1) {
        clientlen = sizeof(struct sockaddr_storage);
        connfd = Accept(listenfd, (SA *) &clientaddr, &clientlen);
        if (Fork() == 0) {
            Close(listenfd); // Child closes its listening socket
            echo(connfd); // Child services client
            Close(connfd); // Child closes connection with client
            exit(0); // Child exits
        }
        Close(connfd); // Parent closes connected socket (important!)
    }
}
```

这里用文字描述一下流程: 首先, 服务器在 accept 函数中(对应 listenfd)等待连接请求, 然后客户端通过调用 connect 函数发送连接请求, 最后服务器在 accept 中返回 connfd 并且 fork 一个子进程来处理客户端连接, 连接建立在 listenfd 和 connfd 间.

整个执行模型中:

* 每个客户端由独立子进程处理
  + 必须回收僵尸进程, 来避免严重的内存泄露
* 不同进程之间不共享数据
* 父进程和子进程都有 listenfd 和 connfd, 所以在父进程中需要关闭 connfd, 在子进程中需要关闭 listenfd
  + 内核会保存每个 socket 的引用计数, 在 fork 之后 refcnt(connfd) = 2, 所以在父进程需要关闭 connfd, 这样在子进程结束后引用计数才会为零

基于进程的方式可以并行处理连接, 除了共享已打开的 file table 外, 无论是 descriptor 还是全局变量都不共享, 不大容易造成同步问题, 比较简单粗暴. 但是带来了额外的进程管理开销, 并且进程间通讯不便, 需要使用 IPC (interprocess communication).

### 基于事件

服务器会维护一个 connection 数组, 包含若干 connfd, 每个输入请求都被当做事件, 然后每次从已有的事件中选取一个进行处理.

基于实践的好处在于只使用一个逻辑控制流和地址空间, 可以利用调试器进行单步调试(其他的方法因为并行的缘故基本没办法调试), 也不会有进程/线程控制的开销. 但是相比之下, 代码的逻辑复杂度会比较高, 很难进行精细度比较高的并行, 也无法发挥多核处理器的全部性能.

### 基于线程

和基于进程的方法非常相似, 唯一的区别是这里用线程. 进程其实是比较『重』的, 一个进程包括进程上下文, 代码, 数据和栈. 如果从线程的角度来描述, 一个进程则包括线程, 代码, 数据和上下文. 也就是说, 线程作为单独可执行的部分, 被抽离出来了, 一个进程可以有多个线程.

每个线程有自己的线程 id, 有自己的逻辑控制流, 也有自己的用来保存局部变量的栈(其他线程可以修改)但是会共享所有的代码, 数据以及内核上下文.

和进程不同的是, 线程没有一个明确的树状结构(使用 fork 是有明确父进程子进程区分的). 和进程中『并行』的概念一样, 如果两个线程的控制流在时间上有『重叠』(或者说有交叉), 那么就是并行的.

进程和线程的差别已经被说了太多次, 这里简单提一下. 相同点在于, 它们都有自己的逻辑控制流, 可以并行, 都需要进行上下文切换. 不同点在于, 线程共享代码和数据(进程通常不会), 线程开销比较小(创建和回收)

#### POSIX Threads

Pthreads 是一个线程库, 基本上只要是 C 程序能跑的平台, 都会支持这个标准. Pthreads定义了一套C语言的类型, 函数与常量, 它以 pthread.h 头文件和一个线程库实现.

Pthreads API 中大致共有 100 个函数调用, 全都以 pthread_ 开头, 并可以分为四类:

1. 线程管理，例如创建线程，等待(join)线程，查询线程状态等。
2. Mutex：创建、摧毁、锁定、解锁、设置属性等操作
3. 条件变量（Condition Variable）：创建、摧毁、等待、通知、设置与查询属性等操作
4. 使用了读写锁的线程间的同步管理

POSIX 的 Semaphore API 可以和 Pthreads 协同工作, 但这并不是 Pthreads 的标准. 因而这部分API是以 sem_ 打头, 而非 pthread_.

我们用线程的方式重写一次之前的 Echo Server

``` c
/* c */
// Thread routine
void *thread(void *vargp){
    int connf = *((int *)vargp);
    // detach 之后不用显式 join，会在执行完毕后自动回收
    Pthread_detach(pthread_self());
    Free(vargp);
    echo(connfd);
    // 一定要记得关闭！
    Close(connfd);
    return NULL;
}

int main(int argc, char **argv) {
    int listenfd, *connfdp;
    socklen_t clientlen;
    struct sockaddr_storage clientaddr;
    pthread_t tid;
    
    listenfd = Open_listenfd(argv[1]);
    while (1) {
        clientlen = sizeof(struct sockaddr_storage);
        // 这里使用新分配的 connected descriptor 来避免竞争条件
        connfdp = Malloc(sizeof(int));
        *connfdp = Accept(listenfd, (SA *) & clientaddr, &clientlen);
        Pthread_create(&tid, NULL, thread, connfdp);
    }
}
```

在这个模型中, 每个客户端由单独的线程进行处理, 这些线程除了线程 id 之外, 共享所有的进程状态(但是每个线程有自己的局部变量栈).

使用线程并行, 能够在不同的线程见方便地共享数据, 效率也比进程高, 但是共享变量可能会造成比较难发现的程序问题, 很难调试和测试.

## 小结

这里简单归纳下三种并行方法的特点:

* 基于进程
  + 难以共享资源, 但同时也避免了可能带来的共享问题
  + 添加/移除进程开销较大
* 基于事件
  + 非常底层的实现机制
  + 使用全局控制而非调度
  + 开销比较小
  + 但是无法提供精细度较高的并行
  + 无法充分利用多核处理器
* 基于线程
  + 容易共享资源, 但也容易出现问题
  + 开销比进程小
  + 对于具体的调度可控性较低
  + 难以调试(因为事件发生的顺序不一致)

## 同步

### 共享变量
在介绍同步之前, 我们需要弄清楚一个定义, 什么是 Shared variable(共享变量)?

> A variable x is shared if and only if multiple threads reference some instance of x

另外一个需要注意的是线程的内存模型, 因为概念上的模型和实际的模型有一些差异, 非常容易导致错误.

在概念上的模型中:

* 多个线程在一个单独进程的上下文中运行
* 每个线程有单独的线程上下文(线程 ID, 栈, 栈指针, PC, 条件码, GP 寄存器)
* 所有的线程共享剩下的进程上下文
  + Code, data, heap, and shared library segments of the process virtual address space
  + Open files and installed handlers

在实际的模型中, 寄存器的值虽然是隔离且被保护的, 但是在栈中的值并不是这样的(其他线程也可以访问).

我们来看一个简单的例子:

``` c
/* c */
char **ptr; // 全局变量

int main()
{
    long i;
    pthread_t tid;
    char *msgs[2] = {
        "Good Day!",
        "Bad Day!"
    };
}

ptr = msgs;
for (i = 0; i < 2; i++)
    Pthread_create(&tid, NULL, thread, (void *)i);
Pthread_exit(NULL);
}

void *thread(void *vargp)
{
    long myid = (long)vargp;
    static int cnt = 0;
    
    // 这里每个线程都可以访问 ptr 这个全局变量
    printf("[%ld]: %s (cnt=%d)\n", myid, ptr[myid], ++cnt);
    return NULL;
}
```

这里有几个不同类型的变量, 我们一一来看一下:

* 全局变量: 在函数外声明的变量
  + 虚拟内存中有全局唯一的一份实例
* 局部变量: 在函数内声明, 且没有用 static 关键字
  + 每个线程的栈中都保存着对应线程的局部变量
* 局部静态变量: 在函数内用 static 关键字声明的变量
  + 虚拟内存中有全局唯一的一份实例

具体来分析下, 一个变量只有在被多个线程引用的时候才算是共享, 在这个例子中, 共享变量有 ptr, cnt 和 msgs; 非共享变量有 i 和 myid.

### 关键区域 Critical Section

这一部分我们用一个具体的例子来进行讲解, 看看如何用多个线程来计数:

``` c
/* c */
// 全局共享变量
volatile long cnt = 0; // 计数器

int main(int argc, char **argv)
{
    long niters;
    pthread_t tid1, tid2;
    
    niter2 = atoi(argv[1]);
    Pthread_create(&tid1, NULL, thread, &niters);
    Pthread_create(&tid2, NULL, thread, &niters);
    Pthread_join(tid1, NULL);
    Pthread_join(tid2, NULL);
    
    // 检查结果
    if (cnt != (2 * niters))
        printf("Wrong! cnt=%ld\n", cnt);
    else
        printf("Correct! cnt=%ld\n", cnt);
    exit(0);
}
```

运行之后发现不是每次都出现同样的结果, 我们把操作 cnt 的部分抽出来单独看一看:

线程中循环部分的代码为:

``` c
/* c */

for (i = 0; i < niters; i++)
    cnt++;
```

对应的汇编代码为

``` bash
# bash
    # 以下四句为 Head 部分，记为 H
    movq    (%rdi), %rcx
    testq   %rcx, %rcx
    jle     .L2
    movl    $0, %eax
.L3:
    movq    cnt(%rip), %rdx # 载入 cnt，记为 L
    addq    $1, %rdx        # 更新 cnt，记为 U
    movq    %rdx, cnt(%rip) # 保存 cnt，记为 S
    # 以下为 Tail 部分，记为 T
    addq    $1, %rax
    cmpq    %rcx, %rax
    jne     .L3
.L2:
```

这里有一点需要注意, cnt 使用了 volatile 关键字声明, 意思是不要在寄存器中保存值, 无论是读取还是写入, 都要对内存操作(还记得 write-through 吗?). 这里把具体的步骤分成 5 步: HLUST, 尤其要注意 LUS 这三个操作, 这三个操作必须在一次执行中完成, 一旦次序打乱, 就会出现问题, 不同线程拿到的值就不一定是最新的.

更多相关内容, 可以参考Synchronization - Basics, 其中提到了利用图表来描述关键区域的方法, 感兴趣可以看一下.

### 信号量

针对关键区域的问题, 我们可以考虑用信号量来限制程序的执行顺序. 计数信号量具备两种操作动作, 称为 V(又称signal())与 P(wait()). V 操作会增加信号量 S 的数值, P 操作会减少. 运作方式:

1. 初始化，给与它一个非负数的整数值。
2. 运行 P，信号量 S 的值将被减少。企图进入临界区块的进程，需要先运行 P。当信号量 S 减为负值时，进程会被挡住，不能继续；当信号量S不为负值时，进程可以获准进入临界区块。
3. 运行 V，信号量 S 的值会被增加。结束离开临界区块的进程，将会运行 V。当信号量 S 不为负值时，先前被挡住的其他进程，将可获准进入临界区块。

我们来看看如何修改可以使得前面我们的计数程序正确运行.

``` c
/* c */
// 先定义信号量
volatile long cnt = 0;
sem_t mutex;

Sem_init(&mutex, 0, 1);

// 在线程中用 P 和 V 包围关键操作
for (i = 0; i < niters; i++)
{
    P(&mutex);
    cnt++;
    V(&mutex);
}
```

在使用线程时, 脑中需要有一个清晰的分享变量的概念, 共享变量需要互斥访问, 而 Semaphores 是一个基础的机制.

### 生产者-消费者问题

![img](../img/20190910002.jpg)

具体的同步模型为:

* 生产者等待空的 slot, 把 item 存储到 buffer, 并通知消费者
* 消费整等待 item, 从 buffer 中移除 item, 并通知生产者

主要用于

* 多媒体处理
  + 生产者生成 MPEG 视频帧, 消费者进行渲染
* 事件驱动的图形用户界面
  + 生产者检测到鼠标点击, 移动和键盘输入, 并把对应的事件插入到 buffer 中
  + 消费者从 buffer 中获取事件, 并绘制到到屏幕上

接下来我们实现一个有 n 个元素 buffer, 为此, 我们需要一个 mutex 和两个用来计数的 semaphore:

* mutex: 用来保证对 buffer 的互斥访问
* slots: 统计 buffer 中可用的 slot 数目
* items: 统计 buffer 中可用的 item 数目

我们直接来看代码, 就比较清晰了

``` c
/* c */

// 头文件 sbuf.h
// 包括几个基本操作
#include "csapp.h"

typedef struct {
    int *buf;    // Buffer array
    int n;       // Maximum number of slots
    int front;   // buf[(front+1)%n] is first item
    int rear;    // buf[rear%n] is the last item
    sem_t mutex; // Protects accesses to buf
    sem_t slots; // Counts available slots
    sem_t items; // Counts available items
} sbuf_t;

void sbuf_init(sbuf_t *sp, int n);
void sbuf_deinit(sbuf_t *sp);
void sbuf_insert(sbuf_t *sp, int item);
int sbuf_remove(sbuf_t *sp);
```

然后是具体的实现

``` c
/* c */

// sbuf.c

// Create an empty, bounded, shared FIFO buffer with n slots
void sbuf_init(sbuf_t *sp, int n) {
    sp->buf = Calloc(n, sizeof(int));
    sp->n = n;                  // Buffer holds max of n items
    sp->front = sp->rear = 0;   // Empty buffer iff front == rear
    Sem_init(&sp->mutex, 0, 1); // Binary semaphore for locking
    Sem_init(&sp->slots, 0, n); // Initially, buf has n empty slots
    Sem_init(&sp->items, 0, 0); // Initially, buf has 0 items
}

// Clean up buffer sp
void sbuf_deinit(sbuf_t *sp){
    Free(sp->buf);
}

// Insert item onto the rear of shared buffer sp
void sbuf_insert(sbuf_t *sp, int item) {
    P(&sp->slots);                        // Wait for available slot
    P(&sp->mutext);                       // Lock the buffer
    sp->buf[(++sp->rear)%(sp->n)] = item; // Insert the item
    V(&sp->mutex);                        // Unlock the buffer
    V(&sp->items);                        // Announce available item
}

// Remove and return the first tiem from the buffer sp
int sbuf_remove(sbuf_f *sp) {
    int item;
    P(&sp->items);                         // Wait for available item
    P(&sp->mutex);                         // Lock the buffer
    item = sp->buf[(++sp->front)%(sp->n)]; // Remove the item
    V(&sp->mutex);                         // Unlock the buffer
    V(&sp->slots);                         // Announce available slot
    return item;
}
```

### 读者-写者问题

是互斥问题的通用描述, 具体为:

* 读者线程只读取对象
* 写者线程修改对象
* 写者对于对象的访问是互斥的
* 多个读者可以同时读取对象

常见的应用场景是:

* 在线订票系统
* 多线程缓存 web 代理

根据不同的读写策略, 又两类读者写者问题, 需要注意的是, 这两种情况都可能出现 starvation.

#### 第一类读者写者问题(读者优先)

* 如果写者没有获取到使用对象的权限, 不应该让读者等待
* 在等待的写者之后到来的读者应该在写者之前处理
* 也就是说, 只有没有读者的情况下, 写者才能工作

#### 第二类读者写者问题(写者优先)

* 一旦写者可以处理的时候, 就不应该进行等待
* 在等待的写者之后到来的读者应该在写者之后处理

具体的代码为

``` c
/* c */

sbuf_t sbuf; // Shared buffer of connected descriptors

static int byte_cnt;  // Byte counter
static sem_t mutex;   // and the mutex that protects it

void echo_cnt(int connfd){
    int n;
    char buf[MAXLINE];
    rio_t rio;
    static pthread_once_t once = PTHREAD_ONCE_INIT;
    
    Pthread_once(&once, init_echo_cnt);
    Rio_readinitb(&rio, connfd);
    while ((n = Rio_readlineb(&rio, buf, MAXLINE)) != 0) {
        P(&mutex);
        byte_cnt += n;
        printf("thread %d received %d (%d total) bytes on fd %d\n",
                    (int) pthread_self(), n, byte_cnt, connfd);
        V(&mutex);
        Rio_writen(connfd, buf, n);
    }
}

static void init_echo_cnt(void){
    Sem_init(&mutex, 0, 1);
    byte_cnt = 0;
}

void *thread(void *vargp){
    Pthread_detach(pthread_self());
    while (1) {
        int connfd = sbuf_remove(&sbuf); // Remove connfd from buf
        echo_cnt(connfd);                // Service client
        Close(connfd);
    }
}

int main(int argc, char **argv) {
    int i, listenfd, connfd;
    socklen_t clientlen;
    struct sockaddr_storage clientaddr;
    pthread_t tid;
    
    listenfd = Open_listenfd(argv[1]);
    sbuf_init(&sbuf, SBUFSIZE);
    for (i = 0; i < NTHREADS; i++) // Create worker threads
        Pthread_create(&tid, NULL, thread, NULL);
    while (1) {
        clientlen = sizeof(struct sockaddr_storage);
        connfd = Accept(listenfd, (SA *)&clientaddr, &clientlen);
        sbuf_insert(&sbuf, connfd); // Insert connfd in buffer
    }
}
```

## 线程安全

在线程中调用的函数必须是线程安全的, 定义为:

> A function is thread-safe iff it will always produce correct results when called repeatedly from multiple concurrent threads

主要有 4 类线程不安全的函数

* 不保护共享变量的函数
  + 解决办法: 使用 P 和 V semaphore 操作
  + 问题: 同步操作会影响性能
* 在多次调用间保存状态的函数
  + 解决办法: 把状态当做传入参数
* 返回指向静态变量的指针的函数
  + 解决办法1: 重写函数, 传地址用以保存
  + 解决办法2: 上锁, 并且进行复制
* 调用线程不安全函数的函数
  + 解决办法: 只调用线程安全的函数

另一个重要的概念是 Reentrant Function, 定义为:

> A function is reentrant iff it accesses no shared variables when called by multiple threads

Reentrant Functions 是线程安全函数非常重要的子集, 不需要同步操作, 对于第二类的函数来说(上面提到的), 唯一的办法就是把他们修改成 reentrant 的.

标准 C 库中的函数都是线程安全的(如 malloc, free, printf, scanf), 大多数 Unix 的系统调用也都是线程安全的.

总结来看, 并行编程需要注意的是:

* 要有并行策略, 可以把一个大任务分成若干个独立的子任务, 或者用分而治之的方式来解决
* 内循环最好不要有任何同步机制
* 注意 Amdahl's Law
* 一致性是个大问题, 无论是计算一致性还是存储一致性, 都需要仔细考虑

## 超线程

回想一下, 我们之前是如何处理 I/O 的延迟的呢? 一个办法是每个客户端都由一个线程来处理, 这样就不需要互相等待. 现在的多核/超线程处理器提供了另外一种可能. 我们不但可以并行执行多个线程, 更好的是这些都是自动进行的, 当然, 我们也可以通过把大任务分成小任务来加速运算.

![img](../img/20190910003.jpg)

上图是典型的多核处理器架构, 这里需要注意的是 L3 缓存(图上没有显示)和主内存都是共享的. 而具体的执行计算的架构, 基本的乱序执行处理器的架构为:

Out-of-Order Processor Structure

指令控制器会动态把程序转换成操作流, 操作会被映射到 Functional Unit 上进行并行处理. 这种情况下, 一个核心处理一个线程. 而在超线程的设计中, 一个核心可以处理若干个线程, 秘诀在于多出来了若干套指令控制流, 如下图:

Hyperthreading Implementation

如果我们想要了解机器的相关信息, 可以访问 `/proc/cpuinfo` 

随后老师提及了两个例子, 一个是并行求和, 一个是并行快排, 这里不赘述, 如果感兴趣的话, 可以自己思考一下.

## 总结

这一讲是本系列的最后一部分了, 我们首先学习了并行的几个层次: 进程, 事件, 线程, 并了解 Posix 标准. 在此基础上, 针对并行编程可能产生的同步问题, 使用信号量给出了简单的解决办法. 之后通过『生产者-消费者问题』和『读者-写者问题』对并行和同步进行更加深入的探讨, 最后介绍了线程安全和一致性问题.

