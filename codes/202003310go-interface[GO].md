<!--
Created: Thu Apr 09 2020 15:23:38 GMT+0800 (China Standard Time)
Modified: Thu Apr 09 2020 15:47:14 GMT+0800 (China Standard Time)
-->

# go interface

## java 接口

对于java来说, 接口的实现是这样的

``` JAVA
// JAVA
public interface MyInterface {
    public String hello = "Hello";
    public void sayHello();
}
// 现式地声明了实现
// 且 hello 被注入到实现的类里
public class MyInterfaceImpl implements MyInterface {
    public void sayHello() {
        System.out.println(MyInterface.hello);
    }
}
```

## go的接口

对于go来说, 采用的并非显式的实现方式

``` Go
// Go
type I interface {    
    Get() int
}

type S struct {
    Age int
}
// 这里定义了结构体实现Get方法
func(s S) Get()int {
    return s.Age
}

var s1 I = S{}

// 不能同时再定义
// 否则会报错: method redeclared

// 这里定义了指针实现Get方法
func(s *S) Get(age int) {
    s.Age = age
}

var s2 I = &S{}
```

对于 `go` 来说, 只要实现了 `interface` 的所有方法就已经实现了该接口

关于使用结构体还是指针来实现接口, 有一个[小问题](https://draveness.me/golang/docs/part2-foundation/ch04-basic/golang-interface/)需要注意

## interface{}

由于空接口有0个方法, 所有类型都实现了空接口

### 空接口的应用

#### 类型判断

``` Go
// Go
package main

import (  
    "fmt"
)

func findType(i interface{}) {  
    switch i.(type) {
    case string:
        fmt.Printf("String: %s\n", i.(string))
    case int:
        fmt.Printf("Int: %d\n", i.(int))
    default:
        fmt.Printf("Unknown type\n")
    }
}
func main() {  
    findType("Naveen")
    findType(77)
    findType(89.98)
}
```

#### 接口判断

``` Go
// Go
package main

import "fmt"

type Describer interface {  
    Describe()
}
type Person struct {  
    name string
    age  int
}

func (p Person) Describe() {  
    fmt.Printf("%s is %d years old", p.name, p.age)
}

func findType(i interface{}) {  
    switch v := i.(type) {
    case Describer:
        v.Describe()
    default:
        fmt.Printf("unknown type\n")
    }
}

func main() {  
    findType("Naveen")
    p := Person{
        name: "Naveen R",
        age:  25,
    }
    findType(p)
}
```

