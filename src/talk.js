function hpp_del(id){

var ajax = ajaxObject();
    ajax.open( "post" , "/hpp/admin/api/deltalk" , true );
    ajax.setRequestHeader( "Content-Type" , "text/plain" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {
		if( ajax.status == 200 ) {swal("已删除！", {
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
function getCookie(name)
{
var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
if(arr=document.cookie.match(reg))
return unescape(arr[2]);
else
return null;
};
function hpp_loadmore(id,domain,limit){
new hpp_talk({
id:id,
domain: domain,
limit: limit,
start: Number(getCookie("hpp_start"))
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
document.getElementById(id).innerHTML=`<div class="hpp_talk_load">
  <div><\/div>
  <div><\/div>
  <div><\/div>
  <div><\/div>
<\/div>`

  back='https://'+domain+'/hpp/api/gethpptalk'
var ajax = ajaxObject();
    ajax.open( "post" , back , true );
    ajax.setRequestHeader( "Content-Type" , "text/plain" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {
            if( ajax.status == 200 ) {
				document.getElementById(id).innerHTML=`<div class="streamline b-l m-l-lg m-b padder-v">
   <ol id="hpp_talk_list"><\/ol> 
   <button onclick="hpp_loadmore('${id}','${domain}',${limit})" style="	width: 270px;
	height: 40px;
	border-width: 0px; 
	border-radius: 3px; 
	background: #90939920; 
	cursor: pointer; 
	outline: none;
	font-family: Microsoft YaHei;
	font-size: 17px; 
	margin: .2rem auto 0;
    display: block;">下一页</button>
  <\/div>`
            console.log("OK");
			console.log(ajax.responseText);
			let res=JSON.parse(ajax.responseText)
			document.getElementById("hpp_talk_list").innerHTML=``;
			for(var i=0;i<getJsonLength(res);i++){
				if(res[i]==null){document.cookie="hpp_start=0";break;}
				let q=JSON.parse(res[i]);
			let mark_content=marked(q["content"]);
document.getElementById("hpp_talk_list").innerHTML+=`<div id="${q["id"]}" class="comment-body comment-parent comment-odd comment-by-user"> <div id="item">
     <a class="pull-left thumb-sm avatar m-l-n-md"> <img nogallery="" src="${q["avatar"]}" class="img-40px photo img-square normal-shadow"> <\/a> 
     <div class="time-machine m-l-lg panel box-shadow-wrap-normal"> 
      <div class="panel-heading pos-rlt b-b b-light">
       <span class="text-muted m-l-sm pull-right" datetime="${q["time"]}"><strong class="talk_mobile_hide">  ${q["name"]}·<\/strong>${q["time"]}<\/span> 
      <\/div> 
      <div class="panel-body comment-content-true"> 
       <p>${mark_content}<\/p> 
      <\/div> 
      <div class="panel-footer"> 
       <div class="say_footer">
<a href="javascript:hpp_del(${q["id"]});"><svg t="1611833138243" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2021" width="20" height="20"><path d="M832.192 296.96c0.768 10.112 1.28 20.288 1.28 30.656l0 506.112c0 83.264-41.664 158.208-130.432 158.208L311.552 991.936c-88.704 0-130.368-74.944-130.368-158.208L181.184 327.616c0-10.304 0.768-20.544 1.984-30.656l-67.2 0L115.968 170.432l195.648-0.128L311.616 145.92c0-56.32 53.44-102.08 119.36-102.08l152.832 0c65.92 0 119.232 45.76 119.232 102.08l0 23.552 195.712 0.832L898.752 296.96 832.192 296.96 832.192 296.96zM637.76 145.92c0-21.056-24.64-38.784-54.016-38.784L430.912 107.136c-29.312 0-54.08 17.792-54.08 38.784l0 24.32 260.928 0L637.76 145.92 637.76 145.92zM768.192 327.616c0-10.56-0.704-20.8-2.112-30.656L248.512 296.96C247.168 306.816 246.4 317.12 246.4 327.616l0 506.112c0 48.512 12.48 94.976 65.152 94.976l391.488 0c52.864 0 65.216-46.528 65.216-94.976L768.256 327.616 768.192 327.616zM311.552 865.664 311.552 359.936l65.28 0 0 505.728L311.552 865.664 311.552 865.664zM474.688 865.664 474.688 359.936l65.152 0 0 505.728L474.688 865.664 474.688 865.664zM637.76 865.664 637.76 359.936l65.28 0 0 505.728L637.76 865.664 637.76 865.664z" p-id="2022" fill="#1296db"><\/path><\/svg><\/a>	   
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
	document.cookie="hpp_start="+start;
    ajax.send(JSON.stringify(body));
};
(() => {
    class OwO {
        constructor(option) {
            const defaultOption = {
                logo: 'OwO表情',
                container: document.getElementsByClassName('OwO')[0],
                position: 'down',
                width: '100%',
                maxHeight: '250px',
                api: 'https://api.anotherhome.net/OwO/OwO.json'
            };
            for (let defaultKey in defaultOption) {
                if (defaultOption.hasOwnProperty(defaultKey) && !option.hasOwnProperty(defaultKey)) {
                    option[defaultKey] = defaultOption[defaultKey];
                }
            }
            this.container = option.container;
            if (option.position === 'up') {
                this.container.classList.add('OwO-up');
            }

            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                        this.odata = JSON.parse(xhr.responseText);
                        this.init(option);
                    }
                    else {
                        console.log('OwO data request was unsuccessful: ' + xhr.status);
                    }
                }
            };
            xhr.open('get', option.api, true);
            xhr.send(null);
        }

        init(option) {
            this.packages = Object.keys(this.odata);

            // fill in HTML
            let html = `
            <div class="OwO-logo"><span>${option.logo}<\/span><\/div>
            <div class="OwO-body" style="width: ${option.width}">`;
            
            for (let i = 0; i < this.packages.length; i++) {

                html += `
                <ul class="OwO-items OwO-items-${this.odata[this.packages[i]].type}" style="max-height: ${parseInt(option.maxHeight) - 53 + 'px'};">`;

                let opackage = this.odata[this.packages[i]].container;
                for (let i = 0; i < opackage.length; i++) {

                    html += `
                    <li class="OwO-item" title="${opackage[i].text}">${opackage[i].icon}<\/li>`;

                }

                html += `
                <\/ul>`;
            }
            
            html += `
                <div class="OwO-bar">
                    <ul class="OwO-packages">`;

                    for (let i = 0; i < this.packages.length; i++) {

                        html += `
                        <li><span>${this.packages[i]}<\/span><\/li>`

                    }

            html += `
                    <\/ul>
                <\/div>
            <\/div>
            `;
            this.container.innerHTML = html;

            // bind event
            this.logo = this.container.getElementsByClassName('OwO-logo')[0];
            this.logo.addEventListener('click', () => {
                this.toggle();
            });

            this.container.getElementsByClassName('OwO-body')[0].addEventListener('click', (e)=> {
			let target = null;
                if (e.target.classList.contains('OwO-item')) {
                    target = e.target;
                }
                else if (e.target.parentNode.classList.contains('OwO-item')) {
                    target = e.target.parentNode;
                }
                if (target) {
                    hpp_add_mark(target.innerHTML)
                }
            });

            this.packagesEle = this.container.getElementsByClassName('OwO-packages')[0];
            for (let i = 0; i < this.packagesEle.children.length; i++) {
                ((index) =>{
                    this.packagesEle.children[i].addEventListener('click', () => {
                        this.tab(index);
                    });
                })(i);
            }

            this.tab(0);
        }

        toggle() {
            if (this.container.classList.contains('OwO-open')) {
                this.container.classList.remove('OwO-open');
            }
            else {
                this.container.classList.add('OwO-open');
            }
        }

        tab(index) {
            const itemsShow = this.container.getElementsByClassName('OwO-items-show')[0];
            if (itemsShow) {
                itemsShow.classList.remove('OwO-items-show');
            }
            this.container.getElementsByClassName('OwO-items')[index].classList.add('OwO-items-show');

            const packageActive = this.container.getElementsByClassName('OwO-package-active')[0];
            if (packageActive) {
                packageActive.classList.remove('OwO-package-active');
            }
            this.packagesEle.getElementsByTagName('li')[index].classList.add('OwO-package-active');
        }
    }
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = OwO;
    }
    else {
        window.OwO = OwO;
    }
})();
var OwO_demo = new OwO({
    logo: 'OωO表情',
    container: document.getElementsByClassName('OwO')[0],
    api: hpp_OwO,
    position: 'down',
    maxHeight: '250px'
});
document.cookie="hpp_start=";
function base64Encode(input){
                var rv;
                rv = encodeURIComponent(input);
                rv = unescape(rv);
                rv = window.btoa(rv);
                return rv;
}
function hpp_replace_mark(content,add){
if(content===undefined){content=""}
$(function() {
        var editor = editormd("md-editor", {
            width  : "100%",
			markdown:content,
			placeholder:"",
            toolbarIcons : function() {
            return ["undo", "redo", "|", "preview", "watch", "|", "upimage"]
			},
			toolbarIconsClass : {
            upimage : "fa-image" 
			},
			toolbarHandlers : {
            upimage : function() {$("#input").click();}
			},
			atLink    : false,
			emailLink : false, 
            height : 440,
            path   : "https://cdn.jsdelivr.net/npm/editor.md/lib/",
            htmlDecode : true,
			saveHTMLToTextarea : true
        });
    });
}
function hpp_add_mark(content){
if(content===undefined){content=""}
$(function() {
        var editor = editormd("md-editor", {
            width  : "100%",
			markdown:document.getElementById("doc_editor").value+'\n'+content,
			placeholder:"",
            toolbarIcons : function() {
            return ["undo", "redo", "|", "preview", "watch", "|", "upimage"]
			},
			toolbarIconsClass : {
            upimage : "fa-image" 
			},
			toolbarHandlers : {
            upimage : function() {$("#input").click();}
			},
			atLink    : false,
			emailLink : false,
            height : 440,
            path   : "https://cdn.jsdelivr.net/npm/editor.md/lib/",
            htmlDecode : true,
			saveHTMLToTextarea : true
        });
    });
}

var input = document.getElementById("input");
input.addEventListener('change', readFile, false);

function readFile() {
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
                sweetAlert("成功",  "图片已更新", "success");
            }
		else if( ajax.status == 201 ){
			hpp_add_mark(`![](${ajax.responseText})`)
		    sweetAlert('成功','图片已上传','success')
            }
            else {
			sweetAlert("糟糕", "上传图片失败!", "error")
            }
        }
    }
    ajax.send(image);
};
function hpp_upload_md(){

let con=document.getElementById("doc_editor").value;
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
                swal("成功上传说说", {
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
                sweetAlert("糟糕", "上传说说失败!", "error");
		mdeditor.disabled=false
            }
        }
}
ajax.send(body);
}
//初始化函数
new hpp_talk({
id:"hpp_talk",
domain: window.location.host,
limit: 10,
start: 0
});
hpp_replace_mark();
