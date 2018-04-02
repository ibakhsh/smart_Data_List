var webpack = require('webpack');
const {resolve} = require('path');
const path = require('path');
var node_dir = __dirname + '/node_modules';

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js', 
        path: resolve(__dirname,'dist')
    },
    resolve: {
        alias: {
            jquery: resolve(node_dir, 'jquery/dist/jquery.min.js'),
            underscore: 'lodash'
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    query: { presets: ['es2015'] } 
                },
                exclude: resolve(__dirname,'node_modules'),
                /*include: [
                    resolve(node_dir, 'jquery/dist/jquery.min.js'),
                    resolve(node_dir, 'lodash/index.js'),
                ]*/
                
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        /*new webpack.ProvidePlugin({
            _: 'lodash'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        })*/
    ],
    mode: 'development'
};
