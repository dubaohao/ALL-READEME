 javascript双等号引起的类型转换，js隐性类型转换步骤

## 引子

if语句应该是程序员用的比较多的语句，很多时候都要进行if判断，if语句一般用双等号来判断前后两个元素是否是一致的，假如是一致，那么返回是true，然后执行下面的语句，否则，执行别的语句。本问所说的隐性类型的转换，说的是==引起的转换。举个简单的例子，双等号不是全等号，全等号是“===”三个等号，语句"1"==1，那么一般情况下是前面的字符串”1“转换为数字1，然后进行比较。通过这个例子应该了解了什么是隐性类型的转换了吧！

> 使a==1 and a==2 and a==3恒成立？
> 使a===1 and a===2 and a===3恒成立？

> 1.重写Object的toString或者valueOf方法

> 2.数组toString隐含调用join()方法

> 3.定义"a"属性，并重写它的getter方法

> 解答答案在文章末尾！！！！

## 隐性类型转换步骤

**一、首先看双等号前后有没有NaN，如果存在NaN，一律返回false。**

**二、再看双等号前后有没有布尔，有布尔就将布尔转换为数字。（false是0，true是1）**

**三、接着看双等号前后有没有字符串, 有三种情况：**

> **1、对方是对象，对象使用toString()或者valueOf()进行转换；**
>
> **2、对方是数字，字符串转数字；（前面已经举例）**
>
> **3、对方是字符串，直接比较；**
>
> **4、其他返回false**

**四、如果是数字，对方是对象，对象取valueOf()或者toString()进行比较, 其他一律返回false**

**五、null, undefined不会进行类型转换, 但它们俩相等**

**上面的转换顺序一定要牢记，面试的时候，经常会出现类型的问题。**

## .toString()方法和.valueOf()方法数值转换

通常情况下我们认为，将一个对象转换为字符串要调用toString()方法，转换为数字要调用valueOf()方法，但是真正应用的时候并没有这么简单，看如下代码实例:

```
var obj = {
 webName: "haorooms前端博客",
 url:"www.haorooms.com"
}
console.log(obj.toString()); //[object Object]
```

同理，我们再看valueOf()方法：

```
var arr = [1, 2, 3];
console.log(arr.valueOf());//[1, 2, 3]
```

从上面的代码可以看出，valueOf()方法并没有将对象转换为能够反映此对象的一个数字。相反，我们用toString()

```
var arr = [1, 2, 3];
console.log(arr.toString());//1,2,3
```

**注：很多朋友认为，转换为字符串首先要调用toString()方法， 其实这是错误的认识，我们应该这么理解，调用toString()方法可以转换为字符串，但不一定转换字符串就是首先调用toString()方法。**

我们看下下面代码：

```
var arr = {};
arr.valueOf = function () { return 1; }
arr.toString = function () { return 2; }
console.log(arr == 1);//true

var arr = {};
arr.valueOf = function () { return []; }
arr.toString = function () { return 1; }
console.log(arr == 1);//true
```

上面代码我们可以看出，转换首先调用的是valueOf()，假如valueOf()不是数值，那就会调用toString进行转换！

```
var arr = {};
arr.valueOf = function () { return "1"; }
arr.toString = function () { return "2"; }
console.log(arr == "1");//true
```

假如"1"是字符串，那么它首先调用的还是valueOf()。

```
var arr = [2];
console.log(arr + "1");//21
```

上面的例子，调用的是toString（）;因为arr.toString（）之后是2。

转换过程是这样的，首先arr会首先调用valueOf()方法，但是数字的此方法是简单继承而来，并没有重写（当然这个重写不是我们实现），返回值是数组对象本身，并不是一个值类型，所以就转而调用toString()方法，于是就实现了转换为字符串的目的。

## 小结

大多数对象隐式转换为值类型都是首先尝试调用valueOf()方法。但是Date对象是个例外，此对象的valueOf()和toString()方法都经过精心重写，默认是调用toString()方法，比如使用+运算符，如果在其他算数运算环境中，则会转而调用valueOf()方法。

```
var date = new Date();
console.log(date + "1"); //Sun Apr 17 2014 17:54:48 GMT+0800 (CST)1
console.log(date + 1);//Sun Apr 17 2014 17:54:48 GMT+0800 (CST)1
console.log(date - 1);//1460886888556
console.log(date * 1);//1460886888557
```

## 举例巩固提高

下面我们一起来做做下面的题目吧！

```
var a;
console.dir(0 == false);//true

console.dir(1 == true);//true


console.dir(2 == {valueOf: function(){return 2}});//true


console.dir(a == NaN);//false
console.dir(NaN == NaN);//false

 console.dir(8 == undefined);//false

console.dir(1 == undefined);//false

 console.dir(2 == {toString: function(){return 2}});//true

 console.dir(undefined == null);//true

 console.dir(null == 1);//false

  console.dir({ toString:function(){ return 1 } , valueOf:function(){ return [] }} == 1);//true

  console.dir(1=="1");//true
  console.dir(1==="1");//false
```



**解答最开始的问题**

首先，如果a是一个对象，那在执行a==的时候首先会去先执行valueOf方法，如果没有value方法，就会去执行toString方法。因此我们可以改写a对象的toString方法：

```
let a = {
    i : 1,
    toString: function(){
        return a.i++
    }
}
if(a==1&&a==2&&a==3){
    console.log('success')
} else {
    console.log('fail')
} 
```

然后，我们还可以联想到，如果a是一个数组，在数组转换成字符串的时候，会去实行数组的join方法，那我们改写一下join方法不就行了，看实现：**数组toString隐含调用join()方法**

```
let a = [1,2,3];
a.join = a.shift;
if(a==1&&a==2&&a==3){
    console.log('success')
} else {
    console.log('fail')

}
```

 **定义"a"属性，并重写它的getter方法**

```
const value = function* () {
  let i = 0;
  while(true) yield ++i;
}();

Object.defineProperty(this, 'a', {
  get() {
    return value.next().value;
  }
});

if (a === 1 && a === 2 && a === 3) {
  console.log('yo!');
}
```

Object.defineProperty()定义"a"为this的属性，并定义了a属性的getter方法。这样在条件语句里使用的a，实际为this的属性a。

这里使用了ES6新增的特性：Generator函数来产生value。

> 使a===1 and a===2 and a===3恒成立？

```
var value = 0; //window.value
Object.defineProperty(window, 'a', {
    get: function() {
        return this.value += 1;
    }
});

console.log(a===1 && a===2 && a===3) // true
复制代码
```

从经典问题的解答中，我们了解到JS中的原始类型将不再满足于上面的条件(严格相等没有转化的过程)，所以我们需要通过一些方式去调用一个函数，并在这个函数中做我们想做的事情。但是执行函数往往需要在函数名字后引入 `()`。并且由于这里不是宽松相等 `==` ， `valueOf` 将不会被JS引擎调用。Emmm, 有点棘手。还好有 `Property` 函数, 特别是 `getter` 描述符， 带来了解决这个问题的办法。