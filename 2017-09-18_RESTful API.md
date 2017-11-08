# restful接口规范v0.1

## 概述

网络应用程序，分为前端和后端两个部分。当前的发展趋势，就是前端设备层出不穷（手机、平板、桌面电脑、其他专用设备......）。

因此，必须有一种统一的机制，方便不同的前端设备与后端进行通信。RESTful API是目前比较成熟的一套互联网应用程序的API设计理论。本文就是基于RESTful API,用于规定上海联通各项目组在软件开发过程中应当遵守的标准化接口管理标准。


## 阅读本文的前置要求

1. 基本的网络传输协议知识。

## 本文受众

1. 开发人员

## 目录

- [介绍](#介绍)

- [域名及版本](域名及版本)

- [路径](#路径)

- [HTTP方法](HTTP方法)

- [过滤](#过滤)

- [状态码](#状态码)

- [Hypermedia API](#Hypermedia API)

- [其他注意事项](#其他注意事项)


### 介绍

REST(Representational State Transfer)，即表述性状态转移，通俗来说就是指资源，它将网络上的各种信息，都抽象为资源链接url，而各种api间的交互，其实也就是资源的交互，如某用户个人信息，某用户可以办理的套餐信息等等。

RESTful api的优势在于:

- 无状态。使得访问一个接口资源的时候不需要考虑上下文以及当前状态，大大降低了复杂度。

- 充分利用了HTTP的协议的语义性，使得接口更具有可读性。


### 域名及版本

api应该在一个专属域名下，以方便查询，如

    https://api.example.com

同时应该加上版本号，用来记录更新迭代，如

    https://api.example.com/v1

也可以加在请求头中，缺点是不直观，优点是不用换。

### 路径(Endpoint)

每一个url都应该代表一个资源，所以链接中应该只出现名词，而且最好应该对应数据库中的表格字段，既加强了代码的逻辑性，又方便以后的维护。

例如，有一个api用于提供所有用户的个人信息，对应的是数据库中users表中的user-information字段：

    http://api.example.com/v1/users/user-informations

### HTTP方法

REST中使用不同的HTTP方法来表示对资源的操作，让接口的语义性更强。

- GET（SELECT）：从服务器取出资源（一项或多项）。
- POST（CREATE）：在服务器新建一个资源。
- PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
- PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
- DELETE（DELETE）：从服务器删除资源。

例如，对于用户信息的操作：

- GET /user-informations 列出所有用户的信息
- POST /user-informations 新建一个用户信息
- GET /user-informations/ID 获取对应ID的用户信息
- PUT /user-informations/ID：更新某个指定用户的信息（提供该用户的全部信息）
- PATCH /user-informations/ID：更新某个指定用户的信息（提供该用户的部分信息）
- DELETE /user-informations/ID：删除某个用户的信息
- GET /user-informations/ID/name：列出某个指定用户的姓名信息
- DELETE /user-informations/ID/name：删除某个指定用户的姓名信息



### 过滤

获取到的所有资源不一定是我们都需要的，api应该提供一些过滤条件，让服务器筛选后返回结果,例如

- ?limit=10：指定返回记录的数量
- ?offset=10：指定返回记录的开始位置。
- ?page=2&per-page=100：指定第几页，以及每页的记录数。
- ?sortby=name&order=asc：指定返回结果按照哪个属性排序，以及排序顺序。
- ?type-id=1：指定筛选条件

### 状态码

- 200 OK - [GET]：服务器成功返回用户请求的数据，该操作是幂等的（Idempotent）。
- 201 CREATED - [POST/PUT/PATCH]：用户新建或修改数据成功。
- 202 Accepted - [*]：表示一个请求已经进入后台排队（异步任务）
- 204 NO CONTENT - [DELETE]：用户删除数据成功。
- 400 INVALID REQUEST - [POST/PUT/PATCH]：用户发出的请求有错误，服务器没有进行新建或修改数据的操作，该操作是幂等的。
- 401 Unauthorized - [*]：表示用户没有权限（令牌、用户名、密码错误）。
- 403 Forbidden - [*] 表示用户得到授权（与401错误相对），但是访问是被禁止的。
- 404 NOT FOUND - [*]：用户发出的请求针对的是不存在的记录，服务器没有进行操作，该操作是幂等的。
- 406 Not Acceptable - [GET]：用户请求的格式不可得（比如用户请求JSON格式，但是只有XML格式）。
- 410 Gone -[GET]：用户请求的资源被永久删除，且不会再得到的。
- 422 Unprocesable entity - [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误。
- 500 INTERNAL SERVER ERROR - [*]：服务器发生错误，用户将无法判断发出的请求是否成功。

可以在[这里](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)查看所有的状态码

状态码返回还应当包括一定的描述字符，如状态码为4XX，应该向用户返回错误信息：

    {
        error：'invalid key'
    }


### Hypermedia API

超媒体api，即访问url，不仅仅返回了资源，而且返回了一组指示性的链接,例如，我请求了一位用户的信息：

    GET /user-informations/13800001111 //请求id为13800001111的用户信息

应当返回如下：

    {
        userId: '13800001111',
        userName: 'liming',
        userIdentification: '32110000000000000910',
        _link: {
            // 当前url
            self: '/user-informations/13800001111',
            // 修改信息的url
            revise: '/user-informations/13800001111?params',
            // 查询用户套餐的url
            queryPackage: '/package/13800001111'
            ...
        }
    }

Hypermedia 的目的在于增强api的完整度，让用户在使用过后，知道自己下一步想要去的是哪个链接。


### 其他注意事项

1. content-type默认为json也请尽量使用json返回数据;

2. 当客户端只支持POST或GET方法时，可以使用传递方法参数_method=DELETE来传递方法名;

3. POST与PUT方法都是创建资源,区别在于创建的资源是否由客户端决定;

4. url单词间应使用“-”，如用户信息user-information，key应当使用驼峰标识;

5. 所有时间戳都应返回ISO 8601格式：`YYYY-MM-DDTHH:MM:SSZ`

6. 权限认证应该使用OAuth2.0



### 参考文档

- [阮一峰-RESTful api设计指南](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)

- [github api规范](https://developer.github.com/v3/)






