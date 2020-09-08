<!--
Created: Tue Sep 08 2020 17:07:58 GMT+0800 (China Standard Time)
Modified: Tue Sep 08 2020 17:11:55 GMT+0800 (China Standard Time)
-->

# 文本省略

## 单行css

``` CSS
/* CSS */
.body {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis；
}
```

## 多行文本css

### 纯css

``` CSS
/* CSS */
.body {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

### 为元素

``` CSS
/* CSS */
.demo {
  position: relative;
  line-height: 20px;
  height: 40px;
  overflow: hidden;
}

.demo::after {
  content: "...";
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0 20px 0 10px;
}
```

## js实现

``` JS
// JavaScript
const text = '这是一段很长的文本';
const totalTextLen = text.length;
const formatStr = () => {
  const ele = document.getElementsByClassName('demo')[0];
  const lineNum = 2;
  const baseWidth = window.getComputedStyle(ele).width;
  const baseFontSize = window.getComputedStyle(ele).fontSize;
  const lineWidth = +baseWidth.slice(0, -2);

  // 所计算的strNum为元素内部一行可容纳的字数(不区分中英文)
  const strNum = Math.floor(lineWidth / +baseFontSize.slice(0, -2));

  let content = '';

  // 多行可容纳总字数
  const totalStrNum = Math.floor(strNum * lineNum);

  const lastIndex = totalStrNum - totalTextLen;

  if (totalTextLen > totalStrNum) {
    content = text.slice(0, lastIndex - 3).concat('...');
  } else {
    content = text;
  }
  ele.innerHTML = content;
}

formatStr();

window.onresize = () => {
  formatStr();
};
```
