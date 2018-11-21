# 正则

## 创建正则
    var reg = /\bis\b/;
    var reg = new RegExp(`\\bis\\b`,'gi')

>在new创建的关键字中，因为转义的问题，\b需要额外添加一个\。

>\b表示单词边界，保证is是完整单词。

    'is,is'.replace(reg,'IS')//'IS,is'
    // String.prototype.replace(reg,'IS')用第二个参数替换符合第一个正则的字符

## g代表全文搜索(global)

    'is,is'.replace(/\bis\b/g,'IS')//'IS,IS'

## i 代表忽略大小写，默认对大小写是敏感的(ignore case)

    'is,Is'.replace(/\bis\b/gi,'has')//"has,has"

## m 代表多行匹配(multiline)

## []字符类

[]代表某类，只要有其中之一就可以了

    'is am are'.replace(/[abc]/g,'0')//"is 0m 0re"

## ^字符类取反

    'is am are'.replace(/[abc]/g,'0')//"000a00a00"

## 范围类[a-z],[0-9],[a-zA-Z]

##预定义类

大写代表取反，如\D之类

1. .除了回车换行以外所有字符
2. \d  [0-9]
3. \s 空白符
4. \w [a-zA-Z_0-9]单词字符（数字字母下划线）

>使用.\*可以匹配任意字符（除换行符\n），但使用[\S\s]\*就可以匹配包括换行在内的所有字符

## 边界

### \b 单词边界 \B非单词边界
### ^以什么开始 $以什么结束

    '1a2a3a'.replace(/\d./g,'0')//'000'
    '1a2a3a'.replace(/\d.$/g,'0')//"1a2a0"


## 量词

word |   times      
---  |---
?    |[0,1]
+    |[1,+infinite)
\*   |[0,infinite)
{n}  | n
{n,m}|[n,m]
{n,} |[n,+infinite)

    '22a333a4444a'.replace(/\d{3}/g,'0')//22a0a04a"

## 贪婪模式

正则会尽可能多的匹配结果。

非贪婪模式，就是选择最少匹配的内容,在`{}`或者`*`等之后加上`?`。


    '12345678'.replace(/d{3,6}?/g,'m')//'mm78'

## 分组()

    'ab123aba11abab1'.replace(/(ab){2}/g,'X');//"ab123aba11X1"

## 或|

    'appabb'.replace(/a(pp|bb)/g,'X')//"XX"

## 分组换位

    '2017-03-14'.replace(/(\d{4})-(\d{2})-(\d{2})/g,'$3/$2/$1')//"14/03/2017"

## 前瞻

js没有后顾

    'z1_3ab'.replace(/\w(?=\d)/g,'X')//"X1X3ab"

否定前瞻

    'z1_3ab'.replace(/\w(?!\d)/g,'X')//"zX_XXX"

## RegExp

### 属性

#### global multiline ignore 都是只读的boolean型

#### lastIndex 当前匹配结果的最后一个字符的下一个字符

#### source 字面量（不包括g之类）

### 方法

#### RegExp.prototype.test(str)

有匹配结果返回true，否则false，这里有个小问题

    var reg = /\w/g;
    reg.test('ab');//true
    reg.test('ab');//true
    reg.test('ab');//false
    reg.test('ab');//true

这是因为对正则匹配全局，每次都会改变reg的lastIndex属性每次+1,在这个例子中的3遍就无法找到了，第四次又重置回0。

#### exec(str)

##### 非全局

    var reg = /\d(\w)\d/;
    var str = '#2a3c4d5b';
    console.log(reg.exec(str))//Array:['2a3',a] .input='#2a3c4d5b' .index = 1;
    //index匹配结果第一个字符的位置

##### 全局

    var reg = /\d(\w)\d|(#)/g;
    var str = '2a3c4d5b#';
    console.log(reg.exec(str))//Array:['2a3',a,undefined] .input='#2a3c4d5b' .index = 0;
    console.log(reg.exec(str))//Array:['4d5',d,undefined] .index = 4;
    console.log(reg.exec(str))//['#',undefined,'#'] .index = 8 ;

### 字符串的方法

### search

返回下标

    'a1b2c3'.search('2')//3

### match

    'a1b2c3'.match(/\d/g)//['1','2','3']

还可以对分组进行匹配,例如

    const reg = /^(\d{4}-(0[0-9]|1[0-2])-(3[0-1]|[0-2][0-9]))_([\S\s]+)\[[\S\s]+\]/;
    const arrResult = '2017-05-01_大新闻[新闻]'.match(reg)
    // ["2017-05-01_大新闻[新闻]", "2017-05-01", "05", "01", "大新闻", index: 0, input: "2017-05-01_大新闻[新闻]", groups: undefined]

此时,也会在 `RegExp` 对象上挂载 `$1` , `$2` ... 等属性, 使用 RegExp.$1调用 

### replace

    const reg = /^(\d{4}-(0[0-9]|1[0-2])-(3[0-1]|[0-2][0-9]))_([\S\s]+)\[[\S\s]+\]/;
    const strResult = '2017-05-01_大新闻[新闻]'.replace(reg, '$1')
    // 2017-05-01


    
