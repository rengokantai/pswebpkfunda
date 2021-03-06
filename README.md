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
######4 add sourcemap to debug (need to add a debugger;)
```
webpack -d (-p)
webpack-dev-server -d
```
######5

load respectively
```
var path = require('path');
var webpack = require('webpack');

var common = new webpack.optimize.CommonsChunkPlugin('shared.js');
module.exports ={

    context:path.resolve('js'),
    entry:{
        a:'./a.js',
        b:'./b.js'
    },
    output:{
        path:path.resolve('build/js/'),
        publicPath:'/public/assets/js/',
        filename:"[name].js"
    },
    plugins:[common],
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
#####4
######2 css loaders
```
npm install css-loader style-loader --save-dev
```
build file struct:
```
css/app.css
```
app.js:
```
import {x} from './sub';
x();
document.write('hernan.');
console.log(`write`);
require('../css/app.css');
```

file:
```js
/**
 * Created by Hernan Y.Ke on 2016/3/24.
 */

var path = require('path');
var webpack = require('webpack');

var common = new webpack.optimize.CommonsChunkPlugin('shared.js');
module.exports ={

    context:path.resolve('js'),
    entry:["./app.js"],
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
            },{
                test:/\.css$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader',//css loader first
            }
        ]
    },
    resolve:{
        extensions:['','.js']
    }
}
```
######3 css-loader will load css in HTML page.
######4 scss (MUST install node-sass)
```
npm install sass-loader node-sass --save-dev
```
file:
```
var path = require('path');
var webpack = require('webpack');

var common = new webpack.optimize.CommonsChunkPlugin('shared.js');
module.exports ={

    context:path.resolve('js'),
    entry:["./app.js"],
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
            },{
                test:/\.css$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader'//css loader first
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
```
######6 make saperate css file. Must install extract-text-webpack-plugin
```
npm install extract-text-webpack-plugin --save-dev
```
file:
```
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
                //loader: 'style-loader!css-loader'//css loader first
                loader: Extract.extract("style-loader","css-loader")
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
```
######7 autoprefixer
```
npm install file-loader autoprefixer-loader --save-dev
```
files;
```
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
```
#####5
######2 add image
file
```
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
                test:/\.(jpg|png)$/,
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
```
######3 font
almost same as above, also use url-loader

file
```
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
```
#####6
######2
```
npm install express morgan ejs --save
npm install webpack-dev-middleware node-libs-browser --save-dev
```








######4 custom loader
```
npm install json-loader strip-json-comments --save-dev
```
file:
```
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
        path:path.resolve('build/js/'),
        publicPath:'/public/assets/js/',
        filename:"bundle.js"
    },noParse: [
        path.resolve('./node_modules/jquery')],
    plugins:[
        new Extract("style.css"),
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "window.jQuery":"jquery"
        })
    ],
    devServer:{
        contentBase:'public'
    },
    module:{
        loaders:[{test: require.resolve('jquery'), loader: 'expose?jQuery'},
            {
                test:/\.json$/,
                exclude: /node_modules/,
                loader: 'json-loader!' + path.resolve('loaders/strip')
            },
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
```




######5 using plugin
```
npm install timestamp-webpack-plugin --save-dev
```
but not working, need to install expose-loader
```
npm install expose-loader --save-dev
```
failed.

