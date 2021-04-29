import { ghlist } from './getlist'
export async function ghsha(config) {
    const list = await ghlist(config)
    return list.filter(function (fp) {
        return fp.name == config.filename
    })[0]["sha"]
}