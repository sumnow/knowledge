# centOs firewall

## 添加开放端口

``` bash
# bash
    firewall-cmd --zone=public --add-port=80/tcp --permanent
```

--add-port=80/tcp #添加端口, 格式为: 端口/通讯协议

--permanent #永久生效, 没有此参数重启后失效

## 查询端口号80 是否开启:

``` bash
# bash
firewall-cmd --query-port=80/tcp
```

## 重启防火墙:

``` bash
# bash
firewall-cmd --reload
```

## 查询有哪些端口是开启的:

``` bash
# bash
firewall-cmd --list-port
```

## 停止firewall

``` bash
# bash
systemctl stop firewalld.service #停止firewall
```

## 禁止firewall开机启动

``` bash
# bash
systemctl disable firewalld.service 
```

## 配置规则文件

在我们使用CentOS系统的时候, CentOS防火墙有时是需要改变设置的. CentOS防火墙默认是打开的, 设置CentOS防火墙开放端口方法如下:

打开iptables的配置文件:vi /etc/sysconfig/iptables

修改CentOS防火墙时注意: 一定要给自己留好后路, 留VNC一个管理端口和SSh的管理端口

下面是一个iptables的示例:

``` vim
// code
# Firewall configuration written by system-config-securitylevel
# Manual customization of this file is not recommended.
*filter
: INPUT ACCEPT [0:0]
: FORWARD ACCEPT [0:0]
: OUTPUT ACCEPT [0:0]
: RH-Firewall-1-INPUT - [0:0]
-A INPUT -j RH-Firewall-1-INPUT
-A FORWARD -j RH-Firewall-1-INPUT
-A RH-Firewall-1-INPUT -i lo -j ACCEPT
-A RH-Firewall-1-INPUT -p icmp –icmp-type any -j ACCEPT
-A RH-Firewall-1-INPUT -p 50 -j ACCEPT
-A RH-Firewall-1-INPUT -p 51 -j ACCEPT
-A RH-Firewall-1-INPUT -m state –state ESTABLISHED, RELATED -j ACCEPT
-A RH-Firewall-1-INPUT -m state –state NEW -m tcp -p tcp –dport 53 -j ACCEPT
-A RH-Firewall-1-INPUT -m state –state NEW -m udp -p udp –dport 53 -j ACCEPT
-A RH-Firewall-1-INPUT -m state –state NEW -m tcp -p tcp –dport 22 -j ACCEPT
-A RH-Firewall-1-INPUT -m state –state NEW -m tcp -p tcp –dport 25 -j ACCEPT
-A RH-Firewall-1-INPUT -m state –state NEW -m tcp -p tcp –dport 80 -j ACCEPT
-A RH-Firewall-1-INPUT -m state –state NEW -m tcp -p tcp –dport 443 -j ACCEPT
-A RH-Firewall-1-INPUT -j REJECT –reject-with icmp-host-prohibited
COMMIT

```

修改CentOS防火墙需要注意的是, 你必须根据自己服务器的情况来修改这个文件.

举例来说, 如果你不希望开放80端口提供web服务, 那么应该相应的删除这一行:

-A RH-Firewall-1-INPUT -m state –state NEW -m tcp -p tcp –dport 80 -j ACCEPT

全部修改完之后重启

``` bash
iptables:service iptables restart
```

你可以验证一下是否规则都已经生效:

``` bash
iptables -L
```

这样, 我们就完成了CentOS防火墙的设置修改.

