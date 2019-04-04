#  canvas详解
## 原理

`canvas`本身并不具备绘画能力，它本身只是一个画布，是一个容器。绘图能力是基于`html5的getContext("2d")`返回`的CanvasRenderingContext2D`对象来完成的。

> const canvas = document.getElementById("payAbilityLoginTree");//获取canvas dom对象
> const ctx = canvas.getContext('2d');    //获取绘图对象

> <canvas id="payAbilityLoginTree" width="1000" height="800"></canvas>

需注意，必须指定canvas画布的大小，canvas本身是受自身的width、height属性来决定是否重绘的，而不是style属性的宽高，只是默认情况下，canvas的宽高跟style属性的宽高一致。

`canvas`是一个二维网络，以画布左上角（0,0）为坐标原点，x轴向右延伸，y轴向下延伸。所以canvas画布中的坐标全为正数，没有负数。

`CanvasRenderingContext2D`对象提供了很多绘图方法，我们可以通过这些方法来绘制任何你需要的图形，我就不一一介绍了，大家可以参考HTML5 参考手册。但有几个常用的方法我着重强调一下。



- `strokeRect(x,y,width,height)`:绘制无填充矩形
- `arc(x,y,r,sAngle,eAngle,counterclockwise)`:绘制圆
- `fillStyle=color|gradient|pattern`:填充绘画的颜色、渐变或模式
- `moveTo(x,y)`:把路径移动到画布中的指定点，不创建线条
- `lineTo(x,y)`:添加一个新点
- `stroke()`:绘制已定义的路径，即线条绘制
- `fill()`:填充当前绘图（主要是颜色填充）
- `drawImage(img,x,y,width,height)`:绘制图像
- `scale(scalewidth,scaleheight)`:缩放当前绘图
- `save()`:保存当前环境的状态。

> 该方法的使用是将之前绘图的属性进行缓存，使之后的绘图能够独立出来

- `restore()`:返回之前保存过的路径状态和属性。

> 即是消除save()的影响，让绘图回到原先的状态。

- `beginPath()`: 开始一条新的路径，该方法将消除方法调用前的绘图影响。

> 通常我们在一个新的绘图前都会使用该方法，目的是杜绝之后的stroke或fill填充当前图形。

- `closePath()`:创建当前点到开始点的路径，即闭合路径，常用在三角形的第3边绘制。
- `isPointInPath(x,y)`:判断指定的点是否在当前路径上。
- `clearRect(x,y,width,height)`：清除画布指定区域的绘图。该方法很重要，在canvas中只有该方法可以清除绘图，在重绘时常常用到。



## 上手操作，快来动手吧！

> [基于Canvas的动画基本原理与数理分析](https://www.jianshu.com/p/e70c9cfbdb38)-参考该简书博客！

#### 什么是动画？

就像思考哲学问题无法回避思维和存在的关系一样，制作动画同样无法逃避的问题是动画的原理是什么？这里提一句题外话，任何原理的东西通常难以让你短期拾掇成果，但在隐约的未来会起到难以置信的效果，不信就看接下来小羊的一些学习成果分享。



![img](https:////upload-images.jianshu.io/upload_images/1993435-9e8d6f517be85218.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/472/format/webp)

驯龙高手

动画本质上是图像按照事先设定好的顺序在一定的时间内的**图像序列变化运动**。
 这种图像序列的变化运动给我们最为直观的感受就是图像仿佛真实的在运动一般，由此产生动画效果。
 然后，事实并非如此，真相往往难以用肉眼观察得到，除非你是上帝~~~
 动画的特性在于：

- 每一张图像的内容是事先设定好的，内容是不变的，变化的是图像序列按照规定的顺序在变动；
- 构成动画特效需要在单位时间内渲染一定量的图像，每张图像称之为帧（Frame），通常电影只需要24FPS就足够流畅，而游戏则需要60FPS，我们设计动画时通常选用60FPS；

总之，你所看到的动画无非是你的眼睛在欺骗你的大脑，本质上每一张图像还是那张图像，只不过它们在单位时间内按照一定顺序在快速移动罢了~~~

#### Canvas API的简介

这一部分为了兼顾之前未接触canvas元素的看官以及重温canvas的目的，帮助小羊和各位快速过一遍canvas的API。

```
//demo.html
<canvas id='canvas' width='500' height='500'></canvas> 
[注]
设置canvas的宽高要在元素或在其API，canvas.width || canvas.height，在CSS上设置为得到意想不到的结果，不信试试看哈···

//demo.js
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

//路径或图形
context.fillRect();//填充矩形
context.strokeRect();//勾勒矩形轮廓
context.arc(x,y,r,anglestart,angleend,clockwise);//画弧形

context.beginPath();//开始路径
context.moveTo();//定义路径起始点
context.lineTo();//路径的去向
context.closePath();//画完后，关闭路径
context.fill() || context.stroke();//最后画出由路径构成的图形
[注]
本质上，所有的多边形都可以由路径画出；

context.save();//保存save以上context对象设置的属性值
context.restore();//恢复到先前保存在context对象上的所有属性值
```

这里在介绍一下实现动画效果的非常重要的API：

```
window.requestAnimationFrame(callback)
先前我已经说过，动画是在单位时间内按照一定顺序的图像序列的变化形成的；
这个API的功能就是，你可以在回调函数里面写一个脚本改变图形的宽高，然后这一API就会根据浏览器的刷新频率而在一定时间内调用callback；
然后，根据递归的思想，实现callback的反复调用，最终实现动画效果；
不明白，上代码
(function drawFrame(){
    window.requestAnimationFrame(drawFrame);
    
    //some code for animation effect here
})();

上面的代码意思是立即执行drawFrame这个函数，发现  window.requestAnimationFrame(drawFrame)，okay根据浏览器的刷新频率，在一定时间之后执行；
接下来执行你所编写的改变图像内容（图像的位置、宽高、颜色等等）的脚本，执行回调；
循环反复，形成动画效果
```

由此也可知道：

```
window.requestAnimationFrame这个API你可以理解为window.setTimeout(callback,time)

事实上，当部分浏览器不兼容这个API时，我们也可以写成以下形式：


if(!window.requestAnimationFrame){
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame || 
      window.mozRequestAnimationFrame ||
      window.msRquestAniamtionFrame ||
      window.oRequestAnimationFrame || 
      function (callback){
          return setTimeout(callback,Math.floor(1000/60))
    }
  )
}
```

Okay，有了这么几个基本的canvasAPI就足以应对接下来的知识点了，如有不懂或深入了解，详见[Canvas教程-MDN](https://link.jianshu.com?t=https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial)。

【注】
 **以下所有代码托管到【github】**

#### 动画的数理分析

有了前面的基础知识，现在我们就会想：如果我们能够在每16ms（1秒60帧，1000/60）内渲染1张图像，并且每一张图像的内容发生微调，那么在1秒钟整个画面就会产生动画效果了。

内容的微调可以是图形的移动的距离、转动的方向以及缩放的比例等等，而“捕获”这些数据的方法就用使用到我们以前忽视的解析几何的知识了。

##### 移动的距离

-  **线性运动**
   线性运动就是物体朝特定方向的运动，运动过程中速度不发生改变；



![img](https:////upload-images.jianshu.io/upload_images/1993435-f492dacd327ab426.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/482/format/webp)

linear-motion

```
<canvas id="canvas"  width="500" height="500" style="background:#000"></canvas>
    <script src='../js/utils.js'></script>
<script src='../js/ball.js'></script>
    <script>

    //这个脚本中，匀速运动的原理是通过连续改变原点在x轴上的坐标，从而实现匀速运动；
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');

        var ball = new Ball();

        var xspeed = 1;//定义每渲染1帧，图形在x轴移动的距离（移动原点）   

        (function drawFrame(){
            window.requestAnimationFrame(drawFrame,canvas);
            context.clearRect(0,0,canvas.width,canvas.height);

            ball.x += xspeed;
            ball.y = canvas.height/2;

            if(ball.x>canvas.width+ball.radius){
                ball.x = -ball.radius;
            } 

            ball.draw(context);
        })();

    </script>
```

这段代码涉及部分封装的函数，这里就不讲，具体源码可以参考[【github】](https://link.jianshu.com?t=https://github.com/TernYeung/mywork)。
 这里主要讲解一下思路，如果我们需要圆在x轴上移动，那么一个思路是改变圆的圆心，使圆心在x轴上不断变化，最终形成动画的效果；
 上面的ball.x = xpeed就是每执行一次RAF(window.requestAnimationFrame)，圆心就向右移动1像素；

同理可以实现在圆在y轴上的移动，甚至是x和y轴的同时移动，这样涉及向量的合成知识了。



![img](https:////upload-images.jianshu.io/upload_images/1993435-e695aad8fe13dbe3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/567/format/webp)

图片来源：周余飞

现在大伙是不是深刻理解高中和大学时学的看似无用的解析几何的妙用啦，自然界物体的运动规律不正是遵循着这些迷人的数学等式吗？

好吧，扯远了，言归正传~~~
 小结一下物体的匀速运动：

```
1.物体的匀速运动无非是改变其在坐标轴的值，但是**每次的改变量是不变的**，也就是单位时间内的移动距离是不变的，这样才符合匀速；
2.通过向量的合成原理，我们可以在canvas画布上实现任意方向的匀速运动
```

[【linear-motion】](https://link.jianshu.com?t=http://terenyeung.applinzi.com/newapp/canvas/html/linear-motion.html)

------

-  **变速运动**
   如同你的知识积淀一样，当你学的越多，运用的越灵活，你再去get一门新的技能的时候，学习的速度就不在是匀速运动，而是变速运动了。

变速运动，本质上是物体运动过程中速度在变化，也就是以前学过的加速度的概念，也就是说要想实现物体变速运动，**只需要改变坐标轴的值，每次的改变是变化的**



![img](https:////upload-images.jianshu.io/upload_images/1993435-1788139e3097ba81.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/455/format/webp)

nonlinear-motion

```
<canvas id="canvas"  width="500" height="500" style="background:#000"></canvas>
    <script src='../js/utils.js'></script>
<script src='../js/ball.js'></script>
    <script>

   
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');

        var ball = new Ball();

        var xspeed = 1;//定义每渲染1帧，图形在x轴移动的距离（移动原点）   
        var ax = 0.5;//设置x轴上的每渲染1帧xspeed增加0.05;

        (function drawFrame(){
            window.requestAnimationFrame(drawFrame,canvas);
            context.clearRect(0,0,canvas.width,canvas.height);

            ball.x += xspeed;
            xspeed += ax;
            ball.y = canvas.height/2;
            //ball.y += 1;


            if(ball.x>canvas.width+ball.radius){
                ball.x = -ball.radius;
            } 

            ball.draw(context);
        })();


    </script>
```

[【nonlinear-motion】](https://link.jianshu.com?t=http://terenyeung.applinzi.com/newapp/canvas/html/nonlinear-motion.html)
 看完上面的代码有没有感到很神奇，同样一段代码，只需要添加`var vx = 0.5`和`xspeed+=vx`就可以使物体实现加速运动；
 看完demo后，你有没有发现，当速度达到一定程度的时候，物体给人的感觉好像是静止一样；

【注】
 这里给大伙讲一个上面非线性运动日常例子，也就是篮球的自由落体运动，先给大伙看看演示的效果：



![img](https:////upload-images.jianshu.io/upload_images/1993435-89e5fc8db7b54d07.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/346/format/webp)

gravity-acceleration

中学物理都有学过，物体在自由落体过程中受万有引力和空气摩擦力的合力——重力的影响而向下运动，球体在落地地面给了物体一个作用力导致物理受向上的力和万有引力的影响而向上运动，循环反复，由此出现上面的运动效果；

数理分析上，物体先是做向下的加速运动，落到地面后（有一个落到地面的速度）再做向上的减速运动知道速度为0时，再做向下的加速运动，循环反复，知道小球落到地面；

```
<script>

   
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');

        var ball = new Ball(20,'white');


        //设置小球初始降落的位置
        ball.x = canvas.width/2;
        ball.y = canvas.height/5;

        var vy = 0;
        var gravity = 0.05;//定义重力加速度；
        var bounce = -0.8;//定义反弹系数；

        //碰撞测试
        function checkGround(ball){
            if(ball.y+ball.radius>canvas.height){

                //小球碰到地面时，让球的位置暂时设置为在地面上
                ball.y = canvas.height - ball.radius;

                //此时设置小球落到地面时的速度为反向，大小为原来的0.8；
                vy *= bounce;
            }
        }

        (function drawFrame(){
            window.requestAnimationFrame(drawFrame,canvas);
            context.clearRect(0,0,canvas.width,canvas.height);

            //小球首先做向下的加速运动
            vy += gravity;
            ball.y += vy;

            //碰撞测试，当小球下落到地面时，vy *= bounce;
            //此时小球在地面时的初始速度为vy *= bounce(vy此时是负值),接着继续向上运动，每渲染1帧，vy+=gravity，注意此时小球做向上的减速运动，直到速度为0时；
            //接着小球继续做向下加速运动，循环往复，直到小球停止；
            checkGround(ball)

            ball.draw(context);
        })();

    </script>
```

[【gravity-acceleration】](https://link.jianshu.com?t=http://terenyeung.applinzi.com/newapp/canvas/html/gravity-acceleration.html)

各位可以尝试去修改gravity和bounce的参数，你会有意想不到的结果发现；

------

-  **波形运动**
   波形运动，顾名思义像波浪般的运动，运动轨迹如同下面的三角函数一般；
   此时，我们不禁会想：要实现波形运动的轨迹，是不是需要用到三角函数呢？
   Bingo，答对了~~~可是知识已经还给我敬爱的老师嘞；



![img](https:////upload-images.jianshu.io/upload_images/1993435-3f7e5bf2292e5d70.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/634/format/webp)

图片来源：周余飞

别紧张，其实实现这个轨迹so easy，听我娓娓道来······

先分析一下思路：
 实现圆按照波形运动的动画原理是什么？
 每16ms浏览器渲染1帧，每1帧圆的圆心位置发生改变，改变的路径就是这个正弦函数；



![img](https:////upload-images.jianshu.io/upload_images/1993435-47f968769a6b4095.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/487/format/webp)

waving-motion

还不懂？答案就是跟前面的代码一模一样，只不过x轴的变化值由

```
//匀速运动
ball.x = xspeed//xspeed = 1一直都是1；

//变速运动
var ax = 0.05;
ball.x += xspeed //xspeed = 1初始值为1；
xspeed += ax//每16ms，xspeed增加0.05；
【注】
各位童鞋自己想一下曲线运动如何实现？提示一下，结合匀速运动和变速运动一起思考；
[【curve-motion】](http://terenyeung.applinzi.com/newapp/canvas/html/curve-motion.html)

//波形运动
var angle = 0;//定义每次变化的角度
var swing = 100;//定义振幅；


ball.x +=2;
ball.y  = canvas.height/2 + Math.sin(angle)*swing;
angle += 0.1;
```

完整代码如下：

```
<script>

    
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');

        var ball = new Ball();

        var angle = 0;
        var swing = 100;
    

        (function drawFrame(){
            window.requestAnimationFrame(drawFrame,canvas);
            context.clearRect(0,0,canvas.width,canvas.height);

            ball.x += 2;
            ball.y = canvas.height/2+Math.sin(angle)*swing;
            //ball.y += 1;
            angle += 0.1;

            if(ball.x>canvas.width+ball.radius){
                ball.x = -ball.radius;
            } 

            ball.draw(context);
        })();


    </script>
```

[【waving-motion】](https://link.jianshu.com?t=http://terenyeung.applinzi.com/newapp/canvas/html/waving-motion.html)

细心的童鞋可能已经发现这么一个规律：物体的运动轨迹无非就是通过改变物体在canvas坐标轴上的值+RAF这个API而产生运动的；

匀速运动设置ball.x += 1，每频次图形的x轴右移1px；

变速运动设置ball.x += vx, vx += ax，每频次图形x轴右移vx后，vx加ax，下一次图形将移动vx+ax从而实现变速；

波形运动则设置ball.y = centerY + Mathsin(angle)*swing，由于正弦函数的值区间为[-1,1]，所以图形会永远在[centerY-swing,centerY+swing]上下移动；

这一种思想将会对后面的图形运动的思考同样奏效；

------

-  **圆形运动**
   现在我们再想一下，如何让圆围绕一个点做圆周运动？
   我们学到的解析几何有什么是可以表示圆的？相信各位童鞋已经学会开始抢答了，对啦就是

```
x*x+y*y = r*r//这是一原点为圆心，半径为r的圆；
```

或许有童鞋会问候我尼玛，你刚才不是告诉我实现物体运动，只要按照RAF改变物体坐标轴的值就行了吗，你给我上面这么一个等式，那我怎么样去给ball.x和ball.y赋值；

人类一思考，上帝就发笑，这是小羊写这篇文章时新鲜看到的一句话，我一开始的理解为嘲讽人类的自作聪明，后来想一下我更加愿意理解为上帝是在对人类不断追求真理这一行为的勉励把；



![img](https:////upload-images.jianshu.io/upload_images/1993435-24c23b1e925cf370.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/411/format/webp)

circular-motion

如果有看官想到这一层面，我会觉得你很牛X，因为我是事后复习才想到这一点的。不卖关子，大家应该听说过极坐标把（再一次验证原理的有效性）

```
//圆的极坐标表达式为
x = rcosθ
y = rsinθ

也就是说给我一个圆的半径和每次旋转的角度，我就可以用x和y的方式描绘圆的路径
```

二话不说上代码：

```
<script>

    
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');

        var ball = new Ball();

        var angle = 0.1;
        var scope = 100;
    
        (function drawFrame(){
            window.requestAnimationFrame(drawFrame,canvas);
            context.clearRect(0,0,canvas.width,canvas.height);

            ball.x = canvas.width/2+Math.cos(angle)*scope;
            ball.y = canvas.height/2+Math.sin(angle)*scope;
            //ball.y += 1;
            angle += 0.1;

            // if(ball.x>canvas.width+ball.radius){
            //  ball.x = -ball.radius;
            // } 

            ball.draw(context);
        })();


    </script>
```

[【circular-motion】](https://link.jianshu.com?t=http://terenyeung.applinzi.com/newapp/canvas/html/circular-motion.html)

有了圆形运动，再讲一下椭圆运动，思考过程和上面基本一样，数学表达式为：

```
(x/a)*(x/a)+(y/b)*(y/b)=1
//极坐标
x = a*cosθ
y = b*sinθ
```

有了这两个坐标，图形的椭圆路径还不出来吗，相信你已经跃跃欲试了，我这里就直接给demo啦。



![img](https:////upload-images.jianshu.io/upload_images/1993435-841a1328a605022d.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/520/format/webp)

ellipse-motion

[【ellipse-motion】](https://link.jianshu.com?t=http://terenyeung.applinzi.com/newapp/canvas/html/ellipse-motion.html)

其实，圆形运动本质上就是特殊的椭圆运动，各位可以看一下二者的联系与区别：

```
//圆形运动
var angle = 0,scope = 100;
x = canvas.width/2 + scope*Math.cos(angle)
y = canvas.height/2 + scope*Math.sin(angle)
angle += 0.1;

//椭圆运动
var angle = 0,scopeX = 150 , scopeY = 80;
x = canvas.width/2 + scopeX*Math.cos(angle)
y = canvas.height/2 + scopeY*Math.sin(angle)
angle += 0.1;
```

#### 转动的方向

动画特效当中其中有一个很重要的点就是物体的转动方向问题，以自然界的实例来看，你会看到地球自转及其围绕太阳公转；



![img](https:////upload-images.jianshu.io/upload_images/1993435-1b22fb655f32b03a.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/358/format/webp)

self-rotation



![img](https:////upload-images.jianshu.io/upload_images/1993435-1bb1a485771c1a53.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/467/format/webp)

resolution

这里先给上一段实现封装好的Arrow类，用于后面的讲解所用；

```
//arrow.js
function Arrow(){
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    this.color = '#ff0';
};

Arrow.prototype.draw = function(context){
    context.save();
    context.translate(this.x,this.y);
    context.rotate(this.rotation);
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(-50,-25);
    context.lineTo(0,-25);
    context.lineTo(0,-50);
    context.lineTo(50,0);
    context.lineTo(0,50);
    context.lineTo(0,25);
    context.lineTo(-50,25);
    context.closePath();
    context.stroke();
    context.fill();
    context.restore();
};
```

小羊在转动的方向这一部分要使用一个canvas的新API——context.rotate(angle)来控制物体的转动；

到现在只要你掌握前面所讲的动画原理的话，那么就不难推理出自转和公转的动画来；

自转：每16ms变化一次angle，那么angle作为参数每传递1次，物体就会转动1次，最终形成自转

```
 window.onload = function(){
    var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');

        var arrow = new Arrow();

        var angle = 0;
        arrow.x = canvas.width/2;
        arrow.y = canvas.height/2;

        (function drawFrame(){
            window.requestAnimationFrame(drawFrame,canvas);
            context.clearRect(0,0,canvas.width,canvas.height);
            arrow.rotation = angle;
            angle +=0.1;

            arrow.draw(context);
        })();

  }
```

[【self-rotation】](https://link.jianshu.com?t=http://terenyeung.applinzi.com/newapp/canvas/html/self-rotation.html)

公转：使用圆周运动的方法实现公转；
 [【resolution】](https://link.jianshu.com?t=http://terenyeung.applinzi.com/newapp/canvas/html/resolution.html)

上面的angle的赋值是机械式，如果我们想要鼠标转到哪里，箭头就指到哪里，会不会更加具有交互性；

物体转动的角度和鼠标的指向有关，那么如何建立二者之间的联系呢？



![img](https:////upload-images.jianshu.io/upload_images/1993435-788eba2bcf10edfc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/307/format/webp)

图片来源：周余飞

上图给出了答案：先是获取到鼠标在canvas上的坐标，然后获取到物体中心的坐标，根据二点间的距离公式，可以测算出鼠标距离中心点在x轴和y轴的分量dx和dy，然后通过一个很牛掰的三角函数，

```
object.rotation = Math.atan2(dy,dx);
```

这个三角函数作用是给它两个x和y轴的距离分量，就可以测算出鼠标与x轴的夹角来；
 有同学会问：问什么可以这样？这个暂时无法回答，这个问题深究下去就不属于本笔记范围之内了，知道有这么一个方法就okay啦；

测算出角度，就可以给context.rotation(angle)传参啦，此时箭头将会跟着鼠标转动；

```
 window.onload = function(){
    var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        var mouse = utils.captureMouse(canvas);
        var arrow = new Arrow();

        var angle = 0;
        arrow.x = canvas.width/2;
        arrow.y = canvas.height/2;

        (function drawFrame(){
            window.requestAnimationFrame(drawFrame,canvas);
            context.clearRect(0,0,canvas.width,canvas.height);
            
            var dx = mouse.x - arrow.x,
                dy = mouse.y - arrow.y;
            angle = Math.atan2(dy,dx);
            arrow.rotation = angle;
            arrow.draw(context);
        })();

  }
```

[【rotation-to-cursor】](https://link.jianshu.com?t=http://terenyeung.applinzi.com/newapp/canvas/html/rotation-to-cursor.html)

okay，现在有了转动，再加入先前的物体运动就可以让"让子弹飞"啦~~~
 [【cursor-follow】](https://link.jianshu.com?t=http://terenyeung.applinzi.com/newapp/canvas/html/cursor-follow.html)

这个demo是一个小飞机，你按下啥键它就会飞向哪，真正实现和用户交互；
 [【spaceShip】](https://link.jianshu.com?t=http://terenyeung.applinzi.com/newapp/canvas/html/spaceShip.html)

【注】
 Math.atan2(dy,dx)函数很重要！！！，这意味着这要你能够测算出鼠标与指定点之间的x轴和y轴的分量，那么你就可以获取到鼠标与指定点的连线与x轴所形成的的夹角，由此就可以去改变物体的运动或是转向；

#### 缩放的比例

canvas提供缩放功能的API可以让我们对物体进行缩放大小，如果结合我们之前学的一些解析几何的知识，那么就可以创作出千变万化的缩放特效出来；



![img](https:////upload-images.jianshu.io/upload_images/1993435-89e8106d23f69b63.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/423/format/webp)

plusing-motion

```
   <script>
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        var ball = new Ball();
            ball.x = canvas.width/2;
            ball.y = canvas.height/2;

        var angle = 0,
            centerScale = 1;
            swing = 0.5;
    
        (function drawFrame(){
            window.requestAnimationFrame(drawFrame,canvas);
            context.clearRect(0,0,canvas.width,canvas.height);

            angle += 0.05

            //plusing-effect
            ball.scaleX = ball.scaleY = centerScale + Math.sin(angle)*swing;
        
            //bigger and bigger effect
            //ball.scaleX = ball.scaleY = centerScale + angle
            ball.draw(context);
        })();
    </script>
```

[【plusing-motion】](https://link.jianshu.com?t=http://terenyeung.applinzi.com/newapp/canvas/html/scale-motion.html)

------

#### 总结

本篇文章题目是《基于Canvas的动画基本原理与数理分析》，因此只介绍了一些在使用canvas元素绘制动画时运用到的一些常用的解析几何原理和相关的物理知识，例如匀速运动、变速运动、圆周运动、波形运动、脉冲运动，这些运动过程中可涉及到的概念又包括向量的分解（力的分解）、重力、摩擦力、加速度、三角函数等等······

物体的属性——在canvas上的位置、方向和比例的变化万千无非是使用上述的数学等式通过RAF从而形成动画效果的；

当然，仅仅掌握这些并不足以让你设计出相当出彩的动画特效，但是就像开头所说的这部分的知识点相当于是动画的基本原理，它相对于直接使用CSS3做动画来的艰深复杂些，短期可能会花我们一些时间去理解，但是往后保不准会排上用场，反正我在学习的过程中就充满力量感——因为尼玛高中学的物理和大学学的高数终于排上用场啦！！！

canvas动画的知识点还包括一些具体的应用和晋升到3D的层次，这一部分的内容就留给童鞋们自行解决，冥冥之中我有种预感，你只要把上面的掌握住了，高级的就不成问题了；

