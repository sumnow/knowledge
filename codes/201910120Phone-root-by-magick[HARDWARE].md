<!--
Created: Sat Oct 12 2019 14:24:05 GMT+0800 (China Standard Time)
Modified: Tue Oct 22 2019 16:50:28 GMT+0800 (China Standard Time)
-->

# 通过magick root 手机

[](https://zhuanlan.zhihu.com/p/58507641)

> 经过测试 , 安卓10可用, 最新的magick20.0

推荐使用otg的方式操控鼠标, 一根10块.

## RedMi k20 pro 刷机

刷官方rom, 只要可以进入 `fastboot` 就可以使用官方 `MiFlash` 工具, 将从[官网](http://www.miui.com/download.html)下载的tgz包解压缩后, 进行线刷, 当然第一步是解锁.

这次刷入的是 `pixel Exprience` , 我们使用twrp方式刷入, 使用对应的刷入twrp的工具, 将twrp安装到手机里, 通过 `recovery` 模式里, 选择安装, 将对应的rom包选中, 安装, 完成后会自动重启.

*注意: 一般来说, twrp需要选择对应的安卓版本* 以手中的k20pro举例, 在 `andriodQ` 的MIUI里, 选择 `andriodP` 的包, 会导致sdcard里路径为乱码, 对于安卓系统来说也是.

## 刷机常见词汇

### 卡刷与线刷

卡刷即, 使用内置sdcard内的rom进行刷机, 线刷即连接到电脑, 使用电脑上的rom进行刷机

### fastboot Recovery 

`fastboot` 即快速引导模式, 将操作权放置到允许调试的电脑侧, 相比卡刷, 它的能力更加强大.

`Recovery` 即恢复模式, 进入这个状态可以使用 `recovery.img` 进行还原, 一般来说会, 此处各厂商有自己封装的恢复模式, 但自由性偏低, 所以我们需要一些第三方的工具, 例如TWRP(Team Win Recovery Project), 它的功能非常强大且开源, 也是刷机首选.

### 解bootloader锁

BL锁一般是锁两个方向:

1. Bootloader会去检查它加载的镜像boot.img或recovery.img的签名信息，这个签名只有手机原厂能做出来。修改过后的或第三方镜像的签名不存在或无效，Bootloader会拒绝继续启动。boot.img会去检查system镜像签名，如果不是原厂的，拒绝启动。recovery会去检查OTA刷机包的签名，不是原厂的拒绝更新。
2. 一般出厂机器会禁用常规Bootloader的直接刷机功能。

