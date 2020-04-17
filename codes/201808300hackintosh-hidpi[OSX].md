<!--
Created: Mon Aug 26 2019 15:20:22 GMT+0800 (China Standard Time)
Modified: Fri Apr 17 2020 14:36:51 GMT+0800 (China Standard Time)
-->

# 黑苹果开启hidpi

## 神秘代码一

``` BASH
    curl -o ~/enable-HiDPI.sh https://raw.githubusercontent.com/syscl/Enable-HiDPI-OSX/master/enable-HiDPI.sh
    
    chmod +x ~/enable-HiDPI.sh
    
    ~/enable-HiDPI.sh
```

重启, 使用RDM选择HiDPI分辨率.

## 神秘代码二

``` BASH
# BASH
sh -c "$(curl -fsSL https://html.sqlsec.com/hidpi.sh)"
```

目前推荐的方式, 又可能会有些小问题, 在某些窗口里, 不显示鼠标, 方法是可以在 `Accessbility` 里设置 `cursor` 的大小.

