### 类数组对象与Iterator of

Iterator（遍历器）是一个接口，实现了该接口的都可以完成遍历操作。


Iterator 的遍历过程是这样的。

（1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

（2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。

（3）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。

（4）不断调用指针对象的next方法，直到它指向数据结构的结束位置。

每次调用next，都会返回当前数据结构的成员信息。

    //value 是当前值，而done代表遍历是否结束。
    {value: '', done: false} 

    var it = makeIterator(['a', 'b']);

    it.next() // { value: "a", done: false }
    it.next() // { value: "b", done: false }
    it.next() // { value: undefined, done: true }

    function makeIterator(array) {
        var nextIndex = 0;
        return {
            next: function () {
                return nextIndex < array.length ?
                    { value: array[nextIndex++], done: false } :
                    { value: undefined, done: true };
            }
        };
    }










