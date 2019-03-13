# CSS-dubaohao

2018/11/12 21:10:09 

## 0.前言
* 1.在CSS中，html中的标签元素大体被分为三种不同的类型
* 2.CSS3: 移动端开发中 max-device-width 与 max-width 的区别

## 1.在CSS中，html中的标签元素大体被分为三种不同的类型： 

块状元素、内联元素(又叫行内元素)和内联块状元素。 

>常用的块状元素有：

```
	
	<div>、<p>、<h1>…<h6>、<ol>、<ul>、<dl>、<table>、<address>、<blockquote> 、<form>
```
>什么是块级元素？ 

在html中`<div>、<p>、<h1>、<form>、<ul>和<li>`就是块级元素。
设置`display:block`就是将元素显示为块级元素。

如下代码就是将内联元素a转换为块状元素，从而使a元素具有块状元素特点。
 `a{display:block;} `
> 块级元素特点：

 * 1、每个块级元素都从新的一行开始，并且其后的元素也另起一行。（真霸道，一个块级元素独占一行）;
 * 2、元素的高度、宽度、行高以及顶和底边距都可设置。
 * 3、元素宽度在不设置的情况下，是它本身父容器的100%（和父元素的宽度一致），除非设定一个宽度。 

>常用的内联元素有： 

`<a>、<span>、<br>、<i>、<em>、<strong>、<label>、<q>、<var>、<cite>、<code>`在html中，`<span>、<a>、<label>、<strong> 和<em>`就是典型的内联元素（行内元素）（inline）元素。

当然块状元素也可以通过代码display:inline将元素设置为内联元素。

如下代码就是将块状元素div转换为内联元素，从而使div 元素具有内联元素特点。
 `div{ display:inline; } ...... <div>我要变成内联元素</div> `

>内联元素特点： 

1、和其他元素都在一行上； 
2、元素的高度、宽度及顶部和底部边距不可设置； （这是答案^-^）
3、元素的宽度就是它包含的文字或图片的宽度，不可改变。 

常用的内联块状元素有：
 `<img>、<input>`
 内联块状元素（inline-block）就是同时具备内联元素、块状元素的特点，代码`display:inline-block`就是将元素设置为内联块状元素。
>`inline-block `元素特点： 

* 1.和其他元素都在一行上； 
* 2.元素的高度、宽度、行高以及顶和底边距都可设置。


## 2.CSS3: 移动端开发中 max-device-width 与 max-width 的区别

<div id="blog_content" class="blog_content">
    <div class="iteye-blog-content-contain" style="font-size: 14px;">
		<p>
			翻译自stackoverflow.com，源地址：<a target="_blank" href="http://stackoverflow.com/questions/6747242/what-is-the-difference-between-max-device-width-and-max-width-for-mobile-web">http://stackoverflow.com/questions/6747242/what-is-the-difference-between-max-device-width-and-max-width-for-mobile-web</a>
		</p>
		<p> </p>
		<p>
			有同学需要开发web页在iphone/android手机上访问，想问max-device-width 与 max-width 有什么区别，他打算针对不同的屏幕大小加载不同的样式，就像下面这样：</p>

		<pre class="html" name="code">
			@media all and (max-device-width: 400px)
			@media all and (max-width: 400px)</pre>
		<p> </p>
		<p>这两者有什么不同？</p>
		<p><strong>
			max-width 指的是显示区域的宽度，比如浏览器的显示区域宽度
		</strong></p>
		<p>（
			max-width is the width of the target display area, e.g. the browser）
		</p>
		<p><strong>
			max-device-width 指的是设备整个渲染（显示）区域的宽度，比如设备的实际屏幕大小，也就是设备分辨率 
		</strong></p>
		<p>
			（max-device-width is the width of the device’s entire rendering area, i.e. the actual device screen）
		</p>
		<p><code>
			max-height</code> 与 <code>max-device-height  
		</code>也是同理</p>
		<p>更进一步说，<strong>max-width在窗口大小改变或横竖屏转换时会发生变化</strong></p>

		<p><strong>
			max-device-width只与设备相关，横竖屏转换或改变尺寸，缩放都不会发生变化（部分android的宽高会互换而IOS不会） 
		</strong></p>
<p> </p>
		<p>如何你需要调整浏览器大小查看页面的变化，那开发过程中就使用 max-width，尽管在实际的生产环境中用max-device-width更精确</p>
<p> </p>
		<p>要是只关心两者的区别，到这已经足够了，下面是关于两者在实际应用的区别，来自另一篇文章：</p>

		<p><a target="_blank" href="http://www.javascriptkit.com/dhtmltutors/cssmediaqueries2.shtml">http://www.javascriptkit.com/dhtmltutors/cssmediaqueries2.shtml</a></p>

		<p>
			在CSS的媒体查询中，width与device-width之间的区别总是让人感到迷惑，下面就让我们来阐述一下两者的区别。
		</p>
<p> </p>
		<p>
			device- width指的是设备本身的宽度，也就是屏幕的分辨率，比如说你手机的分辨率是1440*900，这表示你的屏幕宽是1440px， 所以device-width是1440px。大部分的手机宽度不到480px，（当然今后的趋势是越来越大)。iphone 4的device-width就只有320px，即便对外宣称有640*960.这要归功于iphone的<strong>retina</strong>显示方式，也就是<strong>用两个像素来表示屏幕上一个CSS像素</strong>，IPAD3也是这样的。官方说IPAD3跟前几代一样采用的device-width是768px，它的实际分辨率达到了1536*2048，就是这个原因。
		</p>
<p> </p>
		<p>
			尽管device-width在指定特定的设备更有用，相比之下width在创建响应式页面时用途更加广泛。下面的表格是一个例子，
		</p>

<table cellpadding="3" border="1" cellspacing="0" style="width: 80%;">
<strong>CSS Media Dimensions</strong>

<tr>
Device
resolution (px)
device-width/ device-height (px)
</tr>
<tr>
<td width="15%">iPhone</td>
<td width="42%">320 x 480</td>
<td width="42%">320 x 480, in both portrait and landscape mode</td>
</tr>
<tr>
<td width="15%">iPhone 4</td>
<td width="42%">640 x 960</td>
<td width="42%">320 x 480, in both portrait and landscape mode. <code>device-pixel-ratio</code> is 2</td>
</tr>
<tr>
<td width="15%">iPhone 5, 5s</td>
<td width="42%">640 x 1136</td>
<td width="42%">320 x 568, in both portrait and landscape mode. <code>device-pixel-ratio</code> is 2</td>
</tr>
<tr>
<td width="15%">iPhone 6</td>
<td width="42%">750 x 1334</td>
<td width="42%">375 x 667, in both portrait and landscape mode. <code>device-pixel-ratio</code> is 2</td>
</tr>
<tr>
<td width="15%">iPhone 6 plus</td>
<td width="42%">1242 x 2208</td>
<td width="42%">414 x 736, in both portrait and landscape mode. <code>device-pixel-ratio</code> is 3</td>
</tr>
<tr>
<td width="15%">iPad 1 and 2</td>
<td width="42%">768 x 1024</td>
<td width="42%">768 x 1024, in both portrait and landscape mode</td>
</tr>
<tr>
<td width="15%">iPad 3</td>
<td width="42%">1536 x 2048</td>
<td width="42%">768 x 1024, in both portrait and landscape modeCSS pixel density is 2</td>
</tr>
<tr>
<td width="15%">Samsung Galaxy S I and II</td>
<td width="42%">480 x 800</td>
<td width="42%">320 x 533, in portrait modeCSS pixel density is 1.5</td>
</tr>
<tr>
<td width="15%">Samsung Galaxy S III</td>
<td width="42%">720 x 1280</td>
<td width="42%">360? x 640?, in portrait mode</td>
</tr>
<tr>
<td width="15%">HTC Evo 3D</td>
<td width="42%">540 x 960</td>
<td width="42%">360 x 640, portrait modeCSS pixel density is 1.5</td>
</tr>
<tr>
<td width="15%">Amazon Kindle Fire</td>
<td width="42%">1024 x 600</td>
<td width="42%">1024 x 600, landscape mode</td>
</tr>

</table>

	<p>
		( 也可以参考：<a target="_blank" href="http://justcode.ikeepstudying.com/2016/07/css3-%e5%aa%92%e4%bd%93%e6%9f%a5%e8%af%a2%e7%a7%bb%e5%8a%a8%e8%ae%be%e5%a4%87%e5%b0%ba%e5%af%b8-media-queries-standard-devices/">CSS3 媒体查询移动设备尺寸 Media Queries for Standard Devices</a>)
	</p>
	<p>
		需要注意的是，在苹果设备上，device-width指的总是设备处于肖像模式时的宽，<strong>不会随设备横竖屏转换变化，</strong>就是说不管怎么换，宽都是不会变的，高也一样。
	</p>
<p> </p>
	<p>下面是一个通过媒体查询区别设备和不同尺寸的例子：</p>

<pre class="html" name="code">/* #### Mobile Phones Portrait #### */
@media screen and (max-device-width: 480px) and (orientation: portrait){
/* some CSS here */
}

/* #### Mobile Phones Landscape #### */
@media screen and (max-device-width: 640px) and (orientation: landscape){
/* some CSS here */
}

/* #### Mobile Phones Portrait or Landscape #### */
@media screen and (max-device-width: 640px){
/* some CSS here */
}

/* #### iPhone 4+ Portrait or Landscape #### */
@media screen and (min-device-width: 320px) and (-webkit-min-device-pixel-ratio: 2){
/* some CSS here */
}

/* #### iPhone 5 Portrait or Landscape #### */
@media (device-height: 568px) and (device-width: 320px) and (-webkit-min-device-pixel-ratio: 2){
/* some CSS here */
}

/* #### iPhone 6 and 6 plus Portrait or Landscape #### */
@media (min-device-height: 667px) and (min-device-width: 375px) and (-webkit-min-device-pixel-ratio: 3){
/* some CSS here */
}

/* #### Tablets Portrait or Landscape #### */
@media screen and (min-device-width: 768px) and (max-device-width: 1024px){
/* some CSS here */
}

/* #### Desktops #### */
@media screen and (min-width: 1024px){
/* some CSS here */
}</pre>

<p> </p>
	<p>通过以上方式，我们的CSS媒体查询方案已经很完善了，但为了页面展示跟我们想像的一样，还要增加一个viewport标签： <code>meta</code> tag.</p>
<p> </p>
	<p>了解更多请参考：<a target="_blank" href="http://justcode.ikeepstudying.com/2016/07/css%ef%bc%9a%e5%aa%92%e4%bd%93%e6%9f%a5%e8%af%a2-css3-media-queries/">CSS：媒体查询 CSS3 Media Queries</a></p>

	<p>本文转自：<a target="_blank" href="http://justcode.ikeepstudying.com/2016/07/css3-%e7%a7%bb%e5%8a%a8%e7%ab%af%e5%bc%80%e5%8f%91%e4%b8%ad-max-device-width-%e4%b8%8e-max-width-%e7%9a%84%e5%8c%ba%e5%88%ab/">CSS3: 移动端开发中 max-device-width 与 max-width 的区别</a></p>
<p> </p>
</div>
  </div>

## 3.a:link,a:visited,a:hover,a:active 分别是什么意思?
1. link:连接平常的状态
2. visited:连接被访问过之后
3. hover:鼠标放到连接上的时候
4. active:连接被按下的时候

正确顺序：“爱恨原则”（LoVe/HAte），即四种伪类的首字母:LVHA。再重复一遍正确的顺序：a:link、a:visited、a:hover、a:active .

因为当鼠标经过未访问的链接，会同时拥有a:link、a:hover两种属性，a:link离它最近，所以它优先满足a:link，而放弃a:hover的重复定义。当鼠标经过已经访问过的链接，会同时拥有a:visited、a:hover两种属性，a:visited离它最近，所以它优先满足a:visited，而放弃a:hover的重复定义。究其原因，是css的就近原则“惹的祸”。