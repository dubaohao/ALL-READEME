# 网络-HTTP篇

## 前端面试常见问题：

> **http method**

- `HTTP1.0`定义了三种请求方法： `GET`、`POST` 和 `HEAD`
- `HTTP1.1`新增了五种请求方法：`OPTIONS`、`PUT`、`PATCH`、`DELETE`、`TRACE` 、 `CONNECT`

> **http status code**

```
2开头 （请求成功）表示成功处理了请求的状态代码。

200   （成功）  服务器已成功处理了请求。 通常，这表示服务器提供了请求的网页。 
201   （已创建）  请求成功并且服务器创建了新的资源。 
202   （已接受）  服务器已接受请求，但尚未处理。 
203   （非授权信息）  服务器已成功处理了请求，但返回的信息可能来自另一来源。 
204   （无内容）  服务器成功处理了请求，但没有返回任何内容。 
205   （重置内容） 服务器成功处理了请求，但没有返回任何内容。
206   （部分内容）  服务器成功处理了部分 GET 请求。

3开头 （请求被重定向）表示要完成请求，需要进一步操作。 通常，这些状态代码用来重定向。

300   （多种选择）  针对请求，服务器可执行多种操作。 服务器可根据请求者 (user agent) 选择一项操作，或提供操作列表供请求者选择。 
301   （永久移动）  请求的网页已永久移动到新位置。 服务器返回此响应（对 GET 或 HEAD 请求的响应）时，会自动将请求者转到新位置。
302   （临时移动）  服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求。
303   （查看其他位置） 请求者应当对不同的位置使用单独的 GET 请求来检索响应时，服务器返回此代码。
304   （未修改） 自从上次请求后，请求的网页未修改过。 服务器返回此响应时，不会返回网页内容。 
305   （使用代理） 请求者只能使用代理访问请求的网页。 如果服务器返回此响应，还表示请求者应使用代理。 
307   （临时重定向）  服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求。

4开头 （请求错误）这些状态代码表示请求可能出错，妨碍了服务器的处理。

400   （错误请求） 服务器不理解请求的语法。 
401   （未授权） 请求要求身份验证。 对于需要登录的网页，服务器可能返回此响应。 
403   （禁止） 服务器拒绝请求。
404   （未找到） 服务器找不到请求的网页。
405   （方法禁用） 禁用请求中指定的方法。 
406   （不接受） 无法使用请求的内容特性响应请求的网页。 
407   （需要代理授权） 此状态代码与 401（未授权）类似，但指定请求者应当授权使用代理。
408   （请求超时）  服务器等候请求时发生超时。 
409   （冲突）  服务器在完成请求时发生冲突。 服务器必须在响应中包含有关冲突的信息。 
410   （已删除）  如果请求的资源已永久删除，服务器就会返回此响应。 
411   （需要有效长度） 服务器不接受不含有效内容长度标头字段的请求。 
412   （未满足前提条件） 服务器未满足请求者在请求中设置的其中一个前提条件。 
413   （请求实体过大） 服务器无法处理请求，因为请求实体过大，超出服务器的处理能力。 
414   （请求的 URI 过长） 请求的 URI（通常为网址）过长，服务器无法处理。 
415   （不支持的媒体类型） 请求的格式不受请求页面的支持。 
416   （请求范围不符合要求） 如果页面无法提供请求的范围，则服务器会返回此状态代码。 
417   （未满足期望值） 服务器未满足"期望"请求标头字段的要求。

5开头（服务器错误）这些状态代码表示服务器在尝试处理请求时发生内部错误。 这些错误可能是服务器本身的错误，而不是请求出错。

500   （服务器内部错误）  服务器遇到错误，无法完成请求。 
501   （尚未实施） 服务器不具备完成请求的功能。 例如，服务器无法识别请求方法时可能会返回此代码。 
502   （错误网关） 服务器作为网关或代理，从上游服务器收到无效响应。 
503   （服务不可用） 服务器目前无法使用（由于超载或停机维护）。 通常，这只是暂时状态。 
504   （网关超时）  服务器作为网关或代理，但是没有及时从上游服务器收到请求。 
505   （HTTP 版本不受支持） 服务器不支持请求中所用的 HTTP 协议版本。
复制代码
```

> **缓存**

- 客户端缓存
- 代理服务器缓存
- 缓存如何验证可用性

> `cache-control`：

- max-age=100      静态资源缓存100s
- public、private  设置只能在客户端缓存，还是可以通过代理服务器缓存
- must-revalidate  在缓存过期后必须到服务器端验证过才能继续使用缓存
- no-cache、no-store  控制是否使用缓存

> **缓存验证**

- `last-modified`配合`if-modified-since`
- `etage`配合`if-none-match`

```
缓存是web开发中对性能提升最大的一面
```

> **更有意义的头部**

- `Content-type`、`Content-Encoding`等用来约束数据类型
- `cookie`保持会话信息
- `CORS`实现跨域并保持安全性限制

> **深入到**`TCP`：

- 什么是三次握手
- HTTPS链接的创建过程，以及为什么HTTPS就是安全的
- 什么是长链接，为什么需要长链接
- HTTP2的信道复用为什么能提升性能

> **输入URL后HTTP请求返回的完整过程**



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1280" height="446"></svg>)



- 1、为什么一开始需要做redirect：因为浏览器可能记录了这个地址永久跳转成一个新的地址，一开始浏览器需要判断redirect，redirect到什么地址
- 2、看缓存：看请求的资源是否已经缓存
- 3、dns解析
- 4、创建连接
- 5、开始发送数据包

> Nginx

- 配置ngnix作为http的代理
- 开启ngnix的缓存功能
- 利用代理缓存提高http性能

## HTTP协议基础及发展历史

### 五层网络模型介绍



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1280" height="858"></svg>)



> - **物理层**：主要定义物理设备如何传输数据，硬件设备
> - **数据链路层**：在通信的实体间简历数据链路链接
> - **网络层**：为数据在节点之间传输创建逻辑链路
> - **传输层**：像用户提供可靠的端到端(End-to-End)服务
>   传输层向高层屏蔽了下层数据通信的细节
> - **应用层**:为应用软件提供了很多服务
>    构建于TCP协议之上
>    屏蔽了网络传输相关细节

### HTTP协议发展历史

> HTTP 0.9

- 1、只有一个命令GET
- 2、没有header等描述数据的信息
- 3、服务器发送完毕，就关闭了TCP连接

> HTTP1.0

- 1、增加了很多命令
- 2、增加status code和header
- 3、多字符集支持、多部分发送、权限、缓存等

> HTTP1.1

- 1、持久连接(建立TCP消耗)
- 2、pipeline(同一个链接可以发送多个请求，服务端是按照顺序接受，可能需要等待，串行)
- 3、增加host和其他一些命令

> HTTP2（尚未普及）

- 1、所有数据以二进制进行传输
- 2、同一个链接里面发送多个请求不再小按照顺序来(并行)
- 3、头信息压缩以及推送等提高效率的功能

### HTTP的三次握手



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1280" height="386"></svg>)



- 客户端和服务器端进行信息发送，是需要创建一个TCP-connetion
- http是不存在连接这个概念，只有请求和响应，它们都是数据包
- tcp链接可以发送多个http请求

> 三次握手时序图



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="994" height="714"></svg>)



### URI-URL和URN

> Uniform Resource Locator/统一资源定位器

```
http://user:pass@host.com:80/path?query=string#hash
复制代码
```

> URN:永久统一资源定位符

- 在资源移动之后还能找到
- 目前还没有非常成熟的使用方案

### HTTP报文格式



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1280" height="339"></svg>)



## HTTP各种特性总览

### CORS跨域请求的限制与解决

请求已经发送，已经获取到了返回数据。不过浏览器在解析返回的时候，发现是不允许的，浏览器拦截了，隐藏了数据。必须服务器允许跨越请求。

- 浏览器允许`link`、`script`、`img`这些在标签上写路径加载的时候，允许跨越，不管服务器是否允许跨域请求。`jsnop`原理也是如此
- 服务器端可以加： `'Access-Control-Allow-Origin': '*'`，表示允许跨域访问。'*'表示允许所有跨域访问，可以设置指定的服务器访问。多域可以动态判断

### CORS跨域限制以及预请求验证

> 不需要预请求的限制： (其余需要预请求验证后才能发送)

- 1、允许method： `GET`、`HEAD`、`POST`

- 2、允许`Content-Type`： `text/plain`、 `multipart/form-data`、 `application/x-www-form-urlencoded`

- 3、请求头限制： 

  - `Accept`

  - `Accept-Language`

  - `Content-Language`

  - `Last-Event-ID`

  - ```
    Content-Type
    ```

    ： 只限于三个值 

    - `application/x-www-form-urlencoded`、
    - `multipart/form-data`、
    - `text/plain`

- 4、`XMLHttpRequestUpload`对象军没有注册任何事件监听器

- 5、请求中没有使用`ReadableStream`

> 解决方法：

```
'Access-Control-Allow-Origin': 'http://127.0.0.1:8888',
'Access-Control-Allow-Headers': 'X-Test-Cors',   
'Access-Control-Allow-Methods': 'POST, PUT, DELETE',

'Access-Control-Max-Age': '1000'
//允许以这种方式发送预请求的时间，这段时间内不需要再发送预请求了
复制代码
```

### 缓存头`Cache-Control`的含义和使用

> 可缓存性

- `pulic` :`http`请求经过的任何路径都可以对返回内容的缓存
- `private`:只有发起请求的浏览器才可以进行缓存
- `non-cache`:任何节点都不可以进行缓存

> 到期：

- `max-age=<seconds>`
- `s-maxage=<seconds>`                 //如果两个都设置，代理服务器会读取这个，专为代理服务器设置
- `max-stale=<seconds>`                //只有在发起端设置才管用，即便`max-age`过期，只要在`max-stale`时间内仍然可以使用过期的缓存，服务端返回中设置没有作用

> 重新验证：

- 1、`must-revalidate`                                //设置了max-age中如果已经过期了，必须去原服务端重新发送请求，重新获取数据验证是否真的过期
- 2、`proxy-revalidate`                 //缓存服务器中
- 3、`no-store`                               //永远都要去服务器拿新的
- 4、`no-transform`                   //告诉代理服务器不可改动内容

> `cache-control` 应用

- 1、只是声明性的，并没有强制约束力
- 2、`chrome`  里面的`disable cache` 必须勾掉
- 3、`cache-control` 是一种客户端缓存，而且一般缓存时间都比较长，可能会导致服务端静态资源改变而客户端无法更新。解决方案：在静态资源文件后面加上一串哈希码，如果内容没有变，哈希码没变，可以使用静态资源缓存；如果文件有边，发的请求就是新的静态资源请求。

```
'Cache-Control': 'max-age=200,public'
复制代码
```

### 缓存验证`Last-Modefied` 和`Etag` 的使用

> 资源验证



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1280" height="617"></svg>)



#### `last-modified`

- 上次修改时间
- 配合`If-Modified-Since` 或者`If-Unmodified-Since` 使用

#### `Etag`

- 更加严格的验证
- 数据签名(任何的修改，唯一)，最典型的就是哈希计算得到唯一值
- 配合`If-Match` 或者`If-Non-Match`
- 对比资源的签名判断是否使用缓存

> 说明

- 1、`304:Not Modified`。资源没有修改，可以直接读缓存。会忽略`response body`里面的内容。
- 2、`If-Modified-since`和`If-None-Match`，`disable cache` 缓存验证头就不发送这两个参数。
- 3、如果设置了`no-store`会忽略所有跟缓存有关的

```
const http = require('http')
const fs = require('fs')

http.createServer(function(request, response) {
    console.log('request ', request.url)
    const html = fs.readFileSync('test.html', 'utf8')
    if (request.url === '/') {
        const html = fs.readFileSync('test.html', 'utf8')
        response.writeHead(200, {
            'Content-Type': 'text/html'
        })
        response.end(html)
    }
    if (request.url === '/script.js') {
        const html = fs.readFileSync('test.html', 'utf8')

        const etag = request.headers['if-none-match']
        if (request.getHeader = '777') {
            response.writeHead(304, {
                'Content-Type': 'text/javascript',
                'Cache-Control': 'max-age=2000000,no-cache',
                'Last-Modified': '123',
                'Etag': '777'
            })
            response.end('123')
        } else {
            response.writeHead(200, {
                'Content-Type': 'text/javascript',
                'Cache-Control': 'max-age=2000000,no-cache',
                'Last-Modified': '123',
                'Etag': '777'
            })
            response.end('console.log("script loadded")')
        }
    }
}).listen(8888)

console.log('serve listening on 8888')
复制代码
const http = require('http')
const fs = require('fs')

http.createServer(function(request, response) {
    console.log('request ', request.url)
    const html = fs.readFileSync('test.html', 'utf8')
    response.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Test-Cors'
    })
    response.end(html)
}).listen(8887)

console.log('serve listening on 8887')
复制代码
```

### `cookie` 和 `session`

> ```
> cookie
> ```

- 通过`Set-Cookie` 设置，同域请求中
- 下次请求会自动带上
- 键值对，可以设置多个

> `cookie` 属性

- `max-age`  和 `expires` 设置过期时间（如果不设置过期时间，关闭浏览器就关闭了）
- `secure` 只在`https` 的时候发送
- `httpOnly` 无法通过`document.cookie` 访问

```
'Set-Cookie':['id=12343,max-age=10,name=dafdafda';HttpOnly]
复制代码
```

不同域cookie不能获取，同一个主域名的二级域名可以共享cookie，通过`domain`这种方式。

```
'Set-Cookie':['id=12343,max-age=10,domain="test.com']
复制代码
```

### HTTP长连接

- 复用`TCP/IP` 连接
- 三次握手的开销可能不要比长连接消耗的高
- `Connection: keep-alive`
- `chrome` 一般六个并发
- `HTTP2` 信道复用

### 数据协商

> 请求

- `Accept` ：//返回数据类型
- `Accept-Encoding` ：//主要是如何数据压缩
- `Accept-Language` ://返回语言
- `User-Agent` ：//返回pc端还是移动端

> 返回

```
Content-Type：对应Accept
Content-Encoding:对应Accept-Encoding
Content-Language:对应Accept-Language
复制代码
X-Content-Type-Options:nosniff  //不会主动预测返回内容
复制代码
```

> 数据压缩

```
const zlib = require('zlib')
'Content-Encoding':'gzip'
复制代码
```

### `Redirect`

> `301 Moved Permanently`  被请求的资源已永久移动到新位置，并且将来任何对此资源的引用都应该使用本响应返回的若干个URI之一。如果可能，拥有链接编辑功能的客户端应当自动把请求的地址修改为从服务器反馈回来的地址。除非额外指定，否则这个响应也是可缓存的。 重定向在浏览器缓存中，如果用户不清理缓存，那么服务端没法控制

> `302 Found`
>  请求的资源现在临时从不同的URI响应请求。由于这样的重定向是临时的，客户端应当继续向原有地址发送以后的请求。只有在Cache-Control或Expires中进行了指定的情况下，这个响应才是可缓存的。

### `CSP内容安全策略`

> CSP定义了Content-Security-PolicyHTTP头来允许你创建一个可信来源的白名单，使得浏览器只执行和渲染来自这些来源的资源，而不是盲目信任服务器提供的所有内容。即使攻击者可以找到漏洞来注入脚本，但是因为来源不包含在白名单里，因此将不会被执行。

> 作用

- 限制资源获取
- 报告资源获取越权

> 限制方式

- `default-src` 限制全局跟链接有关的资源类型
- 制定资源类型

> 获取指令

- `connect-src`：限制能通过脚本接口加载的`URL`
- `default-src`：为其他取指令提供备用服务`fetch directives`
- `font-src`：限制通过`@font-face`加载的字体源。
- `frame-src`： 限制通过类似`<frame>`和`<iframe>` 标签加载的内嵌内容源。
- `img-src`: 限制图片和图标源
- `manifest-src` ： 限制 `application manifest` 文件源。
- `media-src` ：限制通过`<audio>` 或`<video>` 标签加载的媒体文件源。
- `object-src`：限制通过  `<object>`, `<embed>` ，`<applet>` 标签加载源。
- `script-src`：限制javascript 源。
- `style-src`：限制层叠样式表文件源。

> 文档指令:管理文档属性或者工作环境应用哪个策略。

- `base-uri` : 限制在`DOM`中使用`base`标签的`URL`
- `plugin-types`: 限制一系列可以通过一些限制类型的资源加载内嵌到`DOM`的插件。
- `sandbox`: 允许类似`{HTMLElement("iframe")}}` `sandbox sandbox`属性

> 导航指令: 导航指令管理用户能打开的链接或者表单可提交的链接

- `form-action`:限制能被用来作为给定上下文的表单提交的 目标 `URL`  （说白了，就是限制 `form`的`action` 属性的链接地址）
- `frame-ancestors` 指定可能嵌入页面的有效父项`<frame>`, `<iframe>`, `<object>`, `<embed>`, or `<applet>`
- `navigation-to` 限制文档可以通过以下任何方式访问`URL`` (a, form, window.location, window.open, etc.)`

> 报告指令节:报告指令控制 CSP违规的报告过程

- `report-uri` 当出现可能违反CSP的操作时，让客户端提交报告。这些违规报告会以JSON文件的格式通过POST请求发送到指定的URI
- `report-to` `Fires a SecurityPolicyViolationEvent`

> 其他指令

- `block-all-mixed-content`:当使用HTTPS加载页面时组织使用HTTP加载任何资源。

```
'Content-Security-Policy:'default-src http：https''
//只允许http和https加载
'Content-Security-Policy:'default-src \'selt\'';form-action \'self\'
//限制只能从本站外链脚本
```