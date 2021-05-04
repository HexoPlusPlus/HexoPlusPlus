export async function getCookie(request, name) {
    let result = ""
    const cookieString = request.headers.get("Cookie")
    if (cookieString) {
        const cookies = cookieString.split(";")
        cookies.forEach(cookie => {
            const cookiePair = cookie.split("=", 2)
            const cookieName = cookiePair[0].trim()
            if (cookieName === name) {
                const cookieVal = cookiePair[1]
                result = cookieVal
            }
        })
    }
    return result
}

export function getJsonLength(jsonData) {

    var jsonLength = 0;

    for (var item in jsonData) {

        jsonLength++;

    }

    return jsonLength;
}

export function rp(path) {
    return path.split('?')[0]
}
export function getname(path) {
    const urllist = path.split('/')
    return urllist[getJsonLength(urllist) - 1]
}
export function getsuffix(path) {
    const suffixlist = getname(path).split('.')
    return suffixlist[getJsonLength(suffixlist) - 1]
}

export function genjsonres(msg, code, status, content) {
    m = msg ? msg : "未知的错误"
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
            "Access-Control-Allow-Origin": '*'
        }
    })
}

export function formatconfig(config) {
    config = config || defaultconfig
    for (var i in defaultconfig) {
        if (config[i] == undefined) {
            config[i] = defaultconfig[i]
        }
    }
    config.hpp_githubdocpath = config.hpp_githubdocroot + "source/_posts/"
    config.hpp_githubdocdraftpath = config.hpp_githubdocroot + "source/_drafts/"
    config.githubdocdraftpath = encodeURI(config.hpp_githubdocdraftpath)
    config.githubdocpath = encodeURI(config.hpp_githubdocpath)
    config.githubimagepath = encodeURI(config.hpp_githubimagepath)
    return config
}

const defaultconfig = {

}