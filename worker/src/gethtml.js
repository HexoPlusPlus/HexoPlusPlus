import lang from './i18n/language'


import html_erorr from 'html-loader!./html/error.html'


import html_install_hello from 'html-loader!./html/install/hello.html'
import html_install_index from 'html-loader!./html/install/index.html'
import html_install_lang from 'html-loader!./html/install/src/lang.html'

const gethtml = (hinfo) => {
  String.prototype.preout = function (html) {

    for (var i in lang) {
      html = html.replace(new RegExp(`::LANG_${i}::`), lang[i])
    }

    return html
      .replace(/::CDN::/g, hinfo.CDN)
  }
  return {


    hello: () => {
      return html_install_hello
    }

    ,
    lang:()=>{
      return html_install_index
      .replace(/::VER::/g,hinfo.ver)
      .replace(/::BODY::/g,html_install_lang)
    }

    ,
    error: (errormsg, b) => {
      b = b ? b : [
        { url: "https://hexoplusplus.js.org", des: "::LANG_DOCUMENT::" },
        { url: "https://github.com/HexoPlusPlus/HexoPlusPlus", des: "Github" },
        { url: "https://jq.qq.com/?_wv=1027&k=rAcnhzqK", des: "::LANG_HELP_FROM_QQGROUP::" }
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
