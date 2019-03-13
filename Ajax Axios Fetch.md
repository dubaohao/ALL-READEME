#1.Ajax

## 01.ajax 跳入error的一些原因
	1. dataType错误
	
	   类型错误：后台返回的dataType类型和前台写的不一致会跳入error
	
	   格式错误：jquery1.4之后对json的格式要求非常严格，json格式错误也会跳入error.{"test":1} 注意格式
	
	  有时，在不需要返回值的情况下，扔按模板格式，设置了dataType:"json",参数；这时候，ajax传值正确时，出现200返回成功状态下报错的特殊情况。
	
	2. async请求同步异步问题
	
	    async默认是true(异步请求),如果想一个Ajax执行完后再执行另一个Ajax, 需要把async=false

	    例如，你用post请求传值到另一个页面后台，但是页面一加载你的ajax就已经执行过了，传值接收是在后台才完成的，这时候就请求不到数据，所以可以考虑把ajax请求改为同步试试。
	
	3. data不能不写
	   data为空也一定要传"{}"；不然返回的是xml格式的。并提示parsererror. data:"{}"
	
	   parsererror的异常和Header 类型也有关系。及编码header('Content-type: text/html; charset=utf8');
	
	4. 传递的参数
	
	    必须是ajax支持的编码格式

	5. URL路径问题
	
	    路径不能有中文
	用error调试错误信息：
	
	可以alert出来，查看具体是哪里出错了
	
	具体参数：
	
	XMLHttpRequest：XMLHttpRequest.readyState: 状态码的意思
	0 － （未初始化）还没有调用send()方法
	1 － （载入）已调用send()方法，正在发送请求
	2 － （载入完成）send()方法执行完成，已经接收到全部响应内容
	3 － （交互）正在解析响应内容
	4 － （完成）响应内容解析完成，可以在客户端调用了