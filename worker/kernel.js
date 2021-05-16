const md5 = require('md5')
import { lang } from './src/i18n/language'
import { gethtml } from './src/gethtml'
import { formatconfig } from './src/config'
import { getCookie, getJsonLength, rp, getname, getsuffix, genjsonres } from './src/scaffold'
import { githubroute, dashroute, updateroute } from './src/router/router.js'
import { htalk } from './src/talk/htalk/index'
import { genactiveres } from './src/getblogeractive'
import { install } from './src/install'
import { hpage } from './src/hpage'

let hinfo = {
  ver: "HexoPlusPlus@2.0.0β3",
  CDN: `https://hppstatic.pages.dev/`,
  dev: true
}

if (hinfo.dev) { hinfo.CDN = 'https://127.0.0.1:9999/' }


let hpp_logstatus
export async function hexoplusplus(request) {
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

    if (rp(path) == '/hpp/lang') {
      return new Response(lang.LANG)
    }





    /*HPP Auth:Cookie&Basic*/
    for (var w = 0; w < getJsonLength(username); w++) {
      if ((getCookie(request, "h_cookie_auth") == `${md5(username[w])}:${md5(password[w])}`) || ((() => { try { if (maph.get('h_basic_auth') == `${md5(username[w])}:${md5(password[w])}`) { return true } else { return false } } catch (p) { return false } })())) {
        hpp_logstatus = true
      }
    }

    const config = await formatconfig()


    if (rp(path) == '/hpp/admin/install' && hpp_logstatus) {
      return install(config, hinfo, request)
    }

    if (!config.installed && hpp_logstatus) {
      return new Response(gethtml.errorpage(lang.EMPTY_HCONFIG, hinfo, [
        { url: `/hpp/admin/install`, des: lang.START_INSTALL }
      ]), {
        headers: { "content-type": "text/html;charset=UTF-8" }
      })
    }

    if (path.startsWith('/hpp/admin')) {
      if (rp(path) == "/hpp/admin/check") {
        if (hpp_logstatus) {
          return genjsonres(lang.CHECK_LOGIN_SUCCESS, 0, 200)
        } else {
          return genjsonres(lang.CHECK_LOGIN_ERROR, -1, 403)
        }
      }

      if (hpp_logstatus) {

        /*主面板*/
        if (path.startsWith("/hpp/admin/dash")) {
          return dashroute(request, config, hinfo)
        }

        /*GithubAPI*/
        if (rp(path) == '/hpp/admin/api/github') {

          return githubroute(request, config, hinfo)
        }
        /*更新*/
        if (rp(path) == '/hpp/admin/api/update') {
          return updateroute(request, config, hinfo)
        }

        /*签到*/
        if (rp(path) == '/hpp/admin/api/kick') {
          const now = Date.now(new Date())
          await HKV.put("hpp_activetime", now)
          return genjsonres(lang.ATTENDANCE_SUCCESS, 0, 200, "")
        }

        /*HTALK*/
        if (rp(path) == '/hpp/admin/api/talk/htalk') {
          return htalk(config, request, hpp_logstatus, hinfo)
        }


        if (rp(path) == '/hpp/admin/api/talk/artitalk') {
          return new Response(lang.COMING_SOON)
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
      /*游客端API*/
      /*获得最近活跃时间*/
      if (rp(path) == "/hpp/api/getblogeractive") {
        return genactiveres(config)
      }

      if (path.startsWith('/hpp/api/talk/')) {
        /*HTALK游客端*/
        if (rp(path) == "/hpp/api/talk/htalk") {
          return htalk(config, request, false, hinfo)
        }

        if (rp(path) == '/hpp/api/talk/artitalk') {
          return new Response(lang.COMING_SOON)
        }
      }
      if (path.startsWith('/hpp/api/comment/')) {

        /*评论区，Feign为KV+Worker伪装后端，Agent为代理和隐藏前端重要数据*/
        if (rp(path) == "/hpp/api/comment/Feign_Valine") {
          return new Response(lang.COMING_SOON)
        }
        if (rp(path) == "/hpp/api/comment/Agent_Valine") {
          return new Response(lang.COMING_SOON)
        }



        if (rp(path) == "/hpp/api/comment/Feign_Waline") {
          return new Response(lang.COMING_SOON)
        }
        if (rp(path) == "/hpp/api/comment/Agent_Waline") {
          return new Response(lang.COMING_SOON)
        }


        if (rp(path) == "/hpp/api/comment/Feign_Artalk") {
          return new Response(lang.COMING_SOON)
        }
        if (rp(path) == "/hpp/api/comment/Agent_Artalk") {
          return new Response(lang.COMING_SOON)
        }


        if (rp(path) == "/hpp/api/comment/Feign_Twikoo") {
          return new Response(lang.COMING_SOON)
        }
        if (rp(path) == "/hpp/api/comment/Feign_Twikoo") {
          return new Response(lang.COMING_SOON)
        }

        if (rp(path) == "/hpp/api/comment/Agent_Disqus") {
          return new Response(lang.COMING_SOON)
        }

        if (rp(path) == "/hpp/api/comment/Agent_Gitalk") {
          return new Response(lang.COMING_SOON)
        }
      }

    }

    /*HPAGE：支持PrivateRepo，提供类似于WorkerSite的功能*/
    if (config.hpp_hpage) {
      return hpage(config)
    }


    return new Response(gethtml.errorpage(lang.UNKNOW_ACTION, hinfo, [
      { url: `/hpp/admin/dash/home`, des: lang.DASHBOARD }
    ]), {
      headers: { "content-type": "text/html;charset=UTF-8" }
    })
  } catch (e) {

    return new Response(gethtml.errorpage(e, hinfo), {
      headers: { "content-type": "text/html;charset=UTF-8" }
    })

  }
}
