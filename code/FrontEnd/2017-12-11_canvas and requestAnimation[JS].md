# canvas and requestAnimation

 `requestAnimation` 是一个浏览器的内置重绘方法, canvas一般都会使用这个, 来充分利用Gpu的性能, 它与 `setTimeout` 看起来并无二致, 但其实还有几个问题

1. `setTimeout` 不会在浏览器切出去后停止, 而 `requestAnimation` 会为了节约性能停止动画。 

2. `requestAnimation` 使用的是浏览器的内建频率, 而 `setTimeout` 多是使用 `1000/60` ms。 

3. `requestAnimation` 会更直接地利用硬件资源, 而 `setTimeout` 占用更多的cpu资源。 

