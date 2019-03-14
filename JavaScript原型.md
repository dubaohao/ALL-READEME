## JavaScript原型

## 概述

本系列文章的第一篇中提到了对象类型，对象是 JavaScript 中的重要角色之一，本篇便从**原型**这个知识点切入，希望大家在阅读过本篇文章之后脑海中都能够建立起一张完整的思维导图。

## 函数与对象的关系

首先我们要确定一点，**函数是一种可调用的对象**，也在本系列第一篇中曾提到过，我们可以做如下校验：

```
(()=>{}) instanceof Object   // true
复制代码
```

其次我们要确定，**对象都是通过函数创建的**，比如我们平时写的对象字面量，其实只是 `new Object()` 之类的语法糖而已。

知道以上两点之后，我们可以说，函数是一种对象，对象又是通过函数创建，所以对象创建对象。是否会觉得有点不明觉厉的感觉？其实要弄清楚它们之间的关系，不用去管这些弯弯绕。

只要再明白一点，JavaScript 中除了 `Object` ，还存在一个角色，那就是 `Function` 。

我们先来看一下在浏览器控制台打印出 `Object` 和 `Function` 的结果：

```
>  Object
<· ƒ Object() { [native code] }
>  Function
<· ƒ Function() { [native code] }
复制代码
```

## 原型

原型属于 JavaScript 的核心，我们一步步来分析，了解原型的方方面面。

### `prototype` 和 `[[Prototype]]`

我们知道函数是可调用对象，既然是对象，函数也是属性的集合。这些属性中其中一个就是 `prototype` 属性，也就是我们通常所说的原型。**所有函数都有 prototype 属性**  (`Function.prototype.bind()` 例外)。而 `prototype` 是一个对象，它有个 `constructor` 属性指向这个函数。这里用思维导图表示出来，大家可以自行在浏览器窗口打印相关信息来印证。



![img](https://user-gold-cdn.xitu.io/2019/3/14/1697a5313800666b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



从上图可以很清楚看出 `function Foo()` 与 `Foo.prototype` 的关系，同时我们会看到实例对象 `foo` 有一个 `__proto__` 属性指向 `Foo.prototype`。`__proto__`我们称为隐式原型，只是对象内置属性`[[Prototype]]`的非标准实现，虽然浏览器都支持但是不推荐使用。

下文为方便表达理解，`[[Prototype]]` 内置属性会用 `__proto__` 表示。

> ES6中推荐使用 `Object.getPrototypeOf()`方法来返回一个对象的 `[[Prototype]]`，使用 `Object.setPrototypeOf()` 方法来设置一个对象的 `[[Prototype]]`。

### 更进一步

我们知道 `Foo.prototype` 也是一个对象，那它的 `__proto__` 指向哪里呢？

我们知道 `function Object()` 也是函数，所以它和普通构造函数拥有同样的规则，不同点在于，`Object.prototype` 位于原型链顶端，看图：



![img](https://user-gold-cdn.xitu.io/2019/3/14/1697a567813b2e99?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



由上图可知，`Foo.prototype` 的 `__proto__`指向了 `Object.prototype` ， `Object.prototype` 也是一个对象，它的 `__proto__` 指向了 `null`，这应该好理解，意思就是到顶了。

### 解开谜团

是时候解开谜团了，上文也提到 `function Function()` 也是函数，是不是和 `function Foo()` 和 `function Object()`适用同样的规则呢？答案是肯定的，看下图：



![img](https://user-gold-cdn.xitu.io/2019/3/14/1697a569e688c509?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



这里除了上面的规则，我们还应注意到几个点：

- `function Foo()` 、 `function Object()` 的 `__proto__`属性都指向了 `Function.prototype`，这说明**函数都是通过 Function构造函数 new 出来的** ；
- `function Function()` 是个例外，虽然它的 `__proto__` 也指向了`Function.prototype`，但是是引擎先内建了 `Function.prototype`， 然后才有 `function Function()`，所以并不是自己创建自己；
- `Function.prototype` 的 `__proto__` 指向了 `Object.prototype`，是因为引擎先创建 `Object.prototype`，再创建 `Function.prototype`，并将两者用 `__proto__` 联系起来。

## 原型链

上面的图已经画出了一条条的箭头指向的链条，通过 `__proto__` 属性连接，这就是原型链。

具体的可以理解为：当寻找一个对象的某个属性时，如果没有找到，则会顺着 `__proto__` 属性指向的原型对象上查找，一直往上直到 `Object.prototype`，这一条查找的线路就被称之为原型链。

## 总结

为方便理解，总结必不可少：

1. `Object.prototype` 和 `Function.prototype` 是两个特殊对象，由引擎创建，所以不用纠结这俩对象怎么来的了；
2. 对象都能通过 `__proto__` 属性找到 `Object.prototype`，`Object.create(null)` 创造出的对象例外，因为没有 `__proto__` 属性;
3. 函数都能通过 `__proto__` 属性找到 `Function.prototype`;
4. 对象都是函数 `new` 出来的，除了上面两个特殊对象；
5. 函数的 `prototype` 是对象，它有个 `constructor` 属性指向构造函数本身；
6. 对象的 `__proto__` 指向原型， `__proto__` 将对象和原型连接起来组成了原型链