import React, { Component } from "react";
import "./nav.scss";

export default class Nav extends Component {

	componentDidMount() {

	}

	render() {

		return (
			<div className=" nav">
				<div className="columns">
					<div className=""><a href= "/">首页</a></div>
					<div className=""><a href= "/about">关于</a></div>
				</div>
	    </div>
		);
	}
}
