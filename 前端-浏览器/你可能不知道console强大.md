# [你可能不知道console强大](https://www.cnblogs.com/liyunhua/p/4529079.html)

作者：[静逸](http://www.cnblogs.com/liyunhua) 
出处：<http://www.cnblogs.com/liyunhua> 

**阅读目录**

- [写在前面](https://www.cnblogs.com/liyunhua/p/4529079.html#_label0)
- [谷歌控制台Elements面板](https://www.cnblogs.com/liyunhua/p/4529079.html#_label1)
- [查看元素上绑定的事情](https://www.cnblogs.com/liyunhua/p/4529079.html#_label2)
- [样式操作](https://www.cnblogs.com/liyunhua/p/4529079.html#_label3)
- [总况](https://www.cnblogs.com/liyunhua/p/4529079.html#_label4)
- [console.log](https://www.cnblogs.com/liyunhua/p/4529079.html#_label5)
- [console.info](https://www.cnblogs.com/liyunhua/p/4529079.html#_label6)
- [console.error](https://www.cnblogs.com/liyunhua/p/4529079.html#_label7)
- [console.warn](https://www.cnblogs.com/liyunhua/p/4529079.html#_label8)
- [console.debug](https://www.cnblogs.com/liyunhua/p/4529079.html#_label9)
- [console.dirxml](https://www.cnblogs.com/liyunhua/p/4529079.html#_label10)
- [console.group和console.groupEnd](https://www.cnblogs.com/liyunhua/p/4529079.html#_label11)
- [console.assert](https://www.cnblogs.com/liyunhua/p/4529079.html#_label12)
- [console.count](https://www.cnblogs.com/liyunhua/p/4529079.html#_label13)
- [console.dir](https://www.cnblogs.com/liyunhua/p/4529079.html#_label14)
- [console.time和console.timeEnd](https://www.cnblogs.com/liyunhua/p/4529079.html#_label15)
- [console.profile和console.profileEnd](https://www.cnblogs.com/liyunhua/p/4529079.html#_label16)
- [console.timeLine和console.timeLineEnd](https://www.cnblogs.com/liyunhua/p/4529079.html#_label17)
- [console.trace](https://www.cnblogs.com/liyunhua/p/4529079.html#_label18)
- [方向键盘的上下键](https://www.cnblogs.com/liyunhua/p/4529079.html#_label19)
- [$_](https://www.cnblogs.com/liyunhua/p/4529079.html#_label20)
- [Chrome 控制台中原生支持类jQuery的选择器](https://www.cnblogs.com/liyunhua/p/4529079.html#_label21)
- [copy](https://www.cnblogs.com/liyunhua/p/4529079.html#_label22)
- [keys和values](https://www.cnblogs.com/liyunhua/p/4529079.html#_label23)
- [console.table](https://www.cnblogs.com/liyunhua/p/4529079.html#_label24)
- [monitor & unmonitor](https://www.cnblogs.com/liyunhua/p/4529079.html#_label25)
- [Console.log样式](https://www.cnblogs.com/liyunhua/p/4529079.html#_label26)
- [如果您觉得本篇博文对您有所收获，觉得小女子还算用心，请点击右下角的 [推荐\]，谢谢！](https://www.cnblogs.com/liyunhua/p/4529079.html#_label27)

[回到顶部](https://www.cnblogs.com/liyunhua/p/4529079.html#_labelTop)

#### 写在前面

大家都有用过各种类型的浏览器，每种浏览器都有自己的特色，本人拙见，在我用过的浏览器当中，我是最喜欢Chrome的，因为它对于调试脚本及前端设计调试都有它比其它浏览器有过之而无不及的地方。可能大家对console.log会有一定的了解，心里难免会想调试的时候用alert不就行了，干嘛还要用console.log这么一长串的字符串来替代alert输出信息呢，下面我就介绍一些调试的入门技巧，让你爱上console.log

先的简单介绍一下chrome的控制台，打开chrome浏览器，按f12就可以轻松的打开控制台

![img](https://images0.cnblogs.com/blog/457824/201411/230844086569404.png)

大家可以看到控制台里面有一首诗还有其它信息，如果想清空控制台，可以点击左上角那个![img](https://images0.cnblogs.com/blog/457824/201411/230851146562060.png)来清空，当然也可以通过在控制台输入console.clear()来实现清空控制台信息。如下图所示

![img](https://images0.cnblogs.com/blog/457824/201411/230852535785272.png)

现在假设一个场景，如果一个数组里面有成百上千的元素，但是你想知道每个元素具体的值，这时候想想如果你用alert那将是多惨的一件事情，因为alert阻断线程运行，你不点击alert框的确定按钮下一个alert就不会出现。

下面我们用console.log来替换，感受一下它的魅力。

![img](https://images0.cnblogs.com/blog/457824/201411/230901063434461.png)

看了上面这张图，是不是认识到log的强大之处了，下面我们来看看console里面具体提供了哪些方法可以供我们平时调试时使用。

![img](https://images0.cnblogs.com/blog/457824/201411/230907017034998.jpg)

1、先说一下源码定位

大家打开[测试网页](http://www.cnblogs.com/ctriphire/p/4116207.html)   看到页面右下方有一个推荐的图标吗？右击推荐图标，选择审查元素，打开谷歌控制台，如下图所示

![img](https://images0.cnblogs.com/i/477954/201406/172153214269862.jpg)

我们现在想知道votePost方法到底在哪？跟着我这样做，在Console面板里面输入votePost然后回车

![img](https://images0.cnblogs.com/i/477954/201406/172153524898984.jpg)

直接点击上图标红的链接，控制台将定位到Sources面板中，展示如下图所示

![img](https://images0.cnblogs.com/blog/457824/201411/231945095156921.jpg)

大家看了上面这个图片之后估计头都要晕了吧，这么多js都整在一行，让人怎么看呀，不用担心，按下图操作即可（也就是点击中间面板左下方的Pretty print就行了）

![img](https://images0.cnblogs.com/i/477954/201406/172154494266014.jpg)

这时我们再回到Console面板时会惊奇的发现原来的链接后面的1现在变成91了（其实这里的数字1或者91就是代表votePost方法在源码中的行号 ）现在看出Pretty print按钮的强大之处了吧

知道了怎么样查看某一个按钮的源码，那接下来的工作便是调试了，调试第一步需要做的便是设置断点，其实设置断点很简单，点击一下上图所示的92即可，这时你会发现92行号旁边会多了一个图标，这里解释一下为什么不在91处设置断点，你可以试下，事实上根本就没法在91处上设置断点，因为它是函数的定义处，所以没法在此设置断点。

![img](https://images0.cnblogs.com/i/477954/201406/182109560208982.jpg)

设置好了断点后，你就会在右边Breakpoints方框里看到刚刚设置的断点。

我们先来介绍一下用到的调试快捷键吧（事实上我们也可以不用下表所示的快捷键，直接点击上图所示右侧栏最上层的一排按钮来进行调试，具体用哪个按钮，把鼠标放到按钮上方一会就会显示它相应的提示）

 

| 快捷键      | 功能                                                       |
| ----------- | ---------------------------------------------------------- |
| F8          | 恢复运行                                                   |
| F10         | 步过，遇到自定义函数也当成一个语句执行，而不会进入函数内部 |
| F11         | 步入，遇到自定义函数就跟入到函数内部                       |
| Shift + F11 | 步出，跳出当前自定义函数                                   |

其中值得一提的是，当我们点击“推荐”按钮进行调试的时候会发现，不管我们是按的F10进行调试还是按F11进行逐步调试，都没法进行$.ajax函数内部，即使我们在函数内部设置了断点也没有办法进入，这里按F8才是真正起效果的，不信你试试。

当我们在调试的时候，右侧Scope Variables里面会显示当前作用域以及他的父级作用域，以及闭包。你不仅能在右侧 Scope Variables(变量作用域) 一栏处看到当前变量，而且还能把鼠标直接移到任意变量上，就可以查看该变量的值。

用图说话（哈哈）

![img](https://images0.cnblogs.com/i/477954/201406/182110102077449.jpg)

 

刚刚我们介绍的只是在html里面能够看得到它绑定了onclick事件，这样我们就找到它绑定的js函数，如果它是在jQuery页面加载完成函数里面绑定的，这时候我们怎么知道它绑定的是哪个js函数呢，如果我们不知道绑定的js函数就更加不用说调试进去了

下面介绍一下如何查看，还是以刚刚那个[测试网页](http://www.cnblogs.com/ctriphire/p/4116207.html)为例子吧，但是这次我们来看“提交评论”作说明吧，

右击“提交评论”-->审核元素，我们可以清楚的看到在这个按钮上未绑定任何事件。在Console面板内输入如下代码

```
function lookEvents (elem) {
    return $.data ? $.data( elem, "events", undefined, true ) : $._data( elem, "events" );
}
var event = lookEvents($("#btn_comment_submit")[0]); // 获取绑定的事件
```

如下图所示：

![img](https://images0.cnblogs.com/i/477954/201406/192202361611776.jpg)

按照上述介绍的方法定位到具体的blog-common.js里面，找到postComment  然后一层层的找到具体的代码，再设置断点就好了。

最后介绍一下一个神器，很好用的debugger

如果你自己写的代码，你执行的时候想让它在某一处停下来，只要写上的debugger就好了，不信你试试！哈哈

[回到顶部](https://www.cnblogs.com/liyunhua/p/4529079.html#_labelTop)

#### 谷歌控制台Elements面板

要想打开谷歌控制台，有两种方式

1. ctrl+shift+i
2. f12

大家知道Elements面板最大的功能就是操作属性和修改html。这里我再说一些大家可能不太熟悉的特性， 

- **拖拽节点, 调整顺序**
- **拖拽节点到编辑器**
- **ctrl + z 撤销修改**

这些功能是我觉得最有意思的，你们可以试试哦。

下面来具体说说几个复杂点的功能

[回到顶部](https://www.cnblogs.com/liyunhua/p/4529079.html#_labelTop)

#### 查看元素上绑定的事情

- 默认会列出 All Nodes, 这些包括代理绑定在该节点的父/祖父节点上的事件, 因为在在冒泡或捕获阶段会经过该节点
- Selected Node Only 只会列出当前节点上绑定的事件
- 每个事件会有对应的几个属性 handler, isAtribute, lineNumber, listenerBody, sourceName, type, useCapture

 

- handler是处理函数, 右键可以看到这个函数定义的位置, 一般 js 库绑定事件会包一层, 所以这里很难找到对应handler
- isAtribute 表明事件是否通过 html 属性(类似onClick)形式绑定的
- useCapture 是 addEventListener 的第三个参数, 说明事件是以 冒泡 还是 捕获 顺序执行

![img](https://images0.cnblogs.com/blog/703087/201502/131524358547199.png)

[回到顶部](https://www.cnblogs.com/liyunhua/p/4529079.html#_labelTop)

#### 样式操作

可以通过 ctrl + z 取消

![img](https://images0.cnblogs.com/blog/703087/201502/131528224486472.png)

[回到顶部](https://www.cnblogs.com/liyunhua/p/4529079.html#_labelTop)

#### 总况

目前控制台方法和属性有：

```
["$$", "$x", "dir", "dirxml", "keys", "values", "profile", "profileEnd", "monitorEvents", "unmonitorEvents", "inspect", "copy", "clear", "getEventListeners", "undebug", "monitor", "unmonitor", "table", "$0", "$1", "$2", "$3", "$4", "$_"]
```

下面我们来一一介绍一下各个方法主要的用途。

一般情况下我们用来输入信息的方法主要是用到如下四个

[回到顶部](https://www.cnblogs.com/liyunhua/p/4529079.html#_labelTop)

#### console.log

用于输出普通信息

[回到顶部](https://www.cnblogs.com/liyunhua/p/4529079.html#_labelTop)

#### console.info

用于输出提示性信息

[回到顶部](https://www.cnblogs.com/liyunhua/p/4529079.html#_labelTop)

#### console.error

用于输出错误信息

[回到顶部](https://www.cnblogs.com/liyunhua/p/4529079.html#_labelTop)

#### console.warn

用于输出警示信息

[回到顶部](https://www.cnblogs.com/liyunhua/p/4529079.html#_labelTop)

#### console.debug

用于输出调试信息

用图来说话

![img](https://images0.cnblogs.com/blog/457824/201411/230913067037155.jpg)

console对象的上面5种方法，都可以使用printf风格的占位符。不过，占位符的种类比较少，**只支持字符（%s）、整数（%d或%i）、浮点数（%f）和对象（%o）四种**。

| 格式化符号 |              实现的功能              |
| :--------: | :----------------------------------: |
|     %s     |          格式化成字符串输出          |
|  %d or %i  |           格式化成数值输出           |
|     %f     |          格式化成浮点数输出          |
|     %o     |       转化成展开的DOM元素输出        |
|     %O     |       转化成JavaScript对象输出       |
|     %c     | 把字符串按照你提供的样式格式化后输入 |

```
   console.log("%d年%d月%d日",2011,3,26);
　 console.log("圆周率是%f",3.1415926);
```

![img](https://images0.cnblogs.com/blog/457824/201501/071628584845899.png)

%o占位符，可以用来查看一个对象内部情况

```
var dog = {};
dog.name = "大毛";
dog.color = "黄色";
console.log("%o", dog);
```

![img](https://images0.cnblogs.com/blog/457824/201501/071629171711956.png)

下面重点说一下console.log的一些技巧

**1、重写console.log 改变输出文字的样式**

![img](https://images0.cnblogs.com/blog/457824/201411/231020045932166.png)

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
console.log("%c3D Text"," text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:5em");



console.log('%cRainbow Text ', 'background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:5em;');
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

输出的结果如下图所示：

![img](https://images0.cnblogs.com/blog/703087/201502/131341075894359.png)

 

**2、利用控制台输出图片**

![img](https://images0.cnblogs.com/blog/431064/201409/132234240277278.gif)

**3、指定输出文字的样式**

![img](https://images0.cnblogs.com/blog/457824/201411/231028494216061.png)

[回到顶部](https://www.cnblogs.com/liyunhua/p/4529079.html#_labelTop)

#### console.dirxml

用来显示网页的某个节点（node）所包含的html/xml代码

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
<body>
    <table id="mytable">
        <tr>
            <td>A</td>
            <td>A</td>
            <td>A</td>
        </tr>
        <tr>
            <td>bbb</td>
            <td>aaa</td>
            <td>ccc</td>
        </tr>
        <tr>
            <td>111</td>
            <td>333</td>
            <td>222</td>
        </tr>
    </table>
</body>
<script type="text/javascript">
    window.onload = function () {
        var mytable = document.getElementById('mytable');
        console.dirxml(mytable);
    }
</script>
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

![img](https://images0.cnblogs.com/blog/457824/201501/071633365937534.png)

[回到顶部](https://www.cnblogs.com/liyunhua/p/4529079.html#_labelTop)

#### console.group和console.groupEnd

\>输出一组信息的开头和输出结束一组输出信息

看你需求选择不同的输出方法来使用，如果上述四个方法再配合group和groupEnd方法来一起使用就可以输入各种各样的不同形式的输出信息。

![img](https://images0.cnblogs.com/blog/457824/201411/230916203758554.jpg)

哈哈，是不是觉得很神奇呀！

[回到顶部](https://www.cnblogs.com/liyunhua/p/4529079.html#_labelTop)

#### console.assert

对输入的表达式进行断言，只有表达式为false时，才输出相应的信息到控制台

![img](https://images0.cnblogs.com/blog/457824/201411/230920471094898.jpg)

[回到顶部](https://www.cnblogs.com/liyunhua/p/4529079.html#_labelTop)

#### console.count

（这个方法非常实用哦）当你想统计代码被执行的次数

![img](https://images0.cnblogs.com/blog/457824/201411/230922575009930.jpg)

[回到顶部](https://www.cnblogs.com/liyunhua/p/4529079.html#_labelTop)

#### console.dir

(这个方法是我经常使用的 可不知道比for in方便了多少) 直接将该DOM结点以DOM树的结构进行输出，可以详细查对象的方法发展等等

![img](https://images0.cnblogs.com/blog/457824/201411/230936046711444.jpg)

[回到顶部](https://www.cnblogs.com/liyunhua/p/4529079.html#_labelTop)

#### console.time和console.timeEnd

计时开始和计时结束（看了下面的图你瞬间就感受到它的厉害了）

![img](https://images0.cnblogs.com/blog/457824/201411/230941441714991.jpg)

[回到顶部](https://www.cnblogs.com/liyunhua/p/4529079.html#_labelTop)

#### console.profile和console.profileEnd

配合一起使用来查看CPU使用相关信息

![img](https://images0.cnblogs.com/blog/457824/201411/230947391254586.jpg)

在Profiles面板里面查看就可以看到cpu相关使用信息

![img](https://images0.cnblogs.com/blog/457824/201411/230948160786229.jpg)

[回到顶部](https://www.cnblogs.com/liyunhua/p/4529079.html#_labelTop)

#### console.timeLine和console.timeLineEnd

配合一起记录一段时间轴

[回到顶部](https://www.cnblogs.com/liyunhua/p/4529079.html#_labelTop)

#### console.trace

堆栈跟踪相关的调试

上述方法只是我个人理解罢了。如果想查看具体API，可以上官方看看，具体地址为：https://developer.chrome.com/devtools/docs/console-api

下面介绍一下控制台的一些快捷键

[回到顶部](https://www.cnblogs.com/liyunhua/p/4529079.html#_labelTop)

#### 方向键盘的上下键

大家一用就知晓。比如用上键就相当于使用上次在控制台的输入符号

[回到顶部](https://www.cnblogs.com/liyunhua/p/4529079.html#_labelTop)

#### $_

命令返回最近一次表达式执行的结果，功能跟按向上的方向键再回车是一样的

![img](https://images0.cnblogs.com/blog/457824/201411/230958084845245.jpg)

上面的`$_`需要领悟其奥义才能使用得当，而$0~$4则代表了最近5个你选择过的DOM节点。

什么意思？在页面右击选择`审查元素`，然后在弹出来的DOM结点树上面随便点选，这些被点过的节点会被记录下来，而`$0`会返回最近一次点选的DOM结点，以此类推，$1返回的是上上次点选的DOM节点，最多保存了5个，如果不够5个，则返回`undefined`。

![img](https://images0.cnblogs.com/blog/431064/201409/132239377465002.gif)

```
$ // 简单理解就是 document.querySelector 而已。
$$ // 简单理解就是 document.querySelectorAll 而已。
$_ // 是上一个表达式的值
$0-$4 // 是最近5个Elements面板选中的DOM元素，待会会讲。
dir // 其实就是 console.dir
keys // 取对象的键名, 返回键名组成的数组
values // 去对象的值, 返回值组成的数组
```

看一下chrome控制台一个简单的操作，如何查看页面元素，看下图就知道了

![img](https://images0.cnblogs.com/i/477954/201406/161255380974581.jpg)

你在控制台简单操作一遍就知道了，是不是觉得很简单！

[回到顶部](https://www.cnblogs.com/liyunhua/p/4529079.html#_labelTop)

#### Chrome 控制台中原生支持类jQuery的选择器

也就是说你可以用`$`加上熟悉的css选择器来选择DOM节点

![img](https://images0.cnblogs.com/blog/457824/201411/231001310469893.jpg)

[回到顶部](https://www.cnblogs.com/liyunhua/p/4529079.html#_labelTop)

#### copy

通过此命令可以将在控制台获取到的内容复制到剪贴板(**如果在elements面板中选中某个节点，也可以直接按ctrl+c执行复制操作**)

![img](https://images0.cnblogs.com/blog/457824/201411/231004464535964.jpg)

（哈哈 刚刚从控制台复制的body里面的html可以任意粘贴到哪 比如记事本 是不是觉得功能很强大）

[回到顶部](https://www.cnblogs.com/liyunhua/p/4529079.html#_labelTop)

#### keys和values

前者返回传入对象所有属性名组成的数据，后者返回所有属性值组成的数组

![img](https://images0.cnblogs.com/blog/457824/201411/231008342653765.jpg)

[回到顶部](https://www.cnblogs.com/liyunhua/p/4529079.html#_labelTop)

#### console.table

![img](https://images0.cnblogs.com/blog/457824/201411/231012102186590.jpg)

[回到顶部](https://www.cnblogs.com/liyunhua/p/4529079.html#_labelTop)

#### monitor & unmonitor

monitor(function)，它接收一个函数名作为参数，比如`function a`,每次`a`被执行了，都会在控制台输出一条信息，里面包含了函数的名称`a`及执行时所传入的参数。

而unmonitor(function)便是用来停止这一监听。

![img](https://images0.cnblogs.com/blog/457824/201411/231015303594113.jpg)

看了这张图，应该明白了，也就是说在monitor和unmonitor中间的代码，执行的时候会在控制台输出一条信息，里面包含了函数的名称`a`及执行时所传入的参数。当解除监视（也就是执行unmonitor时）就不再在控制台输出信息了。

[回到顶部](https://www.cnblogs.com/liyunhua/p/4529079.html#_labelTop)

#### Console.log样式

| 格式化符号 |              实现的功能              |
| :--------: | :----------------------------------: |
|     %s     |          格式化成字符串输出          |
|  %d or %i  |           格式化成数值输出           |
|     %f     |          格式化成浮点数输出          |
|     %o     |       转化成展开的DOM元素输出        |
|     %O     |       转化成JavaScript对象输出       |
|     %c     | 把字符串按照你提供的样式格式化后输入 |

说了上面一堆公式，还是举个例子让你印象深刻一些，哈哈。

在控制台输入如下代码

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
console.log("%c3D Text"," text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:5em");



console.log('%cRainbow Text ', 'background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:5em;');
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

输出的结果如下图所示：

![img](https://images0.cnblogs.com/blog/703087/201502/131341075894359.png)

 

#### 如果您觉得本篇博文对您有所收获，觉得小女子还算用心，请点击右下角的 [推荐]，谢谢！

