# 泛型

泛型旨在将类型参数化.

使用有泛型类、 泛型接口、 泛型方法三种方式.

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

