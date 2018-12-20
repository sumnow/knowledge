# typescript 学习笔记

typescript 本身是js的超集, 静态校验还是很好用滴.

## 基础类型

```ts
let isDone: boolean = false; 
// 还有number, string, object啥的
```

数组声明方式:

```ts
let list: number[] = [1, 2, 3]; 

// 泛型声明
let list: Array<number> = [1, 2, 3]; 
```

### 元组 Tuple

可以声明已知的元素数量和类型.

```ts
let x: [string, number]; 
```

### 枚举

enum类型是对JavaScript标准数据类型的一个补充。 使用枚举类型可以为一组数值赋予友好的名字。 

默认是从0开始编号, 也可以手动赋值.

```ts
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2]; 
console.log(colorName); // 显示'Green'因为上面代码里它的值是2
```

### 类型断言

类型断言好比其它语言里的类型转换， 但是不进行特殊的数据检查和解构。 

```ts
// 你可以用括号
let someValue: any = "this is a string"; 

let strLength: number = (<string>someValue).length; 

// 或者这样
let someValue: any = "this is a string"; 

let strLength: number = (someValue as string).length; 
```

## 接口

TypeScript的核心原则之一是对值所具有的结构进行类型检查。 它有时被称做“鸭式辨型法”或“结构性子类型化”。 

```ts
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

```ts
interface SquareConfig {
    color?: string; 
    width?: number; 
    [propName: string]: any; 
}
```

只读属性, 让值不可改变

```ts
interface Point {
    readonly x: number; 
    readonly y: number; 
}
```

