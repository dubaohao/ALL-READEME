#Spring-dubaohao

##0走过的坑，流过的泪
###打包jar
maven的install
		
	保持jar包在后台运行
		nohup java -jar ***.jar &
###文件上传下载

	json post上传 RequestBody jsonString接收
			$.ajax({
					 	type:'post',
					 	url:url1,
					 	dataType:'json',
					 	contentType: 'application/json;charset=utf-8',
					 	data:JSON.stringify({"name":name,"base64":base64,"type":type,"caterId":1}),
					 	success:function(data){ 
					 		console.log("data",data);
					             alert(data.msg+"\n地址："+data.data);
					            },
					    error:function(result){
					    	console.log("error",result);
					 		alert(result);
					 	}
					}); 

	json multipart/form-data post上传 RequestBody MultipartFile接收

		head要加上<meta http-equiv="Content-Type" content="multipart/form-data; charset=utf-8" />
		form表单要加上  enctype="multipart/form-data"
			$.ajax({
					 	type:'post',
					 	url:url2,
					 	dataType:'json',
					 	cache: false,
			    		async: false,
					 	processData: false,
			    		contentType: false,
			    		mimeType:"multipart/form-data",
					 	// contentType:'multipart/form-data;charset=utf-8',//不要加，画蛇添足，会报错
					 	data:formData,
					 	success:function(data){ 
					 		console.log("data",data);
					             alert(data.msg+"\n地址："+data.data);
					            },
					    error:function(result){
					    	console.log("error",result);
					 		alert(result);
					 	}
					});

###springboot2
	 servlet:
	    multipart:
	      #单位是Mb，会报错格式不对
	      max-file-size: 10MB
	      max-request-size: 100MB
###报错  The valid characters are defined in RFC 7230 and RFC 3986
	tomcat8之后，编码变了，url要用encodeURI（）处理
	var url2=encodeURI("http://localhost:8080/TM/util/fileUpload?caterId=1");
###Json字符串处理成JSON格式
	依赖
	<!--//json字符串转换成json格式-->
	        <dependency>
	            <groupId>com.fasterxml.jackson.core</groupId>
	            <artifactId>jackson-databind</artifactId>
	            <version>2.6.0</version>
	        </dependency>
	        <dependency>
	            <groupId>com.alibaba</groupId>
	            <artifactId>fastjson</artifactId>
	            <version>1.2.37</version>
	        </dependency>
	        <!--结束-->
	使用
	String jsonString；
	JSONObject jsonObject= JSONObject.parseObject(jsonString);
	        String name=jsonObject.getString("name");
	        String base64=jsonObject.getString("base64");
	        String type=jsonObject.getString("type");
	        String caterId=jsonObject.getString("caterId");
### HttpMediaTypeNotAcceptableException: Could not find acceptable representation原因及解决方法
		request和resp设置的  contenttype  不一致
### ajax 跳入error的一些原因
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

### 打包 Error creating bean with name 'requestMappingHandlerAdapter' defined in class path resource
jackson-databind版本太低了

##1.DispatcherServlet
DispatcherServlet是前端控制器设计模式的实现，提供Spring Web MVC的集中访问点，而且负责职责的分派，而且与Spring IoC容器无缝集成，从而可以获得Spring的所有好处。
 
DispatcherServlet主要用作职责调度工作，本身主要用于控制流程，主要职责如下：
1、文件上传解析，如果请求类型是multipart将通过MultipartResolver进行文件上传解析；
2、通过HandlerMapping，将请求映射到处理器（返回一个HandlerExecutionChain，它包括一个处理器、多个HandlerInterceptor拦截器）；
3、  通过HandlerAdapter支持多种类型的处理器(HandlerExecutionChain中的处理器)；
4、通过ViewResolver解析逻辑视图名到具体视图实现；
5、本地化解析；
6、渲染具体的视图等；
7、如果执行过程中遇到异常将交给HandlerExceptionResolver来解析。

