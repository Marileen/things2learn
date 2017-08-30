var path = require("path");
var webpack = require("webpack");
var nodeModulesPath = path.join(__dirname, "node_modules");
var autoprefixer = require("autoprefixer");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devServer: {
        contentBase: "./",
        port: 8080,
        host: "0.0.0.0"
    },
    entry: [
            "./src/login",
            "./styles/main",
            "webpack/hot/only-dev-server"
    ],
    output: {
        path: "./www",
        publicPath: "/",
        filename: "scripts/main.js"
    },
    resolve: {
        extensions: [
            '', ".js", ".ts", ".tsx", ".scss", ".less"
        ]
    },
    devtool: "source-map",
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loaders: ["react-hot", "ts-loader"]
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!sass-loader")
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!less-loader")
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                loader: "file-loader?name=styles/images/[name].[ext]"
            },
            {
                test: /\.html$/,
                loader: "file-loader?name=[name].[ext]"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles/[name].css")
    ],
    postcss: [
        autoprefixer({
            browsers: ['last 2 versions']
        })
    ],
    debug: true
};
