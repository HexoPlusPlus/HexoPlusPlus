function ajaxObject(){var e;try{e=new XMLHttpRequest}catch(t){try{e=new ActiveXObject("Msxml2.XMLHTTP")}catch(t){try{e=new ActiveXObject("Microsoft.XMLHTTP")}catch(e){return sweetAlert("糟糕","你的浏览器不能上传文件","error"),!1}}}return e}document.getElementById("hpp_img").addEventListener("click",(function(){document.getElementById("hpp_img").checked?(document.getElementById("githubimg").style.display="none",document.getElementById("ownimg").style.display=""):(document.getElementById("githubimg").style.display="",document.getElementById("ownimg").style.display="none")})),document.getElementById("hpp_githubpage").addEventListener("click",(function(){document.getElementById("hpp_githubpage").checked?document.getElementById("hpp_githubpage_ctx").style.display="":document.getElementById("hpp_githubpage_ctx").style.display="none"})),document.getElementById("hpp_twikoo").addEventListener("click",(function(){document.getElementById("hpp_twikoo").checked?document.getElementById("hpp_twikoo_ctx").style.display="":document.getElementById("hpp_twikoo_ctx").style.display="none"}));var inst=new mdui.Panel("#panel",{accordion:!1}),inst2=new mdui.Drawer("#drawer",{overlay:!0,swipe:!0}),inst3=new mdui.Dialog("#dialogerr"),inst4=new mdui.Dialog("#dialogok");function upload(){document.getElementById("bbb").innerHTML="配置上传中",document.getElementById("bbb").disabled=!0;let e=""==document.getElementById("hpp_domain").value?window.location.host:document.getElementById("hpp_domain").value,t=""==document.getElementById("hpp_userimage").value?"https://cdn.jsdelivr.net/gh/ChenYFan/CDN@master/img/hpp_upload/1612610340000.jpg":document.getElementById("hpp_userimage").value,n=""==document.getElementById("hpp_title").value?"HexoPlusPlus小飞机":document.getElementById("hpp_title").value,p=""==document.getElementById("hpp_usericon").value?"https://cdn.jsdelivr.net/gh/HexoPlusPlus/CDN@master/doc_img/icon.png":document.getElementById("hpp_usericon").value,d=""==document.getElementById("hpp_cors").value?"*":document.getElementById("hpp_cors").value,m=0==document.getElementById("hpp_autodate").checked?"False":document.getElementById("hpp_autodate").value,o=""==document.getElementById("hpp_OwO").value?"https://cdn.jsdelivr.net/gh/2X-ercha/Twikoo-Magic@master/hppowo.json":document.getElementById("hpp_OwO").value,u=""==document.getElementById("hpp_back").value?"https://cdn.jsdelivr.net/gh/ChenYFan-Tester/DailyGet@gh-pages/bingpic/bing.jpg":document.getElementById("hpp_back").value,h=""==document.getElementById("hpp_lazy_img").value?"https://cdn.jsdelivr.net/gh/ChenYFan/blog@master/themes/fluid/source/img/loading.gif":document.getElementById("hpp_lazy_img").value,l=""==document.getElementById("hpp_highlight_style").value?"github":document.getElementById("hpp_highlight_style").value,g=""==document.getElementById("hpp_color").value?"azure":document.getElementById("hpp_color").value,a="black"==document.getElementById("hpp_bg_color").value?"black":document.getElementById("hpp_bg_color").value,i="dark"==document.getElementById("hpp_theme_mode").value?"dark":"light",c=""==document.getElementById("hpp_page_limit").value?"10":document.getElementById("hpp_page_limit").value;const _={hpp_domain:e,hpp_userimage:t,hpp_title:n,hpp_usericon:p,hpp_cors:d,hpp_githubdoctoken:document.getElementById("hpp_githubdoctoken").value,hpp_githubimagetoken:document.getElementById("hpp_githubimagetoken").value,hpp_githubdocusername:document.getElementById("hpp_githubdocusername").value,hpp_githubdocrepo:document.getElementById("hpp_githubdocrepo").value,hpp_githubdocroot:document.getElementById("hpp_githubdocroot").value,hpp_githubdocbranch:document.getElementById("hpp_githubdocbranch").value,hpp_githubpage:document.getElementById("hpp_githubpage").checked?"true":"false",hpp_githubpagetoken:document.getElementById("hpp_githubpagetoken").value,hpp_githubpageusername:document.getElementById("hpp_githubpageusername").value,hpp_githubpagerepo:document.getElementById("hpp_githubpagerepo").value,hpp_githubpageroot:document.getElementById("hpp_githubpageroot").value,hpp_githubpagebranch:document.getElementById("hpp_githubpagebranch").value,hpp_img:document.getElementById("hpp_img").checked?"true":"false",hpp_ownimgurl:document.getElementById("hpp_ownimgurl").value,hpp_ownimgname:document.getElementById("hpp_ownimgname").value,hpp_ownimgjsonpath:document.getElementById("hpp_ownimgjsonpath").value,hpp_ownimgheader:document.getElementById("hpp_ownimgheader").value,hpp_ownimgmethod:document.getElementById("hpp_ownimgmethod").value||"POST",hpp_githubimageusername:document.getElementById("hpp_githubimageusername").value,hpp_githubimagerepo:document.getElementById("hpp_githubimagerepo").value,hpp_githubimagepath:document.getElementById("hpp_githubimagepath").value,hpp_githubimagebranch:document.getElementById("hpp_githubimagebranch").value,hpp_autodate:m,hpp_account_identifier:document.getElementById("hpp_account_identifier").value,hpp_script_name:document.getElementById("hpp_script_name").value,hpp_CF_Auth_Key:document.getElementById("hpp_CF_Auth_Key").value,hpp_Auth_Email:document.getElementById("hpp_Auth_Email").value,hpp_twikoo_envId:document.getElementById("hpp_twikoo_envId").value,hpp_twikoo:document.getElementById("hpp_twikoo").checked?"true":"false",hpp_OwO:o,hpp_back:u,hpp_lazy_img:h,hpp_highlight_style:l,hpp_color:g,hpp_bg_color:a,hpp_theme_mode:i,hpp_page_limit:c};var y=ajaxObject();y.open("post","/hpp/admin/api/upconfig",!0),y.setRequestHeader("Content-Type","application/json;charset=UTF-8"),y.onreadystatechange=function(){4==y.readyState&&(200==y.status?inst4.open():(inst3.open(),document.getElementById("bbb").innerHTML="上传配置",document.getElementById("bbb").disabled=!1))},console.log(_),y.send(JSON.stringify(_))}document.getElementById("_menu").addEventListener("click",(function(){inst2.open()}));