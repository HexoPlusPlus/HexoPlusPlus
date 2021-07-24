import zh_CN from './zh_CN.json'
import en_US from './en_US.json'
const all_lan = {
    zh_CN: zh_CN,
    en_US: en_US
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

const lang = all_lan[langtype]

export default  lang 