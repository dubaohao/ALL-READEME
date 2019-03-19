# JavaScript【this】

有关 JS 中的 this、call、apply 和 bind 的概念网络上已经有很多文章讲解了 这篇文章目的是梳理一下这几个概念的知识点以及阐述如何用原生 JS 去实现这几个功能

-[this 指向问题](# this 指向问题)

-[this 改变指向问题](# this 改变指向问题)

-[原生实现 call apply bind new](# 原生实现 call apply bind new)

## this 指向问题

### this

this 的指向在严格模式和非严格模式下有所不同；this 究竟指向什么是，在绝大多数情况下取决于函数如何被调用

**全局执行环境的情况：**

非严格模式下，this 在全局执行环境中指向全局对象(window、global、self)；严格模式下则为 undefined



![20190306083121.png](https://user-gold-cdn.xitu.io/2019/3/7/16958cd0539070db?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



**作为对象方法的调用情况：**

假设函数作为一个方法被定义在对象中，那么 this 指向最后调用他的这个对象

比如：

```
a = 10
obj = {
    a: 1,
    f() {
        console.log(this.a) // this -> obj
    }
}

obj.f() // 1 最后由 obj 调用
复制代码
```

`obj.f()` 等同于 `window.obj.f()` 最后由 obj 对象调用，因此 this 指向这个 obj

即便是这个对象的方法被赋值给一个变量并执行也是如此：

```
const fn = obj.f
fn() // 相当于 window.fn() 因此 this 仍然指向最后调用他的对象 window
复制代码
```



![20190306084716.png](https://user-gold-cdn.xitu.io/2019/3/7/16958cd05369cc06?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



**call apply bind 的情况：**

想要修改 this 指向的时候，我们通常使用上述方法改变 this 的指向

```
a = 10
obj = {
	a: 1
}
function fn(...args) {
	console.log(this.a, 'args length: ', args)
}

fn.call(obj, 1, 2)
fn.apply(obj, [1, 2])
fn.bind(obj, ...[1, 2])()
复制代码
```



![20190306090239.png](https://user-gold-cdn.xitu.io/2019/3/7/16958cd054ca59c7?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



可以看到 this 全部被绑定在了 obj 对象上，打印的 `this.a` 也都为 1

**new 操作符的情况：**

new 操作符原理实际上就是创建了一个新的实例，被 new 的函数被称为构造函数，构造函数 new 出来的对象方法中的 this 永远指向这个新的对象：

```
a = 10
function fn(a) { this.a = a }
b = new fn(1)
b.a // 1
复制代码
```



![20190306090716.png](https://user-gold-cdn.xitu.io/2019/3/7/16958cd05514397a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



**箭头函数的情况：**

- 普通函数在运行时才会确定 this 的指向
- 箭头函数则是在函数定义的时候就确定了 this 的指向，此时的 this 指向外层的作用域

```
a = 10
fn = () => { console.log(this.a) }
obj = { a: 20 }
obj.fn = fn
obj.fn()
window.obj.fn()
f = obj.fn
f()
复制代码
```



![20190306091151.png](https://user-gold-cdn.xitu.io/2019/3/7/16958cd055103211?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



无论如何调用 fn 函数内的 this 永远被固定在了这个外层的作用域（上述例子中的 window 对象）

## this 改变指向问题

如果需要改变 this 的指向，有以下几种方法:

- 箭头函数
- 内部缓存 this
- apply 方法
- call 方法
- bind 方法
- new 操作符

### 箭头函数

**普通函数**

```
a = 10
obj = {
    a: 1,
    f() { // this -> obj
		function g() { // this -> window
        	console.log(this.a)
    	}
		g()
	}
}

obj.f() // 10
复制代码
```

在 f 函数体内 g 函数所在的作用域中 this 的指向是 obj：



![20190306094032.png](https://user-gold-cdn.xitu.io/2019/3/7/16958cd0562909f7?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



在 g 函数体内，this 则变成了 window：



![20190306094118.png](https://user-gold-cdn.xitu.io/2019/3/7/16958cd09d44fa73?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



**改为箭头函数**

```
a = 10
obj = {
    a: 1,
    f() { // this -> obj
		const g = () => { // this -> obj
        	console.log(this.a)
    	}
		g()
	}
}

obj.f() // 1
复制代码
```

在 f 函数体内 this 指向的是 obj：



![20190306094446.png](https://user-gold-cdn.xitu.io/2019/3/7/16958cd09d3c5889?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



在 g 函数体内 this 指向仍然是 obj：



![20190306094528.png](https://user-gold-cdn.xitu.io/2019/3/7/16958cd09d6dbea4?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



### 内部缓存 this

这个方法曾经经常用，即手动缓存 this 给一个名为 `_this` 或 `that` 等其他变量，当需要使用时用后者代替

```
a = 10
obj = {
    a: 20,
    f() {
        const _this = this
        setTimeout(function() {
            console.log(_this.a, this.a)
        }, 0)
    }
}

obj.f() // _this.a 指向 20 this.a 则指向 10
复制代码
```



![20190306095926.png](https://user-gold-cdn.xitu.io/2019/3/7/16958cd0a04f907a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



查看一下 this 和 _this 的指向，前者指向 window 后者则指向 obj 对象：



![20190307081510.png](https://user-gold-cdn.xitu.io/2019/3/7/16958cd0a0623707?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



### call

call 方法第一个参数为指定需要绑定的 this 对象；其他参数则为传递的值:



![20190306100658.png](https://user-gold-cdn.xitu.io/2019/3/7/16958cd0a4e5aa76?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



需要注意的是，第一个参数如果是：

- null、undefined、不传，this 将会指向全局对象（非严格模式下）
- 原始值将被转为对应的包装对象，如 `f.call(1)` this 将指向 `Number`，并且这个 Number 的 `[[PrimitiveValue]]` 值为 1

```
obj = {
    name: 'obj name'
}

{(function() {
    console.log(this.name)
}).call(obj)}
复制代码
```



![20190306103718.png](https://user-gold-cdn.xitu.io/2019/3/7/16958cd0c195c3d1?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



### apply

与 call 类似但第二个参数必须为数组：

```
obj = {
    name: 'obj name'
}

{(function (...args){
	console.log(this.name, [...args])
}).apply(obj, [1, 2, 3])}
复制代码
```



![20190306104048.png](https://user-gold-cdn.xitu.io/2019/3/7/16958cd0c5395da6?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



### bind

比如常见的函数内包含一个异步方法：

```
function foo() {
	let _this = this // _this -> obj
	setTimeout(function() {
		console.log(_this.a) // _this.a -> obj.a
	}, 0)
}
obj = {
	a: 1
}
foo.call(obj) // this -> obj
// 1
复制代码
```

我们上面提到了可以使用缓存 this 的方法来固定 this 指向，那么使用 bind 代码看起来更加优雅：

```
function foo() { // this -> obj
	setTimeout(function () { // 如果不使用箭头函数，则需要用 bind 方法绑定 this
		console.log(this.a) // this.a -> obj.a
	}.bind(this), 100)
}
obj = {
	a: 1
}

foo.call(obj) // this -> obj
// 1
复制代码
```

或者直接用箭头函数：

```
function foo() { // this -> obj
	setTimeout(() => { // 箭头函数没有 this 继承外部作用域的 this
		console.log(this.a) // this.a -> obj.a
	}, 100)
}
obj = {
	a: 1
}

foo.call(obj) // this -> obj
// 1
复制代码
```



![20190307082854.png](https://user-gold-cdn.xitu.io/2019/3/7/16958cd0cca7cf58?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



### new 操作符

new 操作符实际上就是生成一个新的对象，这个对象就是原来对象的实例。因为箭头函数没有 this 所以函数不能作为构造函数，构造函数通过 new 操作符改变了 this 的指向。

```
function Person(name) {
	this.name = name // this -> new 生成的实例
}
p = new Person('oli')
console.table(p)
复制代码
```

`this.name` 表明了新创建的实例拥有一个 name 属性；当调用 new 操作符的时候，构造函数中的 this 就绑定在了实例对象上



![20190306230406.png](https://user-gold-cdn.xitu.io/2019/3/7/16958cd0db53dd8c?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



## 原生实现 call apply bind new

文章上半部分讲解了 this 的指向以及如何使用 call bind apply 方法修改 this 指向；文章下半部分我们用 JS 去自己实现这三种方法

### myCall

- 首先 myCall 需要被定义在 `Function.prototype` 上这样才能在函数上调用到自定义的 myCall 方法
- 然后定义 myCall 方法，该方法内部 this 指向的就是 myCall 方法被调用的那个函数
- 其次 myCall 第一个参数对象中新增 this 指向的这个方法，并调用这个方法
- 最后删除这个临时的方法即可

**代码实现：**

```
Function.prototype.myCall = function(ctx) {
	ctx.fn = this
	ctx.fn()
	delete ctx.fn
}
复制代码
```



![20190306233008.png](https://user-gold-cdn.xitu.io/2019/3/7/16958cd0f0089683?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



最基本的 myCall 就实现了，ctx 代表的是需要绑定的对象，但这里有几个问题，如果 ctx 对象本身就拥有一个 fn 属性或方法就会导致冲突。为了解决这个问题，我们需要修改代码使用 Symbol 来避免属性的冲突：

```
Function.prototype.myCall = function(ctx) {
	const fn = Symbol('fn') // 使用 Symbol 避免属性名冲突
	ctx[fn] = this
	ctx[fn]()
	delete ctx[fn]
}
obj = { fn: 'functionName' }
function foo() { console.log(this.fn) }

foo.myCall(obj)
复制代码
```



![20190306233305.png](https://user-gold-cdn.xitu.io/2019/3/7/16958cd0f01d7e01?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



同样的，我们还要解决参数传递的问题，上述代码中没有引入其他参数还要继续修改：

```
Function.prototype.myCall = function(ctx, ...argv) {
	const fn = Symbol('fn')
	ctx[fn] = this
	ctx[fn](...argv) // 传入参数
	delete ctx[fn]
}
obj = { fn: 'functionName', a: 10 }
function foo(name) { console.log(this[name]) }

foo.myCall(obj, 'fn')
复制代码
```



![20190306233625.png](https://user-gold-cdn.xitu.io/2019/3/7/16958cd0f0ec709f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



另外，我们还要检测传入的第一个值是否为对象：

```
Function.prototype.myCall = function(ctx, ...argv) {
	ctx = typeof ctx === 'object' ? ctx || window : {} // 当 ctx 是对象的时候默认设置为 ctx；如果为 null 则设置为 window 否则为空对象
	const fn = Symbol('fn')
	ctx[fn] = this
	ctx[fn](...argv)
	delete ctx[fn]
}
obj = { fn: 'functionName', a: 10 }
function foo(name) { console.log(this[name]) }

foo.myCall(null, 'a')
复制代码
```

如果 ctx 为对象，那么检查 ctx 是否为 null 是则返回默认的 window 否则返回这个 ctx 对象；如果 ctx 不为对象那么将 ctx 设置为空对象（按照语法规则，需要将原始类型转化，为了简单说明原理这里就不考虑了）

执行效果如下：



![20190306235453.png](https://user-gold-cdn.xitu.io/2019/3/7/16958cd103d8449c?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



这么一来自定义的 myCall 也就完成了

另外修改一下检测 ctx 是否为对象可以直接使用 Object；delete 对象的属性也可改为 ES6 的 Reflect：

```
Function.prototype.myCall = function(ctx, ...argv) {
	ctx = ctx ? Object(ctx) : window
	const fn = Symbol('fn')
	ctx[fn] = this
	ctx[fn](...argv)
	Reflect.deleteProperty(ctx, fn) // 等同于 delete 操作符
	return result
}
复制代码
```

### myApply

apply 效果跟 call 类似，将传入的数组通过扩展操作符传入函数即可

```
Function.prototype.myApply = function(ctx, argv) {
	ctx = ctx ? Object(ctx) : window
	// 或者可以鉴别一下 argv 是不是数组
	const fn = Symbol('fn')
	ctx[fn] = this
	ctx[fn](...argv)
	Reflect.deleteProperty(ctx, fn) // 等同于 delete 操作符
	return result
}
复制代码
```

### myBind

bind 与 call 和 apply 不同的是，他不会立即调用这个函数，而是返回一个新的 this 改变后的函数。根据这一特点我们写一个自定义的 myBind：

```
Function.prototype.myBind = function(ctx) {
	return () => { // 要用箭头函数，否则 this 指向错误
		return this.call(ctx)
	}
}
复制代码
```



![20190307224718.png](https://user-gold-cdn.xitu.io/2019/3/7/16958cd1097374a3?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



> 这里需要注意的是，this 的指向原因需要在返回一个箭头函数，箭头函数内部的 this 指向来自外部

然后考虑合并接收到的参数，因为 bind 可能有如下写法：

```
f.bind(obj, 2)(2)
// or
f.bind(obj)(2, 2)
复制代码
```

修改代码：

```
Function.prototype.myBind = function(ctx, ...argv1) {
	return (...argv2) => {
		return this.call(ctx, ...argv1, ...argv2)
	}
}
复制代码
```



![20190307225732.png](https://user-gold-cdn.xitu.io/2019/3/7/16958cd10d29a8ca?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



另外补充一点，bind 后的函数还有可能会被使用 new 操作符创建对象。因此 this 理应被忽略但传入的参数却正常传入。

举个例子：

```
obj = {
    name: 'inner' // 首先定义一个包含 name 属性的对象
}
function foo(fname, lname) { // 然后定义一个函数
	this.fname = fname
	console.log(fname, this.name, lname) // 打印 name 属性
}
foo.prototype.age = 12
复制代码
```

然后我们使用 bind 创建一个新的函数并用 new 调用返回新的对象：

```
boundf = foo.bind(obj, 'oli', 'young')
newObj = new boundf()
复制代码
```



![20190311095410.png](https://user-gold-cdn.xitu.io/2019/3/11/1696a9e5fd648b69?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



看图片得知，尽管我们定义了 obj.name 并且使用了 bind 方法绑定 this 但因使用了 new 操作符 this 被重新绑定在了 newObj 上。因此打印出来的 this.name 就是 undefined 了

因此我们还要继续修改我们的 myBind 方法：

```
Function.prototype.myBind = function (ctx, ...argv1) {
	let _this = this
	let boundFunc = function (...argv2) { // 这里不能写成箭头函数了，因为要使用 new 操作符会报错
		return _this.call(this instanceof boundFunc ? this : ctx, ...argv1, ...argv2) // 检查 this 是否为 boundFunc 的实例
	}
	return boundFunc
}
复制代码
```

然后我们使用看看效果如何：



![20190311100213.png](https://user-gold-cdn.xitu.io/2019/3/11/1696a9e5fde61587?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



this 指向问题解决了但 newObj 实例并未继承到绑定函数原型中的值，因此还要解决这个问题，那么我们直接修改代码增加一个 prototype 的连接：

```
Function.prototype.myBind = function (ctx, ...argv1) {
	let _this = this
	let boundFunc = function (...argv2) {
		return _this.call(this instanceof boundFunc ? this : ctx, ...argv1, ...argv2)
	}
	boundFunc.prototype = this.prototype // 连接 prototype 继承原型中的值
	return boundFunc
}
复制代码
```



![20190311100453.png](https://user-gold-cdn.xitu.io/2019/3/11/1696a9e5fed702f2?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



看起来不错，但还是有一个问题，尝试修改 boundf 的原型：



![20190311103407.png](https://user-gold-cdn.xitu.io/2019/3/11/1696a9e5fe529972?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



发现我们的 foo 中原型的值也被修改了，因为直接使用 = 操作符赋值，其实本质上还是原型的值，最后我们再修改一下，使用一个空的函数来重新 new 一个：

```
Function.prototype.myBind = function (ctx, ...argv1) {
	let _this = this
	let temp = function() {} // 定义一个空的函数
	let boundFunc = function (...argv2) {
		return _this.call(this instanceof temp ? this : ctx, ...argv1, ...argv2)
	}
	temp.prototype = this.prototype // 继承绑定函数原型的值
	boundFunc.prototype = new temp() // 使用 new 操作符创建实例并赋值
	return boundFunc
}
复制代码
```

最后看下效果：



![20190311103534.png](https://user-gold-cdn.xitu.io/2019/3/11/1696a9e5fef3f9de?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



### new 操作符

最后我们再来实现一个 new 操作符名为 myNew

new 操作符的原理是啥：

- 生成新的对象
- 绑定 prototype （既然是 new 一个实例，那么实例的 `__proto__` 必然要与构造函数的 prototype 相连接）
- 绑定 this
- 返回这个新对象

代码实现：

```
function myNew(Constructor) { // 接收一个 Constructor 构造函数
	let newObj = {} // 创建一个新的对象
	newObj.__proto__ = Constructor.prototype // 绑定对象的 __proto__ 到构造函数的 prototype
	Constructor.call(newObj) // 修改 this 指向
	return newObj // 返回这个对象
}
复制代码
```



![20190307232044.png](https://user-gold-cdn.xitu.io/2019/3/7/16958cd1235e7cbd?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



然后考虑传入参数问题，继续修改代码：

```
function myNew(Constructor, ...argv) { // 接收参数
	let newObj = {}
	newObj.__proto__ = Constructor.prototype
	Constructor.call(newObj, ...argv) // 传入参数
	return newObj
}
复制代码
```



![20190307232419.png](https://user-gold-cdn.xitu.io/2019/3/7/16958cd123644dbd?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



## 小结

到此为止

- this 指向问题
- 如何修改 this
- 如何使用原生 JS 实现 call apply bind 和 new 方法

再遇到类似问题，基本常见的情况都能应付得来了

（完）

参考：

- https://juejin.im/post/59bfe84351882531b730bac2#heading-1
- https://segmentfault.com/a/1190000015438195#articleHeader3
- https://github.com/Abiel1024/blog/issues/16
- 感谢 `webgzh907247189` 修改了一些代码实现