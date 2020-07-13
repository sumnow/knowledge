<!--
Created: Thu Jul 09 2020 14:10:28 GMT+0800 (China Standard Time)
Modified: Thu Jul 09 2020 15:33:48 GMT+0800 (China Standard Time)
-->

# nginx

## nginx 负载均衡

### 轮询

将客户端发起的请求, 平均分配给每一台服务器

``` BASH
# BASH
upstream upstream-name {
    server ip1:port;
    server ip2:port;
}

server {
    listen 80;
    server_name localhost;
    location / {
        proxy_pass http://upstream-name;
    }
}
```

### 权重

将客户端的请求, 根据服务器的权重不同, 分配不同的数量

``` BASH
# BASH
upstream upstream-name {
    server ip1:port weight=20;
    server ip2:port weight=10;
}

server {
    listen 80;
    server_name localhost;
    location / {
        proxy_pass http://upstream-name;
    }
}
```

### ip_hash

基于发起请求的客户端ip地址不同, 他会将请求发送到不同的服务器上

``` BASH
# BASH
upstream upstream-name {
    ip_hash;
    server ip1:port;
    server ip2:port;
}

server {
    listen 80;
    server_name localhost;
    location / {
        proxy_pass http://upstream-name;
    }
}
```

## 动静分离

Nginx 并发能力的公式

worker_processes * worker_connections / n

n的值可以为4或者2, 静态资源是2, 动态资源是4.

动态资源经历从 `client` 到 `nginx` 到 `server` 再返回, 一共4个交互.

静态资源无需经过 `server`
所以提升了服务器的并发能力

### 动态资源代理

``` BASH
# BASH
location / {
    proxy_pass  路径
}
```

### 静态资源代理

``` BASH
# BASH
location / {
    root  静态资源路径;
    index 默认路径下的某资源;
    autoindex  on; 代表展示资源的全部内容,以列表形式展示
}
```

## nginx集群

为了防止nginx单点故障,宕机导致程序崩溃

准备多个nginx, 为每个nginx服务安装keepalived,以获悉当前nginx实例是否存活.

准备haproxy,提供虚拟路径,统一获取用户的请求

