<!--
Created: Mon Aug 26 2019 15:18:18 GMT+0800 (China Standard Time)
Modified: Sun Nov 17 2019 09:35:46 GMT+0800 (China Standard Time)
-->

# 黑苹果

### 准备

1. u盘 (pe, osx)各一个

2. window 电脑

3. TransMac 工具

4. OSX镜像, 最好带Clover引导

### 开工

#### 第一步

安装TransMac , 然后打开, 选中u盘, 右键, Format Disk for Mac

> 这样会把硬盘变成efi引导模式.

然后 Restore with Disk Image, 选中OSX的镜像, 等待写入.

完成后, 使用可以读取efi分区的软件(直接拷贝会被格式化), 将efi文件拷贝到u盘目录下覆盖.

#### 第二步

重启电脑, 然后u盘启动, 然后进入osx的引导页面

选择硬盘工具, 抹掉硬盘, 格式为 `MacOs 日志` 或者 `hfs+日志式` 格式, 还可以使用AFPS格式.

然后可以进行安装了, 安装OSX, 这里举例, 安装的磁盘名字为Disk.

这一步的安装, 是拷贝osx的必须文件到目标硬盘 Disk.

安装完成后会重启, 需要再次u盘启动进入, 选择 `install macos in disk` .

这一步是将文件安装为系统.

然后再重新启动, 如果无法自动进入 `clover` 进入, 那么依然从U盘启动进入系统, 选择 `install macos in disk` , 进行安装和初始化, 然后一番设定进入系统.

#### 第三步

在此, efi文件如果没问题的话, 笔记本多数硬件都是可驱动的了.

然后重启机器, 每次选择 `boot macos in disk` 就好.

如果进来以后, 依然进入旧系统, 说明电脑的efi有问题.

需要在efi分区下, 将之前的efi文件夹拷贝覆盖, 再此重启解决问题.

> efi里包括了声卡显卡等驱动, 其中网卡是及其难以驱动的, 只有极少的网卡有能驱动的幸运. 直接换拆机网卡解决.

## 问题

如果遇到 `安装器资源已过期` 这样的提示, 解决方法:

1. 修改bios里的时间到2015年.

2. 不插网线.

3. 将用不到的硬盘先拔出.

4. 将 `fakeSMC` 换成[最新](https://bitbucket.org/RehabMan/os-x-fakesmc-kozlek/downloads/)的.

5. 从抹盘开始重新安装.

