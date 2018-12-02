const readline = require('readline');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})
 
var str,s1,s2,lineCount = 0;
rl.on('line',line=>{
    if(lineCount % 3 == 0){
        str = line;
    }else if(lineCount % 3 == 1){
        s1 = line;
    }else if(lineCount %3 == 2){
        s2 = line;
        var res = dubaohao(str,s1,s2);
        console.log(res);
    }
    lineCount++;
})

    // var a="aaacaaa";
    // var b="aca";
    // var c="aa";
    // print(dubaohao(a,b,c));
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