import React from 'react';
import request from 'request';
import Select from 'react-select';

require('./../../css/styles');

export default class RightTopPanel extends React.Component {
  
  constructor(props, context) {
    super(props, context);
    
    // most of the state is so we still have access to data
    // during animations triggered by changing props
    let searchTypes = [
      { value: 'wildcard', label: 'wildcard'},
      { value: 'ref', label: 'case ref'},
      { value:'childSurname', label: 'childSurname'},
      { value:'staffSurname', label: 'staffSurname'},
      { value:'dateRange', label: 'dateRange'}];
    const searchTypeDefault = searchTypes[0].value;
    this.state = {
      searchTypes,
      searchTypeDefault,
      searchCriteria: [{field: searchTypeDefault}]
    };
  }
  
  buildURL(){
    // Build URL
    let url = '';
    this.state.searchCriteria.map((searchQuery) =>{
      if(searchQuery.field!==undefined)url+=`&${searchQuery.field}=${searchQuery.text}`;
    });
    return url;
  }
  
  startSearch(e) {
    e.preventDefault();
    const url = this.buildURL();
    const options = {
      uri: "http://localhost:8085/get?"+ url,
      method: 'GET'
    };
    console.log(url);
//  trigger request
    request(options, function(err,response,body) {
      console.log(body);
    });
  };
  
  updateTable(i, key, val){
    console.log(`${key} ${val}`);
    this.state.searchCriteria[i]= {field:key,text:val};
  }
  
  addToSearchTable(){
    let searchCriteria = this.state.searchCriteria;
    let defaultSearchType = this.state.searchTypeDefault;
    if(this.state.searchTypes[this.state.searchCriteria.length]){
      defaultSearchType = this.state.searchTypes[this.state.searchCriteria.length].value;
    }
    searchCriteria.push({field: defaultSearchType});
    this.setState({ searchCriteria })
  }
  
  updateField(value, i){
    let searchCriteria = this.state.searchCriteria;
    searchCriteria[i].field=value;
    this.setState({ searchCriteria })
  }
  
  classSearchWindow(i){
    let searchCriteria = this.state.searchCriteria;
    searchCriteria.splice(i,1);
    this.setState({ searchCriteria })
  }
  
  buildSearchItems(i){
    const numToDisplay = i+1;
    return(
      <table className="homePage--searchTables flex-item" key={i}>
        <tbody>
        <tr>
          <td><b>#{numToDisplay}</b> Search Criteria</td>
          <td className="homePage--search-close"><small onClick={e => this.classSearchWindow(i)}>Close</small></td>
        </tr>
        <tr>
          <td>
            <input className="homePage--search-bar"
                   type="text"
                   name="search"
                   placeholder="Search.."
                   ref={i}
                   value={this.state.searchCriteria[i].text}
                   onChange={e => this.updateTable(i,this.state.searchCriteria[i].field, e.target.value)}/>
          </td>
          <td>
            <Select
              onChange={e => this.updateField(e, i)}
              options={this.state.searchTypes}
              simpleValue
              index={i}
              value={this.state.searchCriteria[i].field}
            />
          </td>
        </tr>
        </tbody>
      </table>);
  }
  
  render(){
    return (
      <div className="homePage--right-top-panel">
        <form className="header--Form homePage--form homePage--search" onSubmit={this.startSearch.bind(this)}>
          <h1>Search</h1>
          <span>You may search multiple fields</span>
          <h4>Wildcard Search</h4>
          {
            this.state.searchCriteria.map((search, i) => {
              return this.buildSearchItems(i)
            })
          }
          <div >
            <input className="homePage--searchTables homePage--searchAdd" type="button" value="Add More Search Criteria" onClick={this.addToSearchTable.bind(this)}/>
          </div>
          <div>
          <input className="homePage--searchTables" type="submit" value="Go"/>
          </div>
        </form>
      </div>
    )
  }
}