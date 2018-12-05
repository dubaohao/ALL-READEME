// 题目描述
// 设有n个正整数，将他们连接成一排，组成一个最大的多位整数。
// 如:n=3时，3个整数13,312,343,连成的最大整数为34331213。
// 如:n=4时,4个整数7,13,4,246连接成的最大整数为7424613。
// 输入描述:
// 有多组测试样例，每组测试样例包含两行，第一行为一个整数N（N<=100），第二行包含N个数(每个数不超过1000，空格分开)。
// 输出描述:
// 每组数据输出一个表示最大的整数。

// 示例1
// 输入
// 2
// 12 123
// 4
// 7 13 4 246

// 输出
// 12312
// 7424613
// const readline =require('readline');
// const rl = readline.createInterface({
//     input:process.stdin,
//     ouput:process.stdou
// })

// var num,str,lineCount=0;
// rl.on('line',line=>{
//     if(lineCount % 2== 0){
//         num =line ;
//     }else if(lineCount % 2 ==1){
//         str = line;
//         var res = dubaohao2(num,str);
//         console.log(res);
//     }
//     lineCount++;
// })
// var num =2;
// var str = "12 123"
// var num =4;
// var str="7 13 4 246";
// var num=37;
// var str="93 672 946 153 947 82 522 772 725 413 936 649 399 123 821 93 29 860 572 344 608 590 554 210 115 307 313 535 636 184 291 66 178 379 204 523 758";
// var num=62;
// var str="135 518 476 936 415 616 663 496 968 206 604 398 169 983 277 634 453 280 215 380 239 465 649 4 609 501 875 549 712 90 226 822 740 860 885 377 740 746 825 864 578 636 31 70 880 764 415 475 446 490 744 394 640 451 378 873 911 205 572 672 360 516";
var num= 14;
var str="4 496 490 497 494 4941 4944 444 445 4451 4455 44 43 45"
var du = dubaohao(num,str);
var du2 = dubaohao2(num,str);

// if(du=="9479469393936860828217727587256726664963660859057255453552352241339937934431330729291210204184178153123115"){console.log("正确");}
// console.log("正确值：","9839689369119088588087587386486082582276474674474074071270672663649640636634616609604578572549518516501496490476475465453451446441541539839438037837736031280277239226215206205169135");
console.log("返回值du =：",du);
console.log("返回值du2=：",du2);
// if(du=="9839689369119088588087587386486082582276474674474074071270672663649640636634616609604578572549518516501496490476475465453451446441541539839438037837736031280277239226215206205169135"){console.log("正确")}
if(du==du2){console.log("不存在漏洞");}
//停止使用了，已优化
function dubaohao(num ,str){
    var result = str.split(" ");
    // console.log("result=",result);
    for(var i=0;i<num;i++){
        for(var j=i+1;j<num;j++){
            // console.log("嵌套循环:i=",i,"j=",j,",result[i]=",result[i],",result[j]=",result[j]);
            var ans=swap(result[i],result[j]);
            // console.log("ans=",ans,",str[i]=",result[i],",str[j]=",result[j]);
            if(ans==1){
                continue;
            }else{
                var m =result[i];
                // console.log("m=",m);
                result[i]=result[j];
                result[j]=m;
            }
        }
    }
    // console.log("数组:",result);
    // return result;
    return result.join("");

}
//停止使用了，已优化
function swap(str1,str2){
    a=str1.length;// console.log("a.length=",a);
    b=str2.length;// console.log("b.length=",b);
    var str3;//保持长度length相等的中间值，取两者的最小长度的前半段
    if(a>b){
        str3=str1.slice(0,b);
        // console.log("a>b,str1=",str1,",str2=",str2,"str1[b]=",str1[b],"str1[0]=",str1[0]);
        //  console.log("a>b,相等位",str3>str2,"(多余位前半段",str3==str2,"多余位后半段",str1[b]<str1[0],"多余位结果",(str3==str2&&str1[b]<str1[0]),"),最终结果：",(str3>str2)||(str3==str2&&str1[b]<str1[0]));
        if(str3>str2||(str3==str2&&str1[b]>=str1[0])){return 1;}else{return 0;}
    }else if(a<b){
        str3=str2.slice(0,a);
        // console.log("a<b,str1=",str1,",str2=",str2,"str2[a]=",str2[a],"str2[0]=",str2[0]);
        //  console.log("a<b,相等位",str1>str3,"(多余位前半段",str1==str3,"多余位后半段",str2[a]<str2[0],"多余位结果",(str1==str3&&str2[a]>=str2[0]),"),最终结果：",(str1>str3)||(str1==str3&str2[a]>=str2[0]));
        if((str1>str3)||(str1==str3&&str2[a]<=str2[0])){return 1;}else{return 0;}
    }else{
        // console.log("a=b,str1=",str1,"str2=",str2,"结果：",str1>=str2);
        
        if(str1>=str2){return 1;}else{return 0;};
    }
}
// 主函数dubaohao()优化dubaohao2()
function dubaohao2(num ,str){
    var result = str.split(" ");
    // console.log("result=",result);
    var result2=result.sort(swap2);
    // console.log("result2=",result2)

    // return result2;
    return result2.join("");

}
// swap()优化方法,换用swap2()
function swap2(str1,str2){
    if(str1+str2<str2+str1){return 1;}else{return -1;}
}

// 思路：
// 我的：swap返回值，1代表str1>str2不需要交换位置，否则需要
// swap（）先比较长度，
//     长度不相等：然后以数量小的为标准，把长的这一部分拿出来使长度保持一致，如果str1>str2,则返回1,如果相同位置相等，就需要让长的str剩余部分的第一位大于相同位的第一位，才返回1，不需要交换；
//     长度相等：直接判断大小，str1>str2则返回1，不需要交换；
// 双层for循环，遍历比较，并在符合str1<str2,交换位置
// 得到从大到小的数组
// 官方优化：
// 直接将两个数值字符串拼接比较大小就可以了，并且利用了sort来排序
// 两个都跑一下，验证自己思路是否有漏洞，确实存在，在判断多余位置首位和相同位首位的时候，判断的=（应不应该有存在问题）已经修改！
// if(du==du2){console.log("不存在漏洞");}