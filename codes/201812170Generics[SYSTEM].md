<!--
Created: Mon Aug 26 2019 15:20:48 GMT+0800 (China Standard Time)
Modified: Tue Dec 17 2019 15:40:22 GMT+0800 (China Standard Time)
-->

# 泛型

泛型旨在将类型参数化.

使用有泛型类, 泛型接口, 泛型方法, 泛型约束等方式.

## 泛型方法

``` typescript
function loggingIdentity<T>(arg: T[]): T[] {
    console.log(arg.length); // Array has a .length, so no more error
    return arg; 
}

function loggingIdentity<T>(arg: Array<T>): Array<T> {
    console.log(arg.length); // Array has a .length, so no more error
    return arg; 
}
```

## 泛型类

``` typescript
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}
​
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

## 泛型接口

``` typescript
interface CreateArrayFunc<T> {
    (length: number, value: T): Array<T>;
}
​
let createArray: CreateArrayFunc<any>;
createArray = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
​
createArray(3, 'x'); // ['x', 'x', 'x']
```

### 泛型约束

当我们需要一个参数满足具有某些属性的时候, 

``` typescript
// code
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length); 
    return arg;
}
```

