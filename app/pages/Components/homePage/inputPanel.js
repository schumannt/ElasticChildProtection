import React from 'react';

require('./../../css/styles');

export default class LeftPanel extends React.Component {
  
  constructor(props, context) {
    super(props, context);
    // this.state={ field: this.props.fieldMap };
  }
  
  static PropTypes = {
    fieldMap: PropTypes.object.isRequired
  };
    
    
    inputChangeHandler (event) {
    // this.setState({[event.target.id]: event.target.value });
    this.props.actions.updateFields({[event.target.id]: event.target.value });
  }
  
  returnInputs(formType, formName, i){
    switch(formType) {
      case 'integer':
        return (<tr className="homePage--table-row" key={i}>
          <td>{formName}</td><
          td><input type="text" min="1" max="100" id={formName} onChange={this.inputChangeHandler.bind(this)}/></td>
        </tr>);
      case 'string':
        return (<tr className="homePage--table-row" key={i}>
          <td>{formName}</td>
          <td><input type="text" id={formName} onChange={this.inputChangeHandler.bind(this)}/></td>
        </tr>);
      case 'text':
        return (<tr className="homePage--table-row" key={i}>
          <td>{formName}</td>
          <td>
            <textarea type="text" id={formName} onChange={this.inputChangeHandler.bind(this)} rows="6"></textarea>
          </td>
        </tr>);
      case 'date':
        return (<tr className="homePage--table-row" key={i}>
          <td>{formName}</td>
          <td><input type="date" id={formName} onChange={this.inputChangeHandler.bind(this)}/></td>
        </tr>);
      case 'boolean':
        return (<tr className="homePage--table-row" key={i}>
          <td>{formName}</td>
          <td>
            <input type="checkbox" id={formName} onChange={this.inputChangeHandler.bind(this)}/>
          </td>
        </tr>);
      default:
        return (<tr className="homePage--table-row" key={i}>
          <td>{formName}</td>
          <td><input type="text" id={formName} onChange={this.inputChangeHandler.bind(this)}/></td>
        </tr>);
    }
  }
  
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
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
                  this.props.fieldMap.map((form, i) => { return this.returnInputs(form.type,form.name, i) })
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