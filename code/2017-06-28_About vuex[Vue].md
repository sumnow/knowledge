# 关于vuex

vuex是用来解决复杂的组件交互，毕竟简单的父子组件交互有适合的属性，但是兄弟组件交互的时候就往往以来事件总线(bus event)，通过新建一个vue实例来专门处理事件分发，各种$emit和$on，但是有个问题就是当事件交互非常多的时候，事件总线会异常庞大，维护和开发成本增加。

而vuex就是为了应对复杂事件而开发的，其实本身也是一个事件总线，但是通过合理的控制，让它没有那么混乱。

其实可以这么理解，大部分来说，事件交互都是为了传递某些消息，例如componentA一个button点击后，要让componetB里的一个变量b ++，如果使用js原本的实现方式，只要button点击就可以让window.b改变，vuex也基本类似，他将这些多个组件访问的数据独立出来成为state，每个组件都通过访问它来触发某些事件。

`每个导入了vuex的都可以获取this.$store来访问state变量`

说起来，其实vuex类似一个数据库，store是它的名字，而state就是它的内容。

	export default new Vuex.Store({
	  state,
	  getters,
	  actions,
	  mutations
	})

一个正常的vuex.Store是需要输出这些的，那么getters，actions, mutations都是用来做什么的呢？

### getters

getters从名字就能看出来是为了取到某个值的，既然是取值，那么就无需额外的参数，只需要数据库本身state就可以了，例如下面这个方法，就是取到了state中的count。

	export const getcount = state => state.count

其实，this.$store.state.count也是可以获得同样的结果，但是如果我需要获取的是这个count的奇偶，那么你就需要下面这个函数了。

	export const evenOrOdd = state => state.count % 2 === 0 ? 'even' : 'odd'

getters主要是为了获取数据库中的某个值（且可以加工）。

而在组件中，

	import { mapGetters } from 'vuex'//引入getters

	computed: mapGetters([
    	'getcount'
  	])

那么你就获取到了count的值了,

### mutations

还是刚才那个例子，点击了按钮A，应当触发`b++`的事件，而这个事件就是mutations，当一个事件触发了，state中的count改变了，如何改变就是mutations的职能了，例如一个简单的+1操作

	export const increment = (state) => { state.count++ }

这个就完成了对state的修改，那么中间层其实是缺乏的，它就是接下来说的

### actions

		<button @click="increment">add</button>

假设button是这样的，那么点击它，触发刚才的increment,那么actions就是负责点击之后，怎么处理的。

		import { mapGetters， mapActions } from 'vuex'
		methods: {
			...mapActions(['increment'])
		}

通过methods，就告知了actions,然后actions会通过increment来处理数据。

		export const increment = ({ commit }) => commit('increment')

commit 就是改变之后触发的函数，而increment就是它的回调

>ps： dispatch在2.0之前，功能就是现在的commit，而在2.0之后，它被用来作为actions的触发器
		store.dispatch('ACTION_TYPE')

对了，虽然写在最后，你应该最先写的是将vuex引入main.js中，将它注入到整个Vue根组件里。

另外，在根组件引用vuex的时候，如果文件目录store下有getters,actions,mutations,index，可以直接引用'/store',会自动索引到index文件，但是如果index名字叫state，那你就需要自己引到'./store/state'。