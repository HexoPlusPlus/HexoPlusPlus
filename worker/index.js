const md5 = require('md5')
import { gethtml } from './src/gethtml'
import { ghupload } from './github/upload'
import { getCookie, getJsonLength, rp, formatconfig, getname, getsuffix } from './src/scaffold'
//const hpp_CDNver = "91dcf20"
const hpp_ver = "HexoPlusPlus@1.2.1_β_3"
const hpp_CDN = `https://hppstatic.pages.dev/`
let hpp_logstatus = 0
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})


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



    const hpp_config = await KVNAME.get("hpp_config")
    const config = formatconfig(JSON.parse(JSON.parse(hpp_config)))
    /*
    const hpp_domain = config["hpp_domain"]
    const hpp_userimage = config["hpp_userimage"]
    const hpp_title = config["hpp_title"]
    const hpp_usericon = config["hpp_usericon"]
    const hpp_cors = config["hpp_cors"]
    const hpp_githubdoctoken = config["hpp_githubdoctoken"]

    const hpp_githubdocusername = config["hpp_githubdocusername"]
    const hpp_githubdocrepo = config["hpp_githubdocrepo"]
    const hpp_githubdocroot = config["hpp_githubdocroot"]
    const hpp_githubdocbranch = config["hpp_githubdocbranch"]

    const hpp_githubpage = config["hpp_githubpage"]
    const hpp_githubpagetoken = config["hpp_githubpagetoken"]
    const hpp_githubpageusername = config["hpp_githubpageusername"]
    const hpp_githubpagerepo = config["hpp_githubpagerepo"]
    const hpp_githubpageroot = config["hpp_githubpageroot"]
    const hpp_githubpagebranch = config["hpp_githubpagebranch"]

    const hpp_img = config["hpp_img"] || "false"

    const hpp_ownimgurl = config["hpp_ownimgurl"]
    const hpp_ownimgname = config["hpp_ownimgname"]
    const hpp_ownimgjsonpath = config["hpp_ownimgjsonpath"]
    const hpp_ownimgheader = config["hpp_ownimgheader"]
    const hpp_ownimgmethod = config["hpp_ownimgmethod"]

    const hpp_githubimagetoken = config["hpp_githubimagetoken"]
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
    const hpp_twikoo = config["hpp_twikoo"] || "false"
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
    const hpp_color = config["hpp_color"] || "rose"
    const hpp_bg_color = config["hpp_bg_color"] || "white"
    const hpp_theme_mode = config["hpp_theme_mode"] || "light"
    const hpp_page_limit = config["hpp_page_limit"] || "10"
*/


    for (var i = 0; i < getJsonLength(username); i++) {
      if (getCookie(request, "password") == md5(password[i]) && getCookie(request, "username") == md5(username[i])) {
        hpp_logstatus = 1
      }
    }
    if (path.startsWith('/hpp/admin')) {
      if (hpp_logstatus == 1) {

        if (path == '/hpp/admin/api/upconfig') {
          const config_r = JSON.stringify(await request.text())
          await KVNAME.put("hpp_config", config_r)
          return new Response("OK")
        }
        if (hpp_config === null || rp(path) == "/hpp/admin/install") {

          let hpp_installhtml = gethtml.installhtml(config, hpp_CDN, hpp_ver)
          return new Response(hpp_installhtml, {
            headers: { "content-type": "text/html;charset=UTF-8" }
          })

        } else {


          if (config.hpp_autodate == "True") {
            const now = Date.now(new Date())
            await KVNAME.put("hpp_activetime", now)
            const hpp_kvwait = Date.now(new Date()) - now
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
            let hpp_init = gethtml.dash404
            if (path == "/hpp/admin/dash/home") {
              hpp_home_act = " active"
              hpp_init = gethtml.dashhome(hpp_ver)
              hpp_js = `<script src='${hpp_CDN}home.js'></script>`
            }
            if (path == "/hpp/admin/dash/edit") {
              hpp_edit_act = " active"
              hpp_init = gethtml.dashedit
              hpp_js = gethtml.dasheditjs(config.hpp_highlight_style)
            }
            if (path == "/hpp/admin/dash/talk") {
              hpp_talk_act = " active"
              hpp_init = gethtml.dashtalk
              hpp_js = gethtml.dashtalkjs(hpp_CDN)
            }
            if (path == "/hpp/admin/dash/docs_man") {
              hpp_docs_man_act = " active"
              hpp_init = gethtml.dashdocs
              hpp_js = `<script src='${hpp_CDN}doc_man.js'></script>`

            }
            if (path == "/hpp/admin/dash/img_man") {
              hpp_img_man_act = " active"
              hpp_init = gethtml.dashimg
              hpp_js = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/brutaldesign/swipebox/src/css/swipebox.css"><script src='${hpp_CDN}img_man.js'></script><script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery-lazy@1.7.11/jquery.lazy.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/jquery-lazy@1.7.11/jquery.lazy.plugins.min.js"></script><script src="https://cdn.jsdelivr.net/gh/brutaldesign/swipebox/src/js/jquery.swipebox.min.js"></script>`

            }
            if (path == "/hpp/admin/dash/tool") {
              hpp_tool_act = " active"
              hpp_init = gethtml.dashtool
              hpp_js = `<script src='${hpp_CDN}tool.js'></script>`
            }
            /* if (path == "/hpp/admin/dash/set") {
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
               hpp_js = `<script src='${hpp_CDN}config.js'></script>`
             }*/

            /*
             let hpp_plugin = ""
            if (hpp_plugin_css != undefined) { hpp_plugin += `<link rel="stylesheet" type="text/css" href="${hpp_plugin_css}" />` }
            if (hpp_plugin_js != undefined) { hpp_js += `<script src="${hpp_plugin_js}"></script>` }
            */
            let hpp_dash_head = gethtml.dashhead
            let hpp_dash_foot = `
            <!--innerHTMLEND-->
</div>
</div>
<script src="https://cdn.jsdelivr.net/npm/jquery@2.2.4"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert/dist/sweetalert.min.js"></script>
<script src="${hpp_CDN}admin_all.js"></script>

</body>

</html>`
            let hpp_dash = `${hpp_dash_head}${hpp_init}${hpp_dash_foot}`
            return new Response(hpp_dash, {
              headers: { "content-type": "text/html;charset=UTF-8" }
            })














          }
          if (path.startsWith("/hpp/admin/api/adddoc/")) {
            /*
                        const file = await request.text()
                        const filename = getname(path)
                        const url = `https://api.github.com/repos/${config.hpp_githubdocusername}/${config.hpp_githubdocrepo}/contents${config.githubdocpath}${filename}?ref=${config.hpp_githubdocbranch}`
                        const hpp_sha = (JSON.parse(await (await fetch(url, hpp_githubgetdocinit)).text())).sha
                        const hpp_body = {
                          branch: config.hpp_githubdocbranch, message: `Upload from ${hpp_ver} By ${config.hpp_githubdocusername}`, content: file, sha: hpp_sha
                        }
                        const hpp_docputinit = {
                          body: JSON.stringify(hpp_body),
                          method: "PUT",
                          headers: {
                            "content-type": "application/json;charset=UTF-8",
                            "user-agent": hpp_ver,
                            "Authorization": "token " + config.hpp_githubdoctoken
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
            */
            const hpp_r = await ghupload({
              file: await request.text(),
              username: config.hpp_githubdocusername,
              reponame: config.config.hpp_githubdocrepo,
              path: config.githubdocpath,
              branch: config.hpp_githubdocbranch,
              filename: getname(path),
              token: config.hpp_githubdoctoken
            })
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
            const filename = getname(path)
            const url = `https://api.github.com/repos/${config.hpp_githubdocusername}/${config.hpp_githubdocrepo}/contents${config.githubdocdraftpath}${filename}?ref=${config.hpp_githubdocbranch}`
            const hpp_sha = (JSON.parse(await (await fetch(url, hpp_githubgetdocinit)).text())).sha
            const hpp_body = {
              branch: config.hpp_githubdocbranch, message: `Upload draft from ${hpp_ver} By ${config.hpp_githubdocusername}`, content: file, sha: hpp_sha
            }
            const hpp_docputinit = {
              body: JSON.stringify(hpp_body),
              method: "PUT",
              headers: {
                "content-type": "application/json;charset=UTF-8",
                "user-agent": hpp_ver,
                "Authorization": "token " + config.hpp_githubdoctoken
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
            const filename = getname(path)

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
            const update_script = await (await fetch(`https://raw.githubusercontent.com/HexoPlusPlus/HexoPlusPlus/main/worker/dist/main.js`)).text()
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
            const update_script = await (await fetch(`https://raw.githubusercontent.com/HexoPlusPlus/HexoPlusPlus/dev/worker/dist/main.js`)).text()
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
          return new Response(gethtml.loginhtml(hpp_CDN), {
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
        if (twikoo_code == 'CHECK_LOGIN_FAILED' | twikoo_code == 'INVALID_PARAM' | twikoo_code == 'PERMISSION_DENIED') {
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
	<link rel="stylesheet" href="${hpp_CDN}talk.css" /> 
<script src="${hpp_CDN}talk_user.js"></script>
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

    if (hpp_githubpage != "true") {

      let hpp_errorhtml = `
<!DOCTYPE html>
<html lang="en" class="no-js">
	<head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" /> 
        <title>HexoPlusPlusError</title>
        <link rel="stylesheet" type="text/css" href="${hpp_CDN}error.css" />
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
        <script src="${hpp_CDN}error.js"></script>
	</body>
</html>
`
      return new Response(hpp_errorhtml, {
        headers: { "content-type": "text/html;charset=UTF-8" }
      })
    } else {
      let p = path.split("?")[0].substr(1)
      let init
      if (p.split("/").slice(-1) == "") { p += "index.html" }
      if (p == "2021/04/02/en/index.html" && urlObj.searchParams.get('pass') != "1234") {
        init = { headers: { "content-type": "text/html; charset=utf-8" } }
        let anss = `<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> 
<meta charset="UTF-8"> 
<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
<meta name="renderer" content="webkit"> 
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>该文章已被加密</title>
</head>
<body>
    <div class="main">
        <img class="alert" alt="文章已被加密" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIoAAACACAMAAADjwgEwAAAAOVBMVEUAAAD5dBr7dRj4dBn/cBD5cxr4cxn6chj7dBj/cBj5cxr5dBn6cxn4dBn5cxr6dRX5cxr5cxr5dBoQJfbPAAAAEnRSTlMAgD/AEPDgYEAgoLCQcFAw0J/MNdW8AAADg0lEQVR42s3b7W7iMBSEYWftxA75At//xW7VZRWnQ3WkvOKE+VmJMtjxg8Ek4Iy5e8zdmsLFSXmoz8QSrsw61CZxDJdlrsf0OVyUR5WALrDJh3SZ68uswT1rfZ3e/dpNff0lMTjnVr/yEVO01SZdWae6Z/CFNzYXxxa+kttqwTHl2ORHl95zWBrvl/BMM0e34JZ8XC+6phwWtD7ptv95uWBBdzIVMm0luGTshVYB+B5ccvt12Ubnt8Xt91Vb3JyzX/rk5Jy+cr2M3Jyzl8nMnOO6Bewc103TMee4btw5rpsmA+e4bm7O2boh57huS9twyaODc7Zu43fBR3J1bni1q0/Pv0bgHNNNl3cGzgHdyouhmqBzXLf9SZ2c01HXKsA5pptWcXJOV6hWAc5R3bQKcI7qplUcnLs3uhlV1Ln5bboZVd7rXGqdMKuoQ9ObdDOqAOeAbkYVY0fOdTOqAOeAblLFEOAdutlVbOe4bmYV4BzQzahiOId104DPrVw3uwp3zv5fdhXgHNDNqAKcs3Sbw4kqhnNAN7vK25yLhlFGFcM5pJtdBTtn65ZPVDGcY7rZVbhzpgmgitgEdQNV5DUx3UAV5pxebaCKOMd0A1WYcyoTqKJWIt1AFeSczi6rou+rQDdQBTmnEoAqzLn9cfvjYBXdmQLdQBXgnOrGq+j7PNANVAHOiW6gCnBO2idQBTunuvEqtnPoxE2rgJXJdNMqyCt8OqsnH8A5NoZ6HgScoyf5+ykZ+raGr7f97PCWwD4I6iYnquCbPa4b/0aA6OZwgo9/NwV2IEC3950YeP7GTp1DuhkBzpkDx2M7x3XTAOfMRWZn7OJwn5YETjCQbjqtw8qc47o95GHAOaTbUptswDmkm/6aPwLnsG65HpKQc/rqtvP3fRTgHNUt1kM67tx49u6RqR6SgXNIt30097mlzpXT5G+1zQD2c3zvFmV+kHM6aedgieDBz2GZyN5t2+87TGQ/131PGdu7pa7/Hs/M9nPDD2i3cCqllA3s5/bnjqKbY4bDDLXFQOiwxJaGe/BP2gcihCLQuiZKlV1f58zNDmr9lNtLSyg+C8jeKrSXbX/pCqqHxdyvwTO6j53qnvu8/nFLfgz1uGXJ9SMy/sP3A3J7fhq7Pv34f21fnkUWt3eUtDTVSzPL1u6SKGfjrV6TvtM98bhccMlMOYWXSWXpHJNLaPMXZ8oyOMxlLIsAAAAASUVORK5CYII=">
        <form action="" method="GET" class="hpp-side-form">
            <h2 class="pw-tip">该文章已被加密</h2>
            <input type="password" name="pass" placeholder="请输入访问密码查看" required><button type="submit">提交</button>
            
            
        </form>
        <a href="/" class="return-home" title="点击回到网站首页">- 返回首页 - </a>
    </div>
    <style type="text/css">
    *{font-family:"Microsoft Yahei",微软雅黑,"Helvetica Neue",Helvetica,"Hiragino Sans GB","WenQuanYi Micro Hei",sans-serif;box-sizing:border-box;margin:0px;padding:0px;font-size:14px;-webkit-transition:.2s;-moz-transition:.2s;-ms-transition:.2s;-o-transition:.2s;transition:.2s}
    html,body{width:100%;height:100%}
    body{background-color:#F4F6F9;color:#768093}
    input,button{font-size:1em;border-radius:3px;-webkit-appearance:none}
    input{width:100%;padding:5px;box-sizing:border-box;border:1px solid #e5e9ef;background-color:#f4f5f7;resize:vertical}
    input:focus{background-color:#fff;outline:none}
    button{border:0;background:#6abd09;color:#fff;cursor:pointer;opacity:1;user-select:none}
    button:hover,button:focus{opacity:.9}
    button:active{opacity:1}
    .main{width:100%;max-width:500px;height:300px;padding:30px;background-color:#fff;border-radius:2px;box-shadow:0 10px 60px 0 rgba(29,29,31,0.09);transition:all .12s ease-out;position:absolute;left:0;top:0;bottom:0;right:0;margin:auto;text-align:center}
    .alert{width:80px}
    .hpp-side-form{margin-bottom:28px}
    .hpp-side-form input{float:left;padding:2px 10px;width:77%;height:37px;border:1px solid #ebebeb;border-right-color:transparent;border-radius:2px 0 0 2px;line-height:37px}
    .hpp-side-form button{position:relative;overflow:visible;width:23%;height:37px;border-radius:0 2px 2px 0;text-transform:uppercase}
    .pw-tip{font-weight:normal;font-size:26px;text-align:center;margin:25px auto}
    #pw-error {color: red;margin-top: 15px;margin-bottom: -20px;}
    .return-home{text-decoration:none;color:#b1b1b1;font-size:16px}
    .return-home:hover{color:#1E9FFF;letter-spacing:5px}
    </style>
</body>
</html>`
        return new Response(anss, init)
      }
      const anss = await fetch(`https://raw.githubusercontent.com/${hpp_githubpageusername}/${hpp_githubpagerepo}/${hpp_githubpagebranch}${hpp_githubpageroot}${p}`, { headers: { Accept: "application/vnd.github.v3.raw", Authorization: `token ${hpp_githubpagetoken}` } })

      if (await anss.status == 404) { init = { headers: { "content-type": "text/html; charset=utf-8" } }; return new Response(await (await fetch(`https://raw.githubusercontent.com/${hpp_githubpageusername}/${hpp_githubpagerepo}/${hpp_githubpagebranch}${hpp_githubpageroot}404.html`, { headers: { Accept: "application/vnd.github.v3.raw", Authorization: `token ${hpp_githubpagetoken}` } })).text(), init) }
      if ((p.split("/").slice(-1))[0].split(".")[1] == "html") {
        init = { headers: { "content-type": "text/html; charset=utf-8" } }
        return new Response(await anss.text(), init)
      }
      if ((p.split("/").slice(-1))[0].split(".")[1] == "js") {
        init = { headers: { "content-type": "application/javascript; charset=utf-8" } }
        return new Response(await anss.text(), init)
      }
      if ((p.split("/").slice(-1))[0].split(".")[1] == "css") {
        init = { headers: { "content-type": "text/css; charset=utf-8" } }
        return new Response(await anss.text(), init)
      }
      return new Response(anss, init)


    }
  } catch (e) {
    let hpp_errorhtml = `
<!DOCTYPE html>
<html lang="en" class="no-js">
	<head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" /> 
        <title>HexoPlusPlusError</title>
        <link rel="stylesheet" type="text/css" href="${hpp_CDN}error.css" />
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
        <script src="${hpp_CDN}error.js"></script>
	</body>
</html>
`
    return new Response(hpp_errorhtml, {
      headers: { "content-type": "text/html;charset=UTF-8" }
    })

  }
}

