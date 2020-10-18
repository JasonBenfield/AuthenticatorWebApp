const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const entry = {
    user: './Scripts/Authenticator/User/UserPage.ts',
    login: './Scripts/Authenticator/Auth/LoginPage.ts'
};
const exportModule = {
    rules: [
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader',
            ]
        },
        {
            test: /\.html$/i,
            use: [{
                loader: 'html-loader',
                options: {
                    minimize: {
                        removeComments: false
                    }
                }
            }]
        }
    ]
};
const outputFilename = '[name].js';
const resolve = {
    alias: {
        xtistart: path.resolve(__dirname, 'Scripts/Authenticator/Startup.js')
    }
};
const plugins = [
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
    })
];
module.exports = [
    {
        mode: 'production',
        entry: entry,
        module: exportModule,
        plugins: plugins,
        output: {
            filename: outputFilename,
            path: path.resolve(__dirname, 'wwwroot', 'js', 'dist')
        },
        resolve: resolve
    },
    {
        mode: 'development',
        entry: entry,
        module: exportModule,
        plugins: plugins,
        output: {
            filename: outputFilename,
            path: path.resolve(__dirname, 'wwwroot', 'js', 'dev')
        },
        resolve: resolve
    }
];