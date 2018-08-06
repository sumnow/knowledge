# ubuntu安装及使用

## 安装

之前曾看过一篇文章，言之凿凿地阐述了开发者使用linux开发的优势，痛陈windows的弊端，我虽然没看进去多少，但是记住了开发者和linux的关系。

闲来无事，也想看看linux有多大的魅力，然后就开始捯饬。

选择的是ubuntu 16.04 LTS(Long-Term Support,长久技术支持)，每两年一个LTS,相对来说稳定，而且会更新功能到5年以后，总的来说，是比较可靠的，另一方面我的ubuntu 17.04 也出现了wifi断流的问题，搞了半天包括修改modprobe.config之类的方法都试过了，依然断流，所以不纠结了，直接搞16.04好了。

ubuntu安装傻瓜式，制作一个启动盘，然后u盘启动，然后下一步下一步，然后根据自己的需求是双系统共存或者清空磁盘安装ubuntu，分区这块要注意，

1. 如果你是双系统(win+ubuntu)，那么在windows把盘分好，将linux的空间留作未使用空间就可以了，一般是黑色或者绿色（在win磁盘管理里）。

2. 如果是ubuntu单系统，那么依然推荐你至少分两个盘，一个是根磁盘，一个是挂载盘，安装的时候选择根磁盘就可以了，不要管挂载的。

然后选后要装的磁盘，然后对该磁盘分区，注意了window下是无法读取ubuntu的文件格式的，就是看不见的意思，虽然可以通过某些软件做到，但是不如提前防备来的好。

一般分3个区，依次分是最好的

- /home，逻辑分区，ext4，自己看着办，10G以上吧
- /swap，交换分区，swap，大小与内存相同
- /boot，引导分区，ext4，200m
- / ，主分区，之前所有的都是在主分区里的都是可以找到的。

然后就是安装等待，搞定收工，进了系统以后安装更新，驱动，调整设置，链接wifi，看看断流不。

over！

## 使用

### 关闭触摸板和启用触摸板
   
    sudo modprobe -r psmouse
    sudo modprobe psmouse


### 调节鼠标灵敏度

    xset m N
    // N 为 0～10


### cd targetLocation

打开目录
.        —-切换到当前目录(貌似没有什么意义)(.这个目录可以通过ls -a看到)

..        —-切换到上层目录

~        —-回到家目录(/home/你的登录名/)

### cp fileName targetLocation

拷贝文件到目录

### ls

目录下信息

-a        —-显示指定目录所有文件,包括文件名以 . 开头的文件

-l        —-显示文件详细信息(包括文件类型,权限,修改时间,访问时间,大小,文件名…)

-h        —-将文件大小以方便阅读的形式表示出来,配合 -l 参数使用,常有奇效

#### 权限

传说中的777权限，是这样的，linux下文件分为所有者(user)，所属组(group)，其他人(other)

权限为 `rwx` ，拥有权限分为别数字4,2,1，没有权限则是0，所以777是所有人都有权限

> read write execute

    sudo chmod 777 -R * 

即文件夹下的文件都授予读写和可执行权限。

### mkdir folderName

创建文件夹

### rm

删除文件夹

-r 删除文件夹下文件


### touch fileName

创建文件

### 压缩与解压缩

    tar
    -c: 建立压缩档案
    -x：解压
    -t：查看内容
    -r：向压缩归档文件末尾追加文件
    -u：更新原压缩包中的文件

    -z：有gzip属性的
    -j：有bz2属性的
    -Z：有compress属性的
    -v：显示所有过程
    -O：将文件解开到标准输出

#### tar -cf all.tar *.jpg
这条命令是将所有.jpg的文件打成一个名为all.tar的包。-c是表示产生新的包，-f指定包的文件名。

#### tar -rf all.tar *.gif
这条命令是将所有.gif的文件增加到all.tar的包里面去。-r是表示增加文件的意思。

#### tar -uf all.tar logo.gif
这条命令是更新原来tar包all.tar中logo.gif文件，-u是表示更新文件的意思。

#### tar -tf all.tar
这条命令是列出all.tar包中所有文件，-t是列出文件的意思

#### tar -xf all.tar
这条命令是解出all.tar包中所有文件，-t是解开的意思

#### 压缩

    tar -cvf jpg.tar *.jpg //将目录里所有jpg文件打包成tar.jpg 

    tar -czf jpg.tar.gz *.jpg   //将目录里所有jpg文件打包成jpg.tar后，并且将其用gzip压缩，生成一个gzip压缩过的包，命名为jpg.tar.gz

    tar -cjf jpg.tar.bz2 *.jpg //将目录里所有jpg文件打包成jpg.tar后，并且将其用bzip2压缩，生成一个bzip2压缩过的包，命名为jpg.tar.bz2

    tar -cZf jpg.tar.Z *.jpg   //将目录里所有jpg文件打包成jpg.tar后，并且将其用compress压缩，生成一个umcompress压缩过的包，命名为jpg.tar.Z

    rar a jpg.rar *.jpg //rar格式的压缩，需要先下载rar for linux

    zip jpg.zip *.jpg //zip格式的压缩，需要先下载zip for linux

#### 解压

    tar -xvf file.tar //解压 tar包

    tar -xzvf file.tar.gz //解压tar.gz

    tar -xjvf file.tar.bz2   //解压 tar.bz2

    tar -xZvf file.tar.Z   //解压tar.Z

    unrar e file.rar //解压rar

    unzip file.zip //解压zi

下面的参数-f是必须的

    -f: 使用档案名字，切记，这个参数是最后一个参数，后面只能接档案名。

### sudo

临时提升权限

### clear reset

clear将会刷新屏幕，本质上只是让终端显示页向后翻了一页，如果向上滚动屏幕还可以看到之前的操作信息。

reset就是全部清空。

### lsof -i :8080

 查看占用本机8080端口的进程
 
COMMAND   PID USER   FD   TYPE     DEVICE SIZE/OFF NODE NAME
node    23997 root   10u  IPv6 3674492455      0t0  TCP *:webcache (LISTEN)

然后可以kill 23997这个PID来结束进程。

ps -ax | grep node 可以查看node开启的服务进程

同样可以kill PID来关闭


### ubuntu检测到系统程序错误

    sudo rm /var/crash/*//可以清楚错误报告

### ispci

查看本机硬件信息

    03:00.0 Network controller: Realtek Semiconductor Co., Ltd. RTL8188CE 802.11b/g/n WiFi Adapter (rev 01)

    lsmod//查看模组信息
    rtl_pci                28672  1 rtl8192ce

    modinfo rtl8192ce
    filename:       /lib/modules/4.10.0-21-generic/kernel/drivers/net/wireless/realtek/rtlwifi/rtl8192ce/rtl8192ce.ko
    firmware:       rtlwifi/rtl8192cfwU_B.bin
    firmware:       rtlwifi/rtl8192cfwU.bin
    firmware:       rtlwifi/rtl8192cfw.bin
    description:    Realtek 8192C/8188C 802.11n PCI wireless
    license:        GPL
    author:         Larry Finger	<Larry.Finger@lwfinger.net>
    author:         Realtek WlanFAE	<wlanfae@realtek.com>
    author:         lizhaoming	<chaoming_li@realsil.com.cn>
    srcversion:     FF3DA6981A07464051F7FBE
    alias:          pci:v000010ECd00008176sv*sd*bc*sc*i*
    alias:          pci:v000010ECd00008177sv*sd*bc*sc*i*
    alias:          pci:v000010ECd00008178sv*sd*bc*sc*i*
    alias:          pci:v000010ECd00008191sv*sd*bc*sc*i*
    depends:        rtlwifi,rtl_pci,rtl8192c-common,mac80211
    intree:         Y
    vermagic:       4.10.0-21-generic SMP mod_unload 
    parm:           swenc:Set to 1 for software crypto (default 0)
     (bool)
    parm:           ips:Set to 0 to not use link power save (default 1)
     (bool)
    parm:           swlps:Set to 1 to use SW control power save (default 0)
     (bool)
    parm:           fwlps:Set to 1 to use FW control power save (default 1)
     (bool)
    parm:           debug:Set debug level (0-5) (default 0) (int)


### 安装Unity Tweak Tool

    sudo apt-get upadate//获取最新软件包

    sudo apt-get install unity-tweak-tool//安装

    unity-tweak-tool//运行

### 安装Chrome

    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb//获取压缩包

    sudo dpkg -i google-chrome-stable_current_amd64.deb //解压并安装

有一定概率出现处理错误，其实不影响使用，但是chrome图标变成未知，可以使用强制安装

    sudo apt-get -f install

    sudo dpkg -i google-chrome-stable_current_amd64.deb

### 安装vscode

	sudo add-apt-repository ppa:ubuntu-desktop/ubuntu-make
	sudo apt-get update
	sudo apt-get install ubuntu-make
	umake web visual-studio-code

卸载

	umake web visual-studio-code --remove
	sudo apt-get remove ubuntu-make

### 安装atom

    sudo add-apt-repository ppa:webupd8team/atom 
    sudo apt-get update
    sudo apt-get install atom

#### atom 插件

国内直接访问有点问题，甚至在vps下都无法安装插件只能去atom插件的github网站下载对应的插件到本地，放置到.atom/packages目录下解压，然后cd ，npm install

### 安装gnome

	sudo apt intall gnome

选择默认管理器为gtm3

### 安装albert

	howopensource@esprimo:~$ sudo add-apt-repository ppa:nilarimogard/webupd8
	howopensource@esprimo:~$ sudo apt-get update
	howopensource@esprimo:~$ sudo apt-get install albert

albert &

### 安装shadowsocks 

     sudo add-apt-repository ppa:hzwhuang/ss-qt5
     sudo apt-get update
     sudo apt-get install shadowsocks-qt5

然后配置qt5

然后在网络里设置手动代理socket代理 127.0.0.1:1080，可以全局代理
或者使用自动代理，添加一个urlpacwen[文件](https://pan.baidu.com/s/1skMSHnn)

    file:///home/username/shadowsocks/autoproxy.pac


### 安装Node

两种方式，一种是源码安装，会make很久，另一种是命令行

    sudo apt-get install nodejs

这种安装的node版本较低，而且使用的时候必须使用nodejs来执行，可以使用如下命令替换成node

    sudo ln -s /usr/bin/nodejs /usr/bin/node

更新node

	sudo apt install npm

    sudo npm cache clean -f    
    //强制删除npm缓存

    sudo npm install -g n
    // 全局安装 n node版本管理工具

    sudo n stable
    //安装到最新版本
    
    sudo n list
    // 列出所有node版本

    sudo n x.xx.x
    // 切换到某一版本    

    sudo npm install npm@lastest -g
    // 更新npm

    sudo npm install -g yarn

### monogodb

    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
    echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list


 
    $ sudo apt-get update
    $ sudo apt-get install mongodb-org

    sudo service mongod start//开启服务
    sudo service mongod stop
    sudo service mongod restart
    sudo systemctl start mongod//开启服务
    sudo systemctl status mongod//查看状态
    sudo service mongod status //查看状态

### git

    git在重装系统后需要重新配置具体如下

    git config --global user.name "username"
    git config --global user.email "example@exam.com"
    ssh-keygen -t rsa -C "example@exam.com"
    
之后添加sshkey到github的setting ssh 里，然后克隆一个远程库，第一次会提示没有当前的ssh是否添加，输入yes,就可以了

### yarn 的安装

    sudo apt update && sudo apt install curl
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    sudo apt-get update && sudo apt-get install yarn




## 安装wine
1、安装源
      sudo add-apt-repository ppa:wine/wine-builds
      sudo apt-get update
2、安装wine
     sudo apt-get install --install-recommends wine-staging
     sudo apt-get install winehq-staging
3、卸载wine
     1).卸载wine主程序，在终端里输入：
       sudo apt-get remove --purge wine
     2).然后删除wine的目录文件：
       rm -r ~/.wine
     3).卸载残留不用的软件包：
       sudo apt-get autoremove

## 清楚命令行历史记录

    histroy -c

## 调节对比度

    xgamma -gamma .75
    // 默认1,在0-1之间的数值
