# 关于随机

生成随机数， 应用广泛, 有一种比较常见的

    function rans() {
        return Math.round(Math.random() * 2); 
    }

目的是生成0~2的随机数， 在进行了1000次执行后， 发现结果为： 

| 1   | 2   | 3   |
|-----|-----|-----|
| 241 | 489 | 270 |
| 252 | 497 | 251 |
| 270 | 494 | 236 |

结果概率接近1:2:1， 这正是因为Math.round四舍五入的问题， 导致[0, 0.5)为0; [0.5, 1.5)为1; [1.5, 2)为2; 结果自然是1:2:1; 

正确地写法应该是： 

    function rans() {
        return Math.floor(Math.random() * 3)
    }

[0, 1)为0, [1, 2)为1, [2, 3)为2， 结果就是正确的了。 floor为向下取整。 

因此正确的获取min到max的随机数方法为:

    function ran() {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

