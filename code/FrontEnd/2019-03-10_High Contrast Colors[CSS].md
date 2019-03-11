# CSS Variables + calc() + rgb() = Enforcing High Cont

Css 变量+calc+rgb = 高对比度

As you may know, the recent updates and additions to CSS are extremely powerful. From Flexbox to Grid, and — what we're concerned about here — Custom Properties (aka CSS variables), all of which make robust and dynamic layouts and interfaces easier than ever while opening up many other possibilities we used to only dream of.

如你所知, 最近css的更新和附加功能非常得强大。 从Flex布局到Grid布局, 还有和我们这里提及的-自定义属性(又称 CSS 变量), 使得强大的动态布局还有界面, 比过去简单, 并开拓了很多梦寐以求的可能。 

The other day, I was thinking that there must be a way to use Custom Properties to color an element's background while maintaining a contrast with the foreground color that is high enough (using either white or black) to pass WCAG AA accessibility standards.

几天前, 我认为应该有一种方法, 使用自定义属性的颜色作为一个元素的背景色, 和前景色形成对比(用黑或者白) 并足以通过WCAG AA访问标准。 

It's astonishingly efficient to do this in JavaScript with a few lines of code:

用javascript, 只需要短短几行代码就卓有成效。 

    var rgb = [255, 0, 0]; 

    function setForegroundColor() {
        var sum = Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) / 1000); 
        return (sum > 128) ? 'black' : 'white'; 
    }

This takes the red, green and blue (RGB) values of an element's background color, multiplies them by some special numbers (299, 587, and 144, respectively), adds them together, then divides the total by 1, 000. When that sum is greater than 128, it will return black; otherwise, we'll get white. Not too bad.

一个元素的背景色选择红, 绿, 蓝的值, 乘上一些特殊的数字(分别是299, 587, 144), 再想加, 然后除以1000, 当得到的值比128大, 将会返回黑色, 否则, 我们返回白色。 还不错。 

The only problem is, when it comes to recreating this in CSS, we don't have access to a native if statement to evaluate the sum. So, how can we replicate this in CSS without one?

唯一的问题是, 当用css来重构时, 我们没有原生的if来判断值。 那么, 我们如何用css来实现这个效果呢？ 

Luckily, like HTML, CSS can be very forgiving. If we pass a value greater than 255 into the RGB function, it will get capped at 255. Same goes for numbers lower than 0. Even negative integers will get capped at 0. So, instead of testing whether our sum is greater or less than 128, we subtract 128 from our sum, giving us either a positive or negative integer. Then, if we multiply it by a large negative value (e.g. -1, 000), we end up with either very large positive or negative values that we can then pass into the RGB function. Like I said earlier, this will get capped to the browser's desired values.

所幸, 如html一样, css 非常宽容, 如果我们在RGB函数里传入一个大于255的值, 他会限制为255。 值一样不可以小于0。 负数一样会被限制为0, 所以, 测试值大于或者小于128, 我们用值减去128, 得到一个正数或者负整数。 然后, 如果我们乘一个很大的负数(如1000), 我们同样会得到一个可以通过RGB函数的很大的正数或者负数。 如我所说, 值会按照浏览器的要求去限制。 

Here is an example using CSS variables:

这是一个使用CSS变量的例子

```css
:root {
  --red: 28; 
  --green: 150; 
  --blue: 130; 

  --accessible-color: calc(
    (
      (
        (var(--red) * 299) +
        (var(--green) * 587) +
        (var(--blue) * 114) /
        1000
      ) - 128
    ) * -1000
  ); 
}

.button {
  color:
    rgb(
      var(--accessible-color), 
      var(--accessible-color), 
      var(--accessible-color)
    ); 
  background-color:
    rgb(
      var(--red), 
      var(--green), 
      var(--blue)
    ); 
}
```

If my math is correct (and it's very possible that it's not) we get a total of 16, 758, which is much greater than 255. Pass this total into the rgb() function for all three values, and the browser will set the text color to white.

如果我数学没错~~作者卖萌～～我们得到了16, 758, 远远大于255, 输入这个值到rgb函数里, 浏览器会设置文本颜色为白色。 

At this point, everything seems to be working in both Chrome and Firefox, but Safari is a little cranky and gives a different result. At first, I thought this might be because Safari was not capping the large values I was providing in the function, but after some testing, I found that Safari didn't like the division in my calculation for some reason.

在这点上, chrome和firefox上都正常工作, 但safari 有些古怪, 给了一个不同的结果, 开始, 我认为, 这个可能是因为safari 没有限制大值, 但经过一些测试, 我发现safari因为一些原因不喜欢我计算里的除法。 

Taking a closer look at the calc() function, I noticed that I could remove the division of 1, 000 by increasing the value of 128 to 128, 000. Here's how that looks so far:

仔细看看 `calc` 函数, 我注意到我可以去掉除以1000通过提升值从128到128, 000. 这里有

```css
:root {
  --red: 28; 
  --green: 150; 
  --blue: 130; 

  --accessible-color: calc(
    (
      (
        (var(--red) * 299) +
        (var(--green) * 587) +
        (var(--blue) * 114)
      ) - 128000 /* HIGHLIGHT */
    ) * -1000
  ); 
}

.button {
  color:
    rgb(
      var(--accessible-color), 
      var(--accessible-color), 
      var(--accessible-color)
    ); 
  background-color:
    rgb(
      var(--red), 
      var(--green), 
      var(--blue)
    ); 
}
```

Throw in a few range sliders to adjust the color values, and there you have it: a dynamic UI element that can swap text color based on its background-color while maintaining a passing grade with WCAG AA.

滑动几个范围的滑块, 以调整颜色值, 现在你可以看到, 一个能够基于它的背景色切换文本颜色的动态元素, 并可以通过 `WCAG AA` 的标准。 

[CODEPEN](https://codepen.io/joshbader/pen/ZwpPRx)

## Putting this concept to practical use

## 把这个概念放到实际应用中

Below is a Pen showing how this technique can be used to theme a user interface. I have duplicated and moved the --accessible-color variable into the specific CSS rules that require it, and to help ensure backgrounds remain accessible based on their foregrounds, I have multiplied the --accessible-color variable by -1 in several  places. The colors can be changed by using the controls located at the bottom-right. Click the cog/gear icon to access them.

下面是一个 用来展示如何配置用户主题的 PEN 。 我已经复制并移动 `--accessible-color` 到需要它的特定的css规则, 以确保背景色基于前景色可见, 我 把 `--accessible-color` 变量在几个地方乘以-1 。 颜色能够通过控制右下侧的控制器改变, 点击齿轮来配置他们。 

[CODEPEN](https://codepen.io/joshbader/pen/bzeYgq)

## There are other ways to do this

## 还有其他的方式来做

A little while back, Facundo Corradini explained how to do something very similar in this post. He uses a slightly different calculation in combination with the hsl function. He also goes into detail about some of the issues he was having while coming up with the concept:

一会儿后, Facundo Corradini 在这片文章里解释如何做一些非常相似的事情, 他用一个有轻微差异的算法与hsl函数组合起来。 他还会深入一些问题的细节关于提出这个概念的过程。 

> Some hues get really problematic (particularly yellows and cyans), as they are displayed way brighter than others (e.g. reds and blues) despite having the same lightness value. In consequence, some colors are treated as dark and given white text despite being extremely bright.

一些色调变得非常不确定(通常是黄色或者蓝绿色), 他们显示得比其他颜色(如红色和蓝色)要亮, 尽管他们有相同的亮度值。 因此, 一些颜色作为深色处理, 并让白色的文本变得更加醒目

> What in the name of CSS is going on?

css的名字是什么？ 

He goes on to mention that Edge wasn't capping his large numbers, and during my testing, I noticed that sometimes it was working and other times it was not. If anyone can pinpoint why this might be, feel free to share in the comments.

他提到 `Edge` 没有限制大数字, 并且, 在我的测试中, 我注意到有时他们正常, 有时不正常。 如果任何人知道为什么, 可以在评论里自由分享。 

Further, Ana Tudor explains how using filter + mix-blend-mode can help contrast text against more complex backgrounds. And, when I say complex, I mean complex. She even goes so far as to demonstrate how text color can change as pieces of the background color change — pretty awesome!

此外, Ana Tudor 解释了 如何使用 `filter` + `mix-blend-mode` 可以 帮助文本与更复杂的背景对比。 我的意思是相当地复杂, 她甚至证明了文字颜色如何随着背景色改变而改变 - 令人惊叹! 

Also, Robin Rendle explains how to use mix-blend-mode along with pseudo elements to automatically reverse text colors based on their background-color.

同时, Robin Rendle 解释了如何使用 `mix-blend-mode` 和 伪元素一起自动基于背景色反转文字颜色。 

So, count this as yet another approach to throw into the mix. It's incredibly awesome that Custom Properties open up these sorts of possibilities for us while allowing us to solve the same problem in a variety of ways.

因此, 将此视为另一种投入混合的方式。 自定义特性 开创了一些可能性, 并允许我们使用不同的方式, 来解决相同的问题。 