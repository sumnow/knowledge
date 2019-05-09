# Functions

People think that computer science is the art of geniuses but the actual reality is the opposite, just many people doing things that build on each other, like a wall of mini stones. 

-- Donald Knuth

人们认为计算机科学是天才的艺术, 但事实上是相反的, 是很多人依赖于彼此做事情, 像一面由小石头组成的墙. 

Functions are the bread and butter of JavaScript programming. The concept of wrapping a piece of program in a value has many uses. It gives us a way to structure larger programs, to reduce repetition, to associate names with subprograms, and to isolate these subprograms from each other. 

函数是js程序的面包和黄油. 将一段程序包装在一个值中的概念有很多用途. 它给我们一种方式来组合更大的程序, 来减少重复, 通过关联名字和子程序, 并且把子这些子程序彼此隔离. 

The most obvious application of functions is defining new vocabulary. Creating new words in prose is usually bad style. But in programming, it is indispensable. 

多数明显的函数应用是定义新的词汇. 再散文里创建一个新单词通常是一个坏风格. 但在程序中, 这是必要的. 

Typical adult English speakers have some 20, 000 words in their vocabulary. Few programming languages come with 20, 000 commands built in. *And the vocabulary that is available tends to be more precisely defined, and thus less flexible, than in human language*. Therefore, we usually have to introduce new concepts to avoid repeating ourselves too much. 

典型成人英语演说家有大概 2万个单词在他们的词汇量里. 少数编程语言有2万个内建命令. 与人类语言相比, 可用的词汇往往更精确地定义, 因此灵活性更低. 因此, 我们通常介绍一个新概念要避免重复他们本身太多次. 

### Defining a function

### 定义一个函数

A function definition is a regular binding where the value of the binding is a function. For example, this code defines square to refer to a function that produces the square of a given number: 

一个函数定义是一个常规绑定, 它绑定的值是一个函数. 例如, 这个代码定义 `square` 来引用一个函数, 它计算给出数字的平方: 

    const square = function(x) {
        return x * x;
    };

    console.log(square(12));
    // → 144

A function is created with an expression that starts with the keyword function. Functions have a set of parameters (in this case, only x) and a body, which contains the statements that are to be executed when the function is called. The function body of a function created this way must always be wrapped in braces, even when it consists of only a single statement. 

一个函数用一个以关键字 function 开头的表达式创建. 函数有一系列参数(例子里, 只有x) 和一个函数体, 它包括了当函数被调用时执行的语句. 一个函数用这种方式创造的函数体总是被大括号包裹, 甚至它只包含一个单语句. 

A function can have multiple parameters or no parameters at all. In the following example, makeNoise does not list any parameter names, whereas power lists two: 

一个函数可以有多样的参数或者完全没有参数. 在下面的例子里, makeNoise 没有列出任何参数的名字, 但power列出了两个: 

    const makeNoise = function() {
        console.log("Pling!");
    };

    makeNoise();
    // → Pling!

    const power = function(base, exponent) {
        let result = 1;
        for (let count = 0; count < exponent; count++) {
            result *= base;
        }
        return result;
    };

    console.log(power(2, 10));
    // → 1024

    
Some functions produce a value, such as power and square, and some don't, such as makeNoise, whose only result is a side effect. A return statement determines the value the function returns. When control comes across such a statement, it immediately jumps out of the current function and gives the returned value to the code that called the function. A return keyword without an expression after it will cause the function to return undefined. Functions that don't have a return statement at all, such as makeNoise, similarly return undefined. 

一些函数得到一个值, 例如 `power` 和 `square` , 还有一些不得到, 例如 `makeNoise` , 结果只是一个副作用. 一个 `return` 语句决定了函数返回的值. 当控制穿越了这样一个语句, 它会立刻跳出当前的函数, 并且给出叫做函数的代码的返回值. 一个 `return` 关键字没有一个表达式跟在它后面会导致函数去返回 `undefined` . 没有一个 `return` 语句的函数, 像 `makeNoise` , 类似于返回 `undefined` . 

Parameters to a function behave like regular bindings, but their initial values are given by the caller of the function, not the code in the function itself. 

函数的参数行为类似通常的绑定, 但他们的初始值是函数调用者给出的, 不是函数自己内部的代码. 

### Bindings and scopes

### 绑定和作用域

Each binding has a scope, which is the part of the program in which the binding is visible. For bindings defined outside of any function or block, the scope is the whole program—you can refer to such bindings wherever you want. These are called global. 

每一个绑定都有一个范围, 程序的某一部分, 绑定是可见的. 因为绑定定义在任何的函数或者块的外边, 范围就是整个程序-- 你可以引用这样的变量在任何你想的地方. 他们叫做全局的. 

But bindings created for function parameters or declared inside a function can be referenced only in that function, so they are known as local bindings. Every time the function is called, new instances of these bindings are created. This provides some isolation between functions—each function call acts in its own little world (its local environment) and can often be understood without knowing a lot about what's going on in the global environment. 

但由函数参数或者声明创建的在函数内部的绑定只可以在这个函数里引用, 因此他们叫做本地绑定. 每次函数被调用的时候, 一个他们绑定的实例被创建. 这提供了一些函数之间隔离区--每个函数在他们自己的小世界里(他们的本地环境), 调用行为, 并且通常不需要知道很多有关全局环境在做什么, 就可以理解. 

Bindings declared with let and const are in fact local to the block that they are declared in, so if you create one of those inside of a loop, the code before and after the loop cannot "see" it. In pre-2015 JavaScript, only functions created new scopes, so old-style bindings, created with the var keyword, are visible throughout the whole function that they appear in—or throughout the global scope, if they are not in a function. 

使用 `let` 和 `const` 的绑定声明 事实上是位于他们声明的模块内, 因此如果你在循环里创建了他们中的一个, 在循环之前和之后的代码都不能"看到"它. 在 pre-2015 js中, 只有函数可以创建新的区域, 因此老风格的绑定, 用var关键字创建的, 是可见的尽管是在他们出现的整个函数, 或者尽管整个全局范围里, 如果他们不在一个函数里. 

    let x = 10;
    if (true) {
        let y = 20;
        var z = 30;
        console.log(x + y + z);
        // → 60
    }
    // y is not visible here
    console.log(x + z);
    // → 40

Each scope can "look out" into the scope around it, so x is visible inside the block in the example. The exception is when multiple bindings have the same name—in that case, code can see only the innermost one. For example, when the code inside the halve function refers to n, it is seeing its own n, not the global n. 

每个范围可以看见包裹它的范围里, 因此例子中的x在块中是可见的. 表达式当多个绑定有一个相同的名字--在这个例子里, 代码只会看到最深处的那个值. 例如, 当在 `halve` 函数里的代码引用了n, 它会看到自己的n, 而不是全局的n. 

    const halve = function(n) {
        return n / 2;
    };

    let n = 10;
    console.log(halve(100));
    // → 50
    console.log(n);
    // → 10

### Nested scope

### 嵌套范围

JavaScript distinguishes not just global and local bindings. Blocks and functions can be created inside other blocks and functions, producing multiple degrees of locality. 

js 区分不止是全局和局部变量. 块和函数可以创建在别的块和函数里, 得到多个局部度. 

For example, this function—which outputs the ingredients needed to make a batch of hummus—has another function inside it: 

举个例子, 这个函数--输出一批鹰嘴豆泥所需要的原料--有两一个函数在它里面: 

    const hummus = function(factor) {
        const ingredient = function(amount, unit, name) {
            let ingredientAmount = amount * factor;
            if (ingredientAmount > 1) {
                unit += "s";
            }
            console.log( `${ingredientAmount} ${unit} ${name}` );
        };
        ingredient(1, "can", "chickpeas");
        ingredient(0. 25, "cup", "tahini");
        ingredient(0. 25, "cup", "lemon juice");
        ingredient(1, "clove", "garlic");
        ingredient(2, "tablespoon", "olive oil");
        ingredient(0. 5, "teaspoon", "cumin");
    };

The code inside the `ingredient` function can see the `factor` binding from the outer function. But its local bindings, such as `unit` or `ingredientAmount` , are not visible in the outer function. 

在 `ingredient` 函数里的代码可以看到 `factor` 变量 从外部的函数. 但是它的局部连梁, 例如 `unit` 或者 `ingredientAmount` , 是在外部函数不可见的. 

*The set of bindings visible inside a block is determined by the place of that block in the program text*. Each local scope can also see all the local scopes that contain it, and all scopes can see the global scope. This approach to binding visibility is called lexical scoping. 

块内可见的绑定集由程序文本中该块的位置确定. 每个局部作用域还可以看到所有包裹它的局部变量, 并且所有域都可以看到全局作用域. 这种绑定可见性的方法称为词法作用域. 

### Functions as values

### 函数作为值

A function binding usually simply acts as a name for a specific piece of the program. Such a binding is defined once and never changed. This makes it easy to confuse the function and its name. 

一个函数变量通常简单地表现如一片特殊程序的名字. 例如一个变量定义一次且从没使用. 这使得容易混淆函数及其名称. 

But the two are different. A function value can do all the things that other values can do—you can use it in arbitrary expressions, not just call it. It is possible to store a function value in a new binding, pass it as an argument to a function, and so on. Similarly, a binding that holds a function is still just a regular binding and can, if not constant, be assigned a new value, like so: 

但是有两处是不同的. 一个函数值可以所有其他值可以做的事情--你可以使用它在一个一元表达式里, 而不仅仅是调用它. 可能去存储一个函数值在一个新的变量里, 将它作为一个参数传递给一个函数, 这样. 相似的, 一个持有一个函数的变量依然是一个正常的变量并且, 如果不是常量, 分配给一个新的值, 像这样: 

    let launchMissiles = function() {
        missileSystem.launch("now");
    };
    if (safeMode) {
        launchMissiles = function() { /* do nothing */ };
    }

*In Chapter 5, we will discuss the interesting things that can be done by passing around function values to other functions*. 

在第5章中, 我们将讨论通过将函数值传递给其他函数可以完成的有趣事情. 

### Declaration notation

### 声明符号

There is a slightly shorter way to create a function binding. When the function keyword is used at the start of a statement, it works differently. 

有一个稍微短点创建函数变量的方式. 当function关键被用在一个语句的开头, 它工作就不同了. 

    function square(x) {
        return x * x;
    }

This is a function declaration. The statement defines the binding square and points it at the given function. It is slightly easier to write and doesn't require a semicolon after the function. 

这是一个函数声明. 语句定义了变量 `square` 并且在给出的函数里指出了它. 它更加易写并且在函数后不需要分号. 

There is one subtlety with this form of function definition. 

这种形式的功能定义有一个微妙之处. 

    console.log("The future says: ", future());

    function future() {
        return "You'll never have flying cars";
    }

The preceding code works, even though the function is defined below the code that uses it. Function declarations are not part of the regular top-to-bottom flow of control. They are conceptually moved to the top of their scope and can be used by all the code in that scope. This is sometimes useful because it offers the freedom to order code in a way that seems meaningful, without worrying about having to define all functions before they are used. 

上面的代码工作了, 尽管函数被定义在使用它的代码之后. 函数声明 不是正常的从上到下的控制流的一部分. 它们概念地移动到它们的域的顶部, 并且可以被这个域里的所有代码使用. 这是非常有用的, 因为它提供了自由排序代码让它看起来比较有意义, 而不用担心必须要定义所有的函数在它们使用之前. 

### Arrow functions

### 箭头函数

There's a third notation for functions, which looks very different from the others. Instead of the function keyword, it uses an arrow (=>) made up of an equal sign and a greater-than character (not to be confused with the greater-than-or-equal operator, which is written >=). 

这是一个函数的第三种符号, 看来和其他的非常不同. 不是function关键字, 它使用一个箭头 (=>) 由一个等号和一个大于号组成(不要和写作>=的大于等于符号混淆了). 

    const power = (base, exponent) => {
        let result = 1;
        for (let count = 0; count < exponent; count++) {
            result *= base;
        }
        return result;
    };

The arrow comes after the list of parameters and is followed by the function's body. It expresses something like "this input (the parameters) produces this result (the body)". 

箭头跟在参数列表后面, 跟着函数体. 它表达了"这个输入(参数)得到了这个结果(函数体)". 

When there is only one parameter name, you can omit the parentheses around the parameter list. If the body is a single expression, rather than a block in *braces*, that expression will be returned from the function. So, these two definitions of square do the same thing: 

当只有一个参数名的时候, 你可以省略函数列表周围的括号. 如果函数体是一单个表达式, 而不是一个括号里的块, 这个表达式会被函数返回. 因此, 这是两种定义 `square` , 做相同的事情: 

    const square1 = (x) => {
        return x * x;
    };
    const square2 = x => x * x;

When an arrow function has no parameters at all, its parameter list is just an empty set of parentheses. 

当一个箭头函数完全没有参数, 他的参数列表就是一对空的括号. 

    const horn = () => {
        console.log("Toot");
    };

There's no deep reason to have both arrow functions and function expressions in the language. Apart from a minor detail, which we'll discuss in Chapter 6, they do the same thing. Arrow functions were added in 2015, mostly to make it possible to write small function expressions in a less verbose way. We'll be using them a lot in Chapter 5. 

没有深层次的理由在语言中同时使用箭头函数和函数表达式. 除了一个次要的细节, 我们会在第六章讨论, 它们做了相同的事情. 尖头函数是2015里添加的, 使得以不啰嗦的方式一种写小函数表达式成为可能. 我们会在第五章节大量使用它们. 

### The call stack

### 调用栈

*The way control flows through functions is somewhat involved*. Let's take a closer look at it. Here is a simple program that makes a few function calls: 

控制流经函数的方式有些复杂. 让我们近一点观察它. 这里有一个简单的例子, 调用几个函数: 

    function greet(who) {
        console.log("Hello " + who);
    }
    greet("Harry");
    console.log("Bye");

    
A run through this program goes roughly like this: the call to `greet` causes control to jump to the start of that function (line 2). The function calls `console.log` , which takes control, does its job, and then returns control to line 2. There it reaches the end of the greet function, so it returns to the place that called it, which is line 4. The line after that calls console. log again. After that returns, the program reaches its end. 

穿过这个程序的一个流程粗略像这样: 调用 `greet` 导致控制跳到函数的开头(第二行). 函数调用 `cosole.log` , 获得控制权, 做自己的职责, 然后返回控制权到第二行. 它到 `greet` 函数的底部, 因此它返回到调用它的地方, 第4行. 这行后面又调用 `console.log` . 在它返回以后, 程序到了它的结束. 

We could show the flow of control schematically like this: 

我们可以图像化地显示控制流像这样: 

```bash
not in function
   in greet
        in console. log
   in greet
not in function
   in console. log
not in function
```

Because a function has to jump back to the place that called it when it returns, the computer must remember the context from which the call happened. In one case, console. log has to return to the greet function when it is done. In the other case, it returns to the end of the program. 

因为 一个程序在它返回的时候会跳回到调用它的地方, 计算机必须记住调用发生的上下文. 在一个情况下里, `console.log` 在它完成以后不得不跳回 `greet` 函数里. 在另一个情况下, 它返回到程序的结束. 

The place where the computer stores this context is the call stack. Every time a function is called, the current context is stored on top of this stack. When a function returns, it removes the top context from the stack and uses that context to continue execution. 

计算机存储这个上下文的地方叫做调用栈. 每次一个函数被调用, 当前的上下文被存储到这个栈的顶部. 当一个函数返回, 它从栈里移除顶部的上下文并且使用那个上下文继续执行. 

Storing this stack requires space in the computer's memory. When the stack grows too big, the computer will fail with a message like "out of stack space" or "too much recursion". The following code illustrates this by asking the computer a really hard question that causes an infinite back-and-forth between two functions. Rather, it would be infinite, if the computer had an infinite stack. As it is, we will run out of space, or "blow the stack". 

存储这个栈需要在计算机内存里的空间. 当栈变得太大, 计算机回失败并且带有一个信息像"溢出栈空间"或者"太多递归". 下面的代码举例说明了这个通过问计算机一个非常困难的问题来导致一个无限在两个函数之间的往复. 相反, 如果计算机具有无限堆栈, 它将是无限的. 事实上, 我们会耗尽所有空间, 或者"溢出栈". 

    function chicken() {
        return egg();
    }

    function egg() {
        return chicken();
    }
    console.log(chicken() + " came first. ");
    // → ??

### Optional Arguments

### 可配置参数

The following code is allowed and executes without any problem: 

接下来的代码是允许并且执行没有任何问题: 

    function square(x) {
        return x * x;
    }
    console.log(square(4, true, "hedgehog"));
    // → 16

We defined square with only one parameter. Yet when we call it with three, the language doesn't complain. It ignores the extra arguments and computes the square of the first one. 

我们定义了 `square` 只有一个参数. 但我们调用它的时候用了3个, 语言没有不满. 它忽略了多余的参数并且计算了第一个值的平方. 

JavaScript is extremely broad-minded about the number of arguments you pass to a function. If you pass too many, the extra ones are ignored. If you pass too few, the missing parameters get assigned the value undefined. 

js 在关于你传递给一个函数的参数的数量上是相当心胸开阔的. 如果你传了非常多, 多余的都被忽略. 如果你传的很少, 缺失的函数会被分配 `undefined` . 

The downside of this is that it is possible—likely, even—that you'll accidentally pass the wrong number of arguments to functions. And no one will tell you about it. 

这样的负面问题也可能相似, 即使你意外地传了错误的参数数目. 也不会有人来告诉你关于它. 

The upside is that this behavior can be used to allow a function to be called with different numbers of arguments. For example, this minus function tries to imitate the - operator by acting on either one or two arguments: 

积极的方面就是这样的行为可以被用来允许函数用不同数量的参数调用. 例如, 这个 `minus` 函数尝试通过曹祖一个或者两个参数来模仿 - 操作符: 

    function minus(a, b) {
        if (b === undefined) return -a;
        else return a - b;
    }

    console.log(minus(10));
    // → -10
    console.log(minus(10, 5));
    // → 5

If you write an = operator after a parameter, followed by an expression, the value of that expression will replace the argument when it is not given. 

如果你写了一个=操作符在参数的后面, 并且跟着一个表达式, 这个表达式的值会替换参数, 当参数没有给出的时候. 

For example, this version of power makes its second argument optional. If you don't provide it or pass the value undefined, it will default to two, and the function will behave like square. 

例如, 这个版本的 `power` 是他的第二个参数可配置. 如果你不提供它或者传值 `undefined` , 它会默认成2, 然后函数表现得像平方. 

    function power(base, exponent = 2) {
        let result = 1;
        for (let count = 0; count < exponent; count++) {
            result *= base;
        }
        return result;
    }

    console.log(power(4));
    // → 16
    console.log(power(2, 6));
    // → 64

In the next chapter, we will see a way in which a function body can get at the whole list of arguments it was passed. This is helpful because it makes it possible for a function to accept any number of arguments. For example, console. log does this—it outputs all of the values it is given. 

在下一个章节, 我们会看到一种方式函数体可以获得所有被传递的参数列表. 这是有用的因为它使函数接受任意数量的参数成为可能. 例如, `console.log` 做的那样--它输出所有它被赋予的值. 

    console.log("C", "O", 2);
    // → C O 2

### Closure

### 闭包

*The ability to treat functions as values, combined with the fact that local bindings are re-created every time a function is called, brings up an interesting question. What happens to local bindings when the function call that created them is no longer active*?

这像值一样处理函数, 以及每次调用函数时重新创建局部绑定的事实, 都会带来一个有趣的问题. 当创建它们的函数调用不再处于活动状态时, 本地绑定会发生什么? 

The following code shows an example of this. It defines a function, wrapValue, that creates a local binding. It then returns a function that accesses and returns this local binding. 

下面的代码展示了一个这样的例子. 他定义了一个函数 `wrapValue` , 它创建了一个局部变量. 然后它返回了一个函数接受并且返回局部变量. 

    function wrapValue(n) {
        let local = n;
        return () => local;
    }

    let wrap1 = wrapValue(1);
    let wrap2 = wrapValue(2);
    console.log(wrap1());
    // → 1
    console.log(wrap2());
    // → 2

This is allowed and works as you'd hope—both instances of the binding can still be accessed. This situation is a good demonstration of the fact that local bindings are created anew for every call, and different calls can't trample on one another's local bindings. 

它被允许且像你期望得一样工作--绑定的两个实例仍然可以被访问. 这个情况是一个好的例子, 局部连梁可以为每次调用创建一个新值, 并且不同的调用不会践踏到另一个局部的变量. 

This feature—being able to reference a specific instance of a local binding in an enclosing scope—is called closure. A function that references bindings from local scopes around it is called a closure. This behavior not only frees you from having to worry about lifetimes of bindings but also makes it possible to use function values in some creative ways. 

这个功能--可以引用一个特殊的局部变量的实例在一个封闭的范围里--叫做闭包. 一个函数 从包裹它的局部域里引用变量, 叫做一个闭包. 这个行为不仅把你从担心绑定的声明周期中解脱出来, 也使得使用函数值在一些创造性的方面成为可能. 

With a slight change, we can turn the previous example into a way to create functions that multiply by an arbitrary amount. 

稍作修改, 我们可以将前面的示例转换为创建乘以任意数量的函数的方法. 

    function multiplier(factor) {
        return number => number * factor;
    }

    let twice = multiplier(2);
    console.log(twice(5));
    // → 10

    
The explicit local binding from the wrapValue example isn't really needed since a parameter is itself a local binding. 

在 `wrapValue` 例子里明确的局部变量实际不是必须的, 因为参数本身就是一个局部变量. 

Thinking about programs like this takes some practice. A good mental model is to think of function values as containing both the code in their body and the environment in which they are created. When called, the function body sees the environment in which it was created, not the environment in which it is called. 

想想像这样的程序做一些练习. 一个好的心理模型 是视函数值为包含所有在它的体内的代码和创建时的环境. 当调用的时候, 函数体看到创建它时候的环境, 而不是在他调用时候的环境. 

In the example, multiplier is called and creates an environment in which its factor parameter is bound to 2. The function value it returns, which is stored in twice, remembers this environment. So when that is called, it multiplies its argument by 2. 

调用乘数并创建其 `factor` 参数绑定到2的环境. 它返回的函数值, 存储了两次, 记住这个环境. 因此当它被调用的时候, 它把参数参数乘以2. 

### Recursion

### 递归

*It is perfectly okay for a function to call itself, as long as it doesn't do it so often that it overflows the stack*. A function that calls itself is called recursive. Recursion allows some functions to be written in a different style. Take, for example, this alternative implementation of power: 

函数调用自身是完全可以的, 只要它不经常这样做, 以至于溢出堆栈. 一个函数调用它自己叫做递归调用. 递归允许一些函数用不同的风格书写. 举个例子, 这是次方的替代实现: 

    function power(base, exponent) {
        if (exponent == 0) {
            return 1;
        } else {
            return base * power(base, exponent - 1);
        }
    }

    console.log(power(2, 3));
    // → 8

*This is rather close to the way mathematicians define exponentiation and arguably describes the concept more clearly than the looping variant. The function calls itself multiple times with ever smaller exponents to achieve the repeated multiplication*. 

这与数学家定义求幂的方式非常接近, 可以说, 它比循环变量更清楚地描述了这个概念. 该函数使用更小的指数多次调用自身以实现重复乘法. 

But this implementation has one problem: in typical JavaScript implementations, it's about three times slower than the looping version. Running through a simple loop is generally cheaper than calling a function multiple times. 

但是这种实现有一个问题: 在传统js实现中, 它大概比循环的版本慢了三倍. 跑一个简单的循环几乎比调用一个函数要廉价几倍. 

*The dilemma of speed versus elegance is an interesting one*. You can see it as a kind of continuum between human-friendliness and machine-friendliness. Almost any program can be made faster by making it bigger and more convoluted. The programmer has to decide on an appropriate balance. 

速度与优雅的困境是一个有趣的问题. 你可以把它视作一个对人友好性和对机器友好性的统一. 几乎任何程序都可以变得更快通过使他更大并且更复杂. 程序员决定一种合适的平衡. 

In the case of the power function, the inelegant (looping) version is still fairly simple and easy to read. It doesn't make much sense to replace it with the recursive version. *Often, though, a program deals with such complex concepts that giving up some efficiency in order to make the program more straightforward is helpful*. 

在例子 `power` 函数里, 不优雅的(循环)版本是相当简单且容易阅读的. 用递归的版本替换它并不会更易懂. 但是, 通常, 程序处理这样复杂的概念, 放弃一些效率以使程序更直接是有帮助的.

Worrying about efficiency can be a distraction. It's yet another factor that complicates program design, and when you're doing something that's already difficult, that extra thing to worry about can be paralyzing. 

但心效率可能会分散注意力. 这是另一个使程序设计复杂的因素, 当你做的事情已经很困难时, 担心的额外事情可能会瘫痪. 

Therefore, always start by writing something that's correct and easy to understand. If you're worried that it's too slow—which it usually isn't since most code simply isn't executed often enough to take any significant amount of time—you can measure afterward and improve it if necessary. 

因此, 总是从写正确的和容易理解的开始. 如果你担心它太慢了--通常他并不是因为多数代码几乎不会执行到巨大的数量级次数--你可以以后测量并且提升它如果有必要的话.

Recursion is not always just an inefficient alternative to looping. Some problems really are easier to solve with recursion than with loops. *Most often these are problems that require exploring or processing several "branches", each of which might branch out again into even more branches*. 

递归相比于循环, 并不总是低效的. 一些问题确实使用递归比循环要容易解决. 大多数情况下, 这些问题需要探索或处理几个"分支", 每个分支可能会再次扩展到更多分支.

Consider this puzzle: by starting from the number 1 and repeatedly either adding 5 or multiplying by 3, an infinite set of numbers can be produced. How would you write a function that, given a number, tries to find a sequence of such additions and multiplications that produces that number?

考虑这个难题: 从数字1开始, 并且重复加5或者乘3, 可以得到一系列无限的数字. 你如何写一个函数, 给定一个数字, 尝试寻找一串加和乘得到这个数字?

For example, the number 13 could be reached by first multiplying by 3 and then adding 5 twice, whereas the number 15 cannot be reached at all. 

举个例子, 数字13可以通过先乘3然后加5两次得到, 15就完全不可能得到.

Here is a recursive solution: 

这里有一个递归的解决方案:

    function findSolution(target) {
        function find(current, history) {
            if (current == target) {
                return history;
            } else if (current > target) {
                return null;
            } else {
                return find(current + 5, `(${history} + 5)` ) ||
                    find(current * 3, `(${history} * 3)` );
            }
        }
        return find(1, "1");
    }
    console.log(findSolution(24));
    // → (((1 * 3) + 5) * 3)

    // 这是我的解决方案, 确实很差
    function recursion(m) {
        if (m === 1) {
            console.log('success')
            return;
        }
        if (m % 3 === 0) {
            console.log('*')
            recursion(m / 3)
        } else {
            if (m - 5 < 1) {
                console.log('+')
                console.log('cant')
            } else {
                console.log('+')
                recursion(m - 5)
            }
        }
    }

Note that this program doesn't necessarily find the shortest sequence of operations. It is satisfied when it finds any sequence at all. 

这个程序没有必要找到最短的操作流程. 它找到任何一个流程就满足了.

It is okay if you don't see how it works right away. Let's work through it, since it makes for a great exercise in recursive thinking. 

如果你没有立刻看到它如何工作的, 也没有关系. 让我们, 因为它提供了一个非常好的练习, 在递归思想中.

The inner function find does the actual recursing. It takes two arguments: the current number and a string that records how we reached this number. If it finds a solution, it returns a string that shows how to get to the target. If no solution can be found starting from this number, it returns null. 

里面函数做了递归. 它获取两个参数:当前的数字和一个记录我们如何得到这个数字的字符串. 如果它找到一个解决方案, 它返回一个展示如何得到目标的字符串. 如果没有解决方案被找到, 它返回 `null` .

To do this, the function performs one of three actions. If the current number is the target number, the current history is a way to reach that target, so it is returned. If the current number is greater than the target, there's no sense in further exploring this branch because both adding and multiplying will only make the number bigger, so it returns null. Finally, if we're still below the target number, the function tries both possible paths that start from the current number by calling itself twice, once for addition and once for multiplication. If the first call returns something that is not null, it is returned. Otherwise, the second call is returned, regardless of whether it produces a string or null. 

为了做这个, 函数执行三个操作中的一个. 如果当前数字是目标数字, 那么当前的历史就是得到目标的一种方法, 因此返回. 如果当前数字比目标要大, 那么探索这个分支就没有意义了, 因为加和乘都会使数字变大, 因此它返回 `null` . 最后, 如果我们还小于目标数字, 函数会从当前数字尝试所有的可能路径通过调用它自己两次, 要么加要么乘. 如果第一个调用返回不是 `null` 的值, 它就返回. 另外, 第二个调用返回, 无论它是否得到一个字符串或者 `null` .

To better understand how this function produces the effect we're looking for, let's look at all the calls to find that are made when searching for a solution for the number 13. 

为了更好地理解这个函数如何产生我们正在寻找的效果, 看看所有的调用来找到他们是怎么做的, 在探索到数字13的解决方法.

```bash
find(1, "1")
  find(6, "(1 + 5)")
    find(11, "((1 + 5) + 5)")
      find(16, "(((1 + 5) + 5) + 5)")
        too big
      find(33, "(((1 + 5) + 5) * 3)")
        too big
    find(18, "((1 + 5) * 3)")
      too big
  find(3, "(1 * 3)")
    find(8, "((1 * 3) + 5)")
      find(13, "(((1 * 3) + 5) + 5)")
        found!
```

The indentation indicates the depth of the call stack. The first time find is called, it starts by calling itself to explore the solution that starts with (1 + 5). That call will further recurse to explore every continued solution that yields a number less than or equal to the target number. Since it doesn't find one that hits the target, it returns null back to the first call. There the || operator causes the call that explores (1 * 3) to happen. This search has more luck—its first recursive call, through yet another recursive call, hits upon the target number. That innermost call returns a string, and each of the || operators in the intermediate calls passes that string along, ultimately returning the solution. 

缩进表示调用栈的深度. 第一茨 `find` 被调用, 它通过调用自己来探索解决方法此播放1+5开始. 这个调用会进一步递归探索每一个继续的方案, 那些可以得到一个小于或者等于目标数字的. 因为它没有找到一个命中目标的方案, 它会返回null到第一个调用中. 这个 || 操作符导致了探索(1*3)的发生的调用. 这个搜索已经很幸运了--它首先的调用, 通过了另一个递归调用, 命中了目标数字. 最内部的调用返回了一个字符串, 并且每一个 || 操作符在当前的调用中都传入了这个字符串, 最后返回解决方案.

### Growing functions

### 增长函数

There are two more or less natural ways for functions to be introduced into programs.

将函数引入程序有两种或多或少的自然方式.

The first is that you find yourself writing similar code multiple times. You'd prefer not to do that. Having more code means more space for mistakes to hide and more material to read for people trying to understand the program. So you take the repeated functionality, find a good name for it, and put it into a function.

第一种是你发现你写相似的代码多次. 你最好不要这么做. 更多的代码意味着更多错误隐藏的空间, 和人们尝试去理解程序时的更多成本. 因此, 如果你重复了代码, 为它找一个好的名字, 然后放进一个函数里.

*The second way is that you find you need some functionality that you haven't written yet and that sounds like it deserves its own function*. You'll start by naming the function, and then you'll write its body. You might even start writing code that uses the function before you actually define the function itself.

第二种方式是你发现你需要一些你尚未编写的功能, 听起来它应该有自己的功能. 你从给函数命名开始, 然后写它的内容. 你可能开始写用到那些函数的代码了, 在你实际定义函数之前.

How difficult it is to find a good name for a function is a good indication of how clear a concept it is that you're trying to wrap. Let's go through an example.

为函数找一个好名字是一个好提醒解释一个你尝试包裹的代码的概念是非常困难的. 让我们通过一个例子来说明.

We want to write a program that prints two numbers: the numbers of cows and chickens on a farm, with the words Cows and Chickens after them and zeros padded before both numbers so that they are always three digits long.

我们想要写一个程序, 输出两个数字:农场里奶牛和鸡的数目, Cows和Chickens跟在它们的后面, 并且用0填充前面, 使他们都是三位整数长.

    007 Cows
    011 Chickens

This asks for a function of two arguments—the number of cows and the number of chickens. Let's get coding.

这要求两个参数的功能 -- 奶牛的数量和鸡的数量. 让我们开始编码.

    function printFarmInventory(cows, chickens) {
        let cowString = String(cows);
        while (cowString.length < 3) {
            cowString = "0" + cowString;
        }
        console.log( `${cowString} Cows` );
        let chickenString = String(chickens);
        while (chickenString.length < 3) {
            chickenString = "0" + chickenString;
        }
        console.log( `${chickenString} Chickens` );
    }
    printFarmInventory(7, 11);

Writing .length after a string expression will give us the length of that string. Thus, the while loops keep adding zeros in front of the number strings until they are at least three characters long.

写 .length 在字符串表达式后面会给我们这个字符串的长度. 因此, while循环会一直添加0在数字的前面直到他们至少已经三位字符长.

Mission accomplished! But just as we are about to send the farmer the code (along with a hefty invoice), she calls and tells us she's also started keeping pigs, and couldn't we please extend the software to also print pigs?

任务完成! 但正如我们即将向农民发送密码(以及一张沉重的发票), 她打电话告诉我们她也开始饲养猪了, 我们不能将软件扩展到打印猪吗? 

We sure can. But just as we're in the process of copying and pasting those four lines one more time, we stop and reconsider. There has to be a better way. Here's a first attempt:

我们当然可以. 但是我们在复制和粘贴这四行代码多次的过程中, 我们停下并且重新思考. 有种更好的方式. 这里是一个解决方案:

    function printZeroPaddedWithLabel(number, label) {
        let numberString = String(number);
        while (numberString.length < 3) {
            numberString = "0" + numberString;
        }
        console.log( `${numberString} ${label}` );
    }

    function printFarmInventory(cows, chickens, pigs) {
        printZeroPaddedWithLabel(cows, "Cows");
        printZeroPaddedWithLabel(chickens, "Chickens");
        printZeroPaddedWithLabel(pigs, "Pigs");
    }

    printFarmInventory(7, 11, 3);

It works! But that name, printZeroPaddedWithLabel, is a little awkward. It conflates three things—printing, zero-padding, and adding a label—into a single function.

它奏效了! 但是这个名字, `printZeroPaddedWithLabel` , 是一个小小的尴尬之处. 它组合了三个事物-- `print` , `zero-padding` 和 `add a label` --到一个单一函数里. 

Instead of lifting out the repeated part of our program wholesale, let's try to pick out a single concept.

我们试图找出一个单一的概念, 而不是解除我们程序批发的重复部分. 

    function zeroPad(number, width) {
        let string = String(number);
        while (string.length < width) {
            string = "0" + string;
        }
        return string;
    }

    function printFarmInventory(cows, chickens, pigs) {
        console.log( `${zeroPad(cows, 3)} Cows` );
        console.log( `${zeroPad(chickens, 3)} Chickens` );
        console.log( `${zeroPad(pigs, 3)} Pigs` );
    }

    printFarmInventory(7, 16, 3);

A function with a nice, obvious name like zeroPad makes it easier for someone who reads the code to figure out what it does. And such a function is useful in more situations than just this specific program. For example, you could use it to help print nicely aligned tables of numbers.

一个函数又一个好的, 直观的名字, 像 `zeroPad` 使得它对于读代码的人来说, 容易理解. 并且这样一个函数在很多场景里有用, 而不是仅仅这个特殊的程序. 例如, 你可以用它来帮助输出对齐数字的表格.

*How smart and versatile should our function be? We could write anything, from a terribly simple function that can only pad a number to be three characters wide to a complicated generalized number-formatting system that handles fractional numbers, negative numbers, alignment of decimal dots, padding with different characters, and so on*.

我们的函数应该变得多聪明和通用的? 我们可以编写任何东西, 从一个非常简单的函数, 只能将一个数字填充为三个字符宽, 到一个复杂的广义数字格式系统, 处理小数, 负数, 小数点对齐, 不同字符的填充, 等等. 

A useful principle is to not add cleverness unless you are absolutely sure you're going to need it. It can be tempting to write general "frameworks" for every bit of functionality you come across. Resist that urge. You won't get any real work done—you'll just be writing code that you never use.

一个有用的原则是不要添加小聪明, 除非你完全确定你需要它. 为您遇到的每一点功能编写通用的"框架"可能很诱人. 抵制那种冲动. 你不会有任何实质的工作进展--你不过写了你从不会用到的代码.

### Functions and side effects

### 函数和副作用

Functions can be roughly divided into those that are called for their side effects and those that are called for their return value. (Though it is definitely also possible to both have side effects and return a value.)

函数可以粗略地分为那些为副作用调用的函数和为其返回值调用的函数. (虽然两者都有可能产生副作用并返回值. )

The first helper function in the farm example, printZeroPaddedWithLabel, is called for its side effect: it prints a line. The second version, zeroPad, is called for its return value. It is no coincidence that the second is useful in more situations than the first. Functions that create values are easier to combine in new ways than functions that directly perform side effects.

第一个函数在农场的例子里, `printZeroPaddedWithLabel` , 是为了副作用调用的: 它输出了一行文字. 第二个版本, `zeroPad` , 就是为了返回值调用的. 第二个在多数情况下比第一个更有用, 不是一个巧合. 创建值的函数比那些明显产生副作用的函数更容易以一种新的方式组合.

A pure function is a specific kind of value-producing function that not only has no side effects but also doesn't rely on side effects from other code—for example, it doesn't read global bindings whose value might change. A pure function has the pleasant property that, when called with the same arguments, it always produces the same value (and doesn't do anything else). A call to such a function can be substituted by its return value without changing the meaning of the code. When you are not sure that a pure function is working correctly, you can test it by simply calling it and know that if it works in that context, it will work in any context. Nonpure functions tend to require more scaffolding to test.

一个纯函数是一个特殊的值--产生函数, 完全没有任何副作用, 但也不依赖其他代码的副作用--例如, 它不读可能改变值的全局变量. 一个纯函数有令人愉快的特性, 当用同样的参数调用它, 它总是得到相同的值(并且不做其它任何事). 一个这样的函数调用可以被它的返回值取代, 而不改变任何代码的含义. 当你不确定一个纯函数是否正常工作了, 你可以通过简单地调用它来测试它并且知道它如果在那个上下文里正常工作, 那它就可以在任何上下文环境里工作. 非纯函数就趋向于需要更多的材料去测试.

*Still, there's no need to feel bad when writing functions that are not pure or to wage a holy war to purge them from your code. Side effects are often useful. There'd be no way to write a pure version of console.log, for example, and console.log is good to have. Some operations are also easier to express in an efficient way when we use side effects, so computing speed can be a reason to avoid purity*.

尽管如此, 在编写不纯粹的函数或进行圣战以清除代码中的函数时, 没有必要感到难过. 副作用通常是有用的. 举个例子, 没有办法去写一个纯函数版本的 `console.log` , `console.log` 也非常好用. 当我们使用副作用时, 某些操作也更容易以有效的方式表达, 因此计算速度可能是避免纯度的原因. 

### Summary

This chapter taught you how to write your own functions. The function keyword, when used as an expression, can create a function value. When used as a statement, it can be used to declare a binding and give it a function as its value. Arrow functions are yet another way to create functions.

这个章节教会了你如何写你自己的函数. `function` 关键字, 当用作一个表达式, 可以创建一个函数值. 当用作一个语句, 它可以用来声明一个变量并且给他一个函数作为它的值. 箭头函数用另一种方式创建函数.

    // Define f to hold a function value
    const f = function(a) {
        console.log(a + 2);
    };

    // Declare g to be a function
    function g(a, b) {
        return a * b * 3.5;
    }

    // A less verbose function value
    let h = a => a % 3;

A key aspect in understanding functions is understanding scopes. Each block creates a new scope. Parameters and bindings declared in a given scope are local and not visible from the outside. Bindings declared with var behave differently—they end up in the nearest function scope or the global scope.

理解函数的一个关键方面是理解作用域. 每个块创建一个新的作用域. 在给定作用域里生命的参数和变量是本地的且外部不可见. 用var绑定的生命有些许的不同--他们在最近的函数作用域里生效或者全局的作用域里.

Separating the tasks your program performs into different functions is helpful. You won't have to repeat yourself as much, and functions can help organize a program by grouping code into pieces that do specific things.

划分你的程序实现的任务到不同函数是非常有帮助的. 你不用重复你自己很多次, 并且函数可以帮助组织一个程序通过聚合代码到做特殊的事情的片段里.

### Exercises

#### Minimum

The previous chapter introduced the standard function Math.min that returns its smallest argument. We can build something like that now. Write a function min that takes two arguments and returns their minimum.

先前的章节介绍了标准函数 `Math.min` , 得到最小的那个参数. 我们可以做一些像这样的事情. 写一个函数 `min` 来获取两个参数并返回他们的最小值.

    // Your code here.
    function min(...rest) {
        return rest.sort((a, b) => a - b)[0]
    }

    console.log(min(0, 10));
    // → 0
    console.log(min(0, -10));
    // → -10

> If you have trouble putting braces and parentheses in the right place to get a valid function definition, start by copying one of the examples in this chapter and modifying it.

> A function may contain multiple return statements.

> 如果您无法将大括号和括号放在正确的位置以获得有效的函数定义, 请首先复制本章中的一个示例并进行修改. 

> 一个函数可以包含多个返回语句.

#### Recursion

We've seen that % (the remainder operator) can be used to test whether a number is even or odd by using % 2 to see whether it's divisible by two. Here's another way to define whether a positive whole number is even or odd:

- Zero is even.

- One is odd.

- For any other number N, its evenness is the same as N - 2.

我们看到 %(求模操作符) 可以用来测试一个数是奇数或者偶数通过 % 2来看是否被2整除. 这里有另一种方式定义正整数是奇还是偶:

- 0是偶数

- 1是奇数

- 对任意数字N, 它的奇偶性和N-2一样.

Define a recursive function isEven corresponding to this description. The function should accept a single parameter (a positive, whole number) and return a Boolean.

定义一个递归函数 `isEven` 来符合这一描述. 函数应该接受单个参数(一个正整数)并且返回一个布尔值.

Test it on 50 and 75. See how it behaves on -1. Why? Can you think of a way to fix this?

在50和75测试它. 再看看-1的时候是怎么表现的, 为什么? 你可以想到一个方法来修复这个么?

    // Your code here.
    function isEven(num) {
        if (num == 1) return false
        if (num == 0) return true
        return isEven(num - 2)
    }

    console.log(isEven(50));
    // → true
    console.log(isEven(75));
    // → false
    console.log(isEven(-1));
    // → ??

> Your function will likely look somewhat similar to the inner find function in the recursive findSolution example in this chapter, with an if/else if/else chain that tests which of the three cases applies. The final else, corresponding to the third case, makes the recursive call. Each of the branches should contain a return statement or in some other way arrange for a specific value to be returned.

> 你的函数会看起来接近在这个章节的例子递归函数 `findSolution` 内部的 `find` 函数, 用一个if/elseif/else 组合来测试三种情况的调用. 最后一个else, 符合第三种情况, 使递归调用. 每个分支应该包含一个 `return` 语句或者用其它方式安排特殊的值返回.

> When given a negative number, the function will recurse again and again, passing itself an ever more negative number, thus getting further and further away from returning a result. It will eventually run out of stack space and abort.

> 当给了一个负数, 函数会一次次递归, 传递它自身到一个更小的负数, 因此离返回结果越来越远. 它最后会溢出栈空间并且中止.

#### Bean counting

#### 数豆子

You can get the Nth character, or letter, from a string by writing "string"[N]. The returned value will be a string containing only one character (for example, "b"). The first character has position 0, which causes the last one to be found at position string.length - 1. In other words, a two-character string has length 2, and its characters have positions 0 and 1.

你可以得到第n个字符, 或者字母, 从一个字符串里通过 `string[n]` . 它会返回一个只包含一个字符的字符串, 例如“b”. 第一个字符定位是0, 所以最后一个可以找到定位在 `string.length - 1` . 在另一个单词里, 一个两字符的字符串长度是2, 并且它的字符定位是0和1.

Write a function countBs that takes a string as its only argument and returns a number that indicates how many uppercase "B" characters there are in the string.

写一个函数



Next, write a function called countChar that behaves like countBs, except it takes a second argument that indicates the character that is to be counted (rather than counting only uppercase "B" characters). Rewrite countBs to make use of this new function.

    // Your code here.

    console.log(countBs("BBC"));
    // → 2
    console.log(countChar("kakkerlak", "k"));
    // → 4

> Your function will need a loop that looks at every character in the string. It can run an index from zero to one below its length (< string.length). If the character at the current position is the same as the one the function is looking for, it adds 1 to a counter variable. Once the loop has finished, the counter can be returned.

> Take care to make all the bindings used in the function local to the function by properly declaring them with the let or const keyword.

