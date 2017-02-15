import React from 'react';

require('./../../css/styles');

export default class RightTopPanel extends React.Component {
  startSearch(e) {
    e.preventDefault();
    console.log(this.state.searchForm);
  };
  
  updateTable(key, val){
    console.log(val);
    this.setState({ searchForm:{[key]: val }});
  }
  
  render(){
    return (
      <div className="homePage--right-top-panel">
        <form className="header--Form homePage--form homePage--search" onSubmit={this.startSearch.bind(this)}>
          <h1>Search</h1>
          <h4>Wildcard Search</h4>
          <input className="homePage--search-bar" type="text" name="search" placeholder="Search.." onChange={e => this.updateTable('wild', e.target.value)}/>
          <h4>Preset Search</h4>
          <input className="homePage--search-bar" type="text" name="ref" placeholder="Case Reference" onChange={e => this.updateTable('ref', e.target.value)}/>
          <br/>
          <input className="homePage--search-bar" type="text" name="staff_surname" placeholder="Staff Surname" onChange={e => this.updateTable('staff', e.target.value)}/>
          <br/>
          <input className="homePage--search-bar" type="text" name="child_surname" placeholder="Child Surname" onChange={e => this.updateTable('child', e.target.value)}/>
          <br/>
          <br/>
          <table className="homePage--search-table">
            <tbody>
            <tr><td>Dates Range:</td><td>From: </td><td><input type="date" name="search--from" onChange={e => this.updateTable('date-to', e.target.value)}/></td></tr>
            <tr><td> </td><td>To:</td><td><input type="date" name="search--to" onChange={e => this.updateTable('date-from', e.target.value)}/></td></tr>
            <tr><td><input type="submit" value="Go"/></td></tr>
            </tbody>
          </table>

        </form>
      </div>
    )
  }
}