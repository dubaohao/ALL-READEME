## H5报告基本要素
	* 移动端
	* H5 Canvss
	* 可视化
	* 数据报告
## H5专题页类型
	* 活动运营（时效性）
	* 品牌宣传（局限性）
	* 产品介绍（局限性）
	* 总结报告（重点）
## 总结报告

### 1.开发流程
​	->产品功能设计(产品经理）
​	->视觉/交互设计（交互、视觉工程师---美工）
​	->技术规划(技术经理，分析需求，复用，拆分）
​	->前端开发+后端开发
​	->测试（测试工程师）
​	->上线（运维工程师，搭建服务器）

	PM ProductionManager产品经理
		->MRD Market Requirementments Document需求文档
	UI UserInterface 界面视觉设计
		->视觉设计稿
	UE UserExperience 用户体验设计
		->交互设计稿
	PM ProjectManager 技术经理，具体项目
		->项目开发文档
			* 可行性确认
			* 技术选型
			* 开发、线上规划
			* 技术开发方案设计
			* 团队协作方式
	FE frontEnd develop engineer 前端开发工程师
	RD Research Developer 后端开发工程师 
	BE BackEnd 后端开发工程师
	QA Quality Assessment 测试
	OP Operate 运维
### 技术开发方案设计

#### 一、页面DOM操作

技术选型 jQuery
简介：一款轻量级JS框架
特点：1.强大的选择器
	2.出色的DOM操作封装
	3.可靠的事件处理机制

#### 二.页面切换工程
技术选型：FullPage.js插件
简介：jQuery插件
特点：API简单、易用、跨浏览器

#### 3.组织内容结构方案：Page-Component

技术选型：页-组件
组件分类：图文组件 图标组件

技术点：

	HTML+jss 
		柱图-垂直柱图
		散点图
	Canvas
		折线图
		雷达图
		饼图-环图
#### 前端开发

- 1.设计稿标准&切图
介绍标注工具MarkMan及其使用方法
- 2.编写静态页
验证fullPage.js插件的页面切换功能
验证利用fullPage.js事件，实现组件的入场出场动画
- 3开发测试
基本图文组件：实现出场入场动画提取
- 4.开发测试
内容组织类：实现内容页面与组件的组织功能，方便任意添加Page component内容
- 5开发图标组件
- 6loading功能开发
- 7功能组合

#### 设计稿 MarkMan标注、PhostShop
#### 静态页思路验证

- 1页切换 fullPage.js
- 2.组件切换

#### jQuery全屏滚动插件 FullPage.js

#### 内容组织类

* 添加一个页 addPage
* 添加一个组件 addComponet
* 展现所有页面 loader

#### 图文组件类

* 作用：输出一个DOM（图片、文字）
* 事件：onLoad和onLeave

#### 图标组件类

* 作用：在图文组件类基础上，插入DOM结构和Canvas图像
* 事件：onLoad和onLeave

