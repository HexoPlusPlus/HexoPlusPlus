export const gethtml = {
    installhtml: function (config, hpp_CDN) {
        return `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width">
      <title>欢迎 | ${hpp_ver}</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mdui@1.0.1/dist/css/mdui.min.css"/>
    </head>
    <body style="mdui-theme-layout-dark">
    <div class="mdui-container">
      <div class="mdui-toolbar">
        <a id="_menu" class="mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">menu</i></a>
        <span class="mdui-typo-title">${hpp_ver}安装</span>
        <div class="mdui-toolbar-spacer"></div>
      </div>
    </div>
    
    <div class="mdui-drawer mdui-drawer-close" id="drawer" style="background-color:#fff">
      <ul class="mdui-list" id="_li">
      <li class="mdui-list-item mdui-ripple">
      <a href="https://hexoplusplus.js.org">
          <div class="mdui-list-item-content">寻求帮助</div></a></li><li class="mdui-list-item mdui-ripple">
          <a href="https://github.com/hexoplusplus/hexoplusplus">
          <div class="mdui-list-item-content">项目地址</div></a></li><li class="mdui-list-item mdui-ripple">
          <a href="https://jq.qq.com/?_wv=1027&k=rAcnhzqK">
          <div class="mdui-list-item-content">加群帮助</div></a>
        </li>
    </ul></div>
    
    <div class="mdui-container">
    
      <div class="mdui-row">
        <div class="mdui-m-b-3">
          <div class="mdui-panel" id="panel">
            <div class="mdui-panel-item mdui-panel-item-open " id="item-1">
              <div class="mdui-panel-item-header">基础配置(必填)</div>
              <div class="mdui-panel-item-body">
                <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">域名</label>
        <input class="mdui-textfield-input" id="hpp_domain" value="${config["hpp_domain"] || domain}"/>
      </div>
      
      
                <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">头像地址</label>
        <input class="mdui-textfield-input" id="hpp_userimage" value="${config["hpp_userimage"]}"/>
      </div>
      
      
                  <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">标题</label>
        <input class="mdui-textfield-input" id="hpp_title" value="${config["hpp_title"]}"/>
      </div>
      
      
                  <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">icon地址</label>
        <input class="mdui-textfield-input" id="hpp_usericon" value="${config["hpp_usericon"]}"/>
      </div>
      
      
                  <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">跨域请求</label>
        <input class="mdui-textfield-input" id="hpp_cors" value="${config["hpp_cors"]}"/>
      </div>
      
      
                  
      
      
              </div>
            </div>
        
        <div class="mdui-panel-item mdui-panel-item-open " id="item-1">
              <div class="mdui-panel-item-header">面板配置(必填)</div>
              <div class="mdui-panel-item-body">
                <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">OWOJSON地址</label>
        <input class="mdui-textfield-input" id="hpp_OwO" value="${config["hpp_OwO"]}"/>
      </div>
      
      
                <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">面板背景图片</label>
        <input class="mdui-textfield-input" id="hpp_back" value="${config["hpp_back"]}"/>
      </div>
      
      
                  <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">懒加载图片</label>
        <input class="mdui-textfield-input" id="hpp_lazy_img" value="${config["hpp_lazy_img"]}"/>
      </div>
      
      
                  <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">高亮样式</label>
        <input class="mdui-textfield-input" id="hpp_highlight_style" value="${config["hpp_highlight_style"]}"/>
      </div>
      
      
                  <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">面板选项卡颜色</label>
        <input class="mdui-textfield-input" id="hpp_color" value="${config["hpp_color"]}"/>
      </div>
      
                    <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">面板选项框颜色</label>
        <input class="mdui-textfield-input" id="hpp_bg_color" value="${config["hpp_bg_color"]}"/>
      </div>
                    <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">面板主题色</label>
        <input class="mdui-textfield-input" id="hpp_theme_mode" value="${config["hpp_theme_mode"]}"/>
      </div>
                  
                   <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">列表限制数量</label>
        <input class="mdui-textfield-input" id="hpp_page_limit" value="${config["hpp_page_limit"]}"/>
      </div>
                  
      
              </div>
            </div>
        
        
        <div class="mdui-panel-item mdui-panel-item-open " id="item-1">
              <div class="mdui-panel-item-header">Github文档配置</div>
              <div class="mdui-panel-item-body">
                <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">Github文档仓库Token</label>
        <input class="mdui-textfield-input" id="hpp_githubdoctoken" value="${config["hpp_githubdoctoken"]}"/>
      </div>
      
      
      
                  <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">Github文档仓库用户名</label>
        <input class="mdui-textfield-input" id="hpp_githubdocusername" value="${config["hpp_githubdocusername"]}"/>
      </div>
      
      
                  <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">Github文档仓库名</label>
        <input class="mdui-textfield-input" id="hpp_githubdocrepo" value="${config["hpp_githubdocrepo"]}"/>
      </div>
      
                    <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">Github文档仓库根目录</label>
        <input class="mdui-textfield-input" id="hpp_githubdocroot" value="${config["hpp_githubdocroot"]}"/>
      </div>
                  
                     <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">Github文档仓库分支</label>
        <input class="mdui-textfield-input" id="hpp_githubdocbranch" value="${config["hpp_githubdocbranch"]}"/>
      </div>
      
      
       <label class="mdui-switch">
            <input type="checkbox" id="yuque"/>
             <i class="mdui-switch-icon"></i> 使用语雀对接
          </label>
                     
      <div id="hpp_yuque" style="display:none">
      
       <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">Github语雀仓库用户名</label>
        <input class="mdui-textfield-input" id="hpp_githubyuqueusername" value="${config["hpp_githubyuqueusername"]}"/>
      </div>
      
      
                  <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">Github语雀仓库名</label>
        <input class="mdui-textfield-input" id="hpp_githubyuquerepo" value="${config["hpp_githubyuquerepo"]}"/>
      </div>
      
              <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">Github语雀TOKEN</label>
        <input class="mdui-textfield-input" id="hpp_githubyuquetoken" value="${config["hpp_githubyuquetoken"]}"/>
      </div>
      
      <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">语雀识别码【请自行手滚键盘，不得留空】</label>
        <input class="mdui-textfield-input" id="hpp_yuquetoken" value="${config["hpp_yuquetoken"]}"/>
      </div>
      
      
      </div>
      
      
              </div>
            </div>
        
        <div class="mdui-panel-item mdui-panel-item-open " id="item-1">
              <div class="mdui-panel-item-header">图床配置</div>
              <div class="mdui-panel-item-body">
          
          
      <label class="mdui-switch">
            <input type="checkbox" id="hpp_img"/>
            使用Github图床，由HPP托管 <i class="mdui-switch-icon"></i>  自定义图床 
          </label>
      
      <div id="githubimg" >
                <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">Github图片仓库Token</label>
        <input class="mdui-textfield-input" id="hpp_githubimagetoken" value="${config["hpp_githubimagetoken"]}"/>
      </div>
      
      
      
                  <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">Github图片仓库用户名</label>
        <input class="mdui-textfield-input" id="hpp_githubimageusername" value="${config["hpp_githubimageusername"]}"/>
      </div>
      
      
                    <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">Github图片仓库名</label>
        <input class="mdui-textfield-input" id="hpp_githubimagerepo" value="${config["hpp_githubimagerepo"]}"/>
      </div>
                   <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">Github图片仓库路径</label>
        <input class="mdui-textfield-input" id="hpp_githubimagepath" value="${config["hpp_githubimagepath"]}"/>
      </div>
                     <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">Github图片仓库分支</label>
        <input class="mdui-textfield-input" id="hpp_githubimagebranch" value="${config["hpp_githubimagebranch"]}"/>
      </div>
                     
      
      
      
              </div>
          
            <div id="ownimg" style="display:none">
                <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">自定义接口地址</label>
        <input class="mdui-textfield-input" id="hpp_ownimgurl" value="${config["hpp_ownimgurl"]}"/>
      </div>
      
      <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">POST参数名</label>
        <input class="mdui-textfield-input" id="hpp_ownimgname" value="${config["hpp_ownimgname"]}"/>
      </div>
      <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">JSON路径</label>
        <input class="mdui-textfield-input" id="hpp_ownimgjsonpath" value="${config["hpp_ownimgjsonpath"]}"/>
      </div>
      <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">自定义头</label>
        <input class="mdui-textfield-input" id="hpp_ownimgheader" value="${config["hpp_ownimgheader"]}"/>
      </div>
      <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">自定义method</label>
        <input class="mdui-textfield-input" id="hpp_ownimgmethod" value="${config["hpp_ownimgmethod"]}"/>
      </div>
      
              </div>
          
          
          </div>
            </div>
        
        
        
        <div class="mdui-panel-item mdui-panel-item-open " id="item-1">
              <div class="mdui-panel-item-header">Github私有Page配置</div>
              <div class="mdui-panel-item-body">
       <label class="mdui-switch">
            <input type="checkbox" id="hpp_githubpage"/>
            <i class="mdui-switch-icon"></i> 开启PrivatePage模式 
          </label><div id="hpp_githubpage_ctx" style="display:none">
      
                <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">GithubPage仓库Token</label>
        <input class="mdui-textfield-input" id="hpp_githubpagetoken" value="${config["hpp_githubpagetoken"]}"/>
      </div>
      
      
      
                  <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">GithubPage仓库用户名</label>
        <input class="mdui-textfield-input" id="hpp_githubpageusername" value="${config["hpp_githubpageusername"]}"/>
      </div>
      
      
                    <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">GithubPage仓库名</label>
        <input class="mdui-textfield-input" id="hpp_githubpagerepo" value="${config["hpp_githubpagerepo"]}"/>
      </div>
                   <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">GithubPage仓库根</label>
        <input class="mdui-textfield-input" id="hpp_githubpageroot" value="${config["hpp_githubpageroot"]}"/>
      </div>
                     <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">GithubPage仓库分支</label>
        <input class="mdui-textfield-input" id="hpp_githubpagebranch" value="${config["hpp_githubpagebranch"]}"/>
      </div>
                     
      
      
      
              </div></div>
            </div>
        
        
        
        
        
        
        
        
        <div class="mdui-panel-item mdui-panel-item-open " id="item-1">
              <div class="mdui-panel-item-header">CloudFlare配置(必填)</div>
              <div class="mdui-panel-item-body">
                <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">Global API Key</label>
        <input class="mdui-textfield-input" id="hpp_CF_Auth_Key" value="${config["hpp_CF_Auth_Key"]}"/>
      </div>
      
      
                <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">目标Workers名称</label>
        <input class="mdui-textfield-input" id="hpp_script_name" value="${config["hpp_script_name"]}"/>
      </div>
      
      
                  <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">Workers账户ID</label>
        <input class="mdui-textfield-input" id="hpp_account_identifier" value="${config["hpp_account_identifier"]}"/>
      </div>
      
      
                  <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">账户登录邮箱</label>
        <input class="mdui-textfield-input" id="hpp_Auth_Email" value="${config["hpp_Auth_Email"]}"/>
      </div>
      
      
                  
                     
      
      
      
              </div>
            </div>
        
        
        <div class="mdui-panel-item mdui-panel-item-open " id="item-1">
              <div class="mdui-panel-item-header">TwikooPlusPlus</div>
              <div class="mdui-panel-item-body">
           <label class="mdui-switch">
            <input type="checkbox" id="hpp_twikoo"/>
            <i class="mdui-switch-icon"></i>	开启TwikooPlusPlus功能
          </label>
          
          <div id="hpp_twikoo_ctx" style="display:none">
                <div class="mdui-textfield mdui-textfield-floating-label">
        <label class="mdui-textfield-label">Twikoo环境ID</label>
        <input class="mdui-textfield-input" id="hpp_twikoo_envId" value="${config["hpp_twikoo_envId"]}"/>
      </div>
      
      
              
      
                  
                     
      
      
      
              </div></div>
            </div>
        
        <div class="mdui-panel-item mdui-panel-item-open " id="item-1">
              <div class="mdui-panel-item-header">附加配置</div>
              <div class="mdui-panel-item-body">
                
      
      
               <label class="mdui-switch">
            <input type="checkbox" id="hpp_autodate"/>
            <i class="mdui-switch-icon"></i>	自动签到功能
          </label>
      
                  
                     
      
      
      
              </div>
            </div>
        
        
          </div>
        </div>
      </div>
    <button class="mdui-btn mdui-btn-raised mdui-center" onclick="upload()" id="bbb">提交配置</button>
    </div>
      <div class="mdui-dialog" id="dialogerr">
        <div class="mdui-dialog-title">出错了！</div>
        <div class="mdui-dialog-content">上传失败！可能是网络原因，请重试</div>
      </div>
      
        <div class="mdui-dialog" id="dialogok">
        <div class="mdui-dialog-title">上传成功！</div>
        <div class="mdui-dialog-content">点击OK进入主面板</div>
      <div class="mdui-dialog-actions">
          <button class="mdui-btn mdui-ripple" onclick="window.location.reload()">OK</button>
        </div>
      </div>
    <script src="https://cdn.jsdelivr.net/npm/mdui@1.0.1/dist/js/mdui.min.js"></script>
    
    <script>
    document.getElementById('hpp_img').checked = ${config["hpp_img"]}
    document.getElementById('hpp_githubpage').checked = ${config["hpp_githubpage"]}
    document.getElementById('hpp_twikoo').checked = ${config["hpp_twikoo"]}
    document.getElementById('hpp_autodate').checked = ${config["hpp_autodate"]}
    document.getElementById('hpp_yuque').checked = ${config["hpp_yuque"]}
    </script>
    <script src="${hpp_CDN}install.js"></script>
    </body>
    </html>`
    },
    loginhtml: function (hpp_CDN) {
        return `
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
      <link rel="stylesheet" href="${hpp_CDN}login.css" /> 
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
      <script src="${hpp_CDN}md5.js"></script>
      <script>
    document.onkeydown=keyListener;
    function login(){
    document.cookie = "username=" + md5(document.getElementById("username").value);
    document.cookie = "password=" + md5(document.getElementById("password").value);
    window.location.href = '/hpp/admin/dash/home';
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
    `},
    dash404: `<div class="content"><div class="container-fluid"><div class="row"><div class="col-md-12"><div class="card"><div class="card-header card-header-primary"><h4 class="card-title">404</h4><p class="card-category">我们不知道您的需求</p></div></br><div class="card-body"><a href="/hpp/admin/dash/home">回到主页</a></div></div></div></div></div></div>`,
    dashhome: function (hpp_ver) {
        return `<div class="content">
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
</div>`},
    dashedit: `<div class="content">
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
</div>`,
    dasheditjs: function (hpp_highlight_style) {
        return `<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/npm/notyf/notyf.min.css' /> 
<script src="https://cdn.jsdelivr.net/npm/notyf/notyf.min.js"></script><script src="https://cdn.jsdelivr.net/gh/indrimuska/jquery-editable-select/dist/jquery-editable-select.min.js"></script><script src='${hpp_CDN}edit.js'></script><script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery-lazy@1.7.11/jquery.lazy.min.js"></script><script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery-lazy@1.7.11/jquery.lazy.plugins.min.js"></script><link rel="stylesheet" href="${hpp_CDN}OwO.min.css">
<script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.5.0/build/highlight.min.js"></script>
<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.5.0/build/styles/${hpp_highlight_style}.min.css' />`
    },
    dashtalk: `<div class="content">
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
  </div>`,
    dashtalkjs: function (hpp_CDN) { return `<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/npm/notyf/notyf.min.css' /> <script src="https://cdn.jsdelivr.net/npm/notyf/notyf.min.js"></script><link rel="stylesheet" href="${hpp_CDN}talk.css" /><script src='${hpp_CDN}talk.js'></script><script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery-lazy@1.7.11/jquery.lazy.min.js"></script><script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery-lazy@1.7.11/jquery.lazy.plugins.min.js"></script><link rel="stylesheet" href="${hpp_CDN}OwO.min.css">` },
    dashdocs: `
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
      </div>`,
    dashimg: `<div class="content">
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
    </div>`,
    dashtool: `<div class="content">
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
}
