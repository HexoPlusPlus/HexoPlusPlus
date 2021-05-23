import { lang } from './../../i18n/language'
export async function genres(config, msg, status, code, content) {
    const m = msg ? `${lang.HTALK}:${msg}` : `${lang.HTALK}:${lang.UNKNOW_ERROR}`
    const c = (code || code == 0) ? code : -1

    const s = status ? status : 500
    const co = content ? content : ''
    const r = {
        msg: m,
        code: c,
        content: co
    }
    return new Response(JSON.stringify(r), {
        status: s, headers: {
            "content-type": "application/javascript; charset=utf-8",
            "Access-Control-Allow-Origin": config.cors
        }
    })

}