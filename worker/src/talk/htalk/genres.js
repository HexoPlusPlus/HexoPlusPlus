export async function genres(config,msg,code,status,content){
    m = msg ? "HPPTALK组件:"+msg : "HPPTALK组件:未知的错误"
    c = code ? code : "-1"
    s = status ? status : 500
    co = content ? content : ''
    r = {
        msg: m,
        code: c,
        content: co
    }
    return new Response(JSON.stringify(r), {
        status: s, headers: {
            "content-type": "application/javascript; charset=utf-8",
            "Access-Control-Allow-Origin": config.hpp_cors
        }
    })

}