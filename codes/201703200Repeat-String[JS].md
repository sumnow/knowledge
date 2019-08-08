# 重复输出字符串

在 String 对象上定义一个 repeatify 函数. 这个函数接受一个整数参数, 来明确字符串需要重复几次. 这个函数要求字符串重复指定的次数. 

所有的字符串的方法应该添加到String函数构造出的所有字符串上, 首先应当判断是否已经有了这个方法, 没有则添加. 

最简单的循环方式: 

``` js
String.prototype.repeatify = String.prototype.repeatify || function(times) {
  var str = '';
  //判断是否正整数
  if (times > 0) {
    if (typeof times === 'number' && times % 1 === 0) {
      for (var i = 0; i < times; i++) {
        str += this;
      }
      return str;
    }
  } else {
    console.log('参数错误')
    return '';
  }
};
console.log('asd'.repeatify(3.1))
```

, 以下省略判断正整数, while循环模式: 

``` js
String.prototype.repeatify = String.prototype.repeatify || function(times) {
  var str = '';
  while (time > 0) {
    str += this;
    time--;
  }
  return str;
};
console.log('asd'.repeatify(3)) //'asdasdasd'
```

拼接字符串可以使用join方法

``` js
var str = [];
while (times > 0) {
  str.push(this);
  times--;
}
return str.join('');
```

递归也可以达到效果: 

``` js
String.prototype.repeatify = String.prototype.repeatify || function(times) {
  var str = '';
  if (times === 0) {
    console.log
    return ''
  } else {
    if (times === 1) {
      return this;
    } else {
      return this + this.repeatify(times - 1)
    }
  }
};
console.log('asd'.repeatify(3)) //'asdasdasd'
```

es6中String有repeat方法, 接受一个[0, 无穷)的整数

``` js
String.prototype.repeatify = String.prototype.repeatify || function(times) {
  return times > 0 ? this.repeat(times) : ''
};
console.log('asd'.repeatify(3)) //'asdasdasd'
```

使用array的fill方法也可以(省略判断)

``` js
 return new Array(times).fill(this).join('');
```

或者直接join数组

``` js
 return new Array(times + 1).join(this);
```

