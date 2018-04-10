import React, { Component } from 'react';
import MobileHeader from './mobile_header'
import MobileFooter from './mobile_footer'
import { Tabs, Icon } from 'antd';
const TabPane = Tabs.TabPane;


class MobileIndex extends Component {
  render() {
    return (
      <div className="News-index">
        <MobileHeader />
        <Tabs defaultActiveKey="1">
          <TabPane tab={<span><Icon type="appstore" />头条</span>} key="1"></TabPane>
          <TabPane tab={<span><Icon type="appstore" />社会</span>} key="2"></TabPane>
          <TabPane tab={<span><Icon type="appstore" />国内</span>} key="3"></TabPane>
          <TabPane tab={<span><Icon type="appstore" />国际</span>} key="4"></TabPane>
          <TabPane tab={<span><Icon type="appstore" />科技</span>} key="5"></TabPane>
          <TabPane tab={<span><Icon type="appstore" />时尚</span>} key="6"></TabPane>
        </Tabs>
        <MobileFooter />
      </div>
    );
  }
}

export default MobileIndex;
