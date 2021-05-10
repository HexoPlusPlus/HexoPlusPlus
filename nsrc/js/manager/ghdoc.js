await(async () => {
    const round = (number, precision) => {
        return Math.round(+number + 'e' + precision) / Math.pow(10, precision);
    }
    const gentablehtml = (info, draft) => {
        let docsize = round(info.size / 1024, 2)

        return `
        <tr>
                  <td>
                   ${info.path}
                  <\/td>
                  <td>
                    ${docsize}KB
                  <\/td>
                  <td>
                    ${(() => { if (!draft) { return '已发布' } else { return '未发布' } })()}
                  <\/td>
                  <td>
                    <a href="https://cdn.jsdelivr.net/gh/${config.hpp_githubdocusername}/${config.hpp_githubdocrepo}@${config.hpp_githubdocbranch}/${info.path}">CDN链接<\/a>
                  <\/td>
                  <td>
                    <a href="javascript:del(\`${info.path}\`);">删除<\/a>
                  <\/td>
                  <td>
                    <a href="${info.download_url}">原始地址<\/a>
                  <\/td>
                  <td>
                    <a href="${info.html_url}">Github地址<\/a>
                  <\/td>
                <\/tr>
        `
    }


    const ghdoclist = JSON.parse((await h_api_helper.github({ action: "getdoclist" })).content) || '[]'
    const ghdraftlist = JSON.parse((await h_api_helper.github({ action: "getdraftlist" })).content) || '[]'
    let cp = ""
    //document.getElementById("tbody_doc").innerHTML="";
    for (var n in ghdoclist) {
        cp += gentablehtml(ghdoclist[n], false)
    }
    for (var n in ghdraftlist) {
        cp += gentablehtml(ghdraftlist[n], true)
    }
    console.log(cp)



})()