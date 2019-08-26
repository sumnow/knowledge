<!--
Created: Mon Aug 26 2019 15:22:05 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:22:05 GMT+0800 (China Standard Time)
-->
# nginx install

Nginx 是 C语言 开发, 以centOs系统为例子

## dependencies

### gcc

安装 nginx 需要先将官网下载的源码进行编译, 编译依赖 gcc 环境, 如果没有 gcc 环境, 则需要安装: 

``` bash
yum install gcc-c++
```

### PCRE pcre-devel 安装

PCRE(Perl Compatible Regular Expressions) 是一个Perl库, 包括 perl 兼容的正则表达式库. nginx 的 http 模块使用 pcre 来解析正则表达式, 所以需要在 linux 上安装 pcre 库, pcre-devel 是使用 pcre 开发的一个二次开发库. nginx也需要此库. 命令: 

``` bash
yum install -y pcre pcre-devel
```

### zlib 安装

zlib 库提供了很多种压缩和解压缩的方式, nginx 使用 zlib 对 http 包的内容进行 gzip , 所以需要在 Centos 上安装 zlib 库. 

``` bash
yum install -y zlib zlib-devel
```

### OpenSSL 安装

OpenSSL 是一个强大的安全套接字层密码库, 囊括主要的密码算法、 常用的密钥和证书封装管理功能及 SSL 协议, 并提供丰富的应用程序供测试或其它目的使用. 
nginx 不仅支持 http 协议, 还支持 https(即在ssl协议上传输http), 所以需要在 Centos 安装 OpenSSL 库. 

``` bash
yum install -y openssl openssl-devel
```

## install

``` bash
wget -c https://nginx.org/download/nginx-1.10.1.tar.gz
tar -zxvf nginx-1.10.1.tar.gz
cd nginx-1.10.1
```

use configure default 

``` bash
./configure
```

编译安装

``` 
make
make install
```

启动

``` bash 
# 启动nginx
cd /usr/local/nginx/sbin/
./nginx 
# 启动
./nginx -s start; 
# 重新启动, 热启动, 修改配置重启不影响线上
./nginx -s reload; 
# 关闭
./nginx -s stop; 
# 修改配置后, 可以通过下面的命令测试是否有语法错误
./nginx -t; 

# 查询nginx服务端口
ps aux|grep nginx

//查询nginx主进程号
$ ps -ef | grep nginx

//从容停止Nginx: 
$ kill -QUIT 主进程号

//快速停止Nginx: 
kill -TERM 主进程号

//强制停止Nginx: 
pkill -9 nginx

``` 

现在就可以访问默认的80端口, 查看nginx启动的状态

## 安装ssl模块

Nginx如果未开启SSL模块, 配置Https时提示如下错误:

``` bash
nginx: [emerg] the "ssl" parameter requires ngx_http_ssl_module in /usr/local/nginx/conf/nginx.conf
```

进入nginx目录后执行

``` bash
./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module
make
```

> 注意: 此处不能进行 `make install` , 否则就是覆盖安装

将新编译的库覆盖旧库

``` bash
cp ./objs/nginx /usr/local/nginx/sbin/
```

``` bash
/usr/local/nginx/sbin/nginx -V
```

此时应该显示为即配置成功: 
configure arguments: --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module

