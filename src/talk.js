
        var getFileContent = function (fileInput, callback) {
            if (fileInput.files && fileInput.files.length > 0 && fileInput.files[0].size > 0) {
                var file = fileInput.files[0];
                if (window.FileReader) {
                    var reader = new FileReader();
                    reader.onloadend = function (evt) {
                        if (evt.target.readyState == FileReader.DONE) {
                            callback(evt.target.result);
                        }
                    };
                    reader.readAsText(file, "UTF-8");
                }
            }
        };

        document.getElementById('upload_md').onchange = function () {
            var content = document.getElementById('text_hpp_doc_editor');

            getFileContent(this, function (str) {
                content.value = str;
            });
        };
function hpp_md_editor({ele,data_name,owo,backuptime}){
var notyf = new Notyf();

if(ele==undefined){console.log("ERROR:No ID");ele="edit"}
if(data_name==undefined){console.log("ERROR:No data_name");data_name="hpp_editor"}
if(owo==undefined){console.log("ERROR:No owo");owo="https://cdn.jsdelivr.net/gh/ChenYFan/CDN@master/assets/list.json"}
document.getElementById(ele).innerHTML=`
<div class="black2">
	<button onclick="hpp_start_or_stop_backup()" class="btn btn-primary"><i class="fa fa-clock-o fa-2x"><\/i><\/button> 
    <button onclick="$('#input').click();" class="btn btn-primary"><i class="fa fa-photo fa-2x"><\/i><\/button>
    <button onclick="$('#upload_md').click();" class="btn btn-primary"><i class="fa fa-file fa-2x"><\/i><\/button>
    <button onclick="hpp_preview('${ele}','${data_name}')" id="hpp_eye_${ele}" class="btn btn-primary"><i class="fa fa-eye fa-2x"><\/i><\/button>
	
<\/div>   
<textarea style="border:0;border-radius:5px;background-color:#90939920;width: 100%;min-height: 400px;padding: 10px;resize: none;display:block" id="text_${ele}"><\/textarea><div style="border:0;border-radius:5px;background-color:#90939920;max-width: 100%;min-height: 70%;padding: 10px;resize: none;display: none;" id="div_${ele}" class="hpp_pre_div"><\/div><div class="OwO"><\/div>`
document.getElementById(`text_${ele}`).value=localStorage.getItem(`hpp_${data_name}_backup`)
setInterval(`hpp_backup('${data_name}','${ele}')`,backuptime)
var OwO_demo = new OwO({
    container: document.getElementsByClassName('OwO')[0],
    api: hpp_OwO,
    position: 'down',
    maxHeight: '250px'
});
}
function hpp_add_mark(c){
document.getElementById("text_hpp_talk_editor").value+=c
}
function hpp_replace_mark(c){
document.getElementById("text_hpp_talk_editor").value=c
}

function hpp_backup(data_name,ele){
if(localStorage.getItem("hpp_editor_autobackup")=="1"){
var notyf = new Notyf();
localStorage.setItem(`hpp_${data_name}_backup`,document.getElementById(`text_${ele}`).value);
notyf.success('自动备份成功！')
}
else if(localStorage.getItem("hpp_editor_autobackup")=="2"){
localStorage.setItem(`hpp_${data_name}_backup`,document.getElementById(`text_${ele}`).value);
}else{console.log("自动备份功能没开！")}
};
function hpp_start_or_stop_backup(){
var notyf = new Notyf();
if(localStorage.getItem("hpp_editor_autobackup")=="2"){
localStorage.setItem("hpp_editor_autobackup","0");
notyf.error('嘿！你关闭了自动备份！注意数据安全！');
}
else if(localStorage.getItem("hpp_editor_autobackup")=="0"){
localStorage.setItem("hpp_editor_autobackup","1");
notyf.success('自动备份打开成功！自动备份提醒打开成功！'); 
}
else{
localStorage.setItem("hpp_editor_autobackup","2");
notyf.success('自动备份打开成功！自动备份提醒关闭成功！'); 
}
};
function hpp_upload_photo(){}
function hpp_upload_file(){}
function hpp_preview(ele,data_name){
if(document.getElementById(`text_${ele}`).style.display != "none"){
document.getElementById(`div_${ele}`).style.display = "block";
document.getElementById(`text_${ele}`).style.display = "none";
document.getElementById(`hpp_eye_${ele}`).innerHTML=`<i class="fa fa-eye-slash fa-2x"><\/i>`
document.getElementById(`div_${ele}`).innerHTML="正在渲染markdown文本中..."
document.getElementById(`div_${ele}`).innerHTML=marked(document.getElementById(`text_${ele}`).value)
}else{
document.getElementById(`div_${ele}`).style.display = "none";
document.getElementById(`text_${ele}`).style.display = "block";
document.getElementById(`hpp_eye_${ele}`).innerHTML=`<i class="fa fa-eye fa-2x"><\/i>`
}
}

function hpp_del(id){
swal({title: "\n删除中...",icon: "https://cdn.jsdelivr.net/gh/HexoPlusPlus/CDN@db63c79/loading.gif",text:"\n",button: false,closeModal: false,});
var ajax = ajaxObject();
    ajax.open( "post" , "/hpp/admin/api/deltalk" , true );
    ajax.setRequestHeader( "Content-Type" , "text/plain" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {
		if( ajax.status == 200 ) {swal.close();swal("已删除！","", {
  icon: "success",
  buttons: {
    yes: "是"
  },
})
.then((value) => {
  switch (value) {
    default:
	  window.location.reload();
  }
});}}}
	ajax.send(id)
};
function hpp_vi(id){
swal({title: "\n修改中...",icon: "https://cdn.jsdelivr.net/gh/HexoPlusPlus/CDN@db63c79/loading.gif",text:"\n",button: false,closeModal: false,});
var ajax = ajaxObject();
    ajax.open( "post" , "/hpp/admin/api/visibletalk" , true );
    ajax.setRequestHeader( "Content-Type" , "text/plain" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {
		if( ajax.status == 200 ) {swal.close();swal("已修改可见性！","", {
  icon: "success",
  buttons: {
    yes: "是"
  },
})
.then((value) => {
  switch (value) {
    default:
	  window.location.reload();
  }
});}}}
	ajax.send(id)
};
function hpp_loadmore(id,domain,limit){
new hpp_talk({
id:id,
domain: domain,
limit: limit,
start: Number(localStorage.getItem("hpp_start"))
})
};
function hpp_talk({id,domain,limit,start}){

	function getJsonLength(jsonData) {

    var jsonLength = 0;

    for (var item in jsonData) {

        jsonLength++;

    }

    return jsonLength;
}
console.log(id);
document.getElementById(id).innerHTML=`<div class="hpp_talk_loading"><div class="hpp_talk_part"><div style="display: flex;justify-content: center;"><div class="hppt_loader"><div class="hppt_inner one"></div><div class="hppt_inner two"></div><div class="hppt_inner three"></div></div></div></div><p style="text-align:center;">加载 HexoPlusPlus_Talk_管理员模式 中</p></div>`

  back='https://'+domain+'/hpp/admin/api/gethpptalk'
var ajax = ajaxObject();
    ajax.open( "post" , back , true );
    ajax.setRequestHeader( "Content-Type" , "text/plain" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {
            if( ajax.status == 200 ) {
				document.getElementById(id).innerHTML=`<div class="hppt_streamline hppt_b-l hppt_m-l-lg hppt_m-b hppt_padder-v">
   <ol id="hpp_talk_list"><\/ol> 
   <a href="javascript:hpp_loadmore('${id}','${domain}',${limit})" class="hppt_button_nextpage">下一页</a>
  <\/div>`
            console.log("OK");
			console.log(ajax.responseText);
			let res=JSON.parse(ajax.responseText)
			let vi=""
			document.getElementById("hpp_talk_list").innerHTML=``;
			for(var i=0;i<getJsonLength(res);i++){
				if(res[i]==null){localStorage.setItem("hpp_start", 0);break;}
				let q=JSON.parse(res[i]);
				vi=q["visible"]=="False"?`<svg t="1612656293849" class="hppt_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8311" width="20" height="20"><path d="M246.4 258.304l-83.84-83.84 46.464-46.4L309.12 228.288A543.04 543.04 0 0 1 512 190.72c211.968 0 382.592 107.136 512 321.28-58.688 98.56-126.464 174.464-203.456 227.648l109.888 109.888-46.4 46.4-121.408-121.408a517.504 517.504 0 0 1-1.088 0.576l-68.224-68.224 1.216-0.512-117.312-117.312-0.896 0.832L435.2 448.832l0.768-0.96L313.6 325.376a435.968 435.968 0 0 0-1.152 0.576L245.376 258.944l1.088-0.64z m509.248 416.448c60.8-37.76 115.456-91.712 164.48-162.432-108.736-155.136-242.88-229.76-408.128-229.76-46.08 0-89.728 5.76-131.072 17.472l112.32 112.32c6.144-1.28 12.48-1.92 19.008-1.92 54.272 0 98.368 45.696 98.368 102.016 0 5.44-0.448 10.816-1.28 16l146.304 146.304z m-566.4-379.2L253.44 359.808c-54.592 37.12-104.32 87.808-149.632 152.512 107.2 154.688 241.28 229.12 408.128 229.12 38.72 0 75.712-3.968 111.04-12.096l73.6 73.6A553.984 553.984 0 0 1 512 833.28c-213.888 0-384.512-107.136-512-321.28 55.488-91.84 118.592-163.968 189.248-216.448zM508.032 614.4L414.144 520.448c3.84 51.2 44.096 91.776 93.888 93.952z" fill="#1296db" p-id="8312"></path></svg>`:`<svg t="1612656197741" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7951" width="20" height="20"><path d="M512 283.456c-165.248 0-299.392 74.304-408.128 228.864 107.2 154.112 241.28 228.224 408.128 228.224 166.848 0 300.928-74.112 408.128-228.224C811.392 357.76 677.248 283.52 512 283.52zM512 832c-213.888 0-384.512-106.688-512-320 129.408-213.312 300.032-320 512-320 211.968 0 382.592 106.688 512 320-127.488 213.312-298.112 320-512 320z m0-137.152a182.848 182.848 0 1 0 0-365.696 182.848 182.848 0 0 0 0 365.696zM512 576a64 64 0 1 1 0-128 64 64 0 0 1 0 128z" fill="#1296db" p-id="7952"></path></svg>`
			let mark_content=marked(q["content"]);
document.getElementById("hpp_talk_list").innerHTML+=`<div id="${q["id"]}" class="hppt_comment-body hppt_comment-parent hppt_comment-odd hppt_comment-by-user"> <div id="item">
     <a class="hppt_pull-left hppt_thumb-sm hppt_avatar hppt_m-l-n-md"> <img nogallery="" src="${q["avatar"]}" class="hppt_img-40px hppt_photo hppt_img-square hppt_normal-shadow"> <\/a> 
     <div class="hppt_time-machine hppt_m-l-lg hppt_panel hppt_box-shadow-wrap-normal"> 
      <div class="hppt_panel-heading hppt_pos-rlt hppt_b-b hppt_b-light">
       <span class="hppt_text-muted hppt_m-l-sm hppt_pull-right" datetime="${q["time"]}"><strong class="talk_mobile_hide">  ${q["name"]}·<\/strong>${q["time"]}<\/span> 
      <\/div> 
      <div class="hppt_panel-body hppt_comment-content-true"> 
       <p>${mark_content}<\/p> 
      <\/div> 
      <div class="hppt_panel-footer"> 
       <div class="hppt_say_footer">
<a href="javascript:hpp_del(${q["id"]});"><svg t="1611833138243" class="hppt_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2021" width="20" height="20"><path d="M832.192 296.96c0.768 10.112 1.28 20.288 1.28 30.656l0 506.112c0 83.264-41.664 158.208-130.432 158.208L311.552 991.936c-88.704 0-130.368-74.944-130.368-158.208L181.184 327.616c0-10.304 0.768-20.544 1.984-30.656l-67.2 0L115.968 170.432l195.648-0.128L311.616 145.92c0-56.32 53.44-102.08 119.36-102.08l152.832 0c65.92 0 119.232 45.76 119.232 102.08l0 23.552 195.712 0.832L898.752 296.96 832.192 296.96 832.192 296.96zM637.76 145.92c0-21.056-24.64-38.784-54.016-38.784L430.912 107.136c-29.312 0-54.08 17.792-54.08 38.784l0 24.32 260.928 0L637.76 145.92 637.76 145.92zM768.192 327.616c0-10.56-0.704-20.8-2.112-30.656L248.512 296.96C247.168 306.816 246.4 317.12 246.4 327.616l0 506.112c0 48.512 12.48 94.976 65.152 94.976l391.488 0c52.864 0 65.216-46.528 65.216-94.976L768.256 327.616 768.192 327.616zM311.552 865.664 311.552 359.936l65.28 0 0 505.728L311.552 865.664 311.552 865.664zM474.688 865.664 474.688 359.936l65.152 0 0 505.728L474.688 865.664 474.688 865.664zM637.76 865.664 637.76 359.936l65.28 0 0 505.728L637.76 865.664 637.76 865.664z" p-id="2022" fill="#1296db"><\/path><\/svg><\/a> | <a href="javascript:hpp_vi(${q["id"]});">${vi}</a>
	   <\/div> 
      <\/div> 
     <\/div> 
    <\/div>`
	
}
            }
            else {
            console.log("ERROR")
            }
        }
    }
	let body={
	limit:limit,
	start:start
	}
	start+=limit;
	localStorage.setItem("hpp_start", start);
    ajax.send(JSON.stringify(body));
};

localStorage.setItem("hpp_start", 0);
function base64Encode(input){
                var rv;
                rv = encodeURIComponent(input);
                rv = unescape(rv);
                rv = window.btoa(rv);
                return rv;
}

var input = document.getElementById("input");
input.addEventListener('change', readFile, false);

function readFile() {
	swal({title: "\n上传中...",icon: "https://cdn.jsdelivr.net/gh/HexoPlusPlus/CDN@db63c79/loading.gif",text:"\n",button: false,closeModal: false,});
    var file = this.files[0];
    var f_name = file["name"].substring(file["name"].lastIndexOf(".")+1);
    var reader = new FileReader(); 
    reader.readAsDataURL(file);
    reader.onloadstart = function (e){ 
    }
    reader.onprogress = function(e){
    }
    reader.onload = function (e) {
	hpp_uploadimage(this.result.substring(this.result.indexOf(',')+1),f_name);
    }
    reader.onloadend = function(e){
    }
};
function hpp_uploadimage(image,f_name){
	var ajax = ajaxObject();
    ajax.open( "post" , '/hpp/admin/api/addimage/'+f_name , true );
    ajax.setRequestHeader( "Content-Type" , "text/plain" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {
            if( ajax.status == 200 ) {
				swal.close()
                sweetAlert("成功",  "图片已更新", "success");
            }
		else if( ajax.status == 201 ){
			swal.close()
			hpp_add_mark(`![](${ajax.responseText})`)
		    sweetAlert('成功','图片已上传','success')
            }
            else {
				swal.close()
			sweetAlert("糟糕", "上传图片失败!", "error")
            }
        }
    }
    ajax.send(image);
};
function hpp_upload_md(){
swal({title: "\n上传中...",icon: "https://cdn.jsdelivr.net/gh/HexoPlusPlus/CDN@db63c79/loading.gif",text:"\n",button: false,closeModal: false,});
let con=document.getElementById("text_hpp_talk_editor").value;
let date = new Date();
let time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +date.getHours()+":"+date.getMinutes();
let body={
"time": time,
"content": con,
"avatar": avatar,
"name": username
}
body=JSON.stringify(body)
	var ajax = ajaxObject();
    ajax.open( "post" , '/hpp/admin/api/addtalk' , true );
    ajax.setRequestHeader( "Content-Type" , "text/plain" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {
            if( ajax.status == 200 ) {
				swal.close()
				localStorage.setItem("hpp_talk_backup","");
                swal("成功上传说说","", {
  icon: "success",
  buttons: {
    yes: "是"
  },
})
.then((value) => {
  switch (value) {
    default:
	  window.location.reload();
  }
});
            }
            else {
				swal.close()
                sweetAlert("糟糕", "上传说说失败!", "error");
		mdeditor.disabled=false
            }
        }
}
ajax.send(body);
}
//我废了，editormd顺序有问题
//初始化函数
new hpp_talk({
id:"hpp_talk",
domain: window.location.host,
limit: 10,
start: 0
});
new hpp_md_editor({
	ele: "hpp_talk_editor",
	data_name: "talk",
	owo: hpp_OwO,
	backuptime: 60000
})
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
    return hljs.highlightAuto(code).value;
  }
});
