export const formatconfig = async () => {
    const config = await HKV.get("hconfig", { type: "json" })
    if (config === null) { return defaultconfig }
    config.hexo.gh_docpath = config.hexo.gh_root + "source/_posts/"
    config.hexo.gh_draftpath = config.hexo.gh_root + "source/_drafts/"
    return config
}

const defaultconfig = {
    installed: true,
    cors: "*",
    recaptcha:"",
    dash: {
        image: "https://cdn.jsdelivr.net/gh/ChenYFan/CDN@master/img/hpp_upload/1612610340000.jpg",
        icon: "https://cdn.jsdelivr.net/gh/HexoPlusPlus/CDN@master/doc_img/icon.png",
        title: "HexoPlusPlus小飞机✈",
        dark: true,
        bgcolor: "default",//black | white | default
        color: "danger",//purple | azure | green | orange | danger | rose
        usericon: "",
        OwO: "https://cdn.jsdelivr.net/gh/2X-ercha/Twikoo-Magic@master/hppowo.json",
        back: "https://cdn.jsdelivr.net/gh/ChenYFan-Tester/DailyGet@gh-pages/bingpic/bing.jpg",
        lazyimg: "https://cdn.jsdelivr.net/gh/ChenYFan/blog@master/themes/fluid/source/img/loading.gif",
        hljsstyle: "github"
    },
    hexo: {
        switch: true,
        type: "gh",
        gh_username: "",
        gh_reponame: "",
        gh_branch: "",
        gh_token: "",
        gh_root: "/",
        gh_dispatch_token: ""
    },

    img: {
        switch: true,
        type: "gh", //custom
        gh_username: "",
        gh_reponame: "",
        gh_branch: "",
        gh_token: "",
        gh_root: "/",


        c_url: "",
        c_post_name: "file",
        c_headers: {

        },
        c_body: {

        }

    },
    cloudflare: {
        account_identifier: "",
        Auth_Key: "",
        Auth_Email: "",
        script_name: ""
    },
    talk: {
        switch: {
            htalk: true,
            artitalk: {
                agent: false,
                feign: false
            }
        },
        artitalk_agent_config: {
            APPID: "",
            APPKEY: ""
        }

    }
}