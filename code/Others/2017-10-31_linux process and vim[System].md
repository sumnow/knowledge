# linux 下process与vim命令


代码均在ubuntu(16.04)下测试通过。

## 进程相关

### linux 下远程连接
```bash
    ssh -t root@192.168.0.1 -p 22949
    password: xxxxxxx
```
##### 退出登录
```bash

    logout
```
### 重置密码
```bash

    passwd
```
### lsof -i :hostname

检查hostname（端口号）的占用进程。

> lsof 在centos下默认没有安装使用 `yum install lsof` 即可。

### 守护进程
```bash

    $ node serve.js & //后台启动进程
    $ disown
```
#### 移出最近一个正在执行的后台任务

    $ disown

#### 移出所有正在执行的后台任务

    $ disown -r

#### 移出所有后台任务

    $ disown -a

#### 不移出后台任务，但是让它们不会收到SIGHUP信号

    $ disown -h

#### 根据jobId，移出指定的后台任务

    $ disown %2
    $ disown -h %2

#### nohup 也可以实现后台运行的效果

    nohup node serve.js &

> nohup 有个特别需要注意的地方，目前在centos7x86_64上发现的问题

我使用 `nohup node server.js &` 命令,然后关闭终端会导致程序依然关闭了。应该在 `nohup node server.js &` 后 ,再单击空格推出 `nohup.out`，然后 `exit`  关闭远程链接。

### forever 
```bash

    // install global
    npm install forever -g

    service forever start 

    forever start index.js

    forever list
```
>目前测试最为稳定的方法

## 常用命令与快捷键操作

### 命令
```bash

    pwd  // 展示当前路径

    cd ~  // 打开用户目录 /Users/{username}
```
### 快捷键

    Ctrl + left/right      // 前进后退页面
    
    Ctrl + alt + left/right/PgUp/PgDn  // 前往不同工作区

    Ctrl + alt +Shift + left/right/PgUp/PgDn // 移动当前窗口到另一个工作区

#### terminal 相关命令

    Ctrl + a // 移动光标到开始处

    Ctrl + e // 移动到end

    Ctrl + k // delete here to end

    Ctrl + u // delete here to start

    ctrl + d // delete here 

    ctrl + l // 相当于clear


## vim

insert变成插入模式

esc后

:q! 强制退出，不保存修改

:w 保存修改

:wq 保存修改且退出

## rename

`rename` 在 `OSX` 下不可用