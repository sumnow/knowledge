<!--
Created: Mon Aug 26 2019 15:20:47 GMT+0800 (China Standard Time)
Modified: Tue Dec 17 2019 22:57:20 GMT+0800 (China Standard Time)
-->

# typescript 学习笔记

typescript 本身是js的超集, 静态校验还是很好用滴.

## 基础类型

``` ts
let isDone: boolean = false; 
// 还有number, string, object啥的
```

数组声明方式:

``` ts
let list: number[] = [1, 2, 3]; 

// 泛型声明
let list: Array<number> = [1, 2, 3]; 
```

### 元组 Tuple

可以声明已知的元素数量和类型.

``` ts
let x: [string, number]; 
```

### 枚举

enum类型是对JavaScript标准数据类型的一个补充. 使用枚举类型可以为一组数值赋予友好的名字.

默认是从0开始编号, 也可以手动赋值.

``` ts
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2]; 
console.log(colorName); // 显示'Green'因为上面代码里它的值是2
```

### 类型断言

类型断言好比其它语言里的类型转换, 但是不进行特殊的数据检查和解构.

``` ts
// 你可以用括号
let someValue: any = "this is a string"; 

let strLength: number = (<string>someValue).length; 

// 或者这样
let someValue: any = "this is a string"; 

let strLength: number = (someValue as string).length; 
```

## 接口

TypeScript的核心原则之一是对值所具有的结构进行类型检查. 它有时被称做"鸭式辨型法"或"结构性子类型化".

``` ts
interface SquareConfig {
  // ? 代表可选
  color?: string; 
  width?: number; 
}
function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = {color: "white", area: 100}; 
  if (config.clor) {
    // Error: Property 'clor' does not exist on type 'SquareConfig'
    newSquare.color = config.clor; 
  }
  if (config.width) {
    newSquare.area = config.width * config.width; 
  }
  return newSquare; 
}

let mySquare = createSquare({color: "black"}); 
```

当然了, 我们有时候不会知道所有的属性名或者值, 可以用索引签名来解决.

``` ts
interface SquareConfig {
    color?: string; 
    width?: number; 
    [propName: string]: any; 
}
```

只读属性, 让值不可改变

``` ts
interface Point {
    readonly x: number; 
    readonly y: number; 
}
```

## 类型别名

类型别名会给一个类型起个新名字. 类型别名有时和接口很像, 但是可以作用于原始值, 联合类型, 元组以及其它任何你需要手写的类型.

``` TS
// TypeScript
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    }
    else {
        return n();
    }
}
```

起别名不会新建一个类型 - 它创建了一个新 名字来引用那个类型. 给原始类型起别名通常没什么用, 尽管可以做为文档的一种形式使用.

同接口一样, 类型别名也可以是泛型 - 我们可以添加类型参数并且在别名声明的右侧传入:

``` TS
// TypeScript
type Container<T> = { value: T };
我们也可以使用类型别名来在属性里引用自己：

type Tree<T> = {
    value: T;
    left: Tree<T>;
    right: Tree<T>;
}
```

与交叉类型一起使用, 我们可以创建出一些十分稀奇古怪的类型.

``` TS
// TypeScript
type LinkedList<T> = T & { next: LinkedList<T> };

interface Person {
    name: string;
}
var people: LinkedList<Person>;
var s = people.name;
var s = people.next.name;
var s = people.next.next.name;
var s = people.next.next.next.name;
```

然而, 类型别名不能出现在声明右侧的任何地方.

``` TS
// TypeScript
type Yikes = Array<Yikes>; // error
```

### 接口 vs. 类型别名

像我们提到的, 类型别名可以像接口一样; 然而, 仍有一些细微差别.

其一, 接口创建了一个新的名字, 可以在其它任何地方使用. 类型别名并不创建新名字—比如, 错误信息就不会使用别名. 在下面的示例代码里, 在编译器中将鼠标悬停在 interfaced上, 显示它返回的是 Interface, 但悬停在 aliased上时, 显示的却是对象字面量类型.

``` TS
// TypeScript
type Alias = { num: number }
interface Interface {
    num: number;
}
declare function aliased(arg: Alias): Alias;
declare function interfaced(arg: Interface): Interface;
```

另一个重要区别是类型别名不能被 extends和 implements(自己也不能 extends和 implements其它类型). 因为 软件中的对象应该对于扩展是开放的, 但是对于修改是封闭的, 你应该尽量去使用接口代替类型别名.

另一方面, 如果你无法通过接口来描述一个类型并且需要使用联合类型或元组类型, 这时通常会使用类型别名.

