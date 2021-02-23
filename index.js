//const md5=require ('md5')

//开发者请将上述依赖注释去除

const hpp_CDNver = "d4051c3"
const hpp_ver = "HexoPlusPlus@1.2.0"
const dev_mode_branch = "dist"
let hpp_logstatus = 0


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
!function (n) { "use strict"; function d(n, t) { var r = (65535 & n) + (65535 & t); return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r } function f(n, t, r, e, o, u) { return d((c = d(d(t, n), d(e, u))) << (f = o) | c >>> 32 - f, r); var c, f } function l(n, t, r, e, o, u, c) { return f(t & r | ~t & e, n, t, o, u, c) } function v(n, t, r, e, o, u, c) { return f(t & e | r & ~e, n, t, o, u, c) } function g(n, t, r, e, o, u, c) { return f(t ^ r ^ e, n, t, o, u, c) } function m(n, t, r, e, o, u, c) { return f(r ^ (t | ~e), n, t, o, u, c) } function i(n, t) { var r, e, o, u; n[t >> 5] |= 128 << t % 32, n[14 + (t + 64 >>> 9 << 4)] = t; for (var c = 1732584193, f = -271733879, i = -1732584194, a = 271733878, h = 0; h < n.length; h += 16)c = l(r = c, e = f, o = i, u = a, n[h], 7, -680876936), a = l(a, c, f, i, n[h + 1], 12, -389564586), i = l(i, a, c, f, n[h + 2], 17, 606105819), f = l(f, i, a, c, n[h + 3], 22, -1044525330), c = l(c, f, i, a, n[h + 4], 7, -176418897), a = l(a, c, f, i, n[h + 5], 12, 1200080426), i = l(i, a, c, f, n[h + 6], 17, -1473231341), f = l(f, i, a, c, n[h + 7], 22, -45705983), c = l(c, f, i, a, n[h + 8], 7, 1770035416), a = l(a, c, f, i, n[h + 9], 12, -1958414417), i = l(i, a, c, f, n[h + 10], 17, -42063), f = l(f, i, a, c, n[h + 11], 22, -1990404162), c = l(c, f, i, a, n[h + 12], 7, 1804603682), a = l(a, c, f, i, n[h + 13], 12, -40341101), i = l(i, a, c, f, n[h + 14], 17, -1502002290), c = v(c, f = l(f, i, a, c, n[h + 15], 22, 1236535329), i, a, n[h + 1], 5, -165796510), a = v(a, c, f, i, n[h + 6], 9, -1069501632), i = v(i, a, c, f, n[h + 11], 14, 643717713), f = v(f, i, a, c, n[h], 20, -373897302), c = v(c, f, i, a, n[h + 5], 5, -701558691), a = v(a, c, f, i, n[h + 10], 9, 38016083), i = v(i, a, c, f, n[h + 15], 14, -660478335), f = v(f, i, a, c, n[h + 4], 20, -405537848), c = v(c, f, i, a, n[h + 9], 5, 568446438), a = v(a, c, f, i, n[h + 14], 9, -1019803690), i = v(i, a, c, f, n[h + 3], 14, -187363961), f = v(f, i, a, c, n[h + 8], 20, 1163531501), c = v(c, f, i, a, n[h + 13], 5, -1444681467), a = v(a, c, f, i, n[h + 2], 9, -51403784), i = v(i, a, c, f, n[h + 7], 14, 1735328473), c = g(c, f = v(f, i, a, c, n[h + 12], 20, -1926607734), i, a, n[h + 5], 4, -378558), a = g(a, c, f, i, n[h + 8], 11, -2022574463), i = g(i, a, c, f, n[h + 11], 16, 1839030562), f = g(f, i, a, c, n[h + 14], 23, -35309556), c = g(c, f, i, a, n[h + 1], 4, -1530992060), a = g(a, c, f, i, n[h + 4], 11, 1272893353), i = g(i, a, c, f, n[h + 7], 16, -155497632), f = g(f, i, a, c, n[h + 10], 23, -1094730640), c = g(c, f, i, a, n[h + 13], 4, 681279174), a = g(a, c, f, i, n[h], 11, -358537222), i = g(i, a, c, f, n[h + 3], 16, -722521979), f = g(f, i, a, c, n[h + 6], 23, 76029189), c = g(c, f, i, a, n[h + 9], 4, -640364487), a = g(a, c, f, i, n[h + 12], 11, -421815835), i = g(i, a, c, f, n[h + 15], 16, 530742520), c = m(c, f = g(f, i, a, c, n[h + 2], 23, -995338651), i, a, n[h], 6, -198630844), a = m(a, c, f, i, n[h + 7], 10, 1126891415), i = m(i, a, c, f, n[h + 14], 15, -1416354905), f = m(f, i, a, c, n[h + 5], 21, -57434055), c = m(c, f, i, a, n[h + 12], 6, 1700485571), a = m(a, c, f, i, n[h + 3], 10, -1894986606), i = m(i, a, c, f, n[h + 10], 15, -1051523), f = m(f, i, a, c, n[h + 1], 21, -2054922799), c = m(c, f, i, a, n[h + 8], 6, 1873313359), a = m(a, c, f, i, n[h + 15], 10, -30611744), i = m(i, a, c, f, n[h + 6], 15, -1560198380), f = m(f, i, a, c, n[h + 13], 21, 1309151649), c = m(c, f, i, a, n[h + 4], 6, -145523070), a = m(a, c, f, i, n[h + 11], 10, -1120210379), i = m(i, a, c, f, n[h + 2], 15, 718787259), f = m(f, i, a, c, n[h + 9], 21, -343485551), c = d(c, r), f = d(f, e), i = d(i, o), a = d(a, u); return [c, f, i, a] } function a(n) { for (var t = "", r = 32 * n.length, e = 0; e < r; e += 8)t += String.fromCharCode(n[e >> 5] >>> e % 32 & 255); return t } function h(n) { var t = []; for (t[(n.length >> 2) - 1] = void 0, e = 0; e < t.length; e += 1)t[e] = 0; for (var r = 8 * n.length, e = 0; e < r; e += 8)t[e >> 5] |= (255 & n.charCodeAt(e / 8)) << e % 32; return t } function e(n) { for (var t, r = "0123456789abcdef", e = "", o = 0; o < n.length; o += 1)t = n.charCodeAt(o), e += r.charAt(t >>> 4 & 15) + r.charAt(15 & t); return e } function r(n) { return unescape(encodeURIComponent(n)) } function o(n) { return a(i(h(t = r(n)), 8 * t.length)); var t } function u(n, t) { return function (n, t) { var r, e, o = h(n), u = [], c = []; for (u[15] = c[15] = void 0, 16 < o.length && (o = i(o, 8 * n.length)), r = 0; r < 16; r += 1)u[r] = 909522486 ^ o[r], c[r] = 1549556828 ^ o[r]; return e = i(u.concat(h(t)), 512 + 8 * t.length), a(i(c.concat(e), 640)) }(r(n), r(t)) } function t(n, t, r) { return t ? r ? u(t, n) : e(u(t, n)) : r ? o(n) : e(o(n)) } "function" == typeof define && define.amd ? define(function () { return t }) : "object" == typeof module && module.exports ? module.exports = t : n.md5 = t }(this);
async function handleRequest(request) {
  try {
    const req = request
    const urlStr = req.url
    const urlObj = new URL(urlStr)
    const path = urlObj.href.substr(urlObj.origin.length)
    const domain = (urlStr.split('/'))[2]
    const username = hpp_username.split(",");
    const password = hpp_password.split(",");
    //console.log(hpp_logstatus)
    for (var i = 0; i < getJsonLength(username); i++) {
      if (getCookie(request, "password") == md5(password[i]) && getCookie(request, "username") == md5(username[i])) {
        hpp_logstatus = 1
      }
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

            let hpp_installhtml = `<!doctype html>
<html lang="zh">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
	<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
	<title>${hpp_ver}安装</title>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/install.css">
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
			  <h3 style="color:#fff">基本信息</h3>
		      <p>域名:</p>    
		      <input type="text" class="input_text" id="hpp_domain" placeholder="xxx.xxx.com"/>
		      <p>头像地址:</p>    
		      <input type="text" class="input_text" id="hpp_userimage" placeholder="https://cdn.jsdelivr.net/gh/ChenYFan/CDN/img/avatar.png"/>
		      <p>标题:</p>    
		      <input type="text" class="input_text" id="hpp_title" placeholder="XXX的后台"/>
		      <p>icon地址:</p>    
		      <input type="text" class="input_text" id="hpp_usericon" placeholder="https://cdn.jsdelivr.net/gh/ChenYFan/chenyfan.github.io/favicon.ico"/>
		      <p>跨域请求:</p>    
			  <input type="text" class="input_text" id="hpp_cors" placeholder="*"/>
			  <h3 style="color:#fff">面板配置</h3>
			  <p>OwOJSON地址:</p>    
              <input type="text" class="input_text" id="hpp_OwO" placeholder="https://cdn.jsdelivr.net/gh/ChenYFan/CDN@ca3ea6c/assets/list.json" />
			  <p>面板背景图片:</p>    
              <input type="text" class="input_text" id="hpp_back" placeholder="https://cdn.jsdelivr.net/gh/ChenYFan-Tester/DailyGet@gh-pages/bingpic/bing.jpg" />
			  <p>懒加载图片:</p>    
              <input type="text" class="input_text" id="hpp_lazy_img" placeholder="https://cdn.jsdelivr.net/gh/ChenYFan/blog@master/themes/fluid/source/img/loading.gif" />
			  <p>高亮样式:</p>    
              <input type="text" class="input_text" id="hpp_highlight_style" placeholder="github" />
			  
			  <p>面板选项卡颜色:</p>    
              <input type="text" class="input_text" id="hpp_color" placeholder="azure" />
			  <p>面板选项框颜色:</p>    
              <input type="text" class="input_text" id="hpp_bg_color" placeholder="black" />
			  <p>面板主题色:</p>    
              <input type="text" class="input_text" id="hpp_theme_mode" placeholder="light" />
			  
			  <p>列表限制数量:</p>    
              <input type="text" class="input_text" id="hpp_page_limit" placeholder="10" />
			  
			  <h3 style="color:#fff">Github信息</h3>
		      <p>Github文档仓库Token:</p>    
		      <input type="text" class="input_text" id="hpp_githubdoctoken" placeholder="*********"/>
			  <p>Github图片仓库Token:</p>    
		      <input type="text" class="input_text" id="hpp_githubimagetoken" placeholder="*********"/>
			  <p>Github文档仓库用户名:</p>    
		      <input type="text" class="input_text" id="hpp_githubdocusername" placeholder="XXX" />
			  <p>Github图片仓库用户名:</p>    
		      <input type="text" class="input_text" id="hpp_githubimageusername" placeholder="XXX" />
			  <p>Github文档仓库名:</p>    
		      <input type="text" class="input_text" id="hpp_githubdocrepo" placeholder="blog" />
			  <p>Github图片仓库名:</p>    
		      <input type="text" class="input_text" id="hpp_githubimagerepo" placeholder="image" />
			  <p>Github文档仓库根目录:</p>    
		      <input type="text" class="input_text" id="hpp_githubdocroot" placeholder="/" />
			  <p>Github图片仓库路径:</p>    
		      <input type="text" class="input_text" id="hpp_githubimagepath" placeholder="/" />
			  <p>Github文档仓库分支:</p>    
		      <input type="text" class="input_text" id="hpp_githubdocbranch" placeholder="master" />
			  <p>Github图片仓库分支:</p>    
		      <input type="text" class="input_text" id="hpp_githubimagebranch" placeholder="main" />
			  <h3 style="color:#fff">附加功能</h3>
			  <p>是否自动签到【是为True，否为False】:</p>    
		      <input type="text" class="input_text" id="hpp_autodate" placeholder="False" />
              <h3 style="color:#fff">CloudFlare访问功能</h3>
			  <p>Global API Key:</p>    
		      <input type="text" class="input_text" id="hpp_CF_Auth_Key" placeholder="***" />
              <p>目标Workers名称:</p>    
		      <input type="text" class="input_text" id="hpp_script_name" placeholder="HexoPlusPlus" />
              <p>Workers账户ID:</p>    
		      <input type="text" class="input_text" id="hpp_account_identifier" placeholder="***" />
              <p>账户登录邮箱:</p>    
		      <input type="text" class="input_text" id="hpp_Auth_Email" placeholder="ABC@DEF.com" />
              <h3 style="color:#fff">Twikoo加强</h3>
              <p>Twikoo环境ID:</p>    
              <input type="text" class="input_text" id="hpp_twikoo_envId" placeholder="xxx" />
			  
		    </div>
		  
		    <div class="cont_join_form_finish" style="display:none">
		      <h2>完成</h2>  
		    </div>

		    <div class="cont_btn_join">
		      <a href="#" onclick='start()' id="butttt">开始配置</a>
		    </div>
		  </div>
		</div>
	</div>
	
	<script src="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/install.js"></script>
</body>
</html>`
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
          const hpp_githubdocroot = config["hpp_githubdocroot"]
          const hpp_githubdocbranch = config["hpp_githubdocbranch"]
          const hpp_githubimageusername = config["hpp_githubimageusername"]
          const hpp_githubimagerepo = config["hpp_githubimagerepo"]
          const hpp_githubimagepath = config["hpp_githubimagepath"]
          const hpp_githubimagebranch = config["hpp_githubimagebranch"]
          const hpp_autodate = config["hpp_autodate"]
          const hpp_account_identifier = config["hpp_account_identifier"]
          const hpp_script_name = config["hpp_script_name"]
          const hpp_CF_Auth_Key = config["hpp_CF_Auth_Key"]
          const hpp_Auth_Email = config["hpp_Auth_Email"]
          const hpp_twikoo_envId = config["hpp_twikoo-envId"]
          const hpp_OwO = config["hpp_OwO"]
          const hpp_back = config["hpp_back"]
          const hpp_lazy_img = config["hpp_lazy_img"]
          const hpp_highlight_style = config["hpp_highlight_style"]
          const hpp_plugin_js = config["hpp_plugin_js"]
          const hpp_plugin_css = config["hpp_plugin_css"]
          const hpp_githubdocpath = hpp_githubdocroot + "source/_posts/"
          const hpp_githubdocdraftpath = hpp_githubdocroot + "source/_drafts/"
          const githubdocdraftpath = encodeURI(hpp_githubdocdraftpath)
          const githubdocpath = encodeURI(hpp_githubdocpath)
          const githubimagepath = encodeURI(hpp_githubimagepath)
		  const hpp_color=config["hpp_color"]==undefined?"rose":config["hpp_color"]
		  const hpp_bg_color=config["hpp_bg_color"]==undefined?"white":config["hpp_bg_color"]
		  const hpp_theme_mode=config["hpp_theme_mode"]=="dark"?"dark":"light"
		  const hpp_page_limit=config["hpp_page_limit"]==undefined?"10":config["hpp_page_limit"]
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
          /*主面板*/
          if (path.startsWith("/hpp/admin/dash")) {
            let hpp_home_act = ""
            let hpp_edit_act = ""
            let hpp_talk_act = ""
            let hpp_docs_man_act = ""
            let hpp_img_man_act = ""
			let hpp_tool_act = ""
            let hpp_set_act = ""
            let hpp_js = ""
            let hpp_init = `<div class="content"><div class="container-fluid"><div class="row"><div class="col-md-12"><div class="card"><div class="card-header card-header-primary"><h4 class="card-title">404</h4><p class="card-category">我们不知道您的需求</p></div></br><div class="card-body"><a href="/hpp/admin/dash/home">回到主页</a></div></div></div></div></div></div>`
            if (path == "/hpp/admin/dash/home") {
              hpp_home_act = " active"
              hpp_init = `<div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-6">
              <div class="card card-stats">
                <div class="card-header card-header-warning card-header-icon">
                  <div class="card-icon">
                    <i class="fa fa-file"></i>
                  </div>
                  <p class="card-category">总文档数</p>
                  <h3 class="card-title" id="document_all">NaN
                    <small>个</small>
                  </h3>
                </div>
                <div class="card-footer">
				<div class="stats">
                    <a href="/hpp/admin/dash/edit" style="color: #cf6ae0 !important"><i class="fa fa-pencil"></i>前往管理</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6">
              <div class="card card-stats">
                <div class="card-header card-header-success card-header-icon">
                  <div class="card-icon">
                    <i class="fa fa-image"></i>
                  </div>
                  <p class="card-category">总图片数</p>
                  <h3 class="card-title" id="img_all">NaN
                    <small>张</small>
                  </h3>
                </div>
                <div class="card-footer">
				<div class="stats">
                    <a href="/hpp/admin/dash/img_man" style="color: #cf6ae0 !important"><i class="fa fa-upload"></i>前往管理</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md- col-sm-6">
              <a href="javascript:checkUpdate()">
              <div class="card card-stats">
                <div class="card-header card-header-info card-header-icon">
                  <div class="card-icon">
                    <i class="fa fa-upload"></i>
                  </div>
                  <p class="card-category">当前版本</p>
                  <h3 class="card-title">${hpp_ver}</h3>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="material-icons">update</i>点击更新
                  </div>
                </div>
              </div>
            </a>
            </div>
            
            
			
			<div class="col-lg-6 col-md-6 col-sm-6">
              <a href="https://jq.qq.com/?_wv=1027&k=rAcnhzqK" target="_blank">
              <div class="card card-stats">
                <div class="card-header card-header-success card-header-icon">
                  <div class="card-icon">
                    <i class="fa fa-qq"></i>
                  </div>
                  <h3 class="card-title">QQ群聊天去？</h3>
                </div>
                <div class="card-footer">
				诚聘小白鼠(bushi
                </div>
              </div>
            </a>
            </div>
			
			<div class="col-lg-6 col-md-6 col-sm-6">
              <a href="https://hexoplusplus.js.org" target="_blank">
              <div class="card card-stats">
                <div class="card-header card-header-normal card-header-icon">
                  <div class="card-icon">
                    <i class="fa fa-book"></i>
                  </div>
                  <h3 class="card-title">文档地址</h3>
                </div>
                <div class="card-footer">有多少人没看文档来提issues？
                </div>
              </div>
            </a>
            </div>
			
			<div class="col-lg-6 col-md-6 col-sm-6">
              <a href="https://github.com/HexoPlusPlus/HexoPlusPlus" target="_blank">
              <div class="card card-stats">
                <div class="card-header card-header-primary card-header-icon">
                  <div class="card-icon">
                    <i class="fa fa-github"></i>
                  </div>
                  <h3 class="card-title">Github</h3>
                </div>
                <div class="card-footer">
				欢迎PR
                </div>
              </div>
            </a>
            </div>
			
          </div>
        </div>
      </div>`
              hpp_js = `<script src='https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/home.js'></script>`
            }
            if (path == "/hpp/admin/dash/edit") {
              hpp_edit_act = " active"
              hpp_init = `<div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header card-header-primary">
                  <h4 class="card-title">书写</h4>
                  <p class="card-category">Wrtie</p>
                </div>
              </br>
                <div class="card-body">
                          <div class="col-md-8">
                              <label class="bmd-label-floating">文件选择</label>
                              <select id="choo" class="form-control form-control-chosen" style="display: inline;"></select>
							  <button type="submit" class="btn btn-success" onclick="javascript:hpp_get_md()">获取文章</button>
							  <button type="submit" class="btn btn-normal" onclick="javascript:hpp_get_draft()">获取艹稿</button>
							  <button type="submit" class="btn btn-danger" onclick="javascript:hpp_del_index()">徒手清索引</button>
                          </div>
                        
                        <div class="row">
                          <div class="col-md-12">
                            <div class="form-group">
                              <label>内容</label>
                              <div class="form-group" id="hpp_doc_editor">
								
                              </div>
                            </div>
                          </div>
                        </div>
						<button type="submit" class="btn btn-normal pull-right" onclick="javascript:hpp_upload_draft()">发布艹稿</button>
                        <button type="submit" class="btn btn-primary pull-right" onclick="javascript:hpp_upload_md()">发布文件</button>
                        <div class="clearfix"></div>
						<input type="file" name="upload" id="upload_md" style="display:none"/>
						<form id="upform" enctype='multipart/form-data' style="display:none;">
    <div class="form-group">
        <label for="upteainput">上传文件</label>
        <input type="file" id="input">
    </div>
</form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
              hpp_js = `<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/npm/notyf/notyf.min.css' /> 
<script src="https://cdn.jsdelivr.net/npm/notyf/notyf.min.js"></script><script src="https://cdn.jsdelivr.net/gh/indrimuska/jquery-editable-select/dist/jquery-editable-select.min.js"></script><script src='https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/edit.js'></script><script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery-lazy@1.7.11/jquery.lazy.min.js"></script><script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery-lazy@1.7.11/jquery.lazy.plugins.min.js"></script><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/OwO.min.css">
<script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.5.0/build/highlight.min.js"></script>
<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.5.0/build/styles/${hpp_highlight_style}.min.css' /> 

`
            }
            if (path == "/hpp/admin/dash/talk") {
              hpp_talk_act = " active"
              hpp_init = `<div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header card-header-primary">
                  <h4 class="card-title">说说</h4>
                  <p class="card-category">Talk</p>
                </div>
              </br>
                <div class="card-body">
                          
                        
                        <div class="row">
                          <div class="col-md-12">
                            <div class="form-group">
                              <label>书写</label>
                              <div class="form-group" id="hpp_talk_editor"></div>
                            </div>
                          </div>
                        </div>
                        <button type="submit" class="btn btn-primary pull-right" onclick="javascript:hpp_upload_md()">Upload</button>
                        <div class="clearfix"></div>
						<input type="file" name="upload" id="upload_md" style="display:none"/>
						<form id="upform" enctype='multipart/form-data' style="display:none;">
    <div class="form-group">
        <label for="upteainput">上传文件</label>
        <input type="file" id="input">
    </div>
</form><div id="hpp_talk"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
              hpp_js = `<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/npm/notyf/notyf.min.css' /> <script src="https://cdn.jsdelivr.net/npm/notyf/notyf.min.js"></script><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/talk.css" /><script src='https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/talk.js'></script><script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery-lazy@1.7.11/jquery.lazy.min.js"></script><script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery-lazy@1.7.11/jquery.lazy.plugins.min.js"></script><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/OwO.min.css">`
            }
            if (path == "/hpp/admin/dash/docs_man") {
              hpp_docs_man_act = " active"
              hpp_init = `
<div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header card-header-primary">
                  <h4 class="card-title ">文章列表</h4>
                  <p class="card-category">这里列出了你所有文章</p>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
				  <input type="text" id="search_Input" onkeyup="hpp_search()" placeholder="搜索文章...">
                    <table class="table" id="hpp_table">
                      <thead class="text-primary">
                        <th>
                          名称
                        </th>
                        <th>
                          大小
                        </th>
                        <th>发布状态</th><th></th>
                        <th></th><th></th><th></th>
                      </thead>
                      <tbody id="tbody_doc">
						
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
              hpp_js = `<script src='https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/doc_man.js'></script>`

            }
            if (path == "/hpp/admin/dash/img_man") {
              hpp_img_man_act = " active"
              hpp_init = `<div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header card-header-primary">
                  <h4 class="card-title ">图片列表</h4>
                  <p class="card-category">这里列出了你所有图片</p>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
				  <input type="text" id="search_Input" onkeyup="hpp_search()" placeholder="搜索图片...">
                    <table class="table" id="hpp_table">
                      <thead class=" text-primary">
                        <th>
                          名称
                        </th>
                        <th>
                          大小
                        </th><th>预览</th>
                        <th></th>
                        <th></th><th></th><th></th><th></th>
                      </thead>
                      <tbody id="tbody_img">
						
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
              hpp_js = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/brutaldesign/swipebox/src/css/swipebox.css"><script src='https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/img_man.js'></script><script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery-lazy@1.7.11/jquery.lazy.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery-lazy@1.7.11/jquery.lazy.plugins.min.js"></script><script src="https://cdn.jsdelivr.net/gh/brutaldesign/swipebox/src/js/jquery.swipebox.min.js"></script>`

            }
			if (path == "/hpp/admin/dash/tool") {
              hpp_tool_act = " active"
              hpp_init = `<div class="content">
        <div class="container-fluid">
          <div class="row">
        
			
			<div class="col-lg-6 col-md-6 col-sm-6">
              <a href="javascript:hpp_artitalk_into_hpptalk()">
              <div class="card card-stats">
                <div class="card-header card-header-primary card-header-icon">
                  <div class="card-icon">
                    <i class="fa fa-download"></i>
                  </div>
                  <h3 class="card-title">从Artitalk中导入</h3>
                </div>
                <div class="card-footer">这不是抢生意啊喂
                </div>
              </div>
            </a>
            </div>
			
			<div class="col-lg-6 col-md-6 col-sm-6">
              <a href="javascript:hpp_del_all()">
              <div class="card card-stats">
                <div class="card-header card-header-danger card-header-icon">
                  <div class="card-icon">
                    <i class="fa fa-close"></i>
                  </div>
                  <h3 class="card-title">销毁配置</h3>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="material-icons text-danger">warning</i>高危操作，你知道会发生什么的
                  </div>
                </div>
              </div>
            </a>
            </div>
			
			
          </div>
        </div>
      </div>`
              hpp_js = `<script src='https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/tool.js'></script>`
            }
            if (path == "/hpp/admin/dash/set") {
              hpp_set_act = " active"
              hpp_init = `<div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header card-header-primary">
                  <h4 class="card-title ">配置</h4>
                  <p class="card-category">请根据需要修改配置</p>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
				  <input type="text" id="search_Input" onkeyup="hpp_search()" placeholder="搜索配置...">
                    <table class="table" id="hpp_table">
                      <thead class=" text-primary">
                        <th>
                          键值
                        </th>
                        <th>
                          内容
                        </th><th>操作</th>
                      </thead>
                      <tbody id="tbody_config">
						
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
              hpp_js = `<script src='https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/config.js'></script>`
            }
            let hpp_plugin = ""
            if (hpp_plugin_css != undefined) { hpp_plugin += `<link rel="stylesheet" type="text/css" href="${hpp_plugin_css}" />` }
            if (hpp_plugin_js != undefined) { hpp_js += `<script src="${hpp_plugin_js}"></script>` }
            let hpp_dash_head = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <link rel="apple-touch-icon" sizes="76x76" href="${hpp_usericon}">
  <link rel="icon" type="image/png" href="${hpp_usericon}">
  <title>${hpp_title}</title>
  <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
  ${hpp_plugin}
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/font.css" />
  <link href="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/admin_all_${hpp_theme_mode}.css" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/indrimuska/jquery-editable-select/dist/jquery-editable-select.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css">
  <script>
  //这个脚本的用途是前端变量传递
  const hpp_ver="${hpp_ver}";
  const hpp_OwO="${hpp_OwO}";
  const avatar="${hpp_userimage}";
  const username="${username[0]}";
  const hpp_githubdocusername = "${hpp_githubdocusername}"
  const hpp_githubdocrepo ="${hpp_githubdocrepo}"
  const hpp_githubdocbranch ="${hpp_githubdocbranch}"
  const hpp_githubdocpath ="${hpp_githubdocpath}"
  const hpp_githubimageusername = "${hpp_githubimageusername}"
  const hpp_githubimagerepo ="${hpp_githubimagerepo}"
  const hpp_githubimagebranch ="${hpp_githubimagebranch}"
  const hpp_githubimagepath ="${hpp_githubimagepath}"
  const hpp_githubdocdraftpath ="${hpp_githubdocdraftpath}"
  const hpp_lazy_img = "${hpp_lazy_img}"
  const hpp_highlight_style = "${hpp_highlight_style}"
  const hpp_page_limit = ${hpp_page_limit}
  </script>
</head>
<body class="${hpp_theme_mode=='dark'?'dark-edition':''}">
  <div class="wrapper ">
    <div class="sidebar" data-color="${hpp_color}" data-background-color="${hpp_theme_mode=='dark'?'default':hpp_bg_color}" data-image="${hpp_back}">
      <div class="logo"><a class="simple-text logo-normal">${hpp_title}</a></div>
      <div class="sidebar-wrapper">
        <ul class="nav">
          <li class="nav-item${hpp_home_act}">
            <a class="nav-link" href="/hpp/admin/dash/home">
              <i class="material-icons">dashboard</i>
              <p>主页</p>
            </a>
          </li>
          <li class="nav-item${hpp_edit_act}">
            <a class="nav-link" href="/hpp/admin/dash/edit">
              <i class="material-icons">create</i>
              <p>书写</p>
            </a>
          </li>
          <li class="nav-item${hpp_talk_act}">
            <a class="nav-link" href="/hpp/admin/dash/talk">
              <i class="material-icons">chat</i>
              <p>说说</p>
            </a>
          </li>
          <li class="nav-item${hpp_docs_man_act}">
            <a class="nav-link" href="/hpp/admin/dash/docs_man">
              <i class="material-icons">descriptionoutlined</i>
              <p>文档管理</p>
            </a>
          </li>
		  <li class="nav-item${hpp_img_man_act}">
            <a class="nav-link" href="/hpp/admin/dash/img_man">
              <i class="material-icons">imagerounded</i>
              <p>图片管理</p>
            </a>
          </li>
		  <li class="nav-item${hpp_tool_act}">
            <a class="nav-link" href="/hpp/admin/dash/tool">
              <i class="material-icons">widgets</i>
              <p>工具</p>
            </a>
          </li>
		  <li class="nav-item${hpp_set_act}">
            <a class="nav-link" href="/hpp/admin/dash/set">
              <i class="material-icons">settings</i>
              <p>设置</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="main-panel">
      <!-- Navbar -->
      <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
        <div class="container-fluid">
          <div class="navbar-wrapper">
            <a class="navbar-brand" href="javascript:;">HexoPlusPlus后台</a>
          </div>
          <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
            <span class="sr-only">Toggle navigation</span>
            <span class="navbar-toggler-icon icon-bar"></span>
            <span class="navbar-toggler-icon icon-bar"></span>
            <span class="navbar-toggler-icon icon-bar"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end">
            <ul class="navbar-nav">
              <li class="nav-item dropdown">
                <a class="nav-link" href="javascript:;" id="navbarDropdownProfile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src="${hpp_userimage}" style="width: 30px;border-radius: 50%;border: 0;">
                  <p class="d-lg-none d-md-block">
                    Account
                  </p>
                </a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownProfile">
                  <a class="dropdown-item" href="javascript:kick()">签到</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="javascript:hpp_logout()">退出</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <!-- End Navbar --> 

<!--innerHTMLSTART-->`
            let hpp_dash_foot = `
					<!--innerHTMLEND-->
</div>
</div>
<script src="https://cdn.jsdelivr.net/npm/jquery@2.2.4"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert/dist/sweetalert.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/admin_all.js"></script>
${hpp_js}

</body>

</html>`
            let hpp_dash = `${hpp_dash_head}${hpp_init}${hpp_dash_foot}`
            return new Response(hpp_dash, {
              headers: { "content-type": "text/html;charset=UTF-8" }
            })














          }
          if (path.startsWith("/hpp/admin/api/adddoc/")) {

            const file = await request.text()
            const filename = path.substr(("/hpp/admin/api/adddoc/").length)
            const url = `https://api.github.com/repos/${hpp_githubdocusername}/${hpp_githubdocrepo}/contents${githubdocpath}${filename}?ref=${hpp_githubdocbranch}`
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
              if (hpp_r_s == 201) { await KVNAME.delete("hpp_doc_list_index") }
              return new Response('Update Success', { status: hpp_r_s })
            } else {
              return new Response('Fail To Update', { status: hpp_r_s })
            }

          }
          if (path.startsWith("/hpp/admin/api/adddraft/")) {

            const file = await request.text()
            const filename = path.substr(("/hpp/admin/api/adddraft/").length)
            const url = `https://api.github.com/repos/${hpp_githubdocusername}/${hpp_githubdocrepo}/contents${githubdocdraftpath}${filename}?ref=${hpp_githubdocbranch}`
            const hpp_sha = (JSON.parse(await (await fetch(url, hpp_githubgetdocinit)).text())).sha
            const hpp_body = {
              branch: hpp_githubdocbranch, message: `Upload draft from ${hpp_ver} By ${hpp_githubdocusername}`, content: file, sha: hpp_sha
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
              if (hpp_r_s == 201) { await KVNAME.delete("hpp_doc_draft_list_index") }
              return new Response('Update Success', { status: hpp_r_s })
            } else {
              return new Response('Fail To Update', { status: hpp_r_s })
            }

          }
          if (path.startsWith("/hpp/admin/api/addimage")) {
            const file = await request.text()
            const hpp_time = Date.parse(new Date())
            const filename = path.substr(("/hpp/admin/api/addimage/").length)

            const url = `https://api.github.com/repos/${hpp_githubimageusername}/${hpp_githubimagerepo}/contents${githubimagepath}${hpp_time}.${filename}`
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
            const url = `https://api.github.com/repos/${hpp_githubdocusername}/${hpp_githubdocrepo}/contents${githubdocpath}${filename}?ref=${hpp_githubdocbranch}`
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
              await KVNAME.delete("hpp_doc_list_index")
              return new Response('Delete Success', { status: hpp_r_s })
            } else {
              return new Response('Fail To Delete doc', { status: hpp_r_s })
            }
          }

          if (path.startsWith("/hpp/admin/api/deldraft")) {

            const filename = path.substr(("/hpp/admin/api/deldraft/").length)
            const url = `https://api.github.com/repos/${hpp_githubdocusername}/${hpp_githubdocrepo}/contents${githubdocdraftpath}${filename}?ref=${hpp_githubdocbranch}`
            const hpp_sha = (JSON.parse(await (await fetch(url, hpp_githubgetdocinit)).text())).sha
            const hpp_body = {
              branch: hpp_githubdocbranch, message: `Delete draft from ${hpp_ver} By ${hpp_githubdocusername}`, sha: hpp_sha
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
              await KVNAME.delete("hpp_doc_draft_list_index")
              return new Response('Delete Success', { status: hpp_r_s })
            } else {
              return new Response('Fail To Delete doc', { status: hpp_r_s })
            }
          }

          if (path.startsWith("/hpp/admin/api/delimage")) {
            const filepath = githubimagepath.substr(0, (githubimagepath).length - 1)
            const listurl = `https://api.github.com/repos/${hpp_githubimageusername}/${hpp_githubimagerepo}/contents${filepath}?ref=${hpp_githubimagebranch}`
            const filename = path.substr(("/hpp/admin/api/delimage/").length)
            const url = `https://api.github.com/repos/${hpp_githubimageusername}/${hpp_githubimagerepo}/contents${githubimagepath}${filename}?ref=${hpp_githubimagebranch}`
            const hpp_re = (JSON.parse(await (await fetch(listurl, hpp_githubgetimageinit)).text()))
            //console.log(hpp_re)
            let hpp_sha = ""
            for (var i = 0; i < getJsonLength(hpp_re); i++) {
              if (hpp_re[i]["name"] == filename) {
                hpp_sha = hpp_re[i]["sha"]
                break
              }
            }
            //console.log(hpp_sha)
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
            return (fetch(`https://raw.githubusercontent.com/${hpp_githubdocusername}/${hpp_githubdocrepo}/${hpp_githubdocbranch}${githubdocpath}${filename}?ref=${hpp_githubdocbranch}`, hpp_githubgetdocinit))
          }
		  if (path == ("/hpp/admin/api/getscaffolds")) {
            return (fetch(`https://raw.githubusercontent.com/${hpp_githubdocusername}/${hpp_githubdocrepo}/${hpp_githubdocbranch}${hpp_githubdocroot}scaffolds/post.md?ref=${hpp_githubdocbranch}`, hpp_githubgetdocinit))
          }
          //他名字叫bfs，他就叫bfs/doge
          async function fetch_bfs(arr, url, getinit) {
            try {
              const hpp_getlist = await JSON.parse(await (await fetch(url, hpp_githubgetdocinit)).text())
              for (var i = 0; i < getJsonLength(hpp_getlist); i++) {
                if (hpp_getlist[i]["type"] != "dir") {
                  arr.push(hpp_getlist[i])
                } else {
                  await fetch_bfs(arr, hpp_getlist[i]["_links"]["self"], getinit)
                }
              }
              return arr;
            } catch (e) { return {} }
          }
          if (path == "/hpp/admin/api/getlist") {
            let hpp_doc_list_index = await KVNAME.get("hpp_doc_list_index")
            if (hpp_doc_list_index === null) {
              const filepath = githubdocpath.substr(0, (githubdocpath).length - 1)
              const url = `https://api.github.com/repos/${hpp_githubdocusername}/${hpp_githubdocrepo}/contents${filepath}?ref=${hpp_githubdocbranch}`
              hpp_doc_list_index = await JSON.stringify(await fetch_bfs([], url, hpp_githubgetdocinit))
              await KVNAME.put("hpp_doc_list_index", hpp_doc_list_index)
            }
            return new Response(hpp_doc_list_index, {
              headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": hpp_cors
              }
            })
          }
          if (path.startsWith("/hpp/admin/api/getdraft")) {
            const filename = path.substr(("/hpp/admin/api/getdraft/").length)
            return (fetch(`https://raw.githubusercontent.com/${hpp_githubdocusername}/${hpp_githubdocrepo}/${hpp_githubdocbranch}${githubdocdraftpath}${filename}?ref=${hpp_githubdocbranch}`, hpp_githubgetdocinit))
          }
          if (path == "/hpp/admin/api/get_draftlist") {
            let hpp_doc_draft_list_index = await KVNAME.get("hpp_doc_draft_list_index")
            if (hpp_doc_draft_list_index === null) {
              const filepath = githubdocdraftpath.substr(0, (githubdocdraftpath).length - 1)
              const url = `https://api.github.com/repos/${hpp_githubdocusername}/${hpp_githubdocrepo}/contents${filepath}?ref=${hpp_githubdocbranch}`
              hpp_doc_draft_list_index = await JSON.stringify(await fetch_bfs([], url, hpp_githubgetdocinit))
              await KVNAME.put("hpp_doc_draft_list_index", hpp_doc_draft_list_index)
            }
            return new Response(hpp_doc_draft_list_index, {
              headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": hpp_cors
              }
            })
          }
          if (path == "/hpp/admin/api/getimglist") {
            const filepath = githubimagepath.substr(0, (githubimagepath).length - 1)
            const url = `https://api.github.com/repos/${hpp_githubimageusername}/${hpp_githubimagerepo}/contents${filepath}?ref=${hpp_githubimagebranch}`
            return new Response(await JSON.stringify(await fetch_bfs([], url, hpp_githubgetimageinit)), {
              headers: {
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": hpp_cors
              }
            })
          }

          if (path == "/hpp/admin/api/index_del") {
            await KVNAME.delete("hpp_doc_draft_list_index")
            await KVNAME.delete("hpp_doc_list_index")
            return new Response("OK")
          }

          if (path == "/hpp/admin/api/addtalk") {
            let hpp_talk_re = await KVNAME.get("hpp_talk_data")
            if (hpp_talk_re === null) { hpp_talk_re = "[]" }
            let hpp_talk = await JSON.parse(hpp_talk_re);
            let hpp_talk_id_re = await KVNAME.get("hpp_talk_id")
            if (hpp_talk_id_re === null) { hpp_talk_id_re = 0 }
            let hpp_talk_id = hpp_talk_id_re;
            hpp_talk_id++;
            const now = await request.json()
            const add = {
              id: hpp_talk_id,
              time: now["time"],
              name: now["name"],
              avatar: now["avatar"],
              content: now["content"],
              visible: "True"
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
                hpp_talk.splice(i, 1)
              }
            }
            await KVNAME.put("hpp_talk_data", JSON.stringify(hpp_talk))
            return new Response('OK')
          }
          if (path == "/hpp/admin/api/visibletalk") {
            const hpp_talk = JSON.parse(await KVNAME.get("hpp_talk_data"));
            const now = await request.text()
            for (var i = 0; i < getJsonLength(hpp_talk); i++) {
              if (hpp_talk[i]["id"] == now) {
                hpp_talk[i]["visible"] = hpp_talk[i]["visible"] == "False" ? "True" : "False"
              }
            }
            await KVNAME.put("hpp_talk_data", JSON.stringify(hpp_talk))
            return new Response('OK')
          }
          if (path == "/hpp/admin/api/update") {
            const update_script = await (await fetch(`https://raw.githubusercontent.com/HexoPlusPlus/HexoPlusPlus/main/index.js`)).text()
            const up_init = {
              body: update_script,
              method: "PUT",
              headers: {
                "content-type": "application/javascript",
                "X-Auth-Key": hpp_CF_Auth_Key,
                "X-Auth-Email": hpp_Auth_Email
              }
            }
            const update_resul = await (await fetch(`https://api.cloudflare.com/client/v4/accounts/${hpp_account_identifier}/workers/scripts/${hpp_script_name}`, up_init)).text()
            return new Response(JSON.parse(update_resul)["success"])
          }
          if (path == "/hpp/admin/api/small_white_mouse_update") {
            const update_script = await (await fetch(`https://raw.githubusercontent.com/HexoPlusPlus/HexoPlusPlus/dev/index.js`)).text()
            const up_init = {
              body: update_script,
              method: "PUT",
              headers: {
                "content-type": "application/javascript",
                "X-Auth-Key": hpp_CF_Auth_Key,
                "X-Auth-Email": hpp_Auth_Email
              }
            }
            const update_resul = await (await fetch(`https://api.cloudflare.com/client/v4/accounts/${hpp_account_identifier}/workers/scripts/${hpp_script_name}`, up_init)).text()
            return new Response(JSON.parse(update_resul)["success"])
          }
          if (path == "/hpp/admin/api/inputtalk") {
            let hpp_talk_re = await KVNAME.get("hpp_talk_data")
            if (hpp_talk_re === null) { hpp_talk_re = "[]" }
            let hpp_talk = await JSON.parse(hpp_talk_re);
            let hpp_talk_id_re = await KVNAME.get("hpp_talk_id")
            if (hpp_talk_id_re === null) { hpp_talk_id_re = 0 }
            let hpp_talk_id = hpp_talk_id_re;
            let now = await JSON.parse(await request.text())
            let talk_init = {}
            for (var i = 0; i < now.length; i++) {
              hpp_talk_id++;
              ftime = now[i]["updatedAt"]
              ftime = ftime.split('T')
              talk_init = {
                id: hpp_talk_id,
                time: ftime[0],
                name: username[0],
                avatar: now[i]["avatar"],
                content: now[i]["atContentHtml"],
                visible: "True"
              }
              hpp_talk.push(talk_init)
            }
            await KVNAME.put("hpp_talk_data", JSON.stringify(hpp_talk))
            await KVNAME.put("hpp_talk_id", hpp_talk_id)
            return new Response(JSON.stringify(hpp_talk))
          }
          if (path.startsWith("/hpp/admin/api/checkupdate")) {
            const update_check_script = await (await fetch(`https://raw.githubusercontent.com/HexoPlusPlus/HexoPlusPlus/main/update.js`)).text()
            return new Response(update_check_script, { headers: { headers: "content-type: application/javascript; charset=utf-8" } })
          }
          if (path == "/hpp/admin/api/del_all") {
            await KVNAME.delete("hpp_config")
            return new Response('OK')
          }
          if (path == "/hpp/admin/api/get_config") { return new Response(await JSON.parse(hpp_config)) }
          if (path == "/hpp/admin/api/edit_config") {
            let req_con = await JSON.parse(await request.text())
            let _index = req_con["index"]
            let _value = req_con["value"]
            let k = await JSON.parse(await JSON.parse(hpp_config))
            k[_index] = _value
            k = await JSON.stringify(k)
            await KVNAME.put("hpp_config", await JSON.stringify(k))
            return new Response('OK')
          }
          if (path == "/hpp/admin/api/del_config") {
            let _index = await request.text()
            let k = await JSON.parse(await JSON.parse(hpp_config))
            delete k[_index]
            await KVNAME.put("hpp_config", await JSON.stringify(await JSON.stringify(k)))
            return new Response('OK')
          }
          if (path == '/hpp/admin/api/kick') {
            const now = Date.now(new Date())
            await KVNAME.put("hpp_activetime", now)
            const hpp_kvwait = Date.now(new Date()) - now
            return new Response("OK")
          }
          if (path == "/hpp/admin/api/gethpptalk") {
            const req_r = await request.text()
            if (req_r != "") {
              const limit = (await JSON.parse(req_r))["limit"]
              const start = (await JSON.parse(req_r))["start"]
              const hpp_talk = await JSON.parse(await KVNAME.get("hpp_talk_data"));
              let hpp_talk_res = []
              for (var i = getJsonLength(hpp_talk) - start - 1; i > getJsonLength(hpp_talk) - start - limit; i--) {
                hpp_talk_res.push(await JSON.stringify(hpp_talk[i]))
              }
              return new Response(JSON.stringify(hpp_talk_res), {
                headers: {
                  "content-type": "application/json;charset=UTF-8",
                  "Access-Control-Allow-Origin": "*"
                }
              })
            } else {
              return new Response("ERROR", {
                headers: {
                  "Access-Control-Allow-Origin": "*"
                }
              })
            }
          }
        }
      }
      else {
        if (path == '/hpp/admin/login') {
          let hpp_captcha_html = ""
          let hpp_captcha_no_1 = ""
          let hpp_captcha_no_2 = ""
          try { captcha = hpp_captcha } catch (e) { captcha = "Flase" }
          if (captcha != "True") { hpp_captcha_html = "//"; hpp_captcha_no_1 = "<!--"; hpp_captcha_no_2 = "-->" }
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
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/login.css" /> 
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
  <script src="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/md5.js"></script>
  ${hpp_captcha_no_1}<script src="https://cdn.jsdelivr.net/gh/zpfz/RVerify.js/dist/RVerify.min.js"></script>${hpp_captcha_no_2}
	  ${hpp_captcha_no_1}<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/zpfz/RVerify.js/dist/RVerify.min.css"/>${hpp_captcha_no_2}
  <script>
document.onkeydown=keyListener;
${hpp_captcha_html}  RVerify.configure({
${hpp_captcha_html}   mask: 0.5,
${hpp_captcha_html}   maskClosable: true,
${hpp_captcha_html}   title: '人机验证',
${hpp_captcha_html}   album: ['/hpp/api/captchaimg']
${hpp_captcha_html} })
function login(){
${hpp_captcha_html} RVerify.action(function(res){
${hpp_captcha_html} if(res==1){
document.cookie = "username=" + md5(document.getElementById("username").value);
document.cookie = "password=" + md5(document.getElementById("password").value);
window.location.href = '/hpp/admin/dash/home';
${hpp_captcha_html} }
${hpp_captcha_html}});
}
function keyListener(e){
    if(e.keyCode == 13){
        login();
    }
}
$("#login-button").click(function(event) {
login();
});
  </script>
  </body>
</html>
`
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
        const hpp_re_active_init = {
          headers: {
            "content-type": "application/javascript; charset=utf-8",
            "Access-Control-Allow-Origin": "*"
          }
        }
        if (k < 30) {
          return new Response('document.getElementById("bloggeractivetime").innerHTML=\'博主刚刚还在这儿呢\'', hpp_re_active_init)
        }
        else if (k < 60) {
          return new Response('document.getElementById("bloggeractivetime").innerHTML=\'博主在' + k + '秒前离开这儿\'', hpp_re_active_init)
        }
        else if (k < 3600) {
          return new Response('document.getElementById("bloggeractivetime").innerHTML=\'博主在' + Math.round(k / 60) + '分钟前偷偷瞄了一眼博客\'', hpp_re_active_init)
        }
        else {
          return new Response('document.getElementById("bloggeractivetime").innerHTML=\'博主在' + Math.round(k / 3600) + '小时前活跃了一次\'', hpp_re_active_init)
        }
      }
      if (path == "/hpp/api/captchaimg") {
        let url = "https://thispersondoesnotexist.com/image"
        let request = new Request(url);
        return (
          fetch(request)
        );

      }
      if (path == "/hpp/api/twikoo") {
        const hpp_config = await JSON.parse(await JSON.parse(await KVNAME.get("hpp_config")));
        const env_id = hpp_config["hpp_twikoo_envId"]
        const hpp_cors = hpp_config["hpp_cors"]
        const url = "https://tcb-api.tencentcloudapi.com/web?env=" + env_id
        async function get_refresh_token() {
          /*第一步获得refresh_token*/
          const step_1_body = {
            action: "auth.signInAnonymously",
            anonymous_uuid: "",
            dataVersion: "1970-1-1",
            env: env_id,
            refresh_token: "",
            seqId: ""
          }
          const step_1 = {
            body: JSON.stringify(step_1_body),
            method: "POST",
            headers: {
              "content-type": "application/json;charset=UTF-8"
            }
          }
          /*refresh_token到手*/
          //console.log(step_1_body)
          return JSON.parse(await (await fetch(url, step_1)).text())["refresh_token"]
        }
        async function get_access_token(refresh_token) {
          const step_2_body = {
            action: "auth.fetchAccessTokenWithRefreshToken",
            anonymous_uuid: "",
            dataVersion: "1970-1-1",
            env: env_id,
            refresh_token: refresh_token,
            seqId: ""
          }
          const step_2 = {
            body: JSON.stringify(step_2_body),
            method: "POST",
            headers: {
              "content-type": "application/json;charset=UTF-8"
            }
          }
          /*access_token到手*/
          return JSON.parse(await (await fetch(url, step_2)).text())["access_token"];
        }
        async function get_comment(access_token, path, before) {

          const re_data = { "event": "COMMENT_GET", "url": path, "before": before }
          const step_3_body = {
            access_token: access_token,
            action: "functions.invokeFunction",
            dataVersion: "1970-1-1",
            env: env_id,
            function_name: "twikoo",
            request_data: JSON.stringify(re_data),
            seqId: ""
          }
          const step_3 = {
            body: JSON.stringify(step_3_body),
            method: "POST",
            headers: {
              "content-type": "application/json;charset=UTF-8"
            }
          }
          return (await (await fetch(url, step_3)).text())

        }
        const req = await JSON.parse(await request.text())
        const path = req["path"]
        const before = req["before"]
        let refresh_token = await KVNAME.get("hpp_comment_refresh_token")
        let access_token = await KVNAME.get("hpp_comment_access_token")
        let val = await get_comment(access_token, path, before)
        let twikoo_code = await JSON.parse(val)['code']
        if (twikoo_code == 'CHECK_LOGIN_FAILED' | twikoo_code == 'INVALID_PARAM') {
          refresh_token = await get_refresh_token()
          await KVNAME.put("hpp_comment_refresh_token", refresh_token)
          access_token = await get_access_token(refresh_token)
          await KVNAME.put("hpp_comment_access_token", access_token)
          val = await get_comment(access_token, path, before)
        }
        return new Response(val, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        }
        )
      }
      if (path == "/hpp/api/gethpptalk") {
        const req_r = await request.text()
        if (req_r != "") {
          const limit = (await JSON.parse(req_r))["limit"]
          const start = (await JSON.parse(req_r))["start"]
          const hpp_talk = await JSON.parse(await KVNAME.get("hpp_talk_data"));
          let hpp_talk_res = []
          let hpp_vi = ""
          for (var i = getJsonLength(hpp_talk) - start - 1; i > getJsonLength(hpp_talk) - start - limit; i--) {
            try { hpp_vi = hpp_talk[i]["visible"] } catch (e) { hpp_vi = null }
            if (hpp_vi != "False") {
              hpp_talk_res.push(await JSON.stringify(hpp_talk[i]))
            }
          }
          return new Response(JSON.stringify(hpp_talk_res), {
            headers: {
              "content-type": "application/json;charset=UTF-8",
              "Access-Control-Allow-Origin": "*"
            }
          })
        } else {
          return new Response("ERROR", {
            headers: {
              "Access-Control-Allow-Origin": "*"
            }
          })
        }
      }

    }
    if (path == "/hpp/hpp_talk") {
      const talk_user_html = `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>HexoPlusPlus_Talk预览页面</title>
</head>
<body>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/talk.css" /> 
<script src="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/talk_user.js"></script>
<div id="hpp_talk"></div>
<script>
new hpp_talk({
id:"hpp_talk",
domain: window.location.host,
limit: 10,
start: 0 
});
</script>
</body>
</html>`
      return new Response(talk_user_html, {
        headers: { "content-type": "text/html;charset=UTF-8" }
      })
    }
    let hpp_errorhtml = `
<!DOCTYPE html>
<html lang="en" class="no-js">
	<head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" /> 
        <title>HexoPlusPlusError</title>
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/error.css" />
	</head>
	<body>
		<div class="container demo-2">
			<div class="content">
                <div id="large-header" class="large-header">
                    <canvas id="demo-canvas"></canvas>
                    <h1 class="main-title"><span>Error</span></h1>
                </div>
                <div class="codrops-header">
                    <h1>HexoPlusPlus 错误<span>不知道你的目的是什么</span></h1>
                    <nav class="codrops-demos">
                        <a class="current-demo" href="/hpp/admin/dash/home">仪表盘</a>
                        <a class="current-demo" href="https://github.com/HexoPlusPlus/HexoPlusPlus">Github</a>
                    </nav>
                </div>
            </div>
		</div>
        <script src="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/error.js"></script>
	</body>
</html>
`
    return new Response(hpp_errorhtml, {
      headers: { "content-type": "text/html;charset=UTF-8" }
    })

  } catch (e) {
    let hpp_errorhtml = `
<!DOCTYPE html>
<html lang="en" class="no-js">
	<head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" /> 
        <title>HexoPlusPlusError</title>
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/error.css" />
	</head>
	<body>
		<div class="container demo-2">
			<div class="content">
                <div id="large-header" class="large-header">
                    <canvas id="demo-canvas"></canvas>
                    <h1 class="main-title"><span>Error</span></h1>
                </div>
                <div class="codrops-header">
                    <h1>HexoPlusPlus 异常<span>${e}</span></h1>
                    <nav class="codrops-demos">
                        <a class="current-demo" href="https://hexoplusplus.js.org">文档</a>
                        <a class="current-demo" href="https://github.com/HexoPlusPlus/HexoPlusPlus">Github</a>
						<a class="current-demo" href="https://jq.qq.com/?_wv=1027&k=rAcnhzqK">QQ群寻求帮助</a>
                    </nav>
                </div>
            </div>
		</div>
        <script src="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@${hpp_CDNver}/error.js"></script>
	</body>
</html>
`
    return new Response(hpp_errorhtml, {
      headers: { "content-type": "text/html;charset=UTF-8" }
    })

  }
}
