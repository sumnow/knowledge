<!--
Created: Tue Nov 05 2019 20:52:17 GMT+0800 (China Standard Time)
Modified: Wed Nov 13 2019 14:58:18 GMT+0800 (China Standard Time)
-->

# 黑苹果的efi

## 启动方式

目前有两种启动方式, 一种是通过bios引导, 另一种是uefi引导.

### Legacey

这种启动方式是传统的, 运行流程:

1. 开机
2. bios初始化
3. bios自检
4. 引导操作系统
5. 进入系统

硬盘格式应该为MBR格式

### UEFI

1. 开机
2. uefi初始化
3. 引导操作系统
4. 进入系统

且对应硬盘分区格式应该为GUID(GPT)格式

且当你改成GPT分区之后, 会在磁盘里分出一小块, 通常是200M, 被称作EFI的空间, 用来存放引导文件

## EFI定义

EFI系统分区(英语: EFI system partition, 简写为ESP), 是一个FAT或FAT32格式的磁盘分区, 但是其分区标识是EF (十六进制) 而非常规的0E或0C. UEFI固件可从ESP加载EFI启动程式或ï者EFI应用程式.

在osx下, 可以使用 `diskutil list` 来查看隐藏的EFI分区, 使用 `diskutil mount` 命令 挂载分区.

分区里的内容, 一般有 `APPLE` , `BOOT` , `CLOVER` 三个文件夹, 或许会有其他系统的引导文件夹, 其中, APPLE里是放置插件和框架, 一般不需要修改, BOOT是引导文件, 无须修改, CLOVER是放置各种驱动的地方, 在这里修改config.plist来完成驱动各个不同属性的硬件.

> CLOVER是黑苹果的玩意儿, 一般用以欺骗系统的检测.

