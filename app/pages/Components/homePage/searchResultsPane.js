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
  
  render(){
    return (
      <div>
        <div className="homePage--search-close"><small>Close</small></div>
        <div className="homePage--Export-button-container">
          <CsvDownloader filename="indigo-export"
                         separator=";"
                         columns={ this.state.fields }
                         datas={ this.props.resultList.results }>
            <input className="but reverse-but homePage--searchTables" type="button" value="Export to Excel"/>
          </CsvDownloader>
        </div>
        <span><i>Hits - {this.props.resultList.total}</i></span>
        <table className="homePage--search-result-table">
          <thead>
            <tr>
              <th>Case Ref</th>
              <th>Child Involed</th>
              <th>Staff Involed</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.resultList.results.map((result, i) => {
                return (<tr className="homePage--search-result-item" key={i}>
                  <td>{result.ref}</td>
                  <td>{result.child_firstName + " " + result.child_surname}</td>
                  <td>{result.staff_firstName + " " + result.staff_surname}</td>
                  <td><input className="but" type="button" value="Edit" onClick={e => this.loadToInputView(i)}/></td>
                </tr>)
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}