const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");//生成html文件
const getFilePath = require("./getFilepath");
let htmlArr = [];

getFilePath("./src/page").map((item)=>{
	let infoJson ={},infoData={};
	try{
		// 读取pageinfo.json文件内容，如果在页面目录下没有找到pageinfo.json 捕获异常
		infoJson = fs.readFileSync(`src/page/${item}/pageinfo.json`,"utf-8");//
		infoData = JSON.parse(infoJson);
	}catch(err){
		infoData = {};
	}
	htmlArr.push(new HtmlWebpackPlugin({
		title:infoData.title ? infoData.title : "标题",
		meta:{
			keywords: infoData.keywords ? infoData.keywords : "webpack，react，github",
			description:infoData.description ? infoData.description : "描述"
		},
		chunks:[`${item}/${item}`], //引入的js
		template: "./src/template.html",
		//filename : item == "index" ? "index.html" : `${item}/index.html`, //html位置
		hash:true,
		filename : `${item}/index.html`, //html位置
		minify:{//压缩html
			collapseWhitespace: true,
			preserveLineBreaks: true
		},
	}));
});

module.exports = htmlArr;
