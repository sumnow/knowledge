# animation事件接口

来自[链接](https://www.web-tinker.com/article/20338.html)

``` css
@-webkit-keyframes test {
    0% {
        background: red;
    }

    25% {
        background: green;
    }

    50% {
        background: blue;
    }

    100% {
        background: red;
    }
}

@keyframes test {
    0% {
        background: red;
    }

    25% {
        background: green;
    }

    50% {
        background: blue;
    }

    100% {
        background: red;
    }
}
```

``` js
onload = function() {
    var html = document.documentElement;
    //定义事件回调函数
    var start = function() {
            console.log("start");
        },
        iteration = function(e) {
            console.log(e);
        },
        end = function() {
            console.log("end");
        };
    //绑定事件
    html.addEventListener("webkitAnimationIteration", iteration);
    html.addEventListener("animationiteration", iteration);
    html.addEventListener("webkitAnimationStart", start);
    html.addEventListener("animationstart", start);
    html.addEventListener("webkitAnimationEnd", end);
    html.addEventListener("animationend", end);
    //开始执行动画
    html.style.animation = html.style.WebkitAnimation = "test 1s linear 0s 3";
};
```

