# diff算法

vue的diff算法，是用来遍历 `virtual dom` 的改变。

首先，`virtual dom` 的出现是为了节省浏览器 `repaint` 或者 `reflow` 的开销。

虽然可以通过一些手段来降低开销，但始终不如使用虚拟节点来的节约，将dom操作改变为js操作，大大提高了浏览器的效率。

先来考虑一下如果是自己来做会怎么办？

首先需要定义一个数据结构来表示dom树，

    class Vnode {
        constructor(obj) {
            this.el = obj.el;
            this.tag = obj.tag;
            this.sel = obj.sel;
            this.data = obj.data;
            this.children = obj.children;
            this.text = obj.text;
        }
    }

那么这样的结构生成的dom树应该是这样的：

    new Vnode('div', {
        attrs: {
            'class': 'banner'
        }
    },
        [
            new Vnode('p', {
                attrs: {
                    'class': 'bannername',
                }
            },
                new Vnode(undefined, undefined, undefined, 'hello')
            ),
            new Vnode('img', {
                attrs: {
                    'src': 'http://example.com/image.jpg'
                }
            })
        ]
    )

根据这样一个虚拟的dom树就可以使用 `createElement` 方法来遍历，实现真实的节点。

function _createElement(vnode, p) {
    const le = document.createElement(vnode.tag)
    le.appendChild(document.createTextNode(vnode.text))
    if (vnode.el) {
        document.querySelector(p).appendChild(le)
    } else if (p) {
        document.querySelector(p).appendChild(le)
    }
    if (vnode.data) {
        for (key in vnode.data) {
            le.setAttribute(key, vnode.data[key])
        }
    }
    if (vnode.children.length > 0) {
        vnode.children.map(e => _createElement(e, vnode.sel))
    }
}




