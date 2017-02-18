import React from 'react';
import request from 'request';
import Select from 'react-select';

import SearchResults from './searchResultsPane';

require('./../../css/styles');

export default class RightTopPanel extends React.Component {

  constructor(props, context) {
    super(props, context);
    const searchTypes = [
      // { value: 'wildcard', label: 'wildcard'},
      { value: 'ref', label: 'case ref' },
      { value: 'childSurname', label: 'childSurname' },
      { value: 'staffSurname', label: 'staffSurname' },
      { value: 'dateRange', label: 'dateRange' }
    ];
    const searchTypeDefault = searchTypes[0].value;
    this.state = {
      searchTypes,
      searchTypeDefault,
      searchCriteria: [{ field: searchTypeDefault }]
    };
  }

  buildURL() {
    let url = '';
    this.state.searchCriteria.map((searchQuery) => {
      if (searchQuery.field !== undefined)url += `&${searchQuery.field}=${searchQuery.text}`;
    });
    return url;
  }

  startSearch(e, that) {
    e.preventDefault();
    const url = this.buildURL();
    const options = {
      uri: `http://localhost:8085/get?${url}`,
      method: 'GET'
    };
    //  trigger request
    request(options, (err, response, body) => {
      that.setState({ searchResults: JSON.parse(body) });
    });
  }

  updateTable(i, key, val) {
    this.state.searchCriteria[i] = { field: key, text: val };
  }

  addToSearchTable() {
    const searchCriteria = this.state.searchCriteria;
    let defaultSearchType = this.state.searchTypeDefault;
    if (this.state.searchTypes[this.state.searchCriteria.length]) {
      defaultSearchType = this.state.searchTypes[this.state.searchCriteria.length].value;
    }
    searchCriteria.push({ field: defaultSearchType });
    this.setState({ searchCriteria });
  }

  updateField(value, i) {
    const searchCriteria = this.state.searchCriteria;
    searchCriteria[i].field = value;
    this.setState({ searchCriteria });
  }

  closeSearchWindow(i) {
    const searchCriteria = this.state.searchCriteria;
    searchCriteria.splice(i, 1);
    this.setState({ searchCriteria });
  }

  buildSearchItems(i) {
    const numToDisplay = i + 1;
    return (
      <table className="homePage--searchTables" key={i}>
        <tbody>
          <tr>
            <td><b>#{numToDisplay}</b> Search Criteria</td>
            <td className="homePage--search-close">
              <small onClick={e => this.closeSearchWindow(i)}>Close</small>
            </td>
          </tr>
          <tr>
            <td>
              <input
                className="homePage--search-bar"
                type="text"
                name="search"
                placeholder="Search.."
                ref={i}
                onChange={e =>
                     this.updateTable(i, this.state.searchCriteria[i].field, e.target.value)}
              />
            </td><td>
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

  closeAllSearchWindow() {
    const searchCriteria = [{ field: this.state.searchTypeDefault, text: '' }];
    this.setState({ searchCriteria });
  }

  render() {
    return (
      <div className="homePage--search-panel">
        <form
          className="global--panel homePage--form homePage--search"
          onSubmit={e => this.startSearch(e, this)}
        >
          <h1>Search</h1>
          <span>You may search multiple fields</span>
          <span className="homePage--search-close homePage--search-close-add">
            <small onClick={this.closeAllSearchWindow.bind(this)}>Reset All</small>
          </span>
          <h4>Wildcard Search</h4>
          {
            this.state.searchCriteria.map((search, i) => this.buildSearchItems(i))
          }
          <div >
            <input
              className="but homePage--searchTables homePage--searchAdd"
              type="button"
              value="Add More Search Criteria"
              onClick={this.addToSearchTable.bind(this)}
            />
          </div>
          <div><input className="but homePage--searchTables" type="submit" value="Go" /></div>
          { this.state.searchResults ? <SearchResults resultList={this.state.searchResults} actions={this.props.actions} /> : null }
        </form>
      </div>
    );
  }
}
