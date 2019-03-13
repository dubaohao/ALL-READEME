#JavaScript学习-dubaohao
2018/11/12 14:52:49 
##1.ES6 
	1.ECMA Script，JavaScript的语言标准
	2.提升js编写大型复杂的应用程序的能力
	3.babel：ES6-》ES5的转换器
>1.let和const

* 1.let定义变量 const定义常量
* 2.不能重复定义
* 3.块级作用域
* 4.不存在变量提升

>2.箭头函数

* 1.参数=>表达式/语句
* 2.没有独立作用域，继承外层作用域
* 3.不能用作构造函数
* 4.没有prototype属性

>3.模板字符串（就像md文件一样，可以写入代码)

* 1.反引号``
* 2.支持多行字符串
* 3.支持变量和表达式

>4.Promise

* 1.Promise对象
* 2.异步链式操作
* 3.关键词：resolve reject then

>5.面对对象

* 1.关键词：class
* 2.语法糖，对应function
* 3.构造函数constructor
* 4.面对对象-类的继承
	>>* extends:类的继承
	>>* super：调用父类的构造函数
	
* 5.面对对象-对象
	>>* 对象里属性的简写
	>>* 对象里的方法简写
	>>* 属性名可以为表达式
	>>* 其他扩展
		>>>1.object.key()获取object的属性
		>>>2.Object.assign({},{})把两个对象合为一个对象（同样的属性，第一层会覆盖）
		
>6.ES6 模块化

* 1.解决一个复杂问题时，自顶向下逐层把系统划分为若干模块的过程
* 2.CommonJS、AMD、CMD
* 3.关键词：export、import

>总结

* 1.基础指令：let、const
* 2.箭头函数：value=>return value+1
* 3.模板字符串：`反引号Hello ${name}!反引号`
* 4.promise：Promise、resolve、reject、then
* 5.面对对象：class、extend、super、constructor
* 6.模块化：export、import、as、default

##2.JavaScript 中包含以下 7 个全局函数

escape( )、eval( )、isFinite( )、isNaN( )、parseFloat( )、parseInt( )、unescape( )。

##3.近似方法：

Math.ceil()执行向上舍入，即它总是将数值向上舍入为最接近的整数；
Math.floor()执行向下舍入，即它总是将数值向下舍入为最接近的整数；
Math.round()执行标准舍入，即它总是将数值四舍五入为最接近的整数(四舍五入)。

##4.三个都是事件对象的方法：

stopPropagation() 阻止事件冒泡。 这个事件不会阻止定义在元素上的其他事件。
stopImmediatePropagation() 会彻底的阻止事件， 在其之后的绑定在元素上的其他监听事件都不会触发
preventDefault() 阻止事件的默认动作

##5.DNS
```

	下面关于DNS说法正确的是（）
	A.DNS的作用是域名和IP地址的相互映射
	B.DNS协议大多数运行在UDP协议之上
	C.DNS协议端口号为53
	D.DNS的默认缓存时间为1小时
```

* A：DNS就是将域名翻译成IP地址。
* B：主要用UDP，但是当请求字节过长超过512字节时用TCP协议，将其分割成多个片段传输。
* C：DNS协议默认端口号是53。
* D：操作系统的DNS缓存：windows DNS缓存的默认值是 MaxCacheTTL，它的默认值是86400s，也就是一天。macOS 严格遵循DNS协议中的TTL。
游览器的DNS缓存：chrome对每个域名会默认缓存60s；IE将DNS缓存30min；Firefox默认缓存时间只有1分钟；Safari约为10S。

##6.全局函数
![](https://uploadfiles.nowcoder.net/images/20170913/2338761_1505282688457_E00EB4A17EF35C66FB94D24B01A79DC1)