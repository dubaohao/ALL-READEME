# JavaScript高级篇

-[原型](# 原型)

-[异步](# 异步)

-[虚拟DOM](# 虚拟DOM)

-[MVVM`和`Vue`](#MVVM`和`Vue` )

-[组件化和React](#组件化和React )

-[`Hybrid`](#`Hybrid` )

## 原型

> - 原型的实际应用
> - 原型如何实现它的扩展性

### 原型的实际应用

> jquery和zepto的简单使用

```
<p>jquery test1</p>
<p>jquery test2</p>
<p>jquery test3</p>

<div id="div1">
    <p>jquery test in div</p>
</div>
复制代码
 var $p = $("p")
$p.css('font-size','40px')   //css是原型方法
console.log($p.html())       //html是原型方法

var $div1 = $("#div1")
$div1.css('color','blue')     //css是原型方法
console.log($div1.html())     //html是原型方法
复制代码
```

#### zepto如何使用原型

```
//空对象
var zepto = {}

zepto.init = function(){
    //源码中，这里的处理情况比较复杂。但因为是本次只是针对原型，因此这里就弱化了
    var slice = Array.prototype.slice
    var dom = slice.call(document.querySelectorAll(selector))
    return zepto.Z(dom,selector)
}

//即使用zepto时候的$
var $ = function(selector){
    return zepto.init(selector)
}
复制代码
//这就是构造函数
function Z(dom, selector) {
    var i, len = dom ? dom.length : 0
    for (i = 0; i < len; i++) {
        this[i] = dom[i]
    }
    this.length = len
    this.selector = selector || ''
}  

zepto.Z = function(dom, selector) {
    return new Z(dom, selector)
}
复制代码
$.fn = {
    constructor:zepto.Z,
    css:function(key,value){},
    html:function(value){}
}

zepto.Z.prototype = Z.prototype = $.fn 
复制代码
```

> 简单的zepto实现

myZepto.js实现

```
(function(window) {
    var zepto = {};

    function Z(dom, selector) {
        var i, len = dom ? dom.length : 0;
        for (i = 0; i < len; i++) {
            this[i] = dom[i];
        }
        this.length = len;
        this.selector = selector || '';
    }

    zepto.Z = function(dom, selector) {
        return new Z(dom, selector);
    }

    zepto.init = function(selector) {
        var slice = Array.prototype.slice;
        var dom = slice.call(document.querySelectorAll(selector));
        return zepto.Z(dom, selector);
    }

    var $ = function(selector) {
        return zepto.init(selector);
    }

    window.$ = $;

    $.fn = {
        css: function(key, value) {
            console.log(key, value);
        },
        html: function() {
            return "html";
        }
    }

    Z.prototype = $.fn

})(window)
复制代码
```

#### jquery如何使用原型

```
var jQuery = function(selector){
    //注意new关键字，第一步就找到了构造函数
    return new jQuery.fn.init(selector);
}

//定义构造函数
var init =  jQuery.fn.init = function(selector){
    var slice = Array.prototype.slice;
    var dom = slice.call(document.querySelectorAll(selector));

    var i,len=dom?dom.length:0;
    for(i = 0;i<len;i++) this[i] = dom[i];
    this.length = len;
    this.selector = selector || '';
}


//初始化jQuery.fn
jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
    css: function(key, value) {},
    html: function(value) {}
}

//定义原型
init.prototype = jQuery.fn
复制代码
```

### 原型的扩展性

> 如何体现原型的扩展性

- 总结`zepto`和`jquery`原型的使用
- 插件机制

> 为什么要把原型放在`$.fn`上

```
init.prototype = jQuery.fn;
zepto.Z.prototype = Z.prototype = $.fn
```

**因为要扩展插件**

```
//做一个简单的插件
$.fn.getNodeName = function(){
    return this[0].nodeName
}
复制代码
```

> 好处

- 只有`$`会暴露在`window`全局变量上
- 将插件扩展统一到`$.fn.xxx`这一接口，方便使用

## 异步

### 什么是单线程，和异步有什么关系

- 单线程：只有一个线程，同一时间只能做一件事，两段JS不能同时执行
- 原因：避免DOM渲染的冲突
- 解决方案：异步

> 为什么js只有一个线程：避免DOM渲染冲突

- 浏览器需要渲染DOM
- JS可以修改DOM结构
- JS执行的时候，浏览器DOM渲染会暂停
- 两端JS也不能同时执行(都修改DOM就冲突了)
- webworker支持多线程，但是不能访问DOM

 

### 什么是event-loop

> - 事件轮询，JS实现异步的具体解决方案
> - 同步代码，直接执行(主线程)
> - 异步函数先放在异步队列中（任务队列）
> - 待同步函数执行完毕，轮询执行异步队列的函数

```
setTimeout(function(){
	console.log(1);
},100);              //100ms之后才放入异步队列中，目前异步队列是空的
setTimeout(function(){
	console.log(2);  //直接放入异步队列
})
console.log(3)       //直接执行

//执行3之后，异步队列中只有2，把2拿到主线程执行
//2执行完之后，异步队列中并没有任务，所以一直轮询异步队列
//直到100ms之后1放入异步队列，将1拿到主线程中执行
复制代码
$.ajax({
	url:'./data.json',
	success:function(){        //网络请求成功就把success放入异步队列
		console.log('a');
	}
})

setTimeout(function(){
	console.log('b')
},100)

setTimeout(function(){
	console.log('c');
})
console.log('d')

//打印结果：
//d    //d   
//c    //c  
//a    //b   
//b    //a   

//真实环境不会出现dacb
复制代码
```

> 解决方案存在的问题

- 问题一：没按照书写方式执行，可读性差
- 问题二：callback中不容易模块化

### 是否用过jQuery的Deferred

> - jQuery1.5的变化
> - 使用jQuery Deferred
> - 初步引入Promise概念

 

> jQuery1.5之前

```
var ajax = $.ajax({
	url:'./data.json',
	success:function(){
		console.log('success1');
		console.log('success2');
		console.log('success3');
	},
	error:function(){
		console.log('error');
	}
})
console.log(ajax); //返回一个XHR对象
复制代码
```

 

> jQuery1.5之后

第一种写法：

```
var ajax = $.ajax('./data.json');
ajax.done(function(){
	console.log('success1')
})
.fai(function(){
	console.log('fail')
})
.done(function(){
	console.log('success2');
})
console.log(ajax); //deferred对象
复制代码
```

第二种写法：

```
var ajax = $.ajax('./data.json');
ajax.then(function(){
	console.log('success1')
},function(){
	console.log('error1');
})
.then(function(){
	console.log('success2');
},function(){
	console.log('error');
})

复制代码
```

> - 无法改变JS异步和单线程的本质
> - 只能从写法上杜绝callback这种形式
> - 它是一种语法糖，但是解耦了代码
> - 很好的提现：开放封闭原则(对扩展开放对修改封闭)

> 使用jQuery Deferred

给出一段非常简单的代码，使用setTimeout函数

```
var wait = function(){
	var task = function(){
		console.log('执行完成');
	}
	setTimeout(task,2000)
}

wait();
复制代码
```

新增需求：要在执行完成之后进行某些特别复杂的操作，代码可能会很多，而且分好几步

```
function waitHandle(){
	var dtd = $.Deferred();         //创建一个deferred对象
	
	var wait = function(dtd){       // 要求传入一个deferred对象
		var task = function(){
			console.log("执行完成");
			dtd.resolve();          //表示异步任务已完成
			//dtd.reject()          // 表示异步任务失败或者出错
		};
		setTimeout(task,2000);
		return dtd;
	}
	//注意，这里已经要有返回值
	return wait(dtd);
}


//使用
var w = waithandle()
w.then(function(){
	console.log('ok1');
},function(){
	console.log('err2');
})
.then(function(){
	console.log('ok2');
},function(){
	console.log('err2');
})
//还有w.wait w.fail
复制代码
```

> 总结：`dtd`的`API`可分成两类，用意不同

- 第一类：`dtd.resolve` 、 `dtd.reject`
- 第二类：`dtd.then`、`dtd.done`、`dtd.fail`
- 这两类应该分开，否则后果严重！ 可以在上面代码中最后执行`dtd.reject()`试一下后果

> 使用`dtd.promise()`

```
function waitHandle(){
	var dtd = $.Deferred();
	var wait = function(){
		var task = function(){
			console.log('执行完成');
			dtd.resolve();
		}
		setTimeout(task,2000)
		return dtd.promise();  //注意这里返回的是promise，而不是直接返回deferred对象
	}
	return wait(dtd)
}


var w = waitHandle();   //promise对象
$.when(w).then(function(){
	console.log('ok1');
},function(){
	console.log('err1');
})

//w.reject()  //w.reject is not a function
复制代码
```

监听式调用：只能被动监听，不能干预promise的成功和失败

> - 可以jQuery1.5对ajax的改变举例
> - 说明如何简单的封装、使用deferred
> - 说明promise和Defrred的区别

要想深入了解它，就需要知道它的前世今生

### Promise的基本使用和原理

#### 基本语法

```
fucntion loadImg() {
    var promise = new Promise(function(resolve,reject) {
        var img = document.getElementById("img")
        img.onload = function(){
            resolve(img)
        }
        img.onerror  = function(){
            reject()
        }
    })
    return promise
}

var src = ""
var result = loadImg(src)
result.then(function() {
    console.log(1, img.width)
    return img
}, fucntion() {
    console.log('error 1')
}).then(function(img) {
    console.log(1, img.width)
})
复制代码
```

#### 异常捕获

> 规定

- `then`只接受一个函数(只接受一个成功的回调函数)，最后统一用`catch`捕获异常

> 两种异常情况：

- 程序逻辑异常
- 业务之内，`reject()`等情况

> 处理方案 在`reject("图片路径错误")`中把信息传出去，可以通过'.catch()'捕获

```
var src = ""
var result = loadImg(src)
result.then(function() {
    console.log(1, img.width)
    return img
}).then(function(img) {
    console.log(1, img.width)
}).catch(function(ex) {
    //最后统一捕获异常
    console.log(ex)
})



复制代码
```

> 多个串联

```
var scr1 = 'https://www.imooc.com/static/img/index/logo_new.png';
var result1 = loadImg(src1);
var src2 = 'https://www.imooc.com/static/img/index/logo_new1.png';
var result2 = loadImg(src2);


result1.then(function(img1) {
    console.log('第一个图片加载完成', img1.width);
    return result2;   //重要
}).then(function(img2) {
    console.log('第二个图片加载完成', img2.width);
}).catch(function(ex) {
    console.log(ex);
})
复制代码
```

> ```
> Promise.all`和`Promise.race
> ```

- `Promise.all`接收一个`promise`对象的数组
- 待全部完成后，统一执行`success`

```
Promise.all([result1, result2]).then(datas => {
        //接收到的datas是一个数组，依次包含了多个promise返回的内容
        console.log(datas[0]);
        console.log(datas[1]);
})
复制代码
```

> - `Promise.race`接收一个包含多个`promise`对象的数组

- 只要有一个完成，就执行`success`

```
Promise.race([result1, result2]).then(data => {
    //data即最先执行完成的promise的返回值
    console.log(data);
})
复制代码
```

> Promise标准

> - 状态

- 三种状态：

  ```
  pending
  ```

  ,

  ```
  fulfilled
  ```

  ,

  ```
  rejected
  ```

  - 初始状态：`pending`
  - `pending`变为`fulfilled`,或者`pending`变为`rejected`
  - 状态变化不可逆

- then 

  - `promise`必须实现`then`这个方法
  - `then()`必须接收两个函数作为标准
  - `then`返回的必须是一个`promise`实例

没有`return`就是默认返回的`result`

### Promise总结

- 基本语法
- 如何异常捕获(`Error`和`reject`)
- 多个串联-链式执行的好处
- `Promise.all`和`Promise.race`
- `Promise`标准 - 状态变化、`then`函数

### 介绍一下async/await(和Promise的区别、联系)

`es7`提案中，用的比较多，`babel`也已支持

```
koa`框架 `async/await`替换`generator
```

解决的是异步执行和编写逻辑

> `then`只是将`callback`拆分了

```
var w = watiHandle()
w.then(function(){...},function(){...})
.then(function(){...},function(){...})

复制代码
```

> `async/await`是最直接的同步写法

```
const load = async function(){
    const result1 = await loadImg(src1)
    console.log(result1)
    const result2 = await loadImg(src2)
    console.log(result2)
}
load()
复制代码
```

> 用法
>
> - 使用`await`，函数后面必须用`async`标识
> - `await`后面跟的是一个`Promise`实例
> - 需要`balbel-polyfill`(兼容)

> 特点

- 使用了`Promise`，并没有和`Promise`冲突
- 完全是同步的写法，再也没有回调函数
- 但是：改变不了`JS`单线程、异步的本质

### 总结一下当前JS异步的方案

> - jQuery Defered
> - promise
> - async/await
> - generator(能解决异步并不是为了解决异步)

## 虚拟DOM

### vdom 是什么？为何会存在 vdom？

> **什么是vdom**

- virtual dom,虚拟DOM
- 用JS模拟DOM结构
- DOM变化的对比，放在JS层来做(图灵完备语言:能实现各种逻辑的语言)
- 提高重绘性能

> **DOM**

```
<ul id="list">
    <li class="item">Item 1</li>
    <li class="item">Item 2</li>
</ul>
复制代码
```

> **虚拟DOM**

```
{
    tag: 'ul',
    attrs: {
        id: 'list'
    },
    children: [{
            tag: 'li',
            attrs: { className: 'item' },
            children: ['item1']
        },
        {
            tag: 'li',
            attrs: { className: 'item' },
            children: ['item2']
        }
    ]
}

//className代替class,因为class是js的保留字
复制代码
```

浏览器最耗费性能就是DOM操作，DOM操作非常昂贵
现在浏览器执行JS速度非常快
这就是vdom存在的原因

> **一个需求场景**

```
//将该数据展示成一个表格
//随便修改一个信息，表格也随着修改
[
    {
        name: 'zhangsan',
        age: 20,
        address: 'beijing'
    },
    {
        name: 'lisi',
        age: 21,
        address: 'shanghai'
    },
    {
        name: 'wangwu',
        age: 22,
        address: 'guangzhou'
    }
]
复制代码
```

> **用jQery实现**

```
//渲染函数
funciton render(data) {
    //此处省略n行
}

//修改信息
$('#btn-change').click(function(){
    data[1].age = 30;
    data[2].address = 'shenzhen';
    render(data);
})


//初始化时渲染
render(data)
复制代码
//render函数具体写法
function render(data) {
    $container = $("#container");
    //清空现有内容
    $container.html('');
    //拼接table
    var $table = $('<table>')
    $table.append($('<tr><td>name</td><td>age</td><td>address</td></tr>'))
    data.forEach(item => {
        $table.append($('<tr><td>' + item.name + '</td><td>' + item.age + '</td><td>' + item.address + '</td></tr>'))
        $container.append($table)
    });

}

//只执行了一次渲染，相对来说还是比较高效的
//DOM渲染是最昂贵的，只能尽量避免渲染
复制代码
```

> **遇到的问题**

- DOM操作是“昂贵”的，JS运行效率高
- 尽量减少DOM操作，而不是"推倒重来"(清空重置)
- 项目越复杂，影响就越严重
- vdom可解决这个问题

```
var div = document.createElement('div');
var item,result = '';
for(item in div){
	result += '|' + item;
}
console.log(result);

//浏览器默认创建出来的DOM节点，属性是非常多的

//result
|align|title|lang|translate|dir|dataset|hidden|tabIndex|accessKey|draggable|spellcheck|autocapitalize|contentEditable|isContentEditable|inputMode|offsetParent|offsetTop|offsetLeft|offsetWidth|offsetHeight|style|innerText|outerText|onabort|onblur|oncancel|oncanplay|oncanplaythrough|onchange|onclick|onclose|oncontextmenu|oncuechange|ondblclick|ondrag|ondragend|ondragenter|ondragleave|ondragover|ondragstart|ondrop|ondurationchange|onemptied|onended|onerror|onfocus|oninput|oninvalid|onkeydown|onkeypress|onkeyup|onload|onloadeddata|onloadedmetadata|onloadstart|onmousedown|onmouseenter|onmouseleave|onmousemove|onmouseout|onmouseover|onmouseup|onmousewheel|onpause|onplay|onplaying|onprogress|onratechange|onreset|onresize|onscroll|onseeked|onseeking|onselect|onstalled|onsubmit|onsuspend|ontimeupdate|ontoggle|onvolumechange|onwaiting|onwheel|onauxclick|ongotpointercapture|onlostpointercapture|onpointerdown|onpointermove|onpointerup|onpointercancel|onpointerover|onpointerout|onpointerenter|onpointerleave|nonce|click|focus|blur|namespaceURI|prefix|localName|tagName|id|className|classList|slot|attributes|shadowRoot|assignedSlot|innerHTML|outerHTML|scrollTop|scrollLeft|scrollWidth|scrollHeight|clientTop|clientLeft|clientWidth|clientHeight|attributeStyleMap|onbeforecopy|onbeforecut|onbeforepaste|oncopy|oncut|onpaste|onsearch|onselectstart|previousElementSibling|nextElementSibling|children|firstElementChild|lastElementChild|childElementCount|onwebkitfullscreenchange|onwebkitfullscreenerror|setPointerCapture|releasePointerCapture|hasPointerCapture|hasAttributes|getAttributeNames|getAttribute|getAttributeNS|setAttribute|setAttributeNS|removeAttribute|removeAttributeNS|hasAttribute|hasAttributeNS|toggleAttribute|getAttributeNode|getAttributeNodeNS|setAttributeNode|setAttributeNodeNS|removeAttributeNode|closest|matches|webkitMatchesSelector|attachShadow|getElementsByTagName|getElementsByTagNameNS|getElementsByClassName|insertAdjacentElement|insertAdjacentText|insertAdjacentHTML|requestPointerLock|getClientRects|getBoundingClientRect|scrollIntoView|scrollIntoViewIfNeeded|animate|computedStyleMap|before|after|replaceWith|remove|prepend|append|querySelector|querySelectorAll|webkitRequestFullScreen|webkitRequestFullscreen|scroll|scrollTo|scrollBy|createShadowRoot|getDestinationInsertionPoints|ELEMENT_NODE|ATTRIBUTE_NODE|TEXT_NODE|CDATA_SECTION_NODE|ENTITY_REFERENCE_NODE|ENTITY_NODE|PROCESSING_INSTRUCTION_NODE|COMMENT_NODE|DOCUMENT_NODE|DOCUMENT_TYPE_NODE|DOCUMENT_FRAGMENT_NODE|NOTATION_NODE|DOCUMENT_POSITION_DISCONNECTED|DOCUMENT_POSITION_PRECEDING|DOCUMENT_POSITION_FOLLOWING|DOCUMENT_POSITION_CONTAINS|DOCUMENT_POSITION_CONTAINED_BY|DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC|nodeType|nodeName|baseURI|isConnected|ownerDocument|parentNode|parentElement|childNodes|firstChild|lastChild|previousSibling|nextSibling|nodeValue|textContent|hasChildNodes|getRootNode|normalize|cloneNode|isEqualNode|isSameNode|compareDocumentPosition|contains|lookupPrefix|lookupNamespaceURI|isDefaultNamespace|insertBefore|appendChild|replaceChild|removeChild|addEventListener|removeEventListener|dispatchEvent
复制代码
```

### `vdom`如何应用，核心`API`是什么

> 介绍`snabbdom`

一个实现`vdom`的库,vue升级2.0借鉴了`snabbdom`的算法

```
var container = document.getElementById('container')

var vnode = h('div#container.two.classes', { on: { click: someFn } }, [
    h('span', { style: { fontWeight: 'bold' }, 'This is bold' }),
    'and this is just normal text',
    h('a', { props: { href: '/foo' } }, 'I\'ll take you places')
])

//patch into empty DOM element - this modifies the DOM as a side effect
patch(container, vnode)

var newVnode = h('div#container.two.classes', { on: { click: anotherEventHandle } }, [
        h('span', { style: { fontWeight: 'normal', fontStyle: 'italic' } }, 'this is now italic type'),
        'and this is still just normal text',
        h('a', { props: { href: '/bar' } }, 'I\'ll take you places')
    ])
    //send `patch` invocation

patch(vnode, newVnode); //Snabbdom efficiently updates the old view to the new state
复制代码
```

> ```
> h函数
> ```

```
{
    tar: 'ul',
    attrs: {
        id: 'list'
    },
    children: [
    {
        tag: 'li',
        attrs: {
            className: 'item',
            children: ['item1']
        }
    },
    {
        tag: 'li',
        attrs: {
            className: 'item'
        },
        children: ['item2']
        }
    ]
}
复制代码
```

> 对应的`vnode`

```
var vnode = h('ul#list', {}, [
    h('li.item', {}, 'Item1'),
    h('li.item', {}, 'Item')
])

复制代码
```

> `patch`函数

```
var vnode = h('ul#list', {}, [
    h('li.item', {}, 'Item1'),
    h('li.item', {}, 'Item2')
])

var container = document.getElementById('container')
patch(container, vnode)

//模拟改变
var btnChange = document.getElementById('btn-change')
btnChange.addEventListener('click', function() {
    var newVnode = h('ul#list', {}, [
        h('li.item', {}, 'Item 111'),
        h('li.item', {}, 'Item 222'),
        h('li.item', {}, 'Item 333')
    ])
    patch(vnode, newVnode)
})
复制代码
<div id="container"></div>
<button id="btn-change">change</button>
<script src="https://cdn.bootcss.com/snabbdom/0.7.2/snabbdom.js"></script>
<script src="https://cdn.bootcss.com/snabbdom/0.7.2/snabbdom-class.js"></script>
<script src="https://cdn.bootcss.com/snabbdom/0.7.2/snabbdom-props.js"></script>
<script src="https://cdn.bootcss.com/snabbdom/0.7.2/snabbdom-style.js"></script>
<script src="https://cdn.bootcss.com/snabbdom/0.7.2/snabbdom-eventlisteners.js"></script>
<script src="https://cdn.bootcss.com/snabbdom/0.7.2/h.js"></script>

复制代码
  <script type="text/javascript">
    var snabbdom = window.snabbdom

    //定义patch
    var patch = snabbdom.init([
        snabbdom_class,
        snabbdom_props,
        snabbdom_style,
        snabbdom_eventlisteners
    ])
    //定义h函数
    var h = snabbdom.h

    var container = document.getElementById('container')

    //生成vnode
    var vnode = h('ul#list',{},[
        h('li.list',{},'Item1'),
        h('li.list',{},'Item2'),

    ])
    patch(container,vnode)


    document.getElementById('btn-change').addEventListener('click',function(){
        //生成newVode
        var newVnode = h('ul#list',{},[
            h('li.list',{},'Item1'),
            h('li.item',{},'Item B'),
            h('li.item',{},'Item 3')
        ])
        patch(vnode,newVnode)
    })


    </script>
复制代码
```

> **重新实现前面的demo(用snabbdom实现)**

```
 var snabbdom = window.snabbdom
    var patch = snabbdom.init([
        snabbdom_class,
        snabbdom_props,
        snabbdom_style,
        snabbdom_eventlisteners
    ])
    var h = snabbdom.h
    var container = document.getElementById('container')
    var btnChange = document.getElementById('btn-change')
    var vnode
    var data = [{
            name: 'zhangsan',
            age: 20,
            address: 'beijing'
        },
        {
            name: 'zhangsan',
            age: 20,
            address: 'shanghai'
        },
        {
            name: 'zhangsan',
            age: 20,
            address: 'shenzhen'
        }
    ]
    
    data.unshift({
        name:'姓名：',
        age:'年龄：',
        address:'地址：'
    })


    render(data);

    function render(data){
        var newVnode = h('table',{},data.map(function(item){
            var tds = [],i
            for(i in item){
                if(item.hasOwnProperty(i)){
                    tds.push(h('td',{},item[i]+''))
                }
            }
            return h('tr',{},tds)
        }))
        if(vnode){
            patch(vnode,newVnode)
        }else{
            patch(container,newVnode)
        }
        vnode = newVnode  //存储当前vnode结果

    }

  
    btnChange.addEventListener('click',function(){
        data[1].age = 30
        data[2].address = '深圳'
        //re-render
        render(data)
    })
复制代码
```

> **核心API**

- h函数的用法

```
 h('<标签名>',{...属性...},[...子元素...])
 
 h('<标签名>',{...属性...},'...')
复制代码
```

- patch函数用法

```
patch(container,vnode) 

patch(vnode,newVnode)  //rerender

复制代码
```

### 介绍一下diff算法

> 什么是diff算法

`linux`中的diff：找出两个文件中的不同:

```
diff log1.txt log2.txt
复制代码
```

`git diff`:修改之前和修改之后版本的差异

```
git diff xxxx.js
复制代码
```

网上的一些在线差异化网站

```
http://tool.oschina.net/diff/
复制代码
```

`diff`算法并不是`vdom`提出的概念，一直存在
现在应用到`vdom`中，对比的是两个虚拟dom

> 去繁就简

- `diff`算法非常复杂，实现难度很大，源码量很大
- 去繁就简，讲明白核心流程，不关心细节
- 面试官大部分也不清楚细节，但是很关心核心流程
- 去繁就简之后，依然具有很大的挑战性

> ```
> vdom`为何要使用`diff
> ```

- `DOM`操作是“昂贵”的，因此尽量减少`DOM`操作
- 找出本次`DOM`必须更新的节点来更新，其他的不更新
- “找出”的过程，就需要`diff`算法

> `diff`算法实现 `diff`实现的过程

- `patch(container,vnode)`

```
如何用vnode生成真实的dom节点
 {
    tag: 'ul',
    attrs: {
        id: 'list'
    },
    children: [
        {
            tag: 'li',
            attrs: {
                className: 'item'
            },
            children:['item 1']
        }
    ]
}
复制代码
<ul id = "list">
    <li class='item'>Item 1</li>
</ul>
复制代码
```

> 简单实现算法

```
function createElement(vnode) {
    var tag = vnode.tag;
    var attrs = vnode.attrs || {};
    var children = vnode.children || [];
    if (!tag) {
        return null
    }
    //创建元素
    var elem = document.createElement(tag);
        //属性
    var attrName;
    for (attrName in atts) {
        if (attrs.hasOwnProperty(attrName)) {
            elem.setAttribute(attrName, attrs[attrName])
        }
    }
    //子元素
    children.array.forEach(childVnode => {
        elem.appendChild(createElement(childVnode))
    });
    return elem;
}
 
复制代码
```

- `patch(vnode,newVnode)`

```
 {
    tag: 'ul',
    attrs: { id: 'list' },
    children: [{
            tag: 'li',
            attrs: { className: 'item' },
            children: ["Item 1"]
        },
        {
            tag: 'li',
            attrs: {
                className: 'item',
                children: ['Item 2']
            }
        }
    ]
}
复制代码
```

> 对比：

```
{
    tag: 'ul',
    attrs: { id: 'list' },
    children: [{
            tag: 'li',
            attrs: { className: 'item' },
            children: ["Item 1"]
        },
        {
            tag: 'li',
            attrs: {
                className: 'item',
                children: ['Item 222']
            }
        },
        {
            tag: 'li',
            attrs: {
                className: 'item',
                children: ['Item 3']
            }
        }
    ]
}
 
复制代码
```



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1280" height="471"></svg>)



> 简单实现

```
 function updateChildren(vnode, newVnode) {
    var children = vnode.children || [];
    var newChildren = newVnode.children || [];

    //遍历现有的children
    children.forEach((child, index) => {
        var newChild = newChildren[index];
        if (newChild == null) {
            return;
        }
        if (child.tag === newChild.tag) {
            updateChildren(child, newChild)
        } else {
            replaceNode(child, newChild)
        }
    });
}
复制代码
```

- 节点新增和删除
- 节点重新排序
- 节点属性、样式、事件绑定
- 如何积极压榨性能

## `MVVM`和`Vue`

### 使用`jQuery`和使用框架的区别

> 数据与视图的分离，解耦(封闭开放原则)

- `jquery`中数据与视图混合在一起了,不符合开放封闭原则
- `vue`:通过Vue对象将数据和`View`完全分离开来了

> 以数据驱动视图

- `jquery`完全违背了这种理念，`jquery`直接修改视图，直接操作`DOM`
- `vue`对数据进行操作不再需要引用相应的`DOM`对象，通过`Vue`对象这个`vm`实现相互的绑定。以数据驱动视图，只关心数据变化，`DOM`操作被封装

### 对`MVVM`的理解

> ```
> MVC
> ```



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="432" height="354"></svg>)

![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="364" height="334"></svg>)



> ```
> MVVM
> ```

- `Model`:数据，模型

- `View`:视图、模板(视图和模型是分离的)

- ```
  ViewModel
  ```

  :连接

  ```
  Model
  ```

  和

  ```
  View
  ```

  ![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="676" height="322"></svg>)



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="616" height="328"></svg>)



`MVVM`不算是创新，`ViewModel`算是一种微创新
 是从`MVC`发展而来，结合前端场景的创新

### 如何实现MVVM

> **Vue三要素**

- **响应式**：`vue`如何监听到`data`的每个属性变化
- **模板引擎**：vue的模板如何被解析，指令如何处理
- **渲染**：`vue`的模板如何渲染成`html`，以及渲染过程

#### `vue`中如何实现响应式

> **什么是响应式**

- 修改`data`属性之后，`vue`立刻监听到(然后立刻渲染页面)
- `data`属性被代理到`vm`上

> **Object.defineProperty**

`ES5`中加入的`API`，所以`Vue`不支持低版本浏览器(因为低版本浏览器不支持这个属性)

```
var obj = {};
    var _name = 'zhangsan';

    Object.defineProperty(obj,"_name",{
        get:function(){
            console.log("get");
            return _name;
        },
        set:function(newVal){
            console.log(newVal);
            _name = newVal;
        }
    });

    console.log(obj.name) //可以监听到
    obj.name = 'list'
复制代码
```

> **模拟实现**

```
var vm = new Vue({
    el: '#app',
    data: {
        price: 100,
        name: 'zhangsan'
    }
})
复制代码
var vm = {}
var data = {
    name: 'zhangsan',
    price: 100
}

var key, value
for (key in data) {
    //命中闭包。新建一个函数，保证key的独立的作用域
    (function(key) {
        Object.defineProperty(vm, key, {
            get: function() {
                console.log('get')
                return data[key]
            },
            set: function(newVal) {
                console.log('set')
                data[key] = newVal
            }
        })
    })(key)
}

复制代码
```

#### `vue`如何解析模板

> 模板是什么

- 本质：字符串；有逻辑,如`v-if`,`if-else-if`，嵌入`JS变量`...

- 与`html`格式很像，但有很大区别(静态)，最终还是要转化为`html`显示

- 模板最终必须转换成

  ```
  JS
  ```

  代码 

  - 1、因为有逻辑(`v-for`,`v-if`)，必须用`JS`才能实现(图灵完备)
  - 2、转换为`html`渲染页面，必须用`JS`才能实现
  - 因此，模板最重要转换成一个`JS`函数(`render`函数)

#### `render`函数

> 先了解`with()`的使用

```
function fn1() {
    with(obj) {
        console.log(name);
        console.log(age);
        getAddress()
    }
}

复制代码
```

> 最简单的一个示例

```
<div id="app">
    <p>{{price}}</p>
</div>
复制代码
with(this) {    //this：vm
    return _c(
        'div', 
        {
            attrs: { "id": "app" }
        }, 
        [
            _c('p',[_v(_s(price))]     )  //price代理到了vm上
        ]
    )
}
复制代码
//vm._c
ƒ (a, b, c, d) { return createElement(vm, a, b, c, d, false); }

//vm._v
ƒ createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

//vm._s
ƒ toString (val) {
  return val == null? '': typeof val === 'object'? JSON.stringify(val, null,2): String(val)
}
复制代码
```

- 模板中所有信息都包含在了`render`函数中
- `this`即`vm`
- `price`即`this.price`,即`data`中的`price`
- `_c`即`this._c`即`vm._c`

> 更复杂的一个例子

```
    <div id="app">
        <div>
            <input v-model="title">
            <button v-on:click="add">submit</button>
        </div>
        <div>
            <ul>
                <li v-for="item in list">{{item}}</li>
            </ul>
        </div>
    </div>
复制代码
```

> 如何寻找`render`函数：`code.render`

> 模板如何生成`render`函数：

`vue2.0`开始就支持预编译，我们在开发环境下`写模板`，经过`编译打包`，产生生产环境的render函数(`JS`代码）

```
with(this){  // this 就是 vm
            return _c(
                'div',
                {
                    attrs:{"id":"app"}
                },
                [
                    _c(
                        'div',
                        [
                            _c(
                                'input',
                                {
                                    directives:[
                                        {
                                            name:"model",
                                            rawName:"v-model",
                                            value:(title),
                                            expression:"title"
                                        }
                                    ],
                                    domProps:{
                                        "value":(title)
                                    },
                                    on:{
                                        "input":function($event){
                                          if($event.target.composing)return;
                                            title=$event.target.value
                                        }
                                    }
                                }
                            ),
                            _v(" "),
                            _c(
                                'button',
                                {
                                    on:{
                                        "click":add
                                    }
                                },
                                [_v("submit")]
                            )
                        ]
                    ),
                    _v(" "),
                    _c('div',
                        [
                            _c(
                                'ul',
                                _l((list),function(item){return _c('li',[_v(_s(item))])})
                            )
                        ]
                    )
                ]
            )
        }

复制代码
//vm._l
 function renderList(val,render) {
        var ret, i, l, keys, key;
        if (Array.isArray(val) || typeof val === 'string') {
            ret = new Array(val.length);
            for (i = 0, l = val.length; i < l; i++) {
                ret[i] = render(val[i], i);
            }
        } else if (typeof val === 'number') {
            ret = new Array(val);
            for (i = 0; i < val; i++) {
                ret[i] = render(i + 1, i);
            }
        } else if (isObject(val)) {
            keys = Object.keys(val);
            ret = new Array(keys.length);
            for (i = 0, l = keys.length; i < l; i++) {
                key = keys[i];
                ret[i] = render(val[key], key, i);
            }
        }
        if (isDef(ret)) {
            (ret)._isVList = true;
        }
        return ret
    }

复制代码
```

- `v-model`是怎么实现的？
- `v-on:click`是怎么实现的
- `v-for`是怎么实现的

> ```
> render`函数与`DOM
> ```

- 已经解决了模板中"逻辑"(`v-for`,`v-if`)的问题

- 还剩下模板生成html的问题

- 另外,vm_c是什么?

  ```
  render
  ```

  函数返回了什么 

  - vm._c其实就相当于`snabbdom`中的`h`函数
  - `render`函数执行之后，返回的是`vnode`

```
vm._update(vnode) {
    const prevVnode = vm._vnode
    vm._vnode = vnode
    if (!prevVnode) {
        vm.$sel = vm.__patch__(vm.$sel, vnode)    //与snabbdom中的patch函数差不多
    } else {
        vm.$sel = vm.__patch__(prevVnode, vnode)
    }
}

funciton updateComponent() {
    //vm._render即上面的render函数，返回vnode
    vm._update(vm._render())
}
复制代码
```

- `updateComponent`中实现了`vdom`的`patch`
- 页面首次渲染执行`updateComponent`
- `data`中每次修改属性，执行`updataCommponent`

### `vue`的实现流程

> 第一步：解析模板成`render`函数

- `with`的用法
- 模板中所有的信息都被`render`函数包含
- 模板中用到的`data`中的属性，都变成了js变量
- 模板中的`v-model`、`v-if`、`v-on`都变成了js逻辑
- `render`函数返回`vnode`

> 第二步：响应式监听

- `Object.defineProperty`
- 将`data`属性代理到`vm`上

> 第三步：首次渲染，显示页面，且绑定依赖

- 初次渲染，执行`updateaComponent`，执行`vm._render()`

- 执行`render`函数，会访问到`vm.list`和`vm.title`

- 会被响应式的

  ```
  get
  ```

  方法监听到(为什么监听get？直接监听set不就行了吗？) 

  - `data`中有很多属性，有些会被用到，有些可能不会被用到
  - 被用到的会走到`get`，不被用到的不会走`get`
  - 未走到`get`中的属性，`set`的时候我们也无需关系
  - 避免不必要的重复渲染

- 执行`updateComponent`,会走到`vdom`的`patch`方法

- `patch`将`vnode`渲染成`DOM`，初次渲染完成

> 第四步：`data`属性变化，触发`rerender`

- 属性修改，被响应式的`set`监听到
- `set`中执行`updateaComponetn`
- `updateComponent`重新执行`vm._render()`
- 生成的`vnode`和`prevVnode`，通过`patch`进行对比
- 渲染到`html`中

## 组件化和React

> - JSX和vdom的关系
> - 说一下setState的过程
> - 阐述自己对React和Vue的认识

### 说一下对组件化的理解

#### todolist Demo1

> 命令行

- `npm i create-react-app -g`
- `create-react-app react-test`
- `npm start`

> - app.js

```
import Todo from './components/todo/index.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Todo></Todo>
      </div>
    );
  }
}
export default App;

复制代码
```

> - src `=>` components `=>` todo

```
import React, { Component } from 'react'

class Todo extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return ( 
            <p> this is todo component </p>
        )
    }
}

export default Todo

复制代码
```

#### todolist Demo2

> list `=>` todo `=>` index.js

```
import React, { Component } from 'react'

class List extends Component{
    constructor(props){
        super(props)
    }
    render() {
        const list = this.props.data
        return (
            <ul>
                {
                    list.map((item,index) =>{
                        return <li key={index}>{item}</li>  
                    })
                }
            </ul>
        )
    }
}

export default List
复制代码
```

必须加`key`

> todo.js

```
import React, { Component } from 'react'
import List from './list/index.js';
import Input from './input/index.js';

class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list:[]
        }
    }
    render() {
        return ( 
            <div> 
                <Input addTitle={this.addTitle.bind(this)}/>
                <List data={this.state.list} />
            </div>
        )
    }

    //主动添加list
    addTitle(title){ 
        const currentList = this.state.list   //获取当前list
        this.setState(
            {
                list:currentList.concat(title)
            }
        )
    }
}

export default Todo

复制代码
```

> list `=>` input `=>` index.js

```
import React, { Component } from "react";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }
  render() {
      return(
        <div>
            <input value={this.state.title} onChange={this.changeHandle.bind(this)} />
            <button onClick={this.clickHandle.bind(this)}>submit</button>
        </div>  
      )
   
  }
  changeHandle(event) {
    this.setState({
      title: event.target.value
    });
  }
  clickHandle() {
    const title = this.state.title;
    //把title添加进列表
    const addTitle = this.props.addTitle;
    addTitle(title);
    //清空
    this.setState({
        title: ""
    });
  }
}

export default Input
复制代码
```

### 说一下对组件化的理解

> 组件的封装

- 视图
- 数据
- 变化逻辑(数据驱动视图)

> 组件的复用

- props传递
- 复用

### `JSX`本质是什么

> `JSX`语法

- `html`形式
- 引入JS变量和表达式
- `if...else...`
- 循环
- `style`和className
- 事件

> `JSX`解析成JS

- JSX其实是语法糖
- 开发环境将JSX编译成JS代码
- JSX写法大大降低了学习成本和编码工作量
- 同时,`JSX`也会增加`debug`成本

```
/*JSX代码*/
var profile = <div>
    <img src="avater.png" className="profile"/>
    <h3>{[user.firstName,user.lastName].join('')}</h3>
</div>

----------------------------------------------------------------------------

//最终解析成
var profile = React.createElement("div",null,
  React.createElement("img",{src:"avater.png",className:"profile"}),
  React.createElement("h3",null,[user.firstName,user.lastName].join("")))
复制代码
```

> `React.createElement`参数说明

```
React.createElement('div',{'id':'div1'},child1,child2,child3)
React.createElement('div',{'id':'div1'},[...])
复制代码
```

- `vdom` 和`h()`
- `vue`的`_c()`
- `react`的`createElement`

```
render(){
        const list = this.props.data
        return{
            <ul>
                {
                    list.map((list,index)=>{
                        return <li key={index}>{item}</li>>
                    })
                }
            </ul>
        }
    }
    
----------------------------------------------------------------------------
function render(){
    const list = this.props.data;
    return React.createElement(
        'ul',
        'null',
        list.map((item,index) => {
            return React.createElement(
                "li",
                {key:index},
                item
            );
        })
    );
}
复制代码
```

> `JSX`独立的标准

- `JSX`是`React`引入的，但不是`React`独有的
- `React`已经将它作为一个独立标准开放，其他项目也可用
- `React.createElement`是可以自定义修改的
- 说明：本身功能已经完备；和其他标准兼容和扩展性没问题

## `Hybrid`

- 移动端占大部分流量，已经远远超过`pc`
- 一线互联网公司都有自己的`APP`
- 这些`APP`中有很大比例的前端代码，拿微信举例，你每天浏览微信的内容，很多都是前端

### `hybrid`是什么，为何用`hybrid，如何实现`

> **hybrid文字解释**

- `hybrid`即“混合”,即前端和客户端的混合开发
- 需前端开发人员和客户端人员配合完成
- 某些环节也可能涉及到`server`端

> **存在价值，为何会用hybrid**

- 可以快速迭代更新【关键】(无须app审核)
- 体验流畅(和NA的体验基本类似)
- 减少开发和沟通成本，双端公用一套代码

#### **webview**

- 是app中的一个组件(app可以有`webview`，也可以没有)
- 用于加载h5页面，即一个小型的浏览器内核

#### **file://协议**

- 其实在一开始接触html开发，已经使用file协议了 

  - 加载本地文件，快 

    ![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1280" height="55"></svg>)

    ![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1280" height="515"></svg>)

  - 网络加载，慢



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1280" height="284"></svg>)



- “协议”、“标准的重要性”

要做到和原生一样的体验，就必须要求加载速度特别的快，变态的快，和客户端几乎一样的快

#### **hybrid适用场景**

- 使用NA：体验要求极致，变化不频繁(如头条的首页)
- 使用hybrid：体验要求高，变化频繁(如头条的新闻详情页)
- 使用h5：体验无要求，不常用(如举报，反馈等页面)

#### **hybrid具体实现**

- 前端做好静态页面(html js css)，将文件交给客户端
- 客户端拿到前端静态页面，以文件的形式存储在app中
- 客户端在一个webview中
- 使用file协议加载静态页面



![img](https://user-gold-cdn.xitu.io/2019/1/4/16815d0dd43f51a1?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



#### **app发布之后，如何实时更新**



![img](https://user-gold-cdn.xitu.io/2019/1/4/16815d4f129abf85?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



> 分析

- 要替换每个客户端的静态文件
- 只能客户端来做(客户端是我们开发的)
- 客户端去serve下载最新的静态文件
- 我们维护server的静态文件



![img](https://user-gold-cdn.xitu.io/2019/1/4/16815d779d444753?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



> 具体实现

- 分版本有版本号，如201803211015
- 将静态文件压缩成zip包，上传到服务端
- 客户端每次启动，都去服务端检查版本号
- 如果服务端版本号大于客户端版本号，就去下载最新的zip包
- 下载完之后解压包，然后将现有文件覆盖

#### `hybrid`和`h5`区别

> 优点：

- 体验更好，跟NA体验基本一致
- 可快速迭代，无须app审核【关键】

> 缺点：

- 开发成本高。联调、测试、查bug都比较麻烦
- 运维成本高。(参考此前讲过的更新上线的流程)

> 适用场景：

- `hybrid`：产品的稳定功能，体验要求高，迭代频繁
- `h5`：单次的运营活动(如xx红包)或不常用功能
- `hybrid`适合产品型，`h5`适合运营型

### JS和客户端通讯

> 前端如何获取内容

- 新闻详情页适用`hybrid`，前端如何获取新闻内容
- 不能用ajax获取。第一跨域(`ajax`是`http`协议)，第二速度慢。
- 客户端获取新闻内容，然后JS通讯拿到内容，再渲染。

> JS和客户端通讯的基本形式
>  
>
> ![img](https://user-gold-cdn.xitu.io/2019/1/4/16815ff02d59a8ff?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

#### schema协议简介和使用

- 之前介绍了http(s)和file协议
- schema协议--前端和客户端通讯的约定



![img](https://user-gold-cdn.xitu.io/2019/1/4/16816014fbecb1cf?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)





![img](https://user-gold-cdn.xitu.io/2019/1/4/168160b114b059a6?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)





![img](https://user-gold-cdn.xitu.io/2019/1/4/168160dee8a5fa32?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



```
function invokScan() {
    window['_invok_scan_callback'] = function(result){
        alert(result)
    }
    var iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = 'weixin://dl/scan?k1=v1&k1=v2&callback=_invok_scan_callback' //重要
    var body = document.body
    body.appendChild(iframe)
    setTimeout(() => {
        body.removeChild(iframe)
        iframe = none
    });
}
document.getElementById('btn').addEventListener('click', function() {
    invokScan();
})
复制代码
```

#### schema使用的封装

我们希望封装后达到的效果：

```
/*傻瓜式调用，而且不用再自己定义全局函数 */
window.invok.share({title:'xxxx',content:'xxx'},funciton(result){
    if(result.error === 0){
        alert('分享成功')
    }else{
        //分享失败
        alert(result.message)
    }
})
复制代码
//分享
function invokeShare(data,callback){
    _invoke('share',data,callback)
}
//登录
function invokeLogin(data,callback){
    _invoke('login',data,callback)
}
//打开扫一扫
function invokeScan(data,callback){
    _invoke('scan',data,callback)
}
复制代码
//暴露给全局
window.invoke = {
    share:invokeShare,
    login:invokeLogin,
    scan:invokeScan
}
复制代码
function _invoke(action,data,callback){
    //拼接schema协议
    var schema = 'myapp://utils';
    scheam += '/' + action;
    scheam += '?a=a';
    var key;
    for(key in data){
        if(data.hasOwnProperty(key)){
            schema += '&' + key + '=' +data[key]
        }
    }
}
复制代码
//处理callback
var callbackName = ''
if(typeof callback == 'string'){
    callbackName = callback
}else{
    callbackName = action + Date.now()
    window[callbackName] = callback
}

schema += '&callback' + callbackName
复制代码
(function(window, undefined) {

    //调用schema封装
    function _invoke(action, data, callback) {
        //拼装schema协议
        var schema = 'myapp://utils/' + action;
        //拼接参数
        schema += '?a=a';
        var key;
        for (key in data) {
            if (data.hasOwnProperty(key)) {
                schema += '&' + key + '=' + data[key];
            }
        }
        //处理callback
        var callbackName = '';
        if (typeof callback === 'string') {
            callbackName = callback
        } else {
            callbackName = action + Date.now()
            window[callbackName] = callback
        }
        schema += 'allback = callbackName'
    }

    //暴露到全局变量
    window.invoke = {
        share: function(data, callback) {
            _invoke('share', data, callback)
        },
        scan: function(data, callback) {
            _invoke('scan', data, callback)
        },
        login: function(data, callback) {
            _invoke('login', data, callback)
        }
    }
})(window)
复制代码
```

> 内置上线

- 将以上封装的代码打包,叫做`invoke.js`，内置到客户端
- 客户端每次启动`webview`，都默认执行`invoke.js`
- 本地加载，没有网络请求，黑客看到不到`schema`协议，更安全

> 总结

- 通讯的基本形式：调用能力，传递参数，监听回调
- 对schema协议的理解和使用
- 调用schema代码的封装
- 内置上线：更快更安全