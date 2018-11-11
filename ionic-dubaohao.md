# ionic3 APP小白开发 模仿知乎界面

>安装ionic和cordova <br>
`npm install -g ionic cordova`

>安装node.js和npm，到指定官网下载安装即可<br>
`node官网:`https://nodejs.org/en/

>下载本文代码或是自己初始化一个项目(建议使用tabs）<br>
`ionic start firstAPP tabs`

>打开项目目录 
`cd firstApp`

>初始化开始命令，安装相应的modules和plugins <br>
`npm install`

>运行命令 <br>
`ionic serve`

>新增页面文件<br>
`ionic g`选择`page`
快速命令 `ionic g page XXX`



>如果要在手机运行，则执行以下命令： 
 
- 添加iOS项目  
    `$ ionic cordova platform add ios`  
    - 把src里的内容同步到iOS项目中  
    `$ ionic cordova build ios`  
    - 在模拟器中运行iOS项目（相当于在Xcode里面按Command+R）
    `$ ionic cordova emulate ios`  
  
- Android同理，将`ios`替换为`android`即可  
    `$ ionic cordova platform add android`  
    `$ ionic cordova build android`  
    `$ ionic cordova emulate android`  

- 浏览器 微信版本，静态站点，部署node.js,IIS,nginx/apache
    `$ ionic build`


***
[Android手机apk安装包下载](APP开发中)
链接无效正在开发中

兼容不用手机
<span ionic-text color="primary" showWhen="ios">取消</span>
<ion-icon name="md-close" showWhen="android"></ion-icon>
#问题与解决
有时候会遇到一些小问题，函数未定义
删除生成的文件内容 @IonicPage（）

理解modal和nav的使用场景
modal临时、过渡的弹窗
nav用于层级关系的页面展示 
