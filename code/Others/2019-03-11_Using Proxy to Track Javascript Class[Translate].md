# Using Proxy to Track Javascript Class

# 使用Proxy 去监听 Javascript 类

One of the cool and probably less known features of ES6 is the Proxy object. While it has been around for quite some time, I want to take this post and explain a little bit about this feature, and use a real example how it could be used.

一个酷并可能不为人知的ES6的功能是Proxy 对象. 尽管他已经出来相当一段时间了, 我想用这篇文章来解释一些关于这个功能, 并用一个真实的如何使用它的例子.

## What is Proxy

## 什么是Proxy

In plain boring english, as defined in the MDN web site:

用直白无聊的英文, 像MDN上定义的一样:

> The Proxy object is used to define custom behavior for fundamental operations (e.g. property lookup, assignment, enumeration, function invocation, etc).

> proxy 对象 是一个用来定义自定义行为为了基本操作(如属性查找, 赋值, 枚举, 函数调用等等)

While this is pretty much sum it up, when I read it it was not so clear what it does and what can it help with.

虽然总结得相当漂亮, 我读到它还是不明白它可以帮助我做什么.

To begin with, the Proxy concept is from the meta-programming world. In simple words, meta programming is the code which allow us to play with the application (or core) code that we write. For example the infamous eval function which allows us to evaluate string code into executable code, is in the meta programming realm.

从此开始, proxy概念是来自元-编程世界.简单的说, 元编程是一段允许我们使用我们写的应用代码的代码. 例如声名狼藉的 `eval` 函数 允许我们求值字符串代码为可执行代码, 就是在元编程的领域.

The Proxy API allows us to create some some kind of a layer between an object and its consuming entities, that gives us the power to control the behavior of that object, like deciding how how the get and set is being done, or even decide what should we do if someone is trying to access a property in a object which is not defined.

proxy 的api 允许我们创建 一些 各种各样的布局在对象和他的消费入口, 给我们控制对象的行为的力量, 例如决定在get和set完成后怎么做, 或者甚至决定我们应该怎么做, 如果一些人尝试去获取一个对象里未定义的属性.

## Proxy API

    var p = new Proxy(target, handler); 

The Proxy object gets a target object and a handler object to trap different behaviors in the target object. Here is a partial list of the traps you can set:

proxy对象获取一个目标对象和一个处理对象来捕捉目标对象上的不同行为. 这里有个局部列表你可以设置的捕获.

1. has — to trap the in operator. For example, this will allow you to hide a certain properties of an object.

has - 来捕获 `in` 操作符. 例如, 它允许你隐藏对象的的某一属性

2. get — to trap getting property value. For example, this will allow you to return some default value if this property does not exist.

get - 来捕获 get 属性的值.例如, 它允许你返回一些默认值如果这个属性不存在

3. set — to trap setting property value. For example, this will allow you to validate the value that is being set to a property and throw an exception if the value is not valid.

set - 来捕获设置一些特性的值.例如, 它允许你验证被赋给某个属性的值, 并且如果值无效, 可以抛出一个异常.

4. apply — to trap a function call. For example, this will allow you to wrap all the functions in a try and catch block.

apply - 来捕获一个函数的调用.例如, 它允许你包裹所有函数在try和catch的块里.

This is just a small traps and you can check the full list in the MDN website.

这是一个小的捕获, 并且你可以在MDN上查看完整的列表.

Lets see a simple example of using proxy for validation:

让我们看一个简单使用proxy来验证的例子:

```
const Car = {
    maker: 'BMW', 
    year: '2018, 
}; 
const proxyCar = new Proxy(Car, {
    set(obj, prop, value) {
        if (prop === 'maker' && value.length < 1) {
            throw new Error('Invalid maker'); 
        }
        if (prop === 'year' && typeof value !== 'number') {
            throw new Error('Invalid year'); 
        }
        obj[prop] = value; 
        return true; 
    }
}); 
proxyCar.maker = ''; // throw exception
proxyCar.year = '1999'; // throw exception
```

As you can see, we can validate the value that is being set into the proxy object.

如你所见, 我们可以验证那些被设置到proxy对象上的值.

## Debugging with Proxy

## 用proxy 调试

To show the power of proxy in action I created a simple tracking lib which tracks the following for a given object/class

为了显示proxy的强力, 我创建了一个简单的跟踪库跟踪下面这些给出的对象/类 

- Execution time for functions

函数执行时间

- Who called each function or property

调用函数或者属性.

- Count the number of calls for each function or property.

统计每个调用函数或属性

It is being done by calling a function proxyTrack on any object or class, or even a function.

这是通过在任何对象或者类, 甚至是函数里调用函数 proxyTrack 实现的.

This could be really useful if you want to track who is changing a value in an object, or how long and how many times a function is being called, and who calls it. I know that there are probably better tools out there to do that, but I created this tool just for the purpose of playing a bit with this API.

着可能非常有用如果你想要跟组对象里谁在改变值, 或者一个函数被调用了多长时间, 和谁调用了它.我知道, 可能有很多更好的工具来做这个, 但我创建这个工具只是为了和这个API玩一下这个目标.

## Using proxyTrack

## 使用 proxyTrack

First, lets see how you can use it:

首先, 让我们看看如何使用它:

```
function MyClass() {}

MyClass.prototype = {
    isPrime: function() {
        const num = this.num; 
        for (var i = 2; i < num; i++)
            if (num % i === 0) return false; 
        return num !== 1 && num !== 0; 
    }, 

    num: null, 
}; 

MyClass.prototype.constructor = MyClass; 

const trackedClass = proxyTrack(MyClass); 

function start() {
    const my = new trackedClass(); 
    my.num = 573723653; 
    if (!my.isPrime()) {
        return `${my.num} is not prime` ; 
    }
}

function main() {
    start(); 
}

main(); 
```

If we will run this code we should see in the console:

如果我们运行这段代码, 我们会看到控制台:

```bash
MyClass.num is being set by start for the 1 time
MyClass.num is being get by isPrime for the 1 time
MyClass.isPrime was called by start for the 1 time and took 0 mils.
MyClass.num is being get by start for the 2 time
```

The proxyTrack gets 2 parameters: the first is the object/class to track, and the second one is an options object, which will be set to default options in case it is not passed. Let's take a look at this options object:

proxyTrack 获取两个参数: 第一个是监听的对象/类, 第二个是一个万一没有通过, 会被设置成默认选项的选项对象.让我们看看这个选项对象:

```
const defaultOptions = {
    trackFunctions: true, 
    trackProps: true, 
    trackTime: true, 
    trackCaller: true, 
    trackCount: true, 
    stdout: null, 
    filter: null, 
}; 
```

As you can see, you can control what you want to track by setting the appropriate flag. In case you want to control that the output will go somewhere else then to the `console.log` you can pass a function to the `stdout` .

如你所见, 你能够控制任何你想要通过设置适当的标志来监控. 万一你想要控制输出到其他某处然后到 `console.log` 你可以传递一个函数给 `stdout` 

You can also control which tracking message will be output if you pass the filter callback. you will get an object with the info about the tracking data, and you will have to return true to keep the message or false to ignore it.

你也能够控制输出捕获信息如果你传递一个filter回调.你会获得一个关于捕获数据的信息的对象, 你必须返回true来拿到信息或者false来忽略它.

## Using proxyTrack with React

# 使用proxyTrack 和 React

Since react components are actually classes, you can track a class to examine it in real time. For example:

自从
