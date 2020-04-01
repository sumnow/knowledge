<!--
Created: Mon Mar 30 2020 11:49:55 GMT+0800 (China Standard Time)
Modified: Mon Mar 30 2020 13:27:51 GMT+0800 (China Standard Time)
-->

# go channel

## go channel

``` Go
// Go
package main
import (
	"fmt"
)
func printer(c chan int) {
	// 开始无限循环等待数据
	for {
		// 从channel中获取一个数据
		data := <-c
		// 将0视为数据结束
		if data == 0 {
			break
		}
		// 打印数据
		fmt.Println(data)
	}
	// 通知main已经结束循环(我搞定了!)
	c <- 0
}
func main() {
	// 创建一个channel
	c := make(chan int)
	// 并发执行printer, 传入channel
	go printer(c)
	for i := 1; i <= 10; i++ {
		// 将数据通过channel投送给printer
		c <- i
	}
	// 通知并发的printer结束循环(没数据啦!)
	c <- 0
	// 等待printer结束(搞定喊我!)
	<-c
}
```

## 单向通道

``` Go
// Go
ch := make(chan int)
// 声明一个只能发送的通道类型, 并赋值为ch
var chSendOnly chan<- int = ch
//声明一个只能接收的通道类型, 并赋值为ch
var chRecvOnly <-chan int = ch
```

例如 `Timer` 

``` Go
// Go
type Timer struct {
    C <-chan Time
    r runtimeTimer
}
```

第 2 行中 C 通道的类型就是一种只能接收的单向通道. 如果此处不进行通道方向约束, 一旦外部向通道发送数据, 将会造成其他使用到计时器的地方逻辑产生混乱.

