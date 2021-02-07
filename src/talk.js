
    window.onload = function() {
        /**
         * 上传函数
         * @param fileInput DOM对象
         * @param callback 回调函数
         */
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
                    reader.readAsText(file, 'gbk');
                }
            }
        };

        document.getElementById('upload_md').onchange = function () {
            var content = document.getElementById('text_hpp_talk_editor');

            getFileContent(this, function (str) {
                content.value = str;
            });
        };
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
document.getElementById(`div_${ele}`).innerHTML=marked(document.getElementById(`text_${ele}`).value)
document.getElementById(`div_${ele}`).style.display = "block";
document.getElementById(`text_${ele}`).style.display = "none";
document.getElementById(`hpp_eye_${ele}`).innerHTML=`<i class="fa fa-eye-slash fa-2x"><\/i>`
}else{
document.getElementById(`div_${ele}`).style.display = "none";
document.getElementById(`text_${ele}`).style.display = "block";
document.getElementById(`hpp_eye_${ele}`).innerHTML=`<i class="fa fa-eye fa-2x"><\/i>`
}
}



(() => {
    class OwO {
        constructor(option) {
            const defaultOption = {
				logo: `<svg t="1612669041308" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2519" width="32" height="32"><path d="M512 512m-511.982387 0a511.982387 511.982387 0 1 0 1023.964774 0 511.982387 511.982387 0 1 0-1023.964774 0Z" fill="#F9C228" p-id="2520"></path><path d="M917.619539 199.639491C761.536154-3.082215 483.485105-56.554248 265.951152 62.930031a531.620502 531.620502 0 0 0-166.598142 387.161472c0 294.430822 238.686756 533.099966 533.099966 533.099966a535.424837 535.424837 0 0 0 101.219951-9.598899 514.289646 514.289646 0 0 0 90.705195-55.973031C1048.393533 745.138768 1090.223598 423.672515 917.619539 199.639491z" fill="#FCDC22" p-id="2521"></path><path d="M972.042656 550.272308c-111.329618 114.904988-252.600757 198.670795-415.482628 260.033299 0 0 55.867355 156.664603 207.829377 101.53698 250.628139-90.846096 207.653251-361.570279 207.653251-361.570279z" fill="#FC9B88" p-id="2522"></path><path d="M522.690884 570.08655a80.119986 64.145304 90 1 0 128.290609 0 80.119986 64.145304 90 1 0-128.290609 0Z" fill="#282828" p-id="2523"></path><path d="M860.519298 429.449467a80.119986 54.881046 90 1 0 109.762092 0 80.119986 54.881046 90 1 0-109.762092 0Z" fill="#282828" p-id="2524"></path><path d="M953.813553 724.584795a261.319023 261.319023 0 0 0-116.014585-59.988717C754.121225 723.616099 659.699759 771.434469 556.560028 810.305607c0 0 55.867355 156.664603 207.829377 101.53698 110.959752-40.209701 164.361335-115.64472 189.424148-187.257792z" fill="#EA0F1A" p-id="2525"></path></svg>`,
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



!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).marked=t()}(this,function(){"use strict";function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function p(e,t){var n;if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator])return(n=e[Symbol.iterator]()).next.bind(n);if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return s(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(n="Object"===n&&e.constructor?e.constructor.name:n)||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0;return function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function n(e){return c[e]}var e,t=(function(t){function e(){return{baseUrl:null,breaks:!1,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartLists:!1,smartypants:!1,tokenizer:null,walkTokens:null,xhtml:!1}}t.exports={defaults:e(),getDefaults:e,changeDefaults:function(e){t.exports.defaults=e}}}(e={exports:{}}),e.exports),r=/[&<>"']/,l=/[&<>"']/g,a=/[<>"']|&(?!#?\w+;)/,o=/[<>"']|&(?!#?\w+;)/g,c={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};var u=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;function h(e){return e.replace(u,function(e,t){return"colon"===(t=t.toLowerCase())?":":"#"===t.charAt(0)?"x"===t.charAt(1)?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""})}var g=/(^|[^\[])\^/g;var f=/[^\w:]/g,d=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;var k={},b=/^[^:]+:\/*[^/]*$/,m=/^([^:]+:)[\s\S]*$/,x=/^([^:]+:\/*[^/]*)[\s\S]*$/;function w(e,t){k[" "+e]||(b.test(e)?k[" "+e]=e+"/":k[" "+e]=v(e,"/",!0));var n=-1===(e=k[" "+e]).indexOf(":");return"//"===t.substring(0,2)?n?t:e.replace(m,"$1")+t:"/"===t.charAt(0)?n?t:e.replace(x,"$1")+t:e+t}function v(e,t,n){var r=e.length;if(0===r)return"";for(var i=0;i<r;){var s=e.charAt(r-i-1);if(s!==t||n){if(s===t||!n)break;i++}else i++}return e.substr(0,r-i)}var _=function(e,t){if(t){if(r.test(e))return e.replace(l,n)}else if(a.test(e))return e.replace(o,n);return e},y=h,z=function(n,e){n=n.source||n,e=e||"";var r={replace:function(e,t){return t=(t=t.source||t).replace(g,"$1"),n=n.replace(e,t),r},getRegex:function(){return new RegExp(n,e)}};return r},$=function(e,t,n){if(e){var r;try{r=decodeURIComponent(h(n)).replace(f,"").toLowerCase()}catch(e){return null}if(0===r.indexOf("javascript:")||0===r.indexOf("vbscript:")||0===r.indexOf("data:"))return null}t&&!d.test(n)&&(n=w(t,n));try{n=encodeURI(n).replace(/%25/g,"%")}catch(e){return null}return n},S={exec:function(){}},A=function(e){for(var t,n,r=1;r<arguments.length;r++)for(n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e},R=function(e,t){var n=e.replace(/\|/g,function(e,t,n){for(var r=!1,i=t;0<=--i&&"\\"===n[i];)r=!r;return r?"|":" |"}).split(/ \|/),r=0;if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;r<n.length;r++)n[r]=n[r].trim().replace(/\\\|/g,"|");return n},T=function(e,t){if(-1===e.indexOf(t[1]))return-1;for(var n=e.length,r=0,i=0;i<n;i++)if("\\"===e[i])i++;else if(e[i]===t[0])r++;else if(e[i]===t[1]&&--r<0)return i;return-1},I=function(e){e&&e.sanitize&&!e.silent&&console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options")},Z=function(e,t){if(t<1)return"";for(var n="";1<t;)1&t&&(n+=e),t>>=1,e+=e;return n+e},q=t.defaults,O=v,C=R,U=_,j=T;function E(e,t,n){var r=t.href,i=t.title?U(t.title):null,t=e[1].replace(/\\([\[\]])/g,"$1");return"!"!==e[0].charAt(0)?{type:"link",raw:n,href:r,title:i,text:t}:{type:"image",raw:n,href:r,title:i,text:U(t)}}var P=function(){function e(e){this.options=e||q}var t=e.prototype;return t.space=function(e){e=this.rules.block.newline.exec(e);if(e)return 1<e[0].length?{type:"space",raw:e[0]}:{raw:"\n"}},t.code=function(e,t){e=this.rules.block.code.exec(e);if(e){t=t[t.length-1];if(t&&"paragraph"===t.type)return{raw:e[0],text:e[0].trimRight()};t=e[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?t:O(t,"\n")}}},t.fences=function(e){var t=this.rules.block.fences.exec(e);if(t){var n=t[0],e=function(e,t){if(null===(e=e.match(/^(\s+)(?:```)/)))return t;var n=e[1];return t.split("\n").map(function(e){var t=e.match(/^\s+/);return null!==t&&t[0].length>=n.length?e.slice(n.length):e}).join("\n")}(n,t[3]||"");return{type:"code",raw:n,lang:t[2]&&t[2].trim(),text:e}}},t.heading=function(e){var t=this.rules.block.heading.exec(e);if(t){var n=t[2].trim();return/#$/.test(n)&&(e=O(n,"#"),!this.options.pedantic&&e&&!/ $/.test(e)||(n=e.trim())),{type:"heading",raw:t[0],depth:t[1].length,text:n}}},t.nptable=function(e){e=this.rules.block.nptable.exec(e);if(e){var t={type:"table",header:C(e[1].replace(/^ *| *\| *$/g,"")),align:e[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:e[3]?e[3].replace(/\n$/,"").split("\n"):[],raw:e[0]};if(t.header.length===t.align.length){for(var n=t.align.length,r=0;r<n;r++)/^ *-+: *$/.test(t.align[r])?t.align[r]="right":/^ *:-+: *$/.test(t.align[r])?t.align[r]="center":/^ *:-+ *$/.test(t.align[r])?t.align[r]="left":t.align[r]=null;for(n=t.cells.length,r=0;r<n;r++)t.cells[r]=C(t.cells[r],t.header.length);return t}}},t.hr=function(e){e=this.rules.block.hr.exec(e);if(e)return{type:"hr",raw:e[0]}},t.blockquote=function(e){var t=this.rules.block.blockquote.exec(e);if(t){e=t[0].replace(/^ *> ?/gm,"");return{type:"blockquote",raw:t[0],text:e}}},t.list=function(e){e=this.rules.block.list.exec(e);if(e){for(var t,n,r,i,s,l=e[0],a=e[2],o=1<a.length,c={type:"list",raw:l,ordered:o,start:o?+a.slice(0,-1):"",loose:!1,items:[]},u=e[0].match(this.rules.block.item),p=!1,h=u.length,g=this.rules.block.listItemStart.exec(u[0]),f=0;f<h;f++){if(l=t=u[f],f!==h-1){if(r=this.rules.block.listItemStart.exec(u[f+1]),this.options.pedantic?r[1].length>g[1].length:r[1].length>g[0].length||3<r[1].length){u.splice(f,2,u[f]+"\n"+u[f+1]),f--,h--;continue}(!this.options.pedantic||this.options.smartLists?r[2][r[2].length-1]!==a[a.length-1]:o==(1===r[2].length))&&(n=u.slice(f+1).join("\n"),c.raw=c.raw.substring(0,c.raw.length-n.length),f=h-1),g=r}r=t.length,~(t=t.replace(/^ *([*+-]|\d+[.)]) ?/,"")).indexOf("\n ")&&(r-=t.length,t=this.options.pedantic?t.replace(/^ {1,4}/gm,""):t.replace(new RegExp("^ {1,"+r+"}","gm"),"")),r=p||/\n\n(?!\s*$)/.test(t),f!==h-1&&(p="\n"===t.charAt(t.length-1),r=r||p),r&&(c.loose=!0),this.options.gfm&&(s=void 0,(i=/^\[[ xX]\] /.test(t))&&(s=" "!==t[1],t=t.replace(/^\[[ xX]\] +/,""))),c.items.push({type:"list_item",raw:l,task:i,checked:s,loose:r,text:t})}return c}},t.html=function(e){e=this.rules.block.html.exec(e);if(e)return{type:this.options.sanitize?"paragraph":"html",raw:e[0],pre:!this.options.sanitizer&&("pre"===e[1]||"script"===e[1]||"style"===e[1]),text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(e[0]):U(e[0]):e[0]}},t.def=function(e){e=this.rules.block.def.exec(e);if(e)return e[3]&&(e[3]=e[3].substring(1,e[3].length-1)),{tag:e[1].toLowerCase().replace(/\s+/g," "),raw:e[0],href:e[2],title:e[3]}},t.table=function(e){e=this.rules.block.table.exec(e);if(e){var t={type:"table",header:C(e[1].replace(/^ *| *\| *$/g,"")),align:e[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:e[3]?e[3].replace(/\n$/,"").split("\n"):[]};if(t.header.length===t.align.length){t.raw=e[0];for(var n=t.align.length,r=0;r<n;r++)/^ *-+: *$/.test(t.align[r])?t.align[r]="right":/^ *:-+: *$/.test(t.align[r])?t.align[r]="center":/^ *:-+ *$/.test(t.align[r])?t.align[r]="left":t.align[r]=null;for(n=t.cells.length,r=0;r<n;r++)t.cells[r]=C(t.cells[r].replace(/^ *\| *| *\| *$/g,""),t.header.length);return t}}},t.lheading=function(e){e=this.rules.block.lheading.exec(e);if(e)return{type:"heading",raw:e[0],depth:"="===e[2].charAt(0)?1:2,text:e[1]}},t.paragraph=function(e){e=this.rules.block.paragraph.exec(e);if(e)return{type:"paragraph",raw:e[0],text:"\n"===e[1].charAt(e[1].length-1)?e[1].slice(0,-1):e[1]}},t.text=function(e,t){e=this.rules.block.text.exec(e);if(e){t=t[t.length-1];return t&&"text"===t.type?{raw:e[0],text:e[0]}:{type:"text",raw:e[0],text:e[0]}}},t.escape=function(e){e=this.rules.inline.escape.exec(e);if(e)return{type:"escape",raw:e[0],text:U(e[1])}},t.tag=function(e,t,n){e=this.rules.inline.tag.exec(e);if(e)return!t&&/^<a /i.test(e[0])?t=!0:t&&/^<\/a>/i.test(e[0])&&(t=!1),!n&&/^<(pre|code|kbd|script)(\s|>)/i.test(e[0])?n=!0:n&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(e[0])&&(n=!1),{type:this.options.sanitize?"text":"html",raw:e[0],inLink:t,inRawBlock:n,text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(e[0]):U(e[0]):e[0]}},t.link=function(e){var t=this.rules.inline.link.exec(e);if(t){var n=t[2].trim();if(!this.options.pedantic&&/^</.test(n)){if(!/>$/.test(n))return;e=O(n.slice(0,-1),"\\");if((n.length-e.length)%2==0)return}else{var r=j(t[2],"()");-1<r&&(s=(0===t[0].indexOf("!")?5:4)+t[1].length+r,t[2]=t[2].substring(0,r),t[0]=t[0].substring(0,s).trim(),t[3]="")}var i,r=t[2],s="";return this.options.pedantic?(i=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(r))&&(r=i[1],s=i[3]):s=t[3]?t[3].slice(1,-1):"",r=r.trim(),E(t,{href:(r=/^</.test(r)?this.options.pedantic&&!/>$/.test(n)?r.slice(1):r.slice(1,-1):r)&&r.replace(this.rules.inline._escapes,"$1"),title:s&&s.replace(this.rules.inline._escapes,"$1")},t[0])}},t.reflink=function(e,t){if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){e=(n[2]||n[1]).replace(/\s+/g," ");if((e=t[e.toLowerCase()])&&e.href)return E(n,e,n[0]);var n=n[0].charAt(0);return{type:"text",raw:n,text:n}}},t.strong=function(e,t,n){void 0===n&&(n="");var r=this.rules.inline.strong.start.exec(e);if(r&&(!r[1]||r[1]&&(""===n||this.rules.inline.punctuation.exec(n)))){t=t.slice(-1*e.length);var i,s="**"===r[0]?this.rules.inline.strong.endAst:this.rules.inline.strong.endUnd;for(s.lastIndex=0;null!=(r=s.exec(t));)if(i=this.rules.inline.strong.middle.exec(t.slice(0,r.index+3)))return{type:"strong",raw:e.slice(0,i[0].length),text:e.slice(2,i[0].length-2)}}},t.em=function(e,t,n){void 0===n&&(n="");var r=this.rules.inline.em.start.exec(e);if(r&&(!r[1]||r[1]&&(""===n||this.rules.inline.punctuation.exec(n)))){t=t.slice(-1*e.length);var i,s="*"===r[0]?this.rules.inline.em.endAst:this.rules.inline.em.endUnd;for(s.lastIndex=0;null!=(r=s.exec(t));)if(i=this.rules.inline.em.middle.exec(t.slice(0,r.index+2)))return{type:"em",raw:e.slice(0,i[0].length),text:e.slice(1,i[0].length-1)}}},t.codespan=function(e){var t=this.rules.inline.code.exec(e);if(t){var n=t[2].replace(/\n/g," "),r=/[^ ]/.test(n),e=/^ /.test(n)&&/ $/.test(n);return r&&e&&(n=n.substring(1,n.length-1)),n=U(n,!0),{type:"codespan",raw:t[0],text:n}}},t.br=function(e){e=this.rules.inline.br.exec(e);if(e)return{type:"br",raw:e[0]}},t.del=function(e){e=this.rules.inline.del.exec(e);if(e)return{type:"del",raw:e[0],text:e[2]}},t.autolink=function(e,t){e=this.rules.inline.autolink.exec(e);if(e){var n,t="@"===e[2]?"mailto:"+(n=U(this.options.mangle?t(e[1]):e[1])):n=U(e[1]);return{type:"link",raw:e[0],text:n,href:t,tokens:[{type:"text",raw:n,text:n}]}}},t.url=function(e,t){var n,r,i,s;if(n=this.rules.inline.url.exec(e)){if("@"===n[2])i="mailto:"+(r=U(this.options.mangle?t(n[0]):n[0]));else{for(;s=n[0],n[0]=this.rules.inline._backpedal.exec(n[0])[0],s!==n[0];);r=U(n[0]),i="www."===n[1]?"http://"+r:r}return{type:"link",raw:n[0],text:r,href:i,tokens:[{type:"text",raw:r,text:r}]}}},t.inlineText=function(e,t,n){e=this.rules.inline.text.exec(e);if(e){n=t?this.options.sanitize?this.options.sanitizer?this.options.sanitizer(e[0]):U(e[0]):e[0]:U(this.options.smartypants?n(e[0]):e[0]);return{type:"text",raw:e[0],text:n}}},e}(),R=S,T=z,S=A,z={newline:/^(?: *(?:\n|$))+/,code:/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,fences:/^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,hr:/^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?! {0,3}bull )\n*|\s*$)/,html:"^ {0,3}(?:<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$))",def:/^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,nptable:R,table:R,lheading:/^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,_paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html| +\n)[^\n]+)*)/,text:/^[^\n]+/,_label:/(?!\s*\])(?:\\[\[\]]|[^\[\]])+/,_title:/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/};z.def=T(z.def).replace("label",z._label).replace("title",z._title).getRegex(),z.bullet=/(?:[*+-]|\d{1,9}[.)])/,z.item=/^( *)(bull) ?[^\n]*(?:\n(?! *bull ?)[^\n]*)*/,z.item=T(z.item,"gm").replace(/bull/g,z.bullet).getRegex(),z.listItemStart=T(/^( *)(bull)/).replace("bull",z.bullet).getRegex(),z.list=T(z.list).replace(/bull/g,z.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+z.def.source+")").getRegex(),z._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",z._comment=/<!--(?!-?>)[\s\S]*?(?:-->|$)/,z.html=T(z.html,"i").replace("comment",z._comment).replace("tag",z._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),z.paragraph=T(z._paragraph).replace("hr",z.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag",z._tag).getRegex(),z.blockquote=T(z.blockquote).replace("paragraph",z.paragraph).getRegex(),z.normal=S({},z),z.gfm=S({},z.normal,{nptable:"^ *([^|\\n ].*\\|.*)\\n {0,3}([-:]+ *\\|[-| :]*)(?:\\n((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)",table:"^ *\\|(.+)\\n {0,3}\\|?( *[-:]+[-| :]*)(?:\\n *((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"}),z.gfm.nptable=T(z.gfm.nptable).replace("hr",z.hr).replace("heading"," {0,3}#{1,6} ").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag",z._tag).getRegex(),z.gfm.table=T(z.gfm.table).replace("hr",z.hr).replace("heading"," {0,3}#{1,6} ").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag",z._tag).getRegex(),z.pedantic=S({},z.normal,{html:T("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",z._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:R,paragraph:T(z.normal._paragraph).replace("hr",z.hr).replace("heading"," *#{1,6} *[^\n]").replace("lheading",z.lheading).replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").getRegex()});R={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:R,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,nolink:/^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,reflinkSearch:"reflink|nolink(?!\\()",strong:{start:/^(?:(\*\*(?=[*punctuation]))|\*\*)(?![\s])|__/,middle:/^\*\*(?:(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)|\*(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)*?\*)+?\*\*$|^__(?![\s])((?:(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)|_(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)*?_)+?)__$/,endAst:/[^punctuation\s]\*\*(?!\*)|[punctuation]\*\*(?!\*)(?:(?=[punctuation_\s]|$))/,endUnd:/[^\s]__(?!_)(?:(?=[punctuation*\s])|$)/},em:{start:/^(?:(\*(?=[punctuation]))|\*)(?![*\s])|_/,middle:/^\*(?:(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)|\*(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)*?\*)+?\*$|^_(?![_\s])(?:(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)|_(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)*?_)+?_$/,endAst:/[^punctuation\s]\*(?!\*)|[punctuation]\*(?!\*)(?:(?=[punctuation_\s]|$))/,endUnd:/[^\s]_(?!_)(?:(?=[punctuation*\s])|$)/},code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:R,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n)))/,punctuation:/^([\s*punctuation])/,_punctuation:"!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~"};R.punctuation=T(R.punctuation).replace(/punctuation/g,R._punctuation).getRegex(),R._blockSkip="\\[[^\\]]*?\\]\\([^\\)]*?\\)|`[^`]*?`|<[^>]*?>",R._overlapSkip="__[^_]*?__|\\*\\*\\[^\\*\\]*?\\*\\*",R._comment=T(z._comment).replace("(?:--\x3e|$)","--\x3e").getRegex(),R.em.start=T(R.em.start).replace(/punctuation/g,R._punctuation).getRegex(),R.em.middle=T(R.em.middle).replace(/punctuation/g,R._punctuation).replace(/overlapSkip/g,R._overlapSkip).getRegex(),R.em.endAst=T(R.em.endAst,"g").replace(/punctuation/g,R._punctuation).getRegex(),R.em.endUnd=T(R.em.endUnd,"g").replace(/punctuation/g,R._punctuation).getRegex(),R.strong.start=T(R.strong.start).replace(/punctuation/g,R._punctuation).getRegex(),R.strong.middle=T(R.strong.middle).replace(/punctuation/g,R._punctuation).replace(/overlapSkip/g,R._overlapSkip).getRegex(),R.strong.endAst=T(R.strong.endAst,"g").replace(/punctuation/g,R._punctuation).getRegex(),R.strong.endUnd=T(R.strong.endUnd,"g").replace(/punctuation/g,R._punctuation).getRegex(),R.blockSkip=T(R._blockSkip,"g").getRegex(),R.overlapSkip=T(R._overlapSkip,"g").getRegex(),R._escapes=/\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g,R._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/,R._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,R.autolink=T(R.autolink).replace("scheme",R._scheme).replace("email",R._email).getRegex(),R._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,R.tag=T(R.tag).replace("comment",R._comment).replace("attribute",R._attribute).getRegex(),R._label=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,R._href=/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/,R._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/,R.link=T(R.link).replace("label",R._label).replace("href",R._href).replace("title",R._title).getRegex(),R.reflink=T(R.reflink).replace("label",R._label).getRegex(),R.reflinkSearch=T(R.reflinkSearch,"g").replace("reflink",R.reflink).replace("nolink",R.nolink).getRegex(),R.normal=S({},R),R.pedantic=S({},R.normal,{strong:{start:/^__|\*\*/,middle:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,endAst:/\*\*(?!\*)/g,endUnd:/__(?!_)/g},em:{start:/^_|\*/,middle:/^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,endAst:/\*(?!\*)/g,endUnd:/_(?!_)/g},link:T(/^!?\[(label)\]\((.*?)\)/).replace("label",R._label).getRegex(),reflink:T(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",R._label).getRegex()}),R.gfm=S({},R.normal,{escape:T(R.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/}),R.gfm.url=T(R.gfm.url,"i").replace("email",R.gfm._extended_email).getRegex(),R.breaks=S({},R.gfm,{br:T(R.br).replace("{2,}","*").getRegex(),text:T(R.gfm.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()});var R={block:z,inline:R},L=t.defaults,D=R.block,N=R.inline,B=Z;function F(e){return e.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")}function M(e){for(var t,n="",r=e.length,i=0;i<r;i++)t=e.charCodeAt(i),n+="&#"+(t=.5<Math.random()?"x"+t.toString(16):t)+";";return n}var X=function(){function n(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||L,this.options.tokenizer=this.options.tokenizer||new P,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options;e={block:D.normal,inline:N.normal};this.options.pedantic?(e.block=D.pedantic,e.inline=N.pedantic):this.options.gfm&&(e.block=D.gfm,this.options.breaks?e.inline=N.breaks:e.inline=N.gfm),this.tokenizer.rules=e}n.lex=function(e,t){return new n(t).lex(e)},n.lexInline=function(e,t){return new n(t).inlineTokens(e)};var e,t,r=n.prototype;return r.lex=function(e){return e=e.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    "),this.blockTokens(e,this.tokens,!0),this.inline(this.tokens),this.tokens},r.blockTokens=function(e,t,n){var r,i,s,l;for(void 0===t&&(t=[]),void 0===n&&(n=!0),this.options.pedantic&&(e=e.replace(/^ +$/gm,""));e;)if(r=this.tokenizer.space(e))e=e.substring(r.raw.length),r.type&&t.push(r);else if(r=this.tokenizer.code(e,t))e=e.substring(r.raw.length),r.type?t.push(r):((l=t[t.length-1]).raw+="\n"+r.raw,l.text+="\n"+r.text);else if(r=this.tokenizer.fences(e))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.heading(e))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.nptable(e))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.hr(e))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.blockquote(e))e=e.substring(r.raw.length),r.tokens=this.blockTokens(r.text,[],n),t.push(r);else if(r=this.tokenizer.list(e)){for(e=e.substring(r.raw.length),s=r.items.length,i=0;i<s;i++)r.items[i].tokens=this.blockTokens(r.items[i].text,[],!1);t.push(r)}else if(r=this.tokenizer.html(e))e=e.substring(r.raw.length),t.push(r);else if(n&&(r=this.tokenizer.def(e)))e=e.substring(r.raw.length),this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});else if(r=this.tokenizer.table(e))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.lheading(e))e=e.substring(r.raw.length),t.push(r);else if(n&&(r=this.tokenizer.paragraph(e)))e=e.substring(r.raw.length),t.push(r);else if(r=this.tokenizer.text(e,t))e=e.substring(r.raw.length),r.type?t.push(r):((l=t[t.length-1]).raw+="\n"+r.raw,l.text+="\n"+r.text);else if(e){var a="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(a);break}throw new Error(a)}return t},r.inline=function(e){for(var t,n,r,i,s,l=e.length,a=0;a<l;a++)switch((s=e[a]).type){case"paragraph":case"text":case"heading":s.tokens=[],this.inlineTokens(s.text,s.tokens);break;case"table":for(s.tokens={header:[],cells:[]},r=s.header.length,t=0;t<r;t++)s.tokens.header[t]=[],this.inlineTokens(s.header[t],s.tokens.header[t]);for(r=s.cells.length,t=0;t<r;t++)for(i=s.cells[t],s.tokens.cells[t]=[],n=0;n<i.length;n++)s.tokens.cells[t][n]=[],this.inlineTokens(i[n],s.tokens.cells[t][n]);break;case"blockquote":this.inline(s.tokens);break;case"list":for(r=s.items.length,t=0;t<r;t++)this.inline(s.items[t].tokens)}return e},r.inlineTokens=function(e,t,n,r){var i;void 0===t&&(t=[]),void 0===n&&(n=!1),void 0===r&&(r=!1);var s,l,a,o=e;if(this.tokens.links){var c=Object.keys(this.tokens.links);if(0<c.length)for(;null!=(s=this.tokenizer.rules.inline.reflinkSearch.exec(o));)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(o=o.slice(0,s.index)+"["+B("a",s[0].length-2)+"]"+o.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;null!=(s=this.tokenizer.rules.inline.blockSkip.exec(o));)o=o.slice(0,s.index)+"["+B("a",s[0].length-2)+"]"+o.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;e;)if(l||(a=""),l=!1,i=this.tokenizer.escape(e))e=e.substring(i.raw.length),t.push(i);else if(i=this.tokenizer.tag(e,n,r))e=e.substring(i.raw.length),n=i.inLink,r=i.inRawBlock,t.push(i);else if(i=this.tokenizer.link(e))e=e.substring(i.raw.length),"link"===i.type&&(i.tokens=this.inlineTokens(i.text,[],!0,r)),t.push(i);else if(i=this.tokenizer.reflink(e,this.tokens.links))e=e.substring(i.raw.length),"link"===i.type&&(i.tokens=this.inlineTokens(i.text,[],!0,r)),t.push(i);else if(i=this.tokenizer.strong(e,o,a))e=e.substring(i.raw.length),i.tokens=this.inlineTokens(i.text,[],n,r),t.push(i);else if(i=this.tokenizer.em(e,o,a))e=e.substring(i.raw.length),i.tokens=this.inlineTokens(i.text,[],n,r),t.push(i);else if(i=this.tokenizer.codespan(e))e=e.substring(i.raw.length),t.push(i);else if(i=this.tokenizer.br(e))e=e.substring(i.raw.length),t.push(i);else if(i=this.tokenizer.del(e))e=e.substring(i.raw.length),i.tokens=this.inlineTokens(i.text,[],n,r),t.push(i);else if(i=this.tokenizer.autolink(e,M))e=e.substring(i.raw.length),t.push(i);else if(n||!(i=this.tokenizer.url(e,M))){if(i=this.tokenizer.inlineText(e,r,F))e=e.substring(i.raw.length),a=i.raw.slice(-1),l=!0,t.push(i);else if(e){var u="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(u);break}throw new Error(u)}}else e=e.substring(i.raw.length),t.push(i);return t},e=n,t=[{key:"rules",get:function(){return{block:D,inline:N}}}],(r=null)&&i(e.prototype,r),t&&i(e,t),n}(),G=t.defaults,V=$,H=_,J=function(){function e(e){this.options=e||G}var t=e.prototype;return t.code=function(e,t,n){var r=(t||"").match(/\S*/)[0];return!this.options.highlight||null!=(t=this.options.highlight(e,r))&&t!==e&&(n=!0,e=t),e=e.replace(/\n$/,"")+"\n",r?'<pre><code class="'+this.options.langPrefix+H(r,!0)+'">'+(n?e:H(e,!0))+"</code></pre>\n":"<pre><code>"+(n?e:H(e,!0))+"</code></pre>\n"},t.blockquote=function(e){return"<blockquote>\n"+e+"</blockquote>\n"},t.html=function(e){return e},t.heading=function(e,t,n,r){return this.options.headerIds?"<h"+t+' id="'+this.options.headerPrefix+r.slug(n)+'">'+e+"</h"+t+">\n":"<h"+t+">"+e+"</h"+t+">\n"},t.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"},t.list=function(e,t,n){var r=t?"ol":"ul";return"<"+r+(t&&1!==n?' start="'+n+'"':"")+">\n"+e+"</"+r+">\n"},t.listitem=function(e){return"<li>"+e+"</li>\n"},t.checkbox=function(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> "},t.paragraph=function(e){return"<p>"+e+"</p>\n"},t.table=function(e,t){return"<table>\n<thead>\n"+e+"</thead>\n"+(t=t&&"<tbody>"+t+"</tbody>")+"</table>\n"},t.tablerow=function(e){return"<tr>\n"+e+"</tr>\n"},t.tablecell=function(e,t){var n=t.header?"th":"td";return(t.align?"<"+n+' align="'+t.align+'">':"<"+n+">")+e+"</"+n+">\n"},t.strong=function(e){return"<strong>"+e+"</strong>"},t.em=function(e){return"<em>"+e+"</em>"},t.codespan=function(e){return"<code>"+e+"</code>"},t.br=function(){return this.options.xhtml?"<br/>":"<br>"},t.del=function(e){return"<del>"+e+"</del>"},t.link=function(e,t,n){if(null===(e=V(this.options.sanitize,this.options.baseUrl,e)))return n;e='<a href="'+H(e)+'"';return t&&(e+=' title="'+t+'"'),e+=">"+n+"</a>"},t.image=function(e,t,n){if(null===(e=V(this.options.sanitize,this.options.baseUrl,e)))return n;n='<img referrerpolicy="no-referrer" class="hpp_pre" src="'+e+'" alt="'+n+'"';return t&&(n+=' title="'+t+'"'),n+=this.options.xhtml?"/>":">"},t.text=function(e){return e},e}(),K=function(){function e(){}var t=e.prototype;return t.strong=function(e){return e},t.em=function(e){return e},t.codespan=function(e){return e},t.del=function(e){return e},t.html=function(e){return e},t.text=function(e){return e},t.link=function(e,t,n){return""+n},t.image=function(e,t,n){return""+n},t.br=function(){return""},e}(),Q=function(){function e(){this.seen={}}var t=e.prototype;return t.serialize=function(e){return e.toLowerCase().trim().replace(/<[!\/a-z].*?>/gi,"").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,"").replace(/\s/g,"-")},t.getNextSafeSlug=function(e,t){var n=e,r=0;if(this.seen.hasOwnProperty(n))for(r=this.seen[e];n=e+"-"+ ++r,this.seen.hasOwnProperty(n););return t||(this.seen[e]=r,this.seen[n]=0),n},t.slug=function(e,t){void 0===t&&(t={});var n=this.serialize(e);return this.getNextSafeSlug(n,t.dryrun)},e}(),W=t.defaults,Y=y,ee=function(){function n(e){this.options=e||W,this.options.renderer=this.options.renderer||new J,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new K,this.slugger=new Q}n.parse=function(e,t){return new n(t).parse(e)},n.parseInline=function(e,t){return new n(t).parseInline(e)};var e=n.prototype;return e.parse=function(e,t){void 0===t&&(t=!0);for(var n,r,i,s,l,a,o,c,u,p,h,g,f,d,k,b="",m=e.length,x=0;x<m;x++)switch((c=e[x]).type){case"space":continue;case"hr":b+=this.renderer.hr();continue;case"heading":b+=this.renderer.heading(this.parseInline(c.tokens),c.depth,Y(this.parseInline(c.tokens,this.textRenderer)),this.slugger);continue;case"code":b+=this.renderer.code(c.text,c.lang,c.escaped);continue;case"table":for(a=u="",i=c.header.length,n=0;n<i;n++)a+=this.renderer.tablecell(this.parseInline(c.tokens.header[n]),{header:!0,align:c.align[n]});for(u+=this.renderer.tablerow(a),o="",i=c.cells.length,n=0;n<i;n++){for(a="",s=(l=c.tokens.cells[n]).length,r=0;r<s;r++)a+=this.renderer.tablecell(this.parseInline(l[r]),{header:!1,align:c.align[r]});o+=this.renderer.tablerow(a)}b+=this.renderer.table(u,o);continue;case"blockquote":o=this.parse(c.tokens),b+=this.renderer.blockquote(o);continue;case"list":for(u=c.ordered,w=c.start,p=c.loose,i=c.items.length,o="",n=0;n<i;n++)f=(g=c.items[n]).checked,d=g.task,h="",g.task&&(k=this.renderer.checkbox(f),p?0<g.tokens.length&&"text"===g.tokens[0].type?(g.tokens[0].text=k+" "+g.tokens[0].text,g.tokens[0].tokens&&0<g.tokens[0].tokens.length&&"text"===g.tokens[0].tokens[0].type&&(g.tokens[0].tokens[0].text=k+" "+g.tokens[0].tokens[0].text)):g.tokens.unshift({type:"text",text:k}):h+=k),h+=this.parse(g.tokens,p),o+=this.renderer.listitem(h,d,f);b+=this.renderer.list(o,u,w);continue;case"html":b+=this.renderer.html(c.text);continue;case"paragraph":b+=this.renderer.paragraph(this.parseInline(c.tokens));continue;case"text":for(o=c.tokens?this.parseInline(c.tokens):c.text;x+1<m&&"text"===e[x+1].type;)o+="\n"+((c=e[++x]).tokens?this.parseInline(c.tokens):c.text);b+=t?this.renderer.paragraph(o):o;continue;default:var w='Token with "'+c.type+'" type was not found.';if(this.options.silent)return void console.error(w);throw new Error(w)}return b},e.parseInline=function(e,t){t=t||this.renderer;for(var n,r="",i=e.length,s=0;s<i;s++)switch((n=e[s]).type){case"escape":r+=t.text(n.text);break;case"html":r+=t.html(n.text);break;case"link":r+=t.link(n.href,n.title,this.parseInline(n.tokens,t));break;case"image":r+=t.image(n.href,n.title,n.text);break;case"strong":r+=t.strong(this.parseInline(n.tokens,t));break;case"em":r+=t.em(this.parseInline(n.tokens,t));break;case"codespan":r+=t.codespan(n.text);break;case"br":r+=t.br();break;case"del":r+=t.del(this.parseInline(n.tokens,t));break;case"text":r+=t.text(n.text);break;default:var l='Token with "'+n.type+'" type was not found.';if(this.options.silent)return void console.error(l);throw new Error(l)}return r},n}(),te=A,ne=I,re=_,_=t.getDefaults,ie=t.changeDefaults,t=t.defaults;function se(e,n,r){if(null==e)throw new Error("marked(): input parameter is undefined or null");if("string"!=typeof e)throw new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected");if("function"==typeof n&&(r=n,n=null),n=te({},se.defaults,n||{}),ne(n),r){var i,s=n.highlight;try{i=X.lex(e,n)}catch(e){return r(e)}var l=function(t){var e;if(!t)try{e=ee.parse(i,n)}catch(e){t=e}return n.highlight=s,t?r(t):r(null,e)};if(!s||s.length<3)return l();if(delete n.highlight,!i.length)return l();var a=0;return se.walkTokens(i,function(n){"code"===n.type&&(a++,setTimeout(function(){s(n.text,n.lang,function(e,t){return e?l(e):(null!=t&&t!==n.text&&(n.text=t,n.escaped=!0),void(0===--a&&l()))})},0))}),void(0===a&&l())}try{var t=X.lex(e,n);return n.walkTokens&&se.walkTokens(t,n.walkTokens),ee.parse(t,n)}catch(e){if(e.message+="\nPlease report this to https://github.com/markedjs/marked.",n.silent)return"<p>An error occurred:</p><pre>"+re(e.message+"",!0)+"</pre>";throw e}}return se.options=se.setOptions=function(e){return te(se.defaults,e),ie(se.defaults),se},se.getDefaults=_,se.defaults=t,se.use=function(a){var t,n=te({},a);a.renderer&&function(){var e,l=se.defaults.renderer||new J;for(e in a.renderer)!function(i){var s=l[i];l[i]=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var r=a.renderer[i].apply(l,t);return r=!1===r?s.apply(l,t):r}}(e);n.renderer=l}(),a.tokenizer&&function(){var e,l=se.defaults.tokenizer||new P;for(e in a.tokenizer)!function(i){var s=l[i];l[i]=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var r=a.tokenizer[i].apply(l,t);return r=!1===r?s.apply(l,t):r}}(e);n.tokenizer=l}(),a.walkTokens&&(t=se.defaults.walkTokens,n.walkTokens=function(e){a.walkTokens(e),t&&t(e)}),se.setOptions(n)},se.walkTokens=function(e,t){for(var n,r=p(e);!(n=r()).done;){var i=n.value;switch(t(i),i.type){case"table":for(var s=p(i.tokens.header);!(l=s()).done;){var l=l.value;se.walkTokens(l,t)}for(var a,o=p(i.tokens.cells);!(a=o()).done;)for(var c=p(a.value);!(u=c()).done;){var u=u.value;se.walkTokens(u,t)}break;case"list":se.walkTokens(i.items,t);break;default:i.tokens&&se.walkTokens(i.tokens,t)}}},se.parseInline=function(e,t){if(null==e)throw new Error("marked.parseInline(): input parameter is undefined or null");if("string"!=typeof e)throw new Error("marked.parseInline(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected");t=te({},se.defaults,t||{}),ne(t);try{var n=X.lexInline(e,t);return t.walkTokens&&se.walkTokens(n,t.walkTokens),ee.parseInline(n,t)}catch(e){if(e.message+="\nPlease report this to https://github.com/markedjs/marked.",t.silent)return"<p>An error occurred:</p><pre>"+re(e.message+"",!0)+"</pre>";throw e}},se.Parser=ee,se.parser=ee.parse,se.Renderer=J,se.TextRenderer=K,se.Lexer=X,se.lexer=X.lex,se.Tokenizer=P,se.Slugger=Q,se.parse=se});
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
function hpp_vi(id){

var ajax = ajaxObject();
    ajax.open( "post" , "/hpp/admin/api/visibletalk" , true );
    ajax.setRequestHeader( "Content-Type" , "text/plain" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {
		if( ajax.status == 200 ) {swal("已修改可见性！", {
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
document.getElementById(id).innerHTML=`<div class="hpp_talk_loading"><div class="hpp_talk_part"><div class="hppt_loader"><div class="hppt_inner one"></div><div class="hppt_inner two"></div><div class="hppt_inner three"></div></div></div><p style="text-align:center;">加载 HexoPlusPlus_Talk_管理员模式 中</p></div>`

  back='https://'+domain+'/hpp/admin/api/gethpptalk'
var ajax = ajaxObject();
    ajax.open( "post" , back , true );
    ajax.setRequestHeader( "Content-Type" , "text/plain" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {
            if( ajax.status == 200 ) {
				document.getElementById(id).innerHTML=`<div class="hpp_talk_loading"><div class="hpp_talk_part"><div class="hppt_loader"><div class="hppt_inner one"></div><div class="hppt_inner two"></div><div class="hppt_inner three"></div></div></div><p style="text-align:center;">渲染说说中...</p></div>`
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
				if(res[i]==null){document.cookie="hpp_start=0";break;}
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
	document.cookie="hpp_start="+start;
    ajax.send(JSON.stringify(body));
};

document.cookie="hpp_start=";
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
				localStorage.setItem("hpp_talk_backup","");
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

