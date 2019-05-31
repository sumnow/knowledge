# 条件判断

## 小技巧

### 从对象里剔除某属性

```js
const noPassword = ({
    password,
    ...rest
}) => rest

const user = {
    name: 'jack',
    password: 123456
}

noPassword(user)
```

还可以对任意属性剔除

```js
const noProperty = prop => ({
    [prop]: _,
    ...rest
}) => rest

const noPassword = noProperty('password')
```

## 函数单一职责

在处理数据的时候, 会有对数据进行处理的场景

例如这样的数据

    data: [{
        name: 'Jack',
        gender: 'male',
        height: 180
    }, {
        name: 'Tom',
        gender: 'male',
        height: 170
    }, {
        name: 'Adele',
        gender: 'female',
        height: 165
    }, {
        name: 'Rachel',
        gender: 'female',
        height: 155
    }]

如果要把名字改成统统小写, 把身高加上单位, 一般会这么做

    data = data.map(e => {
        e.name = e.name.toLowerCase();
        e.height = e.height + 'cm'
    })

但一旦处理变得复杂就容易出现问题, 因此推荐分离成一个处理函数

    class PersonList {
        constructor(data) {
            this.data = data
            this.handlerList = [];
        }
        setName(item) {
            item.name = item.name.toLowerCase();
            return item
        }
        handlerName() {
            this.handlerList.push('setName')
            return this;
        }
        setHeight(item) {
            item.height = item.height + 'cm'
            return item
        }
        handlerHeight() {
            this.handlerList.push('setHeight')
            return this;
        }
        load() {
            return this.data.map(e => {
                this.handlerList.forEach(se => {
                    e = this[se](e)
                })
                return e
            })
        }
    }

handlerHeight, handlerName返回this是为了链式调用

    const list = new PersonList(data)
    list.handlerHeight().handlerName()
    list.load()

### switch 和if/else的替换 

判断逻辑是一个很容易写得复杂, 不直观的模块.

这里提供一个思路, 例如根据身份和状态来选择处理逻辑

    const actions = new Map([
        [{
            identity: 'guest',
            status: 1
        }, () => { /*do sth*/ }],
        [{
            identity: 'guest',
            status: 2
        }, () => { /*do sth*/ }],
        //...
    ])

    const onButtonClick = (identity, status) => {
        let action = [...actions].filter(([key, value]) => (key.identity == identity && key.status == status))
        action.forEach(([key, value]) => value.call(this))
    }

