# JavaScript文件上传

## 1.form-data方式

```
<form id="upload" enctype="multipart/form-data" method="post"> 
	<input type="file" name="file" id="pic"/> 
	<input type="button" value="提交" onclick="uploadPic();"/> 
	<span class="showUrl"></span> 
	<img src="" class="showPic" alt=""> 
</form>
```

```
function uploadPic() { 
  var form = document.getElementById('upload), 
    formData = new FormData(form); 
  $.ajax({ 
   url:"https://sscpre.boe.com/v1/medical-console/medical/file/upload", 
   type:"post", 
   data:formData, 
   processData:false, 
   contentType:false`, 
   success:function(res){ 
    if(res){ 
     alert("上传成功！"); 
    } 
    console.log(res); 
    $("#pic").val(""); 
    $(".showUrl").html(res); 
    $(".showPic").attr("src",res); 
   }, 
   error:function(err){ 
    alert("网络连接失败,稍后重试",err); 
   } 
  }) 
 }
```

## 2.js原生FileReader

```
var fileInput = document.querySelector('#file-input');
fileInput.onchange = function(){
 var filereader = new FileReader();
 var fileType = this.files[0].type;
 filereader.onload = function(){
   if(/^image\[jpeg|png|gif]/.test(fileType)){
     console.log(this.result);
   }
 }
 console.log(this.files[0]);
 filereader.readAsDataURL(this.files[0]);
}
console.dir(fileInput);
```

从打印结果来看，能清楚的知道上传的文件信息是在**input type = ‘file'dom对象中的files[0]**中。 
**filereader.readAsDataURL**是将flies[0]里的信息转换成base64方式读取。 
**filereader**的读取为以下格式：

- readAsDataURL（this.files[0]） base64位读取
- readAsBinaryString（this.files[0]） 以二进制方式读取读取结果是UTF-8形式（被废弃）
- readAsArrayBuffer(this.flies[0]) 以二进制原始方法读取，读取结果可转换成整数的数组

```
var files = document.getElementById('pic').files; 
//files是文件选择框选择的文件对象数组
 
if(files.length == 0) return; 
 
var form = new FormData(), 
  url = 'http://.......', //服务器上传地址
  file = files[0];
form.append('file', file);
 
var xhr = new XMLHttpRequest();
xhr.open("post", url, true);
 
//上传进度事件
xhr.upload.addEventListener("progress", function(result) {
  if (result.lengthComputable) {
    //上传进度
    var percent = (result.loaded / result.total * 100).toFixed(2); 
  }
}, false);
 
xhr.addEventListener("readystatechange", function() {
  var result = xhr;
  if (result.status != 200) { //error
    console.log('上传失败', result.status, result.statusText, result.response);
  } 
  else if (result.readyState == 4) { //finished
    console.log('上传成功', result);
  }
});
xhr.send(form); //开始上传
```

## 3.js XMLHttpRequest 以及上传进度实现方法

```
//图片上传
    var xhr;
    //上传文件方法
    function UpladFile() {
      var fileObj = document.getElementById("file").files[0]; // js 获取文件对象
      var url = "http://localhost:8080" + "/api/attachment/upload"; // 接收上传文件的后台地址
  
      var form = new FormData(); // FormData 对象
      form.append("file", fileObj); // 文件对象
  
      xhr = new XMLHttpRequest(); // XMLHttpRequest 对象
      xhr.open("post", url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
      xhr.onload = uploadComplete; //请求完成
      xhr.onerror = uploadFailed; //请求失败
  
      xhr.upload.onprogress = progressFunction;//【上传进度调用方法实现】
      xhr.upload.onloadstart = function(){//上传开始执行方法
        ot = new Date().getTime();  //设置上传开始时间
        oloaded = 0;//设置上传开始时，以上传的文件大小为0
      };
  
      xhr.send(form); //开始上传，发送form数据
    }
  
    //上传成功响应
    function uploadComplete(evt) {
      //服务断接收完文件返回的结果
  
      var data = JSON.parse(evt.target.responseText);
      if(data.success) {
        alert("上传成功！");
      }else{
        alert("上传失败！");
      }
  
    }
    //上传失败
    function uploadFailed(evt) {
      alert("上传失败！");
    }
    //取消上传
    function cancleUploadFile(){
      xhr.abort();
    }
  
  
    //上传进度实现方法，上传过程中会频繁调用该方法
    function progressFunction(evt) {
      var progressBar = document.getElementById("progressBar");
      var percentageDiv = document.getElementById("percentage");
      // event.total是需要传输的总字节，event.loaded是已经传输的字节。如果event.lengthComputable不为真，则event.total等于0
      if (evt.lengthComputable) {//
        progressBar.max = evt.total;
        progressBar.value = evt.loaded;
        percentageDiv.innerHTML = Math.round(evt.loaded / evt.total * 100) + "%";
      }
      var time = document.getElementById("time");
      var nt = new Date().getTime();//获取当前时间
      var pertime = (nt-ot)/1000; //计算出上次调用该方法时到现在的时间差，单位为s
      ot = new Date().getTime(); //重新赋值时间，用于下次计算
      var perload = evt.loaded - oloaded; //计算该分段上传的文件大小，单位b
      oloaded = evt.loaded;//重新赋值已上传文件大小，用以下次计算
      //上传速度计算
      var speed = perload/pertime;//单位b/s
      var bspeed = speed;
      var units = 'b/s';//单位名称
      if(speed/1024>1){
        speed = speed/1024;
        units = 'k/s';
      }
      if(speed/1024>1){
        speed = speed/1024;
        units = 'M/s';
      }
      speed = speed.toFixed(1);
      //剩余时间
      var resttime = ((evt.total-evt.loaded)/bspeed).toFixed(1);
      time.innerHTML = '，速度：'+speed+units+'，剩余时间：'+resttime+'s';
      if(bspeed==0) time.innerHTML = '上传已取消';
    }
```

## 4.vue 和文件上传

``` 
<div class="rz-picter">
             <img :src="avatar" class="img-avatar">
  <input type="file" name="avatar" id="uppic" accept="image/gif,image/jpeg,image/jpg,image/png" @change="changeImage($event)" ref="avatarInput" class="uppic">
 </div>
 
 changeImage(e) {
        var file = e.target.files[0]
        var reader = new FileReader()
        var that = this
        reader.readAsDataURL(file)
        reader.onload = function(e) {
          that.avatar = this.result
        }
      },
```

