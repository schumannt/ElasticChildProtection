import React from 'react';

import fieldMap from './fieldMap.json';

require('./../../css/styles');

export default class LeftPanel extends React.Component {
  
  constructor(props, context) {
    super(props, context);
    this.state={};
  }
  
  inputChangeHandler (event) {
    this.setState({ newForm:{[event.target.id]: event.target.value }});
  }
  
  returnInputs(formType, formName, i){
    switch(formType) {
      case 'integer':
        return (<tr className="homePage--table-row">
          <td>{formName}</td><
          td><input type="text" min="1" max="100" key={i} id={formName} onChange={this.inputChangeHandler.bind(this)}/></td>
        </tr>);
      case 'string':
        return (<tr className="homePage--table-row">
          <td>{formName}</td>
          <td><input type="text" key={i} id={formName} onChange={this.inputChangeHandler.bind(this)}/></td>
        </tr>);
      case 'date':
        return (<tr className="homePage--table-row">
          <td>{formName}</td>
          <td><input type="date" key={i} id={formName} onChange={this.inputChangeHandler.bind(this)}/></td>
        </tr>);
      case 'boolean':
        return (<tr className="homePage--table-row">
          <td>{formName}</td>
          <td>
            <input type="checkbox" key={i} id={formName} onChange={this.inputChangeHandler.bind(this)}/>
          </td>
        </tr>);
      default:
        return (<tr className="homePage--table-row">
          <td>{formName}</td>
          <td><input type="text" key={i} id={formName} onChange={this.inputChangeHandler.bind(this)}/></td>
        </tr>);
    }
  }
  
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.newForm);
  }
  
  render(){
    return (
      <div className="homePage--left-panel">
        <div className="homePage--input">
          <form className="header--Form homePage--form" onSubmit={this.handleSubmit.bind(this)}>
            <h1>New Case</h1>
            <table>
              <tbody>
                {
                  fieldMap.map((form, i) => {
                    return this.returnInputs(form.type,form.name, i);
                  })
                }
                <tr><td><input type="submit" value="Submit"/></td></tr>
              </tbody>
            </table>
            
          </form>
        </div>
      </div>
    )
  }
}