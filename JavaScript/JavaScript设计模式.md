# JavaScript设计模式

-[设计原则(SOLID)](# 设计原则(SOLID))

-[设计模式](# 设计模式)

# 设计原则(SOLID)

## 单一职责模式(S)

> - 一个程序只做好一件事
> - 如果功能过于复杂就拆分开，每个部分保持独立

## 里式替换原则(L)

> - 子类能覆盖父类
> - 父类能出现的地方子类就能出现
> - JS中使用较少(弱类型&继承使用较少)

## 开放封闭原则(O)

> - 对扩展开放对修改封闭
> - 增加需求时，扩展新代码，而非修改已有代码
> - 软件设计的终极目标

## 接口隔离原则(I)

> - 保持接口的单一独立，避免出现"胖接口"
> - JS中没有接口(typescript例外)，使用较少
> - 类似于单一职责所在，这里更关注接口

## 依赖倒置原则(D)

> - 面向接口编程，依赖于抽象而不依赖于具体
> - 使用方只关注接口而不关注具体类的实现
> - JS中使用较少(没有接口&弱类型)

# 设计模式

## 工厂模式

> - 将new操作单独封装
> - 遇到new时，就要考虑是否该使用工厂模式了

#### 示例

你去购买汉堡，直接点餐、取餐，不会自己亲手做
 商店要“封装”做汉堡的工作，做好直接给买者

#### UML类图：



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1280" height="349"></svg>)



#### 代码示例：

```
class Product {
    constructor(name) {
        this.name = name;
    }
    init() {
        console.log('init')
    }
    fn1() {
        console.log('fn1')
    }
    fn2() {
        console.log('fn2')
    }
}

class Creator {
    create(name) {
        return new Product(name)
    }
}

let create = new Creator();
let p = create.create('p')
p.init()
p.fn1()
p.fn2()

复制代码
```

#### **应用场景**

- **jQuery**:
   `$('div')`和`new $('div')`有何区别？
- 第一：书写麻烦，jQuery的链式操作将成为噩梦
- 第二：一旦jQuery名字变化，将是灾难性的

```
//仿jQuery代码
class jQuery {
    constructor(selector) {
        let slice = Array.prototype.slice;
        let dom = slice.call(document.querySelectorAll(selector))
        let len = dom ? dom.length : 0
        for (let i = 0; i < len; i++) {
            this[i] = dom[i]
        }
        this.length = len
        this.selector = selector || ''
    }
    append() {
        console.log('append');
    }
    addClass() {
        console.log('addClass')
    }

}

window.$ = function(selector) {
    return new jQuery(selector);
}

var $p = $('p')
console.log($p)
console.log($p.addClass)

复制代码
```

- **React.crateElement**:

```
var profile = <div>
    <img src="avater.png" className="profile"/>
    <h3>{[user.firstName,user.lastName].join('')}</h3>
    </div>;
复制代码
```

> 编译完之后：

```
var profile = React.createElement("div",null,
    React.createElement("img",{src:"avater.png",className:"profile"}),
    React.createElement("h3",null,[user.firstName,user.lastName].join(" "))
);
复制代码
//源码实现
class vnode(tag, attrs, children) {
    //...省略内部代码...
}

React.createElement = function(tag,attrs,children){
    return new vnode(tag,attrs,children)
}
复制代码
```

- **Vue的异步组件**:

```
Vue.component('async-example', funciton(resolve, reject) {
    setTimeout(function() => {
        resolve({
            template: '<div>I am async!</div>'
        })
    }, 1000);
})
复制代码
```

#### 设计原则验证：

> - 构造函数和创建者分离
> - 符合开放封闭原则

## 单例模式

> - 系统中被唯一使用
> - 一个类中只有一个实例

 

#### 实例： 

登录框、购物车

#### 传统UML图



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="427" height="452"></svg>)



> **说明**

- 单例模式需要用到java的特性(private)
- ES6中没有(typescript除外)
- 只能用java代码来演示UML图的内容(最后用js变相实现)

#### 代码演示

> **java版的单例模式演示**

```
public class SingleObject{
     //注意：私有化构造函数，外部不能new，只能内部new！！！！
     private SingleObject(){}
     //唯一被new出来的对象
     private SingleObject getInstance(){
         if(instance == null){
             //只new一次
             instance = new SingleObject();
         }
         return instance;
     }
     //对象方法
     public void login(username,password){
         System.out.println("login...")
     }
 }
 
 
 public class SingletonPatternDemo{
     public static void main(String[] args){
        //不合法的构造函数
        //编译时报错：构造函数 SingleObject()是不可见的！！！
        //SingleObject object = new SingleObject();
        //获取唯一可用的对象
        SingleObject object = SingleObject.getInstance();
     }     
}
复制代码
```

> **Javascript版的单例模式演示**

```
class SingleObject {
    login() {
        console.log('login...')
    }
}

//静态方法
SingleObject.getInstance = (function() {
    let instance
    return function() {
        if (!instance) {
            instance = new SingleObject();
        }
        return instance;
    }
})()

var login = SingleObject.getInstance().login();
复制代码
```

> **javascript的单例模式缺点：**

如果强制new也不会报错:

```
var loginnew = new SingleObject();
loginnew.login()
复制代码
```

> 测试

```
//注意这里只能用静态函数getInstance，不能new SingleObject()!!!
let obj1 = SingleObject.getInstance()
obj1.login()
let obj2 = SingleObject.getInstance()
obj2.login()
console.log(obj1 === obj2); //两者必须完全相同

复制代码
```

> 只有通过模块化完整实现

#### 场景

- **jQuery 只有一个'$'**

```
if(window.jQuery != null){
    return window.jQuery
}else{
    //初始化...
}
//引用多少次都只有一个'$'
复制代码
```

- **vuex 和 redux中的store**
- **购物车、登录框**

```
class LoginForm {
    constructor() {
        this.state = 'hide'
    }
    show() {
        if (this.state === 'show') {
            alert('已经显示了');
            return
        }
        this.state = 'show'
        console.log('登录框显示成功')
    }
    hide() {
        if (this.state === 'hide') {
            alert('已经隐藏')
            return
        }
        this.state = 'hide'
        console.log('登录框隐藏成功')
    }
}
LoginForm.getInstance = (function() {
    let instance
    return function() {
        if (!instance) {
            instance = new LoginForm()
        }
        return instance
    }
})()

let login1 = LoginForm.getInstance()
login1.show()

let login2 = LoginForm.getInstance()
//lgoin2.show() //登录框已经显示
login2.hide()

console.log(login1 === login2)
复制代码
```

#### 设计原则验证

> - 符合单一职责原则，只实例化唯一的对象
> - 没法具体开放封闭原则，但是绝对不违反开放封闭原则

## 适配器模式

> - 旧接口格式和使用者不兼容
> - 中间加一个适配转换接口

#### 示例

macbookpro适配器转换 电源插座国家不统一需要转换头

#### UML图



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1023" height="172"></svg>)



#### 演示

```
class Adaptee {
    specificRequest() {
        return '德国标准插头'
    }
}

class Target {
    constructor() {
        this.Adaptee = new Adaptee()
    }
    request() {
        let info = this.Adaptee.specificRequest()
        return `${info} - 转换器 - 中国标准插头`
    }
}


let target = new Target()
let res = target.request()
console.log(res)

复制代码
```

#### 应用场景

- **封装旧接口**

```
//自己封装的ajax，使用方式如下：
ajax({
    url:'/getDate',
    type:'Post',
    dataType:'json',
    data:{
        id:123
    }
})
.done(function(){})
复制代码
//但因为历史原因，代码中全都是:
//$.ajax({...})
复制代码
```

> 解决办法：

```
//做一层适配器
var $ = {
    ajax:function(options){
        return ajax(options)
    }
}
复制代码
```

- `vue computed`

```
<div id="example">
    <p>Original message:"{{message}}"</p>
    <p>Computed reversed message:"{{reversedMessage}}"</p>
</div>

var vm = new Vue({
    el:"#example",
    data:{
        mesage:'Hello'
    },
    computed:{
        //计算属性的getter
        reversedMessage:function(){
            //'this'指向vm实例
            return this.message.split('').reverse().join('')
        }
    }
})
复制代码
```

#### 设计原则验证

> - 将旧接口和使用者进行分离
> - 符合开放封闭原则

## 装饰器模式

> - 为对象添加新功能
> - 不改变其原有的结构和功能

#### 示例：

手机壳

#### UML类图



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1021" height="188"></svg>)



#### 代码演示

```
class Circle {
    draw() {
        console.log('画一个圆形')
    }
}

class Decorator {
    constructor(circle) {
        this.circle = circle
    }
    draw() {
        this.circle.draw()
        this.setRedBorder(circle)
    }
    setRedBorder(circle) {
        console.log('设置红色边框')
    }
}

let circle = new Circle();
circle.draw()

let decorator = new Decorator(circle)
decorator.draw()

复制代码
```

#### 使用场景

- **ES7装饰器**

```
@testDec
class Demo {
    //...
}

function testDec(target) {
    target.isDec = true;
}
alert(Demo.isDec);
复制代码
```

> 装饰器原理

```
@decorator
class A {}

//等同于
class A{}
A = decorator(A)||A;

复制代码
```

> 可以加参数

```
function testDec(isDec){
    return function(target){
        target.isDec = isDec;
    }
}

@testDec(true)

class Demo{
    //....
}
alert(Demo.isDec) //true
复制代码
function mixin(...list) {
    return function(target) {
        Object.assign(target.prototype, ...list)
    }
}

const Foo = {
    foo() { alert('foo') }
}

@mixin(Foo)
class myClass() {}

let obj = new myClass();
obj.foo() //'foo'
复制代码
```

> 装饰方法-例1

```
class Person {
    constructor() {
            this.first = 'A'
            this.last = 'B'
        }
        //装饰方法
    @readonly
    name() {
        return `${this.first} ${this.last}`
    }
}

var p = new Person()
console.log(p.name())   //p.name=function(){} //这里会报错，因为name是只读属性

function readonly(target, name, descriptor) {
    //descriptor 属性描述对象(Object.defineProperty中会用到)，原来的值如下
    //{
    //  value:specifiedFunction,
    //  enumerable:false,
    //  configurable:true,
    //  writable:true   
    //}
    descriptor.writable = false;
    return descriptor;
}
复制代码
```

> 装饰方法-例2

```
class Math{
    //装饰方法
    @log
    add(a,b){
        return a + b;
    }
}

const math = new Math();
const result = math.add(2,4);  //执行add时，会自动打印日志，因为有@log装饰器
console.log('result',result)

function log(target, name, descriptor) {
    var oldvalue = descriptor.value;

    descriptor.value = function() {
        console.log(`calling ${name} with`, arguments);
        return oldvalue.apply(this, arguments)
    }
    return descriptor;
}
复制代码
```

- `core-decorators`

> - 第三方开源lib
> - 提供常用的装饰器

```
//首先安装npm i core-decorators --save

//开始编码
import { readonly } from 'core-decorators'

class Person {
    @readonly
    name() {
        return 'zhang'
    }
}

let p = new Person()
alert(p.name())
    //p.name = function(){/*...*/} 此处会报错
复制代码
import { deprecate } from 'core-decorators'

class Person {
    @deprecate
    name() {
        return 'zhang'
    }
}

let p = new Person()
alert(p.name())
    //this funciton will be removed in future Vue.version
    //也可以自己定义@deprecate("即将废用")
    //也可以自己定义@deprecate("即将废用",{url:"www.imooc.com"})
复制代码
```

#### 设计原则验证

> - 将现有对象和装饰器进行分离，两者独立存在
> - 符合开放封闭原则

## 代理模式

> - 使用者无权访问目标对象
> - 中间加代理，通过代理做授权和控制

#### 示例：

> - 科学上网
> - 明星经纪人

#### UML



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="941" height="188"></svg>)



#### 代码演示

```
class RealImg {
    constructor(fileName) {
        this.fileName = fileName;
        this.loadFromDisk() //初始化即从硬盘中加载，模拟
    }
    display() {
        console.log('display...' + this.fileName)
    }
    loadFromDisk() {
        console.log('loading...' + this.fileName)
    }
}

class ProxyImg {
    constructor(fileName) {
        this.realImg = new RealImg(fileName)
    }
    display() {
        this.realImg.display()
    }
}

let proxyImg = new ProxyImg('1.png')
proxyImg.display()
复制代码
```

#### 场景

- **网页事件代理**

```
 var div1 = document.getElementById('div1')
 div1.addEventListener('click', funtion(e) {
    console.log(e)
    var target = e.target
    if (target.nodeName === "A") {
        alert(target.innerHtml)
    }
})
复制代码
```

- **jQuery $.proxy**

```
$('#div1').click(function() {
    //this符合期望
    $(this).addClass('red')
})
$('#div1').click(function() {
    setTimeout(function() {
        //this不符合期望
        $(this).addClass('red')
    }, 1000);
})

复制代码
//可以用如下方式解决
$('#div1').click(function() {
    var _this = this
    setTimeout(funciton() {
        //_this符合期望
        $(_this).addClass('red')
    }, 1000)
})
复制代码
```

> **或者用$.proxy**

```
//但推荐用$.proxy解决，这样就少定义一个变量
$('#div1').click(function() {
    setTimeout($.proxy(function() {
        //this符合期望
        $(this).addClass('red')
    },this), 1000)
})
复制代码
```

- **ES6 Proxy**

```
//明星
let star = {
    name: "zhangxx",
    age: 25,
    phone: '13910733521',
}

//经纪人
let agent = new Proxy(star, {
    get: function(target, key) {
        if (key === 'phone') {
            //返回经纪人自己的手机号
            return '13838383838'
        }
        if (key === "price") {
            //明星不报价，经纪人报价
            return 120000
        }
        return target[key]
    },
    set: function(target, key, val) {
        if (key === 'customPrice') {
            if (val < 100000) {
                throw new Error("价格太低")
            } else {
                target[key] = val
                return true
            }
        }
    }
})

console.log(agent.name)
console.log(agent.phone)
console.log(agent.age)
console.log(agent.price)

agent.customPrice = 150000;
console.log('agent.customPrice', agent.customPrice)

复制代码
```

#### 设计原则验证

> - 代理类和目标类分离，隔离开目标类和使用者
> - 符合开放封闭原则

### 代理模式VS适配器模式

> - 适配器模式：提供一个不同的接口(如不同版本的插头，无法使用)
> - 代理模式：提供一模一样的接口(无权使用)

### 代理模式VS装饰器模式

> - 装饰器模式：扩展功能，原有功能不变且可直接使用
> - 代理模式：直接针对(显示)原有功能，但是经过限制或者阉割之后的

## 外观模式

> - 为子系统中的一组接口提供了一个高层接口
> - 使用者使用这个高层接口

#### 示例：

> 去医院看病，接待员去挂号、门诊、划价、取药



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1280" height="469"></svg>)



#### UML类图



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="994" height="522"></svg>)



#### 代码演示

```
function bindEvent(elem,type,selector,fn){
    if(fn == null){
        fn = selector
        selector = null
    }
}

//调用
bindEvent(elem,'click','#div1',fn)
bindEvent(elem,'click',fn)
复制代码
```

#### 设计原则验证

> - 不符合单一职责原则和开放封闭原则，因此谨慎使用，不可滥用

## 观察者模式

> - 发布&订阅
> - 一对多(N)

#### 示例

> - 点咖啡，点好之后坐等被叫

#### UML类图



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="722" height="224"></svg>)

前端设计最重要的一种模式



#### 代码演示

```
//保存状态，状态变化之后触发所有观察者
class Subject {
    constructor() {
        this.state = 0
        this.observers = []
    }
    getState() {
        return this.state
    }
    setState(state) {
        this.state = state
        this.notifyAllObervers()
    }
    notifyAllObervers() {
        this.observers.forEach(observer => {
            observer.update()
        })
    }
    attach(observer) {
        this.observers.push(observer)
    }
}

//观察者
class Observer {
    constructor(name, subject) {
        this.name = name
        this.subject = subject
        this.subject.attach(this)
    }
    update() {
        console.log(`${this.name} update,state:${this.subject.getState()}`)
    }
}

let subject = new Subject();
let obs1 = new Observer('o1', subject);
let obs2 = new Observer('o2', subject);
let obs3 = new Observer('o3', subject);

subject.setState(1)
subject.setState(2)

复制代码
```

#### 应用场景

> - 网页事件绑定

所有的事件监听用的都是观察者模式

```
<button id="btn1">btn</button>

<script>
    $('#btn1').click(function () {
        console.log(1)
    })
    $('#btn1').click(function () {
        console.log(2)
    })
    $('#btn1').click(function () {
        console.log(2)
    })
</script>
复制代码
```

> - Promise

```
function loadImg(src) {
    var promise = new Promise(function(resolve, reject) {
        var img = document.createElement('img')
        img.onload = function() {
            resolve(img)
        }
        img.onerror = function() {
            reject('图片加载失败')
        }
        img.src = src
    })
    return promise
}

var src = "https://www.xxx.com/img/dafdafdfdafdsafd.png"
var result = loadImg()
result.then(function(img){
    console.log('width',img.width)
}).then(function(img){
    console.log('width',img.height)
})

复制代码
```

> - jQuery callbacks

```
var callbacks = $.Callbacks() //注意大小写
callbacks.add(function() {
    console.log('fn1', info)
})
callbacks.add(function() {
    console.log('fn2', info)
})
callbacks.add(function() {
    console.log('fn3', info)
})
callbacks.fire('gogoogogo')
callbacks.fire('fire')
复制代码
```

> - nodejs自定义事件

```
cosnt EventEmitter = require('events').EventEmitter
const emitter1 = new EventEmitter()
emitter1.on('some', () => {
    //监听some事件
    console.log('some events is occured 1')
})

emitter1.on('some', () => {
        //监听some事件
        console.log('some events is occured 2')
    })
    //触发some事件
emitter1.emit('some')
复制代码
const EventEmitter = require('events').EventEmitter

//任何构造函数都可以继承 EventEmitter的方法on emit

class Dog extends EventEmitter {
    constructor(name) {
        super()
        this.name = name
    }
}

var simon = new Dog('simon')
simon.on('bark', function() {
    console.log(this.name, 'barked')
})
setInterval(() => {
    simon.emit('bark')
}, 500)

复制代码
//Stream 用到了自定义事件

var fs = require('fs')
var readStream = fs.createReadStream('./data/file1.txt') //读取文件的stream

var length = 0
readStream.on('data', function(chunk) {
    length += chunk.toString().length
})

readStream.on('read', function() {
    console.log(length)
})

复制代码
//readline用到了自定义事件

var readline = require('readline')
var fs = require('fs')

var rl = readline.createInterface({
    input: fs.createReadStream('./data/file1.txt')
});

var lineNum = 0
rl.on('line', function(line) {
    lineNum++
})
rl.on('close', function() {
    console.log('lineNum', lineNum)
})

复制代码
```

> - nodejs中：处理http请求；多进程通讯

```
function serverCallback(req, res) {
    var method = req.method.toLowerCase() //获取请求方法
    if (method === 'get') {
        //省略3行,上文代码示例中处理GET请求的代码
    }
    if (method === 'post') {
        //接受post请求的内容
        var data = ''
        req.on('data', function() {
            //"一点一点"接收内容
            data += chunk.toString()
        })
        req.on('end', function() {
            //接收完毕,将内容输出
            res.writeHead(200, { 'Content-type': 'text/html' })
            res.write(data)
            res.end()
        })
    }
}
复制代码
//parent.js
var cp = require('child_process')
var n = cp.fork('./sub.js')
n.on('message', function(m) {
    console.log('PARENT got message:' + m)
})
n.send({ hello: 'workd' })

//sub.js
process.on('message', function(m) {
    console.log('CHILD got message:' + m)
})

process.send({ foo: 'bar' })

复制代码
```

> - vue和React组件生命周期触发

```
class login extends React.component {
    constructor(prop, context) {
        super(props, context)
        this.shouldComponentUpate = PureRenderMixin.shouldComponentUpate.bind(this);
        this.state = {
            checking: true
        }
    }
    render() {
        return ( 
            <div>
                <header title = "登录" history = { this.props.history } ></header> 
            </div >
        )
    }
    componentDidMount() {
        //判断是否已经登录
        this.doCheck()
    }
}
复制代码
```

> - vue watch

```
var vm = new Vue({
    el: "#demo",
    data: {
        firstName: 'Foo',
        lastName: 'Bar',
        fullName: 'Foo Bar'
    },
    watch: {
        firstName: function(val) {
            this.fullName = val + '' + this.lastName
        },
        lastName: function(val) {
            this.fullName = this.firstName + '' + val
        }
    }
})
复制代码
```

#### 设计原则验证

> - 主题和观察者分离，不是主动触发而是被动监听，两者解耦
> - 符合开放封闭原则

## 迭代器模式

> - 顺序访问一个集合
> - 使用者无需知道集合的内部结构(封装)

#### 示例

> - 没有合适的示例，jQuery演示一下

```
<p>jQuery each</p>
<p>jQuery each</p>
<p>jQuery each</p>
复制代码
var arr = [1,2,3]
var nodeList = document.getElementsByTagName('p')
var $p = $('p')

//要对这三个对象进行遍历，要写三个遍历方法
arr.forEach(function(item){
    console.log(item)
})

//nodeList不是纯数组
var i,length = nodeList.length;
for(i;i<length;i++){
    console.log(nodeList[i])
}

$p.each(function(key,p){
    console.log(key,p)
})

//顺序遍历有序集合
//使用者不必知道集合的内部结构
function each(data) {
    var $data = $(data) //生成迭代器
    $data.each(function(key, value) {
        console.log(key,value)
    })
}

each(arr)
each(nodeList)
each($p)


复制代码
```

#### UML类图



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="670" height="190"></svg>)



#### 代码演示

```
class Iterator {
    constructor(container) {
        this.list = container.list;
        this.index = 0;
    }
    next() {
        if (this.hasNext()) {
            return this.list[this.index++]
        }
    }
    hasNext() {
        if (this.index >= this.list.length) {
            return false;
        }
        return true;
    }
}

class Container {
    constructor(list) {
            this.list = list
        }
        //生成遍历器
    getIterator() {
        return new Iterator(this)
    }
}

let arr = [1, 2, 3, 4, 5, 6]
let container = new Container(arr)
let iterator = container.getIterator()
while (iterator.hasNext()) {
    console.log(iterator.next())
}

复制代码
```

#### 应用场景

> - jQuery each

```
function each(data){
    var $data = $(data)   //生成迭代器
    $data.each(function(key,p){
        console.log(key,p)
    })
}
复制代码
```

> - ES6 Iterator

- ES6语法中，有序集合的数据类型已经有很多
- `Array`、`Map`、`Set`、`String`、`TypedArray`、`argument`、 `NodeList`
- 以上数据类型都有`[Symbol.Iterator]`属性
- 属性值是函数，执行函数返回一个迭代器
- 这个迭代器就有next方法可顺序迭代子元素
- 可运行`Array.prototype[Symbol.iterator]`来测试
- `for...of` 消费 `iterator`

> - ES6 Iterator与Generator

- `iterator`的价值不限于尚书几个类型的遍历，还有`Generator`函数的使用
- 即只要返回的数据符合`Iterator`接口的要求
- 即可使用`Iterator`语法，这就是迭代器模式

#### 设计原则验证

> - 迭代器对象和目标对象分离
> - 迭代器将使用者与目标对象隔离开
> - 符合开放封闭原则

## 状态模式

> - 一个对象有状态变化
> - 每次状态变化都会触发一个逻辑
> - 不能总是用if...else来控制

#### 示例

> 交通信号灯不同颜色的变化

#### UML类图



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="660" height="199"></svg>)



#### 代码演示

```
//状态
class State {
    constructor(state) {
        this.state = state
    }
    getState() {
        return this.state
    }
    handle(context) {
        console.log(`turn to ${this.state} light`)
        context.setState(this)
    }
}
//主体
class Context {
    constructor() {
        this.state = null
    }
    getState() {
        return this.state
    }
    setState(state) {
        this.state = state
    }
}

let context = new Context()

let green = new State('green')
let yellow = new State('yellow')
let red = new State('red')

green.handle(context);
console.log(context.getState())

yellow.handle(context);
console.log(context.getState())

red.handle(context);
console.log(context.getState())

复制代码
```

#### 应用场景

> - 有限状态机

- 有限个状态，以及在这些状态之间的变化，如交通信号灯
- 使用开源lib:javascript-state-machine

```
//状态机模型
import StateMachine from 'javascript-state-machine'

var fsm = new StateMachine({
    init: '收藏', //初始状态，待收藏
    transitions: [{
            name: 'doStore',
            from: '收藏',
            to: '取消收藏'
        },
        {
            name: 'deleteStore',
            from: '取消收藏',
            to: '收藏'
        }
    ],
    method: {
        //执行收藏
        onDoStore: function() {
            alert('收藏成功')
            updateText()
        },
        onDeleteStore: function() {
            alert('取消收藏')
            updateText()
        }
    }

})


var $btn = $('#btn');
    //点击事件
$btn.click(function() {
    if (fsm.is('收藏')) {
        fsm.doStore()
    } else {
        fsm.deleteStore()
    }
})

//更新文案
function updateText() {
    $btn.text(fsm.state)
}

//初始化文案
updateText()

复制代码
```

> - 写一个简单的Promise

- Promise是一个一个有限状态机
- Promise有三种状态:pending、fullfilled、rejected
- pending -> fullfilled 或者 pending -> rejected，不可逆向变化

```
class MyPromise {
    constructor(fn) {
        this.successList = []
        this.failList = []

        fn(() => {
            //resolve函数
            fsm.resolve(this)
        }, () => {
            //reject函数
            fsm.reject(this)
        })
    }
    then(successFn, failFn) {
        this.successList.push(successFn)
        this.failList.push(failFn)
    }
}

//模型
var fsm = new StateMachine({
    init: 'pending',
    transitions: [{
        name: 'resolve',
        from: 'pending',
        to: 'fullfilled'
    }, {
        name: 'reject',
        from: 'pending',
        to: 'rejected'
    }],
    methods: {
        onResolve: function(state, data) {
            //参数state - 当前状态示例;data - fsm,resolve(xxx)执行时传递过来的参数
            data.successList.forEach(fn => fn());
        },
        onReject: function(satte, data) {
            //参数state - 当前状态示例；data-fsm.reject(xxx)执行时传递过来的参数
            data.failList.forEach(fn => fn())
        }
    }
})


function loadImg(src) {
    const promise = new MyPromise(function(resolve, reject) {
        let img = document.createElement('img');
        img.onload = function() {
            resolve(img)
        }
        img.onerror = function() {
            reject(img)
        }
        img.src = src
    })
    return promise
}

let src = "https://www.xxxx.com/dsadfa/dafdafd.png";
let result = loadImg(src);
result.then(function() {
    console.log('ok1')
}, function() {
    console.log('fail1')
})
result.then(function() {
    console.log('ok2')
}, function() {
    console.log('fail2')
})
复制代码
```

#### 设计模式验证

> - 将状态对象和主题对象分离，状态的变化逻辑单独处理
> - 符合开放封闭原则

## 其他设计模式

> - 不常用
> - 对应不到经典场景

> **创建型：**

- 原型模式

> **结构型：**

- 桥接模式
- 组合模式
- 享元模式

> **行为型**

- 策略模式
- 模板方法模式
- 职责链模式
- 命令模式
- 备忘录模式
- 中介者模式
- 访问者模式
- 解释器模式

### 原型模式

> - clone自己，生成新对象(new开销比较大)
> - java默认有clone接口，不用自己实现

#### 使用场景

> Object.create

- Object.create用到了原型模式的思想(虽然不是java中的clone)

```
//基于一个原型创建一个对象
const prototype = {
    getName: function() {
        return this.first + '' + this.last;
    },
    say: function() {
        console.log('hello')
    }
}


//基于原型创建x
var x = Object.create(prototype)
x.first = 'A'
x.last = 'B'
console.log(x.getName())
x.say()

//基于原型创建y
var y = Object.create(prototype)
y.first = 'C'
y.last = 'D'
console.log(y.getName())
y.say()
复制代码
```

#### 对比JS中的原型prototype

> - prototype 可以理解为ES6 class的一种底层原理
> - class是实现面向对象的基础，并不是服务于某个模式

### 桥接模式

> - 用于把抽象化与实现化解耦
> - 使得两者可以独立变化
> - 在一些业务中比较常用

#### 应用场景



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1280" height="678"></svg>)



```
//普通实现
class ColorShape {
    yellowCircle() {
        //...画黄圆
    }
    redCircle() {
        //...画红圆
    }
    yellowTriangle() {
        //...画黄三角形
    }
    redTriangle() {
        //...画红三角形
    }
}
//测试
let cs = new ColorShape()
cs.yellowCircle()
cs.redCircle()
cs.yellowTriangle()
cs.redTriangle()
复制代码
```



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1280" height="588"></svg>)



```
//桥接模式
class Color {
    constructor(color) {
        this.color = color;
    }
}
class Shape {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
    draw() {
        //画图...
    }
}
//测试代码
let red = new Color("red")
let yellow = new Color("yellow")
let circle = new Shape('circle', red)
circle.draw()
let triangle = new Shape('triangle', yellow)
triangle.draw()

复制代码
```

颜色和图形自由组合，复杂性少很多，后面增加图形也很好处理

#### 设计原则验证

> - 抽象和实现分离，解耦
> - 符合开放封闭原则

### 组合模式

> - 生成树形结构，表示“整体-部分”关系
> - 让整体和部分都具有一致的操作方式

#### 示例：



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1280" height="678"></svg>)



#### 应用场景

> - 虚拟DOM中的vnode是这种形式，但数据类型简单
> - 用JS实现一个菜单文件夹管理，不算经典应用，与业务相关

```
<div id="div1" class="container">
    <p>123</p>
    <p>456</p>
</div> 
复制代码
{
    tag: 'div',
    attr: {
        id: 'div1',
        className: 'container'
    },
    children: [{
        tag: 'p',
        attr: {},
        children: ['123']
    }, {
        tag: 'p',
        attr: {},
        children: ['456']
    }]
}
复制代码
```

- 整体和单个节点的操作是一致的
- 整体和单个节点的数据结构也保持一致

> - 设计原则验证

- 将整体和单个节点的操作抽象出来
- 符合开放封闭原则

### 享元模式

> - 共享内存(主要考虑内存，而非效率)
> - 相同的数据，共享使用

JS中不用太多考虑内存开销

#### 演示

```
//无限下拉列表，将事件代理到高层次节点上
//如果都绑定到'<a>'标签，对内存开销大

<div id="div1">
    <a href="#">a1</a>
    <a href="#">a2</a>
    <a href="#">a3</a>
    <a href="#">a4</a>
    <!--无限下拉列表-->
</div>

< script >
    var div1 = document.getElementById('div1')
    div1.addEventListener('click', function(e) {
        var target = e.target
        if (e.nodeName === 'A' {
            alert(target.innerHtml)
        })
    }) 
</script>
复制代码
```

#### 设计原则验证

> - 将相同的部分抽象出来
> - 符合开放封闭原则

### 策略模式

> - 不同策略分开处理
> - 避免出现大量if...else或者switch...case

#### 演示

```
class User {
    constructor(type) {
        this.type = type
    }
    buy() {
        if (this.type === 'oridinary') {
            console.log('普通用户购买')
        } else if (this.type === 'member') {
            console.log('会员用户购买')
        } else if (this.type === 'vip') {
            console.log('vip用户购买')
        }
    }
}

//测试代码
var u1 = new User('oridinary')
u1.buy()
var u2 = new User('member')
u2.buy()
var u3 = new User('vip')
u3.buy()

复制代码
```

改成下面这种形式：

```
class OrdinaryUser {
    buy() {
        console.log('普通用户购买')
    }
}
class MemberUser {
    buy() {
        console.log('会员用户购买')
    }
}
class VipUser {
    buy() {
        console.log('vip用户购买')
    }
}

var u1 = new OrdinaryUser()
u1.buy()

var u2 = new MemberUser()
u2.buy()

var u3 = new VipUser()
u3.buy()
复制代码
```

#### 设计原则验证

> - 不同策略，分开处理，而不是混合在一起
> - 符合开放封闭原则

### 模板方法模式和职责链模式

#### 模板方法模式：

```
class Action {
    handle() {
        handle1();
        handle2();
        handle3();
    }
    handle1() {
        console.log('1')
    }
    handle2() {
        console.log('2')
    }
    handle3() {
        console.log('3')
    }
}
复制代码
```

#### 职责链模式

> - 一步操作可能分为多个职责角色来完成
> - 把这些角色都分开，然后用一个链串起来
> - 将发起者和各个处理者进行隔离

##### 演示：

```
//请假审批，需要组长审批、经理审批、最后总监审批
class Action {
    constructor(name) {
        this.name = name;
        this.nextAction = null
    }
    setNextAction(action) {
        this.nextAction = action
    }
    handle() {
        console.log(`${this.name} 审批`)
        if (this.nextAction != null) {
            this.nextAction.handle()
        }
    }
}

let a1 = new Action('组长')
let a2 = new Action('经理')
let a3 = new Action('总监')
a1.setNextAction(a2)
a2.setNextAction(a3)
a1.handle()
复制代码
```

#### 应用场景

> JS中的链式操作

- 职责链和业务结合较多，JS中能联想到链式操作
- jQuery的链式操作，Promise.then的链式操作

#### 设计原则验证

> - 发起者和各个处理者进行隔离
> - 符合开放封闭原则

### 命令模式

> - 执行命令时，发布者和执行者分开
> - 中间加入命令对象，作为中转站



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1096" height="626"></svg>)



```
class Receiver {
    exec() {
        console.log('执行')
    }
}

class Command {
    constructor(receiver) {
        this.receiver = receiver
    }
    cmd() {
        console.log('触发命令')
        this.receiver.exec()
    }
}

class Invoke {
    constructor(command) {
        this.command = command;
    }
    invoke() {
        console.log('开始')
        this.command.cmd();
    }
}

let soldier = new Receiver()
let trumpeter = new Command(soldier)
let general = new Invoke(trumpeter)
general.invoke()
复制代码
```

#### 应用场景

> - 网页富文本编辑器操作，浏览器封装了一个命令对象
> - document.execCommand("bold")
> - document.execCommand("undo")

#### 设计原则验证

> - 命令对象与执行对象分开，解耦
> - 符合开放封闭原则

### 备忘录模式

> - 随时记录一个对象的状态变化
> - 随时可以恢复之前的某个状态(如撤销功能)

#### 演示

一个编辑器

```
//备忘类
class Memento {
    constructor(content) {
        this.content = content;
    }
    getContent() {
        return this.content;
    }
}

//备忘列表
class CareTaker {
    constructor() {
        this.list = [];
    }
    add(memento) {
        this.list.push(memento)
    }
    get(index) {
        return this.list[index]
    }
}

//编辑器
class Editor {
    constructor() {
        this.content = null
    }
    setContent(content) {
        this.content = content
    }
    getContent(content) {
        return this.content
    }
    saveContentToMemento() {
        return new Memento(this.content)
    }
    getContentFromMenmeto(memento) {
        this.content = memento.getContent()
    }
}
复制代码
//测试代码
let editor = new Editor()
let careTaker = new CareTaker()
editor.setContent('111')
editor.setContent('222')
careTaker.add(editor.saveContentToMemento()) //存储备忘录
editor.setContent('333')
careTaker.add(editor.saveContentToMemento()) //存储备忘录
editor.setContent('444')
复制代码
console.log(editor.getContent())
editor.getContentFromMenmeto(careTaker.get(1)) //撤销
console.log(editor.getContent())
editor.getContentFromMenmeto(careTaker.get(0)) //撤销
console.log(editor.getContent())
复制代码
```

#### 设计原则验证

- 状态对象与使用者分开，解耦
- 符合开放封闭原则

### 中介者模式



![img](https://user-gold-cdn.xitu.io/2018/12/24/167df2abd2a78791?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



#### 演示

```
class Mediator {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
    setA() {
        let number = this.b.number;
        this.a.setNumber(number * 100);
    }
    setB() {
        let number = this.a.number;
        this.b.setNumber(number / 100);
    }
}

class A {
    constructor() {
        this.number = 0;
    }
    setNumber(num, m) {
        this.number = num;
        if (m) {
            m.setB()
        }
    }
}

class B {
    constructor() {
        this.number = 0;
    }
    setNumber(num, m) {
        this.number = num;
        if (m) {
            m.setA();
        }
    }
}


let a = new A();
let b = new B();
let m = new Mediator(a, b);

a.setNumber(100, m);
console.log(a.number, b.number);
b.setNumber(300, m);
console.log(a.number, b.number)
复制代码
```

#### 设计原则验证

> - 将各关联对象通过中介者隔离
> - 符合开放封闭原则

### 访问者模式

> - 将数据操作和数据结构分离
> - 使用场景不多

### 解释器模式

> - 描述语言语法如何定义，如何解释和编译
> - 用于专业场景

## 综合应用

#### 关于面试

> - 能说出课程重点讲解的设计模式即可

#### 日常使用

> - 了解重点设计模式，要强制自己模仿、掌握
> - 非常用的设计模式，视业务场景选择性使用