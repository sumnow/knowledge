# vue history and hash

vue-router 中 `mode` 有 `hash` (default) 和 `history` ， 两种模式， 区别详见[html5 History]()

在业务中， 我们将所有的静态页面都放置在同一个服务器下 `static.file.cn` ， 为了区分， 每个vue项目都以新的文件夹命名。 

但这种模式在history模式下， 会遇到一些问题， 例如一个 `example` 项目

 `https://static.file.cn/example/Login` 为项目的登陆页, `https://static.file.cn/example` 为首页， 在项目内部用 `router.push` 方法跳转是可以实现路由转变的, 倘若用户在 `Login` 下刷新页面， 就会变成 404 页面了， 因为在服务器解析中， 寻找的是服务器下的文件， 是无法寻找到 `Login` 的， 这种情况下， 在 `vue-router` 项目中， 添加 `base: example` ， 此外需要服务端的配合， 例如 `ngnix` ， overwritte url 

    location / example {
        try_files $uri $uri / /index.html; 
    }

此外还有配置 `static` 文件， 否则会全部按照 `text/plain` 解析成html。 

