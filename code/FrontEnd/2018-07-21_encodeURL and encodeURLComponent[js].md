# encodeURI 和 encodeURIComponent 的区别

### url 编码

世界上的url仿佛只有英文的，这是为啥呢？这是因为如果允许各种奇怪的字符，浏览器就没办法准确地转发到相应的服务器上，你问，为啥不用一个囊括所有字符的标准来规定？因为当初规定的人是个自私鬼，只想到了自己的语言。

网络标准RFC 1738就这么规定了：

> "...Only alphanumerics [0-9a-zA-Z], the special characters "$-_.+!*'()," [not including the quotes - ed], and reserved characters used for their reserved purposes may be used unencoded within a URL."

那么，超出规定的那些url中的字符都需要被转码才能够使用，麻烦在标准没有规定大家使用哪种编码规范。“URL编码”成为了一个混乱的领域。

有些浏览器使用了`UTF-8` `GB2312`,如果html document 没有规定解析方式，就按照浏览器默认的编码解析。

    <meta http-equiv="Content-Type" content="text/html;charset="utf-8">

例如，万恶的ie就是用`gb2312`。


##### 关于编码

gb2312是简体中文的码 
gbk支持简体中文及繁体中文 
big5支持繁体中文 
utf-8支持几乎所有字符 

### encodeURL and encodeURLComponent

encodeURI 是对统一资源标识符 (URI) 全部编码，而 encodeURIComponent 对统一资源标识符 (URI) 部分编码。

假设一个 URI 是一个完整的 URI, 那么我们不必对那些在 URI 中保留的并且带有特殊含义的字符进行编码。由于 encodeURI 会替换掉所有字符，但是却不包含一些保留字符，如 "&", "+", "=" 等（这些字符在 GET 和 POST 请求中是特殊字符，需要被编码），所以 encodeURI 本身无法产生能使用与 HTTP GET 或者 POST 请求的 URI。但是我们可以使用 encodeURIComponent 来对这些字符进行编码。

encodeURIComponent 转义除了字母、数字、(、)、.、!、~、*、'、-和_之外的所有字符。
为了避免服务器收到不可预知的请求，对任何用户输入的作为 URI 部分的内容都需要用 encodeURIComponent 进行转义。