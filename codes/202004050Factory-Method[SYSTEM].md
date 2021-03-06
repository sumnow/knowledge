<!--
Created: Thu Sun 05 2020 10:35:36 GMT+0800 (China Standard Time)
Modified: Wed Apr 29 2020 17:28:27 GMT+0800 (China Standard Time)
-->

#  工厂模式

工厂模式主要有简单工厂模式, 工厂方法模式, 抽象工厂模式, 简单工厂不是23种设计模式里的

## 三种模式的差别

参考[这里](https://www.zhihu.com/question/20367734)

### 简单工厂模式

``` Go
// Go
package main

import "fmt"

// 具体的工厂
type ToyFactory struct {
}

// 工厂的生产方法
func (f ToyFactory) Generate(name string) Toy {
	// 如果要有产品的变化，需要重新修改工厂类里的实现
	switch name {
	case "bear":
		return ToyBear{}
	case "dog":
		return ToyDog{}
	default:
		return nil
	}
}

// 抽象产品的接口
type Toy interface {
	create()
}

// 熊玩具的实现
type ToyBear struct {
}

func (p1 ToyBear) create() {
	fmt.Println("this is a bear")
}

// 狗玩具的实现
type ToyDog struct {
}

func (p1 ToyDog) create() {
	fmt.Println("this is a dog")
}

func main() {
	factory := new(ToyFactory)

	// 在工厂类中传入不同的参数，获取不同的实例
	p1 := factory.Generate("bear")
	p1.create()

	p2 := factory.Generate("ToyDog")
	p2.create()
}
```

简单工厂一旦需要增加产品就需要修改工厂类的生产方法, 不符合开闭原则

### 工厂方法模式

工厂模式将简单工厂中写在工厂实例里的方法变化到了每个工厂上

``` Go
// Go
package main

import "fmt"

type ToyFactory interface {
	CreateProduct() Toy
}

// 没有一个产品,就有一个生产该产品的工厂
type ToyBearFactory struct {
}

type ToyDogFactory struct {
}

func (t ToyBearFactory) CreateProduct() Toy{
	return ToyBear{}
}
func (t ToyDogFactory) CreateProduct() Toy{
	return ToyDog{}
}

type Toy interface {
	Intro()
}

type ToyBear struct {
}

func (p1 ToyBear) Intro() {
	fmt.Println("this is a bear")
}

// 产品2，实现产品接口
type ToyDog struct {
}

func (p1 ToyDog) Intro() {
	fmt.Println("this is a dog")
}
func main() {
	var p1 = ToyBearFactory{}.CreateProduct()
	// 在工厂类中传入不同的参数，获取不同的实例
	p1.Intro() // output:   this is product 1
	var p2 = ToyDogFactory{}.CreateProduct()
	p2.Intro() // output:   this is product 2
}

```

有点是完成了逻辑的分离, 再写新的产品的时候, 再创建新的具体的工厂来实现, 而不在需要修改抽象的工厂类

### 抽象工厂模式

工厂方法模式: 一个抽象产品类, 可以派生出多个具体产品类. 一个抽象工厂类, 可以派生出多个具体工厂类.    每个具体工厂类只能创建一个具体产品类的实例.

抽象工厂模式: 多个抽象产品类, 每个抽象产品类可以派生出多个具体产品类. 一个抽象工厂类, 可以派生出多个具体工厂类. 每个具体工厂类可以创建多个具体产品类的实例.         

#### 和工厂模式的区别

1. 工厂方法模式只有一个抽象产品类, 而抽象工厂模式有多个.    
2. 工厂方法模式的具体工厂类只能创建一个具体产品类的实例, 而抽象工厂模式可以创建多个.

<!-- 
抽象工厂模式更加得复杂, 也是为了更尽可能地扩展, 首先有一个 `工厂` 的interface, 它有一个叫 `生产` 的方法, 然后 `玩具厂` 实现它, 同时还有很多的厂商, 例如 `摩托车厂` , 也实现了它, 同时生产方法被 `生产玩具` 和 `生产摩托车` 两个接口实现, 然后创建工厂的时候, 建立一个 `玩具厂` , 然后调用它的生产方法, 就会生产 `玩具` . -->

<!-- 这里的扩展在于可以扩展工厂的种类, 也可以扩展生产的种类, 也可以扩展 `生产的方式` 等等. -->

假设 有一个玩具熊工厂, 他们生产大熊, 小熊, 同时是好工厂和差工厂分别生产, 那么好差工厂就是产品族, 大熊小熊就是产品等级结构.

在抽象工厂模式中, 增加一个产品族很容易, 而增加一个产品等级结构却很难, 工厂模式则反之.

也就是说, 在抽象工厂模式中, 增加一个具体的工厂很容易, 但是你想在工厂中多生产一种产品, 就需要修改很多个类, 会违背开闭原则, 这种情况下应该使用工厂模式.
