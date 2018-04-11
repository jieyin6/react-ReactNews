import React, { Component } from 'react';
import {Route, BrowserRouter} from 'react-router-dom'
import MediaQuery from 'react-responsive'
import NewsIndex from './components/Newsindex'
import MobileIndex from './components/mobile_index'
import NewsDetail from './components/NewsDetail'
import MobileDetail from './components/mobile_detail'
import NewsUsercenter from './components/NewsUsercenter'
import './App.css';
import MobileUsercenter from './components/mobile_usercenter';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MediaQuery query="(min-device-width:1224px)">
        <BrowserRouter>
          <div>
            <Route exact path="/" component={NewsIndex}/>
            <Route path="/details/:uniquekey" component={NewsDetail} />
            <Route path="/usercenter" component={NewsUsercenter} />
          </div>
         </BrowserRouter>
        </MediaQuery>
        <MediaQuery query="(max-device-width:1224px)">
        <BrowserRouter>
          <div>
            <Route exact path="/" component={MobileIndex}/>
            <Route path="/details/:uniquekey" component={MobileDetail} />
            <Route path="/usercenter" component={MobileUsercenter} />
          </div>
         </BrowserRouter>
        </MediaQuery>
      </div>
    );
  }
}

export default App;
