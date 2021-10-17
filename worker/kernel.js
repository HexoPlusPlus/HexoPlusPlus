/*
TWO_FACTOR 变量 二步验证密钥
totp 函数 二步验证
*/

const md5 = require('md5')
import lang from './src/i18n/language'
//import yaml from  'js-yaml'
//yaml.load()
import gethtml from './src/gethtml'
import { formatconfig } from './src/config'
import { getCookie, getJsonLength, rp, getname, getsuffix, genjsonres } from './src/scaffold'
import { githubroute, dashroute, updateroute } from './src/router/router.js'
import { htalk } from './src/talk/htalk/index'
import { genactiveres } from './src/getblogeractive'


import totp from './src/totp/totp'

//import installpage from './src/install'

import { hpage } from './src/hpage'
import pack from './../package.json'
import recaptcha from './src/captcha/recaptcha'

import gres from './src/gres'


let hinfo = {
  ver: pack.version,
  CDN: pack.CDN,
  dev: true,
  login: false
}

if (hinfo.dev) { hinfo.CDN = 'https://127.0.0.1:9999/' }


export async function hexoplusplus(request) {

  //初始化 - 变量绑定
  const req = request
  const urlStr = req.url
  const urlObj = new URL(urlStr)
  const path = urlObj.href.substr(urlObj.origin.length)
  const domain = (urlStr.split('/'))[2]


  //检查配置

  hinfo.config = await formatconfig()



  //检查安装
/* 

  if (!hinfo.config.installed || hinfo.config.nokv) {
    if (rp(path) === '/hpp/admin/install') {
      return installpage(req, hinfo)
    } else {
      return Response.redirect(`https://${domain}/hpp/admin/install`, 302)
    }
  }


*/
  //检查登陆

  const username = hpp_username
  const password = hpp_password
  const maph = new Map(request.headers);
  hinfo.login = (() => {
    for (var w = 0; w < getJsonLength(username); w++) {
      if (
        (getCookie(request, "h_cookie_auth") === `${md5(username[w])}:${md5(password[w])}`)//Cookie登陆，此时要求人机验证
        &&
        (async () => {
          if (hinfo.config.recaptcha !== "") {
            return recaptcha(getCookie(request, "h_recaptcha_auth"))
          } else {
            return true
          }
        })()//人机验证
        ||
        ((() => {
          try {
            if (maph.get('h_basic_auth') === `${md5(username[w])}:${md5(password[w])}:${md5(totp(TWO_FACTOR))}`) {
              return true
            } else {
              return false
            }
          }
          catch (p) {
            return false
          }
        })())//Header登陆，要求二步验证

      ) {
        hinfo.username = username[w]
        return true
      } else {
        hinfo.username = null
        return false
      }
    }
  })()

  switch (rp(path)) {
    case '/hpp/lang':
      return gres({ type: "json", ctx: lang.LANG })
    default:
      return new Response('')
  }

}