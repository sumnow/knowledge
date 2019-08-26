<!--
Created: Mon Aug 26 2019 15:22:40 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:22:43 GMT+0800 (China Standard Time)
-->
# 切片, 元组, 枚举和泛型

## slice and array and tuple

slice 在go里是一种类数组的结构, 保存的都是引用地址, 可以使用append之类的来自由修改长度或者值.

array在go中是只能保存相同数据类型的一个集合, 长度是不可变化的.

在python中, list 和 go 中的 slice表现相似. 

python 中的tuple就与go中的array很相似了, 甚至都没有办法改变值, 但依然可以保存不同的数据类型.

事实上, 在c中数组也只能存储相同的数据类型. 其实与数组的取值方式有关, 正是因为是相同的数据结构, 单个元素有相同的内存占用空间, 在得知数组起点和下标的情况下, 就可以很快计算出下标对应的存储地址.

## enum

枚举比较像反向的数组, 多数情况下是用有意义的字符来表示不太容易读懂的数字, 就像

``` c
#include<stdio.h>

enum DAY {
  MON = 1, TUE, WED, THU, FRI, SAT, SUN
}
day;

int main() {
  // 遍历枚举元素
  for (day = MON; day <= SUN; day++) {
    printf("枚举元素：%d \n", day);
  }
}
```

这样更加容易理解

## 泛型

[here](../Others/2018-12-17_Generics[System].md)

