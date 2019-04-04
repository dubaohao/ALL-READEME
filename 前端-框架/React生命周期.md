# [React 生命周期](https://www.cnblogs.com/qiaojie/p/6135180.html)



### 前言

学习React，生命周期很重要，我们了解完生命周期的各个组件，对写高性能组件会有很大的帮助.

### Ract生命周期

React 生命周期分为三种状态 1. 初始化 2.更新 3.销毁

![img](F:\Code\github\前端框架\assets\588767-20161205190022429-1074951616.jpg)

- **初始化**

*1、getDefaultProps()*

> 设置默认的props，也可以用dufaultProps设置组件的默认属性.

*2、getInitialState()*

> 在使用es6的class语法时是没有这个钩子函数的，可以直接在constructor中定义this.state。此时可以访问this.props

*3、componentWillMount()*

> 组件初始化时只调用，以后组件更新不调用，整个生命周期只调用一次，此时可以修改state。

*4、 render()*

> react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行。此时就不能更改state了。

*5、componentDidMount()*

> 组件渲染之后调用，只调用一次。

- **更新**

*6、componentWillReceiveProps(nextProps)*

> 组件初始化时不调用，组件接受新的props时调用。

*7、shouldComponentUpdate(nextProps, nextState)*

> react性能优化非常重要的一环。组件接受新的state或者props时调用，我们可以设置在此对比前后两个props和state是否相同，如果相同则返回false阻止更新，因为相同的属性状态一定会生成相同的dom树，这样就不需要创造新的dom树和旧的dom树进行diff算法对比，节省大量性能，尤其是在dom结构复杂的时候

*8、componentWillUpdata(nextProps, nextState)*

> 组件初始化时不调用，只有在组件将要更新时才调用，此时可以修改state

*9、render()*

> 组件渲染

*10、componentDidUpdate()*

> 组件初始化时不调用，组件更新完成后调用，此时可以获取dom节点。

- **卸载**

*11、componentWillUnmount()*

> 组件将要卸载时调用，一些事件监听和定时器需要在此时清除。

### 结束语