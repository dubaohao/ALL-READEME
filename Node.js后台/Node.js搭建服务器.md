# node.js搭建服务器

##  一、聊一聊

### 1.聊聊Node.js

| 框架    | 说明    | 对应 | 特性                            |
| ------- | ------- | ---- | ------------------------------- |
| express | web框架 | ES5  | 回调嵌套                        |
| koa     | web框架 | ES6  | Generator函数+yield语句+Promise |
| koa2    | web框架 | ES7  | async/await+Promise             |

没有express之前，使用Node.js基础模块构建应用

```node.js
var http = require('http')
http.createServer(function (req, res) {       
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Hello World\n')
}).listen(1337, "127.0.0.1")

console.log('Server running at http://127.0.0.1:3000/')
```



### 2.聊聊Express

Express--基于NodeJS平台，快速，开发，极简的web开发框架。

>  在**node.js**和**V8 JavaScript引擎**上构建的疯狂快速（和小型）服务器端JavaScript Web开发框架。

Express包含application request response router 四大模块。

Express在NodeJS的基础上完成二次抽象，封装处理细节向上提供丰富的模块方法以用来构建web应用，在此开发者只需通过这些功能方法开发中间件，扩展构建Web应用。作为两个框架中最早诞生者，经过长时间的发展完善，Express更为成熟，资料丰富。

在node圈中如同Dom库中Jquery版的存在，但是如上表所示，Express基于Es5语法，通过回调组合逻辑（类比如同jQuery中的ajax方法），回调的硬伤在于不可组合，难以捕获，在复杂逻辑中会包含大量回调嵌套，也就是常说的回调地狱，以及调试问题。但Express也足以成为NodeJS框架中的经典，当下Es6，Es7盛行，可以通过相关三方库完善支持Promise或Async/Await来弥补。

```node.js
var express = require('express')
var app = express()
app.get('/', function (req, res) {  
	res.send('Hello World!')
})
var server = app.listen(3000, function () {  
	var host = server.address().address
	var port = server.address().port
	console.log('Example app listening at http://%s:%s', host, port)

})
```

### 3.聊聊Koa

Koa 是由 Express 原班人马打造的，致力于成为一个更小、更富有表现力、更健壮的 Web 框架。 

使用 Koa 编写 web 应用，通过组合不同的 Generator，可以免除重复繁琐的回调函数嵌套， 并极大地提升错误处理的效率。

Koa 不在内核方法中绑定任何中间件， 它仅仅提供了一个轻量优雅的函数库，使得编写 Web 应用变得得心应手。

Koa 中也包含4个主要模块，Application、Request、Response、Context。

Koa 定位为基础框架，相比Express更加小巧，几乎所有功能都通过中间件来完成，相应的Router模块从核心模块中去除，需通过中间件的形式集成，Koa 中三方router模块近20余种，开发者可以根据需求选择需要的模块集成或封装自己的模块用于构建应用，非常灵活，在Koa 几乎没有任何限制去自由构建自己的应用，同时Koa 不断追随Esmascript规范，解决Express痛点，从一代generator函数到二代Async/Await,备受青睐。

```
var koa = require('koa');
var app = koa();

app.use(function *() {
    this.body = 'Hello world';
});

var server = app.listen(3000, function() {
    console.log('Koa is listening to http://localhost:3000');
});
```

### 4.聊聊Hapi

 用于构建应用程序和服务的丰富框

hapi使开发人员能够专注于编写可重用的应用程序逻辑，而不是花时间构建基础架构。

Hapi是由[Postmile](https://github.com/hueniverse/postmile)的部分创建的，最初构建在Express之上。后来它被开发成自己的框架，因为Erin州在他的博客中：

> hapi是围绕**配置优于代码**的想法创建的，**业务逻辑必须与传输层隔离** ...

```node.js
var Hapi = require('hapi');
var server = new Hapi.Server(3000);

server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
        reply('Hello world');
    }
});

server.start(function() {
    console.log('Hapi is listening to http://localhost:3000');
});
```

Hapi是该集团中独一无二的。首先，总是需要hapi `app`，但不是实例化hapi ，而是创建一个新的Server并指定端口。在Express和Koa中我们得到一个回调函数，但在Hapi中我们得到一个新`server`对象。然后，一旦我们调用，`server.start()`我们在端口3000上启动服务器，然后返回一个回调。然而，这不像Koa和Express，它不是一个包装器`http.CreateServer()`，它使用它自己的逻辑。



## 二、撘一搭

### 1.Express

假设您已经安装了[Node.js](https://nodejs.org/)，请创建一个目录来保存您的应用程序，并将其作为您的工作目录。

```sh
$ mkdir myapp
$ cd myapp
```

使用该`npm init`命令`package.json`为应用程序创建文件。有关`package.json`工作原理的更多信息，请参阅[npm的package.json处理的细节](https://docs.npmjs.com/files/package.json)。

```sh
$ npm init
```

此命令会提示您输入许多内容，例如应用程序的名称和版本。现在，您可以简单地按RETURN接受大多数的默认值，但以下情况除外：

```sh
entry point: (index.js)
```

输入`app.js`或者您想要的主文件名称。如果您想要它，请按`index.js`RETURN接受建议的默认文件名。

现在在`myapp`目录中安装Express 并将其保存在依赖项列表中。例如：

```sh
$ npm install express --save
```

要临时安装Express而不将其添加到依赖项列表：

```sh
$ npm install express --no-save
```

#### Express应用程序生成器

使用应用程序生成器工具，`express-generator`快速创建应用程序框架。

该`express-generator`软件包安装`express`命令行工具。使用以下命令执行此操作：

```sh
$ npm install express-generator -g
```

例如，以下内容创建名为*myapp*的Express应用程序。该应用程序将在当前工作目录中名为*myapp*的文件夹中创建，并且视图引擎将设置为[Pug](https://pugjs.org/)：

```sh
$ express --view=pug myapp

   create : myapp
   create : myapp/package.json
   create : myapp/app.js
   create : myapp/public
   create : myapp/public/javascripts
   create : myapp/public/images
   create : myapp/routes
   create : myapp/routes/index.js
   create : myapp/routes/users.js
   create : myapp/public/stylesheets
   create : myapp/public/stylesheets/style.css
   create : myapp/views
   create : myapp/views/index.pug
   create : myapp/views/layout.pug
   create : myapp/views/error.pug
   create : myapp/bin
   create : myapp/bin/www
```

然后安装依赖项：

```sh
$ cd myapp
$ npm install
```

在MacOS或Linux上，使用以下命令运行应用程序：

```sh
$ DEBUG=myapp:* npm start
```

在Windows上，使用此命令：

```sh
> set DEBUG=myapp:* & npm start
```

然后`http://localhost:3000/`在浏览器中加载以访问该应用程序。

生成的应用程序具有以下目录结构：

```sh
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.pug
    ├── index.pug
    └── layout.pug

7 directories, 9 files
```

#### 基本路由

*路由*是指确定应用程序如何响应对特定端点的客户端请求，该请求是URI（或路径）和特定HTTP请求方法（GET，POST等）。

每个路由都可以有一个或多个处理函数，这些函数在路由匹配时执行。

路径定义采用以下结构：

```javascript
app.METHOD(PATH, HANDLER)
```

哪里：

- `app`是一个实例`express`。
- `METHOD`是一个[HTTP请求方法](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods)，小写。
- `PATH` 是服务器上的路径。
- `HANDLER` 是路由匹配时执行的功能。

本教程假定已创建`express`named 实例`app`并且服务器正在运行。如果您不熟悉创建应用程序并启动它，请参阅[Hello world示例](http://expressjs.com/en/starter/hello-world.html)。

以下示例说明了定义简单路由。

`Hello World!`在主页上回复：

```javascript
app.get('/', function (req, res) {
  res.send('Hello World!')
})
```

在根路由（`/`），应用程序的主页上响应POST请求：

```javascript
app.post('/', function (req, res) {
  res.send('Got a POST request')
})
```

响应对`/user`路由的PUT请求：

```javascript
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})
```

响应对`/user`路由的DELETE请求：

```javascript
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})
```

#### 在Express中提供静态文件

要提供静态文件（如图像，CSS文件和JavaScript文件），请使用`express.static`Express中的内置中间件功能。

功能签名是：

```javascript
express.static(root, [options])
```

该`root`参数指定从中提供静态资产的根目录。有关`options`参数的更多信息，请参阅[express.static](http://expressjs.com/en/4x/api.html#express.static)。

例如，使用以下代码在名为的目录中提供图像，CSS文件和JavaScript文件`public`：

```javascript
app.use(express.static('public'))
```

现在，您可以加载`public`目录中的文件：

```plain-text
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
```

Express会查找相对于静态目录的文件，因此静态目录的名称不是URL的一部分。

要使用多个静态资产目录，请`express.static`多次调用中间件函数：

```javascript
app.use(express.static('public'))
app.use(express.static('files'))
```

Express按照使用`express.static`中间件功能设置静态目录的顺序查找文件。

注意：为获得最佳结果，请[使用反向代理](http://expressjs.com/en/advanced/best-practice-performance.html#use-a-reverse-proxy)缓存来提高服务静态资产的性能。

要为该`express.static`函数提供的文件创建虚拟路径前缀（文件系统中实际不存在该路径），请为静态目录[指定安装路径](http://expressjs.com/en/4x/api.html#app.use)，如下所示：

```javascript
app.use('/static', express.static('public'))
```

现在，您可以`public`从`/static`路径前缀加载目录中的文件。

```plain-text
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
```

但是，您提供给该`express.static`函数的路径是相对于启动`node`进程的目录。如果您从另一个目录运行快速应用程序，则使用您要提供的目录的绝对路径更安全：

```javascript
app.use('/static', express.static(path.join(__dirname, 'public')))
```

有关该`serve-static`函数及其选项的更多详细信息，请参阅[serve-static](http://expressjs.com/en/resources/middleware/serve-static.html)。

#### 常问问题

##### 我该如何构建我的应用程序？

这个问题没有明确的答案。答案取决于您的应用程序规模和所涉及的团队。为了尽可能灵活，Express在结构方面没有做出任何假设。

在您喜欢的任何目录结构中，路由和其他特定于应用程序的逻辑可以存在于您希望的任意数量的文件中。查看以下示例以获取灵感：

- [路线列表](https://github.com/strongloop/express/blob/4.13.1/examples/route-separation/index.js#L32-L47)
- [路线地图](https://github.com/strongloop/express/blob/4.13.1/examples/route-map/index.js#L52-L66)
- [MVC风格控制器](https://github.com/strongloop/express/tree/master/examples/mvc)

此外，还有Express的第三方扩展，简化了其中一些模式：

- [资源丰富的路由](https://github.com/expressjs/express-resource)

##### 我如何定义模型？

Express没有数据库的概念。这个概念由第三方节点模块决定，允许您与几乎任何数据库进行交互。

请参阅[LoopBack，](http://loopback.io/)了解以模型为中心的基于Express的框架。

##### 如何验证用户身份？

身份验证是Express不会冒险的另一个意见领域。您可以使用任何您想要的身份验证方案。有关简单的用户名/密码方案，请参阅[此示例](https://github.com/expressjs/express/tree/master/examples/auth)。

##### Express支持哪些模板引擎？

Express支持符合`(path, locals, callback)`签名的任何模板引擎。要规范化模板引擎接口和缓存，请参阅 [consolidate.js](https://github.com/visionmedia/consolidate.js) 项目以获取支持。未列出的模板引擎可能仍然支持Express签名。

有关更多信息，请参阅[使用Express的模板引擎](http://expressjs.com/en/guide/using-template-engines.html)。

##### 我该如何处理404回复？

在Express中，404响应不是错误的结果，因此错误处理程序中间件不会捕获它们。这种行为是因为404响应只是表明没有额外的工作要做; 换句话说，Express已经执行了所有中间件功能和路由，并发现它们都没有响应。您需要做的就是在堆栈的最底部添加一个中间件函数（在所有其他函数之下）来处理404响应：

```javascript
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})
```

在运行时动态添加路由，`express.Router()` 因此路由不会被中间件功能取代。

##### 如何设置错误处理程序？

您可以使用与其他中间件相同的方式定义错误处理中间件，除了使用四个参数而不是三个参数; 特别是签名`(err, req, res, next)`：

```javascript
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

有关更多信息，请参阅[错误处理](http://expressjs.com/en/guide/error-handling.html)。

##### 如何呈现纯HTML？

你没有！没有必要使用该`res.render()`函数“呈现”HTML 。如果您有特定文件，请使用该`res.sendFile()`功能。如果要从目录提供许多资产，请使用`express.static()` 中间件功能。

### *实战*

开发一个实时更新的预告片网站

网站： 首页-播放器-详情页-同类推荐-后天登录-后台管理界面等

技术栈：Koa2 + Nodejs + MongoDB + Puppeteer + Parcel + AntDesign

> 1.Koa框架API

> 1.1 Koa核心对象

`HTTP` `接收` `解析` `响应` `中间件` `执行上下文`

`Application` `Context` `Request Response` `Middlewares` `Session` `Cokkie`

```
var koa = require('koa');
var app = new koa();

app.use(async (ctx,next) {
    ctx.body = 'Hello world';
});
app.listen(3000)
```

> 1.2 web服务类 application

> 1.3 http上下文对象

> 1.4 http请求对象request

> 1.5 http 响应对象

> 1.6 Koa中间件 middlewares

> 1.7 纯函数-尾递归与魔法大师

> 1.8 session-cookie-路由

> 2.1设计与分析