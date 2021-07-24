/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 487:
/***/ ((module) => {

var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

module.exports = charenc;


/***/ }),

/***/ 12:
/***/ ((module) => {

(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        n[i] = crypt.endian(n[i]);
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
          else
            base64.push('=');
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();


/***/ }),

/***/ 738:
/***/ ((module) => {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ 568:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

(function(){
  var crypt = __webpack_require__(12),
      utf8 = __webpack_require__(487).utf8,
      isBuffer = __webpack_require__(738),
      bin = __webpack_require__(487).bin,

  // The core
  md5 = function (message, options) {
    // Convert to byte array
    if (message.constructor == String)
      if (options && options.encoding === 'binary')
        message = bin.stringToBytes(message);
      else
        message = utf8.stringToBytes(message);
    else if (isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message) && message.constructor !== Uint8Array)
      message = message.toString();
    // else, assume byte array already

    var m = crypt.bytesToWords(message),
        l = message.length * 8,
        a =  1732584193,
        b = -271733879,
        c = -1732584194,
        d =  271733878;

    // Swap endian
    for (var i = 0; i < m.length; i++) {
      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
    }

    // Padding
    m[l >>> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;

    // Method shortcuts
    var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;

    for (var i = 0; i < m.length; i += 16) {

      var aa = a,
          bb = b,
          cc = c,
          dd = d;

      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i+10], 17, -42063);
      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
      d = FF(d, a, b, c, m[i+13], 12, -40341101);
      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
      c = GG(c, d, a, b, m[i+11], 14,  643717713);
      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
      d = GG(d, a, b, c, m[i+10],  9,  38016083);
      c = GG(c, d, a, b, m[i+15], 14, -660478335);
      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
      b = HH(b, c, d, a, m[i+14], 23, -35309556);
      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
      a = HH(a, b, c, d, m[i+13],  4,  681279174);
      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
      d = HH(d, a, b, c, m[i+12], 11, -421815835);
      c = HH(c, d, a, b, m[i+15], 16,  530742520);
      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
      c = II(c, d, a, b, m[i+14], 15, -1416354905);
      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
      a = II(a, b, c, d, m[i+12],  6,  1700485571);
      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
      c = II(c, d, a, b, m[i+10], 15, -1051523);
      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
      d = II(d, a, b, c, m[i+15], 10, -30611744);
      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
      b = II(b, c, d, a, m[i+13], 21,  1309151649);
      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
      d = II(d, a, b, c, m[i+11], 10, -1120210379);
      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

      a = (a + aa) >>> 0;
      b = (b + bb) >>> 0;
      c = (c + cc) >>> 0;
      d = (d + dd) >>> 0;
    }

    return crypt.endian([a, b, c, d]);
  };

  // Auxiliary functions
  md5._ff  = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._gg  = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._hh  = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._ii  = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };

  // Package private blocksize
  md5._blocksize = 16;
  md5._digestsize = 16;

  module.exports = function (message, options) {
    if (message === undefined || message === null)
      throw new Error('Illegal argument ' + message);

    var digestbytes = crypt.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt.bytesToHex(digestbytes);
  };

})();


/***/ }),

/***/ 798:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";

;// CONCATENATED MODULE: ./worker/src/i18n/zh_CN.json
const zh_CN_namespaceObject = JSON.parse('{"LANG":"中文 - 简体","EMPTY_HCONFIG":"配置文件是空的，请安装","START_INSTALL":"开始安装","CHECK_LOGIN_SUCCESS":"已登录！","CHECK_LOGIN_ERROR":"Ooops！尚未登陆！","ATTENDANCE_SUCCESS":"签到成功！","COMING_SOON":"即将到来！","UNKNOW_ACTION":"未知的操作","UNKNOW_ERROR":"未知的错误","DASHBOARD":"仪表盘","GH_UPLOAD_SUCCESS":"上传文件到Github成功！","GH_UPLOAD_ERROR":"上传文件到Github失败！","GH_DELETE_SUCCESS":"从Github删除文件成功！","GH_DELETE_ERROR":"从Github删除文件失败！","GH_GET_SUCCESS":"获取文件成功！","GH_LIST_SUCCESS":"列表成功！","GH_TREELIST_SUCCESS":"树状列表成功！","NEED_UPDATE":"需要更新！","NEED_NOT_UPDATE":"不需要更新！","LOGIN_TRUE":"已登录","LOGIN_FALSE":"未登录","HTALK":"HTALK组件信息","HTALK_INIT_SUCCESS":"初始化成功！","HTALK_GET_SUCCESS":"在${1}的状态下,已成功获得说说数据","HTALK_UPLOAD_SUCCESS":"已成功上传说说数据","HTALK_DEL_SUCCESS":"已成功删除id为${1}的数据","HTALK_VISIBLE_SUCCESS":"已改变id为${1}的数据的可见性","HTALK_INPUT_SUCCESS":"已导入${1}条!","UPDATE_SUCCESS":"更新是成功的！","UPDATE_ERROR":"更新是失败的！","LOGIN":"登陆","LOGIN_DASH":"Hexo后台管理系统","WELCOME":"欢迎！","USERNAME":"用户名","PASSWORD":"密码","DASH_404":"我们不知道您的需求","DASH_BACK_TO_HOME":"回到主页","HPP":"HexoPlusPlus后台","HOME":"主页","MANAGE_IMG":"图片管理","MANAGE_SITE":"站点管理","MANAGE_DOC":"文章管理","EDIT":"书写","TALK":"说说","TOOL":"工具","SETTING":"设置","ATTENDANCE":"签到","EXIT":"退出登陆","LOVE_SUCCESS":"点赞成功","LOVE_ERROR":"点赞失败","RECAP_ERROR":"人机验证失败，可能是风险太高！","DOCUMENT":"文档","HELP_FROM_QQGROUP":"QQ群寻求帮助"}');
;// CONCATENATED MODULE: ./worker/src/i18n/en_US.json
const en_US_namespaceObject = JSON.parse('{"LANG":"English - United States of America","EMPTY_HCONFIG":"The configuration file is empty, please install!","START_INSTALL":"Installation has started","CHECK_LOGIN_SUCCESS":"Already logged in!","CHECK_LOGIN_ERROR":"Ooops! You are not logged in yet!","ATTENDANCE_SUCCESS":"check-in successfully!","COMING_SOON":"Coming soon!","UNKNOW_ACTION":"Unknown action","UNKNOW_ERROR":"Unknown error","DASHBOARD":"Dashboard","GH_UPLOAD_SUCCESS":"Upload file to GitHub successfully!","GH_UPLOAD_ERROR":"Error to upload file to GitHub!","GH_DELETE_SUCCESS":"File deleted from GitHub successfully!","GH_DELETE_ERROR":"Error to delete file from GitHub!","GH_GET_SUCCESS":"The file was successfully obtained!","GH_LIST_SUCCESS":"List successfully!","GH_TREELIST_SUCCESS":"Trees list successfully!","NEED_UPDATE":"Need to be updated!!!","NEED_NOT_UPDATE":"No need to be updated","LOGIN_TRUE":"Logged in","LOGIN_FALSE":"Not logged in","HTALK":"HTALK Component Info","HTALK_INIT_SUCCESS":"Initialization successful！","HTALK_GET_SUCCESS":"In the state of ${1}, the HTALK data has been successfully obtained","HTALK_UPLOAD_SUCCESS":"Successfully uploaded HTALK data","HTALK_DEL_SUCCESS":"The data with ID ${1} has been successfully deleted","HTALK_VISIBLE_SUCCESS":"Has changed the visibility of the data with ID ${1}","HTALK_INPUT_SUCCESS":"Imported ${1} items!","UPDATE_SUCCESS":"Update successful","UPDATE_ERROR":"Update failed","LOGIN":"Login","LOGIN_DASH":"Hexo Backend Management System","WELCOME":"Welcome!","USERNAME":"Username","PASSWORD":"Password","DASH_404":"We don\'t know what you need","DASH_BACK_TO_HOME":"Back to home","HPP":"HexoPlusPlus","HOME":"Home","MANAGE_IMG":"Image Management","MANAGE_SITE":"Site Management","MANAGE_DOC":"Article Management","EDIT":"Write","TALK":"HTALK","TOOL":"Tools","SETTING":"Settings","ATTENDANCE":"Check-in","EXIT":"Logout","LOVE_SUCCESS":"Like Success","LOVE_ERROR":"Failed to like","RECAP_ERROR":"CAPTCHA verification failed!"}');
;// CONCATENATED MODULE: ./worker/src/i18n/language.js


const all_lan = {
    zh_CN: zh_CN_namespaceObject,
    en_US: en_US_namespaceObject
}
const langtype = (() => {
    try {
        let lan = hpp_language
        if (!all_lan[lan]) {
            return 'zh_CN'
        }
        return lan
    } catch (n) {
        return 'zh_CN'
    }
})()

const language_lang = all_lan[langtype]

/* harmony default export */ const language = (language_lang); 
;// CONCATENATED MODULE: ./node_modules/html-loader/dist/cjs.js!./worker/src/html/install/hello.html
// Module
var code = "<!DOCTYPE html> <html> <head> <title>欢迎使用</title> </head> <link href=\"https://fonts.geekzu.org/css2?family=Noto+Sans+TC:wght@300&display=swap\" rel=\"stylesheet\"> <meta name=\"viewport\" content=\"width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no\"/> <style>body,html{width:100%;height:100%;margin:0;padding:0}body,div{display:flex;align-items:center;justify-content:center}*{font-family:'Noto Sans TC',sans-serif;text-align:center}.s{font-size:80px;animation:loading-fadein 4s infinite}.n{font-size:30px;animation:loading-fadein 8s infinite}@keyframes loading-fadein{0%{opacity:0}50%{opacity:.6}to{opacity:0}}</style> <body> <div> <h1 id=\"index\" class=\"s\">你好</h1> </div> </body> <script>window.get=e=>all[e%all.length],window.all=[\"欢迎！点我开始安装\",\"Welcome!Click Me To Install!\",\"Hola!¡Haga clic en mí para iniciar la instalación!\",\"你好！點擊我開始安裝！\"],document.body.addEventListener(\"click\",()=>{document.location.search=\"?step=check\"}),t=0,setInterval(()=>{const e=get(t);document.getElementById(\"index\").innerHTML=e,document.title=e,t++},4e3)</script> </html>";
// Exports
/* harmony default export */ const hello = (code);
;// CONCATENATED MODULE: ./node_modules/html-loader/dist/cjs.js!./worker/src/html/install/index.html
// Module
var install_code = "<!doctype html> <html lang=\"zh-cmn-Hans\"> <head> <meta charset=\"utf-8\"> <meta name=\"viewport\" content=\"width=device-width,initial-scale=1,maximum-scale=1,shrink-to-fit=no\"/> <meta name=\"renderer\" content=\"webkit\"/> <meta name=\"force-rendering\" content=\"webkit\"/> <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\"/> <title>HexoPlusPlus Installation</title> <link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/mdui@1.0.1/dist/css/mdui.min.css\"/> <style>.m-card{max-width:768px;margin:auto;margin-bottom:20px}</style> </head> <body> <div class=\"mdui-container\"> <div class=\"mdui-toolbar\"> <a class=\"mdui-btn mdui-btn-icon\" id=\"_menu\"><i class=\"mdui-icon material-icons\">menu</i></a> <span class=\"mdui-typo-title\">HexoPlusPlus - ::VER::</span> <div class=\"mdui-toolbar-spacer\"></div> </div> </div> <div class=\"mdui-drawer mdui-drawer-close\" id=\"drawer\"> <ul class=\"mdui-list\"> <li class=\"mdui-list-item mdui-ripple\" onclick='window.location.href=\"https://hexoplusplus.js.org\"'> <i class=\"mdui-icon material-icons\">book</i> <div class=\"mdui-list-item-content\">::DOCUMENT::</div> </li> <li class=\"mdui-list-item mdui-ripple\" onclick='window.location.href=\"https://github.com/HexoPlusPlus/HexoPlusPlus\"'> <i class=\"mdui-icon material-icons\">code</i> <div class=\"mdui-list-item-content\">Github</div> </li> </ul> </div> <div class=\"mdui-card m-card\"> <div class=\"mdui-card-content mdui-typo\"> ::BODY:: </div> </div> <script src=\"https://cdn.jsdelivr.net/npm/mdui@1.0.1/dist/js/mdui.min.js\"></script> <script>var inst=new mdui.Drawer(\"#drawer\");document.getElementById(\"_menu\").addEventListener(\"click\",(function(){inst.toggle()}));const setCookie=(e,t,n)=>{var i=new Date;i.setTime(i.getTime()+(n||2592e6));var r=\"expires=\"+i.toGMTString();document.cookie=e+\"=\"+t+\"; \"+r},getCookie=e=>{for(var t=e+\"=\",n=document.cookie.split(\";\"),i=0;i<n.length;i++){var r=n[i].trim();if(0==r.indexOf(t))return r.substring(t.length,r.length)}return\"\"}</script> </body> </html>";
// Exports
/* harmony default export */ const install = (install_code);
;// CONCATENATED MODULE: ./node_modules/html-loader/dist/cjs.js!./worker/src/html/install/src/check.html
// Module
var check_code = "<div id=\"log\"></div> <script>(async()=>{window.gonext=()=>{document.location.search=\"?step=cf\"};const t=document.getElementById(\"log\");try{t.innerText+=\"[信息]此为基本检查程序，用于检查hpp基本运行环境\\n\",t.innerText+=\"[信息]正在检查所有的基本配置是否完成中...\\n\",t.innerText+=\"[信息]检查KV是否绑定...\\n\";const n=(await(await fetch(`https://${document.location.host}/hpp/admin/install?step=test&type=kv&s=${(new Date).valueOf()}`)).json()).ctx;t.innerText+=n?\"[成功]KV是绑定了的。\":\"[失败]KV没有绑定，错误代码(-10001)\",t.innerText+=\"\\n\",n?(t.innerText+=\"[信息]检查KV是否已存在配置...\\n\",t.innerText+=(await(await fetch(`https://${document.location.host}/hpp/admin/install?step=test&type=hkv&s=${(new Date).valueOf()}`)).json()).ctx?\"[警告]配置已存在，继续将覆盖其原有配置\":\"[成功]配置未存在，将进行全新安装\",t.innerText+=\"\\n\"):t.innerText+=\"[警告]KV没有绑定，绕过KV检查！！！\\n\",t.innerText+=\"[信息]检查用户名是否正常...\\n\";const e=(await(await fetch(`https://${document.location.host}/hpp/admin/install?step=test&type=user&s=${(new Date).valueOf()}`)).json()).ctx;t.innerText+=e?\"[成功]用户名是设置了的。\":\"[失败]用户名没有设置，错误代码(-10002)\",t.innerText+=\"\\n\",t.innerText+=\"[信息]检查密码是否正常...\\n\";const i=(await(await fetch(`https://${document.location.host}/hpp/admin/install?step=test&type=passwd&s=${(new Date).valueOf()}`)).json()).ctx;t.innerText+=i?\"[成功]密码是设置了的。\":\"[失败]密码没有设置，错误代码(-10003)\",t.innerText+=\"\\n\",n&&e&&i?(t.innerText+=\"[成功]点击下一步继续\\n\",t.innerHTML+='<button class=\"mdui-btn mdui-color-theme-accent mdui-ripple\" onclick=\"gonext()\">下一步</button>'):t.innerText+=\"[失败]并不是所有的检查都是通过的，请尝试排查错误，若不知道如何排查，请点击左上角菜单寻求帮助！\"}catch(n){t.innerText+=\"[异常]脚本检测时出现了未知的异常：\\n\"+n}})()</script>";
// Exports
/* harmony default export */ const check = (check_code);
;// CONCATENATED MODULE: ./node_modules/html-loader/dist/cjs.js!./worker/src/html/install/src/cf.html
// Module
var cf_code = "<p>你需要填写以下CloudFlare信息才能保证HPP工作正常</p> <div class=\"mdui-textfield mdui-textfield-floating-label\"> <label class=\"mdui-textfield-label\">CloudFlare登陆邮箱</label> <input class=\"mdui-textfield-input\" type=\"email\" id=\"Auth_Email\"/> </div> <div class=\"mdui-textfield mdui-textfield-floating-label\"> <label class=\"mdui-textfield-label\">CloudFlare Global Key</label> <input class=\"mdui-textfield-input\" type=\"password\" id=\"Auth_Key\"/> </div> <div class=\"mdui-textfield mdui-textfield-floating-label\"> <label class=\"mdui-textfield-label\">HPP占用的Worker名字</label> <input class=\"mdui-textfield-input\" type=\"text\" id=\"script_name\"/> </div> <div class=\"mdui-textfield mdui-textfield-floating-label\"> <label class=\"mdui-textfield-label\">CloudFlareWorker账户ID</label> <input class=\"mdui-textfield-input\" type=\"text\" id=\"account_identifier\"/> </div> <button class=\"mdui-btn mdui-color-theme-accent mdui-ripple\" onclick=\"gocheck()\" id=\"gocheck\">检查</button> <button class=\"mdui-btn mdui-color-theme-accent mdui-ripple\" style=\"display:none\" onclick=\"gonext()\" id=\"gonext\">下一步</button> <div id=\"log\"></div> <script>window.gocheck=async()=>{window.gonext=()=>{document.location.search=\"?step=player\"};const e=document.getElementById(\"log\");document.getElementById(\"gocheck\").disabled=!0,e.innerText=\"[信息]尝试检查CF信息中...\\n\";try{const t=await(await fetch(`https://${document.location.host}/hpp/admin/install?step=test&type=cf&mail=${document.getElementById(\"Auth_Email\").value}&key=${document.getElementById(\"Auth_Key\").value}&name=${document.getElementById(\"script_name\").value}&id=${document.getElementById(\"account_identifier\").value}&s=${(new Date).valueOf()}`)).json();let n=!1,c=!1;t.ctx.login?(n=!0,e.innerText+=\"[成功]账户已成功登陆。\\n\"):(n=!1,e.innerText+=\"[失败]账户登陆异常，错误代码(-10004)\\n\"),t.ctx.script?(c=!0,e.innerText+=\"[成功]已成功检测到脚本存在。\\n\"):(n=!1,e.innerText+=\"[失败]未能检测到此脚本，错误代码(-10005)\\n\"),n&&c?(e.innerText+=\"[成功]检测已完成，点击下一步继续\\n\",localStorage.setItem(\"config\",JSON.stringify({installed:!1,cors:\"*\",recaptcha:\"\",gh_token:\"\",cloudflare:{account_identifier:document.getElementById(\"account_identifier\").value,Auth_Key:document.getElementById(\"Auth_Key\").value,Auth_Email:document.getElementById(\"Auth_Email\").value,script_name:document.getElementById(\"script_name\").value}})),document.getElementById(\"gocheck\").disabled=!1,document.getElementById(\"gocheck\").innerText=\"下一步\",document.getElementById(\"gocheck\").style.display=\"none\",document.getElementById(\"gonext\").style.display=\"unset\"):(e.innerText+=\"[失败]并不是所有的检查都是通过的，请尝试排查错误，若不知道如何排查，请点击左上角菜单寻求帮助！\\n\",document.getElementById(\"gocheck\").disabled=!1,document.getElementById(\"gocheck\").innerText=\"重新检测\")}catch(t){e.innerText+=\"[异常]脚本检测时出现了未知的异常：\\n\"+t}}</script>";
// Exports
/* harmony default export */ const cf = (cf_code);
;// CONCATENATED MODULE: ./node_modules/html-loader/dist/cjs.js!./worker/src/html/install/src/player.html
// Module
var player_code = "<div id=\"log\"></div> <div id=\"player\" style=\"display:none\"> <div class=\"mdui-card\"> <div class=\"mdui-card-media\"> <img src=\"https://api.cyfan.top/bing?day=1\"/> <div class=\"mdui-card-media-covered mdui-card-media-covered-top\"> <div class=\"mdui-card-primary\"> <div class=\"mdui-card-primary-title\">小白</div> <div class=\"mdui-card-primary-subtitle\">【全新安装】从零开始部署Hexo，没有仓库也不要紧！</div> </div> </div> </div> <div class=\"mdui-card-actions\"> <button class=\"mdui-btn mdui-ripple\" onclick='document.location.search=\"?step=zero\"'>点我进入</button> </div> </div> <br> <div class=\"mdui-card\"> <div class=\"mdui-card-media\"> <img src=\"https://api.cyfan.top/bing?day=2\"/> <div class=\"mdui-card-media-covered mdui-card-media-covered-top\"> <div class=\"mdui-card-primary\"> <div class=\"mdui-card-primary-title\">普通</div> <div class=\"mdui-card-primary-subtitle\">【正常安装】按照正常顺序导入已有的hexo仓库</div> </div> </div> </div> <div class=\"mdui-card-actions\"> <button class=\"mdui-btn mdui-ripple\" onclick='document.location.search=\"?step=start\"'>点我进入</button> </div> </div> <br> <div class=\"mdui-card\"> <div class=\"mdui-card-media\"> <img src=\"https://api.cyfan.top/bing?day=3\"/> <div class=\"mdui-card-media-covered mdui-card-media-covered-top\"> <div class=\"mdui-card-primary\"> <div class=\"mdui-card-primary-title\">用户</div> <div class=\"mdui-card-primary-subtitle\">【导入安装】从1.x版本的HPP迁移过来</div> </div> </div> </div> <div class=\"mdui-card-actions\"> <button class=\"mdui-btn mdui-ripple\" onclick='document.location.search=\"?step=import\"'>点我进入</button> </div> </div> <br> <div class=\"mdui-card\"> <div class=\"mdui-card-media\"> <img src=\"https://api.cyfan.top/bing?day=4\"/> <div class=\"mdui-card-media-covered mdui-card-media-covered-top\"> <div class=\"mdui-card-primary\"> <div class=\"mdui-card-primary-title\">开发者</div> <div class=\"mdui-card-primary-subtitle\">【配置安装】牛逼哄哄，一步直达最后</div> </div> </div> </div> <div class=\"mdui-card-actions\"> <button class=\"mdui-btn mdui-ripple\" onclick='document.location.search=\"?step=end\"'>点我进入</button> </div> </div> </div> <script>(()=>{const e=document.getElementById(\"log\");try{e.innerText=\"[信息]检测安装信息，此检查仅检查一遍...\\n\",null===localStorage.getItem(\"config\")||(()=>{try{JSON.parse(localStorage.getItem(\"config\"));return!1}catch(e){return!0}})()?(e.innerText+=\"[异常]本地安装信息异常或无法检测，请点击返回首页进行重新安装，错误代码(-10000)\\n\",e.innerText+=\"[信息]如果此错误长时间出现，请检查您的浏览器是否支持LocalStorage\\n\",window.goback=()=>{document.location.search=\"\"},document.getElementById(\"log\").innerHTML+='<button class=\"mdui-btn mdui-color-theme-accent mdui-ripple\" onclick=\"goback()\" id=\"gocheck\">返回首页</button>'):(e.innerText+=\"[正常]本地安装信息正常，请选择你的安装方式\\n\",document.getElementById(\"player\").style.display=\"unset\")}catch(t){e.innerText+=\"[异常]检测程序意外退出\\n\"+t}})()</script>";
// Exports
/* harmony default export */ const player = (player_code);
;// CONCATENATED MODULE: ./worker/src/gethtml.js













const gethtml_gethtml = (hinfo) => {
  String.prototype.preout = function () {
    let n = this
    for (var i in language) {
      n = n.replace(new RegExp(`::${i}::`, "g"), language[i])

    }

    return n
      .replace(/::CDN::/g, hinfo.CDN)
      .replace(/::VER::/g, hinfo.ver)
  }
  return {


    hello: () => {
      return hello
    }
    ,
    check: () => {
      return install.replace(/::BODY::/g, check)
        .preout()
    }
    ,
    cf: () => {
      return install.replace(/::BODY::/g, cf)
        .preout()
    }

    ,
    player: () => {
      return install.replace(/::BODY::/g, player)
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

/* harmony default export */ const src_gethtml = (gethtml_gethtml);

;// CONCATENATED MODULE: ./worker/src/config.js
const formatconfig = async () => {
    try {
        const config =
            await (async () => {
                try {
                    return await HKV.get("hconfig", { type: "json" })
                }
                catch (p) {
                    return {
                        nokv: true
                    }
                }
            })()
        if (config === null) { return defaultconfig }
        if (config.nokv) { return config }
        config.hexo.gh_docpath = config.hexo.gh_root + "source/_posts/"
        config.hexo.gh_draftpath = config.hexo.gh_root + "source/_drafts/"
        return config
    } catch (n) {
        return defaultconfig
    }
}

const defaultconfig = {
    installed: false,
    cors: "*",
    recaptcha: {
        switch: false,
        sercetkey: ""
    },
    gh_token: "",
    dash: {
        image: "https://cdn.jsdelivr.net/gh/ChenYFan/CDN@master/img/hpp_upload/1612610340000.jpg",
        icon: "https://cdn.jsdelivr.net/gh/HexoPlusPlus/CDN@master/doc_img/icon.png",
        title: "HexoPlusPlus小飞机✈",
        dark: true,
        bgcolor: "default",//black | white | default
        color: "danger",//purple | azure | green | orange | danger | rose
        usericon: "",
        OwO: "https://cdn.jsdelivr.net/gh/2X-ercha/Twikoo-Magic@master/hppowo.json",
        back: "https://cdn.jsdelivr.net/gh/ChenYFan-Tester/DailyGet@gh-pages/bingpic/bing.jpg",
        lazyimg: "https://cdn.jsdelivr.net/gh/ChenYFan/blog@master/themes/fluid/source/img/loading.gif",
        hljsstyle: "github"
    },
    hexo: {
        switch: true,
        type: "gh",
        gh_username: "",
        gh_reponame: "",
        gh_branch: "",
        gh_token: "",
        gh_root: "/",
        gh_dispatch_token: ""
    },

    img: {
        switch: true,
        type: "gh", //custom
        gh_username: "",
        gh_reponame: "",
        gh_branch: "",
        gh_token: "",
        gh_root: "/",


        c_url: "",
        c_post_name: "file",
        c_headers: {

        },
        c_body: {

        }

    },
    cloudflare: {
        account_identifier: "",
        Auth_Key: "",
        Auth_Email: "",
        script_name: ""
    },
    talk: {
        switch: {
            htalk: true,
            artitalk: {
                agent: false,
                feign: false
            }
        },
        artitalk_agent_config: {
            APPID: "",
            APPKEY: ""
        }

    }
}
;// CONCATENATED MODULE: ./worker/src/scaffold.js

const getCookie = (request, name) => {
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

const scaffold_getJsonLength = (jsonData) => {

    var jsonLength = 0;

    for (var item in jsonData) {

        jsonLength++;

    }

    return jsonLength;
}

const scaffold_rp = (path) => {
    return path.split('?')[0]
}
const getname = (path) => {
    const urllist = path.split('/')
    return urllist[scaffold_getJsonLength(urllist) - 1]
}
const getsuffix = (path) => {
    const suffixlist = getname(path).split('.')
    return suffixlist[scaffold_getJsonLength(suffixlist) - 1]
}

const scaffold_genjsonres = (msg, code, status, content) => {
    let m = msg ? msg : lang.UNKNOW_ERROR
    let c = (code || code == 0) ? code : -1
    let s = status ? status : 500
    let co = content ? content : ''
    let r = {
        msg: String(m),
        code: c,
        content: String(co)
    }
    return new Response(JSON.stringify(r), {
        status: s, headers: {
            "content-type": "application/javascript; charset=utf-8",
            "Access-Control-Allow-Origin": '*'
        }
    })
}

;// CONCATENATED MODULE: ./worker/src/github/getlist.js

async function getlist_ghlist(config) {
  const username = config.username
  const reponame = config.reponame
  const path = (() => {
    const pathsplit = config.path.split('/')
    let formatpath = ""
    for (var i = 0; i < pathsplit.length - 1; i++) {
      if (pathsplit[i] != "") {
        formatpath += `/${pathsplit[i]}`
      }
    }
    return formatpath
  })()
  const branch = config.branch || 'main'
  const token = config.token || ''
  const url = encodeURI(`https://api.github.com/repos/${username}/${reponame}/contents${path}?ref=${branch}`)
  const init = {
    method: 'GET',
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "user-agent": 'HexoPlusPlus Github Filer',
      "Authorization": "token " + token
    }
  }
  if (token == '') { delete init.headers.Authorization }
  return await (await fetch(url, init)).json()
}


async function getlist_ghtreelist(config) {
  const username = config.username
  const reponame = config.reponame
  const path = (() => {
    const pathsplit = config.path.split('/')
    let formatpath = ""
    for (var i = 0; i < pathsplit.length - 1; i++) {
      if (pathsplit[i] != "") {
        formatpath += `/${pathsplit[i]}`
      }
    }
    return formatpath
  })()
  const branch = config.branch || 'main'
  const token = config.token || ''
  const url = encodeURI(`https://api.github.com/repos/${username}/${reponame}/contents${path}?ref=${branch}`)
  const init = {
    method: 'GET',
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "user-agent": 'HexoPlusPlus Github Filer',
      "Authorization": "token " + token
    }
  }
  if (token == '') { delete init.headers.Authorization }
  return fetch_bfs([], url, init)
}



async function fetch_bfs(arr, url, getinit) {
  try {
    const hpp_getlist = await (await fetch(url, getinit)).json()
    for (var i = 0; i < getJsonLength(hpp_getlist); i++) {
      if (hpp_getlist[i]["type"] != "dir") {
        arr.push(hpp_getlist[i])
      } else {
        await fetch_bfs(arr, hpp_getlist[i]["_links"]["self"], getinit)
      }
    }
    return arr;
  } catch (lo1) { return [] }
}
;// CONCATENATED MODULE: ./worker/src/github/getsha.js

async function getsha_ghsha(config) {
    const list = await ghlist(config)
    try {
        return list.filter(function (fp) {
            return `/${fp.path}` == `${config.path}`
        })[0]["sha"]
    }
    catch (e) {
        return ''
    }
}
;// CONCATENATED MODULE: ./worker/src/github/manager.js

async function manager_ghupload(config) {
  const username = config.username
  const reponame = config.reponame
  const path = config.path
  const branch = config.branch || 'main'
  const token = config.token || ''
  const sha = config.sha || await ghsha(config)
  const message = config.message || 'Upload By HexoPlusPlus With Love'
  const base64file = config.file
  const method = 'PUT'
  const url = encodeURI(`https://api.github.com/repos/${username}/${reponame}/contents${path}?ref=${branch}`)
  let body = {
    branch: branch, message: message, content: base64file, sha: sha
  }

  let init = {
    body: JSON.stringify(body),
    method: method,
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "user-agent": 'HexoPlusPlus Github Filer',
      "Authorization": "token " + token
    }
  }

  if (token == '') {
    delete init.headers.Authorization
  }
  return fetch(url, init)
}


async function manager_ghdel(config) {
  const username = config.username
  const reponame = config.reponame
  const path = config.path
  const branch = config.branch || 'main'
  const token = config.token
  const sha = config.sha || await ghsha(config)
  const message = config.message || 'Delete By HexoPlusPlus With Love'
  const method = 'DELETE'
  const url = encodeURI(`https://api.github.com/repos/${username}/${reponame}/contents${path}?ref=${branch}`)
  const body = {
    branch: branch, message: message, sha: sha
  }
  console.log(body)
  let init = {
    body: JSON.stringify(body),
    method: method,
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "user-agent": 'HexoPlusPlus Github Filer',
      "Authorization": "token " + token
    }
  }
  if (token == '') {
    delete init.headers.Authorization
  }
  return fetch(url, init)
}


async function manager_ghget(config) {
  const username = config.username
  const reponame = config.reponame
  const path = config.path
  const branch = config.branch || 'main'
  const token = config.token || ''
  const url = encodeURI(`https://raw.githubusercontent.com/${username}/${reponame}/${branch}${path}`)
  let init = { headers: { Accept: "application/vnd.github.v3.raw", Authorization: `token ${token}` } }
  if (token == '') {
    delete init.headers.Authorization
  }
  return fetch(url, init)
}


async function ghstar(config) {
  const token = config.token || (() => { return false })()
  const url = `https://api.github.com/user/starred/HexoPlusPlus/HexoPlusPlus`
  let init = {
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "user-agent": 'HexoPlusPlus Github Filer',
      "Authorization": `token ${token}`
    },
    method: "PUT"
  }
  const res = await fetch(url, init)
  return res.status == 204 ? true : false
}


;// CONCATENATED MODULE: ./worker/src/update.js

const update_hppupdate = async (config, newest) => {
  let ver = 'dist'
  if (!newest) {
    ver = await update_ghlatver({
      username: "HexoPlusPlus",
      reponame: "HexoPlusPlus",
      token: config.hpp_githubdoctoken || config.hpp_githubimagetoken || ''
    })
  }
  const url = `https://raw.githubusercontent.com/HexoPlusPlus/HexoPlusPlus/${ver}/index.worker.js`


  const script = await (await fetch(url)).text()
  const up_init = {
    body: script,
    method: "PUT",
    headers: {
      "content-type": "application/javascript",
      "X-Auth-Key": config.hpp_CF_Auth_Key,
      "X-Auth-Email": config.hpp_Auth_Email
    }
  }
  const update_resul = await (await fetch(`https://api.cloudflare.com/client/v4/accounts/${config.hpp_account_identifier}/workers/scripts/${config.hpp_script_name}`, up_init)).json()
  if (update_resul["success"]) {
    return genjsonres(lang.UPDATE_SUCCESS, 0, 200)
  } else {
    return genjsonres(lang.UPDATE_ERROR, -1, 500)
  }


}
async function getlatinfo(config) {
  const token = config.hpp_githubdoctoken || config.hpp_githubimagetoken || ''
  const url = `https://api.github.com/repos/HexoPlusPlus/HexoPlusPlus/releases/latest`
  let init = {
    method: 'GET',
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "user-agent": 'HexoPlusPlus Github Filer',
      "Authorization": "token " + token
    }
  }
  if (token == '') {
    delete init.headers.Authorization
  }
  return (await (await fetch(url, init)).json())
}


async function update_ghlatver(config) {
  return (await getlatinfo(config))["tag_name"]
}

async function update_ghlatinfo(config) {
  return (await getlatinfo(config))["body"]
}

;// CONCATENATED MODULE: ./worker/src/router/router.js







const githubroute = async (request, config, hinfo) => {
    try {
        let r, rs, name, msgd, hpp_list_index
        const apireq = await request.json()
        switch (apireq.action) {
            case 'add':
                r = await ghupload({
                    file: apireq.file,
                    username: apireq.username,
                    reponame: apireq.reponame,
                    path: apireq.path,
                    branch: apireq.branch,
                    token: apireq.token
                })
                rs = r.status
                if (rs == 200 || rs == 201) {
                    /*
                    if (rs == 201) {
                        await HKV.delete("hpp_doc_list_index");
                        return genjsonres('新建文档成功！', 0, rs)
                    }*/
                    return genjsonres(lang.GH_UPLOAD_SUCCESS, 0, rs)
                } else {
                    return genjsonres(lang.GH_UPLOAD_ERROR, 1, rs)
                }
            case 'get':
                r = await ghget({
                    username: apireq.username,
                    reponame: apireq.reponame,
                    path: apireq.path,
                    branch: apireq.branch,
                    token: apireq.token
                })
                if (apireq.json) {
                    return genjsonres(lang.GH_GET_SUCCESS, 0, 200, await r.text())
                } else {
                    return r
                }

            case 'del':
                r = await ghdel({
                    username: apireq.username,
                    reponame: apireq.reponame,
                    path: apireq.path,
                    branch: apireq.branch,
                    token: apireq.token
                })
                rs = r.status
                if (rs == 200) {
                    return genjsonres(lang.GH_DELETE_SUCCESS, 0, rs)
                } else {
                    return genjsonres(lang.GH_DELETE_ERROR, 1, rs)
                }
            case 'list':
                return genjsonres(lang.GH_LIST_SUCCESS, 0, 200, JSON.stringify(await ghlist({
                    username: apireq.username,
                    reponame: apireq.reponame,
                    path: apireq.path,
                    branch: apireq.branch,
                    token: apireq.token
                })))
            case 'listtree':
                return genjsonres(lang.GH_TREELIST_SUCCESS, 0, 200, JSON.stringify(await ghtreelist({
                    username: apireq.username,
                    reponame: apireq.reponame,
                    path: apireq.path,
                    branch: apireq.branch,
                    token: apireq.token
                })))

            /*
            case 'adddoc':
                r = await ghupload({
                    file: apireq.file,
                    username: config.hpp_githubdocusername,
                    reponame: config.hpp_githubdocrepo,
                    path: config.githubdocpath,
                    branch: config.hpp_githubdocbranch,
                    filename: apireq.filename,
                    token: config.hpp_githubdoctoken
                })
                rs = r.status
                if (rs == 200 || rs == 201) {
                    if (rs == 201) { await HKV.delete("hpp_doc_list_index"); return genjsonres('新建文档成功！', 0, rs) }
                    return genjsonres('上传文档成功！', 0, rs)
                } else {
                    return genjsonres('上传/新建文档失败！', 1, rs)
                }
            case 'adddraft':

                r = await ghupload({
                    file: apireq.file,
                    username: config.hpp_githubdocusername,
                    reponame: config.hpp_githubdocrepo,
                    path: config.githubdocdraftpath,
                    branch: config.hpp_githubdocbranch,
                    filename: apireq.filename,
                    token: config.hpp_githubdoctoken
                })
                rs = r.status
                if (rs == 200 || rs == 201) {
                    if (rs == 201) { await HKV.delete("hpp_doc_draft_list_index"); return genjsonres('上传草稿成功！', 0, rs) }
                    return genjsonres('上传草稿成功！', 0, rs)
                } else {
                    return genjsonres('上传/新建草稿失败！', -1, rs)
                }
            case 'addimg':
                name = `${Date.parse(new Date())}.${apireq.suffix}`
                r = await ghupload({
                    file: apireq.file,
                    username: config.hpp_githubimageusername,
                    reponame: config.hpp_githubimagerepo,
                    path: config.githubimagepath,
                    branch: config.hpp_githubimagebranch,
                    filename: name,
                    token: config.hpp_githubimagetoken
                })
                rs = r.status

                if (rs == 200 || rs == 201) {
                    const jsdurl = `https://cdn.jsdelivr.net/gh/${config.hpp_githubimageusername}/${config.hpp_githubimagerepo}@${config.hpp_githubimagebranch}${config.hpp_githubimagepath}${name}`

                    return genjsonres('上传图片成功！', 0, rs, jsdurl)
                } else {
                    return genjsonres('上传图片失败！', -1, rs)
                }
            case 'deldoc':
                r = await ghdel({
                    username: config.hpp_githubdocusername,
                    reponame: config.hpp_githubdocrepo,
                    path: config.githubdocpath,
                    branch: config.hpp_githubdocbranch,
                    filename: apireq.filename,
                    token: config.hpp_githubdoctoken
                })
                rs = r.status
                if (rs == 200) {
                    await HKV.delete("hpp_doc_list_index")
                    return genjsonres('删除文档成功！', 0, rs)
                } else {
                    return genjsonres('删除文档失败！', -1, rs)
                }
            case 'deldraft':
                r = await ghdel({
                    username: config.hpp_githubdocusername,
                    reponame: config.hpp_githubdocrepo,
                    path: config.githubdocdraftpath,
                    branch: config.hpp_githubdocbranch,
                    filename: apireq.filename,
                    token: config.hpp_githubdoctoken
                })
                rs = r.status
                if (rs == 200) {
                    await HKV.delete("hpp_doc_list_index")
                    return genjsonres('删除艹稿成功！', 0, rs)
                } else {
                    return genjsonres('删除艹稿失败！', -1, rs)
                }

            case 'delimg':
                r = await ghdel({
                    username: config.hpp_githubimageusername,
                    reponame: config.hpp_githubimagerepo,
                    path: config.githubimagepath,
                    branch: config.hpp_githubimagebranch,
                    filename: apireq.filename,
                    token: config.hpp_githubimagetoken
                })
                rs = r.status
                if (rs == 200) {
                    await HKV.delete("hpp_doc_list_index")
                    return genjsonres('删除图片成功！', 0, rs)
                } else {
                    return genjsonres('删除图片失败！', -1, rs)
                }
            case 'getdoc':
                return ghget({
                    username: config.hpp_githubdocusername,
                    reponame: config.hpp_githubdocrepo,
                    path: config.githubdocpath,
                    branch: config.hpp_githubdocbranch,
                    filename: apireq.filename,
                    token: config.hpp_githubdoctoken
                })
            case 'getdraft':
                return ghget({
                    username: config.hpp_githubdocusername,
                    reponame: config.hpp_githubdocrepo,
                    path: config.githubdocdraftpath,
                    branch: config.hpp_githubdocbranch,
                    filename: apireq.filename,
                    token: config.hpp_githubdoctoken
                })
            case 'getscaffolds':
                return ghget({
                    username: config.hpp_githubdocusername,
                    reponame: config.hpp_githubdocrepo,
                    path: `${config.hpp_githubdocroot}scaffolds/`,
                    branch: config.hpp_githubdocbranch,
                    filename: 'post.md',
                    token: config.hpp_githubdoctoken
                })
            case 'getdoclist':

                hpp_list_index = await HKV.get("hpp_doc_list_index")
                if (hpp_list_index === null) {
                    hpp_list_index = JSON.stringify(await ghtreelist({
                        username: config.hpp_githubdocusername,
                        reponame: config.hpp_githubdocrepo,
                        path: config.githubdocpath,
                        branch: config.hpp_githubdocbranch,
                        token: config.hpp_githubdoctoken
                    }))
                    if (!hinfo.dev) {
                        await HKV.put("hpp_doc_list_index", hpp_list_index)
                        msgd = '没有命中缓存,获取文章列表成功！'
                    } else {

                        msgd = '没有命中缓存,处于开发模式,获取文章列表成功！'
                    }
                } else {
                    msgd = '命中了缓存,获取文章列表成功！'
                }
                return genjsonres(msgd, 0, 200, hpp_list_index)

            case 'getdraftlist':

                hpp_list_index = await HKV.get("hpp_doc_draft_list_index")
                if (hpp_list_index === null) {
                    hpp_list_index = JSON.stringify(await ghtreelist({
                        username: config.hpp_githubdocusername,
                        reponame: config.hpp_githubdocrepo,
                        path: config.githubdocdraftpath,
                        branch: config.hpp_githubdocbranch,
                        token: config.hpp_githubdoctoken
                    }))
                    if (!hinfo.dev) {
                        await HKV.put("hpp_doc_draft_list_index", hpp_list_index)
                        msgd = '没有命中缓存,获取艹稿列表成功！'
                    } else {
                        msgd = '没有命中缓存,处于开发模式,获取艹稿列表成功！'
                    }
                } else {
                    msgd = '命中了缓存,获取艹稿列表成功！'
                }
                return genjsonres(msgd, 0, 200, hpp_list_index)


            case 'getimglist':

                hpp_list_index = await HKV.get("hpp_img_list_index")
                if (hpp_list_index === null) {
                    hpp_list_index = JSON.stringify(await ghtreelist({
                        username: config.hpp_githubimageusername,
                        reponame: config.hpp_githubimagerepo,
                        path: config.githubimagepath,
                        branch: config.hpp_githubimagebranch,
                        token: config.hpp_githubimagetoken
                    }))
                    if (!hinfo.dev) {
                        await HKV.put("hpp_img_list_index", hpp_list_index)
                        msgd = '没有命中缓存,获取图片列表成功！'
                    } else {
                        msgd = '没有命中缓存,处于开发模式,获取图片列表成功！'
                    }
                } else {
                    msgd = '命中了缓存,获取图片列表成功！'
                }
                return genjsonres(msgd, 0, 200, hpp_list_index)
            case 'delindex':
                await HKV.delete("hpp_doc_draft_list_index")
                await HKV.delete("hpp_doc_list_index")
                await HKV.delete("hpp_img_list_index")
                return genjsonres('清除索引缓存成功!', 0, 200)
                */
            default:
                return genjsonres(lang.UNKNOW_ACTION, -1, 500)
        }
    } catch (lo) { return genjsonres(lang.UNKNOW_ERROR, -1, 500, lo) }
}

const dashroute = async (request, config, hinfo) => {
    const req = request
    const urlStr = req.url
    const urlObj = new URL(urlStr)
    const path = urlObj.href.substr(urlObj.origin.length)
    let hpp_js = ""
    let ainfo = {
        hpp_home_act: "",
        hpp_edit_act: "",
        hpp_site_act: "",
        hpp_talk_act: "",
        hpp_docs_man_act: "",
        hpp_img_man_act: "",
        hpp_tool_act: "",
        hpp_set_act: ""
    }
    let hpp_init = gethtml.dash404
    if (rp(path) == "/hpp/admin/dash/home") {
        ainfo.hpp_home_act = " active"
        hpp_init = gethtml.dashhome(config, hinfo)
        hpp_js = gethtml.dashhomejs(config, hinfo)
    }
    if (rp(path) == "/hpp/admin/dash/edit") {
        ainfo.hpp_edit_act = " active"
        hpp_init = gethtml.dashedit
        hpp_js = gethtml.dasheditjs(config, hinfo)
    }
    if (rp(path) == "/hpp/admin/dash/site") {
        ainfo.hpp_site_act = " active"
        hpp_init = gethtml.dashsite
        hpp_js = gethtml.dashsitejs(config, hinfo)
    }
    if (rp(path) == "/hpp/admin/dash/talk") {
        ainfo.hpp_talk_act = " active"
        hpp_init = gethtml.dashtalk
        hpp_js = gethtml.dashtalkjs(config, hinfo)
    }
    if (rp(path) == "/hpp/admin/dash/docs_man") {
        ainfo.hpp_docs_man_act = " active"
        hpp_init = gethtml.dashdocs
        hpp_js = gethtml.dashdocsjs(hinfo)

    }
    if (rp(path) == "/hpp/admin/dash/img_man") {
        ainfo.hpp_img_man_act = " active"
        hpp_init = gethtml.dashimg
        hpp_js = gethtml.dashimgjs(hinfo)
    }
    if (rp(path) == "/hpp/admin/dash/tool") {
        ainfo.hpp_tool_act = " active"
        hpp_init = gethtml.dashtool
        hpp_js = gethtml.dashtooljs(hinfo)
    }
    let hpp_dash_head = gethtml.dash_head(config, hinfo, ainfo)
    let hpp_dash_foot = gethtml.dash_foot(hinfo, hpp_js)
    let hpp_dash = `${hpp_dash_head}${hpp_init}${hpp_dash_foot}`
    return new Response(hpp_dash, {
        headers: { "content-type": "text/html;charset=UTF-8" }
    })


}

const updateroute = async (request, config, hinfo) => {
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
                if (await ghlatver(config, false) != hinfo.ver) {
                    return genjsonres(lang.NEED_UPDATE, 0, 200, await ghlatinfo(config))
                } else {
                    return genjsonres(lang.NEED_NOT_UPDATE, 1, 200)
                }
            default:
                return genjsonres(lang.UNKNOW_ACTION, -1, 500)
        }
    } catch (lo) { throw lo }
}
;// CONCATENATED MODULE: ./worker/src/talk/htalk/genres.js

async function genres_genres(config, msg, status, code, content) {
    const m = msg ? `${lang.HTALK}:${msg}` : `${lang.HTALK}:${lang.UNKNOW_ERROR}`
    const c = (code || code == 0) ? code : -1

    const s = status ? status : 500
    const co = content ? content : ''
    const r = {
        msg: m,
        code: c,
        content: co
    }
    return new Response(JSON.stringify(r), {
        status: s, headers: {
            "content-type": "application/javascript; charset=utf-8",
            "Access-Control-Allow-Origin": config.cors
        }
    })

}
;// CONCATENATED MODULE: ./worker/src/talk/htalk/index.js



async function htalk(config, request, loginstatus, hinfo) {
    try {
        const r = await request.json()
        let limit, start, htalk, p, hres, add, talk_init

        const login = loginstatus || false
        if (login) {
            switch (r.action) {
                case 'initialization':
                    await HKV.put("htalk", "{}")
                    return genres(config, `${lang.HTALK}:${lang.HTALK_INIT_SUCCESS}`, 200, 0, '')
                case 'get':
                    htalk = await HKV.get("htalk", { type: "json" });
                    limit = r.limit
                    start = r.start || htalk.nid
                    hres = {
                        nid: 0,
                        ctx: []
                    }
                    p = start
                    for (var i = 0; i < limit; i++) {
                        if (!!(htalk["data"][p])) {
                            hres.ctx.push(htalk["data"][p])
                            p--

                            i++
                            hres.nid = p
                            if (p <= 0) { break; }
                        } else {

                            p--
                        }
                    }
                    return genres(config, lang.HTALK_GET_SUCCESS.replace("${1}", lang.LOGIN_TRUE), 200, 0, JSON.stringify(hres))

                case 'add':
                    htalk = await HKV.get("htalk", { type: "json" })
                    add = {
                        id: htalk["nid"] + 1,
                        time: r.time,
                        name: r.name || hinfo.username,
                        avatar: r.avatar,
                        content: r.content,
                        visible: true
                    }
                    htalk.data.push(add);
                    htalk.nid += 1

                    await HKV.put("htalk", JSON.stringify(htalk))
                    return genres(config, lang.HTALK_UPLOAD_SUCCESS, 200, 0, '')
                case 'del':
                    htalk = await HKV.get("htalk", { type: "json" })
                    delete htalk.data[r.id]
                    await HKV.put("htalk", JSON.stringify(htalk))
                    return genres(config, lang.HTALK_DEL_SUCCESS.replace("${1}", r.id), 200, 0, '')
                case 'visible':
                    htalk = await HKV.get("htalk", { type: "json" })
                    htalk.data[r.id].visible = htalk.data[r.id].visible ? false : true
                    await HKV.put("htalk", JSON.stringify(htalk))
                    return genres(config, lang.HTALK_VISIBLE_SUCCESS.replace("${1}", r.id), 200, 0, '')


                case 'inputartitalk':


                    htalk = await HKV.get("htalk", { type: "json" })
                    for (var i = 0; i < r.ctx.length; i++) {
                        htalk.nid++;
                        talk_init = {
                            id: hpp_talk_id,
                            time: r.ctx[i].updatedAt.split('T')[0],
                            name: hinfo.username,
                            avatar: r.ctx[i].avatar,
                            content: r.ctx[i].atContentHtml,
                            visible: "True"
                        }
                        htalk.data[htalk.nid] = talk_init
                    }
                    await HKV.put("htalk", JSON.stringify(htalk))
                    return genres(config, lang.HTALK_INPUT_SUCCESS.replace("${1}", r.ctx.length), 200, 0, '')
                default:
                    return genres(config, lang.UNKNOW_ACTION, 500, -1, '')
            }
        } else {
            switch (r.action) {
                case 'get':
                    htalk = await HKV.get("htalk", { type: "json" });
                    limit = r.limit
                    start = r.start || htalk.nid
                    hres = {
                        ver: hinfo.ver,
                        nid: 0,
                        ctx: []
                    }
                    p = start
                    for (var i = 0; i < limit;) {
                        if ((function () { try { return htalk["data"][p]["visible"] } catch (m) { return false } }()) && !!(htalk["data"][p])) {
                            hres.ctx.push((() => {
                                let u = htalk["data"][p]
                                u.id = p
                                return u
                            })())
                            p--

                            i++
                            hres.nid = p
                            if (p <= 0) { break; }
                        } else {
                            p--
                        }
                    }
                    return genres(config, lang.HTALK_GET_SUCCESS.replace("${1}", lang.LOGIN_FALSE), 200, 0, JSON.stringify(hres))
                case 'love':
                    if (!!config.recaptcha && await recaptcha(config.recaptcha, r.recaptcha, "love")) {
                        htalk = await HKV.get("htalk", { type: "json" });
                        htalk.data[r.id].love = (() => {
                            if (!htalk.data[r.id].love) {
                                return 1
                            } else {
                                return htalk.data[r.id].love + 1
                            }
                        })()
                        await HKV.put("htalk", JSON.stringify(htalk))
                        return genres(config, lang.LOVE_SUCCESS, 200, 0, htalk.data[r.id].love)
                    } else {
                        return genres(config, lang.LOVE_ERROR, 403, -1, lang.RECAP_ERROR)
                    }
                default:
                    return genres(config, lang.UNKNOW_ACTION, 500, -1, '')
            }
        }
    }
    catch (lo2) { return genres(config, lo2, 500, -1, '') }
}
;// CONCATENATED MODULE: ./worker/src/totp/totp.js
const totp = (key)=>{
    return true
}

/* harmony default export */ const totp_totp = (totp);
;// CONCATENATED MODULE: ./worker/src/gres.js
const gres = (c) => {

    switch (c.type) {
        case "json":
            return new Response(JSON.stringify({
                ctx: c.ctx,
                status: c.status === 0 ? 0 : c.status,
                msg: c.msg ? c.msg : "没有额外的消息",
                timestmp: (new Date()).valueOf()
            }), {
                status: c.status ? c.status : 200, headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
            })
        case "html":
            return new Response(c.ctx, {
                status: c.status ? c.status : 200, headers: {
                    "Content-Type": "text/html; charset=utf-8"
                },
            })
        default:
            return new Response(c.ctx)
    }
}

/* harmony default export */ const src_gres = (gres);
;// CONCATENATED MODULE: ./worker/src/install.js







const installpage = async (req, hinfo) => {
  const urlStr = req.url
  const urlObj = new URL(urlStr)
  const sq = (key) => {
    return urlObj.searchParams.get(key)
  }
  const h = src_gethtml(hinfo)
  switch (sq('step')) {
    case 'check':
      return src_gres({
        type: 'html',
        ctx: h.check()
      })

    case 'check':
      return src_gres({
        type: 'dash',
        ctx: h.check()
      })
    case 'cf':
      return src_gres({
        type: 'html',
        ctx: h.cf()
      })

    case 'player':
      return src_gres({
        type: 'html',
        ctx: h.player()
      })
    case 'test':
      switch (sq('type')) {
        case "cf":
          const n = await (await fetch(`https://api.cloudflare.com/client/v4/accounts/${sq('id')}/workers/scripts`, {
            headers: {
              "X-Auth-Email": sq("mail"),
              "X-Auth-Key": sq("key")
            }
          })).json()

          let r = {
            login: false,
            script: false
          }
          if (n.success) { r.login = true }
          for (var i in n.result) {
            if (n.result[i].id === sq("name")) {
              r.script = true
            }
          }
          return src_gres({
            type: "json",
            ctx: r
          })
        case "kv":
          try {
            const kv = await HKV.get('hconfig')
            return src_gres({
              type: "json",
              ctx: true
            })
          } catch (p) {
            return src_gres({
              type: "json",
              ctx: false,
              msg: p
            })
          }
        case "passwd":

          try {
            const passwd = hpp_password.split(",")
            return src_gres({
              type: "json",
              ctx: true
            })
          } catch (p) {
            return src_gres({
              type: "json",
              ctx: false,
              msg: p
            })
          }
        case "user":

          try {
            const user = hpp_username.split(",")
            return src_gres({
              type: "json",
              ctx: true
            })
          } catch (p) {
            return src_gres({
              type: "json",
              ctx: false,
              msg: p
            })
          }
        case "hkv":
          const kv = await HKV.get('hconfig')
          if (kv !== undefined) {
            return src_gres({
              type: "json",
              ctx: true
            })
          } else {
            return src_gres({
              type: "json",
              ctx: false
            })
          }
        default:
          return src_gres({
            type: "json",
            ctx: "ERROR"
          })
      }

    default:
      return src_gres({
        type: 'html',
        ctx: h.hello()
      })

  }

  /*
  if (rp(path) == '/hpp/admin/api/upconfig') {
            const config_r = JSON.stringify(await request.text())
            await HKV.put("hpp_config", config_r)
            return new Response("OK")
          }
          if (rp(path) == "/hpp/admin/install") {
            let hpp_installhtml = gethtml.installhtml(config, hinfo)
            return new Response(hpp_installhtml, {
              headers: { "content-type": "text/html;charset=UTF-8" }
            })
  
          }
          */

  /*
  CDN = hinfo.CDN
  hpp_ver = hinfo.ver
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
  <script src="${CDN}install.js"></script>
  </body>
  </html>`*/

}

/* harmony default export */ const src_install = (installpage);
;// CONCATENATED MODULE: ./package.json
const package_namespaceObject = JSON.parse('{"i8":"2.0.1-dev-0","G3":"https://cdn.jsdelivr.net/npm/hexoplusplus/"}');
;// CONCATENATED MODULE: ./worker/src/captcha/recaptcha.js
const recaptcha_recaptcha = async (secret, code, action) => {
    const n = await (await fetch(`https://www.recaptcha.net/recaptcha/api/siteverify?secret=${secret}&response=${code}`)).json()
    if (n.success && n.score >= 0.7 && n.action == action) {
        return true
    } else {
        return false
    }
}
/* harmony default export */ const captcha_recaptcha = (recaptcha_recaptcha);
;// CONCATENATED MODULE: ./worker/kernel.js
/*
TWO_FACTOR 变量 二步验证密钥
totp 函数 二步验证
*/

const md5 = __webpack_require__(568)
;
//import yaml from  'js-yaml'
//yaml.load()



















let hinfo = {
  ver: package_namespaceObject.i8,
  CDN: package_namespaceObject.G3,
  dev: true,
  login: false
}

if (hinfo.dev) { hinfo.CDN = 'https://127.0.0.1:9999/' }


async function hexoplusplus(request) {

  //初始化 - 变量绑定
  const req = request
  const urlStr = req.url
  const urlObj = new URL(urlStr)
  const path = urlObj.href.substr(urlObj.origin.length)
  const domain = (urlStr.split('/'))[2]


  //检查配置

  hinfo.config = await formatconfig()



  //检查安装


  if (!hinfo.config.installed || hinfo.config.nokv) {
    if (scaffold_rp(path) === '/hpp/admin/install') {
      return src_install(req, hinfo)
    } else {
      return Response.redirect(`https://${domain}/hpp/admin/install`, 302)
    }
  }



  //检查登陆

  const username = hpp_username.split(",");
  const password = hpp_password.split(",");
  const maph = new Map(request.headers);
  hinfo.login = (() => {
    for (var w = 0; w < scaffold_getJsonLength(username); w++) {
      if (
        (getCookie(request, "h_cookie_auth") === `${md5(username[w])}:${md5(password[w])}`)//Cookie登陆，此时要求人机验证
        &&
        (async () => {
          if (hinfo.config.recaptcha !== "") {
            return captcha_recaptcha(getCookie(request, "h_recaptcha_auth"))
          } else {
            return true
          }
        })()//人机验证
        ||
        ((() => {
          try {
            if (maph.get('h_basic_auth') === `${md5(username[w])}:${md5(password[w])}:${md5(totp_totp(TWO_FACTOR))}`) {
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

  switch (scaffold_rp(path)) {
    case '/hpp/lang':
      return src_gres({ type: "json", ctx: language.LANG })
    default:
      return new Response('')
  }

}
;// CONCATENATED MODULE: ./worker/index.js

addEventListener("fetch", event => {
  event.respondWith(hexoplusplus(event.request))
})


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module doesn't tell about it's top-level declarations so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(798);
/******/ 	
/******/ })()
;