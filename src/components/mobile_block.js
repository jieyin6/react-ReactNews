import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import '../css/mobile.css'

class MobileBlock extends Component {
  constructor() {
    super();
    this.state = {
        news:''
    }
  }
  componentWillMount() {
      let fetchOptions = {
          methods:'GET'
      }
      fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="+ this.props.type +"&count="+this.props.count+"",fetchOptions)
      .then((res)=>res.json()).then((json)=>{
          this.setState({news:json})
          
      })
    }
  render() {
    let news = this.state.news
    let newList = news.length 
    ? news.map((newsItem, index) => 
     <Link key={index} to={`/details/${newsItem.uniquekey}`} >
        <section className="mobile_block" >
          <div className="m_article_img">
            <img src={newsItem.thumbnail_pic_s} alt="article"/>
          </div>
          <div className="m_article_info">
            <div className='m_article_info_c'>
              <div className="m_info_title">{newsItem.title}</div>
              <div className="m_info_desc">
                <span className="m_info_realtype">{newsItem.realtype}</span>
                <span className="m_info_date">{newsItem.date}</span>
              </div>
            </div>
          </div>
        </section>
    </Link>
    )
    : '没有加载到任何数据'
    return (
      <div>
        <Row>
            <Col span={24}>
              {newList}
            </Col>
        </Row>
      </div>
    );
  }
}

export default MobileBlock;