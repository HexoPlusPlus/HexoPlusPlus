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
const method = config.method || 'PUT'
const url = `https://api.github.com/repos/${username}/${reponame}/contents${path}${filename}?ref=${branch}`      
const body = {
    branch: branch, message: message, content: base64file, sha: sha
}

const init = {
    body: JSON.stringify(body),
    method: method,
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "user-agent": 'HexoPlusPlus Github Filer',
      "Authorization": "token " + token
    }
}
return fetch(url, init)
}
