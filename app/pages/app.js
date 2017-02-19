import React, { Component, PropTypes }  from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as StoreActions from './redux/input-action';

import Header from './Components/header'
import Footer from './Components/footer'
import LogIn from './Components/login'
import HomePage from './Components/homePage'

require('./css/styles');

export class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  static PropTypes = {
    fieldMap: PropTypes.object.isRequired,
    inputValues: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };
  
  isLoggedIn() { return true; }
  
  areTheyLoggedIn(actions) {
    if (this.isLoggedIn()) return <HomePage actions={actions}/>;
    return  <LogIn/>;
  }
  
  render(){
    const { actions } = this.props;
    return (
      <div>
        <Header loggedIn={this.isLoggedIn()} userName={'patrick'}/>
        {this.areTheyLoggedIn(actions)}
        <Footer/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    fieldMap: state.fieldMap,
    inputValues: state.inputValues
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(StoreActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);