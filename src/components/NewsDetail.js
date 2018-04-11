import React, { Component } from 'react';
import { Col, Row, BackTop } from 'antd';
import NewsImageblock from './NewsImageblock'
import NewsHeader from './Newsheader'
import NewsFooter from './Newsfooter'
import Comment from './comment'
import '../App.css'

class NewsDetail extends Component {
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
          console.log(this.state.news);
          document.title = this.state.news.title + "- React News"
      })
    }
  render() {
    
    return (
      <div>
        <NewsHeader/>
        <Row>
            <Col span={2}></Col>
            <Col span={14}>
             <div className='article_d' dangerouslySetInnerHTML={this.handleHtml()} ></div>
             <br/>
             <Comment uniquekey={this.props.match.params.uniquekey} />
            </Col>
            <Col span={6} className='article_aside'>
             <NewsImageblock type="top" count={24} imageWidth='100px' title='相关新闻'/>
            </Col>
            <Col span={2}></Col>
        </Row>
        <NewsFooter/>
        <BackTop/>
      </div>
    );
  }
}

export default NewsDetail;