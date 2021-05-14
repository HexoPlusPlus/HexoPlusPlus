import { genres } from './genres'
export async function htalk(config, request, loginstatus, hinfo) {
    try {
        const r = await request.json()
        let limit, start, htalk, p, hres, add, talk_init
        login = loginstatus || false
        if (login) {
            switch (r.action) {
                case 'initialization':
                    await HKV.put("htalk", "{}")
                    return genres(config, "初始化成功", 200, 0, '')
                case 'get':
                    htalk = await HKV.get("htalk", { type: "json" });
                    limit = r.limit
                    start = r.start || htalk.nid
                    hres = []
                    p = start
                    for (var i = 0; i < limit; i++) {
                        if (!!(htalk["data"][p])) {
                            hres.push(htalk["data"][p])
                            p--
                        } else {
                            i--
                            p--
                        }
                    }
                    return genres(config, `在${(function () { if (login) { return '已登录' } else { return '未登录' } })()}的状态下,已成功获得说说数据`, 200, 0, JSON.stringify(hres))
                case 'add':
                    htalk = await HKV.get("htalk", { type: "json" })
                    add = {
                        id: htalk["nid"] + 1,
                        time: r.time,
                        name: r.name || hinfo.username,
                        avatar: r.avatar,
                        content: r.content,
                        visible: true
                    }
                    htalk.data.push(add);
                    htalk.nid += 1

                    await HKV.put("htalk", JSON.stringify(htalk))
                    return genres(config, `已成功上传说说数据`, 200, 0, '')
                case 'del':
                    htalk = await HKV.get("htalk", { type: "json" })
                    delete htalk.data[r.id]
                    await HKV.put("htalk", JSON.stringify(htalk))
                    return genres(config, `已成功删除id为${r.id}的数据`, 200, 0, '')
                case 'visible':
                    htalk = await HKV.get("htalk", { type: "json" })
                    htalk.data[r.id].visible = htalk.data[r.id].visible ? false : true
                    await HKV.put("htalk", JSON.stringify(htalk))
                    return genres(config, `已改变id为${r.id}的数据的可见性`, 200, 0, '')


                case 'inputartitalk':


                    htalk = await HKV.get("htalk", { type: "json" })
                    for (var i = 0; i < r.ctx.length; i++) {
                        htalk.nid++;
                        talk_init = {
                            id: hpp_talk_id,
                            time: r.ctx[i].updatedAt.split('T')[0],
                            name: hinfo.username,
                            avatar: r.ctx[i].avatar,
                            content: r.ctx[i].atContentHtml,
                            visible: "True"
                        }
                        htalk.data[htalk.nid] = talk_init
                    }
                    await HKV.put("htalk", JSON.stringify(htalk))
                    return genres(config, `已导入${r.ctx.length}条!`, 200, 0, '')
                default:
                    return genres(config, `未知的操作`, 500, -1, '')
            }
        } else {
            switch (r.action) {
                case 'get':
                    htalk = await HKV.get("htalk", { type: "json" });
                    limit = r.limit
                    start = r.start || htalk.nid
                    hres = []
                    p = start
                    for (var i = 0; i < limit; i++) {
                        if ((function () { try { return htalk["data"][p]["visible"] } catch (m) { return false } }()) && !!(htalk["data"][p])) {
                            hres.push(htalk["data"][p])
                            p--
                        } else {
                            i--
                            p--
                        }
                    }
                    return genres(config, `在${(function () { if (login) { return '已登录' } else { return '未登录' } })()}的状态下,已成功获得说说数据`, 200, 0, JSON.stringify(hres))
                default:
                    return genres(config, `未知的操作`, 500, -1, '')
            }
        }
    }
    catch (lo2) { return genres(config, lo2, 500, -1, '') }
}