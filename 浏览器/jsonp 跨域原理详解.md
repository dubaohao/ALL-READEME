# [jsonp 跨域原理详解](https://www.cnblogs.com/nuoyiamy/p/5445895.html)



[JavaScript](http://lib.csdn.net/base/18)是一种在Web开发中经常使用的前端动态脚本技术。在JavaScript中，有一个很重要的安全性限制，被称为“Same-Origin Policy”（同源策略）。这一策略对于JavaScript代码能够访问的页面内容做了很重要的限制，即JavaScript只能访问与包含它的文档在同一域下的内容。

JavaScript这个安全策略在进行多iframe或多窗口编程、以及Ajax编程时显得尤为重要。根据这个策略，在baidu.com下的页面中包含的JavaScript代码，不能访问在google.com域名下的页面内容；甚至不同的子域名之间的页面也不能通过JavaScript代码互相访问。对于Ajax的影响在于，通过XMLHttpRequest实现的Ajax请求，不能向不同的域提交请求，例如，在abc.example.com下的页面，不能向def.example.com提交Ajax请求，等等。

然而，当进行一些比较深入的前端编程的时候，不可避免地需要进行跨域操作，这时候“同源策略”就显得过于苛刻。JSONP跨域GET请求是一个常用的解决方案，下面我们来看一下JSONP跨域是如何实现的，并且探讨下JSONP跨域的原理。

利用在页面中创建<script>节点的方法向不同域提交HTTP请求的方法称为JSONP，这项技术可以解决跨域提交Ajax请求的问题。JSONP的工作原理如下所述：

假设在http://example1.com/index.php这个页面中向http://example2.com/getinfo.php提交GET请求，我们可以将下面的JavaScript代码放在http://example1.com/index.php这个页面中来实现：

 

Js代码  ![收藏代码](http://zha-zi.iteye.com/images/icon_star.png)

1. **var eleScript= document.createElement("script");**  
2.    eleScript.type = "text/javascript";  
3.    eleScript.src = "http://example2.com/getinfo.php";  
4.    document.getElementsByTagName("HEAD")[0].appendChild(eleScript);  

 

 

当GET请求从http://example2.com/getinfo.php返回时，可以返回一段JavaScript代码，这段代码会自动执行，可以用来负责调用http://example1.com/index.php页面中的一个callback函数。

JSONP的优点是：它不像XMLHttpRequest对象实现的Ajax请求那样受到同源策略的限制；它的兼容性更好，在更加古老的浏览器中都可以运行，不需要XMLHttpRequest或ActiveX的支持；并且在请求完毕后可以通过调用callback的方式回传结果。

JSONP的缺点则是：它只支持GET请求而不支持POST等其它类型的HTTP请求；它只支持跨域HTTP请求这种情况，不能解决不同域的两个页面之间如何进行JavaScript调用的问题。

再来一个例子：

Js代码  ![收藏代码](http://zha-zi.iteye.com/images/icon_star.png)

1. **var qsData = {**  
2. ​    'searchWord':$("#searchWord").attr("value"),  
3. ​    'currentUserId':$("#currentUserId").attr("value"),  
4. ​    'conditionBean.pageSize':$("#pageSize").attr("value")  
5. ​    };  
6. ​      
7. ​      
8. ​    $.ajax({  
9. ​        async:**false,**  
10. ​        url: http://跨域的dns/document!searchJSONResult.action,  
11. ​        type: "GET",  
12. ​        dataType: 'jsonp',  
13. ​        jsonp: 'jsoncallback',  
14. ​        data: qsData,  
15. ​        timeout: 5000,  
16. ​        beforeSend: **function(){**  
17. ​          //jsonp 方式此方法不被触发.原因可能是dataType如果指定为jsonp的话,就已经不是ajax事件了  
18. ​        },  
19. ​        success: **function (json) {//客户端jquery预先定义好的callback函数,成功获取跨域服务器上的json数据后,会动态执行这个callback函数**  
20. ​            **if(json.actionErrors.length!=0){**  
21. ​                alert(json.actionErrors);  
22. ​            },  
23. ​        }  
24. ​        genDynamicContent(qsData,type,json);  
25. ​        complete: **function(XMLHttpRequest, textStatus){**  
26. ​            $.unblockUI({ fadeOut: 10 });  
27. ​        },  
28. ​        error: **function(xhr){**  
29. ​          //jsonp 方式此方法不被触发.原因可能是dataType如果指定为jsonp的话,就已经不是ajax事件了  
30. ​          //请求出错处理  
31. ​          alert("请求出错(请检查相关度网络状况.)");  
32. ​        }  
33. ​    });  

有时也会看到这样的写法：

Js代码  ![收藏代码](http://zha-zi.iteye.com/images/icon_star.png)

1. $.getJSON("http://跨域的dns/document!searchJSONResult.action?   name1="+value1+"&jsoncallback=?",  
2.  **function(json){**  
3.  **if(json.属性名==值){**  
4.  // 执行代码  
5.  }  
6. });  

 

这种方式其实是上例$.ajax({..}) api的一种高级封装，有些$.ajax api底层的参数就被封装而不可见了。

这样，[jQuery](http://lib.csdn.net/base/22)就会拼装成如下的url get请求：

Js代码  ![收藏代码](http://zha-zi.iteye.com/images/icon_star.png)

1. http://跨域的dns/document!searchJSONResult.action?&jsoncallback=jsonp1236827957501&_=1236828192549&searchWord=%E7%94%A8%E4%BE%8B&currentUserId=5351&conditionBean.pageSize=15  

 

在响应端(http://跨域的dns/document!searchJSONResult.action)，通过 jsoncallback = request.getParameter("jsoncallback") 得到jquery端随后要回调的js function name:jsonp1236827957501 然后 response的内容为一个Script Tags:"jsonp1236827957501("+按请求参数生成的json数组+")"; jquery就会通过回调方法动态加载调用这个js tag:jsonp1236827957501(json数组); 这样就达到了跨域数据交换的目的。

#### JSONP原理

JSONP的最基本的原理是：动态添加一个<script>标签，而script标签的src属性是没有跨域的限制的。这样说来，这种跨域方式其实与ajax XmlHttpRequest协议无关了。

这样其实"jQuery AJAX跨域问题"就成了个伪命题，jquery $.ajax方法名有误导人之嫌。

如果设为dataType: 'jsonp'，这个$.ajax方法就和ajax XmlHttpRequest没什么关系了，取而代之的则是JSONP协议。JSONP是一个非官方的协议，它允许在服务器端集成Script tags返回至客户端，通过javascript callback的形式实现跨域访问。

JSONP即JSON with Padding。由于同源策略的限制，XmlHttpRequest只允许请求当前源（域名、协议、端口）的资源。如果要进行跨域请求， 我们可以通过使用html的script标记来进行跨域请求，并在响应中返回要执行的script代码，其中可以直接使用JSON传递javascript对象。 这种跨域的通讯方式称为JSONP。

jsonCallback 函数jsonp1236827957501(....)：是浏览器客户端注册的，获取跨域服务器上的json数据后，回调的函数

Jsonp的执行过程如下：

首先在客户端注册一个callback (如:'jsoncallback'), 然后把callback的名字(如:jsonp1236827957501)传给服务器。注意：服务端得到callback的数值后，要用jsonp1236827957501(......)把将要输出的json内容包括起来，此时，服务器生成 json 数据才能被客户端正确接收。

然后以 javascript 语法的方式，生成一个function， function 名字就是传递上来的参数 'jsoncallback'的值 jsonp1236827957501 .

最后将 json 数据直接以入参的方式，放置到 function 中，这样就生成了一段 js 语法的文档，返回给客户端。

客户端浏览器，解析script标签，并执行返回的 javascript 文档，此时javascript文档数据，作为参数， 传入到了客户端预先定义好的 callback 函数(如上例中jquery $.ajax()方法封装的的success: function (json))里。

可以说jsonp的方式原理上和<script src="http://跨域/...xx.js"></script>是一致的(qq空间就是大量采用这种方式来实现跨域数据交换的)。JSONP是一种脚本注入(Script Injection)行为，所以有一定的安全隐患。

那jquery为什么不支持post方式跨域呢？

虽然采用post+动态生成iframe是可以达到post跨域的目的(有位js牛人就是这样把jquery1.2.5 打patch的)，但这样做是一个比较极端的方式，不建议采用。

也可以说get方式的跨域是合法的，post方式从安全角度上，被认为是不合法的，万不得已还是不要剑走偏锋。

client端跨域访问的需求看来也引起w3c的注意了，看资料说html5 WebSocket标准支持跨域的数据交换，应该也是一个将来可选的跨域数据交换的解决方案。

来个超简单的例子：

Html代码  ![收藏代码](http://zha-zi.iteye.com/images/icon_star.png)

1. <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">   
2. <html xmlns="http://www.w3.org/1999/xhtml" >   
3. <head>   
4. <title>Test Jsonp</title>  
5.    <script type="text/javascript">   
6.  function jsonpCallback(result)  
7.   {   
8.   alert(result.msg);   
9.  }   
10.  </script>  
11.  <script type="text/javascript"src="http://crossdomain.com/jsonServerResponse?jsonp=jsonpCallback"></script>   
12. </head>   
13. <body>  
14. </body>  
15. </html>    

 

其中 jsonCallback 是客户端注册的，获取跨域服务器上的json数据后，回调的函数。http://crossdomain.com/jsonServerResponse?jsonp=jsonpCallback 这个 url 是跨域服务器取 json 数据的接口，参数为回调函数的名字，返回的格式为：jsonpCallback({msg:'this is json data'})

简述原理与过程：首先在客户端注册一个callback, 然后把callback的名字传给服务器。此时，服务器先生成 json 数据。 然后以 javascript 语法的方式，生成一个function , function 名字就是传递上来的参数 jsonp。最后将 json 数据直接以入参的方式，放置到 function 中，这样就生成了一段 js 语法的文档，返回给客户端。

客户端浏览器，解析script标签，并执行返回的 javascript 文档，此时数据作为参数，传入到了客户端预先定义好的 callback 函数里。（动态执行回调函数）

 

## 其他跨域方式

**3、使用window.name来进行跨域**

window对象有个name属性，该属性有个特征：即在一个窗口(window)的生命周期内,窗口载入的所有的页面都是共享一个window.name的，每个页面对window.name都有读写的权限，window.name是持久存在一个窗口载入过的所有页面中的，并不会因新页面的载入而进行重置。

比如：有一个页面a.html,它里面有这样的代码：

[![QQ截图20130613230631](https://images0.cnblogs.com/blog/130623/201307/15184534-ebbe36523151419cb20df7beb37c277a.png)](https://images0.cnblogs.com/blog/130623/201307/15184534-769ff1574c304d11accd26cbbbd1f9da.png)

再看看b.html页面的代码：

[![QQ截图20130613230631](https://images0.cnblogs.com/blog/130623/201307/15184535-b6c0bc2e37df40f1ae3b113a08e9edb4.png)](https://images0.cnblogs.com/blog/130623/201307/15184535-fd6a9a0604754241a8f8947ced97b8e9.png)

a.html页面载入后3秒，跳转到了b.html页面，结果为：

[![QQ截图20130613230631](https://images0.cnblogs.com/blog/130623/201307/15184537-26ab92ec8cdc444f8b9fa6fc62ed78fb.png)](https://images0.cnblogs.com/blog/130623/201307/15184536-5eadbc78e1fc4c8bb573aefa486ca52c.png)

我们看到在b.html页面上成功获取到了它的上一个页面a.html给window.name设置的值。如果在之后所有载入的页面都没对window.name进行修改的话，那么所有这些页面获取到的window.name的值都是a.html页面设置的那个值。当然，如果有需要，其中的任何一个页面都可以对window.name的值进行修改。注意，window.name的值只能是字符串的形式，这个字符串的大小最大能允许2M左右甚至更大的一个容量，具体取决于不同的浏览器，但一般是够用了。

上面的例子中，我们用到的页面a.html和b.html是处于同一个域的，但是即使a.html与b.html处于不同的域中，上述结论同样是适用的，这也正是利用window.name进行跨域的原理。

下面就来看一看具体是怎么样通过window.name来跨域获取数据的。还是举例说明。

比如有一个[www.example.com/a.html](http://www.example.com/a.html)页面,需要通过a.html页面里的js来获取另一个位于不同域上的页面[www.cnblogs.com/data.html](http://www.cnblogs.com/data.html)里的数据。

data.html页面里的代码很简单，就是给当前的window.name设置一个a.html页面想要得到的数据值。data.html里的代码：

[![QQ截图20130613230631](https://images0.cnblogs.com/blog/130623/201307/15184539-7a190a2eb9d5464787a124f5e2c6a06d.png)](https://images0.cnblogs.com/blog/130623/201307/15184538-f329d65db57d49c3b89bef6d413e34ad.png)

那么在a.html页面中，我们怎么把data.html页面载入进来呢？显然我们不能直接在a.html页面中通过改变window.location来载入data.html页面，因为我们想要即使a.html页面不跳转也能得到data.html里的数据。答案就是在a.html页面中使用一个隐藏的iframe来充当一个中间人角色，由iframe去获取data.html的数据，然后a.html再去得到iframe获取到的数据。

充当中间人的iframe想要获取到data.html的通过window.name设置的数据，只需要把这个iframe的src设为[www.cnblogs.com/data.html](http://www.cnblogs.com/data.html)就行了。然后a.html想要得到iframe所获取到的数据，也就是想要得到iframe的window.name的值，还必须把这个iframe的src设成跟a.html页面同一个域才行，不然根据前面讲的同源策略，a.html是不能访问到iframe里的window.name属性的。这就是整个跨域过程。

看下a.html页面的代码：

[![QQ截图20130613230631](https://images0.cnblogs.com/blog/130623/201307/15184543-f3faad8733be4d838b306cece051a88b.png)](https://images0.cnblogs.com/blog/130623/201307/15184543-65fe0b2b8a634af1b583b7ad4fff50be.png)

上面的代码只是最简单的原理演示代码，你可以对使用js封装上面的过程，比如动态的创建iframe,动态的注册各种事件等等，当然为了安全，获取完数据后，还可以销毁作为代理的iframe。网上也有很多类似的现成代码，有兴趣的可以去找一下。

通过window.name来进行跨域，就是这样子的。

 

 

**使用HTML5中新引进的window.postMessage方法来跨域传送数据**

window.postMessage(message,targetOrigin)  方法是html5新引进的特性，可以使用它来向其它的window对象发送消息，无论这个window对象是属于同源或不同源，目前IE8+、FireFox、Chrome、Opera等浏览器都已经支持window.postMessage方法。

调用postMessage方法的window对象是指要接收消息的那一个window对象，该方法的第一个参数message为要发送的消息，类型只能为字符串；第二个参数targetOrigin用来限定接收消息的那个window对象所在的域，如果不想限定域，可以使用通配符 *  。

需要接收消息的window对象，可是通过监听自身的message事件来获取传过来的消息，消息内容储存在该事件对象的data属性中。

上面所说的向其他window对象发送消息，其实就是指一个页面有几个框架的那种情况，因为每一个框架都有一个window对象。在讨论第二种方法的时候，我们说过，不同域的框架间是可以获取到对方的window对象的，而且也可以使用window.postMessage这个方法。下面看一个简单的示例，有两个页面

[![QQ截图20130613230631](https://images0.cnblogs.com/blog/130623/201307/15184545-4d435286d9974c65890ececbce8be9b7.png)](https://images0.cnblogs.com/blog/130623/201307/15184544-594f30a8bacd4da0a4a2293f63f53534.png)

 

[![QQ截图20130613230631](https://images0.cnblogs.com/blog/130623/201307/15184546-6d54ada26b1a47cc8d856b0cd90d6017.png)](https://images0.cnblogs.com/blog/130623/201307/15184545-4285b632b74c4abea9aba5ecb2587f5a.png)

我们运行a页面后得到的结果:

[![QQ截图20130613230631](https://images0.cnblogs.com/blog/130623/201307/15184547-c3c3317b3a674b9c8bfb65b1898e1829.png)](https://images0.cnblogs.com/blog/130623/201307/15184547-b7a7e7b771054807b112248f39201e53.png)

我们看到b页面成功的收到了消息。

使用postMessage来跨域传送数据还是比较直观和方便的，但是缺点是IE6、IE7不支持，所以用不用还得根据实际需要来决定。

 

**结语：**

除了以上几种方法外，还有flash、在服务器上设置代理页面等跨域方式，这里就不做介绍了。

以上四种方法，可以根据项目的实际情况来进行选择应用，个人认为window.name的方法既不复杂，也能兼容到几乎所有浏览器，这真是极好的一种跨域方法。