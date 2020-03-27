# babun

`babun` 是一个 `window` 下的命令行工具, 基于 `Cygwin` , 但内置了如 `git` , `python` 等多种开发需要的环境, 还有最喜欢的 `ohmyzsh` .

##　一言难尽地更新

这玩意儿自带的 `git` 版本, 低的可怕, 更新比较简单, 需要在安装目录下, admin执行 `update.bat` , 问题是很慢, 有家伙的话, 在cmd里

``` BASH
# BASH
set http_proxy=http://127.0.0.1:10808
set https_proxy=http://127.0.0.1:10808
```

显著提高效率. 且自带的开发环境只在babun里有效, 所以如果要用 `git` , 还是要自己装.

