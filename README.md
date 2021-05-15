# HexoPlusPlus
## A powerful Hexo dashboard

HexoPlusPlus~~也叫Hexo艹~~，是一个基于CloudFlareWorkers和CloudFlareKV技术的Hexo后端程序，目的是解决Hexo无后端带来的种种麻烦，支持但不限于Hexo等静态博客；利用CloudFlareWorkers当中间件，有效避免直接上传到Github易失败问题。

**注意，HexoPlusPlus在使用前您的博客必须保证已完成集成部署**

## 特色

- [x] 免费
- [x] 易上手
- [x] 图形化安装，KV数据库
- [x] 高度自适应编辑器,手机端流畅写作,支持代码高亮,支持草稿写作,支持随时备份,允许上传文件,高度适配自带图床
- [x] 登录验证码
- [x] 全主题适配
- [x] Material Dashboard，细腻书写新体验
- [x] 快,服务端处理不超过10ms[主要是CloudFlare的限制，很多高负荷运算只能拉到前端处理]


## 功能
- [x] 文章在线编辑
- [x] Github图床支持
- [x] 文件管理
- [x] 活跃时间统计
- [x] 说说功能
- [x] Twikoo加强
- [ ] Imgur图床+镜像支持
- [ ] 7bu图床支持
- [ ] i8n国际化

![](https://cdn.jsdelivr.net/gh/HexoPlusPlus/CDN@master/doc_img/b_1.png)

完整文档请前往[https://hexoplusplus.js.org/](https://hexoplusplus.js.org/)

# 依赖

HexoPlusPlus的诞生离不开以下项目的支持：

- jquery
- bootstrap
- [material-dashboard](https://github.com/creativetimofficial/material-dashboard)
- marked.js
- sweetalert
- notyf


> 由于仍处于快速迭代期,HPP尚未使用NPM发包,请使用Jsdelivr+Github访问静态资源

![](https://starchart.cc/HexoPlusPlus/HexoPlusPlus.svg)


# 贡献

## 赞助

HPP项目暂时没有开通赞助项目

## 翻译

在`/worker/src/i18n/`下存在`zh_CN.json`,请根据此格式和内容进行翻译

## For Developers

HPP项目较其他项目有些特殊，项目分为前端和后端部分

### 前端

文件均存储与`/src/`以下

```sh
npm run build-static //构建前端静态文件
npm run server //运行基于http-server的https本地服务器
npm run server-nossl //运行基于http-server的http本地服务器
npm run build-static-server //构建并打开服务器
```

### 后端[WorkerJS]

文件均存储与`/worker/`以下

```sh
npm run build-worker //构建workerjs
npm run build-worker-dev //构建workerjs并监控
```

# 贡献名单

| <img src="https://avatars.githubusercontent.com/u/53730587?s=460&u=0c56dc9cd4eef4a3afc3f911915f234742baebf7&v=4" width="60px"></br> ChenYFan | <img src="https://avatars.githubusercontent.com/u/72645310?s=460&u=c95ac0a574648a9389a60ce2ff341a8004f49f20&v=4" width="60px"></br> noionion | <img src="https://avatars.githubusercontent.com/u/64446074?v=4&s=460" width="60px"></br> Hajeeknspo |
| :---: | :---: | :---: |
| ![](https://shields.io/badge/Coding-green?logo=visual-studio-code&style=for-the-badge)<br>![](https://shields.io/badge/BugTester-yellow?logo=open-bug-bounty&style=for-the-badge) | ![](https://shields.io/badge/BugTester-yellow?logo=open-bug-bounty&style=for-the-badge)<br>![](https://shields.io/badge/CSSCoder-orange?logo=css3&style=for-the-badge) | ![](https://shields.io/badge/Translater-white?logo=google-translate&style=for-the-badge) |


# 许可

使用严格的GPL开源许可，所有根据HexoPlusPlus改版的程序若公布，则必须使用GPL协议并开源。