const marked = require('marked')
var hpp_scaffold = {
  ajaxObject: function () {
    var xmlHttp;
    try {
      xmlHttp = new XMLHttpRequest();
    }
    catch (e) {
      try {
        xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        try {
          xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
          return false;
        }
      }
    }
    return xmlHttp;
  },
  loadStyle: fucntion(){
    var link = document.createElement('link');
link.type = 'text/css';
link.rel = 'stylesheet';
link.href = url;
var head = document.getElementsByTagName('head')[0];
head.appendChild(link);
	},
getJsonLength: function(jsonData) {
  var jsonLength = 0;

  for (var item in jsonData) {

    jsonLength++;

  }

  return jsonLength;

},
loadtalk: function(res) {
  document.getElementById("hpp_talk_list").innerHTML = ``;
  for (var i = 0; i < hpp_scaffold.getJsonLength(res); i++) {
    if (res[i] == null) { localStorage.setItem("hpp_start", 0); break; }
    let q = JSON.parse(res[i]);
    let mark_content = marked(q["content"]);
    document.getElementById("hpp_talk_list").innerHTML += `<div id="${q["id"]}" class="hppt_comment-body hppt_comment-parent hppt_comment-odd hppt_comment-by-user"> <div id="item">
     <a class="hppt_pull-left hppt_thumb-sm hppt_avatar hppt_m-l-n-md"> <img nogallery="" src="${q["avatar"]}" class="hppt_img-40px hppt_photo hppt_img-square hppt_normal-shadow"> <\/a> 
     <div class="hppt_time-machine hppt_m-l-lg hppt_panel hppt_box-shadow-wrap-normal"> 
      <div class="hppt_panel-heading hppt_pos-rlt hppt_b-b hppt_b-light">
       <span class="hppt_text-muted hppt_m-l-sm hppt_pull-right" datetime="${q["time"]}"><strong class="talk_mobile_hide">  ${q["name"]}·<\/strong>${q["time"]}<\/span> 
      <\/div> 
      <div class="hppt_panel-body hppt_comment-content-true"> 
       <p>${mark_content}<\/p> 
      <\/div> 
      <div class="hppt_panel-footer"> 
       <div class="hppt_say_footer">	   
	   <\/div> 
      <\/div> 
     <\/div> 
    <\/div>`

  }
},
load: function(id, domain, limit) {
  var ajax = hpp_scaffold.ajaxObject();
  ajax.open("post", back, true);
  ajax.setRequestHeader("Content-Type", "text/plain");
  ajax.onreadystatechange = function () {
    if (ajax.readyState == 4) {
      if (ajax.status == 200) {
        document.getElementById(id).innerHTML = `<div class="hppt_streamline hppt_b-l hppt_m-l-lg hppt_m-b hppt_padder-v">
   <ol id="hpp_talk_list"><\/ol> 
   <a id="hpp_loadgo" class="hppt_button_nextpage">下一页</a>
  <\/div>`
        hpp_scaffold.loadtalk(JSON.parse(ajax.responseText))

      }
      else {
        throw ('HPPTALK异常：获取失败')
      }
    }
  }
  let body = {
    limit: limit,
    start: start
  }
  start += limit;
  localStorage.setItem("hpp_start", start);
  ajax.send(JSON.stringify(body));
}
	
}




function hpp_talk(init) {
  localStorage.setItem("hpp_start", 0);
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
  });
  //{ id, domain, limit, start, themecss }
  id = (function () { return init["id"] ? init["id"] : "hpp_talk" })()
  domain = (function () { return init["limit"] ? init["limit"] : (function () { throw ('HPPTALK异常：没能找到hpp后端地址') })() })()
  limit = (function () { return init["limit"] ? init["limit"] : 10 })()
  start = (function () { return init["start"] ? init["start"] : 0 })()
  if (init["themecss"] != undefined) { hpp_scaffold.loadStyle(init["themecss"]) };
  document.getElementById(id).innerHTML = `<div class="hpp_talk_loading"><div class="hpp_talk_part"><div style="display: flex;justify-content: center;"><div class="hppt_loader"><div class="hppt_inner one"></div><div class="hppt_inner two"></div><div class="hppt_inner three"></div></div></div></div><p style="text-align:center;">加载 HexoPlusPlus_Talk 中</p></div>`
  const back = `https://${domain}/hpp/api/gethpptalk`
  hpp_scaffold.load(id, domain, limit)
  document.getElementById('hpp_loadgo').addEventListener('click', function () {
    hpp_scaffold.load(id, domain, limit)
  });
};






