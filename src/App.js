import React, { Component } from 'react';
import MediaQuery from 'react-responsive'
import NewsIndex from './components/Newsindex'
import MobileIndex from './components/mobile_index'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MediaQuery query="(min-device-width:1224px)">
          <NewsIndex/>
        </MediaQuery>
        <MediaQuery query="(max-device-width:1224px)">
          <MobileIndex />
        </MediaQuery>
      </div>
    );
  }
}

export default App;
