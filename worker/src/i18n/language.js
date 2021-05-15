import zh_CN from './zh_CN.json'
const all_lan = {
    zh_CN: zh_CN
}
const langtype = (() => {
    try {
        let lan = hpp_language
        if (!all_lan[lan]) {
            return 'zh_CN'
        }
        return lan
    } catch (n) {
        return 'zh_CN'
    }
})()

export const lang = all_lan[langtype]