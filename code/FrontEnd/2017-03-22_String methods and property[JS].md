# typeof以及 String方法属性

 

## 首先是各个数据类型的typeof

    typeof null //object
    typeof undefined //undefined
    //typeof string , boolean等都是undefined, 这些是未定义的变量
    //undefined则是属性就是undefined
    typeof 'str' //string
    typeof true //boolean
    typeof 11 //number
    typeof Null //undefined
    //是没有Null这个内置的变量属性的
    typeof String //function
    typeof [1, 2, 3] //object
    //typeof只能判断基础数据类型, Date, RegExp, Array都只是object的扩展! 
    //使用instanceof可以判断
    [1, 2, 3] instanceof Array //true

## null方法

    console.dir(null) //null
    console.dir(undefined) //undefined

null与undefined没有任何方法

## String

    console.log(String); 

String的属性有: 

### constructor //创建函数的对象

### length//对象的长度

### prototype//返回引用的原型

### name:'String'//返回函数名字

### arguments:null //传入参数

### caller:null //调用的函数, 因为是顶层返回null

String函数有: 
    

### fromCharCode//从若干 Unicode 字符值中返回一个字符串。 无参则返回空字符串

    var test = String.fromCharCode(112, 108, 97, 105, 110); //test:plain

### fromCodePoint//返回与 Unicode UTF-16 

码位关联的字符串。 参数必须为指定一个或多个 UTF-16 码位值的 rest 参数。 

    var str1 = String.fromCodePoint(0x20BB7); 
    var str2 = String.fromCodePoint(98); 
    var str3 = String.fromCodePoint(97, 98, 99); 
    if (console && console.log) {
        console.log(str1); //吉
        console.log(str2); //b
        console.log(str3); //abc
    }

### raw()

//返回模板字符串的原始字符串形式。 

    var name = "bob"; 
    log( `hello \t${name}` ); //hello   bob
    log(String.raw `hello \t${name}` ); //hello \tbob
    // The following usage for String.raw is supported but
    // is not typical.
    log(String.raw({
        raw: 'fred'
    }, 'F', 'R', 'E')); //fFrReEd

String的方法(弃用的方法就不举例了)  

### anchor 方法

将具有 NAME 特性的 HTML 定位点放置在文本两侧。 

### big 方法

将 HTML BIG 标记放置在文本两侧。 

### blink 方法

将 HTML BLINK 标记放置在文本两侧。 

### bold 方法

将 HTML B 标记放置在文本两侧。 

### charAt 方法

返回指定索引处的字符。 

    'dog'.charAt(1) === 'dog' [1] //true

### charCodeAt 方法

返回指定字符的 Unicode 编码。 

### codePointAt 方法

返回一个 Unicode UTF-16 字符的码位。 

### concat 方法(字符串)

返回由提供的两个字符串串联而成的字符串。 

    var str1 = ''; 
    str1.concat(undefined, 2, '123'); //'undefined2123'在拼接的时候会转换类型

### EndsWith 方法

返回一个布尔值, 该值指示字符串或子字符串是否以传入字符串结尾。 

### includes 方法

返回一个布尔值, 该值指示传入字符串是否包含在字符串对象中。 

    "abcde".includes("cd") //true
    "abcde".includes("cd", 2) //true 以2为索引, 从第3个字符开始匹配
    "abcde".includes("CD") //false
    "abcde".includes("cd", 3) //false

### fixed 方法

将 HTML TT 标记放置在文本两侧。 

### fontcolor 方法

将具有 COLOR 特性的 HTML FONT 标记放置在文本两侧。 

### fontsize 方法

将具有 SIZE 特性的 HTML FONT 标记放置在文本两侧。 

### hasOwnProperty 方法

返回一个布尔值, 该值指示某个对象是否具有指定名称的属性。 (是不会寻找原型链的)

    var s = new String("Sample"); 
    log(s.hasOwnProperty("split")); //false
    log(String.prototype.hasOwnProperty("split")); //true

### indexOf 方法(字符串)

返回字符串内第一次出现子字符串的字符位置。 

    var str = "original equipment manufacturer"; 
    str[9] //9
    str.indexOf("equip") //9
    str.indexOf("abc") //-1
    str.indexOf('equi', 9) //9
    str.indexOf('equi', 10) //-1

### isPrototypeOf 方法

返回一个布尔值, 该值指示某个对象是否存在于另一个对象的原型链中。 

    function Rectangle() {}
    var rec = new Rectangle(); 
    log(Rectangle.prototype.isPrototypeOf(rec)); //true

### italics 方法

将 HTML I 标记放置在文本两侧。 

### lastIndexOf 方法(字符串)

返回字符串内子字符串的最后一个匹配项。 类似indexOf, 索引值startindex如果 startindex 为负, 则 startindex 将被视为零。 如果它大于最大字符位置索引, 则将它视为可能的最大索引。 
搜索将从字符串中的最后一个字符开始执行。 否则, 该方法和 indexOf 相同。 

### localeCompare 方法

返回一个值, 该值指示两个字符串在当前区域设置中是否相等。 

### match 方法

通过使用提供的正则表达式对象来搜索字符串并以数组形式返回结果。 

    var src = "azcafAJAC"; 
    var re = /[a-c]/; 
    var result = src.match(re); 
    log(result); //['a']
    var reg = /[a-c]/g; //全局
    result = src.match(reg); 
    log(result); //['a', 'c', 'a']

### normalize 方法

返回指定字符串的 Unicode 范式。 

### propertyIsEnumerable 方法

返回一个布尔值, 该值指示指定属性是否为对象的一部分且是否可枚举。 

### repeat 方法

返回一个新的字符串对象, 它的值等于重复了指定次数的原始字符串。 
    

    "abc".repeat(3); //'abcabcabc'
    'abc'.repeat(0); //''

  

### replace 方法

使用正则表达式替换字符串中的文本并返回结果。 

    var s = "dog get bone"; 
    var re = /o/g; 
    var result = s.replace(re, "f"); 
    log(result) //dfg get bfne
    var s = "The quick brown fox jumped over the lazy dog."; 
    var re = /(\S+)(\s+)(\S+)/g; 
    var result = s.replace(re, "$3$2$1"); 
    log(result); //quick The fox brown over jumps lazy the dog.

### search 方法

返回正则表达式搜索中第一个子字符串匹配项的位置。 

    var src = "is but a Dream within a dream"; 
    var re = /dream/; 
    var pos = src.search(re); 
    log(pos); //24
    re = /dream/i; //不区分大小写
    pos = src.search(re); 
    log(pos); //9

### slice 方法(字符串)

返回字符串的片段。 

    var str1 = "all good boys do fine"; 
    var slice1 = str1.slice(0); //all good boys do fine
    var slice2 = str1.slice(0, -1); //all good boys do fin
    var slice3 = str1.slice(4); //good boys do fine
    var slice4 = str1.slice(4, 8); //good

### small 方法

将 HTML SMALL 标记放置在文本两侧。 

### split 方法

返回一个字符串拆分为若干子字符串时所产生的字符串数组。 

    var s = "dog get bone"; 
    var ss = s.split(" "); //['dog', 'get', 'bone']

### StartsWith 方法

返回一个布尔值, 该值指示字符串或子字符串是否以传入字符串开头。 

### strike 方法

将 HTML STRIKE 标记放置在文本两侧。 

### sub 方法

将 HTML SUB 标记放置在文本两侧。 

### substr 方法

返回一个从指定位置开始且具有指定长度的子字符串。 

    var s = "advance"; 
    var ss1 = s.substr(2); //'vance'
    var ss2 = s.substr(6, 2); //'e'
    var ss3 = s.substr(7, 2); //''
    var ss4 = s.substr(0, -1); //''

### substring 方法

返回 String 对象中指定位置处的子字符串。 
substring 方法将返回一个字符串, 该字符串包含从 start 直到 end(不包含该参数)的子字符串。 
substring 方法使用 start 和 end 两者中的较小值作为子字符串的起始点。 例如, strvar.substring(0, 3) 和 strvar.substring(3, 0) 将返回相同的子字符串。 
如果 start 或 end 为 NaN 或负数, 那么它将被替换为 0。 
子字符串的长度等于 start 和 end 之差的绝对值。 例如, 在 strvar.substring(0, 3) 和 strvar.substring(3, 0) 中, 返回的子字符串的长度为 3。 

    var s = "advance"; 
    var ss1 = s.substring(1, 3); //dv
    var ss1 = s.substring(3) //ance

###sup 方法

将 HTML SUP 标记放置在文本两侧。 

### toLocaleLowerCase 方法

返回一个字符串, 其中所有字母字符都转换为小写形式, 并将考虑主机环境的当前区域设置。 

### toLocaleString 方法

返回使用当前区域设置转换为字符串的对象。 

### toLocaleUpperCase 方法

返回一个字符串, 其中所有字母字符都转换为大写形式, 并将考虑主机环境的当前区域设置。 

### toLowerCase 方法

返回一个字符串, 其中所有字母字符都转换为小写形式。 

### toString 方法

返回字符串。 

### toUpperCase 方法

返回一个字符串, 其中所有字母字符都转换为大写形式。 

### trim 方法

返回已移除前导空格、 尾随空格和行终止符的字符串。 

### valueOf 方法

返回字符串。 与indexOf方法相同

### padStart(), padEnd()

如果某个字符串不够指定长度, 会在头部或尾部补全。 padStart()用于头部补全, padEnd()用于尾部补全。 

    'x'.padStart(5, 'ab') // 'ababx'
    'x'.padStart(4, 'ab') // 'abax'
    'x'.padEnd(5, 'ab') // 'xabab'
    'x'.padEnd(4, 'ab') // 'xaba'

常见用于数值指定位数补全

    '1'.padStart(10, '0') // "0000000001"
    '12'.padStart(10, '0') // "0000000012"
    '123456'.padStart(10, '0') // "0000123456"

另一个用途是提示字符串格式。 

    '12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
    '09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"

