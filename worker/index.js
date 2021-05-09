const md5 = require('md5')
import { gethtml } from './src/gethtml'
import { getCookie, getJsonLength, rp, formatconfig, getname, getsuffix, genjsonres } from './src/scaffold'
import { ghupload, ghdel, ghget, ghlatver, ghlatinfo } from './src/github/manager'
import { hppupdate } from './src/update.js'
import { githubroute, dashroute } from './src/router/router.js'
import { htalk } from './src/talk/htalk/index'
import { genactiveres } from './src/getblogeractive'
import { install } from './src/install'
import { hpage } from './src/hpage'

let hinfo = {
  ver: "HexoPlusPlus@2.0.0β3",
  CDN: `https://hppstatic.pages.dev/`,
  dev: true
}

const hpp_ver = hinfo.ver
const hpp_CDN = hinfo.CDN
let hpp_logstatus
addEventListener("fetch", event => {
  /*
    const req = event.request
    const urlStr = req.url
    const urlObj = new URL(urlStr)
    const path = urlObj.href.substr(urlObj.origin.length)
    console.log(path)
    */

  /*
  使用WorkerSite + HPP 为未来提升兼容性
  */
  event.respondWith(hexoplusplus(event.request))
})


async function hexoplusplus(request) {
  try {
    hpp_logstatus = false
    const req = request
    const urlStr = req.url
    const urlObj = new URL(urlStr)
    const path = urlObj.href.substr(urlObj.origin.length)
    const domain = (urlStr.split('/'))[2]
    const username = hpp_username.split(",");
    const password = hpp_password.split(",");
    const maph = new Map(request.headers);
    hinfo.username = username






    /*HPP Auth:Cookie&Basic*/
    for (var w = 0; w < getJsonLength(username); w++) {
      if ((getCookie(request, "password") == md5(password[w]) && getCookie(request, "username") == md5(username[w])) || ((() => { try { if (maph.get('h_basic_auth') == `${md5(username[w])}:${md5(password[w])}`) { return true } else { return false } } catch (p) { return false } })())) {
        hpp_logstatus = true
      }
    }


    const hpp_config = await KVNAME.get("hpp_config")



    if (hpp_config === null && hpp_config.loginstatus) {
      return new Response(gethtml.errorpage('配置文件是空的，请安装', hinfo, [
        { url: `/hpp/admin/install`, des: "开始安装" }
      ]), {
        headers: { "content-type": "text/html;charset=UTF-8" }
      })
    }

    if (path.startsWith('/hpp/admin/install')) {
      return install(config, hinfo)
    }
    /*不能将KVGET的时候获取为json,否则报错*/

    const config = formatconfig(JSON.parse(JSON.parse(hpp_config)))

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
          return dashroute(request, config, hinfo)
        }


        if (rp(path) == '/hpp/admin/api/github') {

          return githubroute(request, config, hinfo)
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
        if (rp(path) == '/hpp/admin/api/kick') {
          const now = Date.now(new Date())
          await KVNAME.put("hpp_activetime", now)
          return new Response("OK")
        }


        if (rp(path) == '/hpp/admin/api/talk/htalk') {
          return htalk(config, request, loginstatus, hinfo)
        }


        if (rp(path) == '/hpp/admin/api/talk/artitalk') {
          return new Response('Coming Soon!')
        }


      }
      else {
        if (rp(path) == '/hpp/admin/login') {
          return new Response(gethtml.loginhtml(config, hinfo), {
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

      if (path.startsWith('/hpp/api/talk/')) {
        if (rp(path) == "/hpp/api/talk/htalk") {
          return htalk(config, request, false, hinfo)
        }

        if (rp(path) == '/hpp/api/talk/artitalk') {
          return new Response('Coming Soon!')
        }
      }
      if (path.startsWith('/hpp/api/comment/')) {
        if (rp(path) == "/hpp/api/comment/Feign_Valine") {
          return new Response('Coming Soon!')
        }
        if (rp(path) == "/hpp/api/comment/Agent_Valine") {
          return new Response('Coming Soon!')
        }



        if (rp(path) == "/hpp/api/comment/Feign_Waline") {
          return new Response('Coming Soon!')
        }
        if (rp(path) == "/hpp/api/comment/Agent_Waline") {
          return new Response('Coming Soon!')
        }


        if (rp(path) == "/hpp/api/comment/Feign_Artalk") {
          return new Response('Coming Soon!')
        }
        if (rp(path) == "/hpp/api/comment/Agent_Artalk") {
          return new Response('Coming Soon!')
        }


        if (rp(path) == "/hpp/api/comment/Feign_Twikoo") {
          return new Response('Coming Soon!')
        }
        if (rp(path) == "/hpp/api/comment/Feign_Twikoo") {
          return new Response('Coming Soon!')
        }

        if (rp(path) == "/hpp/api/comment/Agent_Disqus") {
          return new Response('Coming Soon!')
        }

        if (rp(path) == "/hpp/api/comment/Agent_Gitalk") {
          return new Response('Coming Soon!')
        }
      }

    }
    if (config.hpp_hpage) {
      return hpage(config)
    }


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

