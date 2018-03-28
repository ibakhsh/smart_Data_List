module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            vuejs: 'node_modules/vue/dist/vue.min.js',
            jquery: 'node_modules/jquery/dist/jquery.min.js'
        }
    },
    module: {
        rules: [
            {
                test: require.resolve("jqeury"),
                use: "imports-loader?this=>window"
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    mode: 'development'
};
