<!--
Created: Mon Aug 26 2019 15:21:24 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:21:24 GMT+0800 (China Standard Time)
-->
# 排序(Sort)

## 希尔排序(Shell Sort)

我们首先要学习的就是希尔排序, 又称缩小增量排序, 这个算法是在插入排序的基础上做了很大的改善, 与插入排序不同的是, 它首先会比较位置较远的元素, 而非相邻的元素. 这种方案可以使离正确位置很远的元素能够快速回到合适的位置, 当算法进行遍历时, 所有元素的间距会不断的减小, 直到数据的末尾, 此时比较的就是相邻元素了. 

该方法的基本思想是: 先将整个待排元素序列分割成若干个子序列(由相隔某个"增量"的元素组成的)分别进行直接插入排序, 然后依次缩减增量再进行排序, 待整个序列中的元素基本有序(增量足够小)时, 再对全体元素进行一次直接插入排序. 因为直接插入排序在元素基本有序的情况下(接近最好情况), 效率是很高的, 因此希尔排序在时间效率上有较大提高. 

``` js
function shellSort(arr) {
    var len = arr.length,
        temp,
        gap = 1;
    while (gap < len / 3) { //动态定义间隔序列
        gap = gap * 3 + 1;
    }
    for (gap; gap > 0; gap = Math.floor(gap / 3)) {
        for (var i = gap; i < len; i++) {
            temp = arr[i];
            for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
                arr[j + gap] = arr[j];
            }
            arr[j + gap] = temp;
        }
    }
    return arr;
}
```

## 归并排序(Merge Sort)

将两个的有序数列合并成一个有序数列, 我们称之为"归并", 归并排序的思想就是将一系列排序好的子序列合并成一个大的完整有序的序列. 
 
实现步骤如下:

1. 把长度为n的输入序列分成两个长度为n/2的子序列; 
2. 对这两个子序列分别采用归并排序; 
3. 将两个排序好的子序列合并成一个最终的排序序列

``` js
function mergeSort(array) {
    var len = array.length;
    if (len < 2) {
        return array;
    }
    var middle = Math.floor(len / 2),
        left = array.slice(0, middle),
        right = array.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    var result = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    while (left.length)
        result.push(left.shift());
    while (right.length)
        result.push(right.shift());
    return result;
}
```

![归并排序](../img/20190223001.gif)

