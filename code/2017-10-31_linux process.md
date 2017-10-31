# linux 下常用命令与进程问题

## lsof -i :hostname

检查hostname（端口号）的占用进程。

## 守护进程

    $ node serve.js & //后台启动进程
    $ disown

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