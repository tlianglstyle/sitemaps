const fs = require("fs");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const getFilePath = require("./getFilepath");
let arr = [];

getFilePath("./src/page").map((item)=>{
	if(fs.existsSync(`src/page/${item}/static`)){
		arr.push(new CopyWebpackPlugin([{ from: `src/page/${item}/static`, to: `${item}` }]))
	}
	//arr.push(new CopyWebpackPlugin([{ from: `src/static/css/antd-mobile.css`, to: `${item}/css` }]))
	arr.push(new CopyWebpackPlugin([{ from: `src/static/`, to: `${item}` }]))
	//arr.push(new CopyWebpackPlugin([{ from: `src/static`, to: `` }]))
});

module.exports = arr;
