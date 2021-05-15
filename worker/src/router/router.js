import { lang } from './../i18n/language'
import { ghupload, ghdel, ghget } from './../github/manager'
import { ghtreelist, ghlist } from './../github/getlist'
import { gethtml } from './../gethtml'

import { getCookie, getJsonLength, rp, formatconfig, getname, getsuffix, genjsonres } from './../scaffold'
import { hppupdate, ghlatver, ghlatinfo } from './../update.js'
export const githubroute = async (request, config, hinfo) => {
    try {
        let r, rs, name, msgd, hpp_list_index
        const apireq = await request.json()
        switch (apireq.action) {
            case 'add':
                r = await ghupload({
                    file: apireq.file,
                    username: apireq.username,
                    reponame: apireq.reponame,
                    path: apireq.path,
                    branch: apireq.branch,
                    token: apireq.token
                })
                rs = r.status
                if (rs == 200 || rs == 201) {
                    /*
                    if (rs == 201) {
                        await HKV.delete("hpp_doc_list_index");
                        return genjsonres('新建文档成功！', 0, rs)
                    }*/
                    return genjsonres(lang.GH_UPLOAD_SUCCESS, 0, rs)
                } else {
                    return genjsonres(lang.GH_UPLOAD_ERROR, 1, rs)
                }
            case 'get':
                r = await ghget({
                    username: apireq.username,
                    reponame: apireq.reponame,
                    path: apireq.path,
                    branch: apireq.branch,
                    token: apireq.token
                })
                if (apireq.json) {
                    return genjsonres(lang.GH_GET_SUCCESS, 0, 200, await r.text())
                } else {
                    return r
                }

            case 'del':
                r = await ghdel({
                    username: apireq.username,
                    reponame: apireq.reponame,
                    path: apireq.path,
                    branch: apireq.branch,
                    token: apireq.token
                })
                rs = r.status
                if (rs == 200) {
                    return genjsonres(lang.GH_DELETE_SUCCESS, 0, rs)
                } else {
                    return genjsonres(lang.GH_DELETE_ERROR, 1, rs)
                }
            case 'list':
                return genjsonres(lang.GH_LIST_SUCCESS, 0, 200, JSON.stringify(await ghlist({
                    username: apireq.username,
                    reponame: apireq.reponame,
                    path: apireq.path,
                    branch: apireq.branch,
                    token: apireq.token
                })))
            case 'listtree':
                return genjsonres(lang.GH_TREELIST_SUCCESS, 0, 200, JSON.stringify(await ghtreelist({
                    username: apireq.username,
                    reponame: apireq.reponame,
                    path: apireq.path,
                    branch: apireq.branch,
                    token: apireq.token
                })))

            /*
            case 'adddoc':
                r = await ghupload({
                    file: apireq.file,
                    username: config.hpp_githubdocusername,
                    reponame: config.hpp_githubdocrepo,
                    path: config.githubdocpath,
                    branch: config.hpp_githubdocbranch,
                    filename: apireq.filename,
                    token: config.hpp_githubdoctoken
                })
                rs = r.status
                if (rs == 200 || rs == 201) {
                    if (rs == 201) { await HKV.delete("hpp_doc_list_index"); return genjsonres('新建文档成功！', 0, rs) }
                    return genjsonres('上传文档成功！', 0, rs)
                } else {
                    return genjsonres('上传/新建文档失败！', 1, rs)
                }
            case 'adddraft':

                r = await ghupload({
                    file: apireq.file,
                    username: config.hpp_githubdocusername,
                    reponame: config.hpp_githubdocrepo,
                    path: config.githubdocdraftpath,
                    branch: config.hpp_githubdocbranch,
                    filename: apireq.filename,
                    token: config.hpp_githubdoctoken
                })
                rs = r.status
                if (rs == 200 || rs == 201) {
                    if (rs == 201) { await HKV.delete("hpp_doc_draft_list_index"); return genjsonres('上传草稿成功！', 0, rs) }
                    return genjsonres('上传草稿成功！', 0, rs)
                } else {
                    return genjsonres('上传/新建草稿失败！', -1, rs)
                }
            case 'addimg':
                name = `${Date.parse(new Date())}.${apireq.suffix}`
                r = await ghupload({
                    file: apireq.file,
                    username: config.hpp_githubimageusername,
                    reponame: config.hpp_githubimagerepo,
                    path: config.githubimagepath,
                    branch: config.hpp_githubimagebranch,
                    filename: name,
                    token: config.hpp_githubimagetoken
                })
                rs = r.status

                if (rs == 200 || rs == 201) {
                    const jsdurl = `https://cdn.jsdelivr.net/gh/${config.hpp_githubimageusername}/${config.hpp_githubimagerepo}@${config.hpp_githubimagebranch}${config.hpp_githubimagepath}${name}`

                    return genjsonres('上传图片成功！', 0, rs, jsdurl)
                } else {
                    return genjsonres('上传图片失败！', -1, rs)
                }
            case 'deldoc':
                r = await ghdel({
                    username: config.hpp_githubdocusername,
                    reponame: config.hpp_githubdocrepo,
                    path: config.githubdocpath,
                    branch: config.hpp_githubdocbranch,
                    filename: apireq.filename,
                    token: config.hpp_githubdoctoken
                })
                rs = r.status
                if (rs == 200) {
                    await HKV.delete("hpp_doc_list_index")
                    return genjsonres('删除文档成功！', 0, rs)
                } else {
                    return genjsonres('删除文档失败！', -1, rs)
                }
            case 'deldraft':
                r = await ghdel({
                    username: config.hpp_githubdocusername,
                    reponame: config.hpp_githubdocrepo,
                    path: config.githubdocdraftpath,
                    branch: config.hpp_githubdocbranch,
                    filename: apireq.filename,
                    token: config.hpp_githubdoctoken
                })
                rs = r.status
                if (rs == 200) {
                    await HKV.delete("hpp_doc_list_index")
                    return genjsonres('删除艹稿成功！', 0, rs)
                } else {
                    return genjsonres('删除艹稿失败！', -1, rs)
                }

            case 'delimg':
                r = await ghdel({
                    username: config.hpp_githubimageusername,
                    reponame: config.hpp_githubimagerepo,
                    path: config.githubimagepath,
                    branch: config.hpp_githubimagebranch,
                    filename: apireq.filename,
                    token: config.hpp_githubimagetoken
                })
                rs = r.status
                if (rs == 200) {
                    await HKV.delete("hpp_doc_list_index")
                    return genjsonres('删除图片成功！', 0, rs)
                } else {
                    return genjsonres('删除图片失败！', -1, rs)
                }
            case 'getdoc':
                return ghget({
                    username: config.hpp_githubdocusername,
                    reponame: config.hpp_githubdocrepo,
                    path: config.githubdocpath,
                    branch: config.hpp_githubdocbranch,
                    filename: apireq.filename,
                    token: config.hpp_githubdoctoken
                })
            case 'getdraft':
                return ghget({
                    username: config.hpp_githubdocusername,
                    reponame: config.hpp_githubdocrepo,
                    path: config.githubdocdraftpath,
                    branch: config.hpp_githubdocbranch,
                    filename: apireq.filename,
                    token: config.hpp_githubdoctoken
                })
            case 'getscaffolds':
                return ghget({
                    username: config.hpp_githubdocusername,
                    reponame: config.hpp_githubdocrepo,
                    path: `${config.hpp_githubdocroot}scaffolds/`,
                    branch: config.hpp_githubdocbranch,
                    filename: 'post.md',
                    token: config.hpp_githubdoctoken
                })
            case 'getdoclist':

                hpp_list_index = await HKV.get("hpp_doc_list_index")
                if (hpp_list_index === null) {
                    hpp_list_index = JSON.stringify(await ghtreelist({
                        username: config.hpp_githubdocusername,
                        reponame: config.hpp_githubdocrepo,
                        path: config.githubdocpath,
                        branch: config.hpp_githubdocbranch,
                        token: config.hpp_githubdoctoken
                    }))
                    if (!hinfo.dev) {
                        await HKV.put("hpp_doc_list_index", hpp_list_index)
                        msgd = '没有命中缓存,获取文章列表成功！'
                    } else {

                        msgd = '没有命中缓存,处于开发模式,获取文章列表成功！'
                    }
                } else {
                    msgd = '命中了缓存,获取文章列表成功！'
                }
                return genjsonres(msgd, 0, 200, hpp_list_index)

            case 'getdraftlist':

                hpp_list_index = await HKV.get("hpp_doc_draft_list_index")
                if (hpp_list_index === null) {
                    hpp_list_index = JSON.stringify(await ghtreelist({
                        username: config.hpp_githubdocusername,
                        reponame: config.hpp_githubdocrepo,
                        path: config.githubdocdraftpath,
                        branch: config.hpp_githubdocbranch,
                        token: config.hpp_githubdoctoken
                    }))
                    if (!hinfo.dev) {
                        await HKV.put("hpp_doc_draft_list_index", hpp_list_index)
                        msgd = '没有命中缓存,获取艹稿列表成功！'
                    } else {
                        msgd = '没有命中缓存,处于开发模式,获取艹稿列表成功！'
                    }
                } else {
                    msgd = '命中了缓存,获取艹稿列表成功！'
                }
                return genjsonres(msgd, 0, 200, hpp_list_index)


            case 'getimglist':

                hpp_list_index = await HKV.get("hpp_img_list_index")
                if (hpp_list_index === null) {
                    hpp_list_index = JSON.stringify(await ghtreelist({
                        username: config.hpp_githubimageusername,
                        reponame: config.hpp_githubimagerepo,
                        path: config.githubimagepath,
                        branch: config.hpp_githubimagebranch,
                        token: config.hpp_githubimagetoken
                    }))
                    if (!hinfo.dev) {
                        await HKV.put("hpp_img_list_index", hpp_list_index)
                        msgd = '没有命中缓存,获取图片列表成功！'
                    } else {
                        msgd = '没有命中缓存,处于开发模式,获取图片列表成功！'
                    }
                } else {
                    msgd = '命中了缓存,获取图片列表成功！'
                }
                return genjsonres(msgd, 0, 200, hpp_list_index)
            case 'delindex':
                await HKV.delete("hpp_doc_draft_list_index")
                await HKV.delete("hpp_doc_list_index")
                await HKV.delete("hpp_img_list_index")
                return genjsonres('清除索引缓存成功!', 0, 200)
                */
            default:
                return genjsonres(lang.UNKNOW_ACTION, -1, 500)
        }
    } catch (lo) { return genjsonres(lang.UNKNOW_ERROR, -1, 500, lo) }
}

export const dashroute = async (request, config, hinfo) => {
    const req = request
    const urlStr = req.url
    const urlObj = new URL(urlStr)
    const path = urlObj.href.substr(urlObj.origin.length)
    let hpp_js = ""
    let ainfo = {
        hpp_home_act: "",
        hpp_edit_act: "",
        hpp_site_act: "",
        hpp_talk_act: "",
        hpp_docs_man_act: "",
        hpp_img_man_act: "",
        hpp_tool_act: "",
        hpp_set_act: ""
    }
    let hpp_init = gethtml.dash404
    if (rp(path) == "/hpp/admin/dash/home") {
        ainfo.hpp_home_act = " active"
        hpp_init = gethtml.dashhome(config, hinfo)
        hpp_js = gethtml.dashhomejs(config, hinfo)
    }
    if (rp(path) == "/hpp/admin/dash/edit") {
        ainfo.hpp_edit_act = " active"
        hpp_init = gethtml.dashedit
        hpp_js = gethtml.dasheditjs(config, hinfo)
    }
    if (rp(path) == "/hpp/admin/dash/site") {
        ainfo.hpp_site_act = " active"
        hpp_init = gethtml.dashsite
        hpp_js = gethtml.dashsitejs(config, hinfo)
    }
    if (rp(path) == "/hpp/admin/dash/talk") {
        ainfo.hpp_talk_act = " active"
        hpp_init = gethtml.dashtalk
        hpp_js = gethtml.dashtalkjs(config, hinfo)
    }
    if (rp(path) == "/hpp/admin/dash/docs_man") {
        ainfo.hpp_docs_man_act = " active"
        hpp_init = gethtml.dashdocs
        hpp_js = gethtml.dashdocsjs(hinfo)

    }
    if (rp(path) == "/hpp/admin/dash/img_man") {
        ainfo.hpp_img_man_act = " active"
        hpp_init = gethtml.dashimg
        hpp_js = gethtml.dashimgjs(hinfo)
    }
    if (rp(path) == "/hpp/admin/dash/tool") {
        ainfo.hpp_tool_act = " active"
        hpp_init = gethtml.dashtool
        hpp_js = gethtml.dashtooljs(hinfo)
    }
    let hpp_dash_head = gethtml.dash_head(config, hinfo, ainfo)
    let hpp_dash_foot = gethtml.dash_foot(hinfo, hpp_js)
    let hpp_dash = `${hpp_dash_head}${hpp_init}${hpp_dash_foot}`
    return new Response(hpp_dash, {
        headers: { "content-type": "text/html;charset=UTF-8" }
    })


}

export const updateroute = async (request, config, hinfo) => {
    try {
        const apireq = await request.json()
        switch (apireq.action) {
            case 'update':
                if (apireq.dev) {
                    return hppupdate(config, true)
                } else {
                    return hppupdate(config, false)
                }
            case 'check':
                if (await ghlatver(config, false) == hinfo.ver) {
                    return genjsonres(lang.NEED_UPDATE, 0, 200)
                } else {
                    return genjsonres(lang.NEED_NOT_UPDATE, 1, 200, await ghlatinfo(config))
                }
            default:
                return genjsonres(lang.UNKNOW_ACTION, -1, 500)
        }
    } catch (lo) { throw lo }
}