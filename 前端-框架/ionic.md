# ionic3 APP

> ionic3 基本命令

- 安装ionic和cordova <br>
  `npm install -g ionic cordova`

- 安装node.js和npm，到指定官网下载安装即可<br>
  `node官网:`https://nodejs.org/en/

- 下载本文代码或是自己初始化一个项目(建议使用tabs）<br>
  `ionic start firstAPP tabs`

- 打开项目目录 
  `cd firstApp`

- 初始化开始命令，安装相应的modules和plugins <br>
  `npm install`

- 运行命令 <br>
  `ionic serve`

- 新增页面文件<br>
  `ionic g`选择`page`
  快速命令 `ionic g page XXX`



> 如果要在手机运行，则执行以下命令： 

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
