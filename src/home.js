function hpp_get_doc_long(){
var ajax = ajaxObject();
ajax.open( "get" , '/hpp/admin/api/getlist', true );
ajax.setRequestHeader( "Content-Type" , "text/plain" );
ajax.onreadystatechange = function () {
if( ajax.readyState == 4 ) {
    if( ajax.status == 200 ) {
		document.getElementById("document_all").innerHTML=JSON.parse(ajax.responseText).length
        //console.log(JSON.parse(ajax.responseText).length)    
    }
    else {
        document.getElementById("document_all").innerHTML="获取失败"
			}
        }
    }
    ajax.send();
}
function hpp_get_img_long(){
var ajax = ajaxObject();
ajax.open( "get" , '/hpp/admin/api/getimglist', true );
ajax.setRequestHeader( "Content-Type" , "text/plain" );
ajax.onreadystatechange = function () {
if( ajax.readyState == 4 ) {
    if( ajax.status == 200 ) {
		document.getElementById("img_all").innerHTML=JSON.parse(ajax.responseText).length
        //console.log(JSON.parse(ajax.responseText).length)    
    }
    else {
        document.getElementById("document_all").innerHTML="获取失败"
			}
        }
    }
    ajax.send();
}
function hpp_del_all(){
var ajax = ajaxObject();
    ajax.open( "get" , '/hpp/admin/api/del_all' , true );
    ajax.setRequestHeader( "Content-Type" , "text/plain" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {
            if( ajax.status == 200 ) {
                window.location.reload();		    
            }
            else {
                sweetAlert("糟糕", "删除配置失败！", "error");
            }
        }
    }
    ajax.send();
}
function hpp_artitalk_into_hpptalk(){
var slider = document.createElement("textarea");
slider.id="artitalk";
slider.style="border:0;border-radius:5px;background-color:rgba(241,241,241,.98);width: 355px;height: 100px;padding: 10px;resize: none;"
swal({
      title: "输入从LeanCloud中导出的数据",
      content: slider
})
.then((value) => {
talk_re=document.getElementById("artitalk").value
if(talk_re!=""){
talk_re=talk_re.split('\n')
talk=[]
for(var i=0;i<talk_re.length-1;i++){
talk.push(JSON.parse(talk_re[i]))
}
var ajax = ajaxObject();
    ajax.open( "post" , '/hpp/admin/api/inputtalk' , true );
    ajax.setRequestHeader( "Content-Type" , "text/plain" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {
            if( ajax.status == 200 ) {
                sweetAlert("成功",  "说说已导入", "success");
		    
            }
            else {
                sweetAlert("糟糕", "说说导入失败", "error");
            }
        }
    }
    ajax.send(JSON.stringify(talk));
}else{sweetAlert("成功",  "你取消了此次导入", "success");}
})
};
hpp_get_doc_long();
hpp_get_img_long()