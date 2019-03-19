# JavaScript入门篇

-[一、变量类型和计算](# 一、变量类型和计算)

-[二、原型和原型链](# 二、原型和原型链)

-[三、作用域和闭包](# 三、作用域和闭包)

-[四、异步和单线程](# 四、异步和单线程)

-[五、常见对象](# 五、常见对象)

-[六、事件](# 六、事件)

-[七、Ajax](# 七、Ajax)

## 一、变量类型和计算

#### JS中使用`typeof`能得到哪些类型

##### 变量类型

- `值类型`：变量本身就是含有赋予给它的数值的，它的变量本身及保存的数据都存储在栈的内存块当中

- ```
  引用类型
  ```

  ：引用类型当然是分配到堆上的对象或者数据变量，根据官方一点的解释就是引用类型的变量只包括对其所表示的数据引用 

  - 对象、数组、函数
  - 无限扩展属性，可能出现内存占用比较大的情况

```
typeof abc      //"undefined"
typeof NaN      //"number"
typeof null     //"object"
typeof console.log //"function"
复制代码
typeof只能区分值类型，对引用类型无能为力，只能区分函数function`
 `NaN`表示特殊的非数字值，`null`是空指针，并没有指向任何一个地址
 `typeof`能区分的五种基本类型：`string`、`boolean`、`number`、`undefined`、`symbol`和函数`function
```

#### 变量计算

##### 可能发生强制类型转换的情况：

- 字符串拼接
- == 运算符

```
100  ==  '100'  //true
0    ==  ""     //true
null ==  undefined  //true
复制代码
```

- if语句

```
    var c = '';
    if(c){
        //....
    }
复制代码
```

- 逻辑运算

```
 console.log(10 && 0);       //0
 console.log('' || 'abc');   //'abc'
 console.log(!window.abc);   //true
复制代码
```

> 判断一个变量会被当做true还是false 双非判断 var a = 100; console.log(!!a);

```
在js逻辑运算中，0、NaN、""、null、false、undefined都会判为false，其他都为true
 var add_level = (add_step == 5 && 1)||(add_step == 10 && 2)||(add_step == 12 && 4)||(add_step==15 && 5 )|| 0;
复制代码
 var add_level = {'5':1,'10':2,'15':5,'12':4}[add_step]||0; //更精简
复制代码
```

##### 何时使用 `===` 何时使用 `==`

```
if(obj.a == null){
    //这里相当于obj.a === null || obj.a === undefined,简写
    //这是jquery源码中推荐的写法，除此之外其他全用 ===
    //主要是用于判断这个属性是否存在
}
复制代码
//判断函数参数是否存在
function (a,b){
    if(a == null){
        ...
    }
}
复制代码
//这种写法不能用
 if(xxx == null){
     //可能会报错，这个参数未定义  not defined
 }
复制代码
```

##### JS变量按照存储方式区分为哪些类型，并描述其特点

##### 如何理解json

- JSON是一个JS内置对象，常用两个API

```
 JSON.stringify({a:10,b:20})
 JSON.parse('{"a":10,"b":20}')
复制代码
```

- 同时也是一种数据格式

## 二、原型和原型链

#### 原型规则

- 所有的引用类型(数组、函数、对象)都具有对象特性，即可自由扩展属性
- 所有的引用类型(数组、对象、函数)有一个`__proto__` 属性，属性值是一个普通的对象
- 所有的函数都有一个`prototype`属性，属性值也是一个普通的对象
- 所有的引用类型(数组、对象、函数),`__proto__`属性指向它的构造函数的`prototype`属性
- 当试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么回去他的`__proto__`(即它的构造函数的`prototype`中寻找)

#### 原型链



![img](https://user-gold-cdn.xitu.io/2018/8/6/1650c21034e2a51a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



#### instanceof

> `instanceof`：用于判断引用类型属于哪个构造函数的方法

`f instanceof Foo`的判断逻辑是：

- f的`__proto__`一层一层往上，能否对应到`Foo.prototype`
- 再试着判断`f instance Object`

#### 如何准确判断一个变量是否是数组类型

`var arr = []` `arr instanceOf Array` //true `typeof arr` //object,typeof是无法判断是否是数组的

通用判断方法：`Object.prototype.toString.call(arr) === "[object Array]"`

#### 写一个原型链继承的例子

```
function Elem (id){ 
    this.elem = document.getElementById(id);
}
Elem.prototype.html = function(val){ 
    var elem = this.elem;
    if(val){ 
        elem.innerHtml = val;
        return this;   //链式操作
    }else{ 
        return elem.innerHtml; 
    }
} 

Elem.prototype.on = function(type,fn){
    var elem = this.elem
    elem.addEventListener(type,fn)
}

var div1 = new Elem('content_wrapper')
//div1.html('<p>ds<p>')
//div1.on('click',function(){
//	alert('clicked')
//	}
//)
div1.html('<p>放大放大放大发范德萨大点的我请萨</p>').on('click',function(){
	alert('clicked');
}).html('<p>javascript</p>')
复制代码
```

#### 描述创建一个对象的过程

- 新生成了一个对象
- 链接到原型
- 绑定 this
- 返回新对象

```
function create() {
    let obj = new Object()
    let Con = [].shift.call(arguments)
    obj.__proto__ = Con.prototype
    let result = Con.apply(obj, arguments)
    return typeof result === 'object' ? result : obj
}
复制代码
```

#### zepto源码中如何使用原型链

## 三、作用域和闭包

> **题目**：
>
> - 说一下对变量提升的理解
> - 说明this几种不同的使用场景
> - 创建10个 `< a>`标签，点击的时候弹出对应的序号
> - 如何理解作用域
> - 实际开发中闭包的应用

### 执行上下文

- 范围：一段`<script>`或者一个`函数`
- 全局：变量定义、函数声明、一段`<script>`
- 函数：变量定义、函数声明、this、arguments

```
console.log(a)    //undefined
var a = 100
fn('zhangsan')    //'zhangsan' 20
function fn(name){
	age = 20
	console.log(name,age)
	var age
}

复制代码
```

- 函数声明会被提出来，函数表达式会和变量一样，以`undefined`占位
- 在函数执行之前,变量定义、函数声明、`this`、`arguments`都要先提取出来

#### `函数声明`和`函数表达式`的区别

```
fn()                    //不会报错
function fn(){
    //声明
}
复制代码
fn()                    //Uncaught TypeError:fn1 is not a function 
var a = function(){
    //表达式
}
复制代码
```

> - 变量提升：   var a ;  undefined,并不知道是一个函数
> - 函数提升：  把函数声明提前

```
fn('zhangsan')

function fn(name){
	//函数
	console.log(this)
	console.log(arguments)

	age = 20
	console.log(name,age)
	var age
	
	bar(100)
	function bar(num){
		console.log(num)
	}
}
复制代码
```

### 说明this几种不同的使用场景

- 作为构造函数执行
- 作为对象属性执行
- 作为普通函数执行(window)
- `call`、`apply`、`bind`

```
var a = {
	name : 'A',
	fn:function(){
		console.log(this.name)
	}
}

a.fn()                  //this  === a
a.fn.call({name:'B'})   //this  === {name:'B'}
var fn1 = a.fn
fn1()                   //this === window
复制代码
```

**this要在执行的时候才能确认值**

### 作用域

> 没有块级作用域

```
if(true){
	var name = 'zhangsan'
}
console.log(name)
复制代码
```

> 函数作用域和全局作用域

```
var a = 100
function fn(){
	var a = 200
	console.log('fn',a)
}

console.log('global',a)

fn()

复制代码
```

### 作用域链

> 如何理解作用域：

- 自由变量
- 作用域链，即自由变量的查找
- 闭包的两个场景

```
var a = 100
function fn(){
    var b = 200
    //当前作用域没有定义的变量，即“自由变量”
    console.log(a)
    console.log(b)
}
fn()
复制代码
```

**自由变量作用域链，一直往父级作用域找，一直找到全局作用域**

```
var a = 100
function F1(){
	var b = 200
	function F2(){
		var c = 300
		console.log(a)   //a是自由变量
		console.log(b)	 //b是自由变量
		console.log(c)
	}
	F2()
}
F1()
复制代码
```

### 闭包

```
作用域是定义时的作用域，而不是执行时的作用域
```

> **闭包的使用场景:**

> 函数作为返回值

```
function F1(){
	var a = 100
	//返回一个函数(函数作为返回值)
	return function(){
		console.log(a)
	}
}

var f1 = F1()
var a = 200
f1()
复制代码
```

> 函数作为参数传递

```
function F1(){
	var a = 100
	return function(){
		console.log(a)   //自由变量，父作用域寻找
	}
}

var f1 = F1()

function F2(fn){
	var a = 200
	fn()
}

F2(f1)

复制代码
```

### 面试题

#### 题目1、说一下对变量提升的理解

在某一作用域中，声明变量的语句会默认解析为在该作用域的最开始就已经声明了

#### 题目2、说明this几种不同的使用场景

https://blog.csdn.net/w_q_1025/article/details/64227429

#### 题目3、创建10个 `< a>`标签，点击的时候弹出对应的序号

> 错误写法

```
var i,a
for(i = 0;i<10;i++){
	a = document.createElement('a')
	a.innerHTMl = i + '<br>'
	a.addEventListener('click',function(e){
		e.preentDefault()
		alert(i)
	})
	document.body.appendChild(a)
}
复制代码
```

> 正确写法

```
var i,a
for(i = 0;i < 10;i++){
	(function(i){
		var a = document.createElement('a')
		a.innerHTML = i + '<br>'
		a.addEventListener('click',function(e){
			e.preventDefault()
			alert(i)		
		})
		document.body.appendChild(a)
	})(i)
}
复制代码
```

#### 题目4、如何理解作用域

- 自由变量
- 作用域链，即自由变量的查找
- 闭包的两个场景

#### 题目5、实际开发中闭包的应用

```
//闭包实际应用中主要用于封装变量，收敛权限

function isFirstLoad(){ 
    var _list = []; 
    return function(id){
        if(_list.indexOf(id) >= 0){
            return false; 
        }else{ 
            _list.push(id);
            return true;
        } 
    }}
    var firstLoad = isFirstLoad();
    firstLoad(10);
复制代码
```

## 四、异步和单线程

> **题目**:
>
> - 同步和异步的区别是什么？分别举一个同步和异步的例子
> - 一个关于`setTimeout`的笔试题
> - 前端使用异步的场景有哪些

> **知识点**：
>
> - 什么是异步(对比同步)
> - 前端使用异步的场景
> - 异步和单线程

### 什么是异步

是否阻塞程序的运行

### 何时需要异步

> 在可能发生等待的情况

- 定时任务：`setTimeout`,`setTimeInterval`
- 网络请求：`ajax`请求，动态`<img>`加载
- 事件绑定

**等待过程中不能像alert一样阻塞程序运行**

**因此所有的“等待的情况”都需要异步**

### 异步和单线程

```
console.log(100)
setTimeout(function(){
	console.log(200)
},1000)
console.log(300)
复制代码
```

- 执行第一行，打印100
- 执行setTimeout后，传入setTimeout的函数会被暂存起来，不会立即执行（单线程特点，不能同时干两件事）
- 执行最后一行，打印300
- 待所有程序执行完，处于空闲状态时，会立马看有没有暂存起来的要执行
- 发现暂存起来的setTimeout中的函数无需等待时间，就立即来过来执行

### 面试题

#### 笔试题1： 同步和异步的区别是什么？分别举一个同步和异步的例子

同步会阻塞代码执行，而异步不会

#### 笔试题2：一个关于setTimeout的笔试题

```
console.log(1)

setTimeout(function(){
	console.log(2)
},0)

console.log(3)

setTimeout(function(){
	console.log(4)
},1000)

console.log(5)
复制代码
```



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="274" height="228"></svg>)



#### 笔试题3：前端使用异步的场景有哪些

需要等待，因为js是单线程语言

## 五、常见对象

> **题目**
>
> - 获取`2017-06-10`格式的日期
> - 获取随机数，要求是长度一直的字符串格式
> - 写一个能遍历对象和数组的通用forEach函数

### Date

```
Date.now() //获取当前时间毫秒数
  
var dt = new Date()
dt.getTime()  		//获取毫秒数
dt.getFullYear()  	//年
dt.getMonth()		//月(0-11)
dt.getDate()		//日(0-31)
dt.getHours()		//小时(0-23)
dt.getMinutes()		//分钟(0-59)
dt.getSeconds()		//秒(0-59)
复制代码
```

### Math

`Math.random()`：可以用来清除缓存

### Array

- `forEach` 遍历所有数据
- `every`   判断所有元素是否都符合条件
- `some`    判断是否有至少一个元素符合条件
- `sort`    排序
- `map`     对元素重新组装，生成新数组>- 过滤符合条件的元素

> array.forEach

```
arr.forEach( function(item,index){ 
    console.log(index,item); 
});
复制代码
```

> array.every

```
var arr = [1,2,3,4,5];
var result = arr.every(function(index,item){
//用来判断所有的数组元素，都满足一个条件 
    if(item<6) 
        return true
});
    console.log(result);
复制代码
```

> array.some

```
var result = arr.some(function(index,item){ 
    if(item<5) 
        return true;
}); 
console.log(result);

复制代码
```

> arry.sort

```
var arr2 = arr.sort(function(a,b){ 
    //从小到大排序 return a-b; 
    //从大到小排序 
    //return b-a;
})
复制代码
```

> array.map

```
arr.map(function(item,index){
	return '<br>'+index+':'+item+'<br>'
})
复制代码
```

> array.filter

```
var arr2 = arr.filter(function (item,index){ 
    //通过某一个条件过滤数组 
    if(item >= 2) 
        return true
})
复制代码
```

### 对象API

```
var obj = {
	x:100,
	y:200,
	z:300
}

var key

for(key in obj){
	if(obj.hasOwnProperty(key)){
		console.log(key,obj[key])
	}
}
复制代码
```

### 面试题

#### 解答1:获取2016-06-10格式的日期

```
function formatDate(dt){
	if(!dt){
		dt = new Date()
	}

	var year  = dt.getFullYear()
	var month = dt.getMonth() + 1
	var date  = dt.getDate()

	if(month < 10){
		//强制类型转换
		month = '0' + month 
	}

	if(date < 10){
		//强制类型转换
		date = '0' + date
	}
	//强制类型转换
	return year + '-' + month + '-' + date
}

var dt = new Date()
var formatDate = formatDate(dt)
console.log(formatDate)
复制代码
```

#### 解答2:获取随机数，要求是长度一致的字符串格式

```
var random = Math.random() + '0000000000';
var random = random.slice(0,10);
复制代码
```

#### 解答3:写一个能遍历对象和数组的通用forEach函数

```
function forEach(obj,fn){
	var key
	if(obj instanceof Array){
    	//准备判断是不是数组
    	obj.forEach(function(item,index){
    		fn(index,item)
    	})
	}else{
    	//不是数组就是对象
    	for(key in obj){
    		fn(key,obj[k])
    	}
	}
}

复制代码
```

## 五、JS-Web-API：

> **知识点：**
>
> - js基础知识：ECMA262标准
> - JS-Web-API：W3C标准

> **W3C标准中关于JS的规定有：**
>
> - DOM操作
> - BOM操作
> - 事件绑定
> - ajax请求(包括http协议)
> - 存储

### DOM操作

> DOM的本质 `Document`、`Object`、`Model` 浏览器把拿到的html代码，结构化一个浏览器能够识别并且js可操作的一个模型而已

> DOM的节点操作

> - 获取DOM节点

> - Attribute 和 properity

- `attribute`：是HTML标签上的某个属性，如id、class、value等以及自定义属性，它的值只能是字符串，关于这个属性一共有三个相关的方法，setAttribute、getAttribute、removeAttribute； 注意：在使用setAttribute的时候，该函数一定接收两个参数，setAttribute（attributeName,value）,无论value的值是什么类型都会编译为字符串类型。在html标签中添加属性，本质上是跟在标签里面写属性时一样的，所以属性值最终都会编译为字符串类型。
- `property`：是js获取的DOM对象上的属性值，比如a，你可以将它看作为一个基本的js对象。这个节点包括很多property，比如value，className以及一些方法onclik等方法。 一个js对象有很多property，该集合名字为properties，properties里面有其他property以及attributies，attributies里面有很多attribute。 而常用的attribute，id、class、name等一般都会作为property附加到js对象上，可以和property一样取值、赋值

> DOM结构操作

#### 面试题1：DOM是那种基本的数据结构？

树

#### 面试题2：DOM操作的常用API有哪些？

- 获取DOM节点，以及节点的`property`和`Attribute`
- 获取父节点，获取子节点
- 新增节点，删除节点

#### 面试题3：DOM节点的attr和property有何区别

property只是一个JS对象的属性的修改
 Attribute是对html标签属性的修改

### BOM操作

> **问题：**
>
> - 如何检测浏览器的类型
> - 拆解URL各部分

> **知识点**
>
> - navigator
> - screen
> - location
> - history

#### navigator & screen

```
//navigator
var ua = navigator.userAgent
var isChrome = ua.indexOf('chrome')
console.log(isChrome)

//screen
console.log(screen.width)
console.log(screen.height)

//location
console.log(location.href)
console.log(location.protocol)
console.log(location.pathname)
console.log(location.search)    //?之后的参数
console.log(location.hash)      //#号之后

//history
history.back()          
history.forward()
复制代码
```

## 六、事件

> **题目：**
>
> - 编写一个通用的事件监听函数
> - 描述时间冒泡流程
> - 对于一个无限下拉加载图片的页面，如何给每个图片绑定事件

> **知识点:**
>
> - 通用事件绑定
> - 事件冒泡
> - 代理

### 知识点

#### 通用事件绑定

```
var btn = document.getElementById('btn1')
btn.addEventListener('click', function(event) {
    console.log('clicked')
})

function bindEvent(elem, type, fn) {
    elem.addEventListener(type, fn)
}

var a = document.getElementById('link1')
bindEvent(a, 'click', function(e) {
    e.preventDefault(); //阻止默认行为
    alert('clicked')
})
复制代码
```

> **关于IE低版本的兼容性**

- IE低版本使用`attachEvent`绑定事件，和W3C标准不一样
- IE低版本使用量已非常少，很多网站早已不支持
- 建议对IE低版本的兼容性：了解即可，无须深究
- 如果遇到对IE低版本要求苛刻的面试，果断放弃

#### 事件冒泡

`e.stopPropatation()` //取消冒泡

#### 代理

```
<div id="div1">
    <a href = "#">a1</a>
    <a href = "#">a2</a>
    <a href = "#">a3</a>
    <a href = "#">a4</a>
    <!--会随时新增更多 a 标签-->
</div>


var div1 = document.getElementById('div1')
div1.addEventListener('click',function(e){
    var target = e.target
    if(target.nodeName === 'A'){
        alert(target.innerHTMl)
    }
})
复制代码
```

**完整写法**

```
function bindEvent(elem, type, selector, fn) {
    if (fn == null) {
        fn = selector
        selector = null
    }

    elem.addEventListener(type, function(e) {
        var target
        if (selector) {
            target = e.target
            if (target.matches(selector)) {
                fn.call(target, e)
            }
        } else {
            fn(e)
        }
    })
}

//使用代理
var div1 = document.getElementById('div1')
bindEvent(div1, 'click', 'a', function(e) {
    console.log(this.innerHTML)
})

//不使用代理
var a = document.getElementById('a1')
bindEvent(div1, 'click', function(e) {
    console.log(a.innerHTML)
})
复制代码
```

### 面试题

#### 面试题1：编写一个通用的事件监听函数

#### 面试题2：描述事件冒泡流程

- DOM树形结构
- 事件冒泡
- 组织冒泡
- 冒泡的应用

#### 面试题3：对于一个无限下拉加载图片的页面，如何给每个图片绑定事件

- 使用代理
- 知道代理的两个优点

## 七、Ajax

> **题目：**
>
> - 手动写一个`ajax`，不依赖第三方库
> - 跨域的几种实现（原理）

> **知识点:**
>
> - xmlHttpRequest
> - 状态码说明
> - 跨域

### XMLHttpRequest

```
var xhr = new XMLHttpRequest()

xhr.open("GET","/api",false)

xhr.onreadystatechange = function(){
    //这里的函数异步执行，可参考之前JS基础中的异步模块
    if(xhr.readyState == 4){
        if(xhr.status == 200){
            alert(xhr.responseText)
        }
    }
}

xhr.send(null)
复制代码
```

> **IE兼容性问题**

- IE低版本使用ActiveXObject，和W3C标准不一样
- IE低版本使用量已经非常少，很多网站早已不支持
- 建议对IE低版本的兼容性：了解即可，无需深究
- 如果遇到对IE低版本要求苛刻的面试，果断放弃

.

> **状态码说明**

- 0 - (未初始化)      还没调用`send()`方法
- 1 - (载入)            已调`send()` 方法，正在发送请求
- 2 - (载入完成)     `send()`方法执行完成，已经接收到全部相应内容
- 3 - (交互)            正在解析响应内容
- 4 - (完成)            响应内容解析完成，可以在客户端调用了

.

> **status说明**
>
> - 2XX  - 表示成功处理请求。如200
> - 3XX  - 需要重定向，浏览器直接跳转
> - 4XX  - 客户端请求错误，如404
> - 5XX  - 服务器端错误

### 跨域

> **什么是跨域**

- 浏览器有同源策略，不允许`ajax`访问其他域的接口
- 跨域条件：协议、域名、端口，有一个不同就算跨域

 

> **可以跨域的三个标签**

- `<img src=''>`
- `<script src=''>`
- `<link href=''>`

 

> **三个标签的场景**

- `<img>`用于打点统计，统计网站可能是其他域(而且没有任何兼容性问题)
- `<link>` `<script>`可以使用CDN，CDN也是其他域
- `<script>`可以用于JSONP

 

> **跨越注意的问题**

- 所有的跨域请求都必须经过信息提供方允许
- 如果未经允许即可获取，那是浏览器同源策略出现漏洞

 

> **JSONP实现原理**

- 加载 http://coding.xxx.com/classindex.html
- 不一定服务器端真正有一个classindex.html文件
- 服务器可以根据请求，动态生成一个文件，返回
- 通理于`<script src="http://coding.xxxxx.com/api.js">`

```
//例如你的网站要跨域访问xx网的一个接口
//给你一个地址 http://coding.xxxx.com/api.js
//返回内容格式 callback({x:100,y:200})

<script>
window.callback = function(data){
    //这是我们跨域得到信息
    console.log(data)
}
</script>
<script src="http://coding.m.xxxxx.com/api.js"></script>
复制代码
```

> **服务器端设置http header**

### **cookie、sessionStorage、localStorage的区别**

> - 容量
> - 是否会携带到ajax中
> - API易用性

```
ios safari隐藏模式下，localStorage.getItem会报错，建议统一用try-catch封装
```