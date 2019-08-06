# 使用osx的一些小方法

## 挂载NTFS格式的硬盘

``` bash
# 查看硬盘列表
diskutil list
# 查看diskName硬盘详情
diskutil info /Volumes/diskName

```

然后复制`Volume UUID`

然后在`/etc/fstab`中添加如下一行

``` bash
UUID=C0F838DA-F857-9CC0-2CC1-9CE6F19CE668 none ntfs rw,auto,nobrowse
```

然后重新插入硬盘,硬盘不会显示,需要自己手动创建链接

``` bash
mkdir -p ~/Desktop/diskName
ln -s /Volumes/diskName ~/Desktop/diskName
```

##  zsh

使用zsh的时候,请求国外的一些资源会比较慢,例如安装 `homebrew`,可以在终端里开全局代理

首先启动ss,端口假如是1080

vi ~/.zshrc

然后添加如下内容

``` bash
# proxy global mode
proxy () {
  export ALL_PROXY=socks5://127.0.0.1:1080
  echo "HTTP Proxy on"
}

# where noproxy
noproxy () {
  unset ALL_PROXY
  echo "HTTP Proxy off"
}
```
可以使用 proxy 函数来开启代理,注意:可能需要重建一个终端

这是开启后的结果:

``` bash
18% (435/2368), 108.01 KiB | 18.00 KiB/s

36% (870/2368), 1.00 MiB | 481.00 KiB/s
```