# mysql-duubaohao
## 创建数据库

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
` GRANT ALL PRIVILEGES ON '数据库名'.* TO '用户名'@'主机名' IDENTIFIED BY 'mypassword' WITH GRANT OPTION;   `

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

## Table 字段

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

## sql 创建表、删除表 增加字段 删除字段操作

	新建表：
	create table [表名]
	(
	[自动编号字段] int IDENTITY (1,1) PRIMARY KEY ,
	[字段1] nVarChar(50) default \'默认值\' null ,
	[字段2] ntext null ,
	[字段3] datetime,
	[字段4] money null ,
	[字段5] int default 0,
	[字段6] Decimal (12,4) default 0,
	[字段7] image null ,
	)
	
	删除表：
	Drop table [表名]
	
	插入数据：
	INSERT INTO [表名] (字段1,字段2) VALUES (100,\'51WINDOWS.NET\')
	
	删除数据：
	DELETE FROM [表名] WHERE [字段名]>100
	
	更新数据：
	UPDATE [表名] SET [字段1] = 200,[字段2] = \'51WINDOWS.NET\' WHERE [字段三] = \'HAIWA\'
	
	新增字段：
	ALTER TABLE [表名] ADD [字段名] NVARCHAR (50) NULL
	
	删除字段：
	ALTER TABLE [表名] DROP COLUMN [字段名]
	
	修改字段：
	ALTER TABLE [表名] ALTER COLUMN [字段名] NVARCHAR (50) NULL
	
	重命名表：(Access 重命名表，请参考文章：在Access数据库中重命名表)
	sp_rename \'表名\', \'新表名\', \'OBJECT\'
	
	新建约束：
	ALTER TABLE [表名] ADD CONSTRAINT 约束名 CHECK ([约束字段] <= \'2000-1-1\')
	
	删除约束：
	ALTER TABLE [表名] DROP CONSTRAINT 约束名
	
	新建默认值
	ALTER TABLE [表名] ADD CONSTRAINT 默认值名 DEFAULT \'51WINDOWS.NET\' FOR [字段名]
	
	删除默认值
	ALTER TABLE [表名] DROP CONSTRAINT 默认值名
	
	删除Sql Server 中的日志，减小数据库文件大小
	dump transaction 数据库名 with no_log
	backup log 数据库名 with no_log
	dbcc shrinkdatabase(数据库名)
	exec sp_dboption \'数据库名\', \'autoshrink\', \'true\'
	
	\\\'添加字段通用函数
	Sub AddColumn(TableName,ColumnName,ColumnType)
	Conn.Execute(\"Alter Table \"&TableName&\" Add \"&ColumnName&\" \"&ColumnType&\"\")
	End Sub
	
	\\\'更改字段通用函数
	Sub ModColumn(TableName,ColumnName,ColumnType)
	Conn.Execute(\"Alter Table \"&TableName&\" Alter Column \"&ColumnName&\" \"&ColumnType&\"\")
	End Sub
	
	\\\'检查表是否存在
	
	sql=\"select count(*) as dida from sysobjects where id = object_id(N\'[所有者].[表名]\') and OBJECTPROPERTY(id, N\'IsUserTable\') = 1\"
	
	set rs=conn.execute(sql)
	
	response.write rs(\"dida\")\'返回一个数值，0代表没有，1代表存在


​	
	判断表的存在:
	select * from sysobjects where id = object_id(N\'[dbo].[tablename]\') and OBJECTPROPERTY(id, N\'IsUserTable\') = 1
	
	某个表的结构
	select * from syscolumns where id = object_id(N\'[dbo].[你的表名]\') and OBJECTPROPERTY(id, N\'IsUserTable\') = 1