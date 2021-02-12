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
swal({title:"你真的要销毁？",text:"我相信你是手滑了",icon:"warning",buttons:["没有", "是的！"],dangerMode: true}).then((value) => {if(value){swal({title:"你真的要删除数据吗？",text:"我寻思你也不想再配置一遍",icon:"warning",buttons:["我放弃了", "爷肯定了"],dangerMode: true}).then((value) => {if(value){swal({title:"你真的要重来啦？",text:"我觉得也不是不可以(bushi",icon:"warning",buttons:["我萎了", "视死如归"],dangerMode: true}).then((value) => {if(value){var ajax = ajaxObject();swal({title: "\n删除中...",icon: "https://cdn.jsdelivr.net/gh/HexoPlusPlus/CDN@db63c79/loading.gif",text:"\n",button: false,closeModal: false,});
    ajax.open( "get" , '/hpp/admin/api/del_all' , true );
    ajax.setRequestHeader( "Content-Type" , "text/plain" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {swal.close();
            if( ajax.status == 200 ) {
                window.location.reload();		    
            }
            else {
                sweetAlert("糟糕", "删除配置失败！", "error");
            }
        }
    }
    ajax.send();}else{hpp_no()}})}else{hpp_no()}})}else{hpp_no()}})
function hpp_no(){swal("您放弃了销毁数据","您的数据是安全的","success")}
}

function checkUpdate(){
swal({title: "\n检测更新中...",icon: "https://cdn.jsdelivr.net/gh/HexoPlusPlus/CDN@db63c79/loading.gif",text:"\n",button: false,closeModal: false,});
var ajax = ajaxObject();
    ajax.open( "post" , '/hpp/admin/api/checkupdate' , true );
    ajax.setRequestHeader( "Content-Type" , "text/plain" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {swal.close();
            if( ajax.status == 200 ) {
                eval(ajax.responseText);
            }
            else {
                sweetAlert("糟糕", "检测更新失败！", "error");
            }
        }
    }
    ajax.send(new Date().getTime());
}

hpp_get_doc_long();
hpp_get_img_long()