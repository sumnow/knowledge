# 使用V2Ray实现科学爱国 – Chrarcadia

可以查看[这里](https://www.codercto.com/a/22204.html)

打开服务器终端，输入命令 `bash <(curl -L -s https://install.direct/go.sh)` ，等待安装完成的提示，记录下  `PORT`  和  `UUID` 。

如果提示缺少命令，你可以先执行 `yum update` 或者 `apt-get update` 再进行安装。

安装完成后，输入 `service v2ray start` 来立即运行程序，输入  `service v2ray status` 来查看状态，看到 `running` 的提示就可以完成了。

[这里](https://github.com/v2ray/v2ray-core/releases)可以找到win的安装文件，安装完成后，你需要编辑`config.json`来完成编辑，然后设置系统代理，接着运行`v2ray.exe`

Android推荐下载安装 BifrostV 

### 在MAC中使用V2Ray

在[这里](https://github.com/Cenmrev/V2RayX/releases)下载

下载后选择configure来完成配置。