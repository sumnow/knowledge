# insertAdjcentHTML

insertAdjcentHTML,可以添加

    element.insertAdjcentHTML(position, text)

`position` 可选参数:

- beforebegin : before the ele itself;

- afterbegin: inside the ele, before its first child;

- beforend: inside the ele, after its last child;

- afterend: after the ele itself;

    // beforebegin
    <div>
        // afterbegin
        <span></span>
        // beforeend
    </div>
    // afterend

### querySelectorAll


### 上/下一个元素

    el.previousElementSibling
    el.nextElementSibing

### 获取/设置属性

    el.getAttribute('boo')
    el.setAttribute('boo','foo')

### getComputedStyle

    // null 不返回伪类
    getComputedStyle(el,null).color


### 设置样式

    el.setStyles

### class

    el.classList.add/remove/toggle

    