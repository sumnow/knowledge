# vue history and hash

---

##### 更新

浏览器有两种路径模式

### hash 

hash 虽然出现在 URL 中, 但不会被包含在 http 请求中, 对后端完全没有影响, 因此改变 hash 不会重新加载页面.

### history

history 利用了 html5 history interface 中新增的 pushState() 和 replaceState() 方法。 这两个方法应用于浏览器记录栈, 在当前已有的 back、 forward、 go 基础之上, 它们提供了对历史记录修改的功能。 只是当它们执行修改时, 虽然改变了当前的 URL , 但浏览器不会立即向后端发送请求。 

hashchange 只能改变 # 后面的代码片段, history api (pushState、 replaceState、 go、 back、 forward) 则给了前端完全的自由, 通过在window对象上监听popState()事件。 

通过 pushState 把页面的状态保存在 state 对象中, 当页面的 url 再变回到这个 url 时, 可以通过 event.state 取到这个 state 对象, 从而可以对页面状态进行还原, 如页面滚动条的位置、 阅读进度、 组件的开关等。 

### 区别

pushState 设置的 url 可以是同源下的任意 url ; 

而 hash 只能修改 # 后面的部分, 因此只能设置当前 url 同文档的 urlpushState 设置的新的 url 可以与当前 url 一样, 这样也会把记录添加到栈中; 

hash 设置的新值不能与原来的一样, 一样的值不会触发动作将记录添加到栈中

pushState 通过 stateObject 参数可以将任何数据类型添加到记录中; 

hash 只能添加短字符串

pushState 可以设置额外的 title 属性供后续使用

history 在刷新页面时, 如果服务器中没有相应的响应或资源, 就会出现404。 因此, 如果 URL 匹配不到任何静态资源, 则应该返回同一个 index.html 页面, 这个页面就是你 app 依赖的页面

hash 模式下, 仅 # 之前的内容包含在 http 请求中, 对后端来说, 即使没有对路由做到全面覆盖, 也不会报 404.

### history 模式下刷新的问题

首先route中应当有一个

    {
        path: '*', 
        component: notFound
    }

来匹配那些没有对应页面的path.

其次, 在后端请求 资源(img, html等)的时候, 将获取失败的请求变成返回 `index.html` (text/html), vue route解析url会去到相应到页面.

---

vue-router 中 `mode` 有 `hash` (default) 和 `history` , 两种模式, 区别详见[html5 History]()

在业务中, 我们将所有的静态页面都放置在同一个服务器下 `static.file.cn` , 为了区分, 每个vue项目都以新的文件夹命名。 

但这种模式在history模式下, 会遇到一些问题, 例如一个 `example` 项目

把 `https://static.file.cn/example/Login` 为项目的登陆页, `https://static.file.cn/example` 为首页, 在项目内部用 `router.push` 方法跳转是可以实现路由转变的, 倘若用户在 `Login` 下刷新页面, 就会变成 404 页面了, 因为在服务器解析中, 寻找的是服务器下的文件, 是无法寻找到 `Login` 的, 这种情况下, 在 `vue-router` 项目中, 添加 `base: example` , 此外需要服务端的配合, 例如 `ngnix` , 

```bash
    overwritte url 
    location / example {
        try_files $uri $uri / /index.html; 
    }
```

此外还有配置 `static` 文件, 否则会全部按照 `text/plain` 解析成html.

