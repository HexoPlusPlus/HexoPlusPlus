addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
	const config = JSON.parse(JSON.parse(hpp_config))
	          const hpp_account_identifier = config["hpp_account_identifier"]
          const hpp_script_name = config["hpp_script_name"]
          const hpp_CF_Auth_Key = config["hpp_CF_Auth_Key"]
          const hpp_Auth_Email = config["hpp_Auth_Email"]
		  const update_script = await (await fetch(`https://raw.githubusercontent.com/HexoPlusPlus/HexoPlusPlus/main/worker/dist/main.js`)).text()
            const up_init = {
              body: update_script,
              method: "PUT",
              headers: {
                "content-type": "application/javascript",
                "X-Auth-Key": hpp_CF_Auth_Key,
                "X-Auth-Email": hpp_Auth_Email
              }
            }
            const update_resul = await (await fetch(`https://api.cloudflare.com/client/v4/accounts/${hpp_account_identifier}/workers/scripts/${hpp_script_name}`, up_init)).text()
            return new Response(JSON.parse(update_resul)["success"])
	
}