<!--
Created: Mon Dec 21 2020 17:14:49 GMT+0800 (China Standard Time)
Modified: Mon Dec 21 2020 17:28:57 GMT+0800 (China Standard Time)
-->

# docker里的mysql 远程连接

## 第一步下载镜像

拉取mysql 

``` BASH
# BASH
docker pull mysql/mysql-server:latest
docker images
```

# 第二步启动容器

``` BASH
# BASH
# 先关闭mysql1服务并移除
docker stop mysql1 && docker rm mysql1 
# 重新启动
docker run --name=mysql1 -e MYSQL_ROOT_HOST=% -e MYSQL_ROOT_PASSWORD=123456 -p 3306:3306 -d mysql/mysql-server
```

> 其中的mysql1表示为当前的mysql-server实例指定一个自定义的容器名称, 这个参数是可选的, 如果不指定此参数, 则会生成一个随机的容器名称.-d参数表示在后台运行当前的docker run命令, 如需打印mysql1运行的日志, 可以使用如下命令: `docker logs mysql1` , `-p` 代表端口的映射

## 登入容器

``` BASH
# BASH
docker exec -it mysql1 mysql -u root -p
# 输入密码
```

## 外部登录容器内, 远程登录

``` BASH
# BASH
update user set authentication_string = password('root') where user = 'root';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root' WITH GRANT OPTION;
```
