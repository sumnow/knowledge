
# Chapter 1

## Values, Types, and Operators

Below the surface of the machine, the program moves. Without effort, it expands and contracts. In great harmony, electrons scatter and regroup. The forms on the monitor are but ripples on the water. The essence stays invisibly below. -- Master Yuan-Ma, The Book of Programming

机器的界面下, 程序运行. 没有努力, 它扩大和缩小. 和谐的, 电子们分散又重新集合. 监视器里窗口是涟漪在水里. 本质依然隐藏在下面.

Inside the computer's world, there is only data. You can read data, modify data, create new data--but that which isn't data cannot be mentioned. All this data is stored as long sequences of bits and is thus fundamentally alike.

在计算机世界里, 只有数据. 你可以读, 改变, 创造新数据, 但没有提及数据. 所有的数据都存储在一个的比特队列里, 因此根本上是相似的.

Bits are any kind of two-valued things, usually described as zeros and ones. Inside the computer, they take forms such as a high or low electrical charge, a strong or weak signal, or a shiny or dull spot on the surface of a CD. Any piece of discrete information can be reduced to a sequence of zeros and ones and thus represented in bits.

比特是很多二值的东西, 通常被描述为0和1. 计算机里, 他们形成, 像一个高或者低的电荷, 一个强或者弱的信号, 或者一个亮或者暗的点在cd表面上. 分散的信息能够被减少到一个0和1的队列. 因此, 用比特代表.

For example, we can express the number 13 in bits. It works the same way as a decimal number, *but instead of 10 different digits, you have only 2, and the weight of each increases by a factor of 2 from right to left.* Here are the bits that make up the number 13, with the weights of the digits shown below them:

举个例子, 我们能够表示用比特表示13. 他们像十进制一样工作, 但不同于10个不同的整数, 你只能用2个, 并且每个权重从左到右增加2倍. 这里有一些比特来表示13, 每个数的权重显示在下面:

 0   0   0   0   1   1   0   1
 128  64  32  16   8   4   2   1

So that's the binary number 00001101. Its non-zero digits stand for 8, 4, and 1, and add up to 13.

因此这是一个二进制数 00001101. 非零的整数在8, 4, 1上, 加起来是13.

### Values

Imagine a sea of bits--an ocean of them. A typical modern computer has more than 30 billion bits in its volatile data storage (working memory). *Nonvolatile storage (the hard disk or equivalent) tends to have yet a few orders of magnitude more.*

想象一个比特的海洋, 一个他们的汪洋. 一个经典现代计算机有超过30百万比特在他们的不稳定的数据内存里(工作内存). 非易失性的存储(硬盘或者类似的)往往更具有几个数量级.

To be able to work with such quantities of bits without getting lost, we must separate them into chunks that represent pieces of information. In a JavaScript environment, those chunks are called values. Though all values are made of bits, they play different roles. Every value has a type that determines its role. Some values are numbers, some values are pieces of text, some values are functions, and so on.

为了能用如此大量的比特工作没有丢失, 我们必须分配他们到代编信息片的块里. 在js的环境里, 这些块被叫做值. 尽管所有的值都是比特构成的, 他们扮演着不同的角色. 每个值有一个类型决定他们的角色. 一些值是数字, 一些是文本片段, 一些是函数, 或者其他.

To create a value, you must merely invoke its name. This is convenient. You don't have to gather building material for your values or pay for them. You just call for one, and whoosh, you have it. They are not really created from thin air, of course. Every value has to be stored somewhere, and if you want to use a gigantic amount of them at the same time, you might run out of memory. Fortunately, this is a problem only if you need them all simultaneously. As soon as you no longer use a value, it will dissipate, leaving behind its bits to be recycled as building material for the next generation of values.

创建一个值, 你仅仅要调用他们的名字. 这是非常方便的. 你不需要为你的值收集构建材料或者支付什么. 你只要调用它, 很快, 你获得了它. 当然, 他们不是从稀薄的空气里创建的. 每个值都被存储在一些地方, 并且如果你一时间要使用大量的数据, 你可能会耗尽内存. 幸运的是, 只有你同时需要他们, 才是一个问题. 很快你不再使用值, 它会消失, 离开后他的比特会被回收再利用构建原料为了下一次值.

This chapter introduces the atomic elements of JavaScript programs, that is, the simple value types and the operators that can act on such values.

这一节介绍了js环境原子的元素, 这是非常简单的值, 并且操作符能够和值一样行动.

### Numbers

Values of the number type are, unsurprisingly, numeric values. In a JavaScript program, they are written as follows:

值是数组类型是, 不出意外, 数字的值. 在js的程序里, 他们被写成下面这样:

13

Use that in a program, and it will cause the bit pattern for the number 13 to come into existence inside the computer's memory.

在程序里使用它, 它会导致数字13的位模式在计算机内存里出现.

JavaScript uses a fixed number of bits, 64 of them, to store a single number value. *There are only so many patterns you can make with 64 bits, which means that the number of different numbers that can be represented is limited.* With N decimal digits, you can represent 10^N numbers. Similarly, given 64 binary digits, you can represent 2^64 different numbers, which is about 18 quintillion (an 18 with 18 zeros after it). That's a lot.

js 使用一个确定的比特数字, 64位, 来存储单个数字值. 这里你可以使用64比特来组织很多形式, 意味着表示的不同数字的数量是被限制的. 使用N位的整数, 你能够代表10的n次方的数字. 相似的, 给一个64位二进制的整数, 你能够表示2^64种不同的数字, 差不多是18(18后跟着18个零). 很多了.

Computer memory used to be much smaller, and people tended to use groups of 8 or 16 bits to represent their numbers. *It was easy to accidentally overflow such small numbers--to end up with a number that did not fit into the given number of bits.* Today, even computers that fit in your pocket have plenty of memory, so you are free to use 64-bit chunks, and you need to worry about overflow only when dealing with truly astronomical numbers.

计算机内存过去更小, 并且人们趋向于使用8或者16比特的集合来表示他们的数字. 它过去容易意外地溢出, 例如很小的数字. 最终得到一个不符合给定位数的数字. 今天, 甚至是能纺机你口袋的计算机都含有很大的内存, 你可以自由使用64比特的块, 你只需要在处理天文数字的时候才要考虑溢出.

Not all whole numbers less than 18 quintillion fit in a JavaScript number, though. Those bits also store negative numbers, so one bit indicates the sign of the number. A bigger issue is that nonwhole numbers must also be represented. To do this, some of the bits are used to store the position of the decimal point. The actual maximum whole number that can be stored is more in the range of 9 quadrillion (15 zeros)—which is still pleasantly huge.

并不是所有小于18后18个零的数字都在js数字里, 尽管. 这些比特也存储负数, 因此一个比特的位置代表数字的符号. 一个更大的问题是不是所有的数字都可以表示的. 为了做到这个, 一些比特被用来存储小数点的位置. 实际上最大值能够存储差不多不少过9后面18个零--依然非常巨大.

Fractional numbers are written by using a dot.

小数部分用点来表示

9.81

For very big or very small numbers, you may also use scientific notation by adding an e (for exponent), followed by the exponent of the number.

非常大或者非常小的数字, 你也可以用通过添加跟着指数e来科学计数

2.998e8

That is 2.998 × 10^8 = 299, 800, 000.

这是 2.998 × 10^8 = 299, 800, 000.

Calculations with whole numbers (also called integers) smaller than the aforementioned 9 quadrillion are guaranteed to always be precise. Unfortunately, calculations with fractional numbers are generally not. Just as π (pi) cannot be precisely expressed by a finite number of decimal digits, many numbers lose some precision when only 64 bits are available to store them. This is a shame, but it causes practical problems only in specific situations. The important thing is to be aware of it and treat fractional digital numbers as approximations, not as precise values.

小于上述的9千万亿的整数的计算, 可以保证是精确的. 不幸的是, 部分数字的计算通常不准. 像π (pi) 不能够通过有限的十进制整数被准确的表达, 很多数字在只有64比特来存储时会失去一些精度. 这是一个遗憾, 但它导致实际问题只有在特殊的情况下. 重要的是意识到它并把小数数字当作近似数处理, 而不是精确值.

### Arithmetic

### 算数

The main thing to do with numbers is arithmetic. Arithmetic operations such as addition or multiplication take two number values and produce a new number from them. Here is what they look like in JavaScript:

数字主要做的事就是算数. 算数符号像加号和减号获取两个数字, 然后从他们得到一个新的数字. 这里就是js里算数的样子:

100 + 4 * 11

The + and * symbols are called operators. The first stands for addition, and the second stands for multiplication. Putting an operator between two values will apply it to those values and produce a new value.

 这个 + 和 * 被叫做符号. 第一个是加法, 第二个是减法. 把操作符放在两个值中间代表用他们的值生成一个新值.

But does the example mean "add 4 and 100, and multiply the result by 11, " or is the multiplication done before the adding? As you might have guessed, the multiplication happens first. But as in mathematics, you can change this by wrapping the addition in parentheses.

但例子的意思是 "4和100相加, 再与11相乘", 或者乘法在加法之前执行? 正如你所猜, 乘法先执行. 但在算数里, 你可以通过括号包裹加法来改变顺序.

(100 + 4) * 11

For subtraction, there is the - operator, and division can be done with the / operator.

减法, 是 - 符号, 并且除法是 / 符号.

When operators appear together without parentheses, the order in which they are applied is determined by the precedence of the operators. The example shows that multiplication comes before addition. The / operator has the same precedence as *. Likewise for + and -. When multiple operators with the same precedence appear next to each other, as in 1 - 2 + 1, they are applied left to right: (1 - 2) + 1.

当操作符没有括号出现在一起, 他们的顺序都被符号的优先级决定了. 例子展示乘法在加法之前. 除法和乘法有相同的优先级. + 和 - 也是一样的. 当多种相同优先级操作符号一个接一个出现, 像 `1-2+1` , 他们是从左到右调用, `(1 - 2) + 1` 

These rules of precedence are not something you should worry about. When in doubt, just add parentheses.

这些优先级的规则不需要你担心, 在存疑的时候, 只需要加括号.

There is one more arithmetic operator, which you might not immediately recognize. The % symbol is used to represent the remainder operation. X % Y is the remainder of dividing X by Y. For example, 314 % 100 produces 14, and 144 % 12 gives 0. The remainder operator's precedence is the same as that of multiplication and division. You'll also often see this operator referred to as modulo.

有不止一个算数符, 你也许没有立刻想起, % 符号被用来表示余数操作符. `X % Y` 是 代表X除以Y的余数. 例如, 314 % 100 得到 14, 144 % 12 得 0. 余数操作符的优先级适合乘法与除法相同的. 你也常常可以看到这个操作符在模运算里提及.

> % 求余和求模在正数上相同, 在负数上不同, 如 -7 % 4 , 求余, -7 / 4 = -1 , 余为 -3. 如果是求模 -7 / 4 = -2, 向负无穷取值, 模就是1. 多数语言里, 都是求余运算.  

### Special numbers

### 特殊数字

There are three special values in JavaScript that are considered numbers but don't behave like normal numbers.

在js中有3种特殊的值被认为是数字, 但表现不像通常数字.

The first two are Infinity and -Infinity, which represent the positive and negative infinities. Infinity - 1 is still Infinity, and so on. Don't put too much trust in infinity-based computation, though. It isn't mathematically sound, and it will quickly lead to the next special number: NaN.

头两个是正无穷和负无穷, 表示最大的正数和最小的负数. 无穷-1依然是无穷, 以此类推. 因此, 不要轻信基于无穷的估算. 它不是数学上的, 它就是接下来谈到的特殊数字:NaN.

NaN stands for "not a number", even though it is a value of the number type. You'll get this result when you, for example, try to calculate 0 / 0 (zero divided by zero), Infinity - Infinity, or any number of other numeric operations that don't yield a meaningful result.

NaN代表"不是一个数字", 尽管它依然是一个数字类型. 举个例子, 你在尝试计算 0/0(0作为除数), 无穷-无穷, 或者一些其他得不到有意义值的数学操作符.

### Strings

The next basic data type is the string. Strings are used to represent text. They are written by enclosing their content in quotes.

接下来说的基础数据类型是字符串. 字符串一般用来表示文本. 它们被闭合于它们的引号中.

```
 `Down on the sea` 
 "Lie on the ocean"
 'Float on the ocean'
```

You can use single quotes, double quotes, or backticks to mark strings, as long as the quotes at the start and the end of the string match.

你可以使用单引号, 双引号, 或者反引号来表示从引号开始到引号结束这么长的字符串.

Almost anything can be put between quotes, *and JavaScript will make a string value out of it.* But a few characters are more difficult. You can imagine how putting quotes between quotes might be hard. Newlines (the characters you get when you press enter) can be included without escaping only when the string is quoted with backticks (`).

几乎任何东西都能放到引号间, 并且js可以从中创建一个字符串值, 但一些符号有些不同. 你可以想象把一个引号放到引号之间非常的困难. 换行符(就是你按下enter得到的符号) 不被忽略地包括, 只有在字符串是被反引号下.

To make it possible to include such characters in a string, the following notation is used: whenever a backslash (\) is found inside quoted text, it indicates that the character after it has a special meaning. This is called escaping the character. A quote that is preceded by a backslash will not end the string but be part of it. When an n character occurs after a backslash, it is interpreted as a newline. Similarly, a t after a backslash means a tab character. Take the following string:

为了使包括更多符号在字符串里成为可能, 这个符号被使用: 无论何时, 一个反斜线被发现在引号文本里, 它表示它后面的那个符号有特殊的含义. 这个被叫做 转义字符. 一个反斜线先于一个引号 不代表字符串的结尾而是字符串的一部分. 当一个n字符出现在反斜线的后面, 他就被解释为一个换行符. 相似的, t在反斜线后代表一个tab符. 输入下面的字符串:

"This is the first line\nAnd this is the second"

The actual text contained is this:

实际的文本是这样:

This is the first line

And this is the second

There are, of course, situations where you want a backslash in a string to be just a backslash, not a special code. If two backslashes follow each other, they will collapse together, and only one will be left in the resulting string value. This is how the string "A newline character is written like "\n"." can be expressed:

这里 , 当然, 你希望反斜线这个字符只是一个反斜线, 不需要什么特殊的符号. 如果两个反斜线相邻, 它们会一起消失, 在最后的字符串值里只有一个会被留下. 和一个换行符被写成了"\n"一样, 可以解释:

"A newline character is written like \"\\n\"."

Strings, too, have to be modeled as a series of bits to be able to exist inside the computer. The way JavaScript does this is based on the Unicode standard. This standard assigns a number to virtually every character you would ever need, including characters from Greek, Arabic, Japanese, Armenian, and so on. If we have a number for every character, a string can be described by a sequence of numbers.

字符串也是被很多存在在计算机里的比特组成的. js实现的方式是基于unicode 标准. 这个标准几乎为你知道的每一个字符都分配了一个数字, 
包括希腊语, 阿拉伯语, 日语, 亚美尼亚语等. 如果每一个字符都有一个对应数字, 一个字符串可以表示成一列数字. 

And that's what JavaScript does. But there's a complication: JavaScript's representation uses 16 bits per string element, which can describe up to 216 different characters. But Unicode defines more characters than that—about twice as many, at this point. So some characters, such as many emoji, take up two "character positions" in JavaScript strings. We'll come back to this in Chapter 5.

js也是这么做的. 但有些许复杂: js的表示使用16比特每个字符元素, 可以描述多大216个不同字符. 但unicode在这点上定义了更多的字符, 大约两倍. 因此一些字符, 例如很多表情, 在js字符中占据了两个字符位. 我们会在第五章节再谈回这个.

Strings cannot be divided, multiplied, or subtracted, but the + operator can be used on them. It does not add, but it concatenates—it glues two strings together. The following line will produce the string "concatenate":

字符不可以除, 乘或者减, 但 + 操作符可以使用. 这不是加, 但把两个字符串连接到了一起. 下面这行会生成一个拼接字符串

"con" + "cat" + "e" + "nate"

String values have a number of associated functions (methods) that can be used to perform other operations on them. I'll say more about these in Chapter 4.

字符串值有许多内置的函数(方法)用来执行其他的操作. 我会在第四章节谈到更多.

Strings written with single or double quotes behave very much the same—the only difference is in which type of quote you need to escape inside of them. Backtick-quoted strings, usually called template literals, can do a few more tricks. Apart from being able to span lines, they can also embed other values.

单或者双引号写的字符串行为基本一致, 唯一差别是在里面哪种引号你需要转义. 反引号字符串, 通常叫做模版文字, 可以做一些技巧. 除了可以跨越行, 它们还可以嵌入其他值.

```
 `half of 100 is ${100 / 2}` 
```

When you write something inside ${} in a template literal, its result will be computed, converted to a string, and included at that position. The example produces "half of 100 is 50".

当你在模版文字里写了一些在 ${}里, 它的结果会被计算出来, 转换成一个字符串, 并且放在本来的地方. 例子得到的是 "half of 100 is 50".

### Unary operators

### 一元操作符

Not all operators are symbols. Some are written as words. One example is the typeof operator, which produces a string value naming the type of the value you give it.

不是所有操作符都是符号. 一些被写成词语. 一个例子是typeof 操作符, 它可以得到你给的一个值的类型的字符串值.

    console.log(typeof 4.5)
    // → number
    console.log(typeof "x")
    // → string

We will use console.log in example code to indicate that we want to see the result of evaluating something. More about that in the next chapter.

在示例代码中, 我们使用console.log来指出我们想要看到求某值的结果. 在下一节我们会谈得更多.

The other operators shown all operated on two values, but typeof takes only one. Operators that use two values are called binary operators, while those that take one are called unary operators. The minus operator can be used both as a binary operator and as a unary operator.

其他操作符都是和两个值一起的, 但typeof 只需要一个. 那些需要两个值的操作符叫做二元操作符, 只要一个的叫做一元操作符. 减号符即是一元操作符又是二元操作符

    console.log(-(10 - 2))
    // → -8

### Boolean values

### 布尔值

It is often useful to have a value that distinguishes between only two possibilities, like "yes" and "no" or "on" and "off". For this purpose, JavaScript has a Boolean type, which has just two values, true and false, which are written as those words.

这个通常很有用在描述只有两个可能的值的时候, 像"yes"和"no"或者"on" 和 "off". 为了这个目的, js有只有两个值的布尔类型, 真和假, 用它们的单词写成.

### Comparison

### 比较

Here is one way to produce Boolean values:
这里有一个方法来得到布尔值:

    console.log(3 > 2)
    // → true
    console.log(3 < 2)
    // → false

The > and < signs are the traditional symbols for "is greater than" and "is less than", respectively. They are binary operators. Applying them results in a Boolean value that indicates whether they hold true in this case.

大于号和小于号分别是表示"比起来更大"和"比起来更小"的传统符号. 它们是二元符. 调用他们的结果是一个布尔值表示在这个判断里是否得到真.

Strings can be compared in the same way.

字符串可以用同种方式比较.

    console.log("Aardvark" < "Zoroaster")
    // → true

The way strings are ordered is roughly alphabetic but not really what you'd expect to see in a dictionary: uppercase letters are always "less" than lowercase ones, so "Z" < "a", and nonalphabetic characters (!, -, and so on) are also included in the ordering. When comparing strings, JavaScript goes over the characters from left to right, comparing the Unicode codes one by one.

字符串排序是粗略按照字母排序的但不是如你在字典里看到的那样:大写字母总是排在小写字母后, 像 "Z" < "a", 并且非字母的符号(!, -, 等等)都包括在排序中. 当比较字符串时, js从左到右仔细检查字符, 一个接一个比较unicode字符.

Other similar operators are >= (greater than or equal to), <= (less than or equal to), == (equal to), and != (not equal to).

另外相似的操作符有 >= (大于等于), <=(小于等于), ==(等于), !=(不等于). 

```
    console.log("Itchy" != "Scratchy")
    // → true
    console.log("Apple" == "Orange")
    // → false
```

There is only one value in JavaScript that is not equal to itself, and that is NaN ("not a number").

在js中, 只有一个值不等于它自己, 就是NaN.

    console.log(NaN == NaN)
    // → false

NaN is supposed to denote the result of a nonsensical computation, and as such, it isn't equal to the result of any other nonsensical computations.

NaN 认为是表示无意义的计算结果, 同样, 没有和无意义结果相同的结果. 

### Logical operators

### 逻辑操作符

There are also some operations that can be applied to Boolean values themselves. JavaScript supports three logical operators: and, or, and not. These can be used to "reason" about Booleans.

还有一些符号可以被布尔值本身调用.js支持3个逻辑操作符: and or 和 not . 

The && operator represents logical and. It is a binary operator, and its result is true only if both the values given to it are true.

 `&&` 表示逻辑和. 这是一个二元操作符, 并且他的结果是真只要两个值都给出真.

    console.log(true && false)
    // → false
    console.log(true && true)
    // → true

The || operator denotes logical or. It produces true if either of the values given to it is true.

 `||` 操作符表示逻辑或. 如果两个值中之一为真, 它得到真

    console.log(false || true)
    // → true
    console.log(false || false)
    // → false

    
Not is written as an exclamation mark (!). It is a unary operator that flips the value given to it—!true produces false, and !false gives true.

not 被写成惊叹符(!). 它是一个一元操作符, 可以反转给它的值-- !true 得到 false , !false得到true.

*When mixing these Boolean operators with arithmetic and other operators, it is not always obvious when parentheses are needed.* In practice, you can usually get by with knowing that of the operators we have seen so far, || has the lowest precedence, then comes &&, then the comparison operators (>, ==, and so on), and then the rest. This order has been chosen such that, in typical expressions like the following one, as few parentheses as possible are necessary:

当这些布尔符和数学符以及其他符号混在一起, 需要括号时并不总是很明显. 实际上, 你通常可以理解这些我们现在已经见过的操作符, || 优先级最低, 然后是 && , 然后是比较符(>, ==, 等), 然后是其他. 选择这个顺序使得, 在像下面这个经典表达式里, 尽可能少的括号是必须的:

 `1 + 1 == 2 && 10 * 10 > 50` 

The last logical operator I will discuss is not unary, not binary, but ternary, operating on three values. It is written with a question mark and a colon, like this:

最后的逻辑操作符我没有谈到的不是一元, 也不是二. 而是三元, 操作三个值. 她被写成一个问好和一个冒号, 像这样:

    console.log(true ? 1 : 2);
    // → 1
    console.log(false ? 1 : 2);
    // → 2

This one is called the conditional operator (or sometimes just the ternary operator since it is the only such operator in the language). The value on the left of the question mark "picks" which of the other two values will come out. When it is true, it chooses the middle value, and when it is false, it chooses the value on the right.

这被叫做条件操作符(或者有时叫三元运算符因为他是该语言中唯一的一个此类运算符). 问号左边的值选择剩下的两个值哪个输出. 当它为真的时候, 他会选择中间的值, 并且当它为假的时候, 他会选择右侧的值.

### Empty values

### 空值

There are two special values, written null and undefined, that are used to denote the absence of a meaningful value. They are themselves values, but they carry no information.

有两种特殊的值, 写作 null 和 undefined, 一般用来表示缺乏意义的值. 它们有它们的值, 但没有携带任何信息.

Many operations in the language that don't produce a meaningful value (you'll see some later) yield undefined simply because they have to yield some value.

语言里的很多不会得到有意义的值的操作符(你接下来会看到) 几乎都输出undefined, 因为他们必须要得到一些值. 

The difference in meaning between undefined and null is an accident of JavaScript's design, and it doesn't matter most of the time. In cases where you actually have to concern yourself with these values, I recommend treating them as mostly interchangeable.

undefined 和null 之间不同的意义是一个js设计的意外, 它们多数时候没什么问题. 万一你自己在哪里涉及到了这些值, 我推荐你像对待多数可互换的值一样.

### Automatic type conversion

### 自动类型转换

*In the Introduction, I mentioned that JavaScript goes out of its way to accept almost any program you give it, even programs that do odd things.* This is nicely demonstrated by the following expressions:

在介绍里, 我提及了js几乎可以接受你提供的任何程序, 甚至是那些做古怪事情的程序. 这可以用下面的解释来漂亮得表明.

    console.log(8 * null)
    // → 0
    console.log("5" - 1)
    // → 4
    console.log("5" + 1)
    // → 51
    console.log("five" * 2)
    // → NaN
    console.log(false == 0)
    // → true

    
When an operator is applied to the "wrong" type of value, JavaScript will quietly convert that value to the type it needs, using a set of rules that often aren't what you want or expect. This is called type coercion. The null in the first expression becomes 0, and the "5" in the second expression becomes 5 (from string to number). Yet in the third expression, + tries string concatenation before numeric addition, so the 1 is converted to "1" (from number to string).

当一个操作符被一个错误类型的值调用了, js会静默地转换值为需要的类型, 使用一套你没有想到或者预期的规则. 这被叫做强制类型. 第一个表达式里的null变成了-, 第二个表达式的"5"变成了 5(从字符串到数字). 在第三个表达式里, + 连接了数字前的字符串, 因此1被转换成"1"(从数字到字符串).

When something that doesn't map to a number in an obvious way (such as "five" or undefined) is converted to a number, you get the value NaN. Further arithmetic operations on NaN keep producing NaN, so if you find yourself getting one of those in an unexpected place, look for accidental type conversions.

当某些在明显的方式上不能映射为一个数字的(例如'five'或者undefined)被转换成一个数字, 你得到一个NaN. 更多算数操作符在NaN依然得到NaN, 因此如果你发现你自己在一个没有预料的地方得到他们中的一个, 寻找意外的类型转换.

When comparing values of the same type using ==, the outcome is easy to predict: you should get true when both values are the same, except in the case of NaN. But when the types differ, JavaScript uses a complicated and confusing set of rules to determine what to do. In most cases, it just tries to convert one of the values to the other value's type. However, when null or undefined occurs on either side of the operator, it produces true only if both sides are one of null or undefined.

当比较两个相同的类型的值使用==, 输出非常容易预料: 你在值都一样的时候得到真, 除非是NaN. 但当类型不同的时候, js使用一套复杂且令人困惑的规则来决定怎么做. 多数例子里, 它尝试转换一个值到另一个值类型. 箪食. 当空或者 undefined 其中一个出现在符号的一边, 只有在两边都是null或者undefined中的一个的时候才得到真.

    console.log(null == undefined);
    // → true
    console.log(null == 0);
    // → false

    
That behavior is often useful. When you want to test whether a value has a real value instead of null or undefined, you can compare it to null with the == (or !=) operator.

这个行为通常很有用. 当你想要测试一个值是不是真值而不是null或者undefined, 你可以把它和null用==(或者 !=)比较.

But what if you want to test whether something refers to the precise value false? Expressions like 0 == false and "" == false are also true because of automatic type conversion. When you do not want any type conversions to happen, there are two additional operators: === and !==. The first tests whether a value is precisely equal to the other, and the second tests whether it is not precisely equal. So "" === false is false as expected.

但如果你想要测试某些是否引用了精确值false, 该怎么做呢? 表达式像 `0 == false` 和 `"" == false` 都是真的, 因为自动类型转换. 当你不想要任何类型转换发生, 有两个额外的操作符:  === 和 !== . 第一个测试一个值是否精确地等于另一个, 第二个测试是否精确地不等于. 因此, `"" === false` 是如预料的一样是假的.

*I recommend using the three-character comparison operators defensively to prevent unexpected type conversions from tripping you up.* But when you're certain the types on both sides will be the same, there is no problem with using the shorter operators.

我推荐使用三个字符的比较操作符, 来避免意料之外的类型转换绊倒你. 但当你确信两边的类型是一样的, 使用短操作符就没有问题.

### Short-circuiting of logical operators

### 短路运算符

The logical operators && and || handle values of different types in a peculiar way. They will convert the value on their left side to Boolean type in order to decide what to do, but depending on the operator and the result of that conversion, they will return either the original left-hand value or the right-hand value.

逻辑操作符 && 和 || 以一种奇怪的方式持有两个不同类型的值. 他们转换他们左侧的值到布尔类型来决定接下来做什么, 但基于操作符和转换的结果, 他们也会返回 原本左侧的值或者右侧的值.

The || operator, for example, will return the value to its left when that can be converted to true and will return the value on its right otherwise. *This has the expected effect when the values are Boolean and does something analogous for values of other types.*

在 || 操作符, 举个例子, 在左侧的值可以转换为真会放回它左侧的值, 否则返回右侧的值. 当值为布尔或者其他类似作用的值类型, 可以预期结果.

    console.log(null || "user")
    // → user
    console.log("Agnes" || "user")
    // → Agnes

    
We can use this functionality as a way to fall back on a default value. If you have a value that might be empty, you can put || after it with a replacement value. If the initial value can be converted to false, you'll get the replacement instead. The rules for converting strings and numbers to Boolean values state that 0, NaN, and the empty string ("") count as false, while all the other values count as true. So 0 || -1 produces -1, and "" || "!?" yields "!?".

我们可以使用这个作为一种退回默认值的方式. 如果你有一个值可能是空的, 你可以在它的后面放一个 || 带一个替补值. 如果初始值被转换成假, 你反而会得到替补值. 转换的字符串和数字到布尔值的规则申明, 0, NaN, 和 空字符串  被计为假, 而其他所有值被视作真. 因此 0 || -1 得到 -1 , "" || "!?" 产出 "!?".

The && operator works similarly but the other way around. When the value to its left is something that converts to false, it returns that value, and otherwise it returns the value on its right.

&& 操作符 几乎 以相反的方式工作. 当它左侧的值被转换为假, 它会返回这个值, 否则会返回右侧的值.

Another important property of these two operators is that the part to their right is evaluated only when necessary. In the case of true || X, no matter what X is—even if it's a piece of program that does something terrible—the result will be true, and X is never evaluated. The same goes for false && X, which is false and will ignore X. This is called short-circuit evaluation.

另一个重要的特性关于这两个操作符就是只有在必要的时候才会去求值右侧. 加入 true || X , 无论 X 是什么 甚至它是做某些可怕事情的程序, X也永远不会被求值. false && X 也是同样, 会得到false 忽略X. 着被叫做短路运算.

The conditional operator works in a similar way. Of the second and third values, only the one that is selected is evaluated.

条件运算符也是一样的工作原理. 第二个和第三个值, 只有被选中的那个会被求值.

### Summary

### 总结

We looked at four types of JavaScript values in this chapter: numbers, strings, Booleans, and undefined values.

我们在这个章节找到4种js中值的类型: 数字, 字符串, 布尔和未定义值.

Such values are created by typing in their name (true, null) or value (13, "abc"). You can combine and transform values with operators. We saw binary operators for arithmetic (+, -, *, /, and %), string concatenation (+), comparison (==, !=, ===, !==, <, >, <=, >=), and logic (&&, ||), as well as several unary operators (- to negate a number, ! to negate logically, and typeof to find a value's type) and a ternary operator (?:) to pick one of two values based on a third value.

就像值被创建通过输入他们的名字(true, null ) 或者 值(13, 'abc'). 你可以通过操作符组合并变换值. 我们看到算数的二元操作符(+, -, *, /, 和 %), 字符串连接(+), 比较(==, !=, ===, !==, <, >, <=, >=), 和逻辑(&&, ||), 还有少数一元操作符(负数的-, 逻辑取反的!, 获取一个值的类型的typeof) 还有一个三元操作符(?:) 来选择两个值重的一个基于第三个值.

This gives you enough information to use JavaScript as a pocket calculator but not much more. The next chapter will start tying these expressions together into basic programs.

这给你使用js作为一个口袋计算器提供足够的信息, 但不多. 下一章节会开始一起输入这些表达式到基础程序中.