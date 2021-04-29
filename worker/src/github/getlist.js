export async function ghlist(config) {
    const username = config.username
    const reponame = config.reponame
    const path = config.path || '/'
    const branch = config.branch || 'main'
    const token = config.token || ''
    const url = `https://api.github.com/repos/${username}/${reponame}/contents${path}?ref=${branch}` 
    const init = {
        method: 'GET',
        headers: {
          "content-type": "application/json;charset=UTF-8",
          "user-agent": 'HexoPlusPlus Github Filer',
          "Authorization": "token " + token
        }
    }
    if(token == ''){delete init.headers.Authorization}
    return await(await fetch(url,init)).json() 
}