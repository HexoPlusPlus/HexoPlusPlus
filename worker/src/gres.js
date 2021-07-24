const gres = (c) => {

    switch (c.type) {
        case "json":
            return new Response(JSON.stringify({
                ctx: c.ctx,
                status: c.status === 0 ? 0 : c.status,
                msg: c.msg ? c.msg : "没有额外的消息",
                timestmp: (new Date()).valueOf()
            }), {
                status: c.status ? c.status : 200, headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
            })
        case "html":
            return new Response(c.ctx, {
                status: c.status ? c.status : 200, headers: {
                    "Content-Type": "text/html; charset=utf-8"
                },
            })
        default:
            return new Response(c.ctx)
    }
}

export default gres