# js事件流

## 事件冒泡

从最具体的元素开始一层层向上传递，就是从元素本身一直到body>html>document>window(远古ie8直到document);

## 事件捕获

从最不具体的元素开始一层层向下传递，同样是从window>document>html>body>element(远古ie不再支持)

为了兼容这两种方式，w3c规定事件是先从window捕获到元素，然后再冒泡到window，在此需要说下

## dom事件的分类

### dom 0级事件

主要有两种格式：写在标签里的onclick事件以及ele.onclick = function(){}，这种情况下，`事件只发生冒泡的阶段`。

### dom 2级事件

主要就监听和移除事件，addEventListener()和removeEventListener()。

它们都有三个参数：第一个参数是事件名称，第二个是事件函数，第三个boolean为true则是捕获，否则是冒泡。

这里又要多一句，在dom2级中规定的是`实际发生事件的元素在捕获阶段不能接收到事件`。也就是说捕获阶段是没有发生元素事件的，只有冒泡过程中才会触发。如下

![](http://images2015.cnblogs.com/blog/1121217/201704/1121217-20170426094034287-1122722262.png)

然而在浏览器的实现上，都是冒泡与捕获均能触发事件。

### 添加事件

    var addEvent = function( obj, type, fn ) {
      if (obj.addEventListener)
          obj.addEventListener( type, fn, false );
      else if (obj.attachEvent) {//这个是兼容ie7,ie8
          obj["e"+type+fn] = fn;
          obj.attachEvent( "on"+type, function() {
              obj["e"+type+fn].call(obj, window.event);
          } );
      }
    };

### 移除事件

    var removeEvent = function( obj, type, fn ) {
      if (obj.removeEventListener)
          obj.removeEventListener( type, fn, false );
      else if (obj.detachEvent) {
          obj.detachEvent(  "on" +type, obj["e"+type+fn] );
          obj["e"+type+fn] = null;
      }
    };

### 阻止事件（冒泡以及默认行为）

    var stopEvent = function(e){
        e = e || window.event;
        if(e.preventDefault) {
          e.preventDefault();//阻止默认事件
          e.stopPropagation();//阻止冒泡
        }else{
          e.returnValue = false;
          e.cancelBubble = true;
        }
    }

### 获取事件源对象

    var getEventTarget = function(e){
       e = e || window.event;
      var target = event.srcElement ? event.srcElement : event.target;
      return target;
    }


### 绑定onpropertychange事件
onpropertychange，它在一个元素的属性发生变化的时候触发，一般用在表单元素中捕获其value值改变，它比onchange事件更实时捕获它的改变，不过为微软私有事件。FF大致和它相似的有oninput事件，不过它只针对textfield与textarea的value属性。safari，firefox，chrome与 opera都支持此事件。

     var addPropertyChangeEvent = function (obj,fn) {
      if(window.ActiveXObject){
          obj.onpropertychange = fn;
      }else{
          obj.addEventListener("input",fn,false);
      }
    }

## 点击空白处关闭

    $(document).click(function(e) {
        function autoHide(i) {
            this.e = e;
            var con = $(i);
            if (!con.is(e.target) && con.has(e.target).length === 0) {
                con.addClass('hidden');
            }
        }
        autoHide(ele)
    }

这个也会有些问题，例如我要实现一个自定义省份选择菜单

![](http://images2015.cnblogs.com/blog/1121217/201704/1121217-20170426104529709-1467131831.png)

添加了这个元素以后，并且给这个输入框添加事件后，点击会发现下拉框没有显示，是因为，输入框也是下拉框的元素之外，点击会让它隐藏，那么就需要在点击输入框后阻止接下来的事件。

    $('body').on('click', ' .select-choose', function() {
        $(this).next('.select-open').toggleClass('hidden');
        return false;//阻止事件冒泡，也阻止了事件
        //event.stopPropagation();//只阻止事件冒泡
    });

### return false和stopPropagation()

return false也是一种让a标签失效的办法，并且会阻止事件本身,而stopPropagation是js原生的效果，且不会阻止事件本身，举个栗子

    <a href="https://www.baidu.com" id="lnktoBaidu">1231231</a>
    $('#lnktoBaidu').click(function(e){
        e.stopPropagation(); //跳转到baidu
        // return false; //原页面不跳转
    })

这个return false有点像上面阻止事件的写法

    e.preventDefault();//阻止默认事件
    e.stopPropagation();//阻止冒泡
    rerturn '';//终止函数，返回，代表之后的回调都不会执行了。

这就是return false的机制了。

### 事件委托

下面再顺便说下事件委托的机制，常见的，例如一个ul下某个li变化

    ul.onmouseover = function(e){
      var e = e || window.event;
      var target = e.target || e.srcElement;
      if(target.nodeName == "LI"){
        target.style.background = "red";
      }
    }

本质上就是在父元素上绑定事件，在子元素触发某些条件的时候改变，那么就不要在每个子元素上绑定事件，大大提高了效率不说，而且还能应对`添加某些元素后的事件响应`。

改天可以说说event，这个也很能讲讲。
