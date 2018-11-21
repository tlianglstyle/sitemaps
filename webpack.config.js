const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//css分离打包
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");//js压缩
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //css压缩
const htmlArr =require("./webpackConfig/htmlConfig");// html配置
const staticArr =require("./webpackConfig/staticConfig");// static拷贝
const getEntry = require("./webpackConfig/getEntry");
let entry = getEntry("./src/page");
const CleanWebpackPlugin = require('clean-webpack-plugin');
var autoprefixer = require('autoprefixer')

console.log(process.env.NODE_ENV)

//主配置
module.exports = (env, argv) => ({
	entry: entry,
	output: {
		path: path.join(__dirname, "dist"),
		filename: process.env.NODE_ENV == "dev" ? "[name].js" : "[name].[chunkhash].js",
		//publicPath: '/src'
	},
		resolve: {
			extensions: ['.js','.scss','.less','.css'],
			//fallback: [path.join(__dirname, '../node_modules')],
			alias: {
			'@src': path.resolve(__dirname, './src'),
			'@utils': path.resolve(__dirname, './src/utils'),
			'@assets': path.resolve(__dirname, './src/assets/')
			}
		},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader:"babel-loader",
					options:{
						presets: ["@babel/preset-env", "@babel/preset-react"],
						// "plugins": [
						// 	["import", { libraryName: "antd-mobile", style: true }] // `style: true` 会加载 less 文件
						// ]
					}
				},
			},
			 {
				test: /\.css$/,
				include: /node_modules\/antd-mobile/,
				use: [
				require.resolve('style-loader'),
				{
					loader: require.resolve('css-loader'),
					options: {
					modules:false
					},
				},
				]
			},
			{
				test: /\.css$/,
				exclude: /node_modules\/antd-mobile/,
				use: [
						argv.mode == "development" ? { loader: "style-loader"} :MiniCssExtractPlugin.loader,
							{ loader: "css-loader", options: {modules: true,importLoaders: 1,localIdentName: '[local]___[hash:base64:5]'} },
							{ loader: "sass-loader", options: { sourceMap: true } }
				]
			},
			// {
			// 	test: /\.(scss|css)$/, //css打包 路径在plugins里
			// 	exclude: /node_modules|antd-mobile\.css/,
			// 	use: [
			// 		argv.mode == "development" ? { loader: "style-loader"} :MiniCssExtractPlugin.loader,
			// 		{ loader: "css-loader", options: {modules: true,importLoaders: 1,localIdentName: '[local]___[hash:base64:5]'} },
			// 		{ loader: "sass-loader", options: { sourceMap: true } }
			// 	]
			// },
			{
				test: /\.(scss)$/, //css打包 路径在plugins里
				exclude: /node_modules|antd-mobile\.css/,
				use: [
					argv.mode == "development" ? { loader: "style-loader"} :MiniCssExtractPlugin.loader,
					{ loader: "css-loader", options: {modules: true,importLoaders: 1,localIdentName: '[local]___[hash:base64:5]'} },
					{ loader: "sass-loader", options: { sourceMap: true } }
				]
			},
			{//TODO:分目录拷贝文件
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
		open: false,
		openPage: 'home',
		contentBase:'./src/static/',
		staticOptions: {
			redirect: true
		}
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		...staticArr,
		...htmlArr, // html插件数组
		new MiniCssExtractPlugin({ //分离css插件
			filename: process.env.NODE_ENV == "dev" ? "[name].css": "[name].[chunkhash:8].css",
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
