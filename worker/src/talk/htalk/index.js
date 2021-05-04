import { genres } from '/genres'
export async function hpptalk(config, request) {
    try {
        login = config.loginstatus
        switch (config.action) {
            case 'get':
                const r = await request.json()
                const limit = r["limit"]
                const start = r["start"]
                const hpp_talk = await KVNAME.get("hpp_talk_data", { type: "json" });
                let hpp_talk_res = []
                for (var i = getJsonLength(hpp_talk) - start - 1; i > getJsonLength(hpp_talk) - start - limit; i--) {
                    if (login || hpp_talk[i]["visible"]){
                        hpp_talk_res.push(await JSON.stringify(hpp_talk[i]))
                    }else{
                        limit++
                    }
                }
                return  genres(config, `在${(function(){if(login){return '已登录'}else{return '未登录'}})()}的状态下,已成功获得说说数据`, 200, 0, JSON.stringify(hpp_ralk_res))
        }
    } catch (lo2) { return genres(config, lo2, 500, -1, '') }
}