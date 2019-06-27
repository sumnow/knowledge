# caller 和 callee

caller 以及 callee是比较少见的属性, 可能才了解前端的童鞋都认识。 

callee是arguments的属性, 值为调用该参数的函数(即是该函数)。 
    

    function apple() {
        console.log(arguments.callee) // apple(); 
    }

caller是function的属性, 值为调用该函数的函数(若函数为顶层函数, 则返回null)。 

    function banana() {
        apple(); 
    }

    function apple() {
        console.log(apple.caller) // banana()
    }

这两个属性用的越来越少, 一方面是因为函数本身的属性应用场景少, 例如name, length, constructor, 另一方面, es6箭头函数的推出, 让箭头函数不再持有 `arguments` 与 `caller` 。 在es6中使用, 会产生如下错误信息, 提示是受限的属性。 

    'caller'
    and 'arguments'
    are restricted

    function properties and cannot be accessed in this context.

> 严格模式中也无法使用 `arguments` , 且当函数为匿名函数的时候, `callee` 返回 `undefined` 。 

我只说下个人对于这两个属性的应用的小小见解。 

### callee

在递归中, 如下

    function factorial(n, total) {
        if (n === 1) return total; 
        return factorial(n - 1, n * total); 
    }
    factorial(5, 1) // 120

这个函数中 factorial 在函数体内也出现, 通俗地说就是如果我要修改函数名, 需要修改两处。 如果用下面的方式就只用修改一次。 

    function factorial(n, total) {
        if (n === 1) return total; 
        return arguments.callee(n - 1, n * total); 
    }

### caller

这个可以查看函数的调用链, 如下: 

    function main() {
        apple(); 
    }

    function orange() {
        watermelon()
    }

    function watermelon() {
        peach()
    }

    function grape() {
        lemon()
    }

    function lemon() {
        summary(); 
    }

    function peach() {
        grape(); 
        // console.log(arguments.callee.caller.name); 
    }

    function apple() {
        orange(); 
    }

    function summary() {
        let arg = arguments.callee; 
        let arr = [arguments.callee.name]; 

        function _summary(a) {
            if (a.caller) {
                arr.unshift(a.caller.name.toString()); 
                _summary(a.caller); 
            } else {
                console.log(arr.join('->'))
            }
        }
        return _summary(arg); 
    }
    console.log(main())

结果为

    main - > apple - > orange - > watermelon - > peach - > grape - > lemon - > summary

加一点场景, 更好理解, 例如, 李太太出门买水果(main), 买了一个后买另一个, 到家后开始结算(summary), 忘记了自己买水果的顺序, 那么上列的结果就阐明了买水果的顺序。 

---

最近写了一些东西, 都没有提交, 一方面是工作中有些忙, 另一方面, 也反思了一下自己是否有些急躁冒进了。 

前端的框架百花齐放, 而知识点又星罗棋布, 一方面忙于学习新框架的使用, 另一方面还要查漏补缺, 极少有时间抬头看看, 自己是不是还走在正确的道路上。 

正如, 在学习框架的时候, 自己有没有想过它是怎么实现的, 大部分人都把框架当作一个黑盒子, 输入数据进去, 给我答案出来, 这只能说明框架足够优秀。 

读《哈姆雷特》的是读者, 而写哈姆雷特的是莎士比亚。 

阅读了太多的东西, 总渴望自己写点什么, 让别人认可。 

此后, 还会陆续更新自己微薄的见解, 与有缘相遇的大家, 共同进步。 

