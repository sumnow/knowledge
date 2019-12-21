<!--
Created: Tue Dec 17 2019 16:14:41 GMT+0800 (China Standard Time)
Modified: Tue Dec 17 2019 16:14:41 GMT+0800 (China Standard Time)
-->

# 装饰器

ES7 中的 decorator 依赖于 ES5 的 Object.defineProperty 方法 .

##  Object.defineProperty

Object.defineProperty() 方法会直接在一个对象上定义一个新属性, 或者修改一个对象的现有属性, 并返回这个对象.

该方法允许精确添加或修改对象的属性. 通过赋值来添加的普通属性会创建在属性枚举期间显示的属性(for... in 或 Object.keys 方法), 这些值可以被改变, 也可以被删除. 这种方法允许这些额外的细节从默认值改变. 默认情况下, 使用 Object.defineProperty() 添加的属性值是不可变的.

### 语法

Object.defineProperty(obj, prop, descriptor)
obj: 要在其上定义属性的对象.
prop: 要定义或修改的属性的名称.
descriptor: 将被定义或修改的属性描述符.
返回值: 被传递给函数的对象.
在ES6中, 由于 Symbol类型 的特殊性, 用 Symbol类型 的值来做对象的key与常规的定义或修改不同, 而Object.defineProperty 是定义 key为 Symbol 的属性的方法之一.

#### 属性描述符

对象里目前存在的属性描述符有两种主要形式: 数据描述符和存取描述符.

数据描述符是一个具有值的属性, 该值可能是可写的, 也可能不是可写的.

存取描述符是由 getter-setter 函数对描述的属性.

描述符必须是这两种形式之一; 不能同时是两者.

数据描述符和存取描述符均具有以下可选键值:

##### configurable

当且仅当该属性的 configurable 为 true 时, 该属性描述符才能够被改变, 同时该属性也能从对应的对象上被删除. 默认为 false.

##### enumerable

enumerable定义了对象的属性是否可以在 for... in 循环和 Object.keys() 中被枚举.

当且仅当该属性的 enumerable 为 true 时, 该属性才能够出现在对象的枚举属性中. 默认为 false.
数据描述符同时具有以下可选键值:

##### value

该属性对应的值. 可以是任何有效的 JavaScript 值(数值, 对象, 函数等). 默认为 undefined.

##### writable

当且仅当该属性的 writable 为 true 时, value 才能被赋值运算符改变. 默认为 false.

存取描述符同时具有以下可选键值:

##### get

一个给属性提供 getter 的方法, 如果没有 getter 则为 undefined. 该方法返回值被用作属性值. 默认为 undefined.

##### set

一个给属性提供 setter 的方法, 如果没有 setter 则为 undefined. 该方法将接受唯一参数, 并将该参数的新值分配给该属性. 默认为 undefined.

如果一个描述符不具有value, writable, get 和 set 任意一个关键字, 那么它将被认为是一个数据描述符. 如果一个描述符同时有(value或writable)和(get或set)关键字, 将会产生一个异常.

## 用法

### 类的装饰

``` JS
// JavaScript
@testable
class MyTestableClass {
    // ...
}

function testable(target) {
    target.isTestable = true;
}
MyTestableClass.isTestable // true
```

上面代码中, @testable 就是一个装饰器. 它修改了 MyTestableClass这 个类的行为, 为它加上了静态属性isTestable.testable 函数的参数 target 是 MyTestableClass 类本身.

基本上, 装饰器的行为就是下面这样.

``` JS
// JavaScript
@decorator
class A {}

// 等同于

class A {}
A = decorator(A) || A;
```

也就是说, 装饰器是一个对类进行处理的函数. 装饰器函数的第一个参数, 就是所要装饰的目标类.

如果觉得一个参数不够用, 可以在装饰器外面再封装一层函数.

``` JS
// JavaScript
function testable(isTestable) {
    return function(target) {
        target.isTestable = isTestable;
    }
}

@testable(true)
class MyTestableClass {}
MyTestableClass.isTestable // true

@testable(false)
class MyClass {}
MyClass.isTestable // false
```

上面代码中, 装饰器 testable 可以接受参数, 这就等于可以修改装饰器的行为.

注意, 装饰器对类的行为的改变, 是代码编译时发生的, 而不是在运行时. 这意味着, 装饰器能在编译阶段运行代码. 也就是说, 装饰器本质就是编译时执行的函数.

前面的例子是为类添加一个静态属性, 如果想添加实例属性, 可以通过目标类的 prototype 对象操作.

下面是另外一个例子.

``` JS
// JavaScript
// mixins.js
export function mixins(...list) {
    return function(target) {
        Object.assign(target.prototype, ...list)
    }
}

// main.js
import {
    mixins
} from './mixins'

const Foo = {
    foo() {
        console.log('foo')
    }
};

@mixins(Foo)
class MyClass {}

let obj = new MyClass();
obj.foo() // 'foo'
```

上面代码通过装饰器 mixins, 把Foo对象的方法添加到了 MyClass 的实例上面.

### 方法的装饰

装饰器不仅可以装饰类, 还可以装饰类的属性.

``` JS
// JavaScript
class Person {
    @readonly
    name() {
        return `${this.first} ${this.last}` 
    }
}
```

上面代码中, 装饰器 readonly 用来装饰"类"的name方法.

装饰器函数 readonly 一共可以接受三个参数.

``` JS
// JavaScript
function readonly(target, name, descriptor) {
    // descriptor对象原来的值如下
    // {
    //   value: specifiedFunction,
    //   enumerable: false,
    //   configurable: true,
    //   writable: true
    // };
    descriptor.writable = false;
    return descriptor;
}

readonly(Person.prototype, 'name', descriptor);
// 类似于
Object.defineProperty(Person.prototype, 'name', descriptor);
```

装饰器第一个参数是 类的原型对象, 上例是 Person.prototype, 装饰器的本意是要"装饰"类的实例, 但是这个时候实例还没生成, 所以只能去装饰原型(这不同于类的装饰, 那种情况时target参数指的是类本身); 

第二个参数是 所要装饰的属性名

第三个参数是 该属性的描述对象

另外, 上面代码说明, 装饰器(readonly)会修改属性的 描述对象(descriptor), 然后被修改的描述对象再用来定义属性.

### 函数方法的装饰

装饰器只能用于类和类的方法, 不能用于函数, 因为存在函数提升.

另一方面, 如果一定要装饰函数, 可以采用高阶函数的形式直接执行.

``` JS
// JavaScript

function doSomething(name) {
    console.log('Hello, ' + name);
}

function loggingDecorator(wrapped) {
    return function() {
        console.log('Starting');
        const result = wrapped.apply(this, arguments);
        console.log('Finished');
        return result;
    }
}

const wrapped = loggingDecorator(doSomething);
```

