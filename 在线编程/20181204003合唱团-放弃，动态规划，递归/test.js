var n ="3"
var arr= "7 4 7";
var kd="2 50";
console.log("dubahao")
console.log(dubaohao(n,arr,kd));

function dubaohao(n,arr,kd){
    var arr = arr.split(" ");
    var kd  = kd.split(" ");
    var k = kd[0];
    var d = kd[1];
    

        var result1=maxmul(arr,n,d);
    return result1;
}
function maxmul(n,arr,d,k){
    for(var i =0;i<k;i++){
        result=result*maxmul(n,arr,d);
    }
    if(i==k-1){return result;}
}
function getkdata()
