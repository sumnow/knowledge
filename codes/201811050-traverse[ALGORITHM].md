<!--
Created: Mon Aug 26 2019 15:20:37 GMT+0800 (China Standard Time)
Modified: Mon Aug 26 2019 15:20:37 GMT+0800 (China Standard Time)
-->
# 树

``` tree
           A
         /   \
        B      C
      /  \    /  \
     D    E  F    G
```

对于一棵二叉树, 深度优先搜索(Depth First Search)是沿着树的深度遍历树的节点, 尽可能深的搜索树的分支. 以上面二叉树为例, 深度优先搜索的顺序

为: ABDECFG. 怎么实现这个顺序呢 ? 深度优先搜索二叉树是先访问根结点, 然后遍历左子树接着是遍历右子树, 因此我们可以利用堆栈的先进后出的特点, 

现将右子树压栈, 再将左子树压栈, 这样左子树就位于栈顶, 可以保证结点的左子树先与右子树被遍历. 

广度优先搜索(Breadth First Search), 又叫宽度优先搜索或横向优先搜索, 是从根结点开始沿着树的宽度搜索遍历, 上面二叉树的遍历顺序为: ABCDEFG.

