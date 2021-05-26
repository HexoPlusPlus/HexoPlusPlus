const config = {
    entry: './worker/index.js',
    output: {
        path: `${__dirname}/dist/`,
        filename: "index.worker.js"
    },
    optimization: {
        minimize: false
        //开发模式为false不混淆
    }
};

module.exports = config;