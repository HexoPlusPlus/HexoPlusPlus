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
swal({title: "\n导入中...",icon: "https://cdn.jsdelivr.net/gh/HexoPlusPlus/CDN@db63c79/loading.gif",text:"\n",button: false,closeModal: false,});
var ajax = ajaxObject();
    ajax.open( "post" , '/hpp/admin/api/inputtalk' , true );
    ajax.setRequestHeader( "Content-Type" , "text/plain" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {swal.close();
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


