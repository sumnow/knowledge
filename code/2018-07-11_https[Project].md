# https 详解

https 是在http 协议层的基础上加了ssl加密，加密方法是使用非对称加密传递对称加密的密钥，之后就使用对称密钥来加密传递的消息。


#### 关于加密的必要性

两个比较常见的劫持手段， 

##### http劫持

你打开某站，然后右下角弹出了广告。

> 在正确的网站信息上，加入额外的信息。

##### dns劫持

你打开某网站，跳到了一个不相关的网站。

> 伪装成dns服务器，控制某些域名的解析权，修改解析结果。

#### RSA加密

RSA 算法基于一个简单的数论理论：将两个大素数相乘十分容易，但是想要对其乘积进行因式分解却极其困难，因此可以将乘积公开作为加密密钥。

劣势就在于加密解密时间较长，不适合加密数据量大的消息。

服务端持有私钥，并使用私钥加密自己的信息，客户端持有公钥，使用公钥解密信息。然后再使用公钥加密自己的信息，传递给服务端，只有服务端可以解出信息的内容。

#### 对称加密

对称加密是使用相同的密钥进行加密与解密操作。例如DES加密还有AES加密。

1. DES（Data Encryption Standard）：对称算法，数据加密标准，速度较快，适用于加密大量数据的场合； 

2. AES（Advanced Encryption Standard）：高级加密标准，对称算法，是下一代的加密算法标准，速度快，安全级别高，在21世纪AES 标准的一个实现是 Rijndael 算法；

3. RSA：由 RSA 公司发明，是一个支持变长密钥的公共密钥算法，需要加密的文件块的长度也是可变的，非对称算法； 

4. TEA(Tiny Encryption Algorithm)简单高效的加密算法，加密解密速度快，实现简单。但安全性不如DES，QQ一直用tea加密

#### CA(Certificate Authority) 第三方认证机构

CA是为了防止中间人伪造身份，发送虚假的密钥，来截取信息。

当 客户端 得到 服务端 提供的数字证书，会拿到其中的数字签名和 服务端 的个人信息，然后用 CA 的公钥对这个数字签名进行非对称解密，得出的信息假如和 服务端 的数字证书中 服务端 的个人信息一样的话，就相信这个数字证书确实是 CA 认证过的。

> 签发CA证书的机构（最具有公信力的机构）签发的，即是“根证书”，还有其授权签发证书的机构（中间CA）签发的，即是“中间证书”，这种关系被称为“证书链”。


![img](../img/2018071101.png)


##### PS

在https 的网页里加载 http的资源是会导致报错的，例如加载一个css资源。

    Mixed Content: The page at 'https://blog.csdn.net/toubaokewu/article/details/78873697' was loaded over HTTPS, but requested an insecure stylesheet 'http://csdnimg.cn/release/phoenix/template/css/chart-3456820cac.css'. This request has been blocked; the content must be served over HTTPS.

目前一个可靠的解决方案是，有两套css文件分别部署在 http 和 https 服务下，页面中使用自适应协议来解决。

    <link href="//exmaple.css">

