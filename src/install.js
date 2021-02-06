
(function() {
  setTimeout(function(arg1) {
    if (arg1 === 'test') {
      // feature test is passed, no need for polyfill
      return;
    }
    var __nativeST__ = window.setTimeout;
    window.setTimeout = function(vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */ ) {
      var aArgs = Array.prototype.slice.call(arguments, 2);
      return __nativeST__(vCallback instanceof Function ? function() {
        vCallback.apply(null, aArgs);
      } : vCallback, nDelay);
    };
  }, 0, 'test');
  var interval = setInterval(function(arg1) {
    clearInterval(interval);
    if (arg1 === 'test') {
      // feature test is passed, no need for polyfill
      return;
    }
    var __nativeSI__ = window.setInterval;
    window.setInterval = function(vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */ ) {
      var aArgs = Array.prototype.slice.call(arguments, 2);
      return __nativeSI__(vCallback instanceof Function ? function() {
        vCallback.apply(null, aArgs);
      } : vCallback, nDelay);
    };
  }, 0, 'test');
}())
function ajaxObject() {
    var xmlHttp;
    try {
        // Firefox, Opera 8.0+, Safari
        xmlHttp = new XMLHttpRequest();
    } catch(e) {
        // Internet Explorer
        try {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch(e) {
            try {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch(e) {
                sweetAlert("糟糕", "你的浏览器不能上传文件", "error");
                return false;
            }
        }
    }
    return xmlHttp;
}
var t = 0;

function start() {
    if (t == 0) {
        document.querySelectorAll('.cont_letras > p')[0].style.left = '200px';
        document.querySelectorAll('.cont_letras > p')[1].style.left = '-320px';
        document.querySelectorAll('.cont_letras > p')[2].style.left = '200px';
        setTimeout(function() {
            document.querySelector('.cont_join').className = 'cont_join cont_join_form_act';
        },
        1000);
        t++;
        document.getElementById("butttt").innerHTML = "提交配置"
    } else {
        document.getElementById("butttt").innerHTML = "配置上传中"
		let hpp_domain=document.getElementById("hpp_domain").value==""?window.location.host:document.getElementById("hpp_domain").value;
		let hpp_username=document.getElementById("hpp_userimage").value==""?"https://cdn.jsdelivr.net/gh/ChenYFan/CDN@master/img/hpp_upload/1612610340000.jpg":document.getElementById("hpp_userimage").value;
		let hpp_title=document.getElementById("hpp_title").value==""?"HexoPlusPlus小飞机":document.getElementById("hpp_title").value;
		let hpp_usericon=document.getElementById("hpp_usericon").value==""?"https://cdn.jsdelivr.net/gh/HexoPlusPlus/CDN@master/doc_img/icon.png":document.getElementById("hpp_usericon").value;
		let hpp_cors=document.getElementById("hpp_cors").value==""?"*":document.getElementById("hpp_cors").value
		let hpp_autodate=document.getElementById("hpp_autodate").value==""?"False":document.getElementById("hpp_autodate").value
		let hpp_OwO=document.getElementById("hpp_OwO").value==""?"https://cdn.jsdelivr.net/gh/ChenYFan/CDN@master/assets/list.json":document.getElementById("hpp_OwO").value
		let hpp_back=document.getElementById("hpp_back").value==""?"https://cdn.jsdelivr.net/gh/ChenYFan-Tester/DailyGet@gh-pages/bingpic/bing.jpg":document.getElementById("hpp_back").value
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
			"hpp_githubdocpath":document.getElementById("hpp_githubdocpath").value,			
			"hpp_githubdocbranch":document.getElementById("hpp_githubdocbranch").value,
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
			"hpp_OwO":hpp_OwO,
			"hpp_back":hpp_back
			};
        var ajax = ajaxObject();
        ajax.open("post", '/hpp/admin/api/upconfig', true);
        ajax.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                if (ajax.status == 200) {
                    setTimeout(function() {
                        document.querySelector('.cont_join').className = 'cont_join cont_join_form_act cont_join_finish';
                    },
                    500);
					t++;
					document.querySelector('.cont_form_join').style.bottom = '-420px';
					setTimeout(window.location.reload(),5000)
                } else {
document.getElementById("butttt").innerHTML = "配置上传失败，请重试"
}
            }
        }
        ajax.send(JSON.stringify(config));

    }

}
