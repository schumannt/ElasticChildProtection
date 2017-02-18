import React from 'react';

import Title from './title';
import Link from './link';

require('./../../css/styles');

export default class Header extends React.Component {
  render() {
    return (
      <header className="header header--basic">
        <div className="header--wrapper">
          <div className="header--left-content">
            <Title />
          </div>
          <div className="header--right-content">
            <Link loggedIn={this.props.loggedIn} userName={this.props.userName} />
          </div>
        </div>
      </header>
    );
  }
}
