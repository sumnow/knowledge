<!--
Created: Mon Aug 26 2019 15:22:55 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:22:55 GMT+0800 (China Standard Time)
-->
# css 的加载造成影响

1. css并不会阻塞DOM树的解析.
2. css加载会阻塞DOM树渲染.
3. css加载会阻塞后面的js语句的执行

在加载css的时候, 可能会修改下面DOM节点的样式, 如果css加载不阻塞DOM树渲染的话, 那么当css加载完之后, DOM树可能又得重新重绘或者回流了, 这就造成了一些没有必要的损耗.

js 语句可能会修改dom的css的样式, 所以css加载会阻塞js执行.

