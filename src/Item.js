import React, { Component } from 'react';
import { Button, Icon, Flex, WhiteSpace } from 'antd-mobile';
import styles from './Item.css';

class App extends Component {
  render() {
    return (
      <div className={styles.list} onClick={()=>{window.location.href=this.props.href}}>
				<div className={styles.h5_box}>
					<div className={styles.image}>
						<img src={this.props.src} />
					</div>
					<div className={styles.info}>
						<a href={this.props.href}>
							<p>{this.props.title}</p>
						</a>
					</div>
        </div>
				<p>{this.props.title}</p>
			</div>
    );
  }
}

export default App;
