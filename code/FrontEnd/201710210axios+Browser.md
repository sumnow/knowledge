# axios

## 定义

axios 是一个开源的基于Promise的一个http客户端, 封装了各种操作, 使用便捷。 

一个常见的axios代码

    //axios
    import axios from 'axios'; 

    // ui.webViewBounce.disable = false; 

    const request = (url = 'http://138.128.192.220:8080/order', params = {
        message: `$m.rint(1, 3)` 
    }, method = 'get') => {
        let config = {
            url: url, 
            method: method, 
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }, 
            transformRequest: [function(data) {
                // Do whatever you want to transform the data
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }], 
        }; 

        if (method === 'get' || method === 'delete') {
            config.params = params; 
        } else {
            config.data = params; 
        }
        console.log(config)

        return new Promise((resolve, reject) => {
            axios(config).then(res => {
                if (res.data) {
                    resolve(res.data); 
                } else {
                    reject('fetch__err'); 
                }
            }).catch(err => {
                reject((err.response && err.response.data && err.response.data.body) || 'request fail'); 
            })

        })
    }

    export default request; 

以上的代码可以直接使用import导入

里面其实有个问题:

header 如果不使用 `application/x-www-form-urlencoded` , post提交的时候会在预检请求 `OPTION` 的时候报错失败, 这是因为服务器没有进行CORS的配置, 如果没有报错, 说明服务器已经配置过了, 就不需要header了。 

同时, config中的 `transformRequest` 也是因为在表单中提供时, post需要以Uncode编码模式发送, 如 `foo=2&coo=3` 
