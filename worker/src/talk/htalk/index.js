import { lang } from './../../i18n/language'
import { genres } from './genres'
export async function htalk(config, request, loginstatus, hinfo) {
    try {
        const r = await request.json()
        let limit, start, htalk, p, hres, add, talk_init

        const login = loginstatus || false
        if (login) {
            switch (r.action) {
                case 'initialization':
                    await HKV.put("htalk", "{}")
                    return genres(config, `${lang.HTALK}:${lang.HTALK_INIT_SUCCESS}`, 200, 0, '')
                case 'get':
                    htalk = await HKV.get("htalk", { type: "json" });
                    limit = r.limit
                    start = r.start || htalk.nid
                    hres = {
                        nid: 0,
                        ctx: []
                    }
                    p = start
                    for (var i = 0; i < limit; i++) {
                        if (!!(htalk["data"][p])) {
                            hres.ctx.push(htalk["data"][p])
                            p--

                            i++
                            hres.nid = p
                            if (p <= 0) { break; }
                        } else {

                            p--
                        }
                    }
                    return genres(config, lang.HTALK_GET_SUCCESS.replace("${1}", lang.LOGIN_TRUE), 200, 0, JSON.stringify(hres))

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
                    return genres(config, lang.HTALK_UPLOAD_SUCCESS, 200, 0, '')
                case 'del':
                    htalk = await HKV.get("htalk", { type: "json" })
                    delete htalk.data[r.id]
                    await HKV.put("htalk", JSON.stringify(htalk))
                    return genres(config, lang.HTALK_DEL_SUCCESS.replace("${1}", r.id), 200, 0, '')
                case 'visible':
                    htalk = await HKV.get("htalk", { type: "json" })
                    htalk.data[r.id].visible = htalk.data[r.id].visible ? false : true
                    await HKV.put("htalk", JSON.stringify(htalk))
                    return genres(config, lang.HTALK_VISIBLE_SUCCESS.replace("${1}", r.id), 200, 0, '')


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
                    return genres(config, lang.HTALK_INPUT_SUCCESS.replace("${1}", r.ctx.length), 200, 0, '')
                default:
                    return genres(config, lang.UNKNOW_ACTION, 500, -1, '')
            }
        } else {
            switch (r.action) {
                case 'get':
                    htalk = await HKV.get("htalk", { type: "json" });
                    limit = r.limit
                    start = r.start || htalk.nid
                    hres = {
                        ver: hinfo.ver,
                        nid: 0,
                        ctx: []
                    }
                    p = start
                    for (var i = 0; i < limit;) {
                        if ((function () { try { return htalk["data"][p]["visible"] } catch (m) { return false } }()) && !!(htalk["data"][p])) {
                            hres.ctx.push((() => {
                                let u = htalk["data"][p]
                                u.id = p
                                return u
                            })())
                            p--

                            i++
                            hres.nid = p
                            if (p <= 0) { break; }
                        } else {
                            p--
                        }
                    }
                    return genres(config, lang.HTALK_GET_SUCCESS.replace("${1}", lang.LOGIN_FALSE), 200, 0, JSON.stringify(hres))
                case 'love':
                    htalk = await HKV.get("htalk", { type: "json" });
                    htalk.data[r.id].love = (()=>{
                        if(!htalk.data[r.id].love){
                            return 1
                        }else{
                            return htalk.data[r.id].love+1
                        }
                    })()
                    await HKV.put("htalk", JSON.stringify(htalk))
                    return genres(config, 'YES', 200, 0, htalk.data[r.id].love)
                
                default:
                    return genres(config, lang.UNKNOW_ACTION, 500, -1, '')
            }
        }
    }
    catch (lo2) { return genres(config, lo2, 500, -1, '') }
}