# 位运算

## 种类

### ～ 按位取反

就是把二进制表示中的1变为0, 0变为1

### & 按位与 | 按位或

按位与时, 两个1相与得1, 其他情况均得0。 

按位或时, 两个0相或得0, 其他情况均得1。 

### ^ 异或

位上不同则为1, 相同则为 0

###  >> << 移位

第一是, 左移一位相当于乘以2, 右移一位相当于除以2。 第二是移位时空出来的位是用0补充的, 因此对于有符号数的移位需要特别小心。 

### 应用

### n&1 等同 n%2 

#### 计算最大公约数

    function GCD(x: number, y: number): number {
        int i, j; 
        if (x == 0) return y; 
        if (y == 0) return x; 
        for (i = 0; 0 == (x & 1); ++i) x >>= 1; 
        for (j = 0; 0 == (y & 1); ++j) y >>= 1; 
        if (j < i) i = j; 
        while (1) {
            if (x < y) x ^= y, y ^= x, x ^= y; 
            if (0 == (x -= y)) return y << i; 
            while (0 == (x & 1)) x >>= 1; 
        }
    }

#### 判断一个数是不是2的幂

 `n & (n-1)` 会消去最右侧的1, 如果是2的幂, 应当只有一位上有1

    function is TwoPower(n: number): boolean {
        return x != 0 && (n & (n - 1)) === 0
    }

#### 计算在一个数的二进制中有多少个 1。 

下面用n >> 1 将最左侧的1置为0

    int iterated_popcnt(unsigned int n) {
        int count = 0; 
        for (; n; n >>= 1) count += n & 1; 
        return count; 
    }

使用 `n & (n - 1)` 也可以完成

    int sparse_popcnt(unsigned int n) {
        int count = 0; 
        while (n) {
            ++count; 
            n &= (n - 1); 
        }
        return count; 
    }

#### 八皇后问题

    int count = 0; 
    void
    try (unsigned char A, unsigned char B, unsigned char C) {
        if (B == 255) {
            count++; 
            return; 
        }
        unsigned char D = ~(A | B | C); 
        while (D) {
            unsigned char bit = D & (-D); 
            D -= bit; 
            try ((A | bit) << 1, B | bit, (C | bit) >> 1); 
        }
    }
    int main() {
        try (0, 0, 0); 
        printf("%d\n", count); 
    }

