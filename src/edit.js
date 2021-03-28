
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
document.getElementById("text_hpp_doc_editor").value+=c
}
function hpp_replace_mark(c){
document.getElementById("text_hpp_doc_editor").value=c
}

function hpp_backup(data_name,ele){
if(localStorage.getItem("hpp_editor_autobackup")=="1"){
var notyf = new Notyf();
localStorage.setItem(`hpp_${data_name}_backup`,document.getElementById(`text_${ele}`).value);
localStorage.setItem(`hpp_${data_name}_choo_backup`,document.getElementById(`choo`).value);
notyf.success('自动备份成功！')
}
else if(localStorage.getItem("hpp_editor_autobackup")=="2"){
localStorage.setItem(`hpp_${data_name}_backup`,document.getElementById(`text_${ele}`).value);
localStorage.setItem(`hpp_${data_name}_choo_backup`,document.getElementById(`choo`).value);
}else{}
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



function base64Encode(input){
                var rv;
                rv = encodeURIComponent(input);
                rv = unescape(rv);
                rv = window.btoa(rv);
                return rv;
}
function hpp_get_list(){
function getJsonLength(jsonData) {

  var jsonLength = 0;

  for (var item in jsonData) {

    jsonLength++;

  }

  return jsonLength;
}
function del_same(_arr){
        for(n=0;n<_arr.length-1;n++){
            for(i=n+1; i<_arr.length;i++){
                if(_arr[n]==_arr[i]){
                    _arr.splice(i--,1);
                }
            }
        }
        console.log(_arr);
}
let arr_list=[]
let arr_path=""
let hpp_arr_githubdocpath=hpp_githubdocpath.substr(1,hpp_githubdocpath.length-1)
let hpp_arr_draft_githubdocpath=hpp_githubdocdraftpath.substr(1,hpp_githubdocdraftpath.length-1)
var ajax = ajaxObject();
    ajax.open( "post" , '/hpp/admin/api/getlist' , true );
    ajax.setRequestHeader( "Content-Type" , "text/plain" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {
            if( ajax.status == 200 ) {
                for(var i=0;i<getJsonLength(JSON.parse(ajax.responseText));i++){
					try{
						arr_path=JSON.parse(ajax.responseText)[i]["path"]
						arr_path=arr_path.split(hpp_arr_githubdocpath)[1]
						if(arr_path!=undefined)arr_list.push(arr_path)
						
					}catch(e){}
				}
				var ajax2 = ajaxObject();
    ajax2.open( "post" , '/hpp/admin/api/get_draftlist' , true );
    ajax2.setRequestHeader( "Content-Type" , "text/plain" );
    ajax2.onreadystatechange = function () {
        if( ajax2.readyState == 4 ) {
            if( ajax2.status == 200 ) {
                for(var j=0;j<getJsonLength(JSON.parse(ajax2.responseText));j++){
					try{
						arr_path=JSON.parse(ajax2.responseText)[j]["path"]
						arr_path=arr_path.split(hpp_arr_draft_githubdocpath)[1]
						if(arr_path!=undefined)arr_list.push(arr_path)
						
					}catch(e){}
				}
				del_same(arr_list)
				for(var i=0;i<getJsonLength(arr_list);i++){
					document.getElementById("choo").innerHTML+=`<option>${arr_list[i]}</option>`
				}
				$('#choo').editableSelect();
				choo.placeholder = "选择一个文件或直接新增一个文件"
				choo.value=localStorage.getItem(`hpp_hpp_docs_choo_backup`);

            }
            else {
			sweetAlert("糟糕", "拉取文件失败！", "error")
            }
        }
    }
ajax2.send(new Date().getTime());
            }
            else {
			sweetAlert("糟糕", "拉取文件失败！", "error")
            }
        }
    }
ajax.send(new Date().getTime());


}
var input = document.getElementById("input");
input.addEventListener('change', readFile, false);
function copyToClip(content, message) {
    var aux = document.createElement("input"); 
    aux.setAttribute("value", content); 
    document.body.appendChild(aux); 
    aux.select();
    document.execCommand("copy"); 
    document.body.removeChild(aux);
    if (message == null) {
        sweetAlert("复制成功");
    } else{
        eval(message);
    }
}
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
				hpp_add_mark(`![](${ajax.responseText})`)
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
	var ajax = ajaxObject();
    ajax.open( "post" , '/hpp/admin/api/adddoc/'+choo.value , true );
    ajax.setRequestHeader( "Content-Type" , "text/plain" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {
            if( ajax.status == 200 ) {
				swal.close()
                sweetAlert("成功",  "文件已上传", "success");
				localStorage.setItem("hpp_hpp_docs_backup","");
				localStorage.setItem("hpp_hpp_docs_choo_backup","");
            }
		else if( ajax.status == 201 ){
				swal.close()
                sweetAlert("成功",  "文件已新建", "success");
            }
            else {
				swal.close()
                sweetAlert("糟糕", "上传文件失败!", "error");
            }
        }
    }
    ajax.send(base64Encode(document.getElementById("text_hpp_doc_editor").value));
}
function hpp_get_md(){
	swal({title: "\n加载中...",icon: "https://cdn.jsdelivr.net/gh/HexoPlusPlus/CDN@db63c79/loading.gif",text:"\n",button: false,closeModal: false,});
document.getElementById(`div_hpp_doc_editor`).style.display = "none";
document.getElementById(`text_hpp_doc_editor`).style.display = "block";
document.getElementById(`hpp_eye_hpp_doc_editor`).innerHTML=`<i class="fa fa-eye fa-2x"><\/i>`
hpp_replace_mark("# 正在获取"+choo.value+"中")
var ajax = ajaxObject();
    ajax.open( "post" , '/hpp/admin/api/getdoc/'+choo.value , true );
    ajax.setRequestHeader( "Content-Type" , "text/plain" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {
            if( ajax.status == 200 ) {
			swal.close()
            hpp_replace_mark(ajax.responseText)
            }
            else {
			swal.close()
			hpp_get_scaffolds();
            }
        }
    }
	ajax.send(new Date().getTime());
}
function hpp_get_scaffolds(){
swal({title: "\n加载模板中...",icon: "https://cdn.jsdelivr.net/gh/HexoPlusPlus/CDN@db63c79/loading.gif",text:"\n",button: false,closeModal: false,});
document.getElementById(`div_hpp_doc_editor`).style.display = "none";
document.getElementById(`text_hpp_doc_editor`).style.display = "block";
document.getElementById(`hpp_eye_hpp_doc_editor`).innerHTML=`<i class="fa fa-eye fa-2x"><\/i>`
hpp_replace_mark("# 正在获取模板文件中")
var ajax = ajaxObject();
    ajax.open( "post" , '/hpp/admin/api/getscaffolds' , true );
    ajax.setRequestHeader( "Content-Type" , "text/plain" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {
            if( ajax.status == 200 ) {
			swal.close()
            hpp_replace_mark(ajax.responseText)
            }
            else {
			swal.close()
			sweetAlert("糟糕", "拉取模板文件失败，请检查其是否存在", "error");
			hpp_replace_mark("# 拉取模板文件失败，请检查其是否存在")
            }
        }
    }
	ajax.send(new Date().getTime());
}

function hpp_upload_draft(){
	swal({title: "\n上传中...",icon: "https://cdn.jsdelivr.net/gh/HexoPlusPlus/CDN@db63c79/loading.gif",text:"\n",button: false,closeModal: false,});
	var ajax = ajaxObject();
    ajax.open( "post" , '/hpp/admin/api/adddraft/'+choo.value , true );
    ajax.setRequestHeader( "Content-Type" , "text/plain" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {
            if( ajax.status == 200 ) {
				swal.close()
                sweetAlert("成功",  "文件已上传", "success");
				localStorage.setItem("hpp_hpp_docs_backup","");
				localStorage.setItem("hpp_hpp_docs_choo_backup","");
            }
		else if( ajax.status == 201 ){
			swal.close()
                sweetAlert("成功",  "文件已新建", "success");
            }
            else {
				swal.close()
                sweetAlert("糟糕", "上传文件失败!", "error");
            }
        }
    }
    ajax.send(base64Encode(document.getElementById("text_hpp_doc_editor").value));
}
function hpp_get_draft(){
	swal({title: "\n加载中...",icon: "https://cdn.jsdelivr.net/gh/HexoPlusPlus/CDN@db63c79/loading.gif",text:"\n",button: false,closeModal: false,});
document.getElementById(`div_hpp_doc_editor`).style.display = "none";
document.getElementById(`text_hpp_doc_editor`).style.display = "block";
document.getElementById(`hpp_eye_hpp_doc_editor`).innerHTML=`<i class="fa fa-eye fa-2x"><\/i>`
hpp_replace_mark("正在获取"+choo.value+"中")
var ajax = ajaxObject();
    ajax.open( "post" , '/hpp/admin/api/getdraft/'+choo.value , true );
    ajax.setRequestHeader( "Content-Type" , "text/plain" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {
            if( ajax.status == 200 ) {
				swal.close()
            hpp_replace_mark(ajax.responseText)
            }
            else {
			swal.close()
			hpp_get_scaffolds();
            }
        }
    }
	ajax.send(new Date().getTime());
}
function hpp_del_index(){
	swal({title: "\n加载中...",icon: "https://cdn.jsdelivr.net/gh/HexoPlusPlus/CDN@db63c79/loading.gif",text:"\n",button: false,closeModal: false,});
	var ajax = ajaxObject();
    ajax.open( "post" , '/hpp/admin/api/index_del' , true );
    ajax.setRequestHeader( "Content-Type" , "text/plain" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {
            if( ajax.status == 200 ) {
				swal.close()
                sweetAlert("成功",  "索引已清除！", "success");
            }
            else {
				swal.close()
                sweetAlert("糟糕", "索引清除失败！", "error");
            }
        }
    }
    ajax.send(new Date().getTime());
}

hpp_get_list();
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
new hpp_md_editor({
	ele: "hpp_doc_editor",
	data_name: "hpp_docs",
	owo: hpp_OwO,
	backuptime: 60000
})


