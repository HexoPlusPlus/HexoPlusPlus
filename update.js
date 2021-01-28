if(hpp_ver == 'HexoPlusPlus@0.1.1'){
  swal({
title: "成功",
    text: "无需更新，当前已是最新版本",
    icon: "success",
});
}else{
   swal({
title: "成功",
    text: "紧急安全性更新，请及时更新",
    icon: "warning"})
	.then(() => {
location.href="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@main/index.js"
})
}
