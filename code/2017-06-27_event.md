## event

这个，有点不好意思，之前在js事件流那一章中说会说说event，不知不觉就跳票了这么久了。最近也有阵子没有更新，这个主要是...... hah，跳过这个话题吧。

(/ # _ #)/  ┻━━━━━┻  

：）


![](http://images2015.cnblogs.com/blog/1121217/201706/1121217-20170628120040039-217851359.png)

	因为各个浏览器的事件对象不一样, 把主要的时间对象的属性和方法列出来;

	button： 按下鼠标哪个键
		0 没按键
		1 按左键
		2 按右键
		3 按左右键
		4 按中间键
		5 按左键和中间键
		6 按右键和中间键
		7 按所有的键
		如果是非鼠标事件就肯定返回0;
	keyCode: 某个案件
	screenX/Y： 检测鼠标相对于用户屏幕的水平/垂直位置
	offsetX/Y: 检查相对于触发事件的对象，鼠标位置的水平/垂直坐标
	bubble ：    表明事件是否冒泡
	cancelable ：  表明是否可以取消冒泡
	currentTarget ： 当前时间程序正在处理的元素, 和this一样的;
	defaultPrevented： false ，如果调用了preventDefualt这个就为真了;
	detail： 与事件有关的信息(滚动事件等等)
	eventPhase： 如果值为1表示处于捕获阶段， 值为2表示处于目标阶段，值为三表示在冒泡阶段
	target || srcElement： 事件的目标
	trusted： 为ture是浏览器生成的，为false是开发人员创建的（DOM3）
	type ： 事件的类型
	view ： 与元素关联的window， 我们可能跨iframe；
	preventDefault()    取消默认事件；
	stopPropagation() 取消冒泡或者捕获；
	stopImmediatePropagation() (DOM3)阻止任何事件的运行；
	//stopImmediatePropagation阻止 绑定在事件触发元素的 其他同类事件的callback的运行

	IE下的事件对象是在window下的，而标准应该作为一个参数, 传为函数第一个参数;
	IE的事件对象定义的属性跟标准的不同，如：
	cancelBubble 默认为false, 如果为true就是取消事件冒泡;
	returnValue 默认是true，如果为false就取消默认事件;
	srcElement, 这个指的是target, Firefox下的也是srcElement;

首先呢，event他是全局的，虽然各种浏览器有些不一样，但都有比较妥善的解决方案

IE，就用event就可以了

Chrome中，在所有事件绑定的函数里的第一个参数,默认就是event，甚至你都不需要写，直接event.就阔已了。

firefox，这个浏览器还可以，有中国特色版，虽然跟国际版不通用，但是至少还能同步同步书签啥的，还是可以的，其实也只要加句这个，就可以用event了

    var e = arguments.callee.caller.arguments[0] || window.event

这个先说这么多...误！这个就酱紫，有缘再讲讲。
