import React, { Component } from 'react';
import { Card } from 'antd';
import { Router, Route, Link } from 'react-router-dom';
import '../App.css'

class NewsImageblock extends Component {
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
          console.log(this.state.news);
      })
    }
  render() {
    let styleImage = {
        display:'block',
        width:this.props.imageWidth,
        height:'90px'
    }
    let styleH3 = {
        width:this.props.imageWidth,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        
    }
    let news = this.state.news
    console.log(news.length);
    
    let newList = news.length 
    ? news.map((newsItem, index) => 
    
        <Link key={index} to={`/details/${newsItem.uniquekey}`} target="_blank" className='image-block'>
        <div >
          <div className='custom-image'>
            <img src={newsItem.thumbnail_pic_s} style={styleImage} alt='image'/>
          </div>
          <div className="custom-card">
            <h3 style={styleH3}>{newsItem.title}</h3>
            <p>{newsItem.author_name}</p>
          </div>
        </div>
        </Link>
    )
    : '没有加载到任何数据'
    return (
      <div className="image-card">
        <Card title={this.props.cardTitle} bordered={true} style={{width:this.props.width}}>
         {newList}
        </Card>
      </div>
    );
  }
}

export default NewsImageblock;