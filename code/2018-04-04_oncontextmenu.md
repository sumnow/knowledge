# 点击页面禁用右键

### 禁用右键

    javascript:alert(document.onselectstart = document.oncontextmenu= document.onmousedown = document.onkeydown= function(){return false;});

### 禁用右键

    .disabled {
        pointer-events: none;
        cursor: default;
        opacity: 0.6;
    }

### 禁用右键

    event.preventDefault()
    event.stopPropagation()