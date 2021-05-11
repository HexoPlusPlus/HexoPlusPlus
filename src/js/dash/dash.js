const kick = () => {
    var ajax = ajaxObject();
    ajax.open("get", '/hpp/admin/api/kick', true);
    ajax.setRequestHeader("Content-Type", "text/plain");
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {
            if (ajax.status == 200) {
                sweetAlert("成功", "已签到", "success");

            }
            else {
                sweetAlert("糟糕", "签到失败", "error");
            }
        }
    }
    ajax.send();
};

const hpp_logout = () => {
    document.cookie = `h_cookie_auth=;path=/hpp/admin;Max-Age=86400`; window.location.href = '/hpp/admin/login';
};/*
const ajaxObject = () => {
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
                sweetAlert("糟糕", "你的浏览器不能上传文件", "error");
                return false;
            }
        }
    }
    return xmlHttp;
};*/
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
}

const uw = () => {
    try {
        swal.close()
    } catch (e) { console.error('当前没有已打开的SWAL窗口') }
}

const cw = () => {
    uw()
    swal({ title: "\n检测更新中...", icon: "https://cdn.jsdelivr.net/gh/HexoPlusPlus/CDN@db63c79/loading.gif", text: "\n", button: false, closeModal: false, });
}

const ew = (t, e) => {
    uw()
    swal({ title: `\n${t}`, icon: "error", text: e });
    throw e
}


const getJsonLength = (jsonData) => {

    var jsonLength = 0;

    for (var item in jsonData) {

        jsonLength++;

    }

    return jsonLength;
}

const h_api_helper = {
    github: async (init) => {
        let ghbody = JSON.stringify(init)
        const res = await fetch('/hpp/admin/api/github', { method: "POST", body: ghbody })
        try {
            const resj = await res.json()
            if (resj.code > -1) {
                return resj
            } else {
                ew(resj.msg, resj.content)
            }
        } catch (e) {
            ew("未知的错误", "后端返回了我们无法理解的数据")
        }
    }
}
