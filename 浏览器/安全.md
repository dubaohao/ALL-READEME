# [前端安全（XSS、CSRF防御）]



**一、网络安全**

​       OWASP：开放式Web应用程序安全项目（OWASP，Open Web Application Security Project）

​       OWASP是一个开源的、非盈利的全球性安全组织，致力于应用软件的安全研究。

![img](F:\Code\github\浏览器\assets\747158-20161111221231655-601249476.png)

**二、XSS攻击**

​      1、总述

 ![img](F:\Code\github\浏览器\assets\747158-20161111221245967-1510484644.png)

​      2、XSS攻击原理

​           XSS攻击（Cross-Site Scripting）跨站脚本攻击。 被OWASP评为十大安全漏洞中的第二威胁漏洞。

![img](F:\Code\github\浏览器\assets\747158-20161111221256139-2146140754.png)

**特点：**

能注入恶意的HTML/JavaScript代码到用户浏览的网页上，从而达到Cookie资料窃取、会话劫持、钓鱼欺骗等攻击。<攻击代码不一定（非要）在 <script></script> 中>

**原因：**

- a：Web浏览器本身的设计不安全。浏览器能解析和执行JS等代码，但是不会判断该数据和程序代码是否恶意。
- b：输入和输出是Web应用程序最基本的交互，而且网站的交互功能越来越丰富。如果在这过程中没有做好安全防护，很容易会出现XSS漏洞。

- c：程序员水平参差不齐，而且大都没有过正规的安全培训，没有相关的安全意识。

- d：XSS攻击手段灵活多变。


 

3、防御XSS攻击       

a：HttpOnly    浏览器禁止页面的JS访问带有HttpOnly属性的Cookie。

b：输入检查 XSS Filter     对输入内容做格式检查，类似“白名单”，可以让一些基于特殊字符的攻击失效。在客户端JS和服务器端代码中实现相同的输入检查（服务器端必须有）。

c：输出检查     在变量输出到html页面时，可以使用编码或转义的方式来防御XSS攻击  HtmlEncode：将字符转成HTMLEntities，对应的标准是ISO-8859-1。

​                                  &  --> &amp;   < --> &lt;    > -->&gt;    " --> &quot;    ' --> &#x27;     / --> &#x2F;

JS中可以使用JavascriptEncode。需要对“\”对特殊字符转义，输出的变量的必须在引号内部。

d：XSS的本质是“HTML注入”，用户的数据被当成了HTML代码一部分来执行，从而混淆了原本的语义，产生了新的语义。



在Html标签中输出：<div>$var</div>  在标签中输出的变量，如果未做任何处理，都能导致直接产生XSS：构造一个<script>标签，或者是任何能够产生脚本执行的方式：<div><script>alert(/XSS/)</script></div>  或者  <a href=# ><img src=# onerror=alert(1) /></a>

防御方法：对变量使用HtmlEncode。

​          

在Html属性中输出：<div id="abc name="$var"></div> 攻击方法：<div id="abc" name=""><script>alert(/XSS/)</script><""></div>

防御方法：采用HtmlEncode。  在OWASP ESAPI中推荐了一种更严格的HtmlEncode：除了字母、数字外，所有的特殊字符都被编码成HTMLEntities。

 

在<script>标签中输出：<script>var x = "";alert(/XSS/);//";<script>

防御方法：使用JavascriptEncode。

 

在事件中输出：与在<script>标签中输出类似：<a href=# onclick="funcA('');alert(/XSS/);//')">test</a>

防御方法：使用JavascriptEncode。

 

在CSS中输出：方式多样

防御方法：尽可能禁止用户可控制的变量在"<style>标签"、"html标签的style属性"、"CSS文件"中输出。如果一定有此需求，则推荐使用 OWASP ESAPI 中的encodeForCSS()函数。除了字母、数字外的所有字符都被编码成十六进制形式“\uHH”。

 

在地址中输出：比较复杂。一般是在URL的path(路径)或者search(参数)中输出，使用URLEncode即可。

                <a href="http://www.evil.com/?test=$var">test</a>   -->  <a href="http://www.evil.com/?test=" onclick=alert(1)"" >test</a>

整个URL都被用户完全控制时，URL的Protocal(http://) 和Host (www.evil.com)部分不能使用URLEncode，可能会构造伪协议实施攻击：

                <a href="$var"></a>   -->   <a href="javascript:alert(1);"></a>

防御方法：先检查变量是否以”http“开头（如果不是则自动添加），以保证不会出现伪协议类的XSS攻击。在此之后，再对变量进行URLEncode。

 

 e：处理富文本   网站允许用户提交一些自定义的HTML代码，称之为”富文本“。比如用户在论坛里发帖，帖子的内容有图片、视频、表格等，这些”富文本“的效果都需要通过HTML代码来实现。

防御方法：与输入检查的思路一致。使用"XSS Filter"：“事件”应该被严格禁止；一些危险的标签：<iframe>、<script>、<base>、<form>等也应严格禁止；在标签、属性、事件的选择上，应该使用白名单，避免使用黑名单。比如，只允许<a>、<img>、<div>等比较“安全”的标签存在。可使用一些开源项目：Anti-Samy 是OWASP上的一个开源项目，可使用于Java、.NET等。  HTMLPurify可使用于PHP中。

 

f：防御DOM Based XSS    如果是输出到事件或脚本，要做一次javascriptEncode；如果是输出到HTML内容或者属性，要做一次HtmlEncode。

 

处理XSS注入的时候，不仅仅要转义或删除特殊的 HTML 标记和符号，如尖括号<>，如script，如iframe等，还需要过滤 JavaScript 事件所涉及的大量属性，前端一般使用XSS Filter 设置“白名单”。过滤的事件大致如下：

| **属性**    | **当以下情况发生时，出现此事件** |
| ----------- | -------------------------------- |
| onabort     | 图像加载被中断                   |
| onblur      | 元素失去焦点                     |
| onchange    | 用户改变域的内容                 |
| onclick     | 鼠标点击某个对象                 |
| ondblclick  | 鼠标双击某个对象                 |
| onerror     | 当加载文档或图像时发生某个错误   |
| onfocus     | 元素获得焦点                     |
| onkeydown   | 某个键盘的键被按下               |
| onkeypress  | 某个键盘的键被按下或按住         |
| onkeyup     | 某个键盘的键被松开               |
| onload      | 某个页面或图像被完成加载         |
| onmousedown | 某个鼠标按键被按下               |
| onmousemove | 鼠标被移动                       |
| onmouseout  | 鼠标从某元素移开                 |
| onmouseover | 鼠标被移到某元素之上             |
| onmouseup   | 某个鼠标按键被松开               |
| onreset     | 重置按钮被点击                   |
| onresize    | 窗口或框架被调整尺寸             |
| onselect    | 文本被选定                       |
| onsubmit    | 提交按钮被点击                   |
| onunload    | 用户退出页面                     |

**三、CSRF攻击**

 

​      1、总述

![img](F:\Code\github\浏览器\assets\747158-20161111221315952-1917835162.png)

​     2、攻击原理

![img](F:\Code\github\浏览器\assets\747158-20161111221327358-1981472458.png)

CSRF攻击跨站请求伪造。 本质：重要操作的所有参数都是可以被攻击者猜测到的。攻击者预测出URL的所有参数与参数值，才能成功地构造一个伪造的请求。        

3、防御CSRF攻击

**防御方法：**  验证码、  Referer Check 检查请求是否来自合法的源（可被伪造）。

**通用方法：**Token   使用Anti-CSRF Token   在URL中保持原参数不变，新增一个参数Token。Token的值是随机的（必须使用足够安全的随机数生成算法，或者采用真随机数生成器），其为用户与服务器所共同持有，可以放在用户的Session中，或者浏览器的Cookie中。 注意保密，尽量把Token放在表单中（构造一个隐藏的input元素），以POST提交，避免Token泄露。 

 **服务端的CSRF方式方法很多样，但总的思想都是一致的，就是在客户端页面增加伪随机数。**

- 通过 referer、token 或者 验证码 来检测用户提交。
- 尽量不要在页面的链接中暴露用户隐私信息。
- 对于用户修改删除等操作最好都使用post 操作 。
- 避免全站通用的cookie，严格设置cookie的域。
- Cookie Hashing(所有表单都包含同一个伪随机值)：
- One-Time Tokens(不同的表单包含一个不同的伪随机值)

 注意：如果网站有XSS漏洞或者一些跨域漏洞，可能导致Token泄露。 

在XSS攻击下，读取Token值，然后再构造出一个合法的请求，可以称为：XSRF。

下图简单阐述了CSRF攻击的思想：

![img](F:\Code\github\浏览器\assets\2009040916453171.jpg)

从上图可以看出，要完成一次CSRF攻击，受害者必须依次完成两个步骤：

　　1.登录受信任网站A，并在本地生成Cookie。

　　2.在不登出A的情况下，访问危险网站B。

　　看到这里，你也许会说：“如果我不满足以上两个条件中的一个，我就不会受到CSRF的攻击”。是的，确实如此，但你不能保证以下情况不会发生：

　　1.你不能保证你登录了一个网站后，不再打开一个tab页面并访问另外的网站。

　　2.你不能保证你关闭浏览器了后，你本地的Cookie立刻过期，你上次的会话已经结束。（事实上，关闭浏览器不能结束一个会话，但大多数人都会错误的认为关闭浏览器就等于退出登录/结束会话了......）

　　3.上图中所谓的攻击网站，可能是一个存在其他漏洞的可信任的经常被人访问的网站。

**四、HTML5安全**  

​        HTML5新增的一些标签和属性，使XSS攻击产生了新的变化，如果原来的XSS Filter是用的“黑名单”，就会导致攻击者用HTML5新增的标签来进行攻击，如果用的“白名单”，这方面的隐患就会少一些。

**五、常见前端框架对XSS攻击的防范**    

React 默认会转义所有字符串。

AngularJS    使用AngularJS中的SCE来防御XSS攻击。

**六、Web安全扫描器** 

商业软件：IBM Rational Appscan、WebInspect、Acunetix WVS

免费软件：W3AF、SkipFish