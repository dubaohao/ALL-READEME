# Spring-dubaohao

## 1.DispatcherServlet

DispatcherServlet是前端控制器设计模式的实现，提供Spring Web MVC的集中访问点，而且负责职责的分派，而且与Spring IoC容器无缝集成，从而可以获得Spring的所有好处。

**DispatcherServlet**主要用作职责调度工作，本身主要用于控制流程，主要职责如下：

- 1、文件上传解析，如果请求类型是multipart将通过MultipartResolver进行文件上传解析；
- 2、通过HandlerMapping，将请求映射到处理器（返回一个HandlerExecutionChain，它包括一个处理器、多个HandlerInterceptor拦截器）；
- 3、  通过HandlerAdapter支持多种类型的处理器(HandlerExecutionChain中的处理器)；
- 4、通过ViewResolver解析逻辑视图名到具体视图实现；
- 5、本地化解析；
- 6、渲染具体的视图等；
- 7、如果执行过程中遇到异常将交给HandlerExceptionResolver来解析。

# 0走过的坑，流过的泪

### 1.打包jar

**maven的install**
		

	保持jar包在后台运行
		nohup java -jar ***.jar &
### 2.文件上传下载

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

### 3.springboot2
​	 servlet:
​	    multipart:
​	      #单位是Mb，会报错格式不对
​	      max-file-size: 10MB
​	      max-request-size: 100MB

### 4.报错  The valid characters are defined in RFC 7230 and RFC 3986

​	tomcat8之后，编码变了，url要用encodeURI（）处理
​	var url2=encodeURI("http://localhost:8080/TM/util/fileUpload?caterId=1");

### 5.Json字符串处理成JSON格式
​	依赖
​	<!--//json字符串转换成json格式-->
​	        <dependency>
​	            <groupId>com.fasterxml.jackson.core</groupId>
​	            <artifactId>jackson-databind</artifactId>
​	            <version>2.6.0</version>
​	        </dependency>
​	        <dependency>
​	            <groupId>com.alibaba</groupId>
​	            <artifactId>fastjson</artifactId>
​	            <version>1.2.37</version>
​	        </dependency>
​	        <!--结束-->
​	使用
​	String jsonString；
​	JSONObject jsonObject= JSONObject.parseObject(jsonString);
​	        String name=jsonObject.getString("name");
​	        String base64=jsonObject.getString("base64");
​	        String type=jsonObject.getString("type");
​	        String caterId=jsonObject.getString("caterId");

### 6.HttpMediaTypeNotAcceptableException: Could not find acceptable representation原因及解决方法
		request和resp设置的  contenttype  不一致

### 7.打包 Error creating bean with name 'requestMappingHandlerAdapter' defined in class path resource
jackson-databind版本太低了

