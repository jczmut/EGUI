const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'react-calendar.bundle.js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
        }),
    ],
    module: {
        rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
        },
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, 'assets'),
        contentBasePublicPath: '/',
        port: 3000,
        proxy: {
            '/api': 'http://localhost:3000'
        },
        disableHostCheck: true
    }
};