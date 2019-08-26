<!--
Created: Mon Aug 26 2019 15:18:16 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:18:20 GMT+0800 (China Standard Time)
-->
# insertAdjcentHTML

insertAdjcentHTML, 可以添加

``` js
element.insertAdjcentHTML(position, text)
```

`position` 可选参数:

* beforebegin : before the ele itself; 

* afterbegin: inside the ele, before its first child; 

* beforend: inside the ele, after its last child; 

* afterend: after the ele itself; 

``` html
    // beforebegin
    <div>
        // afterbegin
        <span> </span>
        // beforeend
    </div>
    // afterend
```

### querySelectorAll

### 上/下一个元素

``` js
el.previousElementSibling
el.nextElementSibing
```

### 获取/设置属性

``` js
el.getAttribute('boo')
el.setAttribute('boo', 'foo')
```

### getComputedStyle

``` js
// null 不返回伪类
getComputedStyle(el, null).color
```

### 设置样式

``` js
el.setStyles
```

### class

``` js
el.classList.add / remove / toggle
```

