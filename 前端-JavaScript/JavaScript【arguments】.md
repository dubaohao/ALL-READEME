# JavaScript的arguments到底是什么？

## 数组对象：arguments

总所周知，js是一门相当灵活的语言。当我们在js中在调用一个函数的时候，我们经常会给这个函数传递一些参数，js把传入到这个函数的全部参数存储在一个叫做arguments的东西里面，那么这到底是什么东西？

在js中万物皆对象，甚至数组字符串函数都是对象。所以这个叫做arguments的东西也是个对象，而且是一个特殊的对象，它的属性名是按照传入参数的序列来的，第1个参数的属性名是’0’，第2个参数的属性名是’1’，[以此类推](https://www.baidu.com/s?wd=%E4%BB%A5%E6%AD%A4%E7%B1%BB%E6%8E%A8&tn=24004469_oem_dg&rsv_dl=gh_pl_sl_csd)，并且它还有length属性，存储的是当前传入函数参数的个数，很多时候我们把这种对象叫做类数组对象。类数组对象和数组都是对象这个父亲生的，但是数组是大哥比类数组对象多了很多其他的方法，类数组对象只是长得很像数组的弟弟而已。

慢着，刚刚不是说数组也是对象吗，现在这个类数组对象又是什么？ 没办法，js就是这么的灵活。这个类数组对象不仅存储给函数传入的参数，也具有一些其他的属性。

因为类数组对象和数组有很多的共性，所以我们经常可以用call方法，让类数组对象也使用的数组的一些方法

------

## arguments的属性

接下来我们来看看arguments对象里面到底有些什么东西，是[骡子](https://www.baidu.com/s?wd=%E9%AA%A1%E5%AD%90&tn=24004469_oem_dg&rsv_dl=gh_pl_sl_csd)是马拉出来溜溜。

```
function showargs() {
    console.log( arguments );
}

showargs(1,2,3,4,5);12345
```

下面我们用console.log的方式，将arguments对象输出到控制台，这里不得不说一句，chrome的console工具好用得不得了（我不是来打广告的）。

![arguments](..\assets\20161119152524405)

这里我们可以看到arguments对象将我传入的五个参数以数组的形式保存在里面，还有保存了我传入函数的实参的个数（length）。而且我们可以看到arguments对象的 ==*_ proto _*== 是指向object的，这也说明了他是个类数组对象，而不是一个数组。

有了这个对象我们以后写函数的时候，就不用给所有的形参指定参数名，然后通过参数名的方式获取参数了，我们可以直接使用arguments对象来获取实参，这样是不是方便了很多呢。 
有些语言在我们给函数指定了参数名之后，当调用函数时，会判断当前传入的参数是否与函数定义的参数个数相等，不相等就会报错，但是灵活的js（不是我说，js是真的灵活）并不会验证传递给函数的参数个数是否等于函数定义的参数个数。所以为了装逼（代码的简洁度），我们使用arguments调用参数可以不混淆不同函数之间的参数名。另外为了装逼（代码的严整度），我们也能用arguments来判断当前传入参数的个数是否与我们需要的数量一致。

下面举个栗子：

```
function add() {
    if( arguments.length == 2 ){
        return arguments[0] + arguments[1];
    }else{
        return '传入参数不合法';
    }
}

console.log( add(2,3) );
console.log( add(1,2,3) );12345678910
```

看看结果：

![结果](..\assets\20161119154939672)

最后我们还可以看到arguments还有一个叫做callee的属性，这个属性是表示的是当前函数的一个引用，简单点说，这个属性里面存储的我们调用的这个函数的代码，实在无法理解的时候，又到了console.log[大显身手](https://www.baidu.com/s?wd=%E5%A4%A7%E6%98%BE%E8%BA%AB%E6%89%8B&tn=24004469_oem_dg&rsv_dl=gh_pl_sl_csd)的时候了。

```
function showcallee() {
    var a = '这里是代码';
    var b = '这是另一段代码';
    var c = a + b;

    console.log(arguments.callee);

    return c;
}
showcallee();12345678910
```

![结果](..\assets\20161119161029575)

看到结果的你是不是和我一样惊呆了呢，这不就是我写的代码吗，arguments.callee完完整整的把这个函数的这段代码返回了。

------

## arguments的一些妙用

**1.利用arguments实现方法的重载**

下面我们利用arguments对象来实现一个参数相加的函数，不论传入多少参数都行，将传入的参数相加后返回。

```
function add() {
    var len = arguments.length,
        sum = 0;
    for(;len--;){
        sum += arguments[len];
    }
    return sum;
}

console.log( add(1,2,3) );   //6
console.log( add(1,3) );     //4
console.log( add(1,2,3,5,6,2,7) );   //26123456789101112
```

由于js是一种弱类型的语言，没有重载机制，当我们重写函数时，会将原来的函数直接覆盖，这里我们能利用arguments，来判断传入的实参类型与数量进行不同的操作，然后返回不同的数值。

**2.利用arguments.callee实现递归**

先来看看之前我们是怎么实现递归的，这是一个结算阶乘的函数

```
function factorial(num) { 
    if(num<=1) { 
        return 1; 
    }else { 
        return num * factorial(num-1); 
    } 
} 1234567
```

但是当这个函数变成了一个匿名函数时，我们就可以利用callee来递归这个函数。

```
function factorial(num) { 
    if(num<=1) { 
        return 1; 
    }else { 
        return num * arguments.callee(num-1); 
    } 
} 1234567
```

在严格模式中我们被禁止不使用var来直接声明一个全局变量，当然这不是重点，重点是arguments.callee这个属性也被禁止了。