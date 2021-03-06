# REACT文档-dubaohao
2018/11/12 10:32:52 

## 0.前言

>**使用到的技术知识
Js ECMAScript5 ECMAScript6 CSS HTML5
Node.js  Webpack
ANT Design**

<hr>

> 视图层框架+组件化+JSX表达式+虚拟DOM


- 1.React虚拟DOM概念，这是React性能高效的核心算法
- 2.React组件，理解什么是组件化
- 3.React多组件嵌套
- 4.JSX内置表达式
- 5.生命周期，纵观整个React的生命周期
- 6.React属性与事件
	》State属性，控制着React的一切
	》props属性
	》事件与数据双向绑定，包含父子页面之间的参数互传
	》可复用组件，真正让React开发快速、高效的地方
	》组件Refs
	》独立组件间共享Mixins
- 7.React样式
	》内联样式
	》内联样式中的表达式
	》css模块化，学习如何使用require进行样式的引用
	》JSX样式与CSS的互转
	》一个好用的框架-Ant Design
- 8.React Router
	》Route概念
	》Router参数传递

## 1.官方快速脚手架(傻瓜式安装)
```

	npm install -g create-react-app
	create-react-app my-app
	cd my-app/
	npm start	//运行
	npm eject  //提取出配置文件，不可恢复
```

## 2.自己搭建-基本的组件 npm install --save
react 
react-dom 
babelify 
babel-preset-react
特别引入ES2015支持
babel-preset-es2015 
项目不能运行，需要webpack打包成js包


## 3.空白项目开始搭建
创建src文件夹 
创建入口文件index.html
```
	<div id="example">123</div>
	<script src="./src/bundle.js"></script>
```
创建入口文件index.js
```

    var React =require('react');

    var ReactDOM = require('react-dom');
    ReactDOM.render(
        <h1>hello world</h1>
        document.getElementById('example')
    );

```
## 4.webpack打包机制
创建webpack.congfig.js

举例：
```

    var webpack = require('webpack');
    var path = require('path');
    
    module.exports = {
    content:__dirname+"/src/", 
        entry:"./js/index.js",   //入口文件
        output:{
            path:__dirname+"/src/", //输出的目录
            filename: 'bundle.js'   //输出的文件名称
        },
        devtool:"source-map",//便于调试，相当于命令行中 webpack --devtool source-map
        module: {//依赖的模块
            rules: [  //模块、规则，如果在webpack旧版本中用的不是rules。用的是loaders
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    query:{ //es6预设
                    presets:["es2015","react"],
                    }
                },
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    loader: 'style!css?module&localIdentName=[hash:base64:5]&-url'
                },
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    loader: 'style-loader!css-loader!sass-loader'
                },
                {  //背景图片
                    test:/\.(jpg|png|gif)$/,
                    loader:"url-loader?limit=1024"
                },
                {   /字体文件
                    test:/\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
                    loader:'file-loader?name=[name].[ext]'
                }
            ]
        },
        devServer: {
            host: '0.0.0.0',//可以适用与手机浏览器
            port: 5000 //端口
        }
    }
```

定义规则
全局安装
`npm install -g webpack `
`npm install -g webpack-dev-server`

目录安装
`npm install webpack --save`
`npm install webpack-dev-server --save`

运行`webpack` ,回车!
现在已经可以正常启动了！每次都需要运行`webpack`！

可以使用`webpack --watch`,代码问价一发生更改，保存后，刷新页面自动更新

运行`webpack-dev-server` 保存后页面会同步更新，但是URL栏目会带有"/webpack-dev-server"尾巴

运行`webpack-dev-server --contentbase src --inline --hot` 保存后页面会同步更新! 完美了！！！

>浏览器插件  --方便查看React结构

React Developer Tools 
链接[https://github.com/facebook/react-devtools](https://github.com/facebook/react-devtools)

Chrome可以安装React Developer Tools 

>虚拟DOM的结构

[https://github.com/Matt-Esch/virtual-dom](https://github.com/Matt-Esch/virtual-dom)基于JavaScript的开源算法DIFF


>为什么那么快！！！

每次对需要变更的模块进行更新!
对DOM进行模拟，比较前后差异，如果数据有差异，统一操作DOM
## 5.开始书写代码,React学习
创建文件夹  src/components

创建文件   src/components/header.js

```

	var React =require('react');

	var ReactDOM = require('react-dom');

	export default class Header extends React.Component{

    	render(){
        	renturn (
            	<header>
                	<h1>这里是header</h1>
            	</header>
        	)
		}
	}

```

创建src/index.js
```
	var React =require('react');
	var ReactDOM = require('react-dom');
	import ComponentHeader from './compenents/header';

	class Index extends React.Component{
	    render(){
	        renturn (
	            <div>
 	               <ComponentHeader/>
 	               <h2>页面主体内容</h2>
	            </div>
	        )
		}
	}

	ReactDOM.render(<Index/>,document.getElementById('example'));
```

>知识点：

* 1.组件是React的一个主要特性
* 2.组件对于模块化开发的重要性
* 3.组件的return函数里返回的HTML节点只能存在一个！可以用一个`<div></div>`包含
* 4.可以给外部使用的组件定义：`export default class Header extends React.Component{}`
* 5.入口定义`ReactDOM.render(<Index/>,document.getElementById('example'));`

创建文件    src/components/footer.js
```
    var React =require('react');
    var ReactDOM = require('react-dom');
    
    export default class Footer extends React.Component{
    	render(){
    		renturn (
    			<div>
    				<h1>这里是footer</h1>
    			</div>
    		)
		}
    }
```

创建文件夹src/components/body.js
```

	var React =require('react');
	var ReactDOM = require('react-dom');

	export default class Body extends React.Component{
   		render(){
        	renturn (
            	<div>
                	<h1>这里是body</h1>
            	</div>
        	)
		}
	}
```

更新src/index.js
```

	var React =require('react');
	var ReactDOM = require('react-dom');
	import ComponentHeader from './compenents/header';
	import ComponentFooter from './compenents/footer';
	import ComponentBody from './compenents/body';

	class Index extends React.Component{
    	render(){
        	renturn (
            	<div>
                	<ComponentHeader/>
                	<ComponentBody/>
                	<ComponentFooter/>
                	<h2>页面主体内容</h2>
            	</div>
        	)
		}
	}
	
	ReactDOM.render(
    	<Index/>,document.getElementById('example')
    	);
```

>知识点：

* 1.可以使用参数的形式传递,还可以使用条件语句

    render()下面写
        `var componentHeader = <ComponentHeader/>`
    return()内写`{componentHeader}`
* 2.组件的return函数里返回的HTML节点必须是一个
* 3.注意项目命名的规范与文件的结构化
* 4.属性绑定,动态值,直接用{}不需要“”了
    `<input type="button" value="默认按钮" disable={false}/>`

>三元表达式

`{username=='' ? '用户名不存在' : '用户名：'+username}`
`{a=''?b:c}` a为空为b，否则为c
>注释

`{/*注释*/}`
>React 不能渲染html

* 1.转码 Unicode
* 2.直接解析 参数：dangerouslySetInnerHtml 危险的动作,可能存在HTML攻击漏洞
    `dangerouslySetInnerHtml ={{html : html}}`

> 3.生命周期

`componentWillMount(){}` 组件将要加载时的函数
`componentDidMount(){}`  组件加载完时的函数
* 当前组件body存在上面函数，引入组件login也存在
* 顺序为： body-will、login-will、login-did、body-did

## 6.React 属性
### 1.State

state -> virtual dom ->Dom
Constructor设置初始状态，记得执行super(props)
state 更改，会立马进行刷新
```

	constructor(){
	    super();            调用基类的所有的初始化方法
	    this.state={username: "dubaohao"}; //初始化赋值，
	}

	{this.state.username}                       //取值

	this.setStates({username: "dubaohao2"})     //更改
```
>>知识点

* 1.自身属性，只是存在当前的组件的作用域，不会污染其他组件
* 2.初始化-构造函数`constructor(){this.state={username: "dubaohao"};}`
* 3.取值-修改`{this.state.username}、this.setStates({username: "dubaohao2"}) `

###2.Props<br>
>知识点

* 1.外来的属性，也不会污染其他组件
* 2.传递参数`<Body username="dubaohao"/>`
* 3.取值`{this.props.username}`

###3.子组件向父组件传递参数绑定！
>子组件

绑定事件
```

	changeUserInfo(age){
    	this.setState({age: '15'});
	}
	render(){
	    retuen(
	        <div>
	           <p> 子页面输入：
	                <input type="button" value="提交" onclick={changeUserInfo.bind(this,99)}/>
 	          </p>
	        </div>
	    )
	}
```
子组件
```

	render(){
    	retuen(
        	<div>
           		<p> 子页面输入：
                	<input type="button" value="提交" onclick={this.props.hindChildValueChange}/>
           		</p>
        	</div>
    	)
}
```
父组件
```

	hindChildValueChange(event){
    	this.setState({age: 'event.target.value'});
	}
	render(){
	    retuen(
	        <div>
	           <p> 子页面输入：
	                <input type="button" value="提交" onclick={changeUserInfo.bind(this)}/>
	           </p>
	           <BodyChild handChildValueChange={this.handChildValueChange.bing(this)}>
	        </div>
	    )
	}
```
*思考为什么使用onchange(),不使用noBlur()*

###4.可复用组件
* 1.数据验证(当前组件Body,参数age,类的后面定义)

```

	Body.propTypes = {
    	age：React.PropTypes.number                 //age为number
    	age:React.PropTypes.number.isRequired          //age必须存在
	}
```

* 2.数据默认username,可被后面赋值覆盖

```     

	const defaultProps = {
	    usernaem : '这是一个默认值';				//放在 类前
	}

	Body.defaultProps =  defaultProps;          //放在类后
```

* 3.快速传递所有参数的快捷方式
`{...this.props}`       
	* Index组件 父类->子类
	`<Body userId={1001}/>`
	* Body组件 子类->孙子类
	`<BodyChild {...this.props}>`         //可以把所有数据给孙子类，快速传参

###5.组件的Refs

>知识点

* 1.原始获取方式(event中)
    `var myDiv= document.getElementById('myDiv');`
    `ReactDOM.findDOMNode(myDiv).style.color='green'`
* 2.方法二的定义：`<input ref="myInput" />`
* 3.方法二的获取：`this.refs.myInput.
* 
* 
* .color='green'`
* 4.Refs是访问组件内部DOM节点的唯一可靠方法
* 5.Refs会自动销毁对子组件的引用
* 6.不要在render或者render之前对Refs进行调用
* 7.不要滥用Refs

###6.独立组件间共享Mixins(不同组件之间共用功能，共享代码)

ES6需要安装 `npm install react-mixin@2 --save`支持
创建文件
```

	const MixinLog = {
    	componentDidMount(){
        	console.log("");        //也可以结合生命周期使用
    	}
    	log(){
       		console.log("abcde....");
    	}
	};

	export default MixinLog
```
使用
```

	import ReactMixin from 'react-mixin';            //引入

	MixinLog.log();                                 //直接调用

	ReactMixin(Body.prototype,MixinLog);             //和propTypes差不多使用，在类的最后
```

>知识点

* 1.官方文档：https://facebook.github.io/react/docs/reusable-components.html#mixins
* 2.关于Mixins的讨论文章：https://facebook.github.io/react/blog/2016/07/13/mixins-considered-harmful.html
* 3.和页面具有类似的生命周期

## 7.React样式

### 1.内联样式

方法一：js加载样式

```

	//定义在render()内
	const styleComponentHeader = {
		header:{
			backgroundColor:"#333333",
			color:"#FFFFFF",
			"padding-top":"15px",	//原始属性需要" "引起来
			paddingBottom:"15px"	//驼峰就不需要了，可直接使用
		}
	};
	//调用在return()内
	<header style={styleComponentHeader.header}>
```

方法二：css
```

	//正常方式书写，在入口文件引入css文件
	//调用
	<header className="{/*样式名*/}">	//不能使用class！使用className！
```
>问题

* 
* 不可做复用

>知识点

* 1.命名规范
* 2.注意样式驼峰写法
* 3.注意class需要改成className
* 4.缺点事动画，伪类（hover）等不可用

### 2.内联样式中的表达式
可以使用三元表达式，或者一些条件语句，结合事件对样式进行赋值改变
### 3.css模块化
*如何保证自己写的样式不影响其他人？*（大家写的css样式className还可能相同呢）

* 首先安装三个插件
`npm intall --save babel-plugin-react-html-attrs style-loader css-loader`
样式的class和className都可以使用了
* 入口文件需要加入类似如下的文件，***也是一种规则***
```index.js

				{
					test: /\.css$/,
					exclude: /node_modules/,
					loader: 'style!css?module&localIdentName=[hash:base64:5]&-url'
				},
```

定义一个自己的myfooter.css文件
```css

	.minfooter{
		color:red;
	}
```
使用：在组件里可以直接引用了~

`var footerCss=require（"../../css/myfooter.css");`
`class={footerCss.minfooter}`
>1.为什么要进行css模块化

* 1.全局污染
* 2.命名混乱
* 3.以来管理不彻底
* 4.无法共享变量
* 5.代码压缩不彻底

>2.使用方法

* 1.导入
* 2.使用
* 3.`：local(.normal){color:green;}` 本地使用
* 4.`：global(.normal){color:green;}`全局使用

>css模块化的优点

* 1.所有样式都是local的，解决了命名冲突和全局污染问题
* 2.class名生成规则配置灵活，可以此来压缩class名
* 3.只需要引用组件的JS就能搞定组件所有的JS和CSS
* 4.依然是CSS，几乎零成本学习

### 4.JSX样式与CSS的互转
[转换工具网址htttp://staxmanade.com/CssToReact](htttps://staxmanade.com/CssToReact)
直接将转换后的代码，赋值写进render()内部
定义
`var footerVonverStyle={css转换后的代码}`
使用
`style={footerVonverStyle}`

### 5.Ant Design样式框架介绍
[**Google开发的Material-UI**](http://www.material-ui.com/)
[**阿里-蚂蚁金融开发的Ant Design**](https://ant.design)

### 6.Ant Dsign样式使用

>安装

`npm install antd --save`
>引入组件

`import {Input} from 'antd';`
>引入样式

`import 'antd/dist/antd.css'`
>修改入口文件

//ant-desing配置文件
`{test: /\.css$/,loader: 'style-loader!css-loader'}`
>使用

`<Input id="" style="" ref="" type=""/> `//自动加载样式
## 8.React Router 
### 1.Router概念

* 1.demo代码的逻辑结构
* 2.控制页面的层级关系
* 3.单页面构建Router控制
* 4.底层机制-[链接github介绍](https://github.com/ReactTraining/react-router)
React state/props->Components->UI
Router:location->Router-UI

>安装

`npm install react-router --save`
`npm install --save react-router-dom` /、4.0版本以上使用功能`<Link></Link>`需要安装此依赖
创建一个文件src/js/router.js
```

	import React from 'react';
	impotr ReacrDOM from 'react-dom';
	import Index from '/index/';
	import ComponentList from '/component/list';
	import {Router,Route,hashHistory} from 'react-router';
	
	export default class router extends React.Component{
		render(){
			return{
				//这里替换了之前的Index，变成了程序的入口
				<Router history={hashHistory}>
					<Router component={Index} path="/"></Router>
					<Router component={ComponentList} path="list"></Router>
				</Router>
			};
		};
	}

	ReactDOM.render(
		<Index/>,document.getElementById('example'));//Index里面的代码移动过来
	
```

创建一个list.js文件
```

	import React from 'react';
	impotr ReacrDOM from 'react-dom';
	
	export default class ComponentList extends  React.Component{
		render(){
			return{
				<div>
					<p>这里是列表文件</p>
				</div>
			};
		};
	}

```

修改webpack的入口文件以及package.json文件
package：
`main：index.js`改为`root.js`

webpack：
`entry："./src/js/index.js"`改为`entry："./src/js/root.js"`

>内部嵌套

```

	<Router component={Index} path="/">
		<Router component={ComponentList} path="list"></Router>
	</Router>

	//这个List嵌套在Index里面的,下面代码写在Index文件中用于展示
	<div>
		{this.props.children}
	</div>
```
>导航使用

```

	import {Link} from 'react-router';
	//return()内部
	<Link to={'/'}>首页</Link>
```

###2.Router参数传递
>1.理解参数传递的重要意义

>2.定义方法`path="list/:id`

>3.导航list页面写上：`{this.props.params.id}`

>4.to 等同于`<a href=""></a>`

## 9.项目实战！！！项目调优！！！项目部署吧！！！

[官方网站reactstrap](http://reactstrap.github.io/)-安装使用方法
>样式： 

`npm install bootstrap reactstrap --save`

>响应式：

`npm install react-responsive --save`

>标准模板

```

	import React from 'react'

	export default class Page extends React.Component{
   		constructor(){
        	super();
        	this.state={

        	};
    	}
    	render(){
        	return(
				<div>
                
            	</div>
        	)
    	}
	}
```

>reactstrap登录界面代码

```

	<Container>
            <div  className=""><img width="80%" className={loginCss.logoImg} src={logo} alt="logo"/></div>
            <br/>
            <br/>
            <br/>
            <br/>
            <Row>
                <Col xs="1"></Col>
                <Col xs="10">
            <Form name="loginForm" className="" onSubmit={ this.handleSubmit }>
                <FormGroup>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">用户名</InputGroupAddon>
                        <Input name="username" placeholder="username"  />
                    </InputGroup>
                    <br/>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">密码</InputGroupAddon>
                        <Input type="password" name="password" placeholder="password" />
                    </InputGroup>
                    <br />
                </FormGroup>
                <FormGroup tag="fieldset">
                    <Row>
                        <Col>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="radio1" value="1" />{'导游'}
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="radio1" value="2"/>{'游客'}
                                </Label>
                            </FormGroup>
                        </Col>
                    </Row>
                </FormGroup>
                <Button type="submit" color="primary" size="lg" block>登录</Button>
            </Form>
             </Col>
            </Row>
           
            <Col xs="1"></Col>
        </Container>
```

>fetch 网络请求方法[链接【https://github.com/github/fetch】](https://github.com/github/fetch)

`npm install fetch --save`


>reactstrap 轮播图

```
	
	import React from 'react';
	import ReactDOM from 'react-dom';
	import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
	} from 'reactstrap';
	// import './../../../css/mobile/home.css';

	const items = [
    {
      src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
      altText: 'Slide 1',
      caption: 'Slide 1'
    },
    {
      src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
      altText: 'Slide 2',
      caption: 'Slide 2'
    },
    {
      src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
      altText: 'Slide 3',
      caption: 'Slide 3'
    }
	  ];

	export default class HomePage extends React.Component{
    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
      }
    
      onExiting() {
        this.animating = true;
      }
    
      onExited() {
        this.animating = false;
      }
    
      next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
      }
    
      previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
      }
    
      goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
      }
      render() {
        const { activeIndex } = this.state;
    
        const slides = items.map((item) => {
          return (
            <CarouselItem onExiting={this.onExiting} onExited={this.onExited} key={item.src}>
              <img width="100%"src={item.src} alt={item.altText} />
              <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
            </CarouselItem>
          );
        });
    
        return (
          <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
          </Carousel>
        );
      }
}

```

# React和Redux  2补充
dispatch action reducer state 单身边数据流

	Express 基于nodejs，快速、开放、极简的web开发框架
		使用
			app.get app.post 分别开发get和post接口
			app.use使用模块
			代res.send res.json res.sendfile相应不同内容
	Express nodemon(热更新，自启动）
		npm install express nodemon --save-dev

----------------------------------------
	MongoDB非关系性数据库
	官网[http://docs.mongodb.com](http://docs.mongodb.com "MongoDB官网")
		MAC:brew install mongodb
	mongoose node链接MongoDB的库
		npm install mongoose
		使用
			const mongoose = require('mongoose')
		- Connect链接数据库
			const DB_URL="mongodb://localhost:3306/imooc"
			mongoose.connect(DB_URL)
			mongoose.connection.on("'connected',functiong{
				console.log('mongo connect success')
			})
			//类似于mysql的表，mongo里有文档，字段的概念，存储为json文件
		
		- 定义文档类型，Schema和model新建模型
			const User = mongoose.model('user',new mongoose.Schema({
				user:{type:String,require:true},
				age:{type:Number,require:true}
			}))
		- 代一个数据库文档对应一个模型，通过模型对数据库进行操作
		- Mongoose文档类型
			String NUmber等数据结构
			create remove update 分别进行增删改
			find findOne查询数据
	
			增删改查
				mongod --config /usr/local/etc/momgod.conf 后台启动
				Expres 结合mongodb
				封装mongoose
			增
				User.create({
					user:'immoc',
					age:18
				},functinon(err,doc){
					if(!err){
						console.log(doc)
					}else{
						console.log(err)
					}
				})
			查
				User.find({},function(err,doc){
					res.json(doc)
				})
			删
				User.remove({age:18},function(err,doc){
					if(!err){
						console.log("detele success")
						User.find({},function(e,d){
							console.log(d)
						}
					}
				})
			改
				User.update({'user':'xiaoming'},{'$set':{age:26}},function(err,doc){
					console.log(doc)
				})

------------------------------------------------
	Express和mongodb结合
		mongodb独立工具函数
		express使用body-parser支持post参数
		使用cookie-parser存储登录信息cookie

# Redux

- 专注于状态管理 和react解耦
- 单一状态 单向数据流
- 核心概念 store state action reducer

	- store存储所有记录的状态
	- despatch负责执行action
	- reducer处理变化，拿到的state和action，生成新的state

	reducer 新建store，随时通过store.getState获取状态
	需要状态变更，store.dispatch(action)来修改状态
	Reducer函数接受state和action，返回新的state，可以用store.subscribe监听每次修改

		import {createStore} form 'redux'
		function counter(state=0,action){
			switch(action.type){
			case '增加'
				return state+1
			case '减少'
				return state-1
			default:
				return 10
			}
		}
		const store = createStore(counter)
		const init = store.getState()
		console.log(init)
	
		//派发事件, 传递action
		store.dispatch({type:'增加'})
		console.log(store.getState())
	
		function listener(){
			const current = store.getState()
			console.log(`现在有${current}个）
		}
		store.subscribe(listener)

## Redux和React一起使用

- 把store.dispatch()方法传递给组件，内部可以调用修改状态
- Subcribe订阅render函数，每次修改都要重新渲染
- Redux相关内容，移到单独的文件index.redux.js单独管理

更进一步
处理异步、调试工具、更优雅的和React结合
- Redux处理异步，需要redux-thunk插件

		npm install redux-thunk --save
		使用applyMiddleware开启thunk中间件
		Action可以返回函数，使dispatch提交action
- npm install redux-devtools-extension并且开启
- 使用功能react-redux优雅的链接react和redux

	npm install react-redux --save
	忘记subscribe，记住reducer action dispatch即可
	React-redux提供Provider和connect两个接口链接

具体使用

	- Provider组件在应用最外层，传入store即可，只用一次
		`ReactDom.render((<Proveder store={store}><App/></Provider>) document.getElementById('root'))`
	- Connect负责从外部获取组件需要的参数
	- Connect可以用装饰器的方式来写，优化代码
		- npm run eject 弹出个性化配置
		- npm install babel-plugin-trasnform-decorators-legacy
		- package.json里babel加上plugins配置`"plugins":["trasnform-decorators-legacy"]`

# React-Router4
​	核心概念 Route、Link、Switch、BrowserRouter、Redirect
​		BrowserRouter，包裹整个应用
​		Router路由对应渲染的组件，可嵌套
​		Link跳转专用
​	url参数，Router组件参数可用冒号标识参数
​	Redirect组件跳转
​	Switch只渲染一个子组件

# 前后端联动

使用asios发送异步请求
	- 如何发送，端口不一致，使用proxy配置代理
	- axios拦截器，统一loading处理
	- redux里使用异步数据，渲染界面

	npm install axios --save
	package.json 增加 "proxy":"http://localhost:9093"//指定端口
	import {axios} form axios
	axios.get('/data').then(res=>{
		console.log(res)
		if(res.status==200){
			this.setState({data:res.data})
		}	
	})
	
	简介好用的发送请求库
		- Axios.interceptor设置拦截器，比如全局loading
			+ 拦截请求
			axios.interceptor.request.use(function(config){
				return config
			})
			+ 拦截响应
			axios.interceptor.response.use(function(config){
				return config
			})
		- axios.get，post发送请求，返回promise对象
		- Redux里获取数据，然后dispath即可

## 基于cookie用户验证
express 依赖cookie-parser，
npm install cookie-parser --save

## Socket.io
基于事件的实时双向通信库
	基于websocket协议
	前后端通过事件进行双向通信
	配合express，快速开发实时应用
Socket.io和Ajax区别
	Ajax基于http协议，单向，实时获取数据只能轮询
	socket.io基于websocket双向通信，后端可以主动推送数据
	现代浏览器均支持websocket协议
配合express
	Io = require('socket.io')(http)
	io.on监听事件
	io.emit触发事件

