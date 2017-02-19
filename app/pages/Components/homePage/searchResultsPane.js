import React, { Component, PropTypes } from 'react';
import CsvDownloader from 'react-csv-downloader';
import { connect } from 'react-redux';

require('./../../css/styles');

const mapStateToProps = (state) => {
  return {
    fieldMap: state.fieldMap,
    inputValue: state.inputValue
  };
};

@connect(mapStateToProps)
export default class SearchResultsPane extends React.Component {
  
  constructor(props, context) {
    super(props, context);
    let fields = [];
    this.props.fieldMap.map((r) => {
      fields.push({
        id: r.name,
        displayName: r.name
      })
    });
    this.state = { fields };
  }
  
  loadToInputView(i){
    this.props.actions.updateFields(this.props.resultList.results[i]);
  }
  
  returnPageNos(pages){
    return(
      <tr className="homePage--pageNos">
        <td>Prev</td>
          {[...Array(pages)].map((x, i) => { return <td key={i+1}>{i+1}</td> })}
        <td>Next</td>
      </tr>
    )
  }
  
  render(){
    return (
      <div>
        <div className="global--floatright">
          <img width="30" src={require('./../../assets/error.png')}/>
        </div>
        <div className="homePage--Export-button-container">
          <CsvDownloader filename="indigo-export"
                         separator=";"
                         columns={ this.state.fields }
                         datas={ this.props.resultList.results }>
            <img className="global--vertical" width="40" src={require('./../../assets/save.png')}/>
            <small><i>Export to Excel</i></small>
          </CsvDownloader>
        </div>
        <br/>
        <span><i>Hits - {this.props.resultList.total}</i>
        <i className="global--floatright">Click line to edit</i></span>
        <table className="homePage--search-result-table">
          <thead>
            <tr></tr>
            <tr>
              <th>Case Ref</th>
              <th>Child Involed</th>
              <th>Staff Involed</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.resultList.results.map((result, i) => {
                return (<tr onClick={e => this.loadToInputView(i)} className="homePage--search-result-item" key={i}>
                  <td>{result.ref}</td>
                  <td>{result.child_firstName + " " + result.child_surname}</td>
                  <td>{result.staff_firstName + " " + result.staff_surname}</td>
                </tr>)
              })
            }
          </tbody>
        </table>
        <table className="homePage--pages">
          <tbody>
              {this.returnPageNos(this.props.resultList.pages)}
          </tbody>
        </table>
      </div>
    )
  }
}