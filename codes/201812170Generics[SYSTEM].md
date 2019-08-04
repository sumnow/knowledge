# 泛型

泛型旨在将类型参数化.

使用有泛型类、 泛型接口、 泛型方法三种方式.

## 泛型方法

```ts
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
class arr<T>{
    value: T; 
    add: (x: T, y: T) => T; 
}
```

## 泛型接口

```ts
interface Test {
    <T>(args: T): T
}

function myfn<T>(args: T): T {
    return args; 
}

let myTest: Test = myfn; 
```

