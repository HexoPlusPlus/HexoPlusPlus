const hpp_CDNver = "d89d2c6"
const hpp_ver = "HexoPlusPlus@0.1.1"
let hpp_errorhtml = `
<!DOCTYPE html>
<html lang="en" class="no-js">
	<head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta name="viewport" content="width=device-width, initial-scale=1"> 
        <title>HexoPlusPlusError</title>
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/dist/error.css" />
        <link href='http://fonts.googleapis.com/css?family=Raleway:200,400,800|Clicker+Script' rel='stylesheet' type='text/css'>
	</head>
	<body>
		<div class="container demo-2">
			<div class="content">
                <div id="large-header" class="large-header">
                    <canvas id="demo-canvas"></canvas>
                    <h1 class="main-title"><span>Error</span></h1>
                </div>
                <div class="codrops-header">
                    <h1>HexoPlusPlus <span>-错误：不知道你的目的是什么</span></h1>
                    <nav class="codrops-demos">
                        <a class="current-demo" href="/hpp/admin/dash">仪表盘</a>
                        <a class="current-demo" href="https://github.com/HexoPlusPlus/HexoPlusPlus">Github</a>
                    </nav>
                </div>
            </div>
		</div>
        <script src="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/dist/error.js"></script>
	</body>
</html>
`
let hpp_loginhtml = `
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
 <head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.4.1"></script>
  <title>后台</title>
  <style>
  .rv-root{
      z-index:999;
  }
  a:link { text-decoration: none;color: white}
　　 a:active { text-decoration:blink}
　　 a:hover { text-decoration:underline;color: white} 
　　 a:visited { text-decoration: none;color: white}
  </style>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/dist/login.css" /> 
 </head>
 <body>
  <div id="all">
   <div class="wrapper">
    <div class="bg-container">
     <div class="container">
      <h1 style="margin: 0;" id="bar">Welcome</h1>
      <form class="form" id="fm">
       <input id="username" type="text" placeholder="用户名" value="" name="username" />
       <input id="password" type="password" placeholder="密码" value="" name="password" />
       <button type="button" id="login-button">登录</button>
       <br />
       <br />
       <a href="https://github.com/HexoPlusPlus/HexoPlusPlus" id="tips" style="color: #fff;">@HexoPP</a>
      </form>
     </div>
    </div>
    <ul class="bg-bubbles">
     <li></li>
     <li></li>
     <li></li>
     <li></li>
     <li></li>
     <li></li>
     <li></li>
     <li></li>
     <li></li>
     <li></li>
    </ul>
   </div>
  </div>
  <script src="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/dist/md5.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/zpfz/RVerify.js/dist/RVerify.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/zpfz/RVerify.js/dist/RVerify.min.css"/>
  <script>
  RVerify.configure({
  mask: 0.5,
  maskClosable: true,
  title: '人机验证',
  album: ['/hpp/api/captchaimg']
})
  $("#login-button").click(function(event) {
RVerify.action(function(res){
if(res==1){
    document.cookie = "username=" + md5(document.getElementById("username").value);
    document.cookie = "password=" + md5(document.getElementById("password").value);
    window.location.href = '/hpp/admin/dash';
}
});

});
  </script>
  </body>
</html>
`
let hpp_installhtml = `<!doctype html>
<html lang="zh">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>${hpp_ver}安装</title>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/dist/install.css">
</head>
<body>
		<div class="cont_principal">
			
		  <div class="cont_join  ">
		    <div class="cont_letras">
		      <p>Hexo</p>
		      <p>Plus</p>
		      <p>plus</p>
		    </div>

		    <div class="cont_form_join" style="overflow-x: auto;">
		      <h2>安装信息</h2>
			  <h3>基本信息</h3>
		      <p>域名:</p>    
		      <input type="text" class="input_text" id="hpp_domain" value="xxx.xxx.com"/>
		      <p>头像地址:</p>    
		      <input type="text" class="input_text" id="hpp_userimage" value="https://cdn.jsdelivr.net/gh/ChenYFan/CDN/img/avatar.png"/>
		      <p>标题:</p>    
		      <input type="text" class="input_text" id="hpp_title" value="XXX的后台"/>
		      <p>icon地址:</p>    
		      <input type="text" class="input_text" id="hpp_usericon" value="https://cdn.jsdelivr.net/gh/ChenYFan/chenyfan.github.io/favicon.ico"/>
		      <p>跨域请求:</p>    
			  <input type="text" class="input_text" id="hpp_cors" value="*"/>
			  <h3>Github信息</h3>
		      <p>Github文档仓库Token:</p>    
		      <input type="text" class="input_text" id="hpp_githubdoctoken" value="*********"/>
			  <p>Github图片仓库Token:</p>    
		      <input type="text" class="input_text" id="hpp_githubimagetoken" value="*********"/>
			  <p>Github文档仓库用户名:</p>    
		      <input type="text" class="input_text" id="hpp_githubdocusername" value="XXX" />
			  <p>Github图片仓库用户名:</p>    
		      <input type="text" class="input_text" id="hpp_githubimageusername" value="XXX" />
			  <p>Github文档仓库名:</p>    
		      <input type="text" class="input_text" id="hpp_githubdocrepo" value="blog" />
			  <p>Github图片仓库名:</p>    
		      <input type="text" class="input_text" id="hpp_githubimagerepo" value="image" />
			  <p>Github文档仓库路径:</p>    
		      <input type="text" class="input_text" id="hpp_githubdocpath" value="/source/_posts/" />
			  <p>Github图片仓库路径:</p>    
		      <input type="text" class="input_text" id="hpp_githubimagepath" value="/" />
			  <p>Github文档仓库分支:</p>    
		      <input type="text" class="input_text" id="hpp_githubdocbranch" value="master" />
			  <p>Github图片仓库分支:</p>    
		      <input type="text" class="input_text" id="hpp_githubimagebranch" value="main" />
			  <h3>附加功能</h3>
			  <p>是否自动签到【是为True，否为False】:</p>    
		      <input type="text" class="input_text" id="hpp_autodate" value="False" />
		    </div>
		  
		    <div class="cont_join_form_finish">
		      <h2>完成</h2>  
		    </div>

		    <div class="cont_btn_join">
		      <a href="#" onclick='start()' id="butttt">开始配置</a>
		    </div>
		  </div>
		</div>
	</div>
	
	<script src="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/dist/install.js"></script>
</body>
</html>`

function getJsonLength(jsonData) {

    var jsonLength = 0;

    for (var item in jsonData) {

        jsonLength++;

    }

    return jsonLength;
}

addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request))
})
function getCookie(request, name) {
    let result = ""
    const cookieString = request.headers.get("Cookie")
    if (cookieString) {
        const cookies = cookieString.split(";")
        cookies.forEach(cookie => {
            const cookiePair = cookie.split("=", 2)
            const cookieName = cookiePair[0].trim()
            if (cookieName === name) {
                const cookieVal = cookiePair[1]
                result = cookieVal
            }
        })
    }
    return result
}
!function(n){"use strict";function d(n,t){var r=(65535&n)+(65535&t);return(n>>16)+(t>>16)+(r>>16)<<16|65535&r}function f(n,t,r,e,o,u){return d((c=d(d(t,n),d(e,u)))<<(f=o)|c>>>32-f,r);var c,f}function l(n,t,r,e,o,u,c){return f(t&r|~t&e,n,t,o,u,c)}function v(n,t,r,e,o,u,c){return f(t&e|r&~e,n,t,o,u,c)}function g(n,t,r,e,o,u,c){return f(t^r^e,n,t,o,u,c)}function m(n,t,r,e,o,u,c){return f(r^(t|~e),n,t,o,u,c)}function i(n,t){var r,e,o,u;n[t>>5]|=128<<t%32,n[14+(t+64>>>9<<4)]=t;for(var c=1732584193,f=-271733879,i=-1732584194,a=271733878,h=0;h<n.length;h+=16)c=l(r=c,e=f,o=i,u=a,n[h],7,-680876936),a=l(a,c,f,i,n[h+1],12,-389564586),i=l(i,a,c,f,n[h+2],17,606105819),f=l(f,i,a,c,n[h+3],22,-1044525330),c=l(c,f,i,a,n[h+4],7,-176418897),a=l(a,c,f,i,n[h+5],12,1200080426),i=l(i,a,c,f,n[h+6],17,-1473231341),f=l(f,i,a,c,n[h+7],22,-45705983),c=l(c,f,i,a,n[h+8],7,1770035416),a=l(a,c,f,i,n[h+9],12,-1958414417),i=l(i,a,c,f,n[h+10],17,-42063),f=l(f,i,a,c,n[h+11],22,-1990404162),c=l(c,f,i,a,n[h+12],7,1804603682),a=l(a,c,f,i,n[h+13],12,-40341101),i=l(i,a,c,f,n[h+14],17,-1502002290),c=v(c,f=l(f,i,a,c,n[h+15],22,1236535329),i,a,n[h+1],5,-165796510),a=v(a,c,f,i,n[h+6],9,-1069501632),i=v(i,a,c,f,n[h+11],14,643717713),f=v(f,i,a,c,n[h],20,-373897302),c=v(c,f,i,a,n[h+5],5,-701558691),a=v(a,c,f,i,n[h+10],9,38016083),i=v(i,a,c,f,n[h+15],14,-660478335),f=v(f,i,a,c,n[h+4],20,-405537848),c=v(c,f,i,a,n[h+9],5,568446438),a=v(a,c,f,i,n[h+14],9,-1019803690),i=v(i,a,c,f,n[h+3],14,-187363961),f=v(f,i,a,c,n[h+8],20,1163531501),c=v(c,f,i,a,n[h+13],5,-1444681467),a=v(a,c,f,i,n[h+2],9,-51403784),i=v(i,a,c,f,n[h+7],14,1735328473),c=g(c,f=v(f,i,a,c,n[h+12],20,-1926607734),i,a,n[h+5],4,-378558),a=g(a,c,f,i,n[h+8],11,-2022574463),i=g(i,a,c,f,n[h+11],16,1839030562),f=g(f,i,a,c,n[h+14],23,-35309556),c=g(c,f,i,a,n[h+1],4,-1530992060),a=g(a,c,f,i,n[h+4],11,1272893353),i=g(i,a,c,f,n[h+7],16,-155497632),f=g(f,i,a,c,n[h+10],23,-1094730640),c=g(c,f,i,a,n[h+13],4,681279174),a=g(a,c,f,i,n[h],11,-358537222),i=g(i,a,c,f,n[h+3],16,-722521979),f=g(f,i,a,c,n[h+6],23,76029189),c=g(c,f,i,a,n[h+9],4,-640364487),a=g(a,c,f,i,n[h+12],11,-421815835),i=g(i,a,c,f,n[h+15],16,530742520),c=m(c,f=g(f,i,a,c,n[h+2],23,-995338651),i,a,n[h],6,-198630844),a=m(a,c,f,i,n[h+7],10,1126891415),i=m(i,a,c,f,n[h+14],15,-1416354905),f=m(f,i,a,c,n[h+5],21,-57434055),c=m(c,f,i,a,n[h+12],6,1700485571),a=m(a,c,f,i,n[h+3],10,-1894986606),i=m(i,a,c,f,n[h+10],15,-1051523),f=m(f,i,a,c,n[h+1],21,-2054922799),c=m(c,f,i,a,n[h+8],6,1873313359),a=m(a,c,f,i,n[h+15],10,-30611744),i=m(i,a,c,f,n[h+6],15,-1560198380),f=m(f,i,a,c,n[h+13],21,1309151649),c=m(c,f,i,a,n[h+4],6,-145523070),a=m(a,c,f,i,n[h+11],10,-1120210379),i=m(i,a,c,f,n[h+2],15,718787259),f=m(f,i,a,c,n[h+9],21,-343485551),c=d(c,r),f=d(f,e),i=d(i,o),a=d(a,u);return[c,f,i,a]}function a(n){for(var t="",r=32*n.length,e=0;e<r;e+=8)t+=String.fromCharCode(n[e>>5]>>>e%32&255);return t}function h(n){var t=[];for(t[(n.length>>2)-1]=void 0,e=0;e<t.length;e+=1)t[e]=0;for(var r=8*n.length,e=0;e<r;e+=8)t[e>>5]|=(255&n.charCodeAt(e/8))<<e%32;return t}function e(n){for(var t,r="0123456789abcdef",e="",o=0;o<n.length;o+=1)t=n.charCodeAt(o),e+=r.charAt(t>>>4&15)+r.charAt(15&t);return e}function r(n){return unescape(encodeURIComponent(n))}function o(n){return a(i(h(t=r(n)),8*t.length));var t}function u(n,t){return function(n,t){var r,e,o=h(n),u=[],c=[];for(u[15]=c[15]=void 0,16<o.length&&(o=i(o,8*n.length)),r=0;r<16;r+=1)u[r]=909522486^o[r],c[r]=1549556828^o[r];return e=i(u.concat(h(t)),512+8*t.length),a(i(c.concat(e),640))}(r(n),r(t))}function t(n,t,r){return t?r?u(t,n):e(u(t,n)):r?o(n):e(o(n))}"function"==typeof define&&define.amd?define(function(){return t}):"object"==typeof module&&module.exports?module.exports=t:n.md5=t}(this);
async function handleRequest(request) {

    /*!!!!!!高危，无权限，仅供测试
    var hpp_logstatus = 1
    */
    var hpp_logstatus = 0
    const req = request
    const urlStr = req.url
    const urlObj = new URL(urlStr)
    const path = urlObj.href.substr(urlObj.origin.length)
    const domain = (urlStr.split('/'))[2]
    if (getCookie(request, "password") == md5(hpp_password) && getCookie(request, "username") == md5(hpp_username)) {
        hpp_logstatus = 1
    }
    if (path.startsWith('/hpp/admin')) {
        if (hpp_logstatus == 1) {
            const hpp_config = await KVNAME.get("hpp_config");
            if (hpp_config === null) {
                if (path == '/hpp/admin/api/upconfig') {
                    const config_r = JSON.stringify(await request.text())
                    await KVNAME.put("hpp_config", config_r)
                    return new Response("OK")
                } else {
                    return new Response(hpp_installhtml, {
                        headers: { "content-type": "text/html;charset=UTF-8" }
                    })
                }
            } else {

                const config = JSON.parse(JSON.parse(hpp_config))
                const hpp_domain = config["hpp_domain"]
                const hpp_userimage = config["hpp_userimage"]
                const hpp_title = config["hpp_title"]
                const hpp_usericon = config["hpp_usericon"]
                const hpp_cors = config["hpp_cors"]
                const hpp_githubdoctoken = config["hpp_githubdoctoken"]
                const hpp_githubimagetoken = config["hpp_githubimagetoken"]
                const hpp_githubdocusername = config["hpp_githubdocusername"]
                const hpp_githubdocrepo = config["hpp_githubdocrepo"]
                const hpp_githubdocpath = config["hpp_githubdocpath"]
                const hpp_githubdocbranch = config["hpp_githubdocbranch"]
                const hpp_githubimageusername = config["hpp_githubimageusername"]
                const hpp_githubimagerepo = config["hpp_githubimagerepo"]
                const hpp_githubimagepath = config["hpp_githubimagepath"]
                const hpp_githubimagebranch = config["hpp_githubimagebranch"]
                const hpp_autodate = config["hpp_autodate"]
                if (hpp_autodate == "True") {
                    const now = Date.now(new Date())
                    await KVNAME.put("hpp_activetime", now)
                    const hpp_kvwait = Date.now(new Date()) - now
                }
                const hpp_githubgetimageinit = {
                    method: "GET",
                    headers: {
                        "content-type": "application/json;charset=UTF-8",
                        "user-agent": hpp_ver,
                        "Authorization": "token " + hpp_githubimagetoken
                    },
                }
                const hpp_githubgetdocinit = {
                    method: "GET",
                    headers: {
                        "content-type": "application/json;charset=UTF-8",
                        "user-agent": hpp_ver,
                        "Authorization": "token " + hpp_githubdoctoken
                    },
                }


                const hpp_adminhtml = `

<!doctype html>
<html lang="zh">
<head>
	<meta charset="UTF-8">                                  
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>${hpp_title}</title>
	<script src="https://cdn.jsdelivr.net/npm/jquery@2.2.4"></script>
	<link href="https://cdn.jsdelivr.net/npm/font-awesome@4.4.0/css/font-awesome.min.css" rel="stylesheet">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.6/dist/css/bootstrap.min.css">  
	<link rel="shortcut icon" href="${hpp_usericon}" type="image/x-icon" />
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/indrimuska/jquery-editable-select/dist/jquery-editable-select.min.css">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/dist/admin.css">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@3.3.6/dist/js/bootstrap.min.js"></script>
	<script src="https://cdn.jsdelivr.net/gh/markusslima/bootstrap-filestyle@gh-pages/1.2.3/js/bootstrap-filestyle.min.js"></script>
	
		</head>
<body>
	
		<div class="container pb30">
			<div class="clear-backend">
			<div class="avatar">
				<div>
					<a href="/" target="_blank">
						<img src="${hpp_userimage}" alt="">
					</a>
				</div>
			</div>

			<!-- tab-menu -->
			<input type="radio" class="tab-1" name="tab" checked="checked">
			<span>主页</span><i class="fa fa-home"></i>

			<input type="radio" class="tab-2" name="tab">
			<span>书写</span><i class="fa fa-medium"></i>
	
			<input type="radio" class="tab-5" name="tab">
			<span>信息</span><i class="fa fa-info"></i>
	<!--			
			<input type="radio" class="tab-7" name="tab">
			<span>--</span><i class="fa fa-photo"></i>
			
			<input type="radio" class="tab-8" name="tab">
			<span>--</span><i class="fa fa-line-chart"></i>
			
			<input type="radio" class="tab-9" name="tab">
			<span>--</span><i class="fa fa-link"></i>
			
			<input type="radio" class="tab-10" name="tab">
			<span>--</span><i class="fa fa-cog"></i>
-->
			<div class="top-bar">
				<ul>
					<li>
						<a href="javascript:hpp_logout()" title="Log Out">
							<i class="fa fa-sign-out"></i>
						</a>
					</li>
					<li>
						<a href="javascript:jQuery.getScript\(\'https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@main/update.js\'\)" title="Update">
							<i class="fa fa-upload"></i>
						</a>
					</li>
					<li>
						<a href="javascript:kick()" title="签到">
							<i class="fa fa-paper-plane"></i>
						</a>
					</li>
				</ul>
			</div>

			<!-- tab-content -->
			<div class="tab-content">
				<section class="tab-item-1">
                <h1 style="text-align: center;">Hi~ o(*￣▽￣*)ブ</h1>
                <h1 style="text-align: center;">欢迎使用HexoPlusPlus</h1>
                <div style="text-align: center;">
                
					<button type="button" class="btn btn-primary" onclick="location.href='/hpp/admin/docsmanager'">文档资源管理</button>
				<button type="button" class="btn btn-primary" onclick="location.href='/hpp/admin/imgsmanager'">图片资源管理</button>
                </div>
<div style="text-align: center;">
                
					<button type="button" class="btn btn-warning" onclick="location.href='https://github.com/HexoPlusPlus/HexoPlusPlus'">Github</button>
				<button type="button" class="btn btn-warning" onclick="location.href='https://hexoplusplus.js.org/'">文档</button>
                <button type="button" class="btn btn-success" onclick="location.href='https://jq.qq.com/?_wv=1027&k=rAcnhzqK'">QQ群</button>
                </div>
				</section>
				<section class="tab-item-2">
				
				<select id="choo" class="form-control form-control-chosen" style="display: inline;"></select>
<button onclick="getdoc();" class="btn-sm btn btn-success">GET</button>

					<div class="markdown_editor" style="position: initial;">
				<textarea id="mdeditor" name="content" rows="10"></textarea>
                <form id="upform" enctype='multipart/form-data' style="display:none;">
    <div class="form-group">
        <label for="upteainput">上传文件</label>
        <input type="file" id="input">
    </div>
</form>
			</div>
				</section>
				<section class="tab-item-3">
				</section>
				<section class="tab-item-4">
                </section>
				<section class="tab-item-5">
				
					<table class="table table-striped">
  <caption>后端信息表</caption>
  <thead>
    <tr>
      <th>目标</th>
      <th>键值</th>
    </tr>
  </thead>
  <tbody>
  <tr>
      <td>当前版本</td>
      <td>${hpp_ver}</td>
    </tr>
    <tr>
      <td>绑定的域名</td>
      <td>${hpp_domain}</td>
    </tr>
    <tr>
      <td>用户头像</td>
      <td>${hpp_userimage}</td>
    </tr>
    <tr>
      <td>用户icon</td>
      <td>${hpp_usericon}</td>
    </tr>
    <tr>
      <td>跨域</td>
      <td>${hpp_cors}</td>
    </tr>
    <tr>
      <td>CDN版本</td>
      <td>${hpp_CDNver}</td>
    </tr>
    <tr>
      <td>Github文档存储用户名</td>
      <td>${hpp_githubdocusername}</td>
    </tr>
    <tr>
      <td>Github文档存储仓库名</td>
      <td>${hpp_githubdocrepo}</td>
    </tr>
    <tr>
      <td>Github文档存储路径</td>
      <td>${hpp_githubdocpath}</td>
    </tr>
    <tr>
      <td>Github文档存储分支</td>
      <td>${hpp_githubdocbranch}</td>
    </tr>
    <tr>
      <td>Github图片存储用户名</td>
      <td>${hpp_githubimageusername}</td>
    </tr>
    <tr>
      <td>Github图片存储仓库名</td>
      <td>${hpp_githubimagerepo}</td>
    </tr>
    <tr>
      <td>Github图片存储路径</td>
      <td>${hpp_githubimagepath}</td>
    </tr>
    <tr>
      <td>Github图片存储分支</td>
      <td>${hpp_githubimagebranch}</td>
    </tr>
    <tr>
      <td>CDN节点位置</td>
      <td id="cdn"></td>
    </tr>
     <tr>
      <td>用户IP</td>
      <td id="ip"></td>
    </tr>
    <tr>
      <td>User-Agent</td>
      <td id="uag"></td>
    </tr>
    <tr>
      <td>是否以HTTPS方式连接</td>
      <td id="httpos"></td>
    </tr>
    <tr>
      <td>HTTP连接版本</td>
      <td id="http"></td>
    </tr>
    <tr>
      <td>用户所处地区</td>
      <td id="loc"></td>
    </tr>
    <tr>
      <td>SSL版本</td>
      <td id="tls"></td>
    </tr>
    <tr>
      <td>是否使用Warp</td>
      <td id="warp"></td>
    </tr>
  </tbody>
</table>
				</section>
				<section class="tab-item-6">
					<h1>Six</h1>
				</section>
				<section class="tab-item-7">
					<h1>Sever</h1>
				</section>
				<section class="tab-item-8">
					<h1>Eight</h1>
				</section>
				<section class="tab-item-9">
					<h1>Nine</h1>
				</section>
				<section class="tab-item-10">
					<h1>Ten</h1>
				</section>
			</div>
		</div>
	
	<script>
    const hpp_now= '${hpp_ver}';
    const hpp_ver = '${hpp_ver}';
	function hpp_logout(){
	document.cookie="username=";  document.cookie="password=";  location.reload();
	};
	</script>
	<script src="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/dist/bm.js"></script>
	<script src="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/dist/bm.zh.js"></script>
	
	<script src="https://cdn.jsdelivr.net/gh/indrimuska/jquery-editable-select/dist/jquery-editable-select.min.js"></script>
	<script src="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/dist/admin.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/sweetalert/dist/sweetalert.min.js"></script>
	
</body>
</html>
`
                const hpp_filemanager_p1 = `<!DOCTYPE html>
<html lang="zh">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/dist/filemanager.css" />
	<link rel="shortcut icon" href="${hpp_usericon}" type="image/x-icon" />
`
                const hpp_filemanager_docs1 = `
	<title>${hpp_title}-文档资源管理器</title>
	<script>
	const hpp_githubdocusername = "${hpp_githubdocusername}"
	const hpp_githubdocrepo = "${hpp_githubdocrepo}"
	const hpp_githubdocpath = "${hpp_githubdocpath}"
	const hpp_githubdocbranch = "${hpp_githubdocbranch}"
	</script>
`
                const hpp_filemanager_img1 = `
	<title>${hpp_title}-图片资源管理器</title>
	<script>
	const hpp_githubimageusername = "${hpp_githubimageusername}"
	const hpp_githubimagerepo = "${hpp_githubimagerepo}"
	const hpp_githubimagepath = "${hpp_githubimagepath}"
	const hpp_githubimagebranch = "${hpp_githubimagebranch}"
	</script>
`
                const hpp_filemanager_p2 = `

</head>
<body>
    <div class="loader">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>

    <aside class="sidebar">
      <div class="logo">
        <a href="/hpp/admin">←</a>
      </div>
    </aside>
    <section class="grid-holder">
      <div class="grid-list-layout">
        <nav class="navigation">
        </nav>
        
        <div class="grid-list-holder">
          <span class="grid-layout active">
          <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
          <g>
            <g>
              <path d="M176.792,0H59.208C26.561,0,0,26.561,0,59.208v117.584C0,209.439,26.561,236,59.208,236h117.584
                C209.439,236,236,209.439,236,176.792V59.208C236,26.561,209.439,0,176.792,0z M196,176.792c0,10.591-8.617,19.208-19.208,19.208
                H59.208C48.617,196,40,187.383,40,176.792V59.208C40,48.617,48.617,40,59.208,40h117.584C187.383,40,196,48.617,196,59.208
                V176.792z"/>
            </g>
          </g>
          <g>
            <g>
              <path d="M452,0H336c-33.084,0-60,26.916-60,60v116c0,33.084,26.916,60,60,60h116c33.084,0,60-26.916,60-60V60
                C512,26.916,485.084,0,452,0z M472,176c0,11.028-8.972,20-20,20H336c-11.028,0-20-8.972-20-20V60c0-11.028,8.972-20,20-20h116
                c11.028,0,20,8.972,20,20V176z"/>
            </g>
          </g>
          <g>
            <g>
              <path d="M176.792,276H59.208C26.561,276,0,302.561,0,335.208v117.584C0,485.439,26.561,512,59.208,512h117.584
                C209.439,512,236,485.439,236,452.792V335.208C236,302.561,209.439,276,176.792,276z M196,452.792
                c0,10.591-8.617,19.208-19.208,19.208H59.208C48.617,472,40,463.383,40,452.792V335.208C40,324.617,48.617,316,59.208,316h117.584
                c10.591,0,19.208,8.617,19.208,19.208V452.792z"/>
            </g>
          </g>
          <g>
            <g>
              <path d="M452,276H336c-33.084,0-60,26.916-60,60v116c0,33.084,26.916,60,60,60h116c33.084,0,60-26.916,60-60V336
                C512,302.916,485.084,276,452,276z M472,452c0,11.028-8.972,20-20,20H336c-11.028,0-20-8.972-20-20V336c0-11.028,8.972-20,20-20
                h116c11.028,0,20,8.972,20,20V452z"/>
            </g>
          </g>
          <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g>
          </svg>
        </span>
          <span class="list-layout">
          <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
    <g>
      <g>
        <path d="M100.923,0C64.276,0,34.462,29.814,34.462,66.462s29.814,66.462,66.462,66.462c36.647,0,66.462-29.814,66.462-66.462
          S137.57,0,100.923,0z M100.923,103.385C80.563,103.385,64,86.821,64,66.462s16.563-36.923,36.923-36.923
          c20.36,0,36.923,16.563,36.923,36.923S121.283,103.385,100.923,103.385z"/>
      </g>
    </g>
    <g>
      <g>
        <path d="M462.769,22.154h-256c-8.157,0-14.769,6.613-14.769,14.769V96c0,8.157,6.613,14.769,14.769,14.769h256
          c8.157,0,14.769-6.613,14.769-14.769V36.923C477.538,28.767,470.926,22.154,462.769,22.154z M448,81.231H221.538V51.692H448
          V81.231z"/>
      </g>
    </g>
    <g>
      <g>
        <path d="M100.923,189.538c-36.647,0-66.462,29.814-66.462,66.462s29.814,66.462,66.462,66.462
          c36.647,0,66.462-29.814,66.462-66.462S137.57,189.538,100.923,189.538z M100.923,292.923C80.563,292.923,64,276.36,64,256
          s16.563-36.923,36.923-36.923c20.36,0,36.923,16.563,36.923,36.923S121.283,292.923,100.923,292.923z"/>
      </g>
    </g>
    <g>
      <g>
        <path d="M462.769,211.692h-256c-8.157,0-14.769,6.613-14.769,14.769v59.077c0,8.157,6.613,14.769,14.769,14.769h256
          c8.157,0,14.769-6.613,14.769-14.769v-59.077C477.538,218.305,470.926,211.692,462.769,211.692z M448,270.769H221.538v-29.538H448
          V270.769z"/>
      </g>
    </g>
    <g>
      <g>
        <path d="M100.923,379.077c-36.647,0-66.462,29.814-66.462,66.462S64.276,512,100.923,512c36.647,0,66.462-29.814,66.462-66.462
          S137.57,379.077,100.923,379.077z M100.923,482.462c-20.36,0-36.923-16.563-36.923-36.923c0-20.36,16.563-36.923,36.923-36.923
          c20.36,0,36.923,16.563,36.923,36.923C137.846,465.898,121.283,482.462,100.923,482.462z"/>
      </g>
    </g>
    <g>
      <g>
        <path d="M462.769,401.231h-256c-8.157,0-14.769,6.613-14.769,14.769v59.077c0,8.157,6.613,14.769,14.769,14.769h256
          c8.157,0,14.769-6.613,14.769-14.769V416C477.538,407.843,470.926,401.231,462.769,401.231z M448,460.308H221.538v-29.538H448
          V460.308z"/>
      </g>
    </g>
    <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g>
          </svg>
        </span>
        </div>
      </div>
      <div class="grid masonry" id="item-all">     
      </div>
    </section>
	<script src="https://cdn.jsdelivr.net/npm/jquery@2.2.4" type="text/javascript"></script>
`
                const hpp_filemanager_docs2 = `
<script src="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/dist/filemanager.js"></script>
</body>
</html>`
                const hpp_filemanager_img2 = `
<script src="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/dist/imgmanager.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery-lazy@1.7.11/jquery.lazy.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery-lazy@1.7.11/jquery.lazy.plugins.min.js"></script>
</body>
</html>`


                const hpp_filemanager_docs = hpp_filemanager_p1 + hpp_filemanager_docs1 + hpp_filemanager_p2 + hpp_filemanager_docs2
                const hpp_filemanager_img = hpp_filemanager_p1 + hpp_filemanager_img1 + hpp_filemanager_p2 + hpp_filemanager_img2
                if (path == '/hpp/admin/api/kick') {

                    const now = Date.now(new Date())
                    await KVNAME.put("hpp_activetime", now)
                    const hpp_kvwait = Date.now(new Date()) - now
                    return new Response("OK")
                }
                if (path == '/hpp/admin/docsmanager') {
                    return new Response(hpp_filemanager_docs, {
                        headers: { "content-type": "text/html;charset=UTF-8" }
                    })
                }
                if (path == '/hpp/admin/imgsmanager') {
                    return new Response(hpp_filemanager_img, {
                        headers: { "content-type": "text/html;charset=UTF-8" }
                    })
                }
                if (path.startsWith("/hpp/admin/api/adddoc/")) {
                    const file = await request.text()
                    const filename = path.substr(("/hpp/admin/api/adddoc/").length)
                    const url = `https://api.github.com/repos/${hpp_githubdocusername}/${hpp_githubdocrepo}/contents${hpp_githubdocpath}${filename}`
                    const hpp_sha = (JSON.parse(await (await fetch(url, hpp_githubgetdocinit)).text())).sha
                    const hpp_body = {
                        branch: hpp_githubdocbranch, message: `Upload from ${hpp_ver} By ${hpp_githubdocusername}`, content: file, sha: hpp_sha
                    }
                    const hpp_docputinit = {
                        body: JSON.stringify(hpp_body),
                        method: "PUT",
                        headers: {
                            "content-type": "application/json;charset=UTF-8",
                            "user-agent": hpp_ver,
                            "Authorization": "token " + hpp_githubdoctoken
                        }
                    }
                    const hpp_r = await fetch(url, hpp_docputinit)
                    const hpp_r_s = await hpp_r.status
                    if (hpp_r_s == 200 || hpp_r_s == 201) {
                        return new Response('Update Success', { status: hpp_r_s })
                    } else {
                        return new Response('Fail To Update', { status: hpp_r_s })
                    }

                }
                if (path.startsWith("/hpp/admin/api/addimage")) {
                    const file = await request.text()
                    const hpp_time = Date.parse(new Date())
                    const filename = path.substr(("/hpp/admin/api/addimage/").length)
                    const url = `https://api.github.com/repos/${hpp_githubimageusername}/${hpp_githubimagerepo}/contents${hpp_githubimagepath}${hpp_time}.${filename}`
                    const hpp_body = {
                        branch: hpp_githubimagebranch, message: `Upload from ${hpp_ver} By ${hpp_githubimageusername}`, content: file
                    }
                    const hpp_imageputinit = {
                        body: JSON.stringify(hpp_body),
                        method: "PUT",
                        headers: {
                            "content-type": "application/json;charset=UTF-8",
                            "user-agent": hpp_ver,
                            "Authorization": "token " + hpp_githubimagetoken
                        }
                    }
                    const hpp_r = await fetch(url, hpp_imageputinit)
                    const hpp_r_s = await hpp_r.status
                    if (hpp_r_s == 200 || hpp_r_s == 201) {
                        return new Response(`https://cdn.jsdelivr.net/gh/${hpp_githubimageusername}/${hpp_githubimagerepo}@${hpp_githubimagebranch}${hpp_githubimagepath}${hpp_time}.${filename}`, { status: hpp_r_s })
                    } else {
                        return new Response(`Fail To Upload Image`, { status: hpp_r_s })
                    }
                }
                if (path.startsWith("/hpp/admin/api/deldoc")) {
                    const filename = path.substr(("/hpp/admin/api/deldoc/").length)
                    const url = `https://api.github.com/repos/${hpp_githubdocusername}/${hpp_githubdocrepo}/contents${hpp_githubdocpath}${filename}`
                    const hpp_sha = (JSON.parse(await (await fetch(url, hpp_githubgetdocinit)).text())).sha
                    const hpp_body = {
                        branch: hpp_githubdocbranch, message: `Delete from ${hpp_ver} By ${hpp_githubdocusername}`, sha: hpp_sha
                    }
                    const hpp_docputinit = {
                        body: JSON.stringify(hpp_body),
                        method: "DELETE",
                        headers: {
                            "content-type": "application/json;charset=UTF-8",
                            "user-agent": hpp_ver,
                            "Authorization": "token " + hpp_githubdoctoken
                        }
                    }
                    const hpp_r = await fetch(url, hpp_docputinit)
                    const hpp_r_s = await hpp_r.status
                    if (hpp_r_s == 200) {
                        return new Response('Delete Success', { status: hpp_r_s })
                    } else {
                        return new Response('Fail To Delete doc', { status: hpp_r_s })
                    }
                }
                if (path.startsWith("/hpp/admin/api/delimage")) {
                    const filepath = hpp_githubimagepath.substr(0, (hpp_githubimagepath).length - 1)
                    const listurl = `https://api.github.com/repos/${hpp_githubimageusername}/${hpp_githubimagerepo}/contents${filepath}?ref=${hpp_githubimagebranch}`
                    const filename = path.substr(("/hpp/admin/api/delimage/").length)
                    const url = `https://api.github.com/repos/${hpp_githubimageusername}/${hpp_githubimagerepo}/contents${hpp_githubimagepath}${filename}?ref=${hpp_githubimagebranch}`
                    const hpp_re = (JSON.parse(await (await fetch(listurl, hpp_githubgetimageinit)).text()))
                    console.log(hpp_re)
                    let hpp_sha = ""
                    for (var i = 0; i < getJsonLength(hpp_re); i++) {
                        if (hpp_re[i]["name"] == filename) {
                            hpp_sha = hpp_re[i]["sha"]
                            break
                        }
                    }
                    console.log(hpp_sha)
                    const hpp_body = {
                        branch: hpp_githubimagebranch, message: `Delete from ${hpp_ver} By ${hpp_githubdocusername}`, sha: hpp_sha
                    }
                    const hpp_imageputinit = {
                        body: JSON.stringify(hpp_body),
                        method: "DELETE",
                        headers: {
                            "content-type": "application/json;charset=UTF-8",
                            "user-agent": hpp_ver,
                            "Authorization": "token " + hpp_githubimagetoken
                        }
                    }
                    const hpp_r = await fetch(url, hpp_imageputinit)
                    const hpp_r_s = await hpp_r.status
                    if (hpp_r_s == 200) {
                        return new Response('Delete Success', { status: hpp_r_s })
                    } else {
                        return new Response('Fail To Delete Image', { status: hpp_r_s })
                    }
                }
                if (path.startsWith("/hpp/admin/api/getdoc")) {
                    const filename = path.substr(("/hpp/admin/api/getdoc/").length)
                    return (fetch(`https://raw.githubusercontent.com/${hpp_githubdocusername}/${hpp_githubdocrepo}/${hpp_githubdocbranch}${hpp_githubdocpath}${filename}?ref=${hpp_githubdocbranch}`))
                }
                if (path == "/hpp/admin/api/getlist") {
                    const filepath = hpp_githubdocpath.substr(0, (hpp_githubdocpath).length - 1)
                    const url = `https://api.github.com/repos/${hpp_githubdocusername}/${hpp_githubdocrepo}/contents${filepath}?ref=${hpp_githubdocbranch}`
                    const hpp_getlist = await fetch(url, hpp_githubgetdocinit)
                    return new Response(await (hpp_getlist).text(), {
                        headers: {
                            "content-type": "application/json;charset=UTF-8",
                            "Access-Control-Allow-Origin": hpp_cors
                        }
                    })
                }
                if (path == "/hpp/admin/api/getimglist") {
                    const filepath = hpp_githubimagepath.substr(0, (hpp_githubimagepath).length - 1)
                    const url = `https://api.github.com/repos/${hpp_githubimageusername}/${hpp_githubimagerepo}/contents${filepath}?ref=${hpp_githubimagebranch}`
                    const hpp_getlist = await fetch(url, hpp_githubgetimageinit)
                    return new Response(await (hpp_getlist).text(), {
                        headers: {
                            "content-type": "application/json;charset=UTF-8",
                            "Access-Control-Allow-Origin": hpp_cors
                        }
                    })
                }
                if (path == "/hpp/admin/api/addtalk") {
                    const hpp_talk = JSON.parse(await KVNAME.get("hpp_talk_data"));
                    var hpp_talk_id = JSON.parse(await KVNAME.get("hpp_talk_id"));
                    hpp_talk_id++;
                    const now = await request.json()
                    const add = {
                        id: hpp_talk_id,
                        time: now[0]["time"],
                        name: now[0]["name"],
                        avatar: now[0]["avatar"],
                        content: now[0]["content"]
                    }
                    hpp_talk.push(add);
                    await KVNAME.put("hpp_talk_data", JSON.stringify(hpp_talk))
                    await KVNAME.put("hpp_talk_id", hpp_talk_id)
                    return new Response('OK')
                }
                if (path == "/hpp/admin/api/deltalk") {
                    const hpp_talk = JSON.parse(await KVNAME.get("hpp_talk_data"));
                    const now = Number(await request.text())
                    for (var i = 0; i < getJsonLength(hpp_talk); i++) {
                        if (Number(hpp_talk[i]["id"]) == now) {
                            hpp_talk.pop(i)
                        }
                    }
                    await KVNAME.put("hpp_talk_data", JSON.stringify(hpp_talk))
                    return new Response('OK')
                }
                if (path == "/hpp/admin/dash") {
                    return new Response(hpp_adminhtml, {
                        headers: { "content-type": "text/html;charset=UTF-8" }
                    })
                }

            }
        }
        else {
            if (path == '/hpp/admin/login') {
                return new Response(hpp_loginhtml, {
                    headers: { "content-type": "text/html;charset=UTF-8" }
                })
            }

            return Response.redirect('https://' + domain + '/hpp/admin/login', 302)
        }
        return Response.redirect('https://' + domain + '/hpp/admin/dash', 302)
    }
    if (path.startsWith('/hpp/api')) {
        if (path == "/hpp/api/getblogeractive") {
            const hpp_activetime = await KVNAME.get("hpp_activetime")
            var k = (Date.parse(new Date()) - hpp_activetime) / 1000
            if (k < 30) {
                return new Response('document.getElementById("bloggeractivetime").innerHTML=\'博主刚刚还在这儿呢\'', { headers: { headers: "content-type: application/javascript; charset=utf-8" } })
            }
            if (k < 60) {
                return new Response('document.getElementById("bloggeractivetime").innerHTML=\'博主在' + k + '秒前离开这儿\'', { headers: { headers: "content-type: application/javascript; charset=utf-8" } })
            }
            if (k < 3600) {
                return new Response('document.getElementById("bloggeractivetime").innerHTML=\'博主在' + Math.round(k / 60) + '分钟前偷偷瞄了一眼博客\'', { headers: { headers: "content-type: application/javascript; charset=utf-8" } })
            }
            if (k < 86400) {
                return new Response('document.getElementById("bloggeractivetime").innerHTML=\'博主在' + Math.round(k / 3600) + '小时前活跃了一次\'', { headers: { headers: "content-type: application/javascript; charset=utf-8" } })
            }
            return new Response(hpp_activetime)
        }
        if (path == "/hpp/api/captchaimg") {
            let url = "https://thispersondoesnotexist.com/image"
            let request = new Request(url);
            return (
                fetch(request)
            );

        }
        if (path == "/hpp/api/gethpptalk") {
            const hpp_talk = await KVNAME.get("hpp_talk_data");
            return new Response(hpp_talk)
        }
        return new Response(hpp_errorhtml, {
            headers: { "content-type": "text/html;charset=UTF-8" }
        })
    }
    return new Response(hpp_errorhtml, {
        headers: { "content-type": "text/html;charset=UTF-8" }
    })
}
