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
      { value: 'case ref', label: 'case ref'},
      { value:'child Surname', label: 'child Surname'},
      { value:'staff Surname', label: 'staff Surname'},
      { value:'date Range', label: 'date Range'}];
    this.state = {
      searchTypes,
      searchCriteria: [{field: 'wildcard'}]
    };
  }
  
  buildURL(){
    // Build URL
    let url = '';
    this.state.search.map((field) =>{
      if(field.type!==undefined)url+=`&${field.type}=${field.value}`;
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
    console.log("hey");
    console.log(this.state.searchCriteria);
    let searchCriteria = this.state.searchCriteria;
    searchCriteria.push({field: 'wildcard'})
    this.setState({ searchCriteria })
  }
  
  buildSearchItems(i){
    const numToDisplay = i+1;
    return(
      <table className="homePage--searchTables" key={i}>
        <tbody>
        <tr>
          <td><b>#{numToDisplay}</b> Search Criteria</td>
          <td><small>Close</small></td>
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
              onChange={e => this.state.searchCriteria[i].field=e.target.value}
              options={this.state.searchTypes}
              simpleValue
              value={this.state.searchCriteria[i].field}
            />
          </td>
        </tr>
        </tbody>
      </table>);
  }
  
  render(){
    return (
      <div className="homePage--right-top-panel">ref
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