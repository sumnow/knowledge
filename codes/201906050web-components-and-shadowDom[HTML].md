# web components and shadowDom

Web Components are a set of features that provide a standard component model for the Web allowing for encapsulation and interoperability of individual HTML elements.

Primary technologies used to create them include:

1. Custom Elements – APIs to define new HTML elements
2. Shadow DOM – Encapsulated DOM and styling, with composition
3. HTML Templates, an HTML fragment is not rendered, but stored until it is instantiated via JavaScript

以上是Web Components的定义, 目前这个思想被众多框架借鉴, 他出现的时间非常之早, 后来2014年出现的vue也多有借鉴之处.

Web Components were introduced by Alex Russell at Fronteers Conference 2011 for the first time. [17]

Polymer, a library based on Web Components was released by Google in 2013.[18]

## Custom Elements

这是给予用户自定义标签的能力

``` html
<my-buttom>
    </my-button>
```

``` 
 var MyButtom = document.registerElement('my-buttom', {})
```

## Shadow Dom

在浏览器中像vedio等原生的控件, 如果我们在chrome中勾选 `Show user agent shadow DOM` 就可以将控件展开, 内部的内容就是shadow Dom , 且不会受到外部的样式或者js的影响

``` html
<video controls="">
    <source src="https://mdn.mozillademos.org/files/2587/AudioTest%20(1).ogg" type="audio/ogg">
</video>
```

## HTML Templates

``` html
<html>
<template>
    <h1>
        <slot name="title"></slot>
    </h1>
    <p>
        <slot name="description"></slot>
    </p>
</template>

</html>
```

## web components

三者一起利用就可以形成 `web components` 

``` html
<template id="wgTemplate">
    <style>
        .btn {
            color: #fff;
            background: #006dcc;
        }
    </style>
    <button type="button" class="btn">custom button widget</button>
</template>
<script type='text/javascript'>
    var proto = Object.create(HTMLElement.prototype, {
        createdCallback: {
            value: function() {
                var tp = document.querySelector('#wgTemplate')
                var clone = document.importNode(tp.content, true)
                this.createShadowRoot().appendChild(clone)
            }
        }
    })

    var MyButtom = document.registerElement('my-buttom', {
        prototype: proto
    })

    document.body.appendChild(new MyButtom())
</script>
```

