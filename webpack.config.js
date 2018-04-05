var webpack = require('webpack');
var {resolve} = require('path');
var path = require('path');
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
            underscore: 'lodash',
            vue$: resolve(node_dir,'vue/dist/vue.esm.js')
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
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    hotReload: true
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            /*{
                test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
                loader: 'url-loader?limit=100000'
            }*/
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader'
            }
        ]
    },
    plugins: [
        //new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jquery: "jquery"
        })
        /*new webpack.ProvidePlugin({
            _: 'lodash'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        })*/
    ],
    mode: 'development',
    devServer: {
        hot: true,
        inline: true,
        host: "localhost",
        port: 8082,
        watchOptions: {
            poll: true
        }
    }
};
