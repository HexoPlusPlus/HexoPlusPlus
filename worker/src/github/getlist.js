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


export async function ghtreelist(config) {
  const username = config.username
  const reponame = config.reponame
  const path = config.path.substr(0, (config.path).length - 1) || '/'
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
  return fetch_bfs([], url, init)
}



async function fetch_bfs(arr, url, getinit) {
  try {
    const hpp_getlist = await JSON.parse(await (await fetch(url, getinit)).text())
    for (var i = 0; i < getJsonLength(hpp_getlist); i++) {
      if (hpp_getlist[i]["type"] != "dir") {
        arr.push(hpp_getlist[i])
      } else {
        await fetch_bfs(arr, hpp_getlist[i]["_links"]["self"], getinit)
      }
    }
    return arr;
  } catch (lo1) { return {} }
}