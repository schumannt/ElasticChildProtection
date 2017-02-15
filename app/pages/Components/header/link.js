import React from 'react';

import LinkItem from '../headFootLinks/linkItem'

require('./../../css/styles');

export default class Header extends React.Component {
  
  // state = {loggedIn:false};
  returnLinkItems(){
    if(!this.props.loggedIn){
      return (
        <div className="header--right-content">
          <LinkItem classNamesUsed={"header--link-item header--link-item-clickable"} title={"About"}/>
          <LinkItem classNamesUsed={"header--link-item header--link-item-clickable"} title={"Request Access"}/>
        </div>
      )
    }
    const helloMessage = `Welcome ${this.props.userName}`;
    return (
      <div className="header--right-content">
        <LinkItem classNamesUsed={"header--link-item header--link-item-clickable"} title={"About"}/>
        <LinkItem classNamesUsed={"header--link-item header--link-item-clickable"} title={"Log Out"}/>
        <LinkItem classNamesUsed={"header--link-item"} title={helloMessage}/>
      </div>
    )
  }
  
  render(){
    return (
      <div>
        {this.returnLinkItems()}
      </div>
    )
  }
}