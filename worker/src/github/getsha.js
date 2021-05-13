import { ghlist } from './getlist'
export async function ghsha(config) {
    const list = await ghlist(config)
    try {
        return list.filter(function (fp) {
            return `/${fp.path}` == `${config.path}`
        })[0]["sha"]
    }
    catch (e) {
        return ''
    }
}