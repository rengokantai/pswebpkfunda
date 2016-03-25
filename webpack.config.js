/**
 * Created by Hernan Y.Ke on 2016/3/24.
 */

var path = require('path');
var webpack = require('webpack');

var common = new webpack.optimize.CommonsChunkPlugin('shared.js');
module.exports ={

    context:path.resolve('js'),
    entry:["./sub", "./app.js"],
    output:{
        path:path.resolve('build/js/'),
        publicPath:'/public/assets/js/',
        filename:"bundle.js"
    },
    devServer:{
        contentBase:'public'
    },
    module:{
        loaders:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    resolve:{
        extensions:['','.js']
    }
}