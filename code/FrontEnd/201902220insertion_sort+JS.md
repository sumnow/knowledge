# 插入排序(insertionSort)

插入排序有点类似人类按字母顺序对数据进行排序, 就如同你打扑克牌一样, 将摸来的扑克按大小放到合适的位置一样。 它的原理就是通过嵌套循环, 外循环将数组元素挨个移动, 而内循环则对外循环中选中的元素及它后面的元素进行比较; 如果外循环中选中的元素比内循环中选中的元素小, 那么数组元素会向右移动, 为内循环中的这个元素腾出位置。 

实现步骤如下:

1. 从第一个元素开始, 该元素默认已经被排序
2. 取出下一个元素, 在已经排序的元素序列中从后向前扫描
3. 如果该元素(已排序)大于新元素, 将该元素移到下一位置
4. 重复步骤3, 直到找到已排序的元素小于或者等于新元素的位置
5. 将新元素插入到该位置
6. 重复步骤2~5, 直到排序完成

```js
function insertionSort(arr) {
    var len = arr.length; 
    var preIndex, current; 
    for (var i = 1; i < len; i++) {
        preIndex = i - 1; 
        current = arr[i]; 
        while (preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex + 1] = arr[preIndex]; 
            preIndex--; 
        }
        arr[preIndex + 1] = current; 
    }
    return arr; 
}
```

![img](../../img/2019022201.gif)
