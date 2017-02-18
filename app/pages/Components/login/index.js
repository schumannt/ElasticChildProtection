import React from 'react';

require('./../../css/styles');

export default class LogIn extends React.Component {
  render() {
    return (
      <div className="login">
        <fieldset className="login--Form">
          <label name="email">Email</label>
          <input type="email" placeholder="example@example.com" />
          <label name="password">Password</label>
          <input type="password" placeholder="Insert password here" />
          <input type="submit" value="Login" />
        </fieldset>
      </div>
    );
  }
}
