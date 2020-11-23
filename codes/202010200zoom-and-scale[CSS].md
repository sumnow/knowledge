<!--
Created: Mon Nov 02 2020 16:05:58 GMT+0800 (China Standard Time)
Modified: Tue Nov 03 2020 14:25:56 GMT+0800 (China Standard Time)
-->

# zoom 和 scale

## zoom

百分比值:zoom:50%, 表示缩小到原来的一半.

数值:zoom:0.5, 表示缩小到原来的一半.

normal关键字:zoom:normal等同于zoom:1.

注意, 虽然Chrome/Safari浏览器支持了zoom属性, 但是, 其实zoom并不是标准属性.

## CSS3 transform

transform下的scale而transform下的scale就不一样了, 是明明确确写入规范的. 从IE9+到其他现代浏览器都支持. 语法为: `transform: scale(<x> [<y>])` . 同时有scaleX, scaleY专门的x, y方向的控制. 

和zoom不同, scale并不支持百分比值和normal关键字, 只能是数值. 而且, 还能是负数, 没错, 负数. 而zoom不能是负值!

zoom和scale更深层次的差异  控制缩放的值不一样.zoom更全面, 但是不能是负数, 只能等比例控制; 而scale虽然只能是数值, 但是能负数, 可以只控制1个维度.

zoom的缩放是相对于左上角的; 而scale默认是居中缩放; 

zoom的缩放改变了元素占据的空间大小; 而scale的缩放占据的原始尺寸不变, 页面布局不会发生变化; 

zoom和scale对元素的渲染计算方法可能有差异. 对文字的缩放规则不一致.zoom缩放依然受限于最小12像素中文大小限制; 而scale就是纯粹的对图形进行比例控制, 文字50%原来尺寸. 然后, 还有一个肉眼看不见却更重要的差异, 渲染的性能差异明显. 由于zoom的缩放会改变元素的真实空间大小, 会影响其它的元素, 在文档流中zoom加在任意一个元素上都会引起一整个页面的重新渲染, 而scale只是在当前的元素上重绘. 即scale变化时其原本的尺寸是不变的, 但zoom则会改变其原来尺寸. 我们要实现元素的缩放效果, 可以使用CSS3 animation, 但是存在这样一种情况, 就是元素原本就使用了一些transform属性进行, 此时, 再使用scale进行animation缩放, 就会覆盖原来的值, 事情就会变得麻烦. 在移动端, 大家也可以使用zoom进行一些静态内容的控制, 可以避免为了scale而占有translate, rotate, skew等公用的transform属性. 

需要注意的是, Chrome等浏览器下, zoom/scale不要同时使用, 因为, 缩放效果会累加. 下面是不改变整体布局时进行的笔记本适配. 将网页进行整体缩放. 效果相当于ctrl+鼠标滚动j进行网页的缩放, 只不过这是通过计算比例, 然后在具体的分辨率下显示缩放后的网页(无需手动缩放), 业务场景应该是希望内容一屏显示, 在不同的分辨率下不希望出现滚动条.

``` JS
// JavaScript

function zoomhtml() {
  var wid = $(window).width(),
    len;
  if (wid < 1600) {
    len = wid / 1600;
    $("html").css("zoom", len);
    $("html").css({
      "-moz-transform": "scale(" + len + ")"
    }, {
      "-moz-transform-origin": "0 0"
    });
  }
};
zoomhtml();
```
