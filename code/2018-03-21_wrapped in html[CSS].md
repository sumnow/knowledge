# 折行

html中需要换行的时候都是用 `<br/>` ，或者少部分维持文本格式的标签 `<pre>` 。

后端传递包括换行的文本时，使用 `/n` ，而前端不认识,一下方法可以解决。

    replacenNtoBr (str = ' ') {
      return str.replace(/\\n/g, '</br>')
    }
