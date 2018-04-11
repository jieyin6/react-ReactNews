import React, { Component } from 'react';
import MobileHeader from './mobile_header'
import MobileFooter from './mobile_footer'
import { Tabs, Icon, Carousel } from 'antd';
import MobileBlock from './mobile_block'
import '../css/mobile.css'
const TabPane = Tabs.TabPane;

class MobileIndex extends Component {
  render() {
    return (
      <div className="News-index">
        <MobileHeader />
        <Tabs defaultActiveKey="1">
          <TabPane tab={<span><Icon type="appstore" />头条</span>} key="1">
            <Carousel autoplay className="slider">
              <div><img src="../images/carousel_1.jpg"/></div>
              <div><img src="../images/carousel_2.jpg"/></div>
              <div><img src="../images/carousel_3.jpg"/></div>
              <div><img src="../images/carousel_4.jpg"/></div>
            </Carousel>
            <MobileBlock type="top" count={20}/>
          </TabPane>
          <TabPane tab={<span><Icon type="appstore" />社会</span>} key="2">
          <MobileBlock type="shehui" count={20}/>
          </TabPane>
          <TabPane tab={<span><Icon type="appstore" />国内</span>} key="3">
            <MobileBlock type="guonei" count={20}/>
          </TabPane>
          <TabPane tab={<span><Icon type="appstore" />国际</span>} key="4">
            <MobileBlock type="guoji" count={20}/>
          </TabPane>
          <TabPane tab={<span><Icon type="appstore" />科技</span>} key="5">
            <MobileBlock type="keji" count={20}/>
          </TabPane>
          <TabPane tab={<span><Icon type="appstore" />时尚</span>} key="6">
            <MobileBlock type="shishang" count={20}/>
          </TabPane>
        </Tabs>
        <MobileFooter />
      </div>
    );
  }
}

export default MobileIndex;
