import React from 'react';

require('./../../css/styles');

export default class LinkItem extends React.Component {
  static propTypes = {
    classNamesUsed: React.PropTypes.string,
    image: React.PropTypes.string
  };
  static defaultProps = {
    classNamesUsed: '',
    title: ''
  };
  
  render(){
    return <div className={this.props.classNamesUsed}>{this.props.title}</div>
  }
}