import React, { Component } from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import '../App.css'

class Newsblock extends Component {
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
    let news = this.state.news
    console.log(news.length);
    
    let newList = news.length 
    ? news.map((newsItem, index) => 
    
        <li key={index}>
          <Link to={`/details/${newsItem.uniquekey}`} target="_blank">
            {newsItem.title}
          </Link>
        </li> 
       /* <li key={index}>{newsItem.title}</li>*/
    )
    : '没有加载到任何数据'
    return (
      <div className="top-news-list">
        <Card>
        <ul className='news-list'>
          {newList}
        </ul>
        </Card>
      </div>
    );
  }
}

export default Newsblock;