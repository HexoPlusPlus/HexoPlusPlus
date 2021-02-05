
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
            let icon=""
			let src=""
            for (let i = 0; i < this.packages.length; i++) {

                html += `
                <ul class="OwO-items OwO-items-${this.odata[this.packages[i]].type}" style="max-height: ${parseInt(option.maxHeight) - 53 + 'px'};">`;

                let opackage = this.odata[this.packages[i]].container;
                for (let j = 0; j < opackage.length; j++) {
					
					
					var regex = /src=[\'\"]?([^\'\"]*)[\'\"]?/;
					src = regex.exec(opackage[j].icon);
					try{
					src=src[1]
					//console.log(src)
					icon = `<img src="" data-src="${src}" class="hpp_emo_${this.packages[i]}">`
					}catch(e){/*console.log(e);*/icon=opackage[j].icon}
                    html += `
                    <li class="OwO-item" title="${opackage[j].text}">${icon}<\/li>`;

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
			let r_src=""
            this.container.getElementsByClassName('OwO-body')[0].addEventListener('click', (e)=> {
			let target = null;
                if (e.target.classList.contains('OwO-item')) {
                    target = e.target;
                }
                else if (e.target.parentNode.classList.contains('OwO-item')) {
                    target = e.target.parentNode;
                }
                if (target) {
                    
					var regex = /src=[\'\"]?([^\'\"]*)[\'\"]?/;
					r_src = regex.exec(target.innerHTML);
					try{
					r_src=r_src[1]
					icon = `![](${r_src})`
					}catch(e){icon=target.innerHTML;console.log(icon+"ERROR")}
					hpp_add_mark(icon)
					
					
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
			let inn=""
            const itemsShow = this.container.getElementsByClassName('OwO-items-show')[0];
            if (itemsShow) {
                itemsShow.classList.remove('OwO-items-show');
            }
            this.container.getElementsByClassName('OwO-items')[index].classList.add('OwO-items-show');

            const packageActive = this.container.getElementsByClassName('OwO-package-active')[0];
			$(`.hpp_emo_${this.packages[index]}`).Lazy();
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
function hpp_get_list(){
var ctJson = "/hpp/admin/api/getlist"
 $.getJSON(ctJson, function (data) {
            $.each(data, function (index, value) {
                $("#choo").append(`
				  <option>${value.name}<\/option>
                `);
            });
			console.log('get!')
			 $('#choo').editableSelect();
		choo.value = "选择一个文件或直接新增一个文件"
        });
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
	var ajax = ajaxObject();
    ajax.open( "post" , '/hpp/admin/api/adddoc/'+choo.value , true );
    ajax.setRequestHeader( "Content-Type" , "text/plain" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {
            if( ajax.status == 200 ) {
                sweetAlert("成功",  "文件已上传", "success");
            }
		else if( ajax.status == 201 ){
                sweetAlert("成功",  "文件已新建", "success");
            }
            else {
                sweetAlert("糟糕", "上传文件失败!", "error");
            }
        }
    }
    ajax.send(base64Encode(document.getElementById("doc_editor").value));
}
function hpp_get_md(){
hpp_replace_mark("正在获取"+choo.value+"中")
var ajax = ajaxObject();
    ajax.open( "get" , '/hpp/admin/api/getdoc/'+choo.value , true );
    ajax.setRequestHeader( "Content-Type" , "text/plain" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {
            if( ajax.status == 200 ) {
            hpp_replace_mark(ajax.responseText)
            }
            else {
			hpp_replace_mark("# 获取文件失败！")
            }
        }
    }
	ajax.send();
}
//初始化函数
hpp_get_list();
hpp_replace_mark();
