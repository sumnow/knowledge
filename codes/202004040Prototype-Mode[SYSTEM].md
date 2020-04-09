<!--
Created: Sat Apr 04 2020 14:22:46 GMT+0800 (China Standard Time)
Modified: Wed Apr 08 2020 19:56:36 GMT+0800 (China Standard Time)
-->

# 原型模式

## 原型模式的定义与特点

原型(Prototype)模式的定义如下: 用一个已经创建的实例作为原型, 通过复制该原型对象来创建一个和原型相同或相似的新对象.

## js实现

学习前端的小伙伴对这个不会陌生, 因为js的继承就是通过原型链实现的.

例如

``` JS
// JavaScript
const ultraman0 = {
  name: 'diga',
  person: 'daigo'
}
const ultraman1 = Object.create(ultraman0)
console.log(ultraman1)
// {}
// 虽然是空对象, 但是访问name
console.log(ultraman1.name)
// 'diga'
```

### Object.create的实现

上面的代码相当于

``` JS
// JavaScript
const ultraman0 = {
  name: 'diga',
  person: 'daigo'
}

function myCreate(obj) {
  function F() {}
  F.Prototype = obj
  // 为了建立联系,且切断对原型的直接引用
  return new F()
}
const ultraman1 = myCreate(ultraman0)
```

## go里的实现

对于go这种有指针的语言来说, 相对更简单一些

``` Go
// Go
type Example struct {
	Content string
}
func (e Example) Clone() Example {
	res := e
	return res
}
func main() {
	r1 := new(Example)
	r1.Content = "this is example 1"
	r2 := r1.Clone()
	r2.Content = "this is example 2"
	//r1.Content = "this is example 2"
	fmt.Println(r1)
	fmt.Println(r2)
}
```

> go里, 用new函数创建变量和普通变量声明语句方式创建变量没有什么区别, 除了不需要声明一个临时变量的名字外. 都是创建变量, 并返回变量地址

## 原型模式通常适用于以下场景.

1. 对象之间相同或相似, 即只是个别的几个属性不同的时候.
2. 对象的创建过程比较麻烦, 但复制比较简单的时候.

## 原型模式的扩展

原型模式可扩展为带原型管理器的原型模式, 它在原型模式的基础上增加了一个原型管理器 PrototypeManager 类. 该类用 HashMap 保存多个复制的原型, Client 类可以通过管理器的 get(String id) 方法从中获取复制的原型.

``` JAVA
// JAVA

import java.util.*;

interface Shape extends Cloneable
{
    public Object clone();    //拷贝
    public void countArea();    //计算面积
}
class Circle implements Shape
{
    public Object clone()
    {
        Circle w=null;
        try
        {
            w=(Circle)super.clone();
        }
        catch(CloneNotSupportedException e)
        {
            System.out.println("拷贝圆失败!");
        }
        return w;
    }
    public void countArea()
    {
        int r=0;
        System.out.print("这是一个圆，请输入圆的半径：");
        Scanner input=new Scanner(System.in);
        r=input.nextInt();
        System.out.println("该圆的面积="+3.1415*r*r+"\n");
    }
}
class Square implements Shape
{
    public Object clone()
    {
        Square b=null;
        try
        {
            b=(Square)super.clone();
        }
        catch(CloneNotSupportedException e)
        {
            System.out.println("拷贝正方形失败!");
        }
        return b;
    }
    public void countArea()
    {
        int a=0;
        System.out.print("这是一个正方形，请输入它的边长：");
        Scanner input=new Scanner(System.in);
        a=input.nextInt();
        System.out.println("该正方形的面积="+a*a+"\n");
    }
}
// 原型管理器用来管理需要使用某个原型
class ProtoTypeManager
{
    private HashMap<String, Shape>ht=new HashMap<String,Shape>(); 
    public ProtoTypeManager()
    {
        ht.put("Circle",new Circle());
           ht.put("Square",new Square());
    } 
    public void addshape(String key,Shape obj)
    {
        ht.put(key,obj);
    }
    public Shape getShape(String key)
    {
        Shape temp=ht.get(key);
        return (Shape)temp.clone();
    }
}
public class ProtoTypeShape
{
    public static void main(String[] args)
    {
        ProtoTypeManager pm=new ProtoTypeManager();    
        Shape obj1=(Circle)pm.getShape("Circle");
        obj1.countArea();          
        Shape obj2=(Shape)pm.getShape("Square");
        obj2.countArea();     
    }
}
```

