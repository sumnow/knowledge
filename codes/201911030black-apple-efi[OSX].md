<!--
Created: Tue Nov 05 2019 20:52:17 GMT+0800 (China Standard Time)
Modified: Wed Nov 06 2019 16:06:46 GMT+0800 (China Standard Time)
-->

# 黑苹果的efi

对于 window 或者 osx 都有一个分区, 叫做EFI

## EFI定义

EFI系统分区(英语: EFI system partition, 简写为ESP), 是一个FAT或FAT32格式的磁盘分区, 但是其分区标识是EF (十六进制) 而非常规的0E或0C. UEFI固件可从ESP加载EFI启动程式或ï者EFI应用程式.

可以使用 `diskutil list` 来查看隐藏的EFI分区, 使用 `mount` 命令 挂载分区.

分区里的内容, 一般有APPLE BOOT CLOVER 三个文件夹, 或许会有其他系统的引导文件夹, 其中, APPLE里是放置插件和框架, 一般不需要修改, BOOT是引导文件, 无须修改, CLOVER是放置各种驱动的地方, 在这里修改config.plist来完成驱动各个不同属性的硬件.

