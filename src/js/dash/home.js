const checkUpdate = async () => {
    uw();
    let req = await (await fetch('/hpp/admin/api/update', { method: "POST", body: JSON.stringify({ action: "check" }) })).json()
    let icon
    if (req.code == 1) { icon = "warning" } else if (req.code == -1) { icon = "error" } else { icon = "success" }
    swal({ title: req.msg, icon: icon, text: req.content });
}

(async () => {
    document.getElementById("document_all").innerHTML = getJsonLength(JSON.parse((await h_api_helper.github({ action: "getdoclist" })).content)) || 'ERROR'
    document.getElementById("img_all").innerHTML = getJsonLength(JSON.parse((await h_api_helper.github({ action: "getimglist" })).content)) || 'ERROR'
})()