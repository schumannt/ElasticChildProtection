import React from 'react';

import LeftPanel from './leftPanel';
import RightTopPanel from './rightTopPanel';
import RightBottomPanel from './rightBottomPanel';

require('./../../css/styles');

export default class HomePage extends React.Component {
  render(){
    return (
      <div className="homePage">
        <LeftPanel/>
        <div>
          <RightTopPanel/>
          <RightBottomPanel/>
        </div>
      </div>
    )
  }
}