## npm、yarn、pnpm之间的区别

### Yarn是什么？
“Yarn是由Facebook、Google、Exponent 和 Tilde 联合推出了一个新的 JS 包管理工具 ，正如官方文档中写的，Yarn 是为了弥补 npm 的一些缺陷而出现的。”这句话让我想起了使用npm时的坑了：

* npm install的时候巨慢。特别是新的项目拉下来要等半天，删除node_modules，重新install的时候依旧如此。


* 同一个项目，安装的时候无法保持一致性。由于package.json文件中版本号的特点，下面三个版本号在安装的时候代表不同的含义。
"5.0.3",
"~5.0.3",
"^5.0.3"
“5.0.3”表示安装指定的5.0.3版本，“～5.0.3”表示安装5.0.X中最新的版本，“^5.0.3”表示安装5.X.X中最新的版本。这就麻烦了，常常会出现同一个项目，有的同事是OK的，有的同事会由于安装的版本不一致出现bug。

* 安装的时候，包会在同一时间下载和安装，中途某个时候，一个包抛出了一个错误，但是npm会继续下载和安装包。因为npm会把所有的日志输出到终端，有关错误包的错误信息就会在一大堆npm打印的警告中丢失掉，并且你甚至永远不会注意到实际发生的错误。
带着这些坑，我开始了解Yarn的优势及其解决的问题。
### Yarn的优点？
**速度快** 。速度快主要来自以下两个方面：
并行安装：无论 npm 还是 Yarn 在执行包的安装时，都会执行一系列任务。npm 是按照队列执行每个 package，也就是说必须要等到当前 package 安装完成之后，才能继续后面的安装。而 Yarn 是同步执行所有任务，提高了性能。
**离线模式**：如果之前已经安装过一个软件包，用Yarn再次安装时之间从缓存中获取，就不用像npm那样再从网络下载了。
**安装版本统一**：为了防止拉取到不同的版本，Yarn 有一个锁定文件 (lock file) 记录了被确切安装上的模块的版本号。每次只要新增了一个模块，Yarn 就会创建（或更新）yarn.lock 这个文件。这么做就保证了，每一次拉取同一个项目依赖时，使用的都是一样的模块版本。npm 其实也有办法实现处处使用相同版本的 packages，但需要开发者执行 npm shrinkwrap 命令。这个命令将会生成一个锁定文件，在执行 npm install 的时候，该锁定文件会先被读取，和 Yarn 读取 yarn.lock 文件一个道理。npm 和 Yarn 两者的不同之处在于，Yarn 默认会生成这样的锁定文件，而 npm 要通过 shrinkwrap 命令生成 npm-shrinkwrap.json 文件，只有当这个文件存在的时候，packages 版本信息才会被记录和更新。
**更简洁的输出**：npm 的输出信息比较冗长。在执行 npm install <package> 的时候，命令行里会不断地打印出所有被安装上的依赖。相比之下，Yarn 简洁太多：默认情况下，结合了 emoji直观且直接地打印出必要的信息，也提供了一些命令供开发者查询额外的安装信息。
**多注册来源处理**：所有的依赖包，不管他被不同的库间接关联引用多少次，安装这个包时，只会从一个注册来源去装，要么是 npm 要么是 bower, 防止出现混乱不一致。
更好的语义化： yarn改变了一些npm命令的名称，比如 yarn add/remove，感觉上比 npm 原本的 install/uninstall 要更清晰。

	Yarn和npm命令对比
	npm	yarn
	npm install	yarn
	npm install react --save	yarn add react
	npm uninstall react --save	yarn remove react
	npm install react --save-dev	yarn add react --dev
	npm update --save	yarn upgrade
### npm的未来：npm5.0
有了yarn的压力之后，npm做了一些类似的改进。

默认新增了类似yarn.lock的 package-lock.json；
git 依赖支持优化：这个特性在需要安装大量内部项目（例如在没有自建源的内网开发），或需要使用某些依赖的未发布版本时很有用。在这之前可能需要使用指定 commit_id 的方式来控制版本。
文件依赖优化：在之前的版本，如果将本地目录作为依赖来安装，将会把文件目录作为副本拷贝到 node_modules 中。而在 npm5 中，将改为使用创建 symlinks 的方式来实现（使用本地 tarball 包除外），而不再执行文件拷贝。这将会提升安装速度。目前yarn还不支持。

### NPM
`npm`是`Node.js`能够如此成功的主要原因之一。npm团队做了很多的工作，以确保npm保持向后兼容，并在不同的环境中保持一致。

npm是围绕着语义版本控制（semver）的思想而设计的，下面是从他们的网站摘抄过来的：

	给定一个版本号：主版本号.次版本号.补丁版本号， 以下这三种情况需要增加相应的版本号:
	
	主版本号： 当API发生改变，并与之前的版本不兼容的时候
	次版本号： 当增加了功能，但是向后兼容的时候
	补丁版本号： 当做了向后兼容的缺陷修复的时候
	npm使用一个名为`package.json`的文件，用户可以通过`npm install --save`命令把项目里所有的依赖项保存在这个文件里。
	
	例如，运行`npm install --save lodash`会将以下几行添加到package.json文件中。
	
	"dependencies": {
		"lodash": "^4.17.4"
	}
请注意，在版本号`lodash`之前有个^字符。这个字符告诉npm，安装主版本等于4的任意一个版本即可。所以如果我现在运行npm进行安装，npm将安装lodash的主版本为4的最新版，可能是 `lodash@4.25.5`（@是npm约定用来确定包名的指定版本的）。你可以在此处查看所有支持的字符：https://docs.npmjs.com/misc/semver。

理论上，次版本号的变化并不会影响向后兼容性。因此，安装最新版的依赖库应该是能正常工作的，而且能引入自4.17.4版本以后的重要错误和安全方面的修复。

但是，另一方面，即使不同的开发人员使用了相同的package.json文件，在他们自己的机器上也可能会安装同一个库的不同种版本，这样就会存在潜在的难以调试的错误和“在我的电脑上…”的情形。

大多数npm库都严重依赖于其他npm库，这会导致嵌套依赖关系，并增加无法匹配相应版本的几率。

虽然可以通过`npm config set save-exact true`命令关闭在版本号前面使用^的默认行为，但这个只会影响顶级依赖关系。由于每个依赖的库都有自己的package.json文件，而在它们自己的依赖关系前面可能会有^符号，所以无法通过package.json文件为嵌套依赖的内容提供保证。

为了解决这个问题，npm提供了`shrinkwrap`命令。此命令将生成一个`npm-shrinkwrap.json`文件，为所有库和所有嵌套依赖的库记录确切的版本。

然而，即使存在`npm-shrinkwrap.json`这个文件，npm也只会锁定库的版本，而不是库的内容。即便npm现在也能阻止用户多次重复发布库的同一版本，但是npm管理员仍然具有强制更新某些库的权力。

这是引用自shrinkwrap文档的内容：

如果你希望锁定包中的特定字节，比如是为了保证能正确地重新部署或构建，那么你应该在源代码控制中检查依赖关系，或者采取一些其他的机制来校验内容，而不是靠校验版本。

npm 2会安装每一个包所依赖的所有依赖项。如果我们有这么一个项目，它依赖项目A，项目A依赖项目B，项目B依赖项目C，那么依赖树将如下所示：

	node_modules
	- package-A
	-- node_modules
	--- package-B
	----- node_modules
	------ package-C
	-------- some-really-really-really-long-file-name-in-package-c.js
这个结构可能会很长。这对于基于Unix的操作系统来说只不过是一个小烦恼，但对于Windows来说却是个破坏性的东西，因为有很多程序无法处理超过260个字符的文件路径名。

npm 3采用了扁平依赖关系树来解决这个问题，所以我们的3个项目结构现在看起来如下所示：

	node_modules
	- package-A
	- package-B
	- package-C
	-- some-file-name-in-package-c.js
这样，一个原来很长的文件路径名就从

	./node_modules/package-A/node_modules/package-B/node-modules/some-file-name-in-package-c.js变成了/node_modules/some-file-name-in-package-c.js。

你可以在这里阅读到更多有关NPM 3依赖解析的工作原理。

这种方法的缺点是，`npm`必须首先遍历所有的项目依赖关系，然后再决定如何生成扁平的`node_modules`目录结构。npm必须为所有使用到的模块构建一个完整的依赖关系树，这是一个耗时的操作，是npm安装速度慢的一个很重要的原因。

由于我没有详细了解npm的变化，所以我想当然的以为每次运行`npm install`命令时，NPM都得从互联网上下载所有内容。

但是，我错了，npm是有本地缓存的，它保存了已经下载的每个版本的压缩包。本地缓存的内容可以通过npm cache ls命令进行查看。本地缓存的设计有助于减少安装时间。

总而言之，npm是一个成熟、稳定、并且有趣的包管理器。

### Yarn
Yarn发布于2016年10月，并在Github上迅速拥有了2.4万个Star。而npm只有1.2万个Star。这个项目由一些高级开发人员维护，包括了Sebastian McKenzie（Babel.js）和Yehuda Katz（Ember.js、Rust、Bundler等）。

从我搜集到的情况来看，Yarn一开始的主要目标是解决上一节中描述的由于语义版本控制而导致的npm安装的不确定性问题。虽然可以使用npm shrinkwrap来实现可预测的依赖关系树，但它并不是默认选项，而是取决于所有的开发人员知道并且启用这个选项。

Yarn采取了不同的做法。每个yarn安装都会生成一个类似于npm-shrinkwrap.json的yarn.lock文件，而且它是默认创建的。除了常规信息之外，yarn.lock文件还包含要安装的内容的校验和，以确保使用的库的版本相同。

由于yarn是崭新的经过重新设计的npm客户端，它能让开发人员并行化处理所有必须的操作，并添加了一些其他改进，这使得运行速度得到了显著的提升，整个安装时间也变得更少。我估计，速度提升是yarn受欢迎的主要原因。

像npm一样，yarn使用本地缓存。与npm不同的是，yarn无需互联网连接就能安装本地缓存的依赖项，它提供了离线模式。这个功能在2012年的npm项目中就被提出来过，但一直没有实现。

yarn还提供了一些其他改进，例如，它允许合并项目中使用到的所有的包的许可证，这一点让人很高兴。

一个有趣的事情是，yarn文档的态度开始针对npm发生改变，因为yarn项目变得流行起来。

最开始的yarn公告是这么介绍yarn的安装的：

*最简单的入门方法是运行：

	npm install -g yarn 
	yarn*

现在的yarn安装页面是这么说的：

注意：通常情况下不建议通过npm进行安装。npm安装是非确定性的，程序包没有签名，并且npm除了做了基本的SHA1哈希之外不执行任何完整性检查，这给安装系统程序带来了安全风险。

基于这些原因，强烈建议你通过最适合于你的操作系统的安装方法来安装yarn。

以这种速度发展下去的话，如果yarn要宣布他们自己的registry，让开发者慢慢淘汰npm的话，我们一点都不会感到惊讶。

看起来似乎要感谢yarn，npm终于意识到他们需要更加关注一些大家强烈要求的问题了。当我在审核我之前提到的强烈要求的“离线”功能时，我注意到这个需求正在被积极地修复之中。

### pnpm
正如我所提到的，在pnpm的作者Zoltan Kochan发表了“为什么要用pnpm？”之后，我才知道pnpm。

我不会介绍太多的细节（因为这篇文章已经发布很久了），但是你可以查看我的最初的帖子来寻找更多的内容，同时在Twitter上加入讨论。

但是

我想指出的是，pnpm运行起来非常的快，甚至超过了npm和yarn。

为什么这么快呢？ 因为它采用了一种巧妙的方法，利用硬链接和符号链接来避免复制所有本地缓存源文件，这是yarn的最大的性能弱点之一。

使用链接并不容易，会带来一堆问题需要考虑。

正如Sebastian在Twitter上指出的那样，他最初是打算在yarn中使用符号链接的，但是由于其他一些原因放弃了它。

同时，正如在Github上拥有2000多个Star那样，pnpm能够为许多人所用。

此外，截至2017年3月，它继承了yarn的所有优点，包括离线模式和确定性安装。

总结
我认为yarn和pnpm的开发人员做了一个惊人的工作。我个人喜欢的是确定性安装，因为我喜欢控制，我不喜欢惊喜。

无论这场竞争的结果是什么，我很感谢yarn在npm的脚下点了一把火，提供了另外一个选择。

我确信yarn是一个更安全的选择，但是pnpm可能是一些测试用例的更好的选择。例如，它可以在运行大量集成测试并希望尽可能快地安装依赖关系的中小型团队中发挥作用。

最后，我认为，npm仍然提供了一个非常有用的解决方案，支持大量的测试用例。大多数开发人员使用原始npm客户端仍然可以做得很好。