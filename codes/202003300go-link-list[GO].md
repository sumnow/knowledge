<!--
Created: Mon Mar 30 2020 12:57:35 GMT+0800 (China Standard Time)
Modified: Mon Mar 30 2020 16:00:32 GMT+0800 (China Standard Time)
-->

# go 实现单链表

用go来实现一个单聊表以及增删改查

``` Go
// Go
// index.gp
package main

//package cmd

import (
	"fmt"
)

func log(nd *Node, id int) {
	fmt.Printf("\n----- %d -----\n", id)
	fmt.Println(nd.value)
	if nd.next != nil {
		fmt.Println(*nd.next)
	}
}

func main() {
	list := List{0, nil, nil}
	_first := Node{"10", nil}
	list.listAppend(&_first)
	list.listAppend(&Node{"11", nil})
	list.listAppend(&Node{"12", nil})
	list.listAppend(&Node{"13", nil})
	list.listAppend(&Node{"14", nil})
	list.listAppend(&Node{"15", nil})
	list.listAppend(&Node{"16", nil})
	list.listAppend(&Node{"17", nil})

	f := func(e *Node, i int) interface{} {
		log(e, i)
		return nil
	}
	foreach(&list, f)
	list.listAppend(&Node{"18", nil})
	nnd:=list.listFind("18")
	fmt.Println(nnd)
	//foreach(&list, f)
	fmt.Print(list.size, *list.first, *list.head)
}

```

##　linklist的实现

``` Go
// Go
// linklist.go

package main

type Node struct {
	value string
	next *Node
}

type List struct {
	size int
	first *Node
	head *Node
}

func lastNode(list *List) *Node {
	if nil == list.head.next {
		return list.head
	} else {
		list.head = list.head.next
		return lastNode(list)
	}
}

var idx int= 0

func foreach(list *List,function func(e *Node, index int) interface{}) {
	if list.head.next == nil {
		//if list.size == _index {
		function(list.head, idx)
		resetHeadandReturnLastNode(list)
	} else {
		function(list.head,idx)
		list.head = list.head.next
		idx++
		foreach(list,function)
	}
}

func resetHeadandReturnLastNode (list *List) *Node {
	head := list.first
	idx = 0
	//head := list.head
	_node := lastNode(list)
	list.head = head
	return _node
}

func (lt *List) listAppend(nd *Node)  {
	lt.size ++
	if lt.size == 1 {
		lt.head = nd
		lt.first = nd
	} else {
		resetHeadandReturnLastNode(lt).next = nd
	}
}

func (lt *List) listFind(val string) *Node {
	if nil == lt.head.next {
		_nd := lt.head
		resetHeadandReturnLastNode(lt)
		if _nd.value == val {
			return _nd
		} else {
			return nil
		}
	} else {
		if lt.head.value == val {
			_nd := lt.head
			resetHeadandReturnLastNode(lt)
			return _nd
		} else {
			lt.head = lt.head.next
			return lt.listFind(val)
		}
	}
}

//return interface{} to decrease loop
func (lt *List) listDelete(val string, prevNd *Node) *Node  {
	if nil == lt.head.next {
		_nd:=lt.head
		resetHeadandReturnLastNode(lt)
		if _nd.value == val {
			prevNd.next = nil
			return _nd
		}
		return nil
	} else {
		if lt.head.value == val {
			resetHeadandReturnLastNode(lt)
			return nil
		} else {
			_nd := lt.head
			lt.head = lt.head.next
			return lt.listDelete(val,_nd)
		}
	}
}

func (lt *List) listChange(val string, newVal string){
	if nil == lt.head.next {
		_nd := lt.head
		resetHeadandReturnLastNode(lt)
		if _nd.value == val {
			_nd.value = newVal
		} else {
		}
	} else {
		if lt.head.value == val {
			_nd := lt.head
			_nd.value = newVal
			resetHeadandReturnLastNode(lt)
		} else {
			lt.head = lt.head.next
			lt.listChange(val, newVal)
		}
	}
}

```

