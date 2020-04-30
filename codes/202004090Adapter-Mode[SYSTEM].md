<!--
Created: Fri Apr 24 2020 18:03:09 GMT+0800 (China Standard Time)
Modified: Mon Apr 27 2020 13:39:27 GMT+0800 (China Standard Time)
-->

# 适配器模式

## 适配器模式定义

适配器模式(Adapter)的定义如下: 将一个类的接口转换成客户希望的另外一个接口, 使得原本由于接口不兼容而不能一起工作的那些类能一起工作. 适配器模式分为类结构型模式和对象结构型模式两种, 前者类之间的耦合度比后者高, 且要求程序员了解现有组件库中的相关组件的内部结构, 所以应用相对较少些. 

## 优缺点

该模式的主要优点如下

1. 客户端通过适配器可以透明地调用目标接口。
2. 复用了现存的类，程序员不需要修改原有代码而重用现有的适配者类。
3. 将目标类和适配者类解耦，解决了目标类和适配者类接口不一致的问题。

其缺点是: 对类适配器来说, 更换适配器的实现过程比较复杂. 

## 模式的结构与实现

类适配器模式可采用多重继承方式实现, 如 C++ 可定义一个适配器类来同时继承当前系统的业务接口和现有组件库中已经存在的组件接口; Java 不支持多继承, 但可以定义一个适配器类来实现当前系统的业务接口, 同时又继承现有组件库中已经存在的组件. 

对象适配器模式可釆用将现有组件库中已经实现的组件引入适配器类中, 该类同时实现当前系统的业务接口. 现在来介绍它们的基本结构. 

### 模式的结构

适配器模式(Adapter)包含以下主要角色. 

1. 目标(Target)接口: 当前系统业务所期待的接口, 它可以是抽象类或接口. 
2. 适配者(Adaptee)类: 它是被访问和适配的现存组件库中的组件接口. 
3. 适配器(Adapter)类: 它是一个转换器, 通过继承或引用适配者的对象, 把适配者接口转换成目标接口, 让客户按目标接口的格式访问适配者. 

## 实现

## 类适配器

``` Go
// Go
package main

import "fmt"

// 目标接口
type AbstructInterface interface {
	call()
}

// 适配者
type Adaptee struct {
}

func (adtee *Adaptee) specialCall() {
	fmt.Print("123")
}

// 类适配器
type ClassAdapter struct {
	Adaptee
}
// 类适配器对于call的实现
func (claAdpter *ClassAdapter) call(){
	claAdpter.specialCall()
}

func main() {
    // 创建类适配器,实现了AbstructInterface
    abInter :=  ClassAdapter{}
    // 实际调用了specialCall
	abInter.call()
}

```

## 对象适配器

``` Go
// Go
package main

import "fmt"

// 目标接口
type AbstructInterface interface {
	call()
}

// 适配者
type Adaptee struct {
}

func (adtee *Adaptee) specialCall() {
	fmt.Print("123")
}
// 对象适配器
type ObjectAdapter struct {
}

// 对象适配器的方法
func (obAdpter *ObjectAdapter) call(){
	ad := Adaptee{}
	ad.specialCall()
}

func main() {
	ob := ObjectAdapter{}
	ob.call()
}

```

## 模式的应用场景

适配器模式(Adapter)通常适用于以下场景. 

1. 以前开发的系统存在满足新系统功能需求的类，但其接口同新系统的接口不一致。
2. 使用第三方提供的组件，但组件接口定义和自己要求的接口定义不同。

## 模式的扩展

适配器模式(Adapter)可扩展为双向适配器模式, 双向适配器类既可以把适配者接口转换成目标接口, 也可以把目标接口转换成适配者接口

``` Go
// Go
package main

import "fmt"

// 目标接口
type TwoWayTargetInterface interface {
	call()
}

type TwoWayTarget struct {
}

func (tt *TwoWayTarget) call () {
	fmt.Println("目标方法")
}

// 适配者接口
type TwoWayAdapteeInterface interface {
	specialCall()
}
type TwoWayAdaptee struct {
}
func (ta *TwoWayAdaptee) specialCall () {
	fmt.Println("适配方法")
}

// 双向适配器
type TwoWayAdapter struct {
	target TwoWayTarget
	adaptee TwoWayAdaptee
}

func (twAdpter *TwoWayAdapter) call(){
	twAdpter.adaptee.specialCall()
}
func (twAdpter *TwoWayAdapter) specialCall(){
	twAdpter.target.call()
}
func main() {
	// 适配者调用目标方法
	adpte := TwoWayAdaptee{}
	targ := TwoWayTarget{}
	ad := TwoWayAdapter{targ,adpte}
	fmt.Println("目标调用适配者方法")
	ad.call()
	fmt.Println("适配者调用目标方法")
	ad.specialCall()
}
// 目标调用适配者方法
// 适配方法
// 适配者调用目标方法
// 目标方法

```

适配器模式很形象的例子就是国标插头, 插头转换器, 和欧标插座, 插头的功能是取电, 插座的作用是供电, 但是因为标准不同, 没法直接调用, 因此需要转换器处理取电方法, 连接到供电方法上. 再例如脏数据, 需要处理才能使用, 那么处理脏数据的函数, 其实就是一个简单实现的适配器模式





