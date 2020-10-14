<!--
Created: Sun Nov 17 2019 10:21:44 GMT+0800 (China Standard Time)
Modified: Fri Dec 13 2019 10:45:00 GMT+0800 (China Standard Time)
-->

# node走脚本

NodeJS 子进程提供了与系统交互的重要接口, 其主要 API 有: 

标准输入, 标准输出及标准错误输出的接口

child.stdin 获取标准输入

child.stdout 获取标准输出

child.stderr 获取标准错误输出

获取子进程的PID:child.pid

提供生成子进程的方法:child_process.spawn(cmd, args=[], [options])

提供直接执行系统命令的方法:child_process.exec(cmd, [options], callback)

提供调用脚本文件的方法:child_process.execFile(file, [args], [options], [callback])

提供杀死进程的方法:child.kill(signal='SIGTERM')

## 利用子进程调用系统命令(获取系统内存使用情况)

新建nodejs文件, 名为cmd_spawn.js, 代码如下:

``` JS
// JavaScript
var spawn = require('child_process').spawn;
free = spawn('free', ['-m']);

// 捕获标准输出并将其打印到控制台 
free.stdout.on('data', function(data) {
    console.log('standard output:\n' + data);
});

// 捕获标准错误输出并将其打印到控制台 
free.stderr.on('data', function(data) {
    console.log('standard error output:\n' + data);
});

// 注册子进程关闭事件 
free.on('exit', function(code, signal) {
    console.log('child process eixt ,exit:' + code);
});
```

## 执行系统命令(child_process.exec())

这个我还是很常用的, 功能感觉比上面的强大那么一点点. 比如我很喜欢关注天气, 现在我要curl一下天气的接口返回json格式的数据, 可能我要对它进行一番操作, 这里就打印出来不操作.

新建nodejs文件, 名为cmd_exec.js:

``` JS
// JavaScript
var exec = require('child_process').exec;
var cmdStr = 'curl http://www.weather.com.cn/data/sk/101010100.html';
exec(cmdStr, function(err, stdout, stderr) {
    if (err) {
        console.log('get weather api error:' + stderr);
    } else {
        /*
        这个stdout的内容就是上面我curl出来的这个东西：
        {"weatherinfo":{"city":"北京","cityid":"101010100","temp":"3","WD":"西北风","WS":"3级","SD":"23%","WSE":"3","time":"21:20","isRadar":"1","Radar":"JC_RADAR_AZ9010_JB","njd":"暂无实况","qy":"1019"}}
        */
        var data = JSON.parse(stdout);
        console.log(data);
    }
});
```

 

## 调用传参数的shell脚本(child_process.execFile())

这个要先准备个shell脚本, 比如我要连到一台服务器, 来修改它的密码, 则我要提供IP, user, new pwd, old pwd, 新建shell脚本文件change_password.sh:

``` BASH
# BASH
#!/bin/sh

IP=""
NAME=""
PASSWORD=""
NEWPASSWORD=""

while getopts "H:U:P:N:" arg #选项后面的冒号表示该选项需要参数
do
        case $arg in
             H)
                IP=$OPTARG
                ;;
             U)
                NAME=$OPTARG
                ;;
             P)
                PASSWORD=$OPTARG
                ;;
             N)
                NEWPASSWORD=$OPTARG
                ;;
             ?)  #当有不认识的选项的时候arg为?
            echo "含有未知参数"
        exit 1
        ;;
        esac
done

#先获取userid
USERID= `/usr/bin/ipmitool -I lanplus -H $IP -U $NAME -P $PASSWORD user list | grep root | awk '{print $1}'` 
# echo $USERID
#根据userid来修改密码
/usr/bin/ipmitool -I lanplus -H $IP -U $NAME -P $PASSWORD user set password $USERID $NEWPASSWORD
```

然后我准备个nodejs文件来调用这个shell脚本, 叫file_changepwd.js:

``` JS
// JavaScript
var callfile = require('child_process');
var ip = '1.1.1.1';
var username = 'test';
var password = 'pwd';
var newpassword = 'newpwd';

callfile.execFile('change_password.sh', ['-H', ip, '-U', username, '-P', password, '-N', newpassword], null, function(err, stdout, stderr) {
    callback(err, stdout, stderr);
});
```

### 根据输出,自动填入

例如登录ssh

``` BASH
# BASH
#!/usr/bin/expect
spawn ssh root@192.168.9.65
expect {                 
    "*yes/no" { send "yes\n"; exp_continue}
    "*password:" { send "Deji123Svn\n" }
}
interact
```



## 补充材料

[Node.js执行系统命令](https://juejin.im/post/5b07eb1c5188254e28710d80)

