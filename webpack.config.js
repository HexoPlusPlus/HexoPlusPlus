const config = {
    entry: './worker/index.js',
    output: {
        path: `${__dirname}/dist/`,
        filename: "index.worker.js"
    },
    optimization: {
        minimize: false
    }
};

module.exports = config;