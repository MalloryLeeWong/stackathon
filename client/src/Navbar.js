import React from 'react';
// import {withRouter as Link} from 'react-router-dom'
import { BrowserRouter as Router, Link} from 'react-router-dom';

const Navbar = (props) => {
  console.log('PROPS IN NAVBAR', props)
  return (
    <Router>
      <div className="App">
      <h1>AidTrace</h1>
      <h2>Make a donation today that you can trace.</h2>
      <div className="row">
        <Link to="/donate">Donate</Link>
        <Link to="/oracle">Oracle</Link>
        <Link to="/withdraw">Withdraw</Link>
      </div >
      </div>
    </Router>

  );
};

export default Navbar;
