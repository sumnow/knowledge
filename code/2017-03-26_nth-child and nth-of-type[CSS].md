# nth-child以及nth-of-type
nth-child可以满足一些独特的元素选择上，但是有一个nth-of-type的双胞弟弟，流浪在外，蛮少见到，写个代码验一下血统。

样式：

    li:nth-child(2){
        color:red;
    }
    li:nth-of-type(2){
        color:blue;
    }
    li:last-of-type{
        color:lightblue;
    }
    li:last-child{
        color:gray;
    }  

页面：

    <ul>
            <span>start</span>
            <li>
                <span>1</span>
            </li>
            <li>
                <span>2</span>
            </li>
            <li>
                <span>3</span>
            </li>
            <li>
                <span>4</span>
            </li>
            <span>end</span>
    </ul>

结果：


看起来，li:nth-child跟名字一样是选择父元素下第n个元素， 然后发现是li就生效，如果不是li就“查无此人”，而nth-of-type则不一样，是先让所有的li排个队，然后把第n个找出来(如果确实没有那就真的无此人了)。

`我觉得这个太坑了，就好像一个妖怪说要吃路过的第二个男子，然后放过了第一个男子，第二个来的发现是个女子，妖怪可能不吃这个，等待下一个男子，难道妖怪会觉得这是上天点化他，要他弃恶从善么，从此不再吃人么？？Excuse me？`

这个其实从某种意义上来说是nth-of-type更加符合我们心里所期望的结果，而nth-child容易在append元素或者prepend的时候，让我们的css产生误差。因此以后还是多用nth-of-type来查找会更加符合心中期望。如果一定要用也可使用ul :nth-child(2)来解决问题。

`本妖怪就吃来的第二个，唐僧最好，猪八戒也凑活。`

