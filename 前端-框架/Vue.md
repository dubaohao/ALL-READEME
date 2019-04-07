# VUE

## 安装

最新稳定版本
npm install vue

npm install -g veu-cli



## 模板指令

- new 一个vue对象的时候可以设置它的属性，其中最重要的包括三个，分别是data method watch
- 其中deta代表vue对象的数据，method代表vue对象的方法，watch设置了对象监听的方法。
- Vue对象里的设置通过HTML指令关联
- 重要指令包含

	- v-text	渲染数据
	- v-if	控制显示
	- v-for	循环渲染
	- v-show
	- v-on	事件绑定
	- v-bing	属性绑定等等

## webpack构建VUE
### 静态资源

npm init
npm i webpack vue vue-loader
根据warning安装需要依赖的

新建webpack.conf.js

	const path = require('path')
	module.export={
		entry:path.join(_dirname,'src/index.js'),
		ouput:{
			filename:'bundle.js',
			path:path.join(__dirname,'dist')
		}
		module: {//依赖的模块
		        rules: [  //模块、规则，如果在webpack旧版本中用的不是rules。用的是loaders
		            {
		                test: /\.vue$/,
		                loader: 'vue-loader'
		            },
					{
		                test: /\.css$/,
		                use:[
							'style-loader',
							'css-loader'
						]
		            },
					{
		                test: /\.styl$/,
		                use:[
							'style-loader',
							'css-loader'，
							'stylus-loader'，
						]
		            },
					{
		                test: /\.(gif|jpg|jpeg|png|svg)$/,
		                use:[
							{
								loader:'url-loader',
								options:{
									limit:1024,
									name:'[name].[ext]'//name原始name；ext后缀
								}
							}
						]
		            },
				]
		}
	}

在package.js的scripts增加
`"build":"webpack --config webpack.config.js"`

执行命令`npm run build`
添加webpack.conf.js配置，添加依赖
`npm install url-loader style-loader file-loader`
执行命令`npm run build`

`npm install stylus`这是一个样式方法

### webpack-dev-server
在package.js的scripts增加
`"build":"webpack-dev-server --config webpack.config.js"`
判断开发环境和生产环境
`npm install cross-env`

修改package.js文件

	const isDev = process.env.NODE_ENV ==='development'
	module.exports里增加target:'web',
	scripts里修改【可以再不同平台使用】
	`"build":"cross-env NODE_ENV=production webpack --config webpack.config.js`
	`"dev":"cross-env NODE_ENV=production webpack-dev-server --config webpack.config.js`

末尾增加
	
	if(dev){
		config.devtool='#cheap-module-eval-source-map'//热加载
		config.devServer={
			port:8000,
			host:'0.0.0.0',
			overlay:{
				errors:true,
			}
			//historuFallback:{
			
			//}
			//open:true,
			hot:true
		},
		config.webpack.push(//热加载
			new webpack.HotModuleReplacementPlugin()
			new webpack.NotEmitOnErrorsPlugin()
		)
	}

把module.exports改为const config
末尾新建一个module.exports=config


`npm install html-webpack-plugin`

	webpack.config.js引入
	const webpack = require('webpack')
	const HTMLPlugin = require('html-webpack-plugin')
	plugins:[
		new webpack.DefinePlugin({
			'process.env:{
				NODE_ENV:isDev?'"development"':'"production"'
			}
		}),
		new HTMlPlgugin()
		]

## vue2介绍
数据绑定
vue文件开发方式
render方法

### API重点
生命周期方法
computed

配置vue的jsx写法以及postcss
`npm install postcss-loader autoprefixer babel-loader babel-core`
.babelrc文件
postcss.config.js文件
具体配置的不写了
慕课网视频[https://www.imooc.com/video/16406](https://www.imooc.com/video/16406 "慕课网视频")

### weipack配置优化
慕课网：4-1 css单独分离打包[https://www.imooc.com/video/16409](https://www.imooc.com/video/16409 "慕课网视频")

慕课网：4-2webpack区分打包类库代码及hash优化[https://www.imooc.com/video/16409](https://www.imooc.com/video/16410 "慕课网视频")

