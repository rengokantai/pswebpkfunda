/**
 * Created by Hernan Y.Ke on 2016/3/24.
 */
module.exports ={
    entry:"./app.js",
    output:{
        filename:"bundle.js"
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