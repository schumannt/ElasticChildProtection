import React from 'react';

import LinkItem from '../headFootLinks/linkItem'

require('./../../css/styles');

export default class Footer extends React.Component {
  render(){
    return (
      <header className='footer'>
        <div className='footer--wrapper'>
          <div className='footer--left-content'>
          </div>
          <div className='footer--right-content'>
            <LinkItem classNamesUsed={"footer--link-item-clickable"} title={"Developed By Indigo Array"}/>
          </div>
        </div>
      </header>
    )
  }
}