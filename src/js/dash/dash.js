/*
const hpp_search = () => {
    var input, filter, table, tr, td, i;
    input = document.getElementById("search_Input");
    filter = input.value.toUpperCase();
    table = document.getElementById("hpp_table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}*/
/*close waiting*/
window.cw = () => {
    try {
        swal.close()
    } catch (e) { console.error('当前没有已打开的SWAL窗口') }
}
/*Show Waiting*/
window.sw = () => {
    cw()
    swal({ title: "\n检测更新中...", icon: "https://cdn.jsdelivr.net/gh/HexoPlusPlus/CDN@db63c79/loading.gif", text: "\n", button: false, closeModal: false, });
}
/*Show Error*/
window.se = (t, e) => {
    uw()
    swal({ title: `\n${t}`, icon: "error", text: e });
    throw e
}


window.getJsonLength = (jsonData) => {

    var jsonLength = 0;

    for (var item in jsonData) {

        jsonLength++;

    }

    return jsonLength;
}

window.h_api_helper = {
    github: async (init) => {
        let ghbody = JSON.stringify(init)
        const res = await fetch('/hpp/admin/api/github', { method: "POST", body: ghbody })
        try {
            const resj = await res.json()
            if (resj.code > -1) {
                return resj
            } else {
                se(resj.msg, resj.content)
            }
        } catch (e) {
            se("未知的错误", "后端返回了我们无法理解的数据")
        }
    },
    kick: async () => {
        const res = await fetch('/hpp/admin/api/kick', { method: "POST" })
        try {
            const resj = await res.json()
            if (resj.code > -1) {
                swal({ title: "\n签到成功！", icon: "success", text: "\n" });

            } else {
                ew(resj.msg, resj.content)
            }
        } catch (e) {
            ew("未知的错误", "后端返回了我们无法理解的数据")
        }
    }
};


(async () => {
    document.getElementById('logout').addEventListener('click', () => {
        document.cookie = `h_cookie_auth=;path=/hpp/admin;Max-Age=86400`; window.location.href = '/hpp/admin/login';
    })
    document.getElementById('kick').addEventListener('click', () => {
        h_api_helper.kick()
    })


})()