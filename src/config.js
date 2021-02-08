
var ctJson = "/hpp/admin/api/get_config"
        $.getJSON(ctJson, function (data) {
		document.getElementById("tbody_config").innerHTML="";
            $.each(data, function (index, value) {
                $("#tbody_config").append(`
				<tr>
                          <td>
                           ${index}
                          <\/td>
                          <td>
                            ${value}
                          <\/td><td><a href="javascript:edit_config('${index}')">修改<\/td><td><a href="javascript:del_config('${index}')">删除<\/td>
                `);
            });document.getElementById("tbody_config").innerHTML+=`<tr><a href="javascript:hpp_add_config()">新增一项<\/a> <td> <\/td> <td> <\/td><td><\/td>`});
function edit_config(index){
			swal({
  content: {
    element: "input",
    attributes: {
	  placeholder: "输入"+index+"的键值"
    },
  },
})
.then((value) => {
if(value!="" & value!=null){
t_body={index:index,value:value}
var ajax = ajaxObject();
    ajax.open( "POST" , '/hpp/admin/api/edit_config' , true );
    ajax.setRequestHeader( "Content-Type" , "text/plain" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {
            if( ajax.status == 200 ) {
            swal("已更改配置！", {
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
		else{
			swal({
				title: "失败！",
				text: "配置修改失败，请检查您是否登陆",
				icon: "warning",
			});
			}
	}
}
ajax.send(JSON.stringify(t_body));
}
else{swal("配置修改已取消！","您输入了空值","success")}})};

function hpp_add_config(){
	
swal({
  content: {
    element: "input",
    attributes: {
	  placeholder: "输入键名"
    },
  },
})
.then((value1) => {

swal({
  content: {
    element: "input",
    attributes: {
	  placeholder: "输入键值"
    },
  },
})
.then((value2) => {
if(value1!="" & value1!=null & value2!="" & value2!=null){
t_body={index:value1,value:value2}
var ajax = ajaxObject();
    ajax.open( "POST" , '/hpp/admin/api/edit_config' , true );
    ajax.setRequestHeader( "Content-Type" , "text/plain" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {
            if( ajax.status == 200 ) {
            swal("已更改配置！", {
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
else{
swal({
	title: "失败！",
	text: "配置修改失败，请检查您是否登陆",
	icon: "warning",
});
}
}
}
ajax.send(JSON.stringify(t_body));
}
else{swal("配置修改已取消！","您输入了空值","success")}})
	
})}




function del_config(index){
swal({title:"你真的要删除此键值？",text:"我相信你是手滑了",icon:"warning",buttons:["没有", "是的！"],dangerMode: true}).then((value) => {if(value){swal({title:"你真的要删除数据吗？",text:"我寻思你也不想再配置一遍",icon:"warning",buttons:["我放弃了", "爷肯定了"],dangerMode: true}).then((value) => {if(value){swal({title:"你真的要重来啦？",text:"我觉得也不是不可以(bushi",icon:"warning",buttons:["我萎了", "视死如归"],dangerMode: true}).then((value) => {if(value){var ajax = ajaxObject();
    ajax.open( "post" , '/hpp/admin/api/del_config' , true );
    ajax.setRequestHeader( "Content-Type" , "text/plain" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {
            if( ajax.status == 200 ) {
                sweetAlert("成功", "该键值已删除！", "success").then((value) => {window.location.reload();}	)	    
            }
            else {
                sweetAlert("糟糕", "删除配置失败！", "error");
            }
        }
    }
    ajax.send(index);}else{hpp_no()}})}else{hpp_no()}})}else{hpp_no()}})
function hpp_no(){swal("您放弃了销毁数据","您的数据是安全的","success")}


};