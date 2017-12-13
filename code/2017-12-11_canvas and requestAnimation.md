# canvas and requestAnimation

requestAnimation 是一个浏览器的内置重绘方法，canvas一般都会使用这个，来充分利用Gpu的性能，它与setTimeout看起来并无二致，但其实还有几个问题

1. setTimeout不会在浏览器切出去后停止，而requestAnimation会为了节约性能停止动画。