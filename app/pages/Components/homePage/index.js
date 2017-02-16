import React from 'react';

import InputPanel from './inputPanel';
import SearchPanel from './searchPanel';
import StatsPanel from './statsPanel';

require('./../../css/styles');

export default class HomePage extends React.Component {
  render(){
    return (
      <div className="homePage">
        <div>
          <SearchPanel/>
          <StatsPanel/>
        </div>
        <InputPanel/>
      </div>
    )
  }
}