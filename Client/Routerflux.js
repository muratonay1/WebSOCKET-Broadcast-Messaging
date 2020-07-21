import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Messages from './Messages.js';
import Start from './Start';


export default class Routerflux extends Component {
  render() {
    return (
      <Router>
        <Scene key='Root'>
            
            <Scene key="Start" component={Start}  initial  hideNavBar />
            <Scene key="Messages" component={Messages}    hideNavBar />
           
        </Scene>
      </Router>
    )
  }
}