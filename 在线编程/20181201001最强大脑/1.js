// 题目描述
// 小B乘火车和朋友们一起在N市到M市之间旅行。她在路途中时睡时醒。当她醒来观看窗外的风景时，注意到每个火车站都有一种特别颜色的旗帜，但是她看到的旗帜仅仅是经过的一小部分。小B在乘车过程中有两次清醒的时间，她到达旅程终点时处于睡梦中。出站时，她和朋友们谈论着一路的见闻，朋友们觉得很有意思，他们把N到和M之间经过车站的旗帜颜色依次列出来，然后告诉你小B记得的旗帜颜色序列，让你判断小B究竟是从N和M之间哪些方向才能看到所说颜色的旗帜，还是根本就不可能看到？颜色用字母代表，相同的字母代表相同的颜色，不同的字母则表示不同的颜色。
// 输入描述:
// 输入中有多组测试数据，每组测试数据包含三行，第一行为一个由小写拉丁字母构成的非空字符串，长度不超过10^5，表示N到M之间车站的颜色。火车从M向N运行时，经过的车站相同，只是方向相反。第二行为小B在第一次睡醒时看到的颜色序列，第三行为小B在第二次睡醒时看到的颜色序列。两个序列都是小写的拉丁字母构成的字符串，长度不超过100个字母。每个序列的颜色顺序排列按小B看到的时间顺序排列。
// 输出描述:
// 对每组测试数据，在单独的行中输出小B的旅行方向。
  
// forward - 由N到M方向； 

// backward -由M到N方向  

// both - 两种方向都有可能；  

// invalid - 不可能看到这样的颜色序列；

// 示例1
// 输入
// atob 
// a 
// b 
// aaacaaa 
// aca 
// aa

// 输出

// forward 
// both


// const readline = require('readline');
// const rl = readline.createInterface({
//     input:process.stdin,
//     output:process.stdout
// })
 
// var str,s1,s2,lineCount = 0;
// rl.on('line',line=>{
//     if(lineCount % 3 == 0){
//         str = line;
//     }else if(lineCount % 3 == 1){
//         s1 = line;
//     }else if(lineCount %3 == 2){
//         s2 = line;
//         var res = dubaohao(str,s1,s2);
//         console.log(res);
//     }
//     lineCount++;
// })

    var a="aaacaaa";
    var b="aca";
    var c="aa";
    print(dubaohao(a,b,c));
// };
function dubaohao(a,b,c){
    var flag1=0;
    for (var i=0,j=0;i<a.length;i++){
        // console.log("11正向循环判断i=",i,"j=",j);
            if(a[i]==b[j]){
                
                // console.log("11判断相等1 i=",i,"j=",j);
                j++;

                // 只有第一个存在的情况下才会进入这个循环
                if(j==b.length){
                    
                    // console.log("11进入二段检查i=",i,"j=",j);
                    for(var x=i+1,y=0;x<a.length;x++){
                        // console.log("12进入二段检查循环,x=",x,"y=",y);
                        if(a[x]==c[y]){
                            y++;
                            if(y==c.length){
                                flag1=1;
                                // console.log("12确定了！y=",y,"flag1=",flag1);
                                break;
                            }
                            
                            
                        }
                    }
                    // console.log("j=",j);
                    // console.log("flag1=",flag1);
                }
                /////结束
                if(flag1==1){break;}
                
                // console.log("11判断相等2  i=",i,"j=",j);
            }
    }
    var flag2=0;

    // console.log("中间");

    for (var i=a.length,j=0;i>=0;i--){
        // console.log("21正向循环判断i=",i,"j=",j);
            if(a[i]==b[j]){
                
                // console.log("21判断相等1 i=",i,"j=",j);
                j++;

                // 只有第一个存在的情况下才会进入这个循环
                if(j==b.length){
                    // console.log("21进入二段检查i=",i,"j=",j);
                    for(var x=i-1,y=0;x>=0;x--){
                        // console.log("22进入二段检查循环,x=",x,"y=",y);
                        if(a[x]==c[y]){
                            y++;
                            if(y==c.length){
                                flag2=1;
                                // console.log("22确定了！y=",y,"flag2=",flag2);
                                break;
                            }
                        }
                    }
                    // console.log("j=",j);
                    // console.log("flag1=",flag1);
                }
                /////结束
                if(flag2==1){break;}
                
                // console.log("21判断相等2  i=",i,"j=",j);
            }
    }
// console.log("flag=",flag1,"和",flag2);
    var flag="kong"
    if(flag1==1 && flag2==1){flag= "both"}
    else if(flag2==1 && flag1==0){flag= "backward";}
    else if(flag1==1 && flag2==0){flag="forward";}
    else{flag= "invalid";}
    // console.log("flag=",flag);
    return flag;
};
// 思路：（我这种思路，一次看到的字符串可以不连续，比如一次看到的中间某一个掉了）正常来说，题目应该是一次看到的连续字符串，所以我的思路范围其实更大了，包含很多不存在的组合，而小b看到的真实字符串，是我的可以输入的字符串的子集；
// 遍历所有字符串从头到尾，查找甲的字符串，如果查找到完全的，所有字符串断点，再在此位置继续查找乙的字符串，如果查到，则为正向；
// 反向判断，从尾到头也是如此方法
// 最后判断是，正向，反向，还是双向，还是不存在