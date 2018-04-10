import React, { Component } from 'react';
import { Row, Col } from 'antd';
import '../css/mobile.css'


class MobileFooter extends Component {
 
  render() {
    return (
      <div className='footer-container'>
        <Row >
          <Col span={2}></Col>
          <Col span={20} className='mobile-footer'>
            &copy;&nbsp;2017 ReactNews. All Right Reserved
          </Col>
         <Col span={2}></Col>
       </Row>
      </div>
    );
  }
}

export default MobileFooter;