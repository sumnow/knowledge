<!--
Created: Mon Aug 26 2019 15:19:46 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:19:46 GMT+0800 (China Standard Time)
-->
# 点击页面禁用右键

### 禁用右键

``` html
    javascript:alert(document.onselectstart = document.oncontextmenu= document.onmousedown = document.onkeydown= function(){return false; });

    $(document).bind('contextmenu',
    function(e) {
    return false;
    });

    <body oncontextmenu="return false"></body>

    <body oncopy="returnfalse">
        //禁止复制

        <input type="" name="" id="" value="" onpaste="returnfalse" />
        //禁止粘贴

        <body onselectstart="return false ">
            //禁止被选中
```

### 禁用左键

``` css
    .disabled {
        pointer-events: none;
        cursor: default;
        opacity: 0.6;
        user-select: none;
    }
```

### 禁用右键

``` js
event.preventDefault()
event.stopPropagation()
```

