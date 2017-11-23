# useless

    static find(query) {
        // this.all() 会取出数组中的所有数据
        return this.all().filter(item => Object.keys(query).every(key => item[key] === query[key]))
    }


### void

    void 0 //undefined
    
    javascript:void(0);
    // 阻止默认事件
    
### ！=

    [] == ![]
    // true
    NaN != NaN
    //true

这个是因为NaN是非自返的，而第一个是因为

    ![] 
    // false
 
    Number(false)
    // 0

    Number([].valueOf()) 
    // 0


### 位运算

    1e3 
    // 1000
    
    ~~(Math.random()*100
    // 相当于Math.floor()

    13.94>>0
    // 13
