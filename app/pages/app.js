import React from 'react';

import Header from './Components/header'
import Footer from './Components/footer'
import LogIn from './Components/login'
import HomePage from './Components/homePage'

require('./css/styles');

export default class App extends React.Component {
  
  isLoggedIn() { return true; }
  
  areTheyLoggedIn() {
    if (this.isLoggedIn()) return <HomePage/>;
    return  <LogIn/>;
  }
  
  render(){
    return (
      <div>
        <Header loggedIn={this.isLoggedIn()} userName={'patrick'}/>
        {this.areTheyLoggedIn()}
        <Footer/>
      </div>
    )
  }
}