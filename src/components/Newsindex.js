import React, { Component } from 'react';
import Newsheader from './Newsheader'
import Newsfooter from './Newsfooter'
import Newscontainer from './Newscontainer'

class NewsIndex extends Component {
  render() {
    return (
      <div className="News-index">
        <Newsheader />
        <Newscontainer />
        <Newsfooter />
      </div>
    );
  }
}

export default NewsIndex;
