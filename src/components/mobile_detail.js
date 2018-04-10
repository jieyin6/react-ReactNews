import React, { Component } from 'react';
import { Col, Row, BackTop } from 'antd';
import { Router, Route, Link} from 'react-router-dom';
import MobileHeader from './mobile_header'
import MobileFooter from './mobile_footer'
import Comment from './comment'
import '../App.css'

class MobileDetail extends Component {
  constructor() {
    super();
    this.state = {
        news:''
    }
  }
  handleHtml(){
      return {__html:this.state.news.pagecontent}
  }
  componentWillMount() {
      let fetchOptions = {
          methods:'GET'
      }
      fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey="+this.props.match.params.uniquekey+"",fetchOptions)
      .then((res)=>res.json()).then((json)=>{
          this.setState({news:json})
          document.title = this.state.news.title + "- React News"
      })
    }
  render() {
    
    return (
      <div>
        <MobileHeader/>
        <Row>
            <Col span={2}></Col>
            <Col span={20}>
             <div className='article_d' dangerouslySetInnerHTML={this.handleHtml()} ></div>
             <br/>
             <Comment uniquekey={this.props.match.params.uniquekey} />
            </Col>
            <Col span={2}></Col>
        </Row>
        <MobileFooter/>
        <BackTop/>
      </div>
    );
  }
}

export default MobileDetail;