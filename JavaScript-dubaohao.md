#JavaScript学习-dubaohao
2018/11/12 14:52:49 

>1.JavaScript 中包含以下 7 个全局函数

escape( )、eval( )、isFinite( )、isNaN( )、parseFloat( )、parseInt( )、unescape( )。

>2.近似方法：

Math.ceil()执行向上舍入，即它总是将数值向上舍入为最接近的整数；
Math.floor()执行向下舍入，即它总是将数值向下舍入为最接近的整数；
Math.round()执行标准舍入，即它总是将数值四舍五入为最接近的整数(四舍五入)。

>3.三个都是事件对象的方法：

stopPropagation() 阻止事件冒泡。 这个事件不会阻止定义在元素上的其他事件。
stopImmediatePropagation() 会彻底的阻止事件， 在其之后的绑定在元素上的其他监听事件都不会触发
preventDefault() 阻止事件的默认动作
