# js中的跨域

参考[http://www.cnblogs.com/2050/p/3191744.html]
js在不同域名之间进行数据传输和通信， 例如ajax请求， js获取iframe中的数据。 

只要协议、 域名、 端口任意不同就是不同域。 

 `http||https://www.baidu.com(:8080)/index.html` 

index.html可以改变为统一域名下的任意地址, 如dir/other.html, etc/dist/another.html
其中： 
1. 如果是协议和端口造成的跨域问题， js是无能为力的， 

2. 在跨域问题上， 域仅仅是通过“URL的首部”来识别而不会去尝试判断相同的ip地址对应着两个域或两个域是否在同一个ip上， 即localhost和127.0.0.1也会产生跨域的问题。 

##jsonp
ajax生成的XMLHTTPRequest是无法跨域的， 但js脚本却可以跨域。 
 `<script>` 
 `function somefun(){` 

 `//something` 

 `}` 
 `</script>` 
 `<script src="target.php?callback=somefun"></script>` 

不过， target.php?callback=somefun应当返回一个callback([data])函数， 即somefun([data]), jqeury的getJSON会判断是否跨域， 而使用json/jsonp来处理。 

    $.getJSON('http://target.com/target.php?callback=?', function(jsondata) {
        //something
    }); 

jquery封装后， 不需要手动的插入script标签， 定义回调函数， 它会自动生成一个全局函数来替换callback=?的问号， 获取数据后自动销毁， 作为一个临时函数。 

##window.name
在一个窗口(window)的生命周期中， 窗口载入的所有页面共享同一个window.name， 不会因为页面的跳转而重置。 

在a页面中： 

    var window.name = 'hah'; 
    setTimeout(function() {
        window.location = 'b.html'
    }, 3000); 

之后在b页面中输出window.name; 

    console.log(window.name) //'hah'

注意window.name只能是字符串形式。 

在页面中嵌入一个隐藏的iframe。 

    function getData() {
        var iframe = document.getElementById('frame')
        iframe.onload = function() {
            var data = iframe.contentWindow.name; //data即所需要的数据
        }
        iframe.src = 'about:blank'; //需要和当前页面同源， 以让当前页面可以访问iframe。 
    } < iframe id = 'frame'
    src = "taget.html"
    style = "display: none"
    onload = 'getData()' > < /iframe>

