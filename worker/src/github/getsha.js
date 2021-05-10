import { ghtreelist } from './getlist'
export async function ghsha(config) {
    const list = await ghtreelist(config)
    try {
        return list.filter(function (fp) {
            return `/${fp.path}` == `${config.path}${config.filename}`
        })[0]["sha"]
    }
    catch (e) {
        return ''
    }
}