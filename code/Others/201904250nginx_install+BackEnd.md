# nginx install

Nginx 是 C语言 开发, 以centOs系统为例子

## dependencies

### gcc

安装 nginx 需要先将官网下载的源码进行编译, 编译依赖 gcc 环境, 如果没有 gcc 环境, 则需要安装: 

```bash
yum install gcc-c++
```

### PCRE pcre-devel 安装

PCRE(Perl Compatible Regular Expressions) 是一个Perl库, 包括 perl 兼容的正则表达式库. nginx 的 http 模块使用 pcre 来解析正则表达式, 所以需要在 linux 上安装 pcre 库, pcre-devel 是使用 pcre 开发的一个二次开发库. nginx也需要此库. 命令: 

```bash
yum install -y pcre pcre-devel
```

### zlib 安装

zlib 库提供了很多种压缩和解压缩的方式, nginx 使用 zlib 对 http 包的内容进行 gzip , 所以需要在 Centos 上安装 zlib 库. 

```bash
yum install -y zlib zlib-devel
```

### OpenSSL 安装

OpenSSL 是一个强大的安全套接字层密码库, 囊括主要的密码算法、 常用的密钥和证书封装管理功能及 SSL 协议, 并提供丰富的应用程序供测试或其它目的使用. 
nginx 不仅支持 http 协议, 还支持 https(即在ssl协议上传输http), 所以需要在 Centos 安装 OpenSSL 库. 

```bash
yum install -y openssl openssl-devel
```

## install

```bash
wget -c https://nginx.org/download/nginx-1.10.1.tar.gz
tar -zxvf nginx-1.10.1.tar.gz
cd nginx-1.10.1
```

use configure default 

```bash
./configure
```

```编译安装
make
make install
```

```bash 
# 查询nginx服务端口
ps aux|grep nginx
```

