export const hpage = (config) => {
    return new Response('Coming Soon!')
    /* 
            if (hpp_githubpage != "true") {
        
              
            } else {
              let p = path.split("?")[0].substr(1)
              let init
              if (p.split("/").slice(-1) == "") { p += "index.html" }
              if (p == "2021/04/02/en/index.html" && urlObj.searchParams.get('pass') != "1234") {
                init = { headers: { "content-type": "text/html; charset=utf-8" } }
                let anss = `<html>
        <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> 
        <meta charset="UTF-8"> 
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
        <meta name="renderer" content="webkit"> 
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title>该文章已被加密</title>
        </head>
        <body>
            <div class="main">
                <img class="alert" alt="文章已被加密" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIoAAACACAMAAADjwgEwAAAAOVBMVEUAAAD5dBr7dRj4dBn/cBD5cxr4cxn6chj7dBj/cBj5cxr5dBn6cxn4dBn5cxr6dRX5cxr5cxr5dBoQJfbPAAAAEnRSTlMAgD/AEPDgYEAgoLCQcFAw0J/MNdW8AAADg0lEQVR42s3b7W7iMBSEYWftxA75At//xW7VZRWnQ3WkvOKE+VmJMtjxg8Ek4Iy5e8zdmsLFSXmoz8QSrsw61CZxDJdlrsf0OVyUR5WALrDJh3SZ68uswT1rfZ3e/dpNff0lMTjnVr/yEVO01SZdWae6Z/CFNzYXxxa+kttqwTHl2ORHl95zWBrvl/BMM0e34JZ8XC+6phwWtD7ptv95uWBBdzIVMm0luGTshVYB+B5ccvt12Ubnt8Xt91Vb3JyzX/rk5Jy+cr2M3Jyzl8nMnOO6Bewc103TMee4btw5rpsmA+e4bm7O2boh57huS9twyaODc7Zu43fBR3J1bni1q0/Pv0bgHNNNl3cGzgHdyouhmqBzXLf9SZ2c01HXKsA5pptWcXJOV6hWAc5R3bQKcI7qplUcnLs3uhlV1Ln5bboZVd7rXGqdMKuoQ9ObdDOqAOeAbkYVY0fOdTOqAOeAblLFEOAdutlVbOe4bmYV4BzQzahiOId104DPrVw3uwp3zv5fdhXgHNDNqAKcs3Sbw4kqhnNAN7vK25yLhlFGFcM5pJtdBTtn65ZPVDGcY7rZVbhzpgmgitgEdQNV5DUx3UAV5pxebaCKOMd0A1WYcyoTqKJWIt1AFeSczi6rou+rQDdQBTmnEoAqzLn9cfvjYBXdmQLdQBXgnOrGq+j7PNANVAHOiW6gCnBO2idQBTunuvEqtnPoxE2rgJXJdNMqyCt8OqsnH8A5NoZ6HgScoyf5+ykZ+raGr7f97PCWwD4I6iYnquCbPa4b/0aA6OZwgo9/NwV2IEC3950YeP7GTp1DuhkBzpkDx2M7x3XTAOfMRWZn7OJwn5YETjCQbjqtw8qc47o95GHAOaTbUptswDmkm/6aPwLnsG65HpKQc/rqtvP3fRTgHNUt1kM67tx49u6RqR6SgXNIt30097mlzpXT5G+1zQD2c3zvFmV+kHM6aedgieDBz2GZyN5t2+87TGQ/131PGdu7pa7/Hs/M9nPDD2i3cCqllA3s5/bnjqKbY4bDDLXFQOiwxJaGe/BP2gcihCLQuiZKlV1f58zNDmr9lNtLSyg+C8jeKrSXbX/pCqqHxdyvwTO6j53qnvu8/nFLfgz1uGXJ9SMy/sP3A3J7fhq7Pv34f21fnkUWt3eUtDTVSzPL1u6SKGfjrV6TvtM98bhccMlMOYWXSWXpHJNLaPMXZ8oyOMxlLIsAAAAASUVORK5CYII=">
                <form action="" method="GET" class="hpp-side-form">
                    <h2 class="pw-tip">该文章已被加密</h2>
                    <input type="password" name="pass" placeholder="请输入访问密码查看" required><button type="submit">提交</button>
                    
                    
                </form>
                <a href="/" class="return-home" title="点击回到网站首页">- 返回首页 - </a>
            </div>
            <style type="text/css">
            *{font-family:"Microsoft Yahei",微软雅黑,"Helvetica Neue",Helvetica,"Hiragino Sans GB","WenQuanYi Micro Hei",sans-serif;box-sizing:border-box;margin:0px;padding:0px;font-size:14px;-webkit-transition:.2s;-moz-transition:.2s;-ms-transition:.2s;-o-transition:.2s;transition:.2s}
            html,body{width:100%;height:100%}
            body{background-color:#F4F6F9;color:#768093}
            input,button{font-size:1em;border-radius:3px;-webkit-appearance:none}
            input{width:100%;padding:5px;box-sizing:border-box;border:1px solid #e5e9ef;background-color:#f4f5f7;resize:vertical}
            input:focus{background-color:#fff;outline:none}
            button{border:0;background:#6abd09;color:#fff;cursor:pointer;opacity:1;user-select:none}
            button:hover,button:focus{opacity:.9}
            button:active{opacity:1}
            .main{width:100%;max-width:500px;height:300px;padding:30px;background-color:#fff;border-radius:2px;box-shadow:0 10px 60px 0 rgba(29,29,31,0.09);transition:all .12s ease-out;position:absolute;left:0;top:0;bottom:0;right:0;margin:auto;text-align:center}
            .alert{width:80px}
            .hpp-side-form{margin-bottom:28px}
            .hpp-side-form input{float:left;padding:2px 10px;width:77%;height:37px;border:1px solid #ebebeb;border-right-color:transparent;border-radius:2px 0 0 2px;line-height:37px}
            .hpp-side-form button{position:relative;overflow:visible;width:23%;height:37px;border-radius:0 2px 2px 0;text-transform:uppercase}
            .pw-tip{font-weight:normal;font-size:26px;text-align:center;margin:25px auto}
            #pw-error {color: red;margin-top: 15px;margin-bottom: -20px;}
            .return-home{text-decoration:none;color:#b1b1b1;font-size:16px}
            .return-home:hover{color:#1E9FFF;letter-spacing:5px}
            </style>
        </body>
        </html>`
                return new Response(anss, init)
              }
              const anss = await fetch(`https://raw.githubusercontent.com/${hpp_githubpageusername}/${hpp_githubpagerepo}/${hpp_githubpagebranch}${hpp_githubpageroot}${p}`, { headers: { Accept: "application/vnd.github.v3.raw", Authorization: `token ${hpp_githubpagetoken}` } })
        
              if (await anss.status == 404) { init = { headers: { "content-type": "text/html; charset=utf-8" } }; return new Response(await (await fetch(`https://raw.githubusercontent.com/${hpp_githubpageusername}/${hpp_githubpagerepo}/${hpp_githubpagebranch}${hpp_githubpageroot}404.html`, { headers: { Accept: "application/vnd.github.v3.raw", Authorization: `token ${hpp_githubpagetoken}` } })).text(), init) }
              if ((p.split("/").slice(-1))[0].split(".")[1] == "html") {
                init = { headers: { "content-type": "text/html; charset=utf-8" } }
                return new Response(await anss.text(), init)
              }
              if ((p.split("/").slice(-1))[0].split(".")[1] == "js") {
                init = { headers: { "content-type": "application/javascript; charset=utf-8" } }
                return new Response(await anss.text(), init)
              }
              if ((p.split("/").slice(-1))[0].split(".")[1] == "css") {
                init = { headers: { "content-type": "text/css; charset=utf-8" } }
                return new Response(await anss.text(), init)
              }
              return new Response(anss, init)
        
        
            }
        
            */
}