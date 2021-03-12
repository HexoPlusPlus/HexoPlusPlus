
document.getElementById('hpp_img').addEventListener('click', function () {
if(document.getElementById('hpp_img').checked){document.getElementById('githubimg').style["display"] = "none";document.getElementById('ownimg').style["display"] = ""}else{
document.getElementById('githubimg').style["display"] = "";document.getElementById('ownimg').style["display"] = "none"
}
});
document.getElementById('hpp_githubpage').addEventListener('click', function () {
if(document.getElementById('hpp_githubpage').checked){document.getElementById('hpp_githubpage_ctx').style["display"] = ""}else{
document.getElementById('hpp_githubpage_ctx').style["display"] = "none"}
});
document.getElementById('hpp_twikoo').addEventListener('click', function () {
if(document.getElementById('hpp_twikoo').checked){document.getElementById('hpp_twikoo_ctx').style["display"] = ""}else{
document.getElementById('hpp_twikoo_ctx').style["display"] = "none"
}
});

function ajaxObject() {
    var xmlHttp;
    try {
        // Firefox, Opera 8.0+, Safari
        xmlHttp = new XMLHttpRequest();
        } 
    catch (e) {
        // Internet Explorer
        try {
                xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
            try {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                sweetAlert("糟糕", "你的浏览器不能上传文件", "error");
                return false;
            }
        }
    }
    return xmlHttp;
};
var inst = new mdui.Panel('#panel',{accordion:false});
var inst2 = new mdui.Drawer('#drawer',{overlay:true,swipe:true});
var inst3 = new mdui.Dialog('#dialogerr');
var inst4 = new mdui.Dialog('#dialogok');
document.getElementById('_menu').addEventListener('click', function () {
  inst2.open();
});

function upload(){
document.getElementById("bbb").innerHTML = "配置上传中"
document.getElementById("bbb").disabled=true
		let hpp_domain=document.getElementById("hpp_domain").value==""?window.location.host:document.getElementById("hpp_domain").value;
		let hpp_username=document.getElementById("hpp_userimage").value==""?"https://cdn.jsdelivr.net/gh/ChenYFan/CDN@master/img/hpp_upload/1612610340000.jpg":document.getElementById("hpp_userimage").value;
		let hpp_title=document.getElementById("hpp_title").value==""?"HexoPlusPlus小飞机":document.getElementById("hpp_title").value;
		let hpp_usericon=document.getElementById("hpp_usericon").value==""?"https://cdn.jsdelivr.net/gh/HexoPlusPlus/CDN@master/doc_img/icon.png":document.getElementById("hpp_usericon").value;
		let hpp_cors=document.getElementById("hpp_cors").value==""?"*":document.getElementById("hpp_cors").value
		let hpp_autodate=document.getElementById("hpp_autodate").checked==false?"False":document.getElementById("hpp_autodate").value
		let hpp_OwO=document.getElementById("hpp_OwO").value==""?"https://cdn.jsdelivr.net/gh/2X-ercha/Twikoo-Magic@master/hppowo.json":document.getElementById("hpp_OwO").value
		let hpp_back=document.getElementById("hpp_back").value==""?"https://cdn.jsdelivr.net/gh/ChenYFan-Tester/DailyGet@gh-pages/bingpic/bing.jpg":document.getElementById("hpp_back").value
		let hpp_lazy_img=document.getElementById("hpp_lazy_img").value==""?"https://cdn.jsdelivr.net/gh/ChenYFan/blog@master/themes/fluid/source/img/loading.gif":document.getElementById("hpp_lazy_img").value
		let hpp_highlight_style=document.getElementById("hpp_highlight_style").value==""?"github":document.getElementById("hpp_highlight_style").value
		let hpp_color=document.getElementById("hpp_color").value==""?"azure":document.getElementById("hpp_color").value
		let hpp_bg_color=document.getElementById("hpp_bg_color").value=="black"?"black":document.getElementById("hpp_bg_color").value
		let hpp_theme_mode=document.getElementById("hpp_theme_mode").value=="dark"?"dark":"light"
		let hpp_page_limit=document.getElementById("hpp_page_limit").value==""?"10":document.getElementById("hpp_page_limit").value
		const config={
			"hpp_domain":hpp_domain,
			"hpp_userimage":hpp_username,
			"hpp_title":hpp_title,
			"hpp_usericon":hpp_usericon,
			"hpp_cors":hpp_cors,
			"hpp_githubdoctoken":document.getElementById("hpp_githubdoctoken").value,
			"hpp_githubimagetoken":document.getElementById("hpp_githubimagetoken").value,
			"hpp_githubdocusername":document.getElementById("hpp_githubdocusername").value,
			"hpp_githubdocrepo":document.getElementById("hpp_githubdocrepo").value,
			"hpp_githubdocroot":document.getElementById("hpp_githubdocroot").value,			
			"hpp_githubdocbranch":document.getElementById("hpp_githubdocbranch").value,
			"hpp_githubpage":document.getElementById("hpp_githubpage").checked?"true":"false",
			"hpp_githubpagetoken":document.getElementById("hpp_githubpagetoken").value,
			"hpp_githubpageusername":document.getElementById("hpp_githubpageusername").value,
			"hpp_githubpagerepo":document.getElementById("hpp_githubpagerepo").value,
			"hpp_githubpageroot":document.getElementById("hpp_githubpageroot").value,			
			"hpp_githubpagebranch":document.getElementById("hpp_githubpagebranch").value,
			
			"hpp_img":document.getElementById("hpp_img").checked?"true":"false",
			"hpp_ownimgurl":document.getElementById("hpp_ownimgurl").value,
			"hpp_ownimgname":document.getElementById("hpp_ownimgname").value,
			"hpp_ownimgjsonpath":document.getElementById("hpp_ownimgjsonpath").value,
			"hpp_ownimgheader":document.getElementById("hpp_ownimgheader").value,			
			"hpp_ownimgmethod":document.getElementById("hpp_ownimgmethod").value || "POST",
			
			
			"hpp_githubimageusername":document.getElementById("hpp_githubimageusername").value,
			"hpp_githubimagerepo":document.getElementById("hpp_githubimagerepo").value,
			"hpp_githubimagepath":document.getElementById("hpp_githubimagepath").value,			
			"hpp_githubimagebranch":document.getElementById("hpp_githubimagebranch").value,
			"hpp_autodate":hpp_autodate,
			"hpp_account_identifier":document.getElementById("hpp_account_identifier").value,
			"hpp_script_name":document.getElementById("hpp_script_name").value,			
			"hpp_CF_Auth_Key":document.getElementById("hpp_CF_Auth_Key").value,
			"hpp_Auth_Email":document.getElementById("hpp_Auth_Email").value,
			"hpp_twikoo_envId":document.getElementById("hpp_twikoo_envId").value,
			"hpp_twikoo":document.getElementById("hpp_twikoo").checked?"true":"false",
			"hpp_OwO":hpp_OwO,
			"hpp_back":hpp_back,
			"hpp_lazy_img":hpp_lazy_img,
			"hpp_highlight_style":hpp_highlight_style,
			"hpp_color":hpp_color,
			"hpp_bg_color":hpp_bg_color,
			"hpp_theme_mode":hpp_theme_mode,
			"hpp_page_limit":hpp_page_limit
			};
        var ajax = ajaxObject();
        ajax.open("post", '/hpp/admin/api/upconfig', true);
        ajax.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                if (ajax.status == 200) {
                    inst4.open();
                } else {
inst3.open();
document.getElementById("bbb").innerHTML = "上传配置"
document.getElementById("bbb").disabled=false
}
            }
        }
		console.log(config)
        ajax.send(JSON.stringify(config));
}