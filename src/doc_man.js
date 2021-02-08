function round(number, precision) {
    return Math.round(+number + 'e' + precision) / Math.pow(10, precision);
}
let docsize=0
let hpp_arr_githubdocpath=hpp_githubdocpath.substr(1,hpp_githubdocpath.length-1)
let hpp_arr_draft_githubdocpath=hpp_githubdocdraftpath.substr(1,hpp_githubdocdraftpath.length-1)
var ctJson = "/hpp/admin/api/getlist"
        $.getJSON(ctJson, function (data) {
		document.getElementById("tbody_doc").innerHTML="";
            $.each(data, function (index, value) {
				docsize=round(value.size/1024, 2)
				arr_path=value.path.split(hpp_arr_githubdocpath)[1]
                $("#tbody_doc").append(`
				<tr>
                          <td>
                           ${arr_path}
                          <\/td>
                          <td>
                            ${docsize}KB
                          <\/td>
						  <td>
                            已发布
                          <\/td>
                          <td>
                            <a href="https://cdn.jsdelivr.net/gh/${hpp_githubdocusername}/${hpp_githubdocrepo}@${hpp_githubdocbranch}/${value.path}">CDN链接<\/a>
                          <\/td>
                          <td>
                            <a href="javascript:del(\'${arr_path}\');">删除<\/a>
                          <\/td>
						  <td>
                            <a href="${value.download_url}">原始地址<\/a>
                          <\/td>
						  <td>
                            <a href="${value.html_url}">Github地址<\/a>
                          <\/td>
                        <\/tr>
                `);
            })
						
var drJson = "/hpp/admin/api/get_draftlist"
        $.getJSON(drJson, function (data) {
            $.each(data, function (index, value) {
				docsize=round(value.size/1024, 2)
				arr_path=value.path.split(hpp_arr_draft_githubdocpath)[1]
                $("#tbody_doc").append(`
				<tr>
                          <td>
                           ${arr_path}
                          <\/td>
                          <td>
                            ${docsize}KB
                          <\/td>
						  <td>
                            未发布
                          <\/td>
                          <td>
                            <a href="https://cdn.jsdelivr.net/gh/${hpp_githubdocusername}/${hpp_githubdocrepo}@${hpp_githubdocbranch}/${value.path}">CDN链接<\/a>
                          <\/td>
                          <td>
                            <a href="javascript:del_dr(\'${arr_path}\');">删除<\/a>
                          <\/td>
						  <td>
                            <a href="${value.download_url}">原始地址<\/a>
                          <\/td>
						  <td>
                            <a href="${value.html_url}">Github地址<\/a>
                          <\/td>
                        <\/tr>
                `);
            })});
			
			
			});

			
function del(name){
	swal({
  title: "确定！",
  text: `你将要删除${name}，真的这么做么？`,
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    delfile(name);
  } else {
    swal("好的，当前文件没有被删除", {
      icon: "success",
    });
  }
});
	}
function delfile(name){
	var ajax = ajaxObject();
    ajax.open( "GET" , '/hpp/admin/api/deldoc/'+name , true );
    ajax.setRequestHeader( "Content-Type" , "text/plain" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {
            if( ajax.status == 200 ) {
            swal("已删除！", {
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
				text: "文件删除失败，请确定您是否有权限删除，或者该文件是否存在",
				icon: "warning",
			});
			}
	}
	}
ajax.send();};



function del_dr(name){
	swal({
  title: "确定！",
  text: `你将要删除${name}，真的这么做么？`,
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    deldraft(name);
  } else {
    swal("好的，当前文件没有被删除", {
      icon: "success",
    });
  }
});
	}
function deldraft(name){
	var ajax = ajaxObject();
    ajax.open( "GET" , '/hpp/admin/api/deldraft/'+name , true );
    ajax.setRequestHeader( "Content-Type" , "text/plain" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {
            if( ajax.status == 200 ) {
            swal("已删除！", {
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
				text: "文件删除失败，请确定您是否有权限删除，或者该文件是否存在",
				icon: "warning",
			});
			}
	}
	}
ajax.send();};