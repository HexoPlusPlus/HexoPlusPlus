export async function genactiveres(config) {
    var k = (Date.parse(new Date()) - (await KVNAME.get("hpp_activetime"))) / 1000
    if (k < 30) {
        return genactres(config, '博主刚刚还在这里')
    }
    else if (k < 60) {
        return genactres(config, `博主在${Math.round(k)}秒前离开`)
    }
    else if (k < 3600) {
        return genactres(config, `博主在${Math.round(k / 60)}分钟前偷偷瞄了一眼博客`)
    }
    else {
        return genactres(config, `博主在${Math.round(k / 3600)}小时前活跃了一次`)
    }
}

function genactres(config, t) {
    return new Response(`document.getElementById("bloggeractivetime").innerHTML='${t}'`, {
        headers: {
            "content-type": "application/javascript; charset=utf-8",
            "Access-Control-Allow-Origin": config.hpp_cors
        }
    })
}