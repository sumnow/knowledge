# docker

docker 相比传统虚拟机的优势就不赘述了

![docker相比传统虚拟机](../img/2020111001.png)

其中虽然docker是不需要os的,但是其实每个镜像里都需要rootfs的系统来实现文件挂载之类的能力.

``` BASH
# BASH
docker images // 拉取所有镜像
```

镜像与容器,就是类与实例的关系,举个例子


