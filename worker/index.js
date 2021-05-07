const md5 = require('md5')
import { gethtml } from './src/gethtml'
import { getCookie, getJsonLength, rp, formatconfig, getname, getsuffix, genjsonres } from './src/scaffold'
import { ghupload, ghdel, ghget, ghlatver, ghlatinfo } from './src/github/manager'
import { hppupdate } from './src/update.js'
import { githubroute,dashroute } from './src/router/router.js'
import { htalk } from './src/talk/htalk/index'
import { genactiveres } from './src/getblogeractive'
//const hpp_CDNver = "91dcf20"

let hinfo = {
  ver: "HexoPlusPlus@1.2.1_β_3",
  CDN: `https://hppstatic.pages.dev/`
}

const hpp_ver = hinfo.ver
const hpp_CDN = hinfo.CDN
let hpp_logstatus
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})


async function handleRequest(request) {
  try {
    hpp_logstatus = true
    const req = request
    const urlStr = req.url
    const urlObj = new URL(urlStr)
    const path = urlObj.href.substr(urlObj.origin.length)
    const domain = (urlStr.split('/'))[2]
    const username = hpp_username.split(",");
    const password = hpp_password.split(",");
    hinfo.username = username



    const hpp_config = await KVNAME.get("hpp_config")

    /*不能将KVGET的时候获取为json,否则报错*/

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


    for (var w = 0; w < getJsonLength(username); w++) {
      if (getCookie(request, "password") == md5(password[w]) && getCookie(request, "username") == md5(username[w])) {
        hpp_logstatus = true
      }
    }
    if (path.startsWith('/hpp/admin')) {
      if (hpp_logstatus) {

        if (rp(path) == '/hpp/admin/api/upconfig') {
          const config_r = JSON.stringify(await request.text())
          await KVNAME.put("hpp_config", config_r)
          return new Response("OK")
        }
        if (rp(path) == "/hpp/admin/install") {
          let hpp_installhtml = gethtml.installhtml(config, hinfo)
          return new Response(hpp_installhtml, {
            headers: { "content-type": "text/html;charset=UTF-8" }
          })

        }

        /*主面板*/
        if (path.startsWith("/hpp/admin/dash")) {
          return dashroute(request,config,hinfo)
        }


        if (rp(path) == '/hpp/admin/api/github') {

          return githubroute(request,config)
        }

        if (rp(path) == '/hpp/admin/api/update') {
          try {
            const apireq = await request.json()
            switch (apireq.action) {
              case 'update':
                if (apireq.dev) {
                  return hppupdate(config, true)
                } else {
                  return hppupdate(config, false)
                }
              case 'check':
                if (await ghlatver(config, false) == hpp_info.ver) {
                  return genjsonres('不需要更新!', 0, 200)
                } else {
                  return genjsonres('需要更新!', 1, 200, ghlatinfo(config))
                }
            }
          } catch (lo) { throw lo }

        }
        /*
        
        
                  if (rp(path) == "/hpp/admin/api/del_all") {
                    await KVNAME.delete("hpp_config")
                    return new Response('OK')
                  }
                  if (rp(path) == "/hpp/admin/api/get_config") { return new Response(await JSON.parse(hpp_config)) }
                  if (rp(path) == "/hpp/admin/api/edit_config") {
                    let req_con = await JSON.parse(await request.text())
                    let _index = req_con["index"]
                    let _value = req_con["value"]
                    let k = await JSON.parse(await JSON.parse(hpp_config))
                    k[_index] = _value
                    k = await JSON.stringify(k)
                    await KVNAME.put("hpp_config", await JSON.stringify(k))
                    return new Response('OK')
                  }
                  if (rp(path) == "/hpp/admin/api/del_config") {
                    let _index = await request.text()
                    let k = await JSON.parse(await JSON.parse(hpp_config))
                    delete k[_index]
                    await KVNAME.put("hpp_config", await JSON.stringify(await JSON.stringify(k)))
                    return new Response('OK')
                  }
        
                  */
        if (rp(path) == '/hpp/admin/api/kick') {
          const now = Date.now(new Date())
          await KVNAME.put("hpp_activetime", now)
          //const hpp_kvwait = Date.now(new Date()) - now
          return new Response("OK")
        }


        //End


        if (rp(path) == '/hpp/admin/api/talk/htalk') {
          return htalk(config, request, loginstatus, hinfo)
        }


        if (rp(path) == '/hpp/admin/api/talk/artitalk') {
          return new Response('Come Soon!')
        }


        /*
      
                if (rp(path) == "/hpp/admin/api/addtalk") {
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
                if (rp(path) == "/hpp/admin/api/deltalk") {
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
                if (rp(path) == "/hpp/admin/api/visibletalk") {
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
                if (rp(path) == "/hpp/admin/api/inputtalk") {
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
                if (rp(path) == "/hpp/admin/api/gethpptalk") {
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
      
      
               */

      }
      else {
        if (rp(path) == '/hpp/admin/login') {
          return new Response(gethtml.loginhtml(config), {
            headers: { "content-type": "text/html;charset=UTF-8" }
          })
        }

        return Response.redirect(`https://${domain}/hpp/admin/login`, 302)
      }
      return Response.redirect(`https://${domain}/hpp/admin/dash/home`, 302)
    }
    if (path.startsWith('/hpp/api')) {

      if (rp(path) == "/hpp/api/getblogeractive") {
        return genactiveres(config)
      }


      /*
            if (rp(path) == "/hpp/api/twikoo") {
              const hpp_config = await JSON.parse(await JSON.parse(await KVNAME.get("hpp_config")));
              const env_id = hpp_config["hpp_twikoo_envId"]
              const hpp_cors = hpp_config["hpp_cors"]
              const url = "https://tcb-api.tencentcloudapi.com/web?env=" + env_id
              async function get_refresh_token() {
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
            }*/
      if (path.startsWith('/hpp/api/talk/')) {
        if (rp(path) == "/hpp/api/talk/htalk") {
          return htalk(config, request, false, hinfo)
        }

        if (rp(path) == '/hpp/api/talk/artitalk') {
          return new Response('Come Soon!')
        }
      }
      if (path.startsWith('/hpp/api/comment/')) {
        if (rp(path) == "/hpp/api/comment/Feign_Valine") {
          return new Response('Come Soon!')
        }
        if (rp(path) == "/hpp/api/comment/Agent_Valine") {
          return new Response('Come Soon!')
        }



        if (rp(path) == "/hpp/api/comment/Feign_Waline") {
          return new Response('Come Soon!')
        }
        if (rp(path) == "/hpp/api/comment/Agent_Waline") {
          return new Response('Come Soon!')
        }


        if (rp(path) == "/hpp/api/comment/Feign_Artalk") {
          return new Response('Come Soon!')
        }
        if (rp(path) == "/hpp/api/comment/Agent_Artalk") {
          return new Response('Come Soon!')
        }


        if (rp(path) == "/hpp/api/comment/Feign_Twikoo") {
          return new Response('Come Soon!')
        }
        if (rp(path) == "/hpp/api/comment/Feign_Twikoo") {
          return new Response('Come Soon!')
        }

        if (rp(path) == "/hpp/api/comment/Agent_Disqus") {
          return new Response('Come Soon!')
        }

        if (rp(path) == "/hpp/api/comment/Agent_Gitalk") {
          return new Response('Come Soon!')
        }
      }

    }
    /* 
        if (hpp_githubpage != "true") {
    
          
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
    
        */
    return new Response(gethtml.errorpage('未知的操作', hinfo, [
      { url: `/hpp/admin/dash/home`, des: "仪表盘" }
    ]), {
      headers: { "content-type": "text/html;charset=UTF-8" }
    })
  } catch (e) {

    return new Response(gethtml.errorpage(e, hinfo), {
      headers: { "content-type": "text/html;charset=UTF-8" }
    })

  }
}

