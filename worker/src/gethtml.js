import lang from './i18n/language'


import html_erorr from 'html-loader!./html/error.html'


import html_install_hello from 'html-loader!./html/install/hello.html'
import html_install_index from 'html-loader!./html/install/index.html'

import html_install_check from 'html-loader!./html/install/src/check.html'
import html_install_cf from 'html-loader!./html/install/src/cf.html'
import html_install_player from 'html-loader!./html/install/src/player.html'

const gethtml = (hinfo) => {
  String.prototype.preout = function () {
    let n = this
    for (var i in lang) {
      n = n.replace(new RegExp(`::${i}::`, "g"), lang[i])

    }

    return n
      .replace(/::CDN::/g, hinfo.CDN)
      .replace(/::VER::/g, hinfo.ver)
  }
  return {


    hello: () => {
      return html_install_hello
    }
    ,
    check: () => {
      return html_install_index
        .replace(/::BODY::/g, html_install_check)
        .preout()
    }
    ,
    cf: () => {
      return html_install_index
        .replace(/::BODY::/g, html_install_cf)
        .preout()
    }

    ,
    player: () => {
      return html_install_index
        .replace(/::BODY::/g, html_install_player)
        .preout()
    }
    ,
    error: (errormsg, b) => {
      b = b ? b : [
        { url: "https://hexoplusplus.js.org", des: "::DOCUMENT::" },
        { url: "https://github.com/HexoPlusPlus/HexoPlusPlus", des: "Github" },
        { url: "https://jq.qq.com/?_wv=1027&k=rAcnhzqK", des: "::HELP_FROM_QQGROUP::" }
      ]
      return html_error
        .replace(/::NAV::/g, (() => {
          let rpb = ""
          for (var k = 0; k < getJsonLength(b); k++) {
            if (!!(b[k])) {
              rpb += `<a class="current-demo"
                href="${b[k].url}">${b[k].des}</a>\n`
            }
          }
          return rpb
        })())
        .replace(/::ERROR_MSG::/g, errormsg ? errormsg : "LANG_UNKNOW_ERROR")
        .preout()
    }

  }
}

export default gethtml
