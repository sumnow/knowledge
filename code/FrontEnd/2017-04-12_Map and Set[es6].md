# map和set数据类型

## map和set

这是两种新的数据类型, Map的出现主要是因为object对象的key无法用字符串以外的格式, 像数字。 

### map

    var map1 = new Map([
        [1, '123'], 
        [2, '123']
    ])
    //也可以
    var map2 = new Map(); 
    map2.set(1, '321'); 
    map1.get(1); 

### map方法:

#### get

#### set

#### has 检查是否有此key

    map1.has(1) //true

#### delete 删除某个key

    log(map1) //Map(2) {1 => "123", 2 => "123"}
    map1.delete(1) //true
    log(map1) //Map(1) {2 => "123"}

 `set无法使用重复的key, 都以key最后一次赋值为准。 ` 

### set

set存储的只有key, 没有value, 而且key是无法重复的, 创建方法:

    var set1 = new Set([1, 2, '2']); 

### set方法

#### add

    set1.add(4) //Set(4) {1, 2, "2", 4}

#### delete

    set1.delete(1) //true
    log(set1) //Set(3) {2, "2", 4}

set可以方便地去除数组中重复项。 

    // var set = new Set([1, 2, 1, 2, 2, 1]); 
    var arr = [1, 2, 1, 2, 2, 1]; 
    //new Set 数组去重
    function unique(arr) {
        return Array.from(new Set(arr)); 
    }; 

    

    //使用ES6的方法可以去重。 
    console.log(unique(arr)); 
    // 还可以
    [...new Set(arr)]

