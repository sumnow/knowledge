# CentOs and shadowsocks

## CentOs nodejs install

CentOs version: 6.0

    curl -sL https://rpm.nodesource.com/setup_7.x | bash -

    yum install nodejs

## CentOs 下 shadowsocks配置

这是在搬瓦工VPS下布置的(类型为OPENVZ)

CentOs version: 6.5



安装

    sudo yum install python-setuptools
    sudo yum install python-pip
    pip install shadowsocks




centos 7

    $ curl "https://bootstrap.pypa.io/get-pip.py" -o "get-pip.py"
    $ python get-pip.py

centOS 7 下可以使用Google BBR算法来加速

1. LKL 要求 ldd 的版本在 2.14以上 ，64位系统，建议安装 CentOS7 ， Debian8 或 Ubuntu16；

2. 默认的端口转发只转发了 9000-9999 的端口,修改端口可以修改/root/lkl/run.sh和hproxy.cfg中的端口部分；

3. 只适用 OpenVZ 虚拟化主机。

    // 测试通过的方法
    wget --no-check-certificate https://github.com/91yun/uml/raw/master/lkl/install.sh && bash install.sh

    // 未测试的方法
    wget --no-check-certificate https://raw.githubusercontent.com/mmmwhy/LKL_BBR/master/lkl/install.sh && bash install.sh
    // ping 通代表成功
    ping 10.0.0.2


> 效果，不是非常明显吧，延迟从30-80ms变成了3-8ms，youtube可以看1080pHD的视频，还是很值得搞一搞。


root目录下新建ss/ssserver.json 

    vim ~/ss/ssserver.json

    {
        // host ip address
        "server": "ip address",
        "server_port": 8388,
        "local_address": "127.0.0.1",
        "local_port": 1080,
        "password": "password",
        "timeout": 300,
        "method": "aes-256-cfb",
        "fast_open": false
    }

运行ss

    nohup ssserver -c /root/ss/ssserver.json -d start &
    ssserver -c /root/ss/ssserver.json -d stop

    

