# [译] 如何在 JavaScript 中使用 apply(💅)，call(📞)，bind(➰)



![img](https://user-gold-cdn.xitu.io/2019/3/11/1696bd0eca224a8d?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



> 原文链接：[How to use the apply(💅), call(📞), and bind(➰) methods in JavaScript](https://link.juejin.im/?target=https%3A%2F%2Fmedium.freecodecamp.org%2Fhow-to-use-the-apply-call-and-bind-methods-in-javascript-80a8e6096a90)
> 原文作者：[Ashay Mandwarya](https://link.juejin.im/?target=https%3A%2F%2Fmedium.freecodecamp.org%2F%40ashaymurceilago)
> 译者：[JintNiu](https://juejin.im/user/5b847cd2e51d4538af60f8cd)
> 推荐理由：`apply`,`call` 和 `bind` 在面试和日常编码中常会遇到，了解和掌握他们的用法变得尤为重要。

在本文中，我们将讨论函数原型链中的 `apply`，`call` 和 `bind` 方法，它们是 `JavaScript` 中最重要且经常使用的概念，且与 `this` 关键字密切相关。

因此，想要掌握本文所述内容，您必须熟悉 `this` 关键字的概念和用法。可以参考[这篇文章](https://link.juejin.im/?target=https%3A%2F%2Fmedium.freecodecamp.org%2Fa-guide-to-this-in-javascript-e3b9daef4df1)。

> 译者注：可参考：[[译\] JavaScript 之 this 指南](https://juejin.im/post/5c876ba96fb9a049ae08bc63)

要了解 `apply`|`call`|`bind`，我们首先需要了解 `JavaScript` 中的 `Function`，当然这前提是你可以熟料运用 `this` 了。

## Functions



![img](https://user-gold-cdn.xitu.io/2019/3/11/1696bd12c740963a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



`Function` 构造函数创建了一个新的 `Function` 对象。直接调用构造函数的话，可以动态地创建出在全局作用域下的函数。

在 `JavaScript` 中，函数是一种对象，可以由`apply`，`call` 和 `bind` 方法进行调用。

要检查函数是否为一个 `Function` 对象，我们可以使用以下代码进行判断，该代码段返回 `true`。

```
(function () { }).constructor === Function ? console.log(true) : console.log(false);
复制代码
```

> 全局 `Function` 对象没有自己的方法或属性。但由于它本身就是一个函数，可以通过 `Function.prototype` 原型链继承一些方法和属性。 — MDN

以下是函数原型链中的方法：

- `Function.prototype.apply()`
- `Function.prototype.bind()`
- `Function.prototype.call()`
- `Function.prototype.isGenerator()`
- `Function.prototype.toSource()`
- `Object.prototype.toSource`
- `Function.prototype.toString()`
- `Object.prototype.toString`

这篇文章中我们只讨论前三个。

## Apply 💅



![img](https://user-gold-cdn.xitu.io/2019/3/11/1696c68f09b17b6e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



> `apply()` 是函数原型中的一个重要方法，用于调用其他函数， 参数为给定 `this` 和一个数组（或类似数组的对象）。

类数组对象可以参照 `NodeList` 或函数内的 `arguments` 对象。

这意味着我们可以调用任何函数，并显式指定调用时 `this` 的指向。

### 语法

```
function.apply(this,[argumentsArray])
复制代码
```

### 返回值

返回 `this` 指向函数的调用结果。

### 描述

`apply()` 方法使对象 `x` 中的函数/对象可以被另一个对象 `y` 调用。

### 例子

### 1.

```
var array = ['a', 'b'];
var elements = [1, 2, 3];
array.push(elements);
console.log(array);  // ['a', 'b', [1, 2, 3]]
复制代码
```

以上代码中，当我们将一个数组 `push` 进另一个数组时，整个数组被视为一个元素直接 `push` 进去。但如果我们想要将数组 `elemennts` 中的元素分别 `push` 进数组 `array` 中呢？当然有很多方法可以这样做，在这里我们使用 `apply()`。

```
var array = ['a', 'b'];
var elements = [1, 2, 3];
array.push.apply(array, elements);
console.log(array); // ["a", "b", 1, 2, 3]
复制代码
```

该例中，使用 `apply` 连接给定数组，参数为数组 `elements`，`this` 指向变量 `array`，实现数组 `elements` 中的元素被 `push` 进 `this` 指向的对象（`array`）中。最终返回的结果为第二个数组中的每个元素被 `push` 进 `this` 指向的数组中。

### 2.

```
var numbers = [53, 65, 25, 37, 78];
console.log(Math.max(numbers)); //NaN
复制代码
```

`JS` 中 `max` 函数用于查找给定元素的最大值。但正如我们所见，如果给定值为数组，返回结果为 `NaN`。当然，`JavaScript` 中有很多方法可以解决，在这里我们使用 `apply`。

```
var numbers = [53, 65, 25, 37, 78];
console.log(Math.max.apply(null, numbers)); //78
复制代码
```

当我们使用 `apply` 调用 `Math.max()` 时，得到了期望结果。`apply` 将 `numbers` 中所有值作为单独的参数，然后再调用 `max` 进行处理，最终返回数组中的最大值。

值得注意的是，我们使用 `null` 代替了 `this`。由于提供的参数是数字数组，即使使用了 `this`，它也仍会指向同一个数组，最终得到相同的结果。因此，这种情况下我们可以省略 `this`，改用 `null` 代替。也就是说，`apply` 函数中的 `this` 参数是一个可选参数。

## Call 📞



![img](https://user-gold-cdn.xitu.io/2019/3/11/1696cad7c0e8f511?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



> `call()` 方法用于调用一个函数，参数为给定 `this` 和若干个单独指定的参数序列。

这意味着我们可以调用任何函数，并显式指定调用时 `this` 的指向。

这与 `apply` 非常相似，唯一的区别是 `apply` 以数组或类数组对象的形式接受参数，而 `call` 的参数是单独提供的。

### 语法

```
function.call(thisArg,arg1,arg2,...)
复制代码
```

### 返回值

返回 `this` 指向且参数为给定参数的函数调用结果。

### 描述

`call()` 方法使对象 `x` 中的一个函数/对象可以被对象 `y` 调用。

### 例子

### 1.

```
function Product(name, price) {
    this.name = name;
    this.price = price;
}
function Pizza(name, price) {
    Product.call(this, name, price);
    this.category = 'pizza';
}
function Toy(name, price) {
    Product.call(this, name, price);
    this.category = 'toy';
}

var pizza = new Pizza('margherita', 50);
var toy = new Toy('robot', 40);
console.log(toy); // Toy {name: "robot", price: 40, category: "toy"}
console.log(pizza); // Pizza {name: "margherita", price: 50, category: "pizza"}
复制代码
```

这是构造函数链的一个例子。可以看到，每个函数中都调用了 `Product` 的构造函数，并使用 `call` 将 `Product` 对象的属性分别与 `Pizza` 和 `Toy` 连接在一起。

当创建了 `Pizza` 和 `Toy` 对象的实例并输出时，结果显示其具有 `name`,`price` 和 `category` 三个属性，但我们只定义了 `category`一个属性。而属性`name` 和 `price` 则是由于已经在 `Product` 对象中定义并应用，可通过 `Product` 对象的链式构造函数获得。将以上代码稍作改动即可实现继承。

### 2.

```
function sleep(){
    var reply=[this.animal,'typically sleep between',this.sleepDuration].join(' ');
    console.log(reply); // I typically sleep between 12 and 16 hours
}
var obj={
    animal:'I',sleepDuration:'12 and 16 hours'
};
sleep.call(obj);
复制代码
```

在上面的代码中，我们定义了一个名为 `sleep` 的函数，其包含一个数组 `reply` ，该数组由 `this`进行属性寻址得到的元素组成，这些元素在函数外的独立对象中定义。

调用函数 `sleep`，其参数为 `obj`。可以看到 `this.animal` 和 `this.sleepDuration` 分别取到了 `obj` 的属性，并输出了完整的句子。

## Bind➰



![img](https://user-gold-cdn.xitu.io/2019/3/11/1696ce60cfe52dc0?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



> 当 `bind()` 方法被调用时会创建一个新函数，该函数第一个参数作为 `this`，并在调用新函数时提供一个给定的参数序列。  — MDN

> 译者注：`bind()` 方法会创建一个新函数，称为绑定函数，当调用这个绑定函数时，绑定函数会以创建它时传入`bind()` 方法的第一个参数作为 `this`，第二个以及以后的参数，加上绑定函数运行时本身的参数，按照顺序作为原函数的参数来调用原函数。

### 语法

```
function.bind(this,arg1,arg2,arg3,...)
复制代码
```

### 返回值

返回 `this` 指向且参数为给定参数的函数副本的调用结果。

### 描述

`bind` 方法与 `call` 方法类似，主要区别在于 `bind` 返回一个新函数，而 `call` 不返回。

根据 ECMAScript 5 规范，`bind` 方法返回的函数是一种特殊类型的函数对象，称为绑定函数（ BF ）。BF 中包含原始函数对象，调用 BF 时会执行该函数。

### 例子

```
var x = 9;
var module = {
    x: 81,
    getX: function () {
        return this.x;
    }
};
console.log(module.getX()); // 81
var retrieveX = module.getX;
console.log(retrieveX()); // 9
var boundGetX = retrieveX.bind(module);
console.log(boundGetX()); // 81
复制代码
```

在上面的代码中，我们定义了一个变量 `x` 和一个对象 `module`，该对象中还定义了一个属性 `x` 以及一个返回 `x` 值的函数。

当调用函数 `getX` 时，它返回的是对象内定义的 `x` 的值，而不是全局作用域中的 `x`。

另一个变量在全局作用域中声明，并调用 `module`对象中的 `getX` 函数。但由于该变量处于全局作用域下，因此 `getX` 中的 `this` 指向全局作用域下的 `x`，返回 9。

最后又定义了另一个变量 `boundGetX`，该变量调用函数 `retrieveX`，与之前不同的是，这次将函数 `retrieveX`与对象 `module` 绑定，返回的是对象内 `x` 的值。这是由于 `bind` 将函数中的 `this`指向对象中的 `x` 值而不是全局 `x`，因此输出 81。

## 结论

现在我们已经了解到以上三种方法的基础用法，但你可能会疑惑：为什么要用 3 个不同的方法去做相同的事情。为了解决这个问题，你必须反复练习在不同场景下它们的使用方法，更全面地了解什么时候使用它们，以及如何更好的使用，这肯定会让你的代码更清晰，更强大。