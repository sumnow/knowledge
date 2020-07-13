<!--
Created: Thu Jul 09 2020 15:57:59 GMT+0800 (China Standard Time)
Modified: Thu Jul 09 2020 15:59:43 GMT+0800 (China Standard Time)
-->

# docker

docker 解决的问题: 

1. 开发和服务器环境不一致
2. 需要配置海量服务器
3. 一个服务卡顿导致所有用户卡顿

## docker的思想

1. 集装箱

将内容放到集装箱中, 一旦有谁需要就可以直接获取

2. 标准化

3. 隔离化
docker运行集装箱里的内容,会单独开辟一个空间,不会影响别人

### 组成

注册中心(收纳集装箱的码头)
镜像(集装箱)
容器(运行起来的镜像)