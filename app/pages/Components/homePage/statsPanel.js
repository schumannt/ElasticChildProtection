import React from 'react';

require('./../../css/styles');

export default class RightBottomPanel extends React.Component {
  
  returnDashBoardBRAG(total,bad,meh,good){
    if (total<bad) {
      return <td className="homePage--dash-item homePage--bad">{total}</td>;
    }
    if (total<meh) {
      return <td className="homePage--dash-item homePage--meh">{total}</td>;
    }
    if (total<good) {
      return <td className="homePage--dash-item homePage--good">{total}</td>;
    }
    return <td className="homePage--dash-item homePage--great">{total}</td>;
  }
  
  render() {
    return (
      <div className="homePage--right-bottom-panel header--Form homePage--form homePage--search">
        <h2>Key Stats</h2>
        <table>
          <tbody>
            <tr><td>Number of cases opened this month</td>{this.returnDashBoardBRAG(10,6,7,8)}</tr>
            <tr><td>Number of cases closed this month</td>{this.returnDashBoardBRAG(5,6,7,8)}</tr>
          </tbody>
        </table>
      </div>
    )
  }
}