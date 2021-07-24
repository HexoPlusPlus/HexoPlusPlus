const recaptcha = async (secret, code, action) => {
    const n = await (await fetch(`https://www.recaptcha.net/recaptcha/api/siteverify?secret=${secret}&response=${code}`)).json()
    if (n.success && n.score >= 0.7 && n.action == action) {
        return true
    } else {
        return false
    }
}
export default recaptcha