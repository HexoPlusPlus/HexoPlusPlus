function hpp_update(){
var ajax = ajaxObject();
    ajax.open( "get" , '/hpp/admin/api/update' , true );
    ajax.setRequestHeader( "Content-Type" , "text/plain" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {
            if( ajax.responseText == "true" ) {
                swal("更新完毕！", {
  icon: "success",
  buttons: {
    yes: "是"
  },
})
.then((value) => {
  switch (value) {
    default:
	  window.location.reload();
  }
});
            }
            else {
                sweetAlert("糟糕", "更新失败!", "error");
            }
        }
    }
    ajax.send();
}

if(hpp_ver == 'HexoPlusPlus@1.0.6'){
  swal({
title: "成功",
    text: "无需更新，当前已是最新版本",
    icon: "success",
});
}else{
swal("存在更新，是否更新？", {
  icon: "warning",
  buttons: {
    cancel: "否",
    update: "是"
  },
})
.then((value) => {
  switch (value) {
 
    case "update":
      hpp_update();
	  break;
 
    default:
      swal("更新已取消",{icon: "warning"});
	  break;
  }
});
}


