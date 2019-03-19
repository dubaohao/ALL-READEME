## Js事件轮询（macro+mincro）

### 背景

一天惬意的下午。朋友给我分享了一道头条面试题,如下:

```
async function async1(){
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
async function async2(){
    console.log('async2')
}
console.log('script start')
setTimeout(function(){
    console.log('setTimeout') 
},0)  
async1();
new Promise(function(resolve){
    console.log('promise1')
    resolve();
}).then(function(){
    console.log('promise2')
})
console.log('script end')
复制代码
```

这个题目主要是考察对同步任务、异步任务：setTimeout、promise、async/await的执行顺序的理解程度。(建议大家也自己先做一下o)

当时由于我对async、await了解的不是很清楚，答案错的千奇百怪 :()，就不记录了，然后我就去看文章理了理思路。现在写在下面以供日后参考。

### js事件轮询的一些概念

这里首先需要明白几个概念：同步任务、异步任务、任务队列、microtask、macrotask

同步任务 指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；

异步任务 指的是，不进入主线程、而进入"任务队列"（task queue）的任务，等待同步任务执行完毕之后，轮询执行异步任务队列中的任务

macrotask队列 等同于我们常说的任务队列，macrotask是由宿主环境分发的异步任务，事件轮询的时候总是一个一个任务队列去查看执行的，"任务队列"是一个先进先出的数据结构，排在前面的事件，优先被主线程读取。

microtask 是由js引擎分发的任务，总是添加到当前任务队列末尾执行。另外在处理microtask期间，如果有新添加的microtasks，也会被添加到队列的末尾并执行。注意与setTimeout(fn,0)的区别：

setTimeOut(fn(),0) 指定某个任务在主线程最早可得的空闲时间执行，也就是说，尽可能早得执行。它在"任务队列"的尾部添加一个事件，因此要等到同步任务和"任务队列"现有的事件都处理完，才会得到执行。

总结一下：

> task queue、microtask、macrotask
>
> - An event loop has one or more task queues.(task queue is macrotask queue)
> - Each event loop has a microtask queue.
> - **task queue = macrotask queue != microtask queue**
> - a task may be pushed into macrotask queue,or microtask queue
> - when a task is pushed into a queue(micro/macro),we mean preparing  work is finished,so the task can be executed now.

所以我们可以得到**js执行顺序是：**

> **开始 -> 取第一个task queue里的任务执行(可以认为同步任务队列是第一个task queue) -> 取microtask全部任务依次执行 -> 取下一个task queue里的任务执行 -> 再次取出microtask全部任务执行 -> … 这样循环往复**

### 常见的一些宏任务和微任务：

**macrotask：**

- setTimeout
- setInterval
- setImmediate
- requestAnimationFrame
- I/O
- UI rendering

**microtask:**

- process.nextTick
- Promises
- Object.observe
- MutationObserver

### Promise、Async、Await都是一种异步解决方案

Promise是一个构造函数，调用的时候会生成Promise实例。当Promise的状态改变时会调用then函数中定义的回调函数。我们都知道这个回调函数不会立刻执行，他是一个**微任务**会被添加到当前任务队列中的末尾，在下一轮任务开始执行之前执行。

async/await成对出现，async标记的函数会返回一个Promise对象，可以使用then方法添加回调函数。await后面的语句会同步执行。但 await 下面的语句会被当成**微任务**添加到当前任务队列的末尾异步执行。

### 我们来看一下答案

不记得题的！继续往下看，温馨的准备了题目，不用往上翻

```
async function async1(){
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
async function async2(){
    console.log('async2')
}
console.log('script start')
setTimeout(function(){
    console.log('setTimeout') 
},0)  
async1();
new Promise(function(resolve){
    console.log('promise1')
    resolve();
}).then(function(){
    console.log('promise2')
})
console.log('script end')
复制代码
```

> node环境下: script start -> async1 start -> async2 -> promise1 -> script end -> promise2 -> async1 end -> setTimeout

> Chrome环境下: script start -> async1 start -> async2 -> promise1 -> script end -> async1 end -> promise2 -> setTimeout

按照上面写的js执行顺序就可以得到正确结果，但最后却又存在两个答案，为什么会出现两种结果呢？我们可以看到两种结果中就是async1 end 和 Promise2之间的顺序出现差别，这主要是V8最新版本与稍老版本的差异，他们对await的执行方法不同，如下：

```
async function f(){
  await p
  console.log(1);
}
//新版V8应该会解析成下面这样
function f(){
  Promise.resolve(p).then(()=>{
    console.log(1)
  })
}
//旧版的V8应该会解析成下面的这样
function f(){
  new Promise(resolve=>{
    resolve(p)
  }).then(()=>{
    console.log(1)
  })
}
复制代码
```

正对上面的这两种差异主要是：

1. 当Promise.resolve 的参数为 promise 对象时直接返回这个 Promise 对象，then 函数在这个 Promise 对象发生改变后立刻执行。
2. 旧版的解析 await 时会重新生成一个Promise对象。尽管该 promise 确定会 resolve 为 p，但这个过程本身是异步的，也就是**现在进入队列的是新 promise 的 resolve 过程**，所以该 promise 的 then 不会被立即调用，而要等到当前队列执行到前述 resolve 过程才会被调用，然后再执行then函数。（下面的例子会讲解当resolve()参数为promise时会怎么执行）

不用担心这个题没解，真相只有一个。**根据 TC39 最近决议，await将直接使用  Promise.resolve() 相同语义。**

最后我们以最新决议来分析这个题目的可能的执行过程：

- 定义函数async1、async2。输出'script start'
- 将 setTimeout 里面的回调函数(宏任务)添加到下一轮任务队列。因为这段代码前面没有执行任何的异步操作且等待时间为0s。所以回调函数会被立刻放到下一轮任务队列的开头。
- 执行async1。我们知道async函数里面await标记之前的语句和 await 后面的语句是同步执行的。所以这里先后输出"async1 start",’async2 start‘.
- 这时暂停执行下面的语句，下面的语句被放到当前队列的最后。
- 继续执行同步任务。
- 输出 ‘Promise1’。将then里面的函数放在当前队列的最后。
- 然后输出‘script end’,注意这时只是同步任务执行完了，当前任务队列的任务还没有执行完毕，还有两个微任务被添加进来了!队列是先进先出的结构，所以这里先输出 ‘async1 end’ 再输出 ‘Promise2’,这时第一轮任务队列才真算执行完了。
- 然后执行下一个任务列表的任务。执行setTimeout里面的异步函数。输出‘setTimeout’。

### 练习一下

[stackoverflow](https://link.juejin.im?target=https%3A%2F%2Fstackoverflow.com%2Fquestions%2F53894038%2Fwhats-the-difference-between-resolvethenable-and-resolvenon-thenable-object%23)上的一道题目

```
let resolvePromise = new Promise(resolve => {
  let resolvedPromise = Promise.resolve()
  resolve(resolvedPromise)
})
resolvePromise.then(() => {
  console.log('resolvePromise resolved')
})
let resolvedPromiseThen = Promise.resolve().then(res => {
  console.log('promise1')
})
resolvedPromiseThen
  .then(() => {
    console.log('promise2')
  })
  .then(() => {
    console.log('promise3')
  })
复制代码
```

> 结果：promise1 -> promise2 -> resolvePromise resolved -> promise3

这道题真的是非常费解了。为什么'resolvePromise resolved'会在第三行才显示呢？和舍友讨论了一晚上无果。

其实这个题目的难点就在于resolve一个Promise对象，js引擎会怎么处理。我们知道Promise.resolve()的参数为Promise对象时，会直接返回这个Promise对象。但当resolve()的参数为Promise对象时，情况会有所不同：

```
resolve(resolvedPromise)
//等同于：
Promise.resolve().then(() => resolvedPromise.then(resolve, reject));
复制代码
```

所以这里第一次执行到这儿的时候：

- `() => resolvedPromise.then(resolve, reject)`会被放入当前任务列表的最后
- 然后是Promise1被放入任务列表。
- 没有同步操作了开始执行微任务列表，这时resolvedPromise是一个已经resolved的Promise直接执行then函数,将resole()函数放入当前队列的最后，输出Promise1。
- 将Promise2放入队列的最后。执行resole()
- 这时的resolvePromise终于变成了一个resolved状态的Promise对象了，将‘resolvePromise resolved’放入当前任务列表的最后。输出Promise2。
- 将Promise3放到当前任务队列的最后。输出resolvePromise resolved。输出Promise3.

结束！这里面的几段代码是比较重要的，解释了js会按照什么样的方式来执行这些新特性。