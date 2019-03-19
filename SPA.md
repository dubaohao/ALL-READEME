# SPA

# [如何快速开发SPA应用](https://www.cnblogs.com/constantince/p/5586851.html)

### 前言

web早已经进入了2.0时代了，如今的网页大有往系统应用级别的方向发展的趋势，再也不是以前的简单展示信息的界面了。如今很多webapp已经做到了原生应用的功能，并且运用自身的优势逐步取代之。HTML5也很给力，对多平台，多屏幕设备的良好兼容性使得前端工程师们在各种平台上大显身手。卤煮两年前进公司接到的也是一个SPA应用的项目，也颇有些自己的心得，今日就写篇博文，与大家分享下。

### SPA

单页 Web 应用 (single-page application 简称为 SPA) 是一种特殊的 Web 应用。它将所有的活动局限于一个Web页面中，仅在该Web页面初始化时加载相应的HTML、JavaScript 和 CSS。一旦页面加载完成了，SPA不会因为用户的操作而进行页面的重新加载或跳转。取而代之的是利用 JavaScript 动态的变换HTML的内容，从而实现UI与用户的交互。由于避免了页面的重新加载，SPA 可以提供较为流畅的用户体验。得益于ajax，我们可以实现无跳转刷新，又多亏了浏览器的histroy机制，我们用hash的变化从而可以实现推动界面变化。从而模拟元素客户端的单页面切换效果：

![img](https://images2015.cnblogs.com/blog/612959/201606/612959-20160614164908198-1213617628.png)

 

### 优缺点

SPA被人追捧是有道理的，但是它也有不足之处。当然任何东西都有两面性，以下是卤煮总结的一些目前SPA的优缺点：

**优点：**

1.无刷新界面，给用户体验原生的应用感觉

2.节省原生（android和ios）app开发成本

3.提高发布效率，无需每次安装更新包。这个对于ios开发人员来说印象尤其深吧。

4.容易借助其他知名平台更有利于营销和推广

5.符合web2.0的趋势

**缺点：**

1.效果和性能确实和原生的有较大差距

2.各个浏览器的版本兼容性不一样

3.业务随着代码量增加而增加，不利于首屏优化

4.某些平台对hash有偏见，有些甚至不支持pushstate。（你懂的）

5.不利于搜索引擎抓取

 

### 框架

一种开发模式火起来之后，对应的框架会随之而起。像近几年比较火的angularJS,是目前中最流行的mvvm框架，非常适合做SPA；与之类似的还有vueJS，卤煮在项目中也用过，相对于前者比较轻量。还有早一些的backbone，提供最基本的mvc模式，其他的模块大小和细节得自己决定。最早接触的应该是extjs吧，这头超级巨无霸在很早的时候被用来创建企业后台应用，如今也跟着时代的变化做出了很多的改进。等等这些框架也好，库也好，都旨在为了更好的构建SPA应用而生的，它们优缺点卤煮就不在此一一提了。

### hash值

在此处提到一个比较重要的概念：URL中的井号。其实它只是浏览地址中的一个特殊符号。在以前，我们经常用它来定位文档位置。例如以下代码：

```
`<``a` `href="target">go target</``a``>``......``<``div` `id="target">i am target place</``div``>`
```

点击a链接，文档会滚动到id为target的div的可视区域上面去。hash除了这个功能还有另一一种含义：指导浏览器的行为但不上传到服务器。大家都知道，改变url中的任何一个字符都会导致浏览器重新请求服务器，除了#号后面那段字符之外。所以，简而言之我们可以这样理解：改变#后面的值不触发网页重载，但会记录到浏览器history中去。

### 实现原理

实现SPA的方法有很多，终归一种遵循一种原则，界面无刷新。如果要实现原生应用中类似许多不同页面切换的效果，我们采用的是div切换显示和隐藏。而驱动div显示隐藏的方式有很多种

1.监听地址栏中hash变化驱动界面变化

2.用pushsate记录浏览器的历史，驱动界面发送变化

3.直接在界面用普通事件驱动界面变化

前两种方式较为普遍，因为它们的变化记录浏览器会保存在history中，可以通过回退/前进按钮找回，或者history对象中的方法控制。最后一种方法是用普通事件驱动的，没有改变浏览器的history对象，所以一旦用户按了返回按钮将会退到浏览器的主界面。所以，一般采用前两种方式。值得一提的是，在不支持hash监听和pushsate变化的浏览器中可以考虑用延时函数，不停得去监听浏览器地址栏中url发生的变化，从而驱动界面变化。

 

### 从零开始

卤煮在很久之前的一篇博文用pushstate的变化做了一个小小的示例，大家可以在之前的[博文](http://www.cnblogs.com/constantince/p/4560897.html)中找到它。在这里，我们用监听hash变化的方式展示SPA是怎么样运行工作的，同时从零开始，搭建一个基础的SPA。帮助大家理解简单的单界面应用的原理。

首先，我们画出三个div，它们实际上是作为三个界面存在界面上的，body作为界面外框容器，限制着它们的大小。为了给每个界面配对一个hash地址，我们给每个div配一个id，讲hash地址与对应的选择器（id、class）建立链接关系，从而可以从hash变化值中操作界面。

```
`<``body``>``  ``<``div` `id="A" class="a J-A">A</``div``>``  ``<``div` `id="B" class="b J-B">B</``div``>``  ``<``div` `id="C" class="c J-C">C</``div``>``</``body``>`
```

接下来，为它们添加样式，每个div都是全屏的，一开始只有A界面显示，其他的都隐藏之：

```
`body {``  ``height``: ``500px``;``  ``width``: ``100%``;``  ``margin``: ``0``;``  ``padding``: ``0``;``}``div {``  ``width``: ``100%``;``  ``height``: ``100%``;``  ``position``: ``absolute``;``  ``font-size``: ``500px``;``  ``text-align``: ``center``;``  ``display``: ``none``;``}``.a {``    ``background-color``: pink;``    ``display``: ``block``;``}``.b {``  ``background-color``: ``red``;``}``.c {``background-color``: ``gray``;``}`
```

现在我们给网页添加上行为，首先需要知道的一点是，hash指即地址栏中#号后面的字符串，它的改变不会引起界面的刷新，但是会出发onhashchange事件，我们要做的就是监听这个事件：

```
`function` `hashChanged(hashObj) {``  ``//变化之后的url``  ``var` `newhash = hashObj.newURL.split(``'#'``)[1];``  ``//变化之前的url``  ``var` `oldhash = hashObj.oldURL.split(``'#'``)[1];``  ``//将对应的hash下界面显示和隐藏``  ``document.getElementById(oldhash).style.display = ``'none'``;``  ``document.getElementById(newhash).style.display = ``'block'``;``}``//监听路由变化``window.onhashchange = hashChanged;`
```

目前，只需要以上的代码，我们便可以完成一个最简单的SPA，通过地址栏的变化，界面会相应地变化。当然，除了手动在地址栏里面改变hash的变化，我们也可以用代码改变它的变化,从而推动界面变化，下面是两种方式的效果图：

![img](https://images2015.cnblogs.com/blog/612959/201606/612959-20160615151027073-2001852084.gif)![img](https://images2015.cnblogs.com/blog/612959/201606/612959-20160615151119260-57127084.gif)

可以看到，左边是在浏览器中直接修改hash引起了界面的变化，而右边则是通过代码控制界面变化。这两种方式都可以在history中留下痕迹，从而当我们店家回退/前进按钮的时候追溯到之前的界面去。有些平台不允许我们去手动修改地址栏，（比如微信），那么我们一般采用第二种方式即可。况且，比较少的用户会去修改地址栏。

下面贴出所有的代码：

```
`<!``DOCTYPE` `html>``<``html``>``<``head``>``  ``<``title``></``title``>``  ``<``style` `type="text/css">``    ``body {``      ``height: 500px;``      ``width: 100%;``      ``margin: 0;``      ``padding: 0;``    ``}``    ``div {``      ``width: 100%;``      ``height: 100%;``      ``position: absolute;``      ``font-size: 500px;``      ``text-align: center;``      ``display: none;``    ``}``    ``.a {``        ``background-color: pink;``        ``display: block;``    ``}``    ``.b {``      ``background-color: red;``    ``}``    ``.c {``    ``background-color: gray;``    ``}``  ``</``style``>``</``head``>``<``body``>``  ``<``div` `id="A" class="a J-A">A</``div``>``  ``<``div` `id="B" class="b J-B">B</``div``>``  ``<``div` `id="C" class="c J-C">C</``div``>``</``body``>``<``script` `type="text/javascript">``function hashChanged(hashObj) {``  ``//变化之后的url``  ``var newhash = hashObj.newURL.split('#')[1];``  ``//变化之前的url``  ``var oldhash = hashObj.oldURL.split('#')[1];``  ``//将对应的hash下界面显示和隐藏``  ``document.getElementById(oldhash).style.display = 'none';``  ``document.getElementById(newhash).style.display = 'block';``}``//监听路由变化``window.onhashchange = hashChanged;``</``script``>``</``html``> `
```

### SEO优化

由于我们在处理单页应用的时候页面是不刷新的，所以会导致我们的网页记录和内容很难被搜索引擎抓取到。搜索引擎抓取页面首先要遵循http协议，可是#不是协议内的内容。而实际上也是这样，我们没有见过搜索引擎的搜索结果中，哪一条记录可以快速定位到网页内的某个位置的。解决的方法是用 #!号代替#号，因为谷歌会抓取带有#!的URL。（Google规定，如果你希望Ajax生成的内容被浏览引擎读取，那么URL中可以使用"#!"(这种URL在一般页面一般不会产生定位效果)），这样我们可以解决ajax的不被搜索引擎抓取的问题。在vueJs里面，我们可以看到作者就是这样做的。

### 结束

以上就是利用hash原理实现的一个很简单的SPA。当然，要实现项目中的单页应用，还有很多工作要做。比如传参，动画，异步资源加载的问题都是需要解决的。卤煮此处只是示范了一个很简单的例子，希望在做不复杂又不想引入其他框架的同学提供一点思路。另外单页虽好，但不要乱用哦，根据项目的具体需求制定对应的解决方案而不是一味的追潮逐流。