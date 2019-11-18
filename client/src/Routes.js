import React, {Component} from 'react'
// import {withRouter as Router, Route, Switch} from 'react-router-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './Homepage'
import Donate from './Donate'
import Oracle from './Oracle'
import Withdraw from './Withdraw'

class Routes extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <Router>
        <div id="root">
          <Switch>
          {/* Routes placed here are available to all visitors */}
            <Route exact path="/" component={Homepage} />
            <Route exact path="/donate" component={Donate} />
            <Route exact path="/oracle" component={Oracle} />
            <Route exact path="/withdraw" component={Withdraw} />
          </Switch>
        </div>
      </Router>

    )
  }
}

export default Routes
