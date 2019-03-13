#网络-dubaohao

##1.natapp
`natapp -authtoken=7686061e7ed77645`

##2.重启httpd服务
>查看httpd是否已经安装

`rpm -qa`
>查看httpd是否应运行

`ps -ef`
>查看httpd的运行状态

`service httpd status
>启动http服务

`service httpd start`
>关闭http服务

`service httpd start`
>重启http服务

`service httpd start`

##2.查询端口号，并关闭
###1.window
>1.列出所有端口号

`netstat -ano`

>2.查看被占用端口对应的PID

`netstat -aon|findstr "PID"`
>3.查看是哪个进程或者程序占用了port端口

`tasklist|findstr "port"`
>4.结束进程

`taskkill /f /t /im 程序名.exe`

###3.linux


netstat命令各个参数说明如下：

　　-t : 指明显示TCP端口

　　-u : 指明显示UDP端口

　　-l : 仅显示监听套接字(所谓套接字就是使应用程序能够读写与收发通讯协议(protocol)与资料的程序)

　　-p : 显示进程标识符和程序名称，每一个套接字/端口都属于一个程序。

　　-n : 不进行DNS轮询，显示IP(可以加速操作)

即可显示当前服务器上所有端口及进程服务，于grep结合可查看某个具体端口及服务情况··

`netstat -ntlp `  //查看当前所有tcp端口·

`netstat -ntulp |grep 80`   //查看所有80端口使用情况·

`netstat -an | grep 3306`   //查看所有3306端口使用情况·

查看一台服务器上面哪些服务及端口

`netstat  -lanp`

查看一个服务有几个端口。比如要查看mysqld

`ps -ef |grep mysqld`

查看某一端口的连接数量,比如3306端口

`netstat -pnt |grep :3306 |wc`

查看某一端口的连接客户端IP 比如3306端口

`netstat -anp |grep 3306`

`netstat -an` 查看网络端口 

`lsof -i :port`，使用`lsof -i :port`就能看见所指定端口运行的程序，同时还有当前连接。 

`nmap` 端口扫描
`netstat -nupl  `(UDP类型的端口)
`netstat -ntpl  `(TCP类型的端口)
`netstat -anp `显示系统端口使用情况

##后台运行程序
`nohup java -jar ***.jar &`