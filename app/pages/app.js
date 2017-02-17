import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as StoreActions from '../redux/store-action';

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
    fieldMap: PropTypes.fieldMap.isRequired,
  };
  
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



function mapStateToProps(state) {
  return {
    counter: state.fieldMap
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(StoreActions, dispatch)
  };
}

// App.PropTypes = {
//   fieldMap: PropTypes.fieldMap.isRequired,
// };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);