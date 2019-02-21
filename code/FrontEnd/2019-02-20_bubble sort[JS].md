# 冒泡排序(Bubble Sort)

这种排序方法效率很低, 它从一端开始(如从下标0开始), 依次比较相邻两个元素, 将小的放置到大的前面, 直到最后.

那么第一次比较完成后, 数组中最大的那个元素就到了最后, 下一次只需要排序前 `arr.len-1` 个元素.

    function bubbleSort(arr) {
        var len = arr.length; 
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < len - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) { //相邻元素两两对比
                    var temp = arr[j + 1]; //元素交换
                    arr[j + 1] = arr[j]; 
                    arr[j] = temp; 
                }
            }
        }
        return arr; 
    }
