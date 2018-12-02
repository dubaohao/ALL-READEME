#JavaScript学习-dubaohao
2018/11/12 14:52:49 

##1.JavaScript 中包含以下 7 个全局函数

escape( )、eval( )、isFinite( )、isNaN( )、parseFloat( )、parseInt( )、unescape( )。

##2.近似方法：

Math.ceil()执行向上舍入，即它总是将数值向上舍入为最接近的整数；
Math.floor()执行向下舍入，即它总是将数值向下舍入为最接近的整数；
Math.round()执行标准舍入，即它总是将数值四舍五入为最接近的整数(四舍五入)。

##3.三个都是事件对象的方法：

stopPropagation() 阻止事件冒泡。 这个事件不会阻止定义在元素上的其他事件。
stopImmediatePropagation() 会彻底的阻止事件， 在其之后的绑定在元素上的其他监听事件都不会触发
preventDefault() 阻止事件的默认动作

##4.DNS
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

##5.全局函数
![](https://uploadfiles.nowcoder.net/images/20170913/2338761_1505282688457_E00EB4A17EF35C66FB94D24B01A79DC1)