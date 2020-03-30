<!--
Created: Mon Mar 30 2020 14:46:21 GMT+0800 (China Standard Time)
Modified: Mon Mar 30 2020 16:09:35 GMT+0800 (China Standard Time)
-->

# 为什么在32位系统中只有4g内存可用?

常见的一个问题, 但是具体的原因呢

## 常见的单位运算

[参考](./201809120computer-memories[HARDWARE].md)

## 内存寻址

cpu访问内存, 并非遍历访问, 而是给每个内存都标记了一个地址, 这个地址就是每8个bit绑定在一起的1Byte.

32位系统, 顾名思义, 它将内存分为2^32次方, 也就是4g内存, 再大的内存, 系统也无法寻址了.

大家都知道指针是用来存放内存地址的, 那么对于32位系统来讲, 内存地址是1个32位长度的2进制数, 而每1个内存单位长度只有1byte = 8bit(位), 所以1个指针 就需要4byte的内存来存放该指针的内容(1个内存地址)啦.

``` Go
// Go
a := "abc"
var ip *string
    ip = &a
fmt.Println(unsafe.Sizeof(a)) // 16
// GOstring占用16个字节,前8位指针,后8位代表长度
fmt.Println(unsafe.Sizeof(ip)) // 8
```

## 虚拟内存

说了那么多, 有人会发现32位的ubuntu却可以使用超过4g甚至8g, 这是为啥呢?

因为上面说的全都是操作系统层面的, 跟实际上的物理内存没有半毛钱关系.

