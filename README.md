####pswebpkfunda

#####2
######3 basic
```
module.exports ={
    entry:"./app.js",
    output:{
        filename:"bundle.js"
    }
}
```
######4 watch
- manually
```
webpack --watch
```
- config
```
module.exports ={
    entry:"./app.js",
    output:{
        filename:"bundle.js"
    },
    watch: true
}
```
install devserver
```
npm install -g webpack-dev-server
```
run server
```
webpack-dev-server
```
run server concisely
```
webpack-dev-server
```
######6,7 loader, preloader
```
module.exports ={
    entry:["./sub", "./app.js"],
    output:{
        filename:"bundle.js"
    },
    module:{
        preloaders:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'jshint-loader'
            }
        ],
        loaders:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve:{
        extensions:['','.js']
    }
}
```
######2-9
minimize js
```
webpack -p
```
install strip-loader, purge unnecessary func
```
webpack --config webpack-production.config.js -p
```

 webpack-production.config.js
```
var dev = require('./webpack.config.js');
var strip = require('strip-loader');

var stripLoader = {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: strip.loader('console.log','funcname')
}

dev.module.loaders.push(stripLoader);


module.exports = dev;
```
#####3
######2 reorg folders
```js
var path = require('path');
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
                loader: 'babel-loader'
            }
        ]
    },
    resolve:{
        extensions:['','.js']
    }
}
```

in index.html:
```
<script src="public/assets/js/bundle.js"></script>
```
######3
note: by default,babel-loader only support es6 files, to support js extension, must install babel-preset-es2015  
[see this](http://stackoverflow.com/questions/33469929/you-may-need-an-appropriate-loader-to-handle-this-file-type-with-webpack-and-b)
file:
```js
/**
 * Created by Hernan Y.Ke on 2016/3/24.
 */

var path = require('path');
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
```
