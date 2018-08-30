# BEM CSS

BEM CSS 是一种规范，即Block__Element--Modifiers

对于css来说驼峰命名并不是一个好方法，大家还是更喜欢连字符`-`

例如我有一个菜单页面，里面有各种菜单，例如食物的菜单`food-menu`，

    .food-menu {
        color: #333;
    }

那么菜单呢，还有菜单头，也有菜单尾

    .food-menu__header{
        font-weight:bold;
    }
    .food-menu__option{
        font-size: 1.2rem;
    }

再例如，菜单选中的选项

    .food-menu__header--selected{
        color: #c00;
    }

这其实是一种格式化css代码的方式，有了约定以后一眼就可以看出css的功能性。

此外再补充些其他的css习惯吧

css属性从上到下应该是位置属性(position,display,left),然后是大小属性(width,height,margin,padding),然后是文字属性(font-size,text-aglin,content),然后是背景边框(background,border),然后是其他属性。

    .css {
        position: relative; 
        width: 100%;
        padding: 10px;
        content: '';
    }

BEM 使用起来可能有些复杂，可以使用简易版得方法，例如

    .foodmenu_header-selected

`adj.n._ele.-adv.`来命名。

其实多数变量名都可以如此来命名，又比如函数名。当然了，多数人还是默认以`_private`下划线开头的是私有方法。