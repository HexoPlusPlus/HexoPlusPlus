const hpp_now='HexoPlusPlus@0.0.1'
if(hpp_now == hpp_ver){
  swal({
title: "成功",
    text: "无需更新，当前已是最新版本",
    icon: "success",
});
}else{
   swal({
title: "成功",
    text: "需要更新，点击确定获取最新代码",
    icon: "warning"})
	.then(() => {
location.href="https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@latest/index.js"
})
}
