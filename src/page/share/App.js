import React, { Component } from "react";
import { Button, List, Icon } from 'antd-mobile';
import html2canvas from "html2canvas";
import styles from "./App.scss"

export default class App extends Component {
	constructor(props){
		super(props);
	}
	componentDidMount(){
		this.init();
	}
	init() {
		html2canvas(document.querySelector("#container")).then(canvas => {
			//document.body.appendChild(canvas)
					canvas.id = "mycanvas";
					//生成base64图片数据  0.7为图片的压缩质量，可以理解为压缩率
					var dataUrl = canvas.toDataURL("image/jpeg",1);
					var newImg = document.createElement("img");
					newImg.src =  dataUrl;
					newImg.className="newImg";
					document.body.append(newImg);
		});
	}
	render() {
		return (
			<div className={styles.home} id="container">
				<p>111</p>
			</div>
		);
	}
}
