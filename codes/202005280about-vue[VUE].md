<!--
Created: Thu May 28 2020 11:31:31 GMT+0800 (China Standard Time)
Modified: Thu May 28 2020 13:01:43 GMT+0800 (China Standard Time)
-->

# 过程: 制作Vue3 The process: Making Vue 3 

重写 `Vue.js` 下一个主要版本的经验 Lessons from rewriting the next major version of Vue.js.

---

Over the past year, the Vue team has been working on the next major version of Vue.js, which we hope to release in the first half of 2020. (This work is ongoing at the time of writing.) The idea for a new major version of Vue took shape in late 2018, when the codebase of Vue 2 was about two-and-a-half years old. That may not sound like a long time in the life span of generic software, but the frontend landscape had changed drastically during that period.

在过去的一年中, Vue的团队一直在研究 `Vue.js` 的下一个主要版本, 即我们希望在2020年上半年发布的版本.(在写本篇文章的同时, 这项工作仍在进行中). Vue的新主要版本的构想在2018年晚些时候形成. 当时 `Vue 2` 的代码库已有两年半的历史了. 在通用软件的生命周期中听起来可能并不长, 但在此期间, 前端环境发生了巨大变化.

Two key considerations led us to the new major version (and rewrite) of Vue: First, the general availability of new JavaScript language features in mainstream browsers. Second, design and architectural issues in the current codebase that had been exposed over time.

有两个主要的考虑因素使我们开发了Vue的新主要版本(并重写了它): 首先, 主流浏览器中, 新的 `JavaScript` 语言功能普遍可用. 其次, 随着时间的推移, 当前代码库中的设计和体系结构问题已经暴露出来.

## 为何重写 Why rewrite

### 利用新的语言功能 LEVERAGING NEW LANGUAGE FEATURES

With the standardization of ES2015, JavaScript—formally known as ECMAScript, abbreviated to ES—received major improvements, and mainstream browsers were finally starting to provide decent support for these new additions. Some in particular presented opportunities for us to greatly improve Vue's capabilities.

随着ES2015的标准化, JavaScript(之前简称为ECMAScript, 缩写为ES)获得了重大改进, 主流浏览器终于开始为这些新功能提供不错的支持. 特别是一些为我们提供了极大提高Vue功能的机会.

The most noteworthy among them is Proxy, which allows the framework to intercept operations on objects. A core feature of Vue is the ability to listen to changes made to the user-defined state and reactively update the DOM. Vue 2 implements this reactivity by replacing the properties on state objects with getters and setters. Switching to Proxy would allow us to eliminate Vue's existing limitations, such as the inability to detect new property additions, and provide better performance.

其中最值得注意的是 `Proxy` , 它允许框架拦截对象上的操作. Vue的核心功能是能够侦听对用户定义状态所做的更改并以反应方式更新DOM的能力. `Vue 2` 通过使用 `getter` 和 `setter` 替换状态对象上的属性来实现这种响应式. 切换到 `Proxy` 将使我们能够消除 `Vue` 的现有限制, 例如无法检测到新属性的添加, 并提供更好的性能.

However, Proxy is a native language feature that cannot be fully polyfilled in legacy browsers. In order to leverage it, we knew we'd have to adjust the framework's browser support range—a big breaking change that could only be shipped in a new major version.

但是, `Proxy` 是原生功能, 不能在旧版浏览器中完全实现兼容(polyfill). 为了利用它, 我们知道我们必须调整框架的浏览器支持范围, 这是只能在新的主要版本中发布的一个重大突破.

### 解决架构问题 ADDRESSING ARCHITECTURAL ISSUES

> Fixing these issues in the current codebase would require huge, risky refactors that are almost equivalent to a rewrite.
> 要在当前代码库中解决这些问题, 将需要进行大量风险较大的重构, 几乎等同于重写.

Over the course of maintaining Vue 2, we've accumulated a number of issues that have been difficult to address due to the limitations of the existing architecture. For example, the template compiler was written in a way that makes proper source-map support very challenging. Also, while Vue 2 technically enables building higher-level renderers that target non-DOM platforms, we had to fork the codebase and duplicate lots of code in order to make this possible. Fixing these issues in the current codebase would require huge, risky refactors that are almost equivalent to a rewrite.

在维护 `Vue 2` 的过程中, 由于现有架构的限制, 我们积累了许多难以解决的问题. 例如, 模板编译器的编写方式使适当的源映射(sourceMap)支持非常具有挑战性. 同样, 虽然 `Vue 2` 从技术上允许构建针对非DOM平台的更高级别的渲染器, 但我们必须派生代码库并复制大量代码, 才能实现这一点. 要在当前代码库中解决这些问题, 将需要进行大量风险较大的重构, 几乎等同于重写.

At the same time, we've accumulated technical debt in the form of implicit coupling between the internals of various modules and floating code that doesn't seem to belong anywhere. This made it harder to understand a part of the codebase in isolation, and we noticed that contributors rarely felt confident making nontrivial changes. The rewrite would give us the opportunity to rethink the code organization with these things in mind.

同时, 我们以各种模块的内部与浮动代码之间隐式耦合的形式积累了技术债务, 而浮动代码似乎并不属于任何地方. 这使得孤立地理解代码库的一部分变得更加困难, 并且我们注意到, 贡献者很少会对进行重要的更改充满信心. 重写将使我们有机会考虑这些因素来重新考虑代码组织.

## 初始原型阶段 Initial prototyping phase

We started prototyping Vue 3 in late 2018 with the preliminary goal of validating the solutions to these problems. During this stage, we mostly focused on building a solid foundation for further development.

我们于2018年底开始对 `Vue 3` 进行原型设计, 其初步目标是验证这些问题的解决方案. 在此阶段, 我们主要致力于为进一步发展奠定坚实的基础.

### 切换到TypeScript  SWITCHING TO TYPESCRIPT

Vue 2 was originally written in plain ES. Shortly after the prototyping stage, we realized that a type system would be very helpful for a project of this magnitude. Type checks greatly reduce the chance of introducing unintended bugs during refactors and help contributors be more confident in making nontrivial changes. We adopted Facebook's Flow type checker because it can be gradually added to an existing plain-ES project. Flow helped to a certain extent, but we didn't benefit from it as much as we'd hoped; in particular, the constant breaking changes made upgrading a pain. The support for integrated development environments was also not ideal compared to TypeScript's deep integration with Visual Studio Code.

`Vue 2` 最初是用纯ES编写的. 在原型开发阶段后不久, 我们意识到类型系统对于这种规模的项目将非常有帮助. 类型检查大大减少了重构期间引入意想不到的错误的机会, 并有助于贡献者更自信地进行重要的更改. 我们采用了Facebook的 `Flow` 类型检查器, 因为它可以逐渐添加到现有的普通ES项目中. `Flow` 在一定程度上有所帮助, 但是我们没有像预期的那样从中获得太多收益. 特别是不断变化的变化使升级变得很痛苦. 与 `TypeScript` 与 `Visual Studio Code` 的深度集成相比, 对集成开发环境的支持也不理想.

We also noticed that users were increasingly using Vue and TypeScript together. To support their use cases, we had to author and maintain the TypeScript declarations separately from the source code, which used a different type system. Switching to TypeScript would allow us to automatically generate the declaration files, alleviating the maintenance burden.

我们还注意到, 用户越来越多地同时使用 `Vue` 和 `TypeScript` . 为了支持它们的用例, 我们必须与使用不同类型系统的源代码分开创作和维护 `TypeScript` 声明. 切换到 `TypeScript` 将使我们能够自动生成声明文件, 从而减轻了维护负担.

### 解耦内部包装 DECOUPLING INTERNAL PACKAGES

We also adopted a monorepo setup in which the framework is made up of internal packages, each with their own individual APIs, type definitions, and tests. We wanted to make the dependencies between these modules more explicit, making it easier for developers to read, understand, and make changes to all. This was key to our endeavor to lower the project's contribution barriers and improve its long-term maintainability.

我们还采用了 `monorepo`(单一存储库) 设置, 其中的框架由内部程序包组成, 每个程序包都具有自己的独立API, 类型定义和测试. 我们希望使这些模块之间的依赖关系更加明确, 从而使开发人员更容易阅读, 理解和更改所有模块. 这是我们努力降低该项目的贡献障碍并提高其长期可维护性的关键.

### 设置RFC流程 SETTING UP THE RFC PROCESS

By the end of 2018, we had a working prototype with the new reactivity system and virtual DOM renderer. We had validated the internal architectural improvements we wanted to make, but only had rough drafts of the public-facing API changes. It was time to turn them into concrete designs.

到2018年底, 我们有了一个使用新的响应式系统和虚拟DOM渲染器的工作原型. 我们已经验证了我们想要进行的内部体系结构改进, 但是只包含了面向公众的API更改的草稿. 是时候将它们变成具体的设计了.

We knew we had to do this early and carefully. Vue's widespread usage means breaking changes can lead to massive migration costs for users and potential ecosystem fragmentation. To ensure users would be able to provide feedback on breaking changes, we adopted an RFC (Request for Comments) process at the beginning of 2019. Each RFC follows a template, with sections focused on motivation, design details, trade-offs, and adoption strategies. Since the process is conducted in a GitHub repo with proposals submitted as pull requests, discussions unfold organically in the comments.

我们知道我们必须尽早而仔细地做到这一点. Vue的广泛使用意味着突破性变化可能导致用户大量迁移成本和潜在的生态系统碎片化. 为了确保用户能够提供有关重大更改的反馈, 我们在2019年初采用了RFC(征求意见)流程. 每个RFC遵循一个模板, 其中侧重于动机, 设计细节, 权衡和采用策略. 由于此过程是在GitHub存储库中进行的, 提案是作为 `Pull Request` 提交的, 因此讨论在评论中自然展开.

The RFC process has proven immensely helpful, serving as a thought framework that forces us to fully consider all aspects of a potential change, and allowing our community to participate in the design process and submit well-thought-out feature requests.

事实证明, RFC流程非常有用, 它是一个思想框架, 可促使我们充分考虑潜在变更的所有方面, 并允许我们的社区参与设计过程并提交经过深思熟虑的功能请求.

##  更快更小 Faster and smaller

> Performance is essential to frontend frameworks.
> 性能对于前端框架至关重要.

Performance is essential to frontend frameworks. Although Vue 2 boasts competitive performance, the rewrite offers an opportunity to go even further by experimenting with new rendering strategies.

性能对于前端框架至关重要. 尽管 `Vue 2` 具有出色的性能, 但重写提供了通过尝试新的渲染策略来进一步发展的机会.

### 突破虚拟DOM的瓶颈 OVERCOMING THE BOTTLENECK OF VIRTUAL DOM

Vue has a fairly unique rendering strategy: It provides an HTML-like template syntax but compiles the templates into render functions that return virtual DOM trees. The framework figures out which parts of the actual DOM to update by recursively walking two virtual DOM trees and comparing every property on every node. This somewhat brute-force algorithm is generally pretty quick, thanks to the advanced optimizations performed by modern JavaScript engines, but updates still involve a lot of unnecessary CPU work. The inefficiency is particularly obvious when you look at a template with largely static content and only a few dynamic bindings—the whole virtual DOM tree still needs to be recursively walked to figure out what's changed.

Vue有一个相当独特的渲染策略: 它提供了类似于HTML的模板语法, 但是将模板编译为可返回虚拟DOM树的渲染函数. 该框架通过递归遍历两个虚拟DOM树并比较每个节点上的每个属性来确定要更新实际DOM的哪些部分. 感谢现代JavaScript引擎执行了高级优化, 使得这种有点蛮力的算法通常很快, 但是更新仍然涉及许多不必要的CPU工作. 当您查看包含大量静态内容且只有少量动态绑定的模板时, 效率低下尤其明显-整个虚拟DOM树仍需要递归遍历以找出更改之处.

Luckily, the template compilation step gives us a chance to perform a static analysis of the template and extract information about dynamic parts. Vue 2 did this to some extent by skipping static sub-trees, but more advanced optimizations were difficult to implement due to the overly simplistic compiler architecture. In Vue 3, we rewrote the compiler with a proper AST transform pipeline, which allows us to compose compile-time optimizations in the form of transform plug-ins.

幸运的是, 模板编译步骤使我们有机会对模板进行静态分析并提取有关动态零件的信息. `Vue 2` 通过跳过静态子树在某种程度上做到了这一点, 但是由于过于简单的编译器体系结构, 难以实施更高级的优化. 在 `Vue 3` 中, 我们使用适当的AST转换管道重写了编译器, 这使我们能够以转换插件的形式编写编译时优化.

With the new architecture in place, we wanted to find a rendering strategy that would eliminate as much overhead as possible. One option was to ditch virtual DOM and directly generate imperative DOM operations, but that would eliminate the ability to directly author virtual DOM render functions, which we've found to be highly valuable to advanced users and library authors. Plus, it would be a huge breaking change.

有了新的体系结构, 我们希望找到一种渲染策略, 以尽可能减少开销. 一种选择是放弃虚拟DOM并直接生成命令式DOM操作, 但这将消除直接编写虚拟DOM渲染功能的能力, 我们发现这对高级用户和库作者非常有价值. 另外, 这将是一个巨大的突破性变化.

The next best thing was to get rid of unnecessary virtual DOM tree traversals and property comparisons, which tend to have the most performance overhead during updates. In order to achieve this, the compiler and the runtime need to work together: The compiler analyzes the template and generates code with optimization hints, while the runtime picks up the hints and takes fast paths whenever possible. There are three major optimizations at work here:

其次, 最好的方法是消除不必要的虚拟DOM树遍历和属性比较, 这在更新过程中往往会带来最大的性能开销. 为了实现这一点, 编译器和运行时需要协同工作: 编译器分析模板并生成带有优化提示的代码, 而运行时将拾取提示并尽可能采用快速路径. 这里有三个主要的优化工作:

First, at the tree level, we noticed that node structures stay completely static in the absence of template directives that dynamically alter the node structure (e.g., v-if and v-for). If we divide a template into nested "blocks" separated by these structural directives, the node structures within each block become completely static again. When we update the nodes within a block, we no longer need to recursively traverse the tree—dynamic bindings within the block can be tracked in a flat array. This optimization circumvents much of the virtual DOM's overhead by reducing the amount of tree traversal we need to perform by an order of magnitude. \

首先, 在树级别, 我们注意到在没有模板指令的情况下, 节点结构保持完全静态, 模板指令可动态更改节点结构(例如, v-if和v-for). 如果我们将模板划分为由这些结构指令分隔的嵌套"块", 则每个块内的节点结构将再次变得完全静态. 当我们更新一个块中的节点时, 我们不再需要递归遍历该树-可以在平面数组中跟踪该块内的动态绑定. 这种优化通过将我们需要执行的树遍历量减少一个数量级来避免了虚拟DOM的大部分开销. \

Second, the compiler aggressively detects static nodes, subtrees, and even data objects in a template and hoists them outside the render function in the generated code. This avoids recreating these objects on each render, greatly improving memory usage and reducing the frequency of garbage collection. \

其次, 编译器会主动检测模板中的静态节点, 子树甚至数据对象, 并将其提升到生成代码中的 `render` 函数之外. 这样可以避免在每个渲染上重新创建这些对象, 从而大大提高了内存使用率并减少了垃圾回收的频率. \

Third, at the element level, the compiler also generates an optimization flag for each element with dynamic bindings based on the type of updates it needs to perform. For example, an element with a dynamic class binding and a number of static attributes will receive a flag that indicates only a class check is needed. The runtime will pick up these hints and take the dedicated fast paths.

第三, 在元素级别, 编译器还会根据需要执行的更新类型为具有动态绑定的每个元素生成一个优化标志. 例如, 具有动态类绑定和许多静态属性的元素将收到一个标志, 指示仅需要进行类检查. 运行时将获取这些提示并采用专用的快速路径.

Combined, these techniques have significantly improved our render update benchmarks, with Vue 3 sometimes taking less than a tenth of Vue 2's CPU time

综合起来, 这些技术大大改善了渲染更新基准, 有时Vue 3占用的CPU时间不到Vue 2的十分之一.

### 最小化Bundle体积 MINIMIZING BUNDLE SIZE

The size of the framework also affects its performance. This is a unique concern for web applications because assets need to be downloaded on the fly, and the app will not be interactive until the browser has parsed the necessary JavaScript. This is particularly true for single-page applications. While Vue has always been relatively lightweight—Vue 2's runtime size is around 23 KB gzipped—we've noticed two problems:

框架的大小也会影响其性能. 这是Web应用程序的唯一关注点, 因为需要动态下载资源, 并且在浏览器解析必要的JavaScript之前, 该应用程序将是交互式的. 对于单页应用程序尤其如此. 尽管Vue一直是相对轻量级的(Vue 2的运行时大小压缩为23 KB), 但我们注意到了两个问题:

First, not everyone uses all of the framework's features. For example, an app that never uses the transition features still pays the download and parse costs of transition-related code.

首先, 并不是每个人都使用框架的所有功能. 例如, 一个从不使用过渡功能的应用仍需支付与过渡相关的代码的下载和解析开销.

Second, the framework keeps growing indefinitely as we add new features. This gives bundle size disproportionate weight when we consider the trade-offs of a new feature addition. As a result, we tend to only include features that will be used by the majority of our users.

其次, 当我们添加新功能时, 该框架会无限期地增长. 当我们考虑新功能添加的折衷时, 这使 `bundle` 的大小不成比例. 因此, 我们倾向于仅包含大多数用户使用的功能.

Ideally, the user should be able to drop code for unused framework features at build time—also known as "tree-shaking"——and only pay for what they use. This would also allow us to ship features that a subset of our users would find useful without adding payload costs for the rest.

理想情况下, 用户应该能够在构建时删除未使用的框架功能的代码(也称为"tree-shaking"), 并且只为使用的功能付出开销. 这也将使我们能够发布一部分用户会觉得有用的功能, 而不会增加其余用户的有效负载成本.

In Vue 3, we achieved this by moving most of the global APIs and internal helpers to ES module exports. This allows modern bundlers to statically analyze the module dependencies and drop code related to unused exports. The template compiler also generates tree-shaking friendly code, which only imports helpers for a feature if the feature is actually used in the template.

在 `Vue 3` 中, 我们通过将大多数全局API和内部帮助程序移至ES模块导出来实现了这一目标. 这使现代的 `bundle` 可以静态分析模块依赖性并删除与 未使用的导出 相关的代码. 模板编译器还会生成对 `tree-shaking` 友好的代码, 如果该功能实际上在模板中使用, 则该代码仅导入该功能的帮助程序.

Some parts of the framework can never be tree-shaken because they're essential to any type of app. We call the measure of these indispensable parts the baseline size. Vue 3's baseline size is around 10 KB gzipped—less than half that of Vue 2, despite the addition of numerous new features.

框架的某些部分永远不会被 `tree-shaken` , 因为它们对于任何类型的应用都是必不可少的. 我们将这些必不可少的部分的度量标准称为基准大小. 尽管增加了许多新功能, 但 `Vue 3` 的基准大小压缩后约为10 KB, 不到 `Vue 2` 的一半.

## 满足规模需求 Addressing the need for scale

We also wanted to improve Vue's ability to handle large-scale applications. Our initial Vue design focused on a low barrier to entry and a gentle learning curve. But as Vue became more widely adopted, we learned more about the needs of projects that contain hundreds of modules and are maintained by dozens of developers over time. For these types of projects, a type system like TypeScript and the ability to cleanly organize reusable code are critical, and Vue 2's support in these areas was less than ideal.

我们还希望提高Vue处理大型应用程序的能力. 我们最初的Vue设计着重于 降低学习门槛 和 温和的学习曲线. 但是随着Vue越来越广泛地被采用, 我们了解了更多有关项目需求的信息, 这些项目包含数百个模块, 并且随着时间的流逝由数十名开发人员维护. 对于这些类型的项目, 像 `TypeScript` 这样的类型系统, 以及 可以清晰组织可重用代码的能力 至关重要, 而 `Vue 2` 在这些领域的支持并不理想.

In the early stages of designing Vue 3, we attempted to improve TypeScript integration by offering built-in support for authoring components using classes. The challenge was that many of the language features we needed to make classes usable, such as class fields and decorators, were still proposals—and subject to change before officially becoming part of JavaScript. The complexity and uncertainty involved made us question whether the addition of the Class API was really justified, since it didn't offer anything other than slightly better TypeScript integration.

在设计 `Vue 3` 的早期阶段, 我们尝试通过提供对使用类编写组件的内置支持来改善TypeScript集成. 挑战在于, 类的许多语言功能(如class关键字和装饰器)仍是提案, 并且在正式成为 `JavaScript` 的一部分之前可能会发生变化. 涉及的复杂性和不确定性使我们怀疑添加 `Class API` 是否真的合理, 因为它除了提供略好的 `TypeScript` 集成外没有提供任何其他功能.

We decided to investigate other ways to attack the scaling problem. Inspired by React Hooks, we thought about exposing the lower-level reactivity and component lifecycle APIs to enable a more free-form way of authoring component logic, called Composition API. Instead of defining a component by specifying a long list of options, the Composition API allows the user to freely express, compose, and reuse stateful component logic just like writing a function, all while providing excellent TypeScript support.

我们决定研究其他解决扩展问题的方法. 受 `React Hooks` 的启发, 我们考虑过展开较低级别的响应式和组件生命周期API, 以启用一种更自由形式的编写组件逻辑的方式, 称为 `Composition API` . 无需通过指定一长串选项来定义组件, `Composition API` 允许用户像编写函数一样自由表达, 编写和重用有状态组件逻辑, 同时还提供了出色的 `TypeScript` 支持.

We were really excited about this idea. Although the Composition API was designed to address a specific category of problems, it's technically possible to use it only when authoring components. In the first draft of the proposal, we got a bit ahead of ourselves and hinted that we might replace the existing Options API with the Composition API in a future release. This resulted in massive pushback from community members, which taught us a valuable lesson about communicating longer-term plans and intentions clearly, as well as understanding users' needs. After listening to feedback from our community, we completely reworked the proposal, making it clear that the Composition API would be additive and complementary to the Options API. The reception of the revised proposal was much more positive, and received many constructive suggestions.

我们对这个想法感到非常兴奋. 尽管 `Composition API` 旨在解决特定类别的问题, 但从技术上讲, 仅在编写组件时才可以使用它. 在该提案的初稿中, 我们有一些超前, 暗示我们可能会在将来的版本中将现有的 `Options API` 替换为 `Composition API` . 这导致了社区成员的大量反对, 这给了我们宝贵的经验教训, 使我们可以清晰地交流长期计划和意图, 以及了解用户的需求. 在听取了我们社区的反馈之后, 我们对提案进行了完全的重新设计, 从而明确表明 `Composition API` 将是 `Options API` 的补充和补充. 修改后的提案收到的反馈更为积极, 并收到了许多建设性的建议.

## 寻求平衡 Seeking balance

> The diversity of developer profiles corresponds to the diversity of use cases
> 开发人员身份的多样性与用例的多样性相对应

Among Vue's user base of over a million developers are beginners with only a basic knowledge of HTML/CSS, professionals moving on from jQuery, veterans migrating from another framework, backend engineers looking for a frontend solution, and software architects dealing with software at scale. The diversity of developer profiles corresponds to the diversity of use cases: Some developers might want to sprinkle interactivity on legacy applications, while others may be working on one-off projects with a fast turnaround but limited maintenance concerns; architects may have to deal with large-scale, multiyear projects and a fluctuating team of developers over the project's lifetime.

在Vue超过一百万的开发人员中, 包含只有 `HTML / CSS` 的基础知识的初学者, 从 `jQuery` 迁移的专业人员, 从另一个框架迁移的"退役人员", 正在寻找前端解决方案的后端工程师, 以及大规模处理软件的软件架构师. 开发人员身份的多样性与用例的多样性相对应: 一些开发人员可能希望将交互性扩展到旧版应用程序上, 而另一些开发人员可能正在快速处理但维护需求有限的一次性项目中工作; 在项目的整个生命周期中, 架构师可能不得不应对大型的, 多年期的项目和一个有波动的开发人员团队.

Vue's design has been continuously shaped and informed by these needs as we seek to strike a balance between various trade-offs. Vue's slogan, "the progressive framework, " encapsulates the layered API design that results from this process. Beginners can enjoy a smooth learning curve with a CDN script, HTML-based templates, and the intuitive Options API, while experts can handle ambitious use cases with full-featured CLI, render functions, and the Composition API.

在我们寻求平衡各种折衷方案的同时, Vue的设计不断受到这些需求的影响和启发. Vue的口号"渐进式框架"封装了由此过程产生的分层API设计. 初学者可以使用CDN脚本, 基于HTML的 `template` 和直观的 `Options API` 来畅通无阻地学习, 而专家可以使用功能齐全的CLI, `render` 函数和 `Composition API` 来处理复杂的用例.

There's still a lot of work left to do to realize our vision—most importantly, updating supporting libraries, documentation, and tools to ensure a smooth migration. We'll be working hard in the coming months, and we can't wait to see what the community will create with Vue 3.

要实现我们的愿景, 还有许多工作要做, 最重要的是, 更新支持库, 文档和工具以确保顺利平滑的迁移. 在接下来的几个月中, 我们将继续努力, 我们迫不及待地想看看社区将通过 `Vue 3` 创造出什么.
