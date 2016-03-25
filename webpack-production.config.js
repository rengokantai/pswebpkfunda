/**
 * Created by Hernan Y.Ke on 2016/3/24.
 */
var dev = require('./webpack.config.js');
var strip = require('strip-loader');

var stripLoader = {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: strip.loader('console.log','funcname')
}

dev.module.loaders.push(stripLoader);


module.exports = dev;
