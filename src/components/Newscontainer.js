import React, { Component } from 'react';
import { Row, Col, Carousel, Tabs } from 'antd';
import Newsblock from './Newsblock'
const TabPane = Tabs.TabPane;


class NewsContainer extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={2}></Col>
          <Col span={20} className="news-container">
            <div className="left-container">
            <Carousel autoplay className="slider">
              <div><img alt="1"/></div>
              <div><img alt="1"/></div>
              <div><img alt="1"/></div>
              <div><img alt="1"/></div>
            </Carousel>
            </div>
            <div className='tabs-container'>
             <Tabs defaultActiveKey="1" className="tabs-news">
              <TabPane tab="头条" key="1" className='tabs-product'>
                <Newsblock type="top" count={20} />
              </TabPane>
              <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
              <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
            </Tabs>
           </div>
          </Col>
          <Col span={2}></Col>
        </Row>
      </div>
    );
  }
}

export default NewsContainer;
