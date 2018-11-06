import React, { Component } from 'react';
import { Button, WhiteSpace } from 'antd-mobile';
import Item from './Item';
import styles from './App.css';
const data =[
  {title:'亚马逊' , src: require('./assets/images/img_19.jpg') , href:'../../amazon-logistics/index.html' },
  {title:'众人添财' , src: require('./assets/images/img_21.jpg') , href:'../../tc/index.html' },
  {title:'叮当加速度，元宵送祝福！' , src: require('./assets/images/img_17.jpg') , href:'http://mobile.lenovo-idea.com/2015/offline/lanternfestival/' },
  {title:'让爱传递,她的达芬奇密码' , src: require('./assets/images/img_18.jpg') , href:'../../women/index.html' },
  {title:'厨房巅峰挑战赛' , src: require('./assets/images/img_20.jpg') , href:'http://mobile.lenovo-idea.com/2015/offline/cooking/' },
  {title:'联想小新笔记本' , src: require('./assets/images/img_22.jpg') , href:'../../telday/index.html' },
  {title:'360全景图' , src: require('./assets/images/img_test1.jpg') , href:'http://mobile.lenovo-idea.com/2015/test/360outer/' },
  {title:'联想大客户 电信日' , src: require('./assets/images/img_23.jpg') , href:'http://mobile.lenovo-idea.com/2015/telecomday/' },
  {title:'联想高考祈福H5' , src: require('./assets/images/img_24.jpg') , href:'http://mobile.lenovo-idea.com/2015/bless/' },
  {title:'乐檬K3乐懵了 微信' , src: require('./assets/images/img_26.jpg') , href:'http://mobile.lenovo-idea.com/2015/weixin/' },
  {title:'乐檬k3 线下助销' , src: require('./assets/images/img_27.jpg') , href:'http://mobile.lenovo-idea.com/2015/sale/' },
  {title:'联想k80 线下助销' , src: require('./assets/images/img_28.jpg') , href:'http://mobile.lenovo-idea.com/2015/k80/' },
  {title:'惠普七夕奇葩求爱' , src: require('./assets/images/img_29.jpg') , href:'http://mobile.lenovo-idea.com/2015/festival/' },
  {title:'联想秋季新品发布' , src: require('./assets/images/img_30.jpg') , href:'http://mobile.lenovo-idea.com/2015/holiday/' },
  {title:'新一代moto 360' , src: require('./assets/images/img_31.jpg') , href:'http://mobile.lenovo-idea.com/2015/moto360/' },
  {title:'联想员工享福啦！' , src: require('./assets/images/img_32.jpg') , href:'http://mobile.lenovo-idea.com/2015/p1/' },
  {title:'HP华丽蜕变计时赛' , src: require('./assets/images/img_34.jpg') , href:'http://mobile.lenovo-idea.com/2015/hp/' },
  {title:'Moto X Style选择无可复制 (第三方公司制作)' , src: require('./assets/images/img_33.jpg') , href:'http://mobile.lenovo-idea.com/2015/motoxstyle/' },
  {title:'乐檬K3圣诞节(下线)' , src: require('./assets/images/img_1.jpg') , href:'' },
  {title:'策反王撕葱(下线)' , src: require('./assets/images/img_2.jpg') , href:'' },
  {title:'广交会(下线)' , src: require('./assets/images/img_4.jpg') , href:'' },
  {title:'乐檬K3绕口令(下线)' , src: require('./assets/images/img_5.jpg') , href:'' },
  {title:'武媚娘 乐檬K3病毒(下线)' , src: require('./assets/images/img_6.jpg') , href:'' },
  {title:'乐檬k3产品(下线)' , src: require('./assets/images/img_7.jpg') , href:'' },
  {title:'厕所挖宝总动员(下线)' , src: require('./assets/images/img_8.jpg') , href:'' },
  {title:'黄金斗士Note8 众筹(下线)' , src: require('./assets/images/img_9.jpg') , href:'' },
  {title:'联想手机2015爱你有我 (下线)' , src: require('./assets/images/img_10.jpg') , href:'' },
  {title:'联想手机品牌 (下线)' , src: require('./assets/images/img_11.jpg') , href:'' },
  {title:'大寒(下线)' , src: require('./assets/images/img_3.jpg') , href:'' },
  {title:'挖笋尖(下线)' , src: require('./assets/images/img_12.jpg') , href:'' },
  {title:'联想手机vibe X2(下线)' , src: require('./assets/images/img_13.jpg') , href:'' },
  {title:'雾里看笋(下线)' , src: require('./assets/images/img_14.jpg') , href:'' },
  {title:'一块皮子华丽蜕变之旅(下线)' , src: require('./assets/images/img_15.jpg') , href:'' },
  {title:'联想智能电视携手哆啦A梦发红包赠玩偶送电视啦！(下线)' , src: require('./assets/images/img_16.jpg') , href:'' },
  {title:'联想大客户 端午节送红包(下线)' , src: require('./assets/images/img_25.jpg') , href:'' }
]

let pageId = 1
let pageSize = 4
if(window.innerWidth>768){
  pageSize = 12
}
const fecthData = ()=>{
  const _pageId = pageId
  pageId++
  return data.filter((value,index)=>{
    if(index>=(_pageId-1) * pageSize && index<=(_pageId) * pageSize ) return value
  })
}
class App extends Component {
	constructor(props){
		super(props);
		this.state=({
			data:fecthData(),
      isLoadingMore: false
		})
	}
  componentDidMount() {
    const wrapper = this.refs.wrapper;
    const loadMoreDataFn = this.loadMoreDataFn;
    const that = this; // 为解决不同context的问题
    let timeCount;
    function callback() {
      const top = wrapper.getBoundingClientRect().top;
      const windowHeight = window.screen.height;

      if (top && top < windowHeight) {
        // 当 wrapper 已经被滚动到页面可视范围之内触发
        loadMoreDataFn(that);
      }
    }
    window.addEventListener('scroll', function () {
        if (this.state.isLoadingMore) {
            return ;
        }
        if (timeCount) {
            clearTimeout(timeCount);
        }

        timeCount = setTimeout(callback, 500);
    }.bind(this), false);
  }
  loadMoreDataFn(that) {
    that.setState({
      data: that.state.data.concat(fecthData())
    })
  }
  render() {
    return (
      <div>
        <div className={styles.link}>
          <a href="./lenovo.html">联想</a>
          <a href="http://mobile.lenovo-idea.com/2015/list/index.html">JOYSALOON</a>
        </div>
        <div className={styles.list}>
          {this.state.data.map((item) => (
              <Item title={item.title} src={item.src} href={item.href} />
            ))
            }
        </div>
        <div className={styles.loadMore} ref = "wrapper" onClick={this.loadMoreDataFn.bind(this, this)}>正在加载...</div>
        <WhiteSpace size="lg" />
      </div>
    );
  }
}

export default App;
