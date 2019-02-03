# 点击页面禁用右键

### 禁用右键

```html
    javascript:alert(document.onselectstart = document.oncontextmenu= document.onmousedown = document.onkeydown= function(){return false; }); 

    $(document).bind('contextmenu', 
        function(e) {
            return false; 
        }); 

    <body oncontextmenu="return false"></body>

    <body oncopy="returnfalse">  
    //禁止复制

    <input type=""name=""id=""value=""onpaste="returnfalse"/>  
    //禁止粘贴

    <body onselectstart="return false ">   
    //禁止被选中
```

### 禁用左键

```css
    .disabled {
        pointer-events: none; 
        cursor: default; 
        opacity: 0.6; 
         user-select:none; 
    }
```

### 禁用右键

    event.preventDefault()
    event.stopPropagation()

