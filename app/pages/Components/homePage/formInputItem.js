import React from 'react';

require('./../../css/styles');

export default class FormInputItem extends React.Component {
  
  constructor(props, context) {
    super(props, context);
    this.state={};
  }
  
  inputChangeHandler (event) {
    this.setState({ [event.target.id]: event.target.value });
    console.log(event.target.id +" -  "+ event.target.value);
    // this.setState({ [`key${event.target.id}`]: event.target.value });
  }
  
  render(){
    switch(this.props.formType) {
      case 'integer':
        return (<tr className="homePage--table-row">
          <td>{this.props.formName}</td><
          td><input type="text" min="1" max={this.props.max} id={this.props.formName} onChange={this.inputChangeHandler.bind(this)}/></td>
        </tr>);
      case 'string':
        return (<tr className="homePage--table-row">
          <td>{this.props.formName}</td>
          <td><input type="text" id={this.props.formName} onChange={this.inputChangeHandler.bind(this)}/></td>
        </tr>);
      case 'date':
        return (<tr className="homePage--table-row">
          <td>{this.props.formName}</td>
          <td><input type="date" id={this.props.formName} onChange={this.inputChangeHandler.bind(this)}/></td>
        </tr>);
      case 'boolean':
        return (<tr className="homePage--table-row">
          <td>{this.props.formName}</td>
          <td>
            <input type="checkbox" id={this.props.formName} onChange={this.inputChangeHandler.bind(this)}/>
          </td>
        </tr>);
      default:
        return (<tr className="homePage--table-row">
          <td>{this.props.formName}</td>
          <td><input type="text" id={this.props.formName} onChange={this.inputChangeHandler.bind(this)}/></td>
        </tr>);
    }
  }
}