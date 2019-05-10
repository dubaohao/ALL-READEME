# Flux简介

 [林涧](https://me.csdn.net/u010644262) 

**什么是Flux**

Flux是Facebook用于构建客户端Web应用程序的一个**系统架构**。它通过**利用单向数据流来补充React的可组合视图组件**。它更像是一种模式，而不是一个正式的框架。



Flux将一个应用分成**四个部分**。

- View： 视图层 
- Action（动作）：视图层发出的消息（比如mouseClick） 
- [Dispatcher](https://www.baidu.com/s?wd=Dispatcher&tn=24004469_oem_dg&rsv_dl=gh_pl_sl_csd)（[派发](https://www.baidu.com/s?wd=%E6%B4%BE%E5%8F%91&tn=24004469_oem_dg&rsv_dl=gh_pl_sl_csd)器）：用来接收Actions、执行回调函数
- Store（数据层）：用来存放应用的状态，一旦发生变动就提醒Views要更新页面



![img](..\assets\20180305111638536)

​     1.用户访问 View

​     2.View 发出用户的 Action

​     3.Dispatcher 收到 Action，要求 Store 进行相应的更新

​     4.Store 更新后，发出一个"change"事件

​     5.View 收到"change"事件后，更新页面



**View** 

   view使用React创建的组件，也可以使用controller view模式。

   **控制器视图模式(Controller View)**：

   controller view是一个React顶级组件，包含所有的state状态并通过props传递给子组件。controller view方便了测试和组件复用。

​    例如：有一个组件<HomePage />，创建一个<HomePageController />将所组件需要的所有数据通过props传递<HomePage />的render方法中。   

```javascript
// Controller views are very simple
class HomePageController extends React.Component {
    // Normal Flux store listening
    componentDidMount() {
        Store1.on('change', this.onStoreChange);
        Store2.on('change', this.onStoreChange);
    }

    onStoreChange() {
        this.setState({
            data1: Store1.getData(),
            data2: Store2.getData()
        });
    }
    render() {
        // <HomePage /> has no internal state!
        return <HomePage
            data1={this.state.data1}
            data2={this.state.data2} />;
    }
}
```



**Action**

   每个Action都是一个对象，包含一个actionType属性和一些其他属性（用来传递数据）。Action中利用Dispatcher的把具体的动作（actionType）派发到Store。

```javascript
import TodoActionTypes from './TodoActionTypes';
import TodoDispatcher from './TodoDispatcher';

const Actions = {
  addTodo(text) {
    TodoDispatcher.dispatch({
        type: TodoActionTypes.ADD_TODO,
        text,
    });
  }
};
export default Actions;
```



**Dispatcher**

   Dispatcher 的作用是将 Action 派发到 Store，即触发注册的回调方法callbacks。可以把它看作一个路由器，负责在 View 和 Store 之间，建立 Action 的正确传递路线。注意，Dispatcher 只能有一个，而且是全局的。



Dispatcher的主要API： 

​    **register(function callback)**：注册callback回调。

​    **unregister(string id)**：卸载回调方法。

​    **waitFor(array<string> ids)**：在继续执行当前回调之前，等待指定要调用的回调，这个方法只能被回调用于响应分派的有效载荷。

​    **dispatch(object payload)：** 将有效载荷调度到所有注册的回调。

​    **isDispatching()**：Dispatcher 是否正在派发任务。



**Store**

   Store 保存整个应用的state状态。它的角色有点像 MVC 架构之中的Model，官方提供的工具类flux/utils。



**Flux Utils** 主要API：

- Store是一个基类，提供了基础的方法

​       **addListener(callback: Function)**、**getDispatcher()**、**hasChanged()**



- **ReduceStore**，继承Store类，主要API方法如下：

​          **getState**()：获取全局store中的state值；

​          **getInitialState**()：获取初始state值；

​          **reduce(state, action)**：reduce整个store中的state，并返回新的state值；

​          **areEqual(one, two)**：比较2个state是否相等

​     注：任何继承ReduceStore的的store都不需要手动触发changes，**在reduce方法中会动触发changes事件**。

```javascript
import {ReduceStore} from 'flux/utils';
class CounterStore extends ReduceStore<number> {
  getInitialState(): number {
    return 0;
  }
  reduce(state: number, action: Object): number {
    switch (action.type) {
      case 'increment':
        return state + 1;
      case 'square':
        return state * state;
      default:
        return state;
    }
  }
}
```

- Container，容器，将react类用于将反应类转换为更新其相关存储更改时的状态的容器。当store中的数据改变时自动更新react中的state。

```javascript
import {Component} from 'react';
import {Container} from 'flux/utils';
class CounterContainer extends Component {
  static getStores() {
    return [CounterStore];
  }
  static calculateState(prevState) {
    return {
      counter: CounterStore.getState(),
    };
  }
  render() {
    return <CounterUI counter={this.state.counter} />;
  }
}
const container = Container.create(CounterContainer);
```

### 参考文献

阮一峰Flux教程：[阮一峰Flux教程](http://www.ruanyifeng.com/blog/2016/01/flux.html)

Flux官网：[Flux官网](http://facebook.github.io/flux/)