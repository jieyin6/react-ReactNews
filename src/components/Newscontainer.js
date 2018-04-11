import React, { Component } from 'react';
import { Row, Col, Carousel, Tabs } from 'antd';
import Newsblock from './Newsblock'
import NewsImageblock from './NewsImageblock'
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
              <div><img src="../images/carousel_1.jpg"/></div>
              <div><img src="../images/carousel_2.jpg"/></div>
              <div><img src="../images/carousel_3.jpg"/></div>
              <div><img src="../images/carousel_4.jpg"/></div>
            </Carousel>
            <NewsImageblock type='guoji' count={9} width='400px' imageWidth='112px' cardTitle='国际新闻' />
            </div>
            <div className='tabs-container'>
             <Tabs defaultActiveKey="1" className="tabs-news">
              <TabPane tab="头条新闻" key="1" className='tabs-product'>
                <Newsblock type="top" count={26} width='100%' />
              </TabPane>
              <TabPane tab="国际新闻" key="2">
              <Newsblock type="guoji" count={26} />
              </TabPane>
            </Tabs>
           </div>
           <div className="right-container">
             <NewsImageblock type='guonei' count={8} width='280px' imageWidth='112px' cardTitle='国内新闻'></NewsImageblock>
           </div>
           <div className='other-card'>
              <NewsImageblock type='yule' count={16} width='100%' imageWidth='132px' cardTitle='娱乐新闻' />
              <NewsImageblock type='keji' count={16} width='100%' imageWidth='132px' cardTitle='科技新闻' />
            </div>
          </Col>
          <Col span={2}></Col>
        </Row>
      </div>
    );
  }
}

export default NewsContainer;
