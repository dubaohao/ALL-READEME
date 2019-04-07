## 前言

本文涉及以下问题：

1. [“new Vue()做了什么？”](#heading-1)
2. [“什么阶段才能访问DOM？”](#heading-3)
3. [“谈谈你对Vue生命周期的理解。”](#heading-4)
4. [扩展：新生命周期钩子serverPrefetch是什么？](#heading-5)
5. [“vue-router路由模式有几种？”](#heading-7)
6. [“谈谈你对keep-alive的了解？”](#heading-9)
7. [“了解Vue2.6+新全局API：Vue.observable()吗？”](#heading-10)

## 1. “`new Vue()`做了什么？”

`new`关键字代表实例化一个对象, 而`Vue`实际上是一个类, 源码位置是`/src/core/instance/index.js`。

```
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
复制代码
```

接着我们跳转追踪至`this._init()`，即`Vue.prototype._init`,位于`src\core\instance\init.js` 在`_init()`方法的内部有一系列 `init*` 的方法

```
Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    // ...忽略，从第45行看起
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')
    // ...忽略
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}
复制代码
```

### 1.1 这里我们概述一遍：

1. `initProxy`，作用域代理，拦截组件内访问其它组件的数据。
2. `initLifecycle`, 建立父子组件关系，在当前实例上添加一些属性和生命周期标识。如：`$children`、`$refs`、`_isMounted`等。
3. `initEvents`，用来存放除`@hook:生命周期钩子名称="绑定的函数"`事件的对象。如：`$on`、`$emit`等。
4. `initRender`，用于初始化`$slots`、`$attrs`、`$listeners`
5. `initInjections`，初始化`inject`，一般用于更深层次的组件通信，相当于加强版的`props`。用于组件库开发较多。

> 只要在上一层级的声明的provide，那么下一层级无论多深都能够通过inject来访问到provide的数据。这么做也是有明显的缺点：在任意层级都能访问，导致数据追踪比较困难，不知道是哪一个层级声明了这个或者不知道哪一层级或若干个层级使用。

- `initState`，是很多选项初始化的汇总，包括：`props、methods、data、computed 和 watch` 等。
- `initProvide`，初始化`provide`。
- `vm.$mount`，挂载实例。

## 2. “什么阶段才能访问DOM？”

这个回答可以从`beforeCreate`以及 `created` 的调用时机谈起，我们根据上面的概述，来简化下代码:

```
callHook(vm, 'beforeCreate')
// 初始化 inject
// 初始化 props、methods、data、computed 和 watch
// 初始化 provide
callHook(vm, 'created')
// 挂载实例 vm.$mount(vm.$options.el)
复制代码
```

所以当面试官问你：

- `beforeCreate`以及 `created` 调用时，哪些数据能用与否？
- 什么阶段才能访问DOM？
- 为什么`created`之后才挂载实例？

知道怎么回答了吧。

## 3. “谈谈你对Vue的生命周期的理解”

常规回答这里就不说了，来稍微深入点的：

1. `created/mounted/updated/destroyed`，以及对应的`before`钩子。分别是创建=>挂载=>更新=>销毁。
2. `Vue`源码中定义了一个`mergeHook`函数来遍历一个常量数组`LIFECYCLE_HOOKS`，该数组实际上是由与生命周期钩子同名的字符串组成的数组。

```
// v2.6.10 最新版
var LIFECYCLE_HOOKS = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
    'activated',
    'deactivated',
    'errorCaptured',
    // v2.6+ 
    'serverPrefetch'
];
复制代码
```

> 于是，你可以答多`activated & deactivated`（keep-alive 组件激活/停用）、errorCaptured（v2.5 以上版本有的一个钩子，用于处理错误）这三个。

### 3.1 新生命周期钩子：`serverPrefetch`是什么？

可以看到，`serverPrefetch`前身是`ssrPrefetch`。顾名思义，这是用来处理ssr的。允许我们在渲染过程中“等待”异步数据。可在任何组件中使用，而不仅仅是路由组件。



![img](F:\Code\github\前端-框架\assets\169b418d400ff0b7)

 这里我们贴出一段官方例子：



```
<!-- Item.vue -->
<template>
  <div v-if="item">{{ item.title }}</div>
  <div v-else>...</div>
</template>

<script>
export default {
  computed: {
    item () {
      return this.$store.state.items[this.$route.params.id]
    }
  },
  serverPrefetch () {
    return this.fetchItem()
  },
  mounted () {
    if (!this.item) {
      this.fetchItem()
    }
  },
  methods: {
    fetchItem () {
      // return the Promise from the action
      return this.$store.dispatch('fetchItem', this.$route.params.id)
    }
  }
}
</script>
复制代码
```

- **绝大多数的面试官都不会去关注v2.6+ 以后的代码记录和变更**。这里如果你说出这个`v2.6.10`的变化，啧啧...面试官肯定更加欣赏你。

### 3.2 生命周期钩子的合并策略

拿`callHook(vm, 'created')`讲，先判断组件的选项中有无对应名字的生命周期钩子，再判断是否有 `parentVal(vm)`。若存在`parentVal(vm)`且都有对应的生命周期钩子，则会将两者`concat`为一个数组(`parentVal.concat(childVal`))。所以，生命周期钩子其实是可以写成数组。如：

```
created: [
function () {
  console.log('first')
},
function () {
  console.log('second')
},
function () {
  console.log('third')
}]
复制代码
```

钩子函数将按顺序执行。

## 4. “Vue-router 路由模式有几种？”

三种 `"hash" | "history" | "abstract"`，一般人只知道两种`"hash" | "history"`。

这里贴出源码：

```
switch (mode) {
  case 'history':
    this.history = new HTML5History(this, options.base)
    break
  case 'hash':
    this.history = new HashHistory(this, options.base, this.fallback)
    break
  case 'abstract':
    this.history = new AbstractHistory(this, options.base)
    break
  default:
    if (process.env.NODE_ENV !== 'production') {
      assert(false, `invalid mode: ${mode}`)
    }
}
复制代码
```

#### # mode

类型: `string`

默认值: `"hash" (浏览器环境) | "abstract" (Node.js 环境)`

可选值: `"hash" | "history" | "abstract"` 配置路由模式:

- `hash`: 使用 `URL hash` 值来作路由。支持所有浏览器，包括不支持 `HTML5 History Api` 的浏览器。
- `history`: 依赖 `HTML5 History` API 和服务器配置。查看 `HTML5 History` 模式。
- `abstract`: 支持所有 `JavaScript` 运行环境，如 `Node.js` 服务器端。如果发现没有浏览器的 `API`，路由会自动强制进入这个模式.

## 5. “谈谈你对`keep-alive`的了解？”

先贴一个常规回答：

> keep-alive是 Vue 内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染。 在vue 2.1.0 版本之后，keep-alive新加入了两个属性: include(包含的组件缓存) 与 exclude(排除的组件不缓存，优先级大于include) 。

**然后你可以开始骚了：**

1. `<keep-alive>`是 `Vue` 源码中实现的一个全局抽象组件，通过自定义 `render` 函数并且利用了插槽来实现数据缓存和更新。它的定义在`src/core/components/keep-alive.js` 中：

```
export default {
  name: 'keep-alive',
  abstract: true,
  ...
}
复制代码
```

1. 所有的抽象组件是通过定义`abstract`选项来声明的。抽象组件不渲染真实`DOM`，且不会出现在父子关系的路径上（`initLifecycle`会忽略抽象组件），相关代码片段：

```
if (parent && !options.abstract) {
  // abstract 即 `ptions.abstract`
  // while 循环查找第一个非抽象的父组件
  while (parent.$options.abstract && parent.$parent) {
    parent = parent.$parent
  }
  parent.$children.push(vm)
}
复制代码
```

## 6. “了解`Vue2.6+`新全局`API`：`Vue.observable()`吗？”

Vue2.6+新的全局API是`Vue.observable()`,它的使用方式：

```
import vue from vue;
const state = Vue.observable ({
   counter: 0,
});
export default {
   render () {
     return (
       <div>
         {state.counter}
           <button v-on:click={() => {state.counter ++; }}>
           Increment counter
         </ button>
       </ div>
     );
   },
};
复制代码
```

而它定义在`/src/core/global-api/index.js`第48行：

```
import { observe } from 'core/observer/index'
// ...
// 2.6 explicit observable API
Vue.observable = <T>(obj: T): T => {
observe(obj)
return obj
}
复制代码
```

再看看它`import`的`observe`，最近一次提交在`12/1/2018`，唔。。。。 

![img](F:\Code\github\前端-框架\assets\169b4b3847ee2778)

核心就是暴露出`observe(obj)`观测后的数据，代码啥都没改。懂了吧？



作者：前端劝退师

链接：https://juejin.im/post/5c959f74f265da610c068fa8