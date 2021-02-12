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