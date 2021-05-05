import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Donate from './Donate';
import Homepage from './Homepage';
import Oracle from './Oracle';
import Withdraw from './Withdraw';

class Routes extends Component {
  componentDidMount() {
    // TODO: Remove this if not needed
  }

  render() {
    return (
      <Router>
        <div id="root">
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/donate" component={Donate} />
            <Route exact path="/oracle" component={Oracle} />
            <Route exact path="/withdraw" component={Withdraw} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Routes;
