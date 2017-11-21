# CentOs and shadowsocks

## CentOs nodejs install

CentOs version: 6.0

    curl -sL https://rpm.nodesource.com/setup_7.x | bash -

    yum install nodejs

## CentOs 下 shadowsocks配置

CentOs version: 6.5

安装

    yum install python-setuptools
    yum install python-pip
    pip install shadowsocks

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

