const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//css分离打包
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");//js压缩
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //css压缩
const htmlArr =require("./webpackConfig/htmlConfig");// html配置
const getEntry = require("./webpackConfig/getEntry");
let entry = getEntry("./src");
const CleanWebpackPlugin = require('clean-webpack-plugin');

//主配置
module.exports = (env, argv) => ({
	entry: entry,
	output: {
		path: path.join(__dirname, "dist"),
		filename: "[name].[chunkhash].js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader:"babel-loader",
					options:{
						presets: ["@babel/preset-env", "@babel/preset-react"]
					}
				},
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(scss|css)$/, //css打包 路径在plugins里
				use: [
					argv.mode == "development" ? { loader: "style-loader"} :MiniCssExtractPlugin.loader,
					{ loader: "css-loader", options: {modules: true,importLoaders: 1,localIdentName: '[local]___[hash:base64:5]'} },
					{ loader: "sass-loader", options: { sourceMap: true } }
				]
			},
			{
				test: /\.(png|jpg)$/,
				use:[
					{
						loader: "url-loader",
						options: {
							name: "./images/[name].[ext]",
							limit: 8192
						}
					}
				]
			},
			// {
			// 	test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
			// 	use:[
			// 		{
			// 			loader: "file-loader",
			// 			options: {
			// 				name: "[name].[ext]?[hash]",
			// 				outputPath: "./images/"
			// 			}
			// 		}
			// 	]
			// },
		],
	},
	devServer: {
		port: 3100,
		open: true,
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		...htmlArr, // html插件数组
		new MiniCssExtractPlugin({ //分离css插件
			filename: "[name].[chunkhash:8].css",
			chunkFilename: "[id].css"
		})
	],
	optimization: {
		minimizer: [//压缩js
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: false
			}),
			new OptimizeCSSAssetsPlugin({})
		],
		splitChunks: { //压缩css
			cacheGroups: {
				styles: {
					name: "styles",
					test: /\.css$/,
					chunks: "all",
					enforce: true
				}
			}
		}
	}
});
