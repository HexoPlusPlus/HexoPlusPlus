
const checkUpdate = async () => {
    cw();
    let req = await (await fetch('/hpp/admin/api/update', { method: "POST", body: JSON.stringify({ action: "check" }) })).json()
    let icon
    if (req.code == 1) { icon = "warning" } else if (req.code == -1) { icon = "error" } else { icon = "success" }
    swal({ title: req.msg, icon: icon, text: req.content });
}

(async () => {

    if (config.hexo.switch) {
        document.getElementById("document_all").innerHTML = getJsonLength(JSON.parse((await h_api_helper.github({
            action: "listtree",
            username: config.hexo.gh_username,
            reponame: config.hexo.gh_reponame,
            path: config.hexo.gh_docpath,
            branch: config.hexo.gh_branch,
            token: config.hexo.gh_token
        })).content)) || 'ERROR'
    }
    if (config.img.switch && config.img.type == "gh") {
        document.getElementById("img_all").innerHTML = getJsonLength(JSON.parse((await h_api_helper.github({
            action: "listtree",
            username: config.img.gh_username,
            reponame: config.img.gh_reponame,
            path: config.img.gh_docpath,
            branch: config.img.gh_branch,
            token: config.img.gh_token
        })).content)) || 'ERROR'
    }
})()