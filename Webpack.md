#Webpack
	2018/12/25 21:26:28 
	作者Tobias Koppers
	GWT工具（Google Web Toolkit）代码分隔工具
	Instagram团队
**本文档基于Webpack3.1**
## 为什么要构建？
* 开发分工变化
* 框架的变化
* 语言的变化
* 环境的变化
* 社区的变化
* 工具的变化
### 框架演变
Js库 -> MVC -> MV*

	各种库神魔乱舞
	BackBone.js+UndersScore.js+ jQuery.js
	Angular React Vue代表性三大框架

###为什么前端需要构建
* 开发复杂化
* 框架去中心化
* 语言编译化
* 开发模块化

###为什么Webpack？
- Vue-cli /React-satart /Angular-cli
- Code-splitting代码分隔
- 天生模块化

###Js模块化
	- 命名空间
		库名.类别名.方法名
	- Common.js （推荐，主流）
		Modules/1.1
		一个文件一个模块
		通过module.exports暴露模块
		通过require引入模块
		同步执行
	- AMD/CMD/UMD
		- Async Module Definition （推荐）
			define定义模块
			require加载模块
			RequireJS
			依赖前置
		- Common Module Definition
			define定义模块
			require加载模块
			SeaJS
			尽可能懒执行
		- Universal Module Definition
			通用解决方案
			三个步骤
				判断是否支持AMD
				判断是否支持CommonJS
				如果都没有使用全局变量
	- ES6 module （推荐，主流）
		ECMAScript Module
		一个文件一个模块
		export/import

### CSS模块化
	CSS设计模式
		OOCSS
		SMACSS
		Atomic CSS
		MCSS
		AMCSS
		BEM
		CSS Modules
###命令行工具
	Node + Npm
	Webpack
	Mac （Oh My Zsh/iTerm2）
	
	npm install webpack -g
###Webpack 核心概念
	Entry
		代码的入口
		打包的入口
		单个或多个页面应用
	Ouput
		打包成的文件bundle
		一个或多个
		自定义规则
			output：{filename:'[name]'.min.[hash:5].js}
		配合CDN
	Loaders
		处理文件
		转化为模块
		编译相关：babel-loader ts-loader
		样式相关：style-loader css-loader less-loader postcss-loader
		文件相关：file-loader url-loader
	Plugins 插件系统
		参与打包的整个过程
		打包优化和压缩
		配置编译时的变量
		极其灵活的
		优化相关：CommonsChunkPlugin UglifyjsWebpackPlugin
		功能相关:ExtractTextWebpackPlugin HtmlModuleReplacementPlugin CopyWebpackPlugin
####名词
	
	Chunk 代码块
	Bundle 打包过的一束
	Module 模块
	
###Webpack使用
	Webpack命令
	Webpack配置
	第三方脚手架
	
	webpack -h 查看所有命令
	webpack -v 查看版本
	webpack/webpack <entry> [<entry>] <output>


	webpack-cli
		交互式的初始化一个项目
		迁移项目！V1-》V2

#### Webpack-cli
demo
webpack-cli init webpack-addons-demo
和git init类似，交互式问答

#### Webpack 配置

	webpack 
	webpack --config webpack.conf.dev.js
####脚手架

	Vue-cli
	Angular-cli
	React-starter
###打包JS

	webpack entry<entry> output
	webpack --config webpack.conf.js
	
####编译ES6 、7
	Babel 
	Babel-loader
	npm install babel-loader babel-core --save -dev
	Babel Presets
	npm installl babel-preset-env --save -dev
插件

	Babel Polyfill
		全局垫片
		为应用准备的
		npm install babel-ployfill --save
		可以使用ES6 的一些特殊方法 map。。。。
	Babel Runtime Transform
		局部垫片
		为开发框架准备的
		npm install babel-plugin-runtime-transform --save -dev
		npm install babell-runtime --save-dev
#### Typescript
Js的超集
	
	typescript-loader
	npm install typescript ts-loader --save -dev官方
	npm install typescript awesome-typescript-loader --save -dev 第三方
配置

	tsconfig.json专门的配置文件
	webpack.config.js
	tsconfig.json

	配置选项
		-》官网
	常用选项
		compilerOption
		include
		exclude

	声明文件(错误提示）
	npm install @types/lodash
	npm install @types/vue

	|_->替换品Typings
	npm install typings
	typings install lodash
	会多一个配置文件和目录
### 提取公用代码
	减少代码冗余
	提高加载速度
	CommonsChunkPlugin
	webpack.optimize.CommonsChunkPlugin
	配置
	{
		plugins:[
			new webpack.optimize.CommonsChunkPlugin(option)
		]
	}
	配置项
	options.name or options.names
	options.filename 打包后文件名
	options.minChunks	最小出现次数
	options.chunks 指定提取范围
	options.children子模块查找依赖
	options.deepChildren
	options.async 创建一个异步的公共代码流

	场景
		单页应用
		单页应用+第三方依赖
		单页应用+第三方依赖+webpack生成代码
###代码分隔和懒加载
	- webpack methods 内置方法
		- require.ensure
			[]:dependencies
			callback
			errorCallback
			chunkName
		- require.include
	- ES2015 Loader spec
		System.import()->import
		回调，import()—>Promise
		import().then()
####代码分隔
	分离业务代码和第三方依赖
	分离业务代码和业务公共代码和第三方依赖
	分离首次加载和访问后加载的代码
### 处理CSS
	引入
	CSS modules
	配置less/sass
	提取css代码

	- style-loader 创建标签，加入dom中
	css-loader js如何import一个进来
	
	其他方法
	style-loader/url和file-loader
	style-loader/useable
	
	options
		insertAt(插入位置)
		insertInto(插入到dom)
		singleton(是否只使用一个style标签)
		transform(转化，浏览器环境下，插入页面前)

	-CSS loader
		options
			alias(解析的别名)
			importLoader(@import)
			Minimize(是否压缩)
			modules(启用css-modules)
		CSS-Modules
			：local
			：global
			compose
			compose...from path
###配置Less/Sass
	npm install less-loader less --save -dev
	npm install sass-loader node-sass --save -dev
###提起CSS
	extract-loader
	ExtractTextWebpackPlugin(主流）插件
	
	npm install extract-text-webpack-plugin --save-dev
	需要引用，然后配置
	var ExtractTextWebpackPlugin=require('extract-text-webpack-plugin')。。。
###PostCSS
A tool for transforming CSS with JavaScript!!!

	PostCSS
	Autoprefixer   	增加前缀，不同浏览器
	CSS-nano		压缩
	CSS-next		使用css 新语法：变量，选择器，动态计算。。。

	安装
	postcss
	postcss-loader
	Autoprefixer
	postcss-cssnano
	postcss-cssnext

	浏览器兼容Broswerslist
	所有插件共用
		package.json
		.browserslist

	其他插件
	postcss-import
	postcss-url
	postcss-assets
###Tree Shaking
	去除没有使用的代码
	Js Tree Shaking
	CSS Tree Shaking

	使用场景
		常规优化
		引入第三方库的某一功能

	Purify CSS
	npm install purify-css --save -dev
	npm install glob-all --save-dev

	options
		path:glob.sync([])
### 文件处理

- 图片处理
- 字体文件
- 第三方JS库

图片处理
	CSS引入的图片
	自动合成雪碧图
	压缩图片
	base64编码
引入依赖
	file-loader
	url-loader
	img-loader
	postcss-sprites
###Html in Webpack
- 自动生成HTML
- 场景优化

		生成HTML
		插件 HTMLWebpackPlugin
			options
				template
				filename
				minify
				chunks
				inject
		HTML中引入图片
		html-loader
		options
			attrs:['img：src','img:data-src']

###配合优化
提前载入webpack加载代码
	inline-manifest-webpack-pligin
	html-webpack-inline-chunk-plugin


##Webpack开发环境

		npm install clean-webpack-plugin --save -dev 清楚之前的打包文件

	- webpack watch mode
		webpack-watch 或者webpack -w
		webpack -w --progress --display-reason --color可以看到打包过程，进度
	- webpack-dev-server
		- live reloading自动刷新浏览器
		不能打包
		路径重定向
		支持https
		浏览器中显示编译错误
		接口代理
		模块热更新
		
		devServer
			inline
			contentBase  提供内容的路径
			port	端口号
			historyApiFallback	浏览器history API
			https
			proxy   远程代理
			hot 热更新
			openpage
			lazy	懒模式，对需要访问到的资源进行编译
			overlay 遮罩，错误提示
		写成脚本：json文件内，scripts里增加server：webpack-dev-server --open
	- express +webpack-dev-middleware
		下面单独有一段落讲

###http-proxy-middleware
		options
			target 地址
			changeOrigin 为True
			headers
			logLevel 设置debug，控制台可以看到代理信息
			pathRewrite 重新配置API路径，指向原来API地址
	- Module Hot Reloading
		保持应有的数据状态
		节省调试时间
		样式调试更快
		
		devServer.hot置为true
		webpack.HotModuleReplacementPlugin
		webpack.NameModulesPlugin

		module.hot
		module.hot.accept
		module.hot.decline

###Source Map 调试
	 对打包的代码和源代码做一个映射
	Js Source Map
	CSS Source Map

	Devtool(7个值）
		webpack.SourceMapDevToolPlugin
		webpack.EvalSourceMapDevToolPlugin
	Development 开发环境
		eval
		eval-source-map
		cheap-eval-souce-map
		cheep-module-eval-souce-map
	Production 生产环境
		source-map
		hidden-source-map
		nosource-source-map

	css还需要开启相应的loader
		css-loader.option.sourcemap
		less-loader.option.sourcemap
		csass-loader.option.sourcemap

###EsLint检查代码格式
	eslint
	eslint-loader
	eslint-plugin-html
	eslint-friendly-formatter

	webpack.config.js配置
	.eslintrc.*
	package.json中的dslintConfig

	配置ESLint
	推荐Javascript Standard Style
	安装 eslint-config-standard
		eslint-plugin-promise
		eslint-plugin-import
		eslint-plugin-node
		eslint-config-xxx

	eslint-loader
		options.failOnWarning
		options.failOnError
		options.formatter
		options.ouputReport
	devServer.overlay 控制台看到信息

###开发环境和生产环境
	开发环境
		模块热更新
		souceMap
		接口代理
		代码规范检查
	生产环境
		提取公共代码
		压缩混淆
		文件压缩或是base64编码
		去除无用代码
	共同点
		同样的入口
		同样的代码处理（loader处理）
		同样的解析配置
	如何区分这两个环境呢？？？
		webpack-merge
		webpack.dev.conf.js
		webpack.prod.conf.js
		webpack.common.conf.js
		需要分别配置


###使用middleware搭建开发环境
	Express 或者Koa
	webpack-dev-middleware
	webpack-hot-middleware
	http-proxy-middleware
	connect-history-ap-fallback
	opn
##打包结果分析
	Offical Analyse Tool
		webpack --profile --json > stats.json
		webpack --profile --json | Out-file'stats.json' -Encoding OEM
	webpack-bundle-analyzer
		插件
			BundleAnalyzerPlugin
		命令行
			webpack-bundle-analyzer stats.json

###打包速度优化
文件多？依赖多？页面多？

	方法一：分开vender和app【区分第三方代码和开发代码】
		插件（第三方文件打包）
			DllPlugin
			DllReferencePlugin
	方法二：UglifyJsPlugin【压缩和混淆】
			给它增加参数paralel
			利用cache
	方法三： HappyPack【给loader使用，并行处理】
			HappyPack.ThreadPool
	方法四：babe-loader
			options.cacheDirectory
			include
			exclude
	其他：
		减少resolve
		Devtool：去除sourcemap
		cache-loader
		升级node
		升级webpack
		
####长缓存有缘
	场景：改变APP代码 vendor变化
	解决：提取vender
		hash->chunkhash
		提取webpack runtime
	
	场景：引入新模块，模块顺序变化，vender hash变化
	解决：NamedChunksPlugin
		NameModulesPlugin
	
	场景：动态引入模块式时，vendor hash变化
	解决：定义动态模块的chunkname
	
	总结：
		独立打包vender
		抽出manifest（webpack runtime）
		使用NamedChunksPlugin
		NameModulesPlugin
		动态模块给定模块名称
###多页面应用
多入口entry
多页面html
每个页面有不同的chunk
每个页面有不同的参数

方法
	多配置
	单配置

	多配置：webpack3.1.0开始
	工具parallel-webpack
	优点：可以使用parallel-webpack来提高打包应用
		配置更加独立灵活
	缺点：
		不能多页面之间共享代码，不能提取共用代码
	parallel-webpack
		parallel-webpack --watch
		parallel-webpack --config

	单配置
	优点：可共享各个entry之间共用代码
	缺点：打包速度比较慢
		输出的内容比较复杂
##webpacket-Vue
	官方脚手架Vue-cli
		npm install vue-cli -g
		vue --help
		vue list 查看项目模板
			simple
			webpack
			webpack-simple
			browserify
			browserify-sample
		vue init <template name> <project name>
		vue init <git repo> <project name>
		Vue webpack
				项目结构
				基本命令
				开发配置
				工具配置
		运行项目自动打开浏览器
		config下index.js文件修改 autoOpenBrowser：true；
		port也可以修改
 
	项目模板
	配置文件
##webpack-react
	官方脚手架 create-react-app
		react-scripts
		npm install create-react-app -g
		npx create-react-app my-project
		npm start 启动服务器
		npm test 测试用例
		npm run build
		npm run eject
	
		支持ES6 和JSX
		支持动态引入import
		支持Fetch （ployfill）
		支持proxy
		支持postcss
		支持eslint
		支持测试

		不支持React Hot-reloading
		弱支持Css预处理器

	自定义配置
	npm run eject后
	根目录下创建.env.local文件
		PORT=8080

	proxy配置
		package.joson

		"proxy":{
			"/api":{
				"target":"https://m.weibo.cn"
				"changeOrigin":true
			}
		}
		index.js
		fetchh('/api/comments/show?id=1')
			.then(res=>{
				res.json().then(data=>(
					console.log(data)
				})
			})
	Less配置
		npm install less-loader --save-dev
		webpack.config.dev.js和webpack.config.prod.js
			修改规则为
			test：/\.(css|less)$/,
			importLoaders:2
			//webpack.config.dev.js
			{
				loader:'less-loader'
			}
			//webpack.config.prod.js
			{
				loader:require。resolve（'less-loader'）
			}	
	React热更新配置
		npm install react-hot-loader --save--dev
		webpack.config.dev.js文件
		entry增加
			'react-hot-loader/patch',
		module增加一个plugin找到与处理jsx相关的规则
			options增加
				plugins:['react-hot-loader/babel']
		引入
			import （AppCotainer} form 'react-hot-loader';
		使用标签嵌套整个render（）里的div
			<AppContainer></AppContainer>
		调用API
		if（module.hot){
			module.hot.accept('/components/App/',()={
				render(App)	
			});
		}

			
##Augular和Webpack
	官方脚手架 Angular-cli
	Angular最佳实践代码
	所有项目依赖
	Typescript和测试
	环境配置

	npm install @angular/cli -g
	ng help
	ng new ng-project
	ng new ng-project -style=less --source-dir=src
	ng g/generate
	ng server
	ng build
	ng test
	ng e2e
	ng lint
	ng eject
	
	ng server(Webpack Dev Server)
		编译Less/Sass
		编译Typescripts
		打包JS、CSS
		热更新
		代码分隔
		接口代理
	接口代理请求
	proxy.conf.json
		ng server --proxy-config proxy.conf-json
	CSS预处理
		ng new project --sytle=less
		ng set default.styleExt less
	第三方依赖安装
		npm install lodash --save
		npm install @type/lodash --save-dev
	热更新
		npm install @angularclass/hmr --save -dev
		增加脚本"hmr":"ng server --hmr -e=hmr"
		新增hmr.ts文件，放入文件（去官网下载）
		在main.ts引入
		import {hmrBootStrap} form './hmr''
		const bootstrap=() =>platformBrowserDynamic().bootstrapModule(AppModule);
		if(envirment.hmr){
			if(module['hot']){
			hmrBootstrap(module,bootstrap)
			}else{
				console.log('no working')
			}
		}else{
			bootstrap()
		}
	

##webpack面试
1. 概念
	问题一：什么是webpack，和grunt、gulp区别
		webpack是一个模块打包器，他可以递归的打包项目中的所有模块，最终生成几个打包文件，他和其他工具最大的不同，支持code-spliting 模块化（AMD、ESM、CommonJs）、全局分析。
	问题二：什么是bundle、chunk、module？
		bundle是webpack打包成的文件，chunk指webpack在进行模块的依赖分析的时候，代码分割出来的代码块。module是开发中的单个模块。
	问题三：什么是loader？什么是plugin？
		loader是用来告诉webpack如何处理转化某一类型文件，并且引入到打包文件中
		plugin，是用来自定义webpack打包过程的方式，一个插件含有apply方法的一个对象，通过这个方法可以参与到整个webpack打包的各个流程（生命周期）。
2. 配置
	如何自动生成webpack配置？
		webpack-cli、vue-cli、etc。。。。。。脚手架工具
3. 开发环境
	webpack-dev-server和http服务器，nginx服务器区别？
		webpack-dev-server使用内存来存储webpack开发环境下的打包文件，并且可以使用模块热更新，他比传统的http服务器开发更加简单。
	什么是模块热更新？
		是webpack的一个功能，代码修改后不用刷新浏览器，是高级版的自动刷新浏览器。
4. 优化
	什么是长缓存？如何优化
		浏览器在用户访问页面的时候，为了加快加载速度，会对用户访问的静态资源进行存储，但是每一次代码升级或是更新，都需要浏览器下载新代码，最方便和简单更新方式就是引入新的文件名称。在webpack中可以再output给输出文件制定chunkname，并且分离经常更新和框架代码。通过NameModulePlugin或是HashModuleIdsPlugin使再次打包文件名不变
	什么是Tree-Shaking？CSS可以Tree-Shaking？
		它是指代码在打包中去除那些引用了，但是没有使用的死代码。在webpack中通过UglifyJSPlugin来实现。
		CSS使用Purify-CSS。
	