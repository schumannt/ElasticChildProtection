import React from 'react';
import CsvDownloader from 'react-csv-downloader';

import fieldMap from './fieldMap.json';


require('./../../css/styles');

export default class SearchResultsPane extends React.Component {
  
  constructor(props, context) {
    super(props, context);
    let fields = [];
    fieldMap.map((r) => {
      fields.push({
        id: r.name,
        displayName: r.name
      })
    });
    this.state = { fields };
    console.log(fields);
  }
  
  render(){
    return (
      <div className="homePage--right-bottom-panel header--Form homePage--form homePage--search">
        <div className="homePage--search-close"><small>Close</small></div>
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
              </tr>)
            })
          }
          </tbody>
        </table>
        <CsvDownloader filename="indigo-export"
                       separator=";"
                       columns={ this.state.fields }
                       datas={ this.props.resultList.results }>
          <input className="homePage--searchTables" type="button" value="Export to Excel"/>
        </CsvDownloader>
      </div>
    )
  }
}