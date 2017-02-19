import React, { Component, PropTypes }  from 'react';
import { connect } from 'react-redux';
import request from 'request';


require('./../../css/styles');

const mapStateToProps = (state) => {
  return {
    fieldMap: state.fieldMap,
    inputValues: state.inputValues
  };
};

@connect(mapStateToProps)
export default class InputPanel extends Component {
  
  constructor(props, context) {
    super(props, context);
    // this.state={ field: this.props.fieldMap };
    this.state = { isNew: true };
  }
    
  inputChangeHandler (event) {
    const newInput = {[event.target.id]: event.target.value };
    this.props.actions.updateFields(newInput);
  }
  
  returnInputs(formType, formName, i){
    if(this.props.inputValue && this.props.inputValue[formName] !== undefined){
      input = this.props.inputValue[formName];
    }
    switch(formType) {
      case 'integer':
        return (<tr className="homePage--table-row" key={i}>
          <td>{formName}</td><
          td><input type="text" min="1" max="100" id={formName} ref={formName} onChange={this.inputChangeHandler.bind(this)}/></td>
        </tr>);
      case 'string':
        return (<tr className="homePage--table-row" key={i}>
          <td>{formName}</td>
          <td><input type="text" id={formName} ref={formName} onChange={this.inputChangeHandler.bind(this)}/></td>
        </tr>);
      case 'text':
        return (<tr className="homePage--table-row" key={i}>
          <td>{formName}</td>
          <td><textarea type="text" id={formName} ref={formName} onChange={this.inputChangeHandler.bind(this)} rows="6"/></td>
        </tr>);
      case 'date':
        return (<tr className="homePage--table-row" key={i}>
          <td>{formName}</td>
          <td><input type="date" id={formName} ref={formName} onChange={this.inputChangeHandler.bind(this)}/></td>
        </tr>);
      case 'boolean':
        return (<tr className="homePage--table-row" key={i}>
          <td>{formName}</td>
          <td>
            <input type="checkbox" id={formName} ref={formName} onChange={this.inputChangeHandler.bind(this)}/>
          </td>
        </tr>);
      default:
        return (<tr className="homePage--table-row" key={i}>
          <td>{formName}</td>
          <td><input type="text" id={formName} ref={formName} onChange={this.inputChangeHandler.bind(this)}/></td>
        </tr>);
    }
  }
  
  handleSubmit(e) {
    e.preventDefault();
    const options = {
      uri: `http://localhost:8085/update`,
      method: 'POST',
      body: this.props.inputValues,
      json: true,
    };
    //  trigger request
    request(options, (err, response, body) => {
      console.log(response);
      if(response.statusCode===200){
        this.props.actions.resetFields();
      }
    });
    
  }
  
  componentWillReceiveProps(nextProps) {
    console.log('there');
    nextProps.fieldMap.map((form) => {
      if(nextProps.inputValues && nextProps.inputValues[form.name] !== undefined){
        if(form.type==='date') {
          this.refs[form.name].value = nextProps.inputValues[form.name].split('/').reverse().join('-');
          return;
        }
        this.refs[form.name].value = nextProps.inputValues[form.name];
      }else{
        this.refs[form.name].value = null;
      }
    });
  }
  
  resetForm(){
    this.props.actions.resetFields();
  }
  
  render(){
    return (
      <div className="homePage--input-panel">
        <div className="homePage--input">
          <form className="global--panel homePage--form" onSubmit={this.handleSubmit.bind(this)}>
            <img className="global--img global--vertical" width="40" src={require('./../../assets/notepad.png')}/>
            <span><i>Allegations</i></span>
            <table>
              <tbody>
                {
                  this.props.fieldMap.map((form, i) => {
                    return this.returnInputs(form.type,form.name, i)
                  })
                }
                <tr>
                  <td><input className="but" type="submit" value="Submit"/></td>
                  <td><input className="but reverse-but" type="button" onClick={this.resetForm.bind(this)} value="Reset"/></td>
                </tr>
              </tbody>
            </table>
            
          </form>
        </div>
      </div>
    )
  }
}