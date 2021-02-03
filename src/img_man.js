
var ctJson = "/hpp/admin/api/getimglist"
        $.getJSON(ctJson, function (data) {
            $.each(data, function (index, value) {
                $("#tbody_img").append(`
				<tr>
                          <td>
                           ${value.name}
                          <\/td>
                          <td>
                            ${value.size}B
                          <\/td>
						  <td>
                            <img data-src="https://cdn.jsdelivr.net/gh/${hpp_githubimageusername}/${hpp_githubimagerepo}@${hpp_githubimagebranch}${hpp_githubimagepath}${value.name}" class="lazy_img" style="width:100px" src="https://cdn.jsdelivr.net/gh/ChenYFan/blog@master/themes/fluid/source/img/loading.gif">
                          <\/td>
                          <td>
                            <a href="https://cdn.jsdelivr.net/gh/${hpp_githubimageusername}/${hpp_githubimagerepo}@${hpp_githubimagebranch}${hpp_githubimagepath}${value.name}">CDN链接<\/a>
                          <\/td>
                          <td>
                            <a href="javascript:del(\'${value.name}\');">删除<\/a>
                          <\/td>
						  <td>
                            <a href="${value.download_url}">原始地址<\/a>
                          <\/td>
						  <td>
                            <a href="${value.html_url}">Github地址<\/a>
                          <\/td>
                        <\/tr>
                `);
            });$('.lazy_img').Lazy();});
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
    ajax.open( "GET" , '/hpp/admin/api/delimage/'+name , true );
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