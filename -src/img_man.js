function start_limit(){
				var $table = $("table");
            var currentPage = 0; 
            var pageSize = hpp_page_limit;  
            $table.bind('paging', function () {
                $table.find('tbody tr').hide().slice(currentPage * pageSize, (currentPage + 1) * pageSize).show();
            });
            var sumRows = $table.find('tbody tr').length;
            var sumPages = Math.ceil(sumRows / pageSize); 

            var $pager = $('<div class="page" style="text-align:center;"></div>');  
            for (var pageIndex = 0; pageIndex < sumPages; pageIndex++) {
                $('<a href="#" id="pageStyle" onclick="changCss(this)"><span>' + (pageIndex + 1) + '</span></a>').bind("click", { "newPage": pageIndex }, function (event) {
                    currentPage = event.data["newPage"];
                    $table.trigger("paging");
                }).appendTo($pager);
                $pager.append(" ");
            }
            $pager.insertAfter($table);
            $table.trigger("paging");

            var $pagess = $('#pageStyle');
            $pagess[0].style.backgroundColor = "#ccc";
            $pagess[0].style.color = "#ffffff";
				
			}
      function changCss(obj) {
            var arr = document.getElementsByTagName("a");
            for (var i = 0; i < arr.length; i++) {
                if (obj == arr[i]) {     
                    obj.style.backgroundColor = "#ccc";
                    obj.style.color = "#ffffff";
                }
                else {
                    arr[i].style.color = "";
                    arr[i].style.backgroundColor = "";
                }
            }
        }  
function round(number, precision) {
    return Math.round(+number + 'e' + precision) / Math.pow(10, precision);
}

let imgsize=0
var ctJson = "/hpp/admin/api/getimglist"
        $.getJSON(ctJson, function (data) {
			document.getElementById("tbody_img").innerHTML=""
            $.each(data, function (index, value) {
				imgsize=round(value.size/1024, 2)
                $("#tbody_img").append(`
				<tr>
                          <td>
                           ${value.name}
                          <\/td>
                          <td>
                            ${imgsize}KB
                          <\/td>
						  <td>
                            <a href="https://cdn.jsdelivr.net/gh/${hpp_githubimageusername}/${hpp_githubimagerepo}@${hpp_githubimagebranch}${hpp_githubimagepath}${value.name}" class="swipebox" title="图片预览"><img data-src="https://cdn.jsdelivr.net/gh/${hpp_githubimageusername}/${hpp_githubimagerepo}@${hpp_githubimagebranch}${hpp_githubimagepath}${value.name}" class="lazy_img" style="width:100px" src="${hpp_lazy_img}"></a>
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
            });  start_limit();$('.lazy_img').Lazy();$('.swipebox').swipebox();});
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
			swal({title: "\n删除中...",icon: "https://cdn.jsdelivr.net/gh/HexoPlusPlus/CDN@db63c79/loading.gif",text:"\n",button: false,closeModal: false,});
	var ajax = ajaxObject();
    ajax.open( "GET" , '/hpp/admin/api/delimage/'+name , true );
    ajax.setRequestHeader( "Content-Type" , "text/plain" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {
            if( ajax.status == 200 ) {swal.close()
            swal("已删除！","", {
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
		else{swal.close()
			swal({
				title: "失败！",
				text: "文件删除失败，请确定您是否有权限删除，或者该文件是否存在",
				icon: "warning",
			});
			}
	}
	}
	ajax.send(new Date().getTime());};

