/**
 * Created by Hernan Y.Ke on 2016/3/24.
 */

var path = require('path');
var webpack = require('webpack');
var Extract = require('extract-text-webpack-plugin');
var common = new webpack.optimize.CommonsChunkPlugin('shared.js');


module.exports ={

    context:path.resolve('js'),
    entry:["./app.js"],
    output:{
        path:path.resolve('build/'),
        publicPath:'/public/assets/',
        filename:"bundle.js"
    },
    plugins:[
        new Extract("style.css")
    ],
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
            },{
                test:/\.css$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader!autoprefixer-loader'//css loader first
                //loader: Extract.extract("style-loader","css-loader")
            },{
                test:/\.(jpg|png|ttf|woff)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=100000'//? means pass params. image < 100K will be transcode to base64, >100K will be seperate request.
                //loader: Extract.extract("style-loader","css-loader")
            },{
                test:/\.scss$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader!sass-loader'//css loader first
            }
        ]
    },
    resolve:{
        extensions:['','.js']
    }
}