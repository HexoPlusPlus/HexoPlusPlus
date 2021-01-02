function ajaxObject() {
    var xmlHttp;
    try {
        xmlHttp = new XMLHttpRequest();
        } 
    catch (e) {
        try {
                xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
            try {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                sweetAlert("糟糕", "你的浏览器不能更改文件", "error");
                return false;
            }
        }
    }
    return xmlHttp;
}
	
	var ctJson = "/hpp/admin/api/getimglist"
        $.getJSON(ctJson, function (data) {
            $.each(data, function (index, value) {
                $("#item-all").append(`
				  <div class="masonry__item" style="background-image:url('https://cdn.jsdelivr.net/gh/ChenYFan/blog@master/themes/fluid/source/img/loading.gif');zoom: 1;background-repeat: no-repeat;background-size: cover;-webkit-background-size: cover;-o-background-size: cover;background-position: center 0;" data-src='https://cdn.jsdelivr.net/gh/${hpp_githubimageusername}/${hpp_githubimagerepo}@${hpp_githubimagebranch}${hpp_githubimagepath}${value.name}'><figure>
            <figcaption class="content">
              <h2 style="width:148px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${value.name}<\/h2>
              <p class="date"><span>大小: <\/span>${value.size}B<\/p>
              <ul class="tags">
                
				 <li><a href="https://cdn.jsdelivr.net/gh/${hpp_githubimageusername}/${hpp_githubimagerepo}@${hpp_githubimagebranch}${hpp_githubimagepath}${value.name}">CDN加速地址<\/a><\/li>
				<li><a href="javascript:del(\'${value.name}\');" style="color: red;">删除此文件<\/a><\/li>
               <li><a href="${value.download_url}">原始地址<\/a><\/li>
                <li><a href="${value.html_url}">Github<\/a><\/li>
                
                <li><a href="javascript:info(\'${value.name}\',\'${value.path}\',\'${value.sha}\',\'${value.size}\',\'${value.git_url}\');">信息<\/a><\/li>
                <li><a href="#!" class="more" data-click-state="1">+<\/a><\/li>
              <\/ul>
            <\/figcaption>
          <\/figure>
        <\/div>
                `);
				console.log("加载列表");
            });
			
				$.getScript("https://cdn.jsdelivr.net/npm/gsap@2.0.2/src/minified/TweenMax.min.js",function(){ 
					console.log("加载TweenMax|1/6");
					$.getScript("https://cdn.jsdelivr.net/npm/gsap@2.1.0/src/minified/plugins/ScrollToPlugin.min.js",function(){  
					console.log("加载ScrollToPlugin|2/6");
					$.getScript("https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@787eece/dist/masonry.pkgd.js",function(){ 
					console.log("加载masonry|3/6");
					$.getScript("https://cdn.jsdelivr.net/npm/imagesloaded@4.1.4/imagesloaded.pkgd.min.js",function(){ 
					console.log("加载imagesloaded|4/6");
					$.getScript("https://cdn.jsdelivr.net/gh/HexoPlusPlus/HexoPlusPlus@5a2dc3a/dist/HexoPlusPlusFileManager.js",function(){
					console.log("加载HexoPlusPlusFileManager文件|5/6");
					$.getScript("https://cdn.jsdelivr.net/npm/sweetalert/dist/sweetalert.min.js",function(){  
					console.log("加载sweetalert，所有js加载完毕|6/6");
						$(function() {
        $('.masonry__item').Lazy();
    });console.log("激活懒加载");
				});
				});
				});
				});
				});
				});
				
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
    ajax.open( "GET" , '/hpp/admin/api/delimage/'+name , true );
    ajax.setRequestHeader( "Content-Type" , "text/plain" );
    ajax.onreadystatechange = function () {
        if( ajax.readyState == 4 ) {
            if( ajax.status == 200 ) {
            sweetAlert("成功！",  "文件已删除", "success");
			window.location.reload();
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
	function info(name,path,sha,size,git_url){
	sweetAlert("文件信息",  `名字:${name}\n路径:${path}\n哈希值:${sha}\n大小:${size}B\ngit路径:${git_url}`, "success");
	}
