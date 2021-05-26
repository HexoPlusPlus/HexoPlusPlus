
const config = {
    entry: {
        login: "./src/app/login.js"
    },
    output: {
        path: `${__dirname}/dist/`,
        filename: `[name].min.js`
    },
  
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader'
                    }
                ]
            }
        ]
    }
};

module.exports = config;