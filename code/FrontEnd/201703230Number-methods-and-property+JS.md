# Number

## Number中的属性

EPSILON:2.220446049250313e-16
MAX_SAFE_INTEGER:9007199254740991//最大整数
MAX_VALUE:1.7976931348623157e+308
MIN_SAFE_INTEGER:-9007199254740991//最小整数
MIN_VALUE:5e-324
NEGATIVE_INFINITY:-Infinity//负无穷
NaN:NaN
POSITIVE_INFINITY:Infinity//正无穷

## Number的方法: 

### isFinite:是否有限

传入一个参数, 如果是可以转换为有限数字则返回true, 否则返回false(包括字符串, 或者正负无穷以及NaN)

### isInteger

是否整数

### isNaN

是否是空

### isSafeInteger

### parseFloat(num, i)

转换为浮点数, i为转换的进制数[2-36]

### parseInt(num, i)

转换为整数, i为转换的进制数[2-36]