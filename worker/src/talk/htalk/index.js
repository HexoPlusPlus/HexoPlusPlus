import { genres } from './genres'
export async function htalk(config, request, loginstatus) {
/*    try {
        const r = await request.json()
        login = loginstatus || false
        switch (r.action) {
            case 'initialization':
                await KVNAME.put("hpp_talk_data", "[]")
                await KVNAME.put("hpp_talk_id", "0")
                return genres(config, "初始化成功", 200, 0, '')
            case 'get':
                const limit = r["limit"]
                const start = r["start"]
                const hpp_talk = await KVNAME.get("hpp_talk_data", { type: "json" });
                let hpp_talk_res = []
                for (var i = getJsonLength(hpp_talk) - start - 1; i > getJsonLength(hpp_talk) - start - limit; i--) {
                    if (login || hpp_talk[i]["visible"]) {
                        hpp_talk_res.push(JSON.stringify(hpp_talk[i]))
                    } else {
                        limit++
                    }
                }
                return genres(config, `在${(function () { if (login) { return '已登录' } else { return '未登录' } })()}的状态下,已成功获得说说数据`, 200, 0, JSON.stringify(hpp_ralk_res))
            case 'addtalk':
                let hpp_talk = await KVNAME.get("hpp_talk_data",{ type: "json" })
                let hpp_talk_id_re = await KVNAME.get("hpp_talk_id")
                let hpp_talk_id = hpp_talk_id_re;
                hpp_talk_id++;
                const now = await request.json()
                const add = {
                    id: hpp_talk_id,
                    time: now["time"],
                    name: now["name"],
                    avatar: now["avatar"],
                    content: now["content"],
                    visible: "True"
                }
                hpp_talk.push(add);
                await KVNAME.put("hpp_talk_data", JSON.stringify(hpp_talk))
                await KVNAME.put("hpp_talk_id", hpp_talk_id)
                return new Response('OK')
        }
    }
    catch (lo2) { return genres(config, lo2, 500, -1, '') }*/
}