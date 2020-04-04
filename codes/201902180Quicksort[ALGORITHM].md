# 快速排序

快速排序的原理是二分法

## 原地排序

``` JS
// JavaScript

var quickSort = function(arr, left, right) {

  // 如果左边界比右边界大，返回结果，排序结束
  if (left > right) {
    return;
  }

  // 默认值处理，如果有传入left和right参数，就赋值这个参数，否则就赋值后面的默认值
  left = left || 0;
  right = right || arr.length - 1;

  // 定义移动的左游标和右游标
  var leftPoint = left;
  var rightPoint = right;

  // 定义一个基准数
  var temp = arr[left];

  // 判断左右游标是否重合，如果重合，循环结束
  while (leftPoint != rightPoint) {

    // 基准数在左边，因此从右边开始一个个扫描
    // 从右到左，寻找小于基准数的数，且左游标要小于右游标
    // 如果数字大于基准数（证明不符合条件），寻找下一个
    // 直到找到比基准数小的数，游标停止递减
    while (arr[rightPoint] >= temp && leftPoint < rightPoint) {
      rightPoint--;
    }
    // 从左到右，寻找大于基准数的数，且左游标要小于右游标
    // 如果数字小于基准数（证明不符合条件），寻找下一个
    // 直到找到比基准数小的数，游标停止递增
    while (arr[leftPoint] <= temp && leftPoint < rightPoint) {
      leftPoint++;
    }

    // 如果左游标小于右游标，则交换两个数字的位置
    if (leftPoint < rightPoint) {
      var changeNumber = arr[leftPoint];
      arr[leftPoint] = arr[rightPoint];
      arr[rightPoint] = changeNumber;
    }
    // 进行下一次循环，直到两个游标重合位置
  }

  // 重合之后，交换基准数
  arr[left] = arr[leftPoint];
  arr[leftPoint] = temp;

  // 递归操作左右两个数组
  quickSort(arr, left, leftPoint - 1);
  quickSort(arr, leftPoint + 1, right);

  return arr;
};
var numArr = [6, 1, 2, 7, 9, 4, 5, 10, 8];
console.log(quickSort(numArr));
```


## 三路快排

三路快速排序是快速排序的的一个优化版本, 将数组分成三段, 即小于基准元素、 等于 基准元素和大于基准元素, 这样可以比较高效的处理数组中存在相同元素的情况, 其它特征与快速排序基本相同.

``` JS
function qSort3(arr) { //三路快排
  if (arr.length == 0) {
    return [];
  }
  var left = [];
  var center = [];
  var right = [];
  var pivot = arr[0]; //偷懒，直接取第一个,实际取值情况 参考[快速排序算法的优化思路总结]
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else if (arr[i] == pivot) {
      center.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...qSort3(left), ...center, ...qSort3(right)];
}

// JavaScript
qsort = arr => arr.length > 1 ? [
  ...qsort(arr.filter(x => x < arr[0])),
  ...arr.filter(x => x === arr[0]),
  ...qsort(arr.filter(x => x > arr[0]))
] : arr;
```

