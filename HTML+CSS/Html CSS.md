# HTML + CSS面试整理

- [一、HTML基础](#一、html基础)
- [二、css基础](#二、css基础)
- [三、css布局](#三、css布局)
- [四、css效果](#四、css效果)
- [五、css动画](#五、css动画)
- [六、预处理器](#六、预处理器)
- [七、Bootstrap](#七、Bootstrap)
- [八、CSS工程化方案](#八、CSS工程化方案)
- [九、三大框架中的css](#九、三大框架中的css)

## 一、HTML基础

### html常见元素和理解

> html常见元素分类

- head区元素：（不会在页面上留下直接内容）
  - meta
  - title
  - style
  - link
  - script
  - base
- body区：
  - div/selection/article/aside/header/footer
  - p
  - span/em/strong
  - table/thead/tbody/tr/td
  - ul/ol/li/dl/dt/dd
  - a
  - form/input/select/textarea/button

```
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
  <base href="/"> 
  // 指定一个基础路径，所有的路径都是以这个为基准
  //viewport表示视图的大小
  //适配移动端第一步，viewport
复制代码
```

> HTML重要属性

- ```
  a[href,target]
  ```

  - target：打开窗口。也可以设置框架中在哪个框架打开

- ```
  img[src,alt]
  ```

  - alt:图片不可用时候，文字显示出来

- `table td[colspan,rowspan]`

- ```
  form[target,method,enctype]
  ```

  (有表单的地方都建议放上form) 

  - target:表单提交到哪儿
  - enctype:指定编码，如果上传文件指定要用form-data

- `input[type,value]`

- `button[type]`

- `select>option[value]`

- ```
  label[for]
  ```

  - label与input进行关联

> 如何理解html

- `HTML`“文档”
- 描述文档的结构
- 有区块和大纲

> "大纲"作用

- 更好的让机器、搜索引擎、蜘蛛很好的理解结构
- `html`的语义化

> `html`版本

- `HTML4/4.01(SGML)`浏览器做很多的容错和修正工作
- `XHTML(XML)`要求非常严格，严格要求编码习惯
- `HTML5`(基于`HTML4`)

> `html5`新增内容

- 新增区块标签 
  - `section`
  - `article`
  - `nav`
  - `aside` //一般不出现在大纲中，表示不重要的广告类
- 表单增强 
  - 日期、时间、搜索
  - 表单验证
  - `placehold`自动聚焦

> `html5`新增语意

- `header`/`footer`头尾
- `section`/`article`区域
- `nav`导航
- `aside`不重要内容
- `em`/`strong`强调
- `i` //`icon`

### 元素分类

> 按默认样式分

- 块级`block`
- 行内`inline`
- `inline-block`

> HTML分类法



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1074" height="624"></svg>)



> 嵌套关系

> 默认样式和reset

- 块级元素可以包含行内元素
- 块级元素不一定能包含块级元素(p标签不能包含div)
- 行内元素一般不能包含块级元素(a>div 合法，html5中a是transparent元素)

> HTML标签在浏览器中都有默认的样式，不同的浏览器的默认样式之间存在差别。例如ul默认带有缩进样式，在IE下，它的缩进是由margin实现的，而在Firefox下却是由padding实现的。开发时浏览器的默认样式可能会给我们带来多浏览器兼容性问题，影响开发效率。现在很流行的解决方式是一开始就将浏览器的默认样式全部覆盖掉，这就是css reset。

```
Normalize.css
```

### 面试题

#### `doctype`的意义是什么？

- 让浏览器以标准模式渲染
- 让浏览器知道元素的合法性

#### `HTML`、`XHTML`、`HTML5`的关系

- `HTML`属于`SGML`
- `XHTML`属于`XML`，是`HTML`进行`XML`严格化的结果
- `HTML5`不属于`SGML`或者`XML`，比`XHTML`宽松

#### HTML5有什么变化

- 新的语义化标签

- 表单增强(新的元素，表单验证)

- 新的

  ```
  API
  ```

  (离线、音视频、图形、实时通信、本地存储、设备能力) 

  - `Canvas`+`WEBGL`等技术，实现无插件的动画以及图像、图形处理能力；
  - 本地存储，可实现`offline`应用；
  - `websocket`，一改`http`的纯`pull`模型，实现数据推送的梦想；
  - `MathML`，`SVG`等，支持更加丰富的`render`；

#### em和i有什么区别

- `em`是语义化的标签，表强调
- `i`是纯样式的标签，表斜体
- `HTML5`中`i`不推荐使用，一般用作图标

#### 语义化的意义是什么

- 开发者容易理解
- 机器容易理解结构(搜索、读屏软件)
- 有助于`SEO`
- `semantic` `microdata`

#### 哪些元素可以自闭合

- 表单元素`input`
- 图片`img`
- `br` `hr`
- `meta` `link`

#### HTML和DOM的关系

- `HTML`是‘死’的(字符串，没有结构)
- `DOM`由`HTML`解析而来，是活的(是树，有结构)
- `JS`可以维护`DOM`

#### `property`和`attribute`的区别

- `attribute`是‘死’的(属性，写在HTML中)
- `property`是‘活’的(特性，DOM对象中)
- `attribute`不会影响`property`,`property`也不会影响`attribute`

#### `form`作用

- 直接提交表单
- 使用submit/reset按钮
- 便于浏览器保存表单
- 第三方库可以整体提取值
- 第三方库可以进行表单验证

## 二、css基础

> `cascading style sheet`层叠样式表

### 选择器

> 选择器简介

- 用于匹配`HTML`元素
- 分类和权重
- 解析方式和性能 
  - 浏览器的解析方式是从右往左反着，然后再往前验证,主要出于性能的考虑，更快速的匹配到指定元素(左边范围太广了，比如`<div>`可能能找到几百个)
- 值得关注的选择器

> 选择器分类

- 元素选择器                	 `a{}`
- 伪元素选择器            `::before{}`                //真实存在的容器
- 类选择器                	    `.link{}`
- 属性选择器            		`[type=radio]{}`
- 伪类选择器            		`:hover{}`       //元素的状态
- `ID`选择器              		`#id{}`
- 组合选择器            		`[type=checkbox]` + `label{}`
- 否定选择器            		`:not(.link){}`
- 通用选择器            		`*{}`

> 选择器权重

- ID选择器器            		     +100
- 类   属性   伪类器      	 +10
- 元素 伪元素器        	     +1
- 其它选择器器         	     +0

> 计算一个不进位的数字

```
#id` `.link` `a[href]
```

计算：

- `#id`         		+100
- `.link`       	+10
- `a`                     +1
- `[href]`      +0

结果：111

```
#id .link.active
#id       +100
.link 	  +10
.active   +10
结果：120
复制代码
```

> 不进位

```
只要有id选择器，就是最大，类选择器再多也不会进位，只能在自己位上
```

百位    十位    个位

> 其他选择器权重

- `!important`优先级最高
- 元素属性优先级高   //`元素的属性` > `外部样式表 (style标签，外部样式表)`
- 相同权重后写的生效

### 非布局样式

> 非布局样式

- `字体`、`字重`、`颜色`、`大小`、`行高`
- `背景`、`边框`
- `滚动`、`换行`
- `粗体`、`斜体`、`下划线`

#### 字体

> 字体族

- `serif`(衬线字体)
- `sans-serif`(非衬线字体)
- `monospace`(等宽字体，例如代码)
- `cursive`(方正静蕾体)
- `fantasy`

> 多字体`fallback`机制

- 指定多个字体，如果找不到会按照顺序使用其他字体，或者用同类字体

```
font-family:Monaco PingFangSC
复制代码
```

英文字体用`Monaco`,但是`Monaco`没有中文字体，所以如果碰到中文会使用`PingFangSC`，一个字体一个字体的找

```
font-family:"Microsoft Yahei",serif
复制代码
```

字体族不需要引号，因为不是具体的字体

```
.chinese{
    font-family:"PingFang SC","Microsoft Yahei",monospace
}
复制代码
```

指定在`mac`系统上用`PingFang SC`,`windows`上用`Microsoft Yahei`，把单个平台独有的字体写到前面

> 网络字体、自定义字体

- 自定义字体

```
@font-face{
    font-family:"IF";
    src:url("./IndieFlower.ttf");
}

.custom-font{
    font-family:IF;
}
复制代码
```

- 网络字体：`注意跨域`

> ```
> iconfont
> ```

> 字体机制

- 先把只有一个平台才有的写到最前面
- 引用远程字体有问题的话，要注意跨域问题
- 阿里巴巴的图标库，自选 `iconfont.cn`

#### 行高

> 行高的构成

- 行高由`line-box`决定
- `line-hight`会撑起`inline-box`的高度，并不会影响本身布局的高度，但是会影响外部元素(line-box)
- `inline-box`组成`line-box`，`line-box`高度是由`inline-box`决定

> 行高的相关现象

- 一般做垂直居中用`line-height`做就行了
- 默认情况是按照`base-line`对齐，如果要居中对齐就用`vertical-align:middle`
- 底线、顶线和文字的顶和文字的底是不一样的

> 经典图片空隙问题

- 原理：按照`inline`排版，如果按照`inline`排版的话，默认按照基线排版(`base-line`)
- 基线和底线之间有距离的，如果`12px`字体那么缝隙可能就是`3px`
- 解决方案：按照底线对齐，`vertical-align:bottom`或者`display:block`

#### 背景

> 背景颜色

- ```
  HSL
  ```

  - H：`Hue`(色调)。0(或360)表示红色，120表示绿色，240表示蓝色，也可取其他数值来指定颜色。取值为：0 - 360
  - S：`Saturation`(饱和度)。取值为：0.0% - 100.0%
  - L：`Lightness`(亮度)。取值为：0.0% - 100.0% `background:hsl(0,100%,50%)`

- `RGB(A)`

- `背景图`

> 渐变色背景

```
background: webkit-linear-gradient( left, red, green); //老式写法
background: linear-gradient(to right,red, green) ;
background: linear-gradient (45deg, red, green);
background: linear-gradient( 135deg, red 0, green 50%, blue 100%)
background: linear-gradient ( 135deg, transparent 0, transparent 49.5%,green 50%)
```

> 多背景叠加

```
background: linear-gradient( 135deg, transparent 0, transparent 49.5%,green 49.5%,green 50.5%,transparent 50.5%,transparent 100%),linear-gradient( 45deg, transparent 0, transparent 49.5%,green 49.5%,green 50.5%,transparent 50.5%,transparent 100%)

background-size:30px 30px
复制代码
background实现各种渐变背景，可以通过叠加实现，放射渐变
```

> 背景图片和属性(雪碧图)

- 优点：

  - 减少加载网页图片时对服务器的请求次数
  - 提高页面的加载速度

  ```
  由所需图片拼成的一张 GIF 图片的尺寸会明显小于所有图片拼合前的大小。
  单张的 GIF 只有相关的一个色表，而单独分割的每一张 GIF
  都有自己的一个色表，这就增加了总体的大小。
  因此，单独的一张 JPEG 或者 PNG sprite 在大小上非常可能比把一张图分成多张得来的图片总尺寸小
  复制代码
  ```

- 缺点：

  - 单个图片大小，考虑网络环境比较差的情况
  - 内存使用问题。大量空白你就会最终使用大量的无用的空白。

  ```
  一个例子是来自于WHIT TV的网站。
  注意这是一个1299×15,000像素的PNG图片。
  它也被压缩的很好——实际下载大小只有大概26K —
  但是浏览器并不会渲染压缩后的图片数据。当这个图片被下载并被解压缩之后
  复制代码
  ```

  - 维护比较麻烦，

> `base64`和性能优化

- 一种文本格式，显示的是一串文本，而这串文本就是图片本身
- 优点 
  - 传输性能，减少http请求
- 缺点： 
  - 增大了体积的开销 
    - 图片本身提交增大1/3
    - 增大css体积
  - 增加了解码的开销
- 适用：小图标，例如：loading图
- 用法：一般用在构建中转，打包

> 多分辨率适配

#### 边框

> 边框的属性

- `线型`
- `大小`
- `颜色`

> 边框背景图

```
border-img('./border.img') 30 round;

//repeat：可能会导致不完整
//round：整数个拼，可能会有一些空间上的压缩
复制代码
```

> 边框衔接(三角形)

```
原理：利用边框衔接过程是斜切
width:0px;
border-bottom:30px solid red;
border-left:20px solid transparent;
border-right:20px solid transparent;
复制代码
```

### 滚动

> 滚动行为和滚动条

- `visible`:内容直接显示，撑出容器
- `hidden`：超出容器部分隐藏
- `scroll`:超出容器滚动，始终显示滚动条
- `auto`:超出容器滚动，当内容比较短不需要滚动条的时候不显示滚动条

```
在mac系统上收系统设置影响
```

### 文本折行

> overflow-wrap(word-wrap)通用换行控制
> - 兼容性不太好，经常还用word-wrap
> - 是否保留单词
> - normal	只在允许的断字点换行（浏览器保持默认处理）。
> - break-word	在长单词或 URL 地址内部进行换行。

> `word-break` - 针对多字节文字，中文句子也是单词 - `break-all`	允许在单词内换行。 - `keep-all`	只能在半角空格或连字符处换行，中文句子也不换行，兼容性还有点问题

> ```
> white-space` - 空白处是否断行 - 不换行的话	`white-space: nowrap
> ```

```
overflow-wrap: break-word ;
word-break: keep-all;
white-space: normal ;
复制代码
```

### 装饰性属性(粗体、斜体、下划线)

- 字重(粗体) `font-weight`
- 斜体`font-style:itatic`
- 下划线`text-decoration`
- 指针`cursor`

### `hack`

- `Hack`看起来不合法但生效的写法
- 主要用于区分不同的浏览器，只在特定的浏览器生效
- 缺点 
  - 难理解
  - 难维护
  - 易失效
- 替代方案 
  - 特性检测
  - 针对性加`class`
- 使用注意 
  - 标准属性写到前面，`hack`写到后面
- 作用 
  - 浏览器兼容性
- 典型案例 
  - `checkbox`
  - `tabs`

## 三、css布局

### 布局简介

> CSS布局

- 早期以table为主(简单) 
  - 解析并不是流式的，以前可能等待时间长，现在已经可以流式布局
- 后来以技巧性布局为主(难)
- 现在有`flexbox`/`grid`(偏简单)
- 响应式布局是(必备知识)

> 常用布局方式

- table表格布局
- float浮动+margin
- inline-block布局
- flexbox布局

> 布局方式(表格)

- `display:table`
- `display:table-row`

### 一些布局属性

> 盒模型



![img](F:\Code\github\assets\1676450f9b7f3d96)

```
宽度和高度是只对内容区生效
占据的空间是content + padding + border
```



#### `display/position`

> `display`确定元素的显示类型：

- block
- inline
- inline-block:有宽高有可以与其他元素排在同一行

> `position`确定元素的位置：

- `static`:静态布局，按照文档流布局
- `relative`:相对于元素本身的偏移，relative偏移时，元素所占据的文档空间不会产生偏移
- `absolute`：从文档流脱离，相对于最近的父级absolute或者relative，如果父级不是的话，会一直网上到body
- `fixed`:相对于屏幕/可视区域

```
定位于relatvie、absolute、fixed都可以设置z-index，数值越大附带
```

### flexbox布局

> 

- 弹性盒子
- 盒子本来就是并列的
- 指定宽度即可

 

- `低版本IE不支持`
- `出过三个版本，市面上各个浏览器都有对应的解析，会导致一些兼容性问题`
- 移动浏览器基本兼容,`react Native`和微信小程序可以直接用来布局

[弹性布局用法详解](https://link.juejin.im?target=http%3A%2F%2Fjustcode.ikeepstudying.com%2F2015%2F10%2Fcss3-flex-%25E5%25BC%25B9%25E6%2580%25A7%25E5%25B8%2583%25E5%25B1%2580%25E7%2594%25A8%25E6%25B3%2595%25E8%25AF%25A6%25E8%25A7%25A3%2F)

### float 布局

> ```
> float
> ```

- 元素“浮动”
- 脱离文档流
- 但不脱离文本流



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="644" height="256"></svg>)



> float对自身的影响：

- 形成“块”(`BFC`),`inline`元素也可以设置宽高([BFC背后的神奇原理](https://link.juejin.im?target=https%3A%2F%2Fwww.cnblogs.com%2Flhb25%2Fp%2Finside-block-formatting-ontext.html))
- 位置尽量靠上
- 位置尽量靠左(右)



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1022" height="202"></svg>)



`float`本意就是要做文字环绕、图文混排等内容的

> 对兄弟的影响

- 上面贴着非`float`元素
- 旁边贴`float`元素
- 不影响其他块级元素位置
- 影响其他块级元素内部文本

> 对父级元素的影响

- 从父级元素上“消失”
- 高度“塌陷”

> 解决“高度塌陷”的方案

- 让父元素形成`BFC`来接管自己的高度
  - `overflow:auto/hidden`
  - 当里面的元素超出的时候自动滚动
- 用其他元素撑起来

```
container2::after{
	content:'';
	clear:'both';       //保证这个元素左右都是"干净"的，没有浮动元素
	display:block;      
	height:0;           //不占高度
	visibility:hidden   //不用显示
}
//比较经典的清除浮动布局的方式	
复制代码
```

> float布局

- 兼容性好

> float和margin实现两栏布局和三栏布局

- 两栏布局： 

  - `float:left`(左)
  - `margin-left:左元素的宽度`(右)

- 三栏布局：记住“尽量往左靠，尽量往右靠” 

  - `float:left`(左)

  - `float:right`(右)

  - 中间元素写在最后，否则右边的

    ```
    float
    ```

    元素不会对其 

    - `margin-left:左元素的宽度`
    - `margin-right:右元素的宽度`

### `inline-block`布局

- 像文本一样排`block`元素
- 没有清除浮动等问题
- 需要处理间隙

> 处理间隙

- 间隙来源：`html`中的空白
- 处理办法： 
  - 直接把两块`html`写在一起；
  - 两块中间加一个注释；`<!-- -->`
  - 父字体设置`font-size:0`;子块重新加上字体`font-sizi:14px;`

### 响应式设计和布局

> 响应式设计和布局

- 在不同的设备上正常使用
- 一般主要处理屏幕大小的问题
- 主要方法： 
  - 隐藏+折行+自适应空间
  - `rem/viewport/media query`

> ```
> viewport：
> ```

- 适配的第一部永远是加上`viewport`
- `viewport``可视区大小=屏幕大小`，有些设备默认屏幕宽度980px
- `<meta name='viewport' content="width=device-width,initial-scale=1.0">`
- 如果固定使用width，可以使不同页面等比放大
- 也可以根据`window.innerWidth`动态计算页面的宽度

> ```
> media query:
> ```

```
@media(max-width:640px){
	.left{
		display:none;
	}
}
复制代码
```

> ```
> rem：
> ```

```
    html{
        font-size:16px; // 默认16个像素，为了好记一般设置10px，20px
    }
复制代码
@media (maxwidth: 375px){
	html{
		font-size :24px ;
	}
}	
@media (max-width: 320px){
	html{
		fonts ize: 20px;
	}
}	
@media (max-width: 640px){
	intro{
		margin: .3rem auto ;
		display: block;
	}
}

//精确性要求高的地方不要使用`rem`布局
复制代码
```

### 主流网站使用的布局方式

`float`布局:兼容性好

### CSS面试题

#### 实现两栏(三栏)布局的方法

- 表格布局 `display:table`
- `float`+`margin`布局(清理浮动)
- `inline-block`布局(处理间隙)
- `flexbox`布局(兼容性不是特别好)

#### `position:absolute/fixed`有什么区别？

- 前者相对于最近的`absolute/relative`
- 后者相对屏幕(`viewport`)
- 如果要兼容老的设备，`fixed`兼容性不是很好

#### `display:inline-block`的间隙

- 原因:空白字符
- 解决:消灭字符(标签写到一起不要加空白，或者中间写上注释)或者消灭间距

#### 如何清除浮动

> 浮动元素不会占据父元素空间，因此父元素不会管浮动元素，很可能超出父元素，对其他元素产生影响。作为父元素一定要清除浮动，保证对外没有影响

[清除浮动原理](https://link.juejin.im?target=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000014554601)

- 让盒子负责自己的布局 
  - `overflow:hidden(auto)`
  - `::after{clear:both}`(也可以用单独的元素)

#### 如何适配移动端页面?

- 首先适配`viewport`(页面宽度和移动端适配)
- `rem`/`viewport`/`media query`(大小方面的适配)
- 设计上:隐藏折行自适应

## 四、css效果

> 效果属性

- `box-shadow`
- `text-shadow`
- `border-radius`
- `background`
- `clip-path`

### box-shadow

- 营造层次感(立体感)
- 充当没有宽度的边框
- 特殊效果



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1280" height="663"></svg>)



一个`div`画`xx`系列，可以用`box-shadow`，其他图形可以通过点，确定是可能有性能问题

### text-shadow

- 立体感
- 印刷的品质感

### border-radius

- 圆角矩形
- 圆形(圆角足够大 `border-radius:50%`) 
   `百分比是宽高的百分比`
- 半圆/扇形 
- 一些奇怪的角角 

### background

> 多背景叠加(颜色、图片、渐变)

> 效果

- 纹理、图案



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="844" height="564"></svg>)



- 渐变
- 雪碧图动画



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="126" height="110"></svg>)



```
.i{
	width: 20px ;
	height :20px ;
	background: url(./background.png) no repeat;
	background-size: 20px 40px;
	transition: background-position .4s ;
}
.i:hover{
	background-position: 0 20px;
}
复制代码
```

- 背景图尺寸适应方案

### clip-path

- 对容器进行裁剪
- 常见几何图形
- 自定义路径

```
clip-path支持动画且不改变容器大小
clip-path: inset(100px 50px);
clip-path: circle(50px at 100px 100px);
clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%, 10% 10%, 40px 10px);
  clip-path: url(#clipPath);
  background-size: cover; 
 transition:clip-path .4s;
复制代码
```

支持svg

[transform](https://link.juejin.im?target=https%3A%2F%2Fwww.cnblogs.com%2Fqianduanjingying%2Fp%2F4937574.html)

### `3D-transform`

> 变换`transform(2D)`



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1280" height="456"></svg>)



- translate(`translateZ` `3D`立体)



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="396" height="364"></svg>)





![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="314" height="274"></svg>)



- scale
- skew(斜切)
- rotate

```
transform:translateX(100px) translateY(100px) rotate(25deg)

transform:rotate(25deg) translateX(100px) translateY(100px) 

//有顺序
复制代码
```

- 缺点：性能不是很好
- 复杂场景下出现渲染不一样问题

### 面试题

#### 如何用一个div画xxx

```
box-shadow无限投影
::before
::after
复制代码
```

#### 如何产生不占空间的边框

- `box-shadow`
- `outline`

#### 如何实现圆形元素(头像)

- `border-radius:50%`

#### 如何实现IOS图标的圆角

- ```
  clip-path:(svg)
  ```

  ![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="200" height="200"></svg>)

#### 如何实现半圆、扇形等图标

- border-radius组合： 
  - 有无边框
  - 边框粗细
  - 圆角半径

#### 如何实现背景图居中显示/不重复/改变大小

```
background-position
background-repeat
background-size(cover/contain)
复制代码
```

#### 如何平移放大一个元素

```
transform:translateX(100px)
transform:scale(2)
复制代码
```

#### 如何实现3D效果

```
perspective:500px;  			//指定透视的角度
transform-style:preserve-3d;	//保留3D效果
transform:translate rotate;		
复制代码
```

## 五、css动画

> 动画的原理：

- 视觉暂留作用
- 画面逐渐变化

> 动画的作用

- 愉悦感
- 引起注意
- 操作进行反馈
- 掩饰(程序在后台加载)

> 动画类型

- `transition`补间动画(中间的过程浏览器脑补起来)
- `keyframe`关键帧动画(也是补间动画，但是有很多关键帧)
- 逐帧动画(特殊的逐帧动画，无法使用补间动画)

### `transition`

- 位置-平移(`left/right/margin/transform`)
- 方位-旋转(`transform`)
- 大小-缩放(`transform`)
- 透明度(`opacity`)
- 其他-线性变换(`transform`)

[深入了解`transition`动画](https://link.juejin.im?target=https%3A%2F%2Fwww.cnblogs.com%2Fxiaohuochai%2Fp%2F5347930.html)

```
transition: [动画类型] [动画时间]
```

`transition-delay`   //延迟多长时间执行

`transition-delay:width 1s,background 3s;` //多个效果叠加

```
transition-timing-function
```

`timing(easing)`：定义动画进度和时间的关系

- `linear`
- `ease-in-out`
- 自定义贝塞尔曲线



![img](F:\Code\github\assets\16764530768ff22f)



### `keyframes`动画

- 相当于多个补间动画
- 与元素状态的变化无关
- 定义更加灵活

> 

- `animation:run 1s linear;`
- `animation-direction`           //`reverse`:反向
- `animation-fill-mode:forword`   //`forwards`,`backwards`决定动画最终停留在哪里
- `animation-iteration-count`     //`infinite`:循环次数
- `animation-play-state:pause`    //`js`控制它的停和动

### 逐帧动画

- 每帧都是关键帧，中间没有补间过程
- 依然使用关键帧动画
- 属于关键帧动画中的一种特殊情况
- 适用于无法补间计算的动画
- 资源较大(适合时间短、资源小的动画，一定要控制好大小的时长)
- 使用`steps()`

例如：图片合成的动画

> ```
> animation-timing-function:steps(1)
> ```

- 指定时间和动画进度关系
- 中间不要加东西，每个区间就只有一个状态，静止
- `step`是指定每个区间帧数

### CSS面试题

#### `CSS`中动画怎么写，`transation`和`animation`和`keyframs`怎么写

#### `CSS`中动画实现的方式有几种

- transition
- keyframes(animation)

#### 过渡动画和关键帧动画的区别

- 过度动画需要有状态变化，关键帧动画不需要有状态变化
- 关键帧动画能控制更精细

#### 如何实现逐帧动画

- 使用关键帧动画
- 去掉补间(steps)

#### CSS动画的性能

- 性能不差
- 部分情况下优于JS
- 但JS可以做到更好
- 部分高危属性，`box-shadow`等

## 六、预处理器

> 介绍

- 基于CSS的另一种语言
- 通过工具编译成CSS
- 添加了很多CSS不具备的特性(变量)
- 能提升CSS文件的组织方式

> `less`和`sass`的区别

- ```
  less
  ```

  - 基于`node`
  - 优点：用`JS`写的，编译速度比较快，有个浏览器中可以直接使用的版本，不需要预先编译,入门简单
  - 缺点：在一些复杂特性上比较繁琐

- ```
  sass(scss)
  ```

  - `ruby`写的比较慢，但是有解决方案，可以使用它的移植版本`node-sass`

> CSS预处理器

- 嵌套                                         反映层级和约束
- 变量和计算                              减少重复代码
- `Extend`和`Mixin`               代码片段
- 循环                                               适用于复杂有规律的样式
- `import CSS`                          文件模块化

### 嵌套

> `less` 加上 `&`：并不是父子关系而是同级 `CSS`中并不允许这么嵌套写，`les`s和`sass`允许，结构关系清晰

```
body{
    padding:0px;
    margin: 0px;
}
.wrapper{
    background: white;
    .nav{
        font-size: 12px;
    }
    &:hover{                      //伪类
        background: red
    }
}
复制代码
```

> ```
> 打包指令
> ```

```
lessc a.less > a.css
复制代码
```

> sass

```
npm install node-sass
复制代码
sass的输出有多重格式
node-sass  a.scss>a.css  --output-style expanded 
复制代码
使用这条命令时候，我们编译的路径，不能有中文名，否则会报错，之后只要我们更改scss文件，保存后，就会自动修改编译后的css文件
```

### 变量

变量为了可以参与运算，提供了各种运算的函数，包括颜色

- `less`:`@fontSize`
- `sass`:`$fontSize`
- `less`的理念：尽量的接近css的语法
- `sass`的理念：尽量避免产生混淆

### mixin

`CSS`中并没有提供复用`CSS`的方法，而是通过`HTML`复用

> ```
> less
> ```

```
.block(@fontSize){
    font-size: @fontSize;
    border: 1px solid #ccc;
    border-radius: 4px;
}
复制代码
.block(@fontsize+2px);
复制代码
不加括号也可以，不加括号.block{}不会被编译出来，加了会被编译出来
```

> ```
> sass
> ```

```
@mixin block($fontSize) {
    font-size: $fontSize;
    border: 1px solid #ccc;
    border-radius: 4px;
}
复制代码
@include block(font-size+2px);
复制代码
区别在于需要显示的声明和调用，而且不能既做class又做mixin
场景：mixin清除浮动
```

### `extend`

> 作用

- 减少重复代码
- 不会复制重复代码
- 选择器提取出来，公共的样式写到一起

> ```
> less` `写法:
> ```

```
.block{
    font-size: @fontSize;
    border: 1px solid #ccc;
    border-radius: 4px;
}
复制代码
引用:
 .nav:extend(.block){
        font-size: @fontSize;
    }
复制代码
 .content{
        font-size: @fontSize + 2px;
        &:extend(.block);
    }
复制代码
生成效果:
.block,
.wrapper .nav,
.wrapper .content {
  font-size: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
复制代码
```

> ```
> sass` `写法：
> ```

```
.block {
    font-size: $fontSize;
    border: 1px solid #ccc;
    border-radius: 4px;
}
复制代码
引用：
@extend .block;
复制代码
生成效果：
.block, .wrapper {
  font-size: 12px;
  border: 1px solid #ccc;
  border-radius: 4px; 
}
复制代码
```

### `loop`

> ```
> less` `less中实际上没有循环的语法,通过递归来实现相应的效果` `引用方法:
> ```

```
.gen-col(@n) when (@n > 0 ){
    .gen-col(@n - 1);
    .col-@{n}{
        width: 1000px/12*@n;
    }
}

.gen-col(12);
复制代码
生成效果:
.col-1 {
  width: 83.33333333px;
}
.col-2 {
  width: 166.66666667px;
}
.col-3 {
  width: 250px;
}
.col-4 {
  width: 333.33333333px;
}
.col-5 {
  width: 416.66666667px;
}
.col-6 {
  width: 500px;
}
.col-7 {
  width: 583.33333333px;
}
.col-8 {
  width: 666.66666667px;
}
.col-9 {
  width: 750px;
}
.col-10 {
  width: 833.33333333px;
}
.col-11 {
  width: 916.66666667px;
}
.col-12 {
  width: 1000px;
}
复制代码
应用场景：表格、特效等
复制代码
```

> ```
> sass
> ```

```
mixin方式：
@mixin gen-col($n) {
    @if $n>0 {
        @include gen-col($n - 1);
        .col-#{$n} {
            width: 1000px/12*$n;
        }
    }
}

@include gen-col(12);
复制代码
sass是支持循环的，不需要递归
@for $i from 1 through 12 {
    .col-#{$i} {
        width: 1000/12*$i;
    }
}
复制代码
使得CSS变得更像一门变成语言
```

### `import`

```
预处理器的变量跨文件
@import "logo";
@import "nav";
@import  "content";
复制代码
```

### 预处理器框架

```
预处理器的模块化，提供了按需使用他人代码的可能
```

- `SASS-Compass`
- `Less-Lesshat/EST(国内)`
- 提供现成`mixin`
- 提供`JS`类库，封装常用功能

```
有兼容性问题的封装成mixin统一处理
```

### 面试题

#### 常见的CSS预处理器

- `Less`(`Node.js`)
- `Sass`(`Ruby`，有`Node`版本)

#### 预处理器作用

- 帮助更好地组织CSS代码
- 提高代码复用率
- 提升可维护性

#### 预处理利器的作用

- 嵌套  			   反应层级和约束
- 变量和计算    	   减少重复代码
- `Extend`和`Mixin`    代码片段
- 循环   			   适用于复杂有规律的样式
- `import` 		      `CSS`文件模块化

#### 预处理器的优缺点

- 优点：提高代码复用率和可维护性
- 缺点：需要引入编译过程  有学习成本

前端工程化发展起来了，预处理器的热度有所下降

## 七、Bootstrap

> 介绍

- 一个`CSS`框架
- `twitter`出品
- 提供通用基础样式

> ```
> Bootstrap4
> ```

- 兼容IE10+(`bootstrap3`兼容到`IE9`)
- 使用`flexbox`布局
- 抛弃`Nomalize.css`
- 提供布局和`reboot`版本

> 功能

- 基础样式
- 常用组件
- JS插件

现在用`sass`编写

### 基本用法

### `Js`组件

- 用于组件交互
  - `dropdown`(下拉)
  - `modal`( 弹窗)
- 基于`jQuery`
  - 依赖`Popper.js`
  - `bootstrap.js`
- 使用方式
  - 基于`data-`属性
  - 基于`JS-API`

### 响应式布局

不同的分辨率下面又不同的分配



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1280" height="634"></svg>)



### 定制化

- 使用`CSS`同名类覆盖
- 修改源码重新构建                                             //修改彻底，但是需要了解整个框架
- 使用`SCSS`源文件，修改变量                    //对结构的要求更高

```
把bootstrap当初一个预处理文件来使用，十一个更干净的使用方式
```

### `CSS`面试题

#### `Bootstrap`的优缺点

- 优点：`CSS`代码结构合理，现成的样式可以直接使用
- 缺点：定制较为繁琐，体积大

#### `Bootstrap`如何实现响应式布局

- 原理：通过`media query`设置不同分辨率的`class`
- 使用：为不同分辨率选择不同的网格`class`

#### 如何基于`Bootstrap`定制自己的样式

- 使用`CSS`同名覆盖
- 修改源码重新构建
- 引用`SCSS`源文件，修改变量

## 八、CSS工程化方案

> `CSS`工程化介绍

- 组织
- 优化
- 构建
- 维护

### `postCSS`插件的使用



![img](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1280" height="666"></svg>)



- `PostCSS`本身只有解析能力

- 各种神奇的特性全靠插件

- 目前至少有200多个插件 

  - `import`模块合并

  - `autoprefixier`自动加前缀

  - `cssnano`压缩代码

  - `cssnext`使用css新特性

  - ```
    precss
    ```

    - 变量
    - 条件
    - 循环
    - `MIxin` `Extend`
    - `import`
    - 属性值引用

### `gulpPostCSS`

> `postCSS`支持的构建工具

- `Webpack`        `postcss-loader`
- `Gulp`              `gulp-postcss`
- `Grunt`            `grunt-postcss`
- `Rollup`          `rollup-postcss`

#### `webpack`处理`css`

- `css-loader`将css文件变成js文件
- `style-loader`将变成js的css文件注入到页面中

#### `css-modules`和`extract-text-plugin`

直接将class名全部换掉，确保组件样式不冲突

```
var styles = require('component.css');
style.green ...
```

#### webpack小结

- `css-loader`                  将 `CSS`变成`JS`
- `style-loader`              将`JS`样式插入`head`
- `ExtractTextPlugin`     将`CSS`从`JS`中提取出来
- `css modules`                 解决css命名冲突的问题(映射表)
- `less-loader`                `sass-loader`各类预处理器
- `postcss-loader`           `PostCSS`处理

### 面试题

#### 如何解决CSS模块化

- `less` `sass`  等`CSS`预处理器
- `PostCSS`插件(`postCSS-import/precss`等)
- `webpack`处理CSS(`css-loader`+`style-loader`)

#### `PostCSS`可以做什么

> 取决于插件可以做什么

- `autoperfixer` `cssnext` `precss`等，兼容性处理
- `import`模块合并
- `css`语法检查、兼容性检查
- 压缩文件

#### `CSS modules`是做什么的，如何使用

- 解决类名冲突的问题
- 使用`PostCSS`或者`webpack`等构建工具进行编译
- 在`HTML`模板中使用编译过程产生的类名

#### 为什么使用`JS`来引用、加载`CSS`

- `JS`作为入口，管理资源有天然优势
- 将组件的结构、样式、行为封装到一起，增强内聚
- 可以做更多处理(`webpack`)

## 九、三大框架中的css

### `Angular`中的`CSS`

> `Angular`各版本

- ```
  Angular.js(1.x)
  ```

  - 没有样式集成能力

- ```
  Angular(2+)
  ```

  - `typeScript`
  - 提供了样式封装能力
  - 与组件深度集成

> ```
> shadowDOM
> ```

- 逻辑上是一个`DOM`
- 结构上存在子集集合

[shadowDOM介绍](https://link.juejin.im?target=https%3A%2F%2Fwww.jianshu.com%2Fp%2Fe47b103f3b60)



![img](F:\Code\github\assets\167645451a467f46)



> ```
> Scoped CSS
> ```

- 限定了范围的`CSS`
- 无法影响外部元素
- 外部样式一般不影响内部
- 可以通过`/deep/`或`>>>`穿透

```
兼容性还存在问题
```

> 模拟`Scoped CSS`

- 方案一：随机选择器(不支持)
- 方案二：随机属性 
  - `<div abcdefg>`
  - `div[abcdefg]{}`

### `Vue`中的`CSS`

> 内置`CSS`解决方案

> 模拟`Scoped CSS`

- 方案一：随机选择器    `CSS modules`
- 方案二：随机属性      `<div abcdefg>`  `<div>[abadafda]{}`

```
vue同时支持了这两种方案` `<style module>` `<style scoped>
```

### `React`中的`CSS`

> `React的`处理

- 官方没有集成方案
- 社区方案众多
- `css modules`
- `(babel)react-css-modules`
- `styled components`
- `styled jsx`

作者：kinshan

链接：https://juejin.im/post/5c0115e2e51d4539a175a15c

来源：掘金

著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。