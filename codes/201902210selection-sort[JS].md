# 选择排序(Selection Sort)

选择排序是一种比较简单直观的排序算法。 它的算法思想是, 从数组的开头开始遍历, 将第一个元素和其他元素分别进行比较, 记录最小的元素, 等循环结束之后, 将最小的元素放到数组的第一个位置上, 然后从数组的第二个位置开始继续执行上述步骤。 当进行到数组倒数第二个位置的时候, 所有的数据就完成了排序。 

选择排序同样会用到嵌套循环, 外循环从数组第一个位置移到倒数第二个位置; 内循环从第二个位置移动到数组最后一个位置, 查找比当前外循环所指向的元素还要小的元素, 每次内循环结束后, 都会将最小的值放到合适的位置上。 

    function selectionSort(arr) {
        var len = arr.length; 
        var minIndex, temp; 
        for (var i = 0; i < len - 1; i++) {
            minIndex = i; 
            for (var j = i + 1; j < len; j++) {
                if (arr[j] < arr[minIndex]) { // 寻找最小的数
                    minIndex = j; // 将最小数的索引保存
                }
            }
            temp = arr[i]; 
            arr[i] = arr[minIndex]; 
            arr[minIndex] = temp; 
        }
        return arr; 
    }

![img](../img/20190221001.gif)
