<!--
Created: Mon Aug 26 2019 15:22:03 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:22:03 GMT+0800 (China Standard Time)
-->
# Line feed and html entities

首先吐槽一下, 换行真是个坑爹的东西

吐槽完毕, 首先不讨论 `\n` 和 `</br>` 这两个js和html的专属换行方式.

常用场景就是, 从后端拿了一段文本, 前端需要显示出来, 通常会有

``` js
text = text.replace(/\n/g, `</br>` )
```

来换行.

但是呢, 在文本中, 可能会有像 `<` 这种会被误解为标签之类的字符, 所以需要一些实体字符来表示, 在[这里](https://www.freeformatter.com/html-entities.html)或者[这里](https://dev.w3.org/html5/html-author/charref)查看更多细节.

### white-space

但是呢, 有时候, 在html页面之中, 即便我们写了换行符, 也依然没有换行这是为啥呢?

这是因为在html中的合法文本, 都可以视作被span包裹的, 你想在span里的回车或者多个空格是不是都会被视作一个空格呢?

这又和span标签的一个属性有关 `white-space` 属性

> 在span里使用换行的实体 `&#10; ` 也是没有效果的, 毕竟是被 `white-space` 支配了.

| 值       | 描述                                                   |
|----------|--------------------------------------------------------|
| normal   | 默认. 空白会被浏览器忽略. |
| pre      | 空白会被浏览器保留. 其行为方式类似 HTML 中的 `<pre>` 标签. |
| nowrap   | 文本不会换行, 文本会在在同一行上继续, 直到遇到 `<br>` 标签为止. |
| pre-wrap | 保留空白符序列, 但是正常地进行换行. |
| pre-line | 合并空白符序列, 但是保留换行符. |
| inherit  | 规定应该从父元素继承 white-space 属性的值. |

通过处理这个属性解决换行文本内换行的问题才是正解.

