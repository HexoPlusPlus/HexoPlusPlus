/*1.x.x 迁移 2.x.x助手 */

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const config = JSON.parse(JSON.parse("hpp_config"))
  await HKV.put("hpp_config", hpp_config)
  const htalk = await HKV.get("hpp_talk_data", { type: "json" });
  const htalkid = await HKV.get("hpp_talk_id");
  /*脑残的双重JSON格式化*/
  const newhtalk = {
    nid: htalkid,
    data: (function () {
      let d = {}
      for (var l in htalk) {
        d[htalk[l]["id"]] = (function () {
          let n = htalk[l]
          delete n["id"]
          n["visible"] = n["visible"] == "False" ? false : true
          return n
        })()
      }
      return d
    })()
  }

  await HKV.put("htalk", JSON.stringify(newhtalk))
  await HKV.delete("hpp_talk_id")
  await HKV.delete("hpp_talk_data")


  /*使用全新的htalk存储格式*/

  const update_script = await (await fetch(`https://raw.githubusercontent.com/HexoPlusPlus/HexoPlusPlus/main/worker/dist/main.js`)).text()
  const up_init = {
    body: update_script,
    method: "PUT",
    headers: {
      "content-type": "application/javascript",
      "X-Auth-Key": config.hpp_CF_Auth_Key,
      "X-Auth-Email": config.hpp_Auth_Email
    }
  }
  const update_resul = await (await fetch(`https://api.cloudflare.com/client/v4/accounts/${config.hpp_account_identifier}/workers/scripts/${config.hpp_script_name}`, up_init)).text()
  return new Response(JSON.parse(update_resul)["success"])

}

function getJsonLength(jsonData) {

  var jsonLength = 0;

  for (var item in jsonData) {

    jsonLength++;

  }

  return jsonLength;
}