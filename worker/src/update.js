import { genjsonres } from './scaffold'
export const hppupdate = async (config, newest) => {
  let ver = 'dist'
  if (!newest) {
    ver = await ghlatver({
      username: "HexoPlusPlus",
      reponame: "HexoPlusPlus",
      token: config.hpp_githubdoctoken || config.hpp_githubimagetoken || ''
    })
  }
  const url = `https://raw.githubusercontent.com/HexoPlusPlus/HexoPlusPlus/${ver}/index.worker.js`


  const script = await (await fetch(url)).text()
  const up_init = {
    body: script,
    method: "PUT",
    headers: {
      "content-type": "application/javascript",
      "X-Auth-Key": config.hpp_CF_Auth_Key,
      "X-Auth-Email": config.hpp_Auth_Email
    }
  }
  const update_resul = await (await fetch(`https://api.cloudflare.com/client/v4/accounts/${config.hpp_account_identifier}/workers/scripts/${config.hpp_script_name}`, up_init)).json()
  if (update_resul["success"]) {
    return genjsonres(lang.UPDATE_SUCCESS, 0, 200)
  } else {
    return genjsonres(lang.UPDATE_ERROR, -1, 500)
  }


}
async function getlatinfo(config) {
  const token = config.hpp_githubdoctoken || config.hpp_githubimagetoken || ''
  const url = `https://api.github.com/repos/HexoPlusPlus/HexoPlusPlus/releases/latest`
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
