import { ghlatver } from './github/mananger'
import { genjsonres } from './scaffold'
export function hppupdate(config, newest) {
    let ver = 'dist'
    if (!newest) {
        ver = await ghlatver({
            username: "HexoPlusPlus",
            reponame: "HexoPlusPlus",
            token: config.hpp_githubdoctoken || config.hpp_githubimagetoken || ''
        })
    }
    const url = `https://raw.githubusercontent.com/HexoPlusPlus/HexoPlusPlus/${ver}/index.worker.js`


    const script = await(await fetch(url)).text()
    const up_init = {
        body: script,
        method: "PUT",
        headers: {
            "content-type": "application/javascript",
            "X-Auth-Key": config.hpp_CF_Auth_Key,
            "X-Auth-Email": config.hpp_Auth_Email
        }
    }
    const update_resul = await(await fetch(`https://api.cloudflare.com/client/v4/accounts/${config.hpp_account_identifier}/workers/scripts/${config.hpp_script_name}`, up_init)).json()
    if (update_resul["success"]) {
        return genjsonres('更新是成功的!', 0, 200)
    } else {
        return genjsonres('更新是失败的!', -1, 500)
    }


}
