#mysql-duubaohao
##创建数据库
> 登录
 
`mysql -u root -p`

* 输入密码

>立即启用修改

`FLUSH   PRIVILEGES; `
>创建数据库

`CREATE DATABASE '数据库名' CHARACTER SET utf8 COLLATE utf8_general_ci;`
>删除数据库

`drop database [schema名称|数据库名称];`
>创建登录用户

`CREATE USER '用户名'@'localhost或者%或者主机名'
  IDENTIFIED BY '密码';`
>删除用户

`delete from mysql.user where user='用户名';`
>授予权限

`GRANT SELECT, DELETE, CREATE, INSERT, UPDATE ON travel.* TO '用户名'@'主机名'·
IDENTIFIED BY '密码';`

* 超级权限
` GRANT ALL PRIVILEGES ON *.* TO '用户名'@'主机名' IDENTIFIED BY 'mypassword' WITH GRANT OPTION;   `

* 某个数据库所有权限
`grant rights on '数据库名'.* to user@host identified by "pass";`

* 基本操作授权
(在任何主机上登录，并对所有数据库有查询、插入、修改、删除的权限。 )
`grant select,insert,update,delete on *.* to '用户名'@"%" Identified by "密码";`

>收回权限

* 收回所有权限
`REVOKE ALL PRIVILEGES,GRANT OPTION FROM 'user'@'%';`
或者
`revoke all on *.* from tester;--取消用户所有数据库（表）的所有权限`

##Table 字段
>不为空

`NOT NULL `
>主键

`PRIMARY KEY`
>自增

`AUTO_INCREMENT` 
>外键

`FOREIGN KEY (当前表字段) REFERENCES 外键表(外键字段)`
>时间戳（特殊）

`create_date  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'`
`update_date  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'`