# css initial inherit and unset

### initial

initial 关键字用于设置 CSS 属性为它的默认值, 可作用于任何 CSS 样式。 (IE 不支持该关键字)

### inherit

默认为 inherited: Yes 的元素

所有元素可继承: visibility 和 cursor
内联元素可继承: letter-spacing、 word-spacing、 white-space、 line-height、 color、 font、 font-family、 font-size、 font-style、 font-variant、 font-weight、 text- decoration、 text-transform、 direction
块状元素可继承: text-indent和text-align
列表元素可继承: list-style、 list-style-type、 list-style-position、 list-style-image
表格元素可继承: border-collapse

比较经典的就是 `font-family` 

    html {
        font - family: 'PingFang'
    }
    input, textarea {
        font - family: inherit
    }

### unset

名如其意, unset 关键字我们可以简单理解为不设置。 其实, 它是关键字 initial 和 inherit 的组合。 

什么意思呢？ 也就是当我们给一个 CSS 属性设置了 unset 的话: 

如果该属性是默认继承属性, 该值等同于 inherit
如果该属性是非继承属性, 该值等同于 initial
举个例子, 先列举一些 CSS 中默认继承父级样式的属性: 

部分可继承样式: font-size, font-family, color, text-indent
部分不可继承样式: border, padding, margin, width, height