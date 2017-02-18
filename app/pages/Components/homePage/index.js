import React from 'react';

import InputPanel from './inputPanel';
import SearchPanel from './searchPanel';
import StatsPanel from './statsPanel';

require('./../../css/styles');

export default class HomePage extends React.Component {
  render(){
    const { actions } = this.props;
    return (
      <div className="homePage">
        <div>
          <SearchPanel actions={actions}/>
          <StatsPanel/>
        </div>
        <InputPanel actions={actions}/>
      </div>
    )
  }
}