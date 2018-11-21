# Subscription and Publishing
    
订阅发布模式又名观察者模式。

一种事件触发的模式，最大的优势在于解耦合，它有一个事件中心，在事件中心里注册事件，然后让订阅了这个事件的对象出反映。

例如

    // 构建一个事件中心
    function eventCenter () {
        this.handlers = {};
    }
    // 注册（订阅）事件的方法
    eventCenter.prototype.on = function (type, callback) {
        if(this.handlers[type]){
            this.handlers[type].push(callback);
        } else {
            this.handlers[type] = [];
            this.handlers[type].push(callback);
        }
    }
    // 触发事件的方法
    eventCenter.prototype.emit = function (type) {
        if(this.handlers[type]) {
            this.handlers[type].map(s=>{
                s();
            })
        } else {
            console.error('undefined method name.')
            return undefined
        }
    }

用学生考试来举例子

    const school = new eventCenter()
    
    // 学生参加考试
    school.on('exam',function(){
        console.log('sturdents take examinations')
    })

    // 老师参加监考
    school.on('exam',function(){
        console.log('teachers invigilated exams')
    })
    
然后学校开始组织考试

    school.emit('exam')
    // sturdents take examinations
    // teachers invigilated exams

