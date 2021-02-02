<!--
Created: Tue Feb 02 2021 19:21:30 GMT+0800 (China Standard Time)
Modified: Tue Feb 02 2021 19:23:03 GMT+0800 (China Standard Time)
-->

# vue 里的生命周期

## vue里

### 组件内data是在beforeCreate和created之间执行

### 父子组件生命周期执行顺序: 

父组件创建完成后会等待子组件挂载完成才会挂载到页面上, 所以父子组件生命周期执行顺序为:
beforeCreate(父) -> created(父) -> beforeMount(父) -> beforeCreate(子) -> created(子) -> beforeMount(子) -> mounted(子) -> mounted(父)

### data执行组件先于mixin

数据对象在内部会进行递归合并, 并在发生冲突时以组件数据优先.

### 生命周期执行mixin先于组件

同名钩子函数将合并为一个数组, 因此都将被调用. 另外, 混入对象的钩子将在组件自身钩子之前调用.

### 若组件和mixin的methods重名, 则取组件的methods.(从13、14、15、16可以看出)

值为对象的选项, 例如 methods、components 和 directives, 将被合并为同一个对象. 两个对象键名冲突时, 取组件对象的键值对.


## 小程序父子组件


再次开始之前先问几个问题：

你是否知道Page生命周期 与 pagelifetimes 生命周期执行顺序?

你是否知道behaviors中的生命周期与组件生命周期执行顺序?

你是否知道Page生命周期 与 组件pagelifetimes生命周期执行顺序?

要回答上面的问题，首先我们看看小程序生命周期有哪些：

App

onLaunch
onShow
onHide
Page

onLoad
onShow
onReady
onHide
onUnload
Component

created
attached
ready
moved
detached
想一下加载一个页面（包含组件）的加载顺序，按照直觉小程序加载顺序应该是这样的加载顺序（以下列子中Component都是同步组件）：

App（onLaunch） -> Page(onLoad) -> Component(created)

但其实并不然，小程序的加载顺序是这样的：

首先执行 App.onLaunch -> App.onShow
其次执行 Component.created -> Component.attached
再执行 Page.onLoad -> Page.onShow
最后 执行 Component.ready -> Page.onReady
其实也不难理解微信这么设计背后的逻辑，我们先看下官方的的生命周期：


