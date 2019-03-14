## Js模块化

**什么是模块化？**

> 模块就是实现特定功能的一组方法,而模块化是将模块的代码创造自己的作用域，只向外部暴露公开的方法和变量，而这些方法之间高度解耦。

**写 JS 为什么需要模块化编程？**
 当写前端还只是处理网页的一些表单提交，点击交互的时候，还没有强化 JS 模块化的概念，当前端逻辑开始复杂，交互变得更多，数据量越来越庞大时，前端对 JS 模块化编程的需求就越加强烈。

在很多场景中，我们需要考虑模块化：

1. 团队多人协作，需要引用别人的代码
2. 项目交接，我们在阅读和重构别人的代码
3. 代码审查时，检验你的代码是否规范，是否存在问题
4. 写完代码，回顾自己写的代码是否美观：）
5. 不同的环境，环境变量不同

基于以上场景，所以，当前 JS 模块化主要是这几个目的：

1. 代码复用性
2. 功能代码松耦合
3. 解决命名冲突
4. 代码可维护性
5. 代码可阅读性

先给结论：JS 的模块化编程经历了几个阶段：

1. 命名空间形式的代码封装
2. 通过立即执行函数(IIFE)创建的命名空间
3. 服务器端运行时 Nodejs 的 CommonJS 规范
4. 将模块化运行在浏览器端的 AMD/CMD 规范
5. 兼容 CMD 和 AMD 的 UMD 规范
6. 通过语言标准支持的 ES Module

先给结论图： 

![img](https://user-gold-cdn.xitu.io/2019/3/10/169665dccafb2247?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



#### 一、命名空间

我们知道，在 ES6 之前，JS 是没有块作用域的，私有变量和方法的隔离主要靠函数作用域，公开变量和方法的隔离主要靠对象的属性引用。

**封装函数**

在 JS 还没有模块化规范的时候，将一些通用的、底层的功能抽象出来，独立成一个个函数来实现模块化： 比方写一个 utils.js 工具函数文件

```
//  utils.js
function add(x, y) {
    if(typeof x !== "number" || typeof y !== "number") return;
    return x + y;
}

function square(x) {
    if(typeof x !== "number") return;
    return x * x;
}

<script src="./utils.js"></script>
<script>
    add(2, 3);
    square(4);
</script>
复制代码
```

通过 js 函数文件划分的方式，此时的公开函数其实是挂载到了全局对象 window 下，当在别人也想定义一个叫 add 函数，或者多个 js 文件合并压缩的时候，会存在命名冲突的问题。

**挂载到全局变量下：**

后来我们想到通过挂载函数到全局对象字面量下的方式，利用 JAVA 包的概念，希望减轻命名冲突的严重性。

```
var mathUtils1 = {
    add: function(x, y) {
        return x + y;
    },
}

var mathUtils2 = {
    add: function(x, y, z) {
        return x + y + z;
    },
}

mathUtils.add();

mathUtils.square();
复制代码
```

这种方式仍然创建了全局变量，但如果包的路径很长，那么到最后引用方法可能就会以`module1.subModule.subSubModule.add` 的方式引用代码了。

**IIFE**
 考虑模块存在私有变量，于是我们利用IIFE(立即执行表达式)创建闭包来封装私有变量：

```
var module = (function(){
    var count = 0;
    return {
        inc: function(){
            count += 1;
        },
        dec: function(){
            count += -1;
        }
    }
})()

module.inc();
module.dec();
复制代码
```

这样私有变量对于外部来说就是不可访问的，那如果模块需要引入其他依赖呢？

```
var utils = (function ($) {
    var $body = $("body"); 
    var _private = 0;
    var foo = function() {
        ...
    }
    var bar = function () {
        ...
    }
    
    return {
        foo: foo,
        bar: bar
    }
})(jQuery);
复制代码
```

以上封装模块的方式叫作：模块模式，在 jQuery 时代，大量使用了模块模式:

```
<script src="jquery.js"></script>
<script src="underscore.js"></script>
<script src="utils.js"></script>
<script src="base.js"></script>
<script src="main.js"></script>
复制代码
```

jQuery 的插件必须在 JQuery.js 文件之后 ，文件的加载顺序被严格限制住，依赖越多,依赖关系越混乱，越容易出错。

#### 二、CommonJS

Nodejs 的出现，让 JavaScript 能够运行在服务端环境中，此时迫切需要建立一个标准来实现统一的模块系统，也就是后来的 CommonJS。

```
// math.js
exports.add = function(x, y) {
    return x + y;
}

// base.js
var math = require("./math.js");
math.add(2, 3);  // 5

// 引用核心模块
var http = require('http');
http.createServer(...).listen(3000);
复制代码
```

CommonJS 规定每个模块内部，module 代表当前模块，这个模块是一个对象，有 id,filename, loaded,parent, children, exports 等属性，module.exports 属性表示当前模块对外输出的接口，其他文件加载该模块，实际上就是读取 module.exports 变量。

```
// utils.js
// 直接赋值给 module.exports 变量
module.exports = function () {
    console.log("I'm utils.js module");
}

// base.js
var util = require("./utils.js")
util();  // I'm utils.js module

或者挂载到 module.exports 对象下
module.exports.say = function () {
    console.log("I'm utils.js module");
}

// base.js
var util = require("./utils.js")
util.say();
复制代码
```

为了方便，Node 为每个模块提供一个 exports 自由变量，指向 module.exports。这等同在每个模块头部，有一行这样的命令。

```
var exports = module.exports;
复制代码
```

exports 和 module.exports 共享了同个引用地址，如果直接对 exports 赋值会导致两者不再指向同一个内存地址，但最终不会对 module.exports 起效。

```
// module.exports 可以直接赋值
module.exports = 'Hello world';  

// exports 不能直接赋值
exports = 'Hello world';
复制代码
```

**CommonJS 总结：**
 CommonJS 规范加载模块是同步的，用于服务端，由于 CommonJS 会在启动时把内置模块加载到内存中，也会把加载过的模块放在内存中。所以在 Node 环境中用同步加载的方式不会有很大问题。

另，CommonJS模块加载的是输出值的拷贝。也就是说，外部模块输出值变了，当前模块的导入值不会发生变化。

#### 三、AMD

CommonJS 规范的出现，使得 JS 模块化在 NodeJS 环境中得到了施展机会。但 CommonJS 如果应用在浏览器端，同步加载的机制会使得 JS 阻塞 UI 线程，造成页面卡顿。

利用模块加载后执行回调的机制，有了后面的 RequireJS 模块加载器， 由于加载机制不同，我们称这种模块规范为 AMD(Asynchromous Module Definition 异步模块定义)规范, 异步模块定义诞生于使用 XHR + eval 的开发经验，是 RequireJS 模块加载器对模块定义的规范化产出。

AMD 的模块写法：

```
// 模块名 utils
// 依赖 jQuery, underscore
// 模块导出 foo, bar 属性
<script data-main="scripts/main" src="scripts/require.js"></script>

// main.js
require.config({
  baseUrl: "script",
  paths: {
    "jquery": "jquery.min",
    "underscore": "underscore.min",
  }
});

// 定义 utils 模块，使用 jQuery 模块
define("utils", ["jQuery", "underscore"], function($, _) {
    var body = $("body");
    var deepClone = _.deepClone({...});
    return {
        foo: "hello",
        bar: "world"
    }
})
</script>
复制代码
```

AMD 的特点在于：

1. 延迟加载
2. 依赖前置

AMD 支持兼容 CommonJS 写法：

```
define(function (require, exports, module){
  var someModule = require("someModule");
  var anotherModule = require("anotherModule");

  someModule.sayHi();
  anotherModule.sayBye();

  exports.asplode = function (){
    someModule.eat();
    anotherModule.play();
  };
});
复制代码
```

#### 四、CMD

SeaJS 是国内 JS 大神玉伯开发的模块加载器，基于 SeaJS 的模块机制，所有 JavaScript 模块都遵循 CMD（Common Module Definition） 模块定义规范.

CMD 模块的写法：

```
<script src="scripts/sea.js"></script>
<script>
// seajs 的简单配置
seajs.config({
  base: "./script/",
  alias: {
    "jquery": "script/jquery/3.3.1/jquery.js"
  }
})

// 加载入口模块
seajs.use("./main")
</script>

// 定义模块
// utils.js
define(function(require, exports, module) {
  exports.each = function (arr) {
    // 实现代码 
  };

  exports.log = function (str) {
    // 实现代码
  };
});

// 输出模块
define(function(require, exports, module) {
  var util = require('./util.js');
  
  var a = require('./a'); //在需要时申明，依赖就近
  a.doSomething();
  
  exports.init = function() {
    // 实现代码
    util.log();
  };
});
复制代码
```

**CMD 和 AMD 规范的区别：**
 AMD推崇依赖前置，CMD推崇依赖就近：
 AMD 的依赖需要提前定义，加载完后就会执行。 CMD 依赖可以就近书写，只有在用到某个模块的时候再去执行相应模块。 举个例子：

```
// main.js
define(function(require, exports, module) {
  console.log("I'm main");
  var mod1 = require("./mod1");
  mod1.say();
  var mod2 = require("./mod2");
  mod2.say();

  return {
    hello: function() {
      console.log("hello main");
    }
  };
});

// mod1.js
define(function() {
  console.log("I'm mod1");
  return {
    say: function() {
      console.log("say: I'm mod1");
    }
  };
});

// mod2.js
define(function() {
  console.log("I'm mod2");
  return {
    say: function() {
      console.log("say: I'm mod2");
    }
  };
});

复制代码
```

以上代码分别用 Require.js 和 Sea.js 执行，打印结果如下：
 Require.js:
 先执行所有依赖中的代码

```
I'm mod1
I'm mod2
I'm main
say: I'm mod1
say: I'm mod2

复制代码
```

Sea.js:
 用到依赖时，再执行依赖中的代码

```
I'm main

I'm mod1
say: I'm mod1
I'm mod2
say: I'm mod2
复制代码
```

#### 五、UMD

umd（Universal Module Definition） 是 AMD 和 CommonJS 的兼容性处理,提出了跨平台的解决方案。

```
(function (root, factory) {
    if (typeof exports === 'object') {
        // commonJS
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define(factory);
    } else {
        // 挂载到全局
        root.eventUtil = factory();
    }
})(this, function () {
    function myFunc(){};

    return {
        foo: myFunc
    };
});
复制代码
```

应用 UMD 规范的 JS 文件其实就是一个立即执行函数，通过检验 JS 环境是否支持 CommonJS 或 AMD 再进行模块化定义。

#### 六、ES6 Module

CommonJS 和 AMD 规范都只能在运行时确定依赖。而 ES6 在语言层面提出了模块化方案, ES6 module 模块编译时就能确定模块的依赖关系，以及输入和输出的变量。ES6 模块化这种加载称为“编译时加载”或者静态加载。 

![img](https://user-gold-cdn.xitu.io/2019/3/10/169665de2c04d247?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

 写法：



```
// math.js
// 命名导出
export function add(a, b){
    return a + b;
}
export function sub(a, b){
    return a - b;
}
// 命名导入
import { add, sub } from "./math.js";
add(2, 3);
sub(7, 2);

// 默认导出
export default function foo() {
  console.log('foo');
}
// 默认导入
import someModule from "./utils.js";
复制代码
```

> ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。原始值变了，import加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

另，在 webpack 对 ES Module 打包， ES Module 会编译成 require/exports 来执行的。

#### 总结

JS 的模块化规范经过了模块模式、CommonJS、AMD/CMD、ES6 的演进，利用现在常用的 gulp、webpack 打包工具，非常方便我们编写模块化代码。掌握这几种模块化规范的区别和联系有助于提高代码的模块化质量，比如，CommonJS 输出的是值拷贝，ES6 Module 在静态代码解析时输出只读接口，AMD 是异步加载，推崇依赖前置，CMD 是依赖就近，延迟执行，在使用到模块时才去加载相应的依赖。