export async function genactiveres(config) {
    const t = await HKV.get("hpp_activetime") || -1
    var k = (Date.parse(new Date()) - (t)) / 1000
    return genactres(config, k)
}

function genactres(config, t) {
    return new Response(JSON.stringify({ time: t }), {
        headers: {
            "content-type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": config.hpp_cors
        }
    })
}