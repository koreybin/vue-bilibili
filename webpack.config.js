const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: path.join(__dirname,'./src/main.js'),
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'bundle.js'
    },
    plugins:[
        new htmlWebpackPlugin({
            template:path.joiin(__dirname,'./src/index.html'),
            filename:'index.html'
        })
    ],
    module:{
        rules:[
            {test:/\.css$/,use:['style-loader','css-loader']},
            {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            {test:/\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader'}
       ]
    }
    
}
