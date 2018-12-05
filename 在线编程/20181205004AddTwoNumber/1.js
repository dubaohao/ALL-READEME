/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    var c,i=0,j=0,arr1=new Array(),arr2=new Array(),res=new Array();
    //non-empty linked lists 
    arr1[0]=l1.val;
    arr2[0]=l2.val;
    while((!(l1.next == null))){

        l1=l1.next;
        i++;
        arr1[i]=l1.val;
    }
    while(!(l2.next == null)){
        l2=l2.next;
        j++;
        arr2[j]=l2.val;
        
        
    }
var a=arr1
var b=arr2
    // console.log(a,b);
    if(a.length>=b.length){
        var res=dubaohao(a,b);//默认前一个参数长度大于后一个
    }else{
        var res = dubaohao(b,a);
    }
    // console.log("res",res);
    
    //链表
    var listHead=new ListNode(0);
    listHead.val=res[0];
    var list =listHead;
    for(var m =1;m<res.length;m++){
        list.next=new ListNode(m);
        list=list.next;
        list.val=(res[m]) //字符变成数字
        
    }
    return listHead;
};


var dubaohao =function(arr1,arr2){
    // console.log("dubaohao:差值：",arr1.length,"-",arr2.length,"=",(arr1.length-arr2.length),"arr1=",arr1,"arr2=",arr2);
    //问题:起初我把num也就是arr1.length-arr2.length直接放进了for循环，发现在数组末尾push的0少了一半，因为：这个过程arr2长度发生了变化；
    var num=arr1.length-arr2.length;
    for(var i=0;i<num;i++){
        arr2.push(0);
    }
    // console.log("dubaohao:差值：",arr1.length,"-",arr2.length,"=",(arr1.length-arr2.length),"arr1=",arr1,"arr2=",arr2);
    var flag=0,arr=new Array();
    for(var j=0;j<arr1.length;j++){
        if(arr1[j]+arr2[j]+flag>=10){
            arr[j]=arr1[j]+arr2[j]+flag-10;
            flag=1;
            console.log("flag=",flag);
        }else{
            arr[j]=arr1[j]+arr2[j]+flag;
            flag=0;
        }
        //两数组长度保持一致了，但最高位需要进一
        if((flag==1)&&(j==arr1.length-1)){
            arr[j+1]=1;
            console.log("j+1=",j+1,"arr[j+1=]", arr[j+1]);
        }
        //无进位，不需要补零
        // else{
        //     arr[i+1]=0;
        // }
    }
    // console.log("dubaohao-return",arr);
    return arr;
}