import React from 'react';
import request from 'request';
import Select from 'react-select';
import { connect } from 'react-redux';


import SearchResults from './searchResultsPane';

require('./../../css/styles');

const mapStateToProps = (state) => {
  return {
    fieldMap: state.fieldMap,
    inputValue: state.inputValue
  };
};

@connect(mapStateToProps)
export default class RightTopPanel extends React.Component {

  constructor(props, context) {
    super(props, context);
    const searchTypes = [
      { value: 'wild', label: 'wild'},
      { value: 'ref', label: 'case ref' },
      { value: 'childSurname', label: 'childSurname' },
      { value: 'staffSurname', label: 'staffSurname' },
      { value: 'dateRange', label: 'dateRange' }
    ];
    let dateFields = [];
    this.props.fieldMap.map((fieldType) => {
      if(fieldType.type) dateFields.push({ value:fieldType.name, label:fieldType.name })
    });
    const searchTypeDefault = searchTypes[0].value;
    this.state = {
      dateFields,
      searchTypes,
      searchTypeDefault,
      searchCriteria: [{ field: searchTypeDefault }]
    };
  }

  buildURL() {
    let url = '';
    let dateIndex = -1;
    console.log('hey');
    console.log(this.state.searchCriteria);
    this.state.searchCriteria.map((searchQuery, i) => {
      if(searchQuery.dateValue) {
        dateIndex=i;
      }
      else if(searchQuery.field !== undefined)url += `&${searchQuery.field}=${searchQuery.text}`;
    });
    if(dateIndex>=0) {
      console.log('hello');
      url +=
        `&dateRange=${this.state.searchCriteria[dateIndex].dateFrom.split('-').reverse().join('/')}`+
        `-${this.state.searchCriteria[dateIndex].dateTo.split('-').reverse().join('/')}`+
        `-val-${this.state.searchCriteria[dateIndex].dateValue}`;
    }
    console.log(url);
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
  
  updateDate(value, i,key) {
    console.log(value);
    const searchCriteria = this.state.searchCriteria;
    searchCriteria[i][key] = value;
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
              <img width="20"
                   src={require('./../../assets/error.png')}
                   onClick={e => this.closeSearchWindow(i)} />
            </td>
          </tr>
          <tr>
            {
              this.state.searchCriteria[i].field!=='dateRange' ?
                <td><input
                  className="homePage--search-bar"
                  type="text"
                  name="search"
                  placeholder="Search.."
                  ref={i}
                  onChange={e =>
                    this.updateTable(i, this.state.searchCriteria[i].field, e.target.value)}/></td>
                :
                <td className="homePage--Search-dateRangeBox">
                  From
                  <input type="date" className="homePage--Search-dateRange" onChange={e => this.updateDate(e.target.value, i, "dateFrom")}/>
                  To
                  <input type="date" className="homePage--Search-dateRange" onChange={e => this.updateDate(e.target.value, i, "dateTo")}/>
                  <Select
                    className="homePage--Search-dateRange"
                    onChange={e => this.updateDate(e, i, "dateValue")}
                    options={this.state.dateFields}
                    simpleValue
                    index={i}
                    value={this.state.searchCriteria[i].dateValue}
                  />
                </td>
            }
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

  closeAllSearchWindow() {
    const searchCriteria = [{ field: this.state.searchTypeDefault, text: '' }];
    this.setState({ searchCriteria });
  }

  render() {
    return (
      <div className="homePage--search-panel">
        <form
          className="global--panel homePage--form homePage--search"
          onSubmit={e => this.startSearch(e, this)}>
          <h1>Search</h1>
          <span>You may search multiple fields</span>
          <span className="homePage--search-close homePage--search-close-add">
            <small onClick={this.closeAllSearchWindow.bind(this)}>Reset</small>
          </span>
          {
            this.state.searchCriteria.map((search, i) => this.buildSearchItems(i))
          }
          <div >
            <div onClick={this.addToSearchTable.bind(this)}>
              <img className="global--img" width="40" src={require('./../../assets/add.png')}/>
            </div>
          </div>
          <div><input className="but homePage--searchTables homePage--searchAdd" type="submit" value="Go" /></div>
          { this.state.searchResults ? <SearchResults resultList={this.state.searchResults} actions={this.props.actions} /> : null }
        </form>
      </div>
    );
  }
}
