import { ghsha } from './getsha'
export async function ghupload(config) {
  const username = config.username
  const reponame = config.reponame
  const path = config.path
  const branch = config.branch || 'main'
  const token = config.token || ''
  const sha = config.sha || await ghsha(config)
  const message = config.message || 'Upload By HexoPlusPlus With Love'
  const base64file = config.file
  const method = 'PUT'
  const url = encodeURI(`https://api.github.com/repos/${username}/${reponame}/contents${path}?ref=${branch}`)
  let body = {
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
  const path = config.path
  const branch = config.branch || 'main'
  const token = config.token
  const sha = config.sha || await ghsha(config)
  const message = config.message || 'Delete By HexoPlusPlus With Love'
  const method = 'DELETE'
  const url = encodeURI(`https://api.github.com/repos/${username}/${reponame}/contents${path}?ref=${branch}`)
  const body = {
    branch: branch, message: message, sha: sha
  }
  console.log(body)
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
  const path = config.path
  const branch = config.branch || 'main'
  const token = config.token || ''
  const url = encodeURI(`https://raw.githubusercontent.com/${username}/${reponame}/${branch}${path}`)
  let init = { headers: { Accept: "application/vnd.github.v3.raw", Authorization: `token ${token}` } }
  if (token == '') {
    delete init.headers.Authorization
  }
  return fetch(url, init)
}


export async function ghstar(config) {
  const token = config.token || (() => { return false })()
  const url = `https://api.github.com/user/starred/HexoPlusPlus/HexoPlusPlus`
  let init = {
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "user-agent": 'HexoPlusPlus Github Filer',
      "Authorization": `token ${token}`
    },
    method: "PUT"
  }
  const res = await fetch(url, init)
  return res.status == 204 ? true : false
}

