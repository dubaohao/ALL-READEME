# Git基础

#### 创建版本库

初始化变为仓库：`git init`

添加文件到Git仓库，分两步：

1. 使用命令`git add <file>`，注意，可反复多次使用，添加多个文件；
2. 使用命令`git commit -m <message>`，完成。
3. 

#### 版本回退

- `HEAD`指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭，使用命令`git reset --hard commit_id`。
- 穿梭前，用`git log`可以查看提交历史，以便确定要回退到哪个版本。
- 要重返未来，用`git reflog`查看命令历史，以便确定要回到未来的哪个版本。

#### 工作区和暂存区

**工作区（Working Directory）**

就是你在电脑里能看到的目录，比如我的`learngit`文件夹就是一个工作区：

**版本库（Repository）**

工作区有一个隐藏目录`.git`，这个不算工作区，而是Git的版本库。

Git的版本库里存了很多东西，其中最重要的就是称为stage（或者叫index）的暂存区，还有Git为我们自动创建的第一个分支`master`，以及指向`master`的一个指针叫`HEAD`。



前面讲了我们把文件往Git版本库里添加的时候，是分两步执行的：

第一步是用`git add`把文件添加进去，实际上就是把文件修改添加到暂存区；

第二步是用`git commit`提交更改，实际上就是把暂存区的所有内容提交到当前分支。

因为我们创建Git版本库时，Git自动为我们创建了唯一一个`master`分支，所以，现在，`git commit`就是往`master`分支上提交更改。

你可以简单理解为，需要提交的文件修改通通放到暂存区，然后，一次性提交暂存区的所有修改。

#### 管理修改

查看状态：`git status`

`git diff HEAD -- readme.txt`命令可以查看工作区和版本库里面最新版本的区别：

#### 撤销修改

场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令`git checkout -- file`。

场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令`git reset HEAD <file>`，就回到了场景1，第二步按场景1操作。



#### 删除文件

命令`git rm`用于删除一个文件。如果一个文件已经被提交到版本库，那么你永远不用担心误删，但是要小心，你只能恢复文件到最新版本，你会丢失**最近一次提交后你修改的内容**。



#### 添加远程仓库

`git remote add origin git@github.com:dubaohao/仓库名.git`

要关联一个远程库，使用命令`git remote add origin git@server-name:path/repo-name.git`；

关联后，使用命令`git push -u origin master`第一次推送master分支的所有内容；



#### 克隆

要克隆一个仓库，首先必须知道仓库的地址，然后使用`git clone`命令克隆。

Git支持多种协议，包括`https`，但通过`ssh`支持的原生`git`协议速度最快。

#### 创建与合并分支

查看分支：`git branch`

创建分支：`git branch <name>`

切换分支：`git checkout <name>`

创建+切换分支：`git checkout -b <name>`

合并某分支到当前分支：`git merge <name>`

删除分支：`git branch -d <name>`

[合并分支视频](http://liaoxuefeng.gitee.io/git-resources/master-and-dev-ff.mp4)

#### 解决冲突

![git-br-feature1](..\assets\0.png)

这种情况下，Git无法执行“快速合并”，只能试图把各自的修改合并起来，但这种合并就可能会有冲突

`git merge feature1`

当Git无法自动合并分支时，就必须首先解决冲突。解决冲突后，再提交，合并完成。

解决冲突就是把Git合并失败的文件手动编辑为我们希望的内容，再提交。

用`git log --graph`命令可以看到分支合并图。

#### 分支管理策略

通常，合并分支时，如果可能，Git会用`Fast forward`模式，但这种模式下，删除分支后，会丢掉分支信息。

如果要强制禁用`Fast forward`模式，Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息。

禁用`Fast forward`模式：`git merge --no-ff -m "merge with no-ff" dev`

因为本次合并要创建一个新的commit，所以加上`-m`参数，把commit描述写进去。

合并后，我们用`git log`看看分支历史

#### Bug分支

**工作只进行到一半，还没法提交，预计完成还需1天时间。但是，必须在两个小时内修复该bug，怎么办？**

Git还提供了一个`git stash`功能，可以把当前工作现场“储藏”起来，等以后恢复现场后继续工作：

完成其他BUG任务后，用`git stash list`命令查看



工作现场还在，Git把stash内容存在某个地方了，但是需要恢复一下，有两个办法：

一是用`git stash apply`恢复，但是恢复后，stash内容并不删除，你需要用`git stash drop`来删除；

另一种方式是用`git stash pop`，恢复的同时把stash内容也删了：



#### Feature分支

添加一个新功能时，你肯定不希望因为一些实验性质的代码，把主分支搞乱了，所以，每添加一个新功能，最好新建一个feature分支，在上面开发，完成后，合并，最后，删除该feature分支。

一切顺利的话，feature分支和bug分支是类似的，合并，然后删除。

如果要丢弃一个没有被合并过的分支，可以通过`git branch -D <name>`强行删除。

#### 多人协作

要查看远程库的信息，用`git remote`或者，用`git remote -v`显示更详细的信息

并不是一定要把本地分支往远程推送，那么，哪些分支需要推送，哪些不需要呢？

- `master`分支是主分支，因此要时刻与远程同步；
- `dev`分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；
- bug分支只用于在本地修复bug，就没必要推到远程了，除非老板要看看你每周到底修复了几个bug；
- feature分支是否推到远程，取决于你是否和你的小伙伴合作在上面开发。

因此，多人协作的工作模式通常是这样：

1. 首先，可以试图用`git push origin <branch-name>`推送自己的修改；
2. 如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`试图合并；
3. 如果合并有冲突，则解决冲突，并在本地提交；
4. 没有冲突或者解决掉冲突后，再用`git push origin <branch-name>`推送就能成功！

如果`git pull`提示`no tracking information`，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream-to <branch-name> origin/<branch-name>`。

这就是多人协作的工作模式，一旦熟悉了，就非常简单。

**小结**

- 查看远程库信息，使用`git remote -v`；
- 本地新建的分支如果不推送到远程，对其他人就是不可见的；
- 从本地推送分支，使用`git push origin branch-name`，如果推送失败，先用`git pull`抓取远程的新提交；
- 在本地创建和远程分支对应的分支，使用`git checkout -b branch-name origin/branch-name`，本地和远程分支的名称最好一致；
- 建立本地分支和远程分支的关联，使用`git branch --set-upstream branch-name origin/branch-name`；
- 从远程抓取分支，使用`git pull`，如果有冲突，要先处理冲突。

#### rebase

我们看到了，多人在同一个分支上协作时，很容易出现冲突。即使没有冲突，后push的童鞋不得不先pull，在本地合并，然后才能push成功。

`git log --graph --pretty=oneline --abbrev-commit`

> [详细解释-阮一峰](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0015266568413773c73cdc8b4ab4f9aa9be10ef3078be3f000)

#### 创建标签

- 命令`git tag <tagname>`用于新建一个标签，默认为`HEAD`，也可以指定一个commit id；
- 命令`git tag -a <tagname> -m "blablabla..."`可以指定标签信息；用`-a`指定标签名，`-m`指定说明文字：
- 命令`git tag`可以查看所有标签。
- 命令 `git show <tagname>`查看标签信息

#### 操作标签

因为创建的标签都只存储在本地，不会自动推送到远程。所以，打错的标签可以在本地安全删除。

- 命令`git push origin <tagname>`可以推送一个本地标签；
- 命令`git push origin --tags`可以推送全部未推送过的本地标签；
- 命令`git tag -d <tagname>`可以删除一个本地标签；
- 命令`git push origin :refs/tags/<tagname>`可以删除一个远程标签。

#### 忽略特殊文件

忽略文件的原则是：

1. 忽略操作系统自动生成的文件，比如缩略图等；
2. 忽略编译生成的中间文件、可执行文件等，也就是如果一个文件是通过另一个文件自动生成的，那自动生成的文件就没必要放进版本库，比如Java编译产生的`.class`文件；
3. 忽略你自己的带有敏感信息的配置文件，比如存放口令的配置文件。



- 忽略某些文件时，需要编写`.gitignore`；
- `.gitignore`文件本身要放到版本库里，并且可以对`.gitignore`做版本管理！



#### 常考面试题



**1.fetch和merge和pull的区别**

 pull相当于git fetch 和 git merge，即更新远程仓库的代码到本地仓库，然后将内容合并到当前分支。

 git fetch：相当于是从远程获取最新版本到本地，不会自动merge

 git merge :  将内容合并到当前分支

 git pull：相当于是从远程获取最新版本并merge到本地



**2.tag**

tag指向一次commit的id，通常用来给开发分支做一个标记

打标签 : git tag -a v1.01 -m "Relase version 1.01"

提交标签到远程仓库 :  git push origin --tags

查看标签 : git tag

查看某两次tag之间的commit：git log --pretty=oneline tagA..tagB

查看某次tag之后的commit: git log --pretty=oneline tagA..



**3.Git和SVN的区别**

Git是分布式版本控制系统，SVN是集中式版本控制系统



**4.Git工作流程**

1、在工作目录中修改某些文件

2、对修改后的文件进行快照，然后保存到暂存区域

3、提交更新，将保存在暂存区域的文件快照永久转储到Git目录中



**5.常用命令**

git show # 显示某次提交的内容 git show $id

git add <file> # 将工作文件修改提交到本地暂存区

git rm <file> # 从版本库中删除文件

git reset <file> # 从暂存区恢复到工作文件

git reset HEAD^ # 恢复最近一次提交过的状态，即放弃上次提交后的所有本次修改

git diff <file> # 比较当前文件和暂存区文件差异 git diff

git log -p <file> # 查看每次详细修改内容的diff

git branch -r # 查看远程分支

git merge <branch> # 将branch分支合并到当前分支

git stash # 暂存

git stash pop #恢复最近一次的暂存

git pull # 抓取远程仓库所有分支更新并合并到本地

git push origin master # 将本地主分支推到远程主分支