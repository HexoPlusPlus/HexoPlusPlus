import { ghsha } from './getsha'
export async function ghupload(config) {
  const username = config.username
  const reponame = config.reponame
  const path = config.path || '/'
  const filename = config.filename
  const branch = config.branch || 'main'
  const token = config.token || ''
  const sha = config.sha || ghsha(config)
  const message = config.message || 'Upload By HexoPlusPlus With Love'
  const base64file = config.file
  const method = 'PUT'
  const url = `https://api.github.com/repos/${username}/${reponame}/contents${path}${filename}?ref=${branch}`
  const body = {
    branch: branch, message: message, content: base64file, sha: sha
  }

  let init = {
    body: JSON.stringify(body),
    method: method,
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "user-agent": 'HexoPlusPlus Github Filer',
      "Authorization": "token " + token
    }
  }

  if (token == '') {
    delete init.headers.Authorization
  }
  return fetch(url, init)
}


export async function ghdel(config) {
  const username = config.username
  const reponame = config.reponame
  const path = config.path || '/'
  const filename = config.filename
  const branch = config.branch || 'main'
  const token = config.token || ''
  const sha = config.sha || ghsha(config)
  const message = config.message || 'Delete By HexoPlusPlus With Love'
  const method = 'DELETE'
  const url = `https://api.github.com/repos/${username}/${reponame}/contents${path}${filename}?ref=${branch}`
  const body = {
    branch: branch, message: message, sha: sha
  }

  let init = {
    body: JSON.stringify(body),
    method: method,
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "user-agent": 'HexoPlusPlus Github Filer',
      "Authorization": "token " + token
    }
  }
  if (token == '') {
    delete init.headers.Authorization
  }
  return fetch(url, init)
}


export async function ghget(config) {
  const username = config.username
  const reponame = config.reponame
  const path = config.path || '/'
  const filename = config.filename
  const branch = config.branch || 'main'
  const token = config.token || ''
  const url = `https://raw.githubusercontent.com/${username}/${reponame}/${branch}${path}${filename}`
  let init = { headers: { Accept: "application/vnd.github.v3.raw", Authorization: `token ${token}` } }
  if (token == '') {
    delete init.headers.Authorization
  }
  return fetch(url, init)
}

async function getlatinfo(config) {
  const username = config.username
  const reponame = config.reponame
  const token = config.token
  const url = `https://api.github.com/repos/${username}/${reponame}/releases/latest`
  let init = {
    method: 'GET',
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "user-agent": 'HexoPlusPlus Github Filer',
      "Authorization": "token " + token
    }
  }
  if (token == '') {
    delete init.headers.Authorization
  }
  return (await (await fetch(url, init)).json())
}


export async function ghlatver(config) {
  return (await getlatinfo(config))["tag_name"]
}

export async function ghlatinfo(config) {
  return (await getlatinfo(config))["body"]
}
