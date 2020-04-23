<!--
Created: Wed Apr 22 2020 16:17:39 GMT+0800 (China Standard Time)
Modified: Thu Apr 23 2020 11:24:32 GMT+0800 (China Standard Time)
-->

# 建造者模式

建造者(Builder)模式的定义: 指将一个复杂对象的构造与它的表示分离, 使同样的构建过程可以创建不同的表示, 这样的设计模式被称为建造者模式. 它是将一个复杂的对象分解为多个简单的对象, 然后一步一步构建而成. 它将变与不变相分离, 即产品的组成部分是不变的, 但每一部分是可以灵活选择的. 

## 优缺点

### 该模式的主要优点如下:

1. 各个具体的建造者相互独立，有利于系统的扩展。
2. 客户端不必知道产品内部组成的细节，便于控制细节风险。

### 其缺点如下:

1. 产品的组成部分必须相同，这限制了其使用范围。
2. 如果产品的内部变化复杂，该模式会增加很多的建造者类。

建造者(Builder)模式和工厂模式的关注点不同: 建造者模式注重零部件的组装过程, 而工厂方法模式更注重零部件的创建过程, 但两者可以结合使用. 

## 模式的结构与实现

建造者(Builder)模式由产品、抽象建造者、具体建造者、指挥者等 4 个要素构成, 现在我们来分析其基本结构和实现方法. 

### 模式的结构

建造者(Builder)模式的主要角色如下. 

1. 产品角色（Product）：它是包含多个组成部件的复杂对象，由具体建造者来创建其各个滅部件。
2. 抽象建造者（Builder）：它是一个包含创建产品各个子部件的抽象方法的接口，通常还包含一个返回复杂产品的方法 getResult()。
3. 具体建造者(Concrete Builder）：实现 Builder 接口，完成复杂产品的各个部件的具体创建方法。
4. 指挥者（Director）：它调用建造者对象中的部件构造与装配方法完成复杂对象的创建，在指挥者中不涉及具体产品的信息。

### 模式的实现

``` Go
// Go
package main

import "fmt"

// 产品
type Product struct{
	partA string
	partB string

}
func (p *Product) SetPartA(str string){
	p.partA = str
}

func (p *Product) SetPartB(str string){
	p.partB = str
}
// 抽象建造者
type Builder interface {
	buildA(product *Product) *Product
	buildB(product *Product) *Product
}

// 具体建造者
type ConcreteBuilder struct {
}
func (c ConcreteBuilder) buildA(product *Product) *Product {
	product.SetPartA("123")
	return product
}
func (c ConcreteBuilder) buildB (product *Product) *Product {
	product.SetPartB("456")
	return product
}
// 指挥者
type Director struct {
	builder Builder
}
func (d *Director) newBuilder (builder Builder) {
	d.builder = builder
}
func (d *Director) construct (p *Product) {
	d.builder.buildA(p)
	d.builder.buildB(p)
}

func main(){
	// 创建产品
	p := &Product{"1","2"}
	// 创建具体构造者
	c:= ConcreteBuilder{}
	// 创建指挥者
	d := Director{}
	// 指挥者关联构造者关联具体构造者
	d.newBuilder(c)
	// 执行
	d.construct(p)
    fmt.Println(p)
    // {123, 456}
}
```

建造者模式如果在只有一个具体建造者的话, 那抽象建造者就可以省略了, 侧重点在于对一个初始产品的一系列处理, 

建造者(Builder)模式创建的是复杂对象, 其产品的各个部分经常面临着剧烈的变化, 但将它们组合在一起的算法却相对稳定, 所以它通常在以下场合使用. 

创建的对象较复杂, 由多个部件构成, 各部件面临着复杂的变化, 但构件间的建造顺序是稳定的. 

创建复杂对象的算法独立于该对象的组成部分以及它们的装配方式, 即产品的构建过程和最终的表示是独立的. 
