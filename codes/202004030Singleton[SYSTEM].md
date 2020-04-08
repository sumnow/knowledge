<!--
Created: Tue Apr 07 2020 11:27:25 GMT+0800 (China Standard Time)
Modified: Wed Apr 08 2020 14:21:53 GMT+0800 (China Standard Time)
-->

# 单例模式

在有些系统中, 为了节省内存资源、保证数据内容的一致性, 对某些类要求只能创建一个实例, 这就是所谓的单例模式.

## 单例模式的定义与特点

单例(Singleton)模式的定义: 指一个类只有一个实例, 且该类能自行创建这个实例的一种模式. 例如, Windows 中只能打开一个任务管理器, 这样可以避免因打开多个任务管理器窗口而造成内存资源的浪费, 或出现各个窗口显示内容的不一致等错误.

在计算机系统中, 还有 Windows 的回收站、操作系统中的文件系统、多线程中的线程池、显卡的驱动程序对象、打印机的后台处理服务、应用程序的日志对象、数据库的连接池、网站的计数器、Web 应用的配置对象、应用程序中的对话框、系统中的缓存等常常被设计成单例.

单例模式有 3 个特点:

1. 单例类只有一个实例对象; 
2. 该单例对象必须由单例类自行创建; 
3. 单例类对外提供一个访问该单例的全局访问点; 

## 单例模式的结构与实现

单例模式是设计模式中最简单的模式之一. 通常, 普通类的构造函数是公有的, 外部类可以通过"new 构造函数()"来生成多个实例. 但是, 如果将类的构造函数设为私有的, 外部类就无法调用该构造函数, 也就无法生成多个实例. 这时该类自身必须定义一个静态私有实例, 并向外提供一个静态的公有函数用于创建或获取该静态私有实例.

下面来分析其基本结构和实现方法.

### 单例模式的结构

单例模式的主要角色如下.

1. 单例类: 包含一个实例且能自行创建这个实例的类.
2. 访问类: 使用单例的类.

### 单例模式的实现

``` JAVA
// JAVA
public class LazySingleton
{
    private static volatile LazySingleton instance=null;    //保证 instance 在所有线程中同步
    private LazySingleton(){}    //private 避免类在外部被实例化
    public static synchronized LazySingleton getInstance()
    {
        //getInstance 方法前加同步
        if(instance==null)
        {
            instance=new LazySingleton();
        }
        return instance;
    }
}
```

``` Go
// Go
type singleton struct{}
var ins *singleton
var mu sync.Mutex
func GetIns() *singleton{
    // 双重检查锁
    // 避免了每次访问都加锁,只有在第一次初始化的时候会创建锁
    if ins == nil {
        mu.Lock()
        defer mu.Unlock()
        if ins == nil {
            ins = &singleton{}
        }
    }
    return ins
}
```

### 关于双重检查的问题

[link](https://juejin.im/post/5d54c2d251882542f27bdff6) 

[link](https://segmentfault.com/a/1190000020959908)

## 一句话理解

单例就是全局只有一个该对象, 用一个方法获取该对象, 只要有了就直接返回该对象

