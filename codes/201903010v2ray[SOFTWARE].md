# 使用V2Ray实现科学爱国 – Chrarcadia

可以查看[这里](https://www.codercto.com/a/22204.html)

打开服务器终端, 输入命令 `bash <(curl -L -s https://install.direct/go.sh)` , 等待安装完成的提示, 记录下 `PORT` 和 `UUID` . 

如果提示缺少命令, 你可以先执行 `yum update` 或者 `apt-get update` 再进行安装. 

安装完成后, 输入 `service v2ray start` 来立即运行程序, 输入 `service v2ray status` 来查看状态, 看到 `running` 的提示就可以完成了. 

[这里](https://github.com/v2ray/v2ray-core/releases)可以找到win的安装文件, 安装完成后, 你需要编辑 `config.json` 来完成编辑, 然后设置系统代理, 接着运行 `v2ray.exe` 

4. 关闭Linux防火墙

因为Linux防火墙可能会阻挡我们去连接v2ray, 所以需要关闭它. 使用以下三组命令关闭防火墙, 你只需要选择其中的一组来执行即可, 如果报错, 才需要去执行下一组的命令. 

``` bash
systemctl stop firewalld
systemctl disable firewalld
 
servcie iptables stop
chkconfig iptables off
 
ufw disable
```

> 如果你的服务器上有重要资料, 那么请不要关闭防火墙, 建议你百度一下【你的系统+防火墙开放端口】(例如搜索: CentOS 7 防火墙开放端口)来学习如何放行端口, 只要放行刚刚安装完成提示的端口即可, 命令也简单, 但是不同的系统不一定一样, 这里就不展开了. 

Android推荐下载安装 BifrostV 

### 在MAC中使用V2Ray

在[这里](https://github.com/Cenmrev/V2RayX/releases)下载

下载后选择configure来完成配置. 
